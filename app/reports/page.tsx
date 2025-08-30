"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { exportCSV, listTransactions } from "@/lib/local-db"

type Tx = {
  id: string
  createdAt: number
  amount: number
  currency: string
  method: string
  customerEmail: string
  status: string
}

export default function ReportsPage() {
  const [rows, setRows] = useState<Tx[]>([])
  useEffect(() => {
    setRows(listTransactions() as unknown as Tx[])
  }, [])

  const totals = useMemo(() => {
    const totalINR = rows.filter((r) => r.currency === "INR").reduce((s, r) => s + Number(r.amount || 0), 0)
    const byMethod = rows.reduce<Record<string, number>>((acc, r) => {
      acc[r.method] = (acc[r.method] || 0) + Number(r.amount || 0)
      return acc
    }, {})
    return { totalINR, byMethod }
  }, [rows])

  function exportAll() {
    if (!rows.length) return
    exportCSV(
      rows.map((t) => ({
        id: t.id,
        createdAt: new Date(t.createdAt).toISOString(),
        amount: t.amount,
        currency: t.currency,
        method: t.method,
        customerEmail: t.customerEmail,
        status: t.status,
      })),
      "all-transactions.csv",
    )
  }

  function exportByMethod(method: string) {
    const subset = rows.filter((r) => r.method.includes(method))
    if (!subset.length) return
    exportCSV(
      subset.map((t) => ({
        id: t.id,
        createdAt: new Date(t.createdAt).toISOString(),
        amount: t.amount,
        currency: t.currency,
        method: t.method,
        customerEmail: t.customerEmail,
        status: t.status,
      })),
      `${method}-transactions.csv`,
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Reports</h1>
        <p className="text-sm text-white/70">Generate and export financial reports with one click.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-white">Total Volume (INR)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-purple-300">{totals.totalINR.toLocaleString("en-IN")}</div>
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-white">Top Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-white/80">
            {Object.entries(totals.byMethod)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([m, v]) => (
                <div key={m} className="flex items-center justify-between">
                  <span>{m}</span>
                  <span className="text-white/90">{v.toLocaleString("en-IN")}</span>
                </div>
              ))}
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-white">Exports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={exportAll} className="w-full bg-purple-500 text-black hover:bg-purple-400">
              Export All
            </Button>
            <div className="grid grid-cols-4 gap-2">
              {["RTGS", "NEFT", "IMPS", "WIRE"].map((m) => (
                <Button key={m} onClick={() => exportByMethod(m)} className="bg-white/10 text-white hover:bg-white/20">
                  {m}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
