"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Download, Search, Plus, Eye, Edit, Clock, CheckCircle, AlertCircle, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function ExpertReportsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock reports data
  const reports = [
    {
      id: "RPT-2024-045",
      caseId: "CLM-2024-045",
      title: "Fahrzeugschaden BMW X5 - Kollision",
      type: "Fahrzeugschaden",
      status: "Eingereicht",
      submittedDate: "17.01.2024",
      dueDate: "18.01.2024",
      insurer: "Helvetia Versicherung",
      template: "Fahrzeugschaden Standard",
      pages: 8,
      attachments: 12,
      reviewStatus: "Genehmigt",
      feedback: "Vollständiger und detaillierter Bericht. Alle erforderlichen Informationen enthalten.",
    },
    {
      id: "RPT-2024-046",
      caseId: "CLM-2024-046",
      title: "Gebäudeschaden - Wasserschaden Erdgeschoss",
      type: "Gebäudeschaden",
      status: "Entwurf",
      submittedDate: null,
      dueDate: "20.01.2024",
      insurer: "AXA Schweiz",
      template: "Gebäudeschaden Detailliert",
      pages: 6,
      attachments: 8,
      reviewStatus: "Ausstehend",
      feedback: null,
    },
    {
      id: "RPT-2024-044",
      caseId: "CLM-2024-044",
      title: "Maschinenschaden CNC-Maschine",
      type: "Maschinenschaden",
      status: "Überarbeitung",
      submittedDate: "16.01.2024",
      dueDate: "22.01.2024",
      insurer: "Zurich Versicherung",
      template: "Maschinenschaden Komplex",
      pages: 12,
      attachments: 15,
      reviewStatus: "Überarbeitung erforderlich",
      feedback: "Bitte zusätzliche Kostenaufstellung für Ersatzteile hinzufügen.",
    },
    {
      id: "RPT-2024-043",
      caseId: "CLM-2024-043",
      title: "Fahrzeugschaden Audi A4 - Parkschaden",
      type: "Fahrzeugschaden",
      status: "Abgeschlossen",
      submittedDate: "12.01.2024",
      dueDate: "14.01.2024",
      insurer: "Helvetia Versicherung",
      template: "Fahrzeugschaden Standard",
      pages: 5,
      attachments: 6,
      reviewStatus: "Genehmigt",
      feedback: "Schnelle und präzise Bearbeitung. Danke!",
    },
  ]

  // Mock templates data
  const templates = [
    {
      id: "TPL-001",
      name: "Fahrzeugschaden Standard",
      description: "Standardvorlage für einfache Fahrzeugschäden",
      category: "Fahrzeug",
      sections: 8,
      lastUpdated: "15.12.2023",
    },
    {
      id: "TPL-002",
      name: "Kollisionsschaden Detailliert",
      description: "Detaillierte Vorlage für komplexe Kollisionsschäden",
      category: "Fahrzeug",
      sections: 12,
      lastUpdated: "20.11.2023",
    },
    {
      id: "TPL-003",
      name: "Gebäudeschaden Detailliert",
      description: "Umfassende Vorlage für Gebäudeschäden",
      category: "Gebäude",
      sections: 15,
      lastUpdated: "10.01.2024",
    },
    {
      id: "TPL-004",
      name: "Maschinenschaden Komplex",
      description: "Spezialisierte Vorlage für Maschinenschäden",
      category: "Maschinen",
      sections: 18,
      lastUpdated: "05.01.2024",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entwurf":
        return "bg-gray-100 text-gray-800"
      case "Eingereicht":
        return "bg-blue-100 text-blue-800"
      case "Überarbeitung":
        return "bg-yellow-100 text-yellow-800"
      case "Abgeschlossen":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getReviewStatusColor = (status: string) => {
    switch (status) {
      case "Ausstehend":
        return "bg-gray-100 text-gray-800"
      case "Genehmigt":
        return "bg-green-100 text-green-800"
      case "Überarbeitung erforderlich":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Entwurf":
        return <Edit className="h-4 w-4" />
      case "Eingereicht":
        return <Upload className="h-4 w-4" />
      case "Überarbeitung":
        return <AlertCircle className="h-4 w-4" />
      case "Abgeschlossen":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.insurer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "drafts" && report.status === "Entwurf") ||
      (activeTab === "submitted" && ["Eingereicht", "Überarbeitung", "Abgeschlossen"].includes(report.status)) ||
      (activeTab === "approved" && report.reviewStatus === "Genehmigt")

    return matchesSearch && matchesStatus && matchesTab
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
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Meine Fälle</span>
            </Link>
            <Link
              href="/expert/appraiser/reports"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Berichte & Vorlagen</h1>
            <p className="text-slate-600">Verwalten Sie Ihre Berichte und verwenden Sie Vorlagen</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg mb-6">
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: "all", label: "Alle Berichte" },
                  { id: "drafts", label: "Entwürfe" },
                  { id: "submitted", label: "Eingereicht" },
                  { id: "approved", label: "Genehmigt" },
                  { id: "templates", label: "Vorlagen" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
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
              {activeTab !== "templates" && (
                <>
                  {/* Search and Filters */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Suche nach Titel, Fall-ID oder Versicherer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
                    >
                      <option value="all">Alle Status</option>
                      <option value="Entwurf">Entwurf</option>
                      <option value="Eingereicht">Eingereicht</option>
                      <option value="Überarbeitung">Überarbeitung</option>
                      <option value="Abgeschlossen">Abgeschlossen</option>
                    </select>
                    <Button className="">
                      <Plus className="h-4 w-4 mr-2" />
                      Neuer Bericht
                    </Button>
                  </div>

                  {/* Reports List */}
                  <div className="space-y-4">
                    {filteredReports.map((report) => (
                      <div key={report.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-slate-800">{report.title}</h3>
                              <Badge className={getStatusColor(report.status)}>
                                {getStatusIcon(report.status)}
                                <span className="ml-1">{report.status}</span>
                              </Badge>
                              {report.reviewStatus !== "Ausstehend" && (
                                <Badge className={getReviewStatusColor(report.reviewStatus)}>
                                  {report.reviewStatus}
                                </Badge>
                              )}
                            </div>
                            <p className="text-slate-600 mb-2">
                              {report.caseId} • {report.insurer} • {report.type}
                            </p>
                            <p className="text-sm text-slate-500">Vorlage: {report.template}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-500 mb-1">Fällig: {report.dueDate}</p>
                            {report.submittedDate && (
                              <p className="text-sm text-slate-500">Eingereicht: {report.submittedDate}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-slate-600">
                            <FileText className="h-4 w-4" />
                            <span>{report.pages} Seiten</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-slate-600">
                            <Upload className="h-4 w-4" />
                            <span>{report.attachments} Anhänge</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-slate-600">
                            <Clock className="h-4 w-4" />
                            <span>
                              {report.status === "Entwurf"
                                ? `${Math.ceil((new Date(report.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} Tage verbleibend`
                                : report.submittedDate}
                            </span>
                          </div>
                        </div>

                        {report.feedback && (
                          <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <p className="text-sm text-slate-700">
                              <strong>Feedback:</strong> {report.feedback}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-slate-500">ID: {report.id}</div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Anzeigen
                            </Button>
                            {report.status === "Entwurf" && (
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Bearbeiten
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            {report.status === "Entwurf" && (
                              <Button size="sm" className="">
                                Einreichen
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredReports.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-800 mb-2">Keine Berichte gefunden</h3>
                      <p className="text-slate-600">Versuchen Sie andere Suchbegriffe oder Filter.</p>
                    </div>
                  )}
                </>
              )}

              {activeTab === "templates" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">Verfügbare Vorlagen</h3>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Eigene Vorlage erstellen
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {templates.map((template) => (
                      <div key={template.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-2">{template.name}</h4>
                            <p className="text-sm text-slate-600 mb-2">{template.description}</p>
                            <Badge variant="outline" className="text-xs">
                              {template.category}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-600">
                          <div>
                            <span className="font-medium">Abschnitte:</span> {template.sections}
                          </div>
                          <div>
                            <span className="font-medium">Aktualisiert:</span> {template.lastUpdated}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            Vorschau
                          </Button>
                          <Button size="sm" className="flex-1 ">
                            Verwenden
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}