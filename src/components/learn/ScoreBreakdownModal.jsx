import { useEffect } from 'react';
import {
  X, Sparkles, Eye, ClipboardCopy, GraduationCap, Award, Repeat, Trophy, Info,
} from 'lucide-react';
import { POINTS, LEVELS } from '../../lib/scoring';
import ShareAchievement from './ShareAchievement';

/**
 * Modal that shows where the learner's VibeScore came from. Splits the total
 * into its tier buckets (Visited / Used / Passed / Mastered / Retained) and
 * the per-section sub-scores (UI Glossary vs Build Literacy). Designed to
 * make the deep-learning points visible: "1pt for visiting is small, 10pts
 * for mastering is big."
 */
export default function ScoreBreakdownModal({ isOpen, onClose, score, level }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !score || !level) return null;

  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  const total = score.total;
  const next = level.next;
  const percentToNext = next
    ? Math.min(100, Math.round((level.pointsIntoLevel / (next.min - level.current.min)) * 100))
    : 100;

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
            {total > 0 && (
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
            )}
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Close score breakdown"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 lg:px-7 py-5 lg:py-6 space-y-6">

          {/* Level progress */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Level
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {next
                  ? `${level.pointsToNext} pts to ${next.label}`
                  : 'Top rung — keep retaining what you know.'}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-700"
                style={{ width: `${percentToNext}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {LEVELS.map((l) => {
                const reached = total >= l.min;
                const isCurrent = l.id === level.current.id;
                return (
                  <span
                    key={l.id}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${
                      isCurrent
                        ? 'bg-amber-500 text-white border-amber-500'
                        : reached
                          ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/40'
                          : 'bg-transparent text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700'
                    }`}
                    title={l.blurb}
                  >
                    {l.label}
                  </span>
                );
              })}
            </div>
          </section>

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
                copy="Pass a clean Quiz Me attempt for the topic."
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
              <RuleRow
                icon={<Trophy size={18} />}
                label="Path bonus"
                pts={POINTS.pathBonus}
                copy="Finish a learning path with at least 80% on the end quiz."
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
                  <li>Each question needs at least 4 seconds of your attention to count.</li>
                  <li>Answers that take over 90 seconds count as practice.</li>
                  <li>After a counted pass, the same topic has a 30-minute cooldown.</li>
                  <li>Question variants rotate, so memorising one answer does not unlock the next pass.</li>
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
    { label: 'Path bonus', value: breakdown.pathBonus },
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
