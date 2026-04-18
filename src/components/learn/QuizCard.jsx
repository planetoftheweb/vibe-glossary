import { useMemo, useState, useEffect } from 'react';
import { HelpCircle, Check, X, Lightbulb } from 'lucide-react';

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

export default function QuizCard({
  correctId,
  correctTitle,
  correctDefinition,
  correctComparison,
  distractorPool,
  onCorrect,
  categoryColors,
}) {
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

  useEffect(() => {
    setPicked(null);
    setWrongIds(new Set());
    setShowHint(false);
  }, [correctId]);

  const handlePick = (opt) => {
    if (picked?.correct) return;
    setPicked(opt);
    if (opt.correct) {
      setTimeout(() => onCorrect(), 450);
    } else {
      setWrongIds(prev => new Set(prev).add(opt.id));
      setShowHint(true);
    }
  };

  const cc = categoryColors || {};

  return (
    <div className="mb-6 lg:mb-10">
      <div className={`rounded-xl lg:rounded-2xl border ${cc.border || 'border-indigo-500/30'} ${cc.bg || 'bg-indigo-500/10'} p-5 lg:p-7 shadow-sm`}>
        <div className="flex items-center gap-2.5 mb-4 lg:mb-5">
          <HelpCircle size={22} className={cc.accent || 'text-indigo-500'} />
          <h3 className={`text-base lg:text-xl font-bold uppercase tracking-wider ${cc.text || 'text-indigo-400'}`}>
            Learn Mode
          </h3>
        </div>

        <p className="text-lg lg:text-2xl font-bold text-zinc-900 dark:text-white mb-1 lg:mb-2">
          What does a <span className={cc.accent || 'text-indigo-500'}>{correctTitle}</span> do?
        </p>
        <p className="text-sm lg:text-base text-zinc-500 dark:text-zinc-400 mb-4 lg:mb-5">
          Look at the live demo on the right and pick the description that matches.
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
      </div>
    </div>
  );
}
