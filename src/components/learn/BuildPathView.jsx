import { useState, useEffect, useMemo } from 'react';
import {
  X, ChevronLeft, ChevronRight, Check,
  Trophy, Sparkles, RotateCcw, GraduationCap, Lightbulb, MessageSquareQuote,
} from 'lucide-react';
import {
  getBuildTopic,
  BUILD_LITERACY_NAV_COLORS,
} from '../../data/buildLiteracy';

const PASS_THRESHOLD = 0.8;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Walkthrough + quiz for a Build Literacy path. Same shape as PathView (intro
 * → steps → quiz → result), but the steps render build-topic content (summary,
 * vibe tip, mnemonic) instead of a glossary live demo.
 */
export default function BuildPathView({ path, isOpen, onClose, onAwardBadge, onSelectTopic }) {
  const cc = BUILD_LITERACY_NAV_COLORS;
  const [phase, setPhase] = useState('intro');
  const [stepIndex, setStepIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    setPhase('intro');
    setStepIndex(0);
    setQuizIndex(0);
    setQuizAnswers([]);
    setPicked(null);
  }, [isOpen, path?.id]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const quiz = useMemo(() => {
    if (!path) return [];
    return path.quiz.map(q => ({
      ...q,
      shuffled: shuffle(q.optionIds).map(id => ({
        id,
        title: getBuildTopic(id)?.title || id,
      })),
    }));
  }, [path]);

  if (!isOpen || !path) return null;

  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  const totalSteps = path.items.length;
  const currentId = path.items[stepIndex];
  const currentTopic = currentId ? getBuildTopic(currentId) : null;

  const handleStartPath = () => { setPhase('steps'); setStepIndex(0); };
  const handleNextStep = () => {
    if (stepIndex < totalSteps - 1) setStepIndex(stepIndex + 1);
    else setPhase('quiz');
  };
  const handlePrevStep = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const handlePickAnswer = (optId) => {
    if (picked) return;
    setPicked(optId);
    const q = quiz[quizIndex];
    const correct = optId === q.answerId;
    setQuizAnswers(prev => [...prev, { correct, pickedId: optId, answerId: q.answerId }]);
  };

  const handleNextQuestion = () => {
    setPicked(null);
    if (quizIndex < quiz.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      const correct = quizAnswers.filter(a => a.correct).length;
      const passed = correct / quiz.length >= PASS_THRESHOLD;
      if (passed) onAwardBadge?.(path.id);
      setPhase('result');
    }
  };

  const handleRetryQuiz = () => {
    setQuizIndex(0);
    setQuizAnswers([]);
    setPicked(null);
    setPhase('quiz');
  };

  const handleJumpToTopic = (id) => {
    onSelectTopic?.(id);
    onClose();
  };

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-8 animate-fade-in"
    >
      <div className="w-full max-w-6xl h-full max-h-[94vh] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden">
        <PathHeader
          path={path}
          colors={cc}
          phase={phase}
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          quizIndex={quizIndex}
          totalQuiz={quiz.length}
          onClose={onClose}
        />

        <PathProgress
          phase={phase}
          colors={cc}
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          quizIndex={quizIndex}
          totalQuiz={quiz.length}
        />

        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
          {phase === 'intro' && (
            <IntroScreen
              path={path}
              colors={cc}
              onStart={handleStartPath}
              onJump={handleJumpToTopic}
            />
          )}
          {phase === 'steps' && currentTopic && (
            <StepScreen
              topic={currentTopic}
              colors={cc}
              stepIndex={stepIndex}
              totalSteps={totalSteps}
            />
          )}
          {phase === 'quiz' && quiz[quizIndex] && (
            <QuizScreen
              question={quiz[quizIndex]}
              picked={picked}
              onPick={handlePickAnswer}
              onNext={handleNextQuestion}
              quizIndex={quizIndex}
              totalQuiz={quiz.length}
              colors={cc}
            />
          )}
          {phase === 'result' && (
            <ResultScreen
              path={path}
              colors={cc}
              quizAnswers={quizAnswers}
              totalQuiz={quiz.length}
              onRetry={handleRetryQuiz}
              onClose={onClose}
              onJump={handleJumpToTopic}
            />
          )}
        </div>

        {phase === 'steps' && (
          <div className="shrink-0 flex items-center justify-between px-5 lg:px-7 py-3 lg:py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
            <button
              onClick={handlePrevStep}
              disabled={stepIndex === 0}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm lg:text-base font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} /> Previous
            </button>
            <span className="text-sm lg:text-base text-zinc-500 dark:text-zinc-400">
              Step {stepIndex + 1} of {totalSteps}
            </span>
            <button
              onClick={handleNextStep}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm lg:text-base font-semibold text-white transition-colors ${colors_active(cc)}`}
            >
              {stepIndex === totalSteps - 1 ? 'Take the quiz' : 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function colors_active(cc) {
  return cc.active || 'bg-indigo-600 hover:bg-indigo-500';
}

function PathHeader({ path, colors, phase, stepIndex, totalSteps, quizIndex, totalQuiz, onClose }) {
  let subtitle;
  if (phase === 'intro') subtitle = path.tagline;
  else if (phase === 'steps') subtitle = `Step ${stepIndex + 1} of ${totalSteps}`;
  else if (phase === 'quiz') subtitle = `Quiz · Question ${quizIndex + 1} of ${totalQuiz}`;
  else subtitle = 'Results';

  return (
    <div className="shrink-0 flex items-center justify-between px-5 lg:px-7 py-4 lg:py-5 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 min-w-0">
        <GraduationCap size={22} className={colors.accent} />
        <div className="min-w-0">
          <h2 className="text-lg lg:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white truncate">
            {path.name}
          </h2>
          <p className="text-sm lg:text-base text-zinc-500 dark:text-zinc-400 truncate">
            {subtitle}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        aria-label="Exit path"
      >
        <X size={20} />
      </button>
    </div>
  );
}

function PathProgress({ phase, colors, stepIndex, totalSteps, quizIndex, totalQuiz }) {
  let percent = 0;
  const stepsSpan = 70;
  const quizSpan = 30;
  if (phase === 'intro') percent = 0;
  else if (phase === 'steps') percent = ((stepIndex + 1) / totalSteps) * stepsSpan;
  else if (phase === 'quiz') percent = stepsSpan + (quizIndex / totalQuiz) * quizSpan;
  else percent = 100;

  return (
    <div className="shrink-0 h-1 bg-zinc-100 dark:bg-zinc-800">
      <div
        className={`h-full bg-gradient-to-r ${colors.gradient} transition-all duration-500`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function IntroScreen({ path, colors, onStart, onJump }) {
  return (
    <div className="flex-1 p-6 lg:p-10">
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} ${colors.text} text-sm lg:text-base font-semibold mb-4`}>
        <Sparkles size={14} />
        Learning path · {path.items.length} topics
      </div>
      <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
        {path.name}
      </h1>
      <p className="text-base lg:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 lg:mb-8">
        {path.description}
      </p>

      <div className="mb-6 lg:mb-8">
        <h2 className="text-sm lg:text-base font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
          What you'll learn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {path.items.map((id, i) => {
            const topic = getBuildTopic(id);
            return (
              <button
                key={id}
                onClick={() => onJump(id)}
                className="flex items-start gap-3 px-3 py-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-left transition-colors"
              >
                <span className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${colors.bg} ${colors.text}`}>
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="text-base lg:text-lg font-semibold text-zinc-900 dark:text-white">
                    {topic?.title || id}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                    {topic?.summary}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={onStart}
        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base lg:text-lg font-bold text-white transition-colors ${colors_active(colors)}`}
      >
        Start path <ChevronRight size={20} />
      </button>
    </div>
  );
}

function StepScreen({ topic, colors, stepIndex, totalSteps }) {
  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-0 min-h-0">
      {/* Left: explanation */}
      <div className="flex-1 p-5 lg:p-8 min-w-0 lg:overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
          <span className={`text-xs lg:text-sm font-bold uppercase tracking-wider ${colors.accent}`}>
            {topic.clusterTitle} · {stepIndex + 1}/{totalSteps}
          </span>
        </div>
        <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3 lg:mb-4">
          {topic.title}
        </h2>
        <p className="text-base lg:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4 lg:mb-5">
          {topic.summary}
        </p>
        {topic.comparison && (
          <p className="text-sm lg:text-base italic text-zinc-500 dark:text-zinc-400 mb-4">
            {topic.comparison}
          </p>
        )}
      </div>
      {/* Right: vibe tip + mnemonic, the equivalent of "the demo" for build */}
      <div className="lg:w-[28rem] xl:w-[32rem] shrink-0 bg-zinc-50 dark:bg-zinc-900/60 min-h-[280px] lg:min-h-0 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 p-5 lg:p-8 flex flex-col gap-4">
        {topic.vibeTip && (
          <div className={`flex items-start gap-3 px-4 py-3 lg:px-5 lg:py-4 rounded-xl border ${colors.border} ${colors.bg}`}>
            <Lightbulb size={20} className={`shrink-0 mt-0.5 ${colors.accent}`} />
            <div>
              <p className={`text-xs lg:text-sm font-bold uppercase tracking-wider ${colors.text} mb-1`}>
                Vibe tip
              </p>
              <p className="text-base lg:text-lg text-zinc-700 dark:text-zinc-200 leading-relaxed">
                {topic.vibeTip}
              </p>
            </div>
          </div>
        )}
        {topic.mnemonic && (
          <div className="flex items-start gap-3 px-4 py-3 lg:px-5 lg:py-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <MessageSquareQuote size={20} className="shrink-0 mt-0.5 text-zinc-400" />
            <div>
              <p className="text-xs lg:text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                If you remember nothing else
              </p>
              <p className="text-base lg:text-lg text-zinc-800 dark:text-zinc-100 leading-snug font-semibold">
                {topic.mnemonic}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizScreen({ question, picked, onPick, onNext, quizIndex, totalQuiz, colors }) {
  const showNext = !!picked;
  const pickedId = picked;
  const isCorrect = pickedId === question.answerId;

  return (
    <div className="flex-1 p-6 lg:p-10 flex flex-col">
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} ${colors.text} text-sm lg:text-base font-semibold mb-4`}>
        <Trophy size={14} />
        Quiz · {quizIndex + 1} / {totalQuiz}
      </div>
      <p className="text-xl lg:text-3xl font-bold text-zinc-900 dark:text-white mb-5 lg:mb-7 leading-snug">
        {question.q}
      </p>

      <div className="grid grid-cols-1 gap-2.5 lg:gap-3">
        {question.shuffled.map(opt => {
          const isPickedWrong = pickedId === opt.id && opt.id !== question.answerId;
          const isPickedRight = pickedId === opt.id && opt.id === question.answerId;
          const showCorrect = pickedId && opt.id === question.answerId;

          let stateClasses =
            'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500';
          let icon = null;

          if (isPickedRight || showCorrect) {
            stateClasses = 'bg-emerald-500 border-emerald-500 text-white shadow-md';
            icon = <Check size={18} className="shrink-0" />;
          } else if (isPickedWrong) {
            stateClasses = 'bg-rose-500/10 border-rose-400 text-rose-700 dark:text-rose-300';
            icon = <X size={18} className="shrink-0 text-rose-500" />;
          }

          return (
            <button
              key={opt.id}
              onClick={() => onPick(opt.id)}
              disabled={!!picked}
              className={`w-full flex items-center gap-3 px-4 py-3 lg:px-5 lg:py-4 rounded-lg lg:rounded-xl border-2 text-left text-base lg:text-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed ${stateClasses}`}
            >
              {icon}
              <span className="flex-1 min-w-0">{opt.title}</span>
            </button>
          );
        })}
      </div>

      {showNext && (
        <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className={`text-base lg:text-lg font-semibold ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isCorrect ? 'Correct!' : 'Not quite, see the right answer above.'}
          </p>
          <button
            onClick={onNext}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-base lg:text-lg font-bold text-white transition-colors ${colors_active(colors)}`}
          >
            {quizIndex === totalQuiz - 1 ? 'See results' : 'Next question'} <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

function ResultScreen({ path, colors, quizAnswers, totalQuiz, onRetry, onClose, onJump }) {
  const correct = quizAnswers.filter(a => a.correct).length;
  const percent = Math.round((correct / totalQuiz) * 100);
  const passed = correct / totalQuiz >= PASS_THRESHOLD;

  return (
    <div className="flex-1 p-6 lg:p-10 text-center flex flex-col">
      {passed ? (
        <>
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${colors.gradient} mb-5 shadow-lg mx-auto`}>
            <Trophy size={40} className="text-white" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">
            Badge earned!
          </h2>
          <p className="text-lg lg:text-xl text-zinc-600 dark:text-zinc-300 mb-2">
            You scored <strong>{correct}/{totalQuiz}</strong> ({percent}%).
          </p>
          <p className="text-base lg:text-lg text-zinc-500 dark:text-zinc-400 mb-8">
            You've mastered the <strong>{path.name}</strong> path.
          </p>
        </>
      ) : (
        <>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-5 mx-auto">
            <RotateCcw size={36} className="text-zinc-500 dark:text-zinc-400" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">
            Not quite yet
          </h2>
          <p className="text-lg lg:text-xl text-zinc-600 dark:text-zinc-300 mb-2">
            You scored <strong>{correct}/{totalQuiz}</strong> ({percent}%).
          </p>
          <p className="text-base lg:text-lg text-zinc-500 dark:text-zinc-400 mb-8">
            You need {Math.ceil(totalQuiz * PASS_THRESHOLD)} correct to earn the badge. Want to try again?
          </p>
        </>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
        {!passed && (
          <button
            onClick={onRetry}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-base lg:text-lg font-bold text-white transition-colors ${colors_active(colors)}`}
          >
            <RotateCcw size={18} /> Retry the quiz
          </button>
        )}
        <button
          onClick={onClose}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-base lg:text-lg font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 transition-colors"
        >
          {passed ? 'Done' : 'Exit path'}
        </button>
      </div>

      {/* Missed-question recap, jump-to-topic links */}
      {quizAnswers.some(a => !a.correct) && (
        <div className="mt-8 lg:mt-10 text-left">
          <h3 className="text-sm lg:text-base font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
            Review what you missed
          </h3>
          <div className="space-y-2">
            {quizAnswers.map((a, i) => {
              if (a.correct) return null;
              const topic = getBuildTopic(a.answerId);
              return (
                <button
                  key={i}
                  onClick={() => onJump(a.answerId)}
                  className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-left transition-colors"
                >
                  <X size={16} className="shrink-0 mt-1 text-rose-500" />
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-semibold text-zinc-900 dark:text-white">
                      Answer: {topic?.title}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                      {topic?.summary}
                    </div>
                  </div>
                  <ChevronRight size={16} className="shrink-0 mt-1 text-zinc-400" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
