import { useState, useEffect } from 'react';
import { Upload, FileText, Check } from 'lucide-react';

export default function DropzoneDemo({ activeOptions }) {
  const [isDrag, setIsDrag]    = useState(false);
  const showPreview  = activeOptions.has('preview');
  const simulateDrag = activeOptions.has('drag');

  useEffect(() => {
    if (simulateDrag) {
      const t = setInterval(() => setIsDrag(p => !p), 2000);
      return () => clearInterval(t);
    } else {
      setIsDrag(false);
    }
  }, [simulateDrag]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className={`w-full max-w-xl aspect-video border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${isDrag ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 scale-105 shadow-xl' : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800'}`}>
        <Upload size={48} className={`mb-4 ${isDrag ? 'text-indigo-600 animate-bounce' : 'text-zinc-400'}`} />
        <p className="text-xl font-semibold text-zinc-600 dark:text-zinc-300">Drag files here</p>
      </div>
      {showPreview && (
        <div className="mt-5 w-full max-w-xl bg-white dark:bg-zinc-800 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center gap-4 animate-slide-in-up shadow-sm">
          <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
            <FileText size={28} className="text-zinc-500" />
          </div>
          <div className="flex-1 text-base">
            <div className="font-bold text-zinc-900 dark:text-zinc-100">report.pdf</div>
            <div className="text-zinc-500 text-sm mt-0.5">1.2MB</div>
          </div>
          <Check size={24} className="text-green-500" />
        </div>
      )}
    </div>
  );
}
