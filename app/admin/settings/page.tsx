"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Users, Database, Bell, Key, Download } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("system")

  const tabs = [
    { id: "system", label: "System", icon: Shield },
    { id: "users", label: "Benutzer & Rollen", icon: Users },
    { id: "data", label: "Daten & Backup", icon: Database },
    { id: "notifications", label: "Benachrichtigungen", icon: Bell },
    { id: "security", label: "Sicherheit", icon: Key },
    { id: "audit", label: "Audit Logs", icon: Download },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center text-purple-600 hover:text-purple-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zum Dashboard
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-slate-800">claimity</span>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              System-Einstellungen
            </Badge>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Tabs */}
        <div className="w-64 bg-white border-r">
          <div className="p-4">
            <h2 className="font-semibold text-slate-800 mb-4">Einstellungen</h2>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-teal-50 text-teal-700 border border-teal-200"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {activeTab === "system" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-slate-800">System-Einstellungen</h1>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Hosting & Infrastruktur</h3>
                  <div className="grid grid-cols-2 gap-6">
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
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Datenaufbewahrung</h3>
                  <div className="space-y-4">
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
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-slate-800">Benutzer & Rollen</h1>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Rollen-Management</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-800">Super Admin</h4>
                        <p className="text-sm text-slate-600">Vollzugriff auf alle Funktionen</p>
                      </div>
                      <Badge className="bg-red-100 text-red-800">2 Benutzer</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-800">Admin</h4>
                        <p className="text-sm text-slate-600">Verwaltung von Fällen und Experten</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">5 Benutzer</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-800">Versicherer</h4>
                        <p className="text-sm text-slate-600">Fallverwaltung und Berichte</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">23 Benutzer</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-800">Experte</h4>
                        <p className="text-sm text-slate-600">Fallbearbeitung und Berichte</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">156 Benutzer</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Berechtigungen</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">Neue Benutzer können sich selbst registrieren</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">E-Mail-Verifizierung erforderlich</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">Admin-Genehmigung für neue Experten</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-slate-800">Sicherheits-Einstellungen</h1>

                <div className="bg-white rounded-lg p-6">
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
                </div>

                <div className="bg-white rounded-lg p-6">
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
                </div>
              </div>
            )}

            {activeTab === "audit" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-slate-800">Audit Logs</h1>

                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-800">Revisionssichere Protokollierung</h3>
                    <Button className="bg-teal-600 hover:bg-teal-700">
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
