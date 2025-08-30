"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRole, type Role } from "@/components/role-context"

export function TopBar() {
  const { role, setRole } = useRole()

  return (
    <div className="h-14 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50 flex items-center justify-between px-3 md:px-6 gap-2">
      <div className="flex items-center gap-2 md:gap-3 flex-1">
        <div className="relative w-full max-w-xl">
          <Input placeholder="Search actions, payouts, contacts, transactions..." aria-label="Global search" />
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            /
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Help and onboarding">
                <HelpCircle className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Help & onboarding</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-2">
        <Select value={role} onValueChange={(v) => setRole(v as Role)}>
          <SelectTrigger className="w-[140px]" aria-label="Switch role">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Approver">Approver</SelectItem>
            <SelectItem value="Operator">Operator</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="size-8 rounded-full bg-muted/70 border" aria-label="User profile" />
      </div>
    </div>
  )
}

export default TopBar
