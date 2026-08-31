import { useEffect, useRef, useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';

const TOAST_DURATION_MS = 3000;

export const TOAST_POSITION_CLASSES = {
  'top-left': 'top-6 left-6 items-start',
  'top-right': 'top-6 right-6 items-end',
  'bottom-left': 'bottom-6 left-6 items-start',
  'bottom-right': 'bottom-6 right-6 items-end',
};

export default function ToastDemo({ activeOptions }) {
  const [toasts, setToasts]  = useState([]);
  const nextToastId = useRef(0);
  const timeoutIds = useRef(new Set());
  const hasAction = activeOptions.has('action');
  const isError   = activeOptions.has('error');
  const positionOption = [...activeOptions].find((id) => id.startsWith('position-'));
  const position = positionOption?.replace('position-', '') || 'bottom-right';
  const positionClass = TOAST_POSITION_CLASSES[position] || TOAST_POSITION_CLASSES['bottom-right'];
  const entranceClass = position.endsWith('left') ? 'animate-slide-in-left' : 'animate-slide-in-right';

  useEffect(() => () => {
    timeoutIds.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
  }, []);

  const addToast = () => {
    const id = ++nextToastId.current;
    setToasts((previous) => [...previous, id]);

    const timeoutId = window.setTimeout(() => {
      setToasts((previous) => previous.filter((toastId) => toastId !== id));
      timeoutIds.current.delete(timeoutId);
    }, TOAST_DURATION_MS);
    timeoutIds.current.add(timeoutId);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden p-8">
      <button
        onClick={addToast}
        className="px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md active:scale-95 hover:bg-indigo-700"
      >
        Trigger Toast
      </button>
      <div
        aria-label="Toast notifications"
        aria-live="polite"
        data-toast-position={position}
        className={`absolute flex flex-col gap-3 pointer-events-none z-50 ${positionClass}`}
      >
        {toasts.map((id) => (
          <div
            key={id}
            role="status"
            className={`p-5 rounded-xl shadow-xl flex items-center gap-4 ${entranceClass} ${isError ? 'bg-red-50 text-red-900 border border-red-200' : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100'}`}
          >
            {isError
              ? <AlertTriangle size={22} className="text-red-500" />
              : <Check size={22} className="text-green-500" />}
            <div className="text-base font-medium">
              {isError ? 'Connection Failed' : 'Changes Saved'}
            </div>
            {hasAction && (
              <button className="ml-4 text-sm font-bold underline cursor-pointer pointer-events-auto">Undo</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
