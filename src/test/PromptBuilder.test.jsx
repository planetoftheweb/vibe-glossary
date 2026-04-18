import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PromptBuilder from '../components/ui/PromptBuilder';

const mockData = {
  prompt: {
    base: 'Add a centered Dialog modal overlay',
    options: [
      { id: 'blur', label: 'Blur', text: ' with a backdrop-blur effect' },
      { id: 'trap', label: 'Focus Trap', text: ' ensuring focus remains trapped within' },
    ],
    requirements: ['Trap focus inside dialog', 'Close on ESC key press'],
    scaffolds: {
      shadcn: '<Dialog>content</Dialog>',
      html: '<dialog>content</dialog>',
    },
  },
};

const defaultProps = {
  data: mockData,
  activeOptions: new Set(),
  onOptionToggle: vi.fn(),
  categoryColors: {},
  onCopy: vi.fn(),
};

// jsdom may or may not expose navigator.clipboard depending on the test runner version.
// Ensure it exists as a configurable property, then spy on writeText.
let writeTextSpy;

beforeEach(() => {
  if (!navigator.clipboard) {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.resolve() },
      configurable: true,
      writable: true,
    });
  }
  writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PromptBuilder', () => {
  // 1. Returns null when data has no prompt property
  it('renders nothing when data has no prompt property', () => {
    const { container } = render(
      <PromptBuilder {...defaultProps} data={{}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when data is null', () => {
    const { container } = render(
      <PromptBuilder {...defaultProps} data={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  // 2. With empty activeOptions: prompt output contains data.prompt.base
  it('shows the base prompt text with no active options', () => {
    render(<PromptBuilder {...defaultProps} />);
    expect(screen.getByText(/Add a centered Dialog modal overlay/)).toBeInTheDocument();
  });

  // 3. When a single option ID is in activeOptions: option text is appended
  it('appends a single active option text to the prompt output', () => {
    render(
      <PromptBuilder
        {...defaultProps}
        activeOptions={new Set(['blur'])}
      />
    );
    expect(screen.getByText(/with a backdrop-blur effect/)).toBeInTheDocument();
  });

  // 4. When multiple option IDs are active: all option texts are appended
  it('appends all active option texts to the prompt output', () => {
    render(
      <PromptBuilder
        {...defaultProps}
        activeOptions={new Set(['blur', 'trap'])}
      />
    );
    const promptOutput = screen.getByText(/Add a centered Dialog modal overlay/);
    expect(promptOutput.textContent).toContain('with a backdrop-blur effect');
    expect(promptOutput.textContent).toContain('ensuring focus remains trapped within');
  });

  // 5. When _requirements is NOT in activeOptions: "## Requirements" section is absent
  it('does not show the Requirements section when _requirements is not active', () => {
    render(<PromptBuilder {...defaultProps} activeOptions={new Set()} />);
    expect(screen.queryByText(/## Requirements/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Trap focus inside dialog/)).not.toBeInTheDocument();
  });

  // 6. When _requirements IS in activeOptions: heading and each item appear
  it('shows the Requirements heading and each requirement when _requirements is active', () => {
    render(
      <PromptBuilder
        {...defaultProps}
        activeOptions={new Set(['_requirements'])}
      />
    );
    expect(screen.getByText(/## Requirements/)).toBeInTheDocument();
    expect(screen.getByText(/- Trap focus inside dialog/)).toBeInTheDocument();
    expect(screen.getByText(/- Close on ESC key press/)).toBeInTheDocument();
  });

  // 7. When _scaffold IS in activeOptions: "## Scaffold" appears and shadcn code is shown
  it('shows the Scaffold section with the default shadcn framework when _scaffold is active', () => {
    render(
      <PromptBuilder
        {...defaultProps}
        activeOptions={new Set(['_scaffold'])}
      />
    );
    expect(screen.getByText(/## Scaffold \(shadcn\/ui\)/)).toBeInTheDocument();
    expect(document.body.textContent).toContain('<Dialog>content</Dialog>');
  });

  // 8. When _scaffold is active but the active framework has no scaffold, section does not appear
  it('does not show the Scaffold section when the active framework has no scaffold data', () => {
    // mockData.scaffolds only has 'shadcn' and 'html' — no 'radix'
    // The component starts on the 'shadcn' framework by default
    // Override data so 'shadcn' scaffold is absent, leaving only 'radix' which is not a default
    const dataWithoutShadcn = {
      prompt: {
        ...mockData.prompt,
        scaffolds: {
          radix: '<RadixDialog>content</RadixDialog>',
        },
      },
    };

    render(
      <PromptBuilder
        {...defaultProps}
        data={dataWithoutShadcn}
        activeOptions={new Set(['_scaffold'])}
      />
    );

    // Default framework is 'shadcn', which has no scaffold in this data,
    // so the scaffold section should not appear
    expect(screen.queryByText(/## Scaffold/)).not.toBeInTheDocument();
  });

  // 9. onOptionToggle is called with the option id when an option button is clicked
  it('calls onOptionToggle with the blur option id when the Blur button is clicked', async () => {
    const user = userEvent.setup();
    const onOptionToggle = vi.fn();

    render(
      <PromptBuilder
        {...defaultProps}
        onOptionToggle={onOptionToggle}
      />
    );

    await user.click(screen.getByRole('button', { name: /Blur/ }));
    expect(onOptionToggle).toHaveBeenCalledWith('blur');
  });

  it('calls onOptionToggle with the trap option id when the Focus Trap button is clicked', async () => {
    const user = userEvent.setup();
    const onOptionToggle = vi.fn();

    render(
      <PromptBuilder
        {...defaultProps}
        onOptionToggle={onOptionToggle}
      />
    );

    await user.click(screen.getByRole('button', { name: /Focus Trap/ }));
    expect(onOptionToggle).toHaveBeenCalledWith('trap');
  });

  // 10. Framework picker: dropdown only shows frameworks present in data.prompt.scaffolds
  it('shows only frameworks that exist in data.prompt.scaffolds in the dropdown', async () => {
    const user = userEvent.setup();

    render(
      <PromptBuilder
        {...defaultProps}
        activeOptions={new Set(['_scaffold'])}
      />
    );

    // The trigger button shows the active framework label — getAllByRole because
    // after the dropdown opens a second button with the same label appears inside it
    const [frameworkTrigger] = screen.getAllByRole('button', { name: /shadcn\/ui/i });
    await user.click(frameworkTrigger);

    // Only shadcn/ui and Plain HTML should appear (mockData.scaffolds has 'shadcn' and 'html')
    expect(screen.getByRole('button', { name: 'Plain HTML' })).toBeInTheDocument();

    // Headless UI and Radix are not in mockData.scaffolds — must not appear
    expect(screen.queryByRole('button', { name: 'Headless UI' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Radix' })).not.toBeInTheDocument();
  });

  // Copy button — clipboard and callback
  it('calls navigator.clipboard.writeText with the prompt text when the copy button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <PromptBuilder
        {...defaultProps}
        activeOptions={new Set()}
      />
    );

    await user.click(screen.getByTitle('Copy to clipboard (markdown)'));

    expect(writeTextSpy).toHaveBeenCalledWith(
      expect.stringContaining('Add a centered Dialog modal overlay')
    );
  });

  it('calls the onCopy callback when the copy button is clicked', async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();

    render(
      <PromptBuilder
        {...defaultProps}
        onCopy={onCopy}
      />
    );

    await user.click(screen.getByTitle('Copy to clipboard (markdown)'));
    expect(onCopy).toHaveBeenCalledTimes(1);
  });
});
