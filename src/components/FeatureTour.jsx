import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { TOUR_STEPS, TOUR_VERSION, hasSeenCurrentTour, markTourSeen } from '../data/tour';

function getTargetRect(selector) {
  if (!selector) return null;
  const el = document.querySelector(selector);
  if (!el) return null;
  return el.getBoundingClientRect();
}

function SpotlightOverlay({ rect }) {
  if (!rect) return <div className="fixed inset-0 bg-black/60 z-[9998] transition-opacity duration-300" />;

  const padding = 8;
  const x = rect.left - padding;
  const y = rect.top - padding;
  const w = rect.width + padding * 2;
  const h = rect.height + padding * 2;
  const r = 12;

  return (
    <svg className="fixed inset-0 w-full h-full z-[9998] pointer-events-none" style={{ pointerEvents: 'auto' }}>
      <defs>
        <mask id="tour-spotlight-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <rect x={x} y={y} width={w} height={h} rx={r} ry={r} fill="black" />
        </mask>
      </defs>
      <rect
        x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0.6)"
        mask="url(#tour-spotlight-mask)"
      />
    </svg>
  );
}

function TourCard({ step, currentIndex, total, onNext, onPrev, onClose }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });

  useEffect(() => {
    const rect = getTargetRect(step.target);
    if (!rect || !cardRef.current) {
      setPosition({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });
      return;
    }

    const cardRect = cardRef.current.getBoundingClientRect();
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    const gap = 12;

    let top = rect.bottom + gap;
    let left = rect.left + rect.width / 2 - cardRect.width / 2;

    if (top + cardRect.height > viewH - 16) {
      top = rect.top - cardRect.height - gap;
    }
    if (top < 16) top = 16;

    if (left < 16) left = 16;
    if (left + cardRect.width > viewW - 16) left = viewW - 16 - cardRect.width;

    setPosition({ top: `${top}px`, left: `${left}px`, transform: 'none' });
  }, [step]);

  return (
    <div
      ref={cardRef}
      className="fixed z-[9999] w-80 max-w-[calc(100vw-2rem)] bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-5 animate-fade-in"
      style={position}
      role="dialog"
      aria-label={step.title}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-bold text-white">{step.title}</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close tour"
        >
          <X size={16} />
        </button>
      </div>
      <p className="text-sm text-zinc-300 leading-relaxed mb-4">{step.body}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500 font-medium">
          {currentIndex + 1} of {total}
        </span>
        <div className="flex items-center gap-2">
          {currentIndex > 0 && (
            <button
              onClick={onPrev}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft size={14} />
              Back
            </button>
          )}
          <button
            onClick={onNext}
            className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-sm font-bold bg-violet-600 text-white hover:bg-violet-500 transition-colors"
          >
            {currentIndex < total - 1 ? (
              <>Next <ChevronRight size={14} /></>
            ) : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeatureTour({ isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < TOUR_STEPS.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      markTourSeen();
      onClose();
    }
  }, [currentIndex, onClose]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  }, [currentIndex]);

  const handleClose = useCallback(() => {
    markTourSeen();
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentIndex];
  const targetRect = getTargetRect(step.target);

  return (
    <>
      <SpotlightOverlay rect={targetRect} />
      <TourCard
        step={step}
        currentIndex={currentIndex}
        total={TOUR_STEPS.length}
        onNext={handleNext}
        onPrev={handlePrev}
        onClose={handleClose}
      />
    </>
  );
}

export function useTourOffer() {
  const [shouldOffer, setShouldOffer] = useState(false);

  useEffect(() => {
    if (!hasSeenCurrentTour()) {
      setShouldOffer(true);
    }
  }, []);

  const dismiss = useCallback(() => {
    setShouldOffer(false);
  }, []);

  return { shouldOffer, dismiss };
}
