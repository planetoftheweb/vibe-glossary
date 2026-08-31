import { ChevronLeft, ChevronRight } from 'lucide-react';

function ProgressionButton({ direction, item, onClick, itemLabel }) {
  const isPrevious = direction === 'previous';
  const label = isPrevious ? 'Previous' : 'Next';
  const boundaryLabel = isPrevious ? 'Start of list' : 'End of list';
  const Icon = isPrevious ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!item}
      aria-label={item ? `${label} ${itemLabel}: ${item.title}` : `No ${label.toLowerCase()} ${itemLabel}`}
      aria-keyshortcuts={isPrevious ? 'ArrowLeft' : 'ArrowRight'}
      className="group flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5 text-left transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:hover:bg-zinc-800/80"
    >
      {isPrevious && <Icon size={18} className="shrink-0 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />}
      <span className={`min-w-0 flex-1 ${isPrevious ? '' : 'text-right'}`}>
        <span className="block text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <span className="block truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {item?.title || boundaryLabel}
        </span>
      </span>
      {!isPrevious && <Icon size={18} className="ml-auto shrink-0 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />}
    </button>
  );
}

export default function ProgressionNav({
  previous,
  next,
  currentPosition,
  total,
  onPrevious,
  onNext,
  itemLabel = 'item',
  ariaLabel = 'Progression navigation',
  accentClass = 'text-violet-600 dark:text-violet-400',
  className = '',
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className={`flex w-full shrink-0 items-stretch overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/80 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 ${className}`}
    >
      <ProgressionButton
        direction="previous"
        item={previous}
        onClick={onPrevious}
        itemLabel={itemLabel}
      />

      <div className="flex shrink-0 flex-col items-center justify-center border-x border-zinc-200 px-3 py-2 text-center dark:border-zinc-800">
        <span className={`text-xs font-bold ${accentClass}`}>
          {currentPosition} of {total}
        </span>
        <span className="mt-0.5 hidden items-center gap-1 whitespace-nowrap text-xs text-zinc-500 dark:text-zinc-400 lg:flex">
          Use
          <kbd className="rounded border border-zinc-300 bg-white px-1 font-sans dark:border-zinc-700 dark:bg-zinc-950">←</kbd>
          <kbd className="rounded border border-zinc-300 bg-white px-1 font-sans dark:border-zinc-700 dark:bg-zinc-950">→</kbd>
        </span>
      </div>

      <ProgressionButton
        direction="next"
        item={next}
        onClick={onNext}
        itemLabel={itemLabel}
      />
    </nav>
  );
}
