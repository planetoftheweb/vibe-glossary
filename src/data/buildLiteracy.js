/**
 * Build literacy — concepts for the development process (auth, data, specs, etc.).
 * Separate from UI glossary entries: no interactive demo; optional links to related components.
 */

/** Top nav accent when the Build literacy section is active (matches CATEGORY_COLORS shape). */
export const BUILD_LITERACY_NAV_COLORS = {
  text: 'text-indigo-400',
  bg: 'bg-indigo-500/10',
  border: 'border-indigo-500/30',
  active: 'bg-indigo-600 text-white',
  hover: 'hover:bg-indigo-500/10',
  dot: 'bg-indigo-500',
  accent: 'text-indigo-500',
  gradient: 'from-indigo-600 to-violet-700',
};

export const BUILD_LITERACY_CLUSTERS = [
  {
    id: 'product',
    title: 'Product and planning',
    summary: 'How teams decide what to build before anyone opens an editor.',
    topics: [
      {
        id: 'mvp',
        title: 'MVP (Minimum Viable Product)',
        definition:
          'The smallest version of a product that lets you learn whether your core idea works, without building every nice-to-have first.',
        relatedGlossaryIds: ['stepper', 'hero'],
      },
      {
        id: 'prd',
        title: 'PRD (Product Requirements Document)',
        definition:
          'A written description of what a feature should do, for whom, and how success is measured. Aligns design, engineering, and stakeholders.',
        relatedGlossaryIds: ['table', 'faq'],
      },
      {
        id: 'user-story',
        title: 'User story',
        definition:
          'A short sentence from the user’s perspective: "As a ___, I want ___, so that ___." Often broken into tasks and acceptance criteria.',
        relatedGlossaryIds: ['card'],
      },
      {
        id: 'acceptance-criteria',
        title: 'Acceptance criteria',
        definition:
          'Checklist conditions that must be true for a story to be "done"—testable statements like "User can reset password from email link."',
        relatedGlossaryIds: ['stepper', 'alert'],
      },
      {
        id: 'roadmap',
        title: 'Roadmap',
        definition:
          'A time-oriented view of planned themes or features. Communicates priority, not a guarantee of dates.',
        relatedGlossaryIds: ['timeline'],
      },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering practice',
    summary: 'How code is written, verified, and shipped.',
    topics: [
      {
        id: 'tdd',
        title: 'TDD (Test-Driven Development)',
        definition:
          'Write a failing test first, then minimal code to pass, then refactor. Keeps behavior explicit and regressions visible.',
        relatedGlossaryIds: [],
      },
      {
        id: 'unit-vs-integration',
        title: 'Unit vs integration tests',
        definition:
          'Unit tests check one function or module in isolation. Integration tests check that multiple parts work together (e.g. API + database).',
        relatedGlossaryIds: [],
      },
      {
        id: 'ci',
        title: 'CI (Continuous Integration)',
        definition:
          'Automated builds and tests run on every push or PR so breakages are caught before merge.',
        relatedGlossaryIds: [],
      },
      {
        id: 'staging-vs-prod',
        title: 'Staging vs production',
        definition:
          'Staging mirrors production closely for final checks. Production is what real users hit—changes here should be deliberate and monitored.',
        relatedGlossaryIds: ['badge'],
      },
    ],
  },
  {
    id: 'spec-driven',
    title: 'Spec-driven development',
    summary: 'Contracts and decisions that outlive a single chat thread.',
    topics: [
      {
        id: 'openapi',
        title: 'OpenAPI / API contract',
        definition:
          'A machine-readable description of HTTP endpoints, parameters, and responses. Lets frontend and backend agree on shapes before coding.',
        relatedGlossaryIds: ['table'],
      },
      {
        id: 'adr',
        title: 'ADR (Architecture Decision Record)',
        definition:
          'A short log entry: context, decision, and consequences. Explains why the codebase looks the way it does months later.',
        relatedGlossaryIds: [],
      },
      {
        id: 'rfc',
        title: 'RFC (Request for Comments)',
        definition:
          'A proposal circulated for feedback before a big change—naming, APIs, or migrations. Common in larger teams and open source.',
        relatedGlossaryIds: [],
      },
    ],
  },
  {
    id: 'data',
    title: 'Backend and data',
    summary: 'Vocabulary around persistence and APIs.',
    topics: [
      {
        id: 'sql-nosql',
        title: 'SQL vs NoSQL',
        definition:
          'SQL databases use tables and joins (PostgreSQL, MySQL). NoSQL favors flexible documents, wide-column, or key-value stores for scale or schema agility.',
        relatedGlossaryIds: ['table', 'tree'],
      },
      {
        id: 'migration',
        title: 'Schema migration',
        definition:
          'Versioned scripts that change database structure safely (add column, index, table) in sync with app deploys.',
        relatedGlossaryIds: [],
      },
      {
        id: 'orm',
        title: 'ORM',
        definition:
          'Object-Relational Mapper: maps rows to objects in your language so you query with code instead of only raw SQL.',
        relatedGlossaryIds: [],
      },
      {
        id: 'crud',
        title: 'CRUD',
        definition:
          'Create, Read, Update, Delete—the basic operations on stored records. Often maps to HTTP POST/GET/PATCH/DELETE in APIs.',
        relatedGlossaryIds: ['table', 'modal'],
      },
      {
        id: 'caching',
        title: 'Caching',
        definition:
          'Storing copies of expensive results (queries, pages, assets) closer to the user or app to reduce latency and load. Needs invalidation strategy.',
        relatedGlossaryIds: ['skeleton'],
      },
    ],
  },
  {
    id: 'auth',
    title: 'Authentication and authorization',
    summary: 'Who someone is vs what they may do—get the terms right when you prompt or review code.',
    topics: [
      {
        id: 'session-vs-jwt',
        title: 'Session cookies vs JWT',
        definition:
          'Sessions store state on the server and send a small session id cookie. JWTs are self-contained tokens—verify signature and expiry on each request; no server session store required.',
        relatedGlossaryIds: ['toast'],
      },
      {
        id: 'oauth',
        title: 'OAuth 2.0',
        definition:
          'Delegated authorization: let users sign in with Google/GitHub without your app seeing their password. OpenID Connect adds identity on top.',
        relatedGlossaryIds: ['modal'],
      },
      {
        id: 'sso',
        title: 'SSO (Single Sign-On)',
        definition:
          'One corporate login grants access to many apps—often SAML or OIDC behind the scenes.',
        relatedGlossaryIds: [],
      },
      {
        id: 'refresh-token',
        title: 'Refresh token',
        definition:
          'A long-lived credential used only to obtain new short-lived access tokens—limits exposure if an access token leaks.',
        relatedGlossaryIds: [],
      },
    ],
  },
];

export const BUILD_LITERACY_INTRO = {
  title: 'Build literacy',
  lead:
    'The UI glossary names what you see on screen. This section names ideas from the rest of the build: planning, tests, specs, data, and auth—so you can read docs, tickets, and AI output with confidence.',
};
