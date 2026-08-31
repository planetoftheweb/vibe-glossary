export const MOTION_TOPICS = [
  {
    id: 'motion-tokens',
    title: 'Motion tokens: name the feel, not the milliseconds',
    summary: 'Named durations and easings the same way you name colors. duration-motion-fast / normal / slow and ease-motion-normal, not a one-off duration-300 on every component.',
    details: `You already name colors. Motion tokens are the same idea for time and feel. Instead of pasting duration-300 on every button, you say duration-motion-fast, duration-motion-normal, duration-motion-slow, plus ease-motion-normal and ease-motion-slow. WritAIble-style tokens look like that on purpose: one name, one feel, reused everywhere.

When the product feels too twitchy or too sleepy, you change one file. The modal, the toast, the page fade, they all follow. You are not hunting 40 magic numbers. You are renaming the vibe.

Talk to your AI in those names. "Use duration-motion-normal and ease-motion-slow on the overlay" is a better ask than "make it animate 300ms ease-in-out, also the drawer, also the tooltip."`,
    comparison: 'A one-off duration-300 is a local guess. A motion token is a shared name for the feel, like a color token is a shared name for the brand.',
    vibeTip: 'If you catch yourself typing duration-300, stop and ask which named speed you actually mean: fast, normal, or slow.',
    talkToAi: {
      starter: 'I want motion tokens in [file or design system path] so components share named durations and easings instead of one-off milliseconds. Before you change anything, ask me: 1) which speeds we need (fast / normal / slow or something else), 2) which easings (ease-motion-normal, ease-motion-slow), 3) which components should switch over first, 4) whether reduced-motion should skip or shorten them, 5) where the token file lives. Push back if I ask for a unique duration on a single component that should just use a token.',
      example: 'In our Tailwind theme, add duration-motion-fast (150ms), duration-motion-normal (280ms), duration-motion-slow (500ms), ease-motion-normal, and ease-motion-slow. Replace the one-off duration-300 classes on Modal, Drawer, and Toast with those tokens. Do not invent a special duration for the close button.',
    },
    mnemonic: 'Name the feel. Fast, normal, slow. One file changes the product.',
    relatedGlossaryIds: ['modal', 'toast'],
  },
  {
    id: 'particle-field',
    title: 'Particle field: atmosphere the page does not depend on',
    summary: 'A particle field is a dotted-grid texture brought to life. Field, density, drift, twinkle, formations. Decoration. The page never depends on it.',
    details: `A particle field is just a bunch of dots that pretend to be weather behind the type. The words you want are field (the whole cloud), density (how many dots), drift (slow wander), twinkle (points that pulse), and formations (the shapes they morph into). It is atmosphere. If it never paints, the landing still reads.

Render nothing if WebGL is missing or the user has prefers-reduced-motion turned on. Soft color sits in a pool behind the text so the type stays readable. Density drops on small screens, about 3200 dots versus 6400 on a wide window.

When you ask an AI for one, say it is decoration, name the formations, and say the page must work with a blank canvas. Otherwise you will get a hero that is broken until the GPU wakes up.`,
    comparison: 'A background video wants to be the page. A particle field is wallpaper: pretty when it works, invisible when it does not.',
    vibeTip: 'If you cannot turn the field off and still understand the page, it is not a field anymore. It is a dependency.',
    talkToAi: {
      starter: 'I want a particle field behind [page or overlay] as decoration only. Before you write any WebGL, ask me: 1) which formations and in what order, 2) density on small vs wide, 3) the color pool behind the text, 4) what to do when WebGL is missing or prefers-reduced-motion is on, 5) whether scroll or mouse should drive anything. Push back if the layout would break without the canvas.',
      example: 'Add a fixed, pointer-events-none WebGL dot field behind the welcome overlay. About 3200 points on small screens, 6400 on wide. Violet and indigo. Render nothing if WebGL is missing or prefers-reduced-motion is reduce. The page copy and buttons must work with a blank canvas.',
    },
    mnemonic: 'Field, density, drift, twinkle, formations. Wallpaper, not the wall.',
    relatedGlossaryIds: ['hero'],
  },
  {
    id: 'scroll-linked-motion',
    title: 'Scroll-linked motion: scroll is the timeline',
    summary: 'Scroll progress 0 to 1 drives formations. Not a trigger that fires once.',
    details: `Scroll-linked motion means the scrollbar is the playhead. Progress from 0 to 1 mixes one formation into the next. It is not "when they hit this div, play a 600ms tween and stop." If they scroll back, the morph goes back.

WritAIble-style morph on a welcome overlay looks like this: a breathing wave on the hero, a rising helix as they move through the journey, a constellation of icons, then a letter glyph at the call to action. Scroll drives the mix. The mouse only adds a little drift. As the last formation assembles, rotation settles so the glyph reads straight-on.

How to ask: name the scenes, name the formations, say scroll drives the mix, mouse only adds drift, and settle rotation as the last formation assembles.`,
    comparison: 'A scroll trigger fires once and hopes they wait. Scroll-linked motion is a scrubbable timeline. Backing up rewinds it.',
    vibeTip: 'If the animation ignores them when they scroll back up, you built a trigger, not a timeline.',
    talkToAi: {
      starter: 'I want scroll-linked motion on [overlay or page] where scroll progress 0 to 1 mixes formations. Before you code, ask me: 1) the scene landmarks and their order, 2) the formation for each scene, 3) whether this uses the scroller element or the window, 4) how much the mouse is allowed to do (tilt only, please), 5) how the last formation should settle. Push back if I ask for a one-shot trigger that cannot rewind.',
      example: 'On the welcome scroller (not window.scrollY), morph a particle field: wave at hero, UI glyph constellation at components, helix through literacy, V glyph at the CTA. Mix with scroll progress. Mouse only tilts. Settle rotation as the glyph assembles so it reads straight-on.',
    },
    mnemonic: 'Scroll is the timeline. Backing up rewinds the morph.',
    relatedGlossaryIds: ['hero', 'infinitescroll'],
  },
  {
    id: 'reduced-motion',
    title: 'Reduced motion: keep the information, drop the spectacle',
    summary: 'prefers-reduced-motion is an OS setting. Do not just shorten animations. Omit ambient fields. Swap a spinner for a pulse or a static icon.',
    details: `prefers-reduced-motion is an operating system setting, not a taste you override. Some people get nausea from parallax, bouncing fields, and looping motion. The polite move is not "do the same show faster." It is keep the information and drop the spectacle.

Omit ambient fields. Swap a spinner for a pulse or a static icon. Tailwind gives you motion-safe and motion-reduce variants so the fancy path and the still path can live in the same markup. The content and the path through the page still have to work.

When you prompt, say what stays and what goes. "Hide the particle field, keep the headline, keep the buttons" is a complete ask.`,
    comparison: 'Shortening a loop still loops. Reduced motion means the extra motion is gone, and the meaning is still there.',
    vibeTip: 'If the only way to read the next section is to watch something move, you failed reduced motion.',
    talkToAi: {
      starter: 'I need a prefers-reduced-motion path for [component or page]. Before you edit, ask me: 1) which motion is information (progress, state change) vs spectacle (fields, bob, marquee), 2) what to show instead of the spinner or animation, 3) whether to use Tailwind motion-safe / motion-reduce, 4) whether any motion should still run if it communicates state. Push back if I only ask to "make the animations shorter."',
      example: 'Respect prefers-reduced-motion on the welcome landing: do not render the particle field, skip the word-up and bob animations, show the hero.png fallback, and keep every heading, count, and button usable. Do not just speed the animations up.',
    },
    mnemonic: 'Keep the information. Drop the spectacle.',
    relatedGlossaryIds: ['spinner', 'skeleton'],
  },
  {
    id: 'infinite-vs-pages',
    title: 'Infinite scroll vs pages vs Load more',
    summary: 'Infinite scroll loads more items as you move down. Numbered pages make it easy to return to a known place. A visible Load more button gives people control. Choose the pattern that matches the task.',
    details: `Infinite scroll is not "the API returns the next cursor." It is a motion and UX choice about how people travel a list. Feeds and chat want load-on-scroll. Admin tables people skim want pages, so they can say "I am on page 3 of 12." Always offer a Load more escape hatch. Some people cannot or will not ride an endless river.

Cursor pagination is the right fetch for feeds. It stays stable when new items arrive at the top. Offset pages are right when the person wants a numbered place. IntersectionObserver is how you notice the end of the list without a scroll math hobby.

Do not force endless scroll on a table. If they asked for a data grid, give them pages or a Load more button they can see.`,
    comparison: 'Infinite scroll is a feed. Pages are a map. Load more is the door you leave unlocked for both.',
    vibeTip: 'If someone would say "take me back to page 3," do not give them infinite scroll.',
    talkToAi: {
      starter: 'I need to pick infinite scroll, numbered pages, or Load more for [list or table] in [file path]. Before you build it, ask me: 1) is this a feed/chat or a table people skim, 2) cursor pagination or offset pages, 3) where the Load more escape hatch lives, 4) what IntersectionObserver should watch, 5) how new items arriving should affect scroll position. Push back if I ask for endless scroll on an admin table.',
      example: 'The activity feed in Inbox.jsx should use cursor pagination and load the next page when the sentinel hits the viewport (IntersectionObserver). Put a Load more button under the list as an escape hatch. Keep the orders admin table on offset pages with "page 3 of 12." Do not infinite-scroll the table.',
    },
    mnemonic: 'Feeds scroll. Tables page. Always leave Load more.',
    relatedGlossaryIds: ['infinitescroll', 'table', 'list'],
  },
];
