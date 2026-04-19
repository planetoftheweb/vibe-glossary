import { useState } from 'react';
import {
  Layers, MousePointer, Layout, Grip, MessageSquare, BarChart3, FormInput,
  MousePointerClick, Megaphone, ArrowRight, BookOpen, Copy, Zap, X,
  Compass, Palette, Lightbulb, Wrench, FileText, Database, KeyRound, Bot,
  GraduationCap,
} from 'lucide-react';
import { BUILD_LITERACY_CLUSTERS } from '../data/buildLiteracy';

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

// Visual treatment for each Build Literacy cluster. Mirrors the UI category
// card pattern so both sections feel like first-class entry points.
const BUILD_CLUSTER_VISUALS = {
  'web-foundations': {
    icon: Compass,
    color: 'from-indigo-500 to-violet-600',
    glow: 'shadow-indigo-500/30',
    border: 'border-indigo-500/30',
    blurb: 'HTML, CSS, ARIA, the words you wish someone had explained.',
  },
  'design-language': {
    icon: Palette,
    color: 'from-pink-500 to-fuchsia-600',
    glow: 'shadow-pink-500/30',
    border: 'border-pink-500/30',
    blurb: 'Tokens, scales, variants. Talk about design like a designer.',
  },
  product: {
    icon: Lightbulb,
    color: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/30',
    border: 'border-amber-500/30',
    blurb: 'MVP, PRD, JTBD. Decide what to build before you build it.',
  },
  engineering: {
    icon: Wrench,
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/30',
    border: 'border-emerald-500/30',
    blurb: 'TDD, CI, code review. How code gets written and shipped.',
  },
  'spec-driven': {
    icon: FileText,
    color: 'from-cyan-500 to-sky-600',
    glow: 'shadow-cyan-500/30',
    border: 'border-cyan-500/30',
    blurb: 'OpenAPI, ADRs, RFCs. Specs that survive a single chat.',
  },
  data: {
    icon: Database,
    color: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-500/30',
    border: 'border-blue-500/30',
    blurb: 'CRUD, pagination, transactions. Information done right.',
  },
  auth: {
    icon: KeyRound,
    color: 'from-rose-500 to-pink-600',
    glow: 'shadow-rose-500/30',
    border: 'border-rose-500/30',
    blurb: 'OAuth, SSO, RBAC. Who is in and what can they do.',
  },
  'ai-literacy': {
    icon: Bot,
    color: 'from-purple-500 to-violet-700',
    glow: 'shadow-purple-500/30',
    border: 'border-purple-500/30',
    blurb: 'LLMs, tokens, agents, MCP. Talk to AI like you mean it.',
  },
};

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: BookOpen,
    title: 'Browse',
    description: 'Pick a UI component or a Build Literacy topic from the cards below.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    step: '02',
    icon: Zap,
    title: 'Read & explore',
    description: 'Plain-English definitions, examples, comparisons and quizzes when you want them.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    step: '03',
    icon: Copy,
    title: 'Copy a prompt',
    description: 'Grab a generic starter or a real example, paste it into your AI tool, ship.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
];

export default function WelcomeScreen({ onEnter, onSelectCategory, onSelectBuildTopic }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const uiTotal = CATEGORY_CARDS.reduce((sum, c) => sum + c.count, 0);
  const buildTotal = BUILD_LITERACY_CLUSTERS.reduce(
    (sum, c) => sum + (c.topics?.length || 0),
    0
  );

  const handleBuildClick = (cluster) => {
    const firstId = cluster.topics?.[0]?.id;
    if (firstId && onSelectBuildTopic) onSelectBuildTopic(firstId);
    else onEnter?.();
  };

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-zinc-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-zinc-950/60" />

        <button
          onClick={onEnter}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur text-white/60 hover:text-white hover:bg-black/60 transition-colors"
          title="Skip intro"
        >
          <X size={18} />
        </button>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="VibeGlossary" className="w-12 h-12 rounded-xl shadow-lg object-cover" />
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-2xl">
              VibeGlossary
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl drop-shadow">
            The vocabulary for vibe coders. Browse {uiTotal} UI components or learn {buildTotal} build-literacy
            topics, then copy AI prompts that actually work.
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

        {/* UI Glossary section */}
        <section>
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-widest mb-3">
              <BookOpen size={12} />
              UI Glossary
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Browse UI components</h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              {uiTotal} components across {CATEGORY_CARDS.length} categories. Each one ships a live demo,
              a definition and a copy-ready AI prompt.
            </p>
          </div>
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
          </div>
        </section>

        {/* Build Literacy section */}
        <section>
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-3">
              <GraduationCap size={12} />
              Build Literacy
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Talk about building, not just buttons</h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              {buildTotal} topics across {BUILD_LITERACY_CLUSTERS.length} clusters. Web foundations,
              design language, product, engineering, data, auth. The words behind the components.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUILD_LITERACY_CLUSTERS.map((cluster) => {
              const visual = BUILD_CLUSTER_VISUALS[cluster.id] || BUILD_CLUSTER_VISUALS['web-foundations'];
              const Icon = visual.icon;
              const count = cluster.topics?.length || 0;
              return (
                <button
                  key={cluster.id}
                  onClick={() => handleBuildClick(cluster)}
                  onMouseEnter={() => setHoveredCard(`build-${cluster.id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative p-6 rounded-2xl border ${visual.border} bg-zinc-900/60 backdrop-blur text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${visual.glow}`}
                >
                  <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${visual.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${visual.color} shadow-lg`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-zinc-600 bg-zinc-800 px-2 py-1 rounded-full">
                      {count} topics
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-xl mb-1">{cluster.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    {visual.blurb || cluster.summary}
                  </p>

                  <div className="flex items-center gap-1 text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    Start learning <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}

            {/* Enter app card spans the empty cell at the end of the BL grid */}
            <button
              onClick={onEnter}
              className="group relative p-6 rounded-2xl border border-zinc-700/50 bg-zinc-900/30 text-left transition-all duration-300 hover:scale-[1.02] hover:border-zinc-500/50 flex flex-col justify-center items-center text-center gap-3"
            >
              <div className="p-3 rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
                <ArrowRight size={22} className="text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-bold text-zinc-300 group-hover:text-white transition-colors">Open Full App</p>
                <p className="text-xs text-zinc-600 mt-1">Use the top nav to switch sections</p>
              </div>
            </button>
          </div>
        </section>

        {/* Footer hint */}
        <p className="text-center text-xs text-zinc-600 pb-4">
          Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono text-xs">⌘K</kbd> anytime to search components
        </p>
      </div>
    </div>
  );
}
