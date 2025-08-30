"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Present Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">₹ 12,48,900.34</div>
          <p className="text-xs text-muted-foreground mt-1">Available to payout</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">₹ 84.2L</div>
          <p className="text-xs text-muted-foreground mt-1">1,128 payouts • 0.8% fail</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">₹ 3.2Cr</div>
          <p className="text-xs text-muted-foreground mt-1">12,904 payouts • SLA 99.97%</p>
        </CardContent>
      </Card>
    </div>
  )
}
