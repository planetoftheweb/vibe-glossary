import { Check, Lightbulb, X } from 'lucide-react';

export function LabSection({ eyebrow, title, copy, children, className = '' }) {
  return (
    <section className={`wf-lab-section ${className}`}>
      <div className="wf-section-heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Inspector({ title = 'Browser reads', rows, children }) {
  return (
    <aside className="wf-inspector">
      <div className="wf-inspector-title">{title}</div>
      {rows ? (
        <dl>
          {rows.map(([label, value, tone]) => (
            <div key={label} className={tone ? `is-${tone}` : ''}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      ) : children}
    </aside>
  );
}

export function Segmented({ label, value, options, onChange }) {
  return (
    <fieldset className="wf-control-group">
      <legend>{label}</legend>
      <div className="wf-segmented">
        {options.map((option) => {
          const item = typeof option === 'string' ? { value: option, label: option } : option;
          return (
            <button
              key={item.value}
              type="button"
              className={value === item.value ? 'is-active' : ''}
              aria-pressed={value === item.value}
              onClick={() => onChange(item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Challenge({ title, copy, options, result, complete }) {
  return (
    <section className={`wf-challenge ${complete ? 'is-complete' : ''}`}>
      <div className="wf-challenge-heading">
        <span>{complete ? <Check size={16} aria-hidden="true" /> : <Lightbulb size={16} aria-hidden="true" />}</span>
        <div>
          <p>Fix the bug</p>
          <h3>{title}</h3>
          {copy ? <div className="wf-challenge-copy">{copy}</div> : null}
        </div>
      </div>
      <div className="wf-challenge-options">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={option.onClick}
            disabled={complete}
            className={option.selected ? option.correct ? 'is-correct' : 'is-wrong' : ''}
          >
            {option.selected ? option.correct ? <Check size={16} /> : <X size={16} /> : null}
            {option.label}
          </button>
        ))}
      </div>
      {result ? <p className={`wf-challenge-result ${complete ? 'is-success' : ''}`} aria-live="polite">{result}</p> : null}
    </section>
  );
}

export function CodeToken({ tone, active, children, label, onClick }) {
  if (!onClick) return <span className={`wf-code-token wf-token-${tone}`}>{children}</span>;
  return (
    <button
      type="button"
      className={`wf-code-token wf-token-${tone} ${active ? 'is-active' : ''}`}
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

export function Toggle({ label, checked, onChange, description }) {
  return (
    <label className="wf-toggle-row">
      <span>
        <strong>{label}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="wf-switch" aria-hidden="true"><span /></span>
    </label>
  );
}

export function RangeControl({ label, value, min, max, step = 1, unit = '', onChange }) {
  return (
    <label className="wf-range-control">
      <span><strong>{label}</strong><output>{value}{unit}</output></span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
