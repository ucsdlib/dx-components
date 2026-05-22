# CLAUDE.md — Behavioral Contract

## Project Overview

**UCSD Library DX Team — Individual AI Positioning Quiz**
A web-based quiz that places DX team members on a 3×3 Individual AI Positioning Matrix. Internal tool. No right or wrong answers.

**Hosting:** Vercel (deploy from GitHub)
**Audience:** UCSD Library Digital Experience team

---

## Stack

| Layer | Choice |
|---|---|
| UI framework | React (functional components, hooks only) |
| Styling | Tailwind CSS |
| Component library | shadcn/ui (Button, Card, Progress) |
| Animation | Framer Motion |
| Build tool | Vite |
| Deployment | Vercel |

No backend. No auth. All logic is client-side, single-session.

---

## Build & Dev Commands

```bash
npm run dev       # local dev server
npm run build     # production build
npm run preview   # preview production build
```

---

## File Structure

```
/src
  /components
    QuizIntro.jsx
    QuizQuestion.jsx
    QuizResult.jsx
    MatrixDisplay.jsx
    ProgressBar.jsx
  /data
    questions.js      ← 14 questions, options, scores (verbatim from PRD)
    positions.js      ← 9 positions: names, descriptions, coordinates
  /lib
    scoring.js        ← getBucket(), getPosition() functions
  App.jsx
  main.jsx
```

---

## Coding Standards

- Functional components only. No class components.
- State lives in `App.jsx` via `useState`. Use `useReducer` if state grows complex.
- No prop drilling beyond 2 levels — lift state or use context if needed.
- No external state library (Redux, Zustand, etc.) for this project scope.
- Keep components single-responsibility. `QuizQuestion` renders a question — it does not score.
- All scoring logic lives in `/lib/scoring.js`. Components do not compute scores inline.
- All quiz content (questions, positions) lives in `/data`. Never hardcode content in components.
- Do not add features, abstractions, or error handling beyond what the PRD specifies.
- No comments unless the WHY is non-obvious.

---

## Quiz Flow

```
QuizIntro → QuizQuestion (×14) → Calculating screen (1.5s) → QuizResult
```

- No back navigation between questions.
- Calculating screen is a timed delay only — no actual computation happens there.
- Result is computed once, after all 14 answers are collected.

---

## Scoring Logic

Two axes, scored independently:

**X-axis** — Role of AI in work (how deeply AI is embedded)
**Y-axis** — Decision-making style (how structured/deliberate the approach is)

Each question scores one axis. Each answer: −2, −1, +1, or +2 (no 0).
7 questions per axis → score range −14 to +14 per axis.

```js
// scoring.js
function getBucket(score) {
  if (score <= -5) return 0;  // low
  if (score >= 5)  return 2;  // high
  return 1;                    // mid
}

function getPosition(xScore, yScore) {
  const xBucket = getBucket(xScore);
  const yBucket = getBucket(yScore);
  const matrix = [
    [1, 2, 3],  // flexible (y=0)
    [4, 5, 6],  // balanced (y=1)
    [7, 8, 9],  // intentional (y=2)
  ];
  return matrix[yBucket][xBucket];
}
```

Bucket thresholds:

| Score | Bucket | X label | Y label |
|---|---|---|---|
| ≤ −5 | Low | Human Craft | Flexible / Ad-hoc |
| −4 to +4 | Mid | Hybrid Navigator | Balanced |
| ≥ +5 | High | Integrated AI | Intentional & Planned |

Boundary scores (exactly −5 or +5) go to the outer bucket (low or high). Mid is −4 to +4 inclusive.

---

## Data Shape

### questions.js

```js
{
  id: Number,           // 1–14
  axis: 'x' | 'y',
  text: String,
  quote: null | { text: String, source: String },
  options: [
    { text: String, score: -2 | -1 | 1 | 2 }
  ]  // always 4 options
}
```

Questions must not be reordered. They alternate X/Y axis.

### positions.js

```js
{
  [id]: {
    id: Number,         // 1–9
    name: String,
    xLabel: String,
    yLabel: String,
    xIndex: 0 | 1 | 2, // column: 0=Human Craft, 1=Hybrid, 2=Integrated
    yIndex: 0 | 1 | 2, // row: 0=Flexible, 1=Balanced, 2=Intentional
    description: String
  }
}
```

Position descriptions are verbatim from the PRD and are placeholder text — the quiz owner will revise them.

---

## Out of Scope

- No user accounts or saved results
- No analytics or result aggregation
- No sharing beyond a basic copy/screenshot prompt
- No admin panel
- No backend
- No ability to go back between questions
