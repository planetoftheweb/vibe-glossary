import { useEffect } from 'react';
import { SearchX, BookOpen, Compass } from 'lucide-react';

/**
 * Shown when the address names a glossary or build topic that does not exist
 * (#114). DESIGN.md Tone and voice: errors say what happened and how to fix it.
 */
export default function TopicNotFound({ slug, onBrowseGlossary, onBrowseBuild }) {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Topic not found, VibeGlossary';
    return () => { document.title = previous; };
  }, []);

  return (
    <main
      data-testid="topic-not-found"
      className="flex-1 min-h-0 overflow-y-auto vg-scroll-clearance flex items-center justify-center px-5 py-10 bg-white dark:bg-zinc-950"
    >
      <div className="w-full max-w-xl text-center">
        <SearchX size={32} className="mx-auto mb-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
        <h1 className="font-display text-[clamp(1.75rem,5vw,2.5rem)] font-[750] leading-[1.1] tracking-[-0.008em] text-zinc-900 dark:text-white [overflow-wrap:anywhere]">
          We could not find &quot;{slug}&quot;
        </h1>
        <p className="mt-4 text-lg leading-[1.55] text-zinc-600 dark:text-zinc-300">
          There is no glossary or build topic with that name. The link may be old or mistyped.
        </p>
        <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400">
          Search for the word you want with the Search button at the top, or browse the lists.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onBrowseGlossary}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-500 transition-colors"
          >
            <BookOpen size={16} aria-hidden="true" />
            Browse components
          </button>
          <button
            type="button"
            onClick={onBrowseBuild}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold text-base hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Compass size={16} aria-hidden="true" />
            Browse build topics
          </button>
        </div>
      </div>
    </main>
  );
}
