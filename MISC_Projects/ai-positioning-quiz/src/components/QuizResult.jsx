import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { positions, axisDescriptions } from '@/data/positions'
import MatrixDisplay from './MatrixDisplay'

function AxisPill({ label, variant = 'secondary' }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant={variant} className="cursor-help">{label}</Badge>
      </TooltipTrigger>
      <TooltipContent className="max-w-[220px] text-center">
        {axisDescriptions[label]}
      </TooltipContent>
    </Tooltip>
  )
}

export default function QuizResult({ positionId, onRetake }) {
  const position = positions[positionId]
  const [selectedId, setSelectedId] = useState(positionId)
  const selectedPosition = positions[selectedId]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 py-8"
    >
      <div className="flex flex-col gap-3">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl font-semibold tracking-tight text-foreground"
        >
          {position.name}
        </motion.h1>

        <div className="flex gap-2 flex-wrap">
          <AxisPill label={position.xLabel} />
          <AxisPill label={position.yLabel} />
        </div>
      </div>

      <MatrixDisplay
        highlightedId={positionId}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <AnimatePresence mode="wait">
        {selectedId === positionId ? (
          <motion.p
            key={selectedId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-base text-foreground/80 leading-relaxed"
          >
            {selectedPosition.description}
          </motion.p>
        ) : (
          <motion.div
            key={selectedId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <span className="text-base font-medium text-foreground">
                  {selectedPosition.name}
                </span>
                <div className="flex gap-2 flex-wrap pt-1">
                  <AxisPill label={selectedPosition.xLabel} variant="outline" />
                  <AxisPill label={selectedPosition.yLabel} variant="outline" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base text-foreground/80 leading-relaxed">
                  {selectedPosition.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-sm text-muted-foreground">
        Want to go deeper?{' '}
        <a
          href="https://ucsdlibrary.atlassian.net/wiki/x/AwAU3w"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline underline-offset-2 hover:text-foreground/70 transition-colors"
        >
          The full matrix is documented on LiSN.
        </a>
      </p>

      <div className="rounded-lg border bg-muted/40 p-4 flex flex-col gap-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          No position is better or worse than another. The best fit depends on
          your workflow, experience level, and the specific problem you're solving.
        </p>
        <p>
          Mixed positioning is normal. You might sit in one position for some
          work while landing somewhere else entirely for other aspects. You
          shouldn't expect to fit neatly inside a single box.
        </p>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={onRetake}>
          Retake quiz
        </Button>
      </div>
    </motion.div>
  )
}
