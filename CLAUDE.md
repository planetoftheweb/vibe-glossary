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
- Always let the user preview locally before deploying to production.
