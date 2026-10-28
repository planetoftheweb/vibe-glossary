import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopicNotFound from '../components/layout/TopicNotFound';

describe('TopicNotFound (#113, #114, DESIGN.md Not-found pages)', () => {
  it('has one heading, names the address, and offers the glossary and search', async () => {
    const user = userEvent.setup();
    const onBrowseGlossary = vi.fn();
    const onOpenSearch = vi.fn();
    render(<TopicNotFound address="/glossary/nope" onBrowseGlossary={onBrowseGlossary} onOpenSearch={onOpenSearch} />);
    expect(screen.getByRole('heading', { name: "We can't find that page" })).toBeInTheDocument();
    expect(screen.getByText('/glossary/nope')).toBeInTheDocument();
    const primary = screen.getByRole('button', { name: 'Browse the glossary' });
    expect(primary.className).toMatch(/bg-indigo-600/);
    expect(primary.className).toMatch(/min-h-\[44px\]/);
    await user.click(primary);
    await user.click(screen.getByRole('button', { name: 'Search for a term' }));
    expect(onBrowseGlossary).toHaveBeenCalledTimes(1);
    expect(onOpenSearch).toHaveBeenCalledTimes(1);
  });
});
