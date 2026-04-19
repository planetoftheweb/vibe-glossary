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
  ],
};
