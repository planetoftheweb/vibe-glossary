import { useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';

export default function ToastDemo({ activeOptions }) {
  const [toasts, setToasts]  = useState([]);
  const isStacked = activeOptions.has('stacked');
  const hasAction = activeOptions.has('action');
  const isError   = activeOptions.has('error');

  const addToast = () => {
    const id = Date.now();
    setToasts(prev => isStacked ? [...prev, id] : [id]);
    setTimeout(() => setToasts(p => p.filter(t => t !== id)), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative overflow-hidden bg-zinc-50 dark:bg-zinc-900/50">
      <button
        onClick={addToast}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm active:scale-95 hover:bg-indigo-700"
      >
        Trigger Toast
      </button>
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 pointer-events-none z-50">
        {toasts.map((id) => (
          <div
            key={id}
            className={`p-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in-right ${isError ? 'bg-red-50 text-red-900 border border-red-200' : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100'}`}
          >
            {isError
              ? <AlertTriangle size={16} className="text-red-500" />
              : <Check size={16} className="text-green-500" />}
            <div className="text-sm font-medium">
              {isError ? 'Connection Failed' : 'Changes Saved'}
            </div>
            {hasAction && (
              <button className="ml-4 text-xs font-bold underline cursor-pointer pointer-events-auto">Undo</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
