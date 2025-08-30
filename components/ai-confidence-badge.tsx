"use client"

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function AIConfidenceBadge({
  score,
  explanation,
  className,
}: {
  score: number // 0..1
  explanation: string
  className?: string
}) {
  const pct = Math.round(score * 100)
  const tone =
    pct >= 85
      ? "text-emerald-300 border-emerald-500/40 bg-emerald-500/10"
      : pct >= 60
        ? "text-amber-300 border-amber-500/40 bg-amber-500/10"
        : "text-zinc-300 border-zinc-500/40 bg-zinc-500/10"

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-2.5 py-1 border backdrop-blur",
              "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]",
              tone,
              className,
            )}
          >
            <span className="text-[10px] uppercase tracking-wide">AI Confidence</span>
            <span className="text-xs font-semibold">{pct}%</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-zinc-900/90 border border-white/10 text-zinc-200">
          <p className="text-xs">{explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
