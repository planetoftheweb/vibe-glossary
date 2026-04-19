import { useState, useMemo, useEffect } from 'react';
import { FileText, Sparkles, GripVertical, BookOpen } from 'lucide-react';
import {
  BUILD_LITERACY_CLUSTERS,
  BUILD_LITERACY_NAV_COLORS,
  BUILD_TOPIC_IDS,
  getBuildTopic,
  getBuildCluster,
} from '../../data/buildLiteracy';
import { useGlossary } from '../../hooks/useGlossary';
import usePanelResize from '../../hooks/usePanelResize';
import BuildTopicView from './BuildTopicView';
import TalkToAiCard from './TalkToAiCard';

/**
 * Build Literacy section: two-pane body that mirrors the UI Glossary.
 * Cluster + topic navigation lives in the TopNav (matching the glossary's
 * Category + Component pills), so this view is just the content.
 *
 * Resize behavior: shares the panelWidth state with the UI Glossary so the
 * user's chosen split persists across both sections (and across reloads).
 */
export default function BuildLiteracyView({
  activeTopicId,
  setActiveTopicId,
  onOpenGlossaryEntry,
  learnMode,
  toggleLearnMode,
  mastered,
  onMastered,
  panelWidth = 44,
  setPanelWidth,
  isDesktop = true,
  infoOpen = true,
  setInfoOpen,
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

  // Mirror the UI Glossary's drag-to-resize behavior. The hook owns its own
  // container ref so the math is relative to this view, not the App shell.
  const { containerRef, onResizeStart } = usePanelResize(setPanelWidth || (() => {}));

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
      <div ref={containerRef} className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* Left: topic info, hidden when docked on desktop */}
        {infoOpen && (
          <div
            className={`${mobileView === 'info' ? 'flex' : 'hidden'} lg:flex bg-white dark:bg-zinc-950 overflow-y-auto z-10 flex-col shrink-0 w-full`}
            style={{ minWidth: 0, ...(isDesktop ? { width: `${panelWidth}%` } : {}) }}
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
                onCloseInfo={setInfoOpen ? () => setInfoOpen(false) : undefined}
              />
            ) : (
              <div className="p-10 text-zinc-500 dark:text-zinc-400">
                Pick a topic from the dropdown above to get started.
              </div>
            )}
          </div>
        )}

        {/* Resize handle, desktop only, hidden when docked */}
        {infoOpen && (
          <div
            onMouseDown={onResizeStart}
            onTouchStart={onResizeStart}
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize panels"
            className="hidden lg:flex w-1.5 hover:w-2.5 items-center justify-center cursor-col-resize bg-transparent hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 transition-all group/resize shrink-0 z-20"
          >
            <GripVertical size={14} className="text-transparent group-hover/resize:text-zinc-500 dark:group-hover/resize:text-zinc-400 transition-colors" />
          </div>
        )}

        {/* Right: Talk to your AI showpiece */}
        <div
          className={`${mobileView === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 relative overflow-hidden flex-col bg-zinc-50 dark:bg-zinc-900`}
        >
          <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${cc.gradient} opacity-[0.05] blur-3xl pointer-events-none`} />
          <div className={`absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br ${cc.gradient} opacity-[0.04] blur-3xl pointer-events-none`} />

          {/* Floating reopen button when the left panel is docked */}
          {!infoOpen && setInfoOpen && (
            <div className="hidden lg:flex absolute top-4 left-4 z-30 gap-2">
              <button
                onClick={() => setInfoOpen(true)}
                className="p-2.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm hover:bg-white dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
                title="Open Definition"
              >
                <BookOpen size={18} />
              </button>
            </div>
          )}

          <div className="relative z-10 flex-1 overflow-y-auto px-5 py-8 lg:px-10 lg:py-12 flex flex-col items-center justify-center">
            {topic && <TalkToAiCard topic={topic} categoryColors={cc} />}
          </div>
        </div>
      </div>
    </div>
  );
}
