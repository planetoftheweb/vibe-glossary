import { BUILD_TOPICS_FLAT } from '../data/buildLiteracy';

describe('beginner Build Literacy copy', () => {
  it('gives every topic a useful plain-language summary', () => {
    const shortSummaries = Object.values(BUILD_TOPICS_FLAT)
      .filter((topic) => topic.summary.trim().split(/\s+/).length < 10)
      .map((topic) => topic.id);

    expect(shortSummaries).toEqual([]);
  });

  it('expands unfamiliar shorthand in beginner-facing summaries', () => {
    expect(BUILD_TOPICS_FLAT['html-vs-xml-json'].summary).toMatch(/HyperText Markup Language/);
    expect(BUILD_TOPICS_FLAT['what-is-a-protocol'].summary).toMatch(/HyperText Transfer Protocol/);
    expect(BUILD_TOPICS_FLAT['session-vs-jwt'].summary).toMatch(/JSON Web Token/);
    expect(BUILD_TOPICS_FLAT.rag.summary).toMatch(/Retrieval-Augmented Generation/);
    expect(BUILD_TOPICS_FLAT['tool-calling'].summary).toMatch(/language model ask your code/);
  });
});
