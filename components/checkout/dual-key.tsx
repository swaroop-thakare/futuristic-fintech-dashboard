"use client"

import { useEffect, useState } from "react"

export function DualKeyInterlock({ active }: { active: boolean }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!active) return
    setProgress(0)
    const id = setInterval(() => {
      setProgress((p) => {
        const n = Math.min(100, p + 4)
        if (n >= 100) clearInterval(id)
        return n
      })
    }, 30)
    return () => clearInterval(id)
  }, [active])

  const leftX = Math.min(0, -40 + (progress * 40) / 100)
  const rightX = Math.max(0, 40 - (progress * 40) / 100)
  const locked = progress >= 100

  return (
    <div className="relative h-20 w-full flex items-center justify-center">
      <svg width="220" height="70" viewBox="0 0 220 70" className="text-primary">
        <g transform={`translate(${70 + leftX},35)`}>
          <circle r="12" className="fill-transparent stroke-current" strokeWidth="2" />
          <rect x="12" y="-3" width="40" height="6" className="fill-current" rx="3" />
          <rect x="52" y="-3" width="8" height="6" className="fill-current" />
          <rect x="62" y="-3" width="6" height="6" className="fill-current" />
        </g>
        <g transform={`translate(${150 + rightX},35)`}>
          <circle r="12" className="fill-transparent stroke-current" strokeWidth="2" />
          <rect x="-52" y="-3" width="40" height="6" className="fill-current" rx="3" />
          <rect x="-60" y="-3" width="8" height="6" className="fill-current" />
          <rect x="-68" y="-3" width="6" height="6" className="fill-current" />
        </g>
        <g transform="translate(110,35)">
          <rect
            x="-8"
            y="-8"
            width="16"
            height="16"
            className={`fill-background stroke-current ${locked ? "text-emerald-400" : "text-primary"}`}
            strokeWidth="2"
            rx="3"
          />
          <rect
            x="-3"
            y="-15"
            width="6"
            height="7"
            className={`fill-transparent stroke-current ${locked ? "text-emerald-400" : "text-primary"}`}
            strokeWidth="2"
          />
        </g>
      </svg>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[11px] text-muted-foreground">
        {locked ? "Dual-key signed" : "Awaiting dual-key interlock"}
      </div>
    </div>
  )
}

export default DualKeyInterlock
