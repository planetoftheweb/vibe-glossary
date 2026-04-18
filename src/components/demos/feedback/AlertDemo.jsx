import { AlertTriangle, Info } from 'lucide-react';

export default function AlertDemo({ activeOptions }) {
  const isError   = activeOptions.has('error');
  const hasAccent = activeOptions.has('accent');

  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className={`w-full max-w-xl p-6 rounded-lg flex gap-4 shadow-md ${isError ? 'bg-red-50 text-red-900 border-red-100' : 'bg-blue-50 text-blue-900 border-blue-100'} ${hasAccent ? (isError ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-blue-500') : 'border'}`}>
        {isError ? <AlertTriangle size={28} className="shrink-0" /> : <Info size={28} className="shrink-0" />}
        <div>
          <h4 className="font-bold text-lg">{isError ? 'Critical Error' : 'Note'}</h4>
          <p className="text-base opacity-80 mt-1.5">Something needs your attention immediately.</p>
        </div>
      </div>
    </div>
  );
}
