import { useState, useEffect, useMemo, useRef, useCallback, Suspense } from 'react';
import { BookOpen, PanelLeftClose, GripVertical, Eye, FileText, GraduationCap, MousePointerClick } from 'lucide-react';

import TopNav        from './components/layout/TopNav';
import Footer        from './components/layout/Footer';
import PromptBuilder from './components/ui/PromptBuilder';
import DefinitionPanel from './components/ui/DefinitionPanel';
import WelcomeScreen from './components/WelcomeScreen';
import FeatureTour, { useTourOffer } from './components/FeatureTour';
import CheatSheet    from './components/CheatSheet';
import CompareView    from './components/learn/CompareView';
import GlossaryIndex  from './components/learn/GlossaryIndex';
import LearningCheckpointModal from './components/learn/LearningCheckpointModal';
import BuildLiteracyView from './components/learn/BuildLiteracyView';
import BuildLiteracyIndex from './components/learn/BuildLiteracyIndex';
import ScoreBreakdownModal from './components/learn/ScoreBreakdownModal';
import ProofView from './components/learn/ProofView';
import TopicTierBadge from './components/learn/TopicTierBadge';
import ProgressToast from './components/learn/ProgressToast';
import FloatingLearningHud from './components/learn/FloatingLearningHud';
import PatternStudioFrame from './components/demos/PatternStudioFrame';
import useExploreMode from './hooks/useExploreMode';
import useLearningCheckpoints from './hooks/useLearningCheckpoints';
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
import {
  COMPACT_PATTERN_DEMO_IDS,
  DEMO_REGISTRY,
  MOTION_PATTERN_DEMO_IDS,
} from './data/demoRegistry';
import { decodeProof } from './lib/proof';
import { levelFor } from './lib/scoring';
import { goalProgress, reviewsCopy } from './lib/progressCoaching';
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
  const [showBuildIndex, setShowBuildIndex] = useState(false);
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
    try {
      const saved = localStorage.getItem('vg-learn-mode');
      return saved === null ? true : saved === 'true';
    } catch {
      return true;
    }
  });
  const [toasts, setToasts]               = useState([]);
  const [activeOptions, setActiveOptions] = useState(new Set());
  const searchInputRef = useRef(null);
  const categories = useCategories();
  const explore = useExploreMode(categories, BUILD_LITERACY_CLUSTERS);
  const previousScoreRef = useRef(explore.score.total);
  const pendingScoreEventRef = useRef(null);
  const toastSequenceRef = useRef(0);
  const lastLearningCueRef = useRef('');
  const learning = useLearningCheckpoints({
    enabled: learnMode && !showWelcome,
    section: siteSection,
    activeGlossaryId: activeItem,
    activeBuildId: activeBuildTopic,
  });
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

  const dismissGlobalToast = useCallback((id) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  const addGlobalToast = useCallback((toast, timeout = 6500) => {
    toastSequenceRef.current += 1;
    const id = `${Date.now()}-${toastSequenceRef.current}`;
    const nextToast = typeof toast === 'string'
      ? { id, kind: 'progress', title: toast }
      : { ...toast, id };
    setToasts((previous) => {
      const withoutGroup = nextToast.group
        ? previous.filter((item) => item.group !== nextToast.group)
        : previous;
      return [...withoutGroup.slice(-2), nextToast];
    });
    window.setTimeout(() => dismissGlobalToast(id), timeout);
    return id;
  }, [dismissGlobalToast]);

  const toggleOption = (id, exclusiveIds = []) => {
    const next = new Set(activeOptions);
    if (exclusiveIds.length > 0) {
      exclusiveIds.forEach((optionId) => next.delete(optionId));
      next.add(id);
    } else if (next.has(id)) next.delete(id);
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

  const handleCopyPrompt = (topicId = activeItem) => {
    if (!topicId || explore.copied.has(topicId)) return;
    pendingScoreEventRef.current = { kind: 'prompt' };
    explore.markCopied(topicId);
  };

  const toggleLearnMode = () => {
    setLearnMode(prev => {
      const next = !prev;
      try { localStorage.setItem('vg-learn-mode', String(next)); } catch {}
      return next;
    });
  };

  const continueLearning = useCallback(() => {
    if (!learnMode) {
      setLearnMode(true);
      try { localStorage.setItem('vg-learn-mode', 'true'); } catch {}
    }
    setShowScoreBreakdown(false);
    setShowProof(false);
    setInfoOpen(true);
    setMobileView('info');
  }, [learnMode]);

  const handleQuizRecorded = ({ count = 0 } = {}) => {
    pendingScoreEventRef.current = { kind: 'review', count };
  };

  const currentData  = glossary[activeItem] || glossary['modal'];
  const DemoComponent = DEMO_REGISTRY[activeItem] || DEMO_REGISTRY['modal'];
  const demoOwnsStudio = COMPACT_PATTERN_DEMO_IDS.has(activeItem) || MOTION_PATTERN_DEMO_IDS.has(activeItem);

  // Flat list of all component IDs for prev/next navigation
  const allItems = useMemo(() => categories.flatMap(c => c.items.map(i => i.id)), [categories]);
  const currentIndex = allItems.indexOf(activeItem);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  const prevData = prevItem ? glossary[prevItem] : null;
  const nextData = nextItem ? glossary[nextItem] : null;

  const activeBuildIndex = BUILD_TOPIC_IDS.indexOf(activeBuildTopic);
  const prevBuildTopic = activeBuildIndex > 0 ? BUILD_TOPIC_IDS[activeBuildIndex - 1] : null;
  const nextBuildTopic = activeBuildIndex < BUILD_TOPIC_IDS.length - 1
    ? BUILD_TOPIC_IDS[activeBuildIndex + 1]
    : null;
  const sequenceNavigationBlocked = Boolean(
    showCheatSheet ||
    compareWith ||
    showGlossaryIndex ||
    showBuildIndex ||
    showScoreBreakdown ||
    showProof ||
    showTour
  );

  // Left/right moves through the teaching sequence. Inputs and widgets that
  // use arrow keys keep ownership of them, and open dialogs pause navigation.
  useEffect(() => {
    const handleSequenceKey = (event) => {
      if (
        showWelcome ||
        sequenceNavigationBlocked ||
        event.defaultPrevented ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
      ) return;

      const target = event.target;
      const arrowOwnedByControl = target?.closest?.(
        'input, textarea, select, [contenteditable="true"], [role="slider"], [role="spinbutton"], [role="listbox"], [role="menu"], [role="menubar"], [role="tablist"], [role="grid"], [role="tree"]'
      );
      const blockingLayerOpen = document.querySelector('[role="dialog"]');
      if (arrowOwnedByControl || blockingLayerOpen) return;

      const movingBackward = event.key === 'ArrowLeft';
      const destination = siteSection === 'build'
        ? (movingBackward ? prevBuildTopic : nextBuildTopic)
        : (movingBackward ? prevItem : nextItem);

      if (!destination) return;
      event.preventDefault();
      if (siteSection === 'build') setActiveBuildTopic(destination);
      else setActiveItem(destination);
    };

    window.addEventListener('keydown', handleSequenceKey);
    return () => window.removeEventListener('keydown', handleSequenceKey);
  }, [
    showWelcome,
    sequenceNavigationBlocked,
    siteSection,
    prevItem,
    nextItem,
    prevBuildTopic,
    nextBuildTopic,
  ]);

  const activeCategory = useMemo(() =>
    categories.find(c => c.items.some(i => i.id === activeItem)),
    [activeItem, categories]
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
  }, [activeCategory, categories, glossary]);

  const glossaryCheckpointItems = useMemo(
    () => (learning.sections.glossary.checkpoint || [])
      .map((id) => {
        const data = glossary[id];
        if (!data) return null;
        return {
          id,
          title: data.title || id,
          definition: data.definition || '',
        };
      })
      .filter(Boolean),
    [learning.sections.glossary.checkpoint, glossary]
  );
  const showCheckpoint = learnMode && glossaryCheckpointItems.length === learning.size;
  const learningProgress = {
    count: learning.current.checkpoint ? learning.size : learning.current.seen.length,
    total: learning.size,
    checkpointReady: !!learning.current.checkpoint,
  };

  // Turn point changes into useful coaching. Ordinary visits stay quiet, while
  // meaningful actions explain what they earned and where the learner stands.
  useEffect(() => {
    const previous = previousScoreRef.current;
    const total = explore.score.total;
    if (total <= previous) {
      previousScoreRef.current = total;
      return;
    }

    const gained = total - previous;
    const previousLevel = levelFor(previous);
    const currentLevel = levelFor(total);
    const pending = pendingScoreEventRef.current;
    const next = currentLevel.next;
    const nextGoal = next ? goalProgress(total, next.min) : null;
    const target = next && nextGoal
      ? { label: next.label, remaining: nextGoal.remaining, percent: nextGoal.percent }
      : null;

    previousScoreRef.current = total;
    pendingScoreEventRef.current = null;

    if (currentLevel.current.id !== previousLevel.current.id) {
      addGlobalToast({
        kind: 'level',
        title: `${currentLevel.current.label} unlocked`,
        points: gained,
        message: currentLevel.current.id === 'tinkerer'
          ? 'You reached the class requirement. Your proof is ready whenever you are.'
          : currentLevel.current.blurb,
        target,
        actionLabel: 'See the next mission',
        onAction: () => setShowScoreBreakdown(true),
      }, 9000);
      return;
    }

    if (pending?.kind === 'review') {
      addGlobalToast({
        group: 'learning-cue',
        kind: 'review',
        title: 'Review complete',
        points: gained,
        message: `${pending.count || 5} answers recorded. ${nextGoal ? reviewsCopy(nextGoal.reviewRounds) + ` can reach ${next.label}.` : 'Keep revisiting what you know.'}`,
        target,
        actionLabel: 'See my progress',
        onAction: () => setShowScoreBreakdown(true),
      }, 8500);
      return;
    }

    if (pending?.kind === 'prompt') {
      addGlobalToast({
        kind: 'progress',
        title: 'Prompt marked Used',
        points: gained,
        message: nextGoal
          ? `${nextGoal.remaining} points left to ${next.label}. Try the prompt, then keep moving.`
          : 'You turned the vocabulary into something you can use.',
        target,
      });
    }
  }, [addGlobalToast, explore.score.total]);

  // Coach the five-item learning rhythm without interrupting every page.
  useEffect(() => {
    if (!learnMode || showWelcome) return;
    const current = learning.current;
    const checkpointKey = current.checkpoint?.join('|') || '';
    const count = current.checkpoint ? learning.size : current.seen.length;
    const cue = checkpointKey ? 'ready' : (count === 3 || count === 4 ? `count-${count}` : null);
    if (!cue) return;

    const cueKey = `${siteSection}-${current.completed}-${cue}`;
    if (lastLearningCueRef.current === cueKey) return;
    lastLearningCueRef.current = cueKey;

    const next = explore.level.next;
    const nextGoal = next ? goalProgress(explore.score.total, next.min) : null;
    const target = next && nextGoal
      ? { label: next.label, remaining: nextGoal.remaining, percent: nextGoal.percent }
      : null;

    if (checkpointKey) {
      addGlobalToast({
        group: 'learning-cue',
        kind: 'review',
        title: 'Five-item review unlocked',
        message: `Answer all five to earn up to 25 points. ${nextGoal ? reviewsCopy(nextGoal.reviewRounds) + ` can reach ${next.label}.` : ''}`.trim(),
        target,
        actionLabel: 'Start review',
        onAction: continueLearning,
      }, 9000);
      return;
    }

    const remainingItems = learning.size - count;
    addGlobalToast({
      group: 'learning-cue',
      kind: 'progress',
      title: `${remainingItems} more ${remainingItems === 1 ? 'item' : 'items'} to your review`,
      message: 'Keep moving through different topics. The quiz appears after item five.',
      target,
    });
  }, [
    addGlobalToast,
    continueLearning,
    explore.level.next,
    explore.score.total,
    learnMode,
    learning.current,
    learning.size,
    showWelcome,
    siteSection,
  ]);

  const hudIsBuild = siteSection === 'build';
  const hudPrevious = hudIsBuild
    ? (prevBuildTopic ? { id: prevBuildTopic, title: getBuildTopic(prevBuildTopic)?.title || prevBuildTopic } : null)
    : (prevItem ? { id: prevItem, title: prevData?.title || prevItem } : null);
  const hudNext = hudIsBuild
    ? (nextBuildTopic ? { id: nextBuildTopic, title: getBuildTopic(nextBuildTopic)?.title || nextBuildTopic } : null)
    : (nextItem ? { id: nextItem, title: nextData?.title || nextItem } : null);
  const hudProgress = hudIsBuild ? explore.buildProgress : explore.progress;
  const hudProgressSections = hudIsBuild
    ? BUILD_LITERACY_CLUSTERS.map((cluster) => ({
        id: cluster.id,
        name: cluster.title,
        items: cluster.topics,
        colors: getBuildClusterColors(cluster.id),
      }))
    : categories.map((category) => ({
        id: category.id,
        name: category.name,
        items: category.items,
        colors: CATEGORY_COLORS[category.id],
      }));

  return (
    <div
      data-theme={darkMode ? 'dark' : 'light'}
      className={`flex flex-col h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden transition-colors duration-300 ${darkMode ? 'dark' : ''}`}
    >
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

      <BuildLiteracyIndex
        isOpen={showBuildIndex && !showWelcome}
        onClose={() => setShowBuildIndex(false)}
        onSelectTopic={(id) => {
          setSiteSection('build');
          setActiveBuildTopic(id);
        }}
        mastered={explore.mastered}
      />

      <ScoreBreakdownModal
        isOpen={showScoreBreakdown && !showWelcome}
        onClose={() => setShowScoreBreakdown(false)}
        score={explore.score}
        level={explore.level}
        learningProgress={learningProgress}
        onContinueLearning={continueLearning}
        onOpenProof={() => { setShowScoreBreakdown(false); setProofSnapshot(null); setShowProof(true); }}
      />

      <ProofView
        isOpen={showProof}
        onClose={() => { setShowProof(false); setProofSnapshot(null); if (window.location.hash.startsWith('#proof=')) window.history.replaceState(null, '', window.location.pathname); }}
        score={explore.score}
        level={explore.level}
        badges={explore.badges}
        proofSnapshot={proofSnapshot}
        onContinueLearning={continueLearning}
      />

      {/* Top Navigation */}
      {!showWelcome && (
        <TopNav
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          learnMode={learnMode}
          toggleLearnMode={toggleLearnMode}
          learningProgress={learningProgress}
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
          onOpenBuildIndex={() => setShowBuildIndex(true)}
          onOpenScoreBreakdown={() => setShowScoreBreakdown(true)}
          onStartTour={() => setShowTour(true)}
          tourForceMenu={tourForceMenu}
          authState={authState}
          syncStatus={cloudSync.status}
          onOpenProof={() => { setProofSnapshot(null); setShowProof(true); }}
          showLearningControls={false}
        />
      )}

      {!showWelcome && (
        <FloatingLearningHud
          previous={hudPrevious}
          next={hudNext}
          currentPosition={hudIsBuild ? activeBuildIndex + 1 : currentIndex + 1}
          total={hudIsBuild ? BUILD_TOPIC_IDS.length : allItems.length}
          onPrevious={() => {
            if (hudIsBuild && prevBuildTopic) setActiveBuildTopic(prevBuildTopic);
            if (!hudIsBuild && prevItem) setActiveItem(prevItem);
          }}
          onNext={() => {
            if (hudIsBuild && nextBuildTopic) setActiveBuildTopic(nextBuildTopic);
            if (!hudIsBuild && nextItem) setActiveItem(nextItem);
          }}
          itemLabel={hudIsBuild ? 'topic' : 'component'}
          ariaLabel={hudIsBuild ? 'Build Literacy progression' : 'Glossary progression'}
          progress={hudProgress}
          progressSections={hudProgressSections}
          visited={explore.visited}
          sectionLabel={hudIsBuild ? 'Build literacy progress' : 'UI glossary progress'}
          score={explore.score}
          level={explore.level}
          learningProgress={learningProgress}
          accentClass={navAccentColors.accent}
          onOpenScoreDetails={() => setShowScoreBreakdown(true)}
          onOpenProof={() => { setProofSnapshot(null); setShowProof(true); }}
          onContinueLearning={continueLearning}
        />
      )}

      {!showWelcome && siteSection === 'glossary' && showCheckpoint && (
        <LearningCheckpointModal
          items={glossaryCheckpointItems}
          questionPool={quizPool}
          attemptsByTopic={explore.attempts}
          onRecordAttempt={explore.recordQuizAttempt}
          onQuizComplete={handleQuizRecorded}
          onComplete={() => learning.completeCheckpoint('glossary')}
          onSkip={() => learning.skipCheckpoint('glossary')}
          categoryColors={activeCat}
        />
      )}

      {/* Global Toast Container */}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <ProgressToast key={t.id} toast={t} onDismiss={dismissGlobalToast} />
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
            attempts={explore.attempts}
            recordQuizAttempt={explore.recordQuizAttempt}
            onQuizComplete={handleQuizRecorded}
            onCopyPrompt={() => handleCopyPrompt(activeBuildTopic)}
            tiers={explore.tiers}
            learningCheckpointIds={learning.sections.build.checkpoint}
            learningProgress={{
              count: learning.sections.build.checkpoint
                ? learning.size
                : learning.sections.build.seen.length,
              total: learning.size,
              checkpointReady: !!learning.sections.build.checkpoint,
            }}
            onCompleteLearningCheckpoint={() => learning.completeCheckpoint('build')}
            onSkipLearningCheckpoint={() => learning.skipCheckpoint('build')}
            panelWidth={panelWidth}
            setPanelWidth={setPanelWidth}
            isDesktop={isDesktop}
            infoOpen={infoOpen}
            setInfoOpen={setInfoOpen}
            showProgressionNav={false}
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
                <div className="flex items-start justify-between mb-4 lg:mb-5">
                  <div>
                    <div className="flex items-center flex-wrap gap-2 lg:gap-2.5 mb-2 lg:mb-3">
                      <div className={`w-2.5 lg:w-3.5 h-2.5 lg:h-3.5 rounded-full ${activeCat.dot}`} />
                      <span className={`text-xs lg:text-base font-bold uppercase tracking-wider ${activeCat.accent}`}>
                        Definition
                      </span>
                      <button
                        type="button"
                        onClick={toggleLearnMode}
                        aria-pressed={learnMode}
                        aria-label={learnMode ? 'Turn off Learning Mode' : 'Turn on Learning Mode'}
                        className="group relative ml-1 inline-flex items-center justify-center min-h-[44px] min-w-[44px] h-11 shrink-0 bg-transparent"
                      >
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs lg:text-sm font-semibold border transition-colors ${
                            learnMode
                              ? 'bg-indigo-600 border-indigo-600 text-white group-hover:bg-indigo-500'
                              : 'bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800'
                          }`}
                        >
                          <GraduationCap size={13} />
                          {learnMode
                            ? (showCheckpoint ? 'Quiz ready' : `Learning ${learning.sections.glossary.seen.length}/${learning.size}`)
                            : 'Learning off'}
                        </span>
                        <HoverTip text={learnMode ? 'Turn off Learning Mode' : 'Turn on Learning Mode'} />
                      </button>
                      <TopicTierBadge tier={explore.tiers?.[activeItem]} className="ml-1" />
                    </div>
                    <h1 className="text-[clamp(2.5rem,3.75vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-zinc-900 dark:text-white">
                      {currentData.title}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
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

                <DefinitionPanel
                  summary={currentData.definition}
                  details={currentData.details}
                  resetKey={activeItem}
                  categoryColors={activeCat}
                />

                <div data-tour="prompt-builder" className="mb-8">
                  <PromptBuilder
                    data={currentData}
                    activeOptions={activeOptions}
                    onOptionToggle={toggleOption}
                    categoryColors={activeCat}
                    onCopy={handleCopyPrompt}
                  />
                </div>

                {/* Compare, below spec generator */}
                {siblings.length > 0 && (
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
                {demoOwnsStudio ? (
                  <DemoComponent
                    demoId={activeItem}
                    activeOptions={activeOptions}
                    onOptionToggle={toggleOption}
                  />
                ) : (
                  <PatternStudioFrame
                    demoId={activeItem}
                    data={currentData}
                    activeOptions={activeOptions}
                    onOptionToggle={toggleOption}
                    fill
                  >
                    <DemoComponent
                      demoId={activeItem}
                      activeOptions={activeOptions}
                      onOptionToggle={toggleOption}
                    />
                  </PatternStudioFrame>
                )}
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
