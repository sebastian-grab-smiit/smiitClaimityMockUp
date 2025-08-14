"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Filter, MapPin, Clock, FileText, Upload, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function ExpertCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock data
  const cases = [
    {
      id: "CLM-2024-045",
      insurer: "Helvetia Versicherung",
      type: "Fahrzeugschaden",
      location: "Zürich, Bahnhofstrasse 15",
      deadline: "18.01.2024",
      amount: "CHF 12,000",
      status: "Akzeptiert",
      priority: "Hoch",
      distance: "2.5 km",
      assignedDate: "15.01.2024",
      description: "Kollisionsschaden an BMW X5, Frontbereich betroffen",
      contact: "Maria Schneider",
      phone: "+41 44 123 45 67",
    },
    {
      id: "CLM-2024-046",
      insurer: "AXA Schweiz",
      type: "Gebäudeschaden",
      location: "Zürich, Limmatquai 8",
      deadline: "20.01.2024",
      amount: "CHF 8,500",
      status: "In Bearbeitung",
      priority: "Mittel",
      distance: "1.8 km",
      assignedDate: "16.01.2024",
      description: "Wasserschaden im Erdgeschoss nach Rohrbruch",
      contact: "Thomas Weber",
      phone: "+41 44 234 56 78",
    },
    {
      id: "CLM-2024-044",
      insurer: "Zurich Versicherung",
      type: "Maschinenschaden",
      location: "Winterthur, Industriestrasse 42",
      deadline: "22.01.2024",
      amount: "CHF 15,000",
      status: "Neu",
      priority: "Niedrig",
      distance: "18.5 km",
      assignedDate: "17.01.2024",
      description: "Defekt an CNC-Maschine, Produktionsausfall",
      contact: "Andreas Müller",
      phone: "+41 52 345 67 89",
    },
    {
      id: "CLM-2024-043",
      insurer: "Helvetia Versicherung",
      type: "Fahrzeugschaden",
      location: "Zürich, Seestrasse 120",
      deadline: "Abgeschlossen",
      amount: "CHF 5,200",
      status: "Abgeschlossen",
      priority: "Mittel",
      distance: "4.2 km",
      assignedDate: "10.01.2024",
      description: "Parkschaden an Audi A4, Heckbereich",
      contact: "Sandra Huber",
      phone: "+41 44 456 78 90",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Neu":
        return "bg-blue-100 text-blue-800"
      case "Akzeptiert":
        return "bg-green-100 text-green-800"
      case "In Bearbeitung":
        return "bg-yellow-100 text-yellow-800"
      case "Abgeschlossen":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Hoch":
        return "bg-red-100 text-red-800"
      case "Mittel":
        return "bg-yellow-100 text-yellow-800"
      case "Niedrig":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.insurer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    const matchesType = typeFilter === "all" || case_.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="expert-appraiser" userName="Dr. Hans Müller" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link
              href="/expert/appraiser"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/expert/appraiser/cases"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Meine Fälle</span>
            </Link>
            <Link
              href="/expert/appraiser/reports"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Upload className="h-4 w-4" />
              <span>Berichte</span>
            </Link>
            <Link
              href="/expert/appraiser/calendar"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Clock className="h-4 w-4" />
              <span>Kalender</span>
            </Link>
            <Link
              href="/expert/appraiser/notifications"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">{2}</Badge>}
            </Link>
            <Link
              href="/expert/appraiser/settings"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span>Profil</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Meine Fälle</h1>
              <p className="text-gray-600">Übersicht aller zugewiesenen Fälle</p>
            </div>
            <div className="text-sm text-slate-600">
              {filteredCases.length} von {cases.length} Fällen
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Suche nach Fall-ID, Versicherer, Typ oder Ort..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="all">Alle Status</option>
                <option value="Neu">Neu</option>
                <option value="Akzeptiert">Akzeptiert</option>
                <option value="In Bearbeitung">In Bearbeitung</option>
                <option value="Abgeschlossen">Abgeschlossen</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="all">Alle Typen</option>
                <option value="Fahrzeugschaden">Fahrzeugschaden</option>
                <option value="Gebäudeschaden">Gebäudeschaden</option>
                <option value="Maschinenschaden">Maschinenschaden</option>
                <option value="Haftpflichtschaden">Haftpflichtschaden</option>
              </select>
            </div>
          </div>

          {/* Cases List */}
          <div className="space-y-4">
            {filteredCases.map((case_) => (
              <div key={case_.id} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-slate-800">{case_.id}</h3>
                      <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                      <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                    </div>
                    <p className="text-slate-600 mb-1">
                      {case_.insurer} • {case_.type}
                    </p>
                    <p className="text-sm text-slate-500">{case_.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-slate-800">{case_.amount}</p>
                    <p className="text-sm text-slate-500">
                      {case_.status === "Abgeschlossen" ? "Abgeschlossen" : `Fällig: ${case_.deadline}`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span>{case_.location}</span>
                    <span className="text-green-600">({case_.distance})</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>Zugewiesen: {case_.assignedDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <FileText className="h-4 w-4" />
                    <span>Kontakt: {case_.contact}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-slate-500">Telefon: {case_.phone}</div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Kontakt
                    </Button>
                    <Link href={`/expert/appraiser/cases/${case_.id}`}>
                      <Button size="sm" className="">
                        Details anzeigen
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className="bg-white rounded-lg p-12 text-center">
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-800 mb-2">Keine Fälle gefunden</h3>
              <p className="text-gray-600">Versuchen Sie andere Suchbegriffe oder Filter.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
