import { lazy } from 'react';

/** Glossary batch 2 — shared compact live preview */
const CompactPatternDemo = lazy(() => import('../components/demos/CompactPatternDemo'));

const BATCH2_DEMO_IDS = [
  'actionsheet', 'activitystream', 'banner', 'bottomnav', 'chatthread', 'codeblock', 'colorpicker',
  'combobox', 'cookieconsent', 'countdown', 'daterange', 'disclosure', 'fileuploadrow', 'filterpanel',
  'formcolumns', 'hovercard', 'inputgroup', 'kanban', 'keyvalue', 'linechart', 'linkcard',
  'loadingoverlay', 'mapview', 'megamenu', 'menubar', 'meter', 'multiselect', 'notificationcenter',
  'passwordfield', 'piechart', 'presencedot', 'producttour', 'qrcode', 'radiocards', 'relativetime',
  'scrollarea', 'searchfield', 'segmented', 'sharesheet', 'shortcutkeys', 'splitpane',
  'spinner', 'stickyheader', 'textfield', 'timepicker', 'togglebutton', 'toolbar', 'treegrid',
  'virtuallist', 'mediaplayer',
];

const batch2Registry = Object.fromEntries(BATCH2_DEMO_IDS.map((id) => [id, CompactPatternDemo]));

export const DEMO_REGISTRY = {
  // Overlays
  modal:   lazy(() => import('../components/demos/overlays/ModalDemo')),
  drawer:  lazy(() => import('../components/demos/overlays/DrawerDemo')),
  popover: lazy(() => import('../components/demos/overlays/PopoverDemo')),
  tooltip: lazy(() => import('../components/demos/overlays/TooltipDemo')),
  toast:   lazy(() => import('../components/demos/overlays/ToastDemo')),
  // Inputs
  select:   lazy(() => import('../components/demos/inputs/SelectDemo')),
  otp:      lazy(() => import('../components/demos/inputs/OtpDemo')),
  switch:   lazy(() => import('../components/demos/inputs/SwitchDemo')),
  dropzone: lazy(() => import('../components/demos/inputs/DropzoneDemo')),
  radio:    lazy(() => import('../components/demos/inputs/RadioDemo')),
  slider:   lazy(() => import('../components/demos/inputs/SliderDemo')),
  // Data Display
  table:    lazy(() => import('../components/demos/data/TableDemo')),
  list:     lazy(() => import('../components/demos/data/ListDemo')),
  pagination: lazy(() => import('../components/demos/data/PaginationDemo')),
  filterbar: lazy(() => import('../components/demos/data/FilterBarDemo')),
  barchart: lazy(() => import('../components/demos/data/BarChartDemo')),
  carousel: lazy(() => import('../components/demos/data/CarouselDemo')),
  tree:     lazy(() => import('../components/demos/data/TreeDemo')),
  calendar: lazy(() => import('../components/demos/data/CalendarDemo')),
  statcard: lazy(() => import('../components/demos/data/StatCardDemo')),
  // Forms
  datepicker: lazy(() => import('../components/demos/forms/DatePickerDemo')),
  command:    lazy(() => import('../components/demos/forms/CommandPaletteDemo')),
  taginput:   lazy(() => import('../components/demos/forms/TagInputDemo')),
  richtext:   lazy(() => import('../components/demos/forms/RichTextDemo')),
  rating:     lazy(() => import('../components/demos/forms/RatingDemo')),
  stepper:    lazy(() => import('../components/demos/forms/StepperDemo')),
  // Layout
  sidebar: lazy(() => import('../components/demos/layout/SidebarDemo')),
  appshell: lazy(() => import('../components/demos/layout/AppShellDemo')),
  card:    lazy(() => import('../components/demos/layout/CardDemo')),
  masonry: lazy(() => import('../components/demos/layout/MasonryDemo')),
  // Navigation
  tabs:        lazy(() => import('../components/demos/navigation/TabsDemo')),
  dropdownmenu: lazy(() => import('../components/demos/navigation/DropdownMenuDemo')),
  breadcrumbs: lazy(() => import('../components/demos/navigation/BreadcrumbsDemo')),
  accordion:   lazy(() => import('../components/demos/navigation/AccordionDemo')),
  // Interactions
  contextmenu:    lazy(() => import('../components/demos/interactions/ContextMenuDemo')),
  dragdrop:       lazy(() => import('../components/demos/interactions/DragDropDemo')),
  lightbox:       lazy(() => import('../components/demos/interactions/LightboxDemo')),
  infinitescroll: lazy(() => import('../components/demos/interactions/InfiniteScrollDemo')),
  // Feedback
  alert:    lazy(() => import('../components/demos/feedback/AlertDemo')),
  empty:    lazy(() => import('../components/demos/feedback/EmptyStateDemo')),
  badge:    lazy(() => import('../components/demos/feedback/BadgeDemo')),
  avatars:  lazy(() => import('../components/demos/feedback/AvatarsDemo')),
  timeline: lazy(() => import('../components/demos/feedback/TimelineDemo')),
  skeleton: lazy(() => import('../components/demos/feedback/SkeletonDemo')),
  progress: lazy(() => import('../components/demos/feedback/ProgressDemo')),
  // Marketing
  hero:        lazy(() => import('../components/demos/marketing/HeroDemo')),
  pricing:     lazy(() => import('../components/demos/marketing/PricingDemo')),
  testimonial: lazy(() => import('../components/demos/marketing/TestimonialDemo')),
  faq:         lazy(() => import('../components/demos/marketing/FaqDemo')),

  ...batch2Registry,
};
