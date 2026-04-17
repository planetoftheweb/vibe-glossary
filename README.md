# VibeGlossary

An interactive UI component glossary designed for vibe coding with AI tools. Browse 44 live component demos, toggle configuration options, and generate ready-to-use AI prompts.

## Features

- **44 interactive demos** across 9 categories: Overlays, Inputs, Data Display, Forms, Layouts, Navigation, Interactions, Feedback, Marketing
- **Spec Generator** — toggle options, add Requirements and Scaffold code (shadcn/ui, Headless UI, Radix, or Plain HTML), and copy the assembled prompt
- **Live preview** — every component is interactive, not just static screenshots
- **Explore Mode** — Component of the Day, Surprise Me, and progress tracking
- **Resizable panels** — drag to resize the info/preview split
- **Previous/Next navigation** — step through all components sequentially
- **Dark/light mode** with class-based Tailwind theming
- **Keyboard shortcut** ⌘K to search components
- **Responsive** — mobile view toggle, custom dropdowns, adaptive typography
- **Social sharing** — Open Graph and Twitter Card meta tags
- **Footer** — version, component count, and links to the repo and changelog

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [Firebase Hosting](https://firebase.google.com/products/hosting)

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
```

## Project Structure

```
src/
├── components/
│   ├── layout/         # TopNav, Footer
│   ├── ui/             # ExploreBar, PromptBuilder, ConfigToggle
│   ├── WelcomeScreen.jsx
│   └── demos/          # One file per component demo
│       ├── overlays/
│       ├── inputs/
│       ├── data/
│       ├── forms/
│       ├── layout/
│       ├── navigation/
│       ├── interactions/
│       ├── feedback/
│       └── marketing/
├── data/
│   ├── categories.jsx  # Category structure + color system
│   └── glossary.js     # Component metadata + demo imports
├── hooks/
│   └── useExploreMode.js
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
