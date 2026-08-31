import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpenCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  GripHorizontal,
  Maximize2,
  Minimize2,
  Move,
  PanelBottom,
  PanelTop,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import { POINTS } from '../../lib/scoring';
import { CLASS_BAR_POINTS } from '../../lib/proof';
import { goalProgress, reviewsCopy } from '../../lib/progressCoaching';

export const LEARNING_HUD_STORAGE_KEY = 'vg-learning-hud';

const DEFAULT_HUD_STATE = Object.freeze({
  mode: 'expanded',
  dock: 'bottom',
  x: 24,
  y: 112,
});

function readHudState() {
  try {
    const saved = JSON.parse(localStorage.getItem(LEARNING_HUD_STORAGE_KEY));
    return {
      ...DEFAULT_HUD_STATE,
      ...(saved && typeof saved === 'object' ? saved : {}),
    };
  } catch {
    return { ...DEFAULT_HUD_STATE };
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function ProgressRing({ progress, accentClass, size = 32, strokeWidth = 3.5 }) {
  const percent = Math.max(0, Math.min(100, progress?.percent || 0));
  const masteredPercent = Math.max(0, Math.min(100, progress?.masteredPercent || 0));

  return (
    <span className="relative inline-grid shrink-0 place-items-center" style={{ width: size, height: size }} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="currentColor"
          className="text-zinc-200 dark:text-zinc-800"
          strokeWidth="1.5"
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="currentColor"
          className="text-emerald-500"
          strokeWidth="1.5"
          pathLength="100"
          strokeDasharray={`${masteredPercent} 100`}
          strokeLinecap="round"
        />
        <circle
          cx="18"
          cy="18"
          r="12.25"
          fill="none"
          stroke="currentColor"
          className="text-zinc-200 dark:text-zinc-800"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="18"
          cy="18"
          r="12.25"
          fill="none"
          stroke="currentColor"
          className={accentClass}
          strokeWidth={strokeWidth}
          pathLength="100"
          strokeDasharray={`${percent} 100`}
          strokeLinecap="round"
        />
      </svg>
      {size >= 60 && (
        <strong className="relative text-sm font-black tabular-nums text-zinc-900 dark:text-white">
          {progress?.visited || 0}
        </strong>
      )}
    </span>
  );
}

function SequenceButton({ direction, item, itemLabel, onClick }) {
  const previous = direction === 'previous';
  const label = previous ? 'Previous' : 'Next';
  const Icon = previous ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!item}
      aria-label={item ? `${label} ${itemLabel}: ${item.title}` : `No ${label.toLowerCase()} ${itemLabel}`}
      aria-keyshortcuts={previous ? 'ArrowLeft' : 'ArrowRight'}
      className={`group flex min-w-0 flex-1 items-center gap-2 px-3 py-3 text-left transition-colors hover:bg-violet-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent sm:px-4 ${previous ? '' : 'text-right'}`}
    >
      {previous && <Icon size={24} className="shrink-0 text-violet-500 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />}
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-black uppercase tracking-[0.1em] text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <span className="mt-0.5 block line-clamp-2 text-xs font-extrabold leading-tight text-zinc-900 dark:text-white sm:text-sm lg:text-base">
          {item?.title || (previous ? 'Start of list' : 'End of list')}
        </span>
      </span>
      {!previous && <Icon size={24} className="shrink-0 text-violet-500 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
    </button>
  );
}

function PopupShell({ id, title, popupAbove, onClose, children }) {
  return (
    <section
      id={id}
      role="dialog"
      aria-label={title}
      aria-modal="false"
      className={`absolute left-1/2 z-20 max-h-[calc(100vh-12rem)] w-[min(390px,calc(100vw-24px))] -translate-x-1/2 overflow-y-auto rounded-2xl border border-zinc-200 bg-white/[0.98] text-left shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl animate-fade-in dark:border-zinc-700 dark:bg-zinc-950/[0.98] ${popupAbove ? 'bottom-full mb-3' : 'top-full mt-3'}`}
    >
      <div className="flex min-h-[52px] items-center justify-between gap-3 border-b border-zinc-200 px-4 dark:border-zinc-800">
        <h2 className="text-sm font-black uppercase tracking-[0.12em] text-zinc-800 dark:text-zinc-100">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="grid min-h-[44px] min-w-[44px] place-items-center rounded-xl text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-white"
          aria-label={`Close ${title.toLowerCase()}`}
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      {children}
    </section>
  );
}

function ProgressPopup({ progress, sections, visited, accentClass, sectionLabel, learningProgress, popupAbove, onClose }) {
  const itemsUntilReview = learningProgress?.checkpointReady
    ? 0
    : Math.max(0, (learningProgress?.total || 5) - (learningProgress?.count || 0));

  return (
    <PopupShell id="learning-hud-progress" title="Progress" popupAbove={popupAbove} onClose={onClose}>
      <div className="flex items-center gap-4 p-4">
        <ProgressRing progress={progress} accentClass={accentClass} size={78} strokeWidth={2.7} />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-extrabold text-zinc-950 dark:text-white">{sectionLabel}</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            <strong className="text-zinc-800 dark:text-zinc-200">{progress?.visited || 0}/{progress?.total || 0}</strong> explored, {progress?.copied || 0} prompts used
          </p>
          <p className="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {progress?.mastered || 0} mastered
          </p>
        </div>
      </div>

      <div className="border-y border-zinc-200 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/60">
        <p className="flex items-center gap-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">
          <BookOpenCheck size={17} className="text-violet-500" aria-hidden="true" />
          {learningProgress?.checkpointReady
            ? 'Your five-item review is ready.'
            : `${itemsUntilReview} more ${itemsUntilReview === 1 ? 'item' : 'items'} to your next review.`}
        </p>
      </div>

      <div className="max-h-[260px] space-y-3 overflow-y-auto p-4">
        {sections.map((section) => {
          const itemIds = section.items.map((item) => typeof item === 'string' ? item : item.id);
          const count = itemIds.filter((id) => visited?.has(id)).length;
          const percent = itemIds.length ? Math.round((count / itemIds.length) * 100) : 0;
          return (
            <div key={section.id}>
              <div className="mb-1.5 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${section.colors?.dot || 'bg-violet-500'}`} />
                <strong className="min-w-0 flex-1 truncate text-sm text-zinc-800 dark:text-zinc-200">{section.name}</strong>
                {count === itemIds.length && itemIds.length > 0 && <Check size={14} className="text-emerald-500" aria-label="Complete" />}
                <span className="text-xs tabular-nums text-zinc-400">{count}/{itemIds.length}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className={`h-full rounded-full bg-gradient-to-r transition-[width] duration-500 ${section.colors?.gradient || 'from-violet-500 to-fuchsia-500'}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </PopupShell>
  );
}

function ScorePopup({ score, level, learningProgress, popupAbove, onClose, onOpenDetails, onOpenProof, onContinueLearning }) {
  const total = score?.total || 0;
  const next = level?.next;
  const nextGoal = goalProgress(total, next?.min || total);
  const classGoal = goalProgress(total, CLASS_BAR_POINTS);
  const itemsUntilReview = learningProgress?.checkpointReady
    ? 0
    : Math.max(0, (learningProgress?.total || 5) - (learningProgress?.count || 0));

  return (
    <PopupShell id="learning-hud-score" title="Score" popupAbove={popupAbove} onClose={onClose}>
      <div className="relative overflow-hidden bg-zinc-950 px-5 py-5 text-white">
        <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-amber-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-amber-950/30">
            <Sparkles size={27} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-300">Score {total}</p>
            <h3 className="mt-1 text-3xl font-black tracking-tight">{level?.current?.label || 'Lurker'}</h3>
            <p className="mt-1 text-sm text-zinc-400">{level?.current?.blurb || 'Just looking around. Welcome.'}</p>
          </div>
        </div>

        {next ? (
          <div className="relative mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm font-extrabold">
                <Target size={16} className="text-violet-300" aria-hidden="true" />
                {nextGoal.remaining} points to {next.label}
              </span>
              <span className="text-xs font-black tabular-nums text-amber-300">{nextGoal.percent}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400"
                style={{ width: `${nextGoal.percent}%` }}
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400">
              {reviewsCopy(nextGoal.reviewRounds)} can get you there. Each correct review answer earns {POINTS.passed} points.
            </p>
          </div>
        ) : (
          <p className="relative mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm font-bold text-emerald-300">
            Top level reached. Keep reviewing to retain what you know.
          </p>
        )}
      </div>

      <div className="space-y-3 p-4">
        <button
          type="button"
          onClick={onContinueLearning}
          className="flex min-h-[58px] w-full items-center gap-3 rounded-xl border border-violet-200 bg-violet-50 px-4 text-left transition-colors hover:bg-violet-100 dark:border-violet-800/60 dark:bg-violet-950/35 dark:hover:bg-violet-950/55"
        >
          <BookOpenCheck size={20} className="shrink-0 text-violet-600 dark:text-violet-300" aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <strong className="block text-sm text-zinc-900 dark:text-white">
              {learningProgress?.checkpointReady ? 'Start your five-item review' : `${itemsUntilReview} more ${itemsUntilReview === 1 ? 'item' : 'items'} unlock the quiz`}
            </strong>
            <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">Five correct answers can add 25 points.</span>
          </span>
          <ChevronRight size={17} className="text-zinc-400" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onOpenDetails}
            className="min-h-[48px] rounded-xl bg-zinc-900 px-3 text-sm font-extrabold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Full score plan
          </button>
          <button
            type="button"
            onClick={onOpenProof}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 text-sm font-extrabold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <ShieldCheck size={16} aria-hidden="true" />
            {classGoal.met ? 'Class proof ready' : `${classGoal.remaining} to class goal`}
          </button>
        </div>
      </div>
    </PopupShell>
  );
}

export default function FloatingLearningHud({
  previous,
  next,
  currentPosition,
  total,
  onPrevious,
  onNext,
  itemLabel = 'item',
  ariaLabel = 'Progression navigation',
  progress,
  progressSections = [],
  visited,
  sectionLabel = 'UI glossary progress',
  score,
  level,
  learningProgress,
  accentClass = 'text-violet-500',
  onOpenScoreDetails,
  onOpenProof,
  onContinueLearning,
}) {
  const [hudState, setHudState] = useState(readHudState);
  const [activePopup, setActivePopup] = useState(null);
  const rootRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(LEARNING_HUD_STORAGE_KEY, JSON.stringify(hudState)); } catch {}
  }, [hudState]);

  useEffect(() => {
    if (!activePopup) return undefined;
    const closeFromOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setActivePopup(null);
    };
    const closeFromEscape = (event) => {
      if (event.key === 'Escape') setActivePopup(null);
    };
    document.addEventListener('pointerdown', closeFromOutside);
    document.addEventListener('keydown', closeFromEscape);
    return () => {
      document.removeEventListener('pointerdown', closeFromOutside);
      document.removeEventListener('keydown', closeFromEscape);
    };
  }, [activePopup]);

  useEffect(() => {
    const keepOnScreen = () => {
      if (hudState.dock !== 'free' || !rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const nextX = clamp(hudState.x, 8, window.innerWidth - rect.width - 8);
      const nextY = clamp(hudState.y, 88, window.innerHeight - rect.height - 58);
      if (nextX !== hudState.x || nextY !== hudState.y) {
        setHudState((current) => ({ ...current, x: nextX, y: nextY }));
      }
    };
    window.addEventListener('resize', keepOnScreen);
    return () => window.removeEventListener('resize', keepOnScreen);
  }, [hudState.dock, hudState.mode, hudState.x, hudState.y]);

  useEffect(() => {
    const moveHud = (event) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      const x = clamp(drag.originX + event.clientX - drag.startX, 8, window.innerWidth - drag.width - 8);
      const y = clamp(drag.originY + event.clientY - drag.startY, 88, window.innerHeight - drag.height - 58);
      setHudState((current) => ({ ...current, dock: 'free', x, y }));
    };
    const endMove = (event) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      drag.handle?.releasePointerCapture?.(event.pointerId);
      dragRef.current = null;
    };

    window.addEventListener('pointermove', moveHud);
    window.addEventListener('pointerup', endMove);
    window.addEventListener('pointercancel', endMove);
    return () => {
      window.removeEventListener('pointermove', moveHud);
      window.removeEventListener('pointerup', endMove);
      window.removeEventListener('pointercancel', endMove);
    };
  }, []);

  const popupAbove = hudState.dock === 'bottom'
    || (hudState.dock === 'free' && hudState.y > window.innerHeight / 2);

  const rootPosition = useMemo(() => {
    if (hudState.dock !== 'free') return undefined;
    return { left: hudState.x, top: hudState.y };
  }, [hudState.dock, hudState.x, hudState.y]);

  const setMode = (mode) => {
    setActivePopup(null);
    setHudState((current) => ({ ...current, mode }));
  };

  const setDock = (dock) => {
    setActivePopup(null);
    setHudState((current) => ({ ...current, dock }));
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0 || !rootRef.current) return;
    const interactiveTarget = event.target.closest?.('button, a, input, select, textarea, [role="menuitem"]');
    if (interactiveTarget && interactiveTarget !== event.currentTarget) return;
    const rect = rootRef.current.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: rect.left,
      originY: rect.top,
      width: rect.width,
      height: rect.height,
      handle: event.currentTarget,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setActivePopup(null);
    setHudState((current) => ({ ...current, dock: 'free', x: rect.left, y: rect.top }));
  };

  const goPrevious = () => {
    setActivePopup(null);
    onPrevious?.();
  };

  const goNext = () => {
    setActivePopup(null);
    onNext?.();
  };

  const openDetails = () => {
    setActivePopup(null);
    onOpenScoreDetails?.();
  };

  const openProof = () => {
    setActivePopup(null);
    onOpenProof?.();
  };

  const continueLearning = () => {
    setActivePopup(null);
    onContinueLearning?.();
  };

  if (hudState.mode === 'hidden') {
    return (
      <button
        type="button"
        onClick={() => setMode('minimized')}
        className="fixed bottom-20 right-0 z-[140] inline-flex min-h-[48px] items-center gap-2 rounded-l-2xl border border-r-0 border-violet-400/40 bg-zinc-950/95 px-3 text-sm font-extrabold text-white shadow-2xl backdrop-blur-xl transition-transform hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        aria-label="Show learning HUD"
      >
        <Maximize2 size={17} className="text-violet-300" aria-hidden="true" />
        Learning HUD
      </button>
    );
  }

  const positionClass = hudState.dock === 'top'
    ? 'left-1/2 top-[5.75rem] -translate-x-1/2'
    : hudState.dock === 'bottom'
      ? 'bottom-[4.25rem] left-1/2 -translate-x-1/2'
      : '';

  return (
    <aside
      ref={rootRef}
      style={rootPosition}
      data-dock={hudState.dock}
      data-mode={hudState.mode}
      className={`pointer-events-none fixed z-[140] ${positionClass}`}
      aria-label="Learning HUD"
    >
      {hudState.mode === 'minimized' ? (
        <div className="pointer-events-auto flex items-center overflow-hidden rounded-2xl border border-violet-400/35 bg-zinc-950/95 text-white shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
          <button
            type="button"
            onPointerDown={handlePointerDown}
            className="grid min-h-[48px] min-w-[44px] touch-none cursor-grab place-items-center text-zinc-500 hover:text-white active:cursor-grabbing"
            aria-label="Move learning HUD"
          >
            <GripHorizontal size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goPrevious}
            disabled={!previous}
            className="grid min-h-[48px] min-w-[44px] place-items-center text-violet-300 transition-colors hover:bg-white/10 disabled:opacity-30"
            aria-label={previous ? `Previous ${itemLabel}: ${previous.title}` : `No previous ${itemLabel}`}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setMode('expanded')}
            className="flex min-h-[48px] items-center gap-2 border-x border-white/10 px-4 text-sm font-black tabular-nums transition-colors hover:bg-white/10"
            aria-label="Expand learning HUD"
          >
            <span className={accentClass}>{currentPosition}</span>
            <span className="text-zinc-500">of</span>
            <span>{total}</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!next}
            className="grid min-h-[48px] min-w-[44px] place-items-center text-violet-300 transition-colors hover:bg-white/10 disabled:opacity-30"
            aria-label={next ? `Next ${itemLabel}: ${next.title}` : `No next ${itemLabel}`}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setMode('hidden')}
            className="grid min-h-[48px] min-w-[44px] place-items-center text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Hide learning HUD"
          >
            <EyeOff size={18} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="pointer-events-auto w-[min(940px,calc(100vw-24px))] overflow-visible rounded-2xl border border-violet-400/30 bg-white/95 text-zinc-900 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-2xl dark:bg-zinc-950/95 dark:text-white">
          <div
            data-testid="learning-hud-drag-bar"
            onPointerDown={handlePointerDown}
            className="flex min-h-[44px] touch-none cursor-grab items-center border-b border-zinc-200/80 px-1.5 active:cursor-grabbing dark:border-zinc-800"
          >
            <button
              type="button"
              onPointerDown={handlePointerDown}
              className="flex min-h-[44px] min-w-[44px] touch-none cursor-grab items-center gap-2 px-2 text-zinc-400 transition-colors hover:text-zinc-800 active:cursor-grabbing dark:hover:text-white"
              aria-label="Move learning HUD"
            >
              <GripHorizontal size={18} aria-hidden="true" />
              <span className="hidden text-xs font-black uppercase tracking-[0.12em] sm:inline">Learning HUD</span>
            </button>
            <span className="ml-auto hidden text-xs font-bold text-zinc-400 md:block">Drag to move</span>
            <div className="relative ml-1 flex items-center">
              <button
                type="button"
                onClick={() => setActivePopup(activePopup === 'dock' ? null : 'dock')}
                aria-expanded={activePopup === 'dock'}
                aria-controls="learning-hud-dock-menu"
                className="grid min-h-[44px] min-w-[44px] place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-white"
                aria-label="Dock learning HUD"
              >
                {hudState.dock === 'top' ? <PanelTop size={17} aria-hidden="true" /> : hudState.dock === 'bottom' ? <PanelBottom size={17} aria-hidden="true" /> : <Move size={17} aria-hidden="true" />}
              </button>
              {activePopup === 'dock' && (
                <div
                  id="learning-hud-dock-menu"
                  role="menu"
                  className={`absolute right-0 z-30 w-48 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 ${popupAbove ? 'bottom-full mb-2' : 'top-full mt-2'}`}
                >
                  {[
                    { id: 'top', label: 'Dock to top', Icon: PanelTop },
                    { id: 'bottom', label: 'Dock to bottom', Icon: PanelBottom },
                    { id: 'free', label: 'Float freely', Icon: Move },
                  ].map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      role="menuitem"
                      onClick={() => setDock(id)}
                      className="flex min-h-[42px] w-full items-center gap-2 rounded-lg px-3 text-left text-sm font-bold text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                      <Icon size={16} aria-hidden="true" />
                      {label}
                      {hudState.dock === id && <Check size={15} className="ml-auto text-violet-500" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => setMode('minimized')}
                className="grid min-h-[44px] min-w-[44px] place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-white"
                aria-label="Minimize learning HUD"
              >
                <Minimize2 size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setMode('hidden')}
                className="grid min-h-[44px] min-w-[44px] place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-white"
                aria-label="Hide learning HUD"
              >
                <EyeOff size={17} aria-hidden="true" />
              </button>
            </div>
          </div>

          <nav aria-label={ariaLabel} className="grid min-h-[82px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch overflow-hidden rounded-b-2xl">
            <SequenceButton direction="previous" item={previous} itemLabel={itemLabel} onClick={goPrevious} />

            <div className="flex min-w-[124px] flex-col items-center justify-center gap-1.5 border-x border-zinc-200 px-2 py-2 dark:border-zinc-800 sm:min-w-[230px] sm:px-3">
              <div className="flex items-center gap-1.5 text-xs font-black tabular-nums sm:text-sm">
                <span className={accentClass}>{currentPosition} of {total}</span>
                <span className="ml-1 hidden items-center gap-1 text-xs font-semibold text-zinc-400 md:flex">
                  Use <kbd className="rounded border border-zinc-300 px-1 font-sans dark:border-zinc-700">←</kbd><kbd className="rounded border border-zinc-300 px-1 font-sans dark:border-zinc-700">→</kbd>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActivePopup(activePopup === 'progress' ? null : 'progress')}
                  aria-expanded={activePopup === 'progress'}
                  aria-controls="learning-hud-progress"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-2 text-xs font-extrabold transition-colors hover:border-violet-400 hover:bg-violet-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-500 dark:hover:bg-violet-950/40 sm:px-3"
                  aria-label={`${sectionLabel}: ${progress?.visited || 0} of ${progress?.total || 0}`}
                >
                  <ProgressRing progress={progress} accentClass={accentClass} size={27} />
                  <span className="hidden sm:inline">Progress</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePopup(activePopup === 'score' ? null : 'score')}
                  aria-expanded={activePopup === 'score'}
                  aria-controls="learning-hud-score"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-amber-300/70 bg-amber-50 px-2 text-xs font-extrabold text-amber-800 transition-colors hover:bg-amber-100 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200 dark:hover:bg-amber-500/20 sm:px-3"
                  aria-label={`Score ${score?.total || 0}, level ${level?.current?.label || 'Lurker'}`}
                >
                  <Sparkles size={15} className="text-amber-500" aria-hidden="true" />
                  <span>Score {score?.total || 0}</span>
                  <span className="hidden text-xs uppercase tracking-wide opacity-80 sm:inline">{level?.current?.label || 'Lurker'}</span>
                </button>
              </div>
            </div>

            <SequenceButton direction="next" item={next} itemLabel={itemLabel} onClick={goNext} />
          </nav>

          {activePopup === 'progress' && (
            <ProgressPopup
              progress={progress}
              sections={progressSections}
              visited={visited}
              accentClass={accentClass}
              sectionLabel={sectionLabel}
              learningProgress={learningProgress}
              popupAbove={popupAbove}
              onClose={() => setActivePopup(null)}
            />
          )}

          {activePopup === 'score' && (
            <ScorePopup
              score={score}
              level={level}
              learningProgress={learningProgress}
              popupAbove={popupAbove}
              onClose={() => setActivePopup(null)}
              onOpenDetails={openDetails}
              onOpenProof={openProof}
              onContinueLearning={continueLearning}
            />
          )}
        </div>
      )}
    </aside>
  );
}
