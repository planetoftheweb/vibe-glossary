import { useState } from 'react';
import {
  AlertTriangle,
  Check,
  Eye,
  Keyboard,
  MousePointer2,
} from 'lucide-react';
import {
  Challenge,
  Inspector,
  LabSection,
  RangeControl,
  Segmented,
  Toggle,
} from './LabPrimitives';

export default function AccessibilityFoundationLab({ lab, onComplete }) {
  if (lab === 'accessibility-audit') return <AccessibilityAuditLab onComplete={onComplete} />;
  if (lab === 'aria-inspector') return <AriaInspectorLab onComplete={onComplete} />;
  if (lab === 'accessibility-tree') return <AccessibilityTreeLab onComplete={onComplete} />;
  if (lab === 'focus-management') return <FocusManagementLab onComplete={onComplete} />;
  if (lab === 'contrast') return <ContrastLab onComplete={onComplete} />;
  if (lab === 'touch-targets') return <TouchTargetsLab onComplete={onComplete} />;
  return <KeyboardNavigationLab onComplete={onComplete} />;
}

const AUDIT_ITEMS = [
  ['label', 'Programmatic label', 'The input needs a name that assistive technology can read.'],
  ['focus', 'Visible focus', 'Keyboard users need to see where the next action will happen.'],
  ['contrast', 'Readable contrast', 'Text must separate clearly from its background.'],
  ['target', '44px target', 'The icon needs enough room for a finger or imprecise pointer.'],
];

function AccessibilityAuditLab({ onComplete }) {
  const [fixed, setFixed] = useState([]);
  const [result, setResult] = useState('Find and repair all four barriers.');
  const complete = fixed.length === AUDIT_ITEMS.length;

  const repair = (id) => {
    setFixed((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      if (next.length === AUDIT_ITEMS.length) {
        setResult('Audit clear. The same interface now works across sight, touch, pointer, and keyboard input.');
        onComplete();
      } else {
        setResult(`${next.length} of ${AUDIT_ITEMS.length} barriers repaired. Keep inspecting.`);
      }
      return next;
    });
  };

  const has = (id) => fixed.includes(id);

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Audit it" title="Four barriers are hiding in plain sight" copy="The page looks finished. Test what happens when someone cannot rely on perfect vision, a mouse, or a precise tap.">
          <div className={`wf-browser-stage wf-audit-stage ${has('contrast') ? 'has-contrast' : ''} ${has('focus') ? 'has-focus' : ''}`}>
            <div className="wf-audit-toolbar">
              <strong>Join the workshop</strong>
              <button type="button" className={has('target') ? 'has-target' : ''} aria-label={has('label') ? 'Close dialog' : undefined}>×</button>
            </div>
            <label>
              {has('label') ? <span>Email address</span> : null}
              <input aria-label={has('label') ? undefined : ''} placeholder={has('label') ? 'you@example.com' : 'Email'} />
            </label>
            <button type="button" className="wf-audit-primary">Reserve my seat</button>
          </div>
        </LabSection>

        <LabSection eyebrow="2 · Repair it" title="Accessibility is a set of testable properties" copy="Fix each property and watch the same interface become more usable for everyone.">
          <div className="wf-audit-list">
            {AUDIT_ITEMS.map(([id, title, description]) => (
              <button key={id} type="button" className={has(id) ? 'is-fixed' : ''} onClick={() => repair(id)}>
                <span>{has(id) ? <Check size={17} /> : <AlertTriangle size={17} />}</span>
                <span><strong>{title}</strong><small>{description}</small></span>
                <span>{has(id) ? 'Fixed' : 'Repair'}</span>
              </button>
            ))}
          </div>
        </LabSection>
      </div>

      <Challenge
        title="When is this audit finished?"
        copy="A polished screenshot is not the finish line. Every barrier above needs a verified repair."
        options={AUDIT_ITEMS.map(([id, title]) => ({
          id,
          label: has(id) ? `${title}: repaired` : `${title}: still failing`,
          onClick: () => repair(id),
          selected: has(id),
          correct: true,
        }))}
        result={result}
        complete={complete}
      />
    </>
  );
}

function AriaInspectorLab({ onComplete }) {
  const [implementation, setImplementation] = useState('visual-only');
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === 'button-expanded';
  const named = implementation !== 'visual-only';
  const stateful = implementation === 'aria-state';

  const choose = (id) => {
    setPick(id);
    if (id === 'button-expanded') {
      setImplementation('aria-state');
      setOpen(true);
      setResult('Correct. The native button supplies the role and interaction. ARIA reports the changing expanded state.');
      onComplete();
    } else if (id === 'role') {
      setResult('A button role supplies a name for the control type, but it does not report whether the menu is open.');
    } else {
      setResult('The visual chevron turns, but a screen reader still receives no name or state.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Hear the control" title="What does the browser announce?" copy="The pixels are identical. Change the semantic information exposed behind them.">
          <Segmented
            label="Implementation"
            value={implementation}
            options={[
              { value: 'visual-only', label: 'Visual only' },
              { value: 'named', label: 'Named' },
              { value: 'aria-state', label: 'Name + state' },
            ]}
            onChange={setImplementation}
          />
          <div className="wf-browser-stage wf-aria-stage">
            <button
              type="button"
              aria-label={named ? 'Course modules' : undefined}
              aria-expanded={stateful ? open : undefined}
              onClick={() => setOpen((value) => !value)}
            >
              Course modules <span className={open ? 'is-open' : ''}>⌄</span>
            </button>
            {open ? <div className="wf-disclosure-panel">HTML anatomy<br />The DOM<br />CSS selectors</div> : null}
          </div>
        </LabSection>

        <LabSection eyebrow="2 · Inspect the API" title="ARIA communicates meaning, not appearance" copy="Use native HTML first. Add ARIA when the interface owns a state the native element cannot infer.">
          <Inspector title="Screen reader receives" rows={[
            ['Role', 'button', 'violet'],
            ['Name', named ? 'Course modules' : '(missing)', named ? 'green' : 'rose'],
            ['State', stateful ? (open ? 'expanded' : 'collapsed') : '(missing)', stateful ? 'green' : 'rose'],
            ['Keyboard action', 'Enter or Space', 'cyan'],
          ]} />
          <div className="wf-code-block"><code>{stateful ? `<button aria-expanded="${open}">` : named ? '<button aria-label="Course modules">' : '<button>'}</code></div>
        </LabSection>
      </div>

      <Challenge
        title="A disclosure button opens and closes a course menu. What should assistive technology receive?"
        options={[
          { id: 'chevron', label: 'Only a rotating chevron', onClick: () => choose('chevron'), selected: pick === 'chevron', correct: false },
          { id: 'role', label: 'role="button" on a div', onClick: () => choose('role'), selected: pick === 'role', correct: false },
          { id: 'button-expanded', label: 'A native button with aria-expanded', onClick: () => choose('button-expanded'), selected: pick === 'button-expanded', correct: true },
        ]}
        result={result}
        complete={complete}
      />
    </>
  );
}

function AccessibilityTreeLab({ onComplete }) {
  const [semantic, setSemantic] = useState(false);
  const [hideDecoration, setHideDecoration] = useState(false);
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === 'semantic-hidden';

  const choose = (id) => {
    setPick(id);
    if (id === 'semantic-hidden') {
      setSemantic(true);
      setHideDecoration(true);
      setResult('Correct. Meaningful nodes gain useful roles, while the decorative sparkle leaves the accessibility tree.');
      onComplete();
    } else if (id === 'css') {
      setResult('Changing color affects the visual layer. It does not create a heading role or remove decorative noise.');
    } else {
      setResult('More divs add DOM nodes, but generic containers do not explain the page structure.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Compare the trees" title="The DOM has everything. The accessibility tree keeps meaning." copy="Change the markup and hide the decorative symbol. Watch the browser’s semantic view update.">
          <div className="wf-browser-stage wf-tree-preview">
            <span aria-hidden={hideDecoration}>✦</span>
            {semantic ? <h3>CSS selectors</h3> : <div className="wf-tree-heading">CSS selectors</div>}
            <p>Selectors tell the browser which elements to style.</p>
            {semantic ? <button type="button">Start lesson</button> : <div className="wf-fake-button">Start lesson</div>}
          </div>
          <div className="wf-toggle-pair">
            <Toggle label="Use semantic elements" checked={semantic} onChange={setSemantic} />
            <Toggle label="Hide decorative sparkle" checked={hideDecoration} onChange={setHideDecoration} />
          </div>
        </LabSection>

        <LabSection eyebrow="2 · Follow the browser" title="Meaning survives the trip" copy="The accessibility tree is the interface assistive technology queries.">
          <div className="wf-tree-columns">
            <div><span>DOM tree</span><ul><li>article</li><li>span “✦”</li><li>{semantic ? 'h3' : 'div'}</li><li>p</li><li>{semantic ? 'button' : 'div'}</li></ul></div>
            <div><span>Accessibility tree</span><ul><li>group</li>{hideDecoration ? null : <li>text “✦”</li>}<li>{semantic ? 'heading, level 3' : 'text'}</li><li>text</li><li>{semantic ? 'button' : 'text'}</li></ul></div>
          </div>
        </LabSection>
      </div>

      <Challenge
        title="The card should expose a heading and button, but the sparkle should stay silent."
        options={[
          { id: 'css', label: 'Change the colors', onClick: () => choose('css'), selected: pick === 'css', correct: false },
          { id: 'divs', label: 'Wrap everything in more divs', onClick: () => choose('divs'), selected: pick === 'divs', correct: false },
          { id: 'semantic-hidden', label: 'Use heading + button, hide decoration', onClick: () => choose('semantic-hidden'), selected: pick === 'semantic-hidden', correct: true },
        ]}
        result={result}
        complete={complete}
      />
    </>
  );
}

function FocusManagementLab({ onComplete }) {
  const [open, setOpen] = useState(false);
  const [trap, setTrap] = useState(false);
  const [returns, setReturns] = useState(false);
  const [focus, setFocus] = useState('Open settings');
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === 'trap-return';

  const openModal = () => {
    setOpen(true);
    setFocus(trap ? 'Dialog title' : 'Page link behind dialog');
  };

  const closeModal = () => {
    setOpen(false);
    setFocus(returns ? 'Open settings' : 'Browser address bar');
  };

  const choose = (id) => {
    setPick(id);
    if (id === 'trap-return') {
      setTrap(true);
      setReturns(true);
      setOpen(true);
      setFocus('Dialog title');
      setResult('Correct. Focus enters the dialog, stays inside it, then returns to the control that opened it.');
      onComplete();
    } else if (id === 'close') {
      setResult('A close button is necessary, but focus can still wander behind the modal or disappear after closing.');
    } else {
      setResult('A higher z-index changes paint order. It cannot move or contain keyboard focus.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Follow focus" title="A modal opens. Where did the keyboard go?" copy="Open and close the simulated dialog. The focus monitor reports the next keyboard destination.">
          <div className="wf-browser-stage wf-focus-stage">
            <button type="button" onClick={openModal}>Open settings</button>
            <a href="#focus-demo">Page link</a>
            {open ? (
              <div className="wf-modal-backdrop">
                <div role="dialog" aria-modal="true" aria-label="Settings">
                  <strong>Settings</strong>
                  <label><input type="checkbox" /> Email updates</label>
                  <button type="button" onClick={closeModal}>Close</button>
                </div>
              </div>
            ) : null}
          </div>
          <div className="wf-focus-monitor"><Keyboard size={17} /> Focus: <strong>{focus}</strong></div>
        </LabSection>

        <LabSection eyebrow="2 · Control the journey" title="Focus has an entrance, boundary, and return trip" copy="A visual overlay is only half a modal. Keyboard focus needs a deliberate route.">
          <Toggle label="Move and trap focus" checked={trap} onChange={setTrap} description="Start inside the dialog and keep Tab within it." />
          <Toggle label="Return focus on close" checked={returns} onChange={setReturns} description="Send focus back to Open settings." />
          <Inspector rows={[
            ['Dialog opens', trap ? 'focus enters dialog' : 'focus stays behind', trap ? 'green' : 'rose'],
            ['Tab at last control', trap ? 'wraps to first control' : 'escapes dialog', trap ? 'green' : 'rose'],
            ['Dialog closes', returns ? 'returns to opener' : 'focus is lost', returns ? 'green' : 'rose'],
          ]} />
        </LabSection>
      </div>

      <Challenge
        title="What turns a visual modal into a predictable keyboard experience?"
        options={[
          { id: 'z-index', label: 'Increase z-index', onClick: () => choose('z-index'), selected: pick === 'z-index', correct: false },
          { id: 'close', label: 'Add only a close button', onClick: () => choose('close'), selected: pick === 'close', correct: false },
          { id: 'trap-return', label: 'Move, trap, and return focus', onClick: () => choose('trap-return'), selected: pick === 'trap-return', correct: true },
        ]}
        result={result}
        complete={complete}
      />
    </>
  );
}

const CONTRAST_BACKGROUNDS = {
  cream: '#FFF8E7',
  white: '#FFFFFF',
  navy: '#172554',
};

const CONTRAST_TEXT = {
  gray: '#9CA3AF',
  slate: '#475569',
  black: '#111827',
  white: '#FFFFFF',
};

function hexLuminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16) / 255);
  const [red, green, blue] = channels.map((channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground, background) {
  const first = hexLuminance(foreground);
  const second = hexLuminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function ContrastLab({ onComplete }) {
  const [backgroundName, setBackgroundName] = useState('cream');
  const [textName, setTextName] = useState('gray');
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const background = CONTRAST_BACKGROUNDS[backgroundName];
  const foreground = CONTRAST_TEXT[textName];
  const ratio = contrastRatio(foreground, background);
  const passes = ratio >= 4.5;
  const complete = pick === 'black';

  const choose = (id) => {
    setPick(id);
    setBackgroundName('cream');
    setTextName(id);
    const nextRatio = contrastRatio(CONTRAST_TEXT[id], CONTRAST_BACKGROUNDS.cream);
    if (id === 'black') {
      setResult(`Correct. ${nextRatio.toFixed(2)}:1 clears the 4.5:1 target for ordinary text.`);
      onComplete();
    } else {
      setResult(`${nextRatio.toFixed(2)}:1 is still below 4.5:1. The text remains hard to separate from the background.`);
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Test the pixels" title="Contrast is a ratio, not a hunch" copy="Change the text and background. The meter calculates how far apart their luminance values are.">
          <div className="wf-contrast-card" style={{ color: foreground, background }}>
            <Eye size={26} />
            <strong>Registration closes Friday</strong>
            <span>Save your place before the workshop fills.</span>
          </div>
          <div className="wf-contrast-controls">
            <Segmented label="Text" value={textName} options={Object.keys(CONTRAST_TEXT)} onChange={setTextName} />
            <Segmented label="Background" value={backgroundName} options={Object.keys(CONTRAST_BACKGROUNDS)} onChange={setBackgroundName} />
          </div>
        </LabSection>

        <LabSection eyebrow="2 · Read the meter" title={`${ratio.toFixed(2)}:1 ${passes ? 'passes' : 'fails'}`} copy="Ordinary text needs at least 4.5:1 under the WCAG AA contrast criterion.">
          <div className={`wf-contrast-meter ${passes ? 'is-pass' : 'is-fail'}`}>
            <span style={{ width: `${Math.min(100, (ratio / 7) * 100)}%` }} />
            <strong>{passes ? <Check size={18} /> : <AlertTriangle size={18} />}{passes ? 'AA pass' : 'AA fail'}</strong>
          </div>
          <Inspector rows={[
            ['Foreground', foreground],
            ['Background', background],
            ['Ratio', `${ratio.toFixed(2)}:1`, passes ? 'green' : 'rose'],
            ['Target', '4.5:1 for ordinary text'],
          ]} />
        </LabSection>
      </div>

      <Challenge
        title="Gray body text on cream measures 2.56:1. Which text color repairs it without changing the background?"
        options={['gray', 'slate', 'black'].map((id) => ({
          id,
          label: `${id}: ${CONTRAST_TEXT[id]}`,
          onClick: () => choose(id),
          selected: pick === id,
          correct: id === 'black',
        }))}
        result={result}
        complete={complete}
      />
    </>
  );
}

function TouchTargetsLab({ onComplete }) {
  const [size, setSize] = useState(24);
  const [spacing, setSpacing] = useState(4);
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === 'hit-area';
  const passes = size >= 44;

  const choose = (id) => {
    setPick(id);
    if (id === 'hit-area') {
      setSize(44);
      setSpacing(10);
      setResult('Correct. The icon can stay visually small while its interactive box grows to a comfortable target.');
      onComplete();
    } else if (id === 'icon') {
      setResult('A larger icon may overpower the design. The invisible hit area can grow without changing the drawing.');
    } else {
      setResult('A tooltip explains the control after someone reaches it. It does not make the control easier to hit.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Try to hit it" title="The icon is not the target" copy="Adjust the invisible button box around the 16px close icon.">
          <div className="wf-touch-stage" style={{ gap: spacing }}>
            {['−', '+', '×'].map((symbol) => (
              <button key={symbol} type="button" style={{ width: size, height: size }}><span>{symbol}</span></button>
            ))}
            <MousePointer2 className="wf-touch-pointer" size={28} />
          </div>
          <div className="wf-slider-stack">
            <RangeControl label="Target size" value={size} min={20} max={60} unit="px" onChange={setSize} />
            <RangeControl label="Space between targets" value={spacing} min={0} max={20} unit="px" onChange={setSpacing} />
          </div>
        </LabSection>

        <LabSection eyebrow="2 · See the hit area" title={passes ? 'Comfortable target' : 'Precision required'} copy="The dotted square is the clickable area. The symbol can remain light and compact.">
          <div className={`wf-target-diagram ${passes ? 'is-pass' : ''}`} style={{ width: size * 2.2, height: size * 2.2 }}>
            <span>×</span>
          </div>
          <Inspector rows={[
            ['Visible icon', '16px'],
            ['Interactive target', `${size}px × ${size}px`, passes ? 'green' : 'rose'],
            ['Pointer precision', passes ? 'forgiving' : 'high'],
            ['Spacing', `${spacing}px`],
          ]} />
        </LabSection>
      </div>

      <Challenge
        title="A 16px close icon is difficult to tap. What should the design enlarge?"
        options={[
          { id: 'icon', label: 'Make the drawn icon 44px', onClick: () => choose('icon'), selected: pick === 'icon', correct: false },
          { id: 'tooltip', label: 'Add a tooltip', onClick: () => choose('tooltip'), selected: pick === 'tooltip', correct: false },
          { id: 'hit-area', label: 'Make the button’s hit area at least 44px', onClick: () => choose('hit-area'), selected: pick === 'hit-area', correct: true },
        ]}
        result={result}
        complete={complete}
      />
    </>
  );
}

const TAB_NAMES = ['Overview', 'Examples', 'Checklist'];

function KeyboardNavigationLab({ onComplete }) {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState('tab-everything');
  const [lastKey, setLastKey] = useState('Nothing yet');
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === 'arrows';

  const handleKey = (event) => {
    const key = event.key;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return;
    event.preventDefault();
    setLastKey(key);
    if (key === 'Home') setActive(0);
    else if (key === 'End') setActive(TAB_NAMES.length - 1);
    else if (key === 'ArrowRight') setActive((value) => (value + 1) % TAB_NAMES.length);
    else setActive((value) => (value - 1 + TAB_NAMES.length) % TAB_NAMES.length);
  };

  const choose = (id) => {
    setPick(id);
    if (id === 'arrows') {
      setMode('arrow-roving');
      setLastKey('ArrowRight');
      setActive(1);
      setResult('Correct. Tab enters the tablist once. Arrow keys move within the related set without flooding the Tab order.');
      onComplete();
    } else if (id === 'tab') {
      setResult('Tab should move between major controls. Requiring three Tab presses for one tablist makes the page slower to traverse.');
    } else {
      setResult('Click-only tabs leave keyboard users without an equivalent interaction.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Drive with keys" title="Tab gets you there. Arrows move within the widget." copy="Focus the tablist and use Left, Right, Home, or End. The selected panel follows.">
          <Segmented
            label="Keyboard model"
            value={mode}
            options={[
              { value: 'tab-everything', label: 'Tab through each' },
              { value: 'arrow-roving', label: 'Roving focus' },
            ]}
            onChange={setMode}
          />
          <div className="wf-tabs-demo">
            <div role="tablist" aria-label="Lesson details" onKeyDown={handleKey}>
              {TAB_NAMES.map((name, index) => (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  tabIndex={mode === 'arrow-roving' ? (active === index ? 0 : -1) : 0}
                  onClick={() => setActive(index)}
                >
                  {name}
                </button>
              ))}
            </div>
            <div role="tabpanel"><strong>{TAB_NAMES[active]}</strong><p>{['Start with the mental model.', 'Watch the same behavior in context.', 'Verify the interaction before shipping.'][active]}</p></div>
          </div>
        </LabSection>

        <LabSection eyebrow="2 · Read the route" title="Keyboard order should match the interface structure" copy="Composite widgets use one Tab stop plus internal arrow-key navigation.">
          <div className="wf-key-monitor"><Keyboard size={22} /><span>Last key</span><strong>{lastKey}</strong></div>
          <Inspector rows={[
            ['Tab stops in widget', mode === 'arrow-roving' ? '1' : '3', mode === 'arrow-roving' ? 'green' : 'rose'],
            ['Active tab', TAB_NAMES[active]],
            ['Move inside set', mode === 'arrow-roving' ? 'Arrow keys' : 'Tab key'],
            ['Jump to ends', 'Home and End'],
          ]} />
        </LabSection>
      </div>

      <Challenge
        title="A tablist is one composite control. How should a keyboard user move between its tabs?"
        options={[
          { id: 'click', label: 'Pointer clicks only', onClick: () => choose('click'), selected: pick === 'click', correct: false },
          { id: 'tab', label: 'Press Tab for every tab', onClick: () => choose('tab'), selected: pick === 'tab', correct: false },
          { id: 'arrows', label: 'Tab into the set, then use arrow keys', onClick: () => choose('arrows'), selected: pick === 'arrows', correct: true },
        ]}
        result={result}
        complete={complete}
      />
    </>
  );
}
