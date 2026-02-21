# ⚡ DevOps Knowledge Cards

**Master your DevOps & SRE interviews with smart flashcards powered by spaced repetition.**

🌐 **[Live Demo →](https://cmccrabface.github.io/devops-knowledge-cards/)**

## Features

- 🧠 **102 Expert-Curated Questions** — AWS, Kubernetes, Terraform, Docker, Monitoring, Networking, Security
- 🔄 **Spaced Repetition** — Science-backed algorithm surfaces cards you need to review
- 📈 **Progress Tracking** — See your mastery per category with visual stats
- 🎯 **Smart Filters** — Filter by category, difficulty (Junior/Mid/Senior), and mastery level
- 🌙 **Dark & Light Mode** — Easy on the eyes, day or night
- 📱 **Responsive** — Works on desktop, tablet, and mobile
- ⌨️ **Keyboard Shortcuts** — Space to flip, arrows to navigate, 1-4 to rate
- 🔥 **Streak Tracking** — Stay motivated with daily study streaks
- 💾 **Local Storage** — Progress saved in your browser, no account needed

## Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript** — No frameworks, no build step, no dependencies
- **GitHub Pages** — Free, fast, global CDN
- **localStorage** — Client-side progress persistence

## Quick Start

```bash
# Clone the repo
git clone https://github.com/cmccrabface/devops-knowledge-cards.git
cd devops-knowledge-cards

# Open locally (any static server works)
open index.html
# or
python3 -m http.server 8000
```

## Project Structure

```
├── index.html          # Landing page
├── app.html            # Flashcard study app
├── css/
│   ├── landing.css     # Landing page styles
│   └── app.css         # App styles (dark/light themes)
├── js/
│   ├── questions.js    # Question database (102 questions)
│   └── app.js          # App logic (SR algorithm, state, UI)
├── MARKETING.md        # Launch strategy
├── TODO.md             # Roadmap & action items
└── README.md
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` / `Enter` | Flip card |
| `→` / `l` | Next card |
| `←` / `h` | Previous card |
| `1` | Rate: Again |
| `2` | Rate: Hard |
| `3` | Rate: Good |
| `4` | Rate: Easy |
| `s` | Shuffle |

## Categories

| Category | Questions | Topics |
|----------|-----------|--------|
| ☁️ AWS | 15 | VPC, EC2, S3, IAM, Lambda, ALB, CloudFormation |
| ☸️ Kubernetes | 15 | Pods, Deployments, Services, RBAC, HPA, Networking |
| 🏗️ Terraform | 15 | State, Modules, Variables, Providers, Workspaces |
| 🐳 Docker | 15 | Images, Containers, Networking, Security, Multi-stage |
| 📊 Monitoring | 14 | Prometheus, Grafana, SLOs, OpenTelemetry, Alerting |
| 🌐 Networking | 14 | DNS, TCP/UDP, TLS, CDN, Service Mesh, BGP |
| 🔒 Security | 14 | Zero Trust, RBAC, Secrets, WAF, Supply Chain |

## License

MIT — Use it, learn from it, build on it.
