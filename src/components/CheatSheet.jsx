import { useEffect } from 'react';
import {
  Layers, MousePointer, Layout, Grip, MessageSquare, BarChart3, FormInput,
  MousePointerClick, Megaphone, X, ArrowRight, Keyboard,
  Compass, Palette, Lightbulb, Wrench, FileText, Database, KeyRound, Bot,
  BookOpen, GraduationCap,
} from 'lucide-react';
import { useCategories } from '../hooks/useCategories';
import { BUILD_LITERACY_CLUSTERS } from '../data/buildLiteracy';

const CATEGORY_META = {
  overlays:     { icon: Layers,             color: 'from-violet-600 to-purple-700',  border: 'border-violet-500/30',  glow: 'shadow-violet-500/20' },
  inputs:       { icon: MousePointer,       color: 'from-cyan-500 to-sky-600',       border: 'border-cyan-500/30',    glow: 'shadow-cyan-500/20' },
  data:         { icon: BarChart3,          color: 'from-blue-500 to-indigo-600',    border: 'border-blue-500/30',    glow: 'shadow-blue-500/20' },
  forms:        { icon: FormInput,          color: 'from-purple-500 to-fuchsia-600', border: 'border-purple-500/30',  glow: 'shadow-purple-500/20' },
  layout:       { icon: Layout,             color: 'from-emerald-500 to-teal-600',   border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  navigation:   { icon: Grip,               color: 'from-amber-500 to-orange-600',   border: 'border-amber-500/30',   glow: 'shadow-amber-500/20' },
  interactions: { icon: MousePointerClick,  color: 'from-orange-500 to-red-600',     border: 'border-orange-500/30',  glow: 'shadow-orange-500/20' },
  feedback:     { icon: MessageSquare,      color: 'from-rose-500 to-pink-600',      border: 'border-rose-500/30',    glow: 'shadow-rose-500/20' },
  marketing:    { icon: Megaphone,          color: 'from-pink-500 to-rose-600',      border: 'border-pink-500/30',    glow: 'shadow-pink-500/20' },
};

const BUILD_CLUSTER_META = {
  'web-foundations': { icon: Compass,  color: 'from-indigo-500 to-violet-600',  border: 'border-indigo-500/30', glow: 'shadow-indigo-500/20' },
  'design-language': { icon: Palette,  color: 'from-pink-500 to-fuchsia-600',   border: 'border-pink-500/30',   glow: 'shadow-pink-500/20' },
  product:           { icon: Lightbulb, color: 'from-amber-500 to-orange-600',   border: 'border-amber-500/30',  glow: 'shadow-amber-500/20' },
  engineering:       { icon: Wrench,   color: 'from-emerald-500 to-teal-600',   border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  'spec-driven':     { icon: FileText, color: 'from-cyan-500 to-sky-600',       border: 'border-cyan-500/30',   glow: 'shadow-cyan-500/20' },
  data:              { icon: Database, color: 'from-blue-500 to-indigo-600',    border: 'border-blue-500/30',   glow: 'shadow-blue-500/20' },
  auth:              { icon: KeyRound, color: 'from-rose-500 to-pink-600',      border: 'border-rose-500/30',   glow: 'shadow-rose-500/20' },
  'ai-literacy':     { icon: Bot,      color: 'from-purple-500 to-violet-700',  border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
};

const SHORTCUTS = [
  { keys: ['⌘', 'K'],   label: 'Open search' },
  { keys: ['⌘', '/'],   label: 'Toggle cheat sheet' },
  { keys: ['Esc'],      label: 'Close overlay' },
];

export default function CheatSheet({ isOpen, onClose, onSelectCategory, onSelectBuildTopic }) {
  const categories = useCategories();

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectCat = (catId) => {
    const cat = categories.find(c => c.id === catId);
    if (cat && cat.items[0]) {
      onSelectCategory(cat.items[0].id);
      onClose();
    }
  };

  const handleSelectCluster = (cluster) => {
    const firstId = cluster.topics?.[0]?.id;
    if (firstId && onSelectBuildTopic) {
      onSelectBuildTopic(firstId);
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8 animate-fade-in overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Cheat Sheet</h2>
            <p className="text-sm text-zinc-500 mt-0.5">Jump to any UI category, build literacy cluster, or review shortcuts</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* UI category cards */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={14} className="text-violet-400" />
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">UI Glossary categories</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map(cat => {
              const meta = CATEGORY_META[cat.id];
              if (!meta) return null;
              const Icon = meta.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCat(cat.id)}
                  className={`group relative p-4 rounded-xl border ${meta.border} bg-zinc-900/60 backdrop-blur text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${meta.glow}`}
                >
                  <div className={`absolute top-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r ${meta.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${meta.color} shadow-md`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded-full">
                      {cat.items.length}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base mb-1 flex items-center gap-1.5">
                    {cat.name}
                    <ArrowRight size={12} className="text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-1">
                    {cat.items.slice(0, 3).map(i => i.name.split(/\s*[\/·]\s*/)[0]).join(' · ')}
                    {cat.items.length > 3 && ' …'}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Build literacy cluster cards */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={14} className="text-indigo-400" />
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Build Literacy clusters</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {BUILD_LITERACY_CLUSTERS.map(cluster => {
              const meta = BUILD_CLUSTER_META[cluster.id] || BUILD_CLUSTER_META['web-foundations'];
              const Icon = meta.icon;
              const count = cluster.topics?.length || 0;
              return (
                <button
                  key={cluster.id}
                  onClick={() => handleSelectCluster(cluster)}
                  className={`group relative p-4 rounded-xl border ${meta.border} bg-zinc-900/60 backdrop-blur text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${meta.glow}`}
                >
                  <div className={`absolute top-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r ${meta.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${meta.color} shadow-md`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base mb-1 flex items-center gap-1.5">
                    {cluster.title}
                    <ArrowRight size={12} className="text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-1">
                    {cluster.topics.slice(0, 3).map(t => t.title.split(/\s*[\/·:]\s*/)[0]).join(' · ')}
                    {cluster.topics.length > 3 && ' …'}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Keyboard shortcuts */}
        <div className="px-6 py-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Keyboard size={16} className="text-zinc-400" />
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Keyboard Shortcuts</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SHORTCUTS.map(({ keys, label }) => (
                <div key={label} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
                  <span className="text-sm text-zinc-300">{label}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    {keys.map((k, i) => (
                      <kbd key={i} className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-[11px] font-semibold min-w-[24px] text-center">
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
