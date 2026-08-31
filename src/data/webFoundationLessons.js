/**
 * Browser Lab lesson direction for every Web Foundations topic.
 *
 * The existing topic data remains the source for definitions and navigation.
 * This layer defines the experience: a hook, an observable objective, and the
 * interactive lab family that teaches it.
 */
export const WEB_FOUNDATION_LESSONS = {
  'html-tag-element-attribute': {
    lab: 'tag-anatomy',
    kicker: 'Take apart a button',
    hook: 'One line of HTML contains boundaries, settings, content, and behavior. Touch each part and watch the browser respond.',
    objective: 'Identify a tag, an attribute, content, and the complete element, then fix a button that submits the wrong form.',
    minutes: 4,
  },
  'block-vs-inline': {
    lab: 'block-inline',
    kicker: 'Make the sentence behave',
    hook: 'A single element can break a sentence onto a new line. Change its display mode and watch the words move back together.',
    objective: 'Predict whether an element takes the row or shares it, then repair an author byline.',
    minutes: 3,
  },
  'semantic-html': {
    lab: 'semantic-html',
    kicker: 'Turn div soup into a real interface',
    hook: 'Two controls can look identical while only one works for a keyboard and announces itself correctly.',
    objective: 'Replace a clickable div with a semantic button and compare what the browser provides for free.',
    minutes: 4,
  },
  'html-vs-xml-json': {
    lab: 'formats',
    kicker: 'Give three parsers the same data',
    hook: 'HTML forgives. XML refuses. JSON speaks in objects. Break the same example in each format and inspect the result.',
    objective: 'Recognize which format is meant for pages, strict tagged data, and modern API data.',
    minutes: 3,
  },
  'id-vs-class-vs-name': {
    lab: 'form-identity',
    kicker: 'Follow a form value to the server',
    hook: 'An input can look perfect and still submit nothing. The missing piece is usually not the id or the class.',
    objective: 'Use id for a label, class for styling, and name for submitted data.',
    minutes: 4,
  },
  dom: {
    lab: 'dom-tree',
    kicker: 'Edit the page the browser actually built',
    hook: 'Your HTML starts the page. The Document Object Model is the live tree JavaScript keeps changing afterward.',
    objective: 'Add, rename, and remove a live node while the preview and DOM tree stay synchronized.',
    minutes: 4,
  },
  'css-selectors': {
    lab: 'selectors',
    kicker: 'Hit the right targets',
    hook: 'A selector is a targeting instruction. Write a broad one, a narrow one, and one that reaches through a component.',
    objective: 'Choose selectors by observing exactly which elements the browser matches.',
    minutes: 4,
  },
  'box-model': {
    lab: 'box-model',
    kicker: 'X-ray a card',
    hook: 'Every element is four nested rectangles. Pull them apart until spacing stops feeling mysterious.',
    objective: 'Manipulate content, padding, border, and margin and identify which layer changes the visible box.',
    minutes: 4,
  },
  'margin-vs-padding': {
    lab: 'margin-padding',
    kicker: 'Move the air',
    hook: 'Put space inside the colored card, then move it outside. The background reveals which tool you used.',
    objective: 'Choose padding for breathing room inside and margin for distance between neighbors.',
    minutes: 3,
  },
  'display-property': {
    lab: 'display-modes',
    kicker: 'Change the layout engine',
    hook: 'The same three elements can become a sentence, a stack, a row, or a grid without changing the HTML.',
    objective: 'Switch display modes and explain which layout behavior each one activates.',
    minutes: 4,
  },
  'flex-vs-grid': {
    lab: 'flex-grid',
    kicker: 'Arrange the same cards two ways',
    hook: 'Flexbox follows a line. Grid controls rows and columns together. Resize the gallery and watch the difference.',
    objective: 'Choose Flexbox for a one-dimensional control row and Grid for a two-dimensional gallery.',
    minutes: 4,
  },
  position: {
    lab: 'position',
    kicker: 'Pin, anchor, and scroll',
    hook: 'Static, relative, absolute, fixed, and sticky answer different versions of one question: what is this positioned against?',
    objective: 'Change the positioning context and predict which element moves when the container scrolls.',
    minutes: 5,
  },
  'css-units': {
    lab: 'css-units',
    kicker: 'Resize the world around the element',
    hook: 'Pixels stay put. rem follows the reader. Percent follows the parent. Viewport units follow the screen.',
    objective: 'Change root size, parent width, and viewport width to see which units respond.',
    minutes: 4,
  },
  'color-formats': {
    lab: 'color-formats',
    kicker: 'Describe one color four ways',
    hook: 'Hex, RGB, HSL, and OKLCH are different coordinate systems pointing at a color.',
    objective: 'Adjust hue and opacity while reading equivalent color values in multiple formats.',
    minutes: 4,
  },
  specificity: {
    lab: 'specificity',
    kicker: 'Referee a cascade fight',
    hook: 'Three rules want the same button. Inspect their scores, predict the winner, and remove an unnecessary !important.',
    objective: 'Explain why one selector wins using importance, specificity, and source order.',
    minutes: 4,
  },
  accessibility: {
    lab: 'accessibility-audit',
    kicker: 'Use the interface without ideal conditions',
    hook: 'Accessibility is what remains when the mouse, tiny type, perfect color vision, or perfect motor control cannot be assumed.',
    objective: 'Repair labels, focus visibility, contrast, and target size in one small interface.',
    minutes: 5,
  },
  aria: {
    lab: 'aria-inspector',
    kicker: 'Listen to what the control announces',
    hook: 'ARIA changes the accessibility information a browser exposes. It does not repair the control’s visual behavior for you.',
    objective: 'Create an accessible name and state without replacing semantic HTML.',
    minutes: 4,
  },
  'accessibility-tree': {
    lab: 'accessibility-tree',
    kicker: 'Compare two versions of the same page',
    hook: 'The Document Object Model contains everything. The accessibility tree keeps what assistive technology needs.',
    objective: 'Hide decoration, preserve meaningful controls, and compare DOM nodes with accessible nodes.',
    minutes: 4,
  },
  'focus-management': {
    lab: 'focus-management',
    kicker: 'Follow the keyboard',
    hook: 'Focus is an invisible cursor. Open a dialog, move it deliberately, trap it, and return it when the dialog closes.',
    objective: 'Build a complete focus journey for an opening and closing modal.',
    minutes: 5,
  },
  'color-contrast': {
    lab: 'contrast',
    kicker: 'Make the ratio pass',
    hook: 'Contrast is measurable. Adjust two colors until the text crosses the WCAG AA threshold.',
    objective: 'Produce a body-text combination with a contrast ratio of at least 4.5 to 1.',
    minutes: 3,
  },
  'touch-targets': {
    lab: 'touch-targets',
    kicker: 'Make the invisible target visible',
    hook: 'The icon can stay small while its hit area grows around it. Try both and feel the difference.',
    objective: 'Increase the interactive hit area to at least 44 by 44 pixels without enlarging the icon.',
    minutes: 3,
  },
  'keyboard-nav': {
    lab: 'keyboard-navigation',
    kicker: 'Move through a composite control',
    hook: 'Tab enters a widget. Arrow keys often move inside it. Use the right key for tabs, menus, and dialogs.',
    objective: 'Operate a tab list with Tab, arrow keys, Enter, and Escape in the expected places.',
    minutes: 5,
  },
};

export const WEB_FOUNDATION_LAB_IDS = Object.keys(WEB_FOUNDATION_LESSONS);

export function getWebFoundationLesson(topicId) {
  return WEB_FOUNDATION_LESSONS[topicId] || null;
}
