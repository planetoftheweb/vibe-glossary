import { useState, useMemo, useEffect, useRef } from 'react';
import { X, Search, BookOpen } from 'lucide-react';
import { CATEGORY_COLORS } from '../../data/categories';
import { useGlossary } from '../../hooks/useGlossary';
import { useCategories } from '../../hooks/useCategories';

function truncate(str, max = 90) {
  if (!str) return '';
  return str.length > max ? str.slice(0, max).trimEnd() + '…' : str;
}

export default function GlossaryIndex({ isOpen, onClose, onSelectItem }) {
  const glossary = useGlossary();
  const categories = useCategories();
  const [query, setQuery] = useState('');
  const [activeCatId, setActiveCatId] = useState('all');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const allEntries = useMemo(() => {
    return categories.flatMap(cat =>
      cat.items.map(item => {
        const data = glossary[item.id];
        return {
          id: item.id,
          name: item.name,
          definition: data?.definition || '',
          title: data?.title || item.name,
          catId: cat.id,
          catName: cat.name,
        };
      })
    );
  }, [glossary]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allEntries.filter(e => {
      if (activeCatId !== 'all' && e.catId !== activeCatId) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q) ||
        e.definition.toLowerCase().includes(q)
      );
    });
  }, [allEntries, query, activeCatId]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const e of filtered) {
      if (!map.has(e.catId)) map.set(e.catId, []);
      map.get(e.catId).push(e);
    }
    return categories
      .filter(cat => map.has(cat.id))
      .map(cat => ({ ...cat, entries: map.get(cat.id) }));
  }, [filtered]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSelect = (id) => {
    onSelectItem?.(id);
    onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-8 animate-fade-in"
    >
      <div className="w-full max-w-5xl max-h-[92vh] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 lg:px-7 py-4 lg:py-5 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <BookOpen size={22} className="text-zinc-500 dark:text-zinc-400 shrink-0" />
            <h2 className="text-lg lg:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Glossary Index
            </h2>
            <span className="text-sm lg:text-base text-zinc-400 dark:text-zinc-500">
              {allEntries.length} terms
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Close glossary index"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter bar */}
        <div className="px-5 lg:px-7 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0 flex flex-col gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms or definitions..."
              className="w-full pl-10 pr-10 py-2.5 text-base bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <CatChip
              label="All"
              count={allEntries.length}
              active={activeCatId === 'all'}
              onClick={() => setActiveCatId('all')}
            />
            {categories.map(cat => {
              const cc = CATEGORY_COLORS[cat.id];
              return (
                <CatChip
                  key={cat.id}
                  label={cat.name}
                  count={cat.items.length}
                  colors={cc}
                  active={activeCatId === cat.id}
                  onClick={() => setActiveCatId(cat.id)}
                />
              );
            })}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-5 lg:px-7 py-5">
          {grouped.length === 0 ? (
            <div className="text-center text-base text-zinc-400 dark:text-zinc-500 py-12">
              No terms match your search.
            </div>
          ) : (
            grouped.map(cat => {
              const cc = CATEGORY_COLORS[cat.id];
              return (
                <section key={cat.id} className="mb-7 last:mb-0">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${cc.dot}`} />
                    <h3 className={`text-sm lg:text-base font-bold uppercase tracking-wider ${cc.accent}`}>
                      {cat.name}
                    </h3>
                    <span className="text-sm text-zinc-400 dark:text-zinc-500">
                      {cat.entries.length}
                    </span>
                  </div>
                  <ul className="divide-y divide-zinc-100 dark:divide-zinc-800/70 border border-zinc-100 dark:border-zinc-800/70 rounded-xl overflow-hidden">
                    {cat.entries.map(entry => (
                      <li key={entry.id}>
                        <button
                          onClick={() => handleSelect(entry.id)}
                          className="w-full flex items-start gap-3 lg:gap-4 px-4 py-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
                        >
                          <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${cc.dot}`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-base lg:text-lg font-semibold text-zinc-900 dark:text-white">
                              {entry.title}
                            </div>
                            <div className="text-sm lg:text-base text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5">
                              {truncate(entry.definition)}
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function CatChip({ label, count, colors, active, onClick }) {
  const activeCls = colors
    ? `${colors.bg} ${colors.text} border ${colors.border}`
    : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border border-transparent';
  const idleCls = 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-300 border border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800';
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm lg:text-base font-medium transition-colors ${active ? activeCls : idleCls}`}
    >
      <span>{label}</span>
      <span className="text-xs lg:text-sm opacity-70">{count}</span>
    </button>
  );
}
