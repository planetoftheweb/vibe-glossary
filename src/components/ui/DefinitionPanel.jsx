import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Definition + expandable long-form details for a glossary entry.
 *
 * Shows the short summary always, with a chevron button to reveal the
 * longer "details" copy. Designed for beginners: spacious type, no jargon
 * surprises, no em dashes, controlled with the keyboard.
 */
export default function DefinitionPanel({
  summary,
  details,
  resetKey,
  categoryColors,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [resetKey]);

  const accent = categoryColors?.text || 'text-indigo-600 dark:text-indigo-400';
  const ring = categoryColors?.border || 'border-indigo-200 dark:border-indigo-900';

  if (!summary) return null;

  return (
    <div className="mb-4 lg:mb-5">
      <p className="text-base lg:text-xl text-zinc-700 dark:text-zinc-200 leading-relaxed font-medium">
        {summary}
      </p>

      {details ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="definition-details"
            className={`mt-3 inline-flex items-center gap-1.5 text-sm lg:text-base font-semibold ${accent} hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900 ${categoryColors?.ring || 'focus-visible:ring-indigo-500'} rounded`}
          >
            <span>{open ? 'Show less' : 'Read more about when to use this'}</span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          <div
            id="definition-details"
            role="region"
            aria-label="Detailed explanation"
            className={`grid transition-all duration-300 ease-out ${
              open ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={`rounded-xl border ${ring} bg-zinc-50/80 dark:bg-zinc-800/40 px-4 py-4 lg:px-5 lg:py-5 text-sm lg:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-3`}
              >
                {String(details)
                  .split(/\n{2,}/)
                  .map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
