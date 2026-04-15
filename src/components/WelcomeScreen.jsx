import { useState } from 'react';
import { Layers, MousePointer, Layout, Grip, MessageSquare, BarChart3, FormInput, MousePointerClick, Megaphone, ArrowRight, BookOpen, Copy, Zap, X } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    id: 'overlays',
    name: 'Overlays',
    description: 'Modals, drawers, popovers, tooltips & toasts',
    icon: Layers,
    count: 5,
    color: 'from-violet-600 to-purple-700',
    glow: 'shadow-violet-500/30',
    border: 'border-violet-500/30',
    firstItem: 'modal',
  },
  {
    id: 'inputs',
    name: 'Inputs',
    description: 'Selects, OTP, switches, dropzones & sliders',
    icon: MousePointer,
    count: 6,
    color: 'from-cyan-500 to-sky-600',
    glow: 'shadow-cyan-500/30',
    border: 'border-cyan-500/30',
    firstItem: 'select',
  },
  {
    id: 'data',
    name: 'Data Display',
    description: 'Tables, lists, carousels, trees & stat cards',
    icon: BarChart3,
    count: 6,
    color: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-500/30',
    border: 'border-blue-500/30',
    firstItem: 'table',
  },
  {
    id: 'forms',
    name: 'Forms',
    description: 'Date pickers, command palette, tags & ratings',
    icon: FormInput,
    count: 6,
    color: 'from-purple-500 to-fuchsia-600',
    glow: 'shadow-purple-500/30',
    border: 'border-purple-500/30',
    firstItem: 'datepicker',
  },
  {
    id: 'layouts',
    name: 'Layouts',
    description: 'Sidebars, cards & masonry grids',
    icon: Layout,
    count: 3,
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/30',
    border: 'border-emerald-500/30',
    firstItem: 'sidebar',
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Tabs, breadcrumbs & accordions',
    icon: Grip,
    count: 3,
    color: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/30',
    border: 'border-amber-500/30',
    firstItem: 'tabs',
  },
  {
    id: 'interactions',
    name: 'Interactions',
    description: 'Context menus, drag & drop, lightbox & more',
    icon: MousePointerClick,
    count: 4,
    color: 'from-orange-500 to-red-600',
    glow: 'shadow-orange-500/30',
    border: 'border-orange-500/30',
    firstItem: 'contextmenu',
  },
  {
    id: 'feedback',
    name: 'Feedback',
    description: 'Alerts, badges, skeletons, timelines & more',
    icon: MessageSquare,
    count: 7,
    color: 'from-rose-500 to-pink-600',
    glow: 'shadow-rose-500/30',
    border: 'border-rose-500/30',
    firstItem: 'alert',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Hero sections, pricing, testimonials & FAQ',
    icon: Megaphone,
    count: 4,
    color: 'from-pink-500 to-rose-600',
    glow: 'shadow-pink-500/30',
    border: 'border-pink-500/30',
    firstItem: 'hero',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: BookOpen,
    title: 'Browse',
    description: 'Pick any UI component from the sidebar or category cards below.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    step: '02',
    icon: Zap,
    title: 'Configure',
    description: 'Toggle options in the Spec Generator to see live variants.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    step: '03',
    icon: Copy,
    title: 'Copy Prompt',
    description: 'Copy the generated AI prompt and paste it into your vibe coding tool.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
];

export default function WelcomeScreen({ onEnter, onSelectCategory }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 overflow-y-auto">
      {/* Hero */}
      <div className="relative h-80 md:h-[28rem] overflow-hidden">
        <img
          src="/hero.png"
          alt="VibeGlossary hero"
          className="w-full h-full object-cover" style={{ objectPosition: '50% 20%' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-zinc-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-zinc-950/60" />

        {/* Dismiss button */}
        <button
          onClick={onEnter}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur text-white/60 hover:text-white hover:bg-black/60 transition-colors"
          title="Skip intro"
        >
          <X size={18} />
        </button>

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="VibeGlossary" className="w-12 h-12 rounded-xl shadow-lg object-cover" />
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-2xl">
              VibeGlossary
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/80 font-medium max-w-xl drop-shadow">
            The UI vocabulary for vibe coders. Browse, configure, and generate AI prompts for any component.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">

        {/* How it works */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6 text-center">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, description, color, bg }) => (
              <div key={step} className={`relative p-5 rounded-2xl border ${bg} flex flex-col gap-3`}>
                <div className="flex items-center gap-3">
                  <span className={`text-3xl font-black ${color} opacity-40 leading-none`}>{step}</span>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="font-bold text-white text-lg">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Category cards */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6 text-center">Browse by category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORY_CARDS.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.firstItem)}
                  onMouseEnter={() => setHoveredCard(cat.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative p-6 rounded-2xl border ${cat.border} bg-zinc-900/60 backdrop-blur text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${cat.glow}`}
                >
                  {/* Color accent bar */}
                  <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${cat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.color} shadow-lg`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-zinc-600 bg-zinc-800 px-2 py-1 rounded-full">
                      {cat.count} components
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-xl mb-1">{cat.name}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{cat.description}</p>

                  <div className="flex items-center gap-1 text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    Explore <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}

            {/* Enter app card */}
            <button
              onClick={onEnter}
              className="group relative p-6 rounded-2xl border border-zinc-700/50 bg-zinc-900/30 text-left transition-all duration-300 hover:scale-[1.02] hover:border-zinc-500/50 flex flex-col justify-center items-center text-center gap-3"
            >
              <div className="p-3 rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
                <ArrowRight size={22} className="text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-bold text-zinc-300 group-hover:text-white transition-colors">Open Full App</p>
                <p className="text-xs text-zinc-600 mt-1">Use the sidebar to navigate</p>
              </div>
            </button>
          </div>
        </section>

        {/* Footer hint */}
        <p className="text-center text-xs text-zinc-600 pb-4">
          Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono text-[10px]">⌘K</kbd> anytime to search components
        </p>
      </div>
    </div>
  );
}
