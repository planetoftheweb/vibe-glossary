import { useState, useEffect, useMemo, useRef } from 'react';
import { MessageSquare, ArrowRight, BookOpen, PanelLeftClose } from 'lucide-react';

import TopNav        from './components/layout/TopNav';
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
  const [darkMode, setDarkMode]           = useState(true);
  const [toasts, setToasts]               = useState([]);
  const [activeOptions, setActiveOptions] = useState(new Set());
  const searchInputRef = useRef(null);
  const explore = useExploreMode();

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
          <div key={t.id} className="bg-zinc-900 text-white px-4 py-2.5 rounded-lg shadow-lg animate-slide-in-right text-sm font-medium">
            {t.message}
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col pt-14 md:pt-14 overflow-hidden">

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
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

          {/* Info & Prompt Panel */}
          {infoOpen && (
            <div className="border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-y-auto z-10 flex flex-col lg:w-[420px] shrink-0">
              <div className="p-6 lg:p-8 flex flex-col min-h-full">

                {/* Definition Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${activeCat.dot}`} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${activeCat.accent}`}>Definition</span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                      {currentData.title}
                    </h1>
                  </div>
                  <button
                    onClick={() => setInfoOpen(false)}
                    className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    title="Close panel"
                  >
                    <PanelLeftClose size={18} />
                  </button>
                </div>

                <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium mb-8">
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
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 mb-2 text-zinc-500 dark:text-zinc-400">
                      <MessageSquare size={14} />
                      <span className="text-xs font-bold uppercase tracking-wide">Pro Tip</span>
                    </div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                      "{currentData.vibeTip}"
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ArrowRight size={12} /> Distinction
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {currentData.comparison}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content — Live Preview */}
          <main className="flex-1 relative overflow-hidden flex flex-col bg-zinc-100 dark:bg-black">
            {/* Subtle color glow */}
            <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${activeCat.gradient} opacity-[0.04] blur-3xl pointer-events-none transition-all duration-700`} />
            <div className={`absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br ${activeCat.gradient} opacity-[0.03] blur-3xl pointer-events-none transition-all duration-700`} />

            {/* Floating controls */}
            <div className="absolute top-4 left-4 z-30 flex gap-2">
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

            {/* Live Preview badge */}
            <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm z-20 flex items-center space-x-2 text-xs font-semibold uppercase tracking-wide pointer-events-none ${activeCat.bg} ${activeCat.border} border ${activeCat.text}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${activeCat.dot} animate-pulse`}></div>
              <span>Live Preview</span>
            </div>

            {/* Demo area */}
            <div className="w-full h-full relative z-10 flex flex-col p-6 lg:p-10">
              <DemoComponent activeOptions={activeOptions} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
