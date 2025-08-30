"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Download, Plus, UserPlus } from "lucide-react"
import Link from "next/link"
import { useRole } from "@/components/role-context"

export function QuickActions() {
  const { role } = useRole()
  const canInitiate = role === "Admin" || role === "Approver"

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Link href="/payouts">
                <Button disabled={!canInitiate}>
                  <Plus className="mr-2 size-4" />
                  Initiate Payout
                </Button>
              </Link>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {canInitiate ? "Create a single or bulk payout" : "Requires Approver or Admin role"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="secondary">
              <Link href="/reports">
                <Download className="mr-2 size-4" />
                Download Report
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Export recent transactions</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="outline">
              <Link href="/contacts">
                <UserPlus className="mr-2 size-4" />
                Add Contact
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add a beneficiary or vendor</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
