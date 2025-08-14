"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  FileText,
  Building,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Paperclip,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  Edit,
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function AdminCaseDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock case data
  const caseData = {
    id: params.id,
    insurer: "Zurich Insurance",
    expert: "Dr. Hans Müller",
    type: "Fahrzeugschaden",
    amount: "CHF 15,000",
    status: "In Bearbeitung",
    priority: "Hoch",
    location: "Zürich, ZH",
    dateCreated: "2024-01-15",
    dateAssigned: "2024-01-16",
    dateDue: "2024-01-30",
    description: "Kollisionsschaden an BMW X5 nach Verkehrsunfall auf der A1",
    policyNumber: "POL-2024-789456",
    claimant: "Maria Weber",
    adminNotes: "Prioritätsfall - VIP Kunde. Schnelle Bearbeitung erforderlich.",
  }

  const timeline = [
    { date: "2024-01-15 09:30", event: "Fall erstellt", user: "System", type: "created" },
    { date: "2024-01-15 10:15", event: "Triage abgeschlossen", user: "Admin", type: "triage" },
    { date: "2024-01-16 14:20", event: "Experte zugewiesen", user: "Admin", type: "assigned" },
    { date: "2024-01-17 11:00", event: "Vor-Ort Termin vereinbart", user: "Dr. Müller", type: "appointment" },
    { date: "2024-01-18 16:30", event: "Erste Fotos hochgeladen", user: "Dr. Müller", type: "documents" },
  ]

  const documents = [
    { name: "Schadensmeldung.pdf", type: "PDF", size: "2.3 MB", uploadedBy: "Zurich Insurance", date: "2024-01-15" },
    { name: "Polizeibericht.pdf", type: "PDF", size: "1.8 MB", uploadedBy: "Zurich Insurance", date: "2024-01-15" },
    { name: "Fahrzeugfotos.zip", type: "ZIP", size: "15.2 MB", uploadedBy: "Dr. Müller", date: "2024-01-18" },
    { name: "Kostenvoranschlag.pdf", type: "PDF", size: "890 KB", uploadedBy: "Dr. Müller", date: "2024-01-19" },
  ]

  const messages = [
    {
      id: 1,
      from: "Zurich Insurance",
      to: "Dr. Müller",
      message: "Bitte prüfen Sie den Schaden so schnell wie möglich. VIP Kunde.",
      timestamp: "2024-01-16 15:30",
      type: "insurer-expert",
    },
    {
      id: 2,
      from: "Dr. Müller",
      to: "Admin",
      message: "Benötige Zugang zu zusätzlichen Werkstattberichten für vollständige Bewertung.",
      timestamp: "2024-01-18 10:15",
      type: "expert-admin",
    },
    {
      id: 3,
      from: "Admin",
      to: "Dr. Müller",
      message: "Werkstattberichte wurden angefordert und werden heute Nachmittag zur Verfügung gestellt.",
      timestamp: "2024-01-18 11:00",
      type: "admin-expert",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Bearbeitung":
        return "bg-yellow-100 text-yellow-800"
      case "Abgeschlossen":
        return "bg-green-100 text-green-800"
      case "Überfällig":
        return "bg-red-100 text-red-800"
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

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader userType="admin" />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen">
          <nav className="p-4 space-y-2">
            <Link
              href="/dashboard/admin/cases"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Zurück zu Fällen</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Fall {caseData.id}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <Badge className={getStatusColor(caseData.status)}>{caseData.status}</Badge>
                  <Badge className={getPriorityColor(caseData.priority)}>{caseData.priority}</Badge>
                  <span className="text-slate-600">{caseData.type}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Bearbeiten
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Status ändern
              </Button>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Building className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-slate-600">Versicherer</p>
                    <p className="font-semibold">{caseData.insurer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <User className="h-8 w-8 text-teal-600" />
                  <div>
                    <p className="text-sm text-slate-600">Experte</p>
                    <p className="font-semibold">{caseData.expert}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-slate-600">Schadensumme</p>
                    <p className="font-semibold">{caseData.amount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-slate-600">Fällig am</p>
                    <p className="font-semibold">{caseData.dateDue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Übersicht</TabsTrigger>
              <TabsTrigger value="documents">Dokumente</TabsTrigger>
              <TabsTrigger value="messages">Nachrichten</TabsTrigger>
              <TabsTrigger value="timeline">Verlauf</TabsTrigger>
              <TabsTrigger value="admin-notes">Admin Notizen</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Falldetails</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Policennummer</p>
                        <p className="font-medium">{caseData.policyNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Geschädigter</p>
                        <p className="font-medium">{caseData.claimant}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Ort</p>
                        <p className="font-medium flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {caseData.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Erstellt am</p>
                        <p className="font-medium flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {caseData.dateCreated}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Beschreibung</p>
                      <p className="text-sm mt-1">{caseData.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Status Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {timeline.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium text-sm">{item.event}</p>
                            <p className="text-xs text-slate-600">
                              {item.date} • {item.user}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Dokumente</CardTitle>
                  <CardDescription>Alle hochgeladenen Dateien und Berichte</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dateiname</TableHead>
                        <TableHead>Typ</TableHead>
                        <TableHead>Größe</TableHead>
                        <TableHead>Hochgeladen von</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium flex items-center">
                            <Paperclip className="h-4 w-4 mr-2 text-slate-400" />
                            {doc.name}
                          </TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell>{doc.uploadedBy}</TableCell>
                          <TableCell>{doc.date}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Nachrichten</CardTitle>
                  <CardDescription>Kommunikation zwischen allen Beteiligten</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{message.from}</span>
                            <span className="text-slate-400">→</span>
                            <span className="text-slate-600">{message.to}</span>
                            <Badge variant="outline" className="text-xs">
                              {message.type}
                            </Badge>
                          </div>
                          <span className="text-xs text-slate-500">{message.timestamp}</span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Vollständiger Verlauf</CardTitle>
                  <CardDescription>Chronologische Übersicht aller Aktivitäten</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {timeline.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mt-1"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{item.event}</p>
                            <span className="text-sm text-slate-500">{item.date}</span>
                          </div>
                          <p className="text-sm text-slate-600">von {item.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin-notes">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Notizen</CardTitle>
                  <CardDescription>Interne Notizen (nicht sichtbar für Versicherer/Experten)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">Aktuelle Notiz</p>
                        <p className="text-sm text-yellow-700 mt-1">{caseData.adminNotes}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Neue Notiz hinzufügen</label>
                    <Textarea placeholder="Interne Notiz eingeben..." rows={4} className="mb-4" />
                    <Button className="bg-purple-600 hover:bg-purple-700">Notiz speichern</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
