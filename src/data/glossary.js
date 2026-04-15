import ModalDemo       from '../components/demos/overlays/ModalDemo';
import DrawerDemo      from '../components/demos/overlays/DrawerDemo';
import PopoverDemo     from '../components/demos/overlays/PopoverDemo';
import TooltipDemo     from '../components/demos/overlays/TooltipDemo';
import ToastDemo       from '../components/demos/overlays/ToastDemo';
import SelectDemo      from '../components/demos/inputs/SelectDemo';
import OtpDemo         from '../components/demos/inputs/OtpDemo';
import SwitchDemo      from '../components/demos/inputs/SwitchDemo';
import DropzoneDemo    from '../components/demos/inputs/DropzoneDemo';
import RadioDemo       from '../components/demos/inputs/RadioDemo';
import SliderDemo      from '../components/demos/inputs/SliderDemo';
import SidebarDemo     from '../components/demos/layout/SidebarDemo';
import CardDemo        from '../components/demos/layout/CardDemo';
import MasonryDemo     from '../components/demos/layout/MasonryDemo';
import TabsDemo        from '../components/demos/navigation/TabsDemo';
import BreadcrumbsDemo from '../components/demos/navigation/BreadcrumbsDemo';
import AccordionDemo   from '../components/demos/navigation/AccordionDemo';
import AlertDemo       from '../components/demos/feedback/AlertDemo';
import EmptyStateDemo  from '../components/demos/feedback/EmptyStateDemo';
import BadgeDemo       from '../components/demos/feedback/BadgeDemo';
import AvatarsDemo     from '../components/demos/feedback/AvatarsDemo';
import TimelineDemo    from '../components/demos/feedback/TimelineDemo';
import SkeletonDemo    from '../components/demos/feedback/SkeletonDemo';
import ProgressDemo    from '../components/demos/feedback/ProgressDemo';

export const GLOSSARY_DATA = {
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
};
