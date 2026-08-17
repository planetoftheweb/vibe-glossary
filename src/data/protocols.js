/**
 * Protocols and APIs: how computers actually talk to each other. HTTP,
 * DNS, SMTP, ports, APIs, real-time connections. The plumbing words that
 * show up in every error message and every AI conversation about backends.
 *
 * Voice rules match buildLiteracy.js:
 *   - friend explaining over coffee, not a networking textbook
 *   - spell out every acronym the first time
 *   - one new idea per paragraph in `details`
 *   - no em dashes anywhere
 */

export const PROTOCOLS_CLUSTER = {
  id: 'protocols',
  title: 'Protocols and APIs',
  summary:
    'How computers talk: protocols, HTTP, DNS, SMTP, ports, APIs, real-time. The plumbing behind every "failed to fetch" error and every integration your AI wires up.',
  topics: [
    {
      id: 'what-is-a-protocol',
      title: 'What a protocol actually is',
      summary:
        'A protocol is a set of rules two computers agree on before they talk: who speaks first, what the messages look like, what happens on error. HTTP is the protocol of the web, SMTP is the protocol of email, MCP is a protocol for AI tools.',
      details:
        'A protocol is an agreement about how a conversation works. Think of a phone call: you say "hello", they say "hello", you take turns, you say "bye" before hanging up. Nobody mails you those rules, but if someone breaks them (answers the phone silent, hangs up mid-sentence) the conversation fails. Computer protocols are the same rules written down precisely enough that machines from different companies, written in different languages, can still understand each other.\n\nEach protocol owns one job. HTTP (HyperText Transfer Protocol) moves web pages and API data. SMTP (Simple Mail Transfer Protocol) moves email between mail servers. DNS (Domain Name System) turns names into addresses. WebSocket keeps a two-way line open for live updates. MCP (Model Context Protocol) lets AI assistants talk to tools. Different jobs, same idea: rules both sides follow so the messages make sense.\n\nWhy you care as a vibe coder: protocols are how you decode error messages and pick the right tool. "CORS error" is an HTTP rule being enforced. "Connection refused on port 5432" means the database protocol had nobody listening. When your AI says "we could use a webhook or a WebSocket here", it is offering you two protocols with different trade-offs, and knowing the words lets you actually choose.',
      comparison:
        'Protocol = the rules of the conversation. API = a specific menu one service offers using those rules. HTTP is a protocol; the GitHub API is a service you reach over it.',
      vibeTip:
        'When an error message names a protocol (HTTP 403, SMTP relay denied, DNS not found), paste the exact message to your AI and ask "which layer is failing and how do I check it?". Naming the protocol turns a mystery into a checklist.',
      talkToAi: {
        starter:
          'Explain the protocols involved when [a user action in my app] happens, end to end. Before explaining, ask me: 1) what the app is built with (frontend framework, backend, database), 2) whether it is deployed or running locally, 3) which part feels like a black box to me. Then walk the path step by step (DNS, HTTP, database, email, whatever applies), one protocol per step, in plain language, and point out where things most often break.',
        example:
          'Explain the protocols involved when a user submits the signup form in my Next.js + Supabase app deployed on Vercel, up to the moment they receive the confirmation email. Walk it step by step and tell me where signups most often silently fail.',
      },
      mnemonic:
        'A protocol is the rules of a conversation. One job per protocol, and every error message names the one that broke.',
      relatedGlossaryIds: [],
    },
    {
      id: 'http-https',
      title: 'HTTP and HTTPS: request, response, status code',
      summary:
        'HTTP is the web\'s request and response protocol: the browser asks (GET this page, POST this form), the server answers with a status code (200 fine, 404 missing, 500 broken). HTTPS is the same thing wrapped in encryption.',
      details:
        'HTTP (HyperText Transfer Protocol) is a polite question-and-answer game. The client (your browser, your app, your AI\'s fetch call) sends a request: a method, a URL, some headers, and sometimes a body. The server sends back a response: a status code, headers, and usually a body (the page, the JSON, the image). Then the exchange is over. HTTP has no memory between requests, which is why cookies and tokens exist to say "it is still me".\n\nThe methods are verbs. GET means "give me this" and should never change anything. POST means "here is new data" (submitting a form, creating a record). PUT and PATCH mean "update this". DELETE means what it says. Status codes are the server\'s one-line verdict: 200 means success, 301 means it moved, 400 means your request was malformed, 401 means log in first, 403 means logged in but not allowed, 404 means not found, and anything starting with 5 means the server itself broke.\n\nHTTPS is HTTP with the S of "secure": the same requests and responses, encrypted with TLS (Transport Layer Security) so nobody between you and the server can read or tamper with them. The padlock in the browser means the connection is encrypted and the certificate matches the domain. Every real site uses HTTPS now, and browsers punish plain HTTP, so treat it as the default, not an upgrade.',
      comparison:
        'HTTP = the conversation. HTTPS = the same conversation in a sealed envelope. Status codes: 2xx worked, 3xx moved, 4xx your fault, 5xx their fault.',
      vibeTip:
        'When a fetch fails, tell your AI the method, URL, and status code ("POST /api/orders returns 401"). Those three facts usually contain the whole diagnosis; "the API is broken" contains none of it.',
      talkToAi: {
        starter:
          'Help me debug a failing HTTP request in [my app]. Before touching code, ask me: 1) the method and URL, 2) the status code and any response body, 3) whether it works in another context (curl, Postman, production vs local), 4) whether auth is involved. Then explain what that status code means in this situation, list the two or three most likely causes in order, and show me how to confirm each one before changing any code.',
        example:
          'Debug this: my React app calls POST https://api.myapp.com/orders and gets a 403, but the same request works in Postman with the same token. Ask me what you need, then list likely causes in order and how to confirm each.',
      },
      mnemonic:
        'Ask with a verb, answer with a number. 2xx good, 4xx you, 5xx them. HTTPS is the same talk in a sealed envelope.',
      relatedGlossaryIds: ['alert'],
    },
    {
      id: 'dns',
      title: 'DNS: how a name becomes an address',
      summary:
        'DNS (Domain Name System) is the internet\'s phone book. You type myapp.com, DNS looks up the IP address of the server behind it, and only then can the real conversation start. When DNS is wrong, the site is "down" even though the server is fine.',
      details:
        'Computers find each other by IP address (a number like 76.76.21.21), but humans remember names. DNS (Domain Name System) is the lookup layer in between: before your browser can talk to myapp.com, it asks DNS "what is the address for this name?" and gets back an IP. That lookup happens billions of times a day and is cached at every level (your browser, your machine, your internet provider) so it feels instant.\n\nThe records are just typed entries in a zone you control at your domain registrar or DNS host. An A record says "this name points to this IP address". A CNAME record says "this name is an alias for that other name" (how www.myapp.com points to myapp.com, or how your custom domain points at Vercel or Firebase). MX records say "email for this domain goes to these mail servers". TXT records hold small proofs, like the verification strings services ask you to add.\n\nThe classic gotcha is propagation. When you change a DNS record, the old value lives on in caches until its TTL (time to live) runs out, so some people see the new site while you still see the old one, or the reverse. That is why "I changed the domain and now it is broken" is usually not broken, just cached. Check with an online DNS lookup tool before panicking, and wait out the TTL before debugging anything else.',
      comparison:
        'DNS = name to address. A record = points at an IP. CNAME = alias for another name. MX = where email goes. If the name will not resolve, nothing else gets a chance to fail.',
      vibeTip:
        'Connecting a custom domain to Vercel, Firebase, or any host is 90% "add these DNS records at your registrar". Paste the host\'s instructions and your registrar\'s screen to your AI and ask it to map one onto the other; it is a translation task, not a technical one.',
      talkToAi: {
        starter:
          'Help me point [my domain] at [my hosting provider]. Before giving steps, ask me: 1) where the domain is registered (GoDaddy, Namecheap, Cloudflare, etc.), 2) where the site is hosted, 3) whether I want the bare domain, www, or both, 4) whether email already runs on this domain (so we do not break MX records). Then list the exact records to add or change, what each one does in one sentence, and how to verify the change has propagated.',
        example:
          'Help me point rayteaches.com (registered at Namecheap) at my Firebase Hosting site. I want both the bare domain and www to work, and Google Workspace email on this domain must keep working. List the exact records and how to check propagation.',
      },
      mnemonic:
        'DNS is the phone book: name in, address out. Changes take time to spread, so "broken after a DNS change" usually means "cached".',
      relatedGlossaryIds: [],
    },
    {
      id: 'ip-ports-localhost',
      title: 'IP addresses, ports, and localhost:3000',
      summary:
        'An IP address says which machine; a port says which program on that machine. localhost is your own computer, and :3000 is the door your dev server is listening behind. "Port already in use" means two programs want the same door.',
      details:
        'An IP address identifies a machine on a network, but one machine runs many programs that all want network conversations. Ports solve that: every network program listens on a numbered door (0 to 65535), and a connection is always "address plus port". The web has customary doors: 80 for HTTP, 443 for HTTPS, which is why you never type them. Databases and dev tools use theirs: 5432 for Postgres, 3306 for MySQL, 3000 or 5173 for dev servers.\n\nlocalhost (also written 127.0.0.1) is a name every computer has for itself. When you run a dev server and open http://localhost:3000, the browser is talking to a program on your own machine through the same protocol stack a real website uses, just without leaving the building. That is the whole magic of local development: real HTTP, zero internet.\n\nTwo errors become obvious once you know the words. "Port 3000 already in use" means some other process is still holding that door, usually a dev server you forgot about; kill it or use another port. "Connection refused" means nothing is listening at that address and port at all: the server is not running, or it is running on a different port than the one you are calling. Neither error is mysterious; both are just "who is at which door".',
      comparison:
        'IP address = which building. Port = which apartment. localhost = your own building. localhost:3000 = apartment 3000 in your own building.',
      vibeTip:
        'When two projects fight over a port, do not play whack-a-mole. Ask your AI "find what is listening on port 3000 and kill it" (it will use lsof or netstat), or just pin each project to its own port in its config.',
      talkToAi: {
        starter:
          'My local dev setup has a port problem: [describe the symptom]. Before fixing, ask me: 1) what should be running (dev server, database, API), 2) the exact error text, 3) my operating system. Then show me how to list what is listening on the ports involved, identify the stray process, and either free the port or move one service to a different port permanently in config.',
        example:
          'My Vite dev server says "Port 5173 is in use" every morning even though I closed everything yesterday. I am on macOS. Show me how to find what is holding 5173, kill it, and set this project to always use 5174 instead.',
      },
      mnemonic:
        'Address = which machine, port = which program. localhost is your own machine. "Refused" means nobody is at that door.',
      relatedGlossaryIds: [],
    },
    {
      id: 'smtp-email',
      title: 'SMTP and email: why apps use an email service',
      summary:
        'SMTP (Simple Mail Transfer Protocol) is how email moves between mail servers. IMAP and POP are how your inbox app reads it. Apps almost never speak SMTP themselves; they call an email service (Resend, SendGrid, Postmark) that handles delivery and reputation.',
      details:
        'Email is three protocols wearing one trenchcoat. SMTP (Simple Mail Transfer Protocol) is the sending side: your mail server talks SMTP to their mail server to hand the message over. IMAP (Internet Message Access Protocol) is the reading side your mail app uses, keeping messages on the server so every device sees the same inbox. POP (Post Office Protocol) is the older reading style that downloads messages to one device. When people say "email protocol" they almost always mean SMTP.\n\nHere is the part that matters for your app: you can speak raw SMTP, but you should not. Mail providers judge senders by reputation, and mail sent from a random server fails silently into spam. Domains prove they are legitimate senders with special DNS records: SPF (Sender Policy Framework) lists who may send for your domain, and DKIM (DomainKeys Identified Mail) cryptographically signs each message. Getting all of that right, and keeping your sending reputation clean, is a full-time job.\n\nSo apps outsource it. Services like Resend, SendGrid, Postmark, and Amazon SES give you a normal HTTPS API: you POST "send this message to this address" with an API key, and they handle SMTP delivery, reputation, retries, and bounce tracking. Your job shrinks to adding a few DNS records they give you (that is the SPF and DKIM setup) and calling their API. When a vibe coder says "add email to my app", this is what that actually means.',
      comparison:
        'SMTP = sending between servers. IMAP/POP = your inbox app reading. Email service (Resend, SendGrid) = the API you actually call so you never speak SMTP yourself.',
      vibeTip:
        'Ask your AI for "transactional email via Resend (or Postmark) with the DNS records I need", not "make my app send email with SMTP". The first gets you deliverable email in an afternoon; the second gets you a spam-folder science project.',
      talkToAi: {
        starter:
          'Add transactional email to [my app]. Before writing code, ask me: 1) what emails I need (welcome, password reset, receipts, notifications), 2) my stack and where it is deployed, 3) whether I own a domain to send from, 4) any provider preference or budget. Then recommend one email service with a reason, list the DNS records I will need to add in plain language, and implement one email end to end with error handling for failed sends.',
        example:
          'Add transactional email to my Next.js app on Vercel: welcome email on signup and password reset. I own rayteaches.com. Recommend a provider (I have no preference, low volume), tell me the DNS records in plain language, and implement the welcome email end to end.',
      },
      mnemonic:
        'SMTP sends, IMAP reads, and your app should call an email API instead of speaking either one.',
      relatedGlossaryIds: ['toast'],
    },
    {
      id: 'what-is-an-api',
      title: 'What an API actually is',
      summary:
        'An API (Application Programming Interface) is the menu a service offers to programs: the exact requests you may make and the exact answers you get back. "Use the Stripe API" means "talk to Stripe\'s servers through their published menu instead of their website".',
      details:
        'An API (Application Programming Interface) is a service\'s front door for programs instead of people. The restaurant analogy holds up: the menu tells you what you can order and in what form it arrives; you do not walk into the kitchen. GitHub has a website for humans and an API for programs, and both reach the same data. When your app "integrates with" Stripe, OpenAI, or Google Maps, it is sending HTTP requests to their API and reading the JSON that comes back.\n\nThe menu items are endpoints: URLs that each do one thing. GET /customers lists customers, POST /customers creates one, GET /customers/42 fetches that specific customer. Requests usually carry an API key, a secret string that identifies your app, meters your usage, and gets you cut off if you leak it (which is why keys live in environment variables, never in frontend code). The documentation is the menu in written form, and the difference between a smooth integration and a painful one is usually how good those docs are.\n\nTwo more words complete the picture. Your own app has an API too: the /api routes your frontend calls on your backend are exactly the same idea, a menu you designed. And the shapes of API come in styles (REST, GraphQL, remote procedure calls), which the Backend and data cluster covers under API styles. Same concept every time: a published contract saying "ask like this, and I will answer like that".',
      comparison:
        'Website = the door for humans. API = the door for programs. Endpoint = one item on the menu. API key = your name on the tab.',
      vibeTip:
        'Before asking your AI to integrate a service, paste in a link to that service\'s API docs (or the specific endpoint page). Models guess at API shapes from memory and the guesses go stale; the docs make the integration real.',
      talkToAi: {
        starter:
          'Integrate [service] into [my app] to do [the job]. Before writing code, ask me: 1) whether I already have an account and API key, 2) my stack and where the key can safely live, 3) exactly which actions I need (read data, create things, listen for events), 4) expected volume, in case of rate limits. Then use the service\'s current documentation, put the key in an environment variable, implement the calls with error handling, and show me how to test it without touching production data.',
        example:
          'Integrate Stripe into my Next.js app to sell a single subscription plan. I have a Stripe account in test mode. I need checkout, a success page, and to know when someone cancels. Use env vars for keys and show me how to test the whole flow with Stripe\'s test cards.',
      },
      mnemonic:
        'An API is a menu for programs: endpoints are the dishes, the key is your tab, and the docs are the menu in writing.',
      relatedGlossaryIds: ['codeblock', 'keyvalue'],
    },
    {
      id: 'websockets-realtime',
      title: 'Real-time: polling, server-sent events, WebSockets',
      summary:
        'Normal HTTP only speaks when spoken to, so live features need a plan: polling (ask again every few seconds), server-sent events (a one-way live feed), or WebSockets (a two-way open line). Chat, live cursors, and dashboards each pick differently.',
      details:
        'HTTP has a built-in awkwardness: the server can never start the conversation. It answers requests and then goes silent, so "show new messages the moment they arrive" needs a workaround. There are three standard ones, and the trade-off is always freshness versus complexity.\n\nPolling is the simple one: the client just asks again on a timer ("anything new? ... anything new?"). It is easy, works everywhere, and is genuinely fine for slow-moving data like a dashboard that refreshes every 30 seconds. SSE (Server-Sent Events) is the next step up: the client opens one long-lived request and the server streams events down it whenever it likes. One direction only, server to client, which fits live feeds, notifications, and the token-by-token typing effect of AI chat interfaces.\n\nWebSockets go all the way: after starting life as an HTTP request, the connection upgrades to a persistent two-way line where either side can send at any time. That is what real chat, multiplayer cursors, and collaborative editors use. The catch is that open connections are stateful and fussy at scale (reconnects, load balancing), which is why most vibe-coded apps should not run their own. Firebase, Supabase Realtime, and services like Pusher or Ably maintain the socket layer for you; you subscribe to changes and they arrive.',
      comparison:
        'Polling = asking on a timer. SSE = a one-way live radio channel. WebSocket = a phone line both sides can talk on. Complexity rises in that order; pick the first one that meets the need.',
      vibeTip:
        'Tell your AI the freshness you actually need: "updates within 30 seconds is fine" gets you simple polling, "instant, both directions" gets you WebSockets via Firebase or Supabase. Without that sentence, AIs default to the fanciest option.',
      talkToAi: {
        starter:
          'I want [feature] in my app to update live. Before implementing, ask me: 1) how fresh it really needs to be (instant, seconds, a minute), 2) whether data flows one way or both ways, 3) my stack and whether I already use Firebase or Supabase, 4) roughly how many users are connected at once. Then recommend polling, server-sent events, or WebSockets with a one-paragraph reason, and implement it using my existing platform\'s real-time features instead of a hand-rolled socket server if possible.',
        example:
          'My app shows a shared shopping list for a household. When one person checks off an item, everyone should see it within a second or two. I already use Supabase. Recommend the simplest approach and implement it with Supabase Realtime.',
      },
      mnemonic:
        'HTTP only speaks when spoken to. Poll on a timer, stream one way with SSE, or open the two-way line with WebSockets. Pick the simplest that is fresh enough.',
      relatedGlossaryIds: ['chatthread', 'presencedot'],
    },
  ],
};
