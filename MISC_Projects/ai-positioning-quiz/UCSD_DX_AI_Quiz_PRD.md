# PRD: UCSD Library DX Team — Individual AI Positioning Quiz

## Overview

A web-based quiz that places UCSD Library Digital Experience (DX) team members on a 3×3 Individual AI Positioning Matrix. The quiz is designed to spark curiosity and self-reflection — not to evaluate performance. No position is better or worse than another.

**Audience:** UCSD Library DX team (internal tool)
**Hosting:** Vercel
**Stack:** React, Framer Motion, shadcn/ui, Tailwind CSS

---

## Goals

1. Help DX team members identify and articulate their current AI positioning
2. Spark team conversation about AI use, ethics, and decision-making
3. Produce a result that feels accurate, non-judgmental, and worth sharing

---

## Tech Stack Notes

- **React** — component-based quiz flow with state management (useState/useReducer)
- **Framer Motion** — page transitions between questions, result screen animation
- **shadcn/ui** — Button, Card, Progress components
- **Tailwind CSS** — utility styling
- **No backend required** — all scoring logic runs client-side
- **No auth required** — anonymous, single-session use
- **Vercel** — deploy directly from GitHub repo

Suggested file structure:
```
/src
  /components
    QuizIntro.jsx
    QuizQuestion.jsx
    QuizResult.jsx
    MatrixDisplay.jsx
    ProgressBar.jsx
  /data
    questions.js       ← all 14 questions, options, scores
    positions.js       ← all 9 position names, descriptions, coordinates
  /lib
    scoring.js         ← scoring logic and threshold functions
  App.jsx
  main.jsx
```

---

## Quiz Flow

```
Intro screen
    ↓
Question 1 of 14  →  Question 2 of 14  →  ...  →  Question 14 of 14
    ↓
Calculating screen (brief, 1–2 seconds)
    ↓
Result screen
```

### Intro screen
- Title: "Where do you stand on AI?"
- Subtitle: "A positioning quiz for the UCSD Library DX team"
- Brief framing (2–3 sentences): explain that this places them on a matrix, no right or wrong answers, takes ~3 minutes
- CTA button: "Start"

### Question screen
- Show current question number and progress bar (e.g. "3 of 14")
- Display question text
- If question has a quote: display it in a styled blockquote above or below the question text, with attribution
- Display 4 answer options as selectable cards
- On selection: highlight chosen option, enable "Next" button
- On "Next": advance to next question with Framer Motion transition
- No ability to go back (keeps it simple and prevents overthinking)

### Calculating screen
- Brief animated screen: "Plotting your position..."
- 1.5 second delay before result loads (creates anticipation)

### Result screen
- Headline: position name (e.g. "Balanced Navigator")
- Position description (source doc text — see positions data below)
- 3×3 matrix visualization with user's position highlighted
- "Mixed positioning is normal" caveat (see copy below)
- Optional: "What this means for you" — 1–2 sentences of context (to be added manually later)
- Share or restart button

---

## Scoring Logic

### Two axes scored independently

**X-axis — Role of AI in work**
Measures how deeply AI is embedded in day-to-day practice.

**Y-axis — Decision-making style**
Measures how structured and deliberate the person's approach to AI is.

### Per-question scoring

Each question scores either the X-axis or the Y-axis (never both).
Each answer option carries a point value: −2, −1, +1, or +2.
There is no 0 option — every answer nudges in a direction.

### Score range

7 questions per axis × max ±2 per question = range of −14 to +14 per axis.

### Bucket thresholds

| Score range | Bucket | X-axis label | Y-axis label |
|---|---|---|---|
| −14 to −5 | Low | Human Craft | Flexible / Ad-hoc |
| −4 to +4 | Mid | Hybrid Navigator | Balanced |
| +5 to +14 | High | Integrated AI | Intentional & Planned |

### Matrix placement

Combine X bucket and Y bucket to determine one of 9 positions:

```
Y \ X        Human Craft    Hybrid Navigator    Integrated AI
Intentional      7                8                   9
Balanced         4                5                   6
Flexible         1                2                   3
```

### Edge cases

- **Boundary scores (exactly −5 or +5):** Place in the outer bucket (low or high). The mid bucket is −4 to +4 inclusive.
- **All same score:** Valid result — place normally.
- **No tie-breaking question needed** — the 14-question spread provides sufficient separation.

### Scoring implementation (pseudocode)

```js
// questions.js structure
{
  id: 1,
  axis: 'x',  // 'x' or 'y'
  text: "On a typical workday...",
  quote: null,  // or { text: "...", source: "..." }
  options: [
    { text: "Rarely or never...", score: -2 },
    { text: "Occasionally...", score: -1 },
    { text: "Regularly...", score: 1 },
    { text: "All the time...", score: 2 },
  ]
}

// scoring.js
function getBucket(score) {
  if (score <= -5) return 0;   // low
  if (score >= 5)  return 2;   // high
  return 1;                     // mid
}

function getPosition(xScore, yScore) {
  const xBucket = getBucket(xScore); // 0, 1, 2
  const yBucket = getBucket(yScore); // 0, 1, 2
  // matrix[yBucket][xBucket]
  const matrix = [
    [1, 2, 3],  // flexible (y=0)
    [4, 5, 6],  // balanced (y=1)
    [7, 8, 9],  // intentional (y=2)
  ];
  return matrix[yBucket][xBucket];
}
```

---

## All 14 Questions

Questions alternate X and Y axis throughout. Do not reorder them.

```js
export const questions = [
  {
    id: 1,
    axis: 'x',
    text: "On a typical workday, how often do AI tools play a role in what you produce?",
    quote: null,
    options: [
      { text: "Rarely or never — my work is almost entirely self-directed", score: -2 },
      { text: "Occasionally, for specific one-off tasks", score: -1 },
      { text: "Regularly, for a handful of recurring tasks", score: 1 },
      { text: "All the time — AI is embedded in most of how I work", score: 2 },
    ]
  },
  {
    id: 2,
    axis: 'y',
    text: "Researchers found that human minds are \"better than Bayesian\" — capable of intuitive leaps, ethical reasoning, and detecting exceptions that AI simply sums across. How does that shape how you decide when to bring AI into your work?",
    quote: { text: "Human minds are better than Bayesian in many ways — our somatic markers enable intuitive leaps that a purely Bayesian approach cannot replicate.", source: "Harvard Gazette / Antonio Damasio" },
    options: [
      { text: "It doesn't really factor in — I just decide based on what's in front of me", score: -2 },
      { text: "It's somewhere in the back of my mind but I haven't formalized it", score: -1 },
      { text: "It reinforces general principles I already try to apply", score: 1 },
      { text: "It's part of why I've built specific criteria for when AI is and isn't appropriate", score: 2 },
    ]
  },
  {
    id: 3,
    axis: 'x',
    text: "When you're working on a DX project — a new feature, a content update, a UX problem — at what point does AI typically enter your process?",
    quote: null,
    options: [
      { text: "It doesn't — I work through design and content problems without it", score: -2 },
      { text: "At the end, maybe — to review, summarize, or clean up", score: -1 },
      { text: "In the middle — I reach for it when I hit a specific snag", score: 1 },
      { text: "From the start — it's part of how I frame and approach the problem", score: 2 },
    ]
  },
  {
    id: 4,
    axis: 'y',
    text: "If a colleague asked why you used — or didn't use — AI for something you just finished, what would your answer sound like?",
    quote: null,
    options: [
      { text: "Honestly, I'd just say it felt right in the moment", score: -2 },
      { text: "I'd point to some general instincts I have, nothing formal", score: -1 },
      { text: "I'd reference a set of principles I've developed over time", score: 1 },
      { text: "I'd walk them through the framework I use to make that call", score: 2 },
    ]
  },
  {
    id: 5,
    axis: 'x',
    text: "Think about the last project or task you completed at work. What role did AI play?",
    quote: null,
    options: [
      { text: "None — I handled it entirely without AI", score: -2 },
      { text: "Minor — I might have used it for one small part", score: -1 },
      { text: "Meaningful — it helped with a few distinct parts", score: 1 },
      { text: "Central — it was involved throughout most of the work", score: 2 },
    ]
  },
  {
    id: 6,
    axis: 'y',
    text: "Your team is about to launch a new digital service. Someone suggests using an AI tool to speed up a key part of the build. What's your instinct?",
    quote: null,
    options: [
      { text: "Jump in and see what happens — I'll figure out if it works as I go", score: -2 },
      { text: "Try it out, guided by a general sense of whether it feels appropriate", score: -1 },
      { text: "Weigh it against principles I already have about AI in my work", score: 1 },
      { text: "Run it through my framework — I have clear criteria for decisions like this", score: 2 },
    ]
  },
  {
    id: 7,
    axis: 'x',
    text: "How do you feel when AI tools aren't available for a task you're working on?",
    quote: null,
    options: [
      { text: "Relieved, or indifferent — I wasn't planning to use them anyway", score: -2 },
      { text: "Mildly inconvenienced for certain tasks", score: -1 },
      { text: "Noticeably slowed down — I'd have to rework my approach", score: 1 },
      { text: "Significantly disrupted — AI is load-bearing in my workflow", score: 2 },
    ]
  },
  {
    id: 8,
    axis: 'y',
    text: "Academic library staff report a wide range of comfort levels with AI, alongside shared concerns about ethics and privacy. As someone on the DX team — a team with real influence over how the library adopts technology — how defined is your personal ethical framework for AI use?",
    quote: { text: "Library professionals have concerns about AI including but not limited to ethics, privacy, and training.", source: "Tips and Trends: AI Developments and Resources for Academic Librarians" },
    options: [
      { text: "Still forming — I haven't landed anywhere firm yet", score: -2 },
      { text: "I have general values but haven't thought through AI specifically", score: -1 },
      { text: "I have a clear personal stance on AI ethics, even if it's not written down", score: 1 },
      { text: "I have an articulated, documented position I can explain and defend", score: 2 },
    ]
  },
  {
    id: 9,
    axis: 'x',
    text: "The DX team shapes how the UCSD Library shows up digitally. How much is AI shaping how you do that work right now?",
    quote: null,
    options: [
      { text: "Not much — my digital work is still primarily human-led", score: -2 },
      { text: "A little — I'm experimenting in low-stakes areas", score: -1 },
      { text: "Meaningfully — AI influences several parts of how I approach DX work", score: 1 },
      { text: "Significantly — AI is central to how I think about and execute DX work", score: 2 },
    ]
  },
  {
    id: 10,
    axis: 'y',
    text: "\"With the right priorities and guardrails, AI can help advance science, cure diseases, build new industries, and maintain human dignity.\" How close are you to having your own version of those guardrails defined?",
    quote: { text: "With the right priorities and guardrails, AI can help advance science, cure diseases, build new industries, expand joy, and maintain human dignity.", source: "The Case Against AI Everything, Everywhere, All at Once — TIME" },
    options: [
      { text: "I haven't really started — I respond to AI as situations come up", score: -2 },
      { text: "I have some instincts but nothing I'd call guardrails yet", score: -1 },
      { text: "I have working principles I apply, even if they're not written down", score: 1 },
      { text: "I have a clear, documented personal framework I actively use", score: 2 },
    ]
  },
  {
    id: 11,
    axis: 'x',
    text: "When you're writing — whether that's documentation, UX copy, a proposal, or an email — where does AI fit?",
    quote: null,
    options: [
      { text: "I write everything myself — AI doesn't touch my written work", score: -2 },
      { text: "I occasionally use it to polish or check something I've already written", score: -1 },
      { text: "I use it to draft, iterate, or think through structure alongside my own writing", score: 1 },
      { text: "It's a core part of my writing process — most of my written work involves AI at some stage", score: 2 },
    ]
  },
  {
    id: 12,
    axis: 'y',
    text: "You come across a new AI tool that looks genuinely useful for your work. What do you do?",
    quote: null,
    options: [
      { text: "Try it out — I'll work out whether and how it fits as I experiment", score: -2 },
      { text: "Explore it with some informal gut-checks about whether it seems appropriate", score: -1 },
      { text: "Evaluate it against the principles I already use to guide my AI choices", score: 1 },
      { text: "Put it through a deliberate process — I have criteria for adopting new tools", score: 2 },
    ]
  },
  {
    id: 13,
    axis: 'x',
    text: "Think about how you approach a problem you haven't solved before — a new technical challenge, an unfamiliar design pattern, a tricky content decision. What role does AI play in that process?",
    quote: null,
    options: [
      { text: "I research and work through it myself — AI isn't part of my exploration process", score: -2 },
      { text: "I might check AI after I've already formed my own approach", score: -1 },
      { text: "I use AI as one of several inputs while I'm actively figuring it out", score: 1 },
      { text: "AI is usually my first move — it's how I orient myself on new problems", score: 2 },
    ]
  },
  {
    id: 14,
    axis: 'y',
    text: "When something goes wrong with an AI-assisted task — the output is off, a decision backfires, or the tool misleads you — what do you do differently next time?",
    quote: null,
    options: [
      { text: "I note it mentally and stay more cautious, but I don't change my approach formally", score: -2 },
      { text: "I adjust my instincts — I'm more careful in similar situations going forward", score: -1 },
      { text: "I update the principles I use to guide when and how I use AI", score: 1 },
      { text: "I revise my framework — failure is part of how I actively maintain and improve it", score: 2 },
    ]
  },
];
```

---

## All 9 Positions

Position descriptions are taken verbatim from the source document. These are placeholders — the quiz owner will revise them manually.

```js
export const positions = {
  1: {
    id: 1,
    name: "Flexible Human Craft",
    xLabel: "Human Craft",
    yLabel: "Flexible / Ad-hoc",
    xIndex: 0,  // column in matrix (0=left, 1=mid, 2=right)
    yIndex: 0,  // row in matrix (0=bottom, 1=mid, 2=top)
    description: "I primarily rely on my own expertise and craftsmanship. I explore AI only when a spontaneous need pops up, and any tool use stays informal and self-directed.",
  },
  2: {
    id: 2,
    name: "Flexible Navigator",
    xLabel: "Hybrid Navigator",
    yLabel: "Flexible / Ad-hoc",
    xIndex: 1,
    yIndex: 0,
    description: "I bring AI tools into my workflow on an ad-hoc basis to solve certain challenges, deciding on a case-by-case basis which tool fits the moment.",
  },
  3: {
    id: 3,
    name: "Flexible Integration",
    xLabel: "Integrated AI",
    yLabel: "Flexible / Ad-hoc",
    xIndex: 2,
    yIndex: 0,
    description: "AI is part of my everyday toolbox; I pick and experiment with models and tools on the spot, learning as I go.",
  },
  4: {
    id: 4,
    name: "Balanced Human Craft",
    xLabel: "Human Craft",
    yLabel: "Balanced",
    xIndex: 0,
    yIndex: 1,
    description: "I follow a set of general principles that I use to determine the limited situations when I use AI in my work. I can still adjust those principles in real time if justified.",
  },
  5: {
    id: 5,
    name: "Balanced Navigator",
    xLabel: "Hybrid Navigator",
    yLabel: "Balanced",
    xIndex: 1,
    yIndex: 1,
    description: "I work from my own general guidelines that outline when AI is appropriate. I am open to deviating from this when I have a good reason.",
  },
  6: {
    id: 6,
    name: "Balanced AI Integration",
    xLabel: "Integrated AI",
    yLabel: "Balanced",
    xIndex: 2,
    yIndex: 1,
    description: "I've created general guidelines for myself that guide my adoption of AI tools across most areas of my work.",
  },
  7: {
    id: 7,
    name: "Intentional Human Craft",
    xLabel: "Human Craft",
    yLabel: "Intentional & Planned",
    xIndex: 0,
    yIndex: 2,
    description: "I use AI only after I've crossed a clear, pre-agreed decision point (e.g., I've created a checklist for myself to use before running a generative model).",
  },
  8: {
    id: 8,
    name: "Intentional Navigator",
    xLabel: "Hybrid Navigator",
    yLabel: "Intentional & Planned",
    xIndex: 1,
    yIndex: 2,
    description: "I have identified and documented when I do and don't want to use AI. I use it for some types of work, but not for others.",
  },
  9: {
    id: 9,
    name: "Intentional Integration",
    xLabel: "Integrated AI",
    yLabel: "Intentional & Planned",
    xIndex: 2,
    yIndex: 2,
    description: "I have articulated a framework for my use of AI across most or all areas of my work. I actively use AI tools within this framework.",
  },
};
```

---

## Result Screen Spec

### Layout
1. **Position name** — large heading
2. **Axis labels** — two small pills showing X and Y bucket (e.g. "Hybrid Navigator" + "Balanced")
3. **Matrix visualization** — 3×3 grid, user's cell highlighted. All 9 cells labeled. Non-selected cells are muted.
4. **Position description** — source doc text (verbatim, to be revised later)
5. **Caveat block** — fixed copy below description (see below)
6. **CTA** — "Retake quiz" button

### Caveat block copy (verbatim from source doc)
```
No position is better or worse than another — the best fit depends on your workflow, 
experience level, and the specific problem you're solving.

Mixed positioning is normal. You might sit in one position for some work while landing 
somewhere else entirely for other aspects. You shouldn't expect to fit neatly inside a 
single box.
```

### Matrix visualization component notes
- 3 columns (X-axis): Human Craft | Hybrid Navigator | Integrated AI
- 3 rows (Y-axis, top to bottom): Intentional & Planned | Balanced | Flexible / Ad-hoc
- Highlighted cell: distinct background color or border
- All cells show position number + name
- Axis labels shown along edges
- Responsive — should work on mobile

---

## Animation Notes (Framer Motion)

- **Question transitions:** slide left on advance (new question slides in from right)
- **Intro → first question:** fade in
- **Last question → calculating screen:** fade to calculating screen
- **Calculating → result:** fade in result with slight upward drift on position name
- **Answer selection:** subtle scale pulse on selected card (scale 1.02, duration 0.15s)
- Keep all animations under 0.4s to avoid feeling slow

---

## Design Notes

- Use shadcn/ui `Card` for answer options, `Button` for navigation, `Progress` for progress bar
- Answer options: full-width cards, stacked vertically on mobile, 2-column grid on desktop
- Selected state: distinct border color or background tint on the card
- Quote blocks: styled differently from question text — smaller, italic, left border accent
- Color palette: take cues from UCSD brand if desired, otherwise clean neutral with one accent color for highlights
- The matrix on the result screen is a custom component — no shadcn equivalent, build it as a CSS grid

---

## Out of Scope (for this version)

- No user accounts or saved results
- No analytics or result aggregation
- No email or sharing functionality beyond a basic "copy result" or screenshot prompt
- No admin panel
- No backend

---

## Source Documents

- **Individual Positioning Matrix for AI** (adapted from "Mapping my AI Positioning") — primary source of truth for matrix structure, position names, descriptions, and key principles
- **Is AI dulling our minds?** — Harvard Gazette (Q2 quote)
- **The Case Against AI Everything, Everywhere, All at Once** — TIME (Q10 quote)
- **Tips and Trends: AI Developments and Resources for Academic Librarians** — Instruction Section (Q8 quote)
- **Meet the academics refusing to use generative AI** — informed Q8 framing (earlier draft)
- **How One College Library Plans to Cut Through the AI Hype** — informed Q9 framing
