"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  Download,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Users,
  MapPin,
  Calendar,
  Settings, 
  BarChart3, 
  Eye,
  MessageSquare
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PageHeader } from "@/components/shared/page-header"

export default function ClaimsListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("all")

  // Mock data
  const claims = [
    {
      id: "CLM-2024-001",
      policyNumber: "POL-2024-123456",
      type: "Fahrzeugschaden",
      status: "In Bearbeitung",
      expert: "Dr. Hans Müller",
      created: "15.01.2024",
      incident: "12.01.2024",
      amount: "CHF 8,500",
      location: "Zürich, ZH",
      urgency: "Mittel",
    },
    {
      id: "CLM-2024-002",
      policyNumber: "POL-2024-789012",
      type: "Gebäudeschaden",
      status: "Neu",
      expert: "Nicht zugewiesen",
      created: "14.01.2024",
      incident: "13.01.2024",
      amount: "CHF 25,000",
      location: "Basel, BS",
      urgency: "Hoch",
    },
    {
      id: "CLM-2024-003",
      policyNumber: "POL-2024-345678",
      type: "Fahrzeugschaden",
      status: "Abgeschlossen",
      expert: "Maria Weber",
      created: "12.01.2024",
      incident: "10.01.2024",
      amount: "CHF 3,200",
      location: "Bern, BE",
      urgency: "Niedrig",
    },
    {
      id: "CLM-2024-004",
      policyNumber: "POL-2024-901234",
      type: "Wasserschaden",
      status: "Freigegeben",
      expert: "Thomas Schneider",
      created: "11.01.2024",
      incident: "09.01.2024",
      amount: "CHF 12,800",
      location: "Luzern, LU",
      urgency: "Dringend",
    },
    {
      id: "CLM-2024-005",
      policyNumber: "POL-2024-567890",
      type: "Haftpflichtschaden",
      status: "In Bearbeitung",
      expert: "Dr. Anna Meier",
      created: "10.01.2024",
      incident: "08.01.2024",
      amount: "CHF 15,600",
      location: "St. Gallen, SG",
      urgency: "Mittel",
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Dringend":
        return "bg-red-100 text-red-800"
      case "Hoch":
        return "bg-orange-100 text-orange-800"
      case "Mittel":
        return "bg-yellow-100 text-yellow-800"
      case "Niedrig":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Neu":
        return <FileText className="h-4 w-4" />
      case "In Bearbeitung":
        return <Clock className="h-4 w-4" />
      case "Abgeschlossen":
        return <CheckCircle className="h-4 w-4" />
      case "Freigegeben":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter
    const matchesType = typeFilter === "all" || claim.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="insurer" userName="Helvetia Versicherung" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
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
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Alle Schadensfälle</h1>
              <p className="text-slate-600">Verwalten und überwachen Sie Ihre Schadensfälle</p>
            </div>
            <Button asChild>
              <Link href="/insurer/claims/new">
                <Plus className="h-4 w-4 mr-2" />
                Neuer Fall
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Filter & Suche</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Suche nach Fall-ID, Police oder Typ..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Status</SelectItem>
                    <SelectItem value="Neu">Neu</SelectItem>
                    <SelectItem value="In Bearbeitung">In Bearbeitung</SelectItem>
                    <SelectItem value="Abgeschlossen">Abgeschlossen</SelectItem>
                    <SelectItem value="Freigegeben">Freigegeben</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Schadenart" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Arten</SelectItem>
                    <SelectItem value="Fahrzeugschaden">Fahrzeugschaden</SelectItem>
                    <SelectItem value="Gebäudeschaden">Gebäudeschaden</SelectItem>
                    <SelectItem value="Wasserschaden">Wasserschaden</SelectItem>
                    <SelectItem value="Haftpflichtschaden">Haftpflichtschaden</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Zeitraum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Zeiträume</SelectItem>
                    <SelectItem value="today">Heute</SelectItem>
                    <SelectItem value="week">Diese Woche</SelectItem>
                    <SelectItem value="month">Dieser Monat</SelectItem>
                    <SelectItem value="quarter">Dieses Quartal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Claims List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Schadensfälle ({filteredClaims.length})</CardTitle>
                  <CardDescription>Übersicht über alle Ihre Schadensfälle</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportieren
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredClaims.map((claim) => (
                  <div key={claim.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                            {getStatusIcon(claim.status)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-slate-800">{claim.id}</h3>
                              <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                              <Badge variant="outline" className={getUrgencyColor(claim.urgency)}>
                                {claim.urgency}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600">
                              {claim.type} • Police: {claim.policyNumber}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Schaden: {claim.incident}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {claim.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {claim.expert}
                          </div>
                          <div className="font-semibold text-slate-800">{claim.amount}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/insurer/claims/${claim.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredClaims.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Keine Fälle gefunden</h3>
                  <p className="text-slate-600 mb-4">
                    Es wurden keine Fälle gefunden, die Ihren Suchkriterien entsprechen.
                  </p>
                  <Button asChild className="">
                    <Link href="/insurer/claims/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Ersten Fall erstellen
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
