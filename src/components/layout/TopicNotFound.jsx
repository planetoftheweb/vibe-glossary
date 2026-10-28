import { useEffect } from 'react';
import { SearchX } from 'lucide-react';

/**
 * Shown in place when the address names a glossary or build topic that does not
 * exist (#113, #114). Follows DESIGN.md "Not-found pages": one heading, one
 * sentence naming the address, one primary action back to the glossary, and a
 * secondary link that may open search. Never Welcome, never a different term.
 */
export default function TopicNotFound({ address, onBrowseGlossary, onOpenSearch }) {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Page not found, VibeGlossary';
    return () => { document.title = previous; };
  }, []);

  return (
    <main
      data-testid="topic-not-found"
      className="flex-1 min-h-0 overflow-y-auto vg-scroll-clearance flex items-center justify-center px-5 py-10 bg-white dark:bg-zinc-950"
    >
      <div className="w-full max-w-xl text-center">
        <SearchX size={32} className="mx-auto mb-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
        <h1 className="font-display text-[clamp(1.75rem,5vw,2.5rem)] font-[750] leading-[1.1] tracking-[-0.008em] text-zinc-900 dark:text-white">
          We can&apos;t find that page
        </h1>
        <p className="mt-4 text-lg leading-[1.55] text-zinc-600 dark:text-zinc-300">
          There is nothing at <span className="font-mono text-base text-zinc-800 dark:text-zinc-100 [overflow-wrap:anywhere]">{address}</span>, so the link may be old or mistyped.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onBrowseGlossary}
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors"
          >
            Browse the glossary
          </button>
          <button
            type="button"
            onClick={onOpenSearch}
            className="inline-flex items-center justify-center min-h-[44px] px-3 text-base font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 underline-offset-2 hover:underline"
          >
            Search for a term
          </button>
        </div>
      </div>
    </main>
  );
}
