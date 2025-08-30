"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMemo, useState } from "react"

const data = [
  { id: "TXN-884201", name: "Acme Supplies", amount: 45000, method: "NEFT", status: "Success", time: "2h ago" },
  { id: "TXN-884189", name: "Globex LLC", amount: 325000, method: "RTGS", status: "Pending", time: "3h ago" },
  { id: "TXN-884155", name: "John Rao", amount: 12500, method: "IMPS", status: "Failed", time: "5h ago" },
  { id: "TXN-884122", name: "Innotech", amount: 88000, method: "NEFT", status: "Success", time: "Yesterday" },
]

function StatusBadge({ status }: { status: string }) {
  const variant = status === "Success" ? "default" : status === "Pending" ? "secondary" : "destructive"
  return <Badge variant={variant as any}>{status}</Badge>
}

export function RecentTransactions() {
  const [method, setMethod] = useState<string>("all")
  const filtered = useMemo(() => (method === "all" ? data : data.filter((d) => d.method === method)), [method])

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-sm">Recent Transactions</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Method</span>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger className="h-8 w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="RTGS">RTGS</SelectItem>
              <SelectItem value="NEFT">NEFT</SelectItem>
              <SelectItem value="IMPS">IMPS</SelectItem>
              <SelectItem value="Card">Card</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr className="[&>th]:py-2 [&>th]:text-left">
              <th>ID</th>
              <th>Beneficiary</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody className="[&>tr>*]:py-2 border-t">
            {filtered.map((d) => (
              <tr key={d.id} className="border-b last:border-0">
                <td className="font-mono text-xs">{d.id}</td>
                <td>{d.name}</td>
                <td>₹ {d.amount.toLocaleString("en-IN")}</td>
                <td>{d.method}</td>
                <td>
                  <StatusBadge status={d.status} />
                </td>
                <td className="text-muted-foreground">{d.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
