"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Bell, Shield, Users, Settings, BarChart3, FileText, Download, MessageSquare, Table } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

type TariffRow = { category: string; hourly?: number; flat?: number }
type TariffGroup = { group: string; rows: TariffRow[] }

export default function InsurerSettingsPage() {
  const [users] = useState([
    { id: 1, name: "Hans Müller", email: "hans.mueller@zurich.ch", role: "Admin", status: "Active" },
    { id: 2, name: "Anna Weber", email: "anna.weber@zurich.ch", role: "Claims Manager", status: "Active" },
    { id: 3, name: "Peter Schmidt", email: "peter.schmidt@zurich.ch", role: "Viewer", status: "Inactive" },
  ])

  const tarife: TariffGroup[] = [
    {
      group: "Sachverständiger",
      rows: [
        { category: "Einfache Rechnungsprüfung", flat: 75 },
        { category: "Aussendienst", hourly: 170 },
        { category: "Innendienst", hourly: 140 },
      ],
    },
    {
      group: "Fahrzeugexpertise",
      rows: [
        { category: "Standardexpertise", flat: 315 },
        { category: "Kurzexpertise", flat: 160 },
        { category: "LiveExpert", flat: 200 },
        { category: "Drive-In Expertise", flat: 200 },
        { category: "Rechnungskontrolle", flat: 75 },
        { category: "Wrackverkauf Schweiz", flat: 120 },
        { category: "Wrackverkauf Ausland", flat: 175 },
        { category: "Totalschaden", flat: 350 },
      ],
    },
    {
      group: "BVM",
      rows: [
        { category: "Ermittlung", hourly: 220 },
        { category: "Kurzcheck", flat: 100 },
      ],
    },
  ]

  const fmt = (n?: number) => (typeof n === "number" ? n.toLocaleString("de-CH") : "—")

  const toCSV = () => {
    const header = ["Dienstleistung", "Kategorie", "Stundenansatz Experte (CHF/h)", "Pauschale (CHF)"]
    const lines = [header.join(";")]
    tarife.forEach((g) =>
      g.rows.forEach((r) =>
        lines.push([g.group, r.category, r.hourly ?? "", r.flat ?? ""].join(";"))
      )
    )
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "tarife.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="insurer" userName="Helvetia Versicherung" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link href="/insurer" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/insurer/claims/new" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Plus className="h-4 w-4" />
              <span>Neuer Fall</span>
            </Link>
            <Link href="/insurer/claims" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <FileText className="h-4 w-4" />
              <span>Alle Fälle</span>
            </Link>
            <Link href="/insurer/reports" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Download className="h-4 w-4" />
              <span>Berichte</span>
            </Link>
            <Link href="/insurer/notifications" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">2</Badge>}
            </Link>
            <Link href="/insurer/settings" className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg">
              <Settings className="h-4 w-4" />
              <span>Einstellungen</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Einstellungen</h1>
                <p className="text-gray-600">Verwalten Sie Benutzer, Rollen und Benachrichtigungseinstellungen</p>
              </div>
            </div>

            {/* grid-cols-4 now, because we add the new "tarife" tab */}
            <Tabs defaultValue="users" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Benutzer & Rollen
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Benachrichtigungen
                </TabsTrigger>
                <TabsTrigger value="organization" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Organisation
                </TabsTrigger>
                {/* NEW TAB */}
                <TabsTrigger value="tarife" className="flex items-center gap-2">
                  <Table className="h-4 w-4" />
                  Tarife
                </TabsTrigger>
              </TabsList>

              {/* Users */}
              <TabsContent value="users" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Team-Mitglieder</CardTitle>
                      <CardDescription>Benutzerzugriff und Berechtigungen verwalten</CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Benutzer hinzufügen
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                              <span className="text-primary font-semibold">
                                {user.name.split(" ").map((n) => n[0]).join("")}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-800">{user.name}</p>
                              <p className="text-sm text-slate-500">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                            <Select defaultValue={user.role}>
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Claims Manager">Schadenmanager</SelectItem>
                                <SelectItem value="Viewer">Betrachter</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Benachrichtigungseinstellungen</CardTitle>
                    <CardDescription>Konfigurieren Sie, wie und wann Sie Benachrichtigungen erhalten</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">E-Mail-Benachrichtigungen</Label>
                          <p className="text-sm text-slate-500">Updates per E-Mail erhalten</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Neue Fallzuweisungen</Label>
                          <p className="text-sm text-slate-500">Benachrichtigung bei Expertenzuweisung</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Berichtseinreichungen</Label>
                          <p className="text-sm text-slate-500">Benachrichtigung bei Berichtseinreichung</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">SLA-Warnungen</Label>
                          <p className="text-sm text-slate-500">Warnung vor Fristen</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Organization */}
              <TabsContent value="organization" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Organisationseinstellungen</CardTitle>
                    <CardDescription>Konfigurieren Sie Ihre Organisationsdetails</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company" className="mb-2">Firmenname</Label>
                        <Input id="company" defaultValue="Helvetia Versicherung" />
                      </div>
                      <div>
                        <Label htmlFor="contact" className="mb-2">Hauptansprechpartner</Label>
                        <Input id="contact" defaultValue="Hans Müller" />
                      </div>
                      <div>
                        <Label htmlFor="email" className="mb-2">Kontakt-E-Mail</Label>
                        <Input id="email" type="email" defaultValue="contact@helvetia.ch" />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="mb-2">Telefonnummer</Label>
                        <Input id="phone" defaultValue="+41 58 280 10 00" />
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button>Änderungen speichern</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* NEW: Tarife */}
              <TabsContent value="tarife" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Tarife</CardTitle>
                      <CardDescription>Preisübersicht für Leistungen</CardDescription>
                    </div>
                    <Button variant="outline" onClick={toCSV}>
                      <Download className="h-4 w-4 mr-2" />
                      CSV exportieren
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto rounded-lg border">
                      <table className="w-full border-separate border-spacing-0 text-sm">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700">
                            <th className="text-left font-semibold p-3 border-b">Dienstleistung</th>
                            <th className="text-left font-semibold p-3 border-b">Kategorie</th>
                            <th className="text-right font-semibold p-3 border-b">Stundenansatz Experte (CHF/h)</th>
                            <th className="text-right font-semibold p-3 border-b">Pauschale (CHF)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tarife.map((g) =>
                            g.rows.map((row, idx) => (
                              <tr key={`${g.group}-${row.category}`} className="even:bg-slate-50">
                                <td className="p-3 border-b align-top">
                                  {idx === 0 ? <span className="font-medium text-slate-800">{g.group}</span> : ""}
                                </td>
                                <td className="p-3 border-b">{row.category}</td>
                                <td className="p-3 border-b text-right">{fmt(row.hourly)}</td>
                                <td className="p-3 border-b text-right">{fmt(row.flat)}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-slate-500 mt-3">Alle Beträge in CHF. Leere Felder bedeuten “nicht zutreffend”.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
