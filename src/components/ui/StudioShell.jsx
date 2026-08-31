import { Radio, Sparkles } from 'lucide-react';

function studioId(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'violet';
}

/**
 * The shared teaching frame used by glossary previews and Build Literacy.
 * Motion Studio established the grammar: thesis, controls, live stage, note.
 * This component keeps that grammar consistent while letting each lesson own
 * the thing inside the stage.
 */
export default function StudioShell({
  tone = 'violet',
  eyebrow = 'Interactive studio',
  title,
  intro,
  actions,
  controls,
  stageLabel = 'Live scene',
  stageMeta,
  stage,
  stageClassName = '',
  noteLabel = 'Studio note',
  noteTitle,
  noteBody,
  noteTone = 'good',
  className = '',
  titleId,
}) {
  const resolvedTitleId = titleId || `studio-${studioId(title)}`;

  return (
    <section
      className={`vg-studio vg-studio--${studioId(tone)} ${className}`.trim()}
      aria-labelledby={resolvedTitleId}
    >
      <header className="vg-studio__hero">
        <div className="vg-studio__hero-copy">
          <p className="vg-studio__eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 id={resolvedTitleId}>{title}</h2>
          {intro ? <p className="vg-studio__intro">{intro}</p> : null}
        </div>
        {actions ? <div className="vg-studio__actions">{actions}</div> : null}
      </header>

      {(noteTitle || noteBody) ? (
        <div className={`vg-studio__note vg-studio__note--${noteTone}`} aria-live="polite">
          <span>{noteLabel}</span>
          <div>
            {noteTitle ? <strong>{noteTitle}</strong> : null}
            {noteBody ? <p>{noteBody}</p> : null}
          </div>
        </div>
      ) : null}

      <div className={`vg-studio__workbench ${controls ? '' : 'vg-studio__workbench--stage-only'}`}>
        {controls ? (
          <aside className="vg-studio__controls" aria-label={`${title} controls`}>
            {controls}
          </aside>
        ) : null}

        <div className="vg-studio__stage">
          <div className="vg-studio__stage-header">
            <div>
              <span className="vg-studio__live-dot" aria-hidden="true" />
              <Radio size={13} aria-hidden="true" />
              {stageLabel}
            </div>
            {stageMeta ? <span>{stageMeta}</span> : null}
          </div>
          <div className={`vg-studio__scene ${stageClassName}`.trim()}>{stage}</div>
        </div>
      </div>

    </section>
  );
}

export function StudioControl({
  number,
  icon: Icon,
  label,
  value,
  description,
  children,
  className = '',
}) {
  return (
    <section className={`vg-studio__control ${className}`.trim()}>
      <div className="vg-studio__control-heading">
        <span>
          {Icon ? <Icon size={17} aria-hidden="true" /> : null}
          {number ? `${number} · ` : ''}{label}
        </span>
        {value ? <strong>{value}</strong> : null}
      </div>
      {description ? <p>{description}</p> : null}
      {children}
    </section>
  );
}
