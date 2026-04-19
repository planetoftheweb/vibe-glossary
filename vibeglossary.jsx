import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Menu, ChevronDown, Check, X, Search, Bell, Settings, 
  MoreHorizontal, User, Layout, Type, MousePointer, 
  MessageSquare, Layers, ArrowRight, Info, AlertTriangle, 
  Calendar, CreditCard, Maximize2, Minimize2, Sidebar,
  Image, FileText, Upload, Users, Clock, Ghost, Grip,
  AlignJustify, File, SidebarClose, SidebarOpen, 
  PanelLeftClose, PanelLeftOpen, BookOpen, Sliders,
  Copy, CheckSquare, Square, Sun, Moon, Command,
  Terminal, Sparkles, Zap, ChevronRight, Home, Shield,
  Wifi, Eye, EyeOff, Loader2, Plus, Minus, PanelRightClose,
  PanelRightOpen, MousePointer2
} from 'lucide-react';

// --- STYLES FOR ANIMATION ---
const ANIMATION_STYLES = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
  @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
  @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
  @keyframes slideInUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0px); } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  
  .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
  .animate-zoom-in { animation: zoomIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-slide-in-left { animation: slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-slide-in-up { animation: slideInUp 0.3s ease-out forwards; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-shimmer { background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.5) 50%, transparent 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
`;

// --- HELPER COMPONENTS ---

const TopNav = ({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen, activeFilter, setActiveFilter, onGetStarted }) => (
  <header className="h-14 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 shrink-0 z-50 fixed top-0 left-0 right-0">
    <div className="flex items-center gap-4">
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors lg:hidden"
      >
        <Menu size={20} />
      </button>
      <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-zinc-900 dark:text-white mr-4">
        <div className="bg-indigo-600 p-1 rounded-md text-white">
          <Type size={16} />
        </div>
        <span>VibeGlossary</span>
      </div>
      <div className="hidden md:flex h-5 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
      <nav className="hidden md:flex gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {['All', 'Components', 'Patterns', 'Showcase'].map(filter => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter === 'All' ? null : filter)}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              (activeFilter === filter) || (filter === 'All' && !activeFilter)
                ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800' 
                : 'hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>

    <div className="flex items-center gap-2">
      <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors">
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <div className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs text-zinc-500 font-mono mr-2">
        <Command size={10} /> K
      </div>
      <button 
        onClick={onGetStarted}
        className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-1.5 rounded-md text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
      >
        Get Started
      </button>
    </div>
  </header>
);

const ConfigToggle = ({ options, value, onChange, label }) => (
  <div className="flex items-center space-x-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-1 rounded-lg shadow-sm z-20">
    {label && <span className="text-xs font-bold uppercase text-zinc-400 px-2">{label}</span>}
    <div className="flex bg-zinc-100 dark:bg-zinc-950 rounded p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
            value === opt.value 
              ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm' 
              : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

const PromptBuilder = ({ data, activeOptions, onOptionToggle }) => {
  const [copied, setCopied] = useState(false);

  if (!data?.prompt) return null;

  const promptText = `${data.prompt.base}${data.prompt.options
    .filter(opt => activeOptions.has(opt.id))
    .map(o => o.text)
    .join('')}.`;

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = promptText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/10 dark:to-zinc-900 border border-indigo-100 dark:border-indigo-900/30 rounded-xl p-5 space-y-4 shadow-sm relative overflow-hidden group">
      
      <div className="flex items-center justify-between relative z-10">
        <h3 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-2">
          <Terminal size={14} /> 
          Spec Generator
        </h3>
        <span className="text-xs bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
          <Zap size={10} className="fill-current" /> Live Updates
        </span>
      </div>

      <div className="flex flex-wrap gap-2 relative z-10">
        {data.prompt.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onOptionToggle(opt.id)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all duration-200 ${
              activeOptions.has(opt.id)
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md transform scale-105'
                : 'bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            {activeOptions.has(opt.id) ? <CheckSquare size={14} /> : <Square size={14} />}
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="relative group/code z-10">
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed min-h-[80px] shadow-inner">
          <span className="text-indigo-600 dark:text-indigo-400 select-none mr-2">$</span>
          {promptText}
          <span className="inline-block w-2 h-4 bg-indigo-500 ml-1 align-middle animate-pulse"></span>
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md text-zinc-500 transition-colors opacity-0 group-hover/code:opacity-100"
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};

const CATEGORIES = [
  {
    id: 'overlays',
    name: 'Overlays',
    type: 'Components',
    icon: <Layers size={14} />,
    items: [
      { id: 'modal', name: 'Modal / Dialog' },
      { id: 'drawer', name: 'Drawer / Sheet' },
      { id: 'popover', name: 'Popover' },
      { id: 'tooltip', name: 'Tooltip' },
      { id: 'toast', name: 'Toast / Snackbar' },
    ]
  },
  {
    id: 'inputs',
    name: 'Inputs',
    type: 'Components',
    icon: <MousePointer size={14} />,
    items: [
      { id: 'select', name: 'Select vs. Combobox' },
      { id: 'otp', name: 'OTP / Pin Input' },
      { id: 'switch', name: 'Switch vs. Checkbox' },
      { id: 'dropzone', name: 'File Dropzone' },
      { id: 'radio', name: 'Radio Group' },
      { id: 'slider', name: 'Slider' },
    ]
  },
  {
    id: 'layout',
    name: 'Layouts',
    type: 'Patterns',
    icon: <Layout size={14} />,
    items: [
      { id: 'sidebar', name: 'Sidebar vs. Rail' },
      { id: 'card', name: 'Card vs. Tile' },
      { id: 'masonry', name: 'Masonry Grid' },
    ]
  },
  {
    id: 'navigation',
    name: 'Navigation',
    type: 'Patterns',
    icon: <Grip size={14} />,
    items: [
      { id: 'tabs', name: 'Tabs vs. Segments' },
      { id: 'breadcrumbs', name: 'Breadcrumbs' },
      { id: 'accordion', name: 'Accordion' },
    ]
  },
  {
    id: 'feedback',
    name: 'Feedback',
    type: 'Showcase',
    icon: <MessageSquare size={14} />,
    items: [
      { id: 'alert', name: 'Alert / Callout' },
      { id: 'empty', name: 'Empty State' },
      { id: 'badge', name: 'Badge vs. Chip' },
      { id: 'avatars', name: 'Avatar Group' },
      { id: 'timeline', name: 'Timeline' },
      { id: 'skeleton', name: 'Skeleton' },
      { id: 'progress', name: 'Progress Bar' },
    ]
  }
];

const GLOSSARY_DATA = {
  // --- OVERLAYS ---
  modal: {
    title: "Modal (Dialog)",
    definition: "Overlay window that blocks background interaction.",
    vibeTip: "Use 'Dialog' for Shadcn. Specify 'Focus Trap' & 'Backdrop'.",
    comparison: "Modal blocks. Popover allows outside click.",
    prompt: {
      base: "Add a centered Dialog modal overlay",
      options: [
        { id: "blur", label: "Blur", text: " with a backdrop-blur effect" },
        { id: "trap", label: "Focus Trap", text: " ensuring focus remains trapped within" },
        { id: "anim", label: "Animation", text: " using a smooth zoom-in entrance" },
        { id: "footer", label: "Sticky Footer", text: " including a sticky footer for actions" },
        { id: "size", label: "Large Size", text: " using a max-width-2xl container" }
      ]
    },
    demo: ({ activeOptions }) => {
      const [isOpen, setIsOpen] = useState(false);
      const isBlur = activeOptions.has('blur');
      const isAnim = activeOptions.has('anim');
      const hasFooter = activeOptions.has('footer');
      const isLarge = activeOptions.has('size');

      return (
        <div className="flex flex-col items-center justify-center h-full relative w-full bg-zinc-50 dark:bg-zinc-900/50">
          <button 
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-all shadow-sm active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Open Modal
          </button>
          
          {isOpen && (
            <div className={`absolute inset-0 z-50 flex items-center justify-center p-4 ${isBlur ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/50'} ${isAnim ? 'animate-fade-in' : ''}`}>
              <div className={`bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full border border-zinc-200 dark:border-zinc-800 flex flex-col ${isLarge ? 'max-w-2xl h-96' : 'max-w-sm'} ${isAnim ? 'animate-zoom-in' : ''}`}>
                <div className="flex justify-between items-start p-6 pb-2">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Confirm Action</h3>
                  <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"><X size={18} /></button>
                </div>
                <div className="p-6 pt-2 space-y-4 flex-1 overflow-y-auto">
                  <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
                  <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-3/4"></div>
                  {isLarge && (
                    <>
                      <div className="h-32 bg-zinc-50 dark:bg-zinc-800/50 rounded w-full mt-4 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 text-xs">
                        Extra Content Area
                      </div>
                      <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
                    </>
                  )}
                </div>
                {hasFooter && (
                  <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-b-xl flex justify-end space-x-2">
                    <button onClick={() => setIsOpen(false)} className="px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-200 rounded transition dark:text-zinc-300 dark:hover:bg-zinc-800">Cancel</button>
                    <button onClick={() => setIsOpen(false)} className="px-3 py-1.5 text-sm bg-zinc-900 text-white rounded hover:bg-zinc-800 transition shadow-sm dark:bg-white dark:text-zinc-900">Confirm</button>
                  </div>
                )}
                {!hasFooter && (
                   <div className="p-6 pt-0 flex justify-end space-x-2">
                      <button onClick={() => setIsOpen(false)} className="px-3 py-1.5 text-sm bg-zinc-900 text-white rounded hover:bg-zinc-800 transition shadow-sm dark:bg-white dark:text-zinc-900">Close</button>
                   </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }
  },
  
  drawer: {
    title: "Drawer (Sheet)",
    definition: "Edge-anchored panel overlay.",
    vibeTip: "Keyword: 'Sheet'.",
    comparison: "Drawer slides. Sidebar pushes.",
    prompt: { 
        base: "Implement a Sheet drawer", 
        options: [
            {id: "left", label: "Left Side", text: " anchored to the left edge"},
            {id: "blur", label: "Blur", text: " with a backdrop blur"},
            {id: "footer", label: "Footer", text: " containing action buttons"}
        ] 
    },
    demo: ({ activeOptions }) => {
        const side = activeOptions.has('left') ? 'left' : 'right';
        const isBlur = activeOptions.has('blur');
        const hasFooter = activeOptions.has('footer');
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="flex flex-col items-center justify-center h-full relative bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden">
                <button onClick={() => setIsOpen(true)} className="px-4 py-2 border border-zinc-300 rounded-md bg-white shadow-sm dark:bg-zinc-800 dark:border-zinc-700">Open {side === 'left' ? 'Left' : 'Right'} Sheet</button>
                {isOpen && (
                    <>
                        <div className={`absolute inset-0 bg-black/20 z-40 ${isBlur ? 'backdrop-blur-sm' : ''} animate-fade-in`} onClick={() => setIsOpen(false)}/>
                        <div className={`absolute inset-y-0 ${side === 'right' ? 'right-0 border-l animate-slide-in-right' : 'left-0 border-r animate-slide-in-left'} z-50 w-72 bg-white dark:bg-zinc-900 p-6 shadow-2xl flex flex-col`}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg dark:text-white">Settings</h3>
                                <button onClick={() => setIsOpen(false)}><X size={18} className="text-zinc-400" /></button>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="h-8 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
                                <div className="h-8 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
                                <div className="h-8 bg-zinc-100 dark:bg-zinc-800 rounded w-2/3"></div>
                            </div>
                            {hasFooter && (
                                <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
                                    <button className="flex-1 py-2 bg-zinc-900 text-white rounded text-sm dark:bg-white dark:text-zinc-900">Save</button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        )
    }
  },

  popover: {
    title: "Popover",
    definition: "Floating card triggered by button.",
    vibeTip: "Use for interactive content.",
    comparison: "Popover = Container.",
    prompt: { 
        base: "Create a triggered Popover component", 
        options: [
            { id: "arrow", label: "Arrow", text: " with a pointing arrow" },
            { id: "interactive", label: "Interactive", text: " containing input fields" },
            { id: "focus", label: "Auto-Focus", text: " that manages focus" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const [isOpen, setIsOpen] = useState(false);
        const hasArrow = activeOptions.has('arrow');
        const isInteractive = activeOptions.has('interactive');
        const hasFocus = activeOptions.has('focus');

        return (
            <div className="flex flex-col items-center justify-center h-full relative bg-zinc-50 dark:bg-zinc-900/50">
                <div className="relative">
                    <button 
                      onClick={() => setIsOpen(!isOpen)}
                      className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
                    >
                      {isInteractive ? "Edit Profile" : "View Info"}
                    </button>
                    {isOpen && (
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-4 z-20 animate-zoom-in origin-top">
                            {hasArrow && <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-zinc-900 border-t border-l border-zinc-200 dark:border-zinc-800 rotate-45"></div>}
                            {isInteractive ? (
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-zinc-500 uppercase">Edit Details</h4>
                                    <input autoFocus={hasFocus} className="w-full text-sm border rounded p-1.5 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100" placeholder="Username" />
                                    <input className="w-full text-sm border rounded p-1.5 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100" placeholder="Email" />
                                </div>
                            ) : (
                                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                                    This is a read-only popover with helpful information.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
  },

  tooltip: {
    title: "Tooltip",
    definition: "Hover-triggered info text.",
    vibeTip: "No links inside tooltips.",
    comparison: "Tooltip vanishes on move.",
    prompt: { 
        base: "Add a Tooltip", 
        options: [
            { id: "right", label: "Right Side", text: " positioned to the right" },
            { id: "arrow", label: "Arrow", text: " with a directional arrow" },
            { id: "dark", label: "Dark Mode", text: " styled with dark contrast" },
            { id: "delay", label: "Delay", text: " with a subtle delay" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const isRight = activeOptions.has('right');
        const hasArrow = activeOptions.has('arrow');
        const isDark = activeOptions.has('dark');
        const hasDelay = activeOptions.has('delay');

        const posClass = isRight ? "left-full top-1/2 -translate-y-1/2 ml-2" : "bottom-full left-1/2 -translate-x-1/2 mb-2";
        
        return (
            <div className="flex flex-col items-center justify-center h-full bg-zinc-50 dark:bg-zinc-900/50">
                <div className="group relative">
                    <button className="p-3 bg-white rounded-lg shadow-sm border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
                        <Info size={20} className="text-zinc-500" />
                    </button>
                    <div className={`absolute ${posClass} px-2 py-1 text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 ${hasDelay ? 'duration-500 delay-150' : 'duration-200'} ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900 border border-zinc-200'}`}>
                        Helper Text
                        {hasArrow && <div className={`absolute w-2 h-2 rotate-45 ${isDark ? 'bg-zinc-900' : 'bg-white border-l border-t border-zinc-200'} ${isRight ? 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r-0 border-b-0' : 'top-full left-1/2 -translate-x-1/2 -mt-1 border-r-0 border-b-0'}`}></div>}
                    </div>
                </div>
                <div className="mt-4 text-xs text-zinc-400">Hover icon to see tooltip</div>
            </div>
        )
    }
  },

  toast: {
    title: "Toast",
    definition: "Temporary feedback message.",
    vibeTip: "Use Toaster provider.",
    comparison: "Toast floats.",
    prompt: { 
        base: "Implement Toast", 
        options: [
            { id: "stacked", label: "Stacked", text: " that stacks vertically" },
            { id: "action", label: "Action", text: " with an undo action button" },
            { id: "error", label: "Error Type", text: " styled as an error alert" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const [toasts, setToasts] = useState([]);
        const isStacked = activeOptions.has('stacked');
        const hasAction = activeOptions.has('action');
        const isError = activeOptions.has('error');

        const addToast = () => {
            const id = Date.now();
            setToasts(prev => isStacked ? [...prev, id] : [id]);
            setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
        };

        return (
            <div className="flex flex-col items-center justify-center h-full relative overflow-hidden bg-zinc-50 dark:bg-zinc-900/50">
                <button onClick={addToast} className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm active:scale-95 hover:bg-indigo-700">Trigger Toast</button>
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 pointer-events-none z-50">
                    {toasts.map((id, i) => (
                        <div key={id} className={`p-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in-right ${isError ? 'bg-red-50 text-red-900 border border-red-200' : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100'}`} style={{ marginBottom: isStacked ? 0 : undefined }}>
                            {isError ? <AlertTriangle size={16} className="text-red-500" /> : <Check size={16} className="text-green-500" />}
                            <div className="text-sm font-medium">
                                {isError ? "Connection Failed" : "Changes Saved"}
                            </div>
                            {hasAction && <button className="ml-4 text-xs font-bold underline cursor-pointer pointer-events-auto">Undo</button>}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
  },

  // --- INPUTS ---
  select: {
    title: "Select vs. Combobox",
    definition: "Select: Simple dropdown. Combobox: Searchable list.",
    vibeTip: "List > 10 items? Use Combobox/Command Palette.",
    comparison: "Select is for picking. Popover is for housing UI.",
    prompt: {
      base: "Add a form Select component",
      options: [
        { id: "combobox", label: "Searchable", text: ", upgrading it to a Combobox for filtering" },
        { id: "multi", label: "Multi-Select", text: " allowing multiple item selection with chips" },
        { id: "avatars", label: "Rich Items", text: " displaying avatars next to options" }
      ]
    },
    demo: ({ activeOptions }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [selected, setSelected] = useState(['Framework']);
      const isCombobox = activeOptions.has('combobox');
      const isMulti = activeOptions.has('multi');
      const hasAvatars = activeOptions.has('avatars');

      const toggleSelection = (item) => {
        if (isMulti) {
          if (selected.includes(item)) {
            setSelected(selected.filter(i => i !== item));
          } else {
            if (selected.includes('Framework')) {
                setSelected([item]);
            } else {
                setSelected([...selected, item]);
            }
          }
        } else {
          setSelected([item]);
          setIsOpen(false);
        }
      };

      const displayValue = isMulti 
        ? (selected.includes('Framework') ? 'Select Frameworks...' : `${selected.length} selected`) 
        : selected[0];

      return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
          <div className="w-64 relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex justify-between items-center px-4 py-2.5 border rounded-lg bg-white dark:bg-zinc-900 dark:border-zinc-800 hover:border-zinc-400 transition-all shadow-sm text-left group"
            >
              {isMulti && !selected.includes('Framework') ? (
                 <div className="flex gap-1 overflow-hidden">
                    {selected.map(s => (
                        <span key={s} className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs whitespace-nowrap text-zinc-900 dark:text-zinc-200">{s}</span>
                    ))}
                 </div>
              ) : (
                 <span className={`text-sm ${selected.includes('Framework') ? 'text-zinc-400' : 'text-zinc-900 dark:text-zinc-200'}`}>{displayValue}</span>
              )}
              <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} group-hover:text-zinc-600`} />
            </button>
            {isOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-lg z-20 overflow-hidden animate-slide-in-up origin-top">
                {isCombobox && (
                  <div className="p-2 border-b border-zinc-100 dark:border-zinc-800">
                     <div className="flex items-center px-2 py-1.5 bg-zinc-50 dark:bg-zinc-950 rounded-md border border-zinc-200 dark:border-zinc-800">
                       <Search size={14} className="text-zinc-400 mr-2" />
                       <input className="bg-transparent border-none outline-none text-xs w-full placeholder:text-zinc-400 text-zinc-700 dark:text-zinc-200" placeholder="Search..." autoFocus />
                     </div>
                  </div>
                )}
                <div className="max-h-48 overflow-y-auto p-1">
                  {['React', 'Vue', 'Svelte', 'Solid', 'Angular'].map((fw, i) => (
                    <div 
                      key={fw} 
                      onClick={() => toggleSelection(fw)}
                      className={`px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md cursor-pointer text-sm text-zinc-700 dark:text-zinc-200 flex items-center justify-between transition-colors ${selected.includes(fw) ? 'bg-zinc-50 dark:bg-zinc-800/50' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                         {hasAvatars && <div className={`w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[8px] text-indigo-700 dark:text-indigo-300 font-bold border border-zinc-200 dark:border-zinc-700`}>{fw[0]}</div>}
                         <span>{fw}</span>
                      </div>
                      {selected.includes(fw) && <Check size={14} className="text-indigo-600 animate-zoom-in" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  },

  otp: {
    title: "OTP Input",
    definition: "Segmented code input.",
    vibeTip: "Request auto-focus.",
    comparison: "Vs Text Field.",
    prompt: { 
        base: "Insert OTP Group", 
        options: [
            { id: "mask", label: "Masked", text: " with masked/password characters" },
            { id: "sep", label: "Separator", text: " including a separator dash" },
            { id: "focus", label: "Auto-Focus", text: " that auto-advances focus" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const isMasked = activeOptions.has('mask');
        const hasSep = activeOptions.has('sep');
        const [focusIdx, setFocusIdx] = useState(0);

        useEffect(() => {
            const t = setInterval(() => {
                setFocusIdx(prev => (prev + 1) % 4);
            }, 1000);
            return () => clearInterval(t);
        }, []);

        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-2">
                    {[0, 1, 2, 3].map(i => (
                        <React.Fragment key={i}>
                            <div className={`w-12 h-14 border-2 rounded-md flex items-center justify-center text-xl font-mono transition-all ${i === focusIdx ? 'border-indigo-500 ring-2 ring-indigo-500/20 z-10' : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white'}`}>
                                {i < focusIdx ? (isMasked ? '•' : Math.floor(Math.random()*9)) : (i === focusIdx ? <div className="w-0.5 h-6 bg-indigo-500 animate-pulse"/> : '')}
                            </div>
                            {hasSep && i === 1 && <span className="text-zinc-400 font-bold">-</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        )
    }
  },

  switch: {
    title: "Switch",
    definition: "Immediate toggle.",
    vibeTip: "Settings only.",
    comparison: "State vs Data.",
    prompt: { 
        base: "Add Switch", 
        options: [
            { id: "icon", label: "Icon", text: " showing checked/x icons inside" },
            { id: "label", label: "Label", text: " paired with a descriptive label" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const [isOn, setIsOn] = useState(false);
        const hasIcon = activeOptions.has('icon');
        const hasLabel = activeOptions.has('label');

        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    {hasLabel && <span className="text-sm font-medium text-zinc-900 dark:text-white mr-4">Airplane Mode</span>}
                    <button 
                        onClick={() => setIsOn(!isOn)} 
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${isOn ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 flex items-center justify-center ${isOn ? 'translate-x-6' : 'translate-x-0'}`}>
                            {hasIcon && (isOn ? <Check size={10} className="text-indigo-600" /> : <X size={10} className="text-zinc-400" />)}
                        </div>
                    </button>
                </div>
            </div>
        )
    }
  },

  dropzone: {
    title: "Dropzone",
    definition: "Drag & Drop area.",
    vibeTip: "Active drag states.",
    comparison: "Better UX.",
    prompt: { 
        base: "Create Dropzone", 
        options: [
            { id: "drag", label: "Drag State", text: " with highlighted drag state" },
            { id: "preview", label: "File Preview", text: " showing uploaded file list" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const [isDrag, setIsDrag] = useState(false);
        const showPreview = activeOptions.has('preview');
        const simulateDrag = activeOptions.has('drag');

        useEffect(() => {
            if (simulateDrag) {
                const t = setInterval(() => setIsDrag(p => !p), 2000);
                return () => clearInterval(t);
            } else {
                setIsDrag(false);
            }
        }, [simulateDrag]);

        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-8">
                <div className={`w-full max-w-sm aspect-video border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${isDrag ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 scale-105 shadow-xl' : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900'}`}>
                    <Upload size={24} className={`mb-2 ${isDrag ? 'text-indigo-600 animate-bounce' : 'text-zinc-400'}`}/>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Drag files here</p>
                </div>
                {showPreview && (
                    <div className="mt-4 w-full max-w-sm bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 animate-slide-in-up">
                        <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded flex items-center justify-center"><FileText size={20} className="text-zinc-500"/></div>
                        <div className="flex-1 text-xs">
                            <div className="font-bold text-zinc-900 dark:text-zinc-100">report.pdf</div>
                            <div className="text-zinc-500">1.2MB</div>
                        </div>
                        <Check size={16} className="text-green-500"/>
                    </div>
                )}
            </div>
        )
    }
  },

  sidebar: {
    title: "Sidebar",
    definition: "Full nav panel.",
    vibeTip: "Collapsible.",
    comparison: "Vs Rail.",
    prompt: { 
        base: "Build Sidebar", 
        options: [
            { id: "rail", label: "Collapsed Rail", text: " that collapses to icons" },
            { id: "user", label: "User Footer", text: " with user profile at bottom" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const isRail = activeOptions.has('rail');
        const hasUser = activeOptions.has('user');
        
        return (
            <div className="flex items-center justify-center h-full w-full bg-zinc-200 dark:bg-black p-4">
                <div className={`bg-white dark:bg-zinc-900 h-64 shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 flex flex-col ${isRail ? 'w-16' : 'w-48'} rounded-lg overflow-hidden`}>
                    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                        <div className="w-6 h-6 bg-indigo-600 rounded shrink-0"></div>
                        <span className={`font-bold transition-opacity text-zinc-900 dark:text-white ${isRail ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>Acme</span>
                    </div>
                    <div className="flex-1 p-2 space-y-1">
                        {[Home, Users, Settings].map((I, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-pointer text-zinc-600 dark:text-zinc-400">
                                <I size={18} />
                                <span className={`text-sm transition-opacity ${isRail ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>Item {i+1}</span>
                            </div>
                        ))}
                    </div>
                    {hasUser && (
                        <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full shrink-0"></div>
                            <div className={`text-xs transition-opacity ${isRail ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                                <div className="font-bold text-zinc-900 dark:text-white">Jane</div>
                                <div className="text-zinc-400">Admin</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
  },

  card: {
    title: "Card",
    definition: "Content container.",
    vibeTip: "Header/Content/Footer slots.",
    comparison: "Vs Tile.",
    prompt: { 
        base: "Create Card", 
        options: [
            { id: "image", label: "Cover Image", text: " with a top cover image" },
            { id: "hover", label: "Hover Lift", text: " that lifts on hover" },
            { id: "footer", label: "Footer Actions", text: " including action buttons" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const hasImage = activeOptions.has('image');
        const hasHover = activeOptions.has('hover');
        const hasFooter = activeOptions.has('footer');

        return (
            <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
                <div className={`w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 ${hasHover ? 'hover:-translate-y-2 hover:shadow-xl' : 'shadow-md'}`}>
                    {hasImage && <div className="h-32 bg-zinc-200 dark:bg-zinc-800 w-full animate-pulse"></div>}
                    <div className="p-4 space-y-3">
                        <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                        <div className="space-y-2">
                            <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                            <div className="h-2 w-5/6 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                        </div>
                    </div>
                    {hasFooter && (
                        <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                            <button className="text-xs bg-zinc-900 text-white px-3 py-1 rounded dark:bg-white dark:text-zinc-900 hover:opacity-90">View</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
  },

  masonry: {
    title: "Masonry",
    definition: "Optimal packing.",
    vibeTip: "Avoid vertical gaps.",
    comparison: "Vs Grid.",
    prompt: { 
        base: "Implement Masonry", 
        options: [
            { id: "anim", label: "Staggered", text: " with staggered entrance animations" },
            { id: "gap", label: "Gapless", text: " with minimal gap spacing" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const isAnim = activeOptions.has('anim');
        const isGapless = activeOptions.has('gap');
        return (
            <div className="h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-6 overflow-hidden flex items-center justify-center">
                <div className={`columns-3 ${isGapless ? 'gap-1' : 'gap-4'} w-64`}>
                    {[12, 24, 16, 32, 20, 28].map((h, i) => (
                        <div 
                            key={i} 
                            className={`w-full h-${h} bg-zinc-300 dark:bg-zinc-700 rounded-lg mb-2 break-inside-avoid ${isAnim ? 'animate-slide-in-up' : ''}`}
                            style={{ animationDelay: `${i * 100}ms` }}
                        ></div>
                    ))}
                </div>
            </div>
        )
    }
  },

  tabs: {
    title: "Tabs",
    definition: "Views navigation.",
    vibeTip: "Vs Segments.",
    comparison: "Page vs Component.",
    prompt: { 
        base: "Add Tabs", 
        options: [
            { id: "pills", label: "Pills", text: " styled as floating pills" },
            { id: "underline", label: "Underline", text: " with an animated underline" },
            { id: "icons", label: "Icons", text: " using icons only" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const [active, setActive] = useState(0);
        const isPills = activeOptions.has('pills');
        const isUnderline = activeOptions.has('underline');
        const isIcons = activeOptions.has('icons');

        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
                <div className={`flex ${isPills ? 'bg-zinc-200 dark:bg-zinc-800 p-1 rounded-full' : 'border-b border-zinc-200 dark:border-zinc-700 gap-4'}`}>
                    {[0, 1, 2].map(i => (
                        <button 
                            key={i}
                            onClick={() => setActive(i)}
                            className={`px-4 py-2 text-sm relative transition-all ${isPills ? (active === i ? 'text-zinc-900 bg-white shadow rounded-full' : 'text-zinc-500') : (active === i ? 'text-indigo-600 font-bold dark:text-indigo-400' : 'text-zinc-500')}`}
                        >
                            {isIcons ? <User size={16}/> : `Tab ${i+1}`}
                            {isUnderline && active === i && !isPills && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 animate-zoom-in"/>}
                        </button>
                    ))}
                </div>
                <div className="mt-8 p-4 border border-dashed border-zinc-300 dark:border-zinc-700 rounded w-48 h-24 flex items-center justify-center text-zinc-400 text-xs">Content {active + 1}</div>
            </div>
        )
    }
  },

  breadcrumbs: {
    title: "Breadcrumbs",
    definition: "Path hierarchy.",
    vibeTip: "Chevrons or Slashes.",
    comparison: "Location vs Process.",
    prompt: { 
        base: "Add Breadcrumbs", 
        options: [
            { id: "slash", label: "Slashes", text: " using slashes as separators" },
            { id: "bg", label: "Background", text: " with a background container" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const isSlash = activeOptions.has('slash');
        const hasBg = activeOptions.has('bg');
        return (
            <div className="flex items-center justify-center h-full bg-zinc-50 dark:bg-zinc-900/50 w-full">
                <div className={`flex items-center gap-2 text-sm ${hasBg ? 'bg-white dark:bg-zinc-900 px-4 py-2 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800' : ''}`}>
                    <span className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer">Home</span>
                    <span className="text-zinc-300">{isSlash ? '/' : <ChevronRight size={14}/>}</span>
                    <span className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer">Settings</span>
                    <span className="text-zinc-300">{isSlash ? '/' : <ChevronRight size={14}/>}</span>
                    <span className="font-bold text-zinc-900 dark:text-white">Profile</span>
                </div>
            </div>
        )
    }
  },

  accordion: {
    title: "Accordion",
    definition: "Expandable list.",
    vibeTip: "Single or Multi open.",
    comparison: "FAQ style.",
    prompt: { 
        base: "Create Accordion", 
        options: [
            { id: "multi", label: "Allow Multi", text: " allowing multiple open items" },
            { id: "border", label: "Bordered", text: " with borders between items" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const [openState, setOpenState] = useState({0: true});
        const isMulti = activeOptions.has('multi');
        const isBorder = activeOptions.has('border');

        const toggle = (i) => {
            if (isMulti) {
                setOpenState(prev => ({...prev, [i]: !prev[i]}));
            } else {
                setOpenState(prev => ({...(!prev[i] ? {[i]: true} : {})}));
            }
        };

        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
                <div className={`w-64 bg-white dark:bg-zinc-900 rounded-lg overflow-hidden ${isBorder ? 'border border-zinc-200 dark:border-zinc-800' : 'shadow-sm'}`}>
                    {[0, 1, 2].map(i => (
                        <div key={i} className={`${isBorder && i > 0 ? 'border-t border-zinc-100 dark:border-zinc-800' : ''}`}>
                            <button onClick={() => toggle(i)} className="w-full flex justify-between p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                <span className="text-sm font-medium text-zinc-900 dark:text-white">Question {i+1}?</span>
                                <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-200 ${openState[i] ? 'rotate-180' : ''}`}/>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openState[i] ? 'max-h-20 p-3 pt-0 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-xs text-zinc-500">This is the expandable content area with details.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
  },

  alert: {
    title: "Alert",
    definition: "Static message.",
    vibeTip: "Destructive/Info.",
    comparison: "Persistent.",
    prompt: { 
        base: "Insert Alert", 
        options: [
            { id: "error", label: "Error", text: " styled as destructive error" },
            { id: "accent", label: "Accent", text: " with a colored left accent border" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const isError = activeOptions.has('error');
        const hasAccent = activeOptions.has('accent');
        return (
            <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
                <div className={`w-72 p-4 rounded-md flex gap-3 shadow-sm ${isError ? 'bg-red-50 text-red-900 border-red-100' : 'bg-blue-50 text-blue-900 border-blue-100'} ${hasAccent ? (isError ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-blue-500') : 'border'}`}>
                    {isError ? <AlertTriangle size={20} className="shrink-0"/> : <Info size={20} className="shrink-0"/>}
                    <div>
                        <h4 className="font-bold text-sm">{isError ? "Critical Error" : "Note"}</h4>
                        <p className="text-xs opacity-80 mt-1">Something needs your attention immediately.</p>
                    </div>
                </div>
            </div>
        )
    }
  },

  empty: {
    title: "Empty State",
    definition: "Missing data placeholder.",
    vibeTip: "Needs CTA.",
    comparison: "Better than blank.",
    prompt: { 
        base: "Design Empty State", 
        options: [
            { id: "ghost", label: "Ghost", text: " using a large ghost icon" },
            { id: "dashed", label: "Dashed Box", text: " inside a dashed container" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const isGhost = activeOptions.has('ghost');
        const isDashed = activeOptions.has('dashed');
        return (
            <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-8">
                <div className={`flex flex-col items-center text-center p-8 rounded-xl ${isDashed ? 'border-2 border-dashed border-zinc-300 dark:border-zinc-700 w-full' : ''}`}>
                    <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                        {isGhost ? <Ghost size={32} className="text-zinc-400"/> : <Search size={32} className="text-zinc-400"/>}
                    </div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">No Results</h3>
                    <p className="text-xs text-zinc-500 mt-1 mb-4">Try adjusting your filters.</p>
                    <button className="px-4 py-2 bg-zinc-900 text-white text-sm rounded-md dark:bg-white dark:text-zinc-900 hover:opacity-90">Clear All</button>
                </div>
            </div>
        )
    }
  },

  badge: {
    title: "Badge",
    definition: "Notification count.",
    vibeTip: "Vs Chip.",
    comparison: "Status indicator.",
    prompt: { 
        base: "Add Badge", 
        options: [
            { id: "ping", label: "Ping", text: " with a pulsating animation" },
            { id: "dot", label: "Dot Only", text: " showing only a small dot" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const isPing = activeOptions.has('ping');
        const isDot = activeOptions.has('dot');
        return (
            <div className="flex flex-col items-center justify-center h-full gap-8 bg-zinc-50 dark:bg-zinc-900/50 w-full">
                <div className="relative p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700">
                    <Bell size={24} className="text-zinc-600 dark:text-zinc-400"/>
                    <span className={`absolute -top-1 -right-1 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center text-xs text-white font-bold ${isDot ? 'w-3 h-3' : 'w-5 h-5'}`}>
                        {!isDot && "3"}
                        {isPing && <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>}
                    </span>
                </div>
            </div>
        )
    }
  },

  avatars: {
    title: "Avatar Group",
    definition: "Stacked profile images.",
    vibeTip: "Limit count.",
    comparison: "Space saving.",
    prompt: { 
        base: "Create Avatar Group", 
        options: [
            { id: "overlap", label: "Heavy Overlap", text: " with significant negative margin" },
            { id: "ring", label: "Rings", text: " with thick border rings" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const isOverlap = activeOptions.has('overlap');
        const isRing = activeOptions.has('ring');
        return (
            <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
                <div className={`flex ${isOverlap ? '-space-x-4' : '-space-x-2'}`}>
                    {[1,2,3].map(i => (
                        <div key={i} className={`w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-600 ${isRing ? 'ring-4 ring-white dark:ring-zinc-900' : 'border-2 border-white dark:border-zinc-900'}`}>
                            U{i}
                        </div>
                    ))}
                    <div className={`w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500 ${isRing ? 'ring-4 ring-white dark:ring-zinc-900' : 'border-2 border-white dark:border-zinc-900'}`}>+5</div>
                </div>
            </div>
        )
    }
  },

  timeline: {
    title: "Timeline",
    definition: "Event list.",
    vibeTip: "Connectors.",
    comparison: "Read-only.",
    prompt: { 
        base: "Build Timeline", 
        options: [
            { id: "hollow", label: "Hollow Dots", text: " using hollow step indicators" },
            { id: "pulse", label: "Active Pulse", text: " pulsing the current step" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const isHollow = activeOptions.has('hollow');
        const isPulse = activeOptions.has('pulse');
        return (
            <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-8">
                <div className="space-y-0">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full border-2 transition-all ${i === 1 ? 'border-indigo-600 bg-indigo-600' : 'border-zinc-300 dark:border-zinc-700'} ${isHollow && i===1 ? 'bg-white dark:bg-black' : ''} ${isPulse && i===1 ? 'animate-ping' : ''}`}></div>
                                {i !== 3 && <div className="w-0.5 h-8 bg-zinc-200 dark:bg-zinc-700"></div>}
                            </div>
                            <div className="pb-6">
                                <div className="text-xs font-bold text-zinc-900 dark:text-white">Step {i}</div>
                                <div className="text-xs text-zinc-500">Details here</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
  },

  skeleton: {
    title: "Skeleton",
    definition: "Loading placeholder.",
    vibeTip: "Prevent CLS.",
    comparison: "Vs Spinner.",
    prompt: { 
        base: "Use Skeleton", 
        options: [
            { id: "shimmer", label: "Shimmer", text: " with a moving shimmer gradient" },
            { id: "circle", label: "Avatar", text: " including a circular avatar placeholder" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const isShimmer = activeOptions.has('shimmer');
        const hasCircle = activeOptions.has('circle');
        const animClass = isShimmer ? 'animate-shimmer' : 'animate-pulse bg-zinc-200 dark:bg-zinc-800';
        return (
            <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
                <div className="w-64 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-4">
                    <div className="flex gap-3">
                        {hasCircle && <div className={`w-10 h-10 rounded-full shrink-0 ${animClass}`}></div>}
                        <div className="space-y-2 w-full">
                            <div className={`h-3 w-3/4 rounded ${animClass}`}></div>
                            <div className={`h-3 w-1/2 rounded ${animClass}`}></div>
                        </div>
                    </div>
                    <div className={`h-24 w-full rounded ${animClass}`}></div>
                </div>
            </div>
        )
    }
  },

  progress: {
    title: "Progress",
    definition: "Completion status.",
    vibeTip: "Determinate.",
    comparison: "Read-only.",
    prompt: { 
        base: "Display Progress", 
        options: [
            { id: "stripe", label: "Striped", text: " with a diagonal stripe pattern" },
            { id: "label", label: "Outside Label", text: " showing percentage text outside" }
        ] 
    },
    demo: ({ activeOptions }) => {
        const isStripe = activeOptions.has('stripe');
        const hasLabel = activeOptions.has('label');
        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-8">
                <div className="w-64 space-y-1">
                    {hasLabel && <div className="flex justify-between text-xs font-bold text-zinc-500"><span>Loading</span><span>60%</span></div>}
                    <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                            className={`h-full bg-indigo-600 w-[60%] rounded-full ${isStripe ? 'bg-[linear-gradient(45deg,rgba(255,255,255,0.15)25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)50%,rgba(255,255,255,0.15)75%,transparent_75%,transparent)] bg-[length:1rem_1rem]' : ''}`}
                        ></div>
                    </div>
                </div>
            </div>
        )
    }
  },

  radio: {
    title: "Radio Group",
    definition: "Single selection from list.",
    vibeTip: "Use for < 5 items. If more, use Select.",
    comparison: "Exclusive (OR) vs Checkbox (AND).",
    prompt: { 
      base: "Implement a Radio Group", 
      options: [
        { id: "cards", label: "Cards", text: " styled as selectable cards" },
        { id: "desc", label: "Description", text: " with helper descriptions" },
      ] 
    },
    demo: ({ activeOptions }) => {
      const [selected, setSelected] = useState(0);
      const isCards = activeOptions.has('cards');
      const hasDesc = activeOptions.has('desc');

      return (
        <div className="flex flex-col justify-center items-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
           <div className="space-y-3 w-64">
              {[0, 1].map(i => (
                 <div 
                    key={i} 
                    onClick={() => setSelected(i)} 
                    className={`
                        flex items-start cursor-pointer transition-all duration-200
                        ${isCards 
                            ? `p-3 border rounded-lg ${selected === i ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'}` 
                            : 'p-1'
                        }
                    `}
                 >
                    <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${selected === i ? 'border-indigo-600' : 'border-zinc-400'}`}>
                       {selected === i && <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>}
                    </div>
                    <div className="ml-3">
                        <div className={`text-sm font-medium ${selected === i && isCards ? 'text-indigo-900 dark:text-indigo-100' : 'text-zinc-900 dark:text-zinc-100'}`}>Option {i+1}</div>
                        {hasDesc && <div className="text-xs text-zinc-500 mt-0.5">This is a helpful description.</div>}
                    </div>
                 </div>
              ))}
           </div>
        </div>
      );
    }
  },

  slider: {
    title: "Slider",
    definition: "Range selection input.",
    vibeTip: "Dual handles for 'Range Slider'.",
    comparison: "Vs Progress Bar.",
    prompt: { 
        base: "Add a Slider input", 
        options: [
            { id: "dual", label: "Dual Handles", text: " with dual handles for range selection" },
            { id: "tooltip", label: "Tooltip", text: " showing current value on hover" }
        ] 
    },
    demo: ({ activeOptions }) => {
      const [val, setVal] = useState(50);
      const isDual = activeOptions.has('dual');
      const hasTooltip = activeOptions.has('tooltip');

      return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-8">
           <div className="w-64 space-y-4">
              <div className="flex justify-between text-xs font-medium text-zinc-500">
                 <span>{isDual ? '20' : '0'}</span>
                 <span>{val}</span>
                 {isDual && <span>80</span>}
              </div>
              <div className="relative h-6 flex items-center group">
                  <div className="absolute w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                  <div className="absolute h-1 bg-indigo-600 rounded-full" style={{ width: `${val}%`, left: '0%' }}></div>
                  <input 
                    type="range" 
                    value={val} 
                    onChange={(e) => setVal(e.target.value)}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div 
                    className="absolute w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow transition-transform active:scale-110 pointer-events-none" 
                    style={{ left: `calc(${val}% - 8px)` }}
                  >
                      {hasTooltip && <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{val}%</div>}
                  </div>
                  {isDual && (
                      <div className="absolute w-4 h-4 bg-white border-2 border-zinc-300 rounded-full shadow pointer-events-none" style={{ left: '20%' }}></div>
                  )}
              </div>
           </div>
        </div>
      );
    }
  }
};

export default function VibeCodingGlossary() {
  const [activeItem, setActiveItem] = useState('modal');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [infoOpen, setInfoOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(true); 
  const [activeFilter, setActiveFilter] = useState(null);
  const [toasts, setToasts] = useState([]);
  
  // New: State for the prompt builder
  const [activeOptions, setActiveOptions] = useState(new Set());
  const searchInputRef = useRef(null);

  // Command+K Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addGlobalToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  // Reset options when switching items
  useEffect(() => {
    setActiveOptions(new Set());
  }, [activeItem]);

  const toggleOption = (id) => {
    const next = new Set(activeOptions);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setActiveOptions(next);
  };

  const currentData = GLOSSARY_DATA[activeItem] || GLOSSARY_DATA['modal'];
  const DemoComponent = currentData.demo;

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const filteredCategories = useMemo(() => {
    let cats = CATEGORIES;
    
    // Filter by Top Nav Tabs
    if (activeFilter) {
      cats = cats.filter(cat => cat.type === activeFilter || cat.name === activeFilter);
    }

    if (!searchTerm) return cats;

    // Filter by Search Term
    return cats.map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(cat => cat.items.length > 0);
  }, [searchTerm, activeFilter]);

  return (
    <div className={`flex h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <style>{ANIMATION_STYLES}</style>
      
      {/* Top Navigation */}
      <TopNav 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onGetStarted={() => addGlobalToast("Welcome to Vibe Glossary!")}
      />

      {/* Global Toast Container */}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="bg-zinc-900 text-white px-4 py-2 rounded-md shadow-lg animate-slide-in-right text-sm">
            {t.message}
          </div>
        ))}
      </div>

      <div className="flex w-full pt-14 h-full">
        {/* Main Sidebar Navigation */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 bg-zinc-50 dark:bg-zinc-900/50 border-r border-zinc-200 dark:border-zinc-800 
          transform transition-all duration-300 ease-in-out flex flex-col pt-14 lg:pt-0
          ${mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${sidebarOpen ? 'lg:w-64' : 'lg:w-0 lg:overflow-hidden lg:border-r-0'}
        `}>
          <div className="w-64 h-full flex flex-col">
              
              {/* Sidebar Header (Docking) */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Navigation</span>
                <button onClick={() => setSidebarOpen(false)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" title="Collapse Sidebar">
                  <SidebarClose size={16} />
                </button>
              </div>

              {/* Search */}
              <div className="px-3 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                 <div className="relative group">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                      ref={searchInputRef}
                      type="text" 
                      placeholder="Search..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-md outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 transition-all"
                    />
                 </div>
              </div>

              <nav className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                {filteredCategories.map(cat => (
                  <div key={cat.id}>
                    <div className="flex items-center space-x-2 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 px-2">
                      {cat.icon}
                      <span>{cat.name}</span>
                    </div>
                    <ul className="space-y-1">
                      {cat.items.map(item => (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              setActiveItem(item.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                              activeItem === item.id 
                                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' 
                                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200'
                            }`}
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {filteredCategories.length === 0 && (
                   <div className="p-4 text-center text-xs text-zinc-400">No components found.</div>
                )}
              </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden relative bg-zinc-100 dark:bg-black">
          
          {/* Floating View Controls (When panels are closed) */}
          <div className="absolute top-4 left-4 z-30 flex gap-2">
            {!sidebarOpen && (
                 <button onClick={() => setSidebarOpen(true)} className="p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-md shadow-sm hover:bg-white dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400" title="Open Sidebar">
                    <SidebarOpen size={18} />
                 </button>
            )}
             {!infoOpen && (
                 <button onClick={() => setInfoOpen(true)} className="p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-md shadow-sm hover:bg-white dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400" title="Open Definition">
                    <BookOpen size={18} />
                 </button>
            )}
          </div>

          {/* Left Column: Info & Prompt Builder */}
          <div className={`
            border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-y-auto z-10 shadow-lg lg:shadow-none flex flex-col transition-all duration-300 ease-in-out
            ${infoOpen ? 'lg:w-96' : 'lg:w-0 lg:overflow-hidden lg:border-r-0'}
          `}>
            <div className="w-full lg:w-96 min-w-[20rem] p-6 flex flex-col min-h-full">
               
               {/* Definition Header */}
               <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">Definition</span>
                    <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1">
                        {currentData.title}
                    </h1>
                  </div>
                  <button onClick={() => setInfoOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200" title="Close Definition">
                    <PanelLeftClose size={18} />
                  </button>
               </div>

               <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-snug font-medium mb-8">
                  {currentData.definition}
               </p>

               {/* Prompt Builder */}
               <div className="mb-8">
                  <PromptBuilder 
                    data={currentData} 
                    activeOptions={activeOptions}   
                    onOptionToggle={toggleOption} 
                  />
               </div>

               <div className="space-y-4 mt-auto">
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-3 border border-zinc-100 dark:border-zinc-800">
                     <div className="flex items-center gap-2 mb-1.5 text-zinc-500 dark:text-zinc-400">
                        <MessageSquare size={12} />
                        <span className="text-xs font-bold uppercase">Pro Tip</span>
                     </div>
                     <p className="text-xs text-zinc-700 dark:text-zinc-300 italic">
                        "{currentData.vibeTip}"
                     </p>
                  </div>

                  <div>
                     <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <ArrowRight size={10} /> Distinction
                     </h3>
                     <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {currentData.comparison}
                     </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Live Preview */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            <div className="absolute top-4 right-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-3 py-1 rounded-full shadow-sm z-20 flex items-center space-x-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide pointer-events-none">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
               <span>Live Preview</span>
            </div>

            {/* Content Area without Dots */}
            <div className="w-full h-full relative z-10 flex flex-col p-8">
              <DemoComponent activeOptions={activeOptions} />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}