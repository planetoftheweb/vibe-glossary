import { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { BookOpen, PanelLeftClose, GripVertical, Eye, FileText, ChevronLeft, ChevronRight, GraduationCap, MousePointerClick } from 'lucide-react';

import TopNav        from './components/layout/TopNav';
import Footer        from './components/layout/Footer';
import PromptBuilder from './components/ui/PromptBuilder';
import DefinitionPanel from './components/ui/DefinitionPanel';
import WelcomeScreen from './components/WelcomeScreen';
import FeatureTour, { useTourOffer } from './components/FeatureTour';
import CheatSheet    from './components/CheatSheet';
import CompareView    from './components/learn/CompareView';
import GlossaryIndex  from './components/learn/GlossaryIndex';
import QuizCard       from './components/learn/QuizCard';
import PathsLauncher  from './components/learn/PathsLauncher';
import PathView       from './components/learn/PathView';
import BuildLiteracyView from './components/learn/BuildLiteracyView';
import BuildLiteracyIndex from './components/learn/BuildLiteracyIndex';
import BuildPathsLauncher from './components/learn/BuildPathsLauncher';
import BuildPathView from './components/learn/BuildPathView';
import ScoreBreakdownModal from './components/learn/ScoreBreakdownModal';
import ProofView from './components/learn/ProofView';
import TopicTierBadge from './components/learn/TopicTierBadge';
import useExploreMode from './hooks/useExploreMode';
import usePanelResize from './hooks/usePanelResize';
import useAuth from './hooks/useAuth';
import useCloudSync from './hooks/useCloudSync';
import { useGlossary } from './hooks/useGlossary';
import { useCategories } from './hooks/useCategories';
import { CATEGORY_COLORS } from './data/categories';
import {
  BUILD_TOPIC_IDS,
  BUILD_LITERACY_CLUSTERS,
  getBuildTopic,
  getBuildClusterColors,
} from './data/buildLiteracy';
import { DEMO_REGISTRY } from './data/demoRegistry';
import { decodeProof } from './lib/proof';
import { topicFromWindow, syncTopicUrl } from './lib/topicUrl';
import HoverTip from './components/ui/HoverTip';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    if (topicFromWindow()) return false;
    return !localStorage.getItem('vg-visited');
  });
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [compareWith, setCompareWith]     = useState(null);
  const [showGlossaryIndex, setShowGlossaryIndex] = useState(false);
  const [showPaths, setShowPaths] = useState(false);
  const [activePath, setActivePath] = useState(null);
  const [showBuildIndex, setShowBuildIndex] = useState(false);
  const [showBuildPaths, setShowBuildPaths] = useState(false);
  const [activeBuildPath, setActiveBuildPath] = useState(null);
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
  const [showProof, setShowProof] = useState(false);
  const [proofSnapshot, setProofSnapshot] = useState(null);
  const [activeItem, setActiveItem]       = useState(() => {
    const boot = topicFromWindow();
    return boot?.section === 'glossary' ? boot.id : 'modal';
  });
  const [activeBuildTopic, setActiveBuildTopic] = useState(() => {
    const boot = topicFromWindow();
    return boot?.section === 'build' ? boot.id : (BUILD_TOPIC_IDS[0] || 'mvp');
  });
  const [siteSection, setSiteSection]     = useState(() => topicFromWindow()?.section || 'glossary');
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
  const explore = useExploreMode(categories, BUILD_LITERACY_CLUSTERS);
  const glossary = useGlossary();
  // Optional accounts: sign in only to back up progress/badges to the cloud.
  const authState = useAuth();
  const cloudSync = useCloudSync(authState.user, explore.snapshot, explore.importSnapshot);
  const [panelWidth, setPanelWidth] = useState(() => {
    const saved = localStorage.getItem('vg-panel-width');
    return saved ? Number(saved) : 40; // percent
  });
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 1024
  );
  const { containerRef, onResizeStart: handleResizeStart } = usePanelResize(setPanelWidth);
  const [showTour, setShowTour] = useState(false);
  const [tourForceMenu, setTourForceMenu] = useState(false);
  const { shouldOffer: shouldOfferTour, dismiss: dismissTourOffer } = useTourOffer();

  const tourActions = useMemo(() => ({
    openScoreBreakdown: (open) => setShowScoreBreakdown(open),
    openMenu: (open) => setTourForceMenu(open),
  }), []);

  // Keep isDesktop reactive so inline panel width is removed below lg breakpoint.
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  // Handle #proof=... URLs so instructors can verify a student's proof
  useEffect(() => {
    function checkHash() {
      const hash = window.location.hash;
      const match = hash.match(/^#proof=(.+)$/);
      if (match) {
        const snap = decodeProof(match[1]);
        if (snap) {
          setProofSnapshot(snap);
          setShowProof(true);
          setShowWelcome(false);
        }
      }
    }
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Shareable topic URLs. A teaching topic has an address that reloads to
  // the same topic (CLAUDE.md: a glossary you cannot link is not teachable).
  const urlReady = useRef(false);
  useEffect(() => {
    if (showWelcome) return;
    const id = siteSection === 'build' ? activeBuildTopic : activeItem;
    syncTopicUrl(siteSection, id, { replace: !urlReady.current });
    urlReady.current = true;
  }, [showWelcome, siteSection, activeItem, activeBuildTopic]);

  useEffect(() => {
    function applyLocation() {
      const next = topicFromWindow();
      if (!next) return;
      if (next.section === 'build') {
        setSiteSection('build');
        setActiveBuildTopic(next.id);
      } else {
        setSiteSection('glossary');
        setActiveItem(next.id);
      }
      setShowWelcome(false);
    }
    window.addEventListener('popstate', applyLocation);
    window.addEventListener('hashchange', applyLocation);
    return () => {
      window.removeEventListener('popstate', applyLocation);
      window.removeEventListener('hashchange', applyLocation);
    };
  }, []);

  // Reset options when switching components & track visit
  useEffect(() => {
    setActiveOptions(new Set());
    if (!showWelcome) {
      explore.markVisited(activeItem);
    }
  }, [activeItem, showWelcome]);

  // Build literacy: also count time-on-topic toward progress, mirroring how
  // glossary items get marked visited the moment you land on them.
  useEffect(() => {
    if (!showWelcome && siteSection === 'build' && activeBuildTopic) {
      explore.markVisited(activeBuildTopic);
    }
  }, [activeBuildTopic, siteSection, showWelcome]);

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

  const handleStartTour = () => {
    localStorage.setItem('vg-visited', '1');
    setShowWelcome(false);
    dismissTourOffer();
    setTimeout(() => setShowTour(true), 300);
  };

  const handleSelectCategory = (itemId) => {
    setActiveItem(itemId);
    setSiteSection('glossary');
    localStorage.setItem('vg-visited', '1');
    setShowWelcome(false);
  };

  const handleSelectBuildTopic = (topicId) => {
    if (topicId) setActiveBuildTopic(topicId);
    setSiteSection('build');
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
    // Intentionally a no-op: mastery now flows through `recordQuizAttempt`
    // and the auto-promote effect inside useExploreMode. Calling
    // `markMastered` here would short-circuit the second-session pass
    // required to actually master the topic.
  };

  const handleQuizAttempt = (attempt) => {
    explore.recordQuizAttempt(activeItem, attempt);
  };

  // Latest valid+correct attempt timestamp for the active topic, used to
  // enforce the 30-minute counted-pass cooldown without re-scanning history
  // inside QuizCard.
  const cooldownLastTs = useMemo(() => {
    const list = explore.attempts?.[activeItem] || [];
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].valid && list[i].correct) return list[i].ts;
    }
    return null;
  }, [explore.attempts, activeItem]);

  const pastAttempts = explore.attempts?.[activeItem] || [];

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
  const activeBuildClusterId = useMemo(() => {
    if (siteSection !== 'build' || !activeBuildTopic) return null;
    return getBuildTopic(activeBuildTopic)?.clusterId || null;
  }, [siteSection, activeBuildTopic]);

  const navAccentColors = siteSection === 'build'
    ? getBuildClusterColors(activeBuildClusterId)
    : activeCat;

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
  // Quiz stays available even after the topic is "mastered" so a learner can
  // come back, take a fresh variant, and rack up retention points later.
  // Hiding the quiz on mastery would also block the second-session pass
  // required for full mastery in the first place.
  const showQuiz = learnMode;

  const carouselArrows = (
    <div className="flex items-center gap-1.5">
      {prevItem && (
        <button
          onClick={() => setActiveItem(prevItem)}
          className="group relative flex items-center justify-center min-w-[44px] min-h-[44px] bg-transparent"
          aria-label={`Previous: ${prevData?.title}`}
        >
          <span className="w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors flex items-center justify-center">
            <ChevronLeft size={16} className="text-zinc-600 dark:text-zinc-300" />
          </span>
          <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-700 text-right opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-30">
            <span className="block text-xs uppercase tracking-wider text-zinc-400 font-bold">Previous</span>
            <span className="block text-lg font-semibold text-white">{prevData?.title}</span>
          </span>
        </button>
      )}
      {nextItem && (
        <button
          onClick={() => setActiveItem(nextItem)}
          className="group relative flex items-center justify-center min-w-[44px] min-h-[44px] bg-transparent"
          aria-label={`Next: ${nextData?.title}`}
        >
          <span className="w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors flex items-center justify-center">
            <ChevronRight size={16} className="text-zinc-600 dark:text-zinc-300" />
          </span>
          <span className="pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-700 text-right opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-30">
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
          onSelectBuildTopic={handleSelectBuildTopic}
          onStartTour={handleStartTour}
        />
      )}

      <FeatureTour
        isOpen={showTour}
        onClose={() => { setShowTour(false); setTourForceMenu(false); }}
        tourActions={tourActions}
      />

      <CheatSheet
        isOpen={showCheatSheet && !showWelcome}
        onClose={() => setShowCheatSheet(false)}
        onSelectCategory={(itemId) => { setActiveItem(itemId); setSiteSection('glossary'); }}
        onSelectBuildTopic={(topicId) => { setActiveBuildTopic(topicId); setSiteSection('build'); }}
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

      <BuildLiteracyIndex
        isOpen={showBuildIndex && !showWelcome}
        onClose={() => setShowBuildIndex(false)}
        onSelectTopic={(id) => {
          setSiteSection('build');
          setActiveBuildTopic(id);
        }}
        mastered={explore.mastered}
      />

      <BuildPathsLauncher
        isOpen={showBuildPaths && !showWelcome && !activeBuildPath}
        onClose={() => setShowBuildPaths(false)}
        onSelectPath={(path) => { setActiveBuildPath(path); setShowBuildPaths(false); }}
        mastered={explore.mastered}
        badges={explore.badges}
      />

      <BuildPathView
        path={activeBuildPath}
        isOpen={!!activeBuildPath && !showWelcome}
        onClose={() => setActiveBuildPath(null)}
        onAwardBadge={(pathId) => explore.awardBadge(pathId)}
        onSelectTopic={(id) => {
          setSiteSection('build');
          setActiveBuildTopic(id);
        }}
      />

      <ScoreBreakdownModal
        isOpen={showScoreBreakdown && !showWelcome}
        onClose={() => setShowScoreBreakdown(false)}
        score={explore.score}
        level={explore.level}
        onOpenProof={() => { setShowScoreBreakdown(false); setProofSnapshot(null); setShowProof(true); }}
      />

      <ProofView
        isOpen={showProof}
        onClose={() => { setShowProof(false); setProofSnapshot(null); if (window.location.hash.startsWith('#proof=')) window.history.replaceState(null, '', window.location.pathname); }}
        score={explore.score}
        level={explore.level}
        badges={explore.badges}
        proofSnapshot={proofSnapshot}
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
          activeBuildTopic={activeBuildTopic}
          setActiveBuildTopic={setActiveBuildTopic}
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
          onOpenBuildIndex={() => setShowBuildIndex(true)}
          onOpenBuildPaths={() => setShowBuildPaths(true)}
          onOpenScoreBreakdown={() => setShowScoreBreakdown(true)}
          onStartTour={() => setShowTour(true)}
          tourForceMenu={tourForceMenu}
          authState={authState}
          syncStatus={cloudSync.status}
          onOpenProof={() => { setProofSnapshot(null); setShowProof(true); }}
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
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {siteSection === 'build' ? (
          <BuildLiteracyView
            activeTopicId={activeBuildTopic}
            setActiveTopicId={setActiveBuildTopic}
            onOpenGlossaryEntry={(id) => {
              setSiteSection('glossary');
              setActiveItem(id);
            }}
            learnMode={learnMode}
            toggleLearnMode={toggleLearnMode}
            mastered={explore.mastered}
            onMastered={() => {
              // No-op for parity with UI Glossary; mastery flows through
              // recordQuizAttempt + the auto-promote effect.
            }}
            attempts={explore.attempts}
            recordQuizAttempt={explore.recordQuizAttempt}
            tiers={explore.tiers}
            panelWidth={panelWidth}
            setPanelWidth={setPanelWidth}
            isDesktop={isDesktop}
            infoOpen={infoOpen}
            setInfoOpen={setInfoOpen}
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

          {/* Info & Prompt Panel, always visible on desktop, toggled on mobile */}
          {infoOpen && (
            <div data-tour="definition-panel" className={`${mobileView === 'info' ? 'flex' : 'hidden'} lg:flex bg-white dark:bg-zinc-950 overflow-y-auto z-10 flex-col shrink-0 w-full`} style={{ minWidth: 0, ...(isDesktop ? { width: `${panelWidth}%` } : {}) }}>
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
                        aria-label={learnMode ? 'Exit Learn Mode' : 'Turn on Learn Mode (quiz each component)'}
                        className={`group relative ml-1 inline-flex items-center gap-1.5 px-2.5 py-1 before:absolute before:inset-y-[-8px] before:inset-x-[-4px] before:content-[''] rounded-full text-xs lg:text-sm font-semibold border transition-colors ${
                          learnMode
                            ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-500'
                            : 'bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <GraduationCap size={13} />
                        {learnMode ? 'Learn Mode: On' : 'Quiz me'}
                        <HoverTip text={learnMode ? 'Exit Learn Mode' : 'Turn on Learn Mode (quiz each component)'} />
                      </button>
                      <TopicTierBadge tier={explore.tiers?.[activeItem]} className="ml-1" />
                    </div>
                    <h1 className="text-2xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                      {currentData.title}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {carouselArrows}
                    <button
                      onClick={() => setInfoOpen(false)}
                      className="group relative hidden lg:flex items-center justify-center min-w-[44px] min-h-[44px] p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                      aria-label="Close panel"
                    >
                      <PanelLeftClose size={18} />
                      <HoverTip text="Close panel" align="right" />
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
                    variantBank={currentData.quizBank}
                    pastAttempts={pastAttempts}
                    cooldownLastTs={cooldownLastTs}
                    onAttemptComplete={handleQuizAttempt}
                  />
                ) : (
                  <DefinitionPanel
                    summary={currentData.definition}
                    details={currentData.details}
                    resetKey={activeItem}
                    categoryColors={activeCat}
                  />
                )}

                {/* Prompt Builder, hidden during an active quiz so it doesn't reveal the answer */}
                <div data-tour="prompt-builder" className={`mb-8 ${showQuiz ? 'hidden' : ''}`}>
                  <PromptBuilder
                    data={currentData}
                    activeOptions={activeOptions}
                    onOptionToggle={toggleOption}
                    categoryColors={activeCat}
                    onCopy={handleCopyPrompt}
                  />
                </div>

                {/* Compare, below spec generator */}
                {!showQuiz && siblings.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-6 lg:mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-1">
                      Compare
                    </span>
                    {siblings.map(sib => (
                      <button
                        key={sib.id}
                        onClick={() => setCompareWith(sib.id)}
                        className={`relative px-3 py-1 min-h-[44px] rounded-full text-sm lg:text-base font-medium border border-zinc-200 dark:border-zinc-700 ${activeCat.text} hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors`}
                      >
                        vs {sib.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Resize handle, desktop only */}
          {infoOpen && (
            <div
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize panels"
              className="hidden lg:flex w-1.5 hover:w-2.5 items-center justify-center cursor-col-resize bg-transparent hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 transition-all group/resize shrink-0 z-20"
            >
              <GripVertical size={14} className="text-transparent group-hover/resize:text-zinc-500 dark:group-hover/resize:text-zinc-400 transition-colors" />
            </div>
          )}

          {/* Main Content, Live Preview */}
          <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 relative overflow-hidden flex-col bg-zinc-50 dark:bg-zinc-900`}>
            {/* Subtle color glow */}
            <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${navAccentColors.gradient} opacity-[0.04] blur-3xl pointer-events-none transition-all duration-700`} />
            <div className={`absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br ${navAccentColors.gradient} opacity-[0.03] blur-3xl pointer-events-none transition-all duration-700`} />

            {/* Floating controls, desktop only */}
            <div className="hidden lg:flex absolute top-4 left-4 z-30 gap-2">
              {!infoOpen && (
                <button
                  onClick={() => setInfoOpen(true)}
                  className="group relative flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm hover:bg-white dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
                  aria-label="Open Definition"
                >
                  <BookOpen size={18} />
                  <HoverTip text="Open Definition" />
                </button>
              )}
            </div>

            {/* Demo area, fills available space */}
            <div className="w-full h-full relative z-10 flex flex-col">
              {/* TRY IT eyebrow, gives the preview pane context so the demo trigger
                  doesn't float in empty space — especially on mobile */}
              <div className={`flex items-center gap-2 px-4 lg:px-6 pt-3 lg:pt-4 pb-1 text-xs font-bold uppercase tracking-widest ${navAccentColors.text || 'text-indigo-500 dark:text-indigo-400'}`}>
                <MousePointerClick size={14} />
                <span>Try it</span>
              </div>
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
