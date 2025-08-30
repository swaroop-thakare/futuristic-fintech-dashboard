"use client"

import { OverviewCards } from "@/components/dashboard/overview-cards"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { Announcements } from "@/components/dashboard/announcements"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <main className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold text-balance">Overview</h1>
        <QuickActions />
      </div>

      <OverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <RecentTransactions />
        </div>
        <div className="space-y-4">
          <Announcements />

          {/* Contacts and Payout scheduling shortcuts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Shortcuts</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Link href="/contacts" className="flex items-center gap-2 text-sm hover:underline">
                <Users className="size-4 text-primary" />
                Beneficiaries & Contacts
              </Link>
              <Link href="/payouts#approvals" className="flex items-center gap-2 text-sm hover:underline">
                <CalendarClock className="size-4 text-primary" />
                Payout Scheduling & Approvals
              </Link>
              <Link href="/settings#integrations" className="flex items-center gap-2 text-sm hover:underline">
                <span className="size-4 rounded-sm bg-primary/15 text-primary grid place-items-center font-mono text-[10px]">
                  API
                </span>
                Banking Integrations & API
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
