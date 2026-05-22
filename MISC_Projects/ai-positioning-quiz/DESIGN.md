# DESIGN.md — Visual Source of Truth

## Design Philosophy

Clean, neutral, non-judgmental. No position is better than another — the design must not imply ranking or hierarchy. Calm and reflective in tone, not gamified or competitive.

---

## Component Library

**shadcn/ui** is the primary component source. Use these components, do not rebuild them:

| Component | Usage |
|---|---|
| `Card` | Answer option cards |
| `Button` | Navigation (Next, Start, Retake) |
| `Progress` | Question progress bar |

The matrix visualization on the result screen is a **custom CSS grid component** (`MatrixDisplay`). No shadcn equivalent — build from scratch.

---

## Color Palette

Take cues from UCSD brand where appropriate. Otherwise: clean neutral base with one accent color for highlights.

- Background: neutral (white or near-white)
- Text: dark neutral (near-black)
- Accent: one color used for selected states, highlighted matrix cell, progress fill, and active borders
- Quote block accent: left border in accent color
- Muted: used for non-selected matrix cells and secondary text

Avoid using color to imply hierarchy between answer options or matrix positions.

---

## Typography

- Question text: legible, medium weight, larger size
- Answer option text: regular weight, slightly smaller than question
- Quote block: italic, smaller than question text, left border accent, distinct from question
- Position name (result screen): large heading
- Axis pills: small, label-style
- Description: body text, readable line length

---

## Layout — General

- Mobile-first. All screens must be usable on small screens.
- Max content width: centered, reasonable reading width (e.g. `max-w-2xl` or `max-w-3xl`)
- Consistent padding/spacing via Tailwind spacing scale

---

## Screen Specs

### Intro Screen

- Title: "Where do you stand on AI?" — prominent heading
- Subtitle: "A positioning quiz for the UCSD Library DX team"
- Body: 2–3 sentences of framing (places you on a matrix, no right/wrong answers, ~3 minutes)
- CTA: `Button` — "Start"
- Centered layout, vertically centered on screen

### Question Screen

- Top: progress indicator — "Question X of 14" + `Progress` bar
- Question text — prominent
- If `quote` is present: styled blockquote above or below the question text
  - Italic text, smaller size, left border in accent color, attribution line
- Answer options: 4 `Card` components, stacked vertically on mobile, 2-column grid on desktop
- Selected card: distinct border color or background tint (accent-colored border preferred)
- "Next" button: disabled until an option is selected, enabled on selection
- No back button

### Calculating Screen

- Centered text: "Plotting your position..."
- Simple animated indicator (spinner or pulsing dots — Framer Motion)
- Displayed for exactly 1.5 seconds, then auto-advances to result

### Result Screen

Layout order (top to bottom):

1. **Position name** — large heading
2. **Axis pills** — two small pill/badge components: X bucket label + Y bucket label (e.g. "Hybrid Navigator" · "Balanced")
3. **Matrix visualization** — `MatrixDisplay` component (see below)
4. **Position description** — body text, verbatim placeholder from PRD
5. **Caveat block** — fixed copy (see below), visually distinct (muted background or border)
6. **CTA** — `Button` — "Retake quiz"

#### Caveat block copy (verbatim — do not change)

```
No position is better or worse than another — the best fit depends on your workflow,
experience level, and the specific problem you're solving.

Mixed positioning is normal. You might sit in one position for some work while landing
somewhere else entirely for other aspects. You shouldn't expect to fit neatly inside a
single box.
```

---

## MatrixDisplay Component

Custom 3×3 CSS grid. Do not use a table.

**Columns (X-axis, left → right):**
Human Craft | Hybrid Navigator | Integrated AI

**Rows (Y-axis, top → bottom):**
Intentional & Planned | Balanced | Flexible / Ad-hoc

Each cell shows:
- Position number (small, secondary)
- Position name (readable)

Highlighted cell (user's result):
- Distinct background (accent tint) or solid accent border
- Clearly differentiated from the other 8 cells

Non-highlighted cells:
- Muted — lower contrast text, neutral background

Axis labels:
- X-axis labels: shown along the bottom or top edge
- Y-axis labels: shown along the left edge (rotated or stacked)

Responsive: must work on mobile. On small screens, cells can be compact but must remain readable.

---

## Answer Option Cards

- Full-width cards, stacked vertically on mobile
- 2-column grid on desktop (2×2 arrangement for 4 options)
- Default state: neutral border, white/neutral background
- Selected state: accent-colored border, optional light accent background tint
- Hover state: subtle border color shift
- No radio buttons or checkboxes — the card itself is the interactive element
- Text is left-aligned inside the card

---

## Animation (Framer Motion)

All animations must stay under 0.4 seconds to avoid feeling slow.

| Transition | Behavior |
|---|---|
| Intro → first question | Fade in |
| Question → next question | Slide left — new question enters from right |
| Last question → calculating | Fade to calculating screen |
| Calculating → result | Fade in result; position name drifts upward slightly on entry |
| Answer card selection | Scale pulse: scale 1.02, duration 0.15s |

Use `AnimatePresence` from Framer Motion to handle question-to-question transitions cleanly.

---

## Responsive Behavior

| Breakpoint | Answer options | Matrix |
|---|---|---|
| Mobile (< md) | 1 column (stacked) | Compact cells, all 9 visible |
| Desktop (≥ md) | 2-column grid (2×2) | Full-size cells |

All text must remain readable at mobile sizes. No horizontal scrolling.

---

## What Not to Do

- Do not use color to imply that one answer or position is better
- Do not add decorative illustration or heavy imagery — keep it content-focused
- Do not add loading states or skeleton screens — there is no backend
- Do not gamify (no scores shown mid-quiz, no streaks, no badges)
- Do not show the user's raw score on the result screen
