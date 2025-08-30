"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/shared/page-header"
import {
  FileText, Upload, ArrowLeft, User, MapPin, Star, Award, Settings, Save, Plus,
  Clock, MessageSquare, Calendar, BarChart3, Timer, Table, Download
} from "lucide-react"
import Link from "next/link"

type TariffRow = { category: string; hourly?: number; flat?: number }
type TariffGroup = { group: string; rows: TariffRow[] }

export default function ExpertSettingsPage() {
  const [activeTab, setActiveTab] = useState("settings")
  const [isEditing, setIsEditing] = useState(false)

  // Tarife (wie im Screenshot)
  const tarife: TariffGroup[] = [
    {
      group: "Sachverständiger",
      rows: [
        { category: "einfache Rechnungsprüfung", flat: 75 },
        { category: "Aussendienst", hourly: 170 },
        { category: "Innendienst", hourly: 140 },
      ],
    },
    // {
    //   group: "Fahrzeugexpertise",
    //   rows: [
    //     { category: "Standardexpertise", flat: 315 },
    //     { category: "Kurzexpertise", flat: 160 },
    //     { category: "LiveExpert", flat: 200 },
    //     { category: "Drive-In Expertise", flat: 200 },
    //     { category: "Rechnungskontrolle", flat: 75 },
    //     { category: "Wrackverkauf Schweiz", flat: 120 },
    //     { category: "Wrackverkauf Ausland", flat: 175 },
    //     { category: "Totalschaden", flat: 350 },
    //   ],
    // },
    // {
    //   group: "BVM",
    //   rows: [
    //     { category: "Ermittlung", hourly: 220 },
    //     { category: "Kurzcheck", flat: 100 },
    //   ],
    // },
  ]
  const fmt = (n?: number) => (typeof n === "number" ? n.toLocaleString("de-CH") : "—")
  const exportCSV = () => {
    const header = ["Dienstleistung", "Kategorie", "Stundenansatz Experte (CHF/h)", "Pauschale (CHF)"]
    const lines = [header.join(";")]
    tarife.forEach((g) =>
      g.rows.forEach((r) => lines.push([g.group, r.category, r.hourly ?? "", r.flat ?? ""].join(";")))
    )
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "tarife.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  // Mock settings data
  const settings = {
    id: "EXP-001",
    name: "Dr. Hans Müller",
    email: "hans.mueller@expert.ch",
    phone: "+41 44 123 45 67",
    address: "Musterstrasse 123, 8001 Zürich",
    canton: "ZH",
    coordinates: { lat: 47.3769, lng: 8.5417 },
    specialties: ["Fahrzeugschäden", "Maschinenschäden", "KFZ-Gutachten"],
    languages: ["DE", "EN", "FR"],
    certifications: ["SIA", "SVKG", "TÜV"],
    experience: "15 Jahre",
    joinDate: "2019-03-15",
    rating: 4.8,
    completedCases: 156,
    bio: "Erfahrener Sachverständiger mit Spezialisierung auf Fahrzeug- und Maschinenschäden. Über 15 Jahre Erfahrung in der Schadensbegutachtung mit Fokus auf präzise und zeitnahe Berichterstattung.",
    workingHours: {
      monday: { start: "08:00", end: "17:00", available: true },
      tuesday: { start: "08:00", end: "17:00", available: true },
      wednesday: { start: "08:00", end: "17:00", available: true },
      thursday: { start: "08:00", end: "17:00", available: true },
      friday: { start: "08:00", end: "16:00", available: true },
      saturday: { start: "", end: "", available: false },
      sunday: { start: "", end: "", available: false },
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      weeklyReports: true,
      caseAssignmentAlerts: true,
      deadlineReminders: true,
    },
    stats: {
      avgResponseTime: "2.3 Stunden",
      onTimeDelivery: "95%",
      activeStreak: "23 Tage",
    },
  }

  const dayNames = {
    monday: "Montag",
    tuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
    saturday: "Samstag",
    sunday: "Sonntag",
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="expert-appraiser" userName="Dr. Hans Müller" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link href="/expert" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/expert/assignments" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Clock className="h-4 w-4" />
              <span>Zuweisungen</span>
              <Badge className="bg-yellow-500 text-white text-xs">3</Badge>
            </Link>
            <Link href="/expert/cases" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <FileText className="h-4 w-4" />
              <span>Meine Fälle</span>
            </Link>
            <Link href="/expert/reports" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Upload className="h-4 w-4" />
              <span>Berichte</span>
            </Link>
            <Link href="/expert/time-tracking" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Timer className="h-4 w-4" />
              <span>Zeiterfassung</span>
            </Link>
            <Link href="/expert/notifications" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">{2}</Badge>}
            </Link>
            <Link href="/expert/settings" className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg">
              <Settings className="h-4 w-4" />
              <span>Profil</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Profil & Einstellungen</h1>
              <p className="text-gray-600">Verwalten Sie Ihre Profildaten und Einstellungen</p>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"}>
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Speichern
                </>
              ) : (
                <>
                  <Settings className="h-4 w-4 mr-2" />
                  Bearbeiten
                </>
              )}
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 mb-6 rounded-xl border shadow-sm">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800">{settings.name}</h3>
                  <p className="text-sm text-slate-600">ID: {settings.id}</p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{settings.rating}</span>
                    <span className="text-sm text-slate-500">({settings.completedCases} Fälle)</span>
                  </div>
                </div>

                <nav className="space-y-2">
                  {[
                    { id: "settings", label: "Profil", icon: User },
                    { id: "availability", label: "Verfügbarkeit", icon: MapPin },
                    { id: "notifications", label: "Benachrichtigungen", icon: Settings },
                    { id: "stats", label: "Statistiken", icon: Award },
                    { id: "tarife", label: "Tarife", icon: Table }, // NEW
                  ].map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? "bg-slate-50 text-primary border border-primary"
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
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg p-6 rounded-xl border shadow-sm">
                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-slate-800">Profil-Informationen</h2>
                    {/* ... unchanged profile fields ... */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                        <input
                          type="text"
                          defaultValue={settings.name}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">E-Mail</label>
                        <input
                          type="email"
                          defaultValue={settings.email}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Telefon</label>
                        <input
                          type="tel"
                          defaultValue={settings.phone}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Kanton</label>
                        <select
                          defaultValue={settings.canton}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-50"
                        >
                          <option value="ZH">Zürich</option>
                          <option value="BE">Bern</option>
                          <option value="BS">Basel-Stadt</option>
                          <option value="GE">Genf</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Adresse</label>
                      <input
                        type="text"
                        defaultValue={settings.address}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Über mich</label>
                      <Textarea defaultValue={settings.bio} disabled={!isEditing} className="min-h-[100px] disabled:bg-slate-50" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Spezialisierungen</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {settings.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline">
                            {specialty}
                            {isEditing && <span className="ml-1 cursor-pointer">×</span>}
                          </Badge>
                        ))}
                      </div>
                      {isEditing && (
                        <input
                          type="text"
                          placeholder="Neue Spezialisierung hinzufügen..."
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Sprachen</label>
                        <div className="flex flex-wrap gap-2">
                          {settings.languages.map((lang) => (
                            <Badge key={lang} className="bg-blue-100 text-blue-800">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Zertifizierungen</label>
                        <div className="flex flex-wrap gap-2">
                          {settings.certifications.map((cert) => (
                            <Badge key={cert} className="bg-green-100 text-green-800">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "availability" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-slate-800">Verfügbarkeit & Arbeitszeiten</h2>
                    {/* ... unchanged availability content ... */}
                    <div className="space-y-4">
                      {Object.entries(settings.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <input type="checkbox" checked={hours.available} disabled={!isEditing} className="rounded" />
                            <span className="font-medium text-slate-800 w-20">
                              {dayNames[day as keyof typeof dayNames]}
                            </span>
                          </div>
                          {hours.available && (
                            <div className="flex items-center space-x-2">
                              <input type="time" defaultValue={hours.start} disabled={!isEditing} className="px-2 py-1 border border-slate-300 rounded disabled:bg-slate-50" />
                              <span className="text-slate-500">bis</span>
                              <input type="time" defaultValue={hours.end} disabled={!isEditing} className="px-2 py-1 border border-slate-300 rounded disabled:bg-slate-50" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-semibold text-slate-800 mb-4">Abwesenheiten</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-800">Ferien</p>
                            <p className="text-sm text-slate-600">25.01.2024 - 02.02.2024</p>
                          </div>
                          {isEditing && (
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Entfernen
                            </Button>
                          )}
                        </div>
                        {isEditing && (
                          <Button variant="outline" className="w-full bg-transparent">
                            <Plus className="h-4 w-4 mr-2" />
                            Abwesenheit hinzufügen
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-slate-800">Benachrichtigungs-Einstellungen</h2>
                    {/* ... unchanged notifications content ... */}
                    <div className="space-y-4">
                      {[
                        { label: "E-Mail Benachrichtigungen", desc: "Erhalten Sie Updates per E-Mail", checked: settings.preferences.emailNotifications },
                        { label: "SMS Benachrichtigungen", desc: "Wichtige Updates per SMS", checked: settings.preferences.smsNotifications },
                        { label: "Push Benachrichtigungen", desc: "Browser-Benachrichtigungen", checked: settings.preferences.pushNotifications },
                        { label: "Wöchentliche Berichte", desc: "Zusammenfassung Ihrer Aktivitäten", checked: settings.preferences.weeklyReports },
                        { label: "Fall-Zuweisungen", desc: "Benachrichtigung bei neuen Fällen", checked: settings.preferences.caseAssignmentAlerts },
                        { label: "Deadline-Erinnerungen", desc: "Erinnerungen vor Fälligkeitsdaten", checked: settings.preferences.deadlineReminders },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-slate-800">{item.label}</h4>
                            <p className="text-sm text-slate-600">{item.desc}</p>
                          </div>
                          <input type="checkbox" checked={item.checked} disabled={!isEditing} className="rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "stats" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-slate-800">Performance-Statistiken</h2>
                    {/* ... unchanged stats content ... */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-blue-800">Durchschnittliche Antwortzeit</h3>
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-blue-900">{settings.stats.avgResponseTime}</p>
                        <p className="text-sm text-blue-700">Sehr gut (Ziel: {"<"} 4h)</p>
                      </div>

                      <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-green-800">Pünktliche Lieferung</h3>
                          <Award className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-green-900">{settings.stats.onTimeDelivery}</p>
                        <p className="text-sm text-green-700">Ausgezeichnet (Ziel: {">"} 90%)</p>
                      </div>

                      <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-orange-800">Aktive Serie</h3>
                          <Settings className="h-5 w-5 text-orange-600" />
                        </div>
                        <p className="text-2xl font-bold text-orange-900">{settings.stats.activeStreak}</p>
                        <p className="text-sm text-orange-700">Ohne Verspätung</p>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-semibold text-slate-800 mb-4">Monatliche Übersicht</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-slate-800">23</p>
                          <p className="text-sm text-slate-600">Abgeschlossene Fälle</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-slate-800">156h</p>
                          <p className="text-sm text-slate-600">Erfasste Zeit</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-slate-800">CHF 18,720</p>
                          <p className="text-sm text-slate-600">Honorar</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "tarife" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-slate-800">Tarife</h2>
                      <Button variant="outline" onClick={exportCSV}>
                        <Download className="h-4 w-4 mr-2" />
                        CSV exportieren
                      </Button>
                    </div>

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
                    <p className="text-xs text-slate-500">Alle Beträge in CHF. Leere Felder bedeuten „nicht zutreffend“.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
