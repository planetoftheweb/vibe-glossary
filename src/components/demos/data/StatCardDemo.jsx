import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye } from 'lucide-react';

const STATS = [
  { label: 'Revenue', value: '$48,200', change: '+12.5%', up: true, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Users', value: '2,340', change: '+8.1%', up: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Orders', value: '1,120', change: '-3.2%', up: false, icon: ShoppingCart, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Page Views', value: '89.4K', change: '+24.6%', up: true, icon: Eye, color: 'text-violet-500', bg: 'bg-violet-500/10' },
];

export default function StatCardDemo({ activeOptions }) {
  const hasPeriod = activeOptions.has('period');
  const hasIcon = activeOptions.has('icon');
  const isCompact = activeOptions.has('compact');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className={`w-full max-w-4xl grid ${isCompact ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'} gap-5`}>
        {STATS.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-2">{stat.label}</p>
                  {hasPeriod && (
                    <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-1">Last 30 days</p>
                  )}
                  <p className={`${isCompact ? 'text-2xl' : 'text-3xl'} font-bold text-zinc-900 dark:text-white`}>{stat.value}</p>
                </div>
                {hasIcon && (
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <Icon size={isCompact ? 22 : 28} className={stat.color} />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className={`flex items-center gap-1.5 text-sm font-semibold ${stat.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {stat.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
