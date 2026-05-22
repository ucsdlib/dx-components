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

export default function MatrixDisplay({ highlightedId, selectedId, onSelect }) {
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
                const isHighlighted = position.id === highlightedId
                const isSelected = position.id === selectedId
                return (
                  <button
                    key={position.id}
                    onClick={() => onSelect(position.id)}
                    className={`rounded-md border p-2 flex flex-col gap-0.5 transition-colors text-left cursor-pointer ${
                      isHighlighted
                        ? 'border-primary bg-primary/10 text-foreground'
                        : isSelected
                        ? 'border-primary/50 bg-primary/5 text-foreground/80'
                        : 'border-border bg-muted/30 text-muted-foreground/60 hover:border-border/80 hover:bg-muted/50'
                    }`}
                  >
                    <span className="text-xs font-mono leading-none">{position.id}</span>
                    <span className={`text-xs leading-snug ${isHighlighted || isSelected ? 'font-medium' : ''}`}>
                      {position.name}
                    </span>
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
