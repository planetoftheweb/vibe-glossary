// Glossary batch 2 — learner-focused prompt toggles (opt1–opt3) + pattern-specific requirements.
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
        { id: 'opt1', label: 'Status text', text: ', with visible text like \"Saving…\" or \"Loading…\" beside the icon' },
        { id: 'opt2', label: 'Live region', text: ', announcing busy state with aria-live=\"polite\" (assertive only if blocking critical UI)' },
        { id: 'opt3', label: 'Reduced motion', text: ', respecting prefers-reduced-motion (swap spin for pulse, opacity, or a static icon)' },
      ],
      requirements: [
        'Set aria-busy="true" on the loading region while work is in progress',
        'Do not rely on motion alone — pair with text and/or aria-live',
        'When loading completes, clear busy state and restore any stolen focus',
      ],
      scaffolds: {
        shadcn: `<div role="status" aria-busy className="flex items-center gap-2">\n  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />\n  <span>Loading…</span>\n</div>`,
        html: `<div role="status" aria-busy="true" aria-live="polite"><span class="sr-only">Loading</span></div>`,
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
        { id: 'opt1', label: 'Axes & grid', text: ' with labeled time (X) and value (Y) axes and a light grid so readers can estimate values' },
        { id: 'opt2', label: 'Tooltips', text: ' with tooltips (hover + keyboard focus) showing exact timestamp and value' },
        { id: 'opt3', label: 'Multi-series', text: ' comparing two metrics with distinct stroke colors, dashed vs solid, or shapes — plus a legend' },
      ],
      requirements: [
        'Use a continuous ordered X domain (time or sequence), not categorical bar spacing',
        'Provide a non-visual fallback: summary, data table, or CSV link — the chart is not sufficient alone for a11y',
        'Declare units on the Y axis (%, USD, ms) and timezone or format for dates',
      ],
      scaffolds: {
        shadcn: `<div className="h-64 w-full">{/* <LineChart data={points} x="t" y="v" /> */}</div>`,
        html: `<figure aria-label="Signups over time"><table class="sr-only">…</table></figure>`,
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
        { id: 'opt1', label: 'Donut', text: ' as a donut with innerRadius and optional total or label in the hole' },
        { id: 'opt2', label: 'Percent labels', text: ' with slice labels or leader lines so values are not color-only' },
        { id: 'opt3', label: '"Other" bucket', text: ', merging tiny slices under a threshold into one \"Other\" category' },
      ],
      requirements: [
        'Keep ≤6–7 slices where possible; merge long tails into "Other"',
        'Include a text table or list of category + percent alongside the chart',
        'Ensure legend and labels are readable in dark mode and for color-blind users',
      ],
      scaffolds: {
        shadcn: `<div className="aspect-square max-w-xs">{/* PieChart innerRadius={52} */}</div>`,
        html: `<figure aria-label="Share by source"><figcaption class="sr-only">…</figcaption></figure>`,
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
        { id: 'opt1', label: 'Max selections', text: ', enforcing a max count with inline validation before submit' },
        { id: 'opt2', label: 'Bulk actions', text: ', with \"Select all\" / \"Clear\" when the option list is bounded and not huge' },
        { id: 'opt3', label: 'Keyboard', text: ", supporting typeahead, Arrow keys, Space/Enter to toggle, and Esc to close" },
      ],
      requirements: [
        'Expose role="combobox" + listbox multi-select semantics; selected chips must be removable with keyboard',
        'Announce updated selection count when it changes (polite live region)',
        'Loading and empty states for async option lists',
      ],
      scaffolds: {
        shadcn: `<Popover><Command>{/* Checkbox items + filter */}</Command></Popover>`,
        html: `<div role="group" aria-label="Assignees"><ul role="listbox" aria-multiselectable="true">…</ul></div>`,
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
        { id: 'opt1', label: 'Presets', text: ' with presets: Today, Last 7 days, This month, Custom…' },
        { id: 'opt2', label: 'Validation', text: ', disallowing end before start and showing errors inline' },
        { id: 'opt3', label: 'Timezone', text: ', stating the timezone for stored values (e.g. user local vs UTC)' },
      ],
      requirements: [
        'Keyboard: move between days, Home/End for week bounds, Enter to confirm',
        'Persist visible range in aria attributes and visible text fields',
        'Mobile: large touch targets; avoid hover-only affordances',
      ],
      scaffolds: {
        shadcn: `<Popover><Calendar mode="range" numberOfMonths={2} /></Popover>`,
        html: `<div role="group" aria-label="Date range"><input type="date" /> – <input type="date" /></div>`,
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
        { id: 'opt1', label: '12h / 24h', text: ' with explicit 12-hour AM/PM or 24-hour mode per locale' },
        { id: 'opt2', label: 'Step', text: ', using a sensible minute step (e.g. 5, 15, 30) and documenting it' },
        { id: 'opt3', label: 'Pairing', text: ', pairing with a date field when scheduling across midnight or DST' },
      ],
      requirements: [
        'Label must state format expectations (e.g. \"2:30 PM\" vs \"14:30\")',
        'Arrow keys or spinners should not trap focus; validate impossible times',
        'Expose value in a machine-readable way for forms (datetime-local or hidden ISO)',
      ],
      scaffolds: {
        shadcn: `<Select><SelectTrigger /><SelectContent>{/* hours + minutes */}</SelectContent></Select>`,
        html: `<label>Time <input type="time" step="300" /></label>`,
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
        { id: 'opt1', label: 'Alpha', text: ' with an alpha channel for overlays and glass effects' },
        { id: 'opt2', label: 'Swatches', text: ', including a palette of brand-consistent preset swatches' },
        { id: 'opt3', label: 'Eyedropper', text: ', using the EyeDropper API where supported with a text fallback' },
      ],
      requirements: [
        'Text input accepts #RGB / #RRGGBB and shows validation errors',
        'Preview swatch next to hex; do not rely on color alone for meaning',
        'Keyboard: focus order through inputs, sliders, and preset grid',
      ],
      scaffolds: {
        shadcn: `<Popover><input className="font-mono" defaultValue="#6366f1" /></Popover>`,
        html: `<input type="color" aria-label="Pick color" />`,
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
        { id: 'opt1', label: 'Loading / empty', text: ', showing loading, empty, and error states for async results' },
        { id: 'opt2', label: 'Creatable', text: ', optionally allowing a typed value when no match exists (clearly labeled)' },
        { id: 'opt3', label: 'Highlight', text: ', highlighting the matching substring in each option row' },
      ],
      requirements: [
        'Implement aria-expanded, aria-controls, and active-descendant or focus management per WAI-ARIA combobox pattern',
        'Debounce network calls; cancel in-flight requests on new input',
        'Preserve selection when the list closes and reopens',
      ],
      scaffolds: {
        shadcn: `<Popover><Command><CommandInput /><CommandList /></Command></Popover>`,
        html: `<input role="combobox" aria-autocomplete="list" aria-expanded="false" />`,
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
        { id: 'opt1', label: 'Trailing action', text: ' with a trailing icon button (e.g. clear or reveal) that stays in tab order after the input' },
        { id: 'opt2', label: 'Prefix text', text: ', adding non-editable prefix text like https:// or $ inside the field chrome' },
        { id: 'opt3', label: 'Widths', text: ', using min-w-0 and flex so the input shrinks correctly in narrow layouts' },
      ],
      requirements: [
        'One tab stop for the text control; addons are buttons with their own labels',
        'Clicking prefix/suffix must not steal focus from typing unintentionally',
        'Support RTL: leading/trailing swap logically in right-to-left locales',
      ],
      scaffolds: {
        shadcn: `<div className="flex rounded-md border"><span className="px-3">$</span><Input className="border-0" /></div>`,
        html: `<div class="input-group"><span class="addon">@</span><input type="text" /></div>`,
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
        { id: 'opt1', label: 'Helper text', text: ', pairing helper text and aria-describedby with error messages on invalid submit' },
        { id: 'opt2', label: 'Character count', text: ', showing a live character count when maxLength is set' },
        { id: 'opt3', label: 'Clear', text: ', adding a clear (×) control when the field is non-empty' },
      ],
      requirements: [
        'Associate <label for> with id; errors use role="alert" or aria-invalid',
        'Placeholder is not a substitute for a visible label',
        'Autofill: set name/autocomplete appropriately (email, name, etc.)',
      ],
      scaffolds: {
        shadcn: `<div className="space-y-2"><Label htmlFor="t">Name</Label><Input id="t" /></div>`,
        html: `<label for="n">Name</label><input id="n" type="text" autocomplete="name" />`,
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
        { id: 'opt1', label: 'Strength meter', text: ', including a strength meter with rules (length, mixed case, symbols)' },
        { id: 'opt2', label: 'Reveal', text: ', with a show/hide toggle that updates aria-pressed and input type' },
        { id: 'opt3', label: 'Paste', text: ', allowing paste and warning if the site blocks paste (avoid that unless required)' },
      ],
      requirements: [
        'Toggle must not move focus unexpectedly; label button \"Show password\" / \"Hide password\"',
        'Do not block password managers: avoid breaking autocomplete="current-password" without reason',
        'On error, do not clear the field silently',
      ],
      scaffolds: {
        shadcn: `<div className="relative"><Input type="password" /><Button size="icon" aria-pressed="false">Eye</Button></div>`,
        html: `<input type="password" autocomplete="new-password" aria-describedby="pw-hint" />`,
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
        { id: 'opt1', label: 'Min sizes', text: ', enforcing minimum pixel or percent widths so panes cannot collapse to zero' },
        { id: 'opt2', label: 'Persist', text: ', persisting split ratio to localStorage per user' },
        { id: 'opt3', label: 'Keyboard resize', text: ', allowing keyboard nudging of the split (optional advanced)' },
      ],
      requirements: [
        'Divider is focusable with aria-orientation and aria-valuenow for the split ratio',
        'Pointer drag should not select text in adjacent editors (user-select: none on drag)',
        'Respect prefers-reduced-motion for resize animations',
      ],
      scaffolds: {
        shadcn: `{/* <PanelGroup direction="horizontal"><Panel /><PanelResizeHandle /><Panel /></PanelGroup> */}`,
        html: `<div class="split" style="display:flex"><section>…</section><div role="separator" tabindex="0">⋮</div><section>…</section></div>`,
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
        { id: 'opt1', label: 'Accelerators', text: ', showing keyboard shortcuts in menu items (e.g. ⌘S) where applicable' },
        { id: 'opt2', label: 'Nested menus', text: ', supporting nested submenus with delay and arrow-key navigation' },
        { id: 'opt3', label: 'Disabled items', text: ', dimming disabled items and skipping them with arrow keys' },
      ],
      requirements: [
        'Follow WAI-ARIA menubar pattern: Left/Right between top-level, Down to open',
        'First item in submenu receives focus when opened',
        'Click outside or Escape closes all nested menus and returns focus to menubar',
      ],
      scaffolds: {
        shadcn: `<Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent>…</MenubarContent></MenubarMenu></Menubar>`,
        html: `<nav role="menubar" aria-label="Application"><button role="menuitem" aria-haspopup="true">File</button></nav>`,
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
        { id: 'opt1', label: 'Headings', text: ' with column headings for scanability (Product, Learn, Support)' },
        { id: 'opt2', label: 'Mobile', text: ', collapsing to accordion or drawer on small viewports' },
        { id: 'opt3', label: 'Featured', text: ', optionally highlighting one promo tile with image + CTA' },
      ],
      requirements: [
        'Do not rely on hover alone — keyboard and touch must open the panel',
        'Focus trap inside open panel; Esc closes and returns focus to trigger',
        'Wide panel should not overflow viewport; add max-height + scroll if needed',
      ],
      scaffolds: {
        shadcn: `<NavigationMenu><NavigationMenuList>… large Content grid …</NavigationMenuList></NavigationMenu>`,
        html: `<div class="mega" role="navigation" aria-label="Site"><button aria-expanded="false">Product</button></div>`,
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
        { id: 'opt1', label: 'Labels', text: ', showing text labels under icons (not icon-only mystery meat)' },
        { id: 'opt2', label: 'Active state', text: ', with a clear selected state (color + aria-current="page")' },
        { id: 'opt3', label: 'Safe area', text: ', padding for iOS safe-area-inset-bottom so tabs clear the home indicator' },
      ],
      requirements: [
        'Touch targets ≥44×44px; adequate spacing between items',
        'Do not duplicate the same navigation in a conflicting top nav without reason',
        'Announce route changes to screen readers on SPA navigation',
      ],
      scaffolds: {
        shadcn: `<nav className="fixed bottom-0 inset-x-0 flex justify-around border-t pb-[env(safe-area-inset-bottom)]">…</nav>`,
        html: `<nav role="navigation" aria-label="Primary"><a href="/" aria-current="page">Home</a>…</nav>`,
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
        { id: 'opt1', label: 'Radio semantics', text: ', implementing as radio group or tabs so screen readers know it is single-select' },
        { id: 'opt2', label: 'Icons', text: ', supporting optional leading icons per segment for faster scanning' },
        { id: 'opt3', label: 'Equal width', text: ', using equal-width segments when labels are similar length' },
      ],
      requirements: [
        'Arrow keys move selection within the group; only one segment is selected',
        'Selected segment has aria-pressed or aria-checked per pattern',
        'Works on narrow screens without horizontal overflow (scroll or compress)',
      ],
      scaffolds: {
        shadcn: `<div role="tablist" className="inline-flex rounded-lg bg-muted p-1">{/* Tab triggers */}</div>`,
        html: `<fieldset><legend class="sr-only">View</legend><input type="radio" name="v" />…</fieldset>`,
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
        { id: 'opt1', label: 'Dynamic height', text: ', supporting variable row heights with measurement (or fixed height if uniform)' },
        { id: 'opt2', label: 'Sticky header', text: ', pairing with a sticky column header or list section header' },
        { id: 'opt3', label: 'Overscan', text: ', tuning overscan count for smoother fast scroll on low-end devices' },
      ],
      requirements: [
        'Scroll container must have a defined height; virtual window maps index → offset',
        'Keyboard: arrow keys move active row; ensure focused row scrolls into view',
        'Reuse row components; avoid anonymous inline functions that break memoization',
      ],
      scaffolds: {
        shadcn: `{/* <Virtualizer count={items.length} estimateSize={() => 36}>…</Virtualizer> */}`,
        html: `<div role="list" style="height:400px;overflow:auto"><div style="height:{{total}}px">…</div></div>`,
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
        { id: 'opt1', label: 'Jump to latest', text: ', with a \"New messages\" / jump-to-bottom affordance when not pinned to end' },
        { id: 'opt2', label: 'Timestamps', text: ', grouping messages by day and showing relative time with full time on hover' },
        { id: 'opt3', label: 'Attachments', text: ', rendering image previews with aspect ratio and download links for files' },
      ],
      requirements: [
        'Distinguish incoming vs outgoing semantically (not color alone)',
        'Live region: announce new messages when user is near bottom; avoid spamming when scrolled up',
        'Composer: Enter to send vs newline — document behavior; Shift+Enter for newline',
      ],
      scaffolds: {
        shadcn: `<ScrollArea className="h-96"><div className="flex flex-col gap-2">{/* bubbles */}</div></ScrollArea>`,
        html: `<div role="log" aria-live="polite" aria-relevant="additions"><article>…</article></div>`,
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
        { id: 'opt1', label: 'Read / unread', text: ', with clear read vs unread styling and \"Mark all as read\"' },
        { id: 'opt2', label: 'Grouping', text: ', grouping by day or by app/source for long histories' },
        { id: 'opt3', label: 'Actions', text: ', exposing per-item actions (open, dismiss, snooze) on hover and keyboard' },
      ],
      requirements: [
        'Panel is a dialog or drawer with focus trap and Esc to close',
        'Empty state when there are zero notifications',
        'Do not steal focus on every new toast when panel is closed',
      ],
      scaffolds: {
        shadcn: `<Sheet><SheetContent><SheetHeader>Notifications</SheetHeader><ul>…</ul></SheetContent></Sheet>`,
        html: `<section aria-label="Notifications" role="feed"><article>…</article></section>`,
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
        { id: 'opt1', label: 'Line numbers', text: ' with optional line numbers and highlight on a specific line range' },
        { id: 'opt2', label: 'Copy', text: ', including a copy button with success feedback and aria-live' },
        { id: 'opt3', label: 'Filename', text: ', showing a filename tab or caption above the block' },
      ],
      requirements: [
        'Use <pre><code>; language in class (language-ts) for assistive tech where relevant',
        'Horizontal scroll on narrow viewports without breaking layout',
        'Contrast: theme-aware syntax colors must meet WCAG against background',
      ],
      scaffolds: {
        shadcn: `<pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>…</code></pre>`,
        html: `<pre><code class="language-ts" tabindex="0">const x = 1;</code></pre>`,
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
        { id: 'opt1', label: 'Captions', text: ', supporting captions or subtitles track selection' },
        { id: 'opt2', label: 'Keyboard', text: ', binding Space, Arrow keys, F for fullscreen, M for mute' },
        { id: 'opt3', label: 'Progress', text: ', showing buffered vs played range on the seek bar' },
      ],
      requirements: [
        'Custom controls must not remove access to native <video> capabilities without equivalents',
        'Visible focus rings on all interactive controls',
        'Provide poster image and aria-label describing content purpose',
      ],
      scaffolds: {
        shadcn: `<div className="relative aspect-video"><video controls className="w-full" /></div>`,
        html: `<video controls crossorigin="anonymous"><track kind="captions" src="en.vtt" srclang="en" /></video>`,
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
        { id: 'opt1', label: 'Clusters', text: ', clustering many markers when zoomed out with count badges' },
        { id: 'opt2', label: 'List sync', text: ', syncing selection between a sidebar list and map markers' },
        { id: 'opt3', label: 'Geolocation', text: ', offering a \"use my location\" button with permission UX' },
      ],
      requirements: [
        'Provide text list alternative or search — map alone is not enough for screen reader users',
        'Keyboard: markers reachable and open popups; trap focus inside popup',
        'Disclose attribution and terms per provider (Mapbox, Google, OSM)',
      ],
      scaffolds: {
        shadcn: `<div className="h-80 w-full rounded-md border">{/* MapContainer */}</div>`,
        html: `<div role="application" aria-label="Map of locations"></div>`,
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
        { id: 'opt1', label: 'Platform', text: ', showing Mac vs Windows keys (⌘ vs Ctrl) based on navigator.platform or user OS' },
        { id: 'opt2', label: 'Search', text: ', adding a filter box to search shortcuts by description' },
        { id: 'opt3', label: 'Categories', text: ', grouping shortcuts by area: Global, Editor, Navigation' },
      ],
      requirements: [
        'Use <kbd> for each key cap; concatenate with + visibly',
        'Do not rely on color alone to distinguish modifier keys',
        'Panel reachable from ? or Cmd+/ and focusable in logical tab order',
      ],
      scaffolds: {
        shadcn: `<div className="grid gap-2"><div><kbd className="rounded border px-1">⌘</kbd> + <kbd className="rounded border px-1">K</kbd></div></div>`,
        html: `<dl><dt>Command palette</dt><dd><kbd>Ctrl</kbd>+<kbd>K</kbd></dd></dl>`,
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
        { id: 'opt1', label: 'Native details', text: ', using <details>/<summary> where possible for free semantics' },
        { id: 'opt2', label: 'Animation', text: ', animating height with reduced-motion fallback' },
        { id: 'opt3', label: 'Lazy load', text: ', loading heavy content only when first expanded' },
      ],
      requirements: [
        'Button controls aria-expanded on the associated region id',
        'Space/Enter toggles when trigger is focused',
        'Chevron icon reflects state; not the only indicator',
      ],
      scaffolds: {
        shadcn: `<Collapsible><CollapsibleTrigger>More</CollapsibleTrigger><CollapsibleContent>…</CollapsibleContent></Collapsible>`,
        html: `<details><summary>Billing</summary><p>…</p></details>`,
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
        { id: 'opt1', label: 'Overflow hint', text: ', showing edge fade or shadow when more content exists below' },
        { id: 'opt2', label: 'Keyboard', text: ', ensuring arrow keys scroll the region when it contains focus' },
        { id: 'opt3', label: 'Nested', text: ', handling nested scroll areas without scroll chaining surprises' },
      ],
      requirements: [
        'Avoid hijacking page scroll: set overscroll-behavior thoughtfully',
        'Touch: momentum scroll works; no dead zones on mobile',
        'Screen readers: region must have accessible name if not redundant',
      ],
      scaffolds: {
        shadcn: `<ScrollArea className="h-48 rounded-md border p-4">…</ScrollArea>`,
        html: `<div role="region" tabindex="0" aria-label="Terms" style="max-height:12rem;overflow:auto">…</div>`,
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
        { id: 'opt1', label: 'Sticky corner', text: ', making the first column sticky together with the header (if applicable)' },
        { id: 'opt2', label: 'Z-index', text: ', layering header above body rows with solid background to avoid see-through' },
        { id: 'opt3', label: 'Shadow', text: ', adding a subtle shadow under the header when scrolled' },
      ],
      requirements: [
        'Use <table>, <thead>, <tbody>; avoid div tables for data grids',
        'Sticky works inside a scrolling ancestor — document which element scrolls',
        'Do not lose column alignment when fonts scale (zoom test)',
      ],
      scaffolds: {
        shadcn: `<Table><TableHeader className="sticky top-0 z-10 bg-background">…</TableHeader></Table>`,
        html: `<table><thead style="position:sticky;top:0">…</thead><tbody>…</tbody></table>`,
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
        { id: 'opt1', label: 'Toggle state', text: ', showing pressed state for bold/italic with aria-pressed' },
        { id: 'opt2', label: 'Overflow', text: ', collapsing overflow tools into a \"More\" menu on narrow widths' },
        { id: 'opt3', label: 'Dividers', text: ', visually grouping related tools with separators' },
      ],
      requirements: [
        'role="toolbar" with aria-label; arrow keys navigate between controls where appropriate',
        'Icons must have accessible names (tooltip or sr-only)',
        'Do not remove focus outline on toolbar buttons',
      ],
      scaffolds: {
        shadcn: `<ToggleGroup type="multiple"><Toggle value="bold">B</Toggle>…</ToggleGroup>`,
        html: `<div role="toolbar" aria-label="Text formatting"><button aria-pressed="false">Bold</button></div>`,
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
        { id: 'opt1', label: 'Granular', text: ', offering Essential / Analytics / Marketing toggles (not only accept all)' },
        { id: 'opt2', label: 'Persist', text: ', storing consent in a first-party cookie or localStorage with version stamp' },
        { id: 'opt3', label: 'Defer scripts', text: ', gating third-party scripts until consent is granted' },
      ],
      requirements: [
        'Focus moves to banner on first visit; Esc does not dismiss without a choice if legally required',
        'Link to privacy policy opens in new tab with rel=noopener',
        'Banner must be readable at 200% zoom and in dark mode',
      ],
      scaffolds: {
        shadcn: `<div role="dialog" aria-modal="false" className="fixed bottom-0 inset-x-0 border-t p-4">…</div>`,
        html: `<div role="region" aria-label="Cookie consent"><a href="/privacy">Privacy</a><button>Accept</button></div>`,
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
        { id: 'opt1', label: 'Web Share API', text: ', using navigator.share when available with fallback to copy link' },
        { id: 'opt2', label: 'Copy link', text: ', including one-tap copy with confirmation toast' },
        { id: 'opt3', label: 'QR', text: ', offering \"Show QR\" for the current URL in the same sheet' },
      ],
      requirements: [
        'Sheet traps focus; Esc and backdrop close with focus restore',
        'Each target has a visible label and ≥44px touch target',
        'Pre-fill share text/title where the API allows',
      ],
      scaffolds: {
        shadcn: `<Sheet><SheetContent side="bottom">… share actions …</SheetContent></Sheet>`,
        html: `<dialog><menu><button>Copy link</button><button>Email</button></menu></dialog>`,
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
        { id: 'opt1', label: 'Text label', text: ', exposing status as visible text on hover/focus (Online, Away, Busy)' },
        { id: 'opt2', label: 'Shape + color', text: ', pairing dot color with a border or icon so it is not color-only' },
        { id: 'opt3', label: 'Screen reader', text: ', including visually hidden text next to the avatar for SR users' },
      ],
      requirements: [
        'Do not encode meaning by hue alone — add text or pattern',
        'Dot should not shrink below readable size on dense lists',
        'Tooltip or title describes status for mouse users',
      ],
      scaffolds: {
        shadcn: `<span className="relative"><Avatar /><span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500" /></span>`,
        html: `<img alt="Alex (online)" />`,
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
        { id: 'opt1', label: 'Timezone', text: ', displaying the target instant in the user\'s timezone with abbreviation' },
        { id: 'opt2', label: 'Expired state', text: ', switching to a clear \"Expired\" or \"Ended\" state at zero' },
        { id: 'opt3', label: 'Server sync', text: ', correcting drift using a server-provided end timestamp (not only client clock)' },
      ],
      requirements: [
        'Use aria-live="polite" for tick updates or update at most once per second',
        'Tabular nums for digits to avoid jitter (font-variant-numeric: tabular-nums)',
        'Pause when document is hidden if appropriate to save battery',
      ],
      scaffolds: {
        shadcn: `<div className="font-mono tabular-nums text-2xl" role="timer" aria-live="polite">00:04:12</div>`,
        html: `<time datetime="2026-04-20T12:00:00Z">…</time>`,
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
        { id: 'opt1', label: 'Micro updates', text: ', updating wording when crossing minute/hour/day boundaries' },
        { id: 'opt2', label: 'Intl locale', text: ', formatting with Intl.RelativeTimeFormat for the user locale' },
        { id: 'opt3', label: 'title attr', text: ', duplicating full ISO or localized datetime in title for hover' },
      ],
      requirements: [
        '<time datetime="…"> must carry machine-readable instant',
        'Screen reader should hear the absolute time if relative is too vague',
        'Avoid updating live regions too aggressively (no per-second spam)',
      ],
      scaffolds: {
        shadcn: `<Tooltip><TooltipTrigger><time dateTime="…">2h ago</time></TooltipTrigger><TooltipContent>…</TooltipContent></Tooltip>`,
        html: `<time dateTime="2026-04-18T14:00:00Z" title="Apr 18, 2026 2:00 PM UTC">2h ago</time>`,
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
        { id: 'opt1', label: 'Error correction', text: ', choosing error correction level (L/M/Q/H) for logo overlay tolerance' },
        { id: 'opt2', label: 'Quiet zone', text: ', preserving mandatory white margin so phones scan reliably' },
        { id: 'opt3', label: 'Alt text', text: ', providing a short text alternative and the raw URL below the code' },
      ],
      requirements: [
        'SVG or canvas must scale crisply; minimum size ~120px for reliable scans',
        'High contrast between modules and background',
        'If URL is sensitive, warn users before displaying publicly',
      ],
      scaffolds: {
        shadcn: `<div className="inline-block rounded-lg border p-4">{/* QR SVG */}</div>`,
        html: `<img alt="QR code linking to signup" src="qr.png" width="160" height="160" />`,
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
        { id: 'opt1', label: 'Retry', text: ', offering retry on failed uploads without re-selecting the file' },
        { id: 'opt2', label: 'Cancel', text: ', allowing cancel in-flight XHR/fetch with UI cleanup' },
        { id: 'opt3', label: 'Type icon', text: ', showing file type icon and human-readable size (KB/MB)' },
      ],
      requirements: [
        'Announce progress to assistive tech without flooding (periodic or on milestone)',
        'Errors must state cause and next step (network, type too large, etc.)',
        'Remove control must be keyboard reachable and labeled',
      ],
      scaffolds: {
        shadcn: `<div className="flex items-center gap-2 border rounded-md p-2"><FileIcon /><span className="flex-1 truncate">doc.pdf</span><Progress value={60} /></div>`,
        html: `<li role="listitem"><span>photo.jpg</span><progress value="40" max="100"></progress></li>`,
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
        { id: 'opt1', label: 'Clear', text: ', showing a clear button when text is non-empty' },
        { id: 'opt2', label: 'Recents', text: ', listing recent queries with remove-per-item' },
        { id: 'opt3', label: 'Shortcut hint', text: ', displaying a visible ⌘K hint that matches actual keyboard handling' },
      ],
      requirements: [
        'type="search" or role=searchbox with aria-autocomplete as needed',
        'Enter submits; Esc clears or closes suggestions per UX spec',
        'Debounce query to server; show loading in results region',
      ],
      scaffolds: {
        shadcn: `<div className="relative"><Search className="absolute left-2 top-2.5 h-4 w-4" /><Input className="pl-8" type="search" /></div>`,
        html: `<search><input type="search" name="q" aria-label="Search" /></search>`,
      },
    },
  },

  linkcard: {
    title: "Link Preview Card",
    definition:
      "Rich unfurl when a URL is pasted in chat or social: Open Graph image, title, description, and hostname — not a KPI tile.",
    vibeTip: "Mention fallbacks when metadata is missing.",
    comparison: "Link preview summarizes a URL before click-through. Stat card shows metrics; this is metadata from the destination page.",
    prompt: {
      base: "Add a link preview card component",
      options: [
        { id: 'opt1', label: 'Skeleton', text: ', showing skeleton placeholders while Open Graph metadata loads' },
        { id: 'opt2', label: 'Broken link', text: ', handling 404 or blocked fetch with a compact error state' },
        { id: 'opt3', label: 'Domain', text: ', always surfacing hostname to reduce phishing look-alikes' },
      ],
      requirements: [
        'Images need width/height or aspect ratio to avoid layout shift',
        'Card click target should match user expectation (whole card vs separate link)',
        'Sanitize description text to prevent HTML injection from OG tags',
      ],
      scaffolds: {
        shadcn: `<Card><CardHeader><CardTitle>Title from OG</CardTitle></CardHeader><CardContent>…</CardContent></Card>`,
        html: `<article><img alt="" /><h3><a href="…">…</a></h3><p>…</p></article>`,
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
        { id: 'opt1', label: 'Single column mobile', text: ', stacking to one column below md breakpoint' },
        { id: 'opt2', label: 'Tab order', text: ', keeping tab order matching visual order (no left column jumps)' },
        { id: 'opt3', label: 'Fieldsets', text: ', grouping related fields in <fieldset> with <legend> for sections' },
      ],
      requirements: [
        'Required fields marked with * and aria-required="true"',
        'Error summary at top on submit with links to fields',
        'Max width for readability (~65ch) on ultra-wide screens',
      ],
      scaffolds: {
        shadcn: `<div className="grid gap-4 md:grid-cols-2"><div>…</div><div>…</div></div>`,
        html: `<form><fieldset><legend>Contact</legend>…</fieldset></form>`,
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
        { id: 'opt1', label: '<dl> semantics', text: ', using <dl><dt><dd> for screen reader clarity' },
        { id: 'opt2', label: 'Copy value', text: ', adding copy-to-clipboard for opaque values (IDs, tokens)' },
        { id: 'opt3', label: 'Truncate', text: ', truncating long values with expand-on-demand' },
      ],
      requirements: [
        'Align keys and values for scan lines; zebra optional',
        'Monospace font for IDs, hashes, and JSON fragments',
        'Editable vs read-only must be visually and semantically distinct',
      ],
      scaffolds: {
        shadcn: `<dl className="grid grid-cols-[1fr_2fr] gap-x-4 text-sm">…</dl>`,
        html: `<dl><dt>Region</dt><dd>us-east-1</dd></dl>`,
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
        { id: 'opt1', label: 'Expand chevron', text: ', placing expand/collapse in the first column with fixed width' },
        { id: 'opt2', label: 'Lazy children', text: ', loading child rows on first expand with a loading row' },
        { id: 'opt3', label: 'Align columns', text: ', keeping numeric columns right-aligned and sortable' },
      ],
      requirements: [
        'Follow treegrid keyboard spec: arrows, expand/collapse, typeahead where applicable',
        'Announce depth level and expanded state in row labels',
        'Virtualize body if row count is huge',
      ],
      scaffolds: {
        shadcn: `{/* AG Grid tree data or TanStack Table nested */}`,
        html: `<table role="treegrid"><thead>…</thead><tbody>…</tbody></table>`,
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
        { id: 'opt1', label: 'WIP limit', text: ', showing per-column WIP limits and overflow warning' },
        { id: 'opt2', label: 'Keyboard DnD', text: ', providing keyboard alternative to move cards between columns' },
        { id: 'opt3', label: 'Optimistic UI', text: ', with rollback toast when server rejects a move' },
      ],
      requirements: [
        'Drag announcements for screen readers (aria-live on drop)',
        'Columns scroll independently; horizontal scroll on small screens',
        'Card must expose title, id, and column in accessible name',
      ],
      scaffolds: {
        shadcn: `{/* @dnd-kit or similar: DndContext, SortableContext */}`,
        html: `<section aria-label="Board"><ul role="list">…</ul></section>`,
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
        { id: 'opt1', label: 'Actor links', text: ', linking actor names to profiles without breaking sentence flow' },
        { id: 'opt2', label: 'Verb styling', text: ', de-emphasizing boilerplate verbs and emphasizing object' },
        { id: 'opt3', label: 'Pagination', text: ', using cursor-based \"Load more\" for stable infinite history' },
      ],
      requirements: [
        'Each event has a single concise sentence for AT',
        'Relative time with absolute accessible timestamp',
        'Loading older items should not jump scroll position unexpectedly',
      ],
      scaffolds: {
        shadcn: `<ul className="space-y-4">{/* <ActivityItem /> */}</ul>`,
        html: `<ol reversed>{/* events */}</ol>`,
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
        { id: 'opt1', label: 'URL sync', text: ', serializing filters to query params for shareable URLs' },
        { id: 'opt2', label: 'Apply', text: ', using explicit Apply vs instant-apply — pick one and label it' },
        { id: 'opt3', label: 'Count', text: ', showing result counts or \"No matches\" before apply when cheap' },
      ],
      requirements: [
        'Reset all filters control with confirmation if many toggles',
        'Mobile: panel as bottom sheet with sticky apply bar',
        'Filter state must survive navigation if UX requires (session storage)',
      ],
      scaffolds: {
        shadcn: `<Sheet><SheetContent side="left"><ScrollArea>… filters …</ScrollArea></SheetContent></Sheet>`,
        html: `<aside aria-label="Filters"><form>…</form></aside>`,
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
        { id: 'opt1', label: 'Whole card hit', text: ', making the entire card toggle the radio when clicked' },
        { id: 'opt2', label: 'Descriptions', text: ', including secondary description text per plan tier' },
        { id: 'opt3', label: 'Keyboard', text: ', supporting arrow keys to move selection between cards' },
      ],
      requirements: [
        'Native <input type="radio"> remains in DOM for form submission',
        'Selected card uses aria-checked and border — not color alone',
        'Error if none selected on required step',
      ],
      scaffolds: {
        shadcn: `<RadioGroup className="grid gap-4 md:grid-cols-2">{/* CardRadioItem */}</RadioGroup>`,
        html: `<fieldset><legend>Plan</legend><label><input type="radio" name="p" /> Pro</label></fieldset>`,
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
        { id: 'opt1', label: 'aria-pressed', text: ', syncing visual pressed state with aria-pressed="true|false"' },
        { id: 'opt2', label: 'Icon + label', text: ', providing text labels or persistent tooltips for icon-only toggles' },
        { id: 'opt3', label: 'Mutually exclusive', text: ', grouping exclusive formatting toggles where appropriate' },
      ],
      requirements: [
        'Space toggles when focused; do not conflict with typing in editor',
        'Toolbar role and tab/arrows per WAI-ARIA toolbar pattern',
        'High contrast for pressed vs default in dark mode',
      ],
      scaffolds: {
        shadcn: `<Toggle aria-pressed="false" size="sm">Bold</Toggle>`,
        html: `<button type="button" aria-pressed="false" aria-label="Bold"><strong>B</strong></button>`,
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
        { id: 'opt1', label: 'Destructive style', text: ', styling destructive actions in danger color at the bottom' },
        { id: 'opt2', label: 'Cancel', text: ', including a full-width Cancel that dismisses without action' },
        { id: 'opt3', label: 'Handle', text: ', showing a drag handle affordance for bottom sheets on supporting browsers' },
      ],
      requirements: [
        'Focus moves to sheet on open; Esc and backdrop dismiss',
        'Destructive actions require confirmation step or explicit label',
        'Safe-area padding for iOS home indicator',
      ],
      scaffolds: {
        shadcn: `<Sheet><SheetContent side="bottom" className="rounded-t-xl">…</SheetContent></Sheet>`,
        html: `<dialog class="bottom-sheet"><form method="dialog">…</form></dialog>`,
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
        { id: 'opt1', label: 'Thresholds', text: ', changing color at warning/critical thresholds (e.g. 80%, 95%)' },
        { id: 'opt2', label: 'Label', text: ', showing numeric value and max (\"72 GB of 100 GB\")' },
        { id: 'opt3', label: 'Semantic <meter>', text: ', using the native <meter> element with min/max/low/high/optimum' },
      ],
      requirements: [
        'Do not use meter for indeterminate loading — that is progress or spinner',
        'Expose value, min, max to assistive tech',
        'Animate value changes subtly; respect reduced motion',
      ],
      scaffolds: {
        shadcn: `<div className="space-y-1"><div className="flex justify-between text-xs"><span>Storage</span><span>72%</span></div><div className="h-2 rounded-full bg-muted"><div className="h-2 w-[72%] rounded-full bg-primary" /></div></div>`,
        html: `<meter min="0" max="100" value="72" low="80" high="95">72%</meter>`,
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
        { id: 'opt1', label: 'Remember dismiss', text: ', persisting dismiss in localStorage until message version changes' },
        { id: 'opt2', label: 'CTA', text: ', including a primary link or button for the promo CTA' },
        { id: 'opt3', label: 'Non-blocking', text: ', ensuring banner does not cover fixed nav (push layout, not overlay)' },
      ],
      requirements: [
        'role="region" with aria-label="Site notice" or similar',
        'Dismiss button has visible name and large enough touch target',
        'Do not auto-focus banner on every navigation',
      ],
      scaffolds: {
        shadcn: `<div role="region" className="flex items-center justify-center gap-4 border-b bg-muted px-4 py-2 text-sm">…</div>`,
        html: `<div role="region" aria-label="Promotion"><button type="button">Dismiss</button></div>`,
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
        { id: 'opt1', label: 'Open delay', text: ', using ~200–300ms open delay to avoid accidental triggers' },
        { id: 'opt2', label: 'Focus', text: ', opening on keyboard focus of the trigger, not only hover' },
        { id: 'opt3', label: 'Interactive content', text: ', allowing links inside the card without the card closing instantly' },
      ],
      requirements: [
        'Pointer must be able to move into the card (safe triangle / delay)',
        'Escape closes popover; focus returns to trigger',
        'Do not put essential info only in hover-only content',
      ],
      scaffolds: {
        shadcn: `<HoverCard><HoverCardTrigger>@alex</HoverCardTrigger><HoverCardContent>…</HoverCardContent></HoverCard>`,
        html: `<button popovertarget="hc">@alex</button><div id="hc" popover>…</div>`,
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
        { id: 'opt1', label: 'Skip', text: ', including Skip tour and Back/Next with step counter' },
        { id: 'opt2', label: 'Spotlight', text: ', dimming the rest of the page with cut-out for the target element' },
        { id: 'opt3', label: 'Reduced motion', text: ', disabling zoom/pulse animations when prefers-reduced-motion' },
      ],
      requirements: [
        'Focus moves to the primary action in each step',
        'Do not block critical navigation without a visible exit',
        'Store \"tour completed\" in localStorage or profile',
      ],
      scaffolds: {
        shadcn: `{/* Shepherd.js, Intro.js, or custom: mask + floating step */}`,
        html: `<div role="dialog" aria-modal="true" aria-labelledby="tour-step-title">…</div>`,
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
        { id: 'opt1', label: 'Section only', text: ', covering only a card or table region instead of full viewport' },
        { id: 'opt2', label: 'Pointer events', text: ', blocking clicks with pointer-events and inert on siblings where supported' },
        { id: 'opt3', label: 'Timeout', text: ', surfacing an error state if loading exceeds a reasonable timeout' },
      ],
      requirements: [
        'Set aria-busy on the covered region; remove when done',
        'Avoid infinite loading overlays without cancel or retry',
        'Maintain minimum display time if needed to avoid flash (<200ms) — document tradeoff',
      ],
      scaffolds: {
        shadcn: `<div className="relative"><div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm" aria-busy="true">…</div>…</div>`,
        html: `<section aria-busy="true" aria-live="polite"><div class="overlay">Loading…</div></section>`,
      },
    },
  },
};
