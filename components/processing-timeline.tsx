"use client"

type Step = { id: string; label: string; status: "pending" | "active" | "done" | "failed" }
export function ProcessingTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-2">
      {steps.map((s, i) => (
        <li key={s.id} className="flex items-center gap-3">
          <span
            className={[
              "inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px]",
              " ", // spacer to avoid TS union on array join
              s.status === "done" && "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
              s.status === "active" && "border-purple-500/40 text-purple-300 bg-purple-500/10 animate-pulse",
              s.status === "failed" && "border-amber-500/40 text-amber-300 bg-amber-500/10",
              s.status === "pending" && "border-zinc-500/40 text-zinc-300 bg-zinc-500/10",
            ].join(" ")}
            aria-label={`Step ${i + 1} ${s.status}`}
          >
            {i + 1}
          </span>
          <span className="text-sm text-zinc-200">{s.label}</span>
        </li>
      ))}
    </ol>
  )
}
