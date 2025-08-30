"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Receipt, Filter, RotateCw, Download } from "lucide-react"

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

const TX_KEY = "arealis:transactions"
const txStore = {
  all(): Tx[] {
    try {
      return JSON.parse(localStorage.getItem(TX_KEY) || "[]")
    } catch {
      return []
    }
  },
}

export default function MerchantPage() {
  const [list, setList] = useState<Tx[]>([])
  const [q, setQ] = useState("")

  function reload() {
    setList(txStore.all())
  }

  useEffect(() => {
    reload()
    const onStorage = (e: StorageEvent) => {
      if (e.key === TX_KEY) reload()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  function exportCsv(rows: Tx[]) {
    const header = ["id", "createdAt", "amount", "currency", "method", "customerEmail", "status"]
    const body = rows.map((r) => [
      r.id,
      new Date(r.createdAt).toISOString(),
      r.amount,
      r.currency,
      r.method,
      r.customerEmail,
      r.status,
    ])
    const csv = [header, ...body]
      .map((line) => line.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transactions-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = list.filter((t) =>
    [t.id, t.customerEmail, t.method, t.currency].join("|").toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Merchant • Transactions</h1>
          <p className="text-sm text-white/70 mt-1">Search, review, and export recent transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={reload} className="bg-white/10 text-white hover:bg-white/20">
            <RotateCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button onClick={() => exportCsv(filtered)} className="bg-purple-500 text-black hover:bg-purple-400">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      <Card className="glass-panel">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5 text-purple-300" /> Filters
          </CardTitle>
          <div className="w-80">
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
        </CardHeader>
        <CardContent>
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
                    <Receipt className="h-4 w-4 text-white/60" aria-hidden />
                  </div>
                  <div className="text-xs text-white/60">{t.customerEmail}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
