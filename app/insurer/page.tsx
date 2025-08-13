"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  BarChart3,
  Users,
  MapPin,
  Settings,
  MessageSquare
} from "lucide-react"
import Link from "next/link"
import { QuickActions, insurerQuickActions } from "@/components/shared/quick-actions"
import { PageHeader } from "@/components/shared/page-header"

export default function InsurerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data
  const stats = [
    { title: "Neue Fälle", value: "12", icon: FileText, color: "bg-blue-500" },
    { title: "In Bearbeitung", value: "28", icon: Clock, color: "bg-yellow-500" },
    { title: "Abgeschlossen", value: "156", icon: CheckCircle, color: "bg-green-500" },
    { title: "Freigegeben", value: "142", icon: AlertCircle, color: "bg-teal-500" },
  ]

  const recentClaims = [
    {
      id: "CLM-2024-001",
      type: "Fahrzeugschaden",
      status: "In Bearbeitung",
      expert: "Dr. Hans Müller",
      created: "15.01.2024",
      amount: "CHF 8,500",
      location: "Zürich",
    },
    {
      id: "CLM-2024-002",
      type: "Gebäudeschaden",
      status: "Neu",
      expert: "Nicht zugewiesen",
      created: "14.01.2024",
      amount: "CHF 25,000",
      location: "Basel",
    },
    {
      id: "CLM-2024-003",
      type: "Fahrzeugschaden",
      status: "Abgeschlossen",
      expert: "Maria Weber",
      created: "12.01.2024",
      amount: "CHF 3,200",
      location: "Bern",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Neu":
        return "bg-blue-100 text-blue-800"
      case "In Bearbeitung":
        return "bg-yellow-100 text-yellow-800"
      case "Abgeschlossen":
        return "bg-green-100 text-green-800"
      case "Freigegeben":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader userType="insurer" userName="Helvetia Versicherung" />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen hidden md:block">
          <nav className="p-4 space-y-2">
            <Link
              href="/insurer"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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
              href="/insurer/notifications"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">{2}</Badge>}
            </Link>
            <Link
              href="/insurer/settings"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span>Einstellungen</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Dashboard</h1>
            <p className="text-slate-600">Übersicht über Ihre Schadensfälle und KPIs</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                      <p className="text-xl md:text-2xl font-bold text-slate-800">{stat.value}</p>
                    </div>
                    <div className={`p-2 md:p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-4 w-4 md:h-6 md:w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <QuickActions actions={insurerQuickActions} />
            </div>

            {/* Quick Action Cards */}
            <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2 text-teal-600" />
                    Neuen Fall erstellen
                  </CardTitle>
                  <CardDescription>Melden Sie einen neuen Schadenfall zur Begutachtung an</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/insurer/claims/new">
                    <Button className="w-full ">Fall erstellen</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="h-5 w-5 mr-2 text-blue-600" />
                    Berichte exportieren
                  </CardTitle>
                  <CardDescription>Laden Sie Ihre Berichte und Rechnungen herunter</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/insurer/reports">
                    <Button variant="outline" className="w-full bg-transparent">
                      Zu den Berichten
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Claims */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Aktuelle Fälle</CardTitle>
                  <CardDescription>Ihre neuesten Schadensfälle im Überblick</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Suchen..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Status</SelectItem>
                      <SelectItem value="new">Neu</SelectItem>
                      <SelectItem value="processing">In Bearbeitung</SelectItem>
                      <SelectItem value="completed">Abgeschlossen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClaims.map((claim) => (
                  <div
                    key={claim.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-slate-50 space-y-3 md:space-y-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-800">{claim.id}</h3>
                          <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">
                          {claim.type} • {claim.created}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {claim.expert}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {claim.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center">
                      <p className="font-semibold text-slate-800">{claim.amount}</p>
                      <Link href={`/insurer/claims/${claim.id}`}>
                        <Button variant="ghost" size="sm" className="mt-0 md:mt-1">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/insurer/claims">
                  <Button variant="outline">Alle Fälle anzeigen</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}