"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
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
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function ClaimsListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "new" | "in-progress" | "in-review" | "completed">("all")

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
    },
    {
      id: "CLM-2024-004",
      policyNumber: "POL-2024-901234",
      type: "Wasserschaden",
      status: "In Prüfung",
      expert: "Thomas Schneider",
      created: "11.01.2024",
      incident: "09.01.2024",
      amount: "CHF 12,800",
      location: "Luzern, LU",
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
      case "In Prüfung":
        return "bg-teal-100 text-teal-800"
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
    const q = searchTerm.toLowerCase()
    const matchesSearch =
      claim.id.toLowerCase().includes(q) ||
      claim.policyNumber.toLowerCase().includes(q) ||
      claim.type.toLowerCase().includes(q) ||
      claim.location.toLowerCase().includes(q) ||
      claim.expert.toLowerCase().includes(q)
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "new" && claim.status === "Neu") ||
      (activeTab === "in-progress" && claim.status === "In Bearbeitung") ||
      (activeTab === "in-review" && claim.status === "In Prüfung") ||
      (activeTab === "completed" && claim.status === "Abgeschlossen")

    return matchesSearch && matchesTab
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

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Heading + CTA */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Alle Schadensfälle</h1>
              <p className="text-gray-600">Verwalten und überwachen Sie Ihre Schadensfälle</p>
            </div>
            <Button asChild>
              <Link href="/insurer/claims/new">
                <Plus className="h-4 w-4 mr-2" />
                Neuer Fall
              </Link>
            </Button>
          </div>

          {/* Tabs + Search (mirrors expert page structure) */}
          <div className="bg-white mb-6 rounded-xl border shadow-sm">
            {/* Tab Navigation */}
            <div className="border-b">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {[
                  { id: "all", label: "Alle Fälle" },
                  { id: "new", label: "Neu" },
                  { id: "in-progress", label: "In Bearbeitung" },
                  { id: "in-review", label: "In Prüfung" },
                  { id: "completed", label: "Abgeschlossen" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`py-4 px-1 border-b-2 whitespace-nowrap font-medium text-sm ${
                      activeTab === (tab.id as typeof activeTab)
                        ? "border-primary text-primary"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Search + Export */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Suche nach Fall-ID, Schadensnummer, Typ oder Ort..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportieren
                </Button>
              </div>

              {/* Claims List */}
              <div className="space-y-4">
                {filteredClaims.map((claim) => (
                  <div key={claim.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                          {getStatusIcon(claim.status)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-slate-800">{claim.id}</h3>
                            <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                          </div>
                          <p className="text-slate-600">
                            {claim.type} • Schadensnummer: {claim.policyNumber}
                          </p>
                          <p className="text-sm text-slate-500 mt-1">Erstellt: {claim.created}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-slate-800">{claim.amount}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm text-slate-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schaden: {claim.incident}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {claim.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {claim.expert}
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Status: {claim.status}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-slate-500">Fälle insgesamt: {filteredClaims.length}</span>
                      <div className="flex gap-2">
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
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-800 mb-2">Keine Fälle gefunden</h3>
                  <p className="text-gray-600 mb-4">Versuchen Sie andere Suchbegriffe oder Filter.</p>
                  <Button asChild>
                    <Link href="/insurer/claims/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Ersten Fall erstellen
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
