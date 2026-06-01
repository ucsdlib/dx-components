# Individual Positioning Quiz

## Description

This quiz features a series of questions to help gauge where you land on a 3x3 matrix of AI usage positions. These positions were created by Doug Worsham at the UC San Diego Library and this quiz was created to help the DX team at the Library work out their approaches to AI.

## Quiz Creation

To create this quiz I researched numerous articles describing different perspectives on AI ranging from a personal, industry, and library/academia perspective. Using these sources I created the quiz questions and built the quiz utilizing React and deployed with Vercel.

## Project Details

### Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, shadcn/ui, Framer Motion
- **Routing:** React Router
- **Storage:** Upstash Redis (`@upstash/redis`) — one record per person, overwritten on retake
- **Deployment:** Vercel (manual deploys via CLI, no GitHub integration)

### Local Development

Requires Node 20+ and the [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`).

```bash
# from the repo root
cd MISC_Projects/ai-positioning-quiz
npm install
npm run dev
```

The dev server runs the UI only. The Share Results button will return a 404 locally — the API routes are Vercel serverless functions and only run in a deployed environment. To test the full submission flow, deploy to Vercel and test on the live URL.

> `vercel dev` is not supported for this project due to a routing conflict between Vite and the SPA rewrite rule.

### Environment Variables

Two variables are required, both sourced from the [Upstash dashboard](https://console.upstash.com):

| Variable | Description |
|---|---|
| `UPSTASH_REDIS_REST_URL` | REST endpoint for the Upstash Redis database |
| `UPSTASH_REDIS_REST_TOKEN` | Auth token for the Upstash Redis database |

Add both to your Vercel project under **Settings → Environment Variables** (Production environment). Then pull them locally:

```bash
vercel env pull .env.local
```

`.env.local` is gitignored and should never be committed.

### Deploying

All deploys are manual via the Vercel CLI. There is no GitHub integration.

```bash
cd MISC_Projects/ai-positioning-quiz
vercel --prod
```

To reset all quiz submissions from storage (e.g. after a test run):

```bash
node --env-file=.env.local scripts/clear-kv.js
```

