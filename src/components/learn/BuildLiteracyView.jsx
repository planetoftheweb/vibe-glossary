import { BookOpen } from 'lucide-react';
import { BUILD_LITERACY_CLUSTERS, BUILD_LITERACY_INTRO } from '../../data/buildLiteracy';
import { useGlossary } from '../../hooks/useGlossary';

export default function BuildLiteracyView({ onOpenGlossaryEntry }) {
  const glossary = useGlossary();

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-5 lg:px-10 py-8 lg:py-12 pb-24">
        <header className="mb-10 lg:mb-12">
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            Same site · different track
          </p>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            {BUILD_LITERACY_INTRO.title}
          </h1>
          <p className="text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {BUILD_LITERACY_INTRO.lead}
          </p>
        </header>

        {BUILD_LITERACY_CLUSTERS.map(cluster => (
          <section key={cluster.id} className="mb-12 lg:mb-16" aria-labelledby={`cluster-${cluster.id}`}>
            <h2 id={`cluster-${cluster.id}`} className="text-xl lg:text-2xl font-bold text-zinc-900 dark:text-white mb-1">
              {cluster.title}
            </h2>
            <p className="text-base text-zinc-500 dark:text-zinc-400 mb-6">{cluster.summary}</p>
            <ul className="space-y-4">
              {cluster.topics.map(topic => (
                <li key={topic.id}>
                  <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 lg:p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{topic.title}</h3>
                    <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">{topic.definition}</p>
                    {topic.relatedGlossaryIds?.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Related UI terms</p>
                        <div className="flex flex-wrap gap-2">
                          {topic.relatedGlossaryIds.map(gid => (
                            <button
                              key={gid}
                              type="button"
                              onClick={() => onOpenGlossaryEntry?.(gid)}
                              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-sm font-medium bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/20 transition-colors"
                            >
                              <BookOpen size={14} aria-hidden />
                              {glossary[gid]?.title || gid}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
