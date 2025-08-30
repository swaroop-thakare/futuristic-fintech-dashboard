"use client"

import type React from "react"
import Sidebar from "@/components/sidebar"
import Topbar from "@/components/topbar"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-black">
      <div className="flex">
        <aside className="hidden md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 min-h-dvh flex flex-col">
          <Topbar />
          <div className="flex-1 p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
