import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Filter } from 'lucide-react';

const ROWS = [
  { id: 1, name: 'Alice Chen', role: 'Engineer', status: 'Active', revenue: '$12,400' },
  { id: 2, name: 'Bob Martinez', role: 'Designer', status: 'Away', revenue: '$8,200' },
  { id: 3, name: 'Carol Johnson', role: 'PM', status: 'Active', revenue: '$15,800' },
  { id: 4, name: 'Dan Kim', role: 'Engineer', status: 'Offline', revenue: '$9,600' },
  { id: 5, name: 'Eve Patel', role: 'Designer', status: 'Active', revenue: '$11,300' },
];

const STATUS_COLORS = {
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Away: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Offline: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
};

export default function TableDemo({ activeOptions }) {
  const isSortable = activeOptions.has('sortable');
  const isFilterable = activeOptions.has('filterable');
  const isStriped = activeOptions.has('striped');
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [filter, setFilter] = useState('');

  const handleSort = (col) => {
    if (!isSortable) return;
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  };

  let rows = [...ROWS];
  if (filter) rows = rows.filter(r => r.name.toLowerCase().includes(filter.toLowerCase()) || r.role.toLowerCase().includes(filter.toLowerCase()));
  if (sortCol) rows.sort((a, b) => {
    const v = a[sortCol] > b[sortCol] ? 1 : -1;
    return sortDir === 'asc' ? v : -v;
  });

  const SortIcon = ({ col }) => {
    if (!isSortable) return null;
    if (sortCol === col) return sortDir === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
    return <ArrowUpDown size={12} className="opacity-30" />;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div className="w-full max-w-2xl">
        {isFilterable && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg">
              <Search size={14} className="text-zinc-400" />
              <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter rows..." className="bg-transparent outline-none text-sm w-full text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400" />
            </div>
            <button className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-600">
              <Filter size={14} />
            </button>
          </div>
        )}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                {['name', 'role', 'status', 'revenue'].map(col => (
                  <th key={col} onClick={() => handleSort(col)} className={`text-left px-4 py-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ${isSortable ? 'cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-200 select-none' : ''}`}>
                    <div className="flex items-center gap-1">
                      {col} <SortIcon col={col} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id} className={`border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors ${isStriped && i % 2 ? 'bg-zinc-25 dark:bg-zinc-800/20' : ''}`}>
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">{row.name}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.role}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[row.status]}`}>{row.status}</span></td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 font-mono">{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-between text-xs text-zinc-400">
            <span>{rows.length} results</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
