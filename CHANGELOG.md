# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/planetoftheweb/vibe-glossary/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/rayvillalobos/vibe-glossary/releases/tag/v0.1.0
