import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { teams } from '@/data/teams'

export default function QuizIntro({ onStart }) {
  const [name, setName] = useState('')
  const [team, setTeam] = useState('')
  const [employmentType, setEmploymentType] = useState('')

  const canStart = name.trim() !== '' && team !== '' && employmentType !== ''

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center gap-6 py-12"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Where do you stand on AI?
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          A positioning quiz for the UCSD Library DX team
        </p>
      </div>

      <p className="max-w-prose text-base md:text-lg text-foreground/80 leading-relaxed">
        This quiz places you on a 3×3 Individual AI Positioning Matrix based on
        how you use AI in your work and how deliberately you approach those
        choices. There are no right or wrong answers. Every position reflects a
        different way of working. This quiz should take 5 minutes.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <select
          value={team}
          onChange={e => setTeam(e.target.value)}
          aria-label="Your team"
          className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="" disabled>Select your team</option>
          {teams.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <div
          role="group"
          aria-label="Employment type"
          className="flex rounded-md border border-input overflow-hidden"
        >
          {['Student Employee', 'Full-Time Staff'].map(option => (
            <button
              key={option}
              type="button"
              onClick={() => setEmploymentType(option)}
              aria-pressed={employmentType === option}
              className={`flex-1 px-4 py-2 text-sm transition-colors ${
                employmentType === option
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <Button
        size="lg"
        disabled={!canStart}
        onClick={() => onStart(name.trim(), team, employmentType)}
      >
        Start
      </Button>
    </motion.div>
  )
}
