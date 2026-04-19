# VibeGlossary

A friendly UI + Build Literacy glossary for vibe coders. Browse 98 live component demos and 105 plain-language Build Literacy topics, generate AI prompts, take quizzes, and track learning with the VibeScore system.

## Features

### UI Glossary
- **98 interactive demos** across 9 categories: Overlays, Inputs, Data Display, Forms, Layouts, Navigation, Interactions, Feedback, Marketing
- **Lazy-loaded demos** — each component ships as its own ~1–7 kB code-split chunk, so the initial bundle stays small as the glossary grows
- **Firestore-backed content** — component entries and categories can be edited in Firestore without a code deploy; local data seeds instantly and Firestore merges in silently
- **Spec Generator** — toggle options, add Requirements and Scaffold code (shadcn/ui, Headless UI, Radix, or Plain HTML), and copy the assembled prompt
- **Live preview** — every component is interactive, not just a static screenshot
- **Long-form details accordion** — a one-line summary with an expandable beginner-friendly explanation for every entry

### Build Literacy
- **105 topics across 7 clusters**: Web Foundations, Engineering, Auth & Security, Product, Design Language, Spec & Process, AI Literacy
- **Two-part Talk-to-AI prompts** — a generic starter that asks the AI to interview you, plus a practical example you can adapt
- **Mnemonic for every topic** — the "if you remember nothing else" line
- **Sibling Compare chips** and a Build Literacy Index for fast cross-topic learning
- **Per-cluster color theming** that mirrors the UI Glossary's dynamic accents

### Learning system
- **VibeScore** — a single learning score with per-tier points (Visited 1, Used 2, Passed 5, Mastered 10, Retained +5 monthly, Path bonus +25) and a six-rung level ladder: Lurker → Scroller → Tinkerer → Shipper → Polyglot → Vibe Coder
- **Quiz integrity** — 4-second time floor, 90-second ceiling, 30-minute cooldown, rotating variants, mastery requires two clean passes in different sessions on different variants. Wrong answers never lose points
- **Learn Mode** for both surfaces — sibling compare pills, demo-to-definition quizzes, mastery tracking, and guided learning paths with end-of-path quizzes (80% to earn the badge)
- **Score breakdown modal** — UI Glossary vs Build Literacy sub-scores, integrity rules in plain English
- **Surprise Me** for both UI Glossary and Build Literacy

### Sharing & UX
- **Social share popover** — share your VibeScore, level, or path badge to X, LinkedIn, Bluesky, Facebook, Reddit, Email, or copy text + link. Falls back to `navigator.share` on mobile
- **Resizable two-pane layout** with drag handles, persisted in `localStorage`, working consistently across both surfaces
- **Cross-cluster Previous/Next** that flows across category and cluster boundaries
- **Welcome Screen** that surfaces both UI Glossary and Build Literacy as equal entry points
- **Cheat Sheet** (⌘/) listing UI categories and Build Literacy clusters in one grid
- **Unified search** (⌘K) across UI components and Build Literacy topics
- **Dark/light mode** with class-based Tailwind theming
- **Responsive** — mobile view toggle, icon-only nav collapse below `lg`, adaptive typography
- **Open Graph + Twitter Card** meta tags
- **Footer** with version, counts, and links to the repo and changelog

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) (952 tests)
- [Firebase Hosting](https://firebase.google.com/products/hosting) + [Firestore](https://firebase.google.com/products/firestore)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

## Project Structure

```
src/
├── components/
│   ├── layout/         # TopNav, Footer
│   ├── ui/             # ExploreBar, PromptBuilder, ConfigToggle
│   ├── learn/          # UI Glossary + Build Literacy learning surface
│   │                   # CompareView, GlossaryIndex, QuizCard
│   │                   # PathsLauncher, PathView
│   │                   # BuildLiteracyView, BuildTopicView, BuildLiteracyIndex
│   │                   # BuildPathsLauncher, BuildPathView
│   │                   # TalkToAiCard, TopicTierBadge
│   │                   # VibeScorePill, ScoreBreakdownModal, ShareAchievement
│   ├── CheatSheet.jsx
│   ├── WelcomeScreen.jsx
│   └── demos/          # One file per UI Glossary component demo
│       ├── overlays/  inputs/  data/  forms/
│       ├── layout/    navigation/  interactions/
│       └── feedback/  marketing/
├── data/
│   ├── categories.jsx        # UI Glossary structure + color system + icon registry
│   ├── glossary.js           # UI Glossary content (Firestore fallback)
│   ├── glossaryDetails.js    # Long-form details accordion copy
│   ├── demoRegistry.jsx      # React.lazy() map of component IDs → demo chunks
│   ├── paths.js              # UI Glossary learning paths + quizzes
│   ├── buildLiteracy.js      # Build Literacy clusters + topics
│   ├── aiLiteracy.js         # AI Literacy cluster (LLMs, RAG, MCP, etc.)
│   ├── designLanguage.js     # Design Language cluster
│   └── buildPaths.js         # Build Literacy learning paths + quizzes
├── lib/
│   ├── scoring.js            # Pure VibeScore math (POINTS, LEVELS, tiers)
│   ├── quizIntegrity.js      # Time floor/ceiling, cooldowns, variant rotation
│   └── share.js              # Share text + platform URL builders
├── hooks/
│   ├── useExploreMode.js     # Visited/used/attempts state + VibeScore + tiers
│   ├── usePanelResize.js     # Drag-to-resize split panes (with persistence)
│   ├── useGlossary.js        # Firestore-backed component reader
│   └── useCategories.jsx     # Firestore-backed category reader
├── firebase.js               # Firebase app + Firestore init
├── test/                     # Vitest test suite (952 tests)
├── styles/
│   └── animations.css
├── App.jsx
└── main.jsx
```

## Deployment

Deployed on [Firebase Hosting](https://vibe-glossary.web.app).

```bash
npm run build
firebase deploy --only hosting --project vibe-glossary
```

## Versioning

This project uses [Semantic Versioning](https://semver.org/). See [CHANGELOG.md](./CHANGELOG.md) for release history.

## License

[MIT](./LICENSE) © Ray Villalobos
