"use client"

import Link from "next/link"

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 bg-glass border-b border-zinc-800/80">
      <div className="flex items-center justify-between gap-3 px-3 md:px-4 py-3">
        <div className="flex-1 max-w-md">
          <input
            aria-label="Search transactions"
            placeholder="Search transactions, contacts..."
            className="w-full bg-zinc-900/70 border border-zinc-800 rounded-md px-3 py-2 text-sm outline-none focus:border-purple-500/60"
          />
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link className="text-zinc-300 hover:text-white" href="/reports">
            Reports
          </Link>
          <Link className="text-zinc-300 hover:text-white" href="/settings">
            Settings
          </Link>
          <button
            className="rounded-md bg-zinc-900/70 border border-zinc-800 px-3 py-2 text-xs text-zinc-300 hover:text-white"
            aria-label="Notifications"
          >
            Notifications
          </button>
          <div className="h-8 w-8 rounded-full bg-purple-400/20 ring-1 ring-purple-400/40" aria-label="Profile" />
        </nav>
      </div>
    </header>
  )
}

export default Topbar
