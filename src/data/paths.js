// Curated learning paths — cover all 44 components in 6 themed sequences.
// Each path has: id, name, description, items (ordered ids), quiz (5 scenario questions).
// Quiz answers reference component ids that live in the path's items list.

export const PATHS = [
  {
    id: 'overlays',
    name: 'Overlay Essentials',
    tagline: 'Things that sit on top of your UI',
    description:
      'Modals, drawers, popovers, tooltips, and toasts all "float" above your page — but each one behaves differently. Learn when to block the user, when to allow outside clicks, and when to just whisper.',
    items: ['modal', 'drawer', 'popover', 'tooltip', 'toast'],
    quiz: [
      {
        q: 'A user is about to permanently delete their account. You need a forceful confirmation they can\'t dismiss by clicking outside. Use a…',
        answerId: 'modal',
        optionIds: ['modal', 'toast', 'tooltip', 'popover'],
      },
      {
        q: 'A user hovers a small icon they don\'t recognize. What shows a brief label?',
        answerId: 'tooltip',
        optionIds: ['tooltip', 'modal', 'drawer', 'toast'],
      },
      {
        q: '"Item added to cart" appears briefly in the corner and auto-dismisses. That\'s a…',
        answerId: 'toast',
        optionIds: ['toast', 'modal', 'popover', 'tooltip'],
      },
      {
        q: 'A filter panel slides in from the right edge of the screen. Which component?',
        answerId: 'drawer',
        optionIds: ['drawer', 'modal', 'popover', 'toast'],
      },
      {
        q: 'Clicking a user\'s avatar opens a small floating card anchored next to it, and clicking outside closes it. That\'s a…',
        answerId: 'popover',
        optionIds: ['popover', 'tooltip', 'modal', 'toast'],
      },
    ],
  },
  {
    id: 'forms',
    name: 'Form Fundamentals',
    tagline: 'The everyday form controls',
    description:
      'Every form you build will use these. Selects, switches, radios, sliders, pickers, ratings, and multi-step wizards — each one exists because a checkbox alone can\'t do the job.',
    items: ['select', 'switch', 'radio', 'slider', 'datepicker', 'rating', 'stepper'],
    quiz: [
      {
        q: 'A simple on/off setting like "Email notifications." Best component?',
        answerId: 'switch',
        optionIds: ['switch', 'radio', 'select', 'slider'],
      },
      {
        q: 'Picking a numeric value from a range where the user can feel the scale (e.g. volume). Use a…',
        answerId: 'slider',
        optionIds: ['slider', 'select', 'switch', 'rating'],
      },
      {
        q: 'One answer from a short set of mutually exclusive options, all visible at once. That\'s a…',
        answerId: 'radio',
        optionIds: ['radio', 'select', 'switch', 'datepicker'],
      },
      {
        q: 'Breaking a long signup form into Step 1 → Step 2 → Review calls for a…',
        answerId: 'stepper',
        optionIds: ['stepper', 'select', 'datepicker', 'rating'],
      },
      {
        q: 'Letting a user give 4 of 5 stars on a review. Use a…',
        answerId: 'rating',
        optionIds: ['rating', 'slider', 'switch', 'radio'],
      },
    ],
  },
  {
    id: 'data',
    name: 'Data & Display',
    tagline: 'Show information at a glance',
    description:
      'Tables, lists, trees, calendars, stat cards, masonry grids, and carousels — different shapes of data want different containers. Pick the wrong one and your page feels wrong.',
    items: ['table', 'list', 'tree', 'calendar', 'statcard', 'masonry', 'carousel'],
    quiz: [
      {
        q: 'Displaying a single key metric (e.g. "Revenue: $42K, +12%"). That\'s a…',
        answerId: 'statcard',
        optionIds: ['statcard', 'table', 'list', 'carousel'],
      },
      {
        q: 'A hierarchical folder structure where users expand and collapse nodes. Use a…',
        answerId: 'tree',
        optionIds: ['tree', 'list', 'table', 'masonry'],
      },
      {
        q: 'Rows of structured data with sortable, comparable columns. That\'s a…',
        answerId: 'table',
        optionIds: ['table', 'list', 'calendar', 'tree'],
      },
      {
        q: 'A Pinterest-style grid of images where tiles have different heights. That\'s a…',
        answerId: 'masonry',
        optionIds: ['masonry', 'carousel', 'list', 'table'],
      },
      {
        q: 'Swipeable product images on a detail page, showing one at a time. That\'s a…',
        answerId: 'carousel',
        optionIds: ['carousel', 'masonry', 'list', 'statcard'],
      },
    ],
  },
  {
    id: 'feedback',
    name: 'Status & Feedback',
    tagline: 'Telling the user what\'s happening',
    description:
      'Alerts, empty states, badges, avatars, timelines, skeletons, and progress bars. These are the tiny signals that make an interface feel alive, responsive, and trustworthy.',
    items: ['alert', 'empty', 'badge', 'avatars', 'timeline', 'skeleton', 'progress'],
    quiz: [
      {
        q: 'The search returned zero results. What goes in that space?',
        answerId: 'empty',
        optionIds: ['empty', 'alert', 'skeleton', 'badge'],
      },
      {
        q: 'A placeholder that mimics the shape of content while real data is loading. That\'s a…',
        answerId: 'skeleton',
        optionIds: ['skeleton', 'progress', 'empty', 'alert'],
      },
      {
        q: 'A tiny number on a menu icon showing "3 unread." That\'s a…',
        answerId: 'badge',
        optionIds: ['badge', 'alert', 'avatars', 'progress'],
      },
      {
        q: 'A banner at the top of the page warning "Your trial expires in 3 days." Use a…',
        answerId: 'alert',
        optionIds: ['alert', 'badge', 'empty', 'timeline'],
      },
      {
        q: 'An ordered visual history: "Ordered → Shipped → Delivered." That\'s a…',
        answerId: 'timeline',
        optionIds: ['timeline', 'progress', 'alert', 'avatars'],
      },
    ],
  },
  {
    id: 'pages',
    name: 'Pages & Layout',
    tagline: 'Structure a full page',
    description:
      'Sidebars, tabs, breadcrumbs, accordions, cards, heroes, pricing tables, testimonials, FAQ. These are the big building blocks of a real page — from the nav rail to the marketing sections below the fold.',
    items: ['sidebar', 'tabs', 'breadcrumbs', 'accordion', 'card', 'hero', 'pricing', 'testimonial', 'faq'],
    quiz: [
      {
        q: 'The big attention-grabbing section at the top of a landing page. That\'s a…',
        answerId: 'hero',
        optionIds: ['hero', 'card', 'sidebar', 'accordion'],
      },
      {
        q: 'Switching between "Overview / Details / Reviews" within the same view. Use…',
        answerId: 'tabs',
        optionIds: ['tabs', 'accordion', 'breadcrumbs', 'sidebar'],
      },
      {
        q: '"Home / Products / Shoes / Running" trail near the top of a page. That\'s…',
        answerId: 'breadcrumbs',
        optionIds: ['breadcrumbs', 'tabs', 'sidebar', 'hero'],
      },
      {
        q: 'Comparing your Free / Pro / Enterprise plans in columns. That\'s a…',
        answerId: 'pricing',
        optionIds: ['pricing', 'card', 'testimonial', 'hero'],
      },
      {
        q: 'A stack of "Q: … A: …" items where only one answer is open at a time. That\'s an…',
        answerId: 'accordion',
        optionIds: ['accordion', 'tabs', 'faq', 'breadcrumbs'],
      },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced Patterns',
    tagline: 'Power-user interactions',
    description:
      'OTP fields, file dropzones, tag inputs, rich text editors, command palettes, context menus, drag-and-drop, lightboxes, and infinite scroll. These show up once you move past MVP — they make apps feel fast and fluent.',
    items: ['otp', 'dropzone', 'taginput', 'richtext', 'command', 'contextmenu', 'dragdrop', 'lightbox', 'infinitescroll'],
    quiz: [
      {
        q: 'A 6-digit verification code split across individual boxes. That\'s an…',
        answerId: 'otp',
        optionIds: ['otp', 'taginput', 'richtext', 'command'],
      },
      {
        q: 'Pressing ⌘K opens a searchable list to jump anywhere in the app. That\'s a…',
        answerId: 'command',
        optionIds: ['command', 'contextmenu', 'dropzone', 'lightbox'],
      },
      {
        q: 'Dragging files from your desktop onto an area that accepts uploads. That\'s a…',
        answerId: 'dropzone',
        optionIds: ['dropzone', 'dragdrop', 'taginput', 'lightbox'],
      },
      {
        q: 'Right-clicking a file in a list opens a small menu of actions. That\'s a…',
        answerId: 'contextmenu',
        optionIds: ['contextmenu', 'command', 'dragdrop', 'richtext'],
      },
      {
        q: 'Clicking an image thumbnail expands it to full-screen with prev/next controls. That\'s a…',
        answerId: 'lightbox',
        optionIds: ['lightbox', 'carousel', 'dropzone', 'dragdrop'],
      },
    ],
  },
];

export const PATH_IDS = PATHS.map(p => p.id);

export function getPath(id) {
  return PATHS.find(p => p.id === id);
}

// Count of components per path — used for progress bars.
export const PATH_SIZES = Object.fromEntries(
  PATHS.map(p => [p.id, p.items.length])
);
