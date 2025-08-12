"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  FileText,
  ImageIcon,
  Clock,
  User,
  MapPin,
  Calendar,
  Download,
  Upload,
  Send,
  CheckCircle,
  Eye,
  BarChart3,
  Settings,
  Plus,
  Users,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PageHeader } from "@/components/shared/page-header"

export default function ClaimDetailPage({ id }: { id: string }) {
  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in real app, fetch based on params.id
  const claim = {
    id,
    policyNumber: "POL-2024-123456",
    type: "Fahrzeugschaden",
    status: "In Bearbeitung",
    expert: {
      name: "Dr. Hans Müller",
      email: "hans.mueller@expert.ch",
      phone: "+41 44 123 45 67",
      specialties: ["Fahrzeugschäden", "Maschinenschäden"],
    },
    created: "15.01.2024",
    incident: "12.01.2024",
    amount: "CHF 8,500",
    location: {
      address: "Bahnhofstrasse 123",
      city: "8000 Zürich",
      canton: "ZH",
    },
    description:
      "Kollision mit einem anderen Fahrzeug an der Kreuzung. Schäden an der Frontpartie und am rechten Kotflügel. Airbag wurde ausgelöst.",
    urgency: "Mittel",
    sla: {
      assigned: "16.01.2024 09:30",
      firstContact: "16.01.2024 14:15",
      reportDue: "23.01.2024",
      status: "On Track",
    },
  }

  const timeline = [
    {
      date: "16.01.2024 14:15",
      event: "Experte kontaktiert Versicherungsnehmer",
      user: "Dr. Hans Müller",
      type: "contact",
    },
    {
      date: "16.01.2024 09:30",
      event: "Fall an Experten zugewiesen",
      user: "System",
      type: "assignment",
    },
    {
      date: "15.01.2024 16:45",
      event: "Fall erstellt und eingereicht",
      user: "Versicherer",
      type: "creation",
    },
  ]

  const documents = [
    {
      name: "Schadenfotos_Fahrzeug.zip",
      type: "images",
      size: "2.4 MB",
      uploaded: "15.01.2024",
      uploader: "Versicherer",
    },
    {
      name: "Polizeibericht.pdf",
      type: "document",
      size: "156 KB",
      uploaded: "15.01.2024",
      uploader: "Versicherer",
    },
    {
      name: "Kostenvoranschlag_Garage.pdf",
      type: "document",
      size: "89 KB",
      uploaded: "16.01.2024",
      uploader: "Dr. Hans Müller",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Dr. Hans Müller",
      role: "Experte",
      message:
        "Guten Tag, ich habe den Fall erhalten und werde morgen vor Ort eine Begutachtung durchführen. Können Sie mir bitte bestätigen, ob das Fahrzeug noch am Unfallort steht?",
      timestamp: "16.01.2024 14:15",
      attachments: [],
    },
    {
      id: 2,
      sender: "Versicherer",
      role: "Versicherer",
      message:
        "Das Fahrzeug wurde bereits zur Garage Müller AG gebracht. Die Adresse ist: Industriestrasse 45, 8005 Zürich. Besten Dank für die schnelle Bearbeitung.",
      timestamp: "16.01.2024 15:30",
      attachments: ["Garage_Kontakt.pdf"],
    },
  ]

  const reports = [
    {
      name: "Schadensgutachten_Vorabericht.pdf",
      status: "Entwurf",
      created: "17.01.2024",
      expert: "Dr. Hans Müller",
    },
  ]

  const invoices = [
    {
      number: "INV-2024-001",
      amount: "CHF 450.00",
      status: "Offen",
      due: "30.01.2024",
      expert: "Dr. Hans Müller",
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

  const getSLAColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "text-green-600"
      case "At Risk":
        return "text-yellow-600"
      case "Overdue":
        return "text-red-600"
      default:
        return "text-slate-600"
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, send message via API
      setNewMessage("")
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

        {/* <div className="max-w-7xl mx-auto p-6"> */}
          <Link href="/insurer/claims" className="flex items-center text-primary mb-3">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Übersicht
          </Link>
          {/* Claim Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-slate-800">{claim.id}</h1>
                  <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                </div>
                <p className="text-slate-600">
                  {claim.type} • Police: {claim.policyNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-800">{claim.amount}</p>
                <p className="text-sm text-slate-600">Geschätzte Schadenssumme</p>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Schadensdatum</p>
                      <p className="font-semibold">{claim.incident}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Ort</p>
                      <p className="font-semibold">{claim.location.city}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Experte</p>
                      <p className="font-semibold">{claim.expert.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">SLA Status</p>
                      <p className={`font-semibold ${getSLAColor(claim.sla.status)}`}>{claim.sla.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Übersicht</TabsTrigger>
              <TabsTrigger value="documents">Dokumente</TabsTrigger>
              <TabsTrigger value="messages">Nachrichten</TabsTrigger>
              <TabsTrigger value="reports">Berichte</TabsTrigger>
              <TabsTrigger value="history">Verlauf</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Schadensbeschreibung</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">{claim.description}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Dringlichkeit:</span>
                        <Badge variant="outline">{claim.urgency}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Adresse:</span>
                        <span>
                          {claim.location.address}, {claim.location.city}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Experte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-slate-800">{claim.expert.name}</p>
                        <p className="text-sm text-slate-600">{claim.expert.email}</p>
                        <p className="text-sm text-slate-600">{claim.expert.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Spezialisierungen:</p>
                        <div className="flex flex-wrap gap-1">
                          {claim.expert.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>SLA Timeline</CardTitle>
                  <CardDescription>Wichtige Meilensteine und Fristen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">Fall zugewiesen</p>
                          <p className="text-sm text-green-600">{claim.sla.assigned}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">Erstkontakt</p>
                          <p className="text-sm text-green-600">{claim.sla.firstContact}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-yellow-800">Bericht fällig</p>
                          <p className="text-sm text-yellow-600">{claim.sla.reportDue}</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Ausstehend</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Dokumente</CardTitle>
                      <CardDescription>Alle hochgeladenen Dateien und Dokumente</CardDescription>
                    </div>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Hochladen
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                            {doc.type === "images" ? (
                              <ImageIcon className="h-5 w-5 text-slate-600" />
                            ) : (
                              <FileText className="h-5 w-5 text-slate-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{doc.name}</p>
                            <p className="text-sm text-slate-500">
                              {doc.size} • {doc.uploaded} • {doc.uploader}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nachrichten</CardTitle>
                  <CardDescription>Kommunikation zwischen allen Beteiligten</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {messages.map((message) => (
                      <div key={message.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-teal-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-800">{message.sender}</p>
                              <p className="text-xs text-slate-500">{message.role}</p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500">{message.timestamp}</p>
                        </div>
                        <p className="text-slate-700 mb-2">{message.message}</p>
                        {message.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {message.attachments.map((attachment, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                {attachment}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* New Message */}
                  <div className="border-t pt-4">
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Neue Nachricht schreiben..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={3}
                      />
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Anhang
                        </Button>
                        <Button onClick={handleSendMessage} className="bg-teal-500 hover:bg-teal-600">
                          <Send className="h-4 w-4 mr-2" />
                          Senden
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Berichte</CardTitle>
                    <CardDescription>Gutachten und Berichte</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {reports.map((report, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-slate-600" />
                            <div>
                              <p className="font-medium text-slate-800">{report.name}</p>
                              <p className="text-sm text-slate-500">
                                {report.created} • {report.expert}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{report.status}</Badge>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rechnungen</CardTitle>
                    <CardDescription>Expertenrechnungen</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {invoices.map((invoice, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium text-slate-800">{invoice.number}</p>
                            <p className="text-sm text-slate-500">
                              Fällig: {invoice.due} • {invoice.expert}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-800">{invoice.amount}</p>
                            <Badge variant="outline" className="text-xs">
                              {invoice.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Verlauf</CardTitle>
                  <CardDescription>Chronologische Übersicht aller Aktivitäten</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-slate-800">{event.event}</p>
                            <p className="text-sm text-slate-500">{event.date}</p>
                          </div>
                          <p className="text-sm text-slate-600">von {event.user}</p>
                        </div>
                      </div>
                    ))}
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
