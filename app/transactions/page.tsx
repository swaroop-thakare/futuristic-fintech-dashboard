"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Filter, RotateCw, Download } from "lucide-react"
import { exportCSV, listTransactions, TX_KEY } from "@/lib/local-db"

type Step = "Initialize" | "Validate" | "Risk Scan" | "3DS / Consent" | "Authorize" | "Capture" | "Settle"
type Tx = {
  id: string
  createdAt: number
  amount: number
  currency: string
  method: string
  customerEmail: string
  status: Step | "Completed" | "Failed"
}

export default function TransactionsPage() {
  const [list, setList] = useState<Tx[]>([])
  const [q, setQ] = useState("")
  const [method, setMethod] = useState<string>("ALL")
  const [status, setStatus] = useState<string>("ALL")

  const reload = () => setList(listTransactions() as unknown as Tx[])

  useEffect(() => {
    reload()
    const onStorage = (e: StorageEvent) => {
      if (e.key === TX_KEY) reload()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const methods = useMemo(() => ["ALL", "CARD", "UPI", "WALLET", "NETBANKING", "RTGS", "NEFT", "IMPS", "WIRE"], [])
  const statuses = useMemo(
    () => [
      "ALL",
      "Initialize",
      "Validate",
      "Risk Scan",
      "3DS / Consent",
      "Authorize",
      "Capture",
      "Settle",
      "Completed",
      "Failed",
    ],
    [],
  )

  const filtered = list.filter((t) => {
    const matchQ = [t.id, t.customerEmail, t.method, t.currency].join("|").toLowerCase().includes(q.toLowerCase())
    const matchM = method === "ALL" || t.method === method
    const matchS = status === "ALL" || t.status === status
    return matchQ && matchM && matchS
  })

  function exportCsv() {
    if (!filtered.length) return
    exportCSV(
      filtered.map((t) => ({
        id: t.id,
        createdAt: new Date(t.createdAt).toISOString(),
        amount: t.amount,
        currency: t.currency,
        method: t.method,
        customerEmail: t.customerEmail,
        status: t.status,
      })),
      `transactions-${Date.now()}.csv`,
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Transactions</h1>
          <p className="text-sm text-white/70 mt-1">View, filter, and export all payments and payouts.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={reload} className="bg-white/10 text-white hover:bg-white/20">
            <RotateCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button onClick={exportCsv} className="bg-purple-500 text-black hover:bg-purple-400">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5 text-purple-300" /> Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="q" className="text-xs text-white/70">
                Search
              </Label>
              <Input
                id="q"
                placeholder="id, email, method…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-xs text-white/70">Method</Label>
              <div className="grid grid-cols-3 gap-2">
                {methods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={cn(
                      "rounded-md px-3 py-2 text-xs border backdrop-blur",
                      method === m
                        ? "bg-purple-500/15 text-purple-300 border-purple-500/40"
                        : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10",
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs text-white/70">Status</Label>
              <div className="grid grid-cols-3 gap-2">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={cn(
                      "rounded-md px-3 py-2 text-xs border backdrop-blur",
                      status === s
                        ? "bg-purple-500/15 text-purple-300 border-purple-500/40"
                        : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {!filtered.length ? (
        <p className="text-sm text-white/70">No results.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {filtered.map((t) => (
            <div key={t.id} className="glass-panel rounded-md p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-white/60">{new Date(t.createdAt).toLocaleString()}</div>
                <Badge
                  className={cn(
                    "border-none",
                    t.status === "Completed"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : t.status === "Failed"
                        ? "bg-amber-500/15 text-amber-300"
                        : "bg-purple-500/15 text-purple-300",
                  )}
                >
                  {t.status}
                </Badge>
              </div>
              <div className="mt-2 text-sm text-white/90 flex items-center justify-between">
                <span>
                  {t.amount} {t.currency} • {t.method}
                </span>
              </div>
              <div className="text-xs text-white/60">{t.customerEmail}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
