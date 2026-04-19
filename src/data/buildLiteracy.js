import { WEB_FOUNDATIONS_CLUSTER } from './webFoundations.js';

/**
 * Build Literacy: ideas from the rest of the build (planning, tests, specs,
 * data, auth) plus the web foundations every vibe coder needs to read code,
 * write tickets, and talk to an AI without bluffing.
 *
 * Voice rules for every topic:
 *   - Like a friend explaining over coffee. No academic tone.
 *   - Spell out every acronym the first time it appears.
 *   - One new idea per paragraph in `details`.
 *   - `talkToAi.starter` is a generic, fillable prompt with [brackets] that
 *     tells the AI to interview the user with 3-5 questions before doing
 *     anything, and invites it to push back. THIS is what they copy.
 *   - `talkToAi.example` is a worked, real-world version so they see what a
 *     filled-in starter looks like.
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
  WEB_FOUNDATIONS_CLUSTER,
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
        talkToAi: {
          starter:
            'I want to define an MVP for [your idea in one sentence]. Before you suggest scope or write any code, ask me 3-5 focused questions: who this is really for, what one or two flows would prove the idea is worth pursuing, what we should explicitly NOT build for v1, and what success would look like in three months. After my answers, propose the smallest scope you would defend, and push back on anything I asked for that you think hurts the experiment.',
          example:
            'I want an MVP for a recipe-sharing app. The only flows it needs are: sign in with Google, post a recipe with title and steps, and view a feed of recent posts. Skip search, comments, ratings, and profiles for now. Use Next.js with Tailwind.',
        },
        mnemonic:
          'MVP is a question, not a product: "do people want this?"',
        relatedGlossaryIds: ['stepper', 'hero'],
      },
      {
        id: 'north-star',
        title: 'North-star metric',
        summary:
          'The one number a product team agrees to optimize for. If it goes up, the product is winning. If it does not, nothing else matters.',
        details:
          'A north-star metric is the single measurement that captures whether your product is delivering value. Spotify uses time spent listening. Airbnb uses nights booked. The whole team aligns around moving that one number, which forces hard prioritization (does this feature actually move the needle, or does it just feel busy?).\n\nA good north-star metric has three properties: it tracks a real customer outcome (not vanity like signups), it is sensitive enough that decent work moves it within a quarter, and it would still matter if the company doubled in size.\n\nWhy you care as a vibe coder: when an AI asks "what should I build next?", the right answer is almost always "whichever option you predict will move our north-star metric the most". Without one, every feature looks equally important and you ship random stuff.',
        comparison:
          'Vanity metrics (downloads, signups) feel good. The north-star metric (active usage, value delivered) actually predicts whether you are winning.',
        vibeTip:
          'Tell your AI your north-star metric in the system prompt for product decisions. It will stop suggesting flashy features that have nothing to do with it.',
        talkToAi: {
          starter:
            'Help me pick a north-star metric for [your product]. Before suggesting one, ask me: 1) what users actually do in the product when it is working, 2) what we currently measure and why, 3) what time horizon matters (weekly active, monthly retained, etc.). Then propose two or three candidate metrics, walk through the trade-offs of each (sensitivity, gameability, customer alignment), and recommend one with reasoning. Push back if any candidate I suggested is a vanity metric.',
          example:
            'Help me pick a north-star metric for a Pomodoro-style focus app. Users start a 25-minute timer and try to finish without quitting. We currently track signups and DAU. The metric should reward people getting the value (focused minutes), not just opening the app.',
        },
        mnemonic:
          'One number. Everyone aligned. Nothing else gets optimized first.',
        relatedGlossaryIds: ['statcard', 'linechart'],
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
        talkToAi: {
          starter:
            'Read the PRD I am about to paste, then help me sanity-check it before any code gets written. Ask me 3-5 clarifying questions about anything ambiguous, missing, or contradictory (audience, success metric, non-goals, edge cases). Then list the screens we would need, the data each one reads or writes, and the open questions you still cannot answer from the doc. Do NOT generate code yet.',
          example:
            'Here is the PRD for our team-invite feature: [paste]. Sanity-check it. Ask me anything ambiguous (especially about edge cases like expired invites and re-invites). Then list the screens, the data each reads/writes, and the open questions. No code yet.',
        },
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
        talkToAi: {
          starter:
            'Help me turn [a feature idea] into a proper user story and then implement it. Before writing code, ask me: 1) who exactly the user is (role, context, what they were doing right before this), 2) what they want and why it matters to THEM (not to us), 3) what would make them give up. Then write the user story in "As a ___, I want ___, so that ___" form, list the screens it implies, and only build after I confirm.',
          example:
            'User story: "As a new user, I want to reset my password from a link in my email so that I can get back into my account when I forget." Build the reset password page, the email link handler, and the success state. Use our existing auth library.',
        },
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
        talkToAi: {
          starter:
            'Write acceptance criteria for [feature], then implement it test-first. Before writing anything, ask me: 1) the user story or PRD this is for, 2) the happy path and the obvious sad paths, 3) any non-functional requirements (performance, accessibility, analytics). Then produce a numbered checklist, write a Playwright test per item, run them red, and only then build the feature until they all pass.',
          example:
            'Build the password reset flow with these acceptance criteria: 1) Form rejects an empty email. 2) Submitting a valid email shows "check your inbox" within 2 seconds. 3) The reset link expires after 1 hour. 4) After a successful reset, the user is logged in. Write Playwright tests for each.',
        },
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
        talkToAi: {
          starter:
            'Turn [my list of feature ideas] into a Now / Next / Later roadmap. Before sorting anything, ask me: 1) our north-star metric or top goal, 2) team capacity per quarter, 3) any hard constraints (a launch date, a customer commitment). Then group every idea into a bucket with one sentence on why, flag anything you would drop entirely, and suggest one or two ideas you think are missing.',
          example:
            'Here are 30 feature ideas for our app. Group them into Now (build this quarter), Next (build after that), and Later (someday). For each one, write one sentence on why it belongs in that bucket. Our north-star metric is weekly active editors.',
        },
        mnemonic:
          'A roadmap is a promise about direction, not about dates.',
        relatedGlossaryIds: ['timeline'],
      },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering practice',
    summary: 'How code is written, verified, versioned, and shipped.',
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
        talkToAi: {
          starter:
            'Use TDD to build [a function or small unit] in [path]. Before writing anything, ask me: 1) the function signature and what it should return for two or three inputs, 2) the edge cases I care about, 3) the test framework we use. Then loop: write one failing test, show me it failing, write the smallest code to pass it, refactor, repeat. Do not jump ahead and write more code than the current test demands.',
          example:
            'Use TDD. Step 1: write a Vitest test for a function called formatPrice that turns 1999 into "$19.99". Show me the test and confirm it fails. Step 2: write the function. Step 3: refactor if needed. Then add tests for negative numbers, zero, and very large values one at a time.',
        },
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
        talkToAi: {
          starter:
            'Add tests for [feature or module]. Before writing anything, ask me: 1) which functions or flows I most want covered, 2) whether each test should be a unit test (one piece, no I/O) or an integration test (several pieces, real DB or HTTP), 3) what test framework we use and where existing tests live. Then propose a list of tests with the right type for each, explain why, and write them after I confirm.',
          example:
            'Write a unit test for the parsePrice function in lib/money.js using Vitest, mock nothing. Then write a separate integration test in tests/checkout.spec.ts that spins up the app, fills the checkout form, and asserts the order appears in the database.',
        },
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
        talkToAi: {
          starter:
            'Set up CI for [this repo]. Before writing the config, ask me: 1) the CI provider (GitHub Actions, GitLab, CircleCI, etc.), 2) the package manager and the scripts I run locally (lint, test, build, typecheck), 3) which branches and events should trigger the pipeline. Then propose the workflow file, explain each step, and call out anywhere caching or matrix builds would save real time.',
          example:
            'Add a GitHub Actions workflow that runs on every pull request. Steps: install with pnpm, run "pnpm lint", "pnpm test", and "pnpm build". Cache pnpm. Fail the PR if any step fails.',
        },
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
        talkToAi: {
          starter:
            'Help me make [environment-specific behavior] explicit in the codebase. Before changing anything, ask me: 1) what environments we have (local, staging, prod, anything else), 2) the env var that distinguishes them, 3) what should differ visually or behaviorally between them. Then propose the change (banner, feature flag, config branch), make it impossible to ship by accident in the wrong environment, and write a quick checklist for promoting to prod.',
          example:
            'Add an environment banner to the top of the app that reads STAGING in yellow when NEXT_PUBLIC_ENV is "staging", and is hidden in production. Use our Tailwind tokens.',
        },
        mnemonic:
          'If it is scary to change, it belongs in staging first.',
        relatedGlossaryIds: ['badge'],
      },
      {
        id: 'semver',
        title: 'Semantic versioning (SemVer)',
        summary:
          'A version number like 2.4.1 is not random. It is MAJOR.MINOR.PATCH: a bump in MAJOR breaks you, MINOR adds features safely, PATCH fixes bugs.',
        details:
          'Every package on npm, every API, every CLI you depend on uses some version number. Semantic versioning (SemVer) is the convention that says those numbers actually mean something. Read MAJOR.MINOR.PATCH like a sentence: when MAJOR changes (1.x.x to 2.x.x), expect breakage and read the migration notes. When MINOR changes (2.4.x to 2.5.x), expect new features but nothing should break. When PATCH changes (2.4.0 to 2.4.1), expect bug fixes only.\n\nThe "^" and "~" characters in package.json piggyback on this. "^2.4.1" means "any 2.x.x as long as it is at least 2.4.1", so npm install will happily pick up new MINOR and PATCH releases. "~2.4.1" is stricter: PATCH only. Pinning to exactly "2.4.1" is the safest and the most maintenance-heavy.\n\nWhy you care: when an AI suggests "upgrade to v3", that "3" is a promise that something will break. When a library jumps from 0.x to 1.0, the maintainers are signaling "we are now stable". Reading the version number alone tells you how nervous to be.',
        comparison:
          'MAJOR breaks. MINOR adds. PATCH fixes. ^ allows minor and patch upgrades. ~ allows patch only. No prefix means pinned exactly.',
        vibeTip:
          'When you ask your AI to "upgrade a dependency", tell it to read the changelog for any MAJOR bump and surface breaking changes BEFORE running npm install.',
        talkToAi: {
          starter:
            'Help me upgrade [a dependency, or all dependencies] safely. Before running anything, ask me: 1) which package(s) and the current version range in package.json, 2) whether we have tests covering the surface that uses them, 3) my appetite for risk (patch only, minor allowed, or full major bumps). Then for any MAJOR bump pull the changelog, summarize the breaking changes that affect MY code, and propose the upgrade plan in stages with a checkpoint after each.',
          example:
            'Upgrade React from 18.2 to the latest 18.x release in this repo. Patch and minor only, no major bump yet. Show me the changelog entries that affect anything we use, run the test suite after, and list any deprecation warnings I should plan to fix later.',
        },
        mnemonic:
          'MAJOR breaks. MINOR adds. PATCH fixes. The number is a promise.',
        relatedGlossaryIds: ['badge'],
      },
      {
        id: 'feature-flags',
        title: 'Feature flags',
        summary:
          'A switch in your code that lets you turn a feature on or off without shipping new code. Useful for safe rollouts, A/B tests, and "kill switches" when something goes wrong.',
        details:
          'A feature flag (also called a feature toggle) is a runtime check that decides whether a chunk of code runs. Instead of merging and immediately exposing a half-finished feature, you wrap it in if (flags.newCheckout) { ... } and ship the code dark. You can turn it on for yourself, then for 1% of users, then 50%, then everyone, and turn it off in seconds if it breaks.\n\nThree flavors worth knowing. Release flags hide unfinished features so you can keep merging into main without waiting for the whole feature to be done. Experiment flags split users into A/B groups so you can measure which variant wins. Operational flags ("kill switches") let you turn off an expensive or buggy feature in production without rolling back a deploy.\n\nThe trap is leaving flags in the code forever. Every flag is a fork in your codebase, and old flags rot into "what does this even do?". Treat them like temporary scaffolding: write a TODO with an owner and an expiry date when you add one, and clean them up when the rollout is done.',
        comparison:
          'A feature branch is "code not yet merged". A feature flag is "code merged but not yet visible". Flags trade complexity for control.',
        vibeTip:
          'Ask your AI to wire any risky feature behind a flag from day one, with the flag default OFF, so you can ship and validate at your own pace.',
        talkToAi: {
          starter:
            'Add a feature flag for [feature]. Before writing any code, ask me: 1) the flag name and what it controls (release / experiment / kill switch), 2) where the flag value comes from (env var, LaunchDarkly, our own config), 3) the default value and rollout plan. Then implement the flag check in the smallest place possible, write a TODO with an owner and removal date, and tell me how to flip it without a redeploy.',
          example:
            'Wrap the new checkout flow behind a feature flag called "newCheckout". Default off in production, on in staging. Read the value from process.env.NEXT_PUBLIC_FLAG_NEW_CHECKOUT. Add a server-side override so we can turn it on for specific user emails for dogfooding.',
        },
        mnemonic:
          'Flags = ship code dark, turn it on later. Always plan when to remove the flag.',
        relatedGlossaryIds: ['badge', 'switch'],
      },
    ],
  },
  {
    id: 'spec-driven',
    title: 'Spec-driven development',
    summary: 'Decisions, contracts, and shared definitions that outlive a single chat thread.',
    topics: [
      {
        id: 'sdd',
        title: 'Spec-driven development (SDD)',
        summary:
          'Write the spec FIRST (what we are building, who for, how we will know it is done), then let humans and AIs build against the same agreed document.',
        details:
          'Spec-driven development (SDD) flips the usual flow. Instead of "let me try something and we will see what we get", you write a short spec first: the goal, the user, the inputs and outputs, the acceptance criteria, and the explicit non-goals. Only after the spec is reviewed do you write code (or ask an AI to). The spec lives next to the code so the next person, human or AI, can read it and understand intent.\n\nThis is the practice that makes vibe coding sustainable. Without a spec, every AI prompt starts from cold context: you re-explain the goal, the AI guesses the rest, and you debug whatever it invented. With a spec, you can hand the same document to ChatGPT, Claude, a junior engineer, or future-you and get aligned output.\n\nA good spec is one to three pages. Longer than that and nobody reads it; shorter and there is too much room to interpret. The shape that works: Context (why this exists), Goal (one sentence), Non-goals (what we are NOT doing), Users and stories, API or screen contract, Acceptance criteria, Open questions.',
        comparison:
          'Vibe coding is "tell me what you want and I will guess". SDD is "let us write down what we want, then both build to it". The second compounds; the first does not.',
        vibeTip:
          'Keep the spec in the repo (e.g. specs/feature-name.md) and reference it in every AI prompt. The AI gets the same context every time, which is the whole point.',
        talkToAi: {
          starter:
            'Help me draft a spec for [feature or product idea] using spec-driven development. Before writing the doc, ask me 4-6 focused questions: who the user is, the one outcome that proves it works, the explicit non-goals, the system constraints, and any technology I have already chosen. Then write the spec in this order: Context, Goal, Non-goals, Users and stories, API/screen contract, Acceptance criteria, Open questions. Keep it under three pages. Push back on anything in my answers that does not belong in scope.',
          example:
            'Draft a spec for a "team weekly digest email" feature. The user is a team lead. The one outcome: they read the email Monday morning and feel they know what their team did last week without opening Slack. Non-goals: editing the digest, sending it on demand. Output to specs/team-weekly-digest.md.',
        },
        mnemonic:
          'Spec first, code second. The spec is the prompt that survives the chat closing.',
        relatedGlossaryIds: ['table', 'faq'],
      },
      {
        id: 'bdd',
        title: 'BDD (Behavior-Driven Development)',
        summary:
          'Write what the system should do as plain-English scenarios in "Given / When / Then" form, then let those scenarios drive both the conversation AND the tests.',
        details:
          'Behavior-driven development (BDD) is the practice of describing features as scenarios anyone on the team can read. The format is "Given [some starting context], When [I do something], Then [I expect this outcome]". Tools like Cucumber, SpecFlow, and Playwright with Gherkin let you turn those plain-English scenarios directly into automated tests.\n\nThe magic is not the tooling, it is the conversation. A product manager, a designer, and an engineer can all sit around the same Gherkin file and argue about whether the scenario is right BEFORE anyone writes code. Disagreements that would normally surface during code review surface during planning, when they are still cheap to fix.\n\nFor vibe coders, BDD is a great prompt format. Hand the AI a few "Given / When / Then" scenarios and it will produce tighter code than if you described the feature in paragraphs. The scenarios also become your acceptance criteria for free.',
        comparison:
          'TDD: "write a failing unit test, then the code". BDD: "write a Gherkin scenario, then the test that runs it, then the code". BDD is TDD for whole features instead of single functions.',
        vibeTip:
          'When asking an AI for a feature, structure your prompt as 3-5 "Given / When / Then" scenarios. The AI will scaffold the tests AND the code from the same source of truth.',
        talkToAi: {
          starter:
            'Use BDD to specify and build [feature]. Before writing any code, ask me: 1) the user-facing behavior in plain words, 2) the happy path AND at least two sad paths, 3) any preconditions (signed in, has a subscription, etc.). Then write 3-7 "Given / When / Then" scenarios, get my sign-off, generate Playwright (or our existing framework) tests from them, run the tests red, and only then build the feature until they all pass.',
          example:
            'Use BDD to build the "invite teammate" flow. Write Gherkin-style scenarios for: invite by email succeeds, invite an already-registered user is converted to a direct add, invite to a team that has hit its seat limit shows the upgrade modal, and invite without permission returns a 403. Implement the Playwright tests, then the feature.',
        },
        mnemonic:
          'Given a context, When I act, Then I expect. Argue about the scenarios before you argue about the code.',
        relatedGlossaryIds: ['stepper', 'alert'],
      },
      {
        id: 'definition-of-done',
        title: 'Definition of Done (DoD)',
        summary:
          'A team-wide checklist that every piece of work must satisfy before we say "ship it". Stops the "but it works on my branch" arguments.',
        details:
          'A Definition of Done (DoD) is a short, agreed list of things that must be true for a task to be called complete. It is NOT the acceptance criteria for a single feature (which describe what the feature does). The DoD is the universal floor: every feature, regardless of size, satisfies it.\n\nA typical DoD looks like: code is reviewed, tests pass in CI, accessibility checked at WCAG AA, analytics events added, docs updated, feature flagged if risky, and a working preview link in the pull request. Once you have one, the conversation about "is this ready?" stops being a vibe and becomes a checklist.\n\nWith AI in the loop, the DoD becomes even more important. AIs will happily declare a task done when the code compiles; humans need to enforce the bar. Pasting your DoD into the prompt and asking the AI to walk through it before opening a PR catches the embarrassing misses (no test, no aria-label, no error state) before review.',
        comparison:
          'Acceptance criteria are per-feature ("the form rejects empty emails"). DoD is per-team ("everything we ship has tests, docs, and a11y review"). You need both.',
        vibeTip:
          'Keep your DoD as a markdown file in the repo and tell your AI to verify the change against it before opening the PR. AIs respect explicit checklists.',
        talkToAi: {
          starter:
            'Help me draft a Definition of Done for [our team or project]. Before writing it, ask me: 1) what kinds of work we ship (frontend, backend, infra, docs), 2) the existing quality bars I want to keep (tests, a11y, perf, security), 3) what currently slips through that should not. Then propose a one-page checklist grouped by category, flag any item you would add that I did not mention, and tell me how to enforce it (PR template, CI check, AI prompt).',
          example:
            'Draft a Definition of Done for our frontend team. We ship React components and Next.js routes. The bar should include: unit tests, Playwright happy-path test, axe accessibility scan, dark mode verified, mobile viewport screenshot in the PR, and an updated entry in the storybook. Output as a PR template at .github/pull_request_template.md.',
        },
        mnemonic:
          'Acceptance criteria say what the FEATURE does. DoD says what EVERY ship must satisfy.',
        relatedGlossaryIds: ['stepper', 'badge'],
      },
      {
        id: 'openapi',
        title: 'OpenAPI / API contract',
        summary:
          'A machine-readable file that describes every endpoint of your API: the URL, what you send, what you get back. Frontend and backend agree on it before anyone codes.',
        comparison:
          'OpenAPI is the menu. The implementation is the kitchen. GraphQL schemas serve a similar role for GraphQL APIs.',
        vibeTip:
          'Give your AI the OpenAPI file and it can generate clients, types, and mock servers automatically.',
        talkToAi: {
          starter:
            'Help me work from our OpenAPI file at [path]. Before doing anything, ask me: 1) what I need (a typed client, a mock server, request validation, all of the above), 2) the language and framework of the consuming code, 3) whether the spec is the source of truth or my code is. Then propose the smallest set of generated artifacts, explain each, and call out any place the spec is ambiguous and should be tightened first.',
          example:
            'Here is our openapi.yaml. Generate a typed TypeScript client for it using openapi-typescript. Then write a stub server in MSW that returns realistic fake data for every GET endpoint, so I can build the frontend before the backend is ready.',
        },
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
        talkToAi: {
          starter:
            'Draft an ADR for [decision we just made]. Before writing, ask me: 1) the one-sentence decision and the alternatives we considered, 2) the trade-offs that mattered (perf, cost, ops, ergonomics), 3) any constraints that forced our hand. Then write the ADR in three sections (Context, Decision, Consequences), keep it to one page, and end with a list of follow-ups the decision implies.',
          example:
            'Write an ADR titled "Use Postgres over MongoDB for our core data". Sections: Context, Decision, Consequences. Pull the trade-offs from this chat. Keep it under one page. Save to docs/adr/0007-postgres-over-mongodb.md.',
        },
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
        talkToAi: {
          starter:
            'Draft an RFC for [proposed change]. Before writing, ask me: 1) the change and the problem it solves, 2) who it affects and how disruptive it is, 3) the alternatives I have already considered. Then write the RFC in three sections (Motivation, Proposal, Open Questions), keep it under 800 words, and end with five concrete questions for reviewers. Push back on the proposal itself if you see a cheaper option I missed.',
          example:
            'Draft an RFC proposing we move from REST to tRPC for our internal API. Three sections: Motivation, Proposal, Open Questions. Keep it under 800 words. End with five concrete questions for reviewers.',
        },
        mnemonic:
          'An RFC is a chance to be wrong cheaply, before you write the code.',
        relatedGlossaryIds: [],
      },
    ],
  },
  {
    id: 'data',
    title: 'Backend and data',
    summary: 'How information is stored, fetched, paginated, and kept honest.',
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
        talkToAi: {
          starter:
            'Add [a query / table / collection] to our database. Before writing anything, ask me: 1) which database we use (Postgres, MySQL, Mongo, DynamoDB, etc.) and which ORM if any, 2) the shape of the data and how it relates to existing data, 3) the read patterns this needs to support. Then propose the schema or query, explain why, and call out anywhere I should reconsider a NoSQL/SQL choice for this particular shape.',
          example:
            'We use Postgres with Prisma. Add a "comments" table linked to "posts" with a foreign key. Write the Prisma schema change, the migration, and a typed function listComments(postId) that returns them sorted by createdAt.',
        },
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
        talkToAi: {
          starter:
            'Write a database migration that [change]. Before generating it, ask me: 1) the ORM/migration tool we use, 2) the current shape and the target shape, 3) how much data is in the table (small enough for a blocking migration vs needs to be backfilled in chunks). Then write a reversible migration with both up and down steps, show me the SQL it will run, and warn me if any step locks tables or has any other gotcha at our data size.',
          example:
            'Add a Prisma migration that adds a nullable "lastSeenAt" timestamp to the User model. Write the migration, update the type, and show me the SQL it will run. Make sure the down migration drops the column cleanly.',
        },
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
        talkToAi: {
          starter:
            'Write [a query function] using our ORM. Before writing anything, ask me: 1) which ORM (Prisma, Drizzle, TypeORM, ActiveRecord, etc.) and the file where related queries live, 2) the inputs and the shape of the return value, 3) whether I want it typed end-to-end and tested. Then propose the function signature, write the query, and add a quick test against a fresh test database.',
          example:
            'Using Prisma, write a function getRecentPosts(limit) that returns the most recent posts including their author\'s name and the count of comments. Type the return value. Add a Vitest test using a fresh test database.',
        },
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
        talkToAi: {
          starter:
            'Generate the CRUD endpoints for [resource]. Before writing anything, ask me: 1) the framework (Next.js route handlers, Express, FastAPI, etc.), 2) the fields the resource has and which are required, 3) any access rules (who can read, who can write, who can delete). Then scaffold all four endpoints with consistent naming, validate input with [Zod / pydantic / equivalent], return helpful 4xx errors, and add a smoke test for each.',
          example:
            'Generate the CRUD API for a "Note" resource in Next.js route handlers. Endpoints: POST /api/notes, GET /api/notes, GET /api/notes/[id], PATCH /api/notes/[id], DELETE /api/notes/[id]. Validate input with Zod and return 400s with helpful messages. Only the note owner can update or delete.',
        },
        mnemonic:
          'Most apps are CRUD with a coat of paint.',
        relatedGlossaryIds: ['table', 'modal'],
      },
      {
        id: 'pagination',
        title: 'Pagination (offset vs cursor)',
        summary:
          'Splitting a long list of results into pages so the client and server do not choke. Two flavors: page numbers (offset) and "next cursor" tokens.',
        details:
          'When a list is short you return the whole thing. When it is not, you paginate. The two common patterns are offset and cursor. Offset pagination uses page numbers or "skip 40, take 20". It is easy to build and easy for users to understand ("you are on page 3 of 12"). It breaks down at scale because the database has to count and skip rows you never look at, and because items shift between pages when new ones arrive.\n\nCursor pagination passes back an opaque token ("show me the next 20 starting AFTER this id or timestamp"). Each page is stable even when new items appear, and the database does an indexed lookup instead of a count. The trade-off: you cannot jump to "page 7", only Next and Previous.\n\nWhich to pick? For an admin table users want to skim, offset is friendlier. For an infinite-scroll feed or any list that gets new items often, cursor is the right answer. Whichever you choose, decide once and write it into your API contract so every list endpoint behaves the same way.',
        comparison:
          'Offset = page numbers, easy to jump around, gets slow and weird at scale. Cursor = next/previous tokens, stable and fast, but no jumping to page 7.',
        vibeTip:
          'When you ask your AI to "build a list endpoint", say which pagination style and what the page size is. Otherwise it will pick offset and you will silently inherit the slow query.',
        talkToAi: {
          starter:
            'Add pagination to [list endpoint]. Before writing code, ask me: 1) the expected size of the list (hundreds, millions), 2) whether users need to jump to a specific page or just go forward, 3) whether new items get added often enough to shift pages around. Then recommend offset or cursor with reasoning, propose the API shape (query params and response shape), and update the matching frontend hook to consume it.',
          example:
            'Switch /api/posts from returning all posts to a cursor-paginated endpoint. Page size 20. Accept ?cursor= and return { items, nextCursor }. The frontend uses React Query so update useInfinitePosts to follow the new shape and load on scroll.',
        },
        mnemonic:
          'Offset for skim-and-jump. Cursor for feeds. Pick once and be consistent.',
        relatedGlossaryIds: ['table', 'list', 'infinitescroll'],
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
        talkToAi: {
          starter:
            'Add caching to [endpoint or query]. Before writing anything, ask me: 1) what is slow today and how slow, 2) where the cache should live (browser, CDN, server memory, Redis), 3) how stale the data is allowed to be and what action should bust it. Then propose the smallest cache that solves the problem, write the invalidation logic at the same time, and warn me about any tricky failure mode (stampede, stale-while-revalidate, multi-region).',
          example:
            'Cache the GET /api/products response on the server for 60 seconds using Next.js fetch revalidation. When a product is updated via PATCH, call revalidateTag("products") to bust the cache.',
        },
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
        talkToAi: {
          starter:
            'Set up authentication for [app]. Before writing any code, ask me: 1) the framework and any auth library I am already using, 2) whether I want server-side sessions or JWTs (and why), 3) which providers I need (email + password, Google, GitHub, magic link, etc.) and how long sessions should last. Then propose the smallest setup that fits, explain the trade-off you would push back on, and only generate code after I confirm.',
          example:
            'Set up authentication with NextAuth using session cookies (not JWT). Use the database session strategy with Prisma. Email + Google sign-in. Sessions last 30 days and refresh on activity.',
        },
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
        talkToAi: {
          starter:
            'Add "Sign in with [provider]" to [app]. Before writing code, ask me: 1) the auth library we already use (or a recommendation if none), 2) the redirect URL and where the env vars live, 3) what should happen on first sign-in (create a user record, send a welcome email, redirect to onboarding). Then walk me through the provider-side setup (the dashboard steps), wire up the code, and list the env vars I need to set.',
          example:
            'Add "Sign in with GitHub" using Auth.js. Read the GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET from .env. After sign-in, redirect to /dashboard. Show me the env vars I need to create on the GitHub developer settings page.',
        },
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
        talkToAi: {
          starter:
            'Add SSO support to [app] for our enterprise customers. Before writing code, ask me: 1) which protocols we need to support (SAML, OIDC, both), 2) whether each tenant brings their own identity provider (Okta, Azure AD, Google Workspace) or we pick one, 3) the auth library we already use. Then propose the smallest path (often a managed provider like BoxyHQ or WorkOS), explain the per-tenant config flow, and write the docs we will hand to customers.',
          example:
            'Add SAML SSO support using Auth.js for our enterprise tier. Use the BoxyHQ SAML provider. Each tenant configures their own identity provider in /admin/sso. Document the metadata URL we need to give them.',
        },
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
        talkToAi: {
          starter:
            'Add refresh-token rotation to [app]. Before writing code, ask me: 1) where access tokens live today (memory, localStorage, cookie), 2) where refresh tokens should live (HTTP-only cookie strongly recommended), 3) the access-token lifetime and refresh-token lifetime I want. Then implement a fetch interceptor that handles 401s by refreshing once and retrying, write the rotation logic on the server, and call out any place tokens currently leak into client storage.',
          example:
            'When our API access token expires (HTTP 401), use the refresh token stored in an HTTP-only cookie to get a new access token, then retry the original request once. Wrap this in a fetch interceptor so callers do not have to think about it.',
        },
        mnemonic:
          'Short tokens for daily use, one safe long token to renew them.',
        relatedGlossaryIds: [],
      },
      {
        id: 'rbac',
        title: 'RBAC (Role-Based Access Control)',
        summary:
          'Authorization model where users get roles ("admin", "editor", "viewer") and the role decides what they can do. Simple, common, and easy to audit.',
        details:
          'Authentication answers "who are you?". Authorization answers "what are you allowed to do?". Role-based access control (RBAC) is the most common authorization model: assign each user one or more roles, and let the role grant permissions to actions or resources.\n\nThe alternative, attribute-based access control (ABAC), uses arbitrary attributes ("can edit if region == user.region AND status == draft"). ABAC is more flexible but harder to reason about. Most apps want plain RBAC and only graduate to ABAC when they have a real reason.\n\nThe trap is checking roles in the UI only. Hiding the Delete button for non-admins is good UX, but if the API endpoint does not also check the role, a curious user can delete with a curl call. The rule: every protected action checks the role at the API/server layer first, then the UI hides what it should hide. Tools like CASL, Cerbos, or Oso make this easier than rolling your own check everywhere.',
        comparison:
          'Authentication = who you are. Authorization = what you can do. RBAC assigns permissions via named roles; ABAC uses arbitrary attributes.',
        vibeTip:
          'When you ask your AI for a feature, say "enforce the [role] check at the API and hide it in the UI". Otherwise it will skip one of the two and you will not notice until later.',
        talkToAi: {
          starter:
            'Add role-based access control to [feature or app]. Before writing code, ask me: 1) the roles we have or want (admin, editor, viewer, etc.) and what each can do, 2) where roles live today (in the user table, in a join table, in the JWT, in a service like Cerbos), 3) which actions and routes need protecting. Then propose the smallest enforcement layer that runs at the API first AND hides UI for unauthorized users, generate a roles.ts (or equivalent) source of truth, and write tests that try each protected action with each role.',
          example:
            'Add RBAC to our admin dashboard. Roles: superadmin, admin, support, viewer. Only superadmin can delete users; admin and superadmin can edit; everyone can read. Enforce the check in the Next.js route handler with a middleware, hide the buttons in the UI based on the same source of truth, and write Playwright tests that try each action as each role.',
        },
        mnemonic:
          'Roles in the database. Checks at the API. UI hides what the API would refuse.',
        relatedGlossaryIds: ['table', 'modal', 'badge'],
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
