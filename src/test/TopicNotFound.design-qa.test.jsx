import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopicNotFound from '../components/layout/TopicNotFound';

describe('TopicNotFound (#114)', () => {
  it('names the missing slug and offers ways to keep going', async () => {
    const user = userEvent.setup();
    const onBrowseGlossary = vi.fn();
    const onBrowseBuild = vi.fn();
    render(<TopicNotFound slug="nope" onBrowseGlossary={onBrowseGlossary} onBrowseBuild={onBrowseBuild} />);
    expect(screen.getByRole('heading', { name: 'We could not find "nope"' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Browse components' }));
    await user.click(screen.getByRole('button', { name: 'Browse build topics' }));
    expect(onBrowseGlossary).toHaveBeenCalledTimes(1);
    expect(onBrowseBuild).toHaveBeenCalledTimes(1);
  });
});
