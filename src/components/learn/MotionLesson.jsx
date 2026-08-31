import { useMemo, useState } from 'react';
import {
  Accessibility,
  Check,
  Layers3,
  Play,
  Sparkles,
  Timer,
  Waves,
} from 'lucide-react';

const EASINGS = {
  snap: {
    label: 'Snap',
    curve: 'cubic-bezier(0.16, 1, 0.3, 1)',
    hint: 'Fast start, soft landing',
  },
  glide: {
    label: 'Glide',
    curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    hint: 'Even and composed',
  },
  linear: {
    label: 'Linear',
    curve: 'linear',
    hint: 'No acceleration',
  },
};

const CHOREOGRAPHIES = {
  together: {
    label: 'All together',
    short: 'Together',
    backdropDelay: 0,
    cardDelay: 0,
    statusDelay: 0,
  },
  cascade: {
    label: 'Quick cascade',
    short: 'Cascade',
    backdropDelay: 0,
    cardDelay: 70,
    statusDelay: 140,
  },
  story: {
    label: 'Tell a story',
    short: 'Story',
    backdropDelay: 0,
    cardDelay: 110,
    statusDelay: 260,
  },
};

const DURATION_PRESETS = [180, 280, 620];

function directorNote({ duration, easing, choreography, reduced }) {
  if (reduced) {
    return {
      title: 'The meaning stays. The travel disappears.',
      body: 'The result is already visible, with no entrance, sweep, or bounce.',
      tone: 'safe',
    };
  }
  if (duration >= 520) {
    return {
      title: 'Now you can feel the interface making you wait.',
      body: 'Long motion can work for a scene change. It feels heavy on everyday feedback.',
      tone: 'warning',
    };
  }
  if (easing === 'linear') {
    return {
      title: 'Nothing settles, so the entrance feels mechanical.',
      body: 'Linear is useful for progress and rotation. Interfaces usually need acceleration.',
      tone: 'warning',
    };
  }
  if (choreography === 'together') {
    return {
      title: 'Everything arrives at once, so nothing leads.',
      body: 'Separate the cues and your eye knows where to look first, second, and last.',
      tone: 'warning',
    };
  }
  return {
    title: 'The backdrop sets the scene. The card earns focus. Success lands last.',
    body: 'That order is choreography. You are directing attention, not decorating pixels.',
    tone: 'good',
  };
}

export default function MotionLesson() {
  const [duration, setDuration] = useState(280);
  const [easing, setEasing] = useState('snap');
  const [choreography, setChoreography] = useState('story');
  const [reduced, setReduced] = useState(false);
  const [run, setRun] = useState(1);

  const easingData = EASINGS[easing];
  const cue = CHOREOGRAPHIES[choreography];
  const note = directorNote({ duration, easing, choreography, reduced });
  const totalDuration = reduced ? 0 : duration + cue.statusDelay;
  const timeline = useMemo(() => {
    const safeTotal = Math.max(totalDuration, 1);
    return [
      { id: 'scene', label: 'Scene', delay: cue.backdropDelay, duration },
      { id: 'focus', label: 'Focus', delay: cue.cardDelay, duration },
      { id: 'reward', label: 'Reward', delay: cue.statusDelay, duration: Math.round(duration * 0.72) },
    ].map((track) => ({
      ...track,
      left: `${(track.delay / safeTotal) * 100}%`,
      width: `${Math.min(100 - ((track.delay / safeTotal) * 100), (track.duration / safeTotal) * 100)}%`,
    }));
  }, [cue, duration, totalDuration]);

  function replay() {
    setRun((value) => value + 1);
  }

  function chooseDuration(value) {
    setDuration(value);
    setReduced(false);
    setRun((current) => current + 1);
  }

  function chooseEasing(value) {
    setEasing(value);
    setReduced(false);
    setRun((current) => current + 1);
  }

  function chooseChoreography(value) {
    setChoreography(value);
    setReduced(false);
    setRun((current) => current + 1);
  }

  const stageStyle = {
    '--motion-lab-duration': `${reduced ? 0 : duration}ms`,
    '--motion-lab-ease': easingData.curve,
    '--motion-lab-card-delay': `${reduced ? 0 : cue.cardDelay}ms`,
    '--motion-lab-status-delay': `${reduced ? 0 : cue.statusDelay}ms`,
    '--motion-lab-status-duration': `${reduced ? 0 : Math.round(duration * 0.72)}ms`,
    '--motion-lab-total': `${Math.max(totalDuration, 1)}ms`,
  };

  return (
    <section className="motion-lab" aria-labelledby="motion-lab-title">
      <header className="motion-lab__hero">
        <div>
          <p className="motion-lab__eyebrow">
            <Sparkles size={14} aria-hidden /> Motion studio
          </p>
          <h2 id="motion-lab-title">You&apos;re the director now.</h2>
          <p>Change the tempo, the curve, and the cue order. Then watch attention move.</p>
        </div>
        <div className="motion-lab__hero-actions">
          <button
            type="button"
            className="motion-lab__reduce"
            aria-pressed={reduced}
            onClick={() => {
              setReduced((value) => !value);
              setRun((value) => value + 1);
            }}
          >
            <Accessibility size={17} aria-hidden />
            {reduced ? 'Motion reduced' : 'Try reduced motion'}
          </button>
          <button type="button" className="motion-lab__replay" onClick={replay}>
            <Play size={17} fill="currentColor" aria-hidden />
            Replay scene
          </button>
        </div>
      </header>

      <div className="motion-lab__workbench">
        <div className="motion-lab__controls" aria-label="Motion controls">
          <div className="motion-lab__control motion-lab__control--tempo">
            <div className="motion-lab__control-heading">
              <span><Timer size={17} aria-hidden /> 01 · Duration</span>
              <strong>{reduced ? '0' : duration}ms</strong>
            </div>
            <p>How long does the moment get?</p>
            <input
              type="range"
              min="120"
              max="800"
              step="20"
              value={duration}
              aria-label="Animation duration"
              onChange={(event) => chooseDuration(Number(event.target.value))}
            />
            <div className="motion-lab__preset-row">
              {DURATION_PRESETS.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={!reduced && duration === value}
                  onClick={() => chooseDuration(value)}
                >
                  {value === 180 ? 'Quick' : value === 280 ? 'Natural' : 'Dramatic'}
                  <span>{value}ms</span>
                </button>
              ))}
            </div>
          </div>

          <div className="motion-lab__control">
            <div className="motion-lab__control-heading">
              <span><Waves size={17} aria-hidden /> 02 · Easing</span>
              <strong>{easingData.label}</strong>
            </div>
            <p>How does the object gather speed?</p>
            <div className="motion-lab__choice-grid">
              {Object.entries(EASINGS).map(([id, option]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={!reduced && easing === id}
                  aria-label={`Use ${option.label} easing`}
                  onClick={() => chooseEasing(id)}
                >
                  <span className={`motion-lab__curve motion-lab__curve--${id}`} aria-hidden />
                  <strong>{option.label}</strong>
                  <small>{option.hint}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="motion-lab__control">
            <div className="motion-lab__control-heading">
              <span><Layers3 size={17} aria-hidden /> 03 · Choreography</span>
              <strong>{cue.short}</strong>
            </div>
            <p>What enters first, second, and last?</p>
            <div className="motion-lab__choreo-row">
              {Object.entries(CHOREOGRAPHIES).map(([id, option]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={!reduced && choreography === id}
                  onClick={() => chooseChoreography(id)}
                >
                  <span className={`motion-lab__cue-icon motion-lab__cue-icon--${id}`} aria-hidden>
                    <i /><i /><i />
                  </span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="motion-lab__stage"
          data-testid="motion-lab-stage"
          data-reduced={reduced ? 'true' : 'false'}
          data-easing={easing}
          data-choreography={choreography}
          data-duration={reduced ? '0' : String(duration)}
          data-run={String(run)}
          style={stageStyle}
        >
          <div className="motion-lab__stage-header">
            <div>
              <span className="motion-lab__live-dot" aria-hidden />
              Live scene
            </div>
            <span>{reduced ? 'Final state' : `${totalDuration}ms total`}</span>
          </div>

          <div className="motion-lab__scene" key={run}>
            <div className="motion-lab__grid" aria-hidden />
            <div className="motion-lab__orb motion-lab__orb--one" aria-hidden />
            <div className="motion-lab__orb motion-lab__orb--two" aria-hidden />
            <div className="motion-lab__wash" aria-hidden />
            <div className="motion-lab__ghost-label motion-lab__ghost-label--duration" aria-hidden>
              {reduced ? 'NO TRAVEL' : `${duration} MS`}
            </div>
            <div className="motion-lab__ghost-label motion-lab__ghost-label--curve" aria-hidden>
              {easingData.label.toUpperCase()}
            </div>

            <article className="motion-lab__product-card">
              <div className="motion-lab__product-top">
                <div className="motion-lab__product-icon">
                  <Sparkles size={25} aria-hidden />
                </div>
                <span>VIBE DEPLOY</span>
              </div>
              <p>YOUR IDEA IS LIVE</p>
              <h3>That thing in your head<br />is on the screen.</h3>
              <div className="motion-lab__product-footer">
                <span>v0.12.0</span>
                <span>View project</span>
              </div>
            </article>

            <div className="motion-lab__success">
              <span><Check size={16} strokeWidth={3} aria-hidden /></span>
              Published
            </div>
          </div>

          <div className="motion-lab__timeline" aria-label="Animation timeline">
            <div className="motion-lab__timeline-labels">
              <span>0ms</span>
              <strong>Cue stack</strong>
              <span>{reduced ? '0ms' : `${totalDuration}ms`}</span>
            </div>
            <div className="motion-lab__tracks">
              {!reduced && <span className="motion-lab__playhead" aria-hidden />}
              {timeline.map((track) => (
                <div className="motion-lab__track" key={track.id}>
                  <span>{track.label}</span>
                  <div>
                    <i style={{ left: track.left, width: reduced ? '100%' : track.width }} />
                  </div>
                  <em>{reduced ? 'still' : `+${track.delay}ms`}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`motion-lab__note motion-lab__note--${note.tone}`} aria-live="polite">
        <span>Director&apos;s note</span>
        <div>
          <strong>{note.title}</strong>
          <p>{note.body}</p>
        </div>
      </div>
    </section>
  );
}
