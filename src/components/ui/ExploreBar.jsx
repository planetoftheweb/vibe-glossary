import { useState } from 'react';
import { Shuffle, Calendar, Trophy, ChevronDown, ChevronUp, RotateCcw, Check, Copy, Eye } from 'lucide-react';
import { CATEGORY_COLORS } from '../../data/categories';
import { useCategories } from '../../hooks/useCategories';
import { useGlossary } from '../../hooks/useGlossary';

export default function ExploreBar({ explore, activeItem, onSelectItem, activeCatColors }) {
  const categories = useCategories();
  const glossary = useGlossary();
  const [expanded, setExpanded] = useState(false);
  const { componentOfTheDay, progress, visited, copied, surpriseMe } = explore;

  const cotdData = glossary[componentOfTheDay];
  const cotdCat = categories.find(c => c.items.some(i => i.id === componentOfTheDay));
  const cotdColors = cotdCat ? CATEGORY_COLORS[cotdCat.id] : CATEGORY_COLORS.overlays;
  const isCotdActive = activeItem === componentOfTheDay;

  const handleSurprise = () => {
    const id = surpriseMe();
    onSelectItem(id);
  };

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/50">
      {/* Compact bar */}
      <div className="flex items-center justify-between px-5 py-3 gap-4">
        {/* Left: Progress */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" className={activeCatColors.accent} strokeWidth="3"
                  strokeDasharray={`${progress.percent * 0.94} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-zinc-500 dark:text-zinc-400">
                {progress.visited}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-base font-semibold text-zinc-700 dark:text-zinc-300 leading-tight">
                {progress.visited}/{progress.total} explored
              </p>
              <p className="text-sm text-zinc-400 leading-tight">
                {progress.copied} prompts copied
              </p>
            </div>
          </div>
        </div>

        {/* Center: Component of the Day */}
        <button
          onClick={() => onSelectItem(componentOfTheDay)}
          className={`hidden md:flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-base font-semibold transition-all ${
            isCotdActive
              ? `${cotdColors.bg} ${cotdColors.text} ${cotdColors.border} border`
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-transparent'
          }`}
        >
          <Calendar size={15} />
          <span className="text-zinc-400 dark:text-zinc-500">Today:</span>
          <span className={isCotdActive ? '' : 'text-zinc-900 dark:text-white'}>{cotdData?.title || componentOfTheDay}</span>
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSurprise}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-semibold transition-all ${activeCatColors.bg} ${activeCatColors.text} ${activeCatColors.border} border hover:opacity-80`}
          >
            <Shuffle size={17} />
            <span className="hidden sm:inline">Surprise Me</span>
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            title="View progress"
          >
            {expanded ? <ChevronUp size={16} /> : <Trophy size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded progress panel */}
      {expanded && (
        <div className="px-4 pb-4 animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Trophy size={17} className="text-amber-500" />
                Your Progress
              </h3>
              <button
                onClick={explore.resetProgress}
                className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Category breakdown */}
            <div className="space-y-3">
              {categories.map(cat => {
                const cc = CATEGORY_COLORS[cat.id];
                const catVisited = cat.items.filter(i => visited.has(i.id)).length;
                const catCopied = cat.items.filter(i => copied.has(i.id)).length;
                const catPercent = Math.round((catVisited / cat.items.length) * 100);
                const isComplete = catVisited === cat.items.length;

                return (
                  <div key={cat.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${cc.dot}`} />
                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{cat.name}</span>
                        {isComplete && <Check size={12} className="text-emerald-500" />}
                      </div>
                      <span className="text-xs text-zinc-400">{catVisited}/{cat.items.length}</span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-1.5">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${cc.gradient} transition-all duration-500`}
                        style={{ width: `${catPercent}%` }}
                      />
                    </div>

                    {/* Item pills */}
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map(item => {
                        const isVisited = visited.has(item.id);
                        const isCopied = copied.has(item.id);
                        return (
                          <button
                            key={item.id}
                            onClick={() => onSelectItem(item.id)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                              isVisited
                                ? `${cc.bg} ${cc.text} ${cc.border} border`
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                            title={isCopied ? 'Visited & copied' : isVisited ? 'Visited' : 'Not yet explored'}
                          >
                            {isCopied ? <Copy size={8} /> : isVisited ? <Eye size={8} /> : null}
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <p className="text-sm text-zinc-400">
                {progress.percent === 100
                  ? 'You\'ve explored every component!'
                  : `${progress.total - progress.visited} components left to discover`}
              </p>
              <button
                onClick={handleSurprise}
                className={`text-sm font-semibold ${activeCatColors.accent} hover:opacity-80 transition-opacity flex items-center gap-1`}
              >
                <Shuffle size={11} /> Explore next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
