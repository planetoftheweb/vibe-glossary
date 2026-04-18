# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.7.0...HEAD
[0.7.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/rayvillalobos/vibe-glossary/releases/tag/v0.1.0
