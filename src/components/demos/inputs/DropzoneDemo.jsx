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
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-8">
      <div className={`w-full max-w-sm aspect-video border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${isDrag ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 scale-105 shadow-xl' : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900'}`}>
        <Upload size={24} className={`mb-2 ${isDrag ? 'text-indigo-600 animate-bounce' : 'text-zinc-400'}`} />
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Drag files here</p>
      </div>
      {showPreview && (
        <div className="mt-4 w-full max-w-sm bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 animate-slide-in-up">
          <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded flex items-center justify-center">
            <FileText size={20} className="text-zinc-500" />
          </div>
          <div className="flex-1 text-xs">
            <div className="font-bold text-zinc-900 dark:text-zinc-100">report.pdf</div>
            <div className="text-zinc-500">1.2MB</div>
          </div>
          <Check size={16} className="text-green-500" />
        </div>
      )}
    </div>
  );
}
