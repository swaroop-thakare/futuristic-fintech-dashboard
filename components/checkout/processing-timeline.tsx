"use client"

const steps = [
  "Validate request",
  "Risk & compliance scan",
  "Route to bank rail",
  "Dual-key signing",
  "Bank processing",
  "Settlement + Confirmation",
]

export function ProcessingTimeline({ activeStep }: { activeStep: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
      {steps.map((label, idx) => {
        const isActive = idx === activeStep
        const isDone = idx < activeStep
        return (
          <div
            key={label}
            className={`rounded-md px-3 py-3 border ${isActive ? "border-primary/60 bg-card" : "border-border bg-card"}`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  isDone ? "bg-emerald-400" : isActive ? "bg-primary animate-pulse" : "bg-muted-foreground/40"
                }`}
                aria-hidden
              />
              <div className="text-xs text-foreground">{label}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProcessingTimeline
