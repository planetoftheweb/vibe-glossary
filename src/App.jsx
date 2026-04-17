import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { MessageSquare, ArrowRight, BookOpen, PanelLeftClose, GripVertical, Eye, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

import TopNav        from './components/layout/TopNav';
import Footer        from './components/layout/Footer';
import PromptBuilder from './components/ui/PromptBuilder';
import ExploreBar    from './components/ui/ExploreBar';
import WelcomeScreen from './components/WelcomeScreen';
import useExploreMode from './hooks/useExploreMode';
import { CATEGORIES, CATEGORY_COLORS } from './data/categories';
import { GLOSSARY_DATA } from './data/glossary';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('vg-visited');
  });
  const [activeItem, setActiveItem]       = useState('modal');
  const [infoOpen, setInfoOpen]           = useState(true);
  const [mobileView, setMobileView]       = useState('info'); // 'info' or 'preview'
  const [darkMode, setDarkMode]           = useState(true);
  const [toasts, setToasts]               = useState([]);
  const [activeOptions, setActiveOptions] = useState(new Set());
  const searchInputRef = useRef(null);
  const explore = useExploreMode();
  const [panelWidth, setPanelWidth] = useState(() => {
    const saved = localStorage.getItem('vg-panel-width');
    return saved ? Number(saved) : 40; // percent
  });
  const isResizing = useRef(false);
  const containerRef = useRef(null);

  const handleResizeStart = useCallback((e) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handleMove = (ev) => {
      if (!isResizing.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (ev.clientX || ev.touches?.[0]?.clientX) - rect.left;
      const pct = Math.min(60, Math.max(25, (x / rect.width) * 100));
      setPanelWidth(pct);
    };
    const handleUp = () => {
      isResizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      setPanelWidth(prev => { localStorage.setItem('vg-panel-width', prev); return prev; });
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // Reset options when switching components & track visit
  useEffect(() => {
    setActiveOptions(new Set());
    if (!showWelcome) {
      explore.markVisited(activeItem);
    }
  }, [activeItem, showWelcome]);

  const addGlobalToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const toggleOption = (id) => {
    const next = new Set(activeOptions);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setActiveOptions(next);
  };

  const handleEnterApp = () => {
    localStorage.setItem('vg-visited', '1');
    setShowWelcome(false);
  };

  const handleSelectCategory = (itemId) => {
    setActiveItem(itemId);
    localStorage.setItem('vg-visited', '1');
    setShowWelcome(false);
  };

  const handleShowWelcome = () => {
    setShowWelcome(true);
  };

  const handleCopyPrompt = () => {
    explore.markCopied(activeItem);
  };

  const currentData  = GLOSSARY_DATA[activeItem] || GLOSSARY_DATA['modal'];
  const DemoComponent = currentData.demo;

  // Flat list of all component IDs for prev/next navigation
  const allItems = useMemo(() => CATEGORIES.flatMap(c => c.items.map(i => i.id)), []);
  const currentIndex = allItems.indexOf(activeItem);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  const prevData = prevItem ? GLOSSARY_DATA[prevItem] : null;
  const nextData = nextItem ? GLOSSARY_DATA[nextItem] : null;

  const activeCat = useMemo(() => {
    const cat = CATEGORIES.find(c => c.items.some(i => i.id === activeItem));
    return cat ? CATEGORY_COLORS[cat.id] : CATEGORY_COLORS.overlays;
  }, [activeItem]);

  return (
    <div className={`flex flex-col h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {showWelcome && (
        <WelcomeScreen
          onEnter={handleEnterApp}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {/* Top Navigation */}
      {!showWelcome && (
        <TopNav
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          categories={CATEGORIES}
          activeCatColors={activeCat}
          onGetStarted={handleShowWelcome}
          searchInputRef={searchInputRef}
        />
      )}

      {/* Global Toast Container */}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="bg-zinc-900 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-in-right text-base font-medium">
            {t.message}
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col pt-[4.5rem] overflow-hidden">

        {/* Explore Bar */}
        {!showWelcome && (
          <ExploreBar
            explore={explore}
            activeItem={activeItem}
            onSelectItem={setActiveItem}
            activeCatColors={activeCat}
          />
        )}

        {/* Main content row */}
        <div ref={containerRef} className="flex-1 flex flex-col lg:flex-row overflow-hidden">

          {/* Mobile view toggle */}
          <div className="lg:hidden flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
            <button
              onClick={() => setMobileView('info')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-base font-semibold transition-colors ${
                mobileView === 'info'
                  ? `${activeCat.text} ${activeCat.bg} border-b-2 ${activeCat.border}`
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              <FileText size={18} />
              Definition
            </button>
            <button
              onClick={() => setMobileView('preview')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-base font-semibold transition-colors ${
                mobileView === 'preview'
                  ? `${activeCat.text} ${activeCat.bg} border-b-2 ${activeCat.border}`
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              <Eye size={18} />
              Live Preview
            </button>
          </div>

          {/* Info & Prompt Panel — always visible on desktop, toggled on mobile */}
          {infoOpen && (
            <div className={`${mobileView === 'info' ? 'flex' : 'hidden'} lg:flex bg-white dark:bg-zinc-950 overflow-y-auto z-10 flex-col shrink-0 w-full`} style={{ minWidth: 0, ...(typeof window !== 'undefined' && window.innerWidth >= 1024 ? { width: `${panelWidth}%` } : {}) }}>
              <div className="p-5 lg:p-10 xl:p-12 flex flex-col min-h-full">

                {/* Definition Header */}
                <div className="flex items-start justify-between mb-4 lg:mb-8">
                  <div>
                    <div className="flex items-center gap-2 lg:gap-2.5 mb-2 lg:mb-3">
                      <div className={`w-2.5 lg:w-3.5 h-2.5 lg:h-3.5 rounded-full ${activeCat.dot}`} />
                      <span className={`text-xs lg:text-base font-bold uppercase tracking-wider ${activeCat.accent}`}>Definition</span>
                    </div>
                    <h1 className="text-2xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                      {currentData.title}
                    </h1>
                  </div>
                  <button
                    onClick={() => setInfoOpen(false)}
                    className="hidden lg:block p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    title="Close panel"
                  >
                    <PanelLeftClose size={18} />
                  </button>
                </div>

                <p className="text-base lg:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium mb-6 lg:mb-10">
                  {currentData.definition}
                </p>

                {/* Prompt Builder */}
                <div className="mb-8">
                  <PromptBuilder
                    data={currentData}
                    activeOptions={activeOptions}
                    onOptionToggle={toggleOption}
                    categoryColors={activeCat}
                    onCopy={handleCopyPrompt}
                  />
                </div>

                <div className="space-y-5 mt-auto">
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 lg:gap-2.5 mb-2 lg:mb-3 text-zinc-500 dark:text-zinc-400">
                      <MessageSquare size={18} />
                      <span className="text-sm lg:text-base font-bold uppercase tracking-wide">Pro Tip</span>
                    </div>
                    <p className="text-sm lg:text-lg text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                      "{currentData.vibeTip}"
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm lg:text-base font-bold text-zinc-400 uppercase tracking-wider mb-2 lg:mb-3 flex items-center gap-1.5 lg:gap-2">
                      <ArrowRight size={16} /> Distinction
                    </h3>
                    <p className="text-sm lg:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {currentData.comparison}
                    </p>
                  </div>

                  {/* Prev / Next navigation */}
                  <div className="flex items-stretch gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    {prevItem ? (
                      <button
                        onClick={() => setActiveItem(prevItem)}
                        className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors text-left group"
                      >
                        <ChevronLeft size={18} className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-zinc-400 block">Previous</span>
                          <span className="text-sm lg:text-base font-semibold text-zinc-700 dark:text-zinc-200 truncate block">{prevData?.title}</span>
                        </div>
                      </button>
                    ) : <div className="flex-1" />}
                    {nextItem ? (
                      <button
                        onClick={() => setActiveItem(nextItem)}
                        className="flex-1 flex items-center justify-end gap-3 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors text-right group"
                      >
                        <div className="min-w-0">
                          <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-zinc-400 block">Next</span>
                          <span className="text-sm lg:text-base font-semibold text-zinc-700 dark:text-zinc-200 truncate block">{nextData?.title}</span>
                        </div>
                        <ChevronRight size={18} className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 shrink-0" />
                      </button>
                    ) : <div className="flex-1" />}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resize handle — desktop only */}
          {infoOpen && (
            <div
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
              className="hidden lg:flex w-1.5 hover:w-2.5 items-center justify-center cursor-col-resize bg-zinc-200/50 dark:bg-zinc-800/50 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all group/resize shrink-0 z-20"
            >
              <GripVertical size={14} className="text-zinc-300 dark:text-zinc-600 group-hover/resize:text-zinc-500 dark:group-hover/resize:text-zinc-400 transition-colors" />
            </div>
          )}

          {/* Main Content — Live Preview */}
          <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 relative overflow-hidden flex-col bg-zinc-100 dark:bg-black`}>
            {/* Subtle color glow */}
            <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${activeCat.gradient} opacity-[0.04] blur-3xl pointer-events-none transition-all duration-700`} />
            <div className={`absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br ${activeCat.gradient} opacity-[0.03] blur-3xl pointer-events-none transition-all duration-700`} />

            {/* Floating controls — desktop only */}
            <div className="hidden lg:flex absolute top-4 left-4 z-30 gap-2">
              {!infoOpen && (
                <button
                  onClick={() => setInfoOpen(true)}
                  className="p-2.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm hover:bg-white dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
                  title="Open Definition"
                >
                  <BookOpen size={18} />
                </button>
              )}
            </div>

            {/* Demo area — fills available space, centers content */}
            <div className="w-full h-full relative z-10 flex flex-col items-center justify-center p-4 lg:p-8">
              <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
                <DemoComponent activeOptions={activeOptions} />
              </div>
            </div>
          </main>
        </div>

        {!showWelcome && <Footer />}
      </div>
    </div>
  );
}
