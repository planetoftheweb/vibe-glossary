import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TOTAL_PAGES = 12;

export default function PaginationDemo({ activeOptions }) {
  const showEllipsis = activeOptions.has('ellipsis');
  const showPageSize = activeOptions.has('pagesize');
  const compact = activeOptions.has('compact');
  const [page, setPage] = useState(3);
  const [pageSize, setPageSize] = useState(25);

  const windowStart = Math.max(1, Math.min(page - 1, TOTAL_PAGES - 3));
  const pages = [];
  for (let i = 0; i < 5 && windowStart + i <= TOTAL_PAGES; i++) {
    pages.push(windowStart + i);
  }

  const pad = compact ? 'px-2 py-1 text-sm' : 'px-3 py-2 text-base';

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 gap-6">
      {showPageSize && (
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>Rows per page</span>
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 rounded-lg px-2 py-1 text-zinc-900 dark:text-zinc-100"
          >
            {[10, 25, 50].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      )}
      <nav aria-label="Pagination demo" className="flex items-center gap-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className={`rounded-lg border border-zinc-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 disabled:opacity-40 ${compact ? 'p-1.5' : 'p-2'}`}
          aria-label="Previous page"
        >
          <ChevronLeft size={compact ? 16 : 20} />
        </button>
        {showEllipsis && page > 3 && (
          <>
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`rounded-lg ${pad} text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800`}
            >
              1
            </button>
            <span className="px-1 text-zinc-400">…</span>
          </>
        )}
        {pages.map(p => (
          <button
            key={p}
            type="button"
            onClick={() => setPage(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`rounded-lg font-medium ${pad} ${
              p === page
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {p}
          </button>
        ))}
        {showEllipsis && page < TOTAL_PAGES - 2 && (
          <>
            <span className="px-1 text-zinc-400">…</span>
            <button
              type="button"
              onClick={() => setPage(TOTAL_PAGES)}
              className={`rounded-lg ${pad} text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800`}
            >
              {TOTAL_PAGES}
            </button>
          </>
        )}
        <button
          type="button"
          disabled={page >= TOTAL_PAGES}
          onClick={() => setPage(p => Math.min(TOTAL_PAGES, p + 1))}
          className={`rounded-lg border border-zinc-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 disabled:opacity-40 ${compact ? 'p-1.5' : 'p-2'}`}
          aria-label="Next page"
        >
          <ChevronRight size={compact ? 16 : 20} />
        </button>
      </nav>
    </div>
  );
}
