import { useMemo } from 'react';
import {
  ChevronLeft, ChevronRight, GraduationCap, BookOpen, Lightbulb,
} from 'lucide-react';
import DefinitionPanel from '../ui/DefinitionPanel';
import QuizCard from './QuizCard';
import { BUILD_LITERACY_NAV_COLORS } from '../../data/buildLiteracy';

/**
 * Left-pane topic view for Build Literacy. Mirrors the glossary info pane:
 *   cluster pill + Quiz Me toggle, big title, definition with accordion,
 *   compare chips, related UI components, vibe tip.
 *
 * The right pane (TalkToAiCard) lives in BuildLiteracyView.
 */
export default function BuildTopicView({
  topic,
  cluster,
  glossary,
  prevTopic,
  nextTopic,
  onSelectTopic,
  onOpenGlossaryEntry,
  learnMode,
  toggleLearnMode,
  isMastered,
  onMastered,
  quizPool,
}) {
  const cc = BUILD_LITERACY_NAV_COLORS;
  const showQuiz = learnMode && !isMastered && quizPool.length >= 4;

  const carouselArrows = useMemo(() => (
    <div className="flex items-center gap-1.5">
      {prevTopic && (
        <button
          onClick={() => onSelectTopic(prevTopic.id)}
          className="group relative w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors flex items-center justify-center"
          aria-label={`Previous topic: ${prevTopic.title}`}
        >
          <ChevronLeft size={16} className="text-zinc-600 dark:text-zinc-300" />
          <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-700 text-right opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-30">
            <span className="block text-xs uppercase tracking-wider text-zinc-400 font-bold">Previous</span>
            <span className="block text-lg font-semibold text-white">{prevTopic.title}</span>
          </span>
        </button>
      )}
      {nextTopic && (
        <button
          onClick={() => onSelectTopic(nextTopic.id)}
          className="group relative w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors flex items-center justify-center"
          aria-label={`Next topic: ${nextTopic.title}`}
        >
          <ChevronRight size={16} className="text-zinc-600 dark:text-zinc-300" />
          <span className="pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-700 text-right opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-30">
            <span className="block text-xs uppercase tracking-wider text-zinc-400 font-bold">Next</span>
            <span className="block text-lg font-semibold text-white">{nextTopic.title}</span>
          </span>
        </button>
      )}
    </div>
  ), [prevTopic, nextTopic, onSelectTopic]);

  if (!topic) return null;

  const summary = topic.summary || topic.definition;

  return (
    <div className="p-5 lg:p-10 xl:p-12 flex flex-col min-h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 lg:mb-8 gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center flex-wrap gap-2 lg:gap-2.5 mb-2 lg:mb-3">
            <div className={`w-2.5 lg:w-3.5 h-2.5 lg:h-3.5 rounded-full ${cc.dot}`} />
            <span className={`text-xs lg:text-base font-bold uppercase tracking-wider ${cc.accent}`}>
              {showQuiz ? 'Quiz mode' : cluster?.title || 'Build literacy'}
            </span>
            <button
              type="button"
              onClick={toggleLearnMode}
              aria-pressed={learnMode}
              title={learnMode ? 'Exit Learn Mode' : 'Turn on Learn Mode (quiz each topic)'}
              className={`ml-1 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs lg:text-sm font-semibold border transition-colors ${
                learnMode
                  ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-500'
                  : 'bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <GraduationCap size={13} />
              {learnMode ? 'Learn Mode: On' : 'Quiz me'}
            </button>
            {isMastered && (
              <span className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Mastered
              </span>
            )}
          </div>
          <h1 className="text-2xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {topic.title}
          </h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {carouselArrows}
        </div>
      </div>

      {/* Definition or quiz */}
      {showQuiz ? (
        <QuizCard
          correctId={topic.id}
          correctTitle={topic.title}
          correctDefinition={summary}
          correctComparison={topic.comparison}
          distractorPool={quizPool}
          categoryColors={cc}
          onCorrect={() => onMastered(topic.id)}
        />
      ) : (
        <DefinitionPanel
          summary={summary}
          details={topic.details}
          resetKey={topic.id}
          categoryColors={cc}
        />
      )}

      {/* Vibe tip */}
      {!showQuiz && topic.vibeTip && (
        <div className={`mb-6 lg:mb-8 flex items-start gap-3 px-4 py-3 lg:px-5 lg:py-4 rounded-xl border ${cc.border} ${cc.bg}`}>
          <Lightbulb size={20} className={`shrink-0 mt-0.5 ${cc.accent}`} />
          <div>
            <p className={`text-xs lg:text-sm font-bold uppercase tracking-wider ${cc.text} mb-1`}>
              Vibe tip
            </p>
            <p className="text-base lg:text-lg text-zinc-700 dark:text-zinc-200 leading-relaxed">
              {topic.vibeTip}
            </p>
          </div>
        </div>
      )}

      {/* Comparison */}
      {!showQuiz && topic.comparison && (
        <div className="mb-6 lg:mb-8">
          <p className="text-xs lg:text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Compare
          </p>
          <p className="text-base lg:text-lg italic text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {topic.comparison}
          </p>
        </div>
      )}

      {/* Related UI components */}
      {!showQuiz && topic.relatedGlossaryIds?.length > 0 && (
        <div className="mt-auto pt-6 lg:pt-8 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-xs lg:text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
            Related UI patterns
          </p>
          <div className="flex flex-wrap gap-2">
            {topic.relatedGlossaryIds.map(gid => (
              <button
                key={gid}
                type="button"
                onClick={() => onOpenGlossaryEntry?.(gid)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-sm lg:text-base font-medium ${cc.bg} ${cc.text} hover:opacity-80 border ${cc.border} transition-colors`}
              >
                <BookOpen size={14} aria-hidden />
                {glossary[gid]?.title || gid}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
