import { Redis } from '@upstash/redis'
const kv = Redis.fromEnv()

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const slugs = await kv.smembers('submissions_index')
  if (!slugs || slugs.length === 0) return res.status(200).json([])

  const submissions = await Promise.all(slugs.map(slug => kv.get(`submission:${slug}`)))

  const sorted = submissions
    .filter(Boolean)
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))

  return res.status(200).json(sorted)
}
