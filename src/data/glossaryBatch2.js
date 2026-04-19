// Auto-generated glossary batch — 50 additional UI patterns.
// Merged into GLOSSARY_DATA in glossary.js

export const GLOSSARY_BATCH_2 = {
  spinner: {
    title: "Spinner / Loading",
    definition: "Indeterminate loading indicator — motion that says \"work in progress\" without a known percentage.",
    vibeTip: "Use \"Spinner\" or \"Loader2\" from Lucide. Pair with aria-busy and aria-live.",
    comparison: "Spinner is indeterminate. Progress bar shows a fraction. Skeleton shows layout placeholders.",
    prompt: {
      base: "Add an accessible loading spinner",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Spinner / Loading */}</div>",
        html: "<div class=\"component-spinner\" role=\"region\" aria-label=\"Spinner / Loading\"></div>",
      },
    },
  },

  linechart: {
    title: "Line Chart",
    definition: "Connects data points over time or sequence. Best for trends, not precise comparison of unrelated categories.",
    vibeTip: "Name Recharts LineChart or Chart.js line. Mention time axis and tooltips.",
    comparison: "Line chart shows trends. Bar chart compares categories. Area chart emphasizes volume under the line.",
    prompt: {
      base: "Create a line chart for time-series data",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Line Chart */}</div>",
        html: "<div class=\"component-linechart\" role=\"region\" aria-label=\"Line Chart\"></div>",
      },
    },
  },

  piechart: {
    title: "Pie / Donut Chart",
    definition: "Shows part-to-whole proportions as slices. Donut is a pie with a hollow center for a label.",
    vibeTip: "Specify innerRadius for donut. Limit slice count; group small values as \"Other\".",
    comparison: "Pie shows composition. Bar compares magnitudes. Line shows change over time.",
    prompt: {
      base: "Add a pie or donut chart for category share",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Pie / Donut Chart */}</div>",
        html: "<div class=\"component-piechart\" role=\"region\" aria-label=\"Pie / Donut Chart\"></div>",
      },
    },
  },

  multiselect: {
    title: "Multi-Select",
    definition: "Pick many values from a list — often a combobox with tags or checkmarks in a dropdown.",
    vibeTip: "Say \"multi-select\" and \"max selections\". Use for filters and assignees.",
    comparison: "Multi-select allows many. Single select picks one. Tag input creates freeform tags.",
    prompt: {
      base: "Build a multi-select dropdown for tags or filters",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Multi-Select */}</div>",
        html: "<div class=\"component-multiselect\" role=\"region\" aria-label=\"Multi-Select\"></div>",
      },
    },
  },

  daterange: {
    title: "Date Range Picker",
    definition: "Choose a start and end date in one control — common for analytics and booking.",
    vibeTip: "Request two calendars or a preset range (Last 7 days).",
    comparison: "Date range picks an interval. Date picker picks one day. Calendar shows a month grid.",
    prompt: {
      base: "Add a date range picker with presets",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Date Range Picker */}</div>",
        html: "<div class=\"component-daterange\" role=\"region\" aria-label=\"Date Range Picker\"></div>",
      },
    },
  },

  timepicker: {
    title: "Time Picker",
    definition: "Selects clock time — standalone or paired with a date.",
    vibeTip: "Specify 12h vs 24h and minute step.",
    comparison: "Time picker is for clock values. Date picker is for calendar days.",
    prompt: {
      base: "Implement a time picker field",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Time Picker */}</div>",
        html: "<div class=\"component-timepicker\" role=\"region\" aria-label=\"Time Picker\"></div>",
      },
    },
  },

  colorpicker: {
    title: "Color Picker",
    definition: "UI for choosing a color — hex, HSL, or swatches.",
    vibeTip: "Mention eyedropper, presets, and alpha channel if needed.",
    comparison: "Color picker sets a color value. Button triggers it. Swatches are quick presets.",
    prompt: {
      base: "Add a color picker with hex input and swatches",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Color Picker */}</div>",
        html: "<div class=\"component-colorpicker\" role=\"region\" aria-label=\"Color Picker\"></div>",
      },
    },
  },

  combobox: {
    title: "Combobox / Autocomplete",
    definition: "Searchable select: type to filter options; still pick from a controlled list.",
    vibeTip: "Use \"Combobox\" in Shadcn. Distinguish from free-text search.",
    comparison: "Combobox filters a list. Command palette runs commands. Plain input accepts any string.",
    prompt: {
      base: "Build a combobox with async search",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Combobox / Autocomplete */}</div>",
        html: "<div class=\"component-combobox\" role=\"region\" aria-label=\"Combobox / Autocomplete\"></div>",
      },
    },
  },

  inputgroup: {
    title: "Input Group",
    definition: "Text field with addons — prefix/suffix icons, currency, or units.",
    vibeTip: "Say \"leading addon\" and \"trailing button\". Keep focus order logical.",
    comparison: "Input group decorates one field. Fieldset groups many fields.",
    prompt: {
      base: "Create an input group with leading icon and suffix",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Input Group */}</div>",
        html: "<div class=\"component-inputgroup\" role=\"region\" aria-label=\"Input Group\"></div>",
      },
    },
  },

  textfield: {
    title: "Text Field",
    definition: "Single-line text input for names, titles, and search queries.",
    vibeTip: "Specify maxLength, clear button, and validation hints.",
    comparison: "Text field is one line. Textarea is many lines. Search field may be type=search.",
    prompt: {
      base: "Style a text input with label and validation",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Text Field */}</div>",
        html: "<div class=\"component-textfield\" role=\"region\" aria-label=\"Text Field\"></div>",
      },
    },
  },

  passwordfield: {
    title: "Password Field",
    definition: "Masked input for secrets, often with show/hide toggle and strength hints.",
    vibeTip: "Ask for strength meter rules and paste behavior.",
    comparison: "Password field masks input. OTP uses separate boxes. PIN is numeric.",
    prompt: {
      base: "Add a password field with show/hide toggle",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Password Field */}</div>",
        html: "<div class=\"component-passwordfield\" role=\"region\" aria-label=\"Password Field\"></div>",
      },
    },
  },

  splitpane: {
    title: "Split Pane / Resizable Panels",
    definition: "Two or more panes with a draggable divider — IDE layouts, preview + code.",
    vibeTip: "Use \"PanelGroup\" patterns or CSS resize. Mention min sizes.",
    comparison: "Split pane resizes regions. Sidebar is fixed chrome. Drawer is temporary.",
    prompt: {
      base: "Implement split panes with a draggable divider",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Split Pane / Resizable Panels */}</div>",
        html: "<div class=\"component-splitpane\" role=\"region\" aria-label=\"Split Pane / Resizable Panels\"></div>",
      },
    },
  },

  menubar: {
    title: "Menu Bar",
    definition: "Horizontal row of menus (File, Edit, View) — desktop-app pattern.",
    vibeTip: "Keyboard accelerators and nested submenus matter.",
    comparison: "Menubar is persistent top menus. Dropdown menu is contextual. Context menu is right-click.",
    prompt: {
      base: "Add a desktop-style menu bar",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Menu Bar */}</div>",
        html: "<div class=\"component-menubar\" role=\"region\" aria-label=\"Menu Bar\"></div>",
      },
    },
  },

  megamenu: {
    title: "Mega Menu",
    definition: "Large dropdown with columns of links, sometimes media — for dense site nav.",
    vibeTip: "Specify columns, headings, and mobile fallback.",
    comparison: "Mega menu is wide navigation. Dropdown menu is compact.",
    prompt: {
      base: "Build a mega menu with columns",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Mega Menu */}</div>",
        html: "<div class=\"component-megamenu\" role=\"region\" aria-label=\"Mega Menu\"></div>",
      },
    },
  },

  bottomnav: {
    title: "Bottom Navigation",
    definition: "Fixed tab bar for primary sections on mobile — 3–5 targets.",
    vibeTip: "Use clear icons and labels; avoid too many items.",
    comparison: "Bottom nav is mobile primary. Sidebar is desktop. Tabs switch within a view.",
    prompt: {
      base: "Add a bottom navigation bar for mobile",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Bottom Navigation */}</div>",
        html: "<div class=\"component-bottomnav\" role=\"region\" aria-label=\"Bottom Navigation\"></div>",
      },
    },
  },

  segmented: {
    title: "Segmented Control",
    definition: "Mutually exclusive options styled as a connected control — like iOS segments.",
    vibeTip: "Often 2–5 options; avoid overcrowding.",
    comparison: "Segmented control picks one mode. Tabs switch pages. Radio group is form-oriented.",
    prompt: {
      base: "Create a segmented control for view modes",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Segmented Control */}</div>",
        html: "<div class=\"component-segmented\" role=\"region\" aria-label=\"Segmented Control\"></div>",
      },
    },
  },

  virtuallist: {
    title: "Virtualized List",
    definition: "Renders only visible rows for huge lists — keeps scroll smooth.",
    vibeTip: "Name react-window, TanStack Virtual, or similar.",
    comparison: "Virtual list handles scale. Plain list is fine for small data.",
    prompt: {
      base: "Add a virtualized list for 10k+ rows",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Virtualized List */}</div>",
        html: "<div class=\"component-virtuallist\" role=\"region\" aria-label=\"Virtualized List\"></div>",
      },
    },
  },

  chatthread: {
    title: "Chat / Message Thread",
    definition: "Scrollable conversation of bubbles — chronological messages with avatars and timestamps.",
    vibeTip: "Specify message types: text, image, system.",
    comparison: "Chat thread is conversational. List feed is generic items. Activity stream shows events.",
    prompt: {
      base: "Build a chat message thread UI",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Chat / Message Thread */}</div>",
        html: "<div class=\"component-chatthread\" role=\"region\" aria-label=\"Chat / Message Thread\"></div>",
      },
    },
  },

  notificationcenter: {
    title: "Notification Center",
    definition: "Persistent panel of alerts — unlike toasts that disappear.",
    vibeTip: "Include read/unread and bulk actions.",
    comparison: "Notification center keeps history. Toast is ephemeral. Badge shows counts only.",
    prompt: {
      base: "Add a notification center panel",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Notification Center */}</div>",
        html: "<div class=\"component-notificationcenter\" role=\"region\" aria-label=\"Notification Center\"></div>",
      },
    },
  },

  codeblock: {
    title: "Code Block",
    definition: "Syntax-highlighted code with copy, line numbers, or file name.",
    vibeTip: "Name Shiki, Prism, or highlight.js.",
    comparison: "Code block displays static code. Terminal shows live output. Rich text editor is editable.",
    prompt: {
      base: "Add a syntax-highlighted code block",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Code Block */}</div>",
        html: "<div class=\"component-codeblock\" role=\"region\" aria-label=\"Code Block\"></div>",
      },
    },
  },

  mediaplayer: {
    title: "Media Player",
    definition: "Controls for video or audio — play, pause, seek, volume, fullscreen.",
    vibeTip: "Mention native controls vs custom skin and captions.",
    comparison: "Media player controls playback. Lightbox is image-focused.",
    prompt: {
      base: "Build a video player with custom controls",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Media Player */}</div>",
        html: "<div class=\"component-mediaplayer\" role=\"region\" aria-label=\"Media Player\"></div>",
      },
    },
  },

  imagecropper: {
    title: "Image Cropper",
    definition: "Lets users frame a region before upload — aspect ratio, zoom, rotate.",
    vibeTip: "Specify fixed aspect for avatars or banners.",
    comparison: "Cropper prepares images. Dropzone accepts files. Lightbox previews images.",
    prompt: {
      base: "Add an image cropper with aspect ratio presets",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Image Cropper */}</div>",
        html: "<div class=\"component-imagecropper\" role=\"region\" aria-label=\"Image Cropper\"></div>",
      },
    },
  },

  mapview: {
    title: "Map Embed",
    definition: "Interactive map — markers, clusters, and user location.",
    vibeTip: "Name Mapbox, Google Maps, or Leaflet. Mention API keys.",
    comparison: "Map shows geography. List shows rows. Tree shows hierarchy.",
    prompt: {
      base: "Embed an interactive map with markers",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Map Embed */}</div>",
        html: "<div class=\"component-mapview\" role=\"region\" aria-label=\"Map Embed\"></div>",
      },
    },
  },

  shortcutkeys: {
    title: "Keyboard Shortcuts",
    definition: "Kbd elements and shortcut hints — discoverability for power users.",
    vibeTip: "List modifiers: ⌘, ⌥, ⇧.",
    comparison: "Shortcut hints show keys. Command palette executes actions.",
    prompt: {
      base: "Display keyboard shortcuts in a help panel",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Keyboard Shortcuts */}</div>",
        html: "<div class=\"component-shortcutkeys\" role=\"region\" aria-label=\"Keyboard Shortcuts\"></div>",
      },
    },
  },

  disclosure: {
    title: "Disclosure",
    definition: "Simple show/hide pattern — one section toggles with a button.",
    vibeTip: "Often details/summary; simpler than accordion for one block.",
    comparison: "Disclosure toggles one region. Accordion manages many. Collapsible is generic.",
    prompt: {
      base: "Add a disclosure collapsible section",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Disclosure */}</div>",
        html: "<div class=\"component-disclosure\" role=\"region\" aria-label=\"Disclosure\"></div>",
      },
    },
  },

  scrollarea: {
    title: "Scroll Area",
    definition: "Custom scrollable region with styled scrollbars — not the whole page.",
    vibeTip: "Mention shadow scroll hints and overflow.",
    comparison: "Scroll area wraps overflow. Page scroll is the viewport.",
    prompt: {
      base: "Add a scroll area with custom scrollbars",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Scroll Area */}</div>",
        html: "<div class=\"component-scrollarea\" role=\"region\" aria-label=\"Scroll Area\"></div>",
      },
    },
  },

  stickyheader: {
    title: "Sticky Table Header",
    definition: "Header row stays visible while body rows scroll — large data tables.",
    vibeTip: "Pair with sticky columns for complex grids.",
    comparison: "Sticky header locks column titles. Card grid is not a table.",
    prompt: {
      base: "Make a table with a sticky header row",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Sticky Table Header */}</div>",
        html: "<div class=\"component-stickyheader\" role=\"region\" aria-label=\"Sticky Table Header\"></div>",
      },
    },
  },

  toolbar: {
    title: "Toolbar",
    definition: "Row of formatting or action buttons — common above editors or tables.",
    vibeTip: "Group related tools; support keyboard focus.",
    comparison: "Toolbar clusters actions. Command palette is search-first. Menu bar is app-level.",
    prompt: {
      base: "Add a formatting toolbar for bold, italic, and links",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Toolbar */}</div>",
        html: "<div class=\"component-toolbar\" role=\"region\" aria-label=\"Toolbar\"></div>",
      },
    },
  },

  cookieconsent: {
    title: "Cookie Consent Banner",
    definition: "Banner for analytics/marketing consent — legal copy and accept/decline.",
    vibeTip: "Link to privacy policy; store consent choice.",
    comparison: "Cookie banner is legal notice. Alert is informational. Toast is transient.",
    prompt: {
      base: "Add a cookie consent banner",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Cookie Consent Banner */}</div>",
        html: "<div class=\"component-cookieconsent\" role=\"region\" aria-label=\"Cookie Consent Banner\"></div>",
      },
    },
  },

  sharesheet: {
    title: "Share Sheet",
    definition: "Mobile-style sheet with share targets — OS pattern adapted for web.",
    vibeTip: "Include copy link and native share when available.",
    comparison: "Share sheet offers actions. Drawer is generic panel. Action sheet is iOS choices.",
    prompt: {
      base: "Implement a share sheet with social targets",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Share Sheet */}</div>",
        html: "<div class=\"component-sharesheet\" role=\"region\" aria-label=\"Share Sheet\"></div>",
      },
    },
  },

  presencedot: {
    title: "Presence Indicator",
    definition: "Online/away/busy dot on avatars or chat.",
    vibeTip: "Use color semantics and optional label for a11y.",
    comparison: "Presence shows status. Badge shows counts. Avatar shows identity.",
    prompt: {
      base: "Add presence indicators on avatars",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Presence Indicator */}</div>",
        html: "<div class=\"component-presencedot\" role=\"region\" aria-label=\"Presence Indicator\"></div>",
      },
    },
  },

  countdown: {
    title: "Countdown Timer",
    definition: "Counts down to an event — launches, sales, or OTP expiry.",
    vibeTip: "Specify format and timezone.",
    comparison: "Countdown targets a future. Progress bar shows partial completion.",
    prompt: {
      base: "Add a countdown timer to a target date",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Countdown Timer */}</div>",
        html: "<div class=\"component-countdown\" role=\"region\" aria-label=\"Countdown Timer\"></div>",
      },
    },
  },

  relativetime: {
    title: "Relative Time",
    definition: "Human-readable \"2h ago\" / \"in 3 days\" with live updates.",
    vibeTip: "Pair with a tooltip for full timestamp.",
    comparison: "Relative time is fuzzy. Calendar shows absolute dates.",
    prompt: {
      base: "Show relative time with a tooltip for full date",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Relative Time */}</div>",
        html: "<div class=\"component-relativetime\" role=\"region\" aria-label=\"Relative Time\"></div>",
      },
    },
  },

  qrcode: {
    title: "QR Code",
    definition: "Encodes a URL or payload as a scannable image.",
    vibeTip: "Use for pairing, payments, or app download links.",
    comparison: "QR encodes data. Barcode is linear. Link card is clickable preview.",
    prompt: {
      base: "Display a QR code for a URL",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* QR Code */}</div>",
        html: "<div class=\"component-qrcode\" role=\"region\" aria-label=\"QR Code\"></div>",
      },
    },
  },

  fileuploadrow: {
    title: "File Upload Row",
    definition: "Row showing selected file name, size, and progress — multi-file flows.",
    vibeTip: "Include remove and retry.",
    comparison: "Upload row tracks one file. Dropzone is the drop target. Progress bar is generic.",
    prompt: {
      base: "Add file upload rows with progress",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* File Upload Row */}</div>",
        html: "<div class=\"component-fileuploadrow\" role=\"region\" aria-label=\"File Upload Row\"></div>",
      },
    },
  },

  searchfield: {
    title: "Search Field",
    definition: "Dedicated search input — often with ⌘K, clear, and recent queries.",
    vibeTip: "Use type=search and aria for the combobox pattern.",
    comparison: "Search field is for queries. Text field is generic. Command palette is global.",
    prompt: {
      base: "Build a search field with recent queries",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Search Field */}</div>",
        html: "<div class=\"component-searchfield\" role=\"region\" aria-label=\"Search Field\"></div>",
      },
    },
  },

  linkcard: {
    title: "Link Preview Card",
    definition: "Card with title, description, and image from a URL — open graph style.",
    vibeTip: "Mention fallbacks when metadata is missing.",
    comparison: "Link preview summarizes URLs. Stat card shows metrics.",
    prompt: {
      base: "Add a link preview card component",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Link Preview Card */}</div>",
        html: "<div class=\"component-linkcard\" role=\"region\" aria-label=\"Link Preview Card\"></div>",
      },
    },
  },

  formcolumns: {
    title: "Responsive Form Layout",
    definition: "Multi-column form on large screens — stacks on mobile.",
    vibeTip: "Use CSS grid and consistent field order.",
    comparison: "Form columns layout fields. Input group is one control.",
    prompt: {
      base: "Create a responsive multi-column form",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Responsive Form Layout */}</div>",
        html: "<div class=\"component-formcolumns\" role=\"region\" aria-label=\"Responsive Form Layout\"></div>",
      },
    },
  },

  keyvalue: {
    title: "Key-Value List",
    definition: "Property list — label/value pairs for settings, inspectors, and APIs.",
    vibeTip: "Good for read-only metadata; editable rows use inline edit.",
    comparison: "Key-value list shows pairs. Table is tabular. Definition list is semantic HTML.",
    prompt: {
      base: "Build a key-value property list",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Key-Value List */}</div>",
        html: "<div class=\"component-keyvalue\" role=\"region\" aria-label=\"Key-Value List\"></div>",
      },
    },
  },

  sparkline: {
    title: "Sparkline",
    definition: "Tiny inline chart without axes — trend in a small space.",
    vibeTip: "Often paired with a KPI number.",
    comparison: "Sparkline is compact. Line chart is full. Stat card may hold both.",
    prompt: {
      base: "Add sparklines next to KPI numbers",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Sparkline */}</div>",
        html: "<div class=\"component-sparkline\" role=\"region\" aria-label=\"Sparkline\"></div>",
      },
    },
  },

  treegrid: {
    title: "Tree Grid",
    definition: "Hierarchical table — expandable rows with aligned columns.",
    vibeTip: "Heavier than tree view; use for file managers with metadata.",
    comparison: "Tree grid combines tree and table. Tree view is hierarchy only.",
    prompt: {
      base: "Build a tree grid with expandable rows",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Tree Grid */}</div>",
        html: "<div class=\"component-treegrid\" role=\"region\" aria-label=\"Tree Grid\"></div>",
      },
    },
  },

  kanban: {
    title: "Kanban Board",
    definition: "Columns of cards with drag-and-drop between stages — workflow boards.",
    vibeTip: "Name columns, WIP limits, and card identity.",
    comparison: "Kanban is workflow columns. Table is rows. List is linear.",
    prompt: {
      base: "Create a kanban board with draggable cards",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Kanban Board */}</div>",
        html: "<div class=\"component-kanban\" role=\"region\" aria-label=\"Kanban Board\"></div>",
      },
    },
  },

  activitystream: {
    title: "Activity Stream",
    definition: "Chronological feed of events — \"User X did Y\".",
    vibeTip: "Include actor, verb, object, and timestamp.",
    comparison: "Activity stream is event log. Chat is conversational. List is generic.",
    prompt: {
      base: "Build an activity stream feed",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Activity Stream */}</div>",
        html: "<div class=\"component-activitystream\" role=\"region\" aria-label=\"Activity Stream\"></div>",
      },
    },
  },

  filterpanel: {
    title: "Filter Panel",
    definition: "Sidebar or drawer of filters — often paired with tables or maps.",
    vibeTip: "Sync filters to URL for shareable views.",
    comparison: "Filter panel is dense filters. Filter bar is horizontal chips.",
    prompt: {
      base: "Add a filter sidebar panel",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Filter Panel */}</div>",
        html: "<div class=\"component-filterpanel\" role=\"region\" aria-label=\"Filter Panel\"></div>",
      },
    },
  },

  radiocards: {
    title: "Radio Cards",
    definition: "Radio choices as large cards — easier to scan than a small list.",
    vibeTip: "Keep mutually exclusive options visually distinct.",
    comparison: "Radio cards are big radios. Card grid is generic.",
    prompt: {
      base: "Style radio options as selectable cards",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Radio Cards */}</div>",
        html: "<div class=\"component-radiocards\" role=\"region\" aria-label=\"Radio Cards\"></div>",
      },
    },
  },

  togglebutton: {
    title: "Toggle Button",
    definition: "Button that stays pressed or released — bold, italic, or view filters.",
    vibeTip: "Use aria-pressed for state.",
    comparison: "Toggle button is binary. Segmented control picks one of many. Switch is settings.",
    prompt: {
      base: "Add toggle buttons for a toolbar",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Toggle Button */}</div>",
        html: "<div class=\"component-togglebutton\" role=\"region\" aria-label=\"Toggle Button\"></div>",
      },
    },
  },

  actionsheet: {
    title: "Action Sheet",
    definition: "Bottom sheet of quick actions — mobile pattern for destructive choices.",
    vibeTip: "Avoid too many actions; group with separators.",
    comparison: "Action sheet is bottom actions. Drawer is generic panel. Modal blocks focus.",
    prompt: {
      base: "Add a mobile action sheet",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Action Sheet */}</div>",
        html: "<div class=\"component-actionsheet\" role=\"region\" aria-label=\"Action Sheet\"></div>",
      },
    },
  },

  meter: {
    title: "Meter / Gauge",
    definition: "Shows value within a known range — disk usage, scores, or strength.",
    vibeTip: "Use meter element or role=\"progressbar\" with known max.",
    comparison: "Meter shows a level. Progress bar tracks completion. Spinner is indeterminate.",
    prompt: {
      base: "Add a meter gauge for usage percentage",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Meter / Gauge */}</div>",
        html: "<div class=\"component-meter\" role=\"region\" aria-label=\"Meter / Gauge\"></div>",
      },
    },
  },

  banner: {
    title: "Site Banner",
    definition: "Site-wide notice below the header — maintenance, promos, or alerts.",
    vibeTip: "Dismissible with localStorage; avoid stacking many banners.",
    comparison: "Banner is site-wide. Alert is inline. Toast is transient.",
    prompt: {
      base: "Add a dismissible site banner",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Site Banner */}</div>",
        html: "<div class=\"component-banner\" role=\"region\" aria-label=\"Site Banner\"></div>",
      },
    },
  },

  hovercard: {
    title: "Hover Card",
    definition: "Rich preview on hover — user mini-profile, link preview, or definition.",
    vibeTip: "Delay open/close to avoid flicker; keyboard accessible.",
    comparison: "Hover card is rich hover content. Tooltip is short text. Popover is click.",
    prompt: {
      base: "Add a hover card for user profile preview",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Hover Card */}</div>",
        html: "<div class=\"component-hovercard\" role=\"region\" aria-label=\"Hover Card\"></div>",
      },
    },
  },

  producttour: {
    title: "Product Tour / Spotlight",
    definition: "Guided walkthrough that highlights UI regions step by step.",
    vibeTip: "Use focus trap and skip button; respect reduced motion.",
    comparison: "Tour highlights steps. Modal blocks everything. Tooltip is tiny.",
    prompt: {
      base: "Add a product tour with spotlight overlays",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Product Tour / Spotlight */}</div>",
        html: "<div class=\"component-producttour\" role=\"region\" aria-label=\"Product Tour / Spotlight\"></div>",
      },
    },
  },

  loadingoverlay: {
    title: "Loading Overlay",
    definition: "Full-screen or section overlay with spinner — blocks interaction while loading.",
    vibeTip: "Pair with aria-busy on the covered region.",
    comparison: "Loading overlay blocks a region. Spinner alone might be inline.",
    prompt: {
      base: "Add a loading overlay for async actions",
      options: [
        { id: 'opt1', label: 'Option A', text: ' with first enhancement' },
        { id: 'opt2', label: 'Option B', text: ' with second enhancement' },
        { id: 'opt3', label: 'Option C', text: ' with third enhancement' },
      ],
      requirements: [
        'Use semantic HTML and appropriate ARIA roles',
        'Support keyboard navigation where applicable',
        'Keep focus management predictable and visible',
      ],
      scaffolds: {
        shadcn: "<div className=\"rounded-lg border p-4\">{/* Loading Overlay */}</div>",
        html: "<div class=\"component-loadingoverlay\" role=\"region\" aria-label=\"Loading Overlay\"></div>",
      },
    },
  },
};
