"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Home, CreditCard, Send, Users, BarChart2, Settings, Sparkles, Wallet } from "lucide-react"

const nav = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/checkout", label: "Checkout", icon: Sparkles },
  { href: "/merchant", label: "Merchant", icon: Wallet },
  { href: "/transactions", label: "Transactions", icon: CreditCard },
  { href: "/payouts", label: "Payouts", icon: Send },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/reports", label: "Reports", icon: BarChart2 },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="h-full w-16 md:w-64 border-r bg-sidebar/80 backdrop-blur supports-[backdrop-filter]:bg-sidebar/70">
      <div className="flex h-14 items-center px-3 md:px-4 border-b">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <div className="size-6 rounded-md bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-xs">AG</span>
          </div>
          <span className="hidden md:inline">Arealis Gateway</span>
        </Link>
      </div>
      <nav className="p-2 md:p-3">
        <TooltipProvider>
          <ul className="space-y-1">
            {nav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <li key={href}>
                  <Tooltip delayDuration={150}>
                    <TooltipTrigger asChild>
                      <Link
                        href={href}
                        className={cn(
                          "group flex items-center rounded-md px-2 py-2 text-sm transition-colors",
                          active ? "bg-primary/10 text-primary" : "hover:bg-muted",
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        <Icon className={cn("size-4", active ? "text-primary" : "text-muted-foreground")} />
                        <span className="ml-3 hidden md:inline">{label}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="md:hidden">
                      {label}
                    </TooltipContent>
                  </Tooltip>
                </li>
              )
            })}
          </ul>
        </TooltipProvider>
      </nav>
      <div className="mt-auto p-3 text-xs text-muted-foreground hidden md:block">Tip: Hover to see labels</div>
    </aside>
  )
}

export default Sidebar
