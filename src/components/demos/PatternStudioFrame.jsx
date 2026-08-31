import { Check, ChevronRight, Plus, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import {
  patternStudioBuildWatch,
  patternStudioHeadline,
  patternStudioUseCase,
} from '../../data/patternStudioCopy';
import StudioShell, { StudioControl } from '../ui/StudioShell';

const BEGINNER_OPTION_EXPLANATIONS = {
  'auto-focus': 'After you enter one value, the next input receives focus.',
  action: 'The message includes a useful button, such as Undo.',
  animation: 'The pattern enters with a short movement instead of suddenly appearing.',
  blur: 'The page behind the pattern becomes softly blurred.',
  'drag-state': 'The upload area changes while a file is dragged over it.',
  'error-type': 'The message uses error wording and styling.',
  'file-preview': 'Chosen files appear in a list so people can confirm them.',
  'focus-trap': 'Keyboard focus stays inside the open pattern until it closes.',
  masked: 'Entered code digits are hidden with dots.',
  separator: 'A dash groups the code into easier-to-scan chunks.',
  stacked: 'Each new message stays visible in a vertical stack.',
};

function sentence(text = '') {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  const capitalized = clean.charAt(0).toUpperCase() + clean.slice(1);
  return /[.!?]$/.test(capitalized) ? capitalized : `${capitalized}.`;
}

function optionDescription(option = {}) {
  const labelKey = String(option.label || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  if (BEGINNER_OPTION_EXPLANATIONS[labelKey]) {
    return BEGINNER_OPTION_EXPLANATIONS[labelKey];
  }

  const clean = String(option.text || '')
    .replace(/^\s*[,.:;]?\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return 'Watch how this choice changes the live example.';

  const plainStarts = [
    [/^with\s+(.+)/i, 'Adds'],
    [/^using\s+(.+)/i, 'Uses'],
    [/^showing\s+(.+)/i, 'Shows'],
    [/^including\s+(.+)/i, 'Includes'],
    [/^containing\s+(.+)/i, 'Includes'],
    [/^ensuring\s+(.+)/i, 'Keeps'],
    [/^as\s+(.+)/i, 'Shows the pattern as'],
    [/^that\s+(.+)/i, 'The example'],
  ];

  for (const [pattern, lead] of plainStarts) {
    const match = clean.match(pattern);
    if (match) return sentence(`${lead} ${match[1]}`);
  }

  return sentence(clean);
}

export default function PatternStudioFrame({
  demoId,
  data,
  activeOptions = new Set(),
  onOptionToggle,
  children,
  centerPreview = false,
  fill = false,
}) {
  const title = data?.title ?? demoId;
  const category = CATEGORIES.find((candidate) => candidate.items.some((item) => item.id === demoId));
  const categoryId = category?.id || 'overlays';
  const CategoryIcon = SlidersHorizontal;
  const options = data?.prompt?.options?.slice(0, 3) || [];
  const activeCount = options.filter((option) => activeOptions.has(option.id)).length;
  const activeChoices = options.filter((option) => activeOptions.has(option.id));
  const firstChoice = options[0];
  const useCase = patternStudioUseCase(data);
  const buildWatch = patternStudioBuildWatch(data);

  const controls = options.length ? options.map((option, index) => {
    const selected = activeOptions.has(option.id);
    return (
      <StudioControl
        key={option.id}
        number={String(index + 1).padStart(2, '0')}
        icon={SlidersHorizontal}
        label={option.label}
        value={selected ? 'Live' : 'Off'}
        description={optionDescription(option)}
      >
        <button
          type="button"
          className="pattern-studio__toggle"
          aria-pressed={selected}
          aria-label={selected
            ? `Showing in the scene: ${option.label}. Remove from scene`
            : `Add to the scene: ${option.label}`}
          onClick={() => onOptionToggle?.(option.id)}
          disabled={!onOptionToggle}
        >
          <span className="pattern-studio__toggle-state" aria-hidden="true">
            {selected ? <Check size={17} /> : <Plus size={18} />}
          </span>
          <span className="pattern-studio__toggle-tip" aria-hidden="true">
            {selected ? 'Remove from scene' : 'Add to scene'}
          </span>
        </button>
      </StudioControl>
    );
  }) : (
    <StudioControl
      number="01"
      icon={CategoryIcon}
      label="Pattern anatomy"
      value="Live"
      description="Use the example, then change the spec on the left to direct the build."
    >
      <div className="pattern-studio__anatomy">
        <span>Trigger</span><ChevronRight size={15} aria-hidden="true" /><span>Behavior</span><ChevronRight size={15} aria-hidden="true" /><span>Result</span>
      </div>
    </StudioControl>
  );

  const resetOptions = () => {
    options.forEach((option) => {
      if (activeOptions.has(option.id)) onOptionToggle?.(option.id);
    });
  };

  const noteLabel = activeChoices.length ? 'What changed' : 'Try this';
  const noteTitle = activeChoices.length
    ? `${activeChoices.length === 1 ? 'You turned on' : 'You turned on these choices:'} ${activeChoices.map((option) => option.label).join(', ')}.`
    : firstChoice
      ? `Start with ${firstChoice.label}.`
      : `Use the live ${title} example.`;
  const noteBody = activeChoices.length
    ? `Now use the live example. Look for: ${activeChoices.map(optionDescription).join(' ')} Turn the choice off and repeat to compare.`
    : firstChoice
      ? `Select the + button next to ${firstChoice.label}, then use the live example. Look for: ${optionDescription(firstChoice)} Turn it off and try again to compare.`
      : 'Use the example once. Then change one setting and repeat so the difference is easy to spot.';

  return (
    <div className="pattern-studio-scroll dark">
      <StudioShell
        tone={categoryId}
        eyebrow={`${category?.name || 'Pattern'} · ${title} studio`}
        title={patternStudioHeadline(demoId, title)}
        actions={activeCount > 0 ? (
          <button type="button" className="vg-studio__action" onClick={resetOptions}>
            <RotateCcw size={16} aria-hidden="true" /> Reset scene
          </button>
        ) : null}
        controls={controls}
        stageLabel={`Live ${title}`}
        stageMeta={`${activeCount} of ${options.length || 1} choices live`}
        stage={(
          <div className="pattern-studio__stage-layout">
            <div className="pattern-studio__canvas">
              <div
                data-preview-alignment={centerPreview ? 'center' : 'default'}
                className={`pattern-studio__demo ${fill ? 'pattern-studio__demo--fill' : ''} ${centerPreview ? 'pattern-studio__demo--center min-h-full items-center justify-center' : ''}`}
              >
                {children}
              </div>
            </div>
            <aside className="pattern-studio__teaching" aria-label={`${title} usage guidance`}>
              <div>
                <span>Use it when</span>
                <p>{useCase}</p>
              </div>
              <div>
                <span>Make sure</span>
                <p>{buildWatch}</p>
              </div>
            </aside>
          </div>
        )}
        stageClassName="pattern-studio__scene"
        noteLabel={noteLabel}
        noteTitle={noteTitle}
        noteBody={noteBody}
        className="pattern-studio"
      />
    </div>
  );
}
