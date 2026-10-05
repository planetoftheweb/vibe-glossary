import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronDown,
  MousePointerClick,
  Sparkles,
} from 'lucide-react';
import { getBuildStudioHeadline } from '../../data/buildStudioCopy';
import StudioShell from '../ui/StudioShell';

const CLUSTER_SCENES = {
  product: {
    kicker: 'Decision system',
    nodes: ['Problem', 'Small bet', 'Signal', 'Next move'],
    caption: 'Good product work connects a user problem to evidence before the feature pile grows.',
  },
  engineering: {
    kicker: 'Delivery system',
    nodes: ['Input', 'Guardrail', 'Build', 'Proof'],
    caption: 'Engineering choices become safer when every handoff has a visible contract.',
  },
  'spec-driven': {
    kicker: 'Proof system',
    nodes: ['Intent', 'Criterion', 'Test', 'Evidence'],
    caption: 'A spec earns its keep when another person can prove the result without guessing.',
  },
  data: {
    kicker: 'Data system',
    nodes: ['Source', 'Shape', 'Store', 'Read'],
    caption: 'Follow the value from where it starts to where someone depends on it.',
  },
  protocols: {
    kicker: 'Request system',
    nodes: ['Client', 'Request', 'Server', 'Response'],
    caption: 'The network stops feeling magical once you can name every hop.',
  },
  auth: {
    kicker: 'Trust system',
    nodes: ['Identity', 'Session', 'Permission', 'Resource'],
    caption: 'Authentication proves who you are. Authorization decides what you may touch.',
  },
  'ai-literacy': {
    kicker: 'Thinking system',
    nodes: ['Goal', 'Context', 'Constraint', 'Review'],
    caption: 'A useful AI result starts before the prompt ends and finishes after the answer arrives.',
  },
  'vibe-prompting': {
    kicker: 'Prompt system',
    nodes: ['Goal', 'Examples', 'Boundaries', 'Critique'],
    caption: 'Give the model a job, a room, and a way to check its own work.',
  },
};

/**
 * A concept studio for Build Literacy. The AI prompts are still available,
 * but they are a handoff after the learner can see the idea, not the lesson.
 */
export default function TalkToAiCard({ topic, categoryColors, onCopy }) {
  const [copied, setCopied] = useState(null);
  const [shown, setShown] = useState('starter');
  const lens = 'map';

  const raw = topic?.talkToAi;
  const starter = raw && typeof raw === 'object' ? raw.starter || '' : '';
  const example = raw && typeof raw === 'object'
    ? raw.example || ''
    : (typeof raw === 'string' ? raw : '');

  const copyPrompt = (text, kind) => {
    if (!text) return;

    const fallbackCopy = () => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(textarea);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }

    setCopied(kind);
    window.setTimeout(() => setCopied((current) => current === kind ? null : current), 2000);
    onCopy?.({ kind });
  };

  const shownText = shown === 'example' ? example : starter;

  const showAndCopy = (kind) => {
    const text = kind === 'example' ? example : starter;
    setShown(kind);
    copyPrompt(text, kind);
  };

  const stageToolbar = (starter || example) ? (
    <div className="concept-studio__prompt-tabs">
      {starter ? (
        <button
          type="button"
          className="concept-studio__prompt-tab min-h-[44px]"
          aria-pressed={shown === 'starter'}
          onClick={() => showAndCopy('starter')}
        >
          {copied === 'starter' ? 'Copied' : 'Prompt'}
        </button>
      ) : null}
      {example ? (
        <button
          type="button"
          className="concept-studio__prompt-tab min-h-[44px]"
          aria-pressed={shown === 'example'}
          onClick={() => showAndCopy('example')}
        >
          {copied === 'example' ? 'Copied' : 'Example'}
        </button>
      ) : null}
    </div>
  ) : null;

  return (
    <StudioShell
      tone={topic?.clusterId || categoryColors?.tone || 'violet'}
      eyebrow={`${topic?.clusterTitle || 'Build literacy'} studio`}
      title={getBuildStudioHeadline(topic)}
      stageFirst
      stageToolbar={stageToolbar}
      stageLabel="Live example"
      stage={(
        <>
          {shownText ? (
            <pre className="concept-studio__prompt">{shownText}</pre>
          ) : null}
          <ConceptScene topic={topic} lens={lens} />
        </>
      )}
      stageClassName="concept-studio__scene"
      className="concept-studio"
    />
  );
}

function ConceptScene({ topic, lens }) {
  if (topic?.id === 'spacing-scale') return <SpacingScene lens={lens} />;
  if (topic?.id === 'typography-scale') return <TypographyScene lens={lens} />;
  if (topic?.id === 'so-what-charts') return <SoWhatChartsScene />;
  if (topic?.id === 'feedback-loops') return <FeedbackLoopsScene />;
  if (topic?.id === 'progressive-disclosure') return <ProgressiveDisclosureScene />;
  if (topic?.clusterId === 'design-language') return <TokenScene topic={topic} lens={lens} />;

  const profile = CLUSTER_SCENES[topic?.clusterId] || {
    kicker: 'Concept system',
    nodes: ['Question', 'Choice', 'Action', 'Proof'],
    caption: 'Name the parts, make the choice, then check what happened.',
  };

  return <SystemScene topic={topic} lens={lens} profile={profile} />;
}

function SpacingScene({ lens }) {
  return (
    <div className="concept-visual concept-visual--spacing" data-lens={lens}>
      <div className="concept-visual__ghost" aria-hidden="true">8 × N</div>
      <div className="spacing-scene__scale" aria-label="Spacing scale">
        {[4, 8, 16, 24, 32].map((value) => (
          <span key={value} style={{ '--space-bar': `${Math.max(14, value * 2.2)}px` }}>
            <i aria-hidden="true" />
            {value}
          </span>
        ))}
      </div>
      <div className="spacing-scene__frame">
        <span className="spacing-scene__label spacing-scene__label--margin">margin</span>
        <div className="spacing-scene__margin">
          <div className="spacing-scene__border">
            <span className="spacing-scene__label spacing-scene__label--border">border</span>
            <div className="spacing-scene__padding">
              <span className="spacing-scene__label spacing-scene__label--padding">padding</span>
              <div className="spacing-scene__content">
                <Sparkles size={24} aria-hidden="true" />
                <strong>Content breathes here</strong>
                <small>{lens === 'stress' ? '7px, 13px, 19px. Nothing shares a beat.' : 'Every gap belongs to the same rhythm.'}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypographyScene({ lens }) {
  const sizes = lens === 'stress' ? ['13', '17.5', '19', '31'] : ['12', '16', '24', '48'];
  return (
    <div className="concept-visual concept-visual--type" data-lens={lens}>
      <div className="type-scene__poster">
        <span>TYPE SCALE</span>
        <strong>Aa</strong>
        <p>One family. A few sizes. A page with a voice.</p>
      </div>
      <div className="type-scene__steps">
        {sizes.map((size, index) => (
          <div key={size}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong style={{ fontSize: `${12 + index * 7}px` }}>Make the hierarchy visible</strong>
            <em>{size}px</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function TokenScene({ topic, lens }) {
  const values = lens === 'stress'
    ? ['#6D4AFF', '17px', '11px']
    : ['color.action', 'space.4', 'radius.md'];

  return (
    <div className="concept-visual concept-visual--tokens" data-lens={lens}>
      <div className="concept-visual__ghost" aria-hidden="true">SYSTEM</div>
      <div className="token-scene__rail">
        {values.map((value, index) => (
          <div key={value}>
            <span>{index === 0 ? 'Color' : index === 1 ? 'Space' : 'Shape'}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <ArrowRight className="token-scene__arrow" size={28} aria-hidden="true" />
      <article className="token-scene__card">
        <span>LIVE COMPONENT</span>
        <h3>{topic?.title}</h3>
        <p>{lens === 'stress' ? 'Three hard-coded choices. Three places to drift.' : 'One named decision flows through the whole component.'}</p>
        <button type="button">Primary action</button>
      </article>
    </div>
  );
}

function SystemScene({ topic, lens, profile }) {
  return (
    <div className={`concept-visual concept-visual--system concept-visual--${topic?.clusterId || 'default'}`} data-lens={lens}>
      <div className="concept-visual__ghost" aria-hidden="true">{profile.kicker}</div>
      <div className="system-scene__orbit" aria-hidden="true"><i /><i /><i /></div>
      <div className="system-scene__flow">
        {profile.nodes.map((node, index) => (
          <div className={`system-scene__node ${lens === 'stress' && index === 2 ? 'is-alert' : ''}`} key={node}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{node}</strong>
            {index < profile.nodes.length - 1 ? <ArrowRight size={16} aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
          </div>
        ))}
      </div>
      <article className="system-scene__card">
        <div>
          <BrainCircuit size={24} aria-hidden="true" />
          <span>{profile.kicker}</span>
        </div>
        <h3>{topic?.title}</h3>
        <p>{topic?.summary}</p>
        <div className="system-scene__signal">
          <span aria-hidden="true" />
          {lens === 'stress' ? 'Weak link exposed' : lens === 'apply' ? 'Ready for your project' : 'System mapped'}
        </div>
      </article>
    </div>
  );
}

function SoWhatChartsScene() {
  const [showTakeaway, setShowTakeaway] = useState(true);
  const bars = [
    { label: 'Mon', value: 40 },
    { label: 'Tue', value: 65 },
    { label: 'Wed', value: 55 },
    { label: 'Thu', value: 80 },
    { label: 'Fri', value: 72 },
  ];
  const maxVal = Math.max(...bars.map((b) => b.value));
  return (
    <div className="concept-visual concept-visual--so-what-charts">
      <div className="concept-visual__ghost" aria-hidden="true">SO WHAT</div>
      <div className="so-what__toggle">
        <button
          type="button"
          className={`so-what__toggle-btn min-h-[44px] ${showTakeaway ? 'is-active' : ''}`}
          aria-pressed={showTakeaway}
          onClick={() => setShowTakeaway(!showTakeaway)}
        >
          {showTakeaway ? 'Takeaway visible' : 'Show takeaway'}
        </button>
      </div>
      <article className="so-what__card">
        <div className="so-what__header">
          <BarChart3 size={16} aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Tasks completed per day</span>
        </div>
        <div className={`so-what__takeaway ${showTakeaway ? 'is-visible' : ''}`} aria-live="polite">
          Thursday had the most completions this week (80).
        </div>
        <div className="so-what__chart" role="img" aria-label="Bar chart showing tasks completed Monday through Friday">
          <div className="so-what__y-axis">
            <span>80</span>
            <span>40</span>
            <span>0</span>
          </div>
          <div className="so-what__bars">
            {bars.map((bar) => (
              <div key={bar.label} className="so-what__bar-col">
                <div
                  className="so-what__bar"
                  style={{ '--bar-pct': `${(bar.value / maxVal) * 100}%` }}
                  aria-label={`${bar.label}: ${bar.value}`}
                />
                <span className="text-xs text-zinc-400">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="so-what__axis-label">Tasks completed (count)</p>
      </article>
      <p className="so-what__caption">
        {showTakeaway
          ? 'The takeaway tells the reader what the chart means before they decode the bars.'
          : 'Without the takeaway, the reader has to figure out why this chart exists.'}
      </p>
    </div>
  );
}

function FeedbackLoopsScene() {
  const [step, setStep] = useState('idle');
  const handleClick = () => {
    if (step !== 'idle') return;
    setStep('saving');
    setTimeout(() => {
      setStep('saved');
      setTimeout(() => setStep('idle'), 1800);
    }, 1200);
  };
  return (
    <div className="concept-visual concept-visual--feedback-loops">
      <div className="concept-visual__ghost" aria-hidden="true">FEEDBACK</div>
      <div className="feedback-scene__flow">
        <div className={`feedback-scene__layer ${step !== 'idle' ? 'is-active' : ''}`}>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">01</span>
          <MousePointerClick size={20} aria-hidden="true" />
          <strong>Click</strong>
          <p className="text-sm text-zinc-400">The control responds</p>
        </div>
        <ArrowRight size={16} className="text-zinc-600 shrink-0" aria-hidden="true" />
        <div className={`feedback-scene__layer ${step === 'saving' ? 'is-active' : ''}`}>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">02</span>
          <Sparkles size={20} aria-hidden="true" />
          <strong>Confirm</strong>
          <p className="text-sm text-zinc-400">The result is visible</p>
        </div>
        <ArrowRight size={16} className="text-zinc-600 shrink-0" aria-hidden="true" />
        <div className={`feedback-scene__layer ${step === 'saved' ? 'is-active' : ''}`}>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">03</span>
          <Check size={20} aria-hidden="true" />
          <strong>Done</strong>
          <p className="text-sm text-zinc-400">Trust stays intact</p>
        </div>
      </div>
      <div className="feedback-scene__demo">
        <button
          type="button"
          className={`feedback-scene__save-btn min-h-[44px] ${step === 'saving' ? 'is-saving' : ''} ${step === 'saved' ? 'is-saved' : ''}`}
          onClick={handleClick}
          disabled={step !== 'idle'}
          aria-live="polite"
        >
          {step === 'idle' && 'Save changes'}
          {step === 'saving' && 'Saving\u2026'}
          {step === 'saved' && (
            <><Check size={16} aria-hidden="true" /> Saved</>
          )}
        </button>
        <p className="text-sm text-zinc-400 mt-3 text-center">
          {step === 'idle' && 'Press the button to see every feedback layer.'}
          {step === 'saving' && 'The button tells you the action is in progress.'}
          {step === 'saved' && 'The confirmation closes the loop. No guessing.'}
        </p>
      </div>
    </div>
  );
}

function ProgressiveDisclosureScene() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="concept-visual concept-visual--progressive-disclosure">
      <div className="concept-visual__ghost" aria-hidden="true">DISCLOSE</div>
      <article className="disclosure-scene__panel">
        <div className="disclosure-scene__primary">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Always visible</span>
          <div className="disclosure-scene__field">
            <label className="text-sm font-semibold text-zinc-200">Search</label>
            <div className="disclosure-scene__input" role="presentation">
              <span className="text-sm text-zinc-500">Find a report...</span>
            </div>
          </div>
          <div className="disclosure-scene__field">
            <label className="text-sm font-semibold text-zinc-200">Date range</label>
            <div className="disclosure-scene__input" role="presentation">
              <span className="text-sm text-zinc-500">Last 7 days</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="disclosure-scene__expander min-h-[44px]"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
          {expanded ? 'Hide advanced options' : 'Advanced options'}
        </button>
        <div className={`disclosure-scene__advanced ${expanded ? 'is-open' : ''}`} aria-hidden={!expanded}>
          <div className="disclosure-scene__field">
            <label className="text-sm font-semibold text-zinc-200">Columns</label>
            <div className="disclosure-scene__input" role="presentation">
              <span className="text-sm text-zinc-500">All columns</span>
            </div>
          </div>
          <div className="disclosure-scene__field">
            <label className="text-sm font-semibold text-zinc-200">Sort by</label>
            <div className="disclosure-scene__input" role="presentation">
              <span className="text-sm text-zinc-500">Date (newest first)</span>
            </div>
          </div>
          <div className="disclosure-scene__field">
            <label className="text-sm font-semibold text-zinc-200">Export format</label>
            <div className="disclosure-scene__input" role="presentation">
              <span className="text-sm text-zinc-500">CSV</span>
            </div>
          </div>
        </div>
      </article>
      <p className="disclosure-scene__caption">
        {expanded
          ? 'Power users find the depth they need, one click away.'
          : 'New users see a calm start. The next step is clear.'}
      </p>
    </div>
  );
}
