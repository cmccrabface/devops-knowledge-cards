/**
 * DevOps Knowledge Cards — Main Application
 * Spaced repetition flashcard app for DevOps/SRE interview prep
 */

(function() {
    'use strict';

    // === State ===
    const STATE_KEY = 'devops-cards-state';
    const THEME_KEY = 'devops-cards-theme';
    
    let state = loadState();
    let filteredCards = [];
    let currentIndex = 0;
    let isFlipped = false;

    // === DOM Elements ===
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const flashcard = $('#flashcard');
    const flashcardInner = $('#flashcardInner');
    const cardQuestion = $('#cardQuestion');
    const cardAnswer = $('#cardAnswer');
    const cardExplanation = $('#cardExplanation');
    const cardCategory = $('#cardCategory');
    const cardCategoryBack = $('#cardCategoryBack');
    const cardDifficulty = $('#cardDifficulty');
    const cardCounter = $('#cardCounter');
    const confidenceButtons = $('#confidenceButtons');
    const progressBar = $('#progressBar');
    const progressText = $('#progressText');
    const streakDisplay = $('#streakDisplay');
    const categoryFilters = $('#categoryFilters');
    const categoryStats = $('#categoryStats');
    const emptyState = $('#emptyState');
    const cardContainer = $('#cardContainer');

    // === State Management ===
    function loadState() {
        try {
            const saved = localStorage.getItem(STATE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Migration: ensure all cards have state
                QUESTIONS.forEach(q => {
                    if (!parsed.cards[q.id]) {
                        parsed.cards[q.id] = createCardState();
                    }
                });
                return parsed;
            }
        } catch(e) { /* ignore */ }
        
        // Default state
        const cards = {};
        QUESTIONS.forEach(q => {
            cards[q.id] = createCardState();
        });
        return {
            cards,
            streak: 0,
            lastStudyDate: null,
            selectedCategories: Object.keys(CATEGORY_ICONS),
            selectedDifficulty: 'all',
            selectedMastery: 'all'
        };
    }

    function createCardState() {
        return {
            mastery: 'new',       // new, learning, mastered
            easeFactor: 2.5,      // SM-2 ease factor
            interval: 0,          // days until next review
            repetitions: 0,       // successful repetitions
            nextReview: null,     // timestamp
            lastReview: null      // timestamp
        };
    }

    function saveState() {
        try {
            localStorage.setItem(STATE_KEY, JSON.stringify(state));
        } catch(e) { /* quota exceeded, etc */ }
    }

    // === Spaced Repetition (Simplified SM-2) ===
    function updateCardSR(cardId, quality) {
        // quality: 0=again, 1=hard, 2=good, 3=easy
        const card = state.cards[cardId];
        const now = Date.now();
        card.lastReview = now;

        if (quality < 2) {
            // Failed: reset
            card.repetitions = 0;
            card.interval = 0;
            card.mastery = 'learning';
        } else {
            card.repetitions++;
            
            if (card.repetitions === 1) {
                card.interval = 1;
            } else if (card.repetitions === 2) {
                card.interval = 3;
            } else {
                card.interval = Math.round(card.interval * card.easeFactor);
            }
            
            // Update ease factor
            card.easeFactor = Math.max(1.3,
                card.easeFactor + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02))
            );

            // Update mastery
            if (card.repetitions >= 4 && card.interval >= 7) {
                card.mastery = 'mastered';
            } else {
                card.mastery = 'learning';
            }
        }

        card.nextReview = now + (card.interval * 24 * 60 * 60 * 1000);
        saveState();
    }

    // === Streak Tracking ===
    function updateStreak() {
        const today = new Date().toDateString();
        if (state.lastStudyDate === today) return;
        
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (state.lastStudyDate === yesterday) {
            state.streak++;
        } else if (state.lastStudyDate !== today) {
            state.streak = 1;
        }
        state.lastStudyDate = today;
        saveState();
        renderStreak();
    }

    // === Filtering ===
    function getFilteredCards() {
        let cards = [...QUESTIONS];

        // Category filter
        cards = cards.filter(c => state.selectedCategories.includes(c.category));

        // Difficulty filter
        if (state.selectedDifficulty !== 'all') {
            cards = cards.filter(c => c.difficulty === state.selectedDifficulty);
        }

        // Mastery filter
        if (state.selectedMastery !== 'all') {
            cards = cards.filter(c => state.cards[c.id].mastery === state.selectedMastery);
        }

        // Sort by spaced repetition (due cards first, then new)
        const now = Date.now();
        cards.sort((a, b) => {
            const sa = state.cards[a.id];
            const sb = state.cards[b.id];
            
            // New cards and due cards first
            const aDue = !sa.nextReview || sa.nextReview <= now;
            const bDue = !sb.nextReview || sb.nextReview <= now;
            
            if (aDue && !bDue) return -1;
            if (!aDue && bDue) return 1;
            if (aDue && bDue) {
                // Both due: new cards first, then by how overdue
                if (sa.mastery === 'new' && sb.mastery !== 'new') return -1;
                if (sa.mastery !== 'new' && sb.mastery === 'new') return 1;
                return (sa.nextReview || 0) - (sb.nextReview || 0);
            }
            // Neither due: sort by next review date
            return (sa.nextReview || 0) - (sb.nextReview || 0);
        });

        return cards;
    }

    // === Rendering ===
    function renderCard() {
        if (filteredCards.length === 0) {
            cardContainer.style.display = 'none';
            confidenceButtons.classList.remove('visible');
            $$('.card-nav')[0].style.display = 'none';
            cardCounter.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        cardContainer.style.display = 'block';
        $$('.card-nav')[0].style.display = 'flex';
        cardCounter.style.display = 'block';
        emptyState.style.display = 'none';

        const card = filteredCards[currentIndex];
        const icon = CATEGORY_ICONS[card.category] || '📋';

        cardCategory.textContent = `${icon} ${card.category}`;
        cardCategoryBack.textContent = `${icon} ${card.category}`;
        cardQuestion.textContent = card.question;
        cardAnswer.textContent = card.answer;
        cardExplanation.textContent = card.explanation;
        
        cardDifficulty.textContent = card.difficulty;
        cardDifficulty.className = `card-difficulty ${card.difficulty}`;

        cardCounter.textContent = `Card ${currentIndex + 1} / ${filteredCards.length}`;

        // Reset flip state
        unflipCard();
    }

    function renderProgress() {
        const total = QUESTIONS.length;
        const mastered = Object.values(state.cards).filter(c => c.mastery === 'mastered').length;
        const pct = total > 0 ? (mastered / total * 100) : 0;
        
        progressBar.style.width = `${pct}%`;
        progressText.textContent = `${mastered} / ${total} mastered`;
    }

    function renderStreak() {
        streakDisplay.textContent = `🔥 ${state.streak} day streak`;
    }

    function renderCategoryFilters() {
        const categories = Object.keys(CATEGORY_ICONS);
        categoryFilters.innerHTML = '';
        
        categories.forEach(cat => {
            const label = document.createElement('label');
            label.className = `filter-chip${state.selectedCategories.includes(cat) ? ' active' : ''}`;
            label.dataset.value = cat;
            
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = cat;
            input.checked = state.selectedCategories.includes(cat);
            
            label.appendChild(input);
            label.appendChild(document.createTextNode(`${CATEGORY_ICONS[cat]} ${cat}`));
            categoryFilters.appendChild(label);

            label.addEventListener('click', (e) => {
                e.preventDefault();
                if (state.selectedCategories.includes(cat)) {
                    if (state.selectedCategories.length > 1) {
                        state.selectedCategories = state.selectedCategories.filter(c => c !== cat);
                    }
                } else {
                    state.selectedCategories.push(cat);
                }
                saveState();
                renderCategoryFilters();
                applyFilters();
            });
        });
    }

    function renderCategoryStats() {
        const categories = Object.keys(CATEGORY_ICONS);
        categoryStats.innerHTML = '';

        categories.forEach(cat => {
            const catCards = QUESTIONS.filter(q => q.category === cat);
            const mastered = catCards.filter(q => state.cards[q.id].mastery === 'mastered').length;
            const pct = catCards.length > 0 ? Math.round(mastered / catCards.length * 100) : 0;

            const div = document.createElement('div');
            div.className = 'cat-stat';
            div.innerHTML = `
                <span class="cat-stat-icon">${CATEGORY_ICONS[cat]}</span>
                <span class="cat-stat-name">${cat}</span>
                <div class="cat-stat-bar"><div class="cat-stat-fill" style="width:${pct}%"></div></div>
                <span class="cat-stat-pct">${pct}%</span>
            `;
            categoryStats.appendChild(div);
        });
    }

    // === Card Actions ===
    function flipCard() {
        if (filteredCards.length === 0) return;
        isFlipped = true;
        flashcard.classList.add('flipped');
        confidenceButtons.classList.add('visible');
    }

    function unflipCard() {
        isFlipped = false;
        flashcard.classList.remove('flipped');
        confidenceButtons.classList.remove('visible');
    }

    function nextCard() {
        if (filteredCards.length === 0) return;
        currentIndex = (currentIndex + 1) % filteredCards.length;
        renderCard();
    }

    function prevCard() {
        if (filteredCards.length === 0) return;
        currentIndex = (currentIndex - 1 + filteredCards.length) % filteredCards.length;
        renderCard();
    }

    function shuffleCards() {
        for (let i = filteredCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredCards[i], filteredCards[j]] = [filteredCards[j], filteredCards[i]];
        }
        currentIndex = 0;
        renderCard();
    }

    function applyFilters() {
        filteredCards = getFilteredCards();
        currentIndex = 0;
        renderCard();
        renderProgress();
        renderCategoryStats();
    }

    // === Event Handlers ===
    function setupEvents() {
        // Card flip
        flashcard.addEventListener('click', () => {
            if (isFlipped) return; // Don't unflip on click — use confidence buttons
            flipCard();
        });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    if (!isFlipped) flipCard();
                    break;
                case 'ArrowRight':
                case 'l':
                    nextCard();
                    break;
                case 'ArrowLeft':
                case 'h':
                    prevCard();
                    break;
                case '1': rateCard(0); break;
                case '2': rateCard(1); break;
                case '3': rateCard(2); break;
                case '4': rateCard(3); break;
                case 's':
                    shuffleCards();
                    break;
            }
        });

        // Confidence buttons
        $$('.conf-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const score = parseInt(btn.dataset.score);
                rateCard(score);
            });
        });

        // Navigation
        $('#nextBtn').addEventListener('click', nextCard);
        $('#prevBtn').addEventListener('click', prevCard);
        $('#shuffleBtn').addEventListener('click', shuffleCards);

        // Difficulty filter
        $$('#difficultyFilters .filter-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                e.preventDefault();
                state.selectedDifficulty = chip.dataset.value;
                saveState();
                $$('#difficultyFilters .filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                applyFilters();
            });
        });

        // Mastery filter
        $$('#masteryFilters .filter-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                e.preventDefault();
                state.selectedMastery = chip.dataset.value;
                saveState();
                $$('#masteryFilters .filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                applyFilters();
            });
        });

        // Dark mode toggle
        $('#darkToggle').addEventListener('click', toggleTheme);

        // Reset progress
        $('#resetBtn').addEventListener('click', () => {
            if (confirm('Reset all progress? This cannot be undone.')) {
                localStorage.removeItem(STATE_KEY);
                state = loadState();
                applyFilters();
                renderProgress();
                renderCategoryStats();
                renderStreak();
            }
        });

        // Mobile sidebar toggle
        $('#sidebarToggle').addEventListener('click', () => {
            $('#sidebar').classList.toggle('open');
        });

        // Close sidebar when clicking card area on mobile
        $('.card-area').addEventListener('click', () => {
            $('#sidebar').classList.remove('open');
        });

        // Touch swipe support
        let touchStartX = 0;
        flashcard.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        flashcard.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) > 80) {
                if (diff > 0) prevCard();
                else nextCard();
            }
        }, { passive: true });
    }

    function rateCard(score) {
        if (!isFlipped || filteredCards.length === 0) return;
        
        const card = filteredCards[currentIndex];
        updateCardSR(card.id, score);
        updateStreak();
        
        // Brief visual feedback
        const btn = $(`.conf-btn[data-score="${score}"]`);
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => { btn.style.transform = ''; }, 150);

        // Move to next card after a short delay
        setTimeout(() => {
            nextCard();
            renderProgress();
            renderCategoryStats();
        }, 300);
    }

    // === Theme ===
    function initTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'light') {
            document.body.classList.add('light');
            $('#darkToggle').textContent = '☀️';
        }
    }

    function toggleTheme() {
        document.body.classList.toggle('light');
        const isLight = document.body.classList.contains('light');
        localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
        $('#darkToggle').textContent = isLight ? '☀️' : '🌙';
    }

    // === Initialize ===
    function init() {
        initTheme();
        renderCategoryFilters();
        applyFilters();
        renderProgress();
        renderCategoryStats();
        renderStreak();
        setupEvents();

        // Restore difficulty filter state
        if (state.selectedDifficulty !== 'all') {
            $$('#difficultyFilters .filter-chip').forEach(c => {
                c.classList.toggle('active', c.dataset.value === state.selectedDifficulty);
            });
        }
        if (state.selectedMastery !== 'all') {
            $$('#masteryFilters .filter-chip').forEach(c => {
                c.classList.toggle('active', c.dataset.value === state.selectedMastery);
            });
        }
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
