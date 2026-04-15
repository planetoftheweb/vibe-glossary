# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/rayvillalobos/vibe-glossary/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/rayvillalobos/vibe-glossary/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/rayvillalobos/vibe-glossary/releases/tag/v0.1.0
