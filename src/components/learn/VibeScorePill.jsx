import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Compact VibeScore pill for the top nav. Shows the running total + the
 * current level title. Animates a small "+N" when the score climbs so the
 * learner gets immediate feedback without spamming a toast.
 */
export default function VibeScorePill({ score, level, onClick, ariaLabel }) {
  const total = score?.total ?? 0;
  const previous = useRef(total);
  const [delta, setDelta] = useState(null);

  useEffect(() => {
    const prev = previous.current;
    if (total > prev) {
      const gained = total - prev;
      setDelta(gained);
      const t = setTimeout(() => setDelta(null), 1800);
      previous.current = total;
      return () => clearTimeout(t);
    }
    previous.current = total;
  }, [total]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || `VibeScore ${total}, level ${level?.current?.label || ''}`}
      title="See your VibeScore breakdown"
      className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
    >
      <Sparkles size={16} className="text-amber-500 shrink-0" />
      <span className="flex flex-col items-start leading-tight">
        <span className="text-sm font-bold text-zinc-900 dark:text-white tabular-nums">
          {total}
        </span>
        <span className="hidden xl:inline text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
          {level?.current?.label || 'Lurker'}
        </span>
      </span>
      {delta != null && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 right-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500 text-white shadow animate-fade-in"
        >
          +{delta}
        </span>
      )}
    </button>
  );
}
