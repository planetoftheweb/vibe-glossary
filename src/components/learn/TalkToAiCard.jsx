import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  Check,
  CircleDot,
  Copy,
  FileCode,
  Focus,
  MemoryStick,
  MessageSquareQuote,
  Rocket,
  ScanLine,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { getBuildStudioHeadline } from '../../data/buildStudioCopy';
import StudioShell, { StudioControl } from '../ui/StudioShell';

const LENSES = [
  {
    id: 'map',
    label: 'Map it',
    short: 'Structure',
    description: 'See the parts and how they connect.',
    icon: ScanLine,
  },
  {
    id: 'stress',
    label: 'Break it',
    short: 'Weak default',
    description: 'Expose the mistake this idea prevents.',
    icon: AlertTriangle,
  },
  {
    id: 'apply',
    label: 'Use it',
    short: 'Project move',
    description: 'Turn the idea into a decision you can make.',
    icon: Rocket,
  },
];

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

function noteFor(topic, lens) {
  if (lens === 'stress') {
    return {
      label: 'What changed',
      title: 'Break it shows the mistake this idea helps prevent.',
      body: `Compare the changed diagram with Map it. ${topic?.comparison || topic?.summary || ''}`,
      tone: 'warning',
    };
  }

  if (lens === 'apply') {
    return {
      label: 'What changed',
      title: 'Use it turns the lesson into one decision you can make.',
      body: `Look for the project-ready move. ${topic?.vibeTip || topic?.mnemonic || topic?.summary || ''}`,
      tone: 'safe',
    };
  }

  return {
    label: 'Try this',
    title: 'Start with Map it. Then choose Break it and Use it.',
    body: `Watch the diagram and this note change with each choice. ${topic?.mnemonic || topic?.summary || ''}`,
    tone: 'good',
  };
}

/**
 * A concept studio for Build Literacy. The AI prompts are still available,
 * but they are a handoff after the learner can see the idea, not the lesson.
 */
export default function TalkToAiCard({ topic, categoryColors, onCopy }) {
  const [lens, setLens] = useState('map');
  const [copied, setCopied] = useState(null);
  const note = useMemo(() => noteFor(topic, lens), [topic, lens]);

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

  const activeLens = LENSES.find((item) => item.id === lens) || LENSES[0];

  const controls = (
    <>
      <StudioControl
        number="01"
        icon={Focus}
        label="View"
        value={activeLens.short}
        description="Choose each view in order. Watch the diagram and note change."
        className="concept-studio__lens"
      >
        <div className="vg-studio__choice-list">
          {LENSES.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className="vg-studio__choice"
                aria-pressed={lens === item.id}
                onClick={() => setLens(item.id)}
              >
                <span className="vg-studio__choice-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="vg-studio__choice-copy">
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
                <Icon size={17} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </StudioControl>

      <StudioControl
        number="02"
        icon={MessageSquareQuote}
        label="Use with AI"
        value="After the lesson"
        description="Copy a prompt for your project after the picture makes sense."
        className="concept-studio__handoff"
      >
        <div className="concept-studio__copy-stack">
          <button
            type="button"
            className="concept-studio__copy min-h-[44px]"
            onClick={() => copyPrompt(starter, 'starter')}
            disabled={!starter}
            aria-label="Copy starter prompt"
          >
            <span>{copied === 'starter' ? <Check size={15} /> : <Wand2 size={15} />}</span>
            <span>
              <strong>{copied === 'starter' ? 'Copied' : 'Starter prompt'}</strong>
              <small>Let the AI interview you first</small>
            </span>
            <Copy size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="concept-studio__copy min-h-[44px]"
            onClick={() => copyPrompt(example, 'example')}
            disabled={!example}
            aria-label="Copy real example"
          >
            <span>{copied === 'example' ? <Check size={15} /> : <FileCode size={15} />}</span>
            <span>
              <strong>{copied === 'example' ? 'Copied' : 'Real example'}</strong>
              <small>See a filled-in version</small>
            </span>
            <Copy size={14} aria-hidden="true" />
          </button>
        </div>
      </StudioControl>

      <StudioControl
        number="03"
        icon={MemoryStick}
        label="Remember this"
        value="One sentence"
        description="Carry this sentence into your next project."
        className="concept-studio__memory"
      >
        <blockquote>{topic?.mnemonic || topic?.summary}</blockquote>
      </StudioControl>
    </>
  );

  return (
    <StudioShell
      tone={topic?.clusterId || categoryColors?.tone || 'violet'}
      eyebrow={`${topic?.clusterTitle || 'Build literacy'} studio`}
      title={getBuildStudioHeadline(topic)}
      intro={topic?.summary}
      controls={controls}
      stageLabel="Live concept map"
      stageMeta={`Current view: ${activeLens.label}`}
      stage={<ConceptScene topic={topic} lens={lens} />}
      stageClassName="concept-studio__scene"
      noteLabel={note.label}
      noteTitle={note.title}
      noteBody={note.body}
      noteTone={note.tone}
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
            <span className="spacing-scene__label">border</span>
            <div className="spacing-scene__padding">
              <span className="spacing-scene__label">padding</span>
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
