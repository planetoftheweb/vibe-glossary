/**
 * Learning paths for Build Literacy. Each cluster IS a path: the topics
 * inside it are the steps, and a short quiz at the end checks comprehension.
 *
 * Quizzes pull from the topics inside the same path so wrong answers are
 * still concepts the learner just walked through. answerId and every
 * optionId must be a valid topic id from the cluster (or anywhere in the
 * build literacy data) so the quiz UI can show its title.
 *
 * Voice rules match buildLiteracy.js:
 *   - friendly, no jargon-without-spelling-it-out
 *   - no em dashes
 */

import { BUILD_LITERACY_CLUSTERS } from './buildLiteracy.js';

export const BUILD_PATHS = [
  {
    id: 'web-foundations',
    name: 'Web foundations',
    tagline: 'The HTML, CSS, and accessibility words you need to talk to AI',
    description:
      'Tags vs elements vs attributes, the box model, flex vs grid, ARIA, focus, color contrast. The vocabulary that lets you tell an AI exactly what to change without a "rewrite the whole component" disaster.',
    quiz: [
      {
        q: 'You ask the AI to "add an aria-label" to a button. You are adding an...',
        answerId: 'html-tag-element-attribute',
        optionIds: ['html-tag-element-attribute', 'semantic-html', 'dom', 'aria'],
      },
      {
        q: 'You want vertical space INSIDE a card (between its border and its text). You are adjusting...',
        answerId: 'margin-vs-padding',
        optionIds: ['margin-vs-padding', 'box-model', 'display-property', 'position'],
      },
      {
        q: 'You need a one-dimensional row of buttons that wraps and aligns. The right CSS layout is...',
        answerId: 'flex-vs-grid',
        optionIds: ['flex-vs-grid', 'display-property', 'position', 'box-model'],
      },
      {
        q: 'A screen reader reads "button, Submit". That label and role come from the...',
        answerId: 'accessibility-tree',
        optionIds: ['accessibility-tree', 'aria', 'dom', 'semantic-html'],
      },
      {
        q: 'You want to scale font size with the user\'s browser settings. Use the unit...',
        answerId: 'css-units',
        optionIds: ['css-units', 'box-model', 'color-formats', 'specificity'],
      },
    ],
  },
  {
    id: 'design-language',
    name: 'Design language',
    tagline: 'Tokens, scales, states, variants, contrast, brand: the words designers use',
    description:
      'Design systems vs component libraries, tokens, typography and spacing scales, color palettes and semantic roles, component states, variants and sizes, density, elevation, radius, motion, fidelity, atomic design, breakpoints, WCAG contrast, readable type, the design contract, CTA hierarchy, brand constraints, plus the DESIGN.md contract, rule strengths, page grammar, empty states, loading stability, iconography, and microcopy. The vocabulary that lets you ask an AI for "the secondary button at md size with WCAG AA contrast" instead of "make it look better".',
    quiz: [
      {
        q: 'A named value like "color.primary.500" or "space.4" that stands in for a hard-coded value is a...',
        answerId: 'design-tokens',
        optionIds: ['design-tokens', 'design-system', 'color-palette', 'spacing-scale'],
      },
      {
        q: 'The minimum contrast ratio WCAG AA requires for normal-size body text is...',
        answerId: 'contrast-wcag',
        optionIds: ['contrast-wcag', 'color-palette', 'readable-type', 'design-tokens'],
      },
      {
        q: 'The state most often skipped, the one that breaks accessibility, is the...',
        answerId: 'component-states',
        optionIds: ['component-states', 'variants-sizes', 'density', 'motion'],
      },
      {
        q: 'A short list of "we are X, not Y" pairs that tells an AI your product personality is a...',
        answerId: 'brand-constraints',
        optionIds: ['brand-constraints', 'design-system', 'one-primary-cta', 'design-tokens'],
      },
      {
        q: 'Every screen should have exactly one loud, filled button for the main action. That button is the...',
        answerId: 'one-primary-cta',
        optionIds: ['one-primary-cta', 'variants-sizes', 'component-states', 'brand-constraints'],
      },
    ],
  },
  {
    id: 'product',
    name: 'Product and planning',
    tagline: 'How teams decide what to build before anyone opens an editor',
    description:
      'MVPs, north-star metrics, PRDs, user stories, acceptance criteria, roadmaps. The shared vocabulary that turns "I have an idea" into something an AI can build without you both flailing.',
    quiz: [
      {
        q: 'The smallest version of an idea you put in front of real users to learn whether it works at all is a...',
        answerId: 'mvp',
        optionIds: ['mvp', 'prd', 'user-story', 'roadmap'],
      },
      {
        q: 'The single number a team agrees to optimize for is its...',
        answerId: 'north-star',
        optionIds: ['north-star', 'mvp', 'roadmap', 'acceptance-criteria'],
      },
      {
        q: 'A short doc that says what a feature should do, who it is for, and how you will know it worked is a...',
        answerId: 'prd',
        optionIds: ['prd', 'user-story', 'acceptance-criteria', 'roadmap'],
      },
      {
        q: '"As a [user], I want [thing] so that [benefit]" is the format of a...',
        answerId: 'user-story',
        optionIds: ['user-story', 'prd', 'acceptance-criteria', 'mvp'],
      },
      {
        q: 'A checklist of "given/when/then" that decides whether a story is finished is its...',
        answerId: 'acceptance-criteria',
        optionIds: ['acceptance-criteria', 'user-story', 'prd', 'roadmap'],
      },
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering practice',
    tagline: 'Tests, deploys, versions, flags: the safety nets',
    description:
      'TDD, unit vs integration tests, continuous integration, staging vs prod, semantic versioning, feature flags. The everyday rituals that keep changes from blowing up in production.',
    quiz: [
      {
        q: 'Writing the failing test FIRST and then the code to make it pass is...',
        answerId: 'tdd',
        optionIds: ['tdd', 'unit-vs-integration', 'ci', 'bdd'],
      },
      {
        q: 'A test that verifies one tiny pure function in isolation is a...',
        answerId: 'unit-vs-integration',
        optionIds: ['unit-vs-integration', 'tdd', 'ci', 'bdd'],
      },
      {
        q: 'The system that runs your test suite automatically on every push is your...',
        answerId: 'ci',
        optionIds: ['ci', 'staging-vs-prod', 'feature-flags', 'tdd'],
      },
      {
        q: 'Bumping 1.2.3 to 2.0.0 because of a breaking change follows...',
        answerId: 'semver',
        optionIds: ['semver', 'staging-vs-prod', 'feature-flags', 'ci'],
      },
      {
        q: 'You merge code to production but only show it to 5% of users. You are using...',
        answerId: 'feature-flags',
        optionIds: ['feature-flags', 'staging-vs-prod', 'ci', 'semver'],
      },
    ],
  },
  {
    id: 'spec-driven',
    name: 'Spec-driven development',
    tagline: 'Write down what "done" means so the AI can hit the target',
    description:
      'SDD, BDD, Definition of Done, OpenAPI, ADRs, RFCs. The specs and decision records that turn vague intent into something you (or an AI) can verify, hand off, and remember why.',
    quiz: [
      {
        q: 'A workflow where you write the executable spec FIRST, then ask the AI to make it pass, is...',
        answerId: 'sdd',
        optionIds: ['sdd', 'tdd', 'bdd', 'definition-of-done'],
      },
      {
        q: 'Tests written in "Given, When, Then" that read like English describe...',
        answerId: 'bdd',
        optionIds: ['bdd', 'sdd', 'tdd', 'acceptance-criteria'],
      },
      {
        q: 'A team-wide checklist a feature must satisfy before being called shippable is the...',
        answerId: 'definition-of-done',
        optionIds: ['definition-of-done', 'acceptance-criteria', 'user-story', 'prd'],
      },
      {
        q: 'A machine-readable description of every endpoint, params, and response in your HTTP API is an...',
        answerId: 'openapi',
        optionIds: ['openapi', 'adr', 'rfc', 'sdd'],
      },
      {
        q: 'A short, dated document capturing "we picked Postgres over Mongo because..." is an...',
        answerId: 'adr',
        optionIds: ['adr', 'rfc', 'prd', 'openapi'],
      },
    ],
  },
  {
    id: 'data',
    name: 'Backend and data',
    tagline: 'Where state lives and how it moves',
    description:
      'SQL vs NoSQL, schema migrations, ORMs, CRUD, pagination, caching. How data is shaped, changed, fetched, and kept fast, with the words you need to ask an AI for the right shape from the start.',
    quiz: [
      {
        q: 'A strict, table-and-column store that you query with joins is...',
        answerId: 'sql-nosql',
        optionIds: ['sql-nosql', 'orm', 'crud', 'caching'],
      },
      {
        q: 'A versioned, reviewable script that changes a database schema is a...',
        answerId: 'migration',
        optionIds: ['migration', 'orm', 'crud', 'pagination'],
      },
      {
        q: 'Code that lets you write `User.find({...})` instead of raw SQL is an...',
        answerId: 'orm',
        optionIds: ['orm', 'sql-nosql', 'migration', 'caching'],
      },
      {
        q: 'The four operations Create, Read, Update, Delete are abbreviated as...',
        answerId: 'crud',
        optionIds: ['crud', 'orm', 'sql-nosql', 'migration'],
      },
      {
        q: 'Infinite-scroll feeds usually use this pagination style instead of "?page=2&size=20"...',
        answerId: 'pagination',
        optionIds: ['pagination', 'caching', 'orm', 'crud'],
      },
    ],
  },
  {
    id: 'protocols',
    name: 'Protocols and APIs',
    tagline: 'How computers talk: HTTP, DNS, SMTP, ports, APIs, real-time',
    description:
      'What a protocol is, HTTP requests and status codes, DNS lookups, IP addresses and ports, how email really sends (SMTP), what an API actually is, and when you need WebSockets. The plumbing behind every "failed to fetch" error and every integration your AI wires up.',
    quiz: [
      {
        q: 'The agreed set of rules two computers follow so their messages make sense (HTTP for the web, SMTP for email) is a...',
        answerId: 'what-is-a-protocol',
        optionIds: ['what-is-a-protocol', 'what-is-an-api', 'dns', 'http-https'],
      },
      {
        q: 'Before your browser can talk to myapp.com, it turns that name into an IP address using...',
        answerId: 'dns',
        optionIds: ['dns', 'http-https', 'ip-ports-localhost', 'smtp-email'],
      },
      {
        q: 'Your dev server runs at localhost:3000. The 3000 identifies...',
        answerId: 'ip-ports-localhost',
        optionIds: ['ip-ports-localhost', 'dns', 'what-is-a-protocol', 'websockets-realtime'],
      },
      {
        q: 'Your app sends a receipt email. The protocol that moves it between mail servers is...',
        answerId: 'smtp-email',
        optionIds: ['smtp-email', 'http-https', 'dns', 'what-is-an-api'],
      },
      {
        q: 'A chat app where the server must push messages instantly, both directions, should use...',
        answerId: 'websockets-realtime',
        optionIds: ['websockets-realtime', 'http-https', 'what-is-an-api', 'dns'],
      },
    ],
  },
  {
    id: 'auth',
    name: 'Authentication and authorization',
    tagline: 'Who you are, what you can do, and how to not leak it',
    description:
      'Sessions vs JWT, OAuth, SSO, refresh tokens, RBAC. The vocabulary you need to tell an AI exactly how login should work AND why "just hide the button in the UI" is not enough.',
    quiz: [
      {
        q: 'A signed token that proves "I am user X", carried by the client and verified server-side, is a...',
        answerId: 'session-vs-jwt',
        optionIds: ['session-vs-jwt', 'oauth', 'sso', 'refresh-token'],
      },
      {
        q: 'The protocol behind "Sign in with Google" buttons (your app never sees the password) is...',
        answerId: 'oauth',
        optionIds: ['oauth', 'sso', 'session-vs-jwt', 'rbac'],
      },
      {
        q: 'One company login that gets an employee into Slack, Jira, GitHub, and your app is...',
        answerId: 'sso',
        optionIds: ['sso', 'oauth', 'rbac', 'session-vs-jwt'],
      },
      {
        q: 'A long-lived credential whose only job is to hand out new short-lived access tokens is a...',
        answerId: 'refresh-token',
        optionIds: ['refresh-token', 'session-vs-jwt', 'oauth', 'sso'],
      },
      {
        q: 'Assigning users to "admin", "editor", "viewer" so the role decides what they can do is...',
        answerId: 'rbac',
        optionIds: ['rbac', 'oauth', 'sso', 'session-vs-jwt'],
      },
    ],
  },
  {
    id: 'ai-literacy',
    name: 'AI literacy',
    tagline: 'LLMs, tokens, agents, RAG, MCP: the words behind the magic',
    description:
      'What an LLM actually does, why tokens matter, how the system/user/assistant roles shape behavior, what agents and tool calling really are, and when to reach for RAG vs fine-tuning. The vocabulary that lets you read any AI release post and tell your AI exactly how to behave.',
    quiz: [
      {
        q: 'A neural network that, given some words, predicts the next word over and over is a...',
        answerId: 'llm',
        optionIds: ['llm', 'agents', 'rag', 'fine-tuning'],
      },
      {
        q: 'The maximum number of tokens (input + history + output) a model can hold in one call is its...',
        answerId: 'tokens',
        optionIds: ['tokens', 'sampling', 'multimodal', 'moe'],
      },
      {
        q: 'Setting temperature to 0 so the same prompt gives the most likely answer every time is tuning...',
        answerId: 'sampling',
        optionIds: ['sampling', 'tokens', 'prompts-roles', 'fine-tuning'],
      },
      {
        q: 'An LLM in a loop that calls tools, reads the results, and decides the next step until it is done is an...',
        answerId: 'agents',
        optionIds: ['agents', 'tool-calling', 'mcp', 'rag'],
      },
      {
        q: 'Searching your own documents, pasting the relevant chunks into the prompt, and asking the model to answer using only that context is...',
        answerId: 'rag',
        optionIds: ['rag', 'fine-tuning', 'tool-calling', 'mcp'],
      },
    ],
  },
  {
    id: 'vibe-prompting',
    name: 'Vibe prompting for UI',
    tagline: 'Learn to talk to an AI about UI so you can ship',
    description:
      'A class-ready path that covers the vocabulary and prompting skills you need to describe a user interface to an AI and get back something you would actually ship. Pulls from Design Language, AI Literacy, and Web Foundations so you learn the words, the tools, and the building blocks together.',
    isCrossCluster: true,
    items: [
      'prompts-roles',
      'design-system',
      'design-tokens',
      'typography-scale',
      'readable-type',
      'contrast-wcag',
      'color-palette',
      'one-primary-cta',
      'brand-constraints',
      'design-contract',
      'component-states',
      'responsive-breakpoints',
      'llm',
      'tokens',
      'tool-calling',
    ],
    quiz: [
      {
        q: 'Putting format rules in the system message (not the user message) so they stick better is using the...',
        answerId: 'prompts-roles',
        optionIds: ['prompts-roles', 'llm', 'tokens', 'sampling'],
      },
      {
        q: 'The minimum contrast ratio WCAG AA requires for normal-size body text is...',
        answerId: 'contrast-wcag',
        optionIds: ['contrast-wcag', 'color-palette', 'readable-type', 'design-tokens'],
      },
      {
        q: 'A short "we are X, not Y" list you paste into a system prompt to steer the AI toward your brand is a...',
        answerId: 'brand-constraints',
        optionIds: ['brand-constraints', 'design-system', 'design-tokens', 'one-primary-cta'],
      },
      {
        q: 'Telling the AI "use only the tokens in tailwind.config.js" instead of letting it invent arbitrary values is enforcing the...',
        answerId: 'design-contract',
        optionIds: ['design-contract', 'design-tokens', 'design-system', 'typography-scale'],
      },
      {
        q: 'Every screen should have exactly one loud, filled button for the main action. That principle is called...',
        answerId: 'one-primary-cta',
        optionIds: ['one-primary-cta', 'component-states', 'variants-sizes', 'brand-constraints'],
      },
    ],
  },
];

// Inject the topic ids from each matching cluster into path.items so the path
// stays in sync with the data (no need to repeat ids by hand).
for (const path of BUILD_PATHS) {
  if (path.isCrossCluster) continue;
  const cluster = BUILD_LITERACY_CLUSTERS.find(c => c.id === path.id);
  path.items = cluster ? cluster.topics.map(t => t.id) : [];
}

export const BUILD_PATH_IDS = BUILD_PATHS.map(p => p.id);

export function getBuildPath(id) {
  return BUILD_PATHS.find(p => p.id === id) || null;
}
