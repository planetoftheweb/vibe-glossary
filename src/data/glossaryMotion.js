// Motion category entries. Merged into GLOSSARY_DATA in glossary.js

export const GLOSSARY_MOTION = {
  particlefield: {
    title: 'Particle Field',
    definition: 'A field of dots or letters behind the page. Atmosphere. The page never depends on it.',
    vibeTip: 'Say field, density, drift, twinkle, formations. Render nothing if WebGL is missing or prefers-reduced-motion is on.',
    comparison: 'A particle field is wallpaper. A background video wants to be the page. A hero image is static.',
    prompt: {
      base: 'Add a decorative particle field behind [page]',
      options: [
        { id: 'opt1', label: 'Density', text: ' with lower density on small screens (about 70 letters, not thousands of 3D dots)' },
        { id: 'opt2', label: 'Formations', text: ' that change with scroll (drift, grid, column, burst)' },
        { id: 'opt3', label: 'Reduced motion', text: ' and skip the field entirely when prefers-reduced-motion is reduce' }
      ],
      requirements: [
        'The page must work if the canvas never paints',
        'Pointer-events none, aria-hidden',
        'Keep type readable with a color pool behind text'
      ],
      scaffolds: {
        shadcn: '<canvas aria-hidden className="pointer-events-none fixed inset-0" />',
        html: '<canvas aria-hidden="true"></canvas>',
      },
    },
  },
  easing: {
    title: 'Easing',
    definition: 'The speed curve of a move. Ease-out arrives. Ease-in leaves. Linear almost never feels right.',
    vibeTip: 'Ask for ease-out on entrances and ease-in on exits. Name a token (ease-motion-normal) instead of a raw cubic-bezier.',
    comparison: 'Duration is how long. Easing is the feel. Linear is a robot. Ease-out is a landing.',
    prompt: {
      base: 'Set easing on [interaction]',
      options: [
        { id: 'opt1', label: 'Enter / exit', text: ' with ease-out on enter and ease-in on exit' },
        { id: 'opt2', label: 'Tokens', text: ' using named easings (ease-motion-normal, ease-motion-slow) not one-off curves' },
        { id: 'opt3', label: 'Compare', text: ' showing linear vs ease-out vs ease-in side by side so I can pick' }
      ],
      requirements: [
        'Do not use linear for UI chrome',
        'Keep duration in the 100-400ms band unless it is a page transition',
        'Honor prefers-reduced-motion'
      ],
      scaffolds: {
        shadcn: '<div className="transition-transform duration-300 ease-out" />',
        html: '<div style="transition: transform 300ms ease-out"></div>',
      },
    },
  },
  parallax: {
    title: 'Parallax',
    definition: 'Layers that move at different speeds as you scroll. Foreground faster, background slower. Depth without 3D.',
    vibeTip: 'Name the layers and their speeds. Keep it subtle. Drop it entirely for reduced motion.',
    comparison: 'Parallax is layered speed. Scroll-linked motion is one timeline. A sticky header is just pinned.',
    prompt: {
      base: 'Add parallax to [section]',
      options: [
        { id: 'opt1', label: 'Layers', text: ' with 2 or 3 layers and named speeds (0.2, 0.5, 1)' },
        { id: 'opt2', label: 'Subtle', text: ' so type never fights the background' },
        { id: 'opt3', label: 'Reduced motion', text: ' that freezes layers in place' }
      ],
      requirements: [
        'Never put meaning only in the moving layer',
        'Cap travel so content cannot slide off-screen',
        'Disable on prefers-reduced-motion'
      ],
      scaffolds: {
        shadcn: '<div style={{ transform: `translateY(${scroll * 0.3}px)` }} />',
        html: '<div data-parallax="0.3"></div>',
      },
    },
  },
  stagger: {
    title: 'Stagger',
    definition: 'A list that enters one item after another so the eye can follow. Delay, not chaos.',
    vibeTip: 'Ask for a 40-80ms stagger on children. Same easing on every item. Reduced motion: show them all at once.',
    comparison: 'Stagger is choreography. A single fade is a solo. A random delay is a mess.',
    prompt: {
      base: 'Stagger the enter animation on [list or grid]',
      options: [
        { id: 'opt1', label: 'Delay', text: ' of 50ms between items, cap at 400ms so long lists do not crawl' },
        { id: 'opt2', label: 'Same easing', text: ' on every child (ease-out)' },
        { id: 'opt3', label: 'Reduced motion', text: ' shows the whole list at once, no cascade' }
      ],
      requirements: [
        'Use the same duration and easing on every item',
        'Cap total stagger time',
        'Do not stagger exits unless the user is watching them leave'
      ],
      scaffolds: {
        shadcn: '{items.map((item, i) => <Card style={{ animationDelay: `${i * 50}ms` }} />)}',
        html: '<ul class="stagger">{/* children delay 50ms * n */}</ul>',
      },
    },
  },
  scrollreveal: {
    title: 'Scroll Reveal',
    definition: 'Elements fade or rise when they enter the viewport. IntersectionObserver, not a scroll listener hobby.',
    vibeTip: 'Ask for a short rise (12-20px) and a 400ms ease-out. Reveal once, do not flicker on every pass unless you mean to.',
    comparison: 'Scroll reveal is an enter. Scroll-linked motion is a timeline you can scrub. Parallax is layered speed.',
    prompt: {
      base: 'Reveal [sections] as they enter the viewport',
      options: [
        { id: 'opt1', label: 'Once', text: ' so they stay visible after the first reveal' },
        { id: 'opt2', label: 'Rise', text: ' of about 16px with 400ms ease-out' },
        { id: 'opt3', label: 'Reduced motion', text: ' snaps them visible with no travel' }
      ],
      requirements: [
        'Use IntersectionObserver',
        'Do not hide content from assistive tech while it is offscreen',
        'Honor prefers-reduced-motion'
      ],
      scaffolds: {
        shadcn: 'useInView() then add class is-in',
        html: '<section data-reveal>…</section>',
      },
    },
  },
  reducedmotion: {
    title: 'Reduced Motion',
    definition: 'An OS setting. Keep the information. Drop the spectacle. Do not just shorten the same loop.',
    vibeTip: 'Say omit ambient fields, swap spin for pulse or a static icon, keep buttons and copy usable.',
    comparison: 'Shortening a loop still loops. Reduced motion means the extra motion is gone.',
    prompt: {
      base: 'Add a prefers-reduced-motion path for [page]',
      options: [
        { id: 'opt1', label: 'Omit spectacle', text: ' (particle fields, bob, marquee)' },
        { id: 'opt2', label: 'Keep information', text: ' (progress, busy state, page changes) as a still or a fade' },
        { id: 'opt3', label: 'Tailwind', text: ' using motion-safe and motion-reduce variants' }
      ],
      requirements: [
        'Do not only shorten durations',
        'The path through the page still works',
        'Test with the OS setting on'
      ],
      scaffolds: {
        shadcn: '<div className="motion-safe:animate-bounce motion-reduce:animate-none" />',
        html: '<div class="no-motion"></div>',
      },
    },
  },
  pagetransition: {
    title: 'Page Transition',
    definition: 'How one screen becomes the next. A short fade or a shared-element handoff. Not a 900ms slide that traps clicks.',
    vibeTip: 'Ask for 200-300ms, ease-out, and a still cut when reduced motion is on. Block double-clicks while it runs.',
    comparison: 'A page transition is a scene change. A modal open is a layer. A route change without motion is a cut.',
    prompt: {
      base: 'Add a page transition between [A] and [B]',
      options: [
        { id: 'opt1', label: 'Fade', text: ' of 220ms ease-out' },
        { id: 'opt2', label: 'Shared element', text: ' if one object exists on both screens' },
        { id: 'opt3', label: 'Reduced motion', text: ' is an instant cut' }
      ],
      requirements: [
        'Keep it under 300ms unless it is a hero moment',
        'Do not block the next input longer than the motion',
        'Honor prefers-reduced-motion with a cut'
      ],
      scaffolds: {
        shadcn: '<Outlet /> with a fade wrapper',
        html: '<main class="page-fade">…</main>',
      },
    },
  },
  spring: {
    title: 'Spring / Bounce',
    definition: 'Motion that overshoots and settles, like a spring. Playful. Easy to overdo.',
    vibeTip: 'Use a small bounce on success (a check, a like). Never on a form error or a page of text.',
    comparison: 'A spring overshoots. Ease-out lands. A bounce that never dies is a bug.',
    prompt: {
      base: 'Add a spring to [element]',
      options: [
        { id: 'opt1', label: 'Small', text: ' overshoot (1.04 to 1, not 1.3)' },
        { id: 'opt2', label: 'Success only', text: ' (like, add-to-cart), never errors' },
        { id: 'opt3', label: 'Reduced motion', text: ' is a fade or a still' }
      ],
      requirements: [
        'One bounce, then rest',
        'Do not spring layout shifts',
        'Honor prefers-reduced-motion'
      ],
      scaffolds: {
        shadcn: '<div className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />',
        html: '<div class="spring"></div>',
      },
    },
  },
  hovermicro: {
    title: 'Hover Micro-interaction',
    definition: 'A tiny response to hover or focus: lift, scale, color. It says this is clickable.',
    vibeTip: 'Ask for 120-180ms ease-out, a 2-4px lift or 1.02 scale, and the same treatment on keyboard focus.',
    comparison: 'Hover micro is a hint. A page transition is a scene change. A spring is a celebration.',
    prompt: {
      base: 'Add hover micro-interactions to [buttons and cards]',
      options: [
        { id: 'opt1', label: 'Lift', text: ' of 2-4px or scale 1.02' },
        { id: 'opt2', label: 'Focus match', text: ' so keyboard users get the same hint' },
        { id: 'opt3', label: 'Reduced motion', text: ' uses color only, no travel' }
      ],
      requirements: [
        'Match hover and focus-visible',
        'Keep it under 180ms',
        'Do not move layout around the control'
      ],
      scaffolds: {
        shadcn: '<button className="transition duration-150 ease-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5" />',
        html: '<button class="lift">Save</button>',
      },
    },
  },
  confetti: {
    title: 'Confetti / Celebration',
    definition: 'A short burst of particles when something good happens. Once. Then it is gone.',
    vibeTip: 'Trigger on a real win (first save, invite sent). 600-900ms. Never loop. Skip on reduced motion.',
    comparison: 'Confetti is a one-shot. A particle field is weather. A toast is the message.',
    prompt: {
      base: 'Add a celebration burst when [success event] happens',
      options: [
        { id: 'opt1', label: 'Once', text: ' and gone in under a second' },
        { id: 'opt2', label: 'Respect reduced motion', text: ' (no burst, keep the toast)' },
        { id: 'opt3', label: 'Canvas-free', text: ' CSS dots are enough' }
      ],
      requirements: [
        'Do not loop',
        'Do not block the next action',
        'Pair with a real success message'
      ],
      scaffolds: {
        shadcn: 'burst() on success, then unmount',
        html: '<div class="confetti" hidden></div>',
      },
    },
  },
  countup: {
    title: 'Count-up / Ticker',
    definition: 'A number that climbs from 0 to the real value. Useful on stat cards. Easy to make nauseating.',
    vibeTip: 'Ease-out, 600-900ms, respect reduced motion (show the final number). Announce the final value, not every tick.',
    comparison: 'A count-up is a stat entering. A progress bar is work in progress. A ticker that never stops is a stock widget.',
    prompt: {
      base: 'Animate the number on [stat card]',
      options: [
        { id: 'opt1', label: 'Ease-out', text: ' from 0 to the value in about 700ms' },
        { id: 'opt2', label: 'Final only', text: ' for screen readers (aria-label the result)' },
        { id: 'opt3', label: 'Reduced motion', text: ' shows the final number immediately' }
      ],
      requirements: [
        'Do not tick every frame for assistive tech',
        'Round to the display format before you start',
        'Honor prefers-reduced-motion'
      ],
      scaffolds: {
        shadcn: '<span aria-label="128 learners">{n}</span>',
        html: '<span aria-label="128 learners">128</span>',
      },
    },
  },
  sharedmorph: {
    title: 'Shared-element Morph',
    definition: 'One object that lives on screen A and screen B, and the motion connects them. A card becomes a page.',
    vibeTip: 'Name the shared element (the thumbnail, the title). Keep the morph under 300ms. Fall back to a fade if reduced motion is on.',
    comparison: 'A shared morph is a handoff. A page fade is a cut with manners. A zoom-everywhere is a cheap trick.',
    prompt: {
      base: 'Morph [element] from [list] into [detail]',
      options: [
        { id: 'opt1', label: 'Named element', text: ' (image or title) as the shared node' },
        { id: 'opt2', label: 'Under 300ms', text: ' ease-out' },
        { id: 'opt3', label: 'Reduced motion', text: ' is a fade, not a travel' }
      ],
      requirements: [
        'Only morph if the object exists on both sides',
        'Do not morph text that will reflow',
        'Honor prefers-reduced-motion'
      ],
      scaffolds: {
        shadcn: 'layoutId="card-12" on both ends',
        html: '<div data-shared="card-12"></div>',
      },
    },
  },
  marquee: {
    title: 'Marquee',
    definition: 'A strip of text or logos that travels sideways. Fine for a logo wall. Bad for anything someone needs to read.',
    vibeTip: 'Pause on hover. Duplicate the row so the loop is seamless. Freeze on reduced motion (show a static wrap).',
    comparison: 'A marquee is a loop. A carousel is a set of slides. Infinite scroll is a feed.',
    prompt: {
      base: 'Add a marquee of [logos or words] on [band]',
      options: [
        { id: 'opt1', label: 'Seamless loop', text: ' with a duplicated track' },
        { id: 'opt2', label: 'Pause on hover', text: ' and on focus-within' },
        { id: 'opt3', label: 'Reduced motion', text: ' shows a static wrapped row' }
      ],
      requirements: [
        'Never put the only copy in a moving strip',
        'Pause when the user hovers or focuses',
        'Honor prefers-reduced-motion'
      ],
      scaffolds: {
        shadcn: '<div className="overflow-hidden"><div className="animate-marquee">…</div></div>',
        html: '<div class="marquee"><div class="track">…</div></div>',
      },
    },
  },
};
