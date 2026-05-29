import { Redis } from '@upstash/redis'
const kv = Redis.fromEnv()

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, team, employmentType, xScore, yScore, positionId, xLabel, yLabel } = req.body ?? {}

  if (!name || !team || !employmentType || xScore == null || yScore == null || !positionId || !xLabel || !yLabel) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (!['Student Employee', 'Full-Time Staff'].includes(employmentType)) {
    return res.status(400).json({ error: 'Invalid employmentType' })
  }

  const slug = name.toLowerCase().trim().replace(/\s+/g, '-')
  const submission = { name, team, employmentType, xScore, yScore, positionId, xLabel, yLabel, submittedAt: new Date().toISOString() }

  await kv.set(`submission:${slug}`, submission)
  await kv.sadd('submissions_index', slug)

  return res.status(200).json({ ok: true })
}
