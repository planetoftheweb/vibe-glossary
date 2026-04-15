import { useState } from 'react';
import { GripVertical, CheckCircle2, Circle, Clock } from 'lucide-react';

const INITIAL_ITEMS = [
  { id: '1', text: 'Design homepage mockup', status: 'done' },
  { id: '2', text: 'Build navigation component', status: 'progress' },
  { id: '3', text: 'Write API documentation', status: 'todo' },
  { id: '4', text: 'Set up CI/CD pipeline', status: 'todo' },
  { id: '5', text: 'Review pull requests', status: 'progress' },
];

const STATUS_CONFIG = {
  done: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  progress: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  todo: { icon: Circle, color: 'text-zinc-400', bg: 'bg-zinc-500/10' },
};

export default function DragDropDemo({ activeOptions }) {
  const isKanban = activeOptions.has('kanban');
  const hasHandle = activeOptions.has('handle');
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [dragging, setDragging] = useState(null);

  const handleDragStart = (id) => setDragging(id);
  const handleDragEnd = () => setDragging(null);
  const handleDragOver = (e, targetId) => {
    e.preventDefault();
    if (!dragging || dragging === targetId) return;
    const newItems = [...items];
    const fromIdx = newItems.findIndex(i => i.id === dragging);
    const toIdx = newItems.findIndex(i => i.id === targetId);
    const [moved] = newItems.splice(fromIdx, 1);
    newItems.splice(toIdx, 0, moved);
    setItems(newItems);
  };

  if (isKanban) {
    const columns = { todo: 'To Do', progress: 'In Progress', done: 'Done' };
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
        <div className="w-full max-w-2xl grid grid-cols-3 gap-3">
          {Object.entries(columns).map(([status, label]) => {
            const config = STATUS_CONFIG[status];
            const Icon = config.icon;
            return (
              <div key={status} className="bg-zinc-100 dark:bg-zinc-800/50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={14} className={config.color} />
                  <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">{label}</span>
                  <span className="text-[10px] bg-zinc-200 dark:bg-zinc-700 text-zinc-500 px-1.5 py-0.5 rounded-full">{items.filter(i => i.status === status).length}</span>
                </div>
                <div className="space-y-2">
                  {items.filter(i => i.status === status).map(item => (
                    <div key={item.id} draggable onDragStart={() => handleDragStart(item.id)} onDragEnd={handleDragEnd} onDragOver={e => handleDragOver(e, item.id)}
                      className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 text-sm text-zinc-700 dark:text-zinc-300 cursor-grab active:cursor-grabbing shadow-sm hover:shadow transition-shadow ${dragging === item.id ? 'opacity-50' : ''}`}>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div className="w-full max-w-sm space-y-1.5">
        {items.map(item => {
          const config = STATUS_CONFIG[item.status];
          const Icon = config.icon;
          return (
            <div
              key={item.id}
              draggable={!hasHandle}
              onDragStart={() => !hasHandle && handleDragStart(item.id)}
              onDragEnd={handleDragEnd}
              onDragOver={e => handleDragOver(e, item.id)}
              className={`flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 shadow-sm hover:shadow transition-all ${
                dragging === item.id ? 'opacity-50 scale-95' : ''
              } ${!hasHandle ? 'cursor-grab active:cursor-grabbing' : ''}`}
            >
              {hasHandle && (
                <div draggable onDragStart={() => handleDragStart(item.id)} className="cursor-grab active:cursor-grabbing text-zinc-300 hover:text-zinc-500 transition-colors">
                  <GripVertical size={16} />
                </div>
              )}
              <Icon size={16} className={config.color} />
              <span className="text-sm text-zinc-700 dark:text-zinc-300 flex-1">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
