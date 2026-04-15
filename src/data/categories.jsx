import { Layers, MousePointer, Layout, Grip, MessageSquare } from 'lucide-react';

export const CATEGORIES = [
  {
    id: 'overlays',
    name: 'Overlays',
    type: 'Components',
    icon: <Layers size={14} />,
    items: [
      { id: 'modal',   name: 'Modal / Dialog' },
      { id: 'drawer',  name: 'Drawer / Sheet' },
      { id: 'popover', name: 'Popover' },
      { id: 'tooltip', name: 'Tooltip' },
      { id: 'toast',   name: 'Toast / Snackbar' },
    ],
  },
  {
    id: 'inputs',
    name: 'Inputs',
    type: 'Components',
    icon: <MousePointer size={14} />,
    items: [
      { id: 'select',   name: 'Select vs. Combobox' },
      { id: 'otp',      name: 'OTP / Pin Input' },
      { id: 'switch',   name: 'Switch vs. Checkbox' },
      { id: 'dropzone', name: 'File Dropzone' },
      { id: 'radio',    name: 'Radio Group' },
      { id: 'slider',   name: 'Slider' },
    ],
  },
  {
    id: 'layout',
    name: 'Layouts',
    type: 'Patterns',
    icon: <Layout size={14} />,
    items: [
      { id: 'sidebar', name: 'Sidebar vs. Rail' },
      { id: 'card',    name: 'Card vs. Tile' },
      { id: 'masonry', name: 'Masonry Grid' },
    ],
  },
  {
    id: 'navigation',
    name: 'Navigation',
    type: 'Patterns',
    icon: <Grip size={14} />,
    items: [
      { id: 'tabs',        name: 'Tabs vs. Segments' },
      { id: 'breadcrumbs', name: 'Breadcrumbs' },
      { id: 'accordion',   name: 'Accordion' },
    ],
  },
  {
    id: 'feedback',
    name: 'Feedback',
    type: 'Showcase',
    icon: <MessageSquare size={14} />,
    items: [
      { id: 'alert',    name: 'Alert / Callout' },
      { id: 'empty',    name: 'Empty State' },
      { id: 'badge',    name: 'Badge vs. Chip' },
      { id: 'avatars',  name: 'Avatar Group' },
      { id: 'timeline', name: 'Timeline' },
      { id: 'skeleton', name: 'Skeleton' },
      { id: 'progress', name: 'Progress Bar' },
    ],
  },
];
