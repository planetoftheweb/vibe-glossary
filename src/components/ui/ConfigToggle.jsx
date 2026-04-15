export default function ConfigToggle({ options, value, onChange, label }) {
  return (
    <div className="flex items-center space-x-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-1 rounded-lg shadow-sm z-20">
      {label && <span className="text-[10px] font-bold uppercase text-zinc-400 px-2">{label}</span>}
      <div className="flex bg-zinc-100 dark:bg-zinc-950 rounded p-0.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1 text-[10px] font-semibold rounded-md transition-all ${
              value === opt.value
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
