import { cleanup, render } from '@testing-library/react';
import CalendarDemo from '../components/demos/data/CalendarDemo';
import CarouselDemo from '../components/demos/data/CarouselDemo';
import ListDemo from '../components/demos/data/ListDemo';
import RatingDemo from '../components/demos/forms/RatingDemo';
import StepperDemo from '../components/demos/forms/StepperDemo';
import TagInputDemo from '../components/demos/forms/TagInputDemo';
import SwitchDemo from '../components/demos/inputs/SwitchDemo';
import TooltipDemo from '../components/demos/overlays/TooltipDemo';

const cases = [
  ['calendar', CalendarDemo, new Set(['events'])],
  ['carousel', CarouselDemo, new Set(['dots'])],
  ['list', ListDemo, new Set(['infinite'])],
  ['rating', RatingDemo, new Set(['thumbs'])],
  ['stepper', StepperDemo, new Set()],
  ['tag input', TagInputDemo, new Set(['autocomplete', 'limit'])],
  ['switch', SwitchDemo, new Set()],
  ['tooltip', TooltipDemo, new Set()],
];

describe('interactive demo controls', () => {
  it.each(cases)('gives every visible button an accessible name in %s', (_name, Demo, activeOptions) => {
    const { container } = render(<Demo activeOptions={activeOptions} />);

    const buttons = [...container.querySelectorAll('button')];
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((button) => expect(button).toHaveAccessibleName());

    cleanup();
  });
});
