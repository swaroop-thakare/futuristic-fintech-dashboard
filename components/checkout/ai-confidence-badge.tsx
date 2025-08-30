"use client"

import { useMemo } from "react"

export function AIConfidenceBadge({ confidence, explanation }: { confidence: number; explanation: string }) {
  const pct = Math.round(confidence * 100)
  const palette = useMemo(() => {
    if (pct >= 85) return "text-emerald-400"
    if (pct >= 60) return "text-amber-400"
    return "text-red-400"
  }, [pct])

  return (
    <div className="relative group inline-flex items-center">
      <div
        className={`flex items-center gap-1 rounded-full bg-background/70 border border-border px-2 py-1 ${palette}`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-current animate-pulse" aria-hidden />
        <span className="text-[11px] font-medium">{pct}% AI</span>
      </div>
      <div
        role="tooltip"
        className="invisible group-hover:visible absolute left-1/2 top-[125%] -translate-x-1/2 z-50 w-64 rounded-md bg-card border border-border px-3 py-2 text-xs text-foreground shadow-lg"
      >
        <div className="font-medium mb-1">AI Assessment</div>
        <div className="text-muted-foreground">{explanation}</div>
      </div>
    </div>
  )
}

export default AIConfidenceBadge
