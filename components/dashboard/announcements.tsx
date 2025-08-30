"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Announcements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Announcements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div>
          <p className="font-medium">Scheduled maintenance</p>
          <p className="text-muted-foreground">Saturday 01:00–03:00 IST · No expected downtime</p>
        </div>
        <div>
          <p className="font-medium">New: Automated Financial Reports</p>
          <p className="text-muted-foreground">Schedule weekly P&L and payout summaries to email.</p>
        </div>
        <div>
          <p className="font-medium">Workflow approvals</p>
          <p className="text-muted-foreground">Add multi-user approvals for payouts over ₹5L.</p>
        </div>
      </CardContent>
    </Card>
  )
}
