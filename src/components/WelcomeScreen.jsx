import { useState, useEffect, useRef } from 'react';
import {
  Layers, MousePointer, Layout, Grip, MessageSquare, BarChart3, FormInput,
  MousePointerClick, Megaphone, ArrowRight, BookOpen,
  Compass, Palette, Lightbulb, Wrench, FileText, Database, KeyRound, Bot,
  GraduationCap, Sparkles, ChevronDown, Cable, Wind,
} from 'lucide-react';
import { BUILD_LITERACY_CLUSTERS } from '../data/buildLiteracy';
import { CATEGORIES } from '../data/categories';
import { ParticleField } from './ParticleField';

const CATEGORY_ITEM_COUNT = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.items.length]),
);

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
    id: 'layout',
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
  {
    id: 'motion',
    name: 'Motion',
    description: 'Easing, particles, stagger, parallax, reduced motion',
    icon: Wind,
    count: 14,
    color: 'from-lime-500 to-emerald-600',
    glow: 'shadow-lime-500/30',
    border: 'border-lime-500/30',
    firstItem: 'particlefield',
  },
];

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
  protocols: {
    icon: Cable,
    color: 'from-orange-500 to-red-600',
    glow: 'shadow-orange-500/30',
    border: 'border-orange-500/30',
    blurb: 'HTTP, DNS, SMTP, APIs. How computers actually talk.',
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

const HERO_WORDS = ['Master', 'the', 'art', 'of', 'making', 'an', 'AI', 'sing.'];

const FLOAT_CHIPS = [
  { label: 'Modal', className: 'top-[16%] left-[7%]', bob: '0s', dur: '5.1s' },
  { label: 'Table', className: 'top-[26%] right-[9%]', bob: '0.55s', dur: '4.5s' },
  { label: 'Hero', className: 'bottom-[24%] left-[11%]', bob: '1.1s', dur: '5.4s' },
  { label: 'Drawer', className: 'top-[14%] right-[22%]', bob: '0.25s', dur: '4.9s' },
  { label: 'Toast', className: 'bottom-[30%] right-[13%]', bob: '0.85s', dur: '5.7s' },
  { label: 'Tabs', className: 'top-[44%] left-[5%]', bob: '1.35s', dur: '4.7s' },
];

function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}

function useRevealOnScroll(scrollerRef) {
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return undefined;
    const nodes = root.querySelectorAll('[data-reveal]');
    const reduce = prefersReducedMotion();
    if (reduce || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-in');
        });
      },
      { root, threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [scrollerRef]);
}


function useCardScroll(scrollerRef) {
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return undefined;
    if (prefersReducedMotion()) return undefined;
    let raf = 0;
    const tick = () => {
      const cards = root.querySelectorAll('[data-scroll-card]');
      const vh = root.clientHeight || 1;
      const mid = vh * 0.55;
      const rootR = root.getBoundingClientRect();
      cards.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const y = r.top - rootR.top + r.height / 2;
        const dist = (y - mid) / vh;
        const dir = i % 2 === 0 ? 1 : -1;
        const sy = Math.max(-36, Math.min(36, dist * 56));
        const rot = Math.max(-6, Math.min(6, dist * 5.5 * dir));
        const sc = 1 - Math.min(0.09, Math.abs(dist) * 0.14);
        el.style.setProperty('--sy', sy.toFixed(1) + 'px');
        el.style.setProperty('--rot', rot.toFixed(2) + 'deg');
        el.style.setProperty('--sc', sc.toFixed(3));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollerRef]);
}

function HeroHeadline() {
  return (
    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-2xl max-w-3xl leading-tight">
      {HERO_WORDS.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={"vg-word mr-[0.28em] last:mr-0 " + (word === "sing." ? "text-violet-400" : "")}
          style={{ animationDelay: `${i * 55}ms` }}
        >
          <span style={{ animationDelay: `${i * 55}ms` }}>{word}</span>
        </span>
      ))}
    </h2>
  );
}

function CtaButtons({ onSelectCategory, onStartTour, onEnter, showOpen, footer }) {
  const browseLabel = footer ? 'Start with components' : 'Browse components';
  const tourLabel = footer ? 'Replay the tour' : 'Take the tour';
  return (
    <div className="flex items-center gap-3 flex-wrap justify-center">
      <button
        type="button"
        onClick={() => onSelectCategory(CATEGORY_CARDS[0].firstItem)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-base shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all"
      >
        <Sparkles size={18} />
        {browseLabel}
      </button>
      {onStartTour && (
        <button
          type="button"
          onClick={onStartTour}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white/90 font-semibold text-sm hover:bg-white/20 hover:text-white transition-all"
        >
          {tourLabel}
        </button>
      )}
      {showOpen && (
        <button
          type="button"
          onClick={onEnter}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 font-semibold text-sm hover:bg-white/10 hover:text-white transition-all"
        >
          Open full app
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

export default function WelcomeScreen({ onEnter, onSelectCategory, onSelectBuildTopic, onStartTour }) {
  const scrollerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  useRevealOnScroll(scrollerRef);
  useCardScroll(scrollerRef);

  const uiTotal = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
  const buildTotal = BUILD_LITERACY_CLUSTERS.reduce((sum, c) => sum + ((c.topics && c.topics.length) || 0), 0);

  const handleBuildClick = (cluster) => {
    const firstId = cluster.topics && cluster.topics[0] && cluster.topics[0].id;
    if (firstId && onSelectBuildTopic) onSelectBuildTopic(firstId);
    else if (onEnter) onEnter();
  };

  return (
    <div
      ref={scrollerRef}
      data-welcome-scroller
      data-hovered={hoveredCard || undefined}
      className="fixed inset-0 z-50 bg-zinc-950 overflow-y-auto"
    >
      <ParticleField scrollerRef={scrollerRef} />

      <section data-scene="hero" className="relative z-10 min-h-screen flex flex-col">
        <img
          src="/hero.png"
          alt=""
          aria-hidden="true"
          className="vg-hero-fallback absolute inset-0 w-full h-full object-cover motion-reduce:block"
          style={{ objectPosition: '50% 20%' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="vg-text-pool" />

        <div className="hidden xl:block absolute inset-0 pointer-events-none" aria-hidden="true">
          {FLOAT_CHIPS.map((chip) => (
            <span
              key={chip.label}
              className={`vg-bob absolute ${chip.className} px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-semibold tracking-wide backdrop-blur-sm`}
              style={{ '--bob': chip.bob, '--bob-d': chip.dur }}
            >
              {chip.label}
            </span>
          ))}
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
          <div className="flex items-center gap-3 mb-5">
            <img src="/logo.png" alt="VibeGlossary" className="w-12 h-12 rounded-xl shadow-lg object-cover" />
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-2xl">
              VibeGlossary
            </h1>
          </div>
          <HeroHeadline />
          <p className="mt-5 text-base md:text-lg text-white/75 font-medium max-w-2xl drop-shadow mb-7">
            Browse {uiTotal} UI components or learn {buildTotal} build-literacy topics, then copy AI prompts that actually work.
          </p>
          <CtaButtons onSelectCategory={onSelectCategory} onStartTour={onStartTour} />
          <div className="vg-scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40" aria-hidden="true">
            <ChevronDown size={28} />
          </div>
        </div>
      </section>

      <section className="relative z-10 vg-reveal px-6 py-20 text-center" data-reveal>
        <p className="text-2xl md:text-4xl font-black text-white mb-3">
          Not a component cheatsheet
        </p>
        <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto">
          The vocabulary that makes an AI build the right thing.
        </p>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto mt-4">
          You already know the feeling you want. These are the words that get you there.
        </p>
      </section>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-12 space-y-16">
        <section data-scene="components" className="vg-reveal" data-reveal>
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-widest mb-3">
              <BookOpen size={12} />
              UI Glossary
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Browse UI components</h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              {uiTotal} components across {CATEGORY_CARDS.length} categories. Each one ships a live demo, a definition and a copy-ready AI prompt.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => onSelectCategory(card.firstItem)}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  data-scroll-card
                  className={`vg-scroll-card group relative p-6 rounded-2xl border ${card.border} bg-zinc-900/60 backdrop-blur text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${card.glow}`}
                >
                  <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${card.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-zinc-600 bg-zinc-800 px-2 py-1 rounded-full">
                      {(CATEGORY_ITEM_COUNT[card.id] ?? card.count)} components
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-xl mb-1">{card.name}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{card.description}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    Explore <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section data-scene="literacy" className="vg-reveal" data-reveal>
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-3">
              <GraduationCap size={12} />
              Build Literacy
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Talk about building, not just buttons</h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              {buildTotal} topics across {BUILD_LITERACY_CLUSTERS.length} clusters. Web foundations, design language, product, engineering, data, protocols, auth. The words behind the components.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUILD_LITERACY_CLUSTERS.map((cluster) => {
              const visual = BUILD_CLUSTER_VISUALS[cluster.id] || BUILD_CLUSTER_VISUALS['web-foundations'];
              const Icon = visual.icon;
              const topicCount = (cluster.topics && cluster.topics.length) || 0;
              return (
                <button
                  key={cluster.id}
                  type="button"
                  onClick={() => handleBuildClick(cluster)}
                  onMouseEnter={() => setHoveredCard(`build-${cluster.id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  data-scroll-card
                  className={`vg-scroll-card group relative p-6 rounded-2xl border ${visual.border} bg-zinc-900/60 backdrop-blur text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${visual.glow}`}
                >
                  <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${visual.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${visual.color} shadow-lg`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-zinc-600 bg-zinc-800 px-2 py-1 rounded-full">
                      {topicCount} topics
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-xl mb-1">{cluster.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{visual.blurb || cluster.summary}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    Start learning <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
            <button
              type="button"
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
      </div>

      <section
        data-scene="cta"
        className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24"
      >
        <div className="vg-text-pool" />
        <h2 className="relative text-3xl md:text-5xl font-black text-white mb-4 max-w-3xl">
          Master the art of making an AI sing.
        </h2>
        <p className="relative text-white/70 max-w-xl mb-8">
          Browse {uiTotal} UI components or learn {buildTotal} build-literacy topics, then copy prompts that actually work.
        </p>
        <div className="relative">
          <CtaButtons
            onSelectCategory={onSelectCategory}
            onStartTour={onStartTour}
            onEnter={onEnter}
            showOpen
            footer
          />
        </div>
      </section>

      <p className="relative z-10 text-center text-xs text-zinc-600 pb-8">
        Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono text-xs">⌘K</kbd> anytime to search components
      </p>
    </div>
  );
}
