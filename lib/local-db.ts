export type BankCode = "HDFC" | "YES" | "BANDHAN" | "ICICI" | "SBI"
export type Rail = "RTGS" | "NEFT" | "IMPS" | "WIRE"

export type TxLite = {
  id: string
  createdAt: number
  amount: number
  currency: string
  method: string
  customerEmail: string
  status: string
}

export type Contact = {
  id: string
  name: string
  email?: string
  bank: BankCode
  account: string
  ifsc: string
}

export const TX_KEY = "arealis:transactions"
export const CONTACTS_KEY = "arealis:contacts"
export const SETTINGS_BANKS_KEY = "arealis:settings:banks"
export const SETTINGS_RAILS_KEY = "arealis:settings:rails"

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function safeSet<T>(key: string, value: T) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(key, JSON.stringify(value))
  try {
    window.dispatchEvent(new StorageEvent("storage", { key }))
  } catch {
    // ignore environments that block synthetic StorageEvent
  }
}

export function listTransactions(): TxLite[] {
  return safeGet<TxLite[]>(TX_KEY, []).sort((a, b) => b.createdAt - a.createdAt)
}
export function saveTransactions(rows: TxLite[]) {
  safeSet(TX_KEY, rows)
}
export function addTransaction(tx: TxLite) {
  const rows = listTransactions()
  rows.unshift(tx)
  saveTransactions(rows)
}

export function listContacts(): Contact[] {
  return safeGet<Contact[]>(CONTACTS_KEY, [])
}
export function addContact(c: Contact) {
  const all = listContacts()
  all.unshift(c)
  safeSet(CONTACTS_KEY, all)
}
export function deleteContact(id: string) {
  const next = listContacts().filter((c) => c.id !== id)
  safeSet(CONTACTS_KEY, next)
}

export const BANKS: { code: BankCode; name: string }[] = [
  { code: "HDFC", name: "HDFC Bank" },
  { code: "YES", name: "YES Bank" },
  { code: "BANDHAN", name: "Bandhan Bank" },
  { code: "ICICI", name: "ICICI Bank" },
  { code: "SBI", name: "State Bank of India" },
]

export const RAILS: Rail[] = ["RTGS", "NEFT", "IMPS", "WIRE"]

export function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(n)
}

export function exportCSV(rows: Record<string, any>[], filename = "export.csv") {
  if (!rows.length) return
  const headers = Object.keys(rows[0])
  const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(","))].join(
    "\n",
  )
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
