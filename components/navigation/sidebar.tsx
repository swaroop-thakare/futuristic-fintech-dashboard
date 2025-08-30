"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
  { href: "/", label: "Dashboard" },
  { href: "/checkout", label: "Checkout" },
  { href: "/merchant", label: "Merchant" },
  { href: "/transactions", label: "Transactions" }, // added
  { href: "/reports", label: "Reports" },
  { href: "/settings", label: "Settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:flex bg-glass w-60 flex-col border-r border-zinc-800/80 p-3">
      <div className="px-2 py-3">
        <div className="text-purple-400 font-semibold tracking-wide">Arealis</div>
        <div className="text-xs text-zinc-400">Gateway</div>
      </div>
      <nav className="mt-2 space-y-1">
        {items.map((it) => {
          const active = pathname === it.href
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm",
                active ? "bg-zinc-800/70 text-white" : "text-zinc-300 hover:text-white hover:bg-zinc-800/50",
              )}
              aria-current={active ? "page" : undefined}
            >
              {it.label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto p-2 text-[11px] text-zinc-500">Secure • PCI-DSS • Dual-key</div>
    </aside>
  )
}

export default Sidebar // added
