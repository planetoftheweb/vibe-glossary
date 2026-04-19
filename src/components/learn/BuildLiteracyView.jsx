import { useState, useMemo, useEffect } from 'react';
import { FileText, Sparkles, Compass } from 'lucide-react';
import {
  BUILD_LITERACY_CLUSTERS,
  BUILD_LITERACY_INTRO,
  BUILD_LITERACY_NAV_COLORS,
  BUILD_TOPIC_IDS,
  getBuildTopic,
  getBuildCluster,
} from '../../data/buildLiteracy';
import { useGlossary } from '../../hooks/useGlossary';
import BuildTopicView from './BuildTopicView';
import TalkToAiCard from './TalkToAiCard';

/**
 * Build Literacy section: two-pane layout that mirrors the UI Glossary.
 * Left pane = topic information (definition, vibe tip, compare, related).
 * Right pane = "Talk to your AI" showpiece + (later) concept demos.
 */
export default function BuildLiteracyView({
  activeTopicId,
  setActiveTopicId,
  onOpenGlossaryEntry,
  learnMode,
  toggleLearnMode,
  mastered,
  onMastered,
}) {
  const glossary = useGlossary();
  const [mobileView, setMobileView] = useState('info'); // 'info' | 'preview'

  const topic = activeTopicId ? getBuildTopic(activeTopicId) : null;
  const cluster = topic ? getBuildCluster(topic.clusterId) : BUILD_LITERACY_CLUSTERS[0];

  const cc = BUILD_LITERACY_NAV_COLORS;

  // Prev/next within the whole topic list (matches glossary's carousel feel).
  const currentIndex = topic ? BUILD_TOPIC_IDS.indexOf(topic.id) : -1;
  const prevTopic = currentIndex > 0 ? getBuildTopic(BUILD_TOPIC_IDS[currentIndex - 1]) : null;
  const nextTopic = currentIndex < BUILD_TOPIC_IDS.length - 1 ? getBuildTopic(BUILD_TOPIC_IDS[currentIndex + 1]) : null;

  // Quiz pool: every other topic (so the wrong answers feel plausible).
  const quizPool = useMemo(() => {
    if (!topic) return [];
    return BUILD_TOPIC_IDS
      .filter(id => id !== topic.id)
      .map(id => {
        const t = getBuildTopic(id);
        return {
          id,
          name: t?.title || id,
          title: t?.title || id,
          definition: t?.summary || t?.definition || '',
        };
      })
      .filter(t => t.definition);
  }, [topic]);

  const isMastered = topic ? mastered.has(topic.id) : false;

  // Reset mobile view to info when switching topics so the new title is seen.
  useEffect(() => { setMobileView('info'); }, [activeTopicId]);

  // Cluster mastery counts for the tab strip.
  const clusterStats = useMemo(() => {
    const stats = {};
    for (const c of BUILD_LITERACY_CLUSTERS) {
      const total = c.topics.length;
      const done = c.topics.filter(t => mastered.has(t.id)).length;
      stats[c.id] = { total, done };
    }
    return stats;
  }, [mastered]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white dark:bg-zinc-950">
      {/* Intro strip + cluster tabs */}
      <div className="shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="px-5 lg:px-10 pt-5 lg:pt-7 pb-3 lg:pb-4 flex items-start gap-3">
          <div className={`shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br ${cc.gradient} flex items-center justify-center shadow-md`}>
            <Compass size={22} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className={`text-xs lg:text-sm font-bold uppercase tracking-wider ${cc.text} mb-0.5`}>
              Build Literacy
            </p>
            <h2 className="text-lg lg:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
              {BUILD_LITERACY_INTRO.title}
            </h2>
            <p className="text-sm lg:text-base text-zinc-500 dark:text-zinc-400 mt-1 leading-snug max-w-3xl">
              {BUILD_LITERACY_INTRO.lead}
            </p>
          </div>
        </div>

        <ClusterTabs
          clusters={BUILD_LITERACY_CLUSTERS}
          activeClusterId={cluster?.id}
          onSelectCluster={(clusterId) => {
            const c = getBuildCluster(clusterId);
            if (c?.topics.length) setActiveTopicId(c.topics[0].id);
          }}
          stats={clusterStats}
        />

        {/* Topic chips for the current cluster, like a sub-tab strip. */}
        {cluster?.topics?.length > 0 && (
          <TopicChips
            topics={cluster.topics}
            activeTopicId={activeTopicId}
            onSelectTopic={setActiveTopicId}
            mastered={mastered}
          />
        )}
      </div>

      {/* Mobile view toggle */}
      <div className="lg:hidden flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 shrink-0">
        <button
          onClick={() => setMobileView('info')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-base font-semibold transition-colors ${
            mobileView === 'info'
              ? `${cc.text} ${cc.bg} border-b-2 ${cc.border}`
              : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
          }`}
        >
          <FileText size={18} />
          Definition
        </button>
        <button
          onClick={() => setMobileView('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-base font-semibold transition-colors ${
            mobileView === 'preview'
              ? `${cc.text} ${cc.bg} border-b-2 ${cc.border}`
              : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
          }`}
        >
          <Sparkles size={18} />
          Talk to AI
        </button>
      </div>

      {/* Two-pane body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* Left: topic info */}
        <div
          className={`${mobileView === 'info' ? 'flex' : 'hidden'} lg:flex bg-white dark:bg-zinc-950 overflow-y-auto z-10 flex-col shrink-0 w-full lg:w-[44%] xl:w-[46%]`}
        >
          {topic ? (
            <BuildTopicView
              topic={topic}
              cluster={cluster}
              glossary={glossary}
              prevTopic={prevTopic}
              nextTopic={nextTopic}
              onSelectTopic={setActiveTopicId}
              onOpenGlossaryEntry={onOpenGlossaryEntry}
              learnMode={learnMode}
              toggleLearnMode={toggleLearnMode}
              isMastered={isMastered}
              onMastered={onMastered}
              quizPool={quizPool}
            />
          ) : (
            <div className="p-10 text-zinc-500 dark:text-zinc-400">
              Pick a topic above to get started.
            </div>
          )}
        </div>

        {/* Right: Talk to AI showpiece */}
        <div
          className={`${mobileView === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 relative overflow-hidden flex-col bg-zinc-50 dark:bg-zinc-900`}
        >
          <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${cc.gradient} opacity-[0.05] blur-3xl pointer-events-none`} />
          <div className={`absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br ${cc.gradient} opacity-[0.04] blur-3xl pointer-events-none`} />

          <div className="relative z-10 flex-1 overflow-y-auto px-5 py-8 lg:px-10 lg:py-12 flex flex-col items-center justify-center">
            {topic && <TalkToAiCard topic={topic} categoryColors={cc} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClusterTabs({ clusters, activeClusterId, onSelectCluster, stats }) {
  return (
    <div className="px-3 lg:px-7 pb-1 overflow-x-auto">
      <div className="flex items-stretch gap-1.5 min-w-max">
        {clusters.map(c => {
          const active = c.id === activeClusterId;
          const s = stats[c.id] || { done: 0, total: c.topics.length };
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCluster(c.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 lg:px-4 lg:py-3 rounded-t-lg border-b-2 text-sm lg:text-base font-semibold transition-colors ${
                active
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-300 bg-indigo-500/5'
                  : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
              }`}
            >
              <span className="whitespace-nowrap">{c.title}</span>
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded-md tabular-nums ${
                  active
                    ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                }`}
                aria-label={`${s.done} of ${s.total} mastered`}
              >
                {s.done}/{s.total}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TopicChips({ topics, activeTopicId, onSelectTopic, mastered }) {
  return (
    <div className="px-3 lg:px-7 py-2.5 lg:py-3 border-t border-zinc-100 dark:border-zinc-900 overflow-x-auto bg-zinc-50/60 dark:bg-zinc-900/40">
      <div className="flex items-center gap-1.5 min-w-max">
        {topics.map(t => {
          const active = t.id === activeTopicId;
          const isDone = mastered.has(t.id);
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTopic(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold border transition-colors whitespace-nowrap ${
                active
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-indigo-400 dark:hover:border-indigo-500'
              }`}
            >
              {isDone && (
                <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-200' : 'bg-emerald-500'}`} aria-label="Mastered" />
              )}
              {t.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
