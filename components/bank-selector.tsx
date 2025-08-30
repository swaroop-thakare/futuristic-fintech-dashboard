"use client"

import { useState } from "react"
import { BANKS, type BankCode } from "@/lib/local-db"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function BankSelector({
  value,
  onChange,
  className,
}: {
  value?: BankCode
  onChange?: (code: BankCode) => void
  className?: string
}) {
  const [selected, setSelected] = useState<BankCode | undefined>(value)
  const pick = (code: BankCode) => {
    setSelected(code)
    onChange?.(code)
  }
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 gap-3", className)}>
      {BANKS.map((b) => (
        <button
          key={b.code}
          type="button"
          onClick={() => pick(b.code)}
          className={cn(
            "group relative rounded-md p-3 text-left bg-zinc-900/40 border border-white/10 backdrop-blur",
            "hover:border-purple-500/50 hover:shadow-[0_0_0_1px_rgba(168,85,247,0.3)] transition",
            selected === b.code && "border-purple-500/70 shadow-[0_0_0_1px_rgba(168,85,247,0.5)]",
          )}
          aria-pressed={selected === b.code}
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-zinc-200">{b.name}</div>
            {selected === b.code ? (
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40">Selected</Badge>
            ) : (
              <span className="text-xs text-zinc-400">Tap</span>
            )}
          </div>
          <div className="mt-2 text-[10px] text-zinc-400">{b.code}</div>
        </button>
      ))}
    </div>
  )
}
