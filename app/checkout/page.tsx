"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Shield,
  Zap,
  CreditCard,
  Wallet,
  Landmark,
  Network,
  Receipt,
  CheckCircle2,
  Sparkles,
  KeySquare,
} from "lucide-react"
import { AIConfidenceBadge } from "@/components/checkout/ai-confidence-badge"

// Types
type PaymentMethod = "CARD" | "UPI" | "WALLET" | "NETBANKING" | "RTGS" | "NEFT" | "IMPS" | "WIRE"
type Step = "Initialize" | "Validate" | "Risk Scan" | "3DS / Consent" | "Authorize" | "Capture" | "Settle"

type Tx = {
  id: string
  createdAt: number
  amount: number
  currency: string
  method: PaymentMethod
  customerEmail: string
  status: Step | "Completed" | "Failed"
  steps: { name: Step; ok: boolean; info: string; confidence: number }[]
}

// Local storage helpers
const TX_KEY = "arealis:transactions"
const txStore = {
  all(): Tx[] {
    if (typeof window === "undefined") return []
    try {
      return JSON.parse(localStorage.getItem(TX_KEY) || "[]")
    } catch {
      return []
    }
  },
  save(list: Tx[]) {
    localStorage.setItem(TX_KEY, JSON.stringify(list))
    window.dispatchEvent(new StorageEvent("storage", { key: TX_KEY }))
  },
  upsert(tx: Tx) {
    const list = txStore.all()
    const idx = list.findIndex((t) => t.id === tx.id)
    if (idx >= 0) list[idx] = tx
    else list.unshift(tx)
    txStore.save(list)
  },
}

// Small UI atoms
function SecureBadge() {
  return (
    <div className="flex items-center gap-2 text-xs text-white/70">
      <Shield className="h-4 w-4 text-emerald-400" aria-hidden />
      <span>PCI DSS | Tokenized | AES-256</span>
    </div>
  )
}

function MethodPill({ icon: Icon, label, active }: { icon: any; label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "glass-panel cy-glow flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer",
        active ? "ring-2 ring-purple-400/50" : "hover:ring-1 hover:ring-purple-400/30",
      )}
    >
      <Icon className="h-4 w-4 text-purple-300" aria-hidden />
      <span className="text-sm text-white/90">{label}</span>
    </div>
  )
}

// Dual-key interlock visual
function DualKeyInterlock({ active }: { active: boolean }) {
  return (
    <div className="relative h-14 w-20 mx-auto">
      <div
        className={cn(
          "absolute left-2 top-2 text-purple-300 transition-transform",
          active && "animate-[interlock_0.7s_ease-in-out_infinite]",
        )}
      >
        <KeySquare className="h-10 w-10" aria-hidden />
      </div>
      <div
        className={cn(
          "absolute right-2 bottom-2 text-emerald-300 transition-transform",
          active && "animate-[interlock_0.7s_ease-in-out_infinite_reverse]",
        )}
      >
        <KeySquare className="h-10 w-10" aria-hidden />
      </div>
    </div>
  )
}

// Processing Timeline
function ProcessingTimeline({ tx }: { tx: Tx }) {
  const steps: Step[] = ["Initialize", "Validate", "Risk Scan", "3DS / Consent", "Authorize", "Capture", "Settle"]
  const currentIndex = steps.findIndex((s) => s === tx.status)

  return (
    <ol className="space-y-2">
      {steps.map((s, i) => {
        const done = i < currentIndex
        const active = i === currentIndex
        const meta = tx.steps.find((st) => st.name === s)
        return (
          <li
            key={s}
            className={cn(
              "glass-panel rounded-md p-3 flex items-start gap-3",
              active && "ring-2 ring-purple-400/40",
              done && "opacity-100",
              !done && !active && "opacity-70",
            )}
          >
            {done ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5" aria-hidden />
            ) : active ? (
              <Zap className="h-4 w-4 text-purple-300 mt-0.5" aria-hidden />
            ) : (
              <Receipt className="h-4 w-4 text-white/60 mt-0.5" aria-hidden />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/90">{s}</p>
                {meta && <AIConfidenceBadge confidence={meta.confidence} explanation={meta.info} />}
              </div>
              {meta && <p className="text-xs text-white/70 mt-1">{meta.info}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default function CheckoutPage() {
  const [amount, setAmount] = useState("5000")
  const [currency, setCurrency] = useState("INR")
  const [email, setEmail] = useState("customer@example.com")
  const [method, setMethod] = useState<PaymentMethod>("CARD")
  const [tx, setTx] = useState<Tx | null>(null)
  const [busy, setBusy] = useState(false)

  const methodIcons: Record<PaymentMethod, any> = {
    CARD: CreditCard,
    UPI: Network,
    WALLET: Wallet,
    NETBANKING: Landmark,
    RTGS: Landmark,
    NEFT: Landmark,
    IMPS: Network,
    WIRE: Landmark,
  }

  function startProcessing() {
    const id = `tx_${Date.now()}`
    const base: Tx = {
      id,
      createdAt: Date.now(),
      amount: Number(amount || 0),
      currency,
      method,
      customerEmail: email,
      status: "Initialize",
      steps: [],
    }
    setBusy(true)
    setTx(base)
    txStore.upsert(base)

    // Simulate step-by-step processing on client
    const plan: { name: Step; delay: number; info: string; conf: number }[] = [
      { name: "Initialize", delay: 500, info: "Merchant session and token prepared", conf: 0.98 },
      { name: "Validate", delay: 700, info: "Schema, amount, and currency validated", conf: 0.95 },
      { name: "Risk Scan", delay: 900, info: "Heuristics and velocity checks passed", conf: 0.84 },
      {
        name: "3DS / Consent",
        delay: method === "CARD" ? 1200 : 600,
        info: method === "CARD" ? "3DS challenge completed" : "User consent verified",
        conf: 0.9,
      },
      { name: "Authorize", delay: 800, info: "Issuer/Bank authorization ok", conf: 0.88 },
      { name: "Capture", delay: 700, info: "Amount captured", conf: 0.92 },
      {
        name: "Settle",
        delay: 900,
        info:
          method === "RTGS"
            ? "RTGS settlement window mapped"
            : method === "NEFT"
              ? "NEFT batch scheduled"
              : method === "IMPS"
                ? "IMPS real-time transfer"
                : method === "WIRE"
                  ? "SWIFT wire queued"
                  : "Settlement scheduled",
        conf: 0.86,
      },
    ]

    let cursor = 0
    function advance() {
      const step = plan[cursor]
      if (!step) {
        const done = { ...base, status: "Completed" as const }
        setTx(done)
        txStore.upsert(done)
        setBusy(false)
        return
      }
      const next: Tx = {
        ...(txStore.all().find((t) => t.id === id) || base),
        status: step.name,
        steps: [
          ...base.steps,
          ...plan.slice(0, cursor + 1).map((p) => ({ name: p.name, ok: true, info: p.info, confidence: p.conf })),
        ],
      }
      setTx(next)
      txStore.upsert(next)
      cursor++
      setTimeout(advance, step.delay)
    }
    setTimeout(advance, plan[0].delay)
  }

  const MethodsGrid = useMemo(() => {
    const methods: { key: PaymentMethod; label: string }[] = [
      { key: "CARD", label: "Card" },
      { key: "UPI", label: "UPI" },
      { key: "WALLET", label: "Wallet" },
      { key: "NETBANKING", label: "NetBanking" },
      { key: "RTGS", label: "RTGS (High Value)" },
      { key: "NEFT", label: "NEFT" },
      { key: "IMPS", label: "IMPS" },
      { key: "WIRE", label: "Wire Transfer" },
    ]
    return methods
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-balance text-2xl font-semibold text-white">Futuristic Checkout</h1>
          <p className="text-sm text-white/70 mt-1">Secure, tokenized, and explainable payment processing</p>
        </div>
        <SecureBadge />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-white">Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80">Amount</Label>
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="5000"
                />
              </div>
              <div>
                <Label className="text-white/80">Currency</Label>
                <Input
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="INR"
                />
              </div>
            </div>
            <div>
              <Label className="text-white/80">Customer Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="customer@example.com"
              />
            </div>

            <div>
              <Label className="text-white/80 mb-2 block">Payment Method</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {MethodsGrid.map((m) => {
                  const Icon = methodIcons[m.key]
                  const active = method === m.key
                  return (
                    <button key={m.key} type="button" onClick={() => setMethod(m.key)} className="text-left">
                      <MethodPill icon={Icon} label={m.label} active={active} />
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <Sparkles className="h-4 w-4 text-purple-300" aria-hidden />
                <span>AI Risk Assist enabled</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/70">
                <Landmark className="h-4 w-4 text-emerald-300" aria-hidden />
                <span>Settlement track on</span>
              </div>
            </div>

            <Button
              disabled={busy}
              onClick={startProcessing}
              className="w-full bg-purple-500 text-black hover:bg-purple-400"
            >
              {busy ? "Processing…" : "Pay Securely"}
            </Button>
          </CardContent>
        </Card>

        {/* Live Processing */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-300" aria-hidden /> Processing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tx ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/80">
                    <div>
                      ID: <span className="text-white/95">{tx.id}</span>
                    </div>
                    <div>
                      Amount:{" "}
                      <span className="text-white/95">
                        {tx.amount} {tx.currency}
                      </span>
                    </div>
                    <div>
                      Method: <span className="text-white/95">{tx.method}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <DualKeyInterlock active={busy || (tx.status !== "Completed" && tx.status !== "Failed")} />
                    <div className="mt-2">
                      <SecureBadge />
                    </div>
                  </div>
                </div>
                <ProcessingTimeline tx={tx} />
                {tx.status === "Completed" && (
                  <div className="glass-panel rounded-md p-3 flex items-center gap-2 ring-2 ring-emerald-400/40">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden />
                    <p className="text-sm text-emerald-300">Payment completed and scheduled for settlement.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm text-white/70">
                Initiate a payment to view live, explainable processing with risk confidence indicators.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent transactions */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <RecentTransactions />
        </CardContent>
      </Card>
    </div>
  )
}

function RecentTransactions() {
  const [list, setList] = useState<Tx[]>([])
  useEffect(() => {
    function load() {
      setList(txStore.all().slice(0, 8))
    }
    load()
    const onStorage = (e: StorageEvent) => {
      if (e.key === TX_KEY) load()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])
  if (!list.length) return <p className="text-sm text-white/70">No transactions yet.</p>
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {list.map((t) => (
        <div key={t.id} className="glass-panel rounded-md p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60">{new Date(t.createdAt).toLocaleTimeString()}</span>
            <Badge
              className={cn(
                "border-none",
                t.status === "Completed" ? "bg-emerald-500/15 text-emerald-300" : "bg-purple-500/15 text-purple-300",
              )}
            >
              {t.status}
            </Badge>
          </div>
          <div className="mt-2 text-sm text-white/90">
            {t.amount} {t.currency} • {t.method}
          </div>
          <div className="text-xs text-white/60">{t.customerEmail}</div>
        </div>
      ))}
    </div>
  )
}
