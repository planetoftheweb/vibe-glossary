import { GLOSSARY_DATA } from '../data/glossary';

describe('beginner glossary copy', () => {
  it('does not use fragment definitions that assume the learner knows the term', () => {
    const shortDefinitions = Object.entries(GLOSSARY_DATA)
      .filter(([, entry]) => entry.definition.trim().split(/\s+/).length < 8)
      .map(([id]) => id);

    expect(shortDefinitions).toEqual([]);
    expect(GLOSSARY_DATA.otp.definition).toMatch(/one-time password or one-time code/i);
    expect(GLOSSARY_DATA.dropzone.definition).toMatch(/drag and drop files, or click/i);
    expect(GLOSSARY_DATA.dropzone.definition).toMatch(/friendlier than a bare file input/i);
  });

  it('turns terse component names into prompts that describe the outcome', () => {
    expect(GLOSSARY_DATA.toast.prompt.base).toMatch(/brief confirmation message/i);
    expect(GLOSSARY_DATA.otp.prompt.base).toMatch(/typing and pasting/i);
    expect(GLOSSARY_DATA.dropzone.prompt.base).toMatch(/drag and drop plus click to browse/i);
  });
});
