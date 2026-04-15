import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Search, ChevronDown, X, Home } from 'lucide-react';
import { CATEGORIES, CATEGORY_COLORS } from '../../data/categories';

function Dropdown({ label, icon, color, children, isOpen, onToggle, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm font-semibold ${
          isOpen
            ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white'
            : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600'
        }`}
      >
        {icon}
        <div className="flex flex-col items-start">
          {label.sub && <span className={`text-[9px] font-bold uppercase tracking-wider leading-none ${color || 'text-zinc-400'}`}>{label.sub}</span>}
          <span className="leading-tight">{label.main}</span>
        </div>
        <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 min-w-[220px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 py-1.5 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

export default function TopNav({ darkMode, setDarkMode, activeItem, setActiveItem, categories, activeCatColors, onGetStarted, searchInputRef }) {
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

  // Cmd+K
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
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left: Logo + Dropdowns */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGetStarted}
            className="flex items-center gap-2 font-bold text-lg tracking-tight text-zinc-900 dark:text-white shrink-0"
            title="Welcome screen"
          >
            <img src="/logo.png" alt="VibeGlossary" className="w-8 h-8 rounded-lg object-cover" />
            <span className="hidden sm:inline">VibeGlossary</span>
          </button>

          <div className="hidden md:flex h-6 w-px bg-zinc-200 dark:bg-zinc-800" />

          {/* Category Dropdown */}
          <div className="hidden md:block">
            <Dropdown
              label={{ sub: 'Category', main: activeCat?.name || 'Overlays' }}
              icon={<div className={`w-2.5 h-2.5 rounded-full ${catColors.dot}`} />}
              color={catColors.accent}
              isOpen={openDropdown === 'category'}
              onToggle={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
              onClose={() => setOpenDropdown(null)}
            >
              {categories.map(cat => {
                const cc = CATEGORY_COLORS[cat.id];
                const isActive = activeCat?.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? `${cc.bg} ${cc.text} font-semibold`
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${cc.dot}`} />
                    {cat.icon}
                    <span className="font-medium">{cat.name}</span>
                    <span className="ml-auto text-xs text-zinc-400">{cat.items.length}</span>
                  </button>
                );
              })}
            </Dropdown>
          </div>

          {/* Component Dropdown */}
          <div className="hidden md:block">
            <Dropdown
              label={{ sub: 'Component', main: activeItemData?.name || 'Modal' }}
              icon={activeCat?.icon || null}
              color={catColors.accent}
              isOpen={openDropdown === 'component'}
              onToggle={() => setOpenDropdown(openDropdown === 'component' ? null : 'component')}
              onClose={() => setOpenDropdown(null)}
            >
              {activeCat?.items.map(item => {
                const isActive = item.id === activeItem;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectComponent(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? `${catColors.bg} ${catColors.text} font-semibold`
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </Dropdown>
          </div>
        </div>

        {/* Right: Search + Controls */}
        <div className="flex items-center gap-2">
          {/* Search trigger */}
          <button
            onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => searchInputRef.current?.focus(), 50); }}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
          >
            <Search size={14} />
            <span className="hidden sm:inline text-zinc-400">Search...</span>
            <kbd className="hidden lg:inline text-[10px] font-mono bg-zinc-200 dark:bg-zinc-700 px-1.5 py-0.5 rounded text-zinc-500 dark:text-zinc-400">⌘K</kbd>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={onGetStarted}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
          >
            <Home size={14} />
            Welcome
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 animate-fade-in">
          <div className="max-w-2xl mx-auto relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search all components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
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
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full ${cc.dot}`} />
                      <span className="font-medium text-zinc-900 dark:text-white">{item.name}</span>
                      <span className={`text-xs ${cc.text}`}>{item.catName}</span>
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

      {/* Mobile component picker */}
      <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 flex gap-2 overflow-x-auto">
        {categories.map(cat => {
          const cc = CATEGORY_COLORS[cat.id];
          const isActive = activeCat?.id === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? `${cc.active} shadow-sm`
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : cc.dot}`} />
              {cat.name}
            </button>
          );
        })}
      </div>
    </header>
  );
}
