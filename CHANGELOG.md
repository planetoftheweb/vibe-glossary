# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.8.0] - 2026-04-19

### Added
- **Build Literacy section** — a parallel teaching surface that mirrors the UI Glossary's two-pane layout but covers the *why* and *how-to-talk-to-an-AI* of vibe coding. 105 topics across 7 clusters (Web Foundations, Engineering, Auth & Security, Product, Design Language, Spec & Process, AI Literacy), each with starter + example prompts, mnemonics, sibling Compare chips, dockable left pane, accordion long-form details, dynamic per-cluster color theming, and the same responsive icon-only navigation collapse as the UI Glossary
- **VibeScore system** — a single learning score that rewards understanding over clicks, with per-tier points (Visited 1, Used 2, Passed 5, Mastered 10, Retained +5 monthly) and a Path bonus (+25). Includes the score pill in the top bar, a full breakdown modal showing UI Glossary vs Build Literacy sub-scores, and a six-rung level ladder (Lurker → Scroller → Tinkerer → Shipper → Polyglot → Vibe Coder)
- **Quiz integrity rules** — 4-second time floor, 90-second ceiling, 30-minute cooldown after a counted pass, rotating question variants, and mastery requires two clean passes in different browser sessions on different question variants. Wrong answers never lose points
- **Per-topic Tier Badge** showing the highest learning tier achieved (Visited / Used / Passed / Mastered / Retained)
- **AI Literacy cluster** (12 topics) — LLMs, tokens, prompts/roles, sampling parameters, multimodal, mixture of experts, agents, tool calling, MCP, RAG, fine-tuning vs prompting, hallucinations and evals
- **Git topics** added to the Engineering cluster — Conventional Commits, merge vs rebase, merge conflicts, tags/releases/changelogs
- **Social share popover** (`ShareAchievement`) — earn a path badge or hit a level and a Share button surfaces the message pre-filled with score/level/path. Posts to X, LinkedIn, Bluesky, Facebook, Reddit, Email; falls back to Copy text + link, and uses `navigator.share` on mobile when available
- **Unified search** spanning UI Glossary components and Build Literacy topics in one ⌘K palette
- **Cheat Sheet** (⌘/) now lists Build Literacy clusters alongside UI categories
- **Welcome Screen** rebuilt to surface both UI Glossary and Build Literacy as equal entry points
- **Resizable two-pane layout** with drag-to-resize handles, persisted in `localStorage`, working consistently across UI Glossary and Build Literacy
- **Learn Mode parity for Build Literacy** — quizzes, learning paths with end-of-path quizzes (80% to earn the badge), Surprise Me, Build Literacy Index
- **Cross-cluster carousel navigation** in the left pane — Previous/Next now flow across category and cluster boundaries on both surfaces
- **Long-form details accordion** for every UI Glossary and Build Literacy entry, with paragraphing for readability
- **5 additional UI Glossary entries** for a total of 98 components

### Changed
- **Beginner-friendly copy pass** across the entire UI Glossary — definitions rewritten to avoid jargon, em dashes removed everywhere, with a one-line summary sentence followed by an expandable detailed explanation
- **Build Literacy "Talk to AI" prompts** split into two parts — a generic starter prompt that asks the AI to interview the learner, plus a practical example they can adapt
- Build Literacy navigation refactored to use the same cluster + topic dropdown pattern as the UI Glossary's category + component dropdowns, including responsive icon-only collapse below `lg`
- Per-cluster color palettes for Build Literacy mirror the UI Glossary's dynamic color theming so accents shift as the learner moves between clusters
- Top-nav pill labels cap their max width and truncate long topic titles so the second dropdown stays compact
- Minimum readable type sizes — replaced every `text-[10px]` with `text-xs` or larger
- Removed the unused full-bleed black header bar and reclaimed the vertical space
- Numerous demo previews polished (color picker, multi-select, hover card, modal entrance animation, sticky table header, activity stream, tree grid, line chart, toggle button, time picker, and others)

### Fixed
- Build Literacy "Next topic" tooltip was being clipped by the side panel; anchored to the right edge so it expands inward
- Map Embed demo now uses a live OpenStreetMap iframe with attribution instead of a static placeholder

### Removed
- **Action Sheet** glossary entry — mobile-specific pattern that did not fit the current scope; quiz question replaced with a Drawer one and slice math made elastic to total component count
- **Image Cropper** and **Sparkline** glossary entries (cleanup)
- "Vibe tip" lightbulb line from glossary and path views (the same guidance now lives inside the longer details accordion)

## [0.7.0] - 2026-04-18

### Added
- **Firestore-backed content** — `useGlossary()` and `useCategories()` hooks read from Firestore `components` / `categories` collections with local `GLOSSARY_DATA` / `CATEGORIES` as instant fallback (no loading flash)
- **Lazy-loaded demo components** — 44 demo components now code-split into separate chunks (~1–7 kB each) via `React.lazy()`, dramatically shrinking the initial bundle as the glossary scales
- `CATEGORY_ICON_REGISTRY` maps Firestore-safe icon IDs to Lucide components, so categories can be edited in Firestore without touching code
- Firestore security rules (`firestore.rules`) — public read, no writes
- Seed script (`scripts/seedFirestore.js`) seeds both `components` and `categories` collections via `firebase-admin`
- Top header background now carries a subtle gradient tint matching the active category color

### Changed
- `src/data/glossary.js` split: demo imports and `demo:` fields moved into a dedicated `src/data/demoRegistry.jsx` with dynamic imports
- `useExploreMode` now accepts a dynamic `categories` parameter (derives `allIds`/`total` via `useMemo`) instead of importing module-level constants
- Progress pill in the desktop top bar is now icon-only — the count label was duplicating what the hamburger progress ring already shows
- Mobile hamburger button shows a progress ring (no number); desktop hides the ring since the dedicated progress pill already renders it
- Dropdown panels got thicker (2px) borders and a subtle ring for contrast against the tinted header

### Fixed
- Header `overflow-hidden` (from the new gradient overlay) was clipping nav dropdowns — moved `overflow-hidden` onto a dedicated gradient wrapper so dropdowns can extend below the header again

## [0.6.0] - 2026-04-18

### Added
- **Learn Mode phase 1** — sibling compare pills, glossary index, inline "Compare this to…" teaching row
- **Learn Mode phase 2** — Quiz Me mode with mastery tracking (visited → copied → mastered) and progress ring in header
  - Demo-to-definition matching quiz (swap from name-recall to a visual/interaction prompt)
  - Inline "Quiz me" toggle next to the Definition label and a full Learn Mode switch in the menu
- **Learn Mode phase 3** — guided learning paths with badges
  - PathsLauncher and PathView for stepping through curated component tracks
  - Progress badges awarded as paths are completed
- Top-bar navigation pills for Learning / Progress / Help on desktop (dock into the header with progressive collapse as the viewport narrows)

### Changed
- Teaching row restyled as pill chips; vibeTip moved below the compare row for scannability
- Menu sections regrouped so Learn Mode lives next to Progress and Help

### Fixed
- Desktop↔mobile breakpoint is now reactive — resizing the window below 1024px no longer leaves a stale 40% inline width on the info panel (which had been cramping the Spec Generator into a narrow column)
- Body top padding now matches the taller mobile header (breadcrumb row) below `md` (768px), so the Definition / Live Preview toggle is no longer hidden behind the fixed header
- PathView now fills vertical space on taller viewports
- Lint no longer trips on stray worktree files under `.claude/worktrees/`

## [0.5.0] - 2026-04-17

### Added
- Cheat sheet overlay triggered by `Cmd+/` (or `Ctrl+/`)
  - 9 category cards in a responsive grid — click to jump to that category's first component
  - Keyboard shortcuts reference panel (`⌘K`, `⌘/`, `Esc`)
  - Backdrop click and `Esc` both dismiss the overlay

## [0.4.1] - 2026-04-17

### Added
- Vitest test suite with 541 tests across 7 source files (`npm test`)
  - `useExploreMode` hook — state machine logic, localStorage persistence, `surpriseMe`, `progress`, `resetProgress`
  - `CATEGORIES` data integrity — shape, 9 categories, 44 unique item IDs, `CATEGORY_COLORS` completeness
  - `GLOSSARY_DATA` data integrity — all 44 entries validated for required fields, prompt structure, and scaffold content
  - `PromptBuilder` — prompt text assembly (base, options, requirements, scaffold), option toggle callbacks, framework picker
  - `ExploreBar` — `findCategory` resolution, progress display, Surprise Me, expand/collapse panel, item pill clicks, Reset
  - `ConfigToggle` — option rendering, active state class, `onChange` callback
  - `App` — dark-mode class on `documentElement`, WelcomeScreen show/hide via localStorage, panel clamp formula

## [0.4.0] - 2026-04-16

### Added
- Footer with app version, component count, and links to the GitHub repo and CHANGELOG
- Scaffold toggle in the Spec Generator — inserts a runnable code stub for the selected framework
- Requirements toggle in the Spec Generator — appends accessibility and behavior requirements
- Framework picker (shadcn/ui, Headless UI, Radix, Plain HTML) when the Scaffold toggle is on
- Scaffolds and requirements data for all 44 glossary entries

### Changed
- Prompt output now uses Markdown-style sections (`## Component Spec`, `## Requirements`, `## Scaffold`) and preserves whitespace
- Clipboard copy prefers `navigator.clipboard.writeText` with a legacy `execCommand` fallback
- Demo preview area centers content and no longer shows the "Live Preview" badge or border

## [0.3.0] - 2026-04-15

### Added
- Resizable info panel with drag handle (width persists in localStorage)
- Previous/Next component navigation at bottom of info panel
- Mobile view toggle (Definition ↔ Live Preview tabs)
- Custom styled mobile dropdowns for Category and Component selection
- Favicons for all platforms (16, 32, 180, 192, 512px + mstile)
- Open Graph and Twitter Card social meta tags with branded OG image
- Web app manifest (PWA-ready) and browserconfig.xml
- ESLint flat config for ESLint 9

### Changed
- Bumped all font sizes significantly for desktop readability (titles, body, labels, buttons)
- Responsive typography: large on desktop (lg/xl), compact on mobile (sm/base)
- Info panel width now percentage-based (40%) instead of fixed pixels
- Mobile buttons use smaller padding for better touch targets
- Improved page title and meta description for SEO

## [0.2.0] - 2026-04-15

### Added
- 22 new interactive component demos across 4 new categories (44 total):
  - **Data Display**: Table/Data Grid, List/Feed, Carousel, Tree View, Calendar, Stat Card/KPI
  - **Forms**: Date Picker, Command Palette, Tag Input, Rich Text Editor, Rating, Stepper/Wizard
  - **Interactions**: Context Menu, Drag & Drop, Lightbox, Infinite Scroll
  - **Marketing**: Hero Section, Pricing Table, Testimonial, FAQ
- Explore Mode with localStorage-based progress tracking
  - Component of the Day (deterministic daily pick)
  - Surprise Me button (random unvisited component)
  - Visit and prompt-copy tracking with progress ring
  - Expandable progress panel with per-category breakdowns
- Welcome screen with hero image and 9 category cards

### Changed
- Replaced sidebar navigation with top toolbar dropdowns (Category + Component)
  - Inline search with Cmd+K shortcut and fuzzy filtering
  - Mobile-responsive category pill bar
- Per-category color system throughout the app (9 colors)
  - Colored accents in Definition panel, Spec Generator, and Live Preview badge
  - Subtle gradient glow backgrounds in preview area
- Bumped font sizes for better readability
- Welcome button replaces Get Started (returns to welcome screen)
- Deployed on Firebase Hosting (migrated from Render)

### Removed
- Sidebar navigation component
- Top nav filter tabs (All/Components/Patterns/Showcase)

## [0.1.0] - 2026-04-15

### Added
- Initial release of VibeGlossary
- 20 interactive UI component demos across 5 categories:
  - **Overlays**: Modal, Drawer, Popover, Tooltip, Toast
  - **Inputs**: Select/Combobox, OTP Input, Switch, Dropzone, Radio Group, Slider
  - **Layouts**: Sidebar, Card, Masonry Grid
  - **Navigation**: Tabs, Breadcrumbs, Accordion
  - **Feedback**: Alert, Empty State, Badge, Avatar Group, Timeline, Skeleton, Progress
- Live preview panel with configurable options per component
- Spec Generator (Prompt Builder) for generating AI prompts
- Collapsible sidebar with category navigation and search
- Dark/light mode toggle with persistent state
- Keyboard shortcut Cmd+K to focus search
- Filter tabs (All, Components, Patterns, Showcase)
- Modular Vite + React + Tailwind CSS project structure
- MIT License
- Deployed on Render

[Unreleased]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.8.0...HEAD
[0.8.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/rayvillalobos/vibe-glossary/releases/tag/v0.1.0
