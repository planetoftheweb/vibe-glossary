import {
  GraduationCap, BookOpen, Lightbulb, PanelLeftClose,
} from 'lucide-react';
import DefinitionPanel from '../ui/DefinitionPanel';
import ProgressionNav from '../ui/ProgressionNav';
import TopicTierBadge from './TopicTierBadge';
import HoverTip from '../ui/HoverTip';
import { getBuildClusterColors } from '../../data/buildLiteracy';
import { tierFor } from '../../lib/scoring';

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
  pastAttempts = [],
  topicTier,
  onCloseInfo,
  currentPosition = 1,
  totalTopics = 1,
  learningProgress = { count: 0, total: 5, checkpointReady: false },
  showProgressionNav = true,
}) {
  const cc = getBuildClusterColors(cluster?.id);
  const checkpointReady = learnMode && learningProgress.checkpointReady;

  if (!topic) return null;

  const summary = topic.summary || topic.definition;

  return (
    <div className="p-5 lg:p-10 xl:p-12 flex flex-col min-h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 lg:mb-5 gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center flex-wrap gap-2 lg:gap-2.5 mb-2 lg:mb-3">
            <div className={`w-2.5 lg:w-3.5 h-2.5 lg:h-3.5 rounded-full ${cc.dot}`} />
            <span className={`text-xs lg:text-base font-bold uppercase tracking-wider ${cc.accent}`}>
              {cluster?.title || 'Build literacy'}
            </span>
            <button
              type="button"
              onClick={toggleLearnMode}
              aria-pressed={learnMode}
              aria-label={learnMode ? 'Turn off Learning Mode' : 'Turn on Learning Mode'}
              className="group relative ml-1 inline-flex items-center justify-center min-h-[44px] min-w-[44px] bg-transparent"
            >
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs lg:text-sm font-semibold border transition-colors ${
                  learnMode
                    ? 'bg-indigo-600 border-indigo-600 text-white group-hover:bg-indigo-500'
                    : 'bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800'
                }`}
              >
                <GraduationCap size={13} />
                {learnMode
                  ? (checkpointReady ? 'Quiz ready' : `Learning ${learningProgress.count}/${learningProgress.total}`)
                  : 'Learning off'}
              </span>
              <HoverTip text={learnMode ? 'Turn off Learning Mode' : 'Turn on Learning Mode'} />
            </button>
            <TopicTierBadge
              tier={topicTier || tierFor({ visited: true, attempts: pastAttempts })}
              className="ml-1"
            />
          </div>
          <h1 className="text-[clamp(2.5rem,3.75vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-zinc-900 dark:text-white">
            {topic.title}
          </h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {onCloseInfo && (
            <button
              type="button"
              onClick={onCloseInfo}
              className="group relative hidden lg:flex items-center justify-center min-w-[44px] min-h-[44px] p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Close definition panel"
            >
              <PanelLeftClose size={18} />
              <HoverTip text="Close panel" align="right" />
            </button>
          )}
        </div>
      </div>

      {showProgressionNav && (
        <ProgressionNav
          previous={prevTopic}
          next={nextTopic}
          currentPosition={currentPosition}
          total={totalTopics}
          onPrevious={() => prevTopic && onSelectTopic(prevTopic.id)}
          onNext={() => nextTopic && onSelectTopic(nextTopic.id)}
          itemLabel="topic"
          ariaLabel="Build Literacy progression"
          accentClass={cc.accent}
          className="mb-4 lg:mb-8"
        />
      )}

      <DefinitionPanel
        summary={summary}
        details={topic.details}
        resetKey={topic.id}
        categoryColors={cc}
      />

      {/* Vibe tip */}
      {topic.vibeTip && (
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
      {topic.comparison && (
        <div className="mb-6 lg:mb-8">
          <p className="text-xs lg:text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Compare
          </p>
          <p className="text-base lg:text-lg italic text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {topic.comparison}
          </p>
        </div>
      )}

      {/* Sibling chips, hop to other topics in this cluster */}
      {cluster?.topics?.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 mb-6 lg:mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-1">
            More in {cluster.title}
          </span>
          {cluster.topics
            .filter(t => t.id !== topic.id)
            .slice(0, 8)
            .map(sib => (
              <button
                key={sib.id}
                type="button"
                onClick={() => onSelectTopic(sib.id)}
                className={`relative px-3 py-1 min-h-[44px] rounded-full text-sm lg:text-base font-medium border border-zinc-200 dark:border-zinc-700 ${cc.text} hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors`}
              >
                {sib.title}
              </button>
            ))}
        </div>
      )}

      {/* Related UI components */}
      {topic.relatedGlossaryIds?.length > 0 && (
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
