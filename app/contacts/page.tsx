"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BankSelector from "@/components/bank-selector"
import { addContact, deleteContact, listContacts, type Contact } from "@/lib/local-db"

export default function ContactsPage() {
  const [list, setList] = useState<Contact[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bank, setBank] = useState<any>("HDFC")
  const [account, setAccount] = useState("")
  const [ifsc, setIfsc] = useState("")

  const reload = () => setList(listContacts())

  useEffect(() => {
    reload()
  }, [])

  function add() {
    if (!name || !account || !ifsc) return
    addContact({
      id: `ct_${Date.now()}`,
      name,
      email,
      bank,
      account,
      ifsc,
    })
    setName("")
    setEmail("")
    setAccount("")
    setIfsc("")
    reload()
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Contacts</h1>
        <p className="text-sm text-white/70">Manage beneficiaries and vendors for payouts and collections.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-white">Add Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/80">Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Email (optional)</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <div>
              <Label className="text-white/80 mb-2 block">Bank</Label>
              <BankSelector value={bank} onChange={setBank} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/80">Account</Label>
                <Input
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">IFSC</Label>
                <Input
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <Button onClick={add} className="w-full bg-purple-500 text-black hover:bg-purple-400">
              Save Contact
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-white">Saved Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {!list.length ? (
              <p className="text-sm text-white/70">No contacts yet.</p>
            ) : (
              <ul className="space-y-2">
                {list.map((c) => (
                  <li key={c.id} className="glass-panel rounded-md p-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white/90">{c.name}</div>
                      <div className="text-xs text-white/60">
                        {c.bank} • {c.account} • {c.ifsc} {c.email ? `• ${c.email}` : ""}
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="bg-white/10 text-white hover:bg-white/20"
                      onClick={() => {
                        deleteContact(c.id)
                        reload()
                      }}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
