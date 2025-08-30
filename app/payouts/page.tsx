"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BankSelector from "@/components/bank-selector"
import { RAILS, TX_KEY } from "@/lib/local-db"

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

export default function PayoutsPage() {
  const [amount, setAmount] = useState("10000")
  const [currency, setCurrency] = useState("INR")
  const [beneficiary, setBeneficiary] = useState("Acme Vendor")
  const [email, setEmail] = useState("vendor@example.com")
  const [account, setAccount] = useState("1234567890")
  const [ifsc, setIfsc] = useState("HDFC0000001")
  const [bank, setBank] = useState<string>("HDFC")
  const [rail, setRail] = useState<string>("RTGS")
  const [busy, setBusy] = useState(false)

  function saveTx(tx: Tx) {
    const list = JSON.parse(localStorage.getItem(TX_KEY) || "[]") as Tx[]
    list.unshift(tx)
    localStorage.setItem(TX_KEY, JSON.stringify(list))
    try {
      window.dispatchEvent(new StorageEvent("storage", { key: TX_KEY }))
    } catch {}
  }

  function schedulePayout() {
    setBusy(true)
    const tx: Tx = {
      id: `ptx_${Date.now()}`,
      createdAt: Date.now(),
      amount: Number(amount || 0),
      currency,
      method: `${rail}-${bank}`,
      customerEmail: email,
      status: "Initialize",
    }
    saveTx(tx)
    // simulate short processing then completion
    setTimeout(() => {
      saveTx({ ...tx, status: "Completed" })
      setBusy(false)
    }, 1200)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Payouts</h1>
        <p className="text-sm text-white/70">Schedule single or bulk payouts via RTGS, NEFT, IMPS, or Wire.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-white">Payout Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80">Amount</Label>
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Currency</Label>
                <Input
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <div>
              <Label className="text-white/80">Beneficiary</Label>
              <Input
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80">Account</Label>
                <Input
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">IFSC</Label>
                <Input
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <div>
              <Label className="text-white/80">Email (notification)</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-white/80 mb-2 block">Select Bank</Label>
              <BankSelector value={bank as any} onChange={(b) => setBank(b)} />
            </div>
            <div>
              <Label className="text-white/80 mb-2 block">Transfer Rail</Label>
              <div className="grid grid-cols-4 gap-2">
                {RAILS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRail(r)}
                    className={
                      "rounded-md px-3 py-2 text-xs border backdrop-blur " +
                      (rail === r
                        ? "bg-purple-500/15 text-purple-300 border-purple-500/40"
                        : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10")
                    }
                    aria-pressed={rail === r}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <Button
              disabled={busy}
              onClick={schedulePayout}
              className="w-full bg-purple-500 text-black hover:bg-purple-400"
            >
              {busy ? "Scheduling…" : "Schedule Payout"}
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-white">Hints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-white/70">
            <p>RTGS is ideal for high-value transfers during banking hours.</p>
            <p>NEFT batches at intervals; IMPS is near real-time 24/7.</p>
            <p>Wire is best for international settlements.</p>
          </CardContent>
        </Card>
      </div>

      <section id="approvals" className="space-y-2">
        <h2 className="text-lg font-medium text-white">Workflow Approvals</h2>
        <p className="text-sm text-white/70">Configure multi-user approvals for high-value payouts.</p>
      </section>
    </main>
  )
}
