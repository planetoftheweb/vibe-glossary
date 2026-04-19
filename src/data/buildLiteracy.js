/**
 * Build Literacy: ideas from the rest of the build (planning, tests, specs,
 * data, auth) plus the web foundations every vibe coder needs to read code,
 * write tickets, and talk to an AI without bluffing.
 *
 * Voice rules for every topic:
 *   - Like a friend explaining over coffee. No academic tone.
 *   - Spell out every acronym the first time it appears.
 *   - One new idea per paragraph in `details`.
 *   - `talkToAi` is the whole point: a short, copyable script someone can
 *     paste into ChatGPT/Claude/Cursor to actually use the idea.
 *   - `mnemonic` is the "if you remember nothing else..." sticky line.
 *   - No em dashes anywhere.
 */

/** Top nav accent when the Build literacy section is active. */
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

export const BUILD_LITERACY_INTRO = {
  title: 'Build literacy',
  lead:
    'The UI glossary names what you see on screen. This section names ideas from the rest of the build (planning, tests, specs, data, auth) so you can read tickets, AI output, and your own code with confidence, and tell your AI exactly what you want.',
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
        summary:
          'The tiniest version of your idea you can put in front of real people to learn whether the idea works at all.',
        comparison:
          'An MVP answers "is anyone interested?". A v1 polishes the bits the MVP proved people care about.',
        vibeTip:
          'When you prompt for an MVP, list the one or two flows that prove the idea, and tell the AI to skip everything else.',
        talkToAi:
          'I want an MVP for a recipe-sharing app. The only flows it needs are: sign in with Google, post a recipe with title and steps, and view a feed of recent posts. Skip search, comments, ratings, and profiles for now. Use Next.js with Tailwind.',
        mnemonic:
          'MVP is a question, not a product: "do people want this?"',
        relatedGlossaryIds: ['stepper', 'hero'],
      },
      {
        id: 'prd',
        title: 'PRD (Product Requirements Document)',
        summary:
          'A short written description of what a feature should do, who it is for, and how you will know it worked.',
        comparison:
          'A PRD says what and why. A spec says how. A user story is one slice of the PRD told from the user\'s side.',
        vibeTip:
          'Hand a PRD to your AI before asking for code: it gives the model the same context a human engineer would expect.',
        talkToAi:
          'Read this PRD carefully. Then list the screens we need, the data each screen reads or writes, and any open questions. Don\'t generate code yet, I want to agree on scope first.',
        mnemonic:
          'A PRD turns "build me a thing" into "here is the thing, and here is what done means".',
        relatedGlossaryIds: ['table', 'faq'],
      },
      {
        id: 'user-story',
        title: 'User story',
        summary:
          'One sentence in the user\'s voice: "As a ___, I want ___, so that ___." It keeps you from building things no one asked for.',
        comparison:
          'A user story is the why. Acceptance criteria are the proof it is done. A task is one piece of the work to get there.',
        vibeTip:
          'Paste the user story into your prompt before the implementation request, the AI will choose better defaults.',
        talkToAi:
          'User story: "As a new user, I want to reset my password from a link in my email so that I can get back into my account when I forget." Build the reset password page, the email link handler, and the success state. Use our existing auth library.',
        mnemonic:
          'If you cannot finish "As a ___, I want ___, so that ___", you do not understand the feature yet.',
        relatedGlossaryIds: ['card'],
      },
      {
        id: 'acceptance-criteria',
        title: 'Acceptance criteria',
        summary:
          'A short checklist of things that must be true before you can call a feature "done", written so anyone can test them.',
        comparison:
          'Acceptance criteria are the test. The user story is the goal. A bug report is what happens when you skipped writing them.',
        vibeTip:
          'Give acceptance criteria to your AI as a numbered list, then ask it to write the code and the tests against the same list.',
        talkToAi:
          'Build the password reset flow with these acceptance criteria: 1) Form rejects an empty email. 2) Submitting a valid email shows "check your inbox" within 2 seconds. 3) The reset link expires after 1 hour. 4) After a successful reset, the user is logged in. Write Playwright tests for each.',
        mnemonic:
          'If you cannot tick it off, it is not acceptance criteria.',
        relatedGlossaryIds: ['stepper', 'alert'],
      },
      {
        id: 'roadmap',
        title: 'Roadmap',
        summary:
          'A picture of what is coming next, in roughly what order, so the team and your users can see the same future.',
        comparison:
          'A roadmap shows direction. A sprint plan shows the next two weeks. A backlog is the unsorted pile of ideas behind both.',
        vibeTip:
          'Ask your AI to turn a long brain dump into a roadmap with "now / next / later" buckets, it is great at this.',
        talkToAi:
          'Here are 30 feature ideas for our app. Group them into Now (build this quarter), Next (build after that), and Later (someday). For each one, write one sentence on why it belongs in that bucket.',
        mnemonic:
          'A roadmap is a promise about direction, not about dates.',
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
        summary:
          'Write a tiny failing test first, then the smallest code that makes it pass, then clean up. Repeat.',
        comparison:
          'TDD writes the test first. "Test after" writes the test once the code already works. Both are better than no tests.',
        vibeTip:
          'AI coding tools love TDD: tests give them an exact target so they stop "improving" things you did not ask them to touch.',
        talkToAi:
          'Use TDD. Step 1: write a Vitest test for a function called formatPrice that turns 1999 into "$19.99". Show me the test and confirm it fails. Step 2: write the function. Step 3: refactor if needed.',
        mnemonic:
          'Red, green, refactor: failing test, passing code, clean up.',
        relatedGlossaryIds: [],
      },
      {
        id: 'unit-vs-integration',
        title: 'Unit vs integration tests',
        summary:
          'Unit tests check one small piece by itself. Integration tests check that several pieces still talk to each other after you change one.',
        comparison:
          'Unit tests are fast and pinpoint. Integration tests are slower but catch the "it worked alone, it broke together" bugs.',
        vibeTip:
          'Tell your AI which kind of test you want. "Add a unit test" and "add an integration test" produce very different code.',
        talkToAi:
          'Write a unit test for the parsePrice function in lib/money.js using Vitest, mock nothing. Then write a separate integration test in tests/checkout.spec.ts that spins up the app, fills the checkout form, and asserts the order appears in the database.',
        mnemonic:
          'Unit tests prove your puzzle pieces. Integration tests prove the puzzle.',
        relatedGlossaryIds: [],
      },
      {
        id: 'ci',
        title: 'CI (Continuous Integration)',
        summary:
          'A robot that runs your tests every time someone pushes code, so broken changes never silently land on the main branch.',
        comparison:
          'CI checks the code. CD (Continuous Delivery / Deployment) ships it. Most teams say "CI/CD" because they pair so often.',
        vibeTip:
          'Ask your AI to write the CI config for the platform you actually use (GitHub Actions, GitLab, etc.) and to fail loudly on lint errors, not just test failures.',
        talkToAi:
          'Add a GitHub Actions workflow that runs on every pull request. Steps: install with pnpm, run "pnpm lint", "pnpm test", and "pnpm build". Cache pnpm. Fail the PR if any step fails.',
        mnemonic:
          'CI is the friend who reads every diff so you do not have to.',
        relatedGlossaryIds: [],
      },
      {
        id: 'staging-vs-prod',
        title: 'Staging vs production',
        summary:
          'Staging is a copy of your live site you can break safely. Production is the real thing your users hit, so changes there should be careful and watched.',
        comparison:
          'Staging is rehearsal. Production is opening night. "It worked on my machine" is a polite way to say you skipped staging.',
        vibeTip:
          'When prompting, say which environment the change is for. AIs default to "just ship it" if you do not.',
        talkToAi:
          'Add an environment banner to the top of the app that reads STAGING in yellow when NEXT_PUBLIC_ENV is "staging", and is hidden in production. Use our Tailwind tokens.',
        mnemonic:
          'If it is scary to change, it belongs in staging first.',
        relatedGlossaryIds: ['badge'],
      },
    ],
  },
  {
    id: 'spec-driven',
    title: 'Spec-driven development',
    summary: 'Decisions and contracts that outlive a single chat thread.',
    topics: [
      {
        id: 'openapi',
        title: 'OpenAPI / API contract',
        summary:
          'A machine-readable file that describes every endpoint of your API: the URL, what you send, what you get back. Frontend and backend agree on it before anyone codes.',
        comparison:
          'OpenAPI is the menu. The implementation is the kitchen. GraphQL schemas serve a similar role for GraphQL APIs.',
        vibeTip:
          'Give your AI the OpenAPI file and it can generate clients, types, and mock servers automatically.',
        talkToAi:
          'Here is our openapi.yaml. Generate a typed TypeScript client for it using openapi-typescript. Then write a stub server in MSW that returns realistic fake data for every GET endpoint, so I can build the frontend before the backend is ready.',
        mnemonic:
          'Agree on the menu before you start cooking.',
        relatedGlossaryIds: ['table'],
      },
      {
        id: 'adr',
        title: 'ADR (Architecture Decision Record)',
        summary:
          'A short note that captures one big decision: what we picked, what we rejected, and why. So in six months no one has to guess.',
        comparison:
          'An ADR is the why behind a choice. A README is how to use the thing. A changelog is what changed and when.',
        vibeTip:
          'Have your AI draft the ADR after you make the decision: it is great at summarizing trade-offs you already discussed.',
        talkToAi:
          'Write an ADR titled "Use Postgres over MongoDB for our core data". Sections: Context, Decision, Consequences. Pull the trade-offs from this chat. Keep it under one page.',
        mnemonic:
          'Future-you will not remember why. Write it down.',
        relatedGlossaryIds: [],
      },
      {
        id: 'rfc',
        title: 'RFC (Request for Comments)',
        summary:
          'A proposal you circulate before a big change so teammates can poke holes in it. Common for renames, new APIs, and migrations.',
        comparison:
          'An RFC asks "should we?". An ADR records "we did, here is why". A PR is the actual change.',
        vibeTip:
          'Ask your AI to write the RFC in three sections: Motivation, Proposal, Open Questions. The Open Questions section is where the real conversation starts.',
        talkToAi:
          'Draft an RFC proposing we move from REST to tRPC for our internal API. Three sections: Motivation, Proposal, Open Questions. Keep it under 800 words. End with five concrete questions for reviewers.',
        mnemonic:
          'An RFC is a chance to be wrong cheaply, before you write the code.',
        relatedGlossaryIds: [],
      },
    ],
  },
  {
    id: 'data',
    title: 'Backend and data',
    summary: 'How information is stored, fetched, and kept honest.',
    topics: [
      {
        id: 'sql-nosql',
        title: 'SQL vs NoSQL',
        summary:
          'SQL databases (Postgres, MySQL) store data in strict tables you join together. NoSQL (Mongo, DynamoDB) stores looser documents or key-value pairs.',
        comparison:
          'SQL is a spreadsheet with rules. NoSQL is a folder of sticky notes. Most apps want SQL by default; reach for NoSQL when scale or shape forces your hand.',
        vibeTip:
          'When you prompt, say which database you have. "Write a Postgres query" and "write a Mongo query" produce completely different code.',
        talkToAi:
          'We use Postgres with Prisma. Add a "comments" table linked to "posts" with a foreign key. Write the Prisma schema change, the migration, and a typed function listComments(postId) that returns them sorted by createdAt.',
        mnemonic:
          'Default to SQL. Switch only when you can name why.',
        relatedGlossaryIds: ['table', 'tree'],
      },
      {
        id: 'migration',
        title: 'Schema migration',
        summary:
          'A small script that changes the shape of your database (adds a column, makes a field required, etc.) and ships alongside the app code that needs it.',
        comparison:
          'A migration changes structure. A seed script fills the structure with starter data. A backup is a copy you can restore from.',
        vibeTip:
          'Always ask your AI for a reversible migration with both an "up" and a "down" step. You will thank yourself the first time you have to roll back.',
        talkToAi:
          'Add a Prisma migration that adds a nullable "lastSeenAt" timestamp to the User model. Write the migration, update the type, and show me the SQL it will run. Make sure the down migration drops the column cleanly.',
        mnemonic:
          'A migration is a deliberate, versioned change. A rogue ALTER TABLE is a regret.',
        relatedGlossaryIds: [],
      },
      {
        id: 'orm',
        title: 'ORM (Object-Relational Mapper)',
        summary:
          'A library that lets you read and write database rows as objects in your language, instead of writing raw SQL strings everywhere.',
        comparison:
          'An ORM (Prisma, Drizzle, ActiveRecord) is the friendly wrapper. Raw SQL is the metal underneath. Both have their place.',
        vibeTip:
          'Tell your AI which ORM you use, the syntax differs a lot. "Write a Prisma query" and "write a Drizzle query" look nothing alike.',
        talkToAi:
          'Using Prisma, write a function getRecentPosts(limit) that returns the most recent posts including their author\'s name and the count of comments. Type the return value. Add a Vitest test using a fresh test database.',
        mnemonic:
          'An ORM trades a little speed for a lot of safety and readability.',
        relatedGlossaryIds: [],
      },
      {
        id: 'crud',
        title: 'CRUD (Create, Read, Update, Delete)',
        summary:
          'The four basic things you do to stored data. Most app screens are some mix of these four, and most APIs map them to HTTP verbs.',
        comparison:
          'Create = POST. Read = GET. Update = PATCH or PUT. Delete = DELETE. If you remember this map, REST APIs stop feeling mysterious.',
        vibeTip:
          'Ask your AI for "the CRUD endpoints for X" and it will scaffold all four with consistent naming, much faster than asking one at a time.',
        talkToAi:
          'Generate the CRUD API for a "Note" resource in Next.js route handlers. Endpoints: POST /api/notes, GET /api/notes, GET /api/notes/[id], PATCH /api/notes/[id], DELETE /api/notes/[id]. Validate input with Zod and return 400s with helpful messages.',
        mnemonic:
          'Most apps are CRUD with a coat of paint.',
        relatedGlossaryIds: ['table', 'modal'],
      },
      {
        id: 'caching',
        title: 'Caching',
        summary:
          'Saving a copy of a slow result somewhere fast so you do not have to compute or fetch it again every time.',
        comparison:
          'Caching trades freshness for speed. The hard part is "cache invalidation": knowing when the saved copy is stale.',
        vibeTip:
          'When you ask for caching, say where (browser, CDN, server, database) and how long. "Cache it" without those answers is a future bug.',
        talkToAi:
          'Cache the GET /api/products response on the server for 60 seconds using Next.js fetch revalidation. When a product is updated via PATCH, call revalidateTag("products") to bust the cache.',
        mnemonic:
          'Caching is easy. Knowing when to throw the cache away is the job.',
        relatedGlossaryIds: ['skeleton'],
      },
    ],
  },
  {
    id: 'auth',
    title: 'Authentication and authorization',
    summary:
      'Who someone is (authentication) versus what they are allowed to do (authorization). Get the words right and your prompts get clearer instantly.',
    topics: [
      {
        id: 'session-vs-jwt',
        title: 'Session cookies vs JWT',
        summary:
          'Session cookies hold a small id that the server uses to look you up. JWTs (JSON Web Tokens) carry the user info inside the token itself, signed so the server can trust it without a lookup.',
        comparison:
          'Sessions need a server to remember you. JWTs let the server forget, but rotating them when something goes wrong is harder.',
        vibeTip:
          'Pick one and tell your AI. Mixing both in one app is where bugs live.',
        talkToAi:
          'Set up authentication with NextAuth using session cookies (not JWT). Use the database session strategy with Prisma. Email + Google sign-in. Sessions last 30 days and refresh on activity.',
        mnemonic:
          'Sessions: the server remembers you. JWT: you carry your own ID badge.',
        relatedGlossaryIds: ['toast'],
      },
      {
        id: 'oauth',
        title: 'OAuth 2.0',
        summary:
          'A way to let users sign in to your app with Google, GitHub, or Apple, without your app ever seeing their password.',
        comparison:
          'OAuth handles the "let me in" handshake. OpenID Connect (built on top) tells you who the person is. Together they power most "Sign in with..." buttons.',
        vibeTip:
          'You almost never write OAuth from scratch. Tell your AI the library you trust (NextAuth, Auth.js, Clerk, Supabase Auth) and let it wire up the rest.',
        talkToAi:
          'Add "Sign in with GitHub" using Auth.js. Read the GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET from .env. After sign-in, redirect to /dashboard. Show me the env vars I need to create on the GitHub developer settings page.',
        mnemonic:
          'OAuth is "let me in via someone else who already knows me".',
        relatedGlossaryIds: ['modal'],
      },
      {
        id: 'sso',
        title: 'SSO (Single Sign-On)',
        summary:
          'One company login that gets you into many apps without typing a password again. Common at work via Okta, Google Workspace, or Azure AD.',
        comparison:
          'SSO is for organizations. Social login (Sign in with Google for personal accounts) feels similar but is usually OAuth, not enterprise SSO.',
        vibeTip:
          'If your audience is companies, ask your AI to support SAML or OIDC behind a feature flag from day one, retrofitting it later is painful.',
        talkToAi:
          'Add SAML SSO support using Auth.js for our enterprise tier. Use the BoxyHQ SAML provider. Each tenant configures their own identity provider in /admin/sso. Document the metadata URL we need to give them.',
        mnemonic:
          'SSO is "log in to your work, get all the tools".',
        relatedGlossaryIds: [],
      },
      {
        id: 'refresh-token',
        title: 'Refresh token',
        summary:
          'A long-lived credential whose only job is to get you new short-lived access tokens. So if a regular token leaks, the damage window is small.',
        comparison:
          'Access tokens are like a day pass: short, used everywhere. Refresh tokens are like the season pass at the front desk: rarely shown, kept safe.',
        vibeTip:
          'Tell your AI to store refresh tokens server-side or in HTTP-only cookies, never in localStorage where any script can read them.',
        talkToAi:
          'When our API access token expires (HTTP 401), use the refresh token stored in an HTTP-only cookie to get a new access token, then retry the original request once. Wrap this in a fetch interceptor so callers do not have to think about it.',
        mnemonic:
          'Short tokens for daily use, one safe long token to renew them.',
        relatedGlossaryIds: [],
      },
    ],
  },
];

/** Flat lookup: id -> topic with cluster info attached. */
export const BUILD_TOPICS_FLAT = Object.fromEntries(
  BUILD_LITERACY_CLUSTERS.flatMap(cluster =>
    cluster.topics.map(topic => [
      topic.id,
      {
        ...topic,
        clusterId: cluster.id,
        clusterTitle: cluster.title,
      },
    ])
  )
);

/** Ordered list of every build topic id, useful for prev/next nav. */
export const BUILD_TOPIC_IDS = BUILD_LITERACY_CLUSTERS.flatMap(c =>
  c.topics.map(t => t.id)
);

export function getBuildTopic(id) {
  return BUILD_TOPICS_FLAT[id] || null;
}

export function getBuildCluster(clusterId) {
  return BUILD_LITERACY_CLUSTERS.find(c => c.id === clusterId) || null;
}
