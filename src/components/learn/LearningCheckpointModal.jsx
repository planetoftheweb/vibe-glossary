import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, X } from 'lucide-react';
import LearningCheckpoint from './LearningCheckpoint';

function focusableElements(root) {
  if (!root) return [];
  return Array.from(root.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  ));
}

export default function LearningCheckpointModal({ onSkip, ...checkpointProps }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusFrame = window.requestAnimationFrame(() => {
      focusableElements(dialogRef.current)[0]?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'ArrowRight') {
        event.preventDefault();
        event.stopPropagation();
        onSkip?.();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = focusableElements(dialogRef.current);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onSkip]);

  return createPortal(
    <div className="fixed inset-0 z-[180] grid place-items-center overflow-y-auto bg-zinc-950/80 p-3 backdrop-blur-md sm:p-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="learning-checkpoint-modal-title"
        className="my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-violet-400/35 bg-zinc-950 text-white shadow-[0_35px_120px_rgba(0,0,0,0.7)]"
      >
        <header className="flex min-h-[58px] items-center gap-3 border-b border-white/10 bg-white/[0.035] px-4 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-violet-300">Checkpoint ready</p>
            <h1 id="learning-checkpoint-modal-title" className="text-base font-extrabold sm:text-lg">Five-item learning checkpoint</h1>
          </div>
          <p className="hidden items-center gap-1.5 text-xs font-semibold text-zinc-400 sm:flex">
            <kbd className="rounded-md border border-white/15 bg-white/5 px-2 py-1 font-sans">Esc</kbd>
            or
            <kbd className="rounded-md border border-white/15 bg-white/5 px-2 py-1 font-sans">→</kbd>
            skip
          </p>
          <button
            type="button"
            onClick={onSkip}
            className="grid min-h-[44px] min-w-[44px] place-items-center rounded-xl text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Skip checkpoint for now"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="max-h-[calc(100vh-110px)] overflow-y-auto p-3 sm:p-5">
          <LearningCheckpoint
            {...checkpointProps}
            onSkip={onSkip}
            className="!mb-0 !border-white/10 !bg-white/[0.035] !shadow-none"
          />
          <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs font-semibold text-zinc-500 sm:hidden">
            <ArrowRight size={14} aria-hidden="true" /> Right Arrow or Escape skips for now
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
