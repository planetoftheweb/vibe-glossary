/**
 * AI literacy: the words you read in every AI launch post, model card, and
 * vendor doc, translated for vibe coders. Once you can name a token, a
 * tool call, an embedding, or a system prompt, you can read AI papers and
 * pricing pages without bluffing AND tell your AI exactly what you want.
 *
 * Voice: friend explaining over coffee. Not a textbook. Spell out every
 * acronym the first time. No em dashes anywhere.
 *
 * `talkToAi` shape:
 *   - starter: generic, fillable prompt with [brackets]. Tells the AI to
 *     ask the user 3-5 focused questions before doing anything, and to
 *     push back if a request seems off. THIS is what they copy.
 *   - example: a worked, real-world version so they see what a
 *     filled-in starter actually looks like.
 *
 * `mnemonic`: the one line they keep when they forget the rest.
 */

export const AI_LITERACY_CLUSTER = {
  id: 'ai-literacy',
  title: 'AI literacy',
  summary:
    'LLMs, tokens, prompts, agents, tools, RAG, MCP. The vocabulary that lets you read an AI release post, pick the right model for a job, and tell your AI exactly how to behave.',
  topics: [
    {
      id: 'llm',
      title: 'LLM (Large Language Model)',
      summary:
        'A neural network trained on a huge amount of text that, given some words, predicts the next word over and over. That is the whole trick. Everything else (chat, code, agents) is a loop on top.',
      details:
        'A Large Language Model is, at its core, a very fancy autocomplete. You give it some text (the prompt), it predicts the most likely next chunk of text, then the next, then the next, until it decides it is done. GPT, Claude, Gemini, Llama, Mistral are all LLMs. They differ in size, training data, and the polish on top, but the core loop is the same.\n\nWhat makes them feel magic is scale. Trained on most of the public internet, code, books, and conversations, they have absorbed enough patterns that "predict the next word" looks like reasoning, writing, summarizing, translating, and coding. They are not actually reasoning the way a person does, but the pattern matching is good enough to be useful for most everyday work.\n\nThe trap: people treat them as oracles. They are not. They are confident, fluent, and frequently wrong. The vibe coder superpower is knowing when to trust the output (style, scaffolding, refactors with tests) and when to verify (facts, math, security, anything load-bearing).',
      comparison:
        'Search returns documents. An LLM generates new text that sounds plausible. Search retrieves; an LLM composes.',
      vibeTip:
        'Pick the smallest model that does the job. A frontier model for autocomplete in your editor is overkill, slow, and expensive.',
      talkToAi: {
        starter:
          'Help me pick the right LLM for [task]. Before recommending, ask me: 1) what the task is and how often it runs, 2) the latency and cost budget, 3) whether the data is sensitive (so we may need a private deployment), 4) whether I need tool use, vision, or long context. Then recommend a primary model and a cheaper fallback, with the reasoning. Push back if I am over-spec\'ing.',
        example:
          'Help me pick an LLM to summarize 200 customer support tickets per day into a daily digest. Latency is fine up to 30 seconds per summary. Budget is under $20/month. Data has PII so prefer providers with no-training options. No tool use needed, no vision, tickets are under 4k tokens.',
      },
      mnemonic:
        'An LLM predicts the next chunk of text, very well. Treat it as a fluent intern, not an oracle.',
      relatedGlossaryIds: [],
    },
    {
      id: 'tokens',
      title: 'Tokens and the context window',
      summary:
        'LLMs do not see characters or words; they see tokens, which are roughly 3 to 4 characters of English. The context window is the maximum number of tokens (input + output) the model can hold at once.',
      details:
        'A token is the unit an LLM actually thinks in. The word "tokenization" might be 4 tokens. The word "the" is 1. Code, emoji, and non-English text usually cost more tokens per character. As a rough rule, 1 token is about 0.75 English words, or 100 tokens is about 75 words, or one page of text is around 500 tokens.\n\nThe context window is the maximum number of tokens the model can pay attention to in a single call. That budget includes your system prompt, the chat history, the documents you attached, AND the response the model is about to write. Hit the limit and the oldest stuff falls off (or the call errors). Frontier models in 2026 routinely advertise 200k to 2M token windows, but useful recall often drops well before the advertised max.\n\nTokens are also how you get billed. Almost every API charges per input token and per output token, with output usually 3 to 5 times more expensive. "Caching" the system prompt or a long document can drop input cost dramatically. The vibe coder move is to track tokens like a database tracks rows: you cannot optimize what you cannot count.',
      comparison:
        'Tokens are the words the model sees. Context window is the page it can read at once. Both cost money.',
      vibeTip:
        'Count tokens before you blame the model. "Why is this slow and expensive?" is almost always "you sent it 50k tokens of unfiltered context".',
      talkToAi: {
        starter:
          'Audit token use in [feature or prompt]. Before recommending changes, ask me: 1) the model and its context window, 2) what currently goes into every call (system prompt, history, retrieved docs, user message), 3) the cost or latency I am unhappy with. Then estimate tokens per call, point out the biggest wasters (long system prompts repeated every turn, full docs instead of relevant snippets, never-trimmed history), and propose an order of fixes ranked by impact vs effort.',
        example:
          'Audit token use in our customer support chat. Model is Claude Sonnet 4.5 with a 200k window. Each call sends a 4k-token system prompt, full chat history (no trim), and the 3 most relevant help articles (sometimes 30k tokens each). Latency is 12 seconds and a single chat costs $0.40. Help me cut that in half.',
      },
      mnemonic:
        'Tokens are the model\'s currency. Context window is its short-term memory budget. Spend both deliberately.',
      relatedGlossaryIds: [],
    },
    {
      id: 'prompts-roles',
      title: 'System, user, and assistant: the three roles',
      summary:
        'Every LLM API takes a list of messages, each tagged with a role. System sets the rules, user is what the human typed, assistant is what the model said. The model writes the next assistant message.',
      details:
        'A chat with an LLM is just a list of messages. Each message has a role and content. The system role is your instructions to the model: who it is, the rules it must follow, the tools it has, the output format you want. The user role is the human input. The assistant role is what the model produced on previous turns. You send the whole list every time, and the model writes the next assistant message.\n\nFew-shot prompting is a trick where you put example user/assistant pairs in the message list before the real user turn. The model picks up the pattern. "Here are 3 examples of input and output, now do the next one" works astonishingly well for structured tasks.\n\nA common beginner mistake is jamming everything into one giant user message. Putting the rules in system, the examples as user/assistant pairs, and the actual question in the final user message produces sharper, more consistent answers. Models are also trained to weight system instructions slightly higher than user instructions, which matters when a user tries to override your guardrails.',
      comparison:
        'System = the contract. User = what the human said. Assistant = what the model said. Few-shot = examples baked into the message list.',
      vibeTip:
        'Always put format rules ("respond as JSON with keys X, Y, Z") in the system message, not the user message. They stick better.',
      talkToAi: {
        starter:
          'Refactor the prompt for [feature]. Before suggesting wording, ask me: 1) the goal of the prompt and what "good" looks like, 2) the current system, user, and any few-shot messages, 3) cases where the model goes off the rails today. Then propose a rewrite that splits rules into system, examples into a few-shot block, and the actual task into a tight user message. Explain each split.',
        example:
          'Refactor our "extract action items from a meeting transcript" prompt. Today it is one giant user message with rules and the transcript jammed together. Goal: return a JSON array of {assignee, action, dueDate or null}. Current failure: it sometimes answers in prose. Split into system (rules + JSON schema), user (the transcript only), and one few-shot pair.',
      },
      mnemonic:
        'System is the contract. User is the question. Assistant is the past answers. Few-shot is the cheat sheet.',
      relatedGlossaryIds: [],
    },
    {
      id: 'sampling',
      title: 'Temperature, top-p, and determinism',
      summary:
        'Sampling settings control how creative or repetitive the model is. Temperature 0 is "pick the most likely token every time". Higher numbers add randomness. Top-p limits the pool to the most probable tokens.',
      details:
        'When the model picks the next token, it does not pick the single best one. It samples from a probability distribution over thousands of candidates. Sampling parameters shape that distribution.\n\nTemperature is the most common knob. Range is roughly 0 to 2. Temperature 0 is greedy: pick the most likely token every time. Temperature 0.7 is the default for chat: a healthy mix of consistency and variety. Temperature 1.5 is "be wild". For code, structured extraction, or anything you want to be reproducible, use 0 or close to it. For brainstorming, copy variants, or characters, push it up.\n\nTop-p (also called nucleus sampling) is a different lever. It says "only sample from the smallest set of tokens whose combined probability is at least p". Top-p 0.1 keeps the model on the very safest tokens. Top-p 0.95 lets it explore. Top-p and temperature interact, so most teams pick one and leave the other at default.\n\nDeterminism note: even at temperature 0, identical prompts can give different outputs across model versions, providers, or backend changes. Pin the model version and treat outputs as "almost reproducible", not "identical".',
      comparison:
        'Temperature = randomness dial. Top-p = how big the candidate pool is. Both control "how creative do I want this answer to be?".',
      vibeTip:
        'Default to temperature 0 for anything where the answer should be the same tomorrow as today. Only crank it up for genuinely creative tasks.',
      talkToAi: {
        starter:
          'Tune sampling for [feature]. Before recommending settings, ask me: 1) what the call does and whether the same input should give the same output, 2) examples of outputs that are too repetitive or too wild, 3) the current temperature and top-p. Then recommend new settings, explain the trade-off, and call out any per-call overrides (e.g. brainstorm at 0.9, extract structured data at 0).',
        example:
          'Tune sampling for our marketing copy generator. Same product brief should give variety, not the exact same headline. Today temperature is 0.2 and outputs feel repetitive. Recommend new defaults and any per-section overrides (headline vs body vs CTA).',
      },
      mnemonic:
        'Low temperature for code and facts. Higher temperature for ideas and copy. Pick one knob, leave the others alone.',
      relatedGlossaryIds: [],
    },
    {
      id: 'multimodal',
      title: 'Multimodal models',
      summary:
        'A multimodal model handles more than just text. Vision models read images. Audio models hear speech. Some handle video. The point is one API call can mix words, pictures, and sound.',
      details:
        'Until 2023 most LLMs were text in, text out. Multimodal models broke that wall. GPT-4o, Claude with vision, Gemini 2.5, and similar can take an image plus text in the same prompt. Some take audio. A few take video frames or generate images and audio as output.\n\nIn practice, "multimodal" usually means "vision-language": you can attach a screenshot, a photo of a whiteboard, a chart, or a UI mockup and ask the model about it. This is the killer feature for design feedback ("does this layout work on mobile?"), bug reports ("here is a screenshot of the error"), and front-end coding ("turn this Figma frame into JSX").\n\nAudio in is becoming standard for voice agents and transcription. Audio out (speech generation) is its own category, often a separate model behind the same provider. Image generation and video generation are usually different models entirely (DALL-E, Imagen, Sora, Veo, Midjourney) even when the same vendor offers them.\n\nCost note: images cost a surprising number of tokens. A high-res screenshot can easily be 1,000 to 2,000 tokens before you write a single word.',
      comparison:
        'Text model = words in, words out. Multimodal = words plus images (and sometimes audio or video) in the same call.',
      vibeTip:
        'Screenshots beat descriptions. "Here is a screenshot of the bug" gives the model 100x more context than "the dropdown is misaligned".',
      talkToAi: {
        starter:
          'Help me use a multimodal model for [task]. Before recommending an approach, ask me: 1) the input types (text, screenshots, photos, audio, video), 2) the output I need (text, JSON, an image, audio), 3) the volume and budget. Then recommend a model, the prompt structure for mixing image and text, and any preprocessing tricks (resize, crop, OCR-first) that would cut tokens or improve accuracy.',
        example:
          'Build a tool that takes a screenshot of a bug report and returns a Linear ticket draft (title, repro steps, expected vs actual). Volume is around 50 per day. Budget is under $30/month. Use a vision-capable model, downscale screenshots to max 1024px, and produce JSON I can post straight to the Linear API.',
      },
      mnemonic:
        'Multimodal = more than text. Show, do not just tell. Images cost real tokens.',
      relatedGlossaryIds: ['lightbox', 'avatar'],
    },
    {
      id: 'moe',
      title: 'MoE (Mixture of Experts)',
      summary:
        'A model architecture where the network is split into many "expert" sub-networks and a small router picks 1 or 2 experts to handle each token. You get a huge total model that runs nearly as fast as a small one.',
      details:
        'A regular dense LLM uses every parameter for every token. A 70-billion parameter dense model does 70 billion parameters of math per token. That is slow and expensive.\n\nMixture of Experts splits the model into many specialist sub-networks (the "experts"), and adds a tiny router that, for each token, picks the top 1 or 2 experts to actually run. So a 200-billion parameter MoE with 8 experts and top-2 routing only does about 50 billion parameters of work per token, even though the total model is much bigger. You get the knowledge of a huge model at the speed of a much smaller one.\n\nMixtral 8x7B was the first widely-known open MoE. GPT-4, Gemini, DeepSeek-V3, Llama 4, and most frontier models in 2026 are MoE under the hood. The trade-off is memory (you still have to load all experts on the GPU) and routing weirdness (the router can be uneven, sending most traffic to a few experts and leaving others idle).\n\nFor a vibe coder, MoE matters mostly as context for "why is this 600B model fast and cheap?". The shorthand answer is: it is not actually running 600B per token.',
      comparison:
        'Dense model = whole brain fires for every token. MoE = router picks 1-2 experts per token. Same knowledge, less work.',
      vibeTip:
        'When a vendor brags about parameter count, check whether it is dense or MoE. "100B dense" and "100B MoE active" are very different speeds and prices.',
      talkToAi: {
        starter:
          'Explain the trade-offs of using [MoE model] vs [dense model] for [my use case]. Before answering, ask me: 1) the task type and typical input/output length, 2) whether I am self-hosting or using a hosted API, 3) the latency and cost targets. Then compare on speed, cost per million tokens, recall on long context, fine-tuning options, and any known routing quirks.',
        example:
          'Compare DeepSeek-V3 (MoE) vs Llama 3.1 70B (dense) for code completion in our IDE. Self-hosted on 2 H100s. Latency target under 200ms for short completions. Budget: existing hardware. Tell me which to deploy and why.',
      },
      mnemonic:
        'MoE: many experts, only 1-2 fire per token. Big total brain, small per-token bill.',
      relatedGlossaryIds: [],
    },
    {
      id: 'agents',
      title: 'AI agents',
      summary:
        'An agent is an LLM in a loop that can take actions in the world (search, run code, hit APIs, edit files), see the result, and decide the next step until the task is done.',
      details:
        'A regular chatbot answers your question and stops. An agent gets a goal, decides on a step, takes that step (search the web, run a query, edit a file, call an API), reads the result, decides the next step, and keeps going until it thinks the goal is done or it gives up.\n\nThe loop usually looks like: think (what should I do next?), act (call a tool), observe (read the tool result), repeat. Cursor agents, Claude Code, Devin, GitHub Copilot agent, and Manus are agents. So is the assistant writing this answer, when it reads files and runs commands.\n\nAgents are powerful and dangerous in the same way. Powerful: they can do real work end-to-end. Dangerous: they can also delete the wrong file, run up an API bill, or get stuck in a loop. The good ones have guardrails baked in (a max-step budget, a kill switch, requiring approval for destructive actions, a clear scope of which tools they can use). When you hand an agent a task, you are choosing between speed and oversight; pick deliberately.\n\nAgents are NOT magic. They are the same LLM you used yesterday, plus tool calling, plus a loop. If your prompts have been mediocre, your agent will be mediocre and faster.',
      comparison:
        'Chatbot = one turn, you do the next step. Agent = the model takes the next step itself, and the next, and the next.',
      vibeTip:
        'Give every agent a step budget ("you have at most 20 tool calls") and a clear stop condition. Otherwise it will burn money exploring.',
      talkToAi: {
        starter:
          'Design an agent for [task]. Before suggesting an architecture, ask me: 1) the goal in one sentence and the success signal, 2) the tools or APIs the agent should be allowed to call, 3) the riskiest action (delete, send email, charge card) and how I want it gated, 4) the step or cost budget. Then propose the system prompt, the tool list with schemas, the stop condition, and the human-approval points. Push back on tools that look risky for the goal.',
        example:
          'Design an agent that triages our GitHub issues every morning. Goal: label, prioritize, and assign new issues from the last 24 hours. Tools: gh CLI for read, gh CLI for label/assign (no comment), Linear MCP for cross-link. Riskiest action: assigning a person, gate behind a dry-run mode for the first week. Budget: 50 tool calls per run. Write the system prompt and the tool schemas.',
      },
      mnemonic:
        'Agent = LLM + tools + a loop. Always set a step budget and a kill switch.',
      relatedGlossaryIds: [],
    },
    {
      id: 'tool-calling',
      title: 'Tool calling (function calling)',
      summary:
        'A protocol where you tell the LLM "here are functions you can call, with these names, arguments, and descriptions". The model decides when to call one and writes the arguments as JSON. Your code runs the function and feeds the result back.',
      details:
        'Tool calling (also called function calling) is the bridge between an LLM and the rest of your software. You declare the tools available: each one has a name, a description ("look up the weather for a city"), and a JSON schema for its arguments. You send those declarations along with the user message. The model decides whether to answer directly or to call a tool, and if it calls a tool, it produces the function name and a JSON arguments blob.\n\nYour code parses that, runs the actual function (hit the weather API, query the database, edit the file), and sends the result back as a "tool" message. The model then either calls another tool or writes the final answer.\n\nThis is how agents do things. It is also how vendor-specific features work: Claude\'s computer use, OpenAI\'s code interpreter, Gemini\'s search grounding. They are all tool calls under the hood, with the tool schema written by the vendor.\n\nThe craft is in tool design. Good tools have one job, a clear description (the model uses the description to decide when to call), and a small argument surface. A "do_anything" tool is a trap; the model will use it for everything and never reach for the better-fitting tools.',
      comparison:
        'Plain LLM = answers from text only. Tool calling = the model can ask your code to do things, then continue with the result.',
      vibeTip:
        'Write tool descriptions like you are coaching a junior dev. "Use this when X. Do NOT use it for Y." pays off in fewer wrong calls.',
      talkToAi: {
        starter:
          'Design the tool schema for [feature or agent]. Before writing JSON, ask me: 1) the tasks the agent should be able to do end-to-end, 2) the existing functions or APIs we already have, 3) any actions that must require a confirmation step. Then propose a tool list (3-7 tools, not 30), each with name, one-line description, JSON arg schema, and a "use this when" / "do NOT use this when" pair. Flag any tool that overlaps with another.',
        example:
          'Design tools for an agent that helps me triage Sentry errors. Tasks: list new errors today, fetch one error\'s stack trace, search our codebase for the failing function, draft a fix as a PR. Confirmation needed before opening any PR. Use the existing Sentry REST API, the gh CLI, and our internal codeSearch() function.',
      },
      mnemonic:
        'Tool calling = the model picks the function and writes the JSON. Your code runs it. Few clear tools beat many vague ones.',
      relatedGlossaryIds: [],
    },
    {
      id: 'mcp',
      title: 'MCP (Model Context Protocol)',
      summary:
        'An open standard from Anthropic that lets any LLM client (Claude, Cursor, ChatGPT, Codex, IDEs) connect to any tool server (GitHub, Linear, Postgres, your own) using one shared protocol, instead of every vendor reinventing the wheel.',
      details:
        'Before MCP, every AI assistant needed custom plumbing for every external system. ChatGPT had its own plugin format, Claude had tools, Cursor had its own approach, your IDE had something else. MCP (Model Context Protocol), introduced by Anthropic in late 2024 and adopted across the industry through 2025 and 2026, is a USB-C-style standard that fixes that.\n\nThere are two sides. The MCP server exposes capabilities: tools (functions the model can call), resources (read-only data the model can fetch), and prompts (prebuilt prompt templates the user can pick). The MCP client (the LLM-facing app: Claude, Cursor, ChatGPT, Codex) discovers what the server offers and surfaces it to the model. One server, many clients. One client, many servers.\n\nFor a vibe coder, MCP is mostly invisible plumbing that finally works. Install the GitHub MCP server, the Linear MCP server, your database MCP server, and now any compatible AI tool can act on those systems without you wiring it up per app.\n\nWatch for: MCP servers run with your credentials and can do real damage. Read the tool list before you install one, and prefer official servers from the source vendor when you can.',
      comparison:
        'Before MCP: every AI app reinvented its own integration with every tool. With MCP: one shared protocol, plug-and-play.',
      vibeTip:
        'When you install a new MCP server, run it once and read what tools it exposes. "List repos" is friendly. "Delete repo, no confirm" is not.',
      talkToAi: {
        starter:
          'Help me set up MCP for [workflow]. Before recommending servers, ask me: 1) the systems I work in (GitHub, Linear, Notion, Postgres, custom APIs), 2) the LLM clients I use (Claude desktop, Cursor, ChatGPT, Codex), 3) the actions I want gated behind confirmation. Then recommend MCP servers (official first), the install steps, and a least-privilege scope for each one. Call out any server that exposes destructive actions without a confirm path.',
        example:
          'Set up MCP for my Cursor + Claude desktop workflow. I use GitHub, Linear, Postgres, and our internal docs in Notion. I want any "delete" action to require a yes/no prompt in chat. Recommend the servers, the config JSON for each client, and the env vars I need to set.',
      },
      mnemonic:
        'MCP = one protocol, many clients, many servers. The USB-C of AI tooling.',
      relatedGlossaryIds: [],
    },
    {
      id: 'rag',
      title: 'RAG (Retrieval-Augmented Generation)',
      summary:
        'A pattern where you search your own documents for relevant snippets, paste them into the prompt, and ask the LLM to answer using only that context. Lets a generic model answer specific questions about your data.',
      details:
        'An LLM only knows what it was trained on, plus what is in the prompt. Your private docs, the latest deploy notes, your customer\'s support history are not in the training data. RAG (Retrieval-Augmented Generation) is the workaround.\n\nThe pattern has two phases. Indexing: split your documents into chunks (a few hundred tokens each), turn each chunk into an embedding (a vector of numbers that captures meaning), and store the chunks plus their embeddings in a vector database (Pinecone, Weaviate, Postgres + pgvector, Turso, Chroma, Qdrant). Query: turn the user\'s question into an embedding, find the chunks closest in vector space, paste the top 3-10 into the prompt with the original question, and ask the model to answer using only that context.\n\nGood RAG is mostly retrieval craft, not LLM craft. The biggest wins come from chunking strategy (paragraph? heading section? sliding window?), hybrid search (combine vector similarity with keyword/BM25), reranking (pull 50, rerank with a small model, keep top 5), and metadata filters (only search docs from this project, this date range).\n\nWhen RAG fails, the answer is almost never "use a bigger model". It is almost always "the retriever did not surface the right chunk".',
      comparison:
        'Plain LLM = answers from training data only. RAG = "search my stuff first, then answer using what you found".',
      vibeTip:
        'Always log the retrieved chunks alongside the answer. When the model is wrong, you immediately see whether retrieval missed the chunk or the model misread it.',
      talkToAi: {
        starter:
          'Design RAG for [use case]. Before recommending a stack, ask me: 1) the source docs (where they live, how they update, total size), 2) the questions users will ask and how exact the answers must be, 3) latency and budget. Then recommend a chunking strategy, an embedding model, a vector store, a retrieval flow (hybrid? rerank?), and the prompt template. Call out the part most likely to be the bottleneck and how to measure it.',
        example:
          'Design RAG over our 800-page product help center for an in-app support chat. Docs are markdown in a GitHub repo, updated weekly. Questions are mostly how-to. Latency target under 3 seconds. Budget: prefer Postgres (we already have it) over a paid vector DB. Use OpenAI text-embedding-3-small, chunk by H2 with overlap, hybrid BM25 + vector, top-5 to the model.',
      },
      mnemonic:
        'RAG = retrieve relevant chunks, then generate. When it fails, fix retrieval before you blame the model.',
      relatedGlossaryIds: ['table'],
    },
    {
      id: 'fine-tuning',
      title: 'Fine-tuning vs prompting vs RAG',
      summary:
        'Three ways to make an LLM do what you want. Prompting: change the words you send. RAG: change the data you send. Fine-tuning: change the model itself by training it on your examples.',
      details:
        'When the model is not behaving the way you want, you have three escalating options.\n\nPrompting is always the first move. Better system prompt, few-shot examples, clearer role, output format. Free, instant, and good enough for most tasks. Try harder before reaching for the others.\n\nRAG (covered separately) is the answer when the model just does not know your data. Prompting cannot teach it your private docs; retrieval can.\n\nFine-tuning is the answer when prompting and RAG cannot get the style, format, or behavior consistent enough. You collect a few hundred to a few thousand input/output pairs, run a training job (provider-hosted: OpenAI, Anthropic via Bedrock, or self-hosted with LoRA on Llama), and you get a private model variant that behaves your way without long prompts. Pros: smaller prompts, faster, more consistent on the trained pattern. Cons: cost, slow iteration, you have to keep updating it as your data drifts, and the base model still does not know your private data (so you may still need RAG on top).\n\nThe order is almost always: prompt first, RAG when the issue is "it does not know", fine-tune when the issue is "it cannot consistently do". Skipping straight to fine-tuning is a common money sink.',
      comparison:
        'Prompt = change the words. RAG = change the data. Fine-tune = change the model. Try in that order.',
      vibeTip:
        'Before you fine-tune, write the 10 best prompt examples you can. Half the time, those examples as few-shot make fine-tuning unnecessary.',
      talkToAi: {
        starter:
          'Help me decide between prompting, RAG, and fine-tuning for [problem]. Before recommending, ask me: 1) what specifically the model gets wrong today (style, format, knowledge, reasoning), 2) how many high-quality input/output examples I have, 3) latency, cost, and privacy constraints. Then recommend the cheapest fix that would work, list the next escalation if it does not, and tell me what to measure.',
        example:
          'Our support agent answers correctly but in a wandering, multi-paragraph style. We want short, bulleted answers with a "next step" line. We have 200 example tickets with the ideal answer beside each. Latency must stay under 3s. Pick: better prompt, RAG, or fine-tune. Justify and tell me how to measure success.',
      },
      mnemonic:
        'Prompt before RAG, RAG before fine-tune. Fine-tuning is the last lever, not the first.',
      relatedGlossaryIds: [],
    },
    {
      id: 'hallucinations-evals',
      title: 'Hallucinations and evals',
      summary:
        'A hallucination is when the model confidently makes something up (a function, a citation, an API). Evals are the test suite for AI: a fixed set of inputs and graded outputs you re-run to catch regressions.',
      details:
        'A hallucination is the LLM confidently producing something that sounds right and is not. A function name that does not exist. A book that was never written. A legal citation invented out of thin air. It happens because the model is predicting plausible text, not retrieving facts. Plausible-sounding wrong is its native failure mode.\n\nThe vibe coder defenses, in order: 1) ground the model in real data via RAG so it has the right facts to copy from. 2) require sources or tool calls for any factual claim ("only answer using the provided context; if not present, say so"). 3) verify with code: run the function it suggested, check the API exists, compile the snippet. 4) keep a human in the loop for anything load-bearing.\n\nEvals are the discipline of measuring this. An eval is a fixed dataset of inputs paired with a way to grade the output: exact match, regex, an LLM-as-judge, or a human review. You run it on every prompt change, model change, and pipeline change, and you watch the metrics. If you change a prompt and the eval drops 10 points, you found out before the user did.\n\nWithout evals, you are flying blind. You will swap models because "this one feels better", ship a regression because "the new prompt seems clearer", and never know. Even a 30-example eval beats nothing.',
      comparison:
        'Hallucination = confident lie. Eval = regression test for AI. Hallucinations are the failure; evals are how you catch the failure shipping again.',
      vibeTip:
        'Build a 20-example eval before your second prompt change. The cost is one afternoon. The payoff is every future change.',
      talkToAi: {
        starter:
          'Help me set up evals for [LLM feature]. Before recommending a stack, ask me: 1) what success looks like (exact format, factual accuracy, tone), 2) examples of failures we have already seen (real outputs, not theoretical), 3) whether human review is acceptable for grading or it must be automated. Then propose 20-30 test cases that cover happy path, edge cases, and known failures, a grading method per case (exact match, regex, LLM-as-judge), and a script I can run on every prompt or model change.',
        example:
          'Set up evals for our "extract action items from a meeting transcript" feature. Output must be a JSON array of {assignee, action, dueDate}. Known failures: occasionally returns prose; sometimes invents an assignee name. Automated grading is required. Build 25 test cases (10 happy path, 10 edge cases including no action items and ambiguous dates, 5 from real failures), grade with JSON-schema validation + LLM-as-judge for content accuracy.',
      },
      mnemonic:
        'Hallucinations are the failure mode. Evals are the smoke detector. Build the detector before the next change.',
      relatedGlossaryIds: [],
    },
  ],
};
