import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Maximize2 } from 'lucide-react';

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
  const hasNav = activeOptions.has('gallery');
  const [open, setOpen] = useState(null);
  const [zoomed, setZoomed] = useState(false);

  const prev = () => setOpen(o => (o - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setOpen(o => (o + 1) % IMAGES.length);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-3 gap-3">
          {IMAGES.map((img, i) => (
            <button
              key={img.id}
              onClick={() => { setOpen(i); setZoomed(false); }}
              className="aspect-square rounded-2xl overflow-hidden group relative"
            >
              <div className={`w-full h-full bg-gradient-to-br ${img.color} flex items-center justify-center`}>
                <span className="text-white/70 text-base font-bold">{img.label}</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Maximize2 size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in" onClick={() => setOpen(null)}>
          <button onClick={(e) => { e.stopPropagation(); setOpen(null); }} className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors">
            <X size={24} />
          </button>

          {hasZoom && (
            <button onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }} className="absolute top-4 right-14 p-2 text-white/60 hover:text-white transition-colors">
              <ZoomIn size={20} />
            </button>
          )}

          {hasNav && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div onClick={e => e.stopPropagation()} className={`transition-transform duration-300 ${zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`} style={hasZoom ? { cursor: zoomed ? 'zoom-out' : 'zoom-in' } : {}}>
            <div className={`bg-gradient-to-br ${IMAGES[open].color} rounded-2xl flex items-center justify-center ${zoomed ? 'w-[500px] h-[500px]' : 'w-80 h-80 md:w-96 md:h-96'}`}>
              <span className="text-white text-2xl font-bold">{IMAGES[open].label}</span>
            </div>
          </div>

          {hasNav && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {IMAGES.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setOpen(i); }} className={`w-2 h-2 rounded-full transition-all ${i === open ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
