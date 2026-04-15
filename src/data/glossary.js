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
      requirements: [
        'Trap focus inside dialog when open',
        'Close on ESC key press',
        'Add aria-labelledby pointing to title',
        'Return focus to trigger element on close',
        'Prevent background scroll when open',
      ],
      scaffolds: {
        shadcn: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
        radix: `<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Description>Description</Dialog.Description>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`,
        headless: `<Dialog open={open} onClose={() => setOpen(false)}>
  <Dialog.Panel>
    <Dialog.Title>Title</Dialog.Title>
    <Dialog.Description>Description</Dialog.Description>
    <button onClick={() => setOpen(false)}>Close</button>
  </Dialog.Panel>
</Dialog>`,
        html: `<dialog id="modal">
  <form method="dialog">
    <h2>Title</h2>
    <p>Description</p>
    <button value="cancel">Cancel</button>
    <button value="confirm">Confirm</button>
  </form>
</dialog>`,
      },
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
      requirements: [
        'Trap focus inside drawer when open',
        'Close on ESC key and overlay click',
        'Add aria-label or aria-labelledby',
        'Animate slide in/out with reduced-motion support',
      ],
      scaffolds: {
        shadcn: `<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
    {/* content */}
  </SheetContent>
</Sheet>`,
        radix: `<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content data-side="right">
      <Dialog.Title>Title</Dialog.Title>
      {/* content */}
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`,
        html: `<dialog id="drawer">
  <nav>
    <h2>Navigation</h2>
    <ul>
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
    </ul>
    <button onclick="this.closest('dialog').close()">Close</button>
  </nav>
</dialog>`,
      },
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
      requirements: [
        'Dismiss on ESC and click outside',
        'Position with collision detection (flip/shift)',
        'Add aria-haspopup and aria-expanded on trigger',
        'Return focus to trigger on close',
      ],
      scaffolds: {
        shadcn: `<Popover>
  <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>
  <PopoverContent>
    <h4>Title</h4>
    <p>Content goes here</p>
  </PopoverContent>
</Popover>`,
        radix: `<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Portal>
    <Popover.Content>
      <h4>Title</h4>
      <p>Content</p>
      <Popover.Arrow />
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>`,
        headless: `<Popover>
  <Popover.Button>Open</Popover.Button>
  <Popover.Panel>
    <h4>Title</h4>
    <p>Content</p>
  </Popover.Panel>
</Popover>`,
        html: `<div>
  <button popovertarget="pop" popovertargetaction="toggle">Open</button>
  <div id="pop" popover>
    <h4>Title</h4>
    <p>Content goes here</p>
  </div>
</div>`,
      },
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
      requirements: [
        'Show on hover and focus, hide on blur and ESC',
        'Add aria-describedby linking tooltip to trigger',
        'Use role="tooltip" on the tooltip element',
        'Support delay before showing',
      ],
      scaffolds: {
        shadcn: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button>Hover me</Button></TooltipTrigger>
    <TooltipContent>
      <p>Tooltip text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        radix: `<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content>
        Tooltip text
        <Tooltip.Arrow />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>`,
        html: `<span aria-describedby="tip">Hover me</span>
<div id="tip" role="tooltip" hidden>
  Tooltip text
</div>`,
      },
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
      requirements: [
        'Use role="status" or aria-live="polite" for screen readers',
        'Auto-dismiss after timeout with pause-on-hover',
        'Support action buttons (undo, retry)',
        'Stack multiple toasts without overlap',
      ],
      scaffolds: {
        shadcn: `<Toaster />
{/* In your component: */}
const { toast } = useToast()
toast({
  title: "Success",
  description: "Your changes have been saved.",
  action: <ToastAction altText="Undo">Undo</ToastAction>,
})`,
        radix: `<Toast.Provider>
  <Toast.Root open={open} onOpenChange={setOpen}>
    <Toast.Title>Title</Toast.Title>
    <Toast.Description>Description</Toast.Description>
    <Toast.Action altText="Undo">Undo</Toast.Action>
    <Toast.Close>×</Toast.Close>
  </Toast.Root>
  <Toast.Viewport />
</Toast.Provider>`,
        html: `<output role="status" aria-live="polite">
  <div>
    <strong>Success</strong>
    <p>Your changes have been saved.</p>
    <button>Undo</button>
    <button aria-label="Dismiss">×</button>
  </div>
</output>`,
      },
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
      requirements: [
        'Navigate options with arrow keys',
        'Select with Enter, dismiss with ESC',
        'Add aria-expanded and aria-activedescendant',
        'Support typeahead to jump to matching option',
      ],
      scaffolds: {
        shadcn: `<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>`,
        radix: `<Select.Root value={value} onValueChange={setValue}>
  <Select.Trigger>
    <Select.Value placeholder="Choose..." />
  </Select.Trigger>
  <Select.Portal>
    <Select.Content>
      <Select.Item value="a"><Select.ItemText>Option A</Select.ItemText></Select.Item>
      <Select.Item value="b"><Select.ItemText>Option B</Select.ItemText></Select.Item>
    </Select.Content>
  </Select.Portal>
</Select.Root>`,
        headless: `<Listbox value={value} onChange={setValue}>
  <Listbox.Button>{value}</Listbox.Button>
  <Listbox.Options>
    <Listbox.Option value="a">Option A</Listbox.Option>
    <Listbox.Option value="b">Option B</Listbox.Option>
  </Listbox.Options>
</Listbox>`,
        html: `<label for="sel">Choose</label>
<select id="sel" name="choice">
  <option value="">Choose...</option>
  <option value="a">Option A</option>
  <option value="b">Option B</option>
</select>`,
      },
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
      requirements: [
        'Auto-advance focus to next input on entry',
        'Support backspace to clear and move back',
        'Allow paste of full code across all inputs',
        'Add aria-label describing the input group purpose',
      ],
      scaffolds: {
        shadcn: `<InputOTP maxLength={6} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
        html: `<fieldset aria-label="Verification code">
  <input type="text" maxlength="1" inputmode="numeric" aria-label="Digit 1" />
  <input type="text" maxlength="1" inputmode="numeric" aria-label="Digit 2" />
  <input type="text" maxlength="1" inputmode="numeric" aria-label="Digit 3" />
  <span>-</span>
  <input type="text" maxlength="1" inputmode="numeric" aria-label="Digit 4" />
  <input type="text" maxlength="1" inputmode="numeric" aria-label="Digit 5" />
  <input type="text" maxlength="1" inputmode="numeric" aria-label="Digit 6" />
</fieldset>`,
      },
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
      requirements: [
        'Toggle with Space key when focused',
        'Use role="switch" with aria-checked',
        'Associate with label via htmlFor/id',
        'Visually indicate on/off state clearly',
      ],
      scaffolds: {
        shadcn: `<div>
  <Switch id="mode" checked={on} onCheckedChange={setOn} />
  <Label htmlFor="mode">Airplane Mode</Label>
</div>`,
        radix: `<Switch.Root checked={on} onCheckedChange={setOn}>
  <Switch.Thumb />
</Switch.Root>`,
        headless: `<Switch checked={on} onChange={setOn}>
  <span>{on ? "On" : "Off"}</span>
</Switch>`,
        html: `<label>
  <input type="checkbox" role="switch" aria-checked="${on}" />
  Airplane Mode
</label>`,
      },
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
      requirements: [
        'Accept drag events (dragenter, dragover, drop)',
        'Provide visual feedback during drag hover',
        'Support click-to-browse fallback',
        'Validate file type and size before upload',
      ],
      scaffolds: {
        shadcn: `<div
  onDragOver={handleDragOver}
  onDrop={handleDrop}
  onClick={() => inputRef.current.click()}
>
  <Upload />
  <p>Drag files here or click to browse</p>
  <input ref={inputRef} type="file" hidden onChange={handleChange} />
</div>`,
        html: `<div ondrop="handleDrop(event)" ondragover="event.preventDefault()">
  <p>Drag files here or click to browse</p>
  <input type="file" multiple />
</div>
<ul id="file-list"></ul>`,
      },
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
      requirements: [
        'Navigate with arrow keys within group',
        'Use role="radiogroup" with aria-label',
        'Only one item selectable at a time',
        'First item focusable, rest via arrows',
      ],
      scaffolds: {
        shadcn: `<RadioGroup value={value} onValueChange={setValue}>
  <div>
    <RadioGroupItem value="a" id="a" />
    <Label htmlFor="a">Option A</Label>
  </div>
  <div>
    <RadioGroupItem value="b" id="b" />
    <Label htmlFor="b">Option B</Label>
  </div>
</RadioGroup>`,
        radix: `<RadioGroup.Root value={value} onValueChange={setValue}>
  <RadioGroup.Item value="a" id="a">
    <RadioGroup.Indicator />
  </RadioGroup.Item>
  <label htmlFor="a">Option A</label>
  <RadioGroup.Item value="b" id="b">
    <RadioGroup.Indicator />
  </RadioGroup.Item>
  <label htmlFor="b">Option B</label>
</RadioGroup.Root>`,
        headless: `<RadioGroup value={value} onChange={setValue}>
  <RadioGroup.Label>Pick one</RadioGroup.Label>
  <RadioGroup.Option value="a">Option A</RadioGroup.Option>
  <RadioGroup.Option value="b">Option B</RadioGroup.Option>
</RadioGroup>`,
        html: `<fieldset>
  <legend>Pick one</legend>
  <label><input type="radio" name="pick" value="a" /> Option A</label>
  <label><input type="radio" name="pick" value="b" /> Option B</label>
</fieldset>`,
      },
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
      requirements: [
        'Support keyboard arrow keys for value adjustment',
        'Add aria-valuemin, aria-valuemax, aria-valuenow',
        'Use role="slider" on the thumb element',
        'Ensure visible focus ring on thumb',
      ],
      scaffolds: {
        shadcn: `<Slider
  defaultValue={[50]}
  max={100}
  step={1}
  onValueChange={setValue}
/>`,
        radix: `<Slider.Root defaultValue={[50]} max={100} step={1}>
  <Slider.Track>
    <Slider.Range />
  </Slider.Track>
  <Slider.Thumb />
</Slider.Root>`,
        html: `<label for="vol">Volume</label>
<input type="range" id="vol" min="0" max="100" value="50"
  oninput="output.value = this.value" />
<output id="output">50</output>`,
      },
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
      requirements: [
        'Use semantic <table>, <thead>, <tbody>, <th>, <td> elements',
        'Add scope="col" to header cells',
        'Ensure keyboard navigation between cells',
        'Add aria-sort on sortable columns',
        'Provide a caption or aria-label describing the table',
      ],
      scaffolds: {
        shadcn: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(row => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell className="text-right">{row.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
        html: `<table role="grid" aria-label="Users">
  <thead>
    <tr><th scope="col">Name</th><th scope="col">Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>Active</td></tr>
  </tbody>
</table>`,
      },
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
      requirements: [
        'Use semantic <ul> or <ol> with <li> elements',
        'Add role="feed" for infinite feed patterns',
        'Announce new items to screen readers with aria-live',
        'Ensure each item is keyboard focusable',
      ],
      scaffolds: {
        shadcn: `<ScrollArea className="h-[400px]">
  {items.map(item => (
    <Card key={item.id} className="mb-3">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.date}</CardDescription>
      </CardHeader>
      <CardContent>{item.body}</CardContent>
    </Card>
  ))}
</ScrollArea>`,
        html: `<ul role="feed" aria-label="Activity feed">
  <li role="article" aria-labelledby="post-1">
    <h3 id="post-1">Post title</h3>
    <p>Post body</p>
    <time datetime="2024-01-15">Jan 15</time>
  </li>
</ul>`,
      },
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
      requirements: [
        'Add aria-roledescription="carousel" on container',
        'Label each slide with aria-label="Slide N of M"',
        'Support left/right arrow key navigation',
        'Pause auto-play on hover and focus',
        'Provide visible previous/next buttons',
      ],
      scaffolds: {
        shadcn: `<Carousel opts={{ loop: true }}>
  <CarouselContent>
    {items.map((item, i) => (
      <CarouselItem key={i}>
        <Card><CardContent>{item}</CardContent></Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
        html: `<div role="region" aria-roledescription="carousel" aria-label="Featured">
  <div aria-live="polite">
    <div role="group" aria-roledescription="slide" aria-label="1 of 3">
      <img src="slide1.jpg" alt="Slide 1" />
    </div>
  </div>
  <button aria-label="Previous slide">&larr;</button>
  <button aria-label="Next slide">&rarr;</button>
</div>`,
      },
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
      requirements: [
        'Use role="tree" on container and role="treeitem" on nodes',
        'Support arrow keys: up/down to move, left/right to collapse/expand',
        'Set aria-expanded on parent nodes',
        'Maintain focus management within the tree',
      ],
      scaffolds: {
        shadcn: `<Accordion type="multiple" className="pl-4">
  {nodes.map(node => (
    <AccordionItem key={node.id} value={node.id}>
      <AccordionTrigger>{node.label}</AccordionTrigger>
      <AccordionContent>
        {node.children?.map(child => (
          <div key={child.id} className="pl-4">{child.label}</div>
        ))}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`,
        html: `<ul role="tree" aria-label="File explorer">
  <li role="treeitem" aria-expanded="true">
    <span>src</span>
    <ul role="group">
      <li role="treeitem">index.js</li>
      <li role="treeitem">App.jsx</li>
    </ul>
  </li>
</ul>`,
      },
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
      requirements: [
        'Use role="grid" with aria-label for the calendar',
        'Label each day cell with full date via aria-label',
        'Support arrow key navigation between days',
        'Mark today with aria-current="date"',
        'Announce month changes to screen readers',
      ],
      scaffolds: {
        shadcn: `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`,
        html: `<table role="grid" aria-label="January 2024">
  <thead>
    <tr><th abbr="Sunday">Su</th><th abbr="Monday">Mo</th><!-- ... --></tr>
  </thead>
  <tbody>
    <tr>
      <td><button aria-label="January 1, 2024">1</button></td>
      <td><button aria-label="January 2, 2024" aria-current="date">2</button></td>
    </tr>
  </tbody>
</table>`,
      },
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
      requirements: [
        'Use semantic heading for the metric label',
        'Mark trend direction with aria-label (e.g. "up 12%")',
        'Ensure color is not the only trend indicator',
        'Use responsive grid for multiple cards',
      ],
      scaffolds: {
        shadcn: `<Card>
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
    <DollarSign className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">$45,231</div>
    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
  </CardContent>
</Card>`,
        html: `<div class="stat-card" role="group" aria-label="Revenue metric">
  <h3>Revenue</h3>
  <p class="value">$45,231</p>
  <p class="trend" aria-label="Up 20.1% from last month">
    <span aria-hidden="true">&uarr;</span> 20.1%
  </p>
</div>`,
      },
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
      requirements: [
        'Use input with type="text" and aria-haspopup="dialog"',
        'Open calendar in a popover on click or Enter',
        'Support manual date typing in the input field',
        'Format date display according to locale',
        'Close popover on date selection or ESC',
      ],
      scaffolds: {
        shadcn: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : "Pick a date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar mode="single" selected={date} onSelect={setDate} />
  </PopoverContent>
</Popover>`,
        html: `<div class="datepicker">
  <label for="date">Date</label>
  <input type="date" id="date" aria-haspopup="dialog"
    value="2024-01-15" />
</div>`,
      },
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
      requirements: [
        'Open on Cmd+K (or Ctrl+K) keyboard shortcut',
        'Use role="combobox" with aria-expanded',
        'Auto-focus search input when opened',
        'Support arrow key navigation through results',
        'Close on ESC or clicking outside',
      ],
      scaffolds: {
        shadcn: `<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>Search</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`,
        html: `<dialog id="cmd" role="combobox" aria-expanded="true">
  <input type="search" placeholder="Type a command..."
    aria-controls="cmd-list" aria-autocomplete="list" />
  <ul id="cmd-list" role="listbox">
    <li role="option">Search</li>
    <li role="option">Settings</li>
  </ul>
</dialog>`,
      },
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
      requirements: [
        'Remove tags with Backspace key when input is empty',
        'Add tag on Enter or comma press',
        'Prevent duplicate tag entries',
        'Each tag must have a visible remove button',
        'Announce tag additions/removals to screen readers',
      ],
      scaffolds: {
        shadcn: `<div className="flex flex-wrap gap-2 rounded-md border p-2">
  {tags.map(tag => (
    <Badge key={tag} variant="secondary">
      {tag}
      <button onClick={() => removeTag(tag)} className="ml-1">
        <X className="h-3 w-3" />
      </button>
    </Badge>
  ))}
  <Input
    value={input}
    onChange={e => setInput(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder="Add tag..."
    className="flex-1 border-0 shadow-none"
  />
</div>`,
        html: `<div class="tag-input" role="group" aria-label="Tags">
  <span class="tag">React <button aria-label="Remove React">&times;</button></span>
  <span class="tag">CSS <button aria-label="Remove CSS">&times;</button></span>
  <input type="text" placeholder="Add tag..." aria-label="Add new tag" />
</div>`,
      },
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
      requirements: [
        'Use contentEditable or textarea with role="textbox"',
        'Set aria-multiline="true" on the editor',
        'Label toolbar buttons with aria-label',
        'Support Cmd+B/I/U keyboard shortcuts',
        'Ensure output is sanitized HTML',
      ],
      scaffolds: {
        shadcn: `<div className="border rounded-md">
  <div className="flex gap-1 border-b p-2">
    <Toggle pressed={bold} onPressedChange={setBold} aria-label="Bold">
      <Bold className="h-4 w-4" />
    </Toggle>
    <Toggle pressed={italic} onPressedChange={setItalic} aria-label="Italic">
      <Italic className="h-4 w-4" />
    </Toggle>
  </div>
  <Textarea className="min-h-[200px] border-0" />
</div>`,
        html: `<div class="editor">
  <div role="toolbar" aria-label="Formatting">
    <button aria-label="Bold" aria-pressed="false"><b>B</b></button>
    <button aria-label="Italic" aria-pressed="false"><i>I</i></button>
  </div>
  <div contenteditable="true" role="textbox" aria-multiline="true"
    aria-label="Content editor"></div>
</div>`,
      },
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
      requirements: [
        'Use role="radiogroup" for star ratings',
        'Each star is a radio with aria-label "N out of M stars"',
        'Support keyboard left/right arrow selection',
        'Show visual hover preview before committing',
        'Announce selected rating to screen readers',
      ],
      scaffolds: {
        shadcn: `<div className="flex gap-1" role="radiogroup" aria-label="Rating">
  {[1, 2, 3, 4, 5].map(star => (
    <button
      key={star}
      onClick={() => setRating(star)}
      onMouseEnter={() => setHover(star)}
      onMouseLeave={() => setHover(0)}
      aria-label={\`\${star} of 5 stars\`}
      className={star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}
    >
      <Star className="h-6 w-6 fill-current" />
    </button>
  ))}
</div>`,
        html: `<fieldset>
  <legend>Rating</legend>
  <div role="radiogroup" aria-label="Star rating">
    <input type="radio" name="rating" value="1" aria-label="1 of 5 stars" />
    <input type="radio" name="rating" value="2" aria-label="2 of 5 stars" />
    <input type="radio" name="rating" value="3" aria-label="3 of 5 stars" />
    <input type="radio" name="rating" value="4" aria-label="4 of 5 stars" />
    <input type="radio" name="rating" value="5" aria-label="5 of 5 stars" />
  </div>
</fieldset>`,
      },
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
      requirements: [
        'Use aria-current="step" on the active step',
        'Mark completed steps with aria-label including "completed"',
        'Validate current step before allowing next',
        'Provide back/next navigation buttons',
        'Show visual progress indicator',
      ],
      scaffolds: {
        shadcn: `<div className="flex items-center gap-4">
  {steps.map((step, i) => (
    <div key={i} className="flex items-center gap-2">
      <div className={\`w-8 h-8 rounded-full flex items-center justify-center \${
        i <= current ? 'bg-primary text-white' : 'bg-muted'
      }\`}>
        {i < current ? <Check className="h-4 w-4" /> : i + 1}
      </div>
      <span>{step.label}</span>
      {i < steps.length - 1 && <Separator className="w-12" />}
    </div>
  ))}
</div>`,
        html: `<nav aria-label="Progress">
  <ol>
    <li aria-current="step">
      <span class="step-number">1</span>
      <span>Account</span>
    </li>
    <li>
      <span class="step-number">2</span>
      <span>Details</span>
    </li>
  </ol>
</nav>`,
      },
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
      requirements: [
        'Use <nav> with aria-label="Main navigation"',
        'Mark active link with aria-current="page"',
        'Support keyboard navigation between items',
        'Provide collapse/expand toggle with aria-expanded',
        'Ensure collapsed state shows tooltips on icon hover',
      ],
      scaffolds: {
        shadcn: `<aside className="flex flex-col w-64 border-r h-screen">
  <div className="p-4 font-bold">Logo</div>
  <nav className="flex-1 p-2 space-y-1">
    {links.map(link => (
      <Button key={link.href} variant="ghost" className="w-full justify-start" asChild>
        <a href={link.href}>
          <link.icon className="mr-2 h-4 w-4" />
          {link.label}
        </a>
      </Button>
    ))}
  </nav>
</aside>`,
        html: `<nav aria-label="Main navigation" class="sidebar">
  <a href="/" aria-current="page">
    <svg><!-- icon --></svg>
    <span>Dashboard</span>
  </a>
  <a href="/settings">
    <svg><!-- icon --></svg>
    <span>Settings</span>
  </a>
</nav>`,
      },
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
      requirements: [
        'Use <article> or role="article" for each card',
        'Add alt text to cover images',
        'Ensure action buttons have descriptive labels',
        'Support keyboard focus on interactive cards',
      ],
      scaffolds: {
        shadcn: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>`,
        html: `<article class="card">
  <img src="cover.jpg" alt="Project screenshot" class="card-image" />
  <div class="card-body">
    <h3>Card Title</h3>
    <p>Card description text.</p>
  </div>
  <div class="card-footer">
    <button>Cancel</button>
    <button>Save</button>
  </div>
</article>`,
      },
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
      requirements: [
        'Use CSS columns or grid for layout',
        'Add alt text to all images',
        'Ensure responsive column count by viewport width',
        'Maintain source order for screen readers',
      ],
      scaffolds: {
        shadcn: `<div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
  {items.map(item => (
    <Card key={item.id} className="mb-4 break-inside-avoid">
      <CardContent className="p-0">
        <img src={item.src} alt={item.alt} className="w-full rounded-lg" />
      </CardContent>
    </Card>
  ))}
</div>`,
        html: `<div class="masonry" style="columns: 3; column-gap: 1rem;">
  <figure style="break-inside: avoid; margin-bottom: 1rem;">
    <img src="photo1.jpg" alt="Mountain landscape" />
    <figcaption>Mountain landscape</figcaption>
  </figure>
  <figure style="break-inside: avoid; margin-bottom: 1rem;">
    <img src="photo2.jpg" alt="Ocean view" />
  </figure>
</div>`,
      },
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
      requirements: [
        'Use role="tablist" on container, role="tab" on triggers',
        'Link tabs to panels with aria-controls/aria-labelledby',
        'Support arrow key navigation between tabs',
        'Set aria-selected="true" on active tab',
        'Use role="tabpanel" on content panels',
      ],
      scaffolds: {
        shadcn: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Account</TabsTrigger>
    <TabsTrigger value="tab2">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Account settings...</TabsContent>
  <TabsContent value="tab2">Password settings...</TabsContent>
</Tabs>`,
        radix: `<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Account settings...</Tabs.Content>
  <Tabs.Content value="tab2">Password settings...</Tabs.Content>
</Tabs.Root>`,
        headless: `<Tab.Group>
  <Tab.List>
    <Tab>Account</Tab>
    <Tab>Password</Tab>
  </Tab.List>
  <Tab.Panels>
    <Tab.Panel>Account settings...</Tab.Panel>
    <Tab.Panel>Password settings...</Tab.Panel>
  </Tab.Panels>
</Tab.Group>`,
        html: `<div role="tablist" aria-label="Settings">
  <button role="tab" aria-selected="true" aria-controls="panel1" id="tab1">Account</button>
  <button role="tab" aria-selected="false" aria-controls="panel2" id="tab2">Password</button>
</div>
<div role="tabpanel" id="panel1" aria-labelledby="tab1">Account settings...</div>
<div role="tabpanel" id="panel2" aria-labelledby="tab2" hidden>Password settings...</div>`,
      },
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
      requirements: [
        'Use <nav> with aria-label="Breadcrumb"',
        'Use <ol> for the ordered path list',
        'Mark current page with aria-current="page"',
        'Separate items with aria-hidden decorative separators',
      ],
      scaffolds: {
        shadcn: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
        html: `<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li aria-hidden="true">/</li>
    <li><a href="/products">Products</a></li>
    <li aria-hidden="true">/</li>
    <li aria-current="page">Current Page</li>
  </ol>
</nav>`,
      },
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
      requirements: [
        'Use appropriate ARIA: button triggers with aria-expanded',
        'Support Enter and Space to toggle items',
        'Animate content height on expand/collapse',
        'Allow single or multiple open sections via prop',
      ],
      scaffolds: {
        shadcn: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes, it follows WAI-ARIA patterns.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>Yes, with Tailwind CSS.</AccordionContent>
  </AccordionItem>
</Accordion>`,
        radix: `<Accordion.Root type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>Yes, it follows WAI-ARIA patterns.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`,
        headless: `<Disclosure>
  <Disclosure.Button>Is it accessible?</Disclosure.Button>
  <Disclosure.Panel>Yes, it follows WAI-ARIA patterns.</Disclosure.Panel>
</Disclosure>`,
        html: `<div class="accordion">
  <h3>
    <button aria-expanded="true" aria-controls="panel-1">
      Is it accessible?
    </button>
  </h3>
  <div id="panel-1" role="region">
    <p>Yes, it follows WAI-ARIA patterns.</p>
  </div>
</div>`,
      },
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
      requirements: [
        'Use role="menu" with role="menuitem" children',
        'Support arrow key navigation through items',
        'Close on ESC or clicking outside',
        'Position at cursor coordinates on right-click',
        'Support nested sub-menus with aria-haspopup',
      ],
      scaffolds: {
        shadcn: `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Cut</ContextMenuItem>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
        radix: `<ContextMenu.Root>
  <ContextMenu.Trigger>Right click here</ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Content>
      <ContextMenu.Item>Cut</ContextMenu.Item>
      <ContextMenu.Item>Copy</ContextMenu.Item>
      <ContextMenu.Separator />
      <ContextMenu.Item>Delete</ContextMenu.Item>
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>`,
        html: `<div oncontextmenu="showMenu(event)">Right click here</div>
<div id="ctx-menu" role="menu" hidden style="position:fixed;">
  <button role="menuitem">Cut</button>
  <button role="menuitem">Copy</button>
  <hr />
  <button role="menuitem">Delete</button>
</div>`,
      },
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
      requirements: [
        'Provide keyboard alternative (move up/down buttons)',
        'Announce reorder to screen readers with aria-live',
        'Show clear drag affordance (handle or cursor)',
        'Add visual drop target indicator',
        'Maintain item order in state after drop',
      ],
      scaffolds: {
        shadcn: `<DndContext onDragEnd={handleDragEnd}>
  <SortableContext items={items} strategy={verticalListSortingStrategy}>
    {items.map(item => (
      <SortableItem key={item.id} id={item.id}>
        <Card>
          <CardContent className="flex items-center gap-2 p-4">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            {item.label}
          </CardContent>
        </Card>
      </SortableItem>
    ))}
  </SortableContext>
</DndContext>`,
        html: `<ul role="listbox" aria-label="Sortable list">
  <li role="option" draggable="true" aria-grabbed="false">
    <span class="drag-handle" aria-label="Drag to reorder">&#9776;</span>
    Item 1
    <button aria-label="Move up">&#9650;</button>
    <button aria-label="Move down">&#9660;</button>
  </li>
</ul>`,
      },
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
      requirements: [
        'Trap focus inside lightbox when open',
        'Close on ESC key press',
        'Support left/right arrow key navigation',
        'Add alt text to all images',
        'Prevent background scroll when open',
      ],
      scaffolds: {
        shadcn: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="max-w-4xl p-0 bg-black">
    <img src={images[index].src} alt={images[index].alt}
      className="w-full h-auto" />
    <div className="absolute inset-y-0 left-0 flex items-center">
      <Button variant="ghost" size="icon" onClick={prev}>
        <ChevronLeft />
      </Button>
    </div>
    <div className="absolute inset-y-0 right-0 flex items-center">
      <Button variant="ghost" size="icon" onClick={next}>
        <ChevronRight />
      </Button>
    </div>
  </DialogContent>
</Dialog>`,
        html: `<dialog id="lightbox" aria-label="Image viewer">
  <img src="photo.jpg" alt="Full size photo" />
  <button aria-label="Previous image">&larr;</button>
  <button aria-label="Next image">&rarr;</button>
  <button aria-label="Close" onclick="lightbox.close()">&times;</button>
</dialog>`,
      },
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
      requirements: [
        'Use IntersectionObserver for scroll detection',
        'Show loading spinner during fetch',
        'Provide manual "Load More" fallback button',
        'Announce new content with aria-live="polite"',
        'Handle empty state when no more items exist',
      ],
      scaffolds: {
        shadcn: `const ref = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && hasMore) loadMore();
  }, { threshold: 0.5 });
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, [hasMore]);

return (
  <div className="space-y-4">
    {items.map(item => <Card key={item.id}>...</Card>)}
    <div ref={ref} aria-live="polite">
      {loading && <Skeleton className="h-20 w-full" />}
    </div>
  </div>
);`,
        html: `<div role="feed" aria-label="Posts">
  <article>Post 1</article>
  <article>Post 2</article>
  <div id="sentinel" aria-live="polite">
    <p>Loading more...</p>
  </div>
  <button onclick="loadMore()">Load More</button>
</div>`,
      },
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
      requirements: [
        'Use role="alert" for urgent messages',
        'Use role="status" for informational messages',
        'Include a descriptive icon matching the alert type',
        'Provide a dismiss button with aria-label',
        'Don\'t rely on color alone to convey severity',
      ],
      scaffolds: {
        shadcn: `<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong. Please try again.</AlertDescription>
</Alert>`,
        radix: `<div role="alert" className="alert alert-error">
  <AlertCircle />
  <span>Something went wrong.</span>
  <button aria-label="Dismiss">×</button>
</div>`,
        html: `<div role="alert" class="alert alert-error">
  <svg aria-hidden="true"><!-- error icon --></svg>
  <div>
    <strong>Error</strong>
    <p>Something went wrong. Please try again.</p>
  </div>
  <button aria-label="Dismiss alert">&times;</button>
</div>`,
      },
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
      requirements: [
        'Center content vertically and horizontally',
        'Include a clear call-to-action button',
        'Add descriptive illustration or icon',
        'Use heading for the empty state title',
      ],
      scaffolds: {
        shadcn: `<div className="flex flex-col items-center justify-center py-16 text-center">
  <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold">No results found</h3>
  <p className="text-muted-foreground mb-4">Try adjusting your filters.</p>
  <Button>Clear Filters</Button>
</div>`,
        html: `<div class="empty-state" role="status">
  <svg aria-hidden="true"><!-- illustration --></svg>
  <h3>No results found</h3>
  <p>Try adjusting your search or filters.</p>
  <button>Clear Filters</button>
</div>`,
      },
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
      requirements: [
        'Use a semantic <span> with appropriate styling',
        'Ensure sufficient color contrast for the badge',
        'Announce badge count to screen readers',
        'Use aria-label for icon-only badges',
      ],
      scaffolds: {
        shadcn: `<Badge variant="default">New</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Deleted</Badge>
<Badge variant="outline">Open</Badge>`,
        html: `<span class="badge badge-info" aria-label="3 new notifications">3</span>
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>`,
      },
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
      requirements: [
        'Add alt text to each avatar image',
        'Show "+N more" count for overflow',
        'Provide fallback initials for missing images',
        'Use role="group" with aria-label on the container',
      ],
      scaffolds: {
        shadcn: `<div className="flex -space-x-3" role="group" aria-label="Team members">
  {users.map(user => (
    <Avatar key={user.id} className="border-2 border-background">
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback>{user.initials}</AvatarFallback>
    </Avatar>
  ))}
  {overflow > 0 && (
    <Avatar className="border-2 border-background">
      <AvatarFallback>+{overflow}</AvatarFallback>
    </Avatar>
  )}
</div>`,
        html: `<div class="avatar-group" role="group" aria-label="Team members">
  <img src="user1.jpg" alt="Alice" class="avatar" />
  <img src="user2.jpg" alt="Bob" class="avatar" />
  <span class="avatar avatar-fallback" aria-label="3 more members">+3</span>
</div>`,
      },
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
      requirements: [
        'Use semantic <ol> for ordered events',
        'Add <time> elements with datetime attribute',
        'Ensure visual connectors are aria-hidden',
        'Use aria-current for the latest event',
      ],
      scaffolds: {
        shadcn: `<ol className="relative border-l border-muted-foreground/20">
  {events.map((event, i) => (
    <li key={i} className="ml-6 mb-8">
      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
        <Check className="h-3 w-3 text-white" />
      </span>
      <h3 className="font-semibold">{event.title}</h3>
      <time className="text-sm text-muted-foreground">{event.date}</time>
      <p className="text-sm">{event.description}</p>
    </li>
  ))}
</ol>`,
        html: `<ol class="timeline">
  <li>
    <span class="dot" aria-hidden="true"></span>
    <h3>Order placed</h3>
    <time datetime="2024-01-15">Jan 15, 2024</time>
    <p>Your order has been confirmed.</p>
  </li>
  <li aria-current="step">
    <span class="dot active" aria-hidden="true"></span>
    <h3>Shipping</h3>
    <time datetime="2024-01-17">Jan 17, 2024</time>
  </li>
</ol>`,
      },
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
      requirements: [
        'Use aria-busy="true" on the loading container',
        'Add aria-label="Loading" on skeleton elements',
        'Match the layout of the actual content',
        'Use reduced-motion media query for animations',
      ],
      scaffolds: {
        shadcn: `<div className="space-y-3">
  <Skeleton className="h-12 w-12 rounded-full" />
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>`,
        html: `<div aria-busy="true" aria-label="Loading content">
  <div class="skeleton skeleton-circle" aria-hidden="true"></div>
  <div class="skeleton skeleton-line" aria-hidden="true"></div>
  <div class="skeleton skeleton-line short" aria-hidden="true"></div>
</div>`,
      },
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
      requirements: [
        'Use role="progressbar" with aria-valuenow',
        'Set aria-valuemin and aria-valuemax',
        'Add aria-label describing the progress',
        'Update value dynamically for determinate progress',
      ],
      scaffolds: {
        shadcn: `<Progress value={66} className="w-full" />`,
        html: `<div role="progressbar" aria-valuenow="66" aria-valuemin="0"
  aria-valuemax="100" aria-label="Upload progress: 66%">
  <div class="progress-track">
    <div class="progress-fill" style="width: 66%"></div>
  </div>
  <span>66%</span>
</div>`,
      },
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
      requirements: [
        'Use <section> with aria-label for landmark',
        'Ensure heading hierarchy starts with h1',
        'Make CTA buttons large and focusable',
        'Optimize background images with lazy loading',
        'Ensure text contrast over background imagery',
      ],
      scaffolds: {
        shadcn: `<section className="py-20 px-6 text-center">
  <h1 className="text-5xl font-bold tracking-tight mb-6">
    Build faster with components
  </h1>
  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
    Ship beautiful interfaces in half the time.
  </p>
  <div className="flex gap-4 justify-center">
    <Button size="lg">Get Started</Button>
    <Button size="lg" variant="outline">Learn More</Button>
  </div>
</section>`,
        html: `<section aria-label="Hero" class="hero">
  <h1>Build faster with components</h1>
  <p>Ship beautiful interfaces in half the time.</p>
  <div class="cta-group">
    <a href="/signup" class="btn btn-primary">Get Started</a>
    <a href="/docs" class="btn btn-outline">Learn More</a>
  </div>
</section>`,
      },
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
      requirements: [
        'Use semantic heading for each plan name',
        'Mark the recommended plan with aria-label',
        'Ensure toggle updates all prices reactively',
        'Make feature comparisons scannable with check/cross icons',
        'CTA buttons must be descriptive ("Start Free Trial")',
      ],
      scaffolds: {
        shadcn: `<div className="grid md:grid-cols-3 gap-8">
  {plans.map(plan => (
    <Card key={plan.id} className={plan.popular ? 'border-primary shadow-lg' : ''}>
      <CardHeader>
        {plan.popular && <Badge className="w-fit">Most Popular</Badge>}
        <CardTitle>{plan.name}</CardTitle>
        <div className="text-3xl font-bold">\${plan.price}<span className="text-sm font-normal">/mo</span></div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map(f => (
            <li key={f} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" /> {f}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{plan.cta}</Button>
      </CardFooter>
    </Card>
  ))}
</div>`,
        html: `<section aria-label="Pricing plans">
  <div class="pricing-grid">
    <article class="plan" aria-label="Pro plan - recommended">
      <h3>Pro</h3>
      <p class="price">$29<span>/mo</span></p>
      <ul>
        <li>&#10003; Unlimited projects</li>
        <li>&#10003; Priority support</li>
      </ul>
      <a href="/signup?plan=pro" class="btn">Start Free Trial</a>
    </article>
  </div>
</section>`,
      },
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
      requirements: [
        'Use <blockquote> for the testimonial text',
        'Include cite attribute or <cite> element',
        'Add alt text to avatar images',
        'Ensure carousel controls are keyboard accessible',
      ],
      scaffolds: {
        shadcn: `<Card className="max-w-lg">
  <CardContent className="pt-6">
    <blockquote className="text-lg italic mb-4">
      "This product changed how we work. Highly recommended."
    </blockquote>
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="/user.jpg" alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">Jane Doe</p>
        <p className="text-sm text-muted-foreground">CEO, Acme Inc</p>
      </div>
    </div>
  </CardContent>
</Card>`,
        html: `<figure class="testimonial">
  <blockquote cite="https://example.com/reviews">
    <p>"This product changed how we work. Highly recommended."</p>
  </blockquote>
  <figcaption>
    <img src="user.jpg" alt="Jane Doe" class="avatar" />
    <cite>Jane Doe</cite>
    <span>CEO, Acme Inc</span>
  </figcaption>
</figure>`,
      },
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
      requirements: [
        'Use accordion pattern with aria-expanded on triggers',
        'Support keyboard Enter/Space to toggle answers',
        'Use semantic <dl>, <dt>, <dd> or heading+div structure',
        'Provide structured data (JSON-LD) for SEO',
      ],
      scaffolds: {
        shadcn: `<Accordion type="single" collapsible className="max-w-2xl mx-auto">
  {faqs.map((faq, i) => (
    <AccordionItem key={i} value={\`faq-\${i}\`}>
      <AccordionTrigger>{faq.question}</AccordionTrigger>
      <AccordionContent>{faq.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`,
        radix: `<Accordion.Root type="single" collapsible>
  {faqs.map((faq, i) => (
    <Accordion.Item key={i} value={\`faq-\${i}\`}>
      <Accordion.Header>
        <Accordion.Trigger>{faq.question}</Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>{faq.answer}</Accordion.Content>
    </Accordion.Item>
  ))}
</Accordion.Root>`,
        headless: `{faqs.map((faq, i) => (
  <Disclosure key={i}>
    <Disclosure.Button>{faq.question}</Disclosure.Button>
    <Disclosure.Panel>{faq.answer}</Disclosure.Panel>
  </Disclosure>
))}`,
        html: `<section aria-label="Frequently Asked Questions">
  <h2>FAQ</h2>
  <div class="faq-item">
    <h3>
      <button aria-expanded="false" aria-controls="answer-1">
        What is your return policy?
      </button>
    </h3>
    <div id="answer-1" hidden>
      <p>You can return items within 30 days.</p>
    </div>
  </div>
</section>`,
      },
    },
    demo: FaqDemo,
  },
};
