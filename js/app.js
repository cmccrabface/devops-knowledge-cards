// DevOps Knowledge Cards - App Logic

// State
let allCards = [];
let filteredCards = [];
let currentIndex = 0;
let cardStates = {}; // id -> { lastReview, interval, easeFactor, reviews }
let streak = 0;

// Constants
const FREE_TIER_LIMIT = 20;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCards();
    loadState();
    initializeFilters();
    initializeEventListeners();
    applyFilters();
});

// Load questions
function loadCards() {
    allCards = QUESTIONS;
    console.log(`Loaded ${allCards.length} questions`);
}

// Load saved state from localStorage
function loadState() {
    const saved = localStorage.getItem('devops_cards_state');
    if (saved) {
        const state = JSON.parse(saved);
        cardStates = state.cardStates || {};
        streak = state.streak || 0;
        
        // Check if license is valid
        if (!hasProLicense() && allCards.length > FREE_TIER_LIMIT) {
            allCards = allCards.slice(0, FREE_TIER_LIMIT);
            console.log(`Free tier: limited to ${FREE_TIER_LIMIT} cards`);
        }
    }
    
    // Initialize card states for new cards
    allCards.forEach(card => {
        if (!cardStates[card.id]) {
            cardStates[card.id] = {
                lastReview: null,
                interval: 0,
                easeFactor: 2.5,
                reviews: 0,
                mastery: 'new' // new, learning, mastered
            };
        }
    });
    
    updateStreak();
}

// Save state
function saveState() {
    const state = {
        cardStates,
        streak,
        lastVisit: Date.now()
    };
    localStorage.setItem('devops_cards_state', JSON.stringify(state));
}

// Check for Pro license
function hasProLicense() {
    const license = localStorage.getItem('devops_license');
    if (!license) return false;
    // Simple validation for v1 (client-side only)
    return /^DEVOPS-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(license);
}

// Initialize filters
function initializeFilters() {
    // Get unique categories
    const categories = [...new Set(allCards.map(c => c.category))].sort();
    
    const catFilters = document.getElementById('categoryFilters');
    catFilters.innerHTML = `
        <label class="filter-chip active" data-value="all">
            <input type="checkbox" name="category" value="all" checked> All
        </label>
    ` + categories.map(cat => `
        <label class="filter-chip" data-value="${cat}">
            <input type="checkbox" name="category" value="${cat}"> ${cat}
        </label>
    `).join('');
    
    // Category stats
    updateCategoryStats();
}

// Update category statistics
function updateCategoryStats() {
    const categories = [...new Set(allCards.map(c => c.category))].sort();
    const statsContainer = document.getElementById('categoryStats');
    
    statsContainer.innerHTML = categories.map(cat => {
        const catCards = allCards.filter(c => c.category === cat);
        const mastered = catCards.filter(c => cardStates[c.id]?.mastery === 'mastered').length;
        const pct = Math.round((mastered / catCards.length) * 100);
        
        const icon = {
            'AWS': '☁️',
            'Kubernetes': '☸️',
            'Terraform': '🏗️',
            'Docker': '🐳',
            'Monitoring': '📊',
            'Networking': '🌐',
            'Security': '🔐'
        }[cat] || '📦';
        
        return `
            <div class="cat-stat">
                <span class="cat-stat-icon">${icon}</span>
                <span class="cat-stat-name">${cat}</span>
                <div class="cat-stat-bar">
                    <div class="cat-stat-fill" style="width: ${pct}%"></div>
                </div>
                <span class="cat-stat-pct">${pct}%</span>
            </div>
        `;
    }).join('');
}

// Event listeners
function initializeEventListeners() {
    // Card flip
    const flashcard = document.getElementById('flashcard');
    flashcard.addEventListener('click', flipCard);
    flashcard.addEventListener('keydown', e => {
        if (e.code === 'Space') {
            e.preventDefault();
            flipCard();
        }
    });
    
    // Navigation
    document.getElementById('prevBtn').addEventListener('click', () => navigateCard(-1));
    document.getElementById('nextBtn').addEventListener('click', () => navigateCard(1));
    document.getElementById('shuffleBtn').addEventListener('click', shuffleCards);
    
    // Confidence buttons
    document.querySelectorAll('.conf-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const score = parseInt(btn.dataset.score);
            recordReview(score);
        });
    });
    
    // Dark mode toggle
    document.getElementById('darkToggle').addEventListener('click', toggleDarkMode);
    
    // Reset progress
    document.getElementById('resetBtn').addEventListener('click', resetProgress);
    
    // Filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const input = chip.querySelector('input');
            const filterType = input.name;
            
            if (filterType === 'category' && input.value === 'all') {
                // Toggle all
                document.querySelectorAll(`input[name="category"]`).forEach(i => {
                    i.checked = input.checked;
                    i.closest('.filter-chip').classList.toggle('active', input.checked);
                });
            } else {
                // Single select for difficulty and mastery (radio)
                if (input.type === 'radio') {
                    document.querySelectorAll(`input[name="${filterType}"]`).forEach(i => {
                        i.closest('.filter-chip').classList.remove('active');
                    });
                }
                
                input.checked = !input.checked;
                chip.classList.toggle('active', input.checked);
                
                // If category, uncheck "all" if specific selected
                if (filterType === 'category' && input.value !== 'all') {
                    const allCheckbox = document.querySelector('input[name="category"][value="all"]');
                    allCheckbox.checked = false;
                    allCheckbox.closest('.filter-chip').classList.remove('active');
                }
            }
            
            applyFilters();
        });
    });
    
    // Sidebar toggle (mobile)
    document.getElementById('sidebarToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });
}

// Apply filters
function applyFilters() {
    // Get selected categories
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(i => i.value);
    
    // Get selected difficulty
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked')?.value || 'all';
    
    // Get selected mastery
    const selectedMastery = document.querySelector('input[name="mastery"]:checked')?.value || 'all';
    
    // Filter cards
    filteredCards = allCards.filter(card => {
        // Category filter
        const catMatch = selectedCategories.includes('all') || selectedCategories.includes(card.category);
        
        // Difficulty filter
        const diffMatch = selectedDifficulty === 'all' || card.difficulty === selectedDifficulty;
        
        // Mastery filter
        const mastery = cardStates[card.id]?.mastery || 'new';
        const masteryMatch = selectedMastery === 'all' || mastery === selectedMastery;
        
        return catMatch && diffMatch && masteryMatch;
    });
    
    currentIndex = 0;
    
    if (filteredCards.length === 0) {
        showEmptyState();
    } else {
        hideEmptyState();
        displayCard();
    }
    
    updateProgress();
}

// Display current card
function displayCard() {
    if (filteredCards.length === 0) return;
    
    const card = filteredCards[currentIndex];
    
    // Update counter
    document.getElementById('cardCounter').textContent = `Card ${currentIndex + 1} / ${filteredCards.length}`;
    
    // Update front
    document.getElementById('cardCategory').textContent = card.category;
    document.getElementById('cardDifficulty').textContent = card.difficulty;
    document.getElementById('cardDifficulty').className = `card-difficulty ${card.difficulty}`;
    document.getElementById('cardQuestion').textContent = card.question;
    
    // Update back
    document.getElementById('cardCategoryBack').textContent = card.category;
    document.getElementById('cardAnswer').textContent = card.answer;
    document.getElementById('cardExplanation').textContent = card.explanation;
    
    // Reset flip state
    document.getElementById('flashcard').classList.remove('flipped');
    document.getElementById('confidenceButtons').classList.remove('visible');
}

// Flip card
function flipCard() {
    const flashcard = document.getElementById('flashcard');
    const isFlipped = flashcard.classList.toggle('flipped');
    
    if (isFlipped) {
        // Show confidence buttons after flip
        setTimeout(() => {
            document.getElementById('confidenceButtons').classList.add('visible');
        }, 300);
    } else {
        document.getElementById('confidenceButtons').classList.remove('visible');
    }
}

// Navigate to next/previous card
function navigateCard(direction) {
    currentIndex += direction;
    
    if (currentIndex < 0) currentIndex = filteredCards.length - 1;
    if (currentIndex >= filteredCards.length) currentIndex = 0;
    
    displayCard();
}

// Shuffle cards
function shuffleCards() {
    filteredCards.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    displayCard();
}

// Record review (spaced repetition algorithm)
function recordReview(score) {
    const card = filteredCards[currentIndex];
    const state = cardStates[card.id];
    
    const now = Date.now();
    state.lastReview = now;
    state.reviews++;
    
    // Simple SM-2 algorithm
    if (score >= 3) {
        // Easy - increase interval significantly
        state.interval = state.interval === 0 ? 3 : Math.round(state.interval * state.easeFactor);
        state.easeFactor = Math.min(state.easeFactor + 0.15, 3.0);
        state.mastery = state.reviews >= 3 ? 'mastered' : 'learning';
    } else if (score === 2) {
        // Good - increase interval moderately
        state.interval = state.interval === 0 ? 1 : Math.round(state.interval * state.easeFactor);
        state.easeFactor = Math.max(state.easeFactor - 0.05, 1.3);
        state.mastery = 'learning';
    } else {
        // Hard or Again - reset interval
        state.interval = 0;
        state.easeFactor = Math.max(state.easeFactor - 0.2, 1.3);
        state.mastery = state.reviews >= 2 ? 'learning' : 'new';
    }
    
    saveState();
    updateProgress();
    updateCategoryStats();
    
    // Move to next card
    navigateCard(1);
}

// Update progress display
function updateProgress() {
    const totalCards = filteredCards.length;
    const masteredCards = filteredCards.filter(c => cardStates[c.id]?.mastery === 'mastered').length;
    const percentage = totalCards > 0 ? (masteredCards / totalCards) * 100 : 0;
    
    document.getElementById('progressBar').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `${masteredCards} / ${totalCards} mastered`;
}

// Update streak
function updateStreak() {
    const lastVisit = JSON.parse(localStorage.getItem('devops_cards_state') || '{}').lastVisit || 0;
    const daysSinceLastVisit = Math.floor((Date.now() - lastVisit) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastVisit === 0) {
        // Same day - maintain streak
    } else if (daysSinceLastVisit === 1) {
        // Next day - increment streak
        streak++;
    } else {
        // Missed days - reset streak
        streak = 1;
    }
    
    document.getElementById('streakDisplay').textContent = `🔥 ${streak} day streak`;
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('light');
    const isDark = !document.body.classList.contains('light');
    document.getElementById('darkToggle').textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('devops_cards_theme', isDark ? 'dark' : 'light');
}

// Reset progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        localStorage.removeItem('devops_cards_state');
        cardStates = {};
        streak = 0;
        loadState();
        updateProgress();
        updateCategoryStats();
        updateStreak();
    }
}

// Show empty state
function showEmptyState() {
    document.querySelector('.card-container').style.display = 'none';
    document.querySelector('.confidence-buttons').style.display = 'none';
    document.querySelector('.card-nav').style.display = 'none';
    document.getElementById('emptyState').style.display = 'flex';
    document.getElementById('cardCounter').textContent = 'No cards';
}

// Hide empty state
function hideEmptyState() {
    document.querySelector('.card-container').style.display = 'block';
    document.querySelector('.confidence-buttons').style.display = 'block';
    document.querySelector('.card-nav').style.display = 'flex';
    document.getElementById('emptyState').style.display = 'none';
}

// Load theme on init
const savedTheme = localStorage.getItem('devops_cards_theme');
if (savedTheme === 'light') {
    document.body.classList.add('light');
    document.getElementById('darkToggle').textContent = '☀️';
}
