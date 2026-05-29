/**
 * Clears all quiz submissions from Vercel KV.
 *
 * Usage (from the ai-positioning-quiz directory):
 *   node --env-file=.env.local scripts/clear-kv.js
 *
 * Requires .env.local to exist with KV_REST_API_URL and KV_REST_API_TOKEN.
 * Run `vercel env pull .env.local` first if you don't have it yet.
 */

import { Redis } from '@upstash/redis'
const kv = Redis.fromEnv()

const slugs = await kv.smembers('submissions_index')

if (slugs.length === 0) {
  console.log('Nothing to clear — KV store has no submissions.')
  process.exit(0)
}

console.log(`Found ${slugs.length} submission(s): ${slugs.join(', ')}`)

const submissionKeys = slugs.map(slug => `submission:${slug}`)
await kv.del(...submissionKeys, 'submissions_index')

console.log(`Cleared ${slugs.length} submission(s) and reset the index.`)
