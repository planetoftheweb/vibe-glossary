/**
 * Design language: the shared vocabulary designers, design systems, and
 * Figma docs use, translated for vibe coders. Once you can name a token,
 * a state, a variant, or a density, you can ask an AI for a specific
 * change instead of "make it look better".
 *
 * Voice: friend explaining over coffee. Not a textbook. Spell out every
 * acronym the first time. No em dashes anywhere.
 *
 * `talkToAi` shape:
 *   - starter: generic, fillable prompt with [brackets]. Tells the AI to
 *     ask the user 3-5 focused questions before doing anything, and to
 *     push back if a request seems off. THIS is what they copy.
 *   - example: a worked, real-world version so they see what a
 *     filled-in starter actually looks like.
 *
 * `mnemonic`: the one line they keep when they forget the rest.
 */

export const DESIGN_LANGUAGE_CLUSTER = {
  id: 'design-language',
  title: 'Design language',
  summary:
    'Tokens, scales, states, variants, densities. The vocabulary that lets you ask an AI for "the secondary button at md size" instead of "make it look better".',
  topics: [
    {
      id: 'design-system',
      title: 'Design system vs component library vs UI kit',
      summary:
        'A design system is the whole rulebook (tokens, components, principles, docs). A component library is the code. A UI kit is the Figma file. People mix the three up constantly.',
      details:
        'A design system is the whole agreement: what the colors are called, how spacing works, what a button is, when to use one vs another, and the principles behind every choice. Material Design, Apple Human Interface Guidelines, GitHub Primer, and shadcn/ui are design systems.\n\nA component library is the code that implements the system. shadcn/ui, Material UI, Radix, Chakra, and Mantine are component libraries. You import a Button and get something that already follows the rules.\n\nA UI kit is the Figma (or Sketch, or Penpot) file your designers work from. Same components, but in a tool meant for visual exploration. The three should agree, but they often drift, which is why "the button in Figma is 8px taller than the one on the site" is a real meeting people have.',
      comparison:
        'System = the rules. Library = the code that follows the rules. Kit = the Figma file the designer works in.',
      vibeTip:
        'When you ask your AI for a component, name the system first ("using shadcn/ui, build me..."). It picks better defaults than "build a button".',
      talkToAi: {
        starter:
          'I want to set up a design system for [project]. Before recommending a stack, ask me: 1) the framework (React, Svelte, plain HTML, etc.), 2) whether we already have brand colors and typography or are starting fresh, 3) how much custom design vs out-of-the-box theming we want, 4) the team size and who maintains the system. Then propose the lightest setup that fits (often just shadcn/ui + Tailwind, sometimes Material UI, rarely a from-scratch system) and list the trade-offs of each.',
        example:
          'I want to set up a design system for a small SaaS dashboard built with Next.js. We have a logo and brand color but no typography rules. Solo developer, no designer. Recommend the lowest-maintenance option that still looks polished.',
      },
      mnemonic:
        'System = rules. Library = code. Kit = Figma. Three things, one name people use for all of them.',
      relatedGlossaryIds: ['button', 'card'],
    },
    {
      id: 'design-tokens',
      title: 'Design tokens',
      summary:
        'Named values for the smallest design choices: colors, spacing, font sizes, radii, shadows. "color.primary.500" instead of "#4F46E5" so changing the brand is one edit, not 600.',
      details:
        'A design token is a name for a value. "color.primary.500" maps to "#4F46E5". "space.4" maps to "16px". "radius.md" maps to "8px". Instead of hard-coding the value everywhere, you reference the token. When the value changes, every place that referenced it updates for free.\n\nTokens are the lowest layer of a design system. Components are built on top of them. Themes (light, dark, high-contrast, brand A vs brand B) are different sets of tokens with the same names.\n\nIn Tailwind, your tailwind.config.js theme is your token file. In CSS, custom properties (--color-primary-500: #4F46E5) are tokens. In Figma, color and text styles are tokens. Same idea, different syntax. The point is the indirection: name the choice, not the value.',
      comparison:
        'Hard-coded value = "#4F46E5". Token = "color.primary.500". Variable = the implementation. Token = the contract.',
      vibeTip:
        'Tell your AI "use the existing tokens in tailwind.config.js" before asking for a component. Otherwise you get hex codes that drift from the system.',
      talkToAi: {
        starter:
          'I want to extract design tokens from [our current styles or a Figma file]. Before doing anything, ask me: 1) what the source of truth is (Figma file, existing CSS, or both), 2) the categories I want tokenized (color, spacing, type, radius, shadow, motion), 3) the output format (Tailwind config, CSS variables, JSON for Style Dictionary). Then propose a naming scheme (semantic vs scale-based), generate the token file, and call out any inconsistencies you found in the source.',
        example:
          'Audit the colors in src/styles/*.css and pull them into a tokens.css file as CSS custom properties. Use semantic names (color-bg, color-text, color-primary) plus a scale (50-900). Then update the components to reference the tokens.',
      },
      mnemonic:
        'A token is a name for a value. Change the value once, every component updates.',
      relatedGlossaryIds: ['colorpicker', 'configpanel'],
    },
    {
      id: 'typography-scale',
      title: 'Typography scale',
      summary:
        'A small set of font sizes (and matching line-heights) you use everywhere instead of picking a new size for every text. Common scales: 12, 14, 16, 18, 20, 24, 30, 36, 48.',
      details:
        'Without a scale, every page ends up with text at 13px, 15px, 17.5px, 18px, 19px because someone "just nudged it". A typography scale picks 5-8 sizes and forbids anything else. Suddenly the whole product feels intentional, and a single CSS variable change ripples through everything.\n\nFour properties matter and people only think about one. Size is how big the letters are. Weight is how thick (400 normal, 600 semibold, 700 bold). Line-height (sometimes called "leading") is the vertical space each line takes; for body text aim for 1.4 to 1.6, for headings 1.1 to 1.3. Letter-spacing (also called "tracking") is the horizontal space between letters; small uppercase labels look better with a touch more.\n\nTailwind ships a sensible scale (text-xs, sm, base, lg, xl, 2xl through 9xl) with line-heights baked in. Most projects do not need to invent their own.',
      comparison:
        'Random sizes = visual noise. Scale = visual rhythm. Size, weight, line-height, tracking are four knobs, not one.',
      vibeTip:
        'When the AI gives you "text-[15px]" or "text-[1.05rem]", push back. Ask it to use the scale you already have.',
      talkToAi: {
        starter:
          'I want a clean typography scale for [project]. Before suggesting one, ask me: 1) the vibe (corporate, playful, editorial, technical), 2) the smallest text I need (captions, labels), 3) whether headings should feel tight and confident or airy and friendly, 4) the font family (or "pick one"). Then propose 6-8 sizes with matching weights and line-heights, name them (xs, sm, base, lg...) and show how they map to typical UI uses (body, label, h1, etc.).',
        example:
          'Recommend a Tailwind typography scale for a developer documentation site. Inter for body, JetBrains Mono for code. I need captions, body, lead paragraph, h4 to h1. Tight headings, airy body.',
      },
      mnemonic:
        'Pick a scale. Use it everywhere. Never invent a one-off size.',
      relatedGlossaryIds: ['hero', 'card'],
    },
    {
      id: 'spacing-scale',
      title: 'Spacing scale (the 4 or 8px grid)',
      summary:
        'Multiples of 4 (or 8) for every gap, padding, and margin. So "the spacing between cards" is always one of {4, 8, 12, 16, 24, 32, 48} px, never 7 or 13.',
      details:
        'A spacing scale is the same idea as a type scale, applied to gaps. Pick a base unit (almost always 4px or 8px), then only use multiples. Tailwind\'s default scale is 4px-based: p-1 is 4px, p-2 is 8px, p-4 is 16px, p-8 is 32px. The scale is non-linear at the top (skips 56, 72, etc.) because tiny visual differences stop mattering when things are big.\n\nWhy it works: human eyes notice 1-2px differences in small spacing. If every gap is on the same grid, the page feels calm. If half are on the grid and half are 7px or 13px, the page feels off and nobody can tell you why.\n\nThe trap is "just this one place needs 9px". If you cave once, the scale is dead. Make the AI use the closest scale value and only break the rule with a written reason.',
      comparison:
        'Random px values = chaos. 4/8 grid = calm. The scale should be opinionated and mostly non-overridable.',
      vibeTip:
        'If the AI hands you "gap-[10px]" or "p-[18px]", reply with "use the spacing scale" and the next answer will be cleaner.',
      talkToAi: {
        starter:
          'Set up a spacing scale for [project]. Before suggesting one, ask me: 1) the base unit I want (4px or 8px), 2) the largest gap I am likely to need, 3) whether we are on Tailwind, CSS variables, or both. Then propose the scale with names (xs, sm, md, lg, xl, 2xl), map each name to a value, and call out any place in our existing code that breaks the scale today.',
        example:
          'Audit the padding and gap values in src/components and src/pages. Replace any non-4-multiple values with the closest Tailwind scale step (p-3 instead of p-[14px]). Show me the diff and explain anywhere the closest value would feel visibly different.',
      },
      mnemonic:
        'Spacing on a grid feels intentional. Spacing off a grid feels off, and you cannot say why.',
      relatedGlossaryIds: ['card', 'list'],
    },
    {
      id: 'color-palette',
      title: 'Color palette: brand, neutral, semantic',
      summary:
        'Three layers. Brand (your accent, primary, secondary). Neutral (the grays you use for text, borders, backgrounds). Semantic (success green, warning amber, danger red, info blue).',
      details:
        'Most palettes have three jobs going on at once. Brand colors carry your identity (the indigo of Linear, the purple of Stripe). Neutrals are the gray ramp you use 80% of the time for text and chrome. Semantic colors (success, warning, danger, info) tell users what kind of thing happened, regardless of brand.\n\nEach layer should be a scale (50, 100, 200, ... 900) so you can dial intensity. "primary-50" is the faintest tint for backgrounds, "primary-500" is the brand color, "primary-900" is the darkest variant for text on light. Tailwind\'s built-in palettes (slate, indigo, emerald, amber, rose) are the easy mode, you can mix and match.\n\nDark mode is not just "swap the colors". It usually means lower saturation, slightly different ramps, and rethinking borders (which often disappear). Plan for both modes from the start instead of bolting it on later.',
      comparison:
        'Brand = who you are. Neutral = the gray that does the work. Semantic = success/warning/danger/info.',
      vibeTip:
        'Tell your AI "use the semantic colors for state (success, warning, danger), brand for action (primary buttons, links), neutrals for everything else". It stops painting toasts in your brand purple.',
      talkToAi: {
        starter:
          'Help me build a color palette for [project]. Before recommending colors, ask me: 1) the brand colors I have (or none), 2) the personality I want (corporate calm, energetic, editorial, technical), 3) whether dark mode is required from day one, 4) any accessibility requirements (WCAG AA at minimum). Then propose a brand scale (50-900), a neutral scale, semantic colors for success/warning/danger/info, and an example of a button, alert, and card using only these tokens.',
        example:
          'Build a Tailwind color palette for a fintech dashboard. Brand is indigo. Calm and trustworthy, not flashy. Dark mode required. WCAG AA contrast for all text. Show me the tailwind.config.js extension.',
      },
      mnemonic:
        'Brand = identity. Neutral = workhorse. Semantic = meaning. Three palettes, one product.',
      relatedGlossaryIds: ['colorpicker', 'badge'],
    },
    {
      id: 'component-states',
      title: 'Component states: default, hover, focus, active, disabled, loading',
      summary:
        'Most components have at least six visual states. Skipping any one of them is the difference between "polished product" and "looks like a hackathon project".',
      details:
        'Every interactive component has a default state (just sitting there), a hover state (mouse is over it), a focus state (keyboard tabbed onto it), an active state (currently being pressed), a disabled state (cannot be used right now), and a loading state (working, do not press again). Some also need selected, checked, indeterminate, error, success, and empty.\n\nThe one people skip is focus, and the one that breaks accessibility is focus. Without a visible focus ring, keyboard users have no idea where they are on the page. The browser default ring is fine; do not hide it unless you replace it with something better.\n\nThe other one people skip is loading. After a click, if the button does not change, users click again, and again, and submit the form three times. A spinner, a "Saving..." label, or just a disabled state during the request fixes it.',
      comparison:
        'Default = idle. Hover = mouse near. Focus = keyboard there. Active = pressing. Disabled = no. Loading = working.',
      vibeTip:
        'When the AI builds a component, ask it to show every state in the same file (a States row in the Storybook story). You will catch the missing focus ring before users do.',
      talkToAi: {
        starter:
          'Audit the states for [component or page]. Before changing anything, ask me: 1) the component(s) involved, 2) which interactions are possible (click, hover, keyboard, drag), 3) whether async actions are involved (so loading and disabled matter). Then list the states each component should have, show which are currently missing, and propose the styles (Tailwind classes) for each missing one. Pay special attention to focus rings and loading.',
        example:
          'Audit src/components/SubmitButton.tsx. It currently has default and hover. Add focus (visible ring), active (pressed shade), disabled (muted), and loading (spinner + disabled + label "Saving..."). Show the diff.',
      },
      mnemonic:
        'Default, hover, focus, active, disabled, loading. Six states. Miss any and it shows.',
      relatedGlossaryIds: ['button', 'inputgroup'],
    },
    {
      id: 'variants-sizes',
      title: 'Variants and sizes',
      summary:
        'Variants are flavors of the same component (primary, secondary, ghost, outline, destructive). Sizes are how big (xs, sm, md, lg, xl). Together they replace 47 one-off buttons.',
      details:
        'A button is rarely "a button". It is "a primary medium button" or "a destructive small icon-only button". Variants are flavors that mean different things: primary draws the eye for the main action, secondary is the polite alternative, ghost is invisible until hovered, outline is a quieter primary, destructive warns you that something will be deleted.\n\nSizes are the ladder: xs, sm, md, lg, xl. Most components do not need all five; three is plenty (sm, md, lg). The trick is that variants and sizes are independent: a "destructive sm icon button" and a "primary lg full-width button" are both legal combinations from the same Button component.\n\nWithout this discipline, you end up with PrimaryButton, SmallPrimaryButton, DangerButton, IconButton, BigCTAButton, and they all drift. With it, you have Button with two props (variant, size) and you stop having opinions about button styling, ever again.',
      comparison:
        'Variant = flavor (primary, ghost, destructive). Size = scale (sm, md, lg). One component, two props, all the buttons.',
      vibeTip:
        'When asking the AI for a component, say "with variant and size props that match our existing components". Otherwise it invents PrimaryFooBigButton.',
      talkToAi: {
        starter:
          'Refactor [component name] to use variant + size props instead of separate components. Before changing code, ask me: 1) the variants we currently have (look at PrimaryX, GhostX, DangerX), 2) the sizes (look at SmallX, BigX), 3) whether we use cva, tv, or hand-rolled className concatenation. Then propose a single component with variant and size props, generate the styles for each combination, and migrate the call sites.',
        example:
          'Refactor PrimaryButton, GhostButton, and DestructiveButton in src/components into a single Button with variant ("primary" | "ghost" | "destructive") and size ("sm" | "md" | "lg") props. Use cva. Migrate the existing call sites and run tests.',
      },
      mnemonic:
        'One component. variant prop = flavor. size prop = scale. Stop making PrimaryFooBigButton.',
      relatedGlossaryIds: ['button', 'badge'],
    },
    {
      id: 'density',
      title: 'Density: compact, default, comfortable',
      summary:
        'How much breathing room a component has. A spreadsheet wants compact rows. A landing page wants comfortable. The same Table component should support both.',
      details:
        'Density is how much padding and whitespace a component carries. Compact density crams more on screen (data tables, admin tools, dashboards used all day). Comfortable density gives things room to breathe (marketing pages, settings, anything used occasionally). Default sits in the middle and is what you ship if you do not think about it.\n\nLinear, Notion, GitHub, and most pro tools let users pick density, because power users want compact and casual users want comfortable. You do not have to ship a toggle on day one, but if you tokenize spacing well (see the spacing scale), swapping density later is a config change instead of a rewrite.\n\nDensity affects more than padding. It usually changes font size by one step, line-height, icon size, and the spacing between rows. Get all of those right or "compact mode" looks like "regular mode with smaller padding", which is worse than not having it.',
      comparison:
        'Compact = data dense. Default = the safe middle. Comfortable = breathing room. Power users like compact.',
      vibeTip:
        'If your tool is used 8 hours a day, build compact first and comfortable second. If it is touched once a week, do the opposite.',
      talkToAi: {
        starter:
          'Add density support to [component or app]. Before changing code, ask me: 1) which components need density (often Table, List, Form, but not buttons), 2) the densities we want (compact, default, comfortable, or just two of those), 3) whether density should be global (one toggle for the whole app) or per-component (per-table). Then propose a token-based approach (density tokens that components consume), wire it up for one component as the example, and document how to add it to the rest.',
        example:
          'Add density support to src/components/Table.tsx. Two densities: compact (py-1, text-sm) and default (py-3, text-base). Density is a prop on the Table. Update the storybook story to show both side by side.',
      },
      mnemonic:
        'Compact crams. Comfortable breathes. Default is the middle. Pro tools let you choose.',
      relatedGlossaryIds: ['table', 'list'],
    },
    {
      id: 'elevation',
      title: 'Elevation and shadows',
      summary:
        'Shadows tell users what is floating above what. A flat card sits in the page. A shadowed card hovers above it. A modal casts a big shadow because it is way above everything.',
      details:
        'Elevation is the visual answer to "how far above the page is this thing?". Material Design popularized the term, and most systems now use a small elevation scale: 0 (flat), 1 (raised cards), 2 (dropdowns, popovers), 3 (modals), 4 (tooltips and floating UI). Each level has a corresponding shadow value.\n\nGood elevation tokens combine multiple shadow layers (one tight, one soft, sometimes a colored one) so the result feels real instead of like a fuzzy halo. Tailwind\'s shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl, shadow-2xl is a serviceable scale; design tools like the Tailwind Shadows generator can do better.\n\nDark mode shadows are tricky. Black-on-dark shadows are nearly invisible. Designers often switch to subtle border-tops (lighter than the background) to imply elevation in dark mode, since "lit from above" reads as raised in any color scheme.',
      comparison:
        'Flat = part of the page. Raised = above it. Floating = way above. Shadow encodes the distance.',
      vibeTip:
        'Tell your AI "use the elevation scale" not "add a shadow". Otherwise you get a different shadow on every component.',
      talkToAi: {
        starter:
          'Set up an elevation scale for [project]. Before suggesting one, ask me: 1) the surfaces we have today (cards, popovers, modals, toasts), 2) whether we support dark mode (shadows behave differently), 3) whether shadows should be subtle (Linear-style) or pronounced (Material). Then propose 4-5 elevation tokens (elevation-0 through elevation-4), generate the box-shadow values for each (with a dark mode variant), and show which UI components should use each level.',
        example:
          'Add an elevation scale to tailwind.config.js. 5 levels. Subtle, modern, layered shadows for light mode, switch to a top-border for dark mode. Apply elevation-1 to Card, elevation-2 to Popover, elevation-3 to Modal.',
      },
      mnemonic:
        'No shadow = part of the page. Bigger shadow = floating higher. Use a scale, not one-offs.',
      relatedGlossaryIds: ['modal', 'card', 'popover'],
    },
    {
      id: 'border-radius',
      title: 'Border radius scale',
      summary:
        'How rounded the corners are. Tiny radius (2-4px) feels technical. Medium (8-12px) feels modern. Large (16-24px) feels friendly. Fully rounded (pills) is for buttons and tags.',
      details:
        'Corner radius is one of the strongest "vibe" levers in a design. Sharp corners (0-2px) feel serious and technical (financial dashboards, terminals). Modern modest (8-12px) is the safe default for SaaS in 2026. Soft (16-24px) feels friendly and consumer (fintech apps, social). Pill (rounded-full on short elements) is for tags, badges, and "round" buttons.\n\nA radius scale follows the same logic as spacing and type: pick 4-6 values (none, sm, md, lg, xl, full), use them everywhere, never invent a one-off. Tailwind ships a sensible default scale; you can override it with one tailwind.config edit.\n\nMatching radii to elevation makes shadows feel right. Sharp corners with big shadows look strange. Soft corners with no shadow look bouncy. Bigger radii usually pair with bigger surfaces (a 24px modal, an 8px button).',
      comparison:
        'Sharp = serious. Soft = friendly. Pill = playful. Match the radius to the personality of the brand.',
      vibeTip:
        'Pick one radius for "small things" (buttons, inputs) and one for "big things" (cards, modals). Tell your AI both. It will stop using rounded-md sometimes and rounded-lg other times.',
      talkToAi: {
        starter:
          'Set up a border-radius scale for [project]. Before suggesting one, ask me: 1) the personality of the brand (technical, modern, friendly, playful), 2) the components I have today and which feel inconsistent, 3) whether buttons and inputs share a radius or differ. Then propose 4-5 named radii (none, sm, md, lg, full), map each to a value, and call out which components in the codebase should use which.',
        example:
          'Pick a Tailwind radius scale for a friendly consumer app. Suggest values for none/sm/md/lg/full. Buttons and inputs use md. Cards use lg. Avatars use full. Show me the tailwind.config.js extension.',
      },
      mnemonic:
        'Sharp = serious. Soft = friendly. Pill = playful. Pick a scale and stick to it.',
      relatedGlossaryIds: ['card', 'button'],
    },
    {
      id: 'motion',
      title: 'Motion: duration, easing, choreography',
      summary:
        'Animations have three dials. Duration (how long, usually 100-400ms). Easing (the speed curve, usually ease-out). Choreography (which elements move first vs last).',
      details:
        'Good motion has three properties. Duration: most UI animations live between 100ms (a hover) and 400ms (a modal opening). Anything longer than 500ms feels slow; anything under 80ms feels jittery. Easing: ease-out (fast then slow) is right for things appearing or moving in; ease-in is right for exits. Linear is almost never right.\n\nChoreography is what most people skip. When a modal opens, the backdrop should fade in first, then the dialog should scale up slightly. When a list reorders, items should move at staggered times so the eye can follow. Apple is the gold standard here.\n\nRespect prefers-reduced-motion. Some users get nausea from animation. A simple media query disables or shortens transitions for them. Tailwind has motion-safe and motion-reduce variants for this.',
      comparison:
        'Duration = how long. Easing = the curve. Choreography = the order. Reduce motion for users who need it.',
      vibeTip:
        'Tell your AI "use 200ms ease-out for entrances, 150ms ease-in for exits, and respect prefers-reduced-motion". You stop getting linear 600ms transitions that feel like a stuck escalator.',
      talkToAi: {
        starter:
          'Add motion to [interaction]. Before writing animation code, ask me: 1) what is happening (open, close, reorder, hover, drag), 2) the elements involved and their roles, 3) the personality (snappy, gentle, energetic). Then propose duration, easing, and choreography for each element, write the code (Framer Motion, CSS, or Tailwind transitions, whichever fits), and add a prefers-reduced-motion variant that disables or shortens it.',
        example:
          'Add motion to the Modal in src/components/Modal.tsx. Backdrop fades in 200ms ease-out. Dialog scales from 0.96 to 1 and fades in over 200ms ease-out, starting 50ms after the backdrop. Closing reverses both with ease-in. Disable both for prefers-reduced-motion.',
      },
      mnemonic:
        'Duration short, easing curved, choreography ordered, motion reduced for those who need it.',
      relatedGlossaryIds: ['modal', 'toast'],
    },
    {
      id: 'fidelity',
      title: 'Wireframe vs mockup vs prototype',
      summary:
        'Wireframe = boxes and labels (structure only). Mockup = pixel-perfect static screen (style applied). Prototype = clickable mockup (you can interact). Each is for a different question.',
      details:
        'These three words get used interchangeably and they should not. A wireframe is a low-fidelity sketch, just boxes and labels. It answers "what goes on this screen and roughly where?". You can draw it on a napkin or in Figma, but no colors, no real type, no images.\n\nA mockup is a high-fidelity static screen. It answers "what does this look like?". Colors, type, images, shadows, the whole production design. But still static. You cannot click anything.\n\nA prototype is a clickable mockup. It answers "what does this feel like to use?". You can click button A and see screen B. Modern Figma prototypes can include animations and even real input fields. They are not real code, but they are close enough to test with users before anyone writes it.',
      comparison:
        'Wireframe = boxes (what + where). Mockup = pixels (what it looks like). Prototype = clickable (what it feels like).',
      vibeTip:
        'When you ask your AI for screens, say which fidelity. "Generate a wireframe" gets you HTML stubs. "Generate the mockup" gets you full styling. "Build the prototype" gets you interactive code.',
      talkToAi: {
        starter:
          'I want to design [feature or screen]. Before generating anything, ask me: 1) which fidelity I need now (wireframe to think through layout, mockup to commit to a look, prototype to test the interaction), 2) the screens or states involved, 3) the level of polish (rough, presentable, production). Then deliver at the fidelity I asked for, and call out what I would still need to do at higher fidelities.',
        example:
          'Generate a wireframe for the new onboarding flow: 4 steps, no real colors or images, just boxes and labels. Show me each step as plain HTML so I can play with the structure before we commit to a visual design.',
      },
      mnemonic:
        'Wireframe = where. Mockup = what. Prototype = how. Pick the fidelity that matches the question.',
      relatedGlossaryIds: ['stepper', 'card'],
    },
    {
      id: 'atomic-design',
      title: 'Atomic design: atoms, molecules, organisms',
      summary:
        'A way to organize components by size. Atoms = small primitives (button, input). Molecules = small groups (input + label). Organisms = full sections (a header, a card list).',
      details:
        'Brad Frost\'s atomic design splits a UI into five layers. Atoms are the smallest meaningful pieces: a button, an input, a label, an icon. Molecules are atoms combined into one functional unit: an input with a label and an error message; a search bar (input + button + icon). Organisms are larger groups that stand on their own: a site header with logo, nav, and user menu; a product card grid.\n\nThe top two layers are templates (page-level layouts without real content) and pages (templates with real content). Most teams skip those and stop at organisms.\n\nThe value is mostly mental: it gives your team a shared way to discuss "how big" a component is. "Is this a molecule or an organism?" is shorthand for "how reusable should this be, and how opinionated should it look?". Atoms are styled and stable. Organisms compose atoms and are more page-specific.',
      comparison:
        'Atom = primitive. Molecule = small unit. Organism = full section. Template = layout. Page = real content.',
      vibeTip:
        'Tell your AI "extract this into atoms and molecules" when it gives you one giant component. You get reusable pieces instead of a copy-paste graveyard.',
      talkToAi: {
        starter:
          'Refactor [component or page] using atomic design. Before changing code, ask me: 1) the component(s) we are starting from, 2) which sub-pieces could be reused elsewhere, 3) whether we already have atom-level primitives (Button, Input) we should reuse instead of inlining new ones. Then propose the breakdown (this is an organism, made of these molecules, made of these atoms), refactor the code accordingly, and call out atoms that should move to a shared library.',
        example:
          'Refactor src/pages/Dashboard.tsx using atomic design. Extract the user-card section into a UserCard organism made of an Avatar atom, a NameLabel molecule (avatar + name + role), and a StatList molecule.',
      },
      mnemonic:
        'Atoms compose into molecules. Molecules compose into organisms. Organisms make pages.',
      relatedGlossaryIds: ['card', 'list', 'appshell'],
    },
    {
      id: 'responsive-breakpoints',
      title: 'Responsive breakpoints and mobile-first',
      summary:
        'Breakpoints are the screen widths where layout changes (typically 640, 768, 1024, 1280, 1536px). Mobile-first means write the small layout, then add wider rules on top.',
      details:
        'Tailwind\'s default breakpoints (sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536) are based on common device classes. Most projects do not need more or different ones. The key choice is whether to design mobile-first or desktop-first.\n\nMobile-first means the base styles target the smallest screen, and breakpoints add or override styles for wider screens. "p-2 md:p-6" is mobile-first: 8px padding everywhere, then 24px starting at 768px. Desktop-first reverses it: "p-6 md:p-2" looks weird and you almost never want it. Tailwind is mobile-first by design.\n\nMobile is not "the easy version". It is often the harder one because you have less space, no hover, and you want big touch targets (44x44px minimum). Designing for mobile first forces priority decisions: if it does not fit on a phone, it probably should not be on the desktop either.',
      comparison:
        'Breakpoint = screen width where layout changes. Mobile-first = small first, wider screens add styles on top. Desktop-first = the other (worse) way.',
      vibeTip:
        'Tell your AI "design mobile-first using sm, md, lg breakpoints". You will stop getting layouts that look great on a 27-inch monitor and break on every phone.',
      talkToAi: {
        starter:
          'Make [component or page] responsive. Before changing code, ask me: 1) the smallest device we support (320px? 360px?), 2) the breakpoints I want to use (or default Tailwind), 3) which elements should reflow vs hide vs stack. Then rewrite the layout mobile-first using sm/md/lg/xl modifiers, ensure touch targets are at least 44x44 on mobile, and show before/after at 360px, 768px, and 1280px.',
        example:
          'Make src/components/Pricing.tsx responsive. Mobile (under 640px): one card per row stacked. Tablet (640-1024px): two cards per row. Desktop: all three cards in one row. CTAs are 48px tall on mobile. Use Tailwind sm and lg modifiers.',
      },
      mnemonic:
        'Mobile-first: write the small layout, add bigger rules on top. Touch targets at least 44 by 44.',
      relatedGlossaryIds: ['appshell', 'card', 'pricing'],
    },
    {
      id: 'contrast-wcag',
      title: 'Color contrast and WCAG',
      summary:
        'Every text/background pair needs enough contrast for people to read it. WCAG (Web Content Accessibility Guidelines) sets the bar: at least 4.5:1 for body text, 3:1 for large text. "Make it pop" is not a contrast ratio.',
      details:
        'Contrast ratio is a number that describes how far apart two colors are in lightness. White text on a white background is 1:1 (invisible). Black text on a white background is 21:1 (maximum). WCAG AA, the standard almost every product should meet, requires 4.5:1 for normal-size text and 3:1 for text that is at least 18pt (or 14pt bold). WCAG AAA raises those to 7:1 and 4.5:1, which is harder to hit with brand colors but great for long-form reading.\n\nThe most common failures are light gray text on white, colored text on a colored background, and text over images without an overlay. Tools like the WebAIM Contrast Checker, Figma plugins like Stark, and browser DevTools (Inspect, Accessibility tab) all show the ratio instantly. Tailwind does not enforce contrast on its own, so you need to check.\n\nWhen you are prompting an AI, the words "meet WCAG AA contrast" are worth more than "make sure people can read it". The AI knows the spec and will pick colors that pass. Without the spec name, it guesses, and light-gray-on-white keeps showing up.',
      comparison:
        'AA = 4.5:1 for body text, 3:1 for large text. AAA = 7:1 and 4.5:1. Ratio, not vibes.',
      vibeTip:
        'Always say "WCAG AA contrast" in your prompt. The AI knows the numbers and will pick passing colors instead of guessing "readable enough".',
      talkToAi: {
        starter:
          'Audit color contrast across [project or page]. Before changing anything, ask me: 1) the pages or components to check, 2) whether we target WCAG AA or AAA, 3) whether dark mode needs its own audit. Then list every text/background pair that fails, show the current ratio vs the required ratio, and propose replacement colors that pass while staying close to our palette.',
        example:
          'Audit contrast on the landing page. Target WCAG AA. Check both light and dark mode. List every failing pair, show the ratio, and suggest the closest passing color from our Tailwind palette.',
      },
      mnemonic:
        '4.5:1 for body text, 3:1 for large text. Say "WCAG AA" and the AI handles the math.',
      relatedGlossaryIds: ['badge', 'button'],
    },
    {
      id: 'readable-type',
      title: 'Readable type: base size, line-height, do not shrink body text',
      summary:
        'Body text should be at least 16px (1rem). Line-height for paragraphs should be 1.4 to 1.6. Shrinking body text below 14px to fit more on screen trades readability for density, and readability always wins.',
      details:
        'Three rules cover 90% of type readability. First, set a base size of at least 16px (Tailwind text-base). Browsers default to 16px for a reason: it is the smallest size most people can read comfortably on a phone at arm\'s length. Going to 14px (text-sm) for secondary labels and metadata is fine. Going below that for body paragraphs is not.\n\nSecond, set line-height (the vertical space between lines, sometimes called "leading") to 1.4 to 1.6 for body copy. Tailwind\'s text-base ships with leading-6 (1.5), which is right in the sweet spot. Headings can be tighter (1.1 to 1.3) because they are short and big. Code blocks can be tighter too (1.4).\n\nThird, ask for a type scale instead of picking sizes ad hoc. A scale is a small ladder of sizes (like Tailwind\'s xs, sm, base, lg, xl, 2xl) with line-heights already paired. When you tell an AI "use a type scale with a 16px base, 1.5 line-height for body, and 1.2 for headings", it stops inventing text-[13px] or leading-[17px] on every component.',
      comparison:
        'Body at 16px with 1.5 line-height = comfortable. Body at 12px with 1.2 line-height = squinting. Use the scale, not one-off sizes.',
      vibeTip:
        'Tell your AI "body text must be at least text-sm (14px), prefer text-base (16px), line-height 1.5". It stops shrinking text to fit layouts.',
      talkToAi: {
        starter:
          'Set up readable typography for [project]. Before suggesting anything, ask me: 1) the type of content (long articles, dashboards, marketing pages), 2) the smallest text we allow (captions, footnotes), 3) the font family (or "pick one"), 4) whether we need a code font. Then propose a scale (xs through 2xl) with base size, line-heights for each use (body, heading, code, label), and show an example paragraph at each rung so I can feel the difference.',
        example:
          'Set up readable typography for a learning site with long explanations. Inter for body, minimum text size is text-xs for fine print only. Paragraphs use text-base/leading-relaxed. Headings use text-xl through text-3xl with tight leading. Show an example card with a heading, a two-paragraph body, and a caption.',
      },
      mnemonic:
        '16px base, 1.5 line-height, never shrink body text. Read it on your phone before you ship.',
      relatedGlossaryIds: ['hero', 'card'],
    },
    {
      id: 'design-contract',
      title: 'Use the tokens that already exist: do not invent new ones',
      summary:
        'If your design system (or Tailwind config) already has names for colors, spacing, and radii, use those names. Inventing new values ("just this once, 13px") breaks the contract that makes everything consistent.',
      details:
        'A design contract is the agreement that everyone (including the AI) uses the same named values. When a Tailwind config says primary-500 is #4F46E5 and spacing goes in 4px steps, those are the contract. Every component built on those tokens looks like it belongs.\n\nThe contract breaks when someone introduces a value that is not in the system. A "gap-[13px]" here, a "#5B21B6" there, a "rounded-[7px]" somewhere else. Each one is small. Together they make the product feel like five different designers worked on it without talking to each other.\n\nThe fix is simple: before adding a new value, check whether the system already has one close enough. If spacing-3 (12px) or spacing-4 (16px) exists, do not invent 13px. If the system truly needs a new token, add it to the config so everyone gets it, do not hard-code it in one component. When prompting an AI, the phrase "use only existing tokens from our config" stops it from inventing arbitrary values on every generation.',
      comparison:
        'Using existing tokens = cohesion. Inventing values = drift. If you need a new value, add it to the system, not inline.',
      vibeTip:
        'Tell your AI "use only the tokens in tailwind.config.js, do not add arbitrary values". It stops generating px overrides that drift from the system.',
      talkToAi: {
        starter:
          'Audit [component or page] for off-system values. Before changing anything, ask me: 1) where the design tokens live (tailwind.config.js, CSS variables, a tokens file), 2) which categories to audit (color, spacing, radius, shadow, font), 3) whether I want you to fix or just report. Then list every hard-coded or arbitrary value, show what system token it should use instead, and flag any case where no close token exists (those might need a new token added to the config).',
        example:
          'Audit src/components/Card.tsx for off-system values. Our tokens are in tailwind.config.js. Report every arbitrary value (gap-[13px], text-[#333], rounded-[5px]) and replace each with the closest Tailwind default. If nothing is close, propose a new token.',
      },
      mnemonic:
        'If the system has a name for it, use the name. If it does not, add one. Never hard-code in one place.',
      relatedGlossaryIds: ['card', 'button'],
    },
    {
      id: 'one-primary-cta',
      title: 'One primary call to action per view',
      summary:
        'Every screen should have one obvious "do this next" button. If three buttons are all loud and colorful, none of them stands out, and the user freezes. Primary is for the main action. Everything else is secondary, ghost, or a link.',
      details:
        'A call to action (CTA) is the button (or link) you most want the user to press. "Sign up", "Save", "Submit order", "Start free trial". Making it primary means giving it the strongest visual treatment: filled with the brand color, large enough to find instantly, and usually positioned at the bottom or top-right of the form.\n\nThe mistake is making everything primary. When the "Save" button, the "Cancel" button, and the "Delete account" link are all big, bright, and filled, the user has to read every label to figure out which one to press. That cognitive load (the tiny pause while they parse labels) is the difference between a product that feels fast and one that feels uncertain.\n\nThe hierarchy: one primary button (the action you want), one or two secondary buttons (alternatives like "Cancel" or "Save as draft"), and everything else as ghost or text links. Destructive actions (delete, disconnect, revoke) get a destructive variant (red/danger) but should still be visually quieter than the primary unless the whole screen exists to confirm a delete.',
      comparison:
        'One primary = clear next step. Three primaries = decision fatigue. Use secondary, ghost, or link for the rest.',
      vibeTip:
        'Tell your AI "one primary CTA per view, secondary for alternatives, ghost or link for the rest". It stops painting every button in brand purple.',
      talkToAi: {
        starter:
          'Audit the button hierarchy on [page or form]. Before changing anything, ask me: 1) the main action the user should take, 2) the secondary actions (save draft, cancel, go back), 3) any destructive actions (delete, disconnect). Then propose which button gets primary, which gets secondary, and which gets ghost or link treatment. Show the updated layout with Tailwind classes.',
        example:
          'Audit the checkout page. Main action: "Place order" (primary). Secondary: "Back to cart" (ghost). Destructive: "Remove item" (small ghost text, not a big button). Update the JSX with the right variant classes.',
      },
      mnemonic:
        'One loud button per screen. If everything is primary, nothing is.',
      relatedGlossaryIds: ['button', 'hero'],
    },
    {
      id: 'brand-constraints',
      title: 'Brand is / is not: giving an AI taste without a 20-page brand book',
      summary:
        'A short "brand is / is not" list tells the AI the personality of your product in a few lines. "We are calm and confident, not playful or loud." That single sentence steers color, typography, copy tone, and illustration style better than a 50-slide deck the AI cannot read.',
      details:
        'Most projects do not have a brand book, and you do not need one to give an AI useful taste constraints. A brand is/is not list is a handful of pairs that describe what the product should feel like and what it should not. "Calm, not sterile. Confident, not aggressive. Friendly, not childish. Technical, not intimidating." Each pair narrows the design space so the AI picks appropriate options instead of defaulting to generic.\n\nThe list works because it is short enough to paste into a system prompt and specific enough to resolve ambiguity. When an AI picks a font, "friendly but not childish" steers it toward Inter or DM Sans and away from Comic Sans or Papyrus. When it picks colors, "calm and confident" steers it toward muted blues and neutrals, not neon gradients.\n\nYou can extend the pattern with a few concrete references: "Think Linear, not MySpace. Think Stripe, not a county fair poster." Product references are the fastest shorthand because the AI already knows what those products look like. Three constraints and two references give the AI more useful guidance than a brand deck it was not trained on.',
      comparison:
        'Brand book = 50 pages the AI cannot read. Is/is-not list = 5 lines that fit in a system prompt and actually steer output.',
      vibeTip:
        'Put your "brand is / is not" list and 2 to 3 product references in the system prompt of every design conversation. The AI will stay on-brand without a Figma file.',
      talkToAi: {
        starter:
          'Help me write a brand is/is not list for [project]. Before suggesting anything, ask me: 1) what the product does in one sentence, 2) the audience (developers, consumers, enterprise, students), 3) two or three products whose vibe I admire, 4) anything I definitely do NOT want (playful, corporate, dark, loud). Then propose 4 to 6 is/is-not pairs with a short explanation of how each one would affect color, type, and tone. Include 2 to 3 product references I can paste into AI prompts.',
        example:
          'Write a brand is/is not list for a developer documentation site. Audience: intermediate developers. I admire the tone of Stripe Docs and Linear. I do not want corporate or playful. Propose is/is-not pairs and show how they map to Tailwind choices (palette, font, radius).',
      },
      mnemonic:
        'Five lines of "we are X, not Y" steer an AI better than a brand book it cannot open.',
      relatedGlossaryIds: ['hero', 'card'],
    },
    {
      id: 'semantic-color-roles',
      title: 'Semantic color roles: bg, surface, border, text',
      summary:
        'Name colors by their job, not their hue: bg (the page), surface (cards and panels), border, text-primary, text-secondary, text-muted. Dark mode stops being a rewrite and becomes "same roles, different values".',
      details:
        'A color palette tells you which colors exist. Color roles tell you where each one goes. The core cast in almost every design system: bg is the page background, surface is what panels and cards sit on (one step lighter or darker than bg so they read as raised), border separates things quietly, and text comes in three volumes (text-primary for real content, text-secondary for supporting copy, text-muted for timestamps and hints). Add the state colors (success, warning, danger, info) and a cta color for the one loud button, and you have named every job on the screen.\n\nThe payoff is that components stop knowing about hues. A card is "surface with a border and text-primary", never "white with gray-200 and gray-900". So when dark mode arrives, you do not touch a single component. You re-point the roles (bg goes near-black, surface a step lighter, borders get stronger because shadows stop working in the dark) and the whole product follows.\n\nThis is also the fix for the classic AI mistake: hard-coding "bg-white text-gray-900" into every component it generates, which shatters the moment you add a theme. Give the AI the role names up front and dark mode is a config change instead of a two-day find-and-replace.',
      comparison:
        'Palette = which colors exist. Roles = which job each color has. "gray-100" is a value; "surface" is a job that can point at different values per theme.',
      vibeTip:
        'Tell your AI "use semantic roles (bg, surface, border, text-primary, text-muted) instead of raw colors, and support dark mode by re-mapping the roles". You get themeable components on the first try.',
      talkToAi: {
        starter:
          'Set up semantic color roles for [project]. Before writing code, ask me: 1) whether I need dark mode now or just want to keep it possible, 2) my styling setup (Tailwind, CSS variables, styled-components), 3) my brand colors if any. Then define the roles (bg, surface, border, text-primary, text-secondary, text-muted, cta, success, warning, danger, info) as tokens, map light and dark values for each, and refactor one existing component to use only roles as a demonstration.',
        example:
          'Set up semantic color roles for my Tailwind + React app. I need dark mode from day one. Brand color is teal. Define the roles as CSS variables consumed by Tailwind, give me light and dark values that pass WCAG AA, and refactor my Card component to use only the roles.',
      },
      mnemonic:
        'Name the job, not the hue. bg, surface, border, three text volumes. Dark mode is re-mapping roles, not rewriting components.',
      relatedGlossaryIds: ['card', 'badge'],
    },
    {
      id: 'rule-strengths',
      title: 'Tripwires vs strong defaults: writing rules an AI can follow',
      summary:
        'Good design rules come in strengths. Tripwires (MUST NOT) are never bendable: accessibility floors, data safety. Strong defaults are the intended design, bendable with a written reason. Guidance is advice. Mark which is which, or the AI treats everything as optional.',
      details:
        'A pile of design rules where everything sounds equally important gets followed unevenly: the AI (or a teammate) either obeys all of it rigidly in places where it hurts, or treats all of it as vibes. The fix is to declare a strength for every rule. Tripwires are the MUST NOTs that are never worth bending: text below the contrast floor, focus outlines removed, destructive actions without confirmation, layouts that break at 320px. If following any other rule would cross a tripwire, the tripwire wins.\n\nStrong defaults are the intended design: "one primary CTA per view", "skeletons over spinners", "44px touch targets". They carry an intent, and the intent outranks the letter. If following the letter of a rule works against its intent in a specific spot, you implement the intent instead, and you write the deviation down: which rule, why the letter failed here, what you did instead. A reasoned deviation is fine; a silent one is drift.\n\nThe deviation log is the underrated half. A DEVIATIONS.md file (or a comment block) listing every place the product intentionally departs from its own rules turns "the AI keeps changing my design back" into a solved problem: the log is context you paste into the next session, so the exception survives regeneration instead of being "fixed" by a model that never knew it was deliberate.',
      comparison:
        'Tripwire = never, no exceptions (accessibility, data safety). Strong default = do this unless you write down why not. Guidance = advice, no paperwork. Unlabeled rules all get treated like guidance.',
      vibeTip:
        'In your design doc, tag rules MUST NOT / SHOULD / consider, and tell the AI "tripwires are never bendable; log any deviation from a strong default with a reason". It stops both blind obedience and silent drift.',
      talkToAi: {
        starter:
          'Turn my design preferences for [project] into a rulebook with strengths. Before writing it, ask me: 1) my non-negotiables (accessibility, brand, data safety), 2) the defaults I want followed unless there is a good reason, 3) areas where I am happy for the AI to use judgment. Then produce the rules in three tiers (tripwires, strong defaults with their intent stated, guidance), plus a DEVIATIONS.md template for logging exceptions.',
        example:
          'Turn these preferences into a tiered rulebook: WCAG AA always, 4px spacing grid, one primary CTA per view, skeletons for loading, Lucide icons only, playful copy. Accessibility and no-data-loss are non-negotiable; the rest are defaults. Give me the three tiers and a deviation log template.',
      },
      mnemonic:
        'Three strengths: never, default-with-a-reason-to-deviate, and advice. Label every rule or they all become advice.',
      relatedGlossaryIds: [],
    },
    {
      id: 'design-md-file',
      title: 'The DESIGN.md file: a visual contract your AI can read',
      summary:
        'A DESIGN.md is one markdown file at the root of your repo holding the whole visual contract: philosophy, color roles, type scale, spacing, component rules, do/don\'t tables. Point the AI at it every session and your product stops changing style every time you regenerate a screen.',
      details:
        'The biggest visual problem with AI-built apps is not bad taste, it is amnesia. Each session, the model picks fresh defaults, so screen four looks like a different product than screen one. A DESIGN.md fixes that by writing the decisions down once, in a file the AI reads at the start of every conversation: this is the brand personality, these are the color roles and their light and dark values, this is the type scale, this is the spacing grid, buttons look like this, modals behave like that.\n\nA good one reads like a contract, not a mood board. Concrete values (hex codes, font names, the actual scale numbers), rules with strengths (tripwires vs strong defaults vs guidance), and do/don\'t tables that are diffable: "Buttons: outcome-named labels like Save changes; never generic Submit". Vague words like "clean" and "modern" do nothing; a table the AI can check its own output against does everything.\n\nIt also becomes your review tool. When a generated screen looks off, you stop arguing taste and start checking contract: "this violates the spacing scale and uses a second icon set". And it compounds: every refinement you make gets written back into the file, so the next session starts smarter than the last one instead of starting over.',
      comparison:
        'No DESIGN.md = every session reinvents the style. DESIGN.md = one contract, every session reads it. Design doc (engineering) = how a feature works. DESIGN.md = how everything looks and behaves.',
      vibeTip:
        'Start every UI session with "read DESIGN.md and follow it; flag conflicts instead of silently overriding". When you correct the AI\'s output, have it update DESIGN.md too, so the correction sticks for next time.',
      talkToAi: {
        starter:
          'Create a DESIGN.md for [project]. Before writing it, ask me: 1) the brand personality in a few adjectives (or products whose look I admire), 2) my stack and styling setup, 3) whether dark mode is required, 4) my non-negotiables (accessibility level, fonts, existing brand colors). Then produce a DESIGN.md with: philosophy, semantic color roles with light and dark values, type scale, spacing scale, radius and shadow rules, component do/don\'t tables, and rules tagged by strength (tripwires vs defaults vs guidance).',
        example:
          'Create a DESIGN.md for my recipe-sharing app (Next.js + Tailwind). Personality: warm, homey, confident, not cutesy. Think Airbnb, not Pinterest. Dark mode required, WCAG AA non-negotiable. Extract the current colors from my globals.css as the starting palette.',
      },
      mnemonic:
        'Write the design down once, make every session read it. The file is the memory the AI does not have.',
      relatedGlossaryIds: [],
    },
    {
      id: 'page-grammar',
      title: 'Page grammar: hero, sections, one idea per screen',
      summary:
        'Pages have a grammar: a hero states the one outcome, each section makes one point with one composition, navigation stays put, and the first-run visitor gets a welcome the returning user skips. Screens read as designed instead of stacked.',
      details:
        'Most AI-generated pages fail the same way: everything is a stacked list of boxes with equal weight, so nothing leads. Page grammar is the set of composition rules that fix it. The hero comes first: one outcome-named headline (what the user gets, not what the product is), one line of support, one primary call to action. If three things compete at the top, the page has no subject.\n\nThen sections, each making exactly one point with one composition: a feature grid, a testimonial, a stat row, a step-by-step. The rule of thumb is never two of the same composition back to back (two card grids in a row read as one long undifferentiated blur). Navigation is part of the grammar too: it stays put (sticky, or easily reachable), shows where you are, and keeps to about five items.\n\nFirst-run deserves its own sentence in the grammar. A new visitor gets the welcome: the pitch, the promise, one button to start. A returning user skips it entirely (a simple seen-it flag) and lands in the product. Blending those two audiences into one screen serves neither: the newcomer gets no orientation and the regular gets a sales pitch for a thing they already use.',
      comparison:
        'Grammar = hero states the outcome, each section makes one point, nav stays put, first-run and returning users get different landings. No grammar = equal-weight boxes stacked until the footer.',
      vibeTip:
        'Ask your AI for the outline before the code: "give me the section-by-section plan for this page, one point and one composition per section, no two identical compositions in a row". Fixing the outline is cheap; fixing the built page is not.',
      talkToAi: {
        starter:
          'Design the page structure for [page] before building it. Ask me first: 1) the single outcome a visitor should walk away wanting, 2) the one action I want them to take, 3) what proof I have (numbers, testimonials, logos, screenshots), 4) whether new and returning visitors should see different things. Then give me a section-by-section outline (hero, then each section with its one point and its composition), and only build after I approve the outline.',
        example:
          'Design the landing page structure for my study-buddy app for college students. Outcome: "I could pass this class with less stress". Action: start free. Proof: 4,000 students, three testimonials, app screenshots. Returning users should skip straight to their dashboard. Outline first, then build.',
      },
      mnemonic:
        'Hero says the outcome. Each section makes one point. Never two of the same composition in a row.',
      relatedGlossaryIds: ['hero', 'appshell'],
    },
    {
      id: 'empty-states',
      title: 'Empty states: no screen is ever just blank',
      summary:
        'Every list, table, and search result has a moment with nothing to show. A designed empty state fills it with three things: a small visual, one sentence saying what belongs here, and one button that creates the first item. A blank screen reads as broken.',
      details:
        'The first time a user opens your app, most screens are empty: no projects, no messages, no results. An undesigned app renders nothing, and nothing is indistinguishable from a bug. The user\'s actual first experience of your product is this moment, which is why designers treat the empty state as a real screen, not an edge case.\n\nThe recipe is three parts. A small friendly visual (a simple drawn illustration or an outline icon, not a stock photo). One sentence that says what will live here ("Your saved prompts will show up here"). And exactly one primary action that creates the first thing ("Save your first prompt"). Together they turn dead air into a guided next step.\n\nDifferent empties need different words. First-run empty ("nothing here yet") invites creation. Cleared empty ("you did them all") can celebrate. No-results empty is its own species: it must echo what was searched and offer the way out ("No results for \'blue widget\'. Clear filters"), because a bare "no results" strands the user with no idea whether the data is gone or the filter is wrong. Error states are not empty states: "we could not load this" needs a retry, not a cheerful illustration.',
      comparison:
        'Blank screen = looks broken. Empty state = visual + one sentence + one CTA. No-results = must echo the query and offer a reset. Error = a different screen with a retry, never disguised as empty.',
      vibeTip:
        'AIs build the populated view and forget the empty one. Add "include designed empty states for every list and search (visual, one line, one CTA; no-results states echo the query and offer a clear-filters action)" to your prompt.',
      talkToAi: {
        starter:
          'Audit [my app or page] for missing empty states. Ask me first: 1) which screens have lists, tables, searches, or filters, 2) the tone of the product (playful, calm, professional), 3) whether I have illustrations or should use icons. Then, for each screen, design the first-run empty, the no-results empty (echoing the query with a reset action), and distinguish both from the error state. Implement them as one reusable EmptyState component.',
        example:
          'Audit my bookmarks manager for empty states: the all-bookmarks list, the tag-filtered view, and search. Calm professional tone, Lucide icons. Build one reusable EmptyState component and wire up all three, with search echoing the query and offering "Clear search".',
      },
      mnemonic:
        'Visual, one sentence, one button. And a no-results screen always names the search and offers the way out.',
      relatedGlossaryIds: ['empty'],
    },
    {
      id: 'loading-stability',
      title: 'Loading and layout stability: skeletons, not jumps',
      summary:
        'Two rules make an app feel solid while it loads: reserve the space (content never jumps when images or data arrive), and show skeletons shaped like the coming content instead of a lone spinner. Buttons show their own busy state so nobody double-submits.',
      details:
        'Layout shift is the twitch you feel when a page moves under you: an image pops in and shoves the paragraph you were reading, a banner loads late and the button you were about to tap becomes a different button. The fix is to reserve space for everything that arrives late: images get width and height (or an aspect-ratio box), async panels get a min-height. The metric is called CLS (Cumulative Layout Shift), and it is one of the scores Google grades pages on, but the real reason to care is that jumping content makes an app feel flimsy.\n\nFor content areas, skeletons beat spinners. A skeleton is a gray placeholder in the shape of the coming content: bars where text will be, a rectangle where the image goes. It reserves the space (solving the shift problem) and tells the user what kind of thing is coming. A spinner says only "wait", holds no space, and past a couple of seconds reads as "maybe frozen". Keep spinners for tiny, sub-second, control-level waits.\n\nButtons own their wait. When a user clicks Save, the button itself disables and shows its working state ("Saving..."). A clicked button that sits there looking idle earns a second click, and a second click means a double submit, and a double submit means duplicate orders. And anything that takes truly long needs an escape hatch: show progress past half a second, and offer cancel or "we will finish in the background" past ten.',
      comparison:
        'Spinner = "wait, something is happening somewhere". Skeleton = "here is the shape of what is coming", and it holds the space. Layout shift = the page moving under the user, the number-one flimsy-app feel.',
      vibeTip:
        'Ask for "skeleton states shaped like the real content, explicit dimensions on images so nothing shifts, and disabled buttons with inline busy text on submit". AIs default to a centered spinner unless you say otherwise.',
      talkToAi: {
        starter:
          'Add proper loading states to [my app or page]. Ask me first: 1) which parts load async (lists, images, charts, panels), 2) typical wait times (instant-ish, a second, several seconds), 3) which actions submit data. Then: give every async area a skeleton matching its layout, explicit dimensions or aspect ratios on images so nothing shifts, busy states on submitting buttons that prevent double-submit, and a cancel or background path for anything that can run long.',
        example:
          'Add loading states to my photo gallery app: the grid (loads 1 to 3 seconds), the detail pane, and the upload button. Skeleton cards matching the grid layout, aspect-ratio boxes so images never shift the grid, and an upload button that shows progress and prevents double-clicks.',
      },
      mnemonic:
        'Hold the space, shape the wait, and make the button show it is working. Content the user is reading never jumps.',
      relatedGlossaryIds: ['skeleton', 'spinner', 'progress'],
    },
    {
      id: 'iconography',
      title: 'Iconography: one set, one stroke, always a label',
      summary:
        'Pick one icon library (Lucide is the safe default), use it for every icon, and never mix in a second set. Stick to a size scale, let icons inherit text color, and give every icon-only button an accessible name. Mixed icon sets read as mixed products.',
      details:
        'Icons are a place where small inconsistencies scream. Every icon library draws with a personality: a stroke width, a corner style, a level of detail. Mix two sets (or two weights of the same set) on one screen and users cannot say what is wrong, but they feel it, the same way a ransom note of mixed fonts feels wrong. So the first rule is boring and absolute: one library, one stroke weight, everywhere. Lucide (the successor to Feather) is the common default: over a thousand consistent icons, free to use, available for every framework.\n\nSizes come from a small scale just like type does: 16, 20, 24, 32, not 13 and 17. Color should inherit from the surrounding text (currentColor) rather than being hard-coded, so icons automatically match whatever context and theme they land in. And icons are drawn things, not typed things: a real SVG from the set, never a letter x standing in for close or an emoji standing in for a control.\n\nThe accessibility rule is the one AIs skip most: an icon-only button is a mystery to a screen reader unless it carries an accessible name (an aria-label, spoken aloud in place of the icon). If a control is icon-only it also deserves a styled tooltip on hover and keyboard focus, and not the browser\'s native title attribute, which is slow to appear and invisible to keyboard users. When in doubt, put a text label next to the icon; icon-plus-word beats icon-alone almost everywhere.',
      comparison:
        'One set, one stroke = one product. Mixed sets = ransom note. Icon-only button without an aria-label = invisible to screen readers. currentColor = icons match their context for free.',
      vibeTip:
        'Add "use Lucide for all icons, sizes from 16/20/24/32, color via currentColor, and an aria-label plus tooltip on every icon-only control" to your standing instructions. It ends the icon drift between sessions.',
      talkToAi: {
        starter:
          'Standardize the icons in [my app]. Ask me first: 1) which library I prefer, or recommend one for my stack, 2) where icons currently come from (mixed imports, inline SVGs, emoji), 3) the sizes in use. Then migrate everything to the one library, snap sizes to a scale, switch fills to currentColor, add aria-labels and styled tooltips to every icon-only control, and list any icon the library lacks so we can pick a substitute deliberately.',
        example:
          'Standardize icons in my React dashboard: it currently mixes Heroicons, two emoji, and some inline SVGs. Migrate everything to Lucide at 16/20/24, currentColor throughout, aria-labels on the icon-only toolbar buttons, and flag anything without a clean Lucide equivalent.',
      },
      mnemonic:
        'One set, one stroke, sizes from the scale, and every icon-only button says its name out loud.',
      relatedGlossaryIds: ['tooltip'],
    },
    {
      id: 'microcopy-tone',
      title: 'Microcopy: buttons name outcomes, errors name fixes',
      summary:
        'The tiny words in the interface (buttons, errors, confirmations, empty screens) are microcopy, and they follow rules: buttons say the outcome ("Save changes", not "Submit"), errors say what happened and what to do next, confirmations say what specifically happened. Vague words make a working app feel broken.',
      details:
        'Microcopy is every small piece of text the interface speaks: button labels, error messages, confirmations, placeholders, empty screens. It is written, not defaulted, and the rules are concrete. Buttons name the outcome: "Save changes", "Delete draft", "Send invite". A button that says "Submit" or "OK" forces the user to reconstruct from context what is about to happen; the label should carry that answer.\n\nErrors have two mandatory halves: what happened, and what to do about it. "Something went wrong" fails both. "We could not reach the server. Check your connection, then retry" passes. The same shape applies to validation ("That email is already in use. Try signing in instead") and to confirmations of destructive actions, which name the actual stakes ("Delete 12 photos? This cannot be undone"), never a generic "Are you sure?".\n\nTwo more habits finish the job. Confirmations are specific ("Changes saved", "Invite sent to sam@") rather than a mute green checkmark. And the whole product speaks in one voice, which you can define in a sentence and hand to your AI: plain words, active voice, contractions or not, how playful, where the line is. Consistency of voice is like consistency of icons: nobody names it, everybody feels it.',
      comparison:
        'Label = what the control is. Microcopy rule = what pressing it will do. "Submit" describes the mechanism; "Save changes" describes the outcome. Errors: what happened + what to do, always both halves.',
      vibeTip:
        'Add a voice line to your prompts: "microcopy is plain and warm; buttons name outcomes; errors say what happened and what to do next; no lorem ipsum anywhere, write real words even in v1". AIs write "Submit" and "Something went wrong" until told not to.',
      talkToAi: {
        starter:
          'Audit the microcopy in [my app or page]. Ask me first: 1) the voice (formal, warm, playful, and any products whose tone I admire), 2) my audience, 3) any words we never use (jargon, internal names). Then go screen by screen and rewrite: button labels to outcomes, errors to what-happened-plus-what-to-do, confirmations to specifics, placeholders and empty screens to real sentences. Show each change as a before/after table.',
        example:
          'Audit the microcopy in my budgeting app signup and settings screens. Voice: warm and plain, like Notion, never bankspeak. Rewrite the "Submit" buttons, the "Invalid input" errors, and the bare "Saved" confirmation. Before/after table please.',
      },
      mnemonic:
        'Buttons say the outcome. Errors say what happened and what to do. Confirmations say what specifically got done.',
      relatedGlossaryIds: ['toast', 'alert'],
    },
  ],
};
