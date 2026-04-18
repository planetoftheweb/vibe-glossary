export default function ProgressDemo({ activeOptions }) {
  const isStripe = activeOptions.has('stripe');
  const hasLabel = activeOptions.has('label');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="w-full max-w-xl space-y-2">
        {hasLabel && (
          <div className="flex justify-between text-base font-bold text-zinc-600 dark:text-zinc-300">
            <span>Loading</span>
            <span>60%</span>
          </div>
        )}
        <div className="h-5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-indigo-600 w-[60%] rounded-full ${isStripe ? 'bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]' : ''}`}
          ></div>
        </div>
      </div>
    </div>
  );
}
