// Overlays
import ModalDemo       from '../components/demos/overlays/ModalDemo';
import DrawerDemo      from '../components/demos/overlays/DrawerDemo';
import PopoverDemo     from '../components/demos/overlays/PopoverDemo';
import TooltipDemo     from '../components/demos/overlays/TooltipDemo';
import ToastDemo       from '../components/demos/overlays/ToastDemo';
// Inputs
import SelectDemo      from '../components/demos/inputs/SelectDemo';
import OtpDemo         from '../components/demos/inputs/OtpDemo';
import SwitchDemo      from '../components/demos/inputs/SwitchDemo';
import DropzoneDemo    from '../components/demos/inputs/DropzoneDemo';
import RadioDemo       from '../components/demos/inputs/RadioDemo';
import SliderDemo      from '../components/demos/inputs/SliderDemo';
// Data Display
import TableDemo       from '../components/demos/data/TableDemo';
import ListDemo        from '../components/demos/data/ListDemo';
import CarouselDemo    from '../components/demos/data/CarouselDemo';
import TreeDemo        from '../components/demos/data/TreeDemo';
import CalendarDemo    from '../components/demos/data/CalendarDemo';
import StatCardDemo    from '../components/demos/data/StatCardDemo';
// Forms
import DatePickerDemo      from '../components/demos/forms/DatePickerDemo';
import CommandPaletteDemo  from '../components/demos/forms/CommandPaletteDemo';
import TagInputDemo        from '../components/demos/forms/TagInputDemo';
import RichTextDemo        from '../components/demos/forms/RichTextDemo';
import RatingDemo          from '../components/demos/forms/RatingDemo';
import StepperDemo         from '../components/demos/forms/StepperDemo';
// Layout
import SidebarDemo     from '../components/demos/layout/SidebarDemo';
import CardDemo        from '../components/demos/layout/CardDemo';
import MasonryDemo     from '../components/demos/layout/MasonryDemo';
// Navigation
import TabsDemo        from '../components/demos/navigation/TabsDemo';
import BreadcrumbsDemo from '../components/demos/navigation/BreadcrumbsDemo';
import AccordionDemo   from '../components/demos/navigation/AccordionDemo';
// Interactions
import ContextMenuDemo     from '../components/demos/interactions/ContextMenuDemo';
import DragDropDemo        from '../components/demos/interactions/DragDropDemo';
import LightboxDemo        from '../components/demos/interactions/LightboxDemo';
import InfiniteScrollDemo  from '../components/demos/interactions/InfiniteScrollDemo';
// Feedback
import AlertDemo       from '../components/demos/feedback/AlertDemo';
import EmptyStateDemo  from '../components/demos/feedback/EmptyStateDemo';
import BadgeDemo       from '../components/demos/feedback/BadgeDemo';
import AvatarsDemo     from '../components/demos/feedback/AvatarsDemo';
import TimelineDemo    from '../components/demos/feedback/TimelineDemo';
import SkeletonDemo    from '../components/demos/feedback/SkeletonDemo';
import ProgressDemo    from '../components/demos/feedback/ProgressDemo';
// Marketing
import HeroDemo        from '../components/demos/marketing/HeroDemo';
import PricingDemo     from '../components/demos/marketing/PricingDemo';
import TestimonialDemo from '../components/demos/marketing/TestimonialDemo';
import FaqDemo         from '../components/demos/marketing/FaqDemo';

export const GLOSSARY_DATA = {
  // ─── Overlays ───
  modal: {
    title: 'Modal (Dialog)',
    definition: 'Overlay window that blocks background interaction.',
    vibeTip: "Use 'Dialog' for Shadcn. Specify 'Focus Trap' & 'Backdrop'.",
    comparison: 'Modal blocks. Popover allows outside click.',
    prompt: {
      base: 'Add a centered Dialog modal overlay',
      options: [
        { id: 'blur',   label: 'Blur',         text: ' with a backdrop-blur effect' },
        { id: 'trap',   label: 'Focus Trap',   text: ' ensuring focus remains trapped within' },
        { id: 'anim',   label: 'Animation',    text: ' using a smooth zoom-in entrance' },
        { id: 'footer', label: 'Sticky Footer', text: ' including a sticky footer for actions' },
        { id: 'size',   label: 'Large Size',   text: ' using a max-width-2xl container' },
      ],
    },
    demo: ModalDemo,
  },
  drawer: {
    title: 'Drawer (Sheet)',
    definition: 'Edge-anchored panel overlay.',
    vibeTip: "Keyword: 'Sheet'.",
    comparison: 'Drawer slides. Sidebar pushes.',
    prompt: {
      base: 'Implement a Sheet drawer',
      options: [
        { id: 'left',   label: 'Left Side', text: ' anchored to the left edge' },
        { id: 'blur',   label: 'Blur',      text: ' with a backdrop blur' },
        { id: 'footer', label: 'Footer',    text: ' containing action buttons' },
      ],
    },
    demo: DrawerDemo,
  },
  popover: {
    title: 'Popover',
    definition: 'Floating card triggered by button.',
    vibeTip: 'Use for interactive content.',
    comparison: 'Popover = Container.',
    prompt: {
      base: 'Create a triggered Popover component',
      options: [
        { id: 'arrow',       label: 'Arrow',       text: ' with a pointing arrow' },
        { id: 'interactive', label: 'Interactive',  text: ' containing input fields' },
        { id: 'focus',       label: 'Auto-Focus',  text: ' that manages focus' },
      ],
    },
    demo: PopoverDemo,
  },
  tooltip: {
    title: 'Tooltip',
    definition: 'Hover-triggered info text.',
    vibeTip: 'No links inside tooltips.',
    comparison: 'Tooltip vanishes on move.',
    prompt: {
      base: 'Add a Tooltip',
      options: [
        { id: 'right', label: 'Right Side', text: ' positioned to the right' },
        { id: 'arrow', label: 'Arrow',      text: ' with a directional arrow' },
        { id: 'dark',  label: 'Dark Mode',  text: ' styled with dark contrast' },
        { id: 'delay', label: 'Delay',      text: ' with a subtle delay' },
      ],
    },
    demo: TooltipDemo,
  },
  toast: {
    title: 'Toast',
    definition: 'Temporary feedback message.',
    vibeTip: 'Use Toaster provider.',
    comparison: 'Toast floats.',
    prompt: {
      base: 'Implement Toast',
      options: [
        { id: 'stacked', label: 'Stacked',    text: ' that stacks vertically' },
        { id: 'action',  label: 'Action',     text: ' with an undo action button' },
        { id: 'error',   label: 'Error Type', text: ' styled as an error alert' },
      ],
    },
    demo: ToastDemo,
  },

  // ─── Inputs ───
  select: {
    title: 'Select vs. Combobox',
    definition: 'Select: Simple dropdown. Combobox: Searchable list.',
    vibeTip: 'List > 10 items? Use Combobox/Command Palette.',
    comparison: 'Select is for picking. Popover is for housing UI.',
    prompt: {
      base: 'Add a form Select component',
      options: [
        { id: 'combobox', label: 'Searchable',   text: ', upgrading it to a Combobox for filtering' },
        { id: 'multi',    label: 'Multi-Select', text: ' allowing multiple item selection with chips' },
        { id: 'avatars',  label: 'Rich Items',  text: ' displaying avatars next to options' },
      ],
    },
    demo: SelectDemo,
  },
  otp: {
    title: 'OTP Input',
    definition: 'Segmented code input.',
    vibeTip: 'Request auto-focus.',
    comparison: 'Vs Text Field.',
    prompt: {
      base: 'Insert OTP Group',
      options: [
        { id: 'mask',  label: 'Masked',    text: ' with masked/password characters' },
        { id: 'sep',   label: 'Separator', text: ' including a separator dash' },
        { id: 'focus', label: 'Auto-Focus', text: ' that auto-advances focus' },
      ],
    },
    demo: OtpDemo,
  },
  switch: {
    title: 'Switch',
    definition: 'Immediate toggle.',
    vibeTip: 'Settings only.',
    comparison: 'State vs Data.',
    prompt: {
      base: 'Add Switch',
      options: [
        { id: 'icon',  label: 'Icon',  text: ' showing checked/x icons inside' },
        { id: 'label', label: 'Label', text: ' paired with a descriptive label' },
      ],
    },
    demo: SwitchDemo,
  },
  dropzone: {
    title: 'Dropzone',
    definition: 'Drag & Drop area.',
    vibeTip: 'Active drag states.',
    comparison: 'Better UX.',
    prompt: {
      base: 'Create Dropzone',
      options: [
        { id: 'drag',    label: 'Drag State',   text: ' with highlighted drag state' },
        { id: 'preview', label: 'File Preview', text: ' showing uploaded file list' },
      ],
    },
    demo: DropzoneDemo,
  },
  radio: {
    title: 'Radio Group',
    definition: 'Single selection from list.',
    vibeTip: 'Use for < 5 items. If more, use Select.',
    comparison: 'Exclusive (OR) vs Checkbox (AND).',
    prompt: {
      base: 'Implement a Radio Group',
      options: [
        { id: 'cards', label: 'Cards',       text: ' styled as selectable cards' },
        { id: 'desc',  label: 'Description', text: ' with helper descriptions' },
      ],
    },
    demo: RadioDemo,
  },
  slider: {
    title: 'Slider',
    definition: 'Range selection input.',
    vibeTip: "Dual handles for 'Range Slider'.",
    comparison: 'Vs Progress Bar.',
    prompt: {
      base: 'Add a Slider input',
      options: [
        { id: 'dual',    label: 'Dual Handles', text: ' with dual handles for range selection' },
        { id: 'tooltip', label: 'Tooltip',      text: ' showing current value on hover' },
      ],
    },
    demo: SliderDemo,
  },

  // ─── Data Display ───
  table: {
    title: 'Table / Data Grid',
    definition: 'Structured rows and columns for displaying data sets with optional sorting, filtering, and pagination.',
    vibeTip: "Use 'DataTable' for Shadcn. Specify column definitions and row actions.",
    comparison: 'Table for structured data. List for mixed content feeds.',
    prompt: {
      base: 'Build a data table component',
      options: [
        { id: 'sortable',   label: 'Sortable',   text: ' with clickable column headers for sorting' },
        { id: 'filterable', label: 'Filterable',  text: ' including a search/filter input' },
        { id: 'striped',    label: 'Striped Rows', text: ' with alternating row backgrounds' },
      ],
    },
    demo: TableDemo,
  },
  list: {
    title: 'List / Feed',
    definition: 'Vertical stream of content items, like a social feed or activity log.',
    vibeTip: "Use 'virtualized list' for large datasets. Specify card layout vs. compact rows.",
    comparison: 'List is for mixed content. Table is for structured columnar data.',
    prompt: {
      base: 'Create a feed-style list component',
      options: [
        { id: 'infinite', label: 'Load More',   text: ' with a load-more button at the bottom' },
        { id: 'virtual',  label: 'Virtualized', text: ' using virtualization for large datasets' },
      ],
    },
    demo: ListDemo,
  },
  carousel: {
    title: 'Carousel',
    definition: 'Horizontally scrollable content with navigation controls. Used for image galleries, testimonials, and feature showcases.',
    vibeTip: "Specify 'Embla' or 'Swiper' for framework. Always include keyboard navigation.",
    comparison: 'Carousel scrolls horizontally. Gallery shows a grid.',
    prompt: {
      base: 'Add a carousel slider component',
      options: [
        { id: 'autoplay', label: 'Auto-Play',  text: ' with automatic slide advancement' },
        { id: 'dots',     label: 'Dot Nav',    text: ' including dot indicators below' },
        { id: 'fade',     label: 'Fade Effect', text: ' using a crossfade transition instead of slide' },
      ],
    },
    demo: CarouselDemo,
  },
  tree: {
    title: 'Tree View',
    definition: 'Hierarchical nested list for file explorers, org charts, and nested navigation.',
    vibeTip: "Request 'expandable/collapsible nodes' and 'keyboard arrow navigation'.",
    comparison: 'Tree is for hierarchy. Accordion is for flat sections.',
    prompt: {
      base: 'Build a tree view component',
      options: [
        { id: 'icons', label: 'File Icons', text: ' with file-type icons for each node' },
        { id: 'lines', label: 'Guide Lines', text: ' showing indentation guide lines' },
      ],
    },
    demo: TreeDemo,
  },
  calendar: {
    title: 'Calendar',
    definition: 'Month/week/day view for displaying dates, scheduling, and event management.',
    vibeTip: "Use 'Calendar' for display, 'DatePicker' when selecting. Specify month vs. week view.",
    comparison: 'Calendar displays. DatePicker selects. Scheduler manages events.',
    prompt: {
      base: 'Create a calendar component',
      options: [
        { id: 'events', label: 'Events',     text: ' with event dots and details panel' },
        { id: 'range',  label: 'Date Range', text: ' supporting date range selection' },
      ],
    },
    demo: CalendarDemo,
  },
  statcard: {
    title: 'Stat Card / KPI',
    definition: 'Dashboard metric display showing a number, label, trend indicator, and optional sparkline chart.',
    vibeTip: "Specify 'up/down trend arrows' and 'percentage change'. Use grid layout for multiple stats.",
    comparison: 'Stat Card is for single metrics. Dashboard is a full layout of stat cards.',
    prompt: {
      base: 'Add KPI stat cards',
      options: [
        { id: 'sparkline', label: 'Sparkline',   text: ' with inline sparkline charts' },
        { id: 'icon',      label: 'Category Icon', text: ' including a category icon badge' },
        { id: 'compact',   label: 'Compact Grid', text: ' in a compact 4-column grid layout' },
      ],
    },
    demo: StatCardDemo,
  },

  // ─── Forms ───
  datepicker: {
    title: 'Date Picker',
    definition: 'Input control for selecting dates with a dropdown calendar. Supports single date, date ranges, and preset shortcuts.',
    vibeTip: "Use 'DatePicker' for single dates, 'DateRangePicker' for ranges. Consider 'Popover + Calendar' composition.",
    comparison: 'DatePicker selects dates. Calendar displays them. TimePicker handles time.',
    prompt: {
      base: 'Add a date picker input',
      options: [
        { id: 'range',   label: 'Date Range', text: ' supporting start and end date selection' },
        { id: 'presets', label: 'Presets',     text: ' with quick-select preset options like "Last 7 days"' },
        { id: 'time',    label: 'With Time',   text: ' including a time picker below the calendar' },
      ],
    },
    demo: DatePickerDemo,
  },
  command: {
    title: 'Command Palette',
    definition: 'Keyboard-first search interface triggered by Cmd+K. Fuzzy search across actions, navigation, and settings.',
    vibeTip: "Use 'cmdk' library for React. Group commands by category. Show keyboard shortcuts.",
    comparison: 'Command Palette is for actions. Search Bar is for content. Select is for simple lists.',
    prompt: {
      base: 'Build a command palette (Cmd+K)',
      options: [
        { id: 'fuzzy',  label: 'Fuzzy Search', text: ' with fuzzy matching on all commands' },
        { id: 'groups', label: 'Groups',       text: ' organized into labeled groups' },
        { id: 'recent', label: 'Recent',       text: ' showing recently used commands first' },
      ],
    },
    demo: CommandPaletteDemo,
  },
  taginput: {
    title: 'Tag Input',
    definition: 'Multi-value text input that converts entries into removable tags/chips. Great for categories, skills, and labels.',
    vibeTip: "Specify 'chip/tag display', 'backspace to delete', and 'autocomplete suggestions'.",
    comparison: 'Tag Input adds multiple values. Multi-Select picks from a fixed list.',
    prompt: {
      base: 'Create a tag input field',
      options: [
        { id: 'autocomplete', label: 'Autocomplete', text: ' with dropdown suggestions as you type' },
        { id: 'colors',       label: 'Colored Tags', text: ' with color-coded tag categories' },
        { id: 'limit',        label: 'Max Limit',    text: ' enforcing a maximum number of tags' },
      ],
    },
    demo: TagInputDemo,
  },
  richtext: {
    title: 'Rich Text Editor',
    definition: 'Content editing with formatting controls — bold, italic, lists, links, images. WYSIWYG or Markdown mode.',
    vibeTip: "Use 'Tiptap' or 'Slate' for React. Specify toolbar buttons and output format (HTML vs Markdown).",
    comparison: 'Rich Text for formatted content. Textarea for plain text. Code Editor for code.',
    prompt: {
      base: 'Add a rich text editor',
      options: [
        { id: 'markdown', label: 'Markdown',   text: ' in markdown editing mode with syntax highlighting' },
        { id: 'toolbar',  label: 'Toolbar',    text: ' with a full formatting toolbar' },
      ],
    },
    demo: RichTextDemo,
  },
  rating: {
    title: 'Rating',
    definition: 'User feedback input using stars, thumbs, or emoji scale. Captures satisfaction or quality scores.',
    vibeTip: "Specify 'star count', 'half stars', and 'hover preview'. For binary, use 'thumbs up/down'.",
    comparison: 'Rating captures sentiment. Slider captures numeric ranges. Switch is binary.',
    prompt: {
      base: 'Add a rating component',
      options: [
        { id: 'thumbs', label: 'Thumbs Up/Down', text: ' using a thumbs up/down binary rating' },
        { id: 'emoji',  label: 'Emoji Scale',    text: ' with emoji faces instead of stars' },
        { id: 'label',  label: 'Labels',         text: ' showing descriptive labels on hover' },
      ],
    },
    demo: RatingDemo,
  },
  stepper: {
    title: 'Stepper / Wizard',
    definition: 'Multi-step form with progress indicator. Breaks complex forms into manageable sequential steps.',
    vibeTip: "Specify 'step validation', 'back/next buttons', and whether steps are 'clickable' for non-linear navigation.",
    comparison: 'Stepper is for sequential forms. Tabs are for parallel views. Accordion is for expandable sections.',
    prompt: {
      base: 'Build a multi-step form wizard',
      options: [
        { id: 'vertical',    label: 'Vertical',     text: ' with a vertical step layout' },
        { id: 'description', label: 'Descriptions', text: ' showing step descriptions below labels' },
        { id: 'clickable',   label: 'Clickable',    text: ' allowing non-linear step navigation' },
      ],
    },
    demo: StepperDemo,
  },

  // ─── Layouts ───
  sidebar: {
    title: 'Sidebar',
    definition: 'Full nav panel.',
    vibeTip: 'Collapsible.',
    comparison: 'Vs Rail.',
    prompt: {
      base: 'Build Sidebar',
      options: [
        { id: 'rail', label: 'Collapsed Rail', text: ' that collapses to icons' },
        { id: 'user', label: 'User Footer',    text: ' with user profile at bottom' },
      ],
    },
    demo: SidebarDemo,
  },
  card: {
    title: 'Card',
    definition: 'Content container.',
    vibeTip: 'Header/Content/Footer slots.',
    comparison: 'Vs Tile.',
    prompt: {
      base: 'Create Card',
      options: [
        { id: 'image',  label: 'Cover Image',    text: ' with a top cover image' },
        { id: 'hover',  label: 'Hover Lift',     text: ' that lifts on hover' },
        { id: 'footer', label: 'Footer Actions', text: ' including action buttons' },
      ],
    },
    demo: CardDemo,
  },
  masonry: {
    title: 'Masonry',
    definition: 'Optimal packing.',
    vibeTip: 'Avoid vertical gaps.',
    comparison: 'Vs Grid.',
    prompt: {
      base: 'Implement Masonry',
      options: [
        { id: 'anim', label: 'Staggered', text: ' with staggered entrance animations' },
        { id: 'gap',  label: 'Gapless',   text: ' with minimal gap spacing' },
      ],
    },
    demo: MasonryDemo,
  },

  // ─── Navigation ───
  tabs: {
    title: 'Tabs',
    definition: 'Views navigation.',
    vibeTip: 'Vs Segments.',
    comparison: 'Page vs Component.',
    prompt: {
      base: 'Add Tabs',
      options: [
        { id: 'pills',     label: 'Pills',     text: ' styled as floating pills' },
        { id: 'underline', label: 'Underline', text: ' with an animated underline' },
        { id: 'icons',     label: 'Icons',     text: ' using icons only' },
      ],
    },
    demo: TabsDemo,
  },
  breadcrumbs: {
    title: 'Breadcrumbs',
    definition: 'Path hierarchy.',
    vibeTip: 'Chevrons or Slashes.',
    comparison: 'Location vs Process.',
    prompt: {
      base: 'Add Breadcrumbs',
      options: [
        { id: 'slash', label: 'Slashes',    text: ' using slashes as separators' },
        { id: 'bg',    label: 'Background', text: ' with a background container' },
      ],
    },
    demo: BreadcrumbsDemo,
  },
  accordion: {
    title: 'Accordion',
    definition: 'Expandable list.',
    vibeTip: 'Single or Multi open.',
    comparison: 'FAQ style.',
    prompt: {
      base: 'Create Accordion',
      options: [
        { id: 'multi',  label: 'Allow Multi', text: ' allowing multiple open items' },
        { id: 'border', label: 'Bordered',    text: ' with borders between items' },
      ],
    },
    demo: AccordionDemo,
  },

  // ─── Interactions ───
  contextmenu: {
    title: 'Context Menu',
    definition: 'Right-click menu that appears at the cursor position. Shows contextual actions for the clicked element.',
    vibeTip: "Use 'ContextMenu' for right-click. Specify 'sub-menus', 'icons', and 'keyboard shortcuts'.",
    comparison: 'Context Menu is on right-click. Dropdown Menu is on left-click. Command Palette is on Cmd+K.',
    prompt: {
      base: 'Add a right-click context menu',
      options: [
        { id: 'icons',     label: 'Icons',     text: ' with icons next to each action' },
        { id: 'shortcuts', label: 'Shortcuts', text: ' showing keyboard shortcut labels' },
      ],
    },
    demo: ContextMenuDemo,
  },
  dragdrop: {
    title: 'Drag & Drop',
    definition: 'Sortable items that can be reordered by dragging. Used for task boards, playlists, and priority lists.',
    vibeTip: "Use 'dnd-kit' for React. Specify 'drag handle' vs 'whole item draggable'. Consider 'Kanban board' layout.",
    comparison: 'Sortable list reorders within a list. Kanban moves between columns. Dropzone accepts files.',
    prompt: {
      base: 'Build a drag-and-drop sortable list',
      options: [
        { id: 'kanban', label: 'Kanban Board', text: ' as a multi-column kanban board' },
        { id: 'handle', label: 'Drag Handle',  text: ' with a grip handle for dragging' },
      ],
    },
    demo: DragDropDemo,
  },
  lightbox: {
    title: 'Lightbox',
    definition: 'Full-screen image viewer with zoom and gallery navigation. Overlays on top of the page content.',
    vibeTip: "Specify 'zoom on click', 'arrow key navigation', and 'pinch to zoom' for mobile.",
    comparison: 'Lightbox views single images. Gallery shows a grid. Carousel scrolls horizontally.',
    prompt: {
      base: 'Add an image lightbox',
      options: [
        { id: 'zoom',    label: 'Zoom',     text: ' with click-to-zoom functionality' },
        { id: 'gallery', label: 'Gallery Nav', text: ' including prev/next navigation and dot indicators' },
      ],
    },
    demo: LightboxDemo,
  },
  infinitescroll: {
    title: 'Infinite Scroll',
    definition: 'Automatically loads more content as the user scrolls to the bottom. Alternative to traditional pagination.',
    vibeTip: "Use 'IntersectionObserver' for detection. Always provide a 'load more' fallback button.",
    comparison: 'Infinite scroll auto-loads. Pagination uses page numbers. Load-more uses a button.',
    prompt: {
      base: 'Implement infinite scroll loading',
      options: [
        { id: 'loadmore',  label: 'Load More Button', text: ' with a manual load-more button instead of auto-scroll' },
        { id: 'backtotop', label: 'Back to Top',      text: ' including a floating back-to-top button' },
      ],
    },
    demo: InfiniteScrollDemo,
  },

  // ─── Feedback ───
  alert: {
    title: 'Alert',
    definition: 'Static message.',
    vibeTip: 'Destructive/Info.',
    comparison: 'Persistent.',
    prompt: {
      base: 'Insert Alert',
      options: [
        { id: 'error',  label: 'Error',  text: ' styled as destructive error' },
        { id: 'accent', label: 'Accent', text: ' with a colored left accent border' },
      ],
    },
    demo: AlertDemo,
  },
  empty: {
    title: 'Empty State',
    definition: 'Missing data placeholder.',
    vibeTip: 'Needs CTA.',
    comparison: 'Better than blank.',
    prompt: {
      base: 'Design Empty State',
      options: [
        { id: 'ghost',  label: 'Ghost',     text: ' using a large ghost icon' },
        { id: 'dashed', label: 'Dashed Box', text: ' inside a dashed container' },
      ],
    },
    demo: EmptyStateDemo,
  },
  badge: {
    title: 'Badge',
    definition: 'Notification count.',
    vibeTip: 'Vs Chip.',
    comparison: 'Status indicator.',
    prompt: {
      base: 'Add Badge',
      options: [
        { id: 'ping', label: 'Ping',     text: ' with a pulsating animation' },
        { id: 'dot',  label: 'Dot Only', text: ' showing only a small dot' },
      ],
    },
    demo: BadgeDemo,
  },
  avatars: {
    title: 'Avatar Group',
    definition: 'Stacked profile images.',
    vibeTip: 'Limit count.',
    comparison: 'Space saving.',
    prompt: {
      base: 'Create Avatar Group',
      options: [
        { id: 'overlap', label: 'Heavy Overlap', text: ' with significant negative margin' },
        { id: 'ring',    label: 'Rings',         text: ' with thick border rings' },
      ],
    },
    demo: AvatarsDemo,
  },
  timeline: {
    title: 'Timeline',
    definition: 'Event list.',
    vibeTip: 'Connectors.',
    comparison: 'Read-only.',
    prompt: {
      base: 'Build Timeline',
      options: [
        { id: 'hollow', label: 'Hollow Dots',  text: ' using hollow step indicators' },
        { id: 'pulse',  label: 'Active Pulse', text: ' pulsing the current step' },
      ],
    },
    demo: TimelineDemo,
  },
  skeleton: {
    title: 'Skeleton',
    definition: 'Loading placeholder.',
    vibeTip: 'Prevent CLS.',
    comparison: 'Vs Spinner.',
    prompt: {
      base: 'Use Skeleton',
      options: [
        { id: 'shimmer', label: 'Shimmer', text: ' with a moving shimmer gradient' },
        { id: 'circle',  label: 'Avatar',  text: ' including a circular avatar placeholder' },
      ],
    },
    demo: SkeletonDemo,
  },
  progress: {
    title: 'Progress',
    definition: 'Completion status.',
    vibeTip: 'Determinate.',
    comparison: 'Read-only.',
    prompt: {
      base: 'Display Progress',
      options: [
        { id: 'stripe', label: 'Striped',       text: ' with a diagonal stripe pattern' },
        { id: 'label',  label: 'Outside Label', text: ' showing percentage text outside' },
      ],
    },
    demo: ProgressDemo,
  },

  // ─── Marketing ───
  hero: {
    title: 'Hero Section',
    definition: 'Full-width banner at the top of a landing page. Contains headline, subtext, CTA buttons, and optional background image or gradient.',
    vibeTip: "Specify 'headline hierarchy', 'CTA button count', and 'background treatment' (image, gradient, or video).",
    comparison: 'Hero is the page opener. Banner is a persistent strip. Jumbotron is the Bootstrap term.',
    prompt: {
      base: 'Build a hero section',
      options: [
        { id: 'cta',      label: 'CTA Buttons', text: ' with primary and secondary call-to-action buttons' },
        { id: 'video',    label: 'Video CTA',   text: ' including a "Watch Demo" video button' },
        { id: 'gradient', label: 'Gradient BG',  text: ' using a vibrant gradient background' },
      ],
    },
    demo: HeroDemo,
  },
  pricing: {
    title: 'Pricing Table',
    definition: 'Side-by-side plan comparison with features, prices, and CTA buttons. Usually 3 tiers with a highlighted "popular" plan.',
    vibeTip: "Specify 'monthly/annual toggle', 'feature comparison', and 'popular badge'. Use 'ring' to highlight.",
    comparison: 'Pricing Table compares plans. Feature Grid compares products. Card shows a single item.',
    prompt: {
      base: 'Create a pricing table',
      options: [
        { id: 'toggle',   label: 'Annual Toggle', text: ' with a monthly/annual billing toggle' },
        { id: 'features', label: 'Feature List',  text: ' including a checkmark feature list per tier' },
      ],
    },
    demo: PricingDemo,
  },
  testimonial: {
    title: 'Testimonial',
    definition: 'Social proof section showing customer quotes, avatars, names, and roles. Builds trust and credibility.',
    vibeTip: "Use 'blockquote' semantically. Specify 'avatar + name + role' layout and 'star rating' if applicable.",
    comparison: 'Testimonial is a quote. Review includes a rating. Case Study is a full story.',
    prompt: {
      base: 'Add a testimonials section',
      options: [
        { id: 'carousel', label: 'Carousel',    text: ' as a single-card carousel with navigation' },
        { id: 'rating',   label: 'Star Rating', text: ' including star ratings per testimonial' },
        { id: 'quote',    label: 'Quote Icon',  text: ' with a decorative quote mark icon' },
      ],
    },
    demo: TestimonialDemo,
  },
  faq: {
    title: 'FAQ',
    definition: 'Frequently asked questions section with expandable answers. Reduces support load and helps users self-serve.',
    vibeTip: "Use semantic 'details/summary' or accordion pattern. Group by category for large FAQ sets.",
    comparison: 'FAQ is question-focused. Accordion is generic expandable. Help Center is a full system.',
    prompt: {
      base: 'Build an FAQ section',
      options: [
        { id: 'search',     label: 'Search',     text: ' with a search input to filter questions' },
        { id: 'categories', label: 'Categories', text: ' organized into filterable categories' },
      ],
    },
    demo: FaqDemo,
  },
};
