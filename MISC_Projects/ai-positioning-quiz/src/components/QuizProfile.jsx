import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { teams } from '@/data/teams'

const EMPLOYMENT_TYPES = [
  { value: 'Student Employee', description: 'Work-study or hourly student position' },
  { value: 'Full-Time Staff', description: 'Career or career-track library staff' },
]

export default function QuizProfile({ onContinue }) {
  const shouldReduceMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [team, setTeam] = useState('')
  const [employmentType, setEmploymentType] = useState('')

  const canContinue = name.trim() !== '' && team !== '' && employmentType !== ''

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 py-8"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Before you begin
        </h2>
        <p className="text-base text-muted-foreground">
          Your answers are shared with your team — this helps us see where everyone lands together.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="quiz-name" className="text-sm font-medium text-foreground">
            Your name
          </label>
          <input
            id="quiz-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="First and last name"
            className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="quiz-team" className="text-sm font-medium text-foreground">
            Your team
          </label>
          <select
            id="quiz-team"
            value={team}
            onChange={e => setTeam(e.target.value)}
            className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="" disabled>Select your team</option>
            {teams.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Employment type</span>
          <div
            role="radiogroup"
            aria-label="Employment type"
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {EMPLOYMENT_TYPES.map(({ value, description }) => {
              const isSelected = employmentType === value
              return (
                <motion.button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setEmploymentType(value)}
                  whileTap={shouldReduceMotion ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                  className={`rounded-xl border bg-card p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'hover:border-primary/40'
                  }`}
                >
                  <p className="text-base font-medium text-foreground">{value}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          size="lg"
          disabled={!canContinue}
          onClick={() => onContinue(name.trim(), team, employmentType)}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  )
}
