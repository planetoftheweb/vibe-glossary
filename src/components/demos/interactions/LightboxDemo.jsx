import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, ImageIcon } from 'lucide-react';

const IMAGES = [
  { id: 1, color: 'from-violet-400 to-indigo-600', label: 'Abstract A' },
  { id: 2, color: 'from-cyan-400 to-blue-600', label: 'Abstract B' },
  { id: 3, color: 'from-emerald-400 to-teal-600', label: 'Abstract C' },
  { id: 4, color: 'from-amber-400 to-orange-600', label: 'Abstract D' },
  { id: 5, color: 'from-rose-400 to-pink-600', label: 'Abstract E' },
  { id: 6, color: 'from-purple-400 to-fuchsia-600', label: 'Abstract F' },
];

export default function LightboxDemo({ activeOptions }) {
  const hasZoom = activeOptions.has('zoom');
  const hasGallery = activeOptions.has('gallery');
  const [open, setOpen] = useState(null);
  /** When zoom option is on: false = fit to stage, true = magnified (simulates “click to zoom”) */
  const [magnified, setMagnified] = useState(false);

  const close = useCallback(() => {
    setOpen(null);
    setMagnified(false);
  }, []);

  const goPrev = useCallback(() => {
    setOpen((o) => (o === null ? o : (o - 1 + IMAGES.length) % IMAGES.length));
    setMagnified(false);
  }, []);

  const goNext = useCallback(() => {
    setOpen((o) => (o === null ? o : (o + 1) % IMAGES.length));
    setMagnified(false);
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (hasGallery && open !== null) {
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, hasGallery, close, goPrev, goNext]);

  useEffect(() => {
    if (open !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const idx = open ?? 0;
  const current = IMAGES[idx];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-0 p-4 md:p-8">
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 text-center max-w-md">
        Click a tile to open. Toggle prompt options for{' '}
        <span className="font-medium text-zinc-700 dark:text-zinc-200">Zoom</span> and{' '}
        <span className="font-medium text-zinc-700 dark:text-zinc-200">Gallery nav</span>.
      </p>

      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {IMAGES.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => { setOpen(i); setMagnified(false); }}
              className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden group relative ring-1 ring-zinc-200/80 dark:ring-zinc-700/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <div className={`w-full h-full bg-gradient-to-br ${img.color} flex items-center justify-center`}>
                <span className="text-white/90 text-xs sm:text-sm font-bold px-1 text-center">{img.label}</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                <Maximize2 size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" aria-hidden />
              </div>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer, ${current.label}`}
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/92 backdrop-blur-sm cursor-default"
            aria-label="Close lightbox"
            onClick={close}
          />

          {/* Content — centered column; sits above backdrop */}
          <div
            className="relative z-10 flex h-[min(100dvh,100vh)] w-full max-w-5xl flex-col items-center justify-center pointer-events-none"
          >
            {/* Top bar */}
            <div className="pointer-events-auto flex w-full max-w-4xl shrink-0 items-center justify-between gap-3 px-1 pb-3 sm:pb-4">
              <div className="flex items-center gap-2 min-w-0 text-white">
                <ImageIcon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                <span className="text-sm font-medium truncate">{current.label}</span>
                {hasGallery && (
                  <span className="text-xs tabular-nums text-white/60 shrink-0">
                    {open + 1} / {IMAGES.length}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {hasZoom && (
                  <div className="flex items-center rounded-lg bg-white/10 px-2 py-1 text-xs sm:text-sm text-white/90 mr-1">
                    <span className="hidden sm:inline mr-2">View</span>
                    <button
                      type="button"
                      onClick={() => setMagnified(false)}
                      className={`rounded px-2 py-0.5 font-medium transition-colors ${!magnified ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}
                    >
                      Fit
                    </button>
                    <button
                      type="button"
                      onClick={() => setMagnified(true)}
                      className={`rounded px-2 py-0.5 font-medium transition-colors ${magnified ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}
                    >
                      Zoom
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={close}
                  className="pointer-events-auto rounded-full p-2.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Stage: arrows + image — flex-1 centers the block vertically */}
            <div className="pointer-events-auto relative flex w-full flex-1 items-center justify-center min-h-0 py-2">
              {hasGallery && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-0 sm:left-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/12 p-3 text-white shadow-lg ring-1 ring-white/20 hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={26} strokeWidth={2.5} />
                </button>
              )}

              <button
                type="button"
                className={`relative z-10 mx-auto flex items-center justify-center rounded-2xl shadow-2xl ring-2 ring-white/10 transition-all duration-300 ease-out overflow-hidden ${
                  hasZoom && magnified
                    ? 'scale-110 sm:scale-125 max-h-[min(78vh,720px)] max-w-[min(92vw,900px)]'
                    : 'scale-100 max-h-[min(58vh,480px)] max-w-[min(85vw,420px)] sm:max-w-md'
                } ${hasZoom ? (magnified ? 'cursor-zoom-out' : 'cursor-zoom-in') : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasZoom) setMagnified((z) => !z);
                }}
                aria-label={hasZoom ? (magnified ? 'Show full image fit to window' : 'Magnify image') : undefined}
              >
                <div
                  className={`bg-gradient-to-br ${current.color} flex items-center justify-center rounded-2xl ${
                    hasZoom && magnified
                      ? 'min-h-[min(52vh,420px)] w-[min(88vw,520px)] sm:min-h-[420px] sm:w-[520px]'
                      : 'aspect-square w-[min(85vw,320px)] sm:w-80'
                  }`}
                >
                  <span className="text-white text-xl sm:text-2xl font-bold px-4 text-center">{current.label}</span>
                </div>
              </button>

              {hasGallery && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-0 sm:right-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/12 p-3 text-white shadow-lg ring-1 ring-white/20 hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Next image"
                >
                  <ChevronRight size={26} strokeWidth={2.5} />
                </button>
              )}
            </div>

            {hasGallery && (
              <div className="pointer-events-auto mt-3 sm:mt-4 flex flex-col items-center gap-2">
                <div className="flex gap-2">
                  {IMAGES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setOpen(i); setMagnified(false); }}
                      className={`h-2 w-2 rounded-full transition-all min-w-[8px] min-h-[8px] ${i === open ? 'bg-white scale-125 ring-2 ring-white/50' : 'bg-white/35 hover:bg-white/70'}`}
                      aria-label={`Go to image ${i + 1}`}
                      aria-current={i === open ? 'true' : undefined}
                    />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-white/45">Arrow keys · Esc to close</p>
              </div>
            )}

            {hasZoom && !hasGallery && (
              <p className="pointer-events-none mt-3 text-center text-xs sm:text-sm text-white/45">
                Use <strong className="text-white/70">Fit</strong> vs <strong className="text-white/70">Zoom</strong> or tap the image
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
