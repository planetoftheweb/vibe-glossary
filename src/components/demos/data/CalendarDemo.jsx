import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const EVENTS = {
  5: { label: 'Standup', color: 'bg-indigo-500' },
  12: { label: 'Design Review', color: 'bg-emerald-500' },
  18: { label: 'Sprint Demo', color: 'bg-amber-500' },
  22: { label: 'Launch Day', color: 'bg-rose-500' },
};

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarDemo({ activeOptions }) {
  const hasEvents = activeOptions.has('events');
  const isRange = activeOptions.has('range');
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(today.getDate());
  const [rangeEnd, setRangeEnd] = useState(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const todayDate = today.getFullYear() === year && today.getMonth() === month ? today.getDate() : null;

  const handleDayClick = (day) => {
    if (isRange && selected && !rangeEnd) {
      setRangeEnd(day);
    } else {
      setSelected(day);
      setRangeEnd(null);
    }
  };

  const isInRange = (day) => {
    if (!isRange || !selected || !rangeEnd) return false;
    const start = Math.min(selected, rangeEnd);
    const end = Math.max(selected, rangeEnd);
    return day >= start && day <= end;
  };

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div className="w-full max-w-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors"><ChevronLeft size={16} /></button>
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">{MONTHS[month]} {year}</span>
          <button onClick={nextMonth} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors"><ChevronRight size={16} /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map(d => <div key={d} className="text-center text-[10px] font-semibold text-zinc-400 uppercase py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isSelected = day === selected;
            const isToday = day === todayDate;
            const inRange = isInRange(day);
            const event = hasEvents ? EVENTS[day] : null;
            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all ${
                  isSelected ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold' :
                  inRange ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white' :
                  isToday ? 'ring-2 ring-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold' :
                  'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {day}
                {event && <div className={`absolute bottom-0.5 w-1 h-1 rounded-full ${event.color}`} />}
              </button>
            );
          })}
        </div>
        {hasEvents && selected && EVENTS[selected] && (
          <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${EVENTS[selected].color}`} />
              <span className="font-medium text-zinc-900 dark:text-white">{EVENTS[selected].label}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
