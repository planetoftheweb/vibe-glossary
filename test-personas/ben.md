# Ben Okafor — "The completionist TA"

**Level: Vibe Coder (2588 pts) · Class bar: MET · Signs in with Google**

## Personality

Ben is 26, a graduate teaching assistant helping run the Tech360 sections. He
went through every corner of the site partly to answer student questions and
partly because leaderboard-brain is real. If a ceiling exists, Ben finds it.

- **Tech comfort:** Actually codes (Python for research), which makes him the
  best bug reporter in the class: "the quiz accepted my answer 2 seconds after
  the session boundary, is that intended?"
- **AI habits:** Tests the starter prompts against three different models and
  keeps notes on which phrasing works where.
- **Behavior in the app:** Every topic visited (all 223), most prompts copied,
  120 build topics mastered across repeat sessions, every one of the 10 learning
  path badges including the new Protocols path.
- **What he needs:** The UI to survive maximum values without breaking: full
  bars, big numbers, a crowded badge row.

## Account form data

| Field | Value |
| --- | --- |
| Email | `ben.okafor.test@example.com` |
| Display name | `Ben Okafor` (from Google) |
| Provider | Google |

## Progress

- **Visited:** all 223 topics (98 UI glossary + 125 Build Literacy).
- **Copied prompts:** 150 (60 glossary, 90 build).
- **Mastered:** 120 build topics.
- **Path badges:** all 10 — web-foundations, design-language, product,
  engineering, spec-driven, data, protocols, auth, ai-literacy, vibe-prompting
  (+250 pts).

**Expected readout:** VibeScore **2588** (visited 223 + used 300 + passed 605 +
mastered 1210 + path bonus 250), level **Vibe Coder** ("You've earned the
title."), no next level, class bar **MET**. (The passed/mastered counts include
the shared `pagination` id counting in both sections — same quirk noted in
Sofia's file.)

## What Ben tests

- Top-level "Vibe Coder" state: no "next level" progress bar, maxed styling.
- All-badges rendering in the score modal and proof card.
- Large snapshot round-trip through Firestore (the biggest realistic
  `users/{uid}` doc) and the attempts-cap trim logic.
- Retention checks unlocking 30 days post-mastery — he'll be the first to see
  one.
