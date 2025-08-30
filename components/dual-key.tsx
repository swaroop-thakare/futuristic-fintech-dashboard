"use client"

export function DualKeyInterlock({ engaged }: { engaged: boolean }) {
  return (
    <div className="relative h-10 w-20">
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded bg-zinc-900/40 border border-white/10 backdrop-blur flex items-center justify-center transition-transform duration-500"
        style={{ transform: engaged ? ("translate(14px,-50%) rotate(-8deg)" as any) : "translate(0px,-50%)" }}
      >
        <span className="text-purple-300 text-xs">K1</span>
      </div>
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded bg-zinc-900/40 border border-white/10 backdrop-blur flex items-center justify-center transition-transform duration-500"
        style={{ transform: engaged ? ("translate(-14px,-50%) rotate(8deg)" as any) : "translate(0px,-50%)" }}
      >
        <span className="text-purple-300 text-xs">K2</span>
      </div>
      {engaged && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-1 w-6 rounded bg-emerald-400/70 animate-pulse" />
        </div>
      )}
    </div>
  )
}
