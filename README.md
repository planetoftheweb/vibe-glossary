# VibeGlossary

An interactive UI component glossary designed for vibe coding with AI tools. Browse 20+ live component demos, toggle configuration options, and generate ready-to-use AI prompts.

## Features

- **20+ interactive demos** across Overlays, Inputs, Layouts, Navigation, and Feedback
- **Spec Generator** — toggle options to build component specs and copy AI prompts
- **Live preview** — every component is interactive, not just static screenshots
- **Dark/light mode** with class-based Tailwind theming
- **Keyboard shortcut** Cmd+K to focus search
- **Filter tabs** — All, Components, Patterns, Showcase

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)

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
│   ├── layout/       # TopNav, Sidebar
│   ├── ui/           # ConfigToggle, PromptBuilder
│   └── demos/        # One file per component demo
│       ├── overlays/
│       ├── inputs/
│       ├── layout/
│       ├── navigation/
│       └── feedback/
├── data/
│   ├── categories.jsx  # Sidebar nav structure
│   └── glossary.js     # Component metadata + demo imports
├── styles/
│   └── animations.css
├── App.jsx
└── main.jsx
```

## Deployment

This project is deployed on [Render](https://render.com/) as a static site.

**Build command:** `npm run build`  
**Publish directory:** `dist`

## Versioning

This project uses [Semantic Versioning](https://semver.org/). See [CHANGELOG.md](./CHANGELOG.md) for release history.

## License

[MIT](./LICENSE) © Ray Villalobos
