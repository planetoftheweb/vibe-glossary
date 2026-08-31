import { useState } from 'react';
import { Code2, MousePointerClick, Network } from 'lucide-react';
import {
  Challenge,
  CodeToken,
  Inspector,
  LabSection,
  Segmented,
  Toggle,
} from './LabPrimitives';

export default function MarkupFoundationLab({ lab, onComplete }) {
  if (lab === 'tag-anatomy') return <TagAnatomyLab onComplete={onComplete} />;
  if (lab === 'semantic-html') return <SemanticHtmlLab onComplete={onComplete} />;
  if (lab === 'formats') return <FormatsLab onComplete={onComplete} />;
  if (lab === 'form-identity') return <FormIdentityLab onComplete={onComplete} />;
  return <DomTreeLab onComplete={onComplete} />;
}

const TOKEN_EXPLANATIONS = {
  tag: ['Tag', 'The opening tag names the kind of element the browser should create.'],
  attribute: ['Attribute', 'The attribute configures the element. This one decides whether the button submits its form.'],
  content: ['Content', 'The content sits between the tags. This is the label a sighted person reads.'],
  closing: ['Closing tag', 'The slash tells the browser where this button element ends.'],
  element: ['Complete element', 'The element is the whole thing: both tags, every attribute, the content, and the browser behavior they create.'],
};

function TagAnatomyLab({ onComplete }) {
  const [selected, setSelected] = useState('element');
  const [label, setLabel] = useState('Save changes');
  const [buttonType, setButtonType] = useState('submit');
  const [disabled, setDisabled] = useState(false);
  const [lastEvent, setLastEvent] = useState('Nothing yet. Click the button.');
  const [challengePick, setChallengePick] = useState(null);
  const [challengeResult, setChallengeResult] = useState('');
  const complete = challengePick === 'type';

  const pickChallenge = (id) => {
    setChallengePick(id);
    if (id === 'type') {
      setButtonType('button');
      setLastEvent('Button clicked. The form stayed put.');
      setChallengeResult('Exactly. The tag still creates a button. The type attribute changes which kind of button it is.');
      onComplete();
    } else if (id === 'label') {
      setLabel('Preview');
      setChallengeResult('The label changed, but the browser still treats it as a submit button. Behavior lives in the attribute.');
    } else {
      setDisabled(true);
      setChallengeResult('That prevents every click. The preview needs to work, it just should not submit the form.');
    }
  };

  const explanation = TOKEN_EXPLANATIONS[selected];

  return (
    <>
      <div className="wf-lab-grid wf-lab-grid-intro">
        <LabSection
          eyebrow="1 · Try it"
          title="Click the button"
          copy="It lives inside a form. Watch the event log when the browser uses the default submit behavior."
        >
          <div className="wf-browser-stage">
            <div className="wf-browser-address"><span /> preview.local/account</div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setLastEvent('Form submitted. The page would navigate or send data.');
              }}
            >
              <label>
                Email
                <input defaultValue="ray@example.com" />
              </label>
              <button
                type={buttonType}
                disabled={disabled}
                onClick={() => {
                  if (buttonType === 'button') setLastEvent('Button clicked. The form stayed put.');
                }}
              >
                {label}
              </button>
            </form>
            <div className="wf-event-log"><MousePointerClick size={15} /> {lastEvent}</div>
          </div>
        </LabSection>

        <LabSection
          eyebrow="2 · Take it apart"
          title="Click any part of the code"
          copy="The highlight connects the vocabulary to the element the browser created."
        >
          <div className={`wf-code-anatomy ${selected === 'element' ? 'is-whole' : ''}`}>
            <code>
              <CodeToken tone="tag" active={selected === 'tag'} label="Select opening tag" onClick={() => setSelected('tag')}>&lt;button</CodeToken>
              {' '}
              <CodeToken tone="attribute" active={selected === 'attribute'} label="Select type attribute" onClick={() => setSelected('attribute')}>type=<span className="wf-token-value">&quot;{buttonType}&quot;</span></CodeToken>
              <CodeToken tone="tag" active={selected === 'tag'} label="Select end of opening tag" onClick={() => setSelected('tag')}>&gt;</CodeToken>
              <CodeToken tone="content" active={selected === 'content'} label="Select button content" onClick={() => setSelected('content')}>{label}</CodeToken>
              <CodeToken tone="tag" active={selected === 'closing'} label="Select closing tag" onClick={() => setSelected('closing')}>&lt;/button&gt;</CodeToken>
            </code>
            <button type="button" className="wf-whole-element" onClick={() => setSelected('element')}>Show the complete element</button>
          </div>
          <div className={`wf-concept-explanation wf-concept-${selected}`}>
            <span>{explanation[0]}</span>
            <p>{explanation[1]}</p>
          </div>
        </LabSection>
      </div>

      <LabSection
        eyebrow="3 · Change one thing"
        title="Change the code without leaving the lesson"
        copy="Every control updates the HTML, live button, browser behavior, and inspector together."
        className="wf-control-workbench"
      >
        <div className="wf-control-layout">
          <div className="wf-control-shelf">
            <label className="wf-text-control">
              <span>Content</span>
              <input value={label} onChange={(event) => setLabel(event.target.value)} />
            </label>
            <Segmented label="type attribute" value={buttonType} options={['submit', 'button']} onChange={setButtonType} />
            <Toggle label="disabled attribute" checked={disabled} onChange={setDisabled} description="Boolean attributes are on or off." />
          </div>
          <Inspector rows={[
            ['Element', 'button', 'coral'],
            ['Type', buttonType, 'cyan'],
            ['Accessible name', label || '(empty)', 'green'],
            ['State', disabled ? 'disabled' : 'enabled', disabled ? 'rose' : 'green'],
            ['Last event', lastEvent, 'violet'],
          ]} />
        </div>
      </LabSection>

      <Challenge
        title="The Preview button should run JavaScript without submitting the form. What should change?"
        options={[
          { id: 'label', label: 'Change the content to “Preview”', onClick: () => pickChallenge('label'), selected: challengePick === 'label', correct: false },
          { id: 'type', label: 'Change the attribute to type="button"', onClick: () => pickChallenge('type'), selected: challengePick === 'type', correct: true },
          { id: 'disabled', label: 'Add the disabled attribute', onClick: () => pickChallenge('disabled'), selected: challengePick === 'disabled', correct: false },
        ]}
        result={challengeResult}
        complete={complete}
      />
    </>
  );
}

function SemanticHtmlLab({ onComplete }) {
  const [semantic, setSemantic] = useState(false);
  const [pick, setPick] = useState(null);
  const [message, setMessage] = useState('');
  const complete = pick === 'button';

  const choose = (id) => {
    setPick(id);
    if (id === 'button') {
      setSemantic(true);
      setMessage('Correct. The browser now supplies focus, Enter and Space activation, and the button role.');
      onComplete();
    } else {
      setMessage('Adding more attributes can imitate a button, but it means rebuilding behavior the real element already owns.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Compare" title="Same paint, different browser contract" copy="Toggle the implementation. The visual stays put while the browser-provided behavior changes.">
          <div className="wf-browser-stage wf-semantic-stage">
            <p>Publish this lesson when it is ready.</p>
            {semantic ? (
              <button type="button" onClick={() => setMessage('Published with a native button click.')}>Publish lesson</button>
            ) : (
              <div className="wf-fake-button" onClick={() => setMessage('Clicked with a pointer. Keyboard support is still missing.')}>Publish lesson</div>
            )}
            {message ? <div className="wf-event-log">{message}</div> : null}
          </div>
        </LabSection>
        <LabSection eyebrow="2 · Inspect" title="What came for free?" copy="Semantic HTML is a bundle of behavior, meaning, and keyboard support.">
          <Segmented label="Implementation" value={semantic ? 'button' : 'div'} options={[{ value: 'div', label: '<div onClick>' }, { value: 'button', label: '<button>' }]} onChange={(value) => setSemantic(value === 'button')} />
          <div className="wf-code-block"><code>{semantic ? '<button type="button">Publish lesson</button>' : '<div onClick={publish}>Publish lesson</div>'}</code></div>
          <Inspector rows={[
            ['Role', semantic ? 'button' : 'generic'],
            ['Tab reachable', semantic ? 'yes' : 'no'],
            ['Enter activates', semantic ? 'yes' : 'no'],
            ['Space activates', semantic ? 'yes' : 'no'],
            ['Extra code needed', semantic ? 'none' : 'keyboard + focus + role'],
          ]} />
        </LabSection>
      </div>
      <Challenge
        title="A clickable div opens checkout. What is the strongest repair?"
        options={[
          { id: 'tabindex', label: 'Add tabIndex and leave it a div', onClick: () => choose('tabindex'), selected: pick === 'tabindex', correct: false },
          { id: 'button', label: 'Replace it with a real button', onClick: () => choose('button'), selected: pick === 'button', correct: true },
          { id: 'cursor', label: 'Add cursor: pointer', onClick: () => choose('cursor'), selected: pick === 'cursor', correct: false },
        ]}
        result={message}
        complete={complete}
      />
    </>
  );
}

const FORMAT_EXAMPLES = {
  html: '<article><h2>Blue mug</h2><p>$18</p></article>',
  xml: '<product><name>Blue mug</name><price>18</price></product>',
  json: '{ "name": "Blue mug", "price": 18 }',
};

function FormatsLab({ onComplete }) {
  const [format, setFormat] = useState('html');
  const [broken, setBroken] = useState(false);
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === 'json';
  const parserResult = !broken
    ? format === 'html' ? 'Rendered a product card.' : format === 'xml' ? 'Parsed strict tagged data.' : 'Parsed a JavaScript-shaped object.'
    : format === 'html' ? 'Browser repaired the missing closing tag.' : format === 'xml' ? 'Parse error. Every XML tag must close.' : 'Parse error. JSON punctuation must balance.';

  const choose = (id) => {
    setPick(id);
    if (id === 'json') {
      setFormat('json');
      setResult('Correct. JSON is compact, maps naturally to objects, and is the common format for modern APIs.');
      onComplete();
    } else {
      setResult(id === 'html' ? 'HTML describes a page, not a compact API payload.' : 'XML can carry API data, but JSON is the common modern default.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Same information" title="Switch the format" copy="The product stays the same. The syntax and intended reader change.">
          <Segmented label="Format" value={format} options={['html', 'xml', 'json']} onChange={setFormat} />
          <div className="wf-code-block wf-format-code"><code>{broken ? FORMAT_EXAMPLES[format].replace(/([}\]])$/, '') : FORMAT_EXAMPLES[format]}</code></div>
          <Toggle label="Break the ending" checked={broken} onChange={setBroken} description="Remove a closing tag, brace, or bracket." />
        </LabSection>
        <LabSection eyebrow="2 · Ask the parser" title="Different formats make different promises" copy="Forgiving page markup and strict data formats fail differently.">
          <div className={`wf-parser-result ${broken && format !== 'html' ? 'is-error' : ''}`}>
            <Code2 size={22} />
            <strong>{parserResult}</strong>
          </div>
          <Inspector rows={[
            ['Primary job', format === 'html' ? 'render web pages' : 'carry structured data'],
            ['Typical reader', format === 'html' ? 'browser' : format === 'xml' ? 'strict parser' : 'API or application'],
            ['Forgives mistakes', format === 'html' ? 'often' : 'no'],
          ]} />
        </LabSection>
      </div>
      <Challenge
        title="A new API needs to return a product name, price, and inventory count. Pick the default format."
        options={[
          { id: 'html', label: 'HTML', onClick: () => choose('html'), selected: pick === 'html', correct: false },
          { id: 'xml', label: 'XML', onClick: () => choose('xml'), selected: pick === 'xml', correct: false },
          { id: 'json', label: 'JSON', onClick: () => choose('json'), selected: pick === 'json', correct: true },
        ]}
        result={result}
        complete={complete}
      />
    </>
  );
}

function FormIdentityLab({ onComplete }) {
  const [hasName, setHasName] = useState(false);
  const [duplicateId, setDuplicateId] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === 'name';

  const choose = (id) => {
    setPick(id);
    if (id === 'name') {
      setHasName(true);
      setResult('Correct. The name becomes the key in the submitted form data.');
      onComplete();
    } else {
      setResult(id === 'id' ? 'The id connects the label and input, but it does not name the submitted value.' : 'The class styles or selects many elements. The server never uses it as the field key.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Submit it" title="Follow the value" copy="The input looks complete. Submit the form and inspect what the browser packages for the server.">
          <form className="wf-browser-stage wf-identity-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            <label htmlFor="lesson-email">Email</label>
            <input id="lesson-email" className="signup-field" name={hasName ? 'email' : undefined} defaultValue="ray@example.com" />
            <button type="submit">Submit form</button>
          </form>
          <div className="wf-payload">
            <span>Submitted payload</span>
            <code>{submitted && hasName ? '{ "email": "ray@example.com" }' : submitted ? '{}' : 'Waiting for submit…'}</code>
          </div>
        </LabSection>
        <LabSection eyebrow="2 · Configure it" title="Three attributes, three jobs" copy="Toggle the two common bugs and watch the inspector update.">
          <Toggle label={'Add name="email"'} checked={hasName} onChange={setHasName} description="Names the value sent to the server." />
          <Toggle label="Duplicate the id" checked={duplicateId} onChange={setDuplicateId} description="An id should identify one element on the page." />
          <Inspector rows={[
            ['id', 'lesson-email', duplicateId ? 'rose' : 'green'],
            ['class', 'signup-field', 'cyan'],
            ['name', hasName ? 'email' : '(missing)', hasName ? 'green' : 'rose'],
            ['Label connection', duplicateId ? 'ambiguous' : 'one input', duplicateId ? 'rose' : 'green'],
            ['Server receives', hasName ? 'email=value' : 'nothing', hasName ? 'green' : 'rose'],
          ]} />
        </LabSection>
      </div>
      <Challenge
        title="The email appears on screen but is missing from the submitted data. Which attribute fixes it?"
        options={[
          { id: 'id', label: 'id="email"', onClick: () => choose('id'), selected: pick === 'id', correct: false },
          { id: 'class', label: 'class="email"', onClick: () => choose('class'), selected: pick === 'class', correct: false },
          { id: 'name', label: 'name="email"', onClick: () => choose('name'), selected: pick === 'name', correct: true },
        ]}
        result={result}
        complete={complete}
      />
    </>
  );
}

function DomTreeLab({ onComplete }) {
  const [heading, setHeading] = useState('Inbox');
  const [badge, setBadge] = useState(false);
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState('');
  const complete = pick === 'dom';

  const choose = (id) => {
    setPick(id);
    if (id === 'dom') {
      setBadge(true);
      setResult('Correct. JavaScript changed the live DOM, so the preview and accessibility output changed without editing the original HTML file.');
      onComplete();
    } else {
      setResult('That file was the starting recipe. The visible page is the live DOM after JavaScript runs.');
    }
  };

  return (
    <>
      <div className="wf-lab-grid">
        <LabSection eyebrow="1 · Edit the live page" title="Keep preview and tree synchronized" copy="Rename the heading and add a node. These changes happen after the original HTML has loaded.">
          <div className="wf-dom-controls">
            <label className="wf-text-control"><span>Heading text</span><input value={heading} onChange={(event) => setHeading(event.target.value)} /></label>
            <button type="button" onClick={() => setBadge((value) => !value)}>{badge ? 'Remove badge node' : 'Add badge node'}</button>
          </div>
          <div className="wf-browser-stage wf-dom-preview">
            <h3>{heading} {badge ? <span>3 new</span> : null}</h3>
            <p>The preview is reading the current tree.</p>
          </div>
        </LabSection>
        <LabSection eyebrow="2 · Inspect the tree" title="The DOM is alive" copy="Every visible change is mirrored as a node or text update.">
          <div className="wf-tree-view">
            <div><Network size={16} /> document</div>
            <div className="wf-tree-depth-1">body</div>
            <div className="wf-tree-depth-2">main</div>
            <div className="wf-tree-depth-3 is-selected">h3 <span>“{heading}”</span></div>
            {badge ? <div className="wf-tree-depth-4 is-new">span <span>“3 new”</span></div> : null}
            <div className="wf-tree-depth-3">p <span>“The preview is…”</span></div>
          </div>
          <Inspector rows={[
            ['Original HTML', '<h3>Inbox</h3>'],
            ['Current text', heading],
            ['Nodes added by JS', badge ? '1' : '0'],
          ]} />
        </LabSection>
      </div>
      <Challenge
        title="JavaScript adds an unread badge after the page loads. Where does the new node live?"
        options={[
          { id: 'html-file', label: 'Only in the original HTML file', onClick: () => choose('html-file'), selected: pick === 'html-file', correct: false },
          { id: 'css', label: 'Inside the CSS cascade', onClick: () => choose('css'), selected: pick === 'css', correct: false },
          { id: 'dom', label: 'In the live DOM tree', onClick: () => choose('dom'), selected: pick === 'dom', correct: true },
        ]}
        result={result}
        complete={complete}
      />
    </>
  );
}
