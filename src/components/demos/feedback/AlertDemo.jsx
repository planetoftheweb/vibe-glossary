import { AlertTriangle, Info } from 'lucide-react';

export default function AlertDemo({ activeOptions }) {
  const isError   = activeOptions.has('error');
  const hasAccent = activeOptions.has('accent');

  return (
    <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
      <div className={`w-72 p-4 rounded-md flex gap-3 shadow-sm ${isError ? 'bg-red-50 text-red-900 border-red-100' : 'bg-blue-50 text-blue-900 border-blue-100'} ${hasAccent ? (isError ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-blue-500') : 'border'}`}>
        {isError ? <AlertTriangle size={20} className="shrink-0" /> : <Info size={20} className="shrink-0" />}
        <div>
          <h4 className="font-bold text-sm">{isError ? 'Critical Error' : 'Note'}</h4>
          <p className="text-xs opacity-80 mt-1">Something needs your attention immediately.</p>
        </div>
      </div>
    </div>
  );
}
