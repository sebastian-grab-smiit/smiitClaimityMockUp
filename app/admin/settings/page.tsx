"use client"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Users,
  Database,
  Bell,
  Key,
  Download,
  BarChart3,
  Building2,
  DollarSign,
  FileText,
  File,
  MessageSquare,
  Settings,
  LucideMap
} from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"

type TabId = "system" | "users" | "data" | "notifications" | "security" | "audit"

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("system")

  const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: "system",         label: "System",               icon: Shield },
    { id: "users",          label: "Benutzer & Rollen",    icon: Users },
    { id: "data",           label: "Daten & Backup",       icon: Database },
    { id: "notifications",  label: "Benachrichtigungen",   icon: Bell },
    { id: "security",       label: "Sicherheit",           icon: Key },
    { id: "audit",          label: "Audit Logs",           icon: Download },
  ]

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="admin" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link
              href="/admin"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/experts"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Users className="h-4 w-4" />
              <span>Experten</span>
            </Link>
            <Link
              href="/admin/insurers"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Building2 className="h-4 w-4" />
              <span>Versicherer</span>
            </Link>
            <Link
              href="/admin/cases"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Alle Fälle</span>
            </Link>
            <Link
              href="/admin/assignment"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <LucideMap className="h-4 w-4" />
              <span>Zuordnung</span>
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <File className="h-4 w-4" />
              <span>Berichte</span>
              <Badge className="bg-yellow-500 text-white text-xs">3</Badge>
            </Link>
            <Link
              href="/admin/invoicing"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <DollarSign className="h-4 w-4" />
              <span>Rechnungen</span>
            </Link>
            <Link
              href="/admin/communications"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              <Badge className="bg-red-500 text-white text-xs">2</Badge>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span>Einstellungen</span>
            </Link>
          </nav>
        </aside>

        {/* Main area with horizontal tabs */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)} className="w-full">
            {/* Sticky tab header */}
            <div className="sticky top-0 z-10 bg-white border-b">
              <div className="px-6 pt-4">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Einstellungen</h2>
              </div>
              <div className="px-4 pb-3">
                <TabsList className="grid w-full grid-cols-6">
                  {tabs.map(({ id, label, icon: Icon }) => (
                    <TabsTrigger
                      key={id}
                      value={id}
                      className="gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            {/* Tab contents */}
            <div className="p-6">
              {/* System */}
              <TabsContent value="system" className="space-y-6">
                <h1 className="text-2xl font-bold text-slate-800">System-Einstellungen</h1>

                <section className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Hosting & Infrastruktur</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Hosting-Standort</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                        <option>Schweiz (Zürich)</option>
                        <option>Schweiz (Genf)</option>
                      </select>
                      <p className="text-xs text-slate-500 mt-1">CH-Hosting für Datenschutz-Compliance</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Backup-Frequenz</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                        <option>Täglich</option>
                        <option>Alle 6 Stunden</option>
                        <option>Alle 12 Stunden</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Datenaufbewahrung</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Aufbewahrungsdauer für Fälle
                      </label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                        <option>10 Jahre (Standard)</option>
                        <option>7 Jahre</option>
                        <option>15 Jahre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Aufbewahrungsdauer für Audit Logs
                      </label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                        <option>7 Jahre (Revisionssicher)</option>
                        <option>10 Jahre</option>
                      </select>
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* Users */}
              <TabsContent value="users" className="space-y-6">
                <h1 className="text-2xl font-bold text-slate-800">Benutzer & Rollen</h1>

                <section className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Rollen-Management</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-800">Super Admin</h4>
                        <p className="text-sm text-slate-600">Vollzugriff auf alle Funktionen</p>
                      </div>
                      <Badge className="bg-slate-100 text-primary">2 Benutzer</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-800">Versicherer</h4>
                        <p className="text-sm text-slate-600">Fallverwaltung und Berichte</p>
                      </div>
                      <Badge className="bg-slate-100 text-primary">23 Benutzer</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-800">Experte</h4>
                        <p className="text-sm text-slate-600">Fallbearbeitung und Berichte</p>
                      </div>
                      <Badge className="bg-slate-100 text-primary">156 Benutzer</Badge>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Berechtigungen</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">E-Mail-Verifizierung erforderlich</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">Admin-Genehmigung für neue Experten</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* Data & Backup */}
              <TabsContent value="data" className="space-y-6">
                <h1 className="text-2xl font-bold text-slate-800">Daten & Backup</h1>

                <section className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-800 mb-4">Backup-Verwaltung</h3>
                    <Button className="bg-primary w-full md:w-auto">
                      Manuelles Backup starten
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Geplante Backups</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                        <option>Täglich um 02:00</option>
                        <option>Alle 6 Stunden</option>
                        <option>Alle 12 Stunden</option>
                      </select>
                      <p className="text-xs text-slate-500 mt-1">Backups werden in der Schweiz gespeichert.</p>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Datenexporte</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-700">Exporte für Fälle, Berichte, Rechnungen</p>
                    <Button variant="outline" className="border-primary text-primary hover:bg-teal-50">
                      <Download className="h-4 w-4 mr-2" />
                      Export starten
                    </Button>
                  </div>
                </section>
              </TabsContent>

              {/* Notifications */}
              <TabsContent value="notifications" className="space-y-6">
                <h1 className="text-2xl font-bold text-slate-800">Benachrichtigungen</h1>

                <section className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Kanäle</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">E-Mail</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">In-App</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Ereignisse</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">Neuer Fall eingegangen</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">Bericht eingereicht</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">Rechnung überfällig</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* Security */}
              <TabsContent value="security" className="space-y-6">
                <h1 className="text-2xl font-bold text-slate-800">Sicherheits-Einstellungen</h1>

                <section className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Zwei-Faktor-Authentifizierung</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">2FA für alle Benutzer erzwingen</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">2FA für Admins erzwingen</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">Backup-Codes generieren</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Passwort-Richtlinien</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Minimale Passwort-Länge</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                        <option>8 Zeichen</option>
                        <option>10 Zeichen</option>
                        <option>12 Zeichen</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm text-slate-700">Grossbuchstaben erforderlich</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm text-slate-700">Kleinbuchstaben erforderlich</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm text-slate-700">Zahlen erforderlich</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm text-slate-700">Sonderzeichen erforderlich</span>
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* Audit */}
              <TabsContent value="audit" className="space-y-6">
                <h1 className="text-2xl font-bold text-slate-800">Audit Logs</h1>

                <section className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-800">Revisionssichere Protokollierung</h3>
                    <Button className="bg-primary">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-sm text-slate-700">Benutzer-Anmeldungen</span>
                      <Badge className="bg-green-100 text-green-800">Aktiv</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-sm text-slate-700">Datenänderungen</span>
                      <Badge className="bg-green-100 text-green-800">Aktiv</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-sm text-slate-700">Systemzugriffe</span>
                      <Badge className="bg-green-100 text-green-800">Aktiv</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-sm text-slate-700">Datei-Downloads</span>
                      <Badge className="bg-green-100 text-green-800">Aktiv</Badge>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Compliance-Hinweis</h4>
                    <p className="text-sm text-blue-700">
                      Alle Audit Logs werden revisionssicher gespeichert und können für 7 Jahre nicht verändert werden.
                      Export-Funktionen stehen für Compliance-Audits zur Verfügung.
                    </p>
                  </div>
                </section>
              </TabsContent>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
