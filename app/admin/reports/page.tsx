"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  X,
  Eye,
  Download,
  Clock,
  AlertTriangle,
  Search,
  Calendar,
  User,
  BarChart3,
  Building2,
  DollarSign,
  LucideMap,
  MessageSquare,
  Settings,
  Users,
  File
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function ReportsReviewPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const reports = [
    {
      id: "RPT-2024-001",
      claimId: "CLM-2024-001",
      title: "Schadensgutachten Fahrzeugkollision",
      expert: "Dr. Hans Müller",
      expertEmail: "hans.mueller@expert.ch",
      insurer: "Helvetia Versicherung",
      status: "Zur Prüfung",
      submitted: "2024-01-20 16:30",
      deadline: "2024-01-23 17:00",
      amount: "CHF 8,500",
      pages: 12,
      photos: 15,
      completeness: {
        description: true,
        photos: true,
        measurements: true,
        costEstimate: true,
        timeline: false,
        recommendations: true,
      },
      reviewNotes: "",
      qualityScore: 85,
    },
    {
      id: "RPT-2024-002",
      claimId: "CLM-2024-002",
      title: "Gebäudeschaden Wasserleitungsbruch",
      expert: "Maria Weber",
      expertEmail: "maria.weber@expert.ch",
      insurer: "AXA Schweiz",
      status: "Überarbeitung",
      submitted: "2024-01-19 14:15",
      deadline: "2024-01-22 17:00",
      amount: "CHF 25,000",
      pages: 18,
      photos: 22,
      completeness: {
        description: true,
        photos: true,
        measurements: false,
        costEstimate: true,
        timeline: true,
        recommendations: false,
      },
      reviewNotes: "Detailliertere Messungen erforderlich. Empfehlungen zur Schadensvermeidung fehlen.",
      qualityScore: 72,
    },
    {
      id: "RPT-2024-003",
      claimId: "CLM-2024-003",
      title: "Brandschaden Produktionshalle",
      expert: "Thomas Schneider",
      expertEmail: "thomas.schneider@expert.ch",
      insurer: "Zurich Insurance",
      status: "Genehmigt",
      submitted: "2024-01-18 11:45",
      deadline: "2024-01-21 17:00",
      amount: "CHF 120,000",
      pages: 25,
      photos: 35,
      completeness: {
        description: true,
        photos: true,
        measurements: true,
        costEstimate: true,
        timeline: true,
        recommendations: true,
      },
      reviewNotes: "Ausgezeichneter Bericht. Alle Kriterien erfüllt.",
      qualityScore: 95,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Zur Prüfung":
        return "bg-yellow-100 text-yellow-800"
      case "Überarbeitung":
        return "bg-red-100 text-red-800"
      case "Genehmigt":
        return "bg-green-100 text-green-800"
      case "Abgelehnt":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getQualityColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const now = new Date()
    const hoursLeft = (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (hoursLeft < 0) return { status: "Überfällig", color: "text-red-600" }
    if (hoursLeft < 24) return { status: "Kritisch", color: "text-orange-600" }
    if (hoursLeft < 48) return { status: "Bald fällig", color: "text-yellow-600" }
    return { status: "Rechtzeitig", color: "text-green-600" }
  }

  const selectedReportData = selectedReport ? reports.find((r) => r.id === selectedReport) : null

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.claimId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.expert.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleApprove = (reportId: string) => {
    console.log("Approving report:", reportId)
    // In real app, update report status via API
  }

  const handleReject = (reportId: string) => {
    console.log("Rejecting report:", reportId)
    // In real app, update report status via API
  }

  const handleRequestRevision = (reportId: string) => {
    console.log("Requesting revision for report:", reportId)
    // In real app, update report status via API
  }

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
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Berichte - Prüfung & Genehmigung</h1>
                <p className="text-gray-600">Überprüfung von Expertengutachten auf Vollständigkeit und Qualität</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Reports List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Berichte ({filteredReports.length})</CardTitle>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Suchen..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Alle</SelectItem>
                          <SelectItem value="Zur Prüfung">Zur Prüfung</SelectItem>
                          <SelectItem value="Überarbeitung">Überarbeitung</SelectItem>
                          <SelectItem value="Genehmigt">Genehmigt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredReports.map((report) => {
                        const deadlineStatus = getDeadlineStatus(report.deadline)
                        return (
                          <div
                            key={report.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedReport === report.id ? "bg-blue-50 border-blue-200" : "hover:bg-slate-50"
                            }`}
                            onClick={() => setSelectedReport(report.id)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-sm text-slate-800">{report.id}</h3>
                                <p className="text-xs text-slate-600">{report.claimId}</p>
                              </div>
                              <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                            </div>
                            <p className="text-sm text-slate-700 mb-2 line-clamp-2">{report.title}</p>
                            <div className="space-y-1 text-xs text-slate-500">
                              <div className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {report.expert}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span className={deadlineStatus.color}>{deadlineStatus.status}</span>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <span className="text-xs text-slate-500">Qualität:</span>
                                <span className={`text-xs font-medium ${getQualityColor(report.qualityScore)}`}>
                                  {report.qualityScore}%
                                </span>
                              </div>
                              <div className="text-xs text-slate-500">
                                {report.pages} S. • {report.photos} Fotos
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Report Review */}
              <div className="lg:col-span-2">
                {selectedReportData ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{selectedReportData.title}</span>
                            <Badge className={getStatusColor(selectedReportData.status)}>{selectedReportData.status}</Badge>
                          </CardTitle>
                          <CardDescription>
                            {selectedReportData.id} • Fall: {selectedReportData.claimId}
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleApprove(selectedReportData.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Genehmigen
                          </Button>
                          <Button
                            onClick={() => handleRequestRevision(selectedReportData.id)}
                            variant="outline"
                            className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            Überarbeitung
                          </Button>
                          <Button onClick={() => handleReject(selectedReportData.id)} variant="destructive">
                            <X className="h-4 w-4 mr-2" />
                            Ablehnen
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="review" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="review">Prüfung</TabsTrigger>
                          <TabsTrigger value="details">Details</TabsTrigger>
                          <TabsTrigger value="content">Inhalt</TabsTrigger>
                          <TabsTrigger value="history">Verlauf</TabsTrigger>
                        </TabsList>

                        <TabsContent value="review" className="space-y-4">
                          {/* Quality Score */}
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold text-slate-800">Qualitätsbewertung</h3>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-slate-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      selectedReportData.qualityScore >= 90
                                        ? "bg-green-500"
                                        : selectedReportData.qualityScore >= 75
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                    }`}
                                    style={{ width: `${selectedReportData.qualityScore}%` }}
                                  />
                                </div>
                                <span className={`font-semibold ${getQualityColor(selectedReportData.qualityScore)}`}>
                                  {selectedReportData.qualityScore}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Completeness Checklist */}
                          <div className="space-y-3">
                            <h3 className="font-semibold text-slate-800">Vollständigkeitsprüfung</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                              {Object.entries(selectedReportData.completeness).map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-2">
                                  <Checkbox checked={value}/>
                                  <span className={`text-sm ${value ? "text-slate-700" : "text-red-600"}`}>
                                    {key === "description" && "Schadensbeschreibung"}
                                    {key === "photos" && "Fotos/Dokumentation"}
                                    {key === "measurements" && "Messungen/Abmessungen"}
                                    {key === "costEstimate" && "Kostenvoranschlag"}
                                    {key === "timeline" && "Zeitplan/Ablauf"}
                                    {key === "recommendations" && "Empfehlungen"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Review Notes */}
                          <div className="space-y-3">
                            <h3 className="font-semibold text-slate-800">Prüfungsnotizen</h3>
                            <Textarea
                              placeholder="Notizen zur Prüfung des Berichts..."
                              defaultValue={selectedReportData.reviewNotes}
                              rows={4}
                            />
                          </div>

                          {/* Deadline Status */}
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-5 w-5 text-yellow-600" />
                              <div>
                                <p className="font-medium text-yellow-800">Frist-Status</p>
                                <p className="text-sm text-yellow-700">
                                  Eingereicht: {new Date(selectedReportData.submitted).toLocaleString("de-CH")}
                                  <br />
                                  Frist: {new Date(selectedReportData.deadline).toLocaleString("de-CH")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="details" className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium text-slate-700">Experte</label>
                                <p className="text-slate-900">{selectedReportData.expert}</p>
                                <p className="text-sm text-slate-600">{selectedReportData.expertEmail}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Versicherer</label>
                                <p className="text-slate-900">{selectedReportData.insurer}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Schadenssumme</label>
                                <p className="text-slate-900 text-lg font-semibold">{selectedReportData.amount}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium text-slate-700">Umfang</label>
                                <p className="text-slate-900">
                                  {selectedReportData.pages} Seiten • {selectedReportData.photos} Fotos
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Eingereicht</label>
                                <p className="text-slate-900">
                                  {new Date(selectedReportData.submitted).toLocaleString("de-CH")}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Frist</label>
                                <p className="text-slate-900">
                                  {new Date(selectedReportData.deadline).toLocaleString("de-CH")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="content" className="space-y-4">
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-slate-800 mb-3">Berichtsinhalt</h3>
                            <div className="space-y-2">
                              <Button variant="outline" className="w-full justify-start bg-transparent">
                                <Eye className="h-4 w-4 mr-2" />
                                Vollständigen Bericht anzeigen
                              </Button>
                              <Button variant="outline" className="w-full justify-start bg-transparent">
                                <Download className="h-4 w-4 mr-2" />
                                PDF herunterladen
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-medium text-slate-800">Zusammenfassung</h4>
                            <p className="text-sm text-slate-600">
                              Detaillierte Begutachtung des Schadensfalls mit umfassender Dokumentation und
                              Kostenaufstellung. Alle erforderlichen Messungen wurden durchgeführt und dokumentiert.
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="history" className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium text-slate-800">Bericht eingereicht</p>
                                  <p className="text-sm text-slate-500">
                                    {new Date(selectedReportData.submitted).toLocaleString("de-CH")}
                                  </p>
                                </div>
                                <p className="text-sm text-slate-600">von {selectedReportData.expert}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium text-slate-800">Prüfung begonnen</p>
                                  <p className="text-sm text-slate-500">Vor 2 Stunden</p>
                                </div>
                                <p className="text-sm text-slate-600">von Admin Team</p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-96">
                      <div className="text-center">
                        <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Keinen Bericht ausgewählt</h3>
                        <p className="text-gray-600">Wählen Sie einen Bericht aus der Liste aus, um ihn zu prüfen.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
