# VibeGlossary

A friendly UI + Build Literacy glossary for vibe coders. Browse 111 live component demos and 130 plain-language Build Literacy topics, generate AI prompts, take five-item checkpoint quizzes, and track learning with the VibeScore system.

## Features

### UI Glossary
- **111 interactive demos** across 9 categories: Overlays, Inputs, Data Display, Forms, Layouts, Navigation, Interactions, Feedback, Marketing
- **Lazy-loaded demos** — each component ships as its own ~1–7 kB code-split chunk, so the initial bundle stays small as the glossary grows
- **Firestore-backed content** — component entries and categories can be edited in Firestore without a code deploy; local data seeds instantly and Firestore merges in silently
- **Spec Generator** — toggle options, add Requirements and Scaffold code (shadcn/ui, Headless UI, Radix, or Plain HTML), and copy the assembled prompt
- **Live teaching studio** — every component is interactive, with larger examples and plain-language guidance about what to try and why it matters
- **Long-form details accordion** — a one-line summary with an expandable beginner-friendly explanation for every entry

### Build Literacy
- **130 topics across 9 clusters**: Web Foundations, Engineering Practice, Auth & Security, Product Thinking, Design Language, Spec & Process, AI Literacy, Protocols & APIs, and Motion
- **Two-part Talk-to-AI prompts** — a generic starter that asks the AI to interview you, plus a practical example you can adapt
- **Unique teaching headline for every topic** so the studio opens with the idea the learner is about to prove
- **Mnemonic for every topic** — the "if you remember nothing else" line
- **Sibling Compare chips** and a Build Literacy Index for fast cross-topic learning
- **Per-cluster color theming** that mirrors the UI Glossary's dynamic accents

### Learning system
- **VibeScore** — a single learning score with per-tier points (Visited 1, Used 2, Passed 5, Mastered 10, Retained +5 monthly) and a six-rung level ladder: Lurker → Scroller → Tinkerer → Shipper → Polyglot → Vibe Coder
- **Learning Mode starts on** and offers a five-item checkpoint after every five lessons. Review, take the five-question quiz for points, or skip for now
- **Floating Learning HUD** — Previous and Next destinations, arrow-key navigation, progress and score popovers, plus drag, dock, minimize, and hide controls
- **Progress coaching** — timely messages explain what earns the next level, how many reviews remain, and what is left for the class requirement
- **Quiz integrity** — 4-second time floor, 90-second ceiling, 30-minute cooldown, rotating variants, mastery requires two clean passes in different sessions on different variants. Wrong answers never lose points
- **Score breakdown modal** — UI Glossary vs Build Literacy sub-scores, level requirements, and integrity rules in plain English
- **Class proof** — students can generate a proof URL or copy proof text for Canvas/LMS submissions; instructors open the URL to verify VibeScore, level, badges, and whether the class bar was met

### Sharing & UX
- **Social share popover** — share your VibeScore or level to X, LinkedIn, Bluesky, Facebook, Reddit, Email, or copy text + link. Falls back to `navigator.share` on mobile
- **Responsive lesson layout** that gives the live studio the room it needs without stacking competing sidebars
- **Cross-cluster Previous/Next** that flows across category and cluster boundaries, with left/right arrow-key support
- **Welcome Screen** that surfaces both UI Glossary and Build Literacy as equal entry points
- **Cheat Sheet** (⌘/) listing UI categories and Build Literacy clusters in one grid
- **Unified search** (⌘K) across UI components and Build Literacy topics
- **Dark/light mode** in the user menu for both signed-in and signed-out visitors
- **Readable responsive typography** — Poppins for body copy, Hubot Sans for real headlines, and Source Code Pro for code
- **Open Graph + Twitter Card** meta tags
- **Footer** with version, counts, and links to the repo and changelog

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) (1,400+ tests)
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
│   │                   # BuildLiteracyView, BuildTopicView, BuildLiteracyIndex
│   │                   # LearningCheckpointModal, FloatingLearningHud
│   │                   # MotionLesson, WebFoundationLesson, TalkToAiCard
│   │                   # VibeScorePill, ScoreBreakdownModal, ProgressToast
│   │                   # ProofView
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
│   ├── buildStudioCopy.js    # Unique studio headline for every Build Literacy topic
│   └── webFoundationLessons.js # Interactive Web Foundation lesson definitions
├── lib/
│   ├── scoring.js            # Pure VibeScore math (POINTS, LEVELS, tiers)
│   ├── quizIntegrity.js      # Time floor/ceiling, cooldowns, variant rotation
│   ├── progressCoaching.js   # Level and class-requirement coaching
│   ├── share.js              # Share text + platform URL builders
│   └── proof.js              # Class proof: bar check, snapshot, URL encode/decode
├── hooks/
│   ├── useExploreMode.js     # Visited/used/attempts state + VibeScore + tiers
│   ├── usePanelResize.js     # Drag-to-resize split panes (with persistence)
│   ├── useGlossary.js        # Firestore-backed component reader
│   └── useCategories.jsx     # Firestore-backed category reader
├── firebase.js               # Firebase app + Firestore init
├── test/                     # Vitest test suite (1,400+ tests)
├── styles/
│   └── animations.css
├── App.jsx
└── main.jsx
```

## Deployment

Deployed on [Firebase Hosting](https://vibe-glossary.web.app).

```bash
npm run build
firebase deploy --only hosting,firestore:rules --project vibe-glossary
```

## For teachers: assigning VibeGlossary as class work

Students visit [vibe-glossary.web.app](https://vibe-glossary.web.app), explore topics, take quizzes, and earn badges. No account is needed; progress is stored in the browser.

**Class bar (minimum for credit):** reach Tinkerer level (200 points) through exploration, prompt use, and checkpoint quizzes.

**How students submit proof:**

1. Open the VibeScore breakdown (click the score pill in the top nav).
2. Click "Class proof".
3. Copy the proof link or proof text.
4. Paste into Canvas, a Google Form, or whatever you use for submissions.

**What you see as an instructor:** open the proof link in your browser. It shows the student's VibeScore, level, badges earned, date, and whether they met the class bar. The score is backed by quiz integrity checks (time floors, cooldowns, variant rotation) so it reflects genuine learning, not speedrunning.

## Versioning

This project uses [Semantic Versioning](https://semver.org/). See [CHANGELOG.md](./CHANGELOG.md) for release history.

## License

[MIT](./LICENSE) © Ray Villalobos
