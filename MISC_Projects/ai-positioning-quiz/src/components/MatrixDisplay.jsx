import { positions } from '@/data/positions'

const X_LABELS = ['Human Craft', 'Hybrid Navigator', 'Integrated AI']
const Y_LABELS = ['Intentional & Planned', 'Balanced', 'Flexible / Ad-hoc']

// Build a 3x3 grid indexed [row][col], row 0 = top (Intentional), row 2 = bottom (Flexible)
const grid = Array.from({ length: 3 }, (_, row) =>
  Array.from({ length: 3 }, (_, col) => {
    const yIndex = 2 - row
    return Object.values(positions).find(p => p.xIndex === col && p.yIndex === yIndex)
  })
)

export default function MatrixDisplay({ highlightedId, selectedId, onSelect, submissions, teamPositionId }) {
  const isTeamMode = Array.isArray(submissions)

  const submissionsByPosition = {}
  if (isTeamMode) {
    for (const s of submissions) {
      if (!submissionsByPosition[s.positionId]) submissionsByPosition[s.positionId] = []
      submissionsByPosition[s.positionId].push(s)
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[280px] flex flex-col gap-1">

        {/* X-axis labels */}
        <div className="grid grid-cols-3 gap-1">
          {X_LABELS.map(label => (
            <div key={label} className="text-center text-xs text-muted-foreground font-medium px-1">
              {label}
            </div>
          ))}
        </div>

        {/* Rows */}
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col gap-1">
            {/* Y-axis row label */}
            <div className="text-xs text-muted-foreground font-medium pt-1 border-t border-border/50">
              {Y_LABELS[rowIndex]}
            </div>

            {/* Cells */}
            <div className="grid grid-cols-3 gap-1">
              {row.map(position => {
                const isHighlighted = !isTeamMode && position.id === highlightedId
                const isSelected = position.id === selectedId
                const isTeamAvg = isTeamMode && position.id === teamPositionId
                const cellSubs = isTeamMode ? (submissionsByPosition[position.id] ?? []) : []
                const visibleSubs = cellSubs.slice(0, 3)
                const overflow = cellSubs.length - 3

                const cellClassName = [
                  'rounded-md border p-2 flex flex-col gap-0.5 text-left w-full cursor-pointer transition-colors',
                  isHighlighted
                    ? 'border-primary bg-primary/10 text-foreground'
                    : isSelected || isTeamAvg
                    ? 'border-primary/50 bg-primary/5 text-foreground/80'
                    : 'border-border bg-muted/30 text-muted-foreground/60 hover:border-border/80 hover:bg-muted/50',
                ].filter(Boolean).join(' ')

                const inner = (
                  <>
                    <span className="text-xs font-mono leading-none">{position.id}</span>
                    <span className={`text-xs leading-snug ${isHighlighted || isSelected || isTeamAvg ? 'font-medium' : ''}`}>
                      {position.name}
                    </span>
                    {isTeamMode && (cellSubs.length > 0 || isTeamAvg) && (
                      <div className="flex flex-wrap gap-0.5 mt-0.5">
                        {visibleSubs.map((s, i) => (
                          <span key={i} className="text-[10px] bg-muted text-muted-foreground px-1 py-0.5 rounded truncate max-w-[52px]">
                            {s.name.split(' ')[0]}
                          </span>
                        ))}
                        {overflow > 0 && (
                          <span className="text-[10px] text-muted-foreground px-0.5 py-0.5">+{overflow}</span>
                        )}
                        {isTeamAvg && (
                          <span className="text-[10px] bg-primary/20 text-primary px-1 py-0.5 rounded font-medium">
                            Team Avg
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )

                return (
                  <button
                    key={position.id}
                    onClick={() => onSelect(position.id)}
                    className={cellClassName}
                  >
                    {inner}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
