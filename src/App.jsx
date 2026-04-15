import { useState, useEffect, useMemo, useRef } from 'react';
import { BookOpen, MessageSquare, ArrowRight, PanelLeftClose, SidebarOpen } from 'lucide-react';

import TopNav       from './components/layout/TopNav';
import Sidebar      from './components/layout/Sidebar';
import PromptBuilder from './components/ui/PromptBuilder';
import { CATEGORIES }    from './data/categories';
import { GLOSSARY_DATA } from './data/glossary';

export default function App() {
  const [activeItem, setActiveItem]       = useState('modal');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen]     = useState(true);
  const [infoOpen, setInfoOpen]           = useState(true);
  const [searchTerm, setSearchTerm]       = useState('');
  const [darkMode, setDarkMode]           = useState(true);
  const [activeFilter, setActiveFilter]   = useState(null);
  const [toasts, setToasts]               = useState([]);
  const [activeOptions, setActiveOptions] = useState(new Set());
  const searchInputRef = useRef(null);

  // Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // Reset options when switching components
  useEffect(() => {
    setActiveOptions(new Set());
  }, [activeItem]);

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

  const currentData  = GLOSSARY_DATA[activeItem] || GLOSSARY_DATA['modal'];
  const DemoComponent = currentData.demo;

  const filteredCategories = useMemo(() => {
    let cats = CATEGORIES;
    if (activeFilter) {
      cats = cats.filter(cat => cat.type === activeFilter || cat.name === activeFilter);
    }
    if (!searchTerm) return cats;
    return cats
      .map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter(cat => cat.items.length > 0);
  }, [searchTerm, activeFilter]);

  return (
    <div className={`flex h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>

      {/* Top Navigation */}
      <TopNav
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onGetStarted={() => addGlobalToast('Welcome to Vibe Glossary!')}
      />

      {/* Global Toast Container */}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="bg-zinc-900 text-white px-4 py-2 rounded-md shadow-lg animate-slide-in-right text-sm">
            {t.message}
          </div>
        ))}
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Body */}
      <div className="flex w-full pt-14 h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredCategories={filteredCategories}
          searchInputRef={searchInputRef}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden relative bg-zinc-100 dark:bg-black">

          {/* Floating controls when panels are closed */}
          <div className="absolute top-4 left-4 z-30 flex gap-2">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-md shadow-sm hover:bg-white dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                title="Open Sidebar"
              >
                <SidebarOpen size={18} />
              </button>
            )}
            {!infoOpen && (
              <button
                onClick={() => setInfoOpen(true)}
                className="p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-md shadow-sm hover:bg-white dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                title="Open Definition"
              >
                <BookOpen size={18} />
              </button>
            )}
          </div>

          {/* Info & Prompt Panel */}
          <div className={`border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-y-auto z-10 shadow-lg lg:shadow-none flex flex-col transition-all duration-300 ease-in-out ${infoOpen ? 'lg:w-96' : 'lg:w-0 lg:overflow-hidden lg:border-r-0'}`}>
            <div className="w-full lg:w-96 min-w-[20rem] p-6 flex flex-col min-h-full">

              {/* Definition Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">Definition</span>
                  <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1">
                    {currentData.title}
                  </h1>
                </div>
                <button
                  onClick={() => setInfoOpen(false)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  title="Close Definition"
                >
                  <PanelLeftClose size={18} />
                </button>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-snug font-medium mb-8">
                {currentData.definition}
              </p>

              {/* Prompt Builder */}
              <div className="mb-8">
                <PromptBuilder
                  data={currentData}
                  activeOptions={activeOptions}
                  onOptionToggle={toggleOption}
                />
              </div>

              <div className="space-y-4 mt-auto">
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-3 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-1.5 text-zinc-500 dark:text-zinc-400">
                    <MessageSquare size={12} />
                    <span className="text-[10px] font-bold uppercase">Pro Tip</span>
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 italic">
                    "{currentData.vibeTip}"
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <ArrowRight size={10} /> Distinction
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {currentData.comparison}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            <div className="absolute top-4 right-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-3 py-1 rounded-full shadow-sm z-20 flex items-center space-x-2 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Live Preview</span>
            </div>
            <div className="w-full h-full relative z-10 flex flex-col p-8">
              <DemoComponent activeOptions={activeOptions} />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
