import { useEffect, useState } from 'react';
import {
  X, Sparkles, Eye, ClipboardCopy, GraduationCap, Award, Repeat, Info,
  ShieldCheck, ArrowRight, Target, BookOpenCheck, CheckCircle,
} from 'lucide-react';
import { POINTS, LEVELS } from '../../lib/scoring';
import { CLASS_BAR_POINTS } from '../../lib/proof';
import { goalProgress, reviewsCopy } from '../../lib/progressCoaching';
import ShareAchievement from './ShareAchievement';
import HoverTip from '../ui/HoverTip';

/**
 * Modal that shows where the learner's VibeScore came from. Splits the total
 * into its tier buckets (Visited / Used / Passed / Mastered / Retained) and
 * the per-section sub-scores (UI Glossary vs Build Literacy). Designed to
 * make the deep-learning points visible: "1pt for visiting is small, 10pts
 * for mastering is big."
 */
export default function ScoreBreakdownModal({
  isOpen,
  onClose,
  score,
  level,
  onOpenProof,
  onContinueLearning,
  learningProgress,
}) {
  const [selectedLevelId, setSelectedLevelId] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedLevelId(level?.next?.id || level?.current?.id || null);
  }, [isOpen, level?.current?.id, level?.next?.id]);

  if (!isOpen || !score || !level) return null;

  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  const total = score.total;
  const next = level.next;
  const selectedLevel = LEVELS.find((candidate) => candidate.id === selectedLevelId)
    || next
    || level.current;
  const selectedGoal = goalProgress(total, selectedLevel.min);
  const classGoal = goalProgress(total, CLASS_BAR_POINTS);
  const itemsUntilReview = learningProgress?.checkpointReady
    ? 0
    : Math.max(0, (learningProgress?.total || 5) - (learningProgress?.count || 0));

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-8 animate-fade-in"
    >
      <div className="w-full max-w-3xl max-h-[94vh] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="shrink-0 flex items-start justify-between gap-3 px-5 lg:px-7 py-5 lg:py-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-start gap-3 min-w-0">
            <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow">
              <Sparkles size={24} className="text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                VibeScore: {total}
              </h2>
              <p className="text-base lg:text-lg text-zinc-500 dark:text-zinc-400">
                {level.current.label} · {level.current.blurb}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onOpenProof && (
              <button
                type="button"
                onClick={onOpenProof}
                data-tour="class-proof"
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-lg text-sm font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 transition-colors"
              >
                <ShieldCheck size={14} />
                Class proof
              </button>
            )}
            {total > 0 && (
              <span data-tour="share-score">
                <ShareAchievement
                  achievement={{
                    kind: 'vibe-score',
                    score: total,
                    level: level.current.label,
                  }}
                  size="sm"
                  align="right"
                  label="Share score"
                />
              </span>
            )}
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Close score breakdown"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 lg:px-7 py-5 lg:py-6 space-y-6">

          {/* Interactive goal coach */}
          <section className="overflow-hidden rounded-2xl border border-violet-500/30 bg-zinc-950 text-white shadow-xl">
            <div className="relative overflow-hidden px-5 py-5 lg:px-6">
              <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-violet-600/25 blur-3xl" aria-hidden="true" />
              <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-amber-500/15 blur-3xl" aria-hidden="true" />

              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.16em] text-violet-300">
                    <Target size={14} aria-hidden="true" /> Your next mission
                  </p>
                  {selectedGoal.met ? (
                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight lg:text-3xl">
                      {selectedLevel.label} achieved
                    </h3>
                  ) : (
                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight lg:text-3xl">
                      {selectedGoal.remaining} points to {selectedLevel.label}
                    </h3>
                  )}
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-zinc-400">
                    {selectedGoal.met
                      ? selectedLevel.blurb
                      : `${reviewsCopy(selectedGoal.reviewRounds)} can get you there. Every correct review answer adds ${POINTS.passed} points.`}
                  </p>
                </div>
                <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                  <strong className="block text-2xl font-black tabular-nums text-amber-300">
                    {selectedGoal.percent}%
                  </strong>
                  <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">of target</span>
                </div>
              </div>

              <div className="relative mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 transition-all duration-700"
                  style={{ width: `${selectedGoal.percent}%` }}
                />
              </div>

              {!selectedGoal.met && (
                <div className="relative mt-5">
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.1em] text-zinc-500">
                    One exact way to finish
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedGoal.plan.map((step) => (
                      <span
                        key={step.id}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-200"
                      >
                        <b className="text-white">{step.count} {step.label}</b>
                        <em className="not-italic text-emerald-300">+{step.points}</em>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-white">
                    <BookOpenCheck size={16} className="text-violet-300" aria-hidden="true" />
                    {learningProgress?.checkpointReady
                      ? 'Your five-item review is ready now.'
                      : `${itemsUntilReview} more ${itemsUntilReview === 1 ? 'item' : 'items'} unlock your next review.`}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">Open five different items, then answer five review questions.</p>
                </div>
                {onContinueLearning && (
                  <button
                    type="button"
                    onClick={onContinueLearning}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-zinc-950 transition-transform hover:-translate-y-0.5"
                  >
                    {learningProgress?.checkpointReady ? 'Start review' : 'Keep learning'}
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Pick any level to preview the work */}
          <section>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Choose a level to preview
              </span>
              {next ? (
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Next: {next.label}</span>
              ) : (
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Top rung. Keep retaining what you know.</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((l) => {
                const reached = total >= l.min;
                const isCurrent = l.id === level.current.id;
                const isSelected = l.id === selectedLevel.id;
                const classes = `group relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border px-3 py-1 text-xs font-bold transition-all ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-500 text-white'
                    : reached
                      ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-700/40 dark:bg-amber-500/10 dark:text-amber-300'
                      : isSelected
                        ? 'border-violet-500 bg-violet-500/15 text-violet-700 ring-2 ring-violet-500/20 dark:text-violet-300'
                        : 'border-zinc-200 bg-transparent text-zinc-400 hover:border-violet-400 hover:text-violet-600 dark:border-zinc-700 dark:text-zinc-500 dark:hover:text-violet-300'
                }`;

                if (reached) {
                  return (
                    <span key={l.id} tabIndex={0} className={classes} aria-label={`${l.label}. ${l.blurb}`}>
                      {isCurrent && <CheckCircle size={13} className="mr-1" aria-hidden="true" />}
                      {l.label}
                      <HoverTip text={l.blurb} />
                    </span>
                  );
                }

                return (
                  <button
                    key={l.id}
                    type="button"
                    className={classes}
                    aria-label={`${l.label}. ${l.blurb}. Preview requirements.`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedLevelId(l.id)}
                  >
                    {l.label}
                    <HoverTip text={`Preview the work for ${l.label}`} />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Class requirement, translated into work */}
          <button
            type="button"
            onClick={() => setSelectedLevelId('tinkerer')}
            className={`flex w-full min-h-[76px] items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
              classGoal.met
                ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/35'
                : 'border-indigo-300 bg-indigo-50 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/35 dark:hover:bg-indigo-950/55'
            }`}
          >
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${classGoal.met ? 'bg-emerald-500 text-white' : 'bg-indigo-500 text-white'}`}>
              {classGoal.met ? <CheckCircle size={21} aria-hidden="true" /> : <ShieldCheck size={21} aria-hidden="true" />}
            </span>
            <span className="min-w-0 flex-1">
              <strong className="block text-base text-zinc-900 dark:text-white">
                Class requirement: {classGoal.met ? 'complete' : `${classGoal.remaining} points left`}
              </strong>
              <span className="mt-0.5 block text-sm text-zinc-600 dark:text-zinc-300">
                {classGoal.met
                  ? 'You reached Tinkerer. Your class proof is ready.'
                  : `${reviewsCopy(classGoal.reviewRounds)}. Select this goal to see the exact mix.`}
              </span>
            </span>
            <ArrowRight size={18} className="shrink-0 text-zinc-400" aria-hidden="true" />
          </button>

          {/* Section sub-totals */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionTotal
              title="UI Glossary"
              total={score.glossary.total}
              breakdown={score.glossary}
              accent="from-indigo-500 to-violet-600"
            />
            <SectionTotal
              title="Build Literacy"
              total={score.build.total}
              breakdown={score.build}
              accent="from-emerald-500 to-sky-600"
            />
          </section>

          {/* How points are earned */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              How you earn points
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RuleRow
                icon={<Eye size={18} />}
                label="Visited"
                pts={POINTS.visited}
                copy="Open a topic and read the definition."
              />
              <RuleRow
                icon={<ClipboardCopy size={18} />}
                label="Used"
                pts={POINTS.used}
                copy="Copy a prompt to use somewhere."
              />
              <RuleRow
                icon={<GraduationCap size={18} />}
                label="Passed"
                pts={POINTS.passed}
                copy="Answer a five-item checkpoint question correctly."
              />
              <RuleRow
                icon={<Award size={18} />}
                label="Mastered"
                pts={POINTS.mastered}
                copy="Pass again later, in a new tab session, on a different question."
              />
              <RuleRow
                icon={<Repeat size={18} />}
                label="Retained"
                pts={POINTS.retained}
                copy="Pass a fresh-variant retention check 30 days after mastery. Repeats monthly."
              />
            </div>
          </section>

          {/* Integrity rules, the "no gaming" small print */}
          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 lg:p-5">
            <div className="flex items-start gap-3">
              <Info size={18} className="shrink-0 mt-0.5 text-zinc-500 dark:text-zinc-400" />
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                  How we keep the score honest
                </p>
                <ul className="text-sm lg:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed list-disc list-outside ml-5 space-y-1">
                  <li>A checkpoint unlocks after five different items.</li>
                  <li>Each correct checkpoint answer is recorded for that topic.</li>
                  <li>Question wording rotates when a topic appears in another checkpoint.</li>
                  <li>A second pass only reaches Mastered in a different tab session.</li>
                  <li>Wrong answers never lose you points. Mistakes are learning, not penalties.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function RuleRow({ icon, label, pts, copy }) {
  return (
    <div className="flex items-start gap-3 px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="shrink-0 mt-0.5 text-zinc-500 dark:text-zinc-400">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-zinc-900 dark:text-white">{label}</span>
          <span className="ml-auto text-sm font-bold text-amber-600 dark:text-amber-400 tabular-nums">
            +{pts} pts
          </span>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5">{copy}</p>
      </div>
    </div>
  );
}

function SectionTotal({ title, total, breakdown, accent }) {
  const rows = [
    { label: 'Visited', value: breakdown.visited },
    { label: 'Used',    value: breakdown.used },
    { label: 'Passed',  value: breakdown.passed },
    { label: 'Mastered',value: breakdown.mastered },
    { label: 'Retained',value: breakdown.retained },
    { label: 'Legacy badge bonus', value: breakdown.pathBonus },
  ].filter(r => r.value > 0);

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className={`px-4 py-3 bg-gradient-to-r ${accent} text-white flex items-center justify-between`}>
        <span className="text-base font-bold">{title}</span>
        <span className="text-xl font-extrabold tabular-nums">{total}</span>
      </div>
      {rows.length === 0 ? (
        <p className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-400">
          Start visiting topics here to earn points.
        </p>
      ) : (
        <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {rows.map(r => (
            <li key={r.label} className="px-4 py-2 flex items-center justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-300">{r.label}</span>
              <span className="font-semibold text-zinc-900 dark:text-white tabular-nums">+{r.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
