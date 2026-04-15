import { useState } from 'react';
import { Check, ChevronRight, ChevronLeft, User, CreditCard, Package } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Account', icon: User, description: 'Create your account' },
  { id: 2, label: 'Payment', icon: CreditCard, description: 'Add payment method' },
  { id: 3, label: 'Confirm', icon: Package, description: 'Review and submit' },
];

export default function StepperDemo({ activeOptions }) {
  const isVertical = activeOptions.has('vertical');
  const hasDescription = activeOptions.has('description');
  const isClickable = activeOptions.has('clickable');
  const [current, setCurrent] = useState(1);

  const goTo = (step) => { if (isClickable || step <= current) setCurrent(step); };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm p-6">
        {/* Stepper */}
        <div className={`flex ${isVertical ? 'flex-col gap-0' : 'items-center justify-between'} mb-8`}>
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isDone = step.id < current;
            const isActive = step.id === current;
            return (
              <div key={step.id} className={`flex ${isVertical ? 'flex-row items-start gap-3' : 'flex-col items-center'} ${isVertical && i > 0 ? 'mt-2' : ''}`}>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => goTo(step.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      isDone ? 'bg-emerald-500 text-white' :
                      isActive ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 ring-4 ring-zinc-200 dark:ring-zinc-700' :
                      'bg-zinc-100 text-zinc-400 dark:bg-zinc-800'
                    } ${isClickable ? 'cursor-pointer hover:scale-110' : ''}`}
                  >
                    {isDone ? <Check size={18} /> : <Icon size={18} />}
                  </button>
                  {isVertical && i < STEPS.length - 1 && (
                    <div className={`w-0.5 h-8 my-1 ${isDone ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-700'}`} />
                  )}
                </div>
                {!isVertical && i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 ${isDone ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-700'} hidden sm:block`} />
                )}
                <div className={isVertical ? '' : 'mt-2 text-center'}>
                  <p className={`text-xs font-semibold ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>{step.label}</p>
                  {hasDescription && <p className="text-[10px] text-zinc-400 mt-0.5">{step.description}</p>}
                </div>
                {!isVertical && i < STEPS.length - 1 && <div className="flex-1 hidden sm:hidden" />}
              </div>
            );
          })}
        </div>

        {/* Form content placeholder */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 mb-6 min-h-[80px] flex items-center justify-center">
          <p className="text-sm text-zinc-400">Step {current}: {STEPS[current - 1].description}</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrent(c => Math.max(1, c - 1))}
            disabled={current === 1}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <button
            onClick={() => setCurrent(c => Math.min(STEPS.length, c + 1))}
            disabled={current === STEPS.length}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg disabled:opacity-30 hover:opacity-90 transition-opacity"
          >
            {current === STEPS.length ? 'Submit' : 'Continue'} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
