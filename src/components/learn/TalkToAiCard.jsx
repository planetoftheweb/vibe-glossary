import { useState } from 'react';
import {
  ArrowRight,
  BrainCircuit,
  Check,
  CircleDot,
  FileCode,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { getBuildStudioHeadline } from '../../data/buildStudioCopy';
import HoverTip from '../ui/HoverTip';
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

  const actions = (starter || example) ? (
    <div className="concept-studio__handoff">
      <button
        type="button"
        className="group relative concept-studio__copy min-h-[44px]"
        onClick={() => copyPrompt(starter, 'starter')}
        disabled={!starter}
        aria-label="Copy a prompt"
      >
        {copied === 'starter' ? <Check size={16} aria-hidden="true" /> : <Wand2 size={16} aria-hidden="true" />}
        <span>{copied === 'starter' ? 'Copied' : 'Copy a prompt'}</span>
        <HoverTip text="Paste this into your AI to work on this idea" />
      </button>
      <button
        type="button"
        className="group relative concept-studio__copy min-h-[44px]"
        onClick={() => copyPrompt(example, 'example')}
        disabled={!example}
        aria-label="Copy a filled-in example"
      >
        {copied === 'example' ? <Check size={16} aria-hidden="true" /> : <FileCode size={16} aria-hidden="true" />}
        <span>{copied === 'example' ? 'Copied' : 'Copy a filled-in example'}</span>
        <HoverTip text="A filled-in version you can paste" />
      </button>
    </div>
  ) : null;

  return (
    <StudioShell
      tone={topic?.clusterId || categoryColors?.tone || 'violet'}
      eyebrow={`${topic?.clusterTitle || 'Build literacy'} studio`}
      title={getBuildStudioHeadline(topic)}
      stageFirst
      controls={actions}
      stageLabel="Live example"
      stage={<ConceptScene topic={topic} lens={lens} />}
      stageClassName="concept-studio__scene"
      className="concept-studio"
    />
  );
}

function ConceptScene({ topic, lens }) {
  if (topic?.id === 'spacing-scale') return <SpacingScene lens={lens} />;
  if (topic?.id === 'typography-scale') return <TypographyScene lens={lens} />;
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
      <div className="concept-visual__caption">
        <CircleDot size={16} aria-hidden="true" />
        {lens === 'stress'
          ? 'Random values make every relationship feel accidental.'
          : lens === 'apply'
            ? 'Pick a base unit, then use its multiples everywhere.'
            : 'Padding is inside. Margin is outside. The scale connects both.'}
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
      <div className="concept-visual__caption">
        <CircleDot size={16} aria-hidden="true" />
        {lens === 'stress' ? 'One-off sizes turn hierarchy into static.' : 'A type scale gives every sentence a job.'}
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
      <div className="concept-visual__caption">
        <CircleDot size={16} aria-hidden="true" />
        {lens === 'apply' ? 'Name the choice once. Reuse the name, not the raw value.' : 'The left side is the contract. The right side is one consumer.'}
      </div>
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
            {index < profile.nodes.length - 1 ? <ArrowRight size={18} aria-hidden="true" /> : <Check size={18} aria-hidden="true" />}
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
      <div className="concept-visual__caption">
        <CircleDot size={16} aria-hidden="true" />
        {lens === 'stress'
          ? `Remove one handoff and the ${profile.nodes[3].toLowerCase()} becomes a guess.`
          : profile.caption}
      </div>
    </div>
  );
}
