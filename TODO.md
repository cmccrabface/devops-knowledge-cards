# TODO — DevOps Knowledge Cards

## 🔴 Priority: Payment Integration
- [ ] Set up Stripe account and get API keys
- [ ] Create Stripe product + price ($9 one-time)
- [ ] Implement Stripe Checkout (redirect to hosted payment page)
- [ ] Add success/cancel pages (`success.html`, `cancel.html`)
- [ ] Store payment status in localStorage (client-side validation for now)
- [ ] Add "Upgrade to Pro" modal/gate when free users hit the 20-card limit
- [ ] Consider Gumroad as simpler alternative (no backend needed)
- [ ] Add Stripe webhook endpoint if/when backend is added

## 🟡 Near-Term Improvements
- [ ] Add keyboard shortcut help overlay (? key)
- [ ] Implement actual free/pro gating (currently all cards visible)
- [ ] Add export progress feature (JSON download)
- [ ] Add import progress feature
- [ ] PWA support (offline use, install prompt)
- [ ] Social sharing ("I've mastered 50/102 DevOps cards!")
- [ ] Add "Study Session" mode (timed, 10/20/30 card batches)
- [ ] Animated confetti when mastering a category

## 🟢 Content
- [ ] Add 50 more questions (CI/CD, Linux, Git, Cloud Architecture)
- [ ] Add code snippets to relevant answers (syntax highlighting)
- [ ] Add links to official docs in explanations
- [ ] Create certification-specific question packs
- [ ] Community question submissions (GitHub Issues template)

## 🔵 Technical Debt
- [ ] Add unit tests for spaced repetition algorithm
- [ ] Add E2E tests (Playwright)
- [ ] Set up GitHub Actions for automated deployment
- [ ] Add meta tags (OG images, Twitter cards) for social sharing
- [ ] Performance audit (Lighthouse score)
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Add structured data (Schema.org) for SEO

## 🟣 Future Features
- [ ] Backend API (user accounts, cloud sync)
- [ ] Leaderboards / community stats
- [ ] Study groups / shared decks
- [ ] Mobile app (React Native or Flutter)
- [ ] AI-generated explanations for wrong answers
- [ ] Interview simulator mode (timed responses)
- [ ] Dark/light mode toggle on landing page
- [ ] Analytics dashboard for study patterns
