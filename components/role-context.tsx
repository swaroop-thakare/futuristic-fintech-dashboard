"use client"

import { createContext, useContext, useState, useMemo, type ReactNode } from "react"

export type Role = "Admin" | "Approver" | "Operator" | "Viewer"

type Ctx = {
  role: Role
  setRole: (r: Role) => void
}

const RoleContext = createContext<Ctx | null>(null)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("Viewer")
  const value = useMemo(() => ({ role, setRole }), [role])
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error("useRole must be used within RoleProvider")
  return ctx
}
