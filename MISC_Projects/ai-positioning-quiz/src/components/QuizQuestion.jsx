import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function QuizQuestion({ question, selected, onSelect }) {
  const isMulti = question.multiSelect
  const shouldReduceMotion = useReducedMotion()
  const headingRef = useRef(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  function isOptionSelected(option) {
    if (isMulti) {
      return Array.isArray(selected) && selected.some(s => s.text === option.text)
    }
    return selected?.text === option.text
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4 min-h-[10rem]">
        {question.quote && (
          <blockquote className="border-l-2 border-primary pl-4 py-1">
            <p className="text-sm md:text-base italic text-muted-foreground">
              "{question.quote.text}"
            </p>
            <footer className="text-xs md:text-sm text-muted-foreground/70 mt-1">
              — {question.quote.source}
            </footer>
          </blockquote>
        )}
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-lg md:text-xl font-medium text-foreground leading-snug outline-none"
        >
          {question.text}
        </h2>
        {question.hint && (
          <span className="inline-flex self-start items-center text-xs font-medium px-2.5 py-1 rounded-full border border-primary/30 text-primary/80 bg-primary/5">
            {question.hint}
          </span>
        )}
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
        role={isMulti ? 'group' : 'radiogroup'}
        aria-label="Answer options"
      >
        {question.options.map((option, i) => {
          const isSelected = isOptionSelected(option)
          const isExclusive = option.exclusive
          return (
            <motion.button
              key={i}
              role={isMulti ? 'checkbox' : 'radio'}
              aria-checked={isSelected}
              onClick={() => onSelect(option)}
              whileTap={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.15 }}
              className={`rounded-xl border bg-card text-card-foreground p-4 md:p-5 text-left transition-colors h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isSelected
                  ? isExclusive
                    ? 'border-destructive bg-destructive/5'
                    : 'border-primary bg-primary/5'
                  : isExclusive
                  ? 'border-destructive/30 hover:border-destructive/50'
                  : 'hover:border-primary/40'
              }`}
            >
              <p className="text-sm md:text-base text-foreground leading-snug">{option.text}</p>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
