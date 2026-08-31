import { useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  GraduationCap,
  Trophy,
  X,
} from 'lucide-react';

const QUESTION_VARIANTS = [
  {
    id: 'checkpoint-match',
    prompt: (title) => `Which description matches ${title}?`,
  },
  {
    id: 'checkpoint-purpose',
    prompt: (title) => `What does ${title} do?`,
  },
  {
    id: 'checkpoint-definition',
    prompt: (title) => `Pick the best definition for ${title}.`,
  },
];

function buildChoices(item, pool, questionIndex) {
  const seenDefinitions = new Set([item.definition]);
  const distractors = [];

  for (const candidate of pool) {
    if (
      candidate.id === item.id ||
      !candidate.definition ||
      seenDefinitions.has(candidate.definition)
    ) continue;
    seenDefinitions.add(candidate.definition);
    distractors.push({ ...candidate, correct: false });
    if (distractors.length === 3) break;
  }

  const choices = [...distractors];
  const insertAt = choices.length ? questionIndex % (choices.length + 1) : 0;
  choices.splice(insertAt, 0, { ...item, correct: true });
  return choices;
}

export default function LearningCheckpoint({
  items = [],
  questionPool = [],
  attemptsByTopic = {},
  onRecordAttempt,
  onQuizComplete,
  onComplete,
  onSkip,
  categoryColors = {},
  className = '',
}) {
  const [phase, setPhase] = useState('review');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [wrongIds, setWrongIds] = useState(new Set());
  const [correctPicked, setCorrectPicked] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const completedAnswers = useRef([]);
  const initialAttemptCounts = useRef(
    Object.fromEntries(items.map((checkpointItem) => [
      checkpointItem.id,
      attemptsByTopic[checkpointItem.id]?.length || 0,
    ]))
  );

  const item = items[questionIndex];
  const variant = useMemo(() => {
    if (!item) return QUESTION_VARIANTS[0];
    const attemptCount = initialAttemptCounts.current[item.id] || 0;
    return QUESTION_VARIANTS[attemptCount % QUESTION_VARIANTS.length];
  }, [item]);
  const choices = useMemo(
    () => item ? buildChoices(item, questionPool, questionIndex) : [],
    [item, questionPool, questionIndex]
  );

  if (!items?.length || !item) return null;

  const cc = categoryColors;
  const startQuiz = () => {
    setHasStarted(true);
    setPhase('quiz');
  };

  const pickChoice = (choice) => {
    if (correctPicked || wrongIds.has(choice.id)) return;
    if (!choice.correct) {
      setWrongIds((previous) => new Set(previous).add(choice.id));
      return;
    }

    setCorrectPicked(true);
    completedAnswers.current[questionIndex] = {
      topicId: item.id,
      attempt: {
        valid: true,
        correct: true,
        reasons: [],
        variantId: variant.id,
      },
    };
  };

  const advance = () => {
    if (questionIndex === items.length - 1) {
      completedAnswers.current.forEach(({ topicId, attempt }) => {
        onRecordAttempt?.(topicId, attempt);
      });
      onQuizComplete?.({
        topicIds: completedAnswers.current.map(({ topicId }) => topicId),
        count: completedAnswers.current.length,
      });
      setPhase('complete');
      return;
    }
    setQuestionIndex((index) => index + 1);
    setWrongIds(new Set());
    setCorrectPicked(false);
  };

  return (
    <section
      aria-label="Five-item learning checkpoint"
      className={`mb-6 rounded-2xl border ${cc.border || 'border-violet-500/30'} ${cc.bg || 'bg-violet-500/10'} p-5 shadow-sm lg:mb-10 lg:p-7 ${className}`.trim()}
    >
      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        <GraduationCap size={22} className={cc.accent || 'text-violet-500'} aria-hidden="true" />
        <h2 className={`text-base font-bold uppercase tracking-wider lg:text-xl ${cc.text || 'text-violet-500'}`}>
          Five-item checkpoint
        </h2>
        <span className="ml-auto rounded-full bg-white/70 px-2.5 py-1 text-xs font-bold text-zinc-600 dark:bg-zinc-950/50 dark:text-zinc-300">
          {phase === 'review' ? 'Review' : phase === 'complete' ? 'Complete' : `${questionIndex + 1} of ${items.length}`}
        </span>
      </div>

      {phase === 'review' && (
        <div>
          <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white lg:text-2xl">
            You’ve explored five items. Nice.
          </h3>
          <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            Open any item below for a quick review. Complete all five questions to add the points to your VibeScore.
          </p>

          <div className="mt-5 space-y-2" aria-label="Items to review">
            {items.map((reviewItem) => (
              <details
                key={reviewItem.id}
                className="group rounded-xl border border-zinc-200 bg-white/70 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950/40"
              >
                <summary className="cursor-pointer list-none font-semibold text-zinc-900 marker:hidden dark:text-white">
                  <span className="flex items-center gap-2">
                    <BookOpen size={16} className="shrink-0 text-zinc-500" aria-hidden="true" />
                    <span>{reviewItem.title}</span>
                    <span className="ml-auto text-xs font-medium text-zinc-400 group-open:hidden">Review</span>
                  </span>
                </summary>
                <p className="mt-2 pl-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {reviewItem.definition}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={startQuiz}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-base font-bold text-white transition-colors hover:bg-violet-500"
            >
              {hasStarted ? `Return to question ${questionIndex + 1}` : 'Start the five-question quiz'}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            {onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-300 bg-white/60 px-4 py-2.5 text-base font-bold text-zinc-600 transition-colors hover:border-zinc-400 hover:bg-white hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950/30 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-white"
              >
                Skip for now
              </button>
            )}
          </div>
          {onSkip && (
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              No points are added. Keep exploring and take another checkpoint later.
            </p>
          )}
        </div>
      )}

      {phase === 'quiz' && (
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-violet-500 transition-all"
                style={{ width: `${((questionIndex + 1) / items.length) * 100}%` }}
              />
            </div>
            <button
              type="button"
              onClick={() => setPhase('review')}
              className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-zinc-600 transition-colors hover:bg-white/70 dark:text-zinc-300 dark:hover:bg-zinc-900/60"
            >
              <BookOpen size={16} aria-hidden="true" />
              Review items
            </button>
          </div>

          <p className="text-xl font-extrabold text-zinc-900 dark:text-white lg:text-2xl">
            {variant.prompt(item.title)}
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Pick an answer. If you miss one, review the choices and try again.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-2.5">
            {choices.map((choice) => {
              const isWrong = wrongIds.has(choice.id);
              const isCorrect = correctPicked && choice.correct;
              const stateClasses = isCorrect
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : isWrong
                  ? 'border-rose-400 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-500';

              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => pickChoice(choice)}
                  disabled={correctPicked || isWrong}
                  className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-base font-medium leading-snug transition-colors disabled:cursor-not-allowed ${stateClasses}`}
                >
                  {isCorrect && <Check size={18} className="mt-0.5 shrink-0" aria-hidden="true" />}
                  {isWrong && <X size={18} className="mt-0.5 shrink-0" aria-hidden="true" />}
                  <span>{choice.definition}</span>
                </button>
              );
            })}
          </div>

          {correctPicked && (
            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-500/10 px-4 py-3 dark:border-emerald-700/50">
              <p className="flex-1 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                Correct. Finish the quiz to add your VibeScore points.
              </p>
              <button
                type="button"
                onClick={advance}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500"
              >
                {questionIndex === items.length - 1 ? 'Finish quiz' : 'Next question'}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'complete' && (
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500">
            <Trophy size={28} aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-2xl font-extrabold text-zinc-900 dark:text-white">Quiz complete</h3>
          <p className="mx-auto mt-2 max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            All five correct answers are recorded. Keep exploring and your next checkpoint will appear after five more items.
          </p>
          <button
            type="button"
            onClick={onComplete}
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-base font-bold text-white hover:bg-violet-500"
          >
            Continue learning
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
