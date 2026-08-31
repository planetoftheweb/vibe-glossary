# DESIGN.md

Visual contract for VibeGlossary. Judge the UI against this file. Interaction, type scale, spacing, components, motion, tooltips, and destructive patterns follow the VibeGlossary teaching system. Fonts and colors are wired into the app through `index.html`, Tailwind, and shared CSS. Do not invent tokens or create page-specific type systems.

Site: https://vibe-glossary.web.app

Also read `CLAUDE.md` for teaching voice. That file wins on beginner copy.

## Design philosophy

A teaching glossary for people new to vibe coding. Big type on desktop. Compact on mobile. Fill the viewport. Live demos must be readable at a glance. Chrome stays quiet zinc. Color is for the active category or cluster, not for decoration on every row.

**This product is:** _clear_ · _readable_ · _plain-spoken_ · _high-contrast_ · _patient with beginners_

**This product is NOT:** _punk_ · _electric red/yellow_ · _corporate SaaS gray mush_ · _tiny demo stubs_

When a visual choice would make a beginner squint or assume design-system trivia, flag it.

## UX principles

- **Do not make people think about the interface.** The next useful action should look like the next useful action. Three obvious steps beat one ambiguous shortcut.
- **Design for scanning.** Users notice hierarchy, grouping, labels, and contrast before they read sentences. A page should make sense from its headings and controls alone.
- **Make interactive things look interactive before hover.** Shape, placement, text, and focus treatment carry the affordance. Hover may confirm an action, but it cannot be the only clue.
- **Clarity beats rigid consistency.** Reuse primitives by default. Break a pattern only when the result is materially clearer, then document the reason.
- **Remove noise before adding decoration.** One job per section. Cards exist when the card is the interaction or a real content boundary, not to fill empty space.
- **Keep instructions brief and timely.** Put one or two sentences beside the action or example they explain. Do not compensate for a confusing control with a paragraph elsewhere.
- **Keep feedback close to the action.** Validation, permission explanations, and immediate confirmations appear inline. Toasts are for background, cross-page, or delayed events with no visible anchor.
- **Protect the user's goodwill.** Never hide needed information, punish valid input formatting, erase entered data after an error, or block progress with an unskippable lesson.
- **Bounded choices stay visible.** If a small set of options fits, show it. Do not hide it in a dropdown or clip the final option inside an unscrollable rail.

## Color palette

Use the Tailwind classes already in the app for shared chrome. A teaching studio may use local CSS variables to keep its accent and surfaces coherent, but those variables map back to the zinc and category palette. Never introduce MVPunk `--color-primary` / `--color-cta` or a second brand system.

### Chrome (theme-aware)

| Role | Light | Dark | Tailwind |
|---|---|---|---|
| Page | `#ffffff` | `#09090b` | `bg-white` / `dark:bg-zinc-950` |
| Preview well | `#fafafa` | `#18181b` | `bg-zinc-50` / `dark:bg-zinc-900` |
| Raised card | `#ffffff` | `#27272a` | `bg-white` / `dark:bg-zinc-800` |
| Body text | `#18181b` | `#f4f4f5` | `text-zinc-900` / `dark:text-zinc-100` |
| Headings | `#18181b` | `#ffffff` | `text-zinc-900` / `dark:text-white` |
| Helper | `#71717a` | `#a1a1aa` | `text-zinc-500` / `dark:text-zinc-400` |
| Muted / disabled | `#a1a1aa` | `#71717a` | `text-zinc-400` |
| Border | `#e4e4e7` | `#27272a` / `#3f3f46` | `border-zinc-200` / `dark:border-zinc-800` or `zinc-700` |
| Theme color / meta | | `#09090b` | `index.html` `theme-color` |

Dark is the default (`darkMode` starts true). Both modes must work.

### Actions (site accent, not category color)

| Role | Value | Tailwind | Use |
|---|---|---|---|
| Primary | indigo 600 | `bg-indigo-600 text-white hover:bg-indigo-500` | The one real action on a screen (copy prompt, confirm, signed-in chip) |
| Primary text | indigo 500 / 400 | `text-indigo-500 dark:text-indigo-400` | Links, active chrome when no category is set |
| Danger | rose 500 | `text-rose-500` / `bg-rose-50` | Destructive rows only |
| Toast | zinc 900 on white text | `bg-zinc-900 text-white` | Global toasts |

### Category and cluster accents

Category color lives in `src/data/categories.jsx` and cluster color in `src/data/buildLiteracy.js`. One accent means the current category or cluster (dot, eyebrow, gradient wash at low opacity). Do not tint every card a different mood. Do not invent a tenth palette.

Glossary: overlays violet, inputs cyan, layout emerald, navigation amber, feedback rose, data blue, forms purple, interactions orange, marketing pink, motion lime.

Build clusters reuse the same idea (indigo, fuchsia, amber, emerald, sky, blue, orange, rose, purple, teal).

**Contrast:** every text/background pair must meet WCAG AA (4.5:1 body, 3:1 large). Zinc-400 on zinc-950 is the floor for helper text. Do not pair `text-xs` with weaker-than-muted color.

## Typography

### Font families

- **Display and headings:** Hubot Sans Variable, optically weighted from 650 to 800. Tailwind `font-display`. Use it only for real page titles, studio headlines, section headings, and prominent numeric milestones.
- **Body and UI:** Poppins, weights 400 to 900. Tailwind `font-sans`. Use it for definitions, controls, navigation, buttons, teaching copy, and labels.
- **Code and technical content:** Source Code Pro, weights 400 to 700. Tailwind `font-mono`. Use it for prompts, code, keyboard hints, values, and technical readouts.
- Hubot Sans is self-hosted through `@fontsource-variable/hubot-sans`; Poppins and Source Code Pro load once in `index.html` with `display=swap`, Google Fonts preconnects, and explicit local fallbacks. Do not add a second display, body, or monospace family in a feature stylesheet.
- Headline weight follows rendered size. Poster-size display can use 800; normal page headlines use 750 to 775; headings below about 40px use 650 to 700. Reduce the headline weight one step on narrow screens. Body weight is normally 400 or 500. UI emphasis uses Poppins 600 to 800.
- Hubot needs gentle optical tracking, not blanket compression. Use about `-0.02em` above 56px, `-0.015em` from 40 to 55px, `-0.008em` from 24 to 39px, and neutral tracking below that. Do not go tighter than `-0.025em` outside an intentional poster or decorative specimen.
- Paragraphs, definitions, buttons, labels, navigation, card copy, status messages, and teaching explanations stay Poppins even when the markup uses `strong` or a small heading element. Short tracked uppercase headings are interface labels, not display headlines.
- No Instrument Sans, Instrument Serif, IBM Plex Mono, Georgia, Mona, Space Grotesk, or default system font as the intended face. A system font is a network-failure fallback, not the design.

### Scale

| Role | Size | Line height | Weight | Use |
|---|---:|---:|---:|---|
| Display | 56px and up | 1.05 | 800 | Welcome and large teaching moments |
| H1 | 40 to 55px | 1.1 | 750 to 775 | Page title |
| H2 | 31 to 39px | 1.15 | 700 to 750 | Section or studio headline |
| H3 | 25 to 31px | 1.2 | 700 | Subsection |
| H4 | 20 to 25px | 1.25 | 650 to 700 | Card or panel title |
| Lead | 18 to 20px | 1.55 | 400 to 500 | Definition and studio introduction |
| Body | 16px | 1.6 | 400 to 500 | Default running and interface copy |
| Helper | 14px | 1.5 | 400 to 600 | Secondary explanation and metadata |
| Caption | 12 to 13px | 1.4 | 600 to 700 | Short uppercase labels, badges, and keyboard hints only |
| Mono | 14 to 16px | 1.55 | 400 to 600 | Prompts, code, and technical detail |

Use `clamp()` for large titles so desktop titles stay expressive and mobile titles fit without clipping. Fill the viewport. Do not leave a tiny centered column on a wide window.

### Minimum readable sizes

- Running copy, definitions, and controls: 16px or larger.
- Main glossary studio introductions: 18 to 20px.
- Preview teaching sentences, option explanations, closing lesson notes, and scene body copy: 16px.
- Helper text: 14px minimum.
- Chrome labels: 12 to 13px minimum. They must be short, uppercase, and tracked. Never use caption size for a sentence.
- Code samples are 14px minimum on compact screens and 16px when space allows.
- Nothing renders below 12px. No `text-[10px]`, no squeezed exceptions.
- If a demo only works at microscopic type, the demo is wrong. Cut chrome or give it room.
- Never pair the smallest permitted size with the weakest text color. Caption text uses helper contrast or stronger.

Inputs stay at least 16px so iOS Safari does not zoom.

### Reading measure and composition

- Running text stays between 50 and 75 characters per line, with about 66 as the target and 80 as the hard ceiling.
- A readable measure must still look composed. Center a standalone text block, or use the remaining width for a live preview, comparison, progress, or navigation context.
- A tall sibling panel with little content is a layout bug. Shrink it, fill it with the content that is coming, or remove it.
- Headings use balanced wrapping. Paragraphs use pretty wrapping when supported.

## Spacing scale (4px base)

Stick to Tailwind spacing. No 13px, 17px, or 19px.

| Token | Value | Use |
|---|---|---|
| `1` | 4px | Hairline |
| `2` | 8px | Tight inline |
| `3` | 12px | Control padding |
| `4` | 16px | Default block |
| `5` / `6` | 24px / 32px | Section |
| `8` / `10` | 48px / 64px | Large gaps |

Definition pane uses `p-5 lg:p-10 xl:p-12`. Keep that breath on desktop.

## Border radius

| Token | Use |
|---|---|
| `rounded-lg` | Icon buttons, small inputs, toasts |
| `rounded-xl` | Cards, demos, menus |
| `rounded-2xl` | Large preview frames, welcome blocks |
| `rounded-full` | Pills, prev/next circles, dots |

## Motion

Existing keyframes live in `src/styles/animations.css`: fade 200ms, zoom 200ms, slide 300ms, modal 350/450ms. Honor `prefers-reduced-motion: reduce` (already wired for welcome and modal). Do not add motion that cannot be turned off.

## Loading and layout stability

- Reserve space for images, asynchronous panels, and late content with dimensions, `aspect-ratio`, or a meaningful `min-height`. Text a learner is reading must not jump.
- Use skeletons shaped like the arriving content for page and panel loading. Use a spinner only for a short, control-level wait.
- A clicked button owns its waiting state. Disable it, update its label or indicator inline, and prevent double submission.
- Show progress for waits longer than about 400ms. Past about 10 seconds, provide cancellation or explain that the work will finish in the background.
- VibeGlossary does not currently depend on shadcn/ui. Reuse the existing React and Tailwind primitives. Borrow accessible shadcn patterns when they improve behavior, but do not add the library just for visual styling.
- If charts become a product dependency, choose one chart wrapper and theme it from the existing category and zinc palette. Do not mix charting libraries.

## Component primitives

Repeated interactions are one component, reused. A second hand-built version of an existing card, option row, picker, confirmation, or loading state is a bug unless the content requires different behavior.

### Buttons

- **Primary:** `bg-indigo-600 text-white`, min-height 44px. One per screen.
- **Ghost / icon:** zinc border, no fat labeled pill on dense chrome. 44px is the hit box. Visual may be 32 to 40px (`w-8 h-8` circles need padding or a larger hit area).
- **Destructive:** rose. Two clicks. Second click names what goes. Undo or a short disarm window.
- Hover, focus ring, disabled at 40% opacity. Never `outline: none` without a replacement ring.

### Icon actions and tips

- Lucide only. Stroke inherits `currentColor`.
- Icon-only controls need an in-app hover and focus tip (the existing `group-hover` card), not a native `title=`.
- The tip is decorative. The control carries `aria-label`.

### Inputs

- Zinc border, `rounded-lg` or `rounded-xl`. Focus uses indigo (`focus:border-indigo-500`).
- Visible label or `aria-label`. Placeholder is not a label.
- Errors say what happened and how to fix them. Color plus text.

### Cards and panes

- Two-pane desktop: definition on the left, live preview on the right. Drag handle persists width.
- Below `lg`, stack. Mobile uses an info / preview toggle, not two skinny columns.
- Cards use zinc borders, not a new wash per item.

### Teaching studios

- Every studio headline names the specific lesson or its payoff. Never reuse a cluster-level headline across unrelated topics. A learner scanning headlines alone should still understand how each page differs.
- A page already has a definition pane. Do not add a second vertical control rail beside the live lesson. Studio controls sit above the stage, then collapse from three columns to two and one using the studio container width.
- Every glossary studio teaches one observable loop: name the first control to change, state what to do in the live example, tell the learner what visual or behavioral change to watch for, then confirm what changed. A polished sandbox without this loop is not a lesson.
- Define unfamiliar terms in the option explanation before using them as labels elsewhere. A learner should not need to understand phrases such as focus trap, backdrop, one-time password, or drag state before starting the exercise.
- When the concept is an input, the live scene uses the real interaction. People type into code fields, drag or choose real files, move sliders, select choices, and use the keyboard. A timed animation may demonstrate a visual state, but it cannot replace the primary interaction.
- Change one choice at a time, use the example, then turn the choice off and repeat. Keep the cause, action, and result together in the studio note so learners do not have to remember instructions from another pane.
- Put the "Try this" instruction before the live example in reading and focus order. A learner should know what to do before reaching the controls.
- Keep one explanation per glossary page. The definition pane owns the plain-language explanation; the studio keeps its teaching headline, instructions, controls, and feedback without repeating the definition.
- Size from the preview pane, not the browser viewport. Build Literacy concept studios may grow to `1480px` when the pane has room. Hiding the definition pane must give that width back to the lesson.
- Keep the stage full-width beneath its controls. The interactive scene is the lesson, not a thumbnail competing with setup chrome.
- Instructional introductions use 18 to 20px. Option explanations, handoff copy, teaching notes, and live-scene body copy use 16px. Helper metadata may use 14px. Reserve 12 to 13px for short uppercase labels and status chrome only.
- Narrow decisions respond to the studio's container. A wide browser with an open definition pane is not the same layout as a wide browser with that pane hidden.

### Dropdowns

- Prefer the existing menu pattern over native `<select>` chrome.
- Esc and outside click close.

### Toasts

- Bottom or top-right, `bg-zinc-900 text-white`. Routine confirmations dismiss in about 3 seconds. Progress coaching may stay 5 to 7 seconds so the learner can read the points and next-level requirement.
- Local outcomes stay next to the control. Toasts are for things with no on-screen anchor.

### Modals

- Scrim. Esc closes. Click outside closes. Focus the first control. Reduced-motion skips the zoom.

### Empty states

- Product collections use one small Lucide or drawn SVG, one sentence saying what belongs there, and one action that creates the first item.
- Teaching examples use one sentence and the direct next step. No stock illustration and no giant "add your first" button in a lesson.
- Search and filter empties name what was searched and offer a reset.

## Iconography

Lucide React only (`lucide-react`). Sizes 14 / 16 / 20 / 24 / 32. No mixed sets.

## Accessibility

- WCAG AA contrast on the zinc/indigo tokens above.
- Visible focus ring.
- 44 × 44 px minimum tap target.
- Honor reduced motion.
- Never color alone.
- Spell out jargon on first use (see `CLAUDE.md`).

## Tone and voice (UI copy)

- Teach beginners. Answer "what is this and when do I use it?"
- Spell out acronyms on first use. "Accessibility" not "a11y" until defined.
- Active voice. Short sentences. Buttons name the result ("Copy prompt").
- Errors say what happened and how to fix them.
- No em dashes in user-facing copy. Use commas, periods, or parens.
- Do not invent features in the UI.

## Layout

- Desktop fills the window. Preview grows. Words stay a readable measure (about 50 to 75 letters on definition copy; cap with `max-w` in rem if `ch` runs long in the body font).
- Stack below about 768 / `lg`. Do not keep two panes on a phone.
- Titles and tags wrap. Do not clip to half a word.
- Desktop is a first-class surface. At 1024px and above, use reclaimed width for the lesson, comparison, or context instead of letterboxing the whole app into a narrow column.
- Verify layouts at 320px, 768px, 1024px, and a wide desktop. Touch targets remain at least 44px and the page never scrolls horizontally.

## Visual QA gate

Every layout, theme, or teaching-studio change gets a rendered browser pass before it is called complete:

- Capture the affected screen before and after the change.
- Check the definition pane open and hidden so reclaimed width is real.
- Check a wide preview and a constrained preview. Verify container breakpoints, not only viewport breakpoints.
- Check dark and light mode. A theme is incomplete if the lesson surface remains hardcoded to the other mode.
- Inspect computed font families, weights, tracking, and sizes. Hubot Sans Variable, Poppins, and Source Code Pro must be loaded rather than silently falling back. True headlines use Hubot with the optical weight and tracking scale above; normal copy and UI stay Poppins. Sentences meet the 16px floor, studio introductions are 18 to 20px, and only short labels may be 12 to 13px.
- Verify keyboard focus, scrolling, the last option in each control, and the absence of horizontal page overflow.
- Check browser console errors, run the focused tests for affected behavior, and run the production build.

## Implementation note

Do not reinvent. Tokens are the Tailwind zinc / indigo / category classes already in the repo. If you need a new color, ask. Category accents stay in `src/data/categories.jsx` and `src/data/buildLiteracy.js`.
