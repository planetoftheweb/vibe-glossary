# VibeGlossary — Project Instructions

## Git workflow

- **Commit after every completed task.** When you finish what the user asked for (a feature, fix, refactor, etc.), stage the relevant files and commit with a conventional commit message. Don't wait to be asked.
- **Push every 2–3 commits**, or immediately after anything important (deploys, releases, end of a work session). Keep GitHub current.
- **Never commit `.env` or secrets.** Always check `git status` before staging.
- **Use conventional commits**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.

## Deployment

- Firebase project ID: `vibe-glossary` — always use `--project vibe-glossary` flag.
- Use `/deploy` for full deploy pipeline (lint → build → version → changelog → commit → push → release → firebase).
- Site: https://vibe-glossary.web.app

## Code style

- Big, readable fonts on desktop. Compact on mobile. Fill the viewport — don't leave empty space.
- **Compact pattern previews** (batch-2 glossary demos): body text at least **`text-sm`**, comfortable row padding (`py-3`+), touch targets **≥44px** where controls exist. Avoid `text-[10px]` / microscopic UI — previews must teach at a glance; illegible stubs are worse than fewer pixels.
- Always let the user preview locally before deploying to production.

## Teaching audience (glossary + demos)

Readers may be **new to “vibe coding”** (describing UI in plain language for tools to build). Optimize for that:

- **Definitions** should answer “what is this and when do I use it?” without assuming React or design-system trivia.
- **Spell out acronyms and insider terms on first use**, or replace with plain words: e.g. “accessibility” instead of “a11y”; “what you see is what you get (WYSIWYG)” once; “hex color code” before “#RRGGBB”.
- **Vibe tips** can name libraries or HTML patterns, but add a few words of *why* (“so keyboard users can operate it”).
- **Comparisons** (“X vs Y”) should use full terms so a beginner can map them to product language.
- **Previews** should reinforce the definition: labels readable at **`text-xs` minimum** for chrome, **`text-sm`+** for explanatory copy; align content consistently (centered column, `PREVIEW.formNarrow` where forms appear).
