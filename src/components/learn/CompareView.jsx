import { useEffect, Suspense } from 'react';
import { X, ArrowLeftRight } from 'lucide-react';
import { useGlossary } from '../../hooks/useGlossary';
import { useCategories } from '../../hooks/useCategories';
import { DEMO_REGISTRY } from '../../data/demoRegistry';
import { CATEGORY_COLORS } from '../../data/categories';

function categoryForItem(itemId, categories) {
  return categories.find((c) => c.items.some((i) => i.id === itemId));
}

function ComponentColumn({ itemId, colors }) {
  const glossary = useGlossary();
  const categories = useCategories();
  const data = glossary[itemId];
  if (!data) return null;
  const DemoComponent = DEMO_REGISTRY[itemId];
  const categoryFor = (id) => categories.find(c => c.items.some(i => i.id === id));

  return (
    <div className="flex-1 min-w-0 flex flex-col bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="p-5 lg:p-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
          <span className={`text-xs lg:text-sm font-bold uppercase tracking-wider ${colors.accent}`}>
            {categoryForItem(itemId, categories)?.name}
          </span>
        </div>
        <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">
          {data.title}
        </h3>
        <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {data.definition}
        </p>
        {data.comparison && (
          <p className="mt-3 text-sm lg:text-base italic text-zinc-500 dark:text-zinc-400">
            {data.comparison}
          </p>
        )}
      </div>
      <div className="flex-1 min-h-[260px] lg:min-h-[340px] relative bg-white dark:bg-zinc-950 flex items-stretch">
        {DemoComponent ? (
          <Suspense fallback={
            <div className="flex-1 flex items-center justify-center text-zinc-400 text-sm">Loading…</div>
          }>
            <DemoComponent demoId={itemId} activeOptions={new Set()} />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
}

export default function CompareView({ leftId, rightId, onClose, onSelectItem }) {
  const glossary = useGlossary();
  const categories = useCategories();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!leftId || !rightId) return null;
  const left = glossary[leftId];
  const right = glossary[rightId];
  if (!left || !right) return null;

  const leftCat = categoryForItem(leftId, categories);
  const rightCat = categoryForItem(rightId, categories);
  const leftColors = leftCat ? CATEGORY_COLORS[leftCat.id] : CATEGORY_COLORS.overlays;
  const rightColors = rightCat ? CATEGORY_COLORS[rightCat.id] : CATEGORY_COLORS.overlays;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handlePickLeft = () => { onSelectItem?.(leftId); onClose(); };
  const handlePickRight = () => { onSelectItem?.(rightId); onClose(); };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-8 animate-fade-in"
    >
      <div className="w-full max-w-6xl max-h-[92vh] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 lg:px-7 py-4 lg:py-5 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <ArrowLeftRight size={20} className="text-zinc-500 dark:text-zinc-400 shrink-0" />
            <h2 className="text-lg lg:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white truncate">
              {left.title} <span className="text-zinc-400 dark:text-zinc-500 font-medium">vs</span> {right.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Close compare"
          >
            <X size={20} />
          </button>
        </div>

        {/* Columns */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <ComponentColumn itemId={leftId} colors={leftColors} />
            <ComponentColumn itemId={rightId} colors={rightColors} />
          </div>
        </div>

        {/* Footer, pick one */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 px-5 lg:px-7 py-3 lg:py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 shrink-0">
          <span className="text-sm lg:text-base text-zinc-500 dark:text-zinc-400">
            Pick one to open its page
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePickLeft}
              className="flex-1 sm:flex-none px-4 py-2 text-sm lg:text-base rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-semibold transition-colors"
            >
              Open {left.title}
            </button>
            <button
              onClick={handlePickRight}
              className="flex-1 sm:flex-none px-4 py-2 text-sm lg:text-base rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-semibold transition-colors"
            >
              Open {right.title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
