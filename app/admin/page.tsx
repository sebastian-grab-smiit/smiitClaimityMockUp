"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle, Clock, Users, MapPin, Settings, BarChart3, FileText, DollarSign, TrendingUp,
  Calendar, Eye, Building2, MessageSquare, Percent, Target, LucideMap, File, Euro
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

// ⬇️ NEW: Recharts for charts
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Helpers & colors
  const fmtNumber = (n: number) => Intl.NumberFormat("de-CH").format(n)
  const fmtCHF = (n: number) => `CHF ${Intl.NumberFormat("de-CH").format(n)}`
  const CHART_COLORS = ["#00b8db", "#00bc7d", "#f0b100", "#ad46ff", "#2b7fff", "#00bba7"]

  // --- Mock data (leave as-is above; new chart data below) ---
  const incomingCases = [
    { id: "CLM-2024-048", insurer: "Helvetia Versicherung", type: "Fahrzeugschaden", priority: "Hoch", amount: "CHF 15,000", location: "Zürich", received: "Vor 15 Min", status: "Triage" },
    { id: "CLM-2024-049", insurer: "AXA Schweiz", type: "Gebäudeschaden", priority: "Mittel", amount: "CHF 45,000", location: "Basel", received: "Vor 32 Min", status: "Validierung" },
    { id: "CLM-2024-050", insurer: "Zurich Insurance", type: "Wasserschaden", priority: "Niedrig", amount: "CHF 8,500", location: "Bern", received: "Vor 1 Std", status: "Bereit" },
  ]

  const expertAssignments = [
    { expert: "Kurt Seiler", location: "Zürich", specialty: "KFZ-Gutachten", activeCases: 5, availability: "Verfügbar", rating: 4.8 },
    { expert: "Maria Weber", location: "Basel", specialty: "Gebäudeschäden", activeCases: 3, availability: "Beschäftigt", rating: 4.9 },
    { expert: "Thomas Schneider", location: "Bern", specialty: "Wasserschäden", activeCases: 2, availability: "Verfügbar", rating: 4.7 },
  ]

  const highLevelStats = [
    { title: "Experten", value: "156", icon: Users, color: "bg-teal-500", trend: "+8%", description: "Aktive Experten" },
    { title: "Versicherer", value: "24", icon: Building2, color: "bg-blue-500", trend: "+3%", description: "Partner Versicherer" },
    { title: "Fälle (Total)", value: "1,247", icon: FileText, color: "bg-purple-500", trend: "+15%", description: "Alle Fälle" },
    { title: "Offene Fälle", value: "47", icon: AlertTriangle, color: "bg-orange-500", trend: "+12%", description: "In Bearbeitung" },
  ]

  const financialStats = [
    { title: "Umsatz (Monat)", value: "CHF 48K", icon: Euro, color: "bg-green-500", trend: "+18%", description: "Monatlicher Umsatz" },
    { title: "Gewinn (Monat)", value: "CHF 12K", icon: TrendingUp, color: "bg-emerald-500", trend: "+22%", description: "Monatlicher Gewinn" },
    { title: "Gewinnmarge", value: "26.2%", icon: Percent, color: "bg-cyan-500", trend: "+1.8%", description: "Durchschnittliche Marge" },
    { title: "SLA Performance", value: "92%", icon: Target, color: "bg-yellow-500", trend: "+5%", description: "SLA Einhaltung" },
  ]

  const recentActivity = [
    { id: "CLM-2024-048", insurer: "Helvetia Versicherung", expert: "Kurt Seiler", type: "Fahrzeugschaden", amount: "CHF 15,000", status: "Zugewiesen", time: "Vor 15 Min" },
    { id: "CLM-2024-049", insurer: "AXA Schweiz", expert: "Maria Weber", type: "Gebäudeschaden", amount: "CHF 45,000", status: "In Bearbeitung", time: "Vor 32 Min" },
    { id: "CLM-2024-050", insurer: "Zurich Insurance", expert: "Thomas Schneider", type: "Wasserschaden", amount: "CHF 8,500", status: "Abgeschlossen", time: "Vor 1 Std" },
  ]

  // ⬇️ NEW: Chart datasets
  const insurersData = [
    { name: "Helvetia", cases: 320, revenue: 185000, profit: 41000 },
    { name: "AXA", cases: 260, revenue: 150000, profit: 38000 },
    { name: "Zurich", cases: 210, revenue: 132000, profit: 30000 },
    { name: "Bâloise", cases: 180, revenue: 98000, profit: 21000 },
    { name: "Generali", cases: 150, revenue: 87000, profit: 19000 },
  ]

  const expertsData = [
    { name: "H. Müller", cases: 72, revenue: 45000, profit: 12000 },
    { name: "M. Weber", cases: 65, revenue: 42000, profit: 11000 },
    { name: "T. Schneider", cases: 58, revenue: 38000, profit: 9000 },
    { name: "L. Keller", cases: 53, revenue: 35000, profit: 8500 },
    { name: "A. Rossi", cases: 49, revenue: 33000, profit: 8000 },
  ]

  const categoryAgg = [
    { name: "Sachverständiger", cases: 520, revenue: 290000, profit: 72000 },
    { name: "Fahrzeugexperte", cases: 340, revenue: 210000, profit: 56000 },
    { name: "Versicherungsmissbrauch", cases: 180, revenue: 110000, profit: 31000 },
  ]
  const categoryCases = categoryAgg.map((c) => ({ name: c.name, value: c.cases }))
  const categoryRevenue = categoryAgg.map((c) => ({ name: c.name, value: c.revenue }))
  const categoryProfit = categoryAgg.map((c) => ({ name: c.name, value: c.profit }))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Zugewiesen":
        return "bg-blue-100 text-blue-800"
      case "In Bearbeitung":
        return "bg-yellow-100 text-yellow-800"
      case "Abgeschlossen":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="admin" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link href="/admin" className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/experts" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Users className="h-4 w-4" />
              <span>Experten</span>
            </Link>
            <Link href="/admin/insurers" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Building2 className="h-4 w-4" />
              <span>Versicherer</span>
            </Link>
            <Link href="/admin/cases" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <FileText className="h-4 w-4" />
              <span>Alle Fälle</span>
            </Link>
            <Link href="/admin/assignment" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <LucideMap className="h-4 w-4" />
              <span>Zuordnung</span>
            </Link>
            <Link href="/admin/reports" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <File className="h-4 w-4" />
              <span>Berichte</span>
              <Badge className="bg-yellow-500 text-white text-xs">3</Badge>
            </Link>
            <Link href="/admin/invoicing" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <DollarSign className="h-4 w-4" />
              <span>Rechnungen</span>
            </Link>
            <Link href="/admin/notifications" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">{2}</Badge>}
            </Link>
            <Link href="/admin/settings" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Globale Übersicht und Fallmanagement</p>
              </div>
            </div>

            {/* High-Level Business Stats */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Geschäftsübersicht</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {highLevelStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                          <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
                          <div className="flex items-center mt-2">
                            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-xs text-green-600">{stat.trend}</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Financial Metrics */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Finanzmetriken</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {financialStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                          <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
                          <div className="flex items-center mt-2">
                            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-xs text-green-600">{stat.trend}</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* ⬇️ NEW SECTION 1: Übersicht Versicherer */}
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Übersicht Versicherer</h2>
            <Card className="mb-8">
              <CardContent>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {/* Fälle */}
                  <div className="min-w-[560px] border rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Fälle je Versicherer</p>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={insurersData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={fmtNumber} />
                          <Tooltip formatter={(v: number) => fmtNumber(v)} />
                          <Bar dataKey="cases" fill={CHART_COLORS[0]} radius={[6,6,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* Umsatz */}
                  <div className="min-w-[560px] border rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Umsatz je Versicherer</p>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={insurersData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={fmtNumber} />
                          <Tooltip formatter={(v: number) => fmtCHF(v)} />
                          <Bar dataKey="revenue" fill={CHART_COLORS[1]} radius={[6,6,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* Gewinn */}
                  <div className="min-w-[560px] border rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Gewinn je Versicherer</p>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={insurersData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={fmtNumber} />
                          <Tooltip formatter={(v: number) => fmtCHF(v)} />
                          <Bar dataKey="profit" fill={CHART_COLORS[2]} radius={[6,6,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ⬇️ NEW SECTION 2: Übersicht Experten */}
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Übersicht Experten</h2>
            <Card className="mb-8">
              <CardContent>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {/* Fälle */}
                  <div className="min-w-[560px] border rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Fälle je Experte</p>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={expertsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={fmtNumber} />
                          <Tooltip formatter={(v: number) => fmtNumber(v)} />
                          <Bar dataKey="cases" fill={CHART_COLORS[0]} radius={[6,6,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* Umsatz */}
                  <div className="min-w-[560px] border rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Umsatz je Experte</p>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={expertsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={fmtNumber} />
                          <Tooltip formatter={(v: number) => fmtCHF(v)} />
                          <Bar dataKey="revenue" fill={CHART_COLORS[1]} radius={[6,6,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* Gewinn */}
                  <div className="min-w-[560px] border rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Gewinn je Experte</p>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={expertsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={fmtNumber} />
                          <Tooltip formatter={(v: number) => fmtCHF(v)} />
                          <Bar dataKey="profit" fill={CHART_COLORS[2]} radius={[6,6,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ⬇️ NEW SECTION 3: Übersicht Kategorien */}
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Übersicht Kategorien</h2>
            <Card className="mb-8">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Fälle */}
                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Fälle je Kategorie</p>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={categoryCases} dataKey="value" nameKey="name" outerRadius={90} label>
                            {categoryCases.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                          </Pie>
                          <Tooltip formatter={(v: number) => fmtNumber(v)} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* Umsatz */}
                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Umsatz je Kategorie</p>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={categoryRevenue} dataKey="value" nameKey="name" outerRadius={90} label>
                            {categoryRevenue.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                          </Pie>
                          <Tooltip formatter={(v: number) => fmtCHF(v)} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* Gewinn */}
                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Gewinn je Kategorie</p>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={categoryProfit} dataKey="value" nameKey="name" outerRadius={90} label>
                            {categoryProfit.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                          </Pie>
                          <Tooltip formatter={(v: number) => fmtCHF(v)} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-slate-600" />
                      Aktuelle Aktivitäten
                    </CardTitle>
                    <CardDescription>Neueste Fallaktivitäten und Zuweisungen</CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Alle anzeigen
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-slate-800">{activity.id}</h4>
                            <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            {activity.insurer} → {activity.expert}
                          </p>
                          <p className="text-xs text-slate-500">{activity.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-800">{activity.amount}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SLA Monitor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  SLA-Monitor
                </CardTitle>
                <CardDescription>Überwachung von Bearbeitungszeiten und kritischen Fällen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-green-700">SLA eingehalten</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">5</div>
                    <div className="text-sm text-yellow-700">Kritische Fälle</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <div className="text-sm text-red-700">Überfällige Fälle</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Detaillierte Analyse
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
