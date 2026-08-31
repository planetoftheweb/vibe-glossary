import { useEffect, useRef } from 'react';
import { CloudUpload, ShieldCheck } from 'lucide-react';

export default function ScoreStoragePrompt({ score = 0, onStore, onLater }) {
  const storeButtonRef = useRef(null);

  useEffect(() => {
    storeButtonRef.current?.focus();
    const handleKey = (event) => {
      if (event.key === 'Escape') onLater?.();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onLater]);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/35 p-4 backdrop-blur-[1px] sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onLater?.();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="score-storage-title"
        aria-describedby="score-storage-description"
        className="w-full max-w-md rounded-2xl border-2 border-zinc-300 bg-white p-5 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 sm:p-6"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <CloudUpload size={22} aria-hidden="true" />
          </span>
          <div>
            <h2 id="score-storage-title" className="text-xl font-extrabold text-zinc-900 dark:text-white">
              Want to store your VibeScore?
            </h2>
            <p id="score-storage-description" className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              You’ve earned {score} {score === 1 ? 'point' : 'points'}. Create a free account to keep your score and progress synced across devices.
            </p>
          </div>
        </div>

        <p className="mt-4 flex items-center gap-2 rounded-xl bg-zinc-100 px-3.5 py-3 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          <ShieldCheck size={17} className="shrink-0 text-emerald-500" aria-hidden="true" />
          Registration is required to store it online. Your local progress stays either way.
        </p>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onLater}
            className="min-h-[44px] rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Not now
          </button>
          <button
            ref={storeButtonRef}
            type="button"
            onClick={onStore}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-500"
          >
            <CloudUpload size={17} aria-hidden="true" />
            Store my score
          </button>
        </div>
      </section>
    </div>
  );
}
