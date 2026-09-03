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
  stageToolbar,
  stage,
  stageClassName = '',
  stageFirst = false,
  noteLabel = 'Studio note',
  noteTitle,
  noteBody,
  noteTone = 'good',
  className = '',
  titleId,
}) {
  const resolvedTitleId = titleId || `studio-${studioId(title)}`;

  const note = (noteTitle || noteBody) ? (
    <div className={`vg-studio__note vg-studio__note--${noteTone}`} aria-live="polite">
      <span>{noteLabel}</span>
      <div>
        {noteTitle ? <strong>{noteTitle}</strong> : null}
        {noteBody ? <p>{noteBody}</p> : null}
      </div>
    </div>
  ) : null;

  const workbench = (
    <div className={`vg-studio__workbench ${controls ? '' : 'vg-studio__workbench--stage-only'}${stageFirst ? ' vg-studio__workbench--stage-first' : ''}`.trim()}>
      {controls && !stageFirst ? (
        <aside className="vg-studio__controls" aria-label={`${title} controls`}>
          {controls}
        </aside>
      ) : null}

      <div className="vg-studio__stage">
        <div className="vg-studio__stage-header">
          <div className="vg-studio__stage-label">
            <span className="vg-studio__live-dot" aria-hidden="true" />
            <Radio size={13} aria-hidden="true" />
            {stageLabel}
          </div>
          {stageToolbar ? <div className="vg-studio__stage-toolbar">{stageToolbar}</div> : null}
          {stageMeta ? <span className="vg-studio__stage-meta">{stageMeta}</span> : null}
        </div>
        <div className={`vg-studio__scene ${stageClassName}`.trim()}>{stage}</div>
      </div>

      {controls && stageFirst ? (
        <aside className="vg-studio__controls" aria-label={`${title} controls`}>
          {controls}
        </aside>
      ) : null}
    </div>
  );

  return (
    <section
      className={`vg-studio vg-studio--${studioId(tone)} ${stageFirst ? 'vg-studio--stage-first' : ''} ${className}`.trim()}
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

      {stageFirst ? (
        <>
          {workbench}
          {note}
        </>
      ) : (
        <>
          {note}
          {workbench}
        </>
      )}
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
