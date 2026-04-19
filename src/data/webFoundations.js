/**
 * Web foundations: 22 topics covering the HTML, CSS, and accessibility
 * concepts every vibe coder runs into the moment they read code or write
 * a prompt. This is the first cluster in Build Literacy because everything
 * else assumes you know this stuff.
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

export const WEB_FOUNDATIONS_CLUSTER = {
  id: 'web-foundations',
  title: 'Web foundations',
  summary:
    'The HTML, CSS, and accessibility ideas that quietly hold up everything else. Start here if any of these feel fuzzy.',
  topics: [
    // ─── Markup basics ─────────────────────────────────────────────────────
    {
      id: 'html-tag-element-attribute',
      title: 'Tag, element, attribute',
      summary:
        'A tag is the angle-bracket label like <button>. An element is the whole thing including its content. An attribute is a setting on the tag like type="submit".',
      details:
        'Three words, three different things, and people mix them up constantly. The tag is just the bracket, like <p>. The element is the entire chunk, opening tag plus contents plus closing tag, like <p>Hello</p>. An attribute is a key-value pair you stick inside the opening tag to configure it, like <a href="/home"> where href is the attribute name and "/home" is the value.\n\nWhy you care: when you ask an AI to "wrap that in a button", you are asking for an element. When you say "add an aria-label", you are adding an attribute. When you say "the closing tag is missing", you mean the </button> half. Using the right word makes the AI fix the right thing instead of rewriting your whole component.\n\nCommon trap: self-closing tags like <img>, <input>, and <br> have no closing tag and no inner content. They are still elements, they just look weird because they ended where they started.',
      comparison:
        'Tag is the label. Element is the label plus what it wraps. Attribute is a setting on the label.',
      vibeTip:
        'When you tell your AI "add an attribute" instead of "add a property", you stop getting JavaScript when you wanted HTML.',
      talkToAi: {
        starter:
          'I need to add an HTML attribute to an existing element in [file path], and I want to use the right vocabulary so you do not rewrite the whole component. Before you change anything, ask me: 1) which element exactly (tag name plus surrounding context), 2) the attribute name and value I want, 3) whether anything else should be touched. Then make the smallest possible change and show me the diff.',
        example:
          'Add a "data-testid" attribute called "submit-button" to the existing <button> element in components/CheckoutForm.jsx. Do not change anything else.',
      },
      mnemonic:
        'Tag = label. Element = label plus what it wraps. Attribute = setting on the label.',
      relatedGlossaryIds: ['button', 'inputgroup'],
    },
    {
      id: 'block-vs-inline',
      title: 'Block vs inline elements',
      summary:
        'Block elements (like <div>, <p>, <h1>) take up the whole row. Inline elements (like <span>, <a>, <strong>) only take as much space as their content.',
      details:
        'Every HTML element has a default behavior. Block elements push everything else to a new line and stretch across the whole container. They are the wall sections of your house. Inline elements sit happily in the middle of a sentence next to their neighbors. They are the words on the wall.\n\nThis is why a <div> always seems to "break" the layout when you stick it inside a sentence, and why a <span> can never have a width. Once you see the rule, you stop fighting CSS for half a day.\n\nYou can override the default with display: inline-block (sits in line but accepts width and height) or display: block (takes the whole row even if it normally would not). Modern layouts use display: flex and display: grid for almost everything, but the block-vs-inline distinction still drives how text and links behave inside a paragraph.',
      comparison:
        'Block elements eat the whole row. Inline elements share the row. inline-block is the polite middle ground.',
      vibeTip:
        'When the AI gives you a layout that looks broken, ask it to check whether each element is block or inline before adding more CSS.',
      talkToAi: {
        starter:
          'Something on [page or component] is wrapping or aligning wrong. Before suggesting CSS, ask me: 1) which two or three elements are involved, 2) what I want them to look like (same row, stacked, sharing space), 3) whether any of them are <div>, <span>, <a>, etc. Then explain whether the issue is block vs inline behavior, suggest the smallest fix (changing the tag or the display value), and only add new CSS if there is no semantic fix.',
        example:
          'In the article header, the date should sit on the same line as the author name. Right now it drops to a new line. Likely cause: the date is in a <div>. Change it to a <span> and add a 12px left margin.',
      },
      mnemonic:
        'Block hogs the row. Inline shares it.',
      relatedGlossaryIds: ['card', 'list'],
    },
    {
      id: 'semantic-html',
      title: 'Semantic HTML',
      summary:
        'Using tags that say what the thing IS, like <button>, <nav>, <main>, <article>, instead of wrapping everything in a <div> and adding click handlers.',
      details:
        'A <div> is a brown cardboard box. A <button> is a button. They might look identical on screen, but to a screen reader, a search engine, and a keyboard user, they are completely different things. Semantic HTML means picking the tag that describes the role: <button> for buttons, <nav> for navigation, <main> for the main content, <article> for a self-contained post, <header> and <footer> for, well, headers and footers.\n\nWhy you actually care: a real <button> gets keyboard focus, fires on Enter and Space, announces itself to screen readers as "button", and shows a system focus ring for free. A <div onClick> does none of that until you wire it up by hand, which AIs forget to do half the time.\n\nDefault to the most specific tag you can. Reach for <div> only when nothing more specific fits, like a generic styling wrapper.',
      comparison:
        'A <div> is a wrapper. A <button>, <nav>, or <article> is a wrapper that also tells the browser what it means.',
      vibeTip:
        'Tell your AI "use semantic HTML" once at the start of a project and it will stop building div soup. Your accessibility audits will thank you.',
      talkToAi: {
        starter:
          'Refactor [component or page] to use semantic HTML. Before you change anything, ask me: 1) the file path and rough purpose of the component, 2) which parts are interactive (buttons, links, form fields) versus structural (headers, sections, navigation), 3) whether I want minimal changes or a full rewrite. Then propose a tag-by-tag replacement plan, flag anywhere you would push back on my current structure, and only write the diff after I confirm the plan.',
        example:
          'Refactor this Card component to use semantic HTML. The wrapper should stay a <div>, but the title row needs an <h3>, the action row needs a <footer>, and the "Buy" thing that currently is a <div onClick> must become a real <button>.',
      },
      mnemonic:
        'If a tag exists for the thing, use that tag.',
      relatedGlossaryIds: ['button', 'card'],
    },
    {
      id: 'html-vs-xml-json',
      title: 'HTML vs XHTML vs XML vs JSON',
      summary:
        'HTML is for web pages and forgives most of your typos. XML is the strict ancestor used for data files. JSON is the modern, lightweight format your APIs almost certainly use.',
      details:
        'These all use angle brackets or curly braces to wrap data, but they show up in different places. HTML (HyperText Markup Language) is what your browser turns into a page. It is forgiving: forget a closing tag and the browser usually still renders something.\n\nXML (Extensible Markup Language) looks like HTML but is strict, every tag must close, and you can invent your own tag names. You will meet it in RSS feeds, configuration files, and some legacy enterprise APIs. XHTML was the failed attempt to make HTML follow XML rules; you can mostly forget it exists.\n\nJSON (JavaScript Object Notation) uses curly braces and square brackets instead of tags. It is what almost every modern web API speaks today, because it is shorter, easier to parse, and maps directly to objects in your code.',
      comparison:
        'HTML is for pages and forgives mistakes. XML is for data and is picky. JSON is the modern data format that won.',
      vibeTip:
        'When an AI asks "what format do you want?", say JSON unless you have a specific reason not to. It is what every modern tool understands by default.',
      talkToAi: {
        starter:
          'I have a [source format] file at [path] and I want to convert it to [target format] for [reason]. Before writing any code, ask me: 1) the structure of the source (paste a sample), 2) whether the target needs to match the source one-to-one or be reshaped, 3) any keys I want renamed or dropped. Then show me both files side by side and call out anything you think I should reconsider in the new shape.',
        example:
          'Convert this old XML config into a JSON file with the same structure. Keep the keys lowercase. Show me both files so I can diff them.',
      },
      mnemonic:
        'HTML for pages, JSON for data, XML for legacy.',
      relatedGlossaryIds: ['table'],
    },
    {
      id: 'id-vs-class-vs-name',
      title: 'id vs class vs name',
      summary:
        'id should be unique on the page (one element). class can be reused across many elements. name is for form fields so the server knows what to call the value.',
      details:
        'These three attributes look interchangeable and are not. An id is a unique sticker: only one element on the page should have id="signup-form". CSS selects it with #signup-form, JavaScript grabs it with getElementById, and links can jump to it with /page#signup-form.\n\nA class is a shared sticker: many elements can have class="card". CSS uses .card to style every one of them, and an element can have several classes at once like class="card card--featured".\n\nThe name attribute is mostly used on form inputs. When you submit a form, the browser packages each field as name=value. Without name, the value never makes it to the server. Beginners often confuse name with id; both can exist on the same input and they do different jobs.',
      comparison:
        'id is unique. class is shared. name is for forms.',
      vibeTip:
        'Tell your AI to use classes for styling and ids only when something really needs to be unique on the page (jump links, form labels, etc.). It will stop generating duplicate-id bugs.',
      talkToAi: {
        starter:
          'Audit [form or page] and make sure every input has the right id, class, and name attributes. Before changing anything, ask me: 1) what the backend expects each field to be called, 2) whether any inputs need a <label htmlFor> link, 3) which classes are styling versus behavioral. Then propose the changes as a checklist, flag any duplicate ids you find, and only write the diff once I confirm.',
        example:
          'In the signup form, every input needs a "name" attribute matching its label in snake_case (full_name, email_address, etc.) so our backend can read them. Add a unique "id" only if there is a <label htmlFor> pointing at it.',
      },
      mnemonic:
        'id is one. class is many. name is for the server.',
      relatedGlossaryIds: ['textfield', 'inputgroup'],
    },
    {
      id: 'dom',
      title: 'DOM (Document Object Model)',
      summary:
        'The DOM is the live tree your browser builds from your HTML. JavaScript reads and changes the page by walking that tree.',
      details:
        'When the browser loads your HTML file, it does not just paint the words on the screen. It builds a tree in memory where every tag becomes a node, every attribute becomes a property of that node, and every text snippet becomes a leaf. That tree is the DOM (Document Object Model).\n\nWhy you care: every time JavaScript "adds a class", "shows a modal", or "updates the count", it is reaching into the DOM and changing a node. Every framework you have heard of (React, Vue, Svelte) is, underneath, a system for keeping the DOM in sync with your data without you having to touch it by hand.\n\nThe practical thing to remember: the DOM is the live thing the user sees. The HTML file you wrote was just the seed. By the time JavaScript runs, the DOM may look completely different.',
      comparison:
        'HTML is the recipe. The DOM is the dish on the table after the browser cooks it and JavaScript keeps stirring.',
      vibeTip:
        'When something "is in your code but not on the page", say "inspect the DOM" and the AI will check what actually rendered, not what you wrote.',
      talkToAi: {
        starter:
          'I have a "the code is right but the page is wrong" bug in [component]. Before guessing, ask me: 1) what I see vs what I expect, 2) the component file path, 3) any conditional logic that decides whether the element renders. Then walk me through inspecting the live DOM (in DevTools or with a Playwright accessibility snapshot) to confirm whether the element is rendered, hidden, or skipped, and only suggest a fix once we know which.',
        example:
          'The Cancel button is in my JSX but missing from the page. Inspect the DOM to confirm it actually rendered, then check whether something is hiding it with display:none or removing it conditionally.',
      },
      mnemonic:
        'HTML is the recipe. The DOM is the meal.',
      relatedGlossaryIds: ['tree'],
    },

    // ─── Styling basics ────────────────────────────────────────────────────
    {
      id: 'css-selectors',
      title: 'CSS selectors and the cascade',
      summary:
        'A selector is how CSS picks which elements to style (.card, #header, button:hover). The cascade is how the browser decides which rule wins when several rules target the same element.',
      details:
        'CSS works in two steps. First, you write a selector that points at one or more elements: .card targets every element with class="card", button:hover targets buttons while the mouse is over them, .card .title targets a title inside a card.\n\nThen, when several rules try to style the same element, the cascade picks a winner using three things in order: importance (a !important rule wins), specificity (a more specific selector wins, like #foo over .foo), and source order (a later rule beats an earlier one if everything else is equal).\n\nMost "why is my style not applying" pain comes from someone, somewhere, having written a more specific selector or an !important you forgot about. When in doubt, use the browser DevTools to see the exact rule that won.',
      comparison:
        'A selector picks the targets. The cascade picks the winner when targets disagree.',
      vibeTip:
        'When a style is being overridden, ask the AI to inspect computed styles and report which rule wins, instead of layering on more CSS until something sticks.',
      talkToAi: {
        starter:
          'A style on [element / class] is not applying the way I expect. Before adding any new CSS, ask me: 1) the selector I wrote and the file it lives in, 2) what I expect to see vs what I see, 3) whether I am open to renaming a class or restructuring. Then walk me through DevTools to find the rule that is winning the cascade, explain why it wins, and propose the smallest fix. Do not use !important.',
        example:
          'My .btn-primary background is not turning blue. Inspect the computed styles in DevTools, find which rule is winning the cascade, and either bump my selector\'s specificity or remove whatever is overriding it. Do not add !important.',
      },
      mnemonic:
        'Selectors point. The cascade decides who wins.',
      relatedGlossaryIds: [],
    },
    {
      id: 'box-model',
      title: 'The box model: content, padding, border, margin',
      summary:
        'Every element on the page is a rectangle made of four nested layers: content in the middle, then padding, then border, then margin pushing other elements away.',
      details:
        'Picture a framed photo on a shelf. The photo itself is the content. The matte around the photo is the padding (space inside the frame). The frame itself is the border. The space between this frame and the next picture is the margin.\n\nThis is the single most useful mental model in CSS. Most layout problems come down to "I added padding when I needed margin" or vice versa. If the box itself should grow, you want padding. If you want space between this box and the next, you want margin.\n\nOne more thing that trips people up: by default, when you set width: 200px on an element, padding and border are added on top of that 200. Modern resets fix this by setting box-sizing: border-box, which makes width include padding and border. That is why almost every starter template begins with * { box-sizing: border-box; }.',
      comparison:
        'Content is the photo. Padding is the matte. Border is the frame. Margin is the air between frames.',
      vibeTip:
        'Always ask your AI to use box-sizing: border-box. Without it, your widths and paddings constantly fight each other.',
      talkToAi: {
        starter:
          'Spacing on [component] feels off. Before changing anything, ask me: 1) whether the gap I am unhappy with is INSIDE one element or BETWEEN elements, 2) the current values and what I want instead, 3) whether box-sizing: border-box is already set globally. Then explain which of (padding, margin, border, gap) is the right tool, propose the change, and call out any place I should switch to a flex/grid gap instead of margins.',
        example:
          'Set box-sizing: border-box on everything (use the universal selector). Then on the .product-card, give the inside 16px of breathing room and 24px of space between cards.',
      },
      mnemonic:
        'Content, padding, border, margin: from the inside out.',
      relatedGlossaryIds: ['card'],
    },
    {
      id: 'margin-vs-padding',
      title: 'Margin vs padding',
      summary:
        'Padding is the breathing room INSIDE a box, between the border and the content. Margin is the elbow room AROUND a box, between this box and its neighbors.',
      details:
        'Even people who have written CSS for years get this backwards in a hurry. Here is the reliable rule: if you want to push the contents away from the edges, that is padding (it lives inside the border). If you want to push other things away from this whole box, that is margin (it lives outside the border).\n\nBackgrounds and borders only show up to the edge of padding. They never extend into the margin. That is why a card with a background color and lots of padding looks chunky and inviting, while one with lots of margin and no padding looks like a tiny pill floating in space.\n\nThe famous gotcha is "margin collapse": if two stacked block elements both have a vertical margin, the bigger one wins instead of adding up. So 20px on top of 30px gives you 30px of space, not 50px. It is weird the first time it happens. Switch to gap on a flex or grid container if margin collapse is biting you.',
      comparison:
        'Padding is breathing room. Margin is elbow room. Background fills padding, never margin.',
      vibeTip:
        'When you say "give the button more space", be specific: "more padding inside the button" vs "more margin around the button" produce very different layouts.',
      talkToAi: {
        starter:
          'Add or fix spacing on [component]. Before writing CSS, ask me: 1) is the gap I want INSIDE the element (between content and border) or AROUND it (between this and neighbors), 2) the values in pixels or rem, 3) whether the parent uses flex/grid (so we can use gap instead of margins). Then propose the change, prefer gap over margins where the parent is a flex/grid container, and warn me if margin collapse is likely to bite.',
        example:
          'In the pricing cards, the price text is touching the card edge. Add 20px of padding inside each card. Separately, the cards themselves are crammed together: add 24px of horizontal margin between them, or switch the parent to display: flex with gap: 24px (preferred).',
      },
      mnemonic:
        'Padding is for breathing. Margin is for elbows.',
      relatedGlossaryIds: ['card'],
    },
    {
      id: 'display-property',
      title: 'Display: block, inline, inline-block, flex, grid',
      summary:
        'The display property is the master switch that decides how an element lays itself out and how its children behave inside it.',
      details:
        'Every element has a display value. The defaults match what you would expect: <p> is block, <span> is inline. But you can override that any time, and modern layouts almost always do. The five values worth knowing:\n\n- block: takes the full row, accepts width and height. Great for stacked sections.\n- inline: flows with text, ignores width and height. Good for words inside paragraphs.\n- inline-block: flows with text but accepts width and height. Useful for chip-like things.\n- flex: turns the element into a flex container so its children line up in a row or column with handy gap, justify, and align controls.\n- grid: turns it into a grid container with rows and columns you can name. Best for two-dimensional layouts like dashboards.\n\nIf you remember one thing: any time you find yourself fighting margins to align two things side by side, switch the parent to display: flex and stop suffering.',
      comparison:
        'Block stacks. Inline flows. Flex lines things up in a row or column. Grid gives you rows AND columns.',
      vibeTip:
        'Tell your AI which display you want for the parent. "Make this a flex row with 16px gap" beats "put these next to each other" every time.',
      talkToAi: {
        starter:
          'I want to lay out [a row / a column / a dashboard area] in [component]. Before writing CSS, ask me: 1) the children involved and the visual I am going for, 2) whether things should wrap on small screens, 3) what the gap, alignment, and overflow behavior should be. Then pick the right display value (flex vs grid vs inline-block), explain why, and only write the CSS after I agree on the approach.',
        example:
          'The header has a logo on the left and three nav links on the right. Make the <header> display: flex, justify-content: space-between, align-items: center, with 24px horizontal padding. Group the nav links in a <nav> with display: flex, gap: 16px.',
      },
      mnemonic:
        'When two things will not behave next to each other, the parent probably needs display: flex.',
      relatedGlossaryIds: ['appshell'],
    },
    {
      id: 'flex-vs-grid',
      title: 'Flexbox vs Grid',
      summary:
        'Flexbox is for one direction: a row OR a column. Grid is for two: rows AND columns at the same time. Most layouts use both.',
      details:
        'Flexbox (display: flex) is the right tool when you have a single line of stuff to lay out: a navigation bar, a row of buttons, a stack of form fields. You set the direction (row or column), the gap between items, and how they align, and the browser does the rest.\n\nGrid (display: grid) is the right tool when you have a two-dimensional layout: a dashboard with a header, a sidebar, a main content area, and a footer. You define columns and rows once with grid-template-columns and grid-template-rows, and then place children into named areas.\n\nReal apps use both. Grid usually defines the page-level skeleton (header / sidebar / main / footer). Flex handles the smaller pieces inside each cell (the row of nav links, the row of card actions). When in doubt, start with flex and only reach for grid when you need columns AND rows to behave.',
      comparison:
        'Flex is one-dimensional (row or column). Grid is two-dimensional. Flex inside Grid is normal and good.',
      vibeTip:
        'Ask your AI for "Grid for the page shell, Flex for the rows inside it" and your layout code will read like a sentence.',
      talkToAi: {
        starter:
          'Build the layout for [page or section]. Before writing CSS, ask me: 1) sketch or describe the regions (header, sidebar, main, etc.) and their fixed/fluid sizes, 2) how it should reflow on tablet and mobile, 3) what lives inside each region and how those children should align. Then propose Grid for the page-level skeleton and Flex for the rows inside, explain why for any spot where you would do the opposite, and only write the code after I confirm the plan.',
        example:
          'Build the dashboard layout with CSS Grid: a 240px sidebar on the left, a 64px header across the top, and a main content area filling the rest. Inside the header, use Flex to put the search bar on the left, spacer in the middle, and avatar on the right.',
      },
      mnemonic:
        'Flex for one direction. Grid for two.',
      relatedGlossaryIds: ['appshell', 'sidebar'],
    },
    {
      id: 'position',
      title: 'Position: static, relative, absolute, fixed, sticky',
      summary:
        'The position property changes what an element is anchored to and whether it moves with the page when you scroll.',
      details:
        'Most elements use the default, position: static, meaning they sit in normal document flow. The other four values are the "I need this somewhere specific" options.\n\n- relative: stays in flow, but you can nudge it with top/left/right/bottom and other elements still treat its original spot as taken.\n- absolute: pulled out of flow and positioned relative to its nearest positioned ancestor (an ancestor that itself is not static). Other elements act like it does not exist.\n- fixed: pulled out of flow and positioned relative to the browser window. It stays put even when you scroll. Common for chat widgets, cookie banners, and floating action buttons.\n- sticky: behaves like relative until you scroll past it, then it sticks to a chosen edge. Perfect for table headers and section labels.\n\nThe most common bug: someone uses absolute and forgets that the parent has to be position: relative for "absolute" to mean "relative to this card" instead of "relative to the whole page".',
      comparison:
        'Static is normal. Relative is normal but nudgeable. Absolute is parent-anchored. Fixed is window-anchored. Sticky is "relative until you scroll".',
      vibeTip:
        'When you want something pinned inside a card, set the card to position: relative first, then position: absolute on the child. The AI will forget half the time, so check.',
      talkToAi: {
        starter:
          'I want to pin [child element] somewhere on [parent or page]. Before writing CSS, ask me: 1) should it be anchored to a specific parent, to the whole page, or to the viewport (stays put when scrolling), 2) the exact offsets from which edges, 3) whether it should still take up its original space or float over other content. Then choose the right position value, remind me to set position: relative on the parent if needed, and write the CSS.',
        example:
          'Pin a small "NEW" badge to the top-right corner of the .product-card. Make the card position: relative, then absolutely position the badge with top: 8px and right: 8px. The badge should sit on top of the image without affecting layout.',
      },
      mnemonic:
        'Absolute = anchored to nearest positioned parent. Set the parent first.',
      relatedGlossaryIds: ['badge', 'tooltip'],
    },
    {
      id: 'css-units',
      title: 'CSS units: px, rem, em, %, vh, vw',
      summary:
        'px is fixed pixels, rem scales with the user\'s root font size, em scales with the local font size, % is relative to the parent, and vh/vw are relative to the viewport.',
      details:
        'CSS lets you size things in many ways and each unit means something specific. px (pixels) is fixed: 16px is always 16px. Use it for borders, small fixed details, and shadows.\n\nrem is "root em": 1rem equals the root font size, which by default is 16px. If a user changes their browser font size, everything in rem scales with them. This is the friendly default for almost every size in modern apps. em is similar but relative to the current element\'s font size, which is great for things that should scale with their parent (like padding inside a button) and confusing when nested.\n\n% is relative to the parent: width: 50% means half the parent\'s width. vh and vw are 1% of the viewport height and width: height: 100vh fills the screen, useful for hero sections.',
      comparison:
        'px is fixed. rem scales with the user\'s settings. em scales with its parent. % is parent-relative. vh/vw are screen-relative.',
      vibeTip:
        'Default to rem for sizes and spacing. Use px only for borders and shadows. Use vh/vw sparingly because they get weird on mobile keyboards.',
      talkToAi: {
        starter:
          'I want to standardize the units in [stylesheet or design tokens file]. Before changing anything, ask me: 1) what currently uses px, 2) whether I have a root font size convention (default is 16px = 1rem), 3) which things should scale with user font settings vs stay pixel-perfect. Then propose the conversion plan (rem for sizes/spacing, px for borders/shadows, % or vh/vw where appropriate), flag anywhere you would push back, and write the diff after I confirm.',
        example:
          'In the design system, replace every fixed pixel font size with rem (16px = 1rem). Keep border widths and shadow blurs in pixels. Convert hero section heights from 600px to a min-height of 80vh with a max of 720px.',
      },
      mnemonic:
        'rem for sizes, px for borders, % for "share of parent", vh/vw for screen.',
      relatedGlossaryIds: [],
    },
    {
      id: 'color-formats',
      title: 'Color formats: named, hex, rgb, hsl, oklch',
      summary:
        'Same color, many ways to write it. "red", "#ff0000", "rgb(255 0 0)", "hsl(0 100% 50%)", and "oklch(63% 0.26 29)" all describe the same color, just with different controls.',
      details:
        'CSS lets you describe a color in several formats and each one is good for a different job. Named colors like "tomato" and "rebeccapurple" are easy to type but limited. Hex codes like #ff5733 are six (or eight, with alpha) hexadecimal digits where the pairs encode red, green, and blue. They are the most common format you will see in the wild.\n\nrgb() takes three numbers from 0 to 255 and is friendlier when you want to write something like rgb(255 0 0 / 50%) for a red with 50% opacity. hsl() is the secret weapon for theme tweaks: H is the hue (where on the rainbow), S is saturation (how vivid), L is lightness. To make a color a little darker, lower the L. To desaturate it, lower the S. Way easier than guessing a new hex.\n\noklch() is the new kid: it picks colors that look perceptually even, so when you generate a 10-step palette you actually get 10 evenly-spaced shades instead of three identical-looking dark blues. Modern design systems are starting to standardize on it.',
      comparison:
        'Hex is the default everyone copies. HSL is the friendliest to tweak. OKLCH gives perceptually even palettes. RGB is the polite middle ground.',
      vibeTip:
        'Tell your AI to use HSL or OKLCH for design tokens. You can shift "primary" lighter or darker by changing one number instead of regenerating a whole palette.',
      talkToAi: {
        starter:
          'I want to convert our color tokens in [path] to [HSL / OKLCH] so they are easier to tweak. Before changing anything, ask me: 1) the current format and how the tokens are organized, 2) whether I want hover/active variants generated automatically, 3) whether I care about preserving exact visual output or am open to small perceptual shifts. Then show me the conversion table side by side and call out any pair that would be easier to read in a different format.',
        example:
          'Convert our color tokens from hex to HSL. Keep the name and value mapping the same, but write a comment next to each one explaining what changing the L number would do. Generate a hover variant of --color-primary that is 8% darker.',
      },
      mnemonic:
        'Hex to copy, HSL to tweak, OKLCH for palettes that look right.',
      relatedGlossaryIds: ['colorpicker'],
    },
    {
      id: 'specificity',
      title: 'Specificity (and why !important is a trap)',
      summary:
        'When two CSS rules target the same element, the more "specific" selector wins. !important overrides everything, which is why it is a tempting cheat that creates worse problems later.',
      details:
        'Specificity is a score CSS calculates for each selector. Inline styles score highest, then ids, then classes/attributes/pseudo-classes, then elements/pseudo-elements. So #header beats .header, and .header beats h1. When two rules tie on score, the one written later wins.\n\nThe trap: when something is not styling the way you expect, the temptation is to slap !important on it. That works once. But the next time something else does not apply, you !important that too, and now your stylesheet is a yelling match no one can untangle. Reserve !important for emergencies (overriding a third-party stylesheet you cannot edit) and for utility classes in design systems that promise to win.\n\nThe healthier fix is almost always: bump the specificity by one notch (add a parent selector, use a class instead of an element), or simplify so the selectors do not collide in the first place.',
      comparison:
        'Specificity is the math. !important is the override that breaks the math. Use !important like a parachute, not a ladder.',
      vibeTip:
        'When you ask your AI to fix a style, say "do not add !important". It will instead refactor the conflict, which is the actual fix.',
      talkToAi: {
        starter:
          'My style on [selector] in [file] is being overridden. Before suggesting a fix, ask me: 1) what is winning the cascade (open DevTools and check), 2) whether I can rename or restructure either selector, 3) whether the conflict is in my code or a third-party stylesheet. Then propose the smallest fix (specificity bump, source-order change, or refactor), explain why, and DO NOT use !important unless I explicitly say it is the only option.',
        example:
          'My .btn--primary background is being overridden by .btn somewhere else. Find the conflicting rule, then either reorder the imports so my custom rule loads last, or bump the selector to .btn.btn--primary so it wins by specificity. Do not use !important.',
      },
      mnemonic:
        '!important is a parachute, not a ladder.',
      relatedGlossaryIds: [],
    },

    // ─── Accessibility basics ──────────────────────────────────────────────
    {
      id: 'accessibility',
      title: 'What "accessibility" really means',
      summary:
        'Accessibility means making your app usable by people who navigate differently: keyboard only, screen reader, low vision, color blind, motor impairments. It is also free SEO and free usability.',
      details:
        'Accessibility (often shortened to a11y because there are 11 letters between the a and the y) is not a checklist of arcane rules. It is a population of real users. Some people cannot use a mouse and rely on Tab and Enter. Some cannot see the screen at all and listen to a screen reader read it aloud. Some need 200% font size to read, or high-contrast colors, or no flashing animations.\n\nThe big surprise for most developers: building for accessibility makes the app better for everyone. Captioned videos work in noisy cafes. High-contrast text is readable in sunlight. Keyboard shortcuts speed up power users. Bigger touch targets help anyone holding a phone in one hand.\n\nThe practical starting point: use semantic HTML, label every form field, make sure everything works without a mouse, and check color contrast. That covers about 80% of common issues with about 20% of the effort.',
      comparison:
        'Accessibility is not "extra work for a few people". It is "good defaults that happen to be required by some, helpful for all".',
      vibeTip:
        'Add "accessible" or "follows WCAG AA" to your prompt early. AIs default to "looks nice" and will skip aria-labels, focus rings, and contrast unless you ask.',
      talkToAi: {
        starter:
          'Audit [page or component] for accessibility against WCAG AA. Before suggesting fixes, ask me: 1) the file path and rough purpose, 2) whether I want the audit done by reading the code, by running an automated tool (axe, Lighthouse), or both, 3) which fixes I want auto-applied vs just listed. Then produce a checklist of issues grouped by severity, propose fixes for each, and call out anywhere I should reconsider the underlying design rather than patch over it.',
        example:
          'Audit this Login form for accessibility (WCAG AA). Check: every input has an associated <label>, the form is fully usable with Tab and Enter, focus rings are visible, text contrast is at least 4.5:1, and error messages are announced to screen readers. List what is missing and fix it.',
      },
      mnemonic:
        'Accessibility is good defaults, not extra work.',
      relatedGlossaryIds: ['button', 'textfield'],
    },
    {
      id: 'aria',
      title: 'ARIA (Accessible Rich Internet Applications)',
      summary:
        'ARIA is a set of HTML attributes (like aria-label, aria-expanded, role) that fill in the gaps when plain HTML cannot describe what an element does or its current state.',
      details:
        'ARIA stands for Accessible Rich Internet Applications. It is a vocabulary of attributes you sprinkle on HTML to tell screen readers things HTML alone cannot say. The most useful handful: aria-label (gives a name to an icon-only button), aria-labelledby (points at another element to use as the name), aria-describedby (points at extra explanation text), aria-expanded (true/false for things that open and close), aria-live (announces changes like "Saved" without focus), and role (overrides what kind of element this is, like role="dialog").\n\nThe golden rule, written in giant letters in the official ARIA spec: "no ARIA is better than bad ARIA". A real <button> needs no ARIA. A <div role="button"> with the wrong other attributes is worse than a plain div. So the right order of operations is: pick the semantic HTML tag first, then add ARIA only to fill the gaps.\n\nExamples where ARIA is genuinely required: an icon-only button gets aria-label="Close". A toggle button uses aria-pressed="true". A custom combobox uses aria-expanded and aria-controls so the screen reader knows it opened a list.',
      comparison:
        'Real semantic HTML beats ARIA. ARIA is the second-best option for the things HTML alone cannot describe.',
      vibeTip:
        'When you ask for an icon button, always ask the AI for an aria-label too. It is one extra word in the prompt and saves a screen reader user from hearing "button button button".',
      talkToAi: {
        starter:
          'Add the ARIA attributes [component] needs to be screen-reader-friendly. Before changing anything, ask me: 1) what the component is and what each interactive piece does, 2) whether any pieces are icon-only or have non-obvious state (open/closed, pressed, busy), 3) whether the underlying HTML is already semantic. Then propose ONLY the ARIA needed (do not add ARIA that real HTML already covers), explain each one in a sentence, and warn me if I am about to add bad ARIA that would be worse than nothing.',
        example:
          'Every icon-only <button> in this navbar (search, notifications, profile menu) needs an aria-label that describes what it does ("Search", "Open notifications", "Open profile menu"). Do not change the visible icons.',
      },
      mnemonic:
        'No ARIA is better than bad ARIA. Real <button> beats <div role="button">.',
      relatedGlossaryIds: ['button', 'tooltip', 'modal'],
    },
    {
      id: 'accessibility-tree',
      title: 'The accessibility tree',
      summary:
        'A parallel "screen reader version" of your DOM that the browser builds for assistive tech. If something is not in the accessibility tree, screen readers cannot see it.',
      details:
        'Your browser actually builds two trees from your HTML. The DOM is the one you can inspect in DevTools and that JavaScript walks. The accessibility tree is a slimmer, screen-reader-friendly version that strips out purely decorative stuff and includes role, name, state, and value for each element.\n\nThis is why semantic HTML matters: a real <button> shows up in the accessibility tree as { role: "button", name: "Save" }. A <div onClick> shows up as { role: "generic", name: "" }, which to a screen reader user reads as nothing useful at all.\n\nMost browsers have an "Accessibility" panel in DevTools that lets you inspect the tree directly. It is the fastest way to confirm "yes, the screen reader will announce this thing as a Save button" before you ship.',
      comparison:
        'The DOM is what JavaScript sees. The accessibility tree is what screen readers see. They are similar but not the same.',
      vibeTip:
        'Ask the AI to "verify the accessibility tree shows the right roles" when refactoring custom components. It will use DevTools or a Playwright accessibility snapshot.',
      talkToAi: {
        starter:
          'Verify the accessibility tree for [component or page] shows the roles and names a screen reader needs. Before doing anything, ask me: 1) which interactive elements I most care about, 2) whether I want this checked manually in DevTools, with axe, or via a Playwright snapshot, 3) any custom widgets you should pay extra attention to. Then list each element with its expected { role, name, state } and what the tree actually shows, and propose fixes for any mismatch.',
        example:
          'Open Chrome DevTools, switch to the Accessibility panel, and confirm that the Save button in the modal appears as { role: "button", name: "Save" }. If it shows as "generic" or has an empty name, fix it before we ship.',
      },
      mnemonic:
        'If it is not in the accessibility tree, screen readers do not know it exists.',
      relatedGlossaryIds: ['modal', 'button'],
    },
    {
      id: 'focus-management',
      title: 'Focus, tab order, focus rings',
      summary:
        'Focus is which element is currently "selected" and will receive your next keypress. Tab order is the path Tab takes through the page. Focus rings are the visible outline that shows where you are.',
      details:
        'Press Tab on any web page and you will see a thin outline jump from element to element. That is focus, and the order it follows is the tab order. By default, the tab order is the order elements appear in the HTML, which is one more reason to write semantic markup in the right order.\n\nThe focus ring (the outline you see) is critical: it is the only way a keyboard user knows where they are. Designers love to remove it because they think it looks ugly. Removing it without a clear, designed replacement is the single most common accessibility bug on the web. The modern fix is to use :focus-visible (which only shows the ring for keyboard focus, not mouse clicks) and to design a focus state that matches your brand.\n\nTwo more things worth knowing: when you open a modal, focus should move into it (and trap inside until it closes). When the modal closes, focus should return to the element that opened it, so the user does not get lost.',
      comparison:
        'Focus is the cursor for the keyboard. Remove the focus ring without replacing it and you have removed the cursor.',
      vibeTip:
        'Tell your AI explicitly: "keep visible focus rings" or "use :focus-visible with a clear outline". Otherwise it will copy a CSS reset that removes them.',
      talkToAi: {
        starter:
          'Make sure focus management on [page or component] is correct for keyboard users. Before changing anything, ask me: 1) the brand color I want for the focus ring (or use my design tokens), 2) whether any modals/drawers/menus exist that need focus trapping and return, 3) whether outline: none lives anywhere in the codebase. Then propose a global :focus-visible style, list every place that needs trap-and-return, and write the changes after I confirm.',
        example:
          'Add a global :focus-visible style: a 2px solid indigo outline with 2px offset, and a matching dark-mode color. Make sure no component anywhere uses outline: none without replacing it. When a modal opens, move focus to its first focusable element; when it closes, return focus to the trigger.',
      },
      mnemonic:
        'Focus ring = the cursor for keyboard users. Never delete it without designing a replacement.',
      relatedGlossaryIds: ['modal', 'drawer', 'popover'],
    },
    {
      id: 'color-contrast',
      title: 'Color contrast (WCAG AA / AAA)',
      summary:
        'Text needs enough contrast against its background to be readable. WCAG AA requires a 4.5 to 1 ratio for normal text and 3 to 1 for large text. AAA is stricter at 7 to 1.',
      details:
        'WCAG (Web Content Accessibility Guidelines) sets the standard for "is this readable?". Normal text needs a contrast ratio of at least 4.5 to 1 against its background to pass AA, the level most teams target. Large text (18pt or 14pt bold) only needs 3 to 1. AAA, the stricter level, asks for 7 to 1 and 4.5 to 1 respectively.\n\nWhy it matters beyond compliance: low-contrast text is unreadable in sunlight, on cheap screens, with blue-light filters on, and for anyone over forty. Designers love light grey on white because it looks clean; users hate it because they cannot read it.\n\nEvery browser has a contrast checker built into DevTools, and tools like Stark, axe, or Lighthouse will scan the whole page in seconds. Pick a checker, run it on your design system, and fix the obvious losers.',
      comparison:
        'AA is "readable for most people". AAA is "readable for most people in worse conditions". Always hit at least AA.',
      vibeTip:
        'When you generate a color palette, ask your AI for the contrast ratio of every text-on-background pair, not just the primary. The hover state usually fails first.',
      talkToAi: {
        starter:
          'Audit the color combinations in [design tokens or component] against WCAG AA contrast. Before fixing anything, ask me: 1) the file with the tokens or the page to scan, 2) whether I am targeting AA (4.5:1 normal, 3:1 large) or AAA, 3) whether you should auto-fix or just report. Then output a table of pairs with their ratios, mark passes/fails, and for each fail propose the smallest L (lightness) shift in HSL that would make it pass without breaking the brand.',
        example:
          'Audit every color combination in our design tokens for WCAG AA contrast (4.5:1 for normal text, 3:1 for large text). Output a table of pairs and their ratios. For each failing pair, suggest the smallest L change in HSL that would make it pass.',
      },
      mnemonic:
        '4.5 to 1 for normal text. Below that, you are losing readers.',
      relatedGlossaryIds: ['colorpicker', 'badge'],
    },
    {
      id: 'touch-targets',
      title: 'Touch targets and hit area',
      summary:
        'Anything you tap on a phone should be at least 44 by 44 pixels (Apple) or 48 by 48 (Google) so people can hit it with a thumb without missing.',
      details:
        'On a phone, your finger covers way more area than a mouse pointer. If a button is only 24 pixels tall, you will miss it half the time, and your users will quietly hate the product. Both Apple and Google publish guidelines: Apple says 44 by 44 pixels minimum, Google says 48 by 48. Splitting the difference at 44 keeps both happy.\n\nThe trick is that the visible button does not have to be that big. You can have a small icon and still pad the clickable area around it (using padding or by absolutely-positioning a transparent overlay) so the touch target is generous even when the visual is dainty.\n\nThis is also a keyboard and motor accessibility issue, not just a "phones" thing. Anyone with shaky hands or limited fine motor control benefits from larger targets and from spacing those targets apart so you do not hit the wrong one.',
      comparison:
        '44px minimum. Visual smaller is fine. The hit area is what matters.',
      vibeTip:
        'When you ask for icon buttons, say "44 by 44 minimum hit area". The AI will pad correctly instead of giving you a beautiful 16px icon no one can tap.',
      talkToAi: {
        starter:
          'Audit the tap targets on [component or page] for mobile usability. Before changing anything, ask me: 1) which buttons or links you should focus on, 2) whether visuals can grow or must stay the current size, 3) any spacing constraints between adjacent targets. Then list every target smaller than 44 by 44 pixels, propose padding (not margin) to grow the hit area while keeping the visual the same, and call out any spots where two targets are close enough to mis-tap.',
        example:
          'Every interactive icon in the toolbar (close, edit, delete) should look small (16px icon) but have a 44 by 44 pixel hit area. Use padding on the <button>, not margin, so the click target grows. Add 8px gap between adjacent icons so people do not mis-tap.',
      },
      mnemonic:
        '44 by 44, every tap, every time.',
      relatedGlossaryIds: ['button', 'toolbar'],
    },
    {
      id: 'keyboard-nav',
      title: 'Keyboard navigation patterns',
      summary:
        'Tab moves between focusable elements. Enter activates buttons and links. Space toggles checkboxes and presses buttons. Arrow keys move within a group (radios, tabs, menus, date pickers).',
      details:
        'There is a small set of keyboard rules that almost every web app follows, and once you know them you can use any well-built site without a mouse. Tab moves forward, Shift+Tab moves backward. Enter activates a link or button. Space presses a button or toggles a checkbox.\n\nInside a group (a row of tabs, a list of radio options, a date picker, a menu), Tab does not move between the items. Instead, the arrow keys do. That is the platform convention and screen-reader users expect it. Escape closes whatever just opened (modal, popover, menu).\n\nThe biggest mistakes you will see in AI-generated UI: making a row of tabs that you can only Tab through (instead of using arrow keys), trapping focus inside a modal but never returning it when the modal closes, and forgetting that a custom dropdown also needs Escape to close. Test it with the keyboard once a week and you will catch all three.',
      comparison:
        'Tab moves between widgets. Arrows move within a widget. Space and Enter activate. Escape closes.',
      vibeTip:
        'When you build any custom widget, the first sentence in the prompt should be "support standard keyboard navigation". The AI knows the patterns; it just does not apply them unless asked.',
      talkToAi: {
        starter:
          'Build [custom widget, e.g. tabs / menu / combobox] with proper keyboard support. Before writing any code, ask me: 1) the visual and behavior I want, 2) whether I follow the WAI-ARIA Authoring Practices for this widget pattern, 3) whether the widget lives inside another focusable area. Then describe the exact key bindings (Tab, arrows, Home/End, Enter, Space, Escape), confirm with me, and only then build it.',
        example:
          'For the new <Tabs> component: Tab should move focus into the tab list once, then arrow keys (Left/Right) move between tabs, Home and End jump to first/last, and Enter or Space activates the focused tab. Tab again moves out into the panel. Match the WAI-ARIA Authoring Practices.',
      },
      mnemonic:
        'Tab between widgets. Arrows within. Space and Enter to act. Escape to close.',
      relatedGlossaryIds: ['tabs', 'dropdownmenu', 'datepicker'],
    },
  ],
};
