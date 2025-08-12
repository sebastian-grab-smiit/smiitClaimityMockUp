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
import { Trash2, Plus, Bell, Shield, Users, Settings, BarChart3, FileText, Download } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function InsurerSettingsPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Hans Müller", email: "hans.mueller@zurich.ch", role: "Admin", status: "Active" },
    { id: 2, name: "Anna Weber", email: "anna.weber@zurich.ch", role: "Claims Manager", status: "Active" },
    { id: 3, name: "Peter Schmidt", email: "peter.schmidt@zurich.ch", role: "Viewer", status: "Inactive" },
  ])

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader userType="insurer" userName="Helvetia Versicherung" />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen hidden md:block">
          <nav className="p-4 space-y-2">
            <Link
              href="/insurer"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/insurer/claims/new"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Plus className="h-4 w-4" />
              <span>Neuer Fall</span>
            </Link>
            <Link
              href="/insurer/claims"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Alle Fälle</span>
            </Link>
            <Link
              href="/insurer/reports"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Download className="h-4 w-4" />
              <span>Berichte</span>
            </Link>
            <Link
              href="/insurer/experts"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Users className="h-4 w-4" />
              <span>Experten</span>
            </Link>
            <Link
              href="/insurer/settings"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span>Einstellungen</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Einstellungen</h1>
            <p className="text-slate-600">Verwalten Sie Benutzer, Rollen und Benachrichtigungseinstellungen</p>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
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
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Team-Mitglieder</CardTitle>
                    <CardDescription>Benutzerzugriff und Berechtigungen verwalten</CardDescription>
                  </div>
                  <Button className="">
                    <Plus className="h-4 w-4 mr-2" />
                    Benutzer hinzufügen
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
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

            <TabsContent value="organization" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Organisationseinstellungen</CardTitle>
                  <CardDescription>Konfigurieren Sie Ihre Organisationsdetails</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Firmenname</Label>
                      <Input id="company" defaultValue="Helvetia Versicherung" />
                    </div>
                    <div>
                      <Label htmlFor="contact">Hauptansprechpartner</Label>
                      <Input id="contact" defaultValue="Hans Müller" />
                    </div>
                    <div>
                      <Label htmlFor="email">Kontakt-E-Mail</Label>
                      <Input id="email" type="email" defaultValue="contact@helvetia.ch" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefonnummer</Label>
                      <Input id="phone" defaultValue="+41 58 280 10 00" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button className="">Änderungen speichern</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}