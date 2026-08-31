import { CATEGORIES } from '../data/categories';
import { GLOSSARY_DATA } from '../data/glossary';
import {
  PATTERN_STUDIO_HEADLINES,
  patternStudioBuildWatch,
  patternStudioDescription,
  patternStudioHeadline,
  patternStudioUseCase,
} from '../data/patternStudioCopy';

describe('pattern studio teaching copy', () => {
  it('gives every non-motion glossary studio its own headline', () => {
    const studioItems = CATEGORIES
      .filter((category) => category.id !== 'motion')
      .flatMap((category) => category.items);
    const headlines = studioItems.map((item) => patternStudioHeadline(item.id, item.name));

    expect(headlines).toHaveLength(studioItems.length);
    expect(new Set(headlines).size).toBe(studioItems.length);
    studioItems.forEach((item) => {
      expect(PATTERN_STUDIO_HEADLINES[item.id]).toBeTruthy();
    });
  });

  it('uses the stronger teaching details as the single definition', () => {
    const description = patternStudioDescription(GLOSSARY_DATA.otp);

    expect(description).toMatch(/one-time password or one-time code/i);
    expect(description).toMatch(/Six digits is most common/i);
    expect(description).toBe(GLOSSARY_DATA.otp.definition);
  });

  it('turns the deeper guidance into use-case and implementation cues', () => {
    expect(patternStudioUseCase(GLOSSARY_DATA.otp)).toMatch(/confirming sign-in/i);
    expect(patternStudioBuildWatch(GLOSSARY_DATA.otp)).toMatch(/Auto-advance focus/i);
  });
});
