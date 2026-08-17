# Dana Whitfield — "The curious lurker"

**Level: Lurker (0 pts) · Class bar: not met · Signs in with email**

## Personality

Dana is 34, a marketing manager at a mid-size SaaS company in Austin. She keeps
hearing "vibe coding" on LinkedIn and wants to build a landing page for a side
project without waiting on her company's dev team. She's smart, slightly
intimidated, and convinced everyone else already knows this stuff.

- **Tech comfort:** Confident in Canva, Notion, and spreadsheets. Has never
  opened a code editor. Thinks HTML and "the code" are the same thing.
- **AI habits:** Uses ChatGPT for copywriting daily but has never asked an AI to
  build anything. Prompts are long, apologetic paragraphs.
- **Behavior in the app:** Created an account before doing anything else (she
  likes to be "set up properly"). Hasn't opened a single topic yet.
- **What she needs:** The welcome screen and empty states to do their job. She is
  the "no screen may ever render as a bare blank" test case.

## Account form data

| Field | Value |
| --- | --- |
| Email | `dana.whitfield.test@example.com` |
| Password | `vibetest123!` |
| Display name | (none — email signup has no name field) |
| Provider | Email/password |

## Progress

Nothing. Zero topics visited, zero prompts copied, zero quizzes, zero badges.

**Expected readout:** VibeScore **0**, level **Lurker** ("Just looking around.
Welcome."), 50 pts to Scroller, class bar **not met** (neither 200 pts nor the
Vibe prompting badge). Every progress bar empty; the score modal shows all
zeros; her cloud doc backs up an empty snapshot.

## What Dana tests

- Signup with the email form (the flow that surfaced the
  `auth/configuration-not-found` bug).
- Empty-state rendering across the app for a signed-in user.
- Cloud sync writing (and later restoring) an all-empty snapshot without errors.
