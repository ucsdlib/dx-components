import { Progress } from '@/components/ui/progress'

export default function ProgressBar({ current, total }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-sm text-muted-foreground">
        Question {current} of {total}
      </p>
      <Progress value={(current / total) * 100} className="h-1.5" />
    </div>
  )
}
