/**
 * A studio headline should teach the specific pattern, not merely announce
 * its category. These lines are deliberately short enough to survive a
 * narrow preview pane while still giving every lesson its own point of view.
 */
export const PATTERN_STUDIO_HEADLINES = {
  modal: 'Pause the page. Focus the decision.',
  drawer: 'Bring in more room without leaving.',
  popover: 'Keep the extra context anchored.',
  tooltip: 'Explain the control without crowding it.',
  toast: 'Confirm the moment, then get out of the way.',
  hovercard: 'Let a small trigger reveal a richer story.',
  producttour: 'Guide attention one meaningful step at a time.',
  loadingoverlay: 'Make waiting visible and interaction safely unavailable.',

  select: 'Show the choices. Add search only when it earns its place.',
  otp: 'One digit at a time. No guesswork.',
  switch: 'Make on and off unmistakable.',
  dropzone: 'Turn file upload into a clear landing zone.',
  radio: 'Put every exclusive choice on the table.',
  slider: 'Make a range feel tangible.',
  multiselect: 'Collect several choices without losing the list.',
  colorpicker: 'Let people choose color with precision and context.',
  combobox: 'Search and choose in the same conversation.',
  inputgroup: 'Make related inputs read as one task.',
  textfield: 'Give every answer a clear place to land.',
  passwordfield: 'Protect the secret without hiding the rules.',
  searchfield: 'Make finding feel faster than browsing.',
  radiocards: 'Give important choices enough room to explain themselves.',
  togglebutton: 'Make a pressable state look pressed.',

  table: 'Make comparison effortless, row by row.',
  list: 'Build a rhythm people can scan.',
  pagination: 'Turn a long collection into manageable pages.',
  filterbar: 'Help people narrow the field without losing context.',
  barchart: 'Let magnitude speak before the labels do.',
  carousel: 'Move through highlights without hiding the controls.',
  tree: 'Make hierarchy visible and navigable.',
  calendar: 'Put time into a shape people already understand.',
  statcard: 'Give one important number the stage.',
  linechart: 'Let the trend tell the story.',
  piechart: 'Show the whole, then make every slice earn its space.',
  virtuallist: 'Make thousands of rows feel light.',
  chatthread: 'Keep every message in context.',
  mapview: 'Connect information to place.',
  treegrid: 'Combine hierarchy and comparison without losing either.',
  keyvalue: 'Turn dense attributes into quick answers.',
  stickyheader: 'Keep column meaning in sight.',
  activitystream: 'Make change unfold in order.',
  linkcard: 'Let a link explain where it leads.',
  qrcode: 'Bridge the screen and the camera in one scan.',

  datepicker: 'Make one day easy to find and confirm.',
  command: 'Put every action one search away.',
  taginput: 'Turn many short answers into something manageable.',
  richtext: 'Give formatting power without burying the writing.',
  rating: 'Make an opinion easy to give and easy to read.',
  stepper: 'Break a long task into confident steps.',
  daterange: 'Make the beginning and end feel connected.',
  timepicker: 'Make precise time quick to choose.',
  toolbar: 'Keep the right tools close to the work.',
  filterpanel: 'Give complex filtering room to breathe.',
  fileuploadrow: 'Show every file, every state, every next step.',

  sidebar: 'Keep primary destinations close without stealing the page.',
  appshell: 'Give the product a frame that stays steady.',
  card: 'Group what belongs together.',
  masonry: 'Pack uneven stories into a balanced wall.',
  splitpane: 'Let two related views share the same workspace.',
  scrollarea: 'Contain overflow without hiding the path.',
  formcolumns: 'Use columns only when the questions still read naturally.',

  tabs: 'Let people switch views without losing their place.',
  dropdownmenu: 'Keep secondary actions close and out of the way.',
  breadcrumbs: 'Leave a visible trail back.',
  accordion: 'Reveal detail without making the page endless.',
  menubar: 'Organize a deep command set into familiar territory.',
  megamenu: 'Make a large site map readable at a glance.',
  bottomnav: 'Keep the most important destinations under the thumb.',
  segmented: 'Make nearby modes feel immediately comparable.',
  disclosure: 'Let one question open one answer.',

  contextmenu: 'Put the next action right where the click happened.',
  dragdrop: 'Make moving something feel physical and reversible.',
  lightbox: 'Give the media the room, not the whole product.',
  sharesheet: 'Bring every sharing destination into one clear choice.',
  kanban: 'Make work move visibly from state to state.',

  alert: 'Say what happened and what to do next.',
  empty: 'Turn nothing here into a useful next step.',
  badge: 'Compress status into one readable signal.',
  avatars: 'Show the group without turning people into dots.',
  timeline: 'Make sequence and progress visible together.',
  skeleton: 'Hold the page steady while content arrives.',
  progress: 'Show the distance traveled and what remains.',
  spinner: 'Signal activity without pretending to know the finish.',
  notificationcenter: 'Keep updates available after the moment passes.',
  codeblock: 'Make code readable, copyable, and safe to scan.',
  shortcutkeys: 'Turn hidden commands into learnable moves.',
  presencedot: 'Show availability without demanding attention.',
  countdown: 'Make remaining time impossible to miss.',
  relativetime: 'Tell people when in human terms.',
  meter: 'Put a value in context with its range.',

  hero: 'Make the promise clear before the first scroll.',
  pricing: 'Make cost, value, and choice easy to compare.',
  testimonial: 'Let a real voice carry the proof.',
  faq: 'Answer hesitation before it becomes a blocker.',
  mediaplayer: 'Put playback control in the viewer’s hands.',
  cookieconsent: 'Ask for permission without holding the page hostage.',
  banner: 'Make one announcement visible across the site.',
};

export function patternStudioHeadline(id, title) {
  return PATTERN_STUDIO_HEADLINES[id] || `${title}: make the behavior impossible to miss.`;
}

function paragraphPrimer(paragraph, sentenceCount = 2) {
  const clean = String(paragraph || '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  const sentences = clean.match(/[^.!?]+[.!?]+/g) || [clean];
  const primer = sentences.slice(0, sentenceCount).map((sentence) => sentence.trim()).join(' ');
  if (primer.length <= 360) return primer;
  return sentences[0]?.trim() || clean;
}

export function patternStudioDescription(data = {}) {
  const firstParagraph = String(data.details || '').split(/\n\s*\n/)[0];

  if (firstParagraph) {
    return paragraphPrimer(firstParagraph);
  }

  const definition = String(data.definition || '').trim();
  const requirement = data.prompt?.requirements?.[0];
  if (definition && requirement) {
    const check = /[.!?]$/.test(requirement) ? requirement : `${requirement}.`;
    return `${definition} Build check: ${check}`;
  }
  return definition || 'Change the controls and watch the behavior respond in the live scene.';
}

export function patternStudioUseCase(data = {}) {
  const paragraphs = String(data.details || '')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const useCaseParagraph = paragraphs.slice(1).find((paragraph) => (
    /\b(use|uses|when|reach for|good fit|good fits|ideal|pick|choose|works well|right choice)\b/i.test(paragraph)
  ));

  return paragraphPrimer(useCaseParagraph || paragraphs[1], 2)
    || String(data.comparison || data.vibeTip || 'Use it when the pattern matches the job people are trying to finish.').trim();
}

export function patternStudioBuildWatch(data = {}) {
  return data.prompt?.requirements?.[0]
    || data.vibeTip
    || 'Keep the behavior visible, keyboard reachable, and comfortable on touch screens.';
}
