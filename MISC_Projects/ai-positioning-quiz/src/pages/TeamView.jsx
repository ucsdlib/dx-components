import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'
import { positions } from '@/data/positions'
import { getPosition } from '@/lib/scoring'
import MatrixDisplay from '@/components/MatrixDisplay'

export default function TeamView() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [filter, setFilter] = useState('All')

  const fetchResults = useCallback(async () => {
    try {
      const res = await fetch('/api/results')
      const data = await res.json()
      setSubmissions(data)
      setLastUpdated(new Date())
    } catch {
      // keep previous state on error
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchResults()
    const interval = setInterval(fetchResults, 15000)
    return () => clearInterval(interval)
  }, [fetchResults])

  const filtered = filter === 'All'
    ? submissions
    : submissions.filter(s => s.employmentType === filter)

  const teamPositionId = filtered.length > 0
    ? getPosition(
        filtered.reduce((sum, r) => sum + r.xScore, 0) / filtered.length,
        filtered.reduce((sum, r) => sum + r.yScore, 0) / filtered.length
      )
    : null

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 py-8">

        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Team Results</h1>
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={fetchResults}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Refresh results"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Take the quiz →
            </Link>
          </div>
        </div>

        {lastUpdated && (
          <p className="text-xs text-muted-foreground -mt-4">
            Last updated {lastUpdated.toLocaleTimeString()}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-16 text-muted-foreground text-sm">
            Loading...
          </div>
        ) : submissions.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-sm">
            No results yet. Share the quiz link to get started.
          </p>
        ) : (
          <>
            <div className="flex gap-2 flex-wrap">
              {['All', 'Student Employee', 'Full-Time Staff'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
                    filter === f
                      ? 'border-primary bg-primary/10 text-foreground font-medium'
                      : 'border-border text-muted-foreground hover:border-border/80 hover:bg-muted/30'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                No results match this filter.
              </p>
            ) : (
              <>
                <MatrixDisplay
                  highlightedId={null}
                  selectedId={null}
                  onSelect={() => {}}
                  submissions={filtered}
                  teamPositionId={teamPositionId}
                />

                <div className="flex flex-col gap-2">
                  <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Submissions ({filtered.length})
                  </h2>
                  <div className="flex flex-col gap-1">
                    {filtered.map((s, i) => (
                      <div
                        key={`${s.name}-${i}`}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-md border p-3 text-sm"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium">{s.name}</span>
                          <span className="text-muted-foreground text-xs">
                            {s.team} · {s.employmentType}
                          </span>
                        </div>
                        <div className="flex flex-col sm:items-end gap-0.5">
                          <span className="text-foreground/80">
                            {positions[s.positionId]?.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(s.submittedAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}

      </div>
    </div>
  )
}
