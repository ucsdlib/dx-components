import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

export default function QuizQuestion({ question, selected, onSelect }) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4 min-h-[10rem]">
        {question.quote && (
          <blockquote className="border-l-2 border-primary pl-4 py-1">
            <p className="text-sm italic text-muted-foreground">
              "{question.quote.text}"
            </p>
            <footer className="text-xs text-muted-foreground/70 mt-1">
              — {question.quote.source}
            </footer>
          </blockquote>
        )}
        <p className="text-lg font-medium text-foreground leading-snug">
          {question.text}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.options.map((option, i) => {
          const isSelected = selected?.text === option.text
          return (
            <motion.div
              key={i}
              whileTap={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <Card
                onClick={() => onSelect(option)}
                className={`p-4 cursor-pointer text-left transition-colors h-full ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/40'
                }`}
              >
                <p className="text-sm text-foreground leading-snug">
                  {option.text}
                </p>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
