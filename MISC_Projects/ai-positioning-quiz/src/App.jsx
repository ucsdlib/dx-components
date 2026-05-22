import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { questions } from './data/questions'
import { computeResult } from './lib/scoring'
import { Button } from '@/components/ui/button'
import QuizIntro from './components/QuizIntro'
import QuizQuestion from './components/QuizQuestion'
import QuizResult from './components/QuizResult'
import ProgressBar from './components/ProgressBar'

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)

  function handleStart() {
    setScreen('question')
  }

  function handleSelect(option) {
    setSelected(option)
    setAnswers(prev => {
      const updated = [...prev]
      updated[currentQuestion] = { axis: questions[currentQuestion].axis, score: option.score }
      return updated
    })
  }

  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(i => i + 1)
      setSelected(null)
    } else {
      setScreen('calculating')
    }
  }

  function handleRetake() {
    setScreen('intro')
    setCurrentQuestion(0)
    setAnswers([])
    setSelected(null)
    setResult(null)
  }

  useEffect(() => {
    if (screen !== 'calculating') return
    const timer = setTimeout(() => {
      setResult(computeResult(answers))
      setScreen('result')
    }, 1500)
    return () => clearTimeout(timer)
  }, [screen])

  const isLastQuestion = currentQuestion === questions.length - 1

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl flex flex-col gap-6">

        {screen === 'question' && (
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
        )}

        <AnimatePresence mode="wait">
          {screen === 'intro' && (
            <QuizIntro key="intro" onStart={handleStart} />
          )}
          {screen === 'question' && (
            <AnimatePresence key="question" mode="wait">
              <QuizQuestion
                key={currentQuestion}
                question={questions[currentQuestion]}
                selected={selected}
                onSelect={handleSelect}
              />
            </AnimatePresence>
          )}
          {screen === 'calculating' && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center gap-6 py-24"
            >
              <p className="text-lg text-muted-foreground">Plotting your position...</p>
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
          {screen === 'result' && result && (
            <QuizResult key="result" positionId={result.positionId} onRetake={handleRetake} />
          )}
        </AnimatePresence>

        {screen === 'question' && (
          <div className="flex justify-end">
            <Button onClick={handleNext} disabled={selected === null}>
              {isLastQuestion ? 'Finish' : 'Next'}
            </Button>
          </div>
        )}

      </div>
    </div>
  )
}
