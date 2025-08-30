"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BANKS, RAILS, SETTINGS_BANKS_KEY, SETTINGS_RAILS_KEY } from "@/lib/local-db"

export default function SettingsPage() {
  const [enabledBanks, setEnabledBanks] = useState<string[]>([])
  const [enabledRails, setEnabledRails] = useState<string[]>([])

  useEffect(() => {
    try {
      setEnabledBanks(JSON.parse(localStorage.getItem(SETTINGS_BANKS_KEY) || "[]"))
      setEnabledRails(JSON.parse(localStorage.getItem(SETTINGS_RAILS_KEY) || "[]"))
    } catch {
      // ignore
    }
  }, [])

  function toggleArray(setter: (fn: any) => void, list: string[], value: string) {
    setter((prev: string[]) => {
      const base = Array.isArray(prev) ? prev : list
      return base.includes(value) ? base.filter((v) => v !== value) : [...base, value]
    })
  }

  function save() {
    localStorage.setItem(SETTINGS_BANKS_KEY, JSON.stringify(enabledBanks))
    localStorage.setItem(SETTINGS_RAILS_KEY, JSON.stringify(enabledRails))
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold text-white">Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-white">Banking Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {BANKS.map((b) => (
                <button
                  key={b.code}
                  onClick={() => toggleArray(setEnabledBanks, enabledBanks, b.code)}
                  className={
                    "rounded-md px-3 py-2 text-sm border backdrop-blur " +
                    (enabledBanks.includes(b.code)
                      ? "bg-purple-500/15 text-purple-300 border-purple-500/40"
                      : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10")
                  }
                >
                  {b.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-white">Rails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-4 gap-2">
              {RAILS.map((r) => (
                <button
                  key={r}
                  onClick={() => toggleArray(setEnabledRails, enabledRails, r)}
                  className={
                    "rounded-md px-3 py-2 text-sm border backdrop-blur " +
                    (enabledRails.includes(r)
                      ? "bg-purple-500/15 text-purple-300 border-purple-500/40"
                      : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10")
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Button onClick={save} className="bg-purple-500 text-black hover:bg-purple-400">
        Save Settings
      </Button>
    </main>
  )
}
