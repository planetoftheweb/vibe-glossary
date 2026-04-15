export default function ProgressDemo({ activeOptions }) {
  const isStripe = activeOptions.has('stripe');
  const hasLabel = activeOptions.has('label');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-8">
      <div className="w-64 space-y-1">
        {hasLabel && (
          <div className="flex justify-between text-xs font-bold text-zinc-500">
            <span>Loading</span>
            <span>60%</span>
          </div>
        )}
        <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-indigo-600 w-[60%] rounded-full ${isStripe ? 'bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]' : ''}`}
          ></div>
        </div>
      </div>
    </div>
  );
}
