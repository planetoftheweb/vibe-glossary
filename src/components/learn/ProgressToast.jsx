import { ArrowRight, Check, Sparkles, Trophy, X } from 'lucide-react';

const ICONS = {
  progress: Sparkles,
  review: Check,
  level: Trophy,
};

export default function ProgressToast({ toast, onDismiss }) {
  const Icon = ICONS[toast.kind] || Sparkles;

  return (
    <aside
      className={`progress-toast progress-toast--${toast.kind || 'progress'}`}
      role="status"
      aria-live="polite"
    >
      <div className="progress-toast__icon" aria-hidden>
        <Icon size={19} />
      </div>
      <div className="progress-toast__body">
        <div className="progress-toast__heading">
          <strong>{toast.title}</strong>
          {toast.points ? <span>+{toast.points} pts</span> : null}
        </div>
        {toast.message ? <p>{toast.message}</p> : null}
        {toast.target ? (
          <div className="progress-toast__target">
            <span>{toast.target.remaining} pts to {toast.target.label}</span>
            <i>
              <b style={{ width: `${toast.target.percent}%` }} />
            </i>
          </div>
        ) : null}
        {toast.actionLabel && toast.onAction ? (
          <button
            type="button"
            className="progress-toast__action"
            onClick={() => {
              toast.onAction();
              onDismiss(toast.id);
            }}
          >
            {toast.actionLabel}
            <ArrowRight size={14} aria-hidden />
          </button>
        ) : null}
      </div>
      <button
        type="button"
        className="progress-toast__close"
        aria-label="Dismiss progress message"
        onClick={() => onDismiss(toast.id)}
      >
        <X size={15} aria-hidden />
      </button>
    </aside>
  );
}
