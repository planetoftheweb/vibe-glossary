import { useMemo, useState, useEffect, useRef } from 'react';
import { HelpCircle, Check, X, Lightbulb, Clock, Trophy, ShieldCheck, ShieldAlert } from 'lucide-react';
import {
  evaluateAttempt,
  pickVariant,
  explainReasons,
  TIME_FLOOR_MS,
} from '../../lib/quizIntegrity';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(pool, correctId, count = 3) {
  const seen = new Set();
  const candidates = pool.filter(p => {
    if (p.id === correctId) return false;
    if (!p.definition) return false;
    if (seen.has(p.definition)) return false;
    seen.add(p.definition);
    return true;
  });
  return shuffle(candidates).slice(0, count);
}

/**
 * Default question bank used when a topic does not provide its own.
 * Every variant uses the topic's own definition as the right answer
 * (so we still get a meaningful question on any topic) but reframes the
 * prompt and helper text. Combined with `pickVariant`, this guarantees
 * the learner sees a different-looking question on each retake.
 */
const DEFAULT_VARIANTS = [
  {
    id: 'default-definition',
    type: 'definition',
    promptPrefix: 'What does a ',
    promptHighlight: '{title}',
    promptSuffix: ' do?',
    helper: 'Look at the live demo on the right and pick the description that matches.',
  },
  {
    id: 'default-pick-match',
    type: 'pick-match',
    promptText: 'Pick the description that matches {title}.',
    helper: 'Three of these belong to other components. Only one fits the demo above.',
  },
  {
    id: 'default-which-is',
    type: 'which-is',
    promptText: 'Which of these defines {title}?',
    helper: 'Read each option carefully. The right one will match the live demo on the right.',
  },
];

function buildBank(extraBank) {
  const seen = new Set();
  const merged = [];
  for (const v of [...(extraBank || []), ...DEFAULT_VARIANTS]) {
    if (!v || !v.id || seen.has(v.id)) continue;
    seen.add(v.id);
    merged.push(v);
  }
  return merged;
}

/**
 * Resolve the variant we want to show for this attempt. We always merge a
 * topic's optional `quizBank` with the shared defaults so that even topics
 * without authored variants still get rotation across visits. Variants with
 * a custom `promptText` opt out of the "X do?" template.
 */
function resolveVariant({ bank, attempts, correctTitle }) {
  const merged = buildBank(bank);
  const v = pickVariant(merged, attempts);
  if (!v) return DEFAULT_VARIANTS[0];
  return v;
}

export default function QuizCard({
  correctId,
  correctTitle,
  correctDefinition,
  correctComparison,
  distractorPool,
  onCorrect,
  categoryColors,
  // New (all optional, backward compatible):
  variantBank,            // [{ id, type, promptText|promptPrefix/Highlight/Suffix, helper }]
  pastAttempts = [],      // attempts log for this topic, used for variant rotation
  onAttemptComplete,      // ({ valid, correct, reasons, variantId, timeMs }) => void
  cooldownLastTs = null,  // timestamp of the last COUNTED pass for this topic
}) {
  const variant = useMemo(
    () => resolveVariant({ bank: variantBank, attempts: pastAttempts, correctTitle }),
    [variantBank, pastAttempts, correctTitle]
  );

  const options = useMemo(() => {
    const distractors = pickDistractors(distractorPool, correctId, 3);
    return shuffle([
      { id: correctId, label: correctDefinition, correct: true },
      ...distractors.map(d => ({ id: d.id, label: d.definition, correct: false })),
    ]);
  }, [correctId, correctDefinition, distractorPool]);

  const [picked, setPicked] = useState(null);
  const [wrongIds, setWrongIds] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const startedAtRef = useRef(Date.now());
  const tickRef = useRef(null);
  const reportedRef = useRef(false);

  useEffect(() => {
    setPicked(null);
    setWrongIds(new Set());
    setShowHint(false);
    setElapsedMs(0);
    reportedRef.current = false;
    startedAtRef.current = Date.now();
  }, [correctId, variant.id]);

  // Tick the elapsed clock once a second. We do not lock the UI; the clock
  // is shown so the learner can see "give it 4 seconds" is a real rule.
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startedAtRef.current);
    }, 250);
    return () => clearInterval(tickRef.current);
  }, [correctId, variant.id]);

  const handlePick = (opt) => {
    if (picked?.correct) return;
    setPicked(opt);
    if (opt.correct) {
      const timeMs = Date.now() - startedAtRef.current;
      const integrity = evaluateAttempt({
        timePerQuestionMs: [timeMs],
        cooldownLastTs,
        now: Date.now(),
      });
      reportedRef.current = true;
      onAttemptComplete?.({
        valid: integrity.valid,
        correct: true,
        reasons: integrity.reasons,
        variantId: variant.id,
        timeMs,
      });
      setTimeout(() => onCorrect(), 450);
    } else {
      setWrongIds(prev => new Set(prev).add(opt.id));
      setShowHint(true);
    }
  };

  const cc = categoryColors || {};
  const secondsLeftToFloor = Math.max(0, Math.ceil((TIME_FLOOR_MS - elapsedMs) / 1000));
  const floorMet = elapsedMs >= TIME_FLOOR_MS;

  const highlight = (variant.promptHighlight || correctTitle).replace('{title}', correctTitle);
  const promptNode = variant.promptText ? (
    (() => {
      const parts = variant.promptText.split('{title}');
      if (parts.length === 1) return <span>{parts[0]}</span>;
      return (
        <>
          {parts[0]}
          <span className={cc.accent || 'text-indigo-500'}>{correctTitle}</span>
          {parts.slice(1).join('{title}')}
        </>
      );
    })()
  ) : (
    <>
      {variant.promptPrefix || 'What does a '}
      <span className={cc.accent || 'text-indigo-500'}>{highlight}</span>
      {variant.promptSuffix || ' do?'}
    </>
  );

  return (
    <div className="mb-6 lg:mb-10">
      <div
        className={`rounded-xl lg:rounded-2xl border ${cc.border || 'border-indigo-500/30'} ${cc.bg || 'bg-indigo-500/10'} p-5 lg:p-7 shadow-sm`}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        <div className="flex items-center gap-2.5 mb-4 lg:mb-5 flex-wrap">
          <HelpCircle size={22} className={cc.accent || 'text-indigo-500'} />
          <h3 className={`text-base lg:text-xl font-bold uppercase tracking-wider ${cc.text || 'text-indigo-400'}`}>
            Learn Mode
          </h3>

          {/* Integrity indicator: shows the floor countdown, then green check */}
          <span
            className={`ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              floorMet
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                : 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-300'
            }`}
            title={floorMet
              ? 'This attempt counts toward your VibeScore.'
              : 'Take a moment to read the question. Answers under four seconds count as practice only.'}
          >
            {floorMet ? <ShieldCheck size={13} /> : <Clock size={13} />}
            {floorMet ? 'Counts toward score' : `Practice for ${secondsLeftToFloor}s…`}
          </span>
        </div>

        <p className="text-lg lg:text-2xl font-bold text-zinc-900 dark:text-white mb-1 lg:mb-2">
          {promptNode}
        </p>
        <p className="text-sm lg:text-base text-zinc-500 dark:text-zinc-400 mb-4 lg:mb-5">
          {variant.helper || 'Look at the live demo on the right and pick the description that matches.'}
        </p>

        <div className="grid grid-cols-1 gap-2.5 lg:gap-3">
          {options.map(opt => {
            const isWrong = wrongIds.has(opt.id);
            const isCorrectPicked = picked?.correct && picked.id === opt.id;

            let stateClasses =
              'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500';
            let icon = null;

            if (isCorrectPicked) {
              stateClasses = 'bg-emerald-500 border-emerald-500 text-white shadow-md';
              icon = <Check size={18} className="shrink-0" />;
            } else if (isWrong) {
              stateClasses = 'bg-rose-500/10 border-rose-400 text-rose-700 dark:text-rose-300';
              icon = <X size={18} className="shrink-0 text-rose-500" />;
            }

            return (
              <button
                key={opt.id}
                onClick={() => handlePick(opt)}
                disabled={picked?.correct || isWrong}
                className={`w-full flex items-start gap-3 px-4 py-3 lg:px-5 lg:py-4 rounded-lg lg:rounded-xl border-2 text-left text-base lg:text-lg font-medium leading-snug transition-all duration-200 disabled:cursor-not-allowed ${stateClasses}`}
              >
                {icon && <span className="mt-0.5">{icon}</span>}
                <span className="flex-1 min-w-0">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {showHint && correctComparison && !picked?.correct && (
          <div className="mt-4 lg:mt-5 flex items-start gap-2.5 px-4 py-3 rounded-lg bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-700">
            <Lightbulb size={18} className="shrink-0 mt-0.5 text-amber-500" />
            <p className="text-base text-zinc-700 dark:text-zinc-200">
              <span className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-xs mr-2">Hint</span>
              {correctComparison}
            </p>
          </div>
        )}

        {/* Post-correct integrity message */}
        {picked?.correct && reportedRef.current && (
          <PostCorrectBanner
            timeMs={Date.now() - startedAtRef.current}
            cooldownLastTs={cooldownLastTs}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Tiny banner that explains what just happened to the learner's score. We
 * recompute integrity here from the same inputs so the message in the card
 * always agrees with what got logged. Pure read; no state.
 */
function PostCorrectBanner({ timeMs, cooldownLastTs }) {
  const integrity = evaluateAttempt({
    timePerQuestionMs: [timeMs],
    cooldownLastTs,
    now: Date.now(),
  });
  const isGood = integrity.valid;
  const message = isGood
    ? 'Counted! Come back tomorrow in a fresh tab and pass it again to master this topic.'
    : explainReasons(integrity.reasons);

  return (
    <div
      className={`mt-4 lg:mt-5 flex items-start gap-2.5 px-4 py-3 rounded-lg border ${
        isGood
          ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-700/40'
          : 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-700/40'
      }`}
    >
      {isGood ? (
        <Trophy size={18} className="shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <ShieldAlert size={18} className="shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
      )}
      <p className="text-sm lg:text-base text-zinc-700 dark:text-zinc-200">
        {message}
      </p>
    </div>
  );
}
