import { WEB_FOUNDATIONS_CLUSTER } from './webFoundations.js';
import { DESIGN_LANGUAGE_CLUSTER } from './designLanguage.js';
import { AI_LITERACY_CLUSTER } from './aiLiteracy.js';

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

/**
 * Default Build literacy accent (indigo). Used as the section identity
 * (top-level "Build literacy" pill) and as a fallback when no specific
 * cluster is active.
 */
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

/**
 * Per-cluster color palettes. Mirrors CATEGORY_COLORS in src/data/categories.jsx
 * so the active cluster's accents flow through the whole UI (cluster pill,
 * dropdown highlights, dots, definition vibe-tip backgrounds, talk-to-AI tab,
 * background glow) just like UI Glossary categories.
 */
export const BUILD_CLUSTER_COLORS = {
  'web-foundations': {
    text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30',
    active: 'bg-indigo-600 text-white', hover: 'hover:bg-indigo-500/10',
    dot: 'bg-indigo-500', accent: 'text-indigo-500',
    gradient: 'from-indigo-600 to-violet-700',
  },
  'design-language': {
    text: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30',
    active: 'bg-fuchsia-600 text-white', hover: 'hover:bg-fuchsia-500/10',
    dot: 'bg-fuchsia-500', accent: 'text-fuchsia-500',
    gradient: 'from-fuchsia-500 to-pink-600',
  },
  product: {
    text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30',
    active: 'bg-amber-600 text-white', hover: 'hover:bg-amber-500/10',
    dot: 'bg-amber-500', accent: 'text-amber-500',
    gradient: 'from-amber-500 to-orange-600',
  },
  engineering: {
    text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30',
    active: 'bg-emerald-600 text-white', hover: 'hover:bg-emerald-500/10',
    dot: 'bg-emerald-500', accent: 'text-emerald-500',
    gradient: 'from-emerald-500 to-teal-600',
  },
  'spec-driven': {
    text: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30',
    active: 'bg-sky-600 text-white', hover: 'hover:bg-sky-500/10',
    dot: 'bg-sky-500', accent: 'text-sky-500',
    gradient: 'from-sky-500 to-cyan-600',
  },
  data: {
    text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30',
    active: 'bg-blue-600 text-white', hover: 'hover:bg-blue-500/10',
    dot: 'bg-blue-500', accent: 'text-blue-500',
    gradient: 'from-blue-500 to-indigo-600',
  },
  auth: {
    text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30',
    active: 'bg-rose-600 text-white', hover: 'hover:bg-rose-500/10',
    dot: 'bg-rose-500', accent: 'text-rose-500',
    gradient: 'from-rose-500 to-pink-600',
  },
  'ai-literacy': {
    text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30',
    active: 'bg-purple-600 text-white', hover: 'hover:bg-purple-500/10',
    dot: 'bg-purple-500', accent: 'text-purple-500',
    gradient: 'from-purple-600 to-violet-700',
  },
};

export function getBuildClusterColors(clusterId) {
  return BUILD_CLUSTER_COLORS[clusterId] || BUILD_LITERACY_NAV_COLORS;
}

export const BUILD_LITERACY_INTRO = {
  title: 'Build literacy',
  lead:
    'The UI glossary names what you see on screen. This section names ideas from the rest of the build (planning, tests, specs, data, auth) so you can read tickets, AI output, and your own code with confidence, and tell your AI exactly what you want.',
};

export const BUILD_LITERACY_CLUSTERS = [
  WEB_FOUNDATIONS_CLUSTER,
  DESIGN_LANGUAGE_CLUSTER,
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
        details:
          'Marc Andreessen famously said \'product-market fit is when the dogs eat the dog food\'. An MVP is what you put in front of the dogs to find out. The whole point is to test the riskiest assumption (usually \'will anyone use this?\') with the smallest possible build.\n\nThe trap most people fall into is shipping a \'minimum lovable product\' instead. Adding the third feature, the auth flow, the onboarding wizard, the analytics... and now you have spent two months on something that does not answer the original question any better than a clickable Figma would have.\n\nThe vibe coder advantage: AI lets you ship a real (rough) MVP in days. Use that. The thing should look unfinished on purpose so people give you the harsh feedback you actually need, not the polite kind.',
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
        details:
          'A Product Requirements Document is a few pages that capture the answers to "what are we building, who is it for, why, and how will we know it worked". The good ones fit on one or two pages. The bad ones are 30-page Word docs nobody reads.\n\nThe sections that earn their keep: Problem (one paragraph, the user pain we are solving), Audience (who specifically, with a real example user in mind), Success metric (the single number that tells us this worked), Scope (the 3-5 things we are committing to build), Non-goals (the tempting things we are explicitly NOT building this round), Open questions (so they get answered, not skipped).\n\nFor a vibe coder: paste a PRD into your AI before asking for code. It picks better defaults, asks better clarifying questions, and stops inventing features that have nothing to do with the goal.',
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
        details:
          'A user story is one slice of a feature told from the user\'s perspective. The format is so common it is almost a cliche: \'As a [type of user], I want [thing], so that [benefit]\'. The format is not magic. The format forces you to name three things people skip: who, what, and why.\n\nWhy bother with the format? Because \'add a delete button\' tells the AI nothing. \'As a moderator, I want to delete spam comments, so that the discussion stays useful\' tells it the role (moderator, so probably a permissions check), the action (delete comments), and the goal (spam, so maybe undo and bulk-select are relevant too).\n\nA good story is small enough to ship in a few days, has acceptance criteria stapled to it, and reads like something a real user would actually say. If yours sounds like \'as a user I want a button so that I have a button\', try harder.',
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
        details:
          'Acceptance criteria are the checklist that decides \'is this story actually done?\'. The most common format is the BDD Given/When/Then style: \'Given the user is signed in, When they click Delete on a comment they own, Then the comment is removed and they see a toast confirming it.\' Each criterion is one observable behavior.\n\nThe trap is vague criteria. \'Should work well\' is not a criterion. \'Page loads in under 2 seconds on a 3G connection\' is. The whole point is to remove the \'I thought you meant...\' arguments before the code is written, not after.\n\nFor vibe coders, acceptance criteria are gold for prompts. Hand the AI 4-6 of them as Given/When/Then statements and you get a feature that knows what done looks like. Better still, those same statements become Playwright or Vitest tests with almost no rewriting.',
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
        details:
          'A product roadmap is a public commitment about direction, not a calendar of dates. Most modern roadmaps use a \'Now / Next / Later\' structure: Now is what is in flight this quarter, Next is what we plan to start once Now ships, Later is the rough direction beyond that.\n\nThe death of a roadmap is when it becomes a Gantt chart with hard dates. Reality changes, dates slip, customers feel betrayed by a date you committed to in March. Direction changes too, but with much less drama, because you never said \'June 14th\'.\n\nFor a vibe coder, the useful version of a roadmap is one sentence per row: the user problem you are solving, the rough size, and what success looks like. Anything more elaborate just becomes a thing to maintain instead of a thing that helps you decide what to build next.',
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
      {
        id: 'jtbd',
        title: 'Jobs-to-be-Done (JTBD)',
        summary:
          'A way to think about features by the "job" the user is hiring your product to do, instead of by demographics or personas.',
        details:
          'Clayton Christensen popularized the framing: people do not buy products, they "hire" them to do a job. The classic example is the milkshake. McDonald\'s found that morning milkshake buyers were not "young moms" or "office workers", they were anyone who needed a one-handed breakfast that lasted the commute. The job was "keep me occupied and fed during my drive". Once you see the job, you can compete with bagels, bananas, and podcasts, not just other milkshakes.\n\nJTBD beats personas when you want feature ideas. Personas describe people; jobs describe situations. Two very different people can hire your product for the same job, and the same person hires different products for different jobs.\n\nThe canonical job statement is: "When [situation], I want to [motivation], so I can [expected outcome]." Write three of those for your product, and your roadmap practically writes itself.',
        comparison:
          'Personas describe who. JTBD describes the situation and the outcome they want. JTBD ages better than demographics.',
        vibeTip:
          'Hand your AI a JTBD statement before asking for features. "When [situation], I want to [job]" gives it the constraint personas miss.',
        talkToAi: {
          starter:
            'Help me write Jobs-to-be-Done statements for [product]. Before suggesting jobs, ask me: 1) the moments users actually open the product, 2) what they are trying to accomplish (the outcome, not the action), 3) what they currently use instead (your real competition). Then propose 3-5 jobs in the canonical "When X, I want to Y, so I can Z" format, and pick the one or two that should drive next quarter\'s roadmap.',
          example:
            'Help me write JTBD statements for a personal finance app. Users open it after big purchases and on payday. They want to feel in control without staring at spreadsheets. Today they use Notion or nothing. Suggest 3 jobs and which one should drive Q1 features.',
        },
        mnemonic:
          'People hire products to do jobs. Find the job, the features get obvious.',
        relatedGlossaryIds: ['hero', 'card'],
      },
      {
        id: 'okrs',
        title: 'OKRs (Objectives and Key Results)',
        summary:
          'A goal-setting format used by most tech companies. One Objective (qualitative, inspiring) plus 2-4 Key Results (numeric, time-boxed, hard to fake).',
        details:
          'OKRs come from Andy Grove at Intel and were popularized by John Doerr at Google. The format is deceptively simple. The Objective is the destination ("Become the obvious choice for indie developers"). Key Results are the numeric proof you got there ("Reach 5,000 weekly active devs", "Hit 30 NPS", "Land 10 case studies").\n\nThe rules that make OKRs work, that everyone forgets: Key Results measure outcomes, not work shipped (so "ship the new dashboard" is not a KR, "increase dashboard DAU to 60% of WAU" is). KRs are ambitious enough that hitting all of them feels surprising. They are time-boxed (usually a quarter). And there are not too many; three per Objective forces priority.\n\nOKRs replace the "let\'s build a lot of stuff and see what sticks" trap. If a feature does not move a Key Result, it should not be on this quarter\'s plan.',
        comparison:
          'KPIs measure ongoing health. OKRs are time-boxed, ambitious bets you make this quarter.',
        vibeTip:
          'Tell your AI your OKRs in the system prompt for prioritization questions. It will rank features by likely KR impact instead of by what sounds cool.',
        talkToAi: {
          starter:
            'Help me write OKRs for [team or quarter]. Before proposing any, ask me: 1) the one or two strategic priorities for the quarter, 2) what we currently measure (so KRs are realistic), 3) the size of the team and how ambitious we want to be (commit OKRs vs aspirational). Then propose 1-2 Objectives, each with 3 Key Results that are numeric, outcome-focused (not work-focused), and time-boxed. Push back on any KR I suggested that just describes work shipped.',
          example:
            'Write Q1 OKRs for our 4-person growth team. Strategic priority: paid conversion. We currently measure signups (1,200/mo) and trial-to-paid (8%). Aspirational level: 1.4x or better. Two Objectives max.',
        },
        mnemonic:
          'Objective inspires. Key Results prove. KRs are numbers, not to-dos.',
        relatedGlossaryIds: ['statcard', 'linechart'],
      },
      {
        id: 'personas',
        title: 'User personas',
        summary:
          'A short profile of a representative user (goals, frustrations, context) so the team can debate "what would Maya the freelance designer want?" instead of arguing in the abstract.',
        details:
          'A persona is a fictional but research-grounded user profile. The good ones have a name, a photo, a job, a goal, three frustrations, and a quote. The point is not the photo. It is having a shorthand the whole team uses: "would Maya understand this?" beats "would the user understand this?" because Maya has a face.\n\nGood personas come from talking to real users (5-10 interviews per persona). Bad personas come from a brainstorm in a conference room and read like horoscopes. If your persona could describe anyone, it is not useful.\n\nMost products need 1-3 personas, not 12. Ranking them matters as much as creating them: which persona is "primary" (every decision optimizes for them), which is "secondary" (we will not break the experience for them but we will not optimize), which is "anti" (we explicitly do NOT serve them).',
        comparison:
          'Persona = who. JTBD = the situation and outcome. ICP (Ideal Customer Profile) = who you sell to (B2B). Use the right one for the question.',
        vibeTip:
          'Paste a persona into your AI prompt before asking it to draft copy or pick a feature. It writes for "Maya" instead of "the user".',
        talkToAi: {
          starter:
            'Help me draft user personas for [product]. Before writing them, ask me: 1) how much real research we have done (interviews, support tickets, analytics), 2) the 1-3 user types we think we are serving, 3) which one is primary. Then propose a persona for each (name, role, goal, top 3 frustrations, a real-sounding quote), label primary/secondary/anti, and call out any persona that is too vague to be useful.',
          example:
            'Draft personas for a tool that helps freelance designers send invoices. We have done 6 interviews. Two user types: solo freelancer ("Maya") and small agency owner ("Dev"). Maya is primary. Show me both with the full template.',
        },
        mnemonic:
          'A persona has a face, a goal, and three frustrations. Anything fuzzier is a horoscope.',
        relatedGlossaryIds: ['card', 'avatar'],
      },
      {
        id: 'sprint',
        title: 'Sprint and iteration',
        summary:
          'A sprint is a fixed-length window (usually 1 or 2 weeks) where the team commits to a small set of work, ships it, and reviews. Iteration is the same idea, lighter on ceremony.',
        details:
          'A sprint is the unit of work in Scrum: pick a small batch of items, agree on what "done" means, ship at the end, review what happened, plan the next one. Most teams run 1- or 2-week sprints. Anything longer and the world changes mid-sprint; anything shorter and you spend more time planning than building.\n\n"Iteration" is the same loop without the Scrum ritual (no planning poker, no sprint review theater). Lots of teams use the words interchangeably, which is fine, but be aware which kind of org you are in.\n\nThe valuable parts of a sprint are usually the smallest: a stand-up to surface blockers, a demo at the end so the team sees what shipped, and a short retro to fix the worst thing about how the team works. The valueless parts are the ones a vibe coder would happily skip: 90-minute estimation meetings.',
        comparison:
          'Sprint = Scrum-flavored iteration with ceremonies. Iteration = the same loop, less ritual. Both are about shipping in small batches.',
        vibeTip:
          'When planning with your AI, frame the request as a sprint goal: "the next 2 weeks should produce X". You get tighter scope than open-ended "build this app".',
        talkToAi: {
          starter:
            'Help me plan the next sprint for [project]. Before suggesting work, ask me: 1) the sprint length (1 or 2 weeks), 2) the 1-2 outcomes that would make this sprint a win, 3) the team size and known constraints (vacation, on-call, etc.). Then propose a slate of items sized to the time, group them by outcome, mark stretch goals separately, and push back on anything I asked for that does not fit.',
          example:
            'Plan a 1-week sprint for me (solo). Goal: ship the new pricing page and connect it to Stripe Checkout in test mode. Other constraint: I will be out Friday. Suggest the smallest scope that hits the goal.',
        },
        mnemonic:
          'A sprint is a small batch with a deadline and a demo. Skip the ceremony, keep the demo.',
        relatedGlossaryIds: ['timeline', 'kanban'],
      },
      {
        id: 'prioritization',
        title: 'Prioritization frameworks (MoSCoW, RICE, Eisenhower)',
        summary:
          'Three popular ways to rank work. MoSCoW splits into Must, Should, Could, Won\'t. RICE scores Reach × Impact × Confidence ÷ Effort. Eisenhower is Urgent vs Important.',
        details:
          'Every prioritization framework is the same trick: force you to compare items on the same scale so you stop saying "everything is important". The three you will hear most:\n\nMoSCoW (Must/Should/Could/Won\'t this release) is the lightest. Great for narrowing scope on a single release. Weakness: nothing in the framework forces hard trade-offs, so "Must" creep happens.\n\nRICE (Reach × Impact × Confidence ÷ Effort) gives every item a numeric score. Great for comparing across teams. Weakness: the numbers are guesses dressed up as math, and "Confidence" is the knob people use to win the argument.\n\nEisenhower (Urgent vs Important, 2×2 grid) is for personal task triage, not roadmaps. Great for "what should I do this morning?". Weakness: most product work is "important not urgent" and falls into one quadrant.\n\nThe right answer is usually "pick one, use it consistently for a quarter, change later if it stops helping".',
        comparison:
          'MoSCoW = quick scope cut. RICE = score-based ranking. Eisenhower = personal triage. Pick one and stop arguing about the framework.',
        vibeTip:
          'When asking your AI to plan, name the framework: "rank these items by RICE" beats "rank these by importance" because the AI shows its math.',
        talkToAi: {
          starter:
            'Help me prioritize [list of items]. Before scoring, ask me: 1) the framework I want (MoSCoW, RICE, Eisenhower, or your recommendation), 2) the time horizon (this sprint, this quarter, this year), 3) any items that are non-negotiable for non-product reasons (legal, contractual). Then apply the framework with explicit assumptions (especially Confidence and Effort), show your math, and call out items where the score is suspiciously easy to game.',
          example:
            'Rank these 8 features for next quarter using RICE: [list]. Reach is monthly active users likely to use it (we have 3,000 MAU). Impact 1-3. Confidence as percent. Effort in person-weeks. Show the table.',
        },
        mnemonic:
          'Pick a framework. Use it consistently. The framework matters less than committing to one.',
        relatedGlossaryIds: ['table', 'kanban'],
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
        details:
          'Test-Driven Development is a small, weird-feeling habit: write the test before the code. Red (the test fails because the function does not exist), Green (you write the smallest code that makes the test pass), Refactor (you clean up now that there is a safety net). Repeat.\n\nThe value is not the tests themselves, though those are nice. The value is that writing the test first forces you to design the API from the caller\'s side. You end up with simpler, more focused functions because you saw how it felt to use them before you wrote them.\n\nVibe coding angle: AI is great at the green step (make this test pass) and decent at the red step if you describe the behavior. Try this: \'add a function add(a,b) that handles strings and returns a number, and write the failing tests first\'. The AI usually produces cleaner code than if you skip the test step entirely.',
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
        details:
          'A unit test exercises one small piece in isolation: one function, one component, one class, with all its dependencies stubbed or mocked. They are fast (milliseconds) and pinpoint exactly where something broke. Most projects have hundreds or thousands of these.\n\nAn integration test exercises several real pieces talking to each other: a route handler hitting a real database, a React component fetching from a real API in a test container. They are slower (seconds), more realistic, and catch the bugs that unit tests miss because they cross boundaries.\n\nThe rule of thumb (the testing pyramid): lots of unit tests, fewer integration tests, even fewer end-to-end tests. The newer \'testing trophy\' from Kent C. Dodds inverts this for frontend code: more integration than unit, because rendering a component with its real children catches more real bugs than unit-testing every prop combination.',
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
        details:
          'Continuous Integration is the habit of merging small changes back to the main branch frequently (often multiple times a day) and running the full test suite automatically on every push. The pipeline catches breakage within minutes instead of weeks.\n\nA modern CI setup runs on every pull request: install dependencies, run lints, run tests, build the app, sometimes deploy a preview environment. If anything fails, the PR cannot merge. This sounds rigid; in practice it removes the \'who broke main?\' meeting from your life.\n\nGitHub Actions, GitLab CI, CircleCI, and Vercel\'s built-in CI are the common platforms. For vibe coders: even a 30-line GitHub Actions workflow that runs \'npm test\' on every PR is enough to start. Add coverage, type-check, and Playwright later as the project grows.',
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
        details:
          'Production is the real environment your real users hit. Staging is a near-identical clone with separate data, used for final testing before a release. Most teams have at least three: development (your laptop), staging (a shared test environment), and production.\n\nThe key word is \'near-identical\'. Staging is useful only if it actually mirrors production: same server config, same database engine and version, same env vars (with test values for secrets). When staging drifts from prod, you start shipping bugs that \'worked in staging\'.\n\nThe modern shortcut: preview environments per pull request. Vercel, Netlify, Render, and Fly all spin one up automatically. Reviewers click a link and try the change live, with its own database branch, instead of pulling the branch and running it locally.',
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
      {
        id: 'code-review',
        title: 'Code review',
        summary:
          'A teammate (or now an AI) reads your change before it merges and either approves it or asks for changes. The point is shared understanding, not just bug catching.',
        details:
          'Code review is the moment a change leaves your head and enters the team\'s. The reviewer\'s job is three things, in order. First, "do I understand what this change is doing and why?". Second, "is anything obviously broken or unsafe?". Third, "is there a meaningfully better way?". Note that style, naming, and personal preferences come last; if they were that important, the linter would catch them.\n\nGood reviews are small (under 400 lines, ideally under 200), focused on one thing, and accompanied by a description that says what changed and how to test it. Big reviews get rubber-stamped, every time.\n\nAI is great at the second job (catching obvious issues), so-so at the first (it lacks the context the human reviewer has from yesterday\'s standup), and bad at the third (it does not know your team\'s actual style or constraints). Use AI review as a first pass, not a replacement for a human.',
        comparison:
          'Linter catches style. AI review catches obvious bugs. Human review catches "this is the wrong solution to the right problem".',
        vibeTip:
          'Before opening a PR, ask your AI to review the diff for clarity and safety, then fix what it finds. The human reviewer thanks you.',
        talkToAi: {
          starter:
            'Review this diff before I open the PR. Before reviewing, ask me: 1) the goal of the change in one sentence, 2) the parts I am least sure about, 3) anything I deliberately left out of scope. Then walk through the diff and call out (a) bugs and unsafe patterns, (b) places where intent is unclear, (c) test gaps, (d) anything that feels overengineered for the goal. Save style nits for last and label them "nit:" so I can ignore them.',
          example:
            'Review the diff in the current branch. Goal: switch the products list from offset to cursor pagination. I am least sure about the empty state handling. Deliberately not changing the UI yet, just the data layer. Look at lib/products.ts and the matching test file.',
        },
        mnemonic:
          'Review for understanding first, bugs second, style last. Small diffs get real reviews.',
        relatedGlossaryIds: ['table'],
      },
      {
        id: 'pull-request',
        title: 'Pull request (PR) / merge request',
        summary:
          'A proposal to merge a branch into another branch (usually main). The PR is the unit of review: title, description, diff, comments, approvals, CI results, all in one place.',
        details:
          'A pull request (GitHub\'s name) or merge request (GitLab\'s name) is the same thing: a packaged proposal that says "I made these changes on this branch, please review and merge them". The PR holds the diff, a description, the back-and-forth conversation, the CI results, and the approval state.\n\nA good PR has a tight title that reads as a sentence in the changelog ("Switch products list to cursor pagination"), a description that explains what changed, why, and how to test it, and a small enough diff that a reviewer can read it in 15 minutes. Anything bigger gets stacked into a series of smaller PRs.\n\nThe magic of a PR is that it is also documentation. Six months from now, "git blame" leads to the PR, and the PR explains why. Bad PRs leave the next person digging.',
        comparison:
          'A branch is "where you work". A PR is "what you propose". A merge is "what actually changes main".',
        vibeTip:
          'Have your AI write the PR description from the diff and your one-line intent. It picks up details you would skip.',
        talkToAi: {
          starter:
            'Write the PR description for the current branch. Before writing, ask me: 1) the one-sentence intent, 2) anything that is NOT in this PR but seems related, 3) any non-obvious testing notes. Then produce a description with sections: Summary, Why, How to test, Out of scope, and Screenshots if relevant. Match the tone of the last 3 PRs in the repo if you can see them.',
          example:
            'Write the PR description for the current branch. Intent: switch the products list from offset to cursor pagination. Out of scope: UI changes, those come in a follow-up. Test by hitting /api/products?cursor=... and confirming the response shape matches.',
        },
        mnemonic:
          'A PR is the unit of review and the unit of history. Write it for your future self.',
        relatedGlossaryIds: ['kanban'],
      },
      {
        id: 'branching',
        title: 'Branching strategy: trunk vs Git Flow',
        summary:
          'How a team uses branches. Trunk-based: short-lived branches off main, merged in a day. Git Flow: long-lived develop, release, feature branches. Trunk wins for most teams.',
        details:
          'Branching strategies are agreements about where work lives and how it gets to production. The two famous ones could not be more different.\n\nTrunk-based development has one long-lived branch (main, sometimes called trunk). All work happens in short-lived branches that merge back to main within a day or two, behind feature flags if needed. Production deploys from main. Pros: minimal merge pain, fast feedback, code is always near-production. Cons: requires CI you trust and feature flags for unfinished work.\n\nGit Flow is the older Vincent Driessen model: a long-lived develop branch, release branches for stabilizing, feature branches that can live for weeks, hotfix branches off main. Pros: clear separation of in-progress vs released. Cons: massive merge pain, slow feedback, code drifts from production for weeks.\n\nFor most modern teams, trunk-based is the right answer. Git Flow makes sense for teams shipping versioned software (libraries, native apps with App Store reviews) where "release" is a real event.',
        comparison:
          'Trunk = one main branch, fast merges, feature flags. Git Flow = many long branches, slow merges, painful releases.',
        vibeTip:
          'Tell your AI which model your repo uses. "We are trunk-based with feature flags" stops it from suggesting a develop branch.',
        talkToAi: {
          starter:
            'Help me set up a branching strategy for [repo or team]. Before recommending one, ask me: 1) how often we deploy (per merge, daily, weekly, per release), 2) the team size and how many in-flight changes there usually are, 3) whether we have a CI pipeline we trust and feature flags. Then recommend trunk-based or Git Flow with reasoning, write a CONTRIBUTING.md section that explains the workflow, and call out the one habit that will make or break it.',
          example:
            'Recommend a branching strategy for our 3-person team. We deploy on every merge to main with a CI pipeline. No feature flags yet. Each person has 1-2 changes in flight. Write the CONTRIBUTING.md and the one habit we need to build.',
        },
        mnemonic:
          'Trunk-based: short branches, fast merges. Git Flow: long branches, painful merges.',
        relatedGlossaryIds: ['kanban'],
      },
      {
        id: 'commit-messages',
        title: 'Commit messages and Conventional Commits',
        summary:
          'A commit message is the one-line note attached to every change. Conventional Commits is a tiny standard (feat:, fix:, docs:, refactor:, etc.) that machines and humans can both read.',
        details:
          'A commit message is the explanation that travels with a change forever. Six months from now, "git blame" will land on a line, and the commit message is the only context the next person (often you) gets. "fix stuff" tells you nothing. "fix(checkout): handle expired card response from Stripe" tells you everything.\n\nConventional Commits is a small spec that puts a type and an optional scope at the front of every message: feat, fix, docs, style, refactor, perf, test, chore, build, ci, revert. The scope in parentheses names the area touched. A bang after the type (feat!:) signals a breaking change. The body explains the "why" if it is not obvious from the title.\n\nThe payoff is automation. Tools like changesets, semantic-release, and release-please read Conventional Commits to generate changelogs and decide the next semver bump (feat = minor, fix = patch, ! = major). Even without automation, a clean history is searchable: "show me every fix in checkout this quarter" becomes one git log command.\n\nA good rule of thumb: if you cannot summarize the change in one Conventional Commits line, the commit is doing too many things. Split it.',
        comparison:
          'Plain message = a note. Conventional Commits = a note that tools can also read. Same effort, way more leverage.',
        vibeTip:
          'Tell your AI "use Conventional Commits, scope by directory, body only when the why is non-obvious". You get clean history without thinking about it.',
        talkToAi: {
          starter:
            'Write commit messages for the staged changes in [repo]. Before writing, ask me: 1) whether we follow Conventional Commits (yes is the default), 2) the scope conventions used in the repo (look at recent history if unsure), 3) whether to split the staged diff into multiple commits if it covers multiple intents. Then propose either one Conventional Commits line per logical change or a multi-commit plan with messages, and explain any breaking changes you flagged with !.',
          example:
            'Write commit messages for the currently staged changes. We use Conventional Commits with directory-based scopes (feat(api), fix(web), refactor(lib)). Split into multiple commits if the staged diff mixes a bug fix with a new feature. Body only when the why is non-obvious.',
        },
        mnemonic:
          'feat: new thing. fix: broken thing. refactor: same behavior, cleaner code. !: breaking change. Future-you will thank present-you.',
        relatedGlossaryIds: ['list'],
      },
      {
        id: 'merge-vs-rebase',
        title: 'Merge vs rebase (and squash)',
        summary:
          'Two ways to fold a branch back into another. Merge keeps the full history with a merge commit. Rebase replays your commits on top of the latest main as if they happened today. Squash collapses a branch into one commit.',
        details:
          'When your feature branch is ready, you have to combine it with main. The three flavors look different in the history.\n\nMerge creates a merge commit that joins both lines of history. Pros: it preserves what actually happened, including parallel work. Cons: the history grows a forest of merge commits that can be hard to read on a busy repo.\n\nRebase rewrites your branch so its commits appear on top of the current main, as if you had started your work today. Pros: a clean, linear history. Cons: it rewrites commit hashes, so anyone else who pulled your branch is now in conflict-land. Rule of thumb: only rebase branches that nobody else has based work on.\n\nSquash merge takes every commit on the branch and collapses them into one new commit on main. Pros: every PR is one tidy commit, the changelog reads beautifully, and "git revert" undoes the whole feature in one shot. Cons: you lose the per-step granularity. Most modern teams default to squash for PRs and use rebase locally to keep their branch up to date.\n\nThe vibe coder default in 2026: squash on merge to main; rebase your local branch onto main to resolve conflicts before requesting review; never rebase a branch other people have pulled.',
        comparison:
          'Merge = keep both histories joined. Rebase = pretend you started today, linear history. Squash = collapse the whole PR into one commit on main.',
        vibeTip:
          'When the AI proposes a "merge main into my branch" right before your PR, ask for "rebase onto main" instead. Cleaner conflict, cleaner diff for the reviewer.',
        talkToAi: {
          starter:
            'Help me handle [branch] vs main. Before recommending merge, rebase, or squash, ask me: 1) whether anyone else has based work on this branch, 2) the team\'s policy for merging into main (merge commit, rebase merge, squash merge), 3) how messy the in-progress commits are on the branch. Then walk me through the exact git commands, what conflicts to expect, and how to recover if I get tangled.',
          example:
            'I have a 3-day-old feature branch off main. Nobody else has pulled it. Main has moved 12 commits since I branched. Team policy is squash on merge. My branch has 7 commits, some are "wip" noise. Walk me through rebasing onto main locally and then opening the PR.',
        },
        mnemonic:
          'Merge keeps history. Rebase rewrites it. Squash collapses it. Never rebase shared branches.',
        relatedGlossaryIds: ['kanban'],
      },
      {
        id: 'merge-conflicts',
        title: 'Merge conflicts',
        summary:
          'Git\'s "I cannot decide" moment. When two branches change the same lines and git cannot pick a winner, it pauses and asks you to resolve the conflict by hand (or with AI help) before the merge can finish.',
        details:
          'A merge conflict happens when git tries to combine changes and finds that the same region of the same file has been edited differently in both branches. Git is conservative: rather than guess, it pauses, marks the conflicting region with <<<<<<<, =======, and >>>>>>> markers, and waits for you.\n\nResolution is a series of small decisions: keep yours, keep theirs, keep both, or write a new combined version. Then you remove the markers, save, "git add" the file, and continue the merge or rebase. The actual git commands are short. The thinking is the work.\n\nThe two situations where conflicts get scary are big diffs (a 500-line PR conflicting with a 500-line refactor) and renamed/moved files (git often gives up and treats it as "deleted in one, modified in the other"). Both get easier when you keep PRs small, rebase often, and pull main into your branch (or rebase onto it) every day instead of every two weeks.\n\nAI is genuinely useful here. Pasting both versions plus "the goal of my branch was X, the goal of main\'s change was Y, write the merged version" produces a good first draft you can review. Just never commit a conflict resolution without reading the result; the model is happy to silently drop one side\'s logic.',
        comparison:
          'Merge = git did the math. Conflict = git refuses to guess and hands you the marker. The fix is human (or AI) judgment, not a git command.',
        vibeTip:
          'When you hit a conflict, do not panic-paste the whole file into the AI. Paste just the conflicted hunk plus a one-line description of each side\'s intent. Cleaner, safer resolution.',
        talkToAi: {
          starter:
            'Help me resolve the merge conflicts in [branch]. Before suggesting fixes, ask me: 1) the goal of my branch in one sentence, 2) the goal of the conflicting changes from main (commit message or PR title is fine), 3) any files where I want to keep mine entirely or theirs entirely without thinking. Then walk through each conflicted hunk, propose a resolution that respects both intents, and flag any hunk where the two sides genuinely disagree and I have to pick.',
          example:
            'Resolve the conflicts after rebasing my "switch to cursor pagination" branch onto main. Main\'s conflicting change was "rename Product to Item across the API". For each conflict, take the rename from main and the pagination logic from mine, unless the two genuinely fight, in which case flag it for me.',
        },
        mnemonic:
          'Conflict = git refuses to guess. Read both sides, pick or combine, never blind-trust the AI\'s resolution.',
        relatedGlossaryIds: ['compare'],
      },
      {
        id: 'tags-releases',
        title: 'Tags, releases, and changelogs',
        summary:
          'A tag is a sticky note on a specific commit (usually a version number like v1.4.0). A release is a tag plus notes, binaries, and a changelog. Both turn "this commit" into "this version" everyone can refer to.',
        details:
          'A git tag is a permanent label on a single commit. Unlike branches, tags do not move. "v1.4.0" today and "v1.4.0" five years from now point at the same commit. That stability is exactly why tags are how teams mark releases. The convention is "git tag -a v1.4.0 -m \'short summary\'" then "git push --tags".\n\nA release is the polished version of a tag. On GitHub or GitLab, a release wraps a tag with a title, release notes, optional binaries or built artifacts, and a public URL you can share with users. Released tools (npm packages, Docker images, mobile apps) almost always have one tag per release.\n\nA changelog is the running list of "what changed in each version, for humans". CHANGELOG.md is the convention; "Keep a Changelog" is the most common format (Added, Changed, Fixed, Removed, Security, per version). Tools like changesets, semantic-release, and release-please read your Conventional Commits and generate the changelog and the next semver tag for you, so the whole release can be one PR merge.\n\nThe vibe coder cheat: even on a personal project, tag whenever something is worth keeping. "v0.7.0-the-day-quizzes-worked" beats "let me find that commit from a month ago".',
        comparison:
          'Tag = sticky note on a commit. Release = tag + notes + downloads. Changelog = the human-readable list across releases.',
        vibeTip:
          'Have your AI generate the release notes from the commits since the last tag, in Keep-a-Changelog format. Then edit, do not generate-and-paste.',
        talkToAi: {
          starter:
            'Cut the next release for [repo]. Before doing anything, ask me: 1) the current version and what kind of bump this should be (major, minor, patch), 2) whether we already use Conventional Commits and a tool like changesets or release-please, 3) where the changelog lives. Then list every commit since the last tag, propose the next version with reasoning, draft Keep-a-Changelog entries grouped by Added/Changed/Fixed/Removed, and give me the exact git tag and push commands.',
          example:
            'Cut the next release for our CLI. Last tag was v0.6.3. We use Conventional Commits but no automation yet. CHANGELOG.md is in the repo root in Keep-a-Changelog format. Walk me through the version bump (probably minor since I added two feat: commits), draft the changelog, and give me the tag commands.',
        },
        mnemonic:
          'Tag a commit, release a tag, log the changes. Future users (and bug reports) need to know which version they are on.',
        relatedGlossaryIds: ['list'],
      },
      {
        id: 'observability',
        title: 'Observability: logs, metrics, traces',
        summary:
          'The three telescopes that let you see what your app did in production. Logs are timestamped messages. Metrics are numbers over time. Traces are timelines of one request through every service.',
        details:
          'Observability is "can I figure out what my app did from the outside?". The three pillars complement each other.\n\nLogs are messages your app emits ("user 42 signed in", "checkout failed: card declined"). Great for "what happened to this specific user?". Use a structured logger (pino, Winston, the platform default) so you can search by field, not just by string.\n\nMetrics are numeric measurements aggregated over time (request count, p95 latency, error rate). Great for "is the system healthy?" and dashboards. Tools: Prometheus, Datadog, OpenTelemetry.\n\nTraces follow a single request as it touches every service (frontend → API → database → cache → email service). Great for "why was this one request slow?". Tools: Jaeger, Datadog APM, Honeycomb, Sentry Performance.\n\nThe trap: shipping with neither. Add at least logs from day one. Add metrics when you have users. Add traces when you have services.',
        comparison:
          'Logs = messages. Metrics = numbers. Traces = request timelines. You need all three eventually, but logs first.',
        vibeTip:
          'Tell your AI to add structured logging at every boundary (request in, response out, external call) when scaffolding an API. Trace IDs included.',
        talkToAi: {
          starter:
            'Add observability to [app or service]. Before changing code, ask me: 1) what is in place today (console.log? a logger? metrics?), 2) the platform we are deployed on (Vercel, Fly, AWS, Render), 3) the budget (free / cheap / "we have Datadog"). Then recommend the smallest stack that covers logs, metrics, and traces, wire up structured logging at request boundaries with trace IDs, and add a dashboard or query I can use to spot-check the most important pages.',
          example:
            'Add observability to our Next.js app on Vercel. We have console.logs everywhere. Free tier is fine. Use pino for structured logs, Vercel Analytics for the basic metrics, and Sentry for error + slow-request traces. Wire it all up and write the README section.',
        },
        mnemonic:
          'Logs say what happened. Metrics say how often. Traces say where the time went.',
        relatedGlossaryIds: ['linechart', 'statcard'],
      },
      {
        id: 'secrets',
        title: 'Environment variables and secrets',
        summary:
          'Config that changes per environment (dev, staging, prod) lives in environment variables. Secrets (API keys, passwords) are env vars that must NEVER end up in your repo or your client bundle.',
        details:
          'Environment variables let the same code behave differently in different places. Database URL is different in dev vs production. Stripe is in test mode locally and live mode in prod. The convention is a .env file for local development, a managed config in production (Vercel env vars, Render env groups, Fly secrets).\n\nSecrets are env vars that are dangerous if leaked. The two rules: never commit them to git (.env is in .gitignore, .env.example is checked in with empty values), and never expose them to the client (anything prefixed with NEXT_PUBLIC_, VITE_, REACT_APP_ ends up in the browser bundle, where any visitor can read it). If a key starts with sk_ or has "secret" in the name, it lives on the server only.\n\nLayered above raw env vars are secret managers (1Password Secrets Automation, Doppler, AWS Secrets Manager, Infisical). They give you rotation, audit, and shared access for teams. For a solo project, .env + your hosting provider\'s env panel is enough.',
        comparison:
          'Env var = config that changes per environment. Secret = env var you would be in trouble if it leaked. Never commit secrets, never ship them to the browser.',
        vibeTip:
          'Tell your AI "the only secrets allowed in client code are public keys (pk_*). Anything starting with sk_ stays server-only". It stops suggesting fetch calls with your Stripe secret key.',
        talkToAi: {
          starter:
            'Audit env var and secret handling in [repo]. Before changing code, ask me: 1) the hosting platform (Vercel, Render, Fly, etc.), 2) the secret manager we use (or none), 3) any keys that have rotated or might be leaked. Then look at .env, .env.example, .gitignore, and any usage in client bundles. List secrets that are committed, secrets that leak to the client, missing entries in .env.example, and any keys that should rotate. Give me a fix list ordered by risk.',
          example:
            'Audit env vars in this Next.js repo on Vercel. We use Doppler for production secrets. Look for any sk_ keys read in components/ or app/ (those would ship to the browser), missing rows in .env.example, and any committed .env files in git history.',
        },
        mnemonic:
          'Env vars = config. Secrets = dangerous env vars. .env in gitignore, sk_ on server only.',
        relatedGlossaryIds: ['configpanel', 'switch'],
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
        details:
          'OpenAPI (formerly Swagger) is a YAML or JSON document that describes your HTTP API: every endpoint, every parameter, every response shape, every status code. It is essentially a contract between client and server, written in a way machines can read.\n\nOnce you have an OpenAPI spec, an army of tools opens up. Generate typed client libraries for every language. Render interactive docs (Swagger UI, Redoc, Stoplight). Validate requests and responses at runtime. Mock the API for frontend development before the backend exists. Lint the spec for breaking changes between versions.\n\nFor a vibe coder, the workflow is usually: define the spec first (with AI help), generate the typed client, then write the server. The spec becomes the source of truth and both sides cannot drift. Tools like Hono, Fastify, and Encore can generate the OpenAPI spec from your route definitions automatically.',
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
        details:
          'An Architecture Decision Record is a one-page document capturing one important technical decision: what we picked, what we considered, why we picked it, and what the trade-offs are. They are dated, numbered, and never edited (only superseded by newer ADRs).\n\nThe format Michael Nygard popularized has four sections: Context (what is going on that needs a decision), Decision (what we picked), Status (proposed, accepted, deprecated, superseded), Consequences (what gets easier, what gets harder, what we are now stuck with).\n\nADRs save the next person from having to ask \'why did we pick Postgres over Mongo?\' for the eighteenth time. They live in the repo (usually docs/adr/0001-use-postgres.md) so they version with the code. Vibe coders love them because future-you reading old ADRs is faster than reverse-engineering decisions from git blame.',
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
        details:
          'A Request for Comments is a longer document proposing a non-trivial change before it gets built. Bigger than an ADR (which is one decision), smaller than a design doc (which is the full implementation plan). Internet RFCs invented the format in the 1960s; modern tech companies use them for any change that touches multiple teams or systems.\n\nA good RFC has: a clear problem statement, the proposed approach, alternatives considered, open questions, a comment period (usually a week), and an explicit author who will resolve feedback. The point is to get pushback before code is written, when changing your mind is cheap.\n\nVibe coders should write RFCs for anything that would be expensive to undo: major dependency changes, data model rewrites, new services, paid third-party integrations. Even a one-page RFC posted in your team chat for a day catches the \'wait, what about...\' that would otherwise hit you in production.',
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
      {
        id: 'design-doc',
        title: 'Design doc',
        summary:
          'A short document (1-5 pages) that describes how you will build a non-trivial feature, written before the code, so the team can review the approach before any keys are pressed.',
        details:
          'A design doc is the engineering cousin of a PRD. The PRD says what we want to build and why. The design doc says how we plan to build it. The audience is engineers, the questions are technical: which services change, what the data model looks like, what the API contract is, what we considered and rejected, what could go wrong, what we will measure.\n\nGood design docs are short, specific, and dated. The Google template has sections for Context, Goals, Non-goals, Proposed solution, Alternatives considered, Risks, and Open questions. The "Alternatives considered" section is the secret weapon. Future readers stop asking "did you think about X?" because the answer is right there.\n\nDesign docs replace 4 hours of meetings with 30 minutes of reading. They also become the de-facto record once the work ships, similar to an ADR but more detailed.',
        comparison:
          'PRD = what + why. Design doc = how. ADR = a single decision pulled out of the design doc for the long term.',
        vibeTip:
          'Hand your AI a design doc before asking for code. It picks the right libraries and respects the boundaries you already decided.',
        talkToAi: {
          starter:
            'Help me write a design doc for [feature]. Before drafting, ask me: 1) the PRD or product context, 2) the existing services and data this touches, 3) any constraints I already know (cost, latency, compliance). Then produce a doc with sections: Context, Goals, Non-goals, Proposed solution (with a small diagram in ASCII or Mermaid), Alternatives considered (at least two), Data model changes, API changes, Risks, Open questions. Keep it under 4 pages.',
          example:
            'Write a design doc for adding background email sending to our app. Today we send synchronously inside the request handler, which makes signups slow. Constraints: we are on Vercel, no managed queue yet, budget under $20/mo. Consider Resend + Vercel cron, Inngest, and Trigger.dev as alternatives.',
        },
        mnemonic:
          'PRD says what. Design doc says how. Alternatives considered is the section that earns its keep.',
        relatedGlossaryIds: ['table'],
      },
      {
        id: 'runbook',
        title: 'Runbook',
        summary:
          'A short, step-by-step guide for what to do when a specific thing goes wrong (or needs doing) in production. "If alert X fires, do Y. If that fails, page Z."',
        details:
          'A runbook is operational documentation. Not "here is how the system works" but "here is what to do when this specific thing happens". The audience is whoever is on-call at 3am, possibly someone who has never seen this system before.\n\nGood runbooks have one task per page: a clear trigger ("if the error rate dashboard shows > 1% for 5 minutes"), the exact steps to investigate (commands, dashboards, log queries), the most common root causes, and what to do for each. Bad runbooks are a wall of context.\n\nAI is great at drafting first-pass runbooks from your code and incident history. The trick is keeping them current. A runbook that lies is worse than no runbook. Treat them like tests: when the code changes, the runbook changes, in the same PR.',
        comparison:
          'Design doc = how we built it. Runbook = what to do when it breaks. Read the runbook at 3am, not the design doc.',
        vibeTip:
          'After every incident, ask your AI to draft or update the runbook from the incident notes. Future-you sleeping at 3am thanks present-you.',
        talkToAi: {
          starter:
            'Draft a runbook for [scenario]. Before writing, ask me: 1) the trigger (alert, customer report, manual check) and exactly what it looks like, 2) the systems involved and where their dashboards / logs live, 3) the most common root causes I have seen and how each was fixed. Then write the runbook with sections: Trigger, Quick check (5 commands), Common causes (each with a fix), Escalation (who to page when), Related links. Keep it on one page if you can.',
          example:
            'Draft a runbook for "checkout error rate above 1% for 5 minutes". Trigger comes from Datadog. Most common causes: Stripe webhook delays, our DB at capacity, a bug we just shipped. Logs are in Datadog (service:checkout), DB is in Supabase. Escalate to me first, then platform on-call.',
        },
        mnemonic:
          'A runbook is a 3am script. One task, exact commands, current or do not bother.',
        relatedGlossaryIds: ['toast', 'banner'],
      },
      {
        id: 'contract-testing',
        title: 'Contract testing',
        summary:
          'Tests that verify two services agree on the API between them. The frontend\'s "shape it expects" matches the backend\'s "shape it returns", checked automatically on every change.',
        details:
          'When two services talk to each other (frontend ↔ API, service A ↔ service B), they share a contract: this endpoint accepts these fields and returns this shape. Contract tests pin that contract down so it cannot drift silently.\n\nThe simplest version: the API publishes an OpenAPI spec, and every service that calls it generates a typed client from that spec. The compiler tells you when the contract changes. This is the "free" version, just from using OpenAPI plus codegen.\n\nThe heavy version: tools like Pact let consumers (frontend) write a "pact" describing what they call and expect, and providers (backend) verify their service matches every consumer\'s pact in CI. Useful at company scale where many teams own different services.\n\nFor a vibe coder, contract tests are usually overkill. OpenAPI plus generated types is enough until you have multiple services owned by different people. Then contract tests pay for themselves the first time someone changes a response shape and breaks a service they did not know existed.',
        comparison:
          'Unit test = one function. Integration test = several pieces. Contract test = the agreement between two services.',
        vibeTip:
          'Tell your AI "generate a typed client from the OpenAPI spec on every build". You get contract checking for free, no Pact required.',
        talkToAi: {
          starter:
            'Help me set up contract testing for [service or services]. Before suggesting an approach, ask me: 1) the services involved and who owns each, 2) whether we already have an OpenAPI or other spec, 3) the realistic blast radius of a contract break (one team, all teams, paying customers). Then recommend the lightest tool that fits (often just OpenAPI + generated types, sometimes Pact, sometimes schema-first GraphQL), wire up one example, and add the CI step that fails on contract drift.',
          example:
            'Set up contract checking between our Next.js frontend and our Go API. We already have an OpenAPI spec the API serves at /openapi.json. Generate a typed TypeScript client on every build using openapi-typescript, fail the build if the spec changes without the client regenerating, document the workflow in CONTRIBUTING.md.',
        },
        mnemonic:
          'Two services + one shared contract = contract test. OpenAPI + codegen handles 80% of the cases.',
        relatedGlossaryIds: ['table'],
      },
      {
        id: 'user-journey',
        title: 'User journey map',
        summary:
          'A timeline of the steps a user takes to accomplish a goal across your product, plus what they think and feel at each step. Reveals where to invest and where the cracks are.',
        details:
          'A user journey map is a horizontal strip with the stages of a goal across the top (Discover → Sign up → First use → Habit → Advocate, for example) and rows underneath: actions the user takes, what they are thinking, what they are feeling, the touchpoints (your app, support, marketing site). The cells are filled with what we know from research.\n\nThe payoff is seeing the whole arc at once. Most products are great at one stage and quietly bad at another. The map makes that visible: "we crush onboarding but the second week is a desert" is the kind of insight that changes a roadmap.\n\nJourney maps are not personas (those describe the person), not flow diagrams (those describe the steps in one feature), and not a wireframe (those describe a screen). They are about emotional and contextual progression across time. Light versions live on a Notion page; heavy versions live in Miro and become a team artifact.',
        comparison:
          'Persona = who. JTBD = what they want. Journey map = the timeline they go through. Three different lenses on the same user.',
        vibeTip:
          'Hand your AI a journey map before brainstorming features. It stops suggesting onboarding ideas when the actual problem is the second week.',
        talkToAi: {
          starter:
            'Help me build a user journey map for [primary persona accomplishing a goal]. Before drafting, ask me: 1) the persona and the goal, 2) the stages I think exist today (or "you suggest"), 3) the data sources we have (interviews, support tickets, analytics, gut). Then propose 4-6 stages, fill in actions, thoughts, feelings, and touchpoints for each (label which cells are research-backed vs assumptions), and call out the 1-2 stages where investment would have the biggest impact.',
          example:
            'Map the journey for a freelance designer using our invoicing tool to get paid for one project. Stages: send proposal → start work → log time → send invoice → get paid. We have 5 interviews and a year of support tickets. Highlight the worst stage and why.',
        },
        mnemonic:
          'A journey map is the whole arc on one page. Find the stage that is quietly bad.',
        relatedGlossaryIds: ['stepper', 'timeline'],
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
        details:
          'SQL databases (Postgres, MySQL, SQLite) store data in tables with strict schemas, related by foreign keys, queried with the SQL language. They are great when your data has obvious relationships (users have orders have line items) and you need transactions and joins.\n\nNoSQL covers everything else: document stores like MongoDB and Firestore (flexible JSON-shaped records), key-value stores like Redis and DynamoDB (lookup by id, blazing fast), graph databases like Neo4j (best for highly-connected data like social networks). NoSQL is great when the schema changes a lot, or when you need scale that joins cannot deliver.\n\nFor most vibe-coded apps in 2026, the right answer is Postgres (or its hosted versions: Supabase, Neon, Render Postgres). It is fast, free up to real scale, has JSON columns when you need flexibility, and almost every AI knows it well. Reach for NoSQL only when you have a specific reason.',
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
        details:
          'A database migration is a versioned, reviewable script that changes the database schema (add a column, drop a table, create an index). Migrations live in source control next to the code, run in order, and each one knows how to undo itself.\n\nWhy this matters: without migrations, schema changes happen by someone running ad-hoc SQL on the database, and now production and your laptop drift apart. With migrations, every environment runs the same script in the same order, and the schema is reproducible from scratch on a fresh database.\n\nModern tooling makes this almost invisible: Prisma, Drizzle, Knex, Rails ActiveRecord, and Django all generate migration files when you change your model. The vibe coder rule: never edit a migration that has already run in production. Add a new one that fixes the issue.',
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
        details:
          'An Object-Relational Mapper is a layer that lets you write queries in your application language (TypeScript, Python, Ruby) instead of raw SQL. user.findMany({ where: { active: true } }) becomes a real SQL query under the hood. ORMs handle joins, type safety, migrations, and connection pooling.\n\nThe trade-off: ORMs make easy things easier and hard things much harder. Simple CRUD is delightful. Complex multi-join aggregations with window functions become a fight, and you end up dropping to raw SQL anyway. Most projects spend 95% of their time in the easy zone, so ORMs win.\n\nFor TypeScript vibe coders: Prisma is the popular default (great DX, slow at scale), Drizzle is the modern choice (closer to SQL, faster, fully typed), and Kysely is for people who like SQL but want type safety. Pick one early; switching ORMs mid-project is painful.',
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
        details:
          'CRUD stands for Create, Read, Update, Delete: the four basic operations on any persistent record. Almost every API endpoint maps to one of them. POST creates, GET reads, PATCH or PUT updates, DELETE deletes.\n\nThe acronym is useful because it forces completeness. When you scaffold a feature, ask: what is the C, R, U, and D for this resource? Sometimes one is intentionally missing (a feed has no Update, an audit log has no Delete). That is fine, but it should be intentional, not a bug you discover when the user complains they cannot edit their post.\n\nMost frameworks and AI tools can scaffold CRUD endpoints in seconds. The real work is the parts CRUD does not name: pagination, sorting, filtering, search, soft-delete, audit logs, optimistic concurrency. CRUD is the skeleton; those are the muscles.',
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
        details:
          'A cache is a copy of an expensive-to-compute or slow-to-fetch result, stored somewhere fast so the next request can skip the work. Caches live at every layer: browser cache (HTTP headers), CDN edge cache (Cloudflare, Vercel, Fastly), server memory (in-process), shared cache (Redis, Memcached), database query cache.\n\nThe famous Phil Karlton quote: \'There are only two hard things in computer science: cache invalidation and naming things.\' Knowing when to throw away the cached copy is harder than putting it there. Common strategies: time-based (cache for 60 seconds), event-based (clear when the source changes), stale-while-revalidate (serve the stale copy and refresh in the background).\n\nFor vibe coders: do not cache early. Caching adds complexity and bugs. Wait until you have a measured slow request, then cache the smallest thing that fixes it, with clear invalidation. Modern frameworks (Next.js fetch revalidation, React Query) make tactical caching easy.',
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
      {
        id: 'api-styles',
        title: 'API styles: REST vs GraphQL vs RPC',
        summary:
          'Three flavors of "how clients talk to a server". REST = nouns and HTTP verbs. GraphQL = one endpoint, you ask for the shape you want. RPC = call a remote function (tRPC, gRPC).',
        details:
          'REST is the default for most web APIs. Each resource has a URL (/products, /products/42), HTTP verbs map to actions (GET reads, POST creates, PATCH updates, DELETE removes). It is simple to understand, easy to cache, and every tool speaks it. The pain shows up when one screen needs data from 4 endpoints, or when you keep changing the response shape.\n\nGraphQL flips it. One endpoint, the client sends a query that says "give me this user, plus their last 5 orders, plus the product name on each, but only the fields I name". The server resolves it. Great for complex client needs (mobile apps with limited bandwidth, dashboards with many panels). Trade-off: harder to cache, easier to write expensive queries by accident, schema becomes a coordination point.\n\nRPC (tRPC, gRPC) is "call a function on the server like it is local". tRPC is the typescript-everywhere version: define functions on the server, call them with full type safety on the client, no schemas, no codegen if you control both sides. gRPC is the binary, polyglot, microservices-y version. RPC wins when one team owns both ends.\n\nFor a vibe-coded fullstack app, the right answer is usually tRPC if you are all-TypeScript, REST otherwise.',
        comparison:
          'REST = resources + verbs. GraphQL = one endpoint, client picks the shape. RPC = remote function call. Three answers to the same question.',
        vibeTip:
          'Tell your AI which style your project uses upfront. "We use tRPC" stops it from suggesting REST routes that duplicate work.',
        talkToAi: {
          starter:
            'Help me pick an API style for [project]. Before suggesting one, ask me: 1) the languages on each side (TS+TS, TS+Go, mobile native, etc.), 2) the client patterns (one big query per screen vs many small ones, mobile or desktop), 3) the team and ownership (one team both sides vs many teams, internal vs public API). Then recommend REST, GraphQL, or RPC with reasoning, list the trade-off you are most worried about for my context, and scaffold one example endpoint.',
          example:
            'Pick an API style for our solo-developer Next.js + Supabase app. Frontend and backend both TypeScript. One person owns both. Mostly dashboard-style screens, sometimes complex queries. Recommend a stack and scaffold one example endpoint.',
        },
        mnemonic:
          'REST = nouns. GraphQL = "give me this exact shape". RPC = "call this function".',
        relatedGlossaryIds: ['table'],
      },
      {
        id: 'webhooks',
        title: 'Webhooks',
        summary:
          'A reverse API: instead of you polling another service ("anything new?"), it POSTs to a URL on your server when something happens. Stripe, GitHub, and Slack run on these.',
        details:
          'A webhook is the other service\'s way of telling you something happened. You give Stripe a URL (https://yourapp.com/webhooks/stripe). When a charge succeeds, Stripe POSTs to that URL with a JSON payload. Your server processes it. No polling, near-instant updates.\n\nThree gotchas trip everyone. First, webhooks come from the public internet, so they need to work locally during development. Tools like ngrok, Cloudflare Tunnel, or Stripe CLI\'s "stripe listen" forward them to your dev server. Second, webhooks must be idempotent (see the next topic): the same event might arrive twice if the network blinked. Third, webhooks must be verified (every provider signs the payload with a secret), or anyone on the internet can post fake events to your endpoint and create chaos.\n\nThe right shape for a webhook handler: verify signature → respond 200 immediately → enqueue the actual work in a background job. Doing the work synchronously means a slow handler causes the provider to retry, and now you have duplicates.',
        comparison:
          'You poll a regular API. A webhook posts to you. Webhooks need verification, idempotency, and ideally a queue.',
        vibeTip:
          'When asking your AI for a webhook, name the provider ("Stripe webhook for charge.succeeded"). It pulls in the right verification helper (stripe.webhooks.constructEvent) instead of writing custom HMAC.',
        talkToAi: {
          starter:
            'Set up a [provider] webhook for [event]. Before writing code, ask me: 1) the events I want to handle, 2) where the secret is stored (env var name), 3) what the handler should do (database write, send email, enqueue a job). Then write the route handler that verifies the signature with the official SDK, returns 200 fast, enqueues the work (or does it inline if trivial), and is idempotent (uses the event id to dedupe). Show me how to test it locally with the provider\'s CLI tunnel.',
          example:
            'Set up a Stripe webhook for checkout.session.completed in our Next.js app. Secret is in STRIPE_WEBHOOK_SECRET. On success, mark the order paid in Supabase using the session metadata.orderId, then send a confirmation email via Resend. Idempotent on event.id. Show me the stripe listen command for local dev.',
        },
        mnemonic:
          'They post to you. Verify, respond fast, dedupe. Otherwise the same event runs five times.',
        relatedGlossaryIds: ['toast', 'banner'],
      },
      {
        id: 'queues',
        title: 'Background jobs and queues',
        summary:
          'Slow or scheduled work (sending emails, processing uploads, nightly reports) does not happen during the user\'s request. It goes on a queue, and a worker handles it later.',
        details:
          'If your request handler takes 8 seconds because it sends an email, the user waits 8 seconds. Bad. The fix: take the request, write a "send email" job to a queue, return 200 to the user immediately. A worker process pulls from the queue and does the actual sending. The user got their response in 50ms; the email arrives a moment later.\n\nQueues are the right home for: emails, file processing, third-party API calls, exports, anything that runs on a schedule (nightly billing, weekly digests), and any work that might fail and want to retry.\n\nThe job system you pick depends on your platform. Inngest, Trigger.dev, and Hatchet are modern hosted options that work great on serverless. BullMQ on Redis is the self-hosted standard for Node. Sidekiq is the equivalent for Ruby. Cloudflare Queues, AWS SQS, and Google Cloud Tasks are platform-native options.\n\nThe one rule that matters: jobs must be idempotent. The queue might run the same job twice. If "send email" runs twice, the user gets two emails. If "charge card" runs twice, the user files a complaint.',
        comparison:
          'Sync work happens during the request. Async / background work happens after, on a queue. Slow things go on the queue.',
        vibeTip:
          'When asking your AI to add "send email after signup", say "add it as a background job, not inline in the request". You stop shipping slow signup flows.',
        talkToAi: {
          starter:
            'Add a background job for [task] in [project]. Before writing code, ask me: 1) the trigger (after a request, on a schedule, on a webhook), 2) the platform we are on (Vercel, Render, Fly, self-hosted), 3) whether we already have a job system. Then recommend the lightest fit (Inngest, Trigger.dev, BullMQ, native cloud queue), wire up one job end to end, make the handler idempotent (uses an external id to dedupe), and add a way to inspect failed jobs.',
          example:
            'Add a background job to send the welcome email after signup. We are on Vercel + Supabase. Use Inngest. Idempotent by user id. If the email provider fails, retry with backoff up to 3 times, then alert me via a Discord webhook.',
        },
        mnemonic:
          'Slow work goes on a queue. The user gets their response. The worker does the slow part. Always idempotent.',
        relatedGlossaryIds: ['skeleton', 'toast'],
      },
      {
        id: 'transactions',
        title: 'Database transactions and ACID',
        summary:
          'A transaction groups multiple database writes into one all-or-nothing operation. Either every write happens or none of them do. The classic example: transferring money.',
        details:
          'Money transfers explain transactions perfectly. Subtract $100 from account A. Add $100 to account B. If your server crashes between those two writes, money disappeared. Wrap both writes in a transaction and the database guarantees: either both happen, or neither does, even if the power goes out.\n\nACID is the four guarantees a real transaction makes. Atomicity: all-or-nothing (the money example). Consistency: the database stays valid (no negative balances if a constraint says so). Isolation: concurrent transactions do not see each other\'s half-done state. Durability: once a transaction commits, it survives crashes.\n\nMost ORMs make transactions easy: prisma.$transaction([...ops]) in Prisma, db.transaction() in Drizzle, BEGIN/COMMIT in raw SQL. The trap is doing non-database work inside a transaction (sending an email mid-transaction, calling an external API). If that fails, the whole transaction rolls back, and you sent the email anyway.',
        comparison:
          'No transaction = each write commits independently. Transaction = all writes commit together or none do. ACID = the four guarantees.',
        vibeTip:
          'Tell your AI to wrap multi-step writes in a transaction explicitly: "use a Prisma transaction so both inserts succeed or both roll back". It is the kind of thing AI forgets.',
        talkToAi: {
          starter:
            'Add a transaction around [operation] in [project]. Before changing code, ask me: 1) the writes that must happen together, 2) any external side effects (emails, webhooks, external API calls) that are currently inside the same code path, 3) the ORM or driver in use. Then wrap the writes in a single transaction, move side effects OUTSIDE the transaction (typically into a job triggered after commit), and add a test that simulates a failure halfway through to confirm the rollback works.',
          example:
            'Wrap our "create order" code in a Prisma transaction so the orders insert and the order_items inserts commit together. Move the "send confirmation email" call out of the transaction and into an Inngest job that fires after commit. Add a test that throws between the two inserts and verifies nothing was written.',
        },
        mnemonic:
          'All or nothing. Side effects go outside the transaction or you send emails for orders that never saved.',
        relatedGlossaryIds: ['table'],
      },
      {
        id: 'idempotency',
        title: 'Idempotency',
        summary:
          'A safe-to-repeat operation. Calling it once or calling it five times produces the same result. The shield against retries, double clicks, and webhook duplicates.',
        details:
          'Idempotent comes from "same state". An operation is idempotent if running it twice has the same effect as running it once. GET /products is naturally idempotent (it does not change anything). DELETE /products/42 is idempotent (deleting an already-deleted product is fine). POST /charge is naturally NOT idempotent (calling it twice charges twice).\n\nMaking write operations idempotent is the magic that makes distributed systems work. Stripe, Shopify, AWS, every serious API supports an idempotency key: you generate a UUID, send it with your request, and the server promises that within some window (usually 24 hours), the same key returns the same result without re-doing the work.\n\nFor your own code, idempotency comes from "is this thing already done?" checks: before sending the email, look up "did we send this welcome email to this user yet?" and skip if yes. Before processing the webhook, look up the event id and skip if seen. This is mundane and tedious, and it is also why your app does not double-charge users when the network blinks.',
        comparison:
          'Idempotent = safe to repeat. Non-idempotent = each call has additional effect. Always make webhook handlers and retry-prone calls idempotent.',
        vibeTip:
          'Tell your AI "this handler is called from a webhook, so it must be idempotent on event.id". You stop having to reason about duplicate emails after the fact.',
        talkToAi: {
          starter:
            'Audit [endpoint or handler] for idempotency. Before changing code, ask me: 1) how this handler is invoked (user request, webhook, queue job, retry), 2) the side effects it produces (DB write, email, external API call, charge), 3) any unique id we can use to dedupe (event id, request id, business id). Then identify each non-idempotent step, propose the dedupe mechanism for each (a unique constraint, a "processed_events" table, an idempotency key sent to the third-party API), and write the migration plus the code.',
          example:
            'Audit our Stripe webhook handler at /api/webhooks/stripe for idempotency. Make it safe to receive the same event.id twice. Use a processed_stripe_events table with event.id as the unique key. If we have already seen the event, return 200 immediately without processing.',
        },
        mnemonic:
          'Idempotent = same result whether you call it once or five times. Webhooks demand it, retries assume it.',
        relatedGlossaryIds: ['toast'],
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
        details:
          'Session-cookie auth: when the user signs in, the server stores a session record in a database (or Redis), gives the browser an opaque session id in an HTTP-only cookie, and looks up the session on every request. Logout means deleting the row.\n\nJWT (JSON Web Token) auth: the server issues a signed token containing the user info (id, role, expiry). The client sends the token on every request. The server verifies the signature without a database lookup. There is no logout, only expiry; revocation requires a separate denylist.\n\nThe trade-off in one sentence: sessions need a server but are easy to revoke; JWTs scale stateless but are hard to invalidate before they expire. For most apps, sessions win. Reach for JWTs when you have multiple services or need true stateless auth (some serverless setups). Pick one, never both in the same app.',
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
        details:
          'OAuth 2.0 is a protocol that lets a user grant your app limited access to their account on another service (Google, GitHub, Facebook, Twitter) without ever sharing the password. Your app gets an access token; the password stays at the provider.\n\nThe flow most people see: user clicks \'Sign in with Google\', gets redirected to Google, approves the request, gets redirected back to your app with an authorization code, your server exchanges the code for an access token, you call Google APIs with the token. The whole dance takes about five hops in two seconds.\n\nOAuth handles authorization (can this app act on behalf of this user?). OpenID Connect, built on top of OAuth, handles authentication (who is this user?). Most \'Sign in with...\' buttons use both. Use a maintained library (Auth.js, Clerk, Supabase Auth, WorkOS); rolling your own OAuth is a security minefield.',
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
        details:
          'Single Sign-On is the enterprise version of social login. One company-managed identity (Okta, Azure AD, Google Workspace, OneLogin) lets employees sign in to dozens of internal and SaaS tools without separate passwords. When IT removes someone, they lose access to everything immediately.\n\nThe two protocols you will hear: SAML (older, XML-based, dominant in enterprise) and OIDC (newer, JSON, built on OAuth, gaining ground). B2B SaaS apps usually need both because every customer is on a different identity provider.\n\nThe vibe coder shortcut: do not implement SSO yourself. Use a hosted layer (BoxyHQ, WorkOS, Stytch, Frontegg) that exposes a single API and handles SAML, OIDC, SCIM provisioning, and the per-tenant configuration UI. Trying to support five identity providers by hand is a six-month side quest.',
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
        details:
          'Access tokens are short-lived (15 minutes to an hour) on purpose: if one leaks, the damage window is small. Refresh tokens are longer-lived (days to months) and have one job: get a new access token without making the user sign in again.\n\nThe pattern: when an access token expires, the client sends the refresh token to a /refresh endpoint, the server validates it and issues a fresh access token (sometimes a fresh refresh token too, called \'rotation\'). The user never sees this; it happens in a fetch interceptor.\n\nWhere to store each: access tokens in memory (lost on reload, fine), refresh tokens in HTTP-only cookies (the browser sends them automatically and JavaScript cannot read them, so XSS attacks cannot steal them). Storing either in localStorage is the classic 2017 mistake; OK for prototypes, dangerous for anything real.',
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
      {
        id: '2fa',
        title: '2FA / MFA (two- or multi-factor auth)',
        summary:
          'A second proof you are you, beyond just a password. The factors come from "something you know" (password), "something you have" (phone, security key), "something you are" (fingerprint).',
        details:
          'Passwords leak. Always. Two-factor authentication adds a second factor so a leaked password alone is not enough. The cheap and common version is TOTP (time-based one-time passwords): an authenticator app like 1Password, Authy, or Google Authenticator generates a 6-digit code that changes every 30 seconds. The user types it after their password. Behind the scenes, the server and the app share a secret seed and compute the same code at the same time.\n\nSMS-based 2FA exists but is the weakest factor (SIM-swap attacks, intercepted texts). Use TOTP, push notifications via an authenticator app, or hardware keys (YubiKey, security keys via WebAuthn) for anything sensitive.\n\nFor a vibe-coded app, a managed auth provider (Auth.js, Clerk, Supabase Auth, WorkOS) hands you 2FA as a toggle. Rolling your own TOTP is doable (otplib in Node), but the recovery flow (lost phone, backup codes, admin override) is where most projects get the design wrong.',
        comparison:
          '1FA = password only. 2FA = password + one more thing. MFA = two or more factors, generally interchangeable with 2FA in casual use.',
        vibeTip:
          'Use a provider that ships 2FA out of the box. Tell your AI "use the Auth.js TOTP plugin" instead of asking it to roll TOTP by hand.',
        talkToAi: {
          starter:
            'Add 2FA to [app]. Before writing code, ask me: 1) the auth library we use (Auth.js, Clerk, Supabase, custom), 2) the factor I want (TOTP via authenticator app is the safe default; ignore SMS unless required), 3) the recovery story (backup codes, admin reset). Then add enrollment, verification, and recovery flows using the library\'s built-in support, write the recovery codes to a UI the user can save once, and call out anywhere the recovery design has a known footgun (admin reset bypassing 2FA, etc.).',
          example:
            'Add TOTP 2FA to our Next.js app using Auth.js. Generate 8 single-use backup codes at enrollment, show them once, and force the user to confirm they saved them. Admin reset requires support ticket review. Update the sign-in flow to prompt for the 6-digit code after password.',
        },
        mnemonic:
          'Password is something you know. 2FA adds something you have. SMS is the weakest factor.',
        relatedGlossaryIds: ['inputgroup', 'modal'],
      },
      {
        id: 'password-hashing',
        title: 'Password hashing (bcrypt, argon2)',
        summary:
          'Passwords are NEVER stored as plain text. They get hashed (one-way scrambled) so even if the database leaks, the original passwords are not directly readable. Use bcrypt or argon2.',
        details:
          'Hashing is one-way: you can compute a hash from a password, but you cannot reverse the hash to get the password. To verify a login, you hash what the user typed and compare it to the stored hash.\n\nNot every hash is good for passwords. SHA-256 is fast, which is bad for password hashing because attackers can compute billions of guesses per second. Password-safe hashes (bcrypt, scrypt, argon2) are deliberately slow and memory-hungry, which makes brute-force expensive. Argon2id is the current state of the art; bcrypt is still fine for most apps and is widely supported.\n\nThe other essential is the "salt": a random per-user value mixed into the hash so two users with the same password get different hashes. Modern libraries do this automatically; if you find yourself writing salt logic by hand, stop and use the library.\n\nRules: never store plain text. Never use SHA-256 or MD5 for passwords. Use bcrypt or argon2 from a maintained library. Re-hash on login if the cost factor goes up. If you use a managed auth provider (Auth.js, Clerk, Supabase), this is already handled.',
        comparison:
          'Encryption = reversible with a key. Hashing = one-way. Password hashing = deliberately slow hashing with a salt.',
        vibeTip:
          'If your AI suggests SHA-256 for passwords, push back hard. The right answer is bcrypt or argon2, every time.',
        talkToAi: {
          starter:
            'Audit password handling in [project]. Before changing code, ask me: 1) where passwords are stored today (own DB or managed provider), 2) the language and the library currently used to hash, 3) whether we have any legacy users with weaker hashes (md5/sha) that need migration. Then verify we are using bcrypt or argon2 with sane cost, salt is per-user, plain-text passwords never appear in logs or error messages, and password resets use single-use time-limited tokens. Output a fix list ordered by risk and a migration plan if any legacy hashes exist.',
          example:
            'Audit our Express + Prisma project for password handling. We use bcryptjs at cost factor 10. Confirm there are no plaintext passwords in logs, the cost factor is high enough for 2026 (suggest 12), and the password reset uses single-use tokens that expire in 1 hour.',
        },
        mnemonic:
          'Never plain. Never SHA-256. Bcrypt or argon2 with a per-user salt, from a real library.',
        relatedGlossaryIds: ['inputgroup'],
      },
      {
        id: 'csrf-cors',
        title: 'CSRF and CORS',
        summary:
          'Two browser security rules that confuse everyone. CORS controls which origins can call your API from a browser. CSRF prevents another site from making your logged-in user submit something they did not mean to.',
        details:
          'CORS (Cross-Origin Resource Sharing) is the browser asking your server "is it ok if a script on https://other-site.com calls you?". The server answers with Access-Control-Allow-Origin headers. If the headers say no, the browser blocks the response. CORS is about which sites can read responses from your API.\n\nCSRF (Cross-Site Request Forgery) is the other direction: a malicious page tricks the user\'s browser into submitting a form to your site, using the user\'s logged-in cookies. Defenses: SameSite=lax cookies (the modern default, blocks cross-site cookie sending for top-level navigations), and CSRF tokens (a hidden value the server checks on form submits). If you use SameSite=lax or strict on session cookies and check the Origin header on state-changing requests, you have covered most cases.\n\nThe shortcut for vibe coders: use a modern auth library, default cookies to SameSite=lax, lock CORS down to your own origins (not "*"), and use POST/PATCH/DELETE for any write that matters. The library defaults usually do the right thing; the bugs come from people loosening the defaults to "make CORS work" without understanding what they turned off.',
        comparison:
          'CORS = "can this other site read my API?". CSRF = "can another site trick my user into POSTing here?". Different problems, different fixes.',
        vibeTip:
          'Tell your AI "lock CORS to specific origins, never wildcard" and "use SameSite=lax cookies". Half the production CSRF/CORS bugs come from someone setting Access-Control-Allow-Origin: * to silence a console warning.',
        talkToAi: {
          starter:
            'Audit CORS and CSRF in [project]. Before changing code, ask me: 1) the origins that should legitimately call our API (own frontend, partner integrations, none), 2) the auth model (cookie session, JWT, OAuth bearer), 3) whether we currently have CORS errors users complain about. Then check Access-Control-Allow-Origin (must be specific, not *), credentials handling, cookie SameSite settings, and CSRF protection on state-changing requests. Output a fix list ordered by risk.',
          example:
            'Audit our Next.js API routes for CORS and CSRF. The frontend is at app.example.com, the API at api.example.com. We use cookie sessions. Confirm CORS allows app.example.com only, cookies are SameSite=lax, and our POST/PATCH/DELETE handlers check the Origin header. Show me any route that is currently too permissive.',
        },
        mnemonic:
          'CORS = who can call. CSRF = who can trick your user. SameSite=lax + specific CORS origins solves most of it.',
        relatedGlossaryIds: ['toast', 'modal'],
      },
      {
        id: 'magic-links-passkeys',
        title: 'Magic links and passkeys',
        summary:
          'Two ways to skip the password entirely. Magic link: user types email, server sends a one-click sign-in URL. Passkey: phone or laptop signs a challenge with a private key tied to your device.',
        details:
          'Passwords are a 60-year-old idea and they are losing. Two replacements have momentum.\n\nMagic links work like this: user types their email, server emails a one-time URL with a signed token, clicking it signs them in. Pros: no password to forget or leak, simple to build. Cons: depends on email being fast (often it is not), users who use one device for email and another for the app find it annoying, phishing risk if the email is intercepted.\n\nPasskeys are the modern WebAuthn-based replacement for passwords. The browser asks the user to confirm a sign-in with their device (Face ID, Touch ID, Windows Hello, hardware key). The device signs a challenge with a private key tied to your origin. The private key never leaves the device. Pros: phishing-proof, no shared secret to leak, syncs across Apple/Google/Microsoft accounts now. Cons: less familiar to users, recovery story still rough.\n\nBoth are well-supported by modern auth libraries (Auth.js, Clerk, Supabase, WorkOS). For a new app in 2026, magic links are the easy default, and adding passkeys as an option is the modern move.',
        comparison:
          'Password = something you know (and probably reused). Magic link = email is the second factor. Passkey = your device IS the credential.',
        vibeTip:
          'Tell your AI "magic link as the default, passkey as the upgrade". You skip the password reset flow entirely.',
        talkToAi: {
          starter:
            'Set up passwordless auth for [app]. Before writing code, ask me: 1) the auth library, 2) my preference (magic link only, passkey only, both with magic link as fallback), 3) the email service available (Resend, Postmark, SES). Then implement the chosen flow, set token TTLs (15 minutes for magic links is the sweet spot), make tokens single-use, and write the user-facing copy ("Check your email for a sign-in link"). Add a clear error path for expired or already-used links.',
          example:
            'Add magic link sign-in to our Next.js app using Auth.js with Resend as the email provider. 15-minute token expiry, single-use, link goes to /signin/verify with the token in the URL. Show "Check your email" UI after submit and a friendly error page for expired links.',
        },
        mnemonic:
          'Magic link = email is the second factor. Passkey = the device is the credential. Either beats reused passwords.',
        relatedGlossaryIds: ['inputgroup', 'modal'],
      },
      {
        id: 'audit-log',
        title: 'Audit log',
        summary:
          'A timestamped record of every important action in your system: who did what, to which resource, when, and from where. The thing you wish you had after the security incident.',
        details:
          'An audit log is the answer to "what happened?". Every meaningful action (sign-in, role change, payment, deletion, export, settings update) writes a row: who (user id), what (action name), target (resource id and type), when (timestamp), where (IP, user agent), and any relevant context (old value, new value).\n\nThe two reasons audit logs matter: security incidents (figuring out what an attacker touched) and customer trust (enterprise customers will ask for an audit log feature; ignore them at your peril).\n\nThe rules that make audit logs actually useful: append-only (you cannot delete or edit rows), separate from your main data store (or at least RLS-locked so the same user cannot tamper with their own log), structured (one row per action, JSON columns for context), and exportable (your enterprise customers will want CSVs).\n\nFor a vibe-coded app, start with a simple audit_logs table and a writeAudit() helper used at every meaningful action. Tools like Vercel Audit Logs, Sentry, or specialized services (Liveblocks Audit, Workos Audit Logs) handle the heavy lift if you outgrow the simple table.',
        comparison:
          'Application logs = "the system did X". Audit logs = "user U did X to resource R". One for engineers, one for security and compliance.',
        vibeTip:
          'Add a writeAudit() helper early. Tell your AI "every state-changing action calls writeAudit with actor, action, target, and context". Future-you investigating an incident will be grateful.',
        talkToAi: {
          starter:
            'Add audit logging to [app or feature]. Before writing code, ask me: 1) the actions that should be audited (auth events, role changes, deletions, exports, paid-tier changes), 2) where the log should live (own table, separate database, third-party service), 3) who can read the log (admin only, the user themselves for their own actions, both). Then create the audit_logs schema with append-only enforcement, write a writeAudit(actor, action, target, context) helper, instrument the listed actions, and add an admin UI page to filter and search the log.',
          example:
            'Add audit logging to our Next.js + Supabase app. Audit: sign-in success/failure, role changes, user deletions, paid plan changes, settings exports. Use a Supabase audit_logs table with RLS so admins read all and users read only their own actions. writeAudit() helper called from each handler. Admin /audit page with filter by user, action, date.',
        },
        mnemonic:
          'Who did what to which thing, when, from where. Append-only. The thing you wish you had after the incident.',
        relatedGlossaryIds: ['table', 'timeline'],
      },
    ],
  },
  AI_LITERACY_CLUSTER,
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
