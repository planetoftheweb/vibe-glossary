// Curated learning paths — all glossary component ids in 6 themed sequences (101 entries).
// Each path: id, name, description, items (ordered ids), quiz (5 questions).
// Quiz answers reference component ids that appear in that path's items list.

import { CATEGORIES } from './categories.jsx';

const ALL_COMPONENT_IDS = CATEGORIES.flatMap((c) => c.items.map((i) => i.id));

// Six contiguous slices covering every id once: 17+17+17+17+17+16 = 101
const SLICES = [
  [0, 17],
  [17, 34],
  [34, 51],
  [51, 68],
  [68, 85],
  [85, 101],
];

function sliceItems([a, b]) {
  return ALL_COMPONENT_IDS.slice(a, b);
}

export const PATHS = [
  {
    id: 'overlays',
    name: 'Surfaces & overlays',
    tagline: 'Dialogs, floating layers, and core controls',
    description:
      'Modals, drawers, sheets, toasts, and tooltips compete for attention — learn which one blocks the world, which whispers, and which pairs with your first-line inputs.',
    items: sliceItems(SLICES[0]),
    quiz: [
      {
        q: 'A destructive action needs an explicit confirmation; clicking the backdrop should not dismiss it. Use a…',
        answerId: 'modal',
        optionIds: ['modal', 'toast', 'tooltip', 'popover'],
      },
      {
        q: 'A short-lived “Saved” message appears in the corner and fades away. That’s a…',
        answerId: 'toast',
        optionIds: ['toast', 'modal', 'drawer', 'popover'],
      },
      {
        q: 'On mobile, destructive actions appear as a bottom sheet of buttons. That pattern is an…',
        answerId: 'actionsheet',
        optionIds: ['actionsheet', 'popover', 'drawer', 'toast'],
      },
      {
        q: 'A 6-digit verification code with one character per box is an…',
        answerId: 'otp',
        optionIds: ['otp', 'radio', 'slider', 'multiselect'],
      },
      {
        q: 'Choosing a brand accent from a spectrum with hex output calls for a…',
        answerId: 'colorpicker',
        optionIds: ['colorpicker', 'slider', 'switch', 'select'],
      },
    ],
  },
  {
    id: 'forms',
    name: 'Inputs & data chrome',
    tagline: 'Rich inputs meet tables and charts',
    description:
      'Comboboxes, grouped inputs, radio cards, and data tables work together — filters, pagination, and your first chart types show up once lists get real.',
    items: sliceItems(SLICES[1]),
    quiz: [
      {
        q: 'Typeahead search with keyboard highlight in a dropdown list is a…',
        answerId: 'combobox',
        optionIds: ['combobox', 'searchfield', 'textfield', 'inputgroup'],
      },
      {
        q: 'Mutually exclusive plans shown as large selectable tiles (not a tiny radio dot) are…',
        answerId: 'radiocards',
        optionIds: ['radiocards', 'togglebutton', 'table', 'list'],
      },
      {
        q: 'Rows of structured, sortable data with columns belongs in a…',
        answerId: 'table',
        optionIds: ['table', 'list', 'tree', 'calendar'],
      },
      {
        q: 'Comparing categories with vertical or stacked bars uses a…',
        answerId: 'barchart',
        optionIds: ['barchart', 'linechart', 'carousel', 'tree'],
      },
      {
        q: 'A KPI tile with a big number and delta vs. last period is a…',
        answerId: 'statcard',
        optionIds: ['statcard', 'table', 'calendar', 'barchart'],
      },
    ],
  },
  {
    id: 'data',
    name: 'Data shapes & flows',
    tagline: 'Visualization, density, and form journeys',
    description:
      'Line and pie charts, virtualized lists, maps, activity streams, and multi-step forms — pick the shape that matches how dense, hierarchical, or conversational your data is.',
    items: sliceItems(SLICES[2]),
    quiz: [
      {
        q: 'A thin trend line embedded next to a metric uses a…',
        answerId: 'sparkline',
        optionIds: ['sparkline', 'piechart', 'treegrid', 'mapview'],
      },
      {
        q: 'Part-to-whole percentages with a hollow center label is a donut /…',
        answerId: 'piechart',
        optionIds: ['piechart', 'sparkline', 'virtuallist', 'mapview'],
      },
      {
        q: 'A long chat history with alternating bubbles is a…',
        answerId: 'chatthread',
        optionIds: ['chatthread', 'virtuallist', 'activitystream', 'linkcard'],
      },
      {
        q: 'Breaking a long wizard into numbered steps uses a…',
        answerId: 'stepper',
        optionIds: ['stepper', 'datepicker', 'rating', 'taginput'],
      },
      {
        q: 'Scanning a ticket or deep-linking a device often uses a…',
        answerId: 'qrcode',
        optionIds: ['qrcode', 'linkcard', 'mapview', 'sparkline'],
      },
    ],
  },
  {
    id: 'feedback',
    name: 'Layout & navigation',
    tagline: 'Structure the page and move between modes',
    description:
      'Date ranges, split panes, app shells, tabs, mega menus, and disclosures — these patterns decide how users scan, filter, and jump without getting lost.',
    items: sliceItems(SLICES[3]),
    quiz: [
      {
        q: 'Picking “this week” vs. a custom start/end range needs a…',
        answerId: 'daterange',
        optionIds: ['daterange', 'timepicker', 'toolbar', 'filterpanel'],
      },
      {
        q: 'A persistent frame with header, sidebar, and main region is an…',
        answerId: 'appshell',
        optionIds: ['appshell', 'sidebar', 'card', 'splitpane'],
      },
      {
        q: 'Switching between peer sections on one page with a labeled tab strip uses…',
        answerId: 'tabs',
        optionIds: ['tabs', 'accordion', 'menubar', 'breadcrumbs'],
      },
      {
        q: 'Desktop-style menus anchored at the top (File / Edit / Help) use a…',
        answerId: 'menubar',
        optionIds: ['menubar', 'dropdownmenu', 'toolbar', 'tabs'],
      },
      {
        q: 'Expand-only sections without routing, each with a chevron header, use…',
        answerId: 'accordion',
        optionIds: ['accordion', 'tabs', 'scrollarea', 'formcolumns'],
      },
    ],
  },
  {
    id: 'pages',
    name: 'Interactions & status',
    tagline: 'Gestures, overflow, and loading states',
    description:
      'Context menus, drag-and-drop, lightboxes, kanban boards, alerts, and skeletons — the patterns that make dense apps feel fast, fair, and forgiving.',
    items: sliceItems(SLICES[4]),
    quiz: [
      {
        q: 'Right-clicking a row to expose Cut / Copy / Delete is a…',
        answerId: 'contextmenu',
        optionIds: ['contextmenu', 'disclosure', 'megamenu', 'sharesheet'],
      },
      {
        q: 'Columns of cards moving between “Todo / Doing / Done” describes a…',
        answerId: 'kanban',
        optionIds: ['kanban', 'infinitescroll', 'lightbox', 'dragdrop'],
      },
      {
        q: 'A neutral inline notice that doesn’t block the page is often an…',
        answerId: 'alert',
        optionIds: ['alert', 'empty', 'badge', 'skeleton'],
      },
      {
        q: 'Grey rectangles that mimic final layout while data loads are…',
        answerId: 'skeleton',
        optionIds: ['skeleton', 'empty', 'badge', 'avatars'],
      },
      {
        q: 'A chronological list of events with icons and timestamps is a…',
        answerId: 'timeline',
        optionIds: ['timeline', 'badge', 'avatars', 'alert'],
      },
    ],
  },
  {
    id: 'advanced',
    name: 'Polish & marketing',
    tagline: 'Feedback loops and the outer shell',
    description:
      'Spinners, code blocks, keyboard hints, presence, countdowns, and hero sections — finishing touches that build trust, clarity, and launch-day storytelling.',
    items: sliceItems(SLICES[5]),
    quiz: [
      {
        q: 'Indeterminate work-in-progress with no known percent uses a…',
        answerId: 'spinner',
        optionIds: ['spinner', 'progress', 'meter', 'presencedot'],
      },
      {
        q: 'A dedicated inbox panel listing mentions, deploys, and system notices is a…',
        answerId: 'notificationcenter',
        optionIds: ['notificationcenter', 'banner', 'cookieconsent', 'codeblock'],
      },
      {
        q: 'Syntax-highlighted snippet with copy affordance is a…',
        answerId: 'codeblock',
        optionIds: ['codeblock', 'shortcutkeys', 'faq', 'mediaplayer'],
      },
      {
        q: '“2h ago” next to a timestamp uses…',
        answerId: 'relativetime',
        optionIds: ['relativetime', 'countdown', 'meter', 'presencedot'],
      },
      {
        q: 'Cookie law notice with Accept / Reject across the bottom is…',
        answerId: 'cookieconsent',
        optionIds: ['cookieconsent', 'banner', 'faq', 'hero'],
      },
    ],
  },
];

export const PATH_IDS = PATHS.map((p) => p.id);

export function getPath(id) {
  return PATHS.find((p) => p.id === id);
}

export const PATH_SIZES = Object.fromEntries(PATHS.map((p) => [p.id, p.items.length]));
