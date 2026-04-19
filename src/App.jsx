import { useState, useEffect, useMemo, useRef, useCallback, Suspense } from 'react';
import { BookOpen, PanelLeftClose, GripVertical, Eye, FileText, ChevronLeft, ChevronRight, Lightbulb, GraduationCap } from 'lucide-react';

import TopNav        from './components/layout/TopNav';
import Footer        from './components/layout/Footer';
import PromptBuilder from './components/ui/PromptBuilder';
import WelcomeScreen from './components/WelcomeScreen';
import CheatSheet    from './components/CheatSheet';
import CompareView    from './components/learn/CompareView';
import GlossaryIndex  from './components/learn/GlossaryIndex';
import QuizCard       from './components/learn/QuizCard';
import PathsLauncher  from './components/learn/PathsLauncher';
import PathView       from './components/learn/PathView';
import BuildLiteracyView from './components/learn/BuildLiteracyView';
import useExploreMode from './hooks/useExploreMode';
import { useGlossary } from './hooks/useGlossary';
import { useCategories } from './hooks/useCategories';
import { CATEGORY_COLORS } from './data/categories';
import { BUILD_LITERACY_NAV_COLORS } from './data/buildLiteracy';
import { DEMO_REGISTRY } from './data/demoRegistry';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('vg-visited');
  });
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [compareWith, setCompareWith]     = useState(null);
  const [showGlossaryIndex, setShowGlossaryIndex] = useState(false);
  const [showPaths, setShowPaths] = useState(false);
  const [activePath, setActivePath] = useState(null);
  const [activeItem, setActiveItem]       = useState('modal');
  const [siteSection, setSiteSection]     = useState('glossary'); // 'glossary' | 'build'
  const [infoOpen, setInfoOpen]           = useState(true);
  const [mobileView, setMobileView]       = useState('info'); // 'info' or 'preview'
  const [darkMode, setDarkMode]           = useState(true);
  const [learnMode, setLearnMode]         = useState(() => {
    try { return localStorage.getItem('vg-learn-mode') === 'true'; }
    catch { return false; }
  });
  const [toasts, setToasts]               = useState([]);
  const [activeOptions, setActiveOptions] = useState(new Set());
  const searchInputRef = useRef(null);
  const categories = useCategories();
  const explore = useExploreMode(categories);
  const glossary = useGlossary();
  const [panelWidth, setPanelWidth] = useState(() => {
    const saved = localStorage.getItem('vg-panel-width');
    return saved ? Number(saved) : 40; // percent
  });
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 1024
  );
  const isResizing = useRef(false);
  const containerRef = useRef(null);

  // Keep isDesktop reactive so inline panel width is removed below lg breakpoint.
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Cmd+/ to toggle cheat sheet
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setShowCheatSheet(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

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

  const toggleLearnMode = () => {
    setLearnMode(prev => {
      const next = !prev;
      try { localStorage.setItem('vg-learn-mode', String(next)); } catch {}
      return next;
    });
  };

  const handleQuizCorrect = () => {
    explore.markMastered(activeItem);
  };

  const currentData  = glossary[activeItem] || glossary['modal'];
  const DemoComponent = DEMO_REGISTRY[activeItem] || DEMO_REGISTRY['modal'];

  // Flat list of all component IDs for prev/next navigation
  const allItems = useMemo(() => categories.flatMap(c => c.items.map(i => i.id)), []);
  const currentIndex = allItems.indexOf(activeItem);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  const prevData = prevItem ? glossary[prevItem] : null;
  const nextData = nextItem ? glossary[nextItem] : null;

  const activeCategory = useMemo(() =>
    categories.find(c => c.items.some(i => i.id === activeItem)),
    [activeItem]
  );

  const activeCat = useMemo(() =>
    activeCategory ? CATEGORY_COLORS[activeCategory.id] : CATEGORY_COLORS.overlays,
    [activeCategory]
  );
  const navAccentColors = siteSection === 'build' ? BUILD_LITERACY_NAV_COLORS : activeCat;

  const siblings = useMemo(() => {
    if (!activeCategory) return [];
    return activeCategory.items.filter(i => i.id !== activeItem).slice(0, 3);
  }, [activeCategory, activeItem]);

  const quizPool = useMemo(() => {
    const mapItem = (item) => {
      const data = glossary[item.id];
      return {
        id: item.id,
        name: item.name,
        title: data?.title || item.name,
        definition: data?.definition || '',
      };
    };
    const inCat = (activeCategory?.items || []).map(mapItem);
    if (inCat.length >= 4) return inCat;
    const others = categories
      .filter(c => c.id !== activeCategory?.id)
      .flatMap(c => c.items)
      .map(mapItem);
    return [...inCat, ...others];
  }, [activeCategory]);

  const isMastered = explore.mastered.has(activeItem);
  const showQuiz = learnMode && !isMastered;

  const carouselArrows = (
    <div className="flex items-center gap-1.5">
      {prevItem && (
        <button
          onClick={() => setActiveItem(prevItem)}
          className="group relative w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors flex items-center justify-center"
          aria-label={`Previous: ${prevData?.title}`}
        >
          <ChevronLeft size={16} className="text-zinc-600 dark:text-zinc-300" />
          <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-700 text-right opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-30">
            <span className="block text-xs uppercase tracking-wider text-zinc-400 font-bold">Previous</span>
            <span className="block text-lg font-semibold text-white">{prevData?.title}</span>
          </span>
        </button>
      )}
      {nextItem && (
        <button
          onClick={() => setActiveItem(nextItem)}
          className="group relative w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors flex items-center justify-center"
          aria-label={`Next: ${nextData?.title}`}
        >
          <ChevronRight size={16} className="text-zinc-600 dark:text-zinc-300" />
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-700 text-left opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-30">
            <span className="block text-xs uppercase tracking-wider text-zinc-400 font-bold">Next</span>
            <span className="block text-lg font-semibold text-white">{nextData?.title}</span>
          </span>
        </button>
      )}
    </div>
  );

  return (
    <div className={`flex flex-col h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {showWelcome && (
        <WelcomeScreen
          onEnter={handleEnterApp}
          onSelectCategory={handleSelectCategory}
        />
      )}

      <CheatSheet
        isOpen={showCheatSheet && !showWelcome}
        onClose={() => setShowCheatSheet(false)}
        onSelectCategory={setActiveItem}
      />

      {compareWith && !showWelcome && (
        <CompareView
          leftId={activeItem}
          rightId={compareWith}
          onClose={() => setCompareWith(null)}
          onSelectItem={setActiveItem}
        />
      )}

      <GlossaryIndex
        isOpen={showGlossaryIndex && !showWelcome}
        onClose={() => setShowGlossaryIndex(false)}
        onSelectItem={setActiveItem}
      />

      <PathsLauncher
        isOpen={showPaths && !showWelcome && !activePath}
        onClose={() => setShowPaths(false)}
        onSelectPath={(path) => { setActivePath(path); setShowPaths(false); }}
        mastered={explore.mastered}
        badges={explore.badges}
      />

      <PathView
        path={activePath}
        isOpen={!!activePath && !showWelcome}
        onClose={() => setActivePath(null)}
        onAwardBadge={(pathId) => explore.awardBadge(pathId)}
        onSelectItem={setActiveItem}
      />

      {/* Top Navigation */}
      {!showWelcome && (
        <TopNav
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          learnMode={learnMode}
          toggleLearnMode={toggleLearnMode}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          categories={categories}
          activeCatColors={navAccentColors}
          siteSection={siteSection}
          setSiteSection={setSiteSection}
          onGetStarted={handleShowWelcome}
          searchInputRef={searchInputRef}
          explore={explore}
          onOpenCheatSheet={() => setShowCheatSheet(true)}
          onOpenGlossaryIndex={() => setShowGlossaryIndex(true)}
          onOpenPaths={() => setShowPaths(true)}
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
      <div className="flex-1 flex flex-col pt-36 md:pt-20 overflow-hidden">
        {siteSection === 'build' ? (
          <BuildLiteracyView
            onOpenGlossaryEntry={(id) => {
              setSiteSection('glossary');
              setActiveItem(id);
            }}
          />
        ) : (
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
            <div className={`${mobileView === 'info' ? 'flex' : 'hidden'} lg:flex bg-white dark:bg-zinc-950 overflow-y-auto z-10 flex-col shrink-0 w-full`} style={{ minWidth: 0, ...(isDesktop ? { width: `${panelWidth}%` } : {}) }}>
              <div className="p-5 lg:p-10 xl:p-12 flex flex-col min-h-full">

                {/* Definition Header */}
                <div className="flex items-start justify-between mb-4 lg:mb-8">
                  <div>
                    <div className="flex items-center flex-wrap gap-2 lg:gap-2.5 mb-2 lg:mb-3">
                      <div className={`w-2.5 lg:w-3.5 h-2.5 lg:h-3.5 rounded-full ${activeCat.dot}`} />
                      <span className={`text-xs lg:text-base font-bold uppercase tracking-wider ${activeCat.accent}`}>
                        {showQuiz ? 'Learn Mode' : 'Definition'}
                      </span>
                      <button
                        onClick={toggleLearnMode}
                        aria-pressed={learnMode}
                        title={learnMode ? 'Exit Learn Mode' : 'Turn on Learn Mode (quiz each component)'}
                        className={`ml-1 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs lg:text-sm font-semibold border transition-colors ${
                          learnMode
                            ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-500'
                            : 'bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <GraduationCap size={13} />
                        {learnMode ? 'Learn Mode: On' : 'Quiz me'}
                      </button>
                    </div>
                    <h1 className="text-2xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                      {currentData.title}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {carouselArrows}
                    <button
                      onClick={() => setInfoOpen(false)}
                      className="hidden lg:block p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                      title="Close panel"
                    >
                      <PanelLeftClose size={18} />
                    </button>
                  </div>
                </div>

                {showQuiz ? (
                  <QuizCard
                    correctId={activeItem}
                    correctTitle={currentData.title}
                    correctDefinition={currentData.definition}
                    correctComparison={currentData.comparison}
                    distractorPool={quizPool}
                    categoryColors={activeCat}
                    onCorrect={handleQuizCorrect}
                  />
                ) : (
                  <>
                    <p className="text-base lg:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium mb-4 lg:mb-5">
                      {currentData.definition}
                    </p>

                    {currentData.vibeTip && (
                      <div className="flex items-start gap-2 text-sm lg:text-base text-zinc-500 dark:text-zinc-400 italic mb-6 lg:mb-8">
                        <Lightbulb size={16} className="shrink-0 mt-0.5 text-amber-500" />
                        <span>{currentData.vibeTip}</span>
                      </div>
                    )}
                  </>
                )}

                {/* Prompt Builder — hidden during an active quiz so it doesn't reveal the answer */}
                <div className={`mb-8 ${showQuiz ? 'hidden' : ''}`}>
                  <PromptBuilder
                    data={currentData}
                    activeOptions={activeOptions}
                    onOptionToggle={toggleOption}
                    categoryColors={activeCat}
                    onCopy={handleCopyPrompt}
                  />
                </div>

                {/* Compare — below spec generator */}
                {!showQuiz && siblings.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-6 lg:mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-1">
                      Compare
                    </span>
                    {siblings.map(sib => (
                      <button
                        key={sib.id}
                        onClick={() => setCompareWith(sib.id)}
                        className={`px-3 py-1 rounded-full text-sm lg:text-base font-medium border border-zinc-200 dark:border-zinc-700 ${activeCat.text} hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors`}
                      >
                        vs {sib.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Resize handle — desktop only */}
          {infoOpen && (
            <div
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
              className="hidden lg:flex w-1.5 hover:w-2.5 items-center justify-center cursor-col-resize bg-transparent hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 transition-all group/resize shrink-0 z-20"
            >
              <GripVertical size={14} className="text-transparent group-hover/resize:text-zinc-500 dark:group-hover/resize:text-zinc-400 transition-colors" />
            </div>
          )}

          {/* Main Content — Live Preview */}
          <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 relative overflow-hidden flex-col bg-zinc-50 dark:bg-zinc-900`}>
            {/* Subtle color glow */}
            <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${navAccentColors.gradient} opacity-[0.04] blur-3xl pointer-events-none transition-all duration-700`} />
            <div className={`absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br ${navAccentColors.gradient} opacity-[0.03] blur-3xl pointer-events-none transition-all duration-700`} />

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

            {/* Demo area — fills available space */}
            <div className="w-full h-full relative z-10 flex flex-col">
              <Suspense fallback={
                <div className="flex-1 flex items-center justify-center text-zinc-400 dark:text-zinc-600 text-base">
                  Loading…
                </div>
              }>
                <DemoComponent demoId={activeItem} activeOptions={activeOptions} />
              </Suspense>
            </div>
          </main>
        </div>
        )}

        {!showWelcome && <Footer />}
      </div>
    </div>
  );
}
