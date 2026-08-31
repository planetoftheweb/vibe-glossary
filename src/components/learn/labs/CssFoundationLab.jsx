import { useState } from 'react';
import { Palette } from 'lucide-react';
import {
  Challenge,
  Inspector,
  LabSection,
  RangeControl,
  Segmented,
  Toggle,
} from './LabPrimitives';

export default function CssFoundationLab({ lab, onComplete }) {
  if (lab === 'block-inline') return <BlockInlineLab onComplete={onComplete} />;
  if (lab === 'selectors') return <SelectorLab onComplete={onComplete} />;
  if (lab === 'box-model' || lab === 'margin-padding') return <SpacingLab mode={lab} onComplete={onComplete} />;
  if (lab === 'display-modes' || lab === 'flex-grid') return <DisplayLab mode={lab} onComplete={onComplete} />;
  if (lab === 'position') return <PositionLab onComplete={onComplete} />;
  if (lab === 'css-units') return <UnitsLab onComplete={onComplete} />;
  if (lab === 'color-formats') return <ColorFormatsLab onComplete={onComplete} />;
  return <SpecificityLab onComplete={onComplete} />;
}

function BlockInlineLab({ onComplete }) {
  const [display, setDisplay] = useState('block');
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === 'inline';

  const choose = (id) => {
    setPick(id);
    if (id === 'inline') {
      setDisplay('inline');
      setResult('Correct. Inline content shares the text line instead of claiming a row.');
      onComplete();
    } else {
      setResult(id === 'block' ? 'Block keeps the date on its own row. That is the bug we are repairing.' : 'Flex can align the whole byline, but changing this text element to inline is the smaller fix.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Watch the line" title="One display value moves the date" copy="The author name is ordinary inline text. Change only the date element.">
          <div className="wf-browser-stage wf-inline-stage">
            <p>Written by <strong>Maya Chen</strong> <span className={`wf-date wf-display-${display}`}>August 30</span></p>
            <div className="wf-baseline" aria-hidden="true" />
          </div>
          <Segmented label="Date display" value={display} options={['block', 'inline', 'inline-block']} onChange={setDisplay} />
        </LabSection>
        <LabSection eyebrow="2 · Read the behavior" title="Does it claim the row?" copy="Display changes the element’s participation in surrounding layout.">
          <div className="wf-code-block"><code>.date {'{'} display: {display}; {'}'}</code></div>
          <Inspector rows={[
            ['Starts a new line', display === 'block' ? 'yes' : 'no'],
            ['Accepts width', display === 'inline' ? 'no' : 'yes'],
            ['Shares a text row', display === 'block' ? 'no' : 'yes'],
          ]} />
        </LabSection>
      </div>
      <Challenge
        title="The date should sit naturally after the author’s name. What is the smallest fix?"
        options={[
          { id: 'block', label: 'Keep display: block', onClick: () => choose('block'), selected: pick === 'block', correct: false },
          { id: 'inline', label: 'Use display: inline', onClick: () => choose('inline'), selected: pick === 'inline', correct: true },
          { id: 'flex', label: 'Turn the whole article into Flexbox', onClick: () => choose('flex'), selected: pick === 'flex', correct: false },
        ]}
        result={result}
        complete={complete}
      />
    </>
  );
}

const SELECTOR_OPTIONS = ['*', '.card', '#featured', '.card button'];

function SelectorLab({ onComplete }) {
  const [selector, setSelector] = useState('.card');
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === '.card button';

  const selected = (kind, featured = false) => {
    if (selector === '*') return true;
    if (selector === '.card') return kind === 'card';
    if (selector === '#featured') return kind === 'card' && featured;
    return kind === 'button';
  };

  const choose = (id) => {
    setPick(id);
    setSelector(id);
    if (id === '.card button') {
      setResult('Correct. The descendant selector reaches buttons only when they live inside a card.');
      onComplete();
    } else {
      setResult(id === '*' ? 'The universal selector hits everything, far beyond the intended buttons.' : 'That selector targets the card container, not the buttons inside each card.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Aim" title="Choose a selector" copy="Matched elements light up. Narrow the target without changing the HTML.">
          <Segmented label="Selector" value={selector} options={SELECTOR_OPTIONS} onChange={setSelector} />
          <div className="wf-selector-stage">
            {[false, true].map((featured) => (
              <article key={String(featured)} className={`${selected('card', featured) ? 'is-match' : ''}`}>
                <span>{featured ? 'Featured' : 'Standard'}</span>
                <h3>{featured ? 'Cascade course' : 'HTML course'}</h3>
                <button type="button" className={selected('button', featured) ? 'is-match' : ''}>Open lesson</button>
              </article>
            ))}
          </div>
        </LabSection>
        <LabSection eyebrow="2 · Inspect" title={`${documentSafeMatchCount(selector)} matches`} copy="Selectors can match one element, a reusable group, descendants, or everything.">
          <div className="wf-code-block"><code>{selector} {'{'} outline: 3px solid coral; {'}'}</code></div>
          <Inspector rows={[
            ['Selector', selector],
            ['Meaning', selectorMeaning(selector)],
            ['Matched nodes', documentSafeMatchCount(selector)],
          ]} />
        </LabSection>
      </div>
      <Challenge
        title="Highlight every Open lesson button, but only when it is inside a card."
        options={SELECTOR_OPTIONS.slice(0, 1).concat(['.card', '.card button']).map((id) => ({
          id,
          label: id,
          onClick: () => choose(id),
          selected: pick === id,
          correct: id === '.card button',
        }))}
        result={result}
        complete={complete}
      />
    </>
  );
}

function selectorMeaning(selector) {
  return {
    '*': 'every element',
    '.card': 'elements sharing the card class',
    '#featured': 'the one element with this id',
    '.card button': 'buttons descended from a card',
  }[selector];
}

function documentSafeMatchCount(selector) {
  return { '*': 8, '.card': 2, '#featured': 1, '.card button': 2 }[selector];
}

function SpacingLab({ mode, onComplete }) {
  const [padding, setPadding] = useState(16);
  const [margin, setMargin] = useState(12);
  const [border, setBorder] = useState(3);
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const answer = mode === 'margin-padding' ? 'padding' : 'border-box';
  const complete = pick === answer;

  const choose = (id) => {
    setPick(id);
    if (id === answer) {
      if (mode === 'margin-padding') setPadding(28);
      setResult(mode === 'margin-padding'
        ? 'Correct. Padding expands the colored interior around the content.'
        : 'Correct. border-box keeps padding and border inside the declared width.');
      onComplete();
    } else {
      setResult(mode === 'margin-padding'
        ? 'Margin moves neighboring boxes away. It does not create colored space inside this card.'
        : 'Removing padding hides the symptom by taking away breathing room. The sizing model is the cause.');
    }
  };

  const outerSize = 190 + padding * 2 + border * 2;

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · X-ray" title="Pull the four layers apart" copy="Color makes the invisible rectangles visible.">
          <div className="wf-box-stage">
            <div className="wf-margin-layer" style={{ padding: margin }}>
              <div className="wf-border-layer" style={{ padding: border }}>
                <div className="wf-padding-layer" style={{ padding }}>
                  <div className="wf-content-layer">Content</div>
                </div>
              </div>
            </div>
            <div className="wf-box-legend">
              <span className="is-content">content</span><span className="is-padding">padding</span><span className="is-border">border</span><span className="is-margin">margin</span>
            </div>
          </div>
        </LabSection>
        <LabSection eyebrow="2 · Change it" title="Move one layer at a time" copy="Watch which pixels gain background, border, or distance from their neighbors.">
          <div className="wf-slider-stack">
            <RangeControl label="Padding" value={padding} min={0} max={36} unit="px" onChange={setPadding} />
            <RangeControl label="Border" value={border} min={0} max={10} unit="px" onChange={setBorder} />
            <RangeControl label="Margin" value={margin} min={0} max={36} unit="px" onChange={setMargin} />
          </div>
          <Inspector rows={[
            ['Content width', '190px'],
            ['Visible box', `${outerSize}px`],
            ['Neighbor distance', `${margin}px`],
            ['Background reaches', 'through padding'],
          ]} />
        </LabSection>
      </div>
      <Challenge
        title={mode === 'margin-padding'
          ? 'The text needs more breathing room inside the colored card. What should increase?'
          : 'A 240px card becomes wider when padding is added. What sizing rule keeps it at 240px?'}
        options={(mode === 'margin-padding' ? [
          ['margin', 'Increase margin'], ['padding', 'Increase padding'], ['border', 'Increase border'],
        ] : [
          ['remove-padding', 'Remove the padding'], ['border-box', 'Use box-sizing: border-box'], ['important', 'Add !important to width'],
        ]).map(([id, label]) => ({ id, label, onClick: () => choose(id), selected: pick === id, correct: id === answer }))}
        result={result}
        complete={complete}
      />
    </>
  );
}

function DisplayLab({ mode, onComplete }) {
  const [display, setDisplay] = useState(mode === 'flex-grid' ? 'flex' : 'block');
  const [width, setWidth] = useState(520);
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const answer = mode === 'flex-grid' ? 'grid' : 'flex';
  const complete = pick === answer;

  const choose = (id) => {
    setPick(id);
    if (id === answer) {
      setDisplay(id);
      setResult(mode === 'flex-grid'
        ? 'Correct. Grid coordinates columns and rows, so the gallery stays aligned in two dimensions.'
        : 'Correct. Flexbox turns the children into a controllable row with gap and alignment.');
      onComplete();
    } else {
      setDisplay(id);
      setResult(mode === 'flex-grid'
        ? 'Flexbox can wrap these cards, but each row sizes itself independently. Grid owns both dimensions.'
        : 'That mode does not create a simple aligned action row as directly as Flexbox.');
    }
  };

  const style = display === 'grid'
    ? { display: 'grid', gridTemplateColumns: width < 390 ? '1fr' : 'repeat(2, minmax(0, 1fr))' }
    : display === 'flex'
      ? { display: 'flex', flexWrap: 'wrap' }
      : display === 'inline'
        ? { display: 'block' }
        : { display: 'block' };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Switch engines" title="Same cards, different layout rules" copy="The HTML never changes. Only the display mode and available width change.">
          <Segmented label="display" value={display} options={mode === 'flex-grid' ? ['flex', 'grid'] : ['block', 'inline', 'flex', 'grid']} onChange={setDisplay} />
          <div className="wf-resize-frame" style={{ width: `${Math.min(width, 100)}%`, maxWidth: width }}>
            <div className={`wf-layout-stage is-${display}`} style={style}>
              {['HTML', 'CSS', 'Accessibility', 'DOM'].map((item, index) => (
                <article key={item} style={display === 'inline' ? { display: 'inline-block' } : undefined}>
                  <span>0{index + 1}</span><strong>{item}</strong><small>{index % 2 ? '4 min' : '3 min'}</small>
                </article>
              ))}
            </div>
          </div>
        </LabSection>
        <LabSection eyebrow="2 · Resize" title="Ask what needs alignment" copy="Flexbox excels along one axis. Grid creates shared tracks across both axes.">
          <RangeControl label="Available width" value={width} min={280} max={620} unit="px" onChange={setWidth} />
          <Inspector rows={[
            ['Display', display],
            ['Primary model', display === 'flex' ? 'one-dimensional flow' : display === 'grid' ? 'rows and columns' : display === 'inline' ? 'text flow' : 'normal block flow'],
            ['Wraps', display === 'flex' || display === 'inline' ? 'as items need room' : display === 'grid' ? 'by grid tracks' : 'one item per row'],
          ]} />
        </LabSection>
      </div>
      <Challenge
        title={mode === 'flex-grid'
          ? 'A course gallery needs aligned columns and rows at every width. Which layout owns both dimensions?'
          : 'Three action buttons need one aligned row with a consistent gap. Which display mode fits?'}
        options={(mode === 'flex-grid' ? [['flex', 'Flexbox'], ['grid', 'Grid'], ['block', 'Block']] : [['inline', 'Inline'], ['flex', 'Flexbox'], ['block', 'Block']]).map(([id, label]) => ({ id, label, onClick: () => choose(id), selected: pick === id, correct: id === answer }))}
        result={result}
        complete={complete}
      />
    </>
  );
}

function PositionLab({ onComplete }) {
  const [position, setPosition] = useState('static');
  const [scroll, setScroll] = useState(0);
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === 'sticky';
  const origin = {
    static: 'normal document flow',
    relative: 'its original place',
    absolute: 'nearest positioned ancestor',
    fixed: 'browser viewport',
    sticky: 'flow until a scroll threshold',
  }[position];

  const choose = (id) => {
    setPick(id);
    setPosition(id);
    if (id === 'sticky') {
      setResult('Correct. Sticky participates in the document until scrolling would move it past its threshold.');
      onComplete();
    } else {
      setResult(id === 'fixed' ? 'Fixed would pin it to the browser viewport, even after this article ends.' : 'Absolute removes it from the normal flow and anchors it to a positioned ancestor.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Position it" title="What is the note anchored to?" copy="Move the scroll control and compare five positioning promises.">
          <Segmented label="position" value={position} options={['static', 'relative', 'absolute', 'fixed', 'sticky']} onChange={setPosition} />
          <div className="wf-position-viewport">
            <div className="wf-position-document" style={{ transform: `translateY(-${scroll}px)` }}>
              <p>Lesson introduction</p>
              <div className={`wf-position-note is-${position}`}>Remember this</div>
              <p>More explanation</p><p>Worked example</p><p>Challenge</p>
            </div>
          </div>
        </LabSection>
        <LabSection eyebrow="2 · Scroll it" title="Watch the positioning context" copy="The diagram keeps fixed and sticky inside the simulated viewport so the lesson page stays usable.">
          <RangeControl label="Document scroll" value={scroll} min={0} max={120} unit="px" onChange={setScroll} />
          <Inspector rows={[
            ['position', position],
            ['Positioned against', origin],
            ['Keeps document space', ['static', 'relative', 'sticky'].includes(position) ? 'yes' : 'no'],
            ['Responds to scroll', position === 'fixed' ? 'stays at viewport' : position === 'sticky' ? 'sticks at threshold' : 'moves normally'],
          ]} />
        </LabSection>
      </div>
      <Challenge
        title="A section heading should scroll normally, then stay at the top until its section ends."
        options={['absolute', 'fixed', 'sticky'].map((id) => ({ id, label: `position: ${id}`, onClick: () => choose(id), selected: pick === id, correct: id === 'sticky' }))}
        result={result}
        complete={complete}
      />
    </>
  );
}

function UnitsLab({ onComplete }) {
  const [unit, setUnit] = useState('px');
  const [rootSize, setRootSize] = useState(16);
  const [parentWidth, setParentWidth] = useState(480);
  const [viewportWidth, setViewportWidth] = useState(1200);
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === 'rem';

  const computed = unit === 'px' ? 24 : unit === 'rem' ? rootSize * 1.5 : unit === '%' ? parentWidth * 0.5 : viewportWidth * 0.05;
  const cssValue = unit === 'px' ? '24px' : unit === 'rem' ? '1.5rem' : unit === '%' ? '50%' : '5vw';

  const choose = (id) => {
    setPick(id);
    setUnit(id);
    if (id === 'rem') {
      setResult('Correct. rem follows the root font size, so the heading respects the reader’s text preference.');
      onComplete();
    } else {
      setResult(id === 'px' ? 'Pixels stay fixed when the reader increases the browser font size.' : 'Viewport width follows the screen, not the reader’s font preference.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Change the world" title="Which measurement responds?" copy="Adjust the root, parent, and viewport. Only the unit connected to that context changes.">
          <Segmented label="Heading unit" value={unit} options={['px', 'rem', '%', 'vw']} onChange={setUnit} />
          <div className="wf-unit-stage" style={{ width: `${Math.min(100, parentWidth / 5.5)}%` }}>
            <span>Computed: {Math.round(computed)}px</span>
            <strong style={{ fontSize: `${Math.max(14, Math.min(computed, 64))}px` }}>Readable heading</strong>
          </div>
        </LabSection>
        <LabSection eyebrow="2 · Measure it" title="Every relative unit needs a reference" copy="The inspector names the context instead of making you memorize a slogan.">
          <div className="wf-slider-stack">
            <RangeControl label="Root font size" value={rootSize} min={12} max={24} unit="px" onChange={setRootSize} />
            <RangeControl label="Parent width" value={parentWidth} min={280} max={680} unit="px" onChange={setParentWidth} />
            <RangeControl label="Viewport width" value={viewportWidth} min={360} max={1600} unit="px" onChange={setViewportWidth} />
          </div>
          <Inspector rows={[
            ['CSS value', cssValue],
            ['Computed pixels', `${Math.round(computed)}px`],
            ['Reference', unit === 'px' ? 'none, fixed' : unit === 'rem' ? 'root font size' : unit === '%' ? 'parent size' : 'viewport width'],
          ]} />
        </LabSection>
      </div>
      <Challenge
        title="Body and heading type should scale when the reader changes the browser font size."
        options={['px', 'rem', 'vw'].map((id) => ({ id, label: id, onClick: () => choose(id), selected: pick === id, correct: id === 'rem' }))}
        result={result}
        complete={complete}
      />
    </>
  );
}

function hslToRgb(h, s = 72, l = 52) {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lightness - chroma / 2;
  let tuple = [0, 0, 0];
  if (h < 60) tuple = [chroma, x, 0];
  else if (h < 120) tuple = [x, chroma, 0];
  else if (h < 180) tuple = [0, chroma, x];
  else if (h < 240) tuple = [0, x, chroma];
  else if (h < 300) tuple = [x, 0, chroma];
  else tuple = [chroma, 0, x];
  return tuple.map((channel) => Math.round((channel + m) * 255));
}

function rgbToHex(rgb) {
  return `#${rgb.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

function ColorFormatsLab({ onComplete }) {
  const [hue, setHue] = useState(222);
  const [alpha, setAlpha] = useState(100);
  const [format, setFormat] = useState('hex');
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === 'hsl';
  const rgb = hslToRgb(hue);
  const values = {
    hex: rgbToHex(rgb),
    rgb: `rgb(${rgb.join(' ')} / ${alpha}%)`,
    hsl: `hsl(${hue} 72% 52% / ${alpha}%)`,
    oklch: `oklch(62% 0.19 ${hue} / ${alpha}%)`,
  };

  const choose = (id) => {
    setPick(id);
    setFormat(id);
    if (id === 'hsl') {
      setResult('Correct. HSL exposes hue as a single angle, which makes a family of related colors easy to explore.');
      onComplete();
    } else {
      setResult(id === 'hex' ? 'Hex is compact, but the hue relationship is hidden inside six digits.' : 'RGB describes light channels directly, not an intuitive hue rotation.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Mix it" title="One color, several coordinate systems" copy="Move the hue and opacity. Every notation updates together.">
          <div className="wf-color-stage" style={{ background: `hsl(${hue} 72% 52% / ${alpha}%)` }}><Palette size={38} /></div>
          <div className="wf-slider-stack">
            <RangeControl label="Hue" value={hue} min={0} max={359} unit="°" onChange={setHue} />
            <RangeControl label="Opacity" value={alpha} min={10} max={100} unit="%" onChange={setAlpha} />
          </div>
        </LabSection>
        <LabSection eyebrow="2 · Translate it" title="Choose how you want to think" copy="The browser can understand all four. The useful format depends on the job.">
          <Segmented label="Format" value={format} options={['hex', 'rgb', 'hsl', 'oklch']} onChange={setFormat} />
          <div className="wf-color-values">
            {Object.entries(values).map(([name, value]) => <button type="button" key={name} className={format === name ? 'is-active' : ''} onClick={() => setFormat(name)}><span>{name}</span><code>{value}</code></button>)}
          </div>
        </LabSection>
      </div>
      <Challenge
        title="A designer wants to rotate one brand color around the color wheel while keeping saturation and lightness readable."
        options={['hex', 'rgb', 'hsl'].map((id) => ({ id, label: id.toUpperCase(), onClick: () => choose(id), selected: pick === id, correct: id === 'hsl' }))}
        result={result}
        complete={complete}
      />
    </>
  );
}

function SpecificityLab({ onComplete }) {
  const [important, setImportant] = useState(true);
  const [strongSelector, setStrongSelector] = useState(false);
  const [laterRule, setLaterRule] = useState(true);
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const winner = important ? '.save-button !important' : strongSelector ? '.toolbar .save-button' : laterRule ? '.save-button (later)' : '.save-button (earlier)';
  const color = important ? '#e11d48' : strongSelector ? '#2563eb' : laterRule ? '#16a34a' : '#f59e0b';
  const complete = pick === 'specific';

  const choose = (id) => {
    setPick(id);
    if (id === 'specific') {
      setImportant(false);
      setStrongSelector(true);
      setResult('Correct. A small, intentional selector change wins without turning the cascade into an arms race.');
      onComplete();
    } else if (id === 'more-important') {
      setResult('A second !important creates a louder fight and makes the next override harder.');
    } else {
      setResult('Duplicating the rule relies on source order and leaves the original conflict unexplained.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Predict the winner" title="Three rules want the same button" copy="Change importance, specificity, and source order. The winning declaration paints the button.">
          <div className="wf-specificity-stage"><button type="button" style={{ background: color }}>Save changes</button><span>Winner: {winner}</span></div>
          <div className="wf-rule-stack">
            <div className={!important && strongSelector ? 'is-winner' : ''}><code>.toolbar .save-button</code><span>0,0,2,0</span></div>
            <div className={important ? 'is-winner' : !strongSelector && !laterRule ? 'is-winner' : ''}><code>.save-button {important ? '!important' : ''}</code><span>{important ? 'importance wins' : '0,0,1,0'}</span></div>
            <div className={!important && !strongSelector && laterRule ? 'is-winner' : ''}><code>.save-button</code><span>later source</span></div>
          </div>
        </LabSection>
        <LabSection eyebrow="2 · Change the contest" title="Use the cascade on purpose" copy="Importance wins first, then specificity, then later source order breaks a tie.">
          <Toggle label="Use !important" checked={important} onChange={setImportant} description="Wins regardless of ordinary specificity." />
          <Toggle label="Add .toolbar context" checked={strongSelector} onChange={setStrongSelector} description="Adds one class to the specificity score." />
          <Toggle label="Place green rule last" checked={laterRule} onChange={setLaterRule} description="Breaks a specificity tie by source order." />
        </LabSection>
      </div>
      <Challenge
        title="A global !important rule makes this one toolbar button red. Repair it without adding another !important."
        options={[
          ['more-important', 'Add another !important'],
          ['duplicate', 'Duplicate .save-button at the bottom'],
          ['specific', 'Remove !important and use .toolbar .save-button'],
        ].map(([id, label]) => ({ id, label, onClick: () => choose(id), selected: pick === id, correct: id === 'specific' }))}
        result={result}
        complete={complete}
      />
    </>
  );
}
