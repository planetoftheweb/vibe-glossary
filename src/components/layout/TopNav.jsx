import { useState, useRef, useEffect } from 'react';
import {
  Sun, Moon, Search, ChevronDown, ChevronRight, X, Home,
  Menu as MenuIcon, Shuffle, Trophy, GraduationCap,
  RotateCcw, Keyboard, Check, Eye, Copy, Settings, LifeBuoy, BookOpen
} from 'lucide-react';
import { CATEGORY_COLORS } from '../../data/categories';

// ─────────────────────────────────────────────────────────────────────────────
// Generic popover — used by all three dropdowns (category, component, menu)
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
      className={`absolute top-full mt-2 ${align === 'right' ? 'right-0' : 'left-0'} bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl z-50 py-1.5 animate-fade-in max-h-[75vh] overflow-y-auto`}
      style={{ minWidth: width }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// A clean pill button that opens a dropdown
// ─────────────────────────────────────────────────────────────────────────────
function PillDropdown({ icon, label, isOpen, onToggle, onClose, children, width, align }) {
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
    <div ref={wrapRef} className="relative flex-1 md:flex-none">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-2.5 px-5 py-3 rounded-lg text-base md:text-lg font-semibold transition-colors ${
          isOpen
            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
            : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/70'
        }`}
      >
        {icon}
        <span className="truncate">{label}</span>
        <ChevronDown size={18} className={`text-zinc-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div
          className={`absolute top-full mt-2 ${align === 'right' ? 'right-0' : 'left-0'} bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl z-50 py-1.5 animate-fade-in max-h-[75vh] overflow-y-auto`}
          style={{ minWidth: width || 280 }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main menu dropdown — absorbs dark mode + ExploreBar features
// ─────────────────────────────────────────────────────────────────────────────
function MainMenu({
  isOpen, onClose,
  darkMode, setDarkMode,
  learnMode, toggleLearnMode,
  explore, categories, onSelectItem,
  onGetStarted, onOpenCheatSheet, onOpenGlossaryIndex,
  activeCatColors,
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
  const { progress, surpriseMe, visited, copied, resetProgress } = explore;

  const handleSurprise = () => {
    const id = surpriseMe();
    onSelectItem(id);
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
    onOpenGlossaryIndex?.();
    onClose();
  };

  return (
    <div className="w-[340px] text-zinc-700 dark:text-zinc-200">
      {/* LEARN section */}
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
        <MenuItem icon={<Shuffle size={18} />} onClick={handleSurprise}>
          Surprise Me
        </MenuItem>
      </div>

      {/* STATS section — collapsible */}
      <div className="border-t border-zinc-100 dark:border-zinc-800">
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
            {/* Progress header — dual ring: outer = mastered, inner = visited */}
            <div className="px-4 pb-3 flex items-center gap-3">
              <div className="relative w-14 h-14 shrink-0">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                  {/* Outer ring — mastered (emerald) */}
                  <circle cx="18" cy="18" r="16.5" fill="none" stroke="currentColor"
                    className="text-zinc-200 dark:text-zinc-800" strokeWidth="1.5" />
                  <circle cx="18" cy="18" r="16.5" fill="none" stroke="currentColor"
                    className="text-emerald-500" strokeWidth="1.5"
                    strokeDasharray={`${progress.masteredPercent * 1.0367} 200`}
                    strokeLinecap="round"
                  />
                  {/* Inner ring — visited (category accent) */}
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

            {/* Category progress bars */}
            <div className="px-4 pb-3 space-y-2">
              {categories.map(cat => {
                const cc = CATEGORY_COLORS[cat.id];
                const catVisited = cat.items.filter(i => visited.has(i.id)).length;
                const catPercent = Math.round((catVisited / cat.items.length) * 100);
                const isComplete = catVisited === cat.items.length;
                return (
                  <div key={cat.id}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${cc.dot}`} />
                      <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 truncate">{cat.name}</span>
                      {isComplete && <Check size={13} className="text-emerald-500 shrink-0" />}
                      <span className="ml-auto text-xs text-zinc-400">{catVisited}/{cat.items.length}</span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${cc.gradient} transition-all duration-500`}
                        style={{ width: `${catPercent}%` }}
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

      {/* HELP section */}
      <div className="border-t border-zinc-100 dark:border-zinc-800">
        <SectionHeader icon={<LifeBuoy size={14} />} label="Help" />
        <MenuItem icon={<BookOpen size={18} />} onClick={handleGlossaryIndex}>
          Glossary Index
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
  categories, activeCatColors,
  onGetStarted, searchInputRef,
  explore, onOpenCheatSheet, onOpenGlossaryIndex,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const activeCat = categories.find(c => c.items.some(i => i.id === activeItem));
  const activeItemData = activeCat?.items.find(i => i.id === activeItem);
  const catColors = activeCat ? CATEGORY_COLORS[activeCat.id] : CATEGORY_COLORS.overlays;

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
    <header className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shrink-0 z-50 fixed top-0 left-0 right-0">
      <div className="flex items-center justify-between px-4 md:px-6 h-20">
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

          <div className="hidden md:flex h-7 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

          {/* Category */}
          <div className="hidden md:block">
            <PillDropdown
              icon={<div className={`w-3 h-3 rounded-full ${catColors.dot}`} />}
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

          {/* Component */}
          <div className="hidden md:block">
            <PillDropdown
              icon={activeCat?.icon || null}
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
        </div>

        {/* Right: Search + Menu */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop: inline expanding search */}
          {searchOpen ? (
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
          ) : (
            <button
              onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 50); }}
              className="hidden md:flex p-2.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
              aria-label="Search (⌘K)"
              title="Search (⌘K)"
            >
              <Search size={20} />
            </button>
          )}

          {/* Mobile: icon-only search toggle */}
          <button
            onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => searchInputRef.current?.focus(), 50); }}
            className="md:hidden p-2.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

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
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${activeCatColors.gradient} flex items-center justify-center text-white text-[11px] font-bold`}>
                {explore.progress.visited}
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
                  onGetStarted={onGetStarted}
                  onOpenCheatSheet={onOpenCheatSheet}
                  onOpenGlossaryIndex={onOpenGlossaryIndex}
                  learnMode={learnMode}
                  toggleLearnMode={toggleLearnMode}
                  activeCatColors={activeCatColors}
                />
              </Popover>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search overlay — underneath the menu on small devices */}
      {searchOpen && (
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

      {/* Mobile nav — category + component dropdowns */}
      <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 px-3 py-2 flex gap-2">
        <PillDropdown
          icon={<div className={`w-2 h-2 rounded-full ${catColors.dot}`} />}
          label={activeCat?.name || 'Overlays'}
          isOpen={openDropdown === 'mob-cat'}
          onToggle={() => setOpenDropdown(openDropdown === 'mob-cat' ? null : 'mob-cat')}
          onClose={() => setOpenDropdown(null)}
          width={220}
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

        <PillDropdown
          icon={activeCat?.icon || null}
          label={activeItemData?.name || 'Modal'}
          isOpen={openDropdown === 'mob-comp'}
          onToggle={() => setOpenDropdown(openDropdown === 'mob-comp' ? null : 'mob-comp')}
          onClose={() => setOpenDropdown(null)}
          width={220}
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
    </header>
  );
}
