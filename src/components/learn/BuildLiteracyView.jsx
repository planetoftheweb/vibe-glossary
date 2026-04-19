import { useState, useMemo, useEffect } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import {
  BUILD_LITERACY_CLUSTERS,
  BUILD_LITERACY_NAV_COLORS,
  BUILD_TOPIC_IDS,
  getBuildTopic,
  getBuildCluster,
} from '../../data/buildLiteracy';
import { useGlossary } from '../../hooks/useGlossary';
import BuildTopicView from './BuildTopicView';
import TalkToAiCard from './TalkToAiCard';

/**
 * Build Literacy section: two-pane body that mirrors the UI Glossary.
 * Cluster + topic navigation lives in the TopNav (matching the glossary's
 * Category + Component pills), so this view is just the content.
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
  const cluster = topic
    ? getBuildCluster(topic.clusterId)
    : BUILD_LITERACY_CLUSTERS[0];

  const cc = BUILD_LITERACY_NAV_COLORS;

  const currentIndex = topic ? BUILD_TOPIC_IDS.indexOf(topic.id) : -1;
  const prevTopic = currentIndex > 0 ? getBuildTopic(BUILD_TOPIC_IDS[currentIndex - 1]) : null;
  const nextTopic = currentIndex < BUILD_TOPIC_IDS.length - 1
    ? getBuildTopic(BUILD_TOPIC_IDS[currentIndex + 1])
    : null;

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

  useEffect(() => { setMobileView('info'); }, [activeTopicId]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white dark:bg-zinc-950">
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
              Pick a topic from the dropdown above to get started.
            </div>
          )}
        </div>

        {/* Right: Talk to your AI showpiece */}
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
