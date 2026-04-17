import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfigToggle from '../components/ui/ConfigToggle';

const options = [
  { value: 'info', label: 'Info' },
  { value: 'preview', label: 'Preview' },
  { value: 'code', label: 'Code' },
];

describe('ConfigToggle', () => {
  // 1. Renders a button for each option (3 options → 3 buttons)
  it('renders a button for each option', () => {
    render(<ConfigToggle options={options} value="info" onChange={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  // 2. Each button shows the option's label text
  it('renders each option label as button text', () => {
    render(<ConfigToggle options={options} value="info" onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Info' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Preview' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Code' })).toBeInTheDocument();
  });

  // 3. When label prop is provided, the label text is rendered
  it('renders the label when label prop is provided', () => {
    render(<ConfigToggle options={options} value="info" onChange={vi.fn()} label="View" />);
    expect(screen.getByText('View')).toBeInTheDocument();
  });

  // 4. When label prop is omitted, no label element is rendered
  it('does not render a label when label prop is omitted', () => {
    const { container } = render(<ConfigToggle options={options} value="info" onChange={vi.fn()} />);
    // The label is rendered as a <span>; when label is omitted there should be no <span>
    const span = container.querySelector('span');
    expect(span).not.toBeInTheDocument();
  });

  // 5. The button matching the value prop has the active class (shadow-sm)
  it('applies active class (shadow-sm) to the button matching the value prop', () => {
    render(<ConfigToggle options={options} value="preview" onChange={vi.fn()} />);
    const activeButton = screen.getByRole('button', { name: 'Preview' });
    expect(activeButton).toHaveClass('shadow-sm');
  });

  // 6. The other buttons do NOT have the active class (shadow-sm)
  it('does not apply active class to non-selected buttons', () => {
    render(<ConfigToggle options={options} value="preview" onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Info' })).not.toHaveClass('shadow-sm');
    expect(screen.getByRole('button', { name: 'Code' })).not.toHaveClass('shadow-sm');
  });

  // 7. Clicking a non-active button calls onChange with the correct value
  it('calls onChange with the correct value when a non-active button is clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ConfigToggle options={options} value="info" onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Preview' }));
    expect(onChange).toHaveBeenCalledWith('preview');
  });

  // 8. Clicking the already-active button still calls onChange
  it('calls onChange when the already-active button is clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ConfigToggle options={options} value="info" onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Info' }));
    expect(onChange).toHaveBeenCalledWith('info');
  });

  // 9. onChange is called exactly once per click
  it('calls onChange exactly once per click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ConfigToggle options={options} value="info" onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Code' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  // 10. When value doesn't match any option, no button has the active class
  it('does not apply active class to any button when value matches no option', () => {
    render(<ConfigToggle options={options} value="nonexistent" onChange={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).not.toHaveClass('shadow-sm');
    });
  });
});
