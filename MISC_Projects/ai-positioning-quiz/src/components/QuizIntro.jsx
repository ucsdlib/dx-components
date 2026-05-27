import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function QuizIntro({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center gap-6 py-16"
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
        choices. There are no right or wrong answers. Every position reflects a different way of working. This quiz should take 5 minutes.
      </p>

      <Button size="lg" onClick={onStart}>
        Start
      </Button>
    </motion.div>
  )
}
