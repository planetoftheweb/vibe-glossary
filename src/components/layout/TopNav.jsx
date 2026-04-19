import { useState, useRef, useEffect, cloneElement } from 'react';
import {
  Sun, Moon, Search, ChevronDown, ChevronRight, X, Home,
  Menu as MenuIcon, Shuffle, Trophy, GraduationCap,
  RotateCcw, Keyboard, Check, Eye, Copy, Settings, LifeBuoy, BookOpen, List, BookText,
  Compass, Lightbulb, Wrench, FileText, Database, KeyRound, Palette,
} from 'lucide-react';
import { CATEGORY_COLORS } from '../../data/categories';
import {
  BUILD_LITERACY_NAV_COLORS,
  BUILD_LITERACY_CLUSTERS,
  getBuildTopic,
  getBuildCluster,
} from '../../data/buildLiteracy';

// Lucide icon per Build Literacy cluster, kept in the nav so the data file
// stays plain JSON-shaped.
const BUILD_CLUSTER_ICONS = {
  'web-foundations': <Compass size={20} />,
  'design-language': <Palette size={20} />,
  product: <Lightbulb size={20} />,
  engineering: <Wrench size={20} />,
  'spec-driven': <FileText size={20} />,
  data: <Database size={20} />,
  auth: <KeyRound size={20} />,
};

// ─────────────────────────────────────────────────────────────────────────────
// Generic popover, used by all three dropdowns (category, component, menu)
// ─────────────────────────────────────────────────────────────────────────────
function Popover({ children, isOpen, onClose, align = 'left', width = 260 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      ref={ref}
      className={`absolute top-full mt-2 ${align === 'right' ? 'right-0' : 'left-0'} bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 ring-1 ring-black/5 dark:ring-white/10 rounded-xl shadow-2xl z-50 py-1.5 animate-fade-in max-h-[75vh] overflow-y-auto`}
      style={{ minWidth: width }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// A clean pill button that opens a dropdown
// ─────────────────────────────────────────────────────────────────────────────
function PillDropdown({ icon, label, isOpen, onToggle, onClose, children, width, align, iconOnly, ariaLabel }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  return (
    <div ref={wrapRef} className={`relative ${iconOnly ? '' : 'flex-1 md:flex-none'}`}>
      <button
        onClick={onToggle}
        aria-label={ariaLabel || label}
        className={`${iconOnly ? 'flex items-center gap-1 px-3 py-2.5' : 'w-full flex items-center gap-2 lg:gap-2.5 px-3 lg:px-4 xl:px-5 py-2.5 lg:py-3'} rounded-lg text-base md:text-lg font-semibold transition-colors ${
          isOpen
            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
            : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/70'
        }`}
      >
        {icon}
        {!iconOnly && <span className="hidden lg:inline truncate">{label}</span>}
        {!iconOnly && (
          <ChevronDown size={18} className={`hidden xl:inline text-zinc-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        )}
        {iconOnly && (
          <ChevronDown size={14} className={`text-zinc-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>
      {isOpen && (
        <div
          className={`absolute top-full mt-2 ${align === 'right' ? 'right-0' : 'left-0'} bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 ring-1 ring-black/5 dark:ring-white/10 rounded-xl shadow-2xl z-50 py-1.5 animate-fade-in max-h-[75vh] overflow-y-auto`}
          style={{ minWidth: width || 280 }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main menu dropdown, absorbs dark mode + ExploreBar features
// ─────────────────────────────────────────────────────────────────────────────
function MainMenu({
  isOpen, onClose,
  darkMode, setDarkMode,
  learnMode, toggleLearnMode,
  explore, categories, onSelectItem, onSelectBuildTopic,
  onGetStarted, onOpenCheatSheet, onOpenGlossaryIndex, onOpenPaths,
  onOpenBuildIndex, onOpenBuildPaths,
  activeCatColors,
  siteSection, setSiteSection,
}) {
  const [statsOpen, setStatsOpen] = useState(() => {
    try { return localStorage.getItem('vg-menu-stats-open') === 'true'; }
    catch { return false; }
  });

  const toggleStats = () => {
    setStatsOpen(prev => {
      const next = !prev;
      try { localStorage.setItem('vg-menu-stats-open', String(next)); } catch {}
      return next;
    });
  };

  if (!isOpen) return null;
  const { surpriseMe, surpriseMeBuild, visited, copied, resetProgress } = explore;
  const isBuild = siteSection === 'build';

  // Progress UI follows the active section so "Your Progress" always means
  // "your progress in the thing I am currently looking at".
  const isBuildSection = siteSection === 'build';
  const progress = isBuildSection ? explore.buildProgress : explore.progress;
  const progressSections = isBuildSection
    ? BUILD_LITERACY_CLUSTERS.map(cluster => ({
        id: cluster.id,
        name: cluster.title,
        items: cluster.topics,
        colors: BUILD_LITERACY_NAV_COLORS,
      }))
    : categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        items: cat.items,
        colors: CATEGORY_COLORS[cat.id],
      }));

  const handleSurprise = () => {
    if (isBuild) {
      const id = surpriseMeBuild?.();
      if (id) onSelectBuildTopic?.(id);
    } else {
      const id = surpriseMe();
      onSelectItem(id);
    }
    onClose();
  };

  const handleWelcome = () => {
    onGetStarted();
    onClose();
  };

  const handleCheatSheet = () => {
    onOpenCheatSheet();
    onClose();
  };

  const handleGlossaryIndex = () => {
    if (isBuild) onOpenBuildIndex?.();
    else onOpenGlossaryIndex?.();
    onClose();
  };

  const handlePaths = () => {
    if (isBuild) onOpenBuildPaths?.();
    else onOpenPaths?.();
    onClose();
  };

  const handleBuildLiteracy = () => {
    setSiteSection?.('build');
    onClose();
  };

  const handleUiGlossary = () => {
    setSiteSection?.('glossary');
    onClose();
  };

  return (
    <div className="w-[340px] text-zinc-700 dark:text-zinc-200">
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-2">
        <SectionHeader icon={<BookText size={14} />} label="Content" />
        {siteSection === 'glossary' ? (
          <MenuItem icon={<BookText size={18} />} onClick={handleBuildLiteracy}>
            Build literacy
          </MenuItem>
        ) : (
          <MenuItem icon={<BookOpen size={18} />} onClick={handleUiGlossary}>
            UI glossary
          </MenuItem>
        )}
      </div>
      {/* LEARN section, hidden on lg+ where the Learning pill covers it */}
      <div className="lg:hidden">
        <SectionHeader icon={<GraduationCap size={14} />} label="Learn" />
        <div className="pb-1.5">
          <button
            onClick={toggleLearnMode}
            className="w-full flex items-center gap-3 px-4 py-3 text-base hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
          >
            <GraduationCap size={18} />
            <div className="flex flex-col items-start min-w-0 text-left">
              <span className="font-medium">Learn Mode</span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 leading-none mt-0.5">
                Quiz me on each component
              </span>
            </div>
            <span className={`ml-auto relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${learnMode ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${learnMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </span>
          </button>
          <MenuItem icon={<Trophy size={18} />} onClick={handlePaths}>
            <span className="font-medium">Learning Paths</span>
            {explore.badges.size > 0 && (
              <span className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                {explore.badges.size} <Check size={11} />
              </span>
            )}
          </MenuItem>
          <MenuItem icon={<Shuffle size={18} />} onClick={handleSurprise}>
            Surprise Me
          </MenuItem>
        </div>
      </div>

      {/* STATS section, collapsible, hidden on lg+ where the Progress pill covers it */}
      <div className="lg:hidden border-t border-zinc-100 dark:border-zinc-800">
        <button
          onClick={toggleStats}
          className="w-full flex items-center gap-2 px-4 pt-3 pb-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          aria-expanded={statsOpen}
        >
          <Trophy size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">Your Progress</span>
          <span className="ml-auto text-xs text-zinc-400 font-semibold">
            {progress.visited}/{progress.total}
            {progress.mastered > 0 && (
              <span className="text-emerald-500 ml-1.5">· {progress.mastered} ✓</span>
            )}
          </span>
          <ChevronRight size={16} className={`transition-transform ${statsOpen ? 'rotate-90' : ''}`} />
        </button>

        {statsOpen && (
          <div className="animate-fade-in">
            {/* Progress header, dual ring: outer = mastered, inner = visited */}
            <div className="px-4 pb-3 flex items-center gap-3">
              <div className="relative w-14 h-14 shrink-0">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                  {/* Outer ring, mastered (emerald) */}
                  <circle cx="18" cy="18" r="16.5" fill="none" stroke="currentColor"
                    className="text-zinc-200 dark:text-zinc-800" strokeWidth="1.5" />
                  <circle cx="18" cy="18" r="16.5" fill="none" stroke="currentColor"
                    className="text-emerald-500" strokeWidth="1.5"
                    strokeDasharray={`${progress.masteredPercent * 1.0367} 200`}
                    strokeLinecap="round"
                  />
                  {/* Inner ring, visited (category accent) */}
                  <circle cx="18" cy="18" r="12.5" fill="none" stroke="currentColor"
                    className="text-zinc-200 dark:text-zinc-800" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="12.5" fill="none" stroke="currentColor"
                    className={activeCatColors.accent} strokeWidth="2.5"
                    strokeDasharray={`${progress.percent * 0.7854} 200`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-zinc-700 dark:text-zinc-200">
                  {progress.visited}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                  Your Progress
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5">
                  {progress.visited}/{progress.total} explored · {progress.copied} copied
                </p>
                {progress.mastered > 0 && (
                  <p className="text-xs text-emerald-500 leading-tight mt-0.5 font-semibold">
                    {progress.mastered} mastered ✓
                  </p>
                )}
              </div>
            </div>

            {/* Per-section progress bars (categories or build clusters) */}
            <div className="px-4 pb-3 space-y-2">
              {progressSections.map(section => {
                const cc = section.colors;
                const sectionVisited = section.items.filter(i => visited.has(i.id)).length;
                const sectionPercent = Math.round((sectionVisited / section.items.length) * 100);
                const isComplete = sectionVisited === section.items.length;
                return (
                  <div key={section.id}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${cc.dot}`} />
                      <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 truncate">{section.name}</span>
                      {isComplete && <Check size={13} className="text-emerald-500 shrink-0" />}
                      <span className="ml-auto text-xs text-zinc-400">{sectionVisited}/{section.items.length}</span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${cc.gradient} transition-all duration-500`}
                        style={{ width: `${sectionPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => { resetProgress(); onClose(); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
            >
              <RotateCcw size={16} />
              <span className="font-medium">Reset Progress</span>
            </button>
          </div>
        )}
      </div>

      {/* HELP section, hidden on lg+ where the Help pill covers it */}
      <div className="lg:hidden border-t border-zinc-100 dark:border-zinc-800">
        <SectionHeader icon={<LifeBuoy size={14} />} label="Help" />
        <MenuItem
          icon={isBuild ? <BookText size={18} /> : <BookOpen size={18} />}
          onClick={handleGlossaryIndex}
        >
          {isBuild ? 'Build Literacy Index' : 'Glossary Index'}
        </MenuItem>
        <MenuItem icon={<Home size={18} />} onClick={handleWelcome}>
          Welcome Screen
        </MenuItem>
        <MenuItem icon={<Keyboard size={18} />} onClick={handleCheatSheet}>
          Cheat Sheet
          <kbd className="ml-auto text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400">⌘/</kbd>
        </MenuItem>
      </div>

      {/* SETTINGS section */}
      <div className="border-t border-zinc-100 dark:border-zinc-800">
        <SectionHeader icon={<Settings size={14} />} label="Settings" />
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-base hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
        >
          {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          <span className="font-medium">Dark Mode</span>
          <span className={`ml-auto relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </span>
        </button>
      </div>
    </div>
  );
}

function SectionHeader({ icon, label }) {
  return (
    <div className="flex items-center gap-2 px-4 pt-3 pb-1.5 text-zinc-500 dark:text-zinc-400">
      {icon}
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
}

function MenuItem({ icon, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 text-base text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
    >
      {icon}
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TopNav
// ─────────────────────────────────────────────────────────────────────────────
export default function TopNav({
  darkMode, setDarkMode,
  learnMode, toggleLearnMode,
  activeItem, setActiveItem,
  activeBuildTopic, setActiveBuildTopic = () => {},
  categories, activeCatColors,
  siteSection = 'glossary', setSiteSection = () => {},
  onGetStarted, searchInputRef,
  explore, onOpenCheatSheet, onOpenGlossaryIndex, onOpenPaths,
  onOpenBuildIndex, onOpenBuildPaths,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const activeCat = categories.find(c => c.items.some(i => i.id === activeItem));
  const activeItemData = activeCat?.items.find(i => i.id === activeItem);
  const catColors = siteSection === 'build'
    ? BUILD_LITERACY_NAV_COLORS
    : (activeCat ? CATEGORY_COLORS[activeCat.id] : CATEGORY_COLORS.overlays);

  // Progress UI (rings + breakdown) follows the active section.
  const isBuildSection = siteSection === 'build';
  const activeProgress = isBuildSection ? explore.buildProgress : explore.progress;
  const progressRingColor = isBuildSection
    ? BUILD_LITERACY_NAV_COLORS.accent
    : activeCatColors.accent;
  const progressSections = isBuildSection
    ? BUILD_LITERACY_CLUSTERS.map(cluster => ({
        id: cluster.id,
        name: cluster.title,
        items: cluster.topics,
        colors: BUILD_LITERACY_NAV_COLORS,
      }))
    : categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        items: cat.items,
        colors: CATEGORY_COLORS[cat.id],
      }));

  // Build literacy: active topic and its cluster, mirroring the glossary's
  // category + component pair.
  const activeBuildTopicData = activeBuildTopic ? getBuildTopic(activeBuildTopic) : null;
  const activeBuildCluster = activeBuildTopicData
    ? getBuildCluster(activeBuildTopicData.clusterId)
    : BUILD_LITERACY_CLUSTERS[0];

  const handleSelectBuildCluster = (clusterId) => {
    const cluster = getBuildCluster(clusterId);
    if (cluster?.topics?.length) {
      setActiveBuildTopic(cluster.topics[0].id);
      setOpenDropdown(null);
    }
  };

  const handleSelectBuildTopic = (topicId) => {
    setActiveBuildTopic(topicId);
    setOpenDropdown(null);
  };

  const searchResults = searchTerm.trim()
    ? categories.flatMap(cat =>
        cat.items
          .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(item => ({ ...item, catId: cat.id, catName: cat.name }))
      )
    : [];

  const handleSelectCategory = (catId) => {
    const cat = categories.find(c => c.id === catId);
    if (cat) {
      setActiveItem(cat.items[0].id);
      setOpenDropdown(null);
    }
  };

  const handleSelectComponent = (itemId) => {
    setActiveItem(itemId);
    setOpenDropdown(null);
  };

  const handleSearchSelect = (itemId) => {
    setActiveItem(itemId);
    setSearchTerm('');
    setSearchOpen(false);
  };

  useEffect(() => {
    if (siteSection === 'build') {
      setSearchOpen(false);
      setSearchTerm('');
    }
  }, [siteSection]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchTerm('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchInputRef]);

  return (
    <header className="relative bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shrink-0 z-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-r ${catColors.gradient} opacity-[0.10] dark:opacity-[0.18] transition-opacity duration-500`} />
      </div>
      <div className="relative flex items-center justify-between px-4 md:px-6 h-20">
        {/* Left: Logo + pill dropdowns */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <button
            onClick={onGetStarted}
            className="flex items-center gap-3 font-bold tracking-tight text-zinc-900 dark:text-white shrink-0"
            title="Welcome screen"
          >
            <img src="/logo.png" alt="VibeGlossary" className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover" />
            <span className="hidden sm:inline text-2xl">VibeGlossary</span>
          </button>

          <div className="flex shrink-0 items-center rounded-xl bg-zinc-100 dark:bg-zinc-900 p-1 border border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setSiteSection('glossary')}
              className={`px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold min-h-[44px] transition-colors ${
                siteSection === 'glossary'
                  ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              UI Glossary
            </button>
            <button
              type="button"
              onClick={() => setSiteSection('build')}
              className={`px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold min-h-[44px] transition-colors ${
                siteSection === 'build'
                  ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              Build literacy
            </button>
          </div>

          {siteSection === 'glossary' && (
          <div className="hidden md:flex h-7 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />
          )}

          {/* Category */}
          {siteSection === 'glossary' && (
          <div className="hidden md:block">
            <PillDropdown
              icon={
                <span className={`flex items-center gap-1.5 ${catColors.accent}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${catColors.dot}`} />
                  {activeCat?.icon && cloneElement(activeCat.icon, { size: 22 })}
                </span>
              }
              label={activeCat?.name || 'Overlays'}
              isOpen={openDropdown === 'category'}
              onToggle={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
              onClose={() => setOpenDropdown(null)}
              width={300}
            >
              {categories.map(cat => {
                const cc = CATEGORY_COLORS[cat.id];
                const isActive = activeCat?.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-base transition-colors ${
                      isActive
                        ? `${cc.bg} ${cc.text} font-semibold`
                        : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${cc.dot}`} />
                    {cat.icon}
                    <span className="font-medium">{cat.name}</span>
                    <span className="ml-auto text-sm text-zinc-400">{cat.items.length}</span>
                  </button>
                );
              })}
            </PillDropdown>
          </div>
          )}

          {/* Component */}
          {siteSection === 'glossary' && (
          <div className="hidden md:block">
            <PillDropdown
              icon={<List size={22} className="text-zinc-500 dark:text-zinc-400" />}
              label={activeItemData?.name || 'Modal'}
              isOpen={openDropdown === 'component'}
              onToggle={() => setOpenDropdown(openDropdown === 'component' ? null : 'component')}
              onClose={() => setOpenDropdown(null)}
              width={300}
            >
              {activeCat?.items.map(item => {
                const isActive = item.id === activeItem;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectComponent(item.id)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-base transition-colors ${
                      isActive
                        ? `${catColors.bg} ${catColors.text} font-semibold`
                        : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </PillDropdown>
          </div>
          )}

          {/* Build literacy: divider before the two pills */}
          {siteSection === 'build' && (
            <div className="hidden md:flex h-7 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />
          )}

          {/* Build literacy: Cluster pill */}
          {siteSection === 'build' && (
            <div className="hidden md:block">
              <PillDropdown
                icon={
                  <span className={`flex items-center gap-1.5 ${BUILD_LITERACY_NAV_COLORS.accent}`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${BUILD_LITERACY_NAV_COLORS.dot}`} />
                    {BUILD_CLUSTER_ICONS[activeBuildCluster?.id] || <Compass size={20} />}
                  </span>
                }
                label={activeBuildCluster?.title || 'Web foundations'}
                isOpen={openDropdown === 'build-cluster'}
                onToggle={() => setOpenDropdown(openDropdown === 'build-cluster' ? null : 'build-cluster')}
                onClose={() => setOpenDropdown(null)}
                width={320}
              >
                {BUILD_LITERACY_CLUSTERS.map(cluster => {
                  const isActive = activeBuildCluster?.id === cluster.id;
                  return (
                    <button
                      key={cluster.id}
                      onClick={() => handleSelectBuildCluster(cluster.id)}
                      className={`w-full flex items-center gap-3 px-5 py-3.5 text-base transition-colors ${
                        isActive
                          ? `${BUILD_LITERACY_NAV_COLORS.bg} ${BUILD_LITERACY_NAV_COLORS.text} font-semibold`
                          : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${BUILD_LITERACY_NAV_COLORS.dot}`} />
                      <span className={isActive ? '' : 'text-zinc-500 dark:text-zinc-400'}>
                        {BUILD_CLUSTER_ICONS[cluster.id]}
                      </span>
                      <span className="font-medium text-left">{cluster.title}</span>
                      <span className="ml-auto text-sm text-zinc-400 tabular-nums">{cluster.topics.length}</span>
                    </button>
                  );
                })}
              </PillDropdown>
            </div>
          )}

          {/* Build literacy: Topic pill */}
          {siteSection === 'build' && (
            <div className="hidden md:block">
              <PillDropdown
                icon={<List size={22} className="text-zinc-500 dark:text-zinc-400" />}
                label={activeBuildTopicData?.title || 'Pick a topic'}
                isOpen={openDropdown === 'build-topic'}
                onToggle={() => setOpenDropdown(openDropdown === 'build-topic' ? null : 'build-topic')}
                onClose={() => setOpenDropdown(null)}
                width={340}
              >
                {activeBuildCluster?.topics?.map(topic => {
                  const isActive = topic.id === activeBuildTopic;
                  const isMastered = explore.mastered.has(topic.id);
                  return (
                    <button
                      key={topic.id}
                      onClick={() => handleSelectBuildTopic(topic.id)}
                      className={`w-full flex items-center gap-3 px-5 py-3.5 text-base transition-colors ${
                        isActive
                          ? `${BUILD_LITERACY_NAV_COLORS.bg} ${BUILD_LITERACY_NAV_COLORS.text} font-semibold`
                          : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                      }`}
                    >
                      <span className="font-medium text-left flex-1 truncate">{topic.title}</span>
                      {isMastered && (
                        <Check size={14} className="text-emerald-500 shrink-0" aria-label="Mastered" />
                      )}
                    </button>
                  );
                })}
              </PillDropdown>
            </div>
          )}

          {/* Supplementary pills, icon-only at md, progressively add text/chevron at lg/xl.
              Available in both sections; behavior swaps based on siteSection so
              build literacy gets its own Surprise Me, Paths, and Index. */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 xl:gap-3">
            {/* Learning */}
            <PillDropdown
              icon={<GraduationCap size={22} />}
              label="Learning"
              isOpen={openDropdown === 'learning'}
              onToggle={() => setOpenDropdown(openDropdown === 'learning' ? null : 'learning')}
              onClose={() => setOpenDropdown(null)}
              width={280}
            >
              <button
                onClick={() => { toggleLearnMode(); setOpenDropdown(null); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-base text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
              >
                <GraduationCap size={18} />
                <div className="flex flex-col items-start min-w-0 text-left">
                  <span className="font-medium">Learn Mode</span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 leading-none mt-0.5">
                    {siteSection === 'build' ? 'Quiz me on each topic' : 'Quiz me on each component'}
                  </span>
                </div>
                <span className={`ml-auto relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${learnMode ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${learnMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </span>
              </button>
              <button
                onClick={() => {
                  if (siteSection === 'build') onOpenBuildPaths?.();
                  else onOpenPaths?.();
                  setOpenDropdown(null);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-base text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
              >
                <Trophy size={18} />
                <span className="font-medium">Learning Paths</span>
                {explore.badges.size > 0 && (
                  <span className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    {explore.badges.size} <Check size={11} />
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  if (siteSection === 'build') {
                    const id = explore.surpriseMeBuild?.();
                    if (id) setActiveBuildTopic(id);
                  } else {
                    const id = explore.surpriseMe();
                    setActiveItem(id);
                  }
                  setOpenDropdown(null);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-base text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
              >
                <Shuffle size={18} />
                <span className="font-medium">Surprise Me</span>
              </button>
            </PillDropdown>

            {/* Help */}
            <PillDropdown
              icon={<LifeBuoy size={22} />}
              label="Help"
              isOpen={openDropdown === 'help'}
              onToggle={() => setOpenDropdown(openDropdown === 'help' ? null : 'help')}
              onClose={() => setOpenDropdown(null)}
              width={260}
            >
              <button
                onClick={() => {
                  if (siteSection === 'build') onOpenBuildIndex?.();
                  else onOpenGlossaryIndex?.();
                  setOpenDropdown(null);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-base text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
              >
                {siteSection === 'build' ? <BookText size={18} /> : <BookOpen size={18} />}
                <span className="font-medium">
                  {siteSection === 'build' ? 'Build Literacy Index' : 'Glossary Index'}
                </span>
              </button>
              <button
                onClick={() => { onGetStarted(); setOpenDropdown(null); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-base text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
              >
                <Home size={18} />
                <span className="font-medium">Welcome Screen</span>
              </button>
              <button
                onClick={() => { onOpenCheatSheet(); setOpenDropdown(null); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-base text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
              >
                <Keyboard size={18} />
                <span className="font-medium">Cheat Sheet</span>
                <kbd className="ml-auto text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400">⌘/</kbd>
              </button>
            </PillDropdown>
          </div>
        </div>

        {/* Right: Search + Menu */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop: inline expanding search */}
          {siteSection === 'glossary' && searchOpen ? (
            <div className="hidden md:block relative w-72 lg:w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-base bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                autoFocus
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchTerm(''); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 py-1.5 max-h-80 overflow-y-auto">
                  {searchResults.map(item => {
                    const cc = CATEGORY_COLORS[item.catId];
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSearchSelect(item.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-base text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <div className={`w-2.5 h-2.5 rounded-full ${cc.dot}`} />
                        <span className="font-medium text-zinc-900 dark:text-white">{item.name}</span>
                        <span className={`ml-auto text-sm ${cc.text}`}>{item.catName}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              {searchTerm && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 p-4 text-center text-base text-zinc-400">
                  No components found
                </div>
              )}
            </div>
          ) : siteSection === 'glossary' ? (
            <button
              onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 50); }}
              className="hidden md:flex p-2.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
              aria-label="Search (⌘K)"
              title="Search (⌘K)"
            >
              <Search size={20} />
            </button>
          ) : null}

          {/* Mobile: icon-only search toggle */}
          {siteSection === 'glossary' && (
          <button
            onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => searchInputRef.current?.focus(), 50); }}
            className="md:hidden p-2.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          )}

          {/* Your Progress pill between search and hamburger */}
          <div className="hidden md:block">
            <PillDropdown
              icon={
                <div className="relative w-7 h-7 shrink-0">
                  <svg className="w-7 h-7 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="4" />
                    <circle
                      cx="18" cy="18" r="15" fill="none" stroke="currentColor"
                      className={progressRingColor} strokeWidth="4"
                      strokeDasharray={`${activeProgress.percent * 0.94} 200`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              }
              iconOnly
              ariaLabel={`${isBuildSection ? 'Build literacy' : 'UI glossary'} progress: ${activeProgress.visited} of ${activeProgress.total}`}
              isOpen={openDropdown === 'progress'}
              onToggle={() => setOpenDropdown(openDropdown === 'progress' ? null : 'progress')}
              onClose={() => setOpenDropdown(null)}
              align="right"
              width={320}
            >
              <div className="px-4 pt-3 pb-2 flex items-center gap-3">
                <div className="relative w-14 h-14 shrink-0">
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16.5" fill="none" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="1.5" />
                    <circle cx="18" cy="18" r="16.5" fill="none" stroke="currentColor"
                      className="text-emerald-500" strokeWidth="1.5"
                      strokeDasharray={`${activeProgress.masteredPercent * 1.0367} 200`}
                      strokeLinecap="round"
                    />
                    <circle cx="18" cy="18" r="12.5" fill="none" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="12.5" fill="none" stroke="currentColor"
                      className={progressRingColor} strokeWidth="2.5"
                      strokeDasharray={`${activeProgress.percent * 0.7854} 200`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-zinc-700 dark:text-zinc-200">
                    {activeProgress.visited}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                    {isBuildSection ? 'Build literacy progress' : 'UI glossary progress'}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5">
                    {activeProgress.visited}/{activeProgress.total} explored · {activeProgress.copied} copied
                  </p>
                  {activeProgress.mastered > 0 && (
                    <p className="text-xs text-emerald-500 leading-tight mt-0.5 font-semibold">
                      {activeProgress.mastered} mastered ✓
                    </p>
                  )}
                </div>
              </div>
              <div className="px-4 pb-3 space-y-2">
                {progressSections.map(section => {
                  const cc = section.colors;
                  const sectionVisited = section.items.filter(i => explore.visited.has(i.id)).length;
                  const sectionPercent = Math.round((sectionVisited / section.items.length) * 100);
                  const isComplete = sectionVisited === section.items.length;
                  return (
                    <div key={section.id}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${cc.dot}`} />
                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 truncate">{section.name}</span>
                        {isComplete && <Check size={13} className="text-emerald-500 shrink-0" />}
                        <span className="ml-auto text-xs text-zinc-400">{sectionVisited}/{section.items.length}</span>
                      </div>
                      <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${cc.gradient} transition-all duration-500`}
                          style={{ width: `${sectionPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => { explore.resetProgress(); setOpenDropdown(null); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors border-t border-zinc-100 dark:border-zinc-800"
              >
                <RotateCcw size={16} />
                <span className="font-medium">Reset Progress</span>
              </button>
            </PillDropdown>
          </div>

          {/* Main menu trigger */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'menu' ? null : 'menu')}
              className={`flex items-center gap-1.5 pl-2.5 pr-2 py-1.5 rounded-full border transition-colors ${
                openDropdown === 'menu'
                  ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
              aria-label="Open menu"
            >
              <MenuIcon size={16} className="text-zinc-600 dark:text-zinc-300" />
              <div className="md:hidden relative w-7 h-7 shrink-0">
                <svg className="w-7 h-7 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" className="text-zinc-200 dark:text-zinc-700" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor"
                    className={progressRingColor} strokeWidth="4"
                    strokeDasharray={`${activeProgress.percent * 0.94} 200`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </button>

            {openDropdown === 'menu' && (
              <Popover
                isOpen={openDropdown === 'menu'}
                onClose={() => setOpenDropdown(null)}
                align="right"
                width={320}
              >
                <MainMenu
                  isOpen
                  onClose={() => setOpenDropdown(null)}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  explore={explore}
                  categories={categories}
                  onSelectItem={setActiveItem}
                  onSelectBuildTopic={setActiveBuildTopic}
                  onGetStarted={onGetStarted}
                  onOpenCheatSheet={onOpenCheatSheet}
                  onOpenGlossaryIndex={onOpenGlossaryIndex}
                  onOpenPaths={onOpenPaths}
                  onOpenBuildIndex={onOpenBuildIndex}
                  onOpenBuildPaths={onOpenBuildPaths}
                  learnMode={learnMode}
                  toggleLearnMode={toggleLearnMode}
                  activeCatColors={activeCatColors}
                  siteSection={siteSection}
                  setSiteSection={setSiteSection}
                />
              </Popover>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search overlay, underneath the menu on small devices */}
      {siteSection === 'glossary' && searchOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 animate-fade-in">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search all components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 text-base bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
              autoFocus
            />
            <button
              onClick={() => { setSearchOpen(false); setSearchTerm(''); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X size={16} />
            </button>
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 py-1.5 max-h-64 overflow-y-auto">
                {searchResults.map(item => {
                  const cc = CATEGORY_COLORS[item.catId];
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSearchSelect(item.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-base text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${cc.dot}`} />
                      <span className="font-medium text-zinc-900 dark:text-white">{item.name}</span>
                      <span className={`text-sm ${cc.text}`}>{item.catName}</span>
                    </button>
                  );
                })}
              </div>
            )}
            {searchTerm && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 p-4 text-center text-sm text-zinc-400">
                No components found
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile nav, icon-only cluster + topic dropdowns for Build literacy */}
      {siteSection === 'build' && (
      <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 px-3 py-2 flex items-center gap-2">
        <PillDropdown
          iconOnly
          ariaLabel={`Cluster: ${activeBuildCluster?.title || 'Web foundations'}`}
          icon={
            <span className={`flex items-center gap-1.5 ${BUILD_LITERACY_NAV_COLORS.accent}`}>
              <span className={`w-2 h-2 rounded-full ${BUILD_LITERACY_NAV_COLORS.dot}`} />
              {BUILD_CLUSTER_ICONS[activeBuildCluster?.id] || <Compass size={18} />}
            </span>
          }
          isOpen={openDropdown === 'mob-build-cluster'}
          onToggle={() => setOpenDropdown(openDropdown === 'mob-build-cluster' ? null : 'mob-build-cluster')}
          onClose={() => setOpenDropdown(null)}
          width={260}
        >
          {BUILD_LITERACY_CLUSTERS.map(cluster => {
            const isActive = activeBuildCluster?.id === cluster.id;
            return (
              <button
                key={cluster.id}
                onClick={() => handleSelectBuildCluster(cluster.id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-base transition-colors ${
                  isActive
                    ? `${BUILD_LITERACY_NAV_COLORS.bg} ${BUILD_LITERACY_NAV_COLORS.text} font-semibold`
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${BUILD_LITERACY_NAV_COLORS.dot}`} />
                {BUILD_CLUSTER_ICONS[cluster.id]}
                <span className="font-medium">{cluster.title}</span>
              </button>
            );
          })}
        </PillDropdown>

        <span className="text-zinc-300 dark:text-zinc-700">/</span>

        <PillDropdown
          iconOnly
          ariaLabel={`Topic: ${activeBuildTopicData?.title || 'Pick a topic'}`}
          icon={
            <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-200 font-semibold text-base">
              <List size={16} className="text-zinc-400" />
              <span className="truncate max-w-[9rem]">{activeBuildTopicData?.title || 'Pick a topic'}</span>
            </span>
          }
          isOpen={openDropdown === 'mob-build-topic'}
          onToggle={() => setOpenDropdown(openDropdown === 'mob-build-topic' ? null : 'mob-build-topic')}
          onClose={() => setOpenDropdown(null)}
          width={260}
        >
          {activeBuildCluster?.topics?.map(topic => {
            const isActive = topic.id === activeBuildTopic;
            const isMastered = explore.mastered.has(topic.id);
            return (
              <button
                key={topic.id}
                onClick={() => handleSelectBuildTopic(topic.id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-base transition-colors ${
                  isActive
                    ? `${BUILD_LITERACY_NAV_COLORS.bg} ${BUILD_LITERACY_NAV_COLORS.text} font-semibold`
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <span className="font-medium text-left flex-1 truncate">{topic.title}</span>
                {isMastered && <Check size={14} className="text-emerald-500 shrink-0" aria-label="Mastered" />}
              </button>
            );
          })}
        </PillDropdown>
      </div>
      )}

      {/* Mobile nav, icon-only category + component dropdowns */}
      {siteSection === 'glossary' && (
      <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 px-3 py-2 flex items-center gap-2">
        <PillDropdown
          iconOnly
          ariaLabel={`Category: ${activeCat?.name || 'Overlays'}`}
          icon={
            <span className={`flex items-center gap-1.5 ${catColors.accent}`}>
              <span className={`w-2 h-2 rounded-full ${catColors.dot}`} />
              {activeCat?.icon}
            </span>
          }
          isOpen={openDropdown === 'mob-cat'}
          onToggle={() => setOpenDropdown(openDropdown === 'mob-cat' ? null : 'mob-cat')}
          onClose={() => setOpenDropdown(null)}
          width={240}
        >
          {categories.map(cat => {
            const cc = CATEGORY_COLORS[cat.id];
            const isActive = activeCat?.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-base transition-colors ${
                  isActive
                    ? `${cc.bg} ${cc.text} font-semibold`
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${cc.dot}`} />
                {cat.icon}
                <span className="font-medium">{cat.name}</span>
              </button>
            );
          })}
        </PillDropdown>

        <span className="text-zinc-300 dark:text-zinc-700">/</span>

        <PillDropdown
          iconOnly
          ariaLabel={`Component: ${activeItemData?.name || 'Modal'}`}
          icon={
            <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-200 font-semibold text-base">
              <List size={16} className="text-zinc-400" />
              <span className="truncate max-w-[9rem]">{activeItemData?.name || 'Modal'}</span>
            </span>
          }
          isOpen={openDropdown === 'mob-comp'}
          onToggle={() => setOpenDropdown(openDropdown === 'mob-comp' ? null : 'mob-comp')}
          onClose={() => setOpenDropdown(null)}
          width={240}
        >
          {activeCat?.items.map(item => {
            const isActive = item.id === activeItem;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectComponent(item.id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-base transition-colors ${
                  isActive
                    ? `${catColors.bg} ${catColors.text} font-semibold`
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </PillDropdown>
      </div>
      )}
    </header>
  );
}
