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
  BarChart3,
  Building2,
  MessageSquare,
  Settings,
  Users,
  Upload,
  LucideMap,
  File
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function AdminCaseDetailPage({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [chatMessage, setChatMessage] = useState("")

  // Mock case data
  const caseData = {
    id,
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
        sender: 'Maria Schneider',
        role: 'Versicherer',
        messageType: 'insurer',
        time: '17.01.2024 09:00',
        message:
          'Guten Tag, könnten Sie bitte eine Einschätzung der Reparaturkosten abgeben? Der Kunde fragt nach.',
        attachments: [],
      },
      {
        id: 2,
        sender: 'Dr. Hans Müller',
        role: 'Experte',
        messageType: 'insurer',
        time: '17.01.2024 11:30',
        message:
          'Hallo Frau Schneider, basierend auf meiner Besichtigung schätze ich die Reparaturkosten auf CHF 8,500-10,200. Detaillierter Kostenvoranschlag folgt bis morgen.',
        attachments: ['Kosteneinschaetzung_vorlaeufig.pdf'],
      },
    ]

  const chat = [
      {
        id: 1,
        sender: 'Burim Kryeziu',
        role: 'Admin',
        messageType: 'admin',
        time: '17.01.2024 09:00',
        message:
          'Ich bin ein Admin.',
        attachments: [],
      },
      {
        id: 2,
        sender: 'Dr. Hans Müller',
        role: 'Experte',
        messageType: 'admin',
        time: '17.01.2024 11:30',
        message:
          'Ich habe einen Doktortitel.',
        attachments: [],
      },
    ]

  const reports = [
    { name: "Bericht.pdf", type: "PDF", size: "890 KB", uploadedBy: "Dr. Müller", date: "2024-01-19" },
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
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
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
              href="/admin/notifications"
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
          <Link href="/admin/cases" className="flex items-center text-primary mb-3">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Übersicht
          </Link>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Fall {caseData.id}</h1>
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
              <Button className="bg-primary">
                <CheckCircle className="h-4 w-4 mr-2" />
                Status ändern
              </Button>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Versicherer</p>
                    <p className="text-2xl font-bold text-gray-900">{caseData.insurer}</p>
                  </div>
                  <Building className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Experte</p>
                    <p className="text-2xl font-bold text-gray-900">{caseData.expert}</p>
                  </div>
                  <User className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Schadensumme</p>
                    <p className="text-2xl font-bold text-gray-900">{caseData.amount}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Fällig am</p>
                    <p className="text-2xl font-bold text-gray-900">{caseData.dateDue}</p>
                  </div>
                  <Clock className="h-8 w-8 text-primary" />
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
              <TabsTrigger value="reports">Bericht</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
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
                        <p className="text-sm text-slate-600">Schadensnummer</p>
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
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
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
                        <TableHead>Grösse</TableHead>
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
                    {messages.map((msg) => (
                      <div key={msg.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-slate-800">{msg.sender}</span>
                            <Badge variant="outline" className="text-xs">
                              {msg.role}
                            </Badge>
                          </div>
                          <span className="text-sm text-slate-500">{msg.time}</span>
                        </div>
                        <p className="text-slate-700 mb-2">{msg.message}</p>
                        {msg.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {msg.attachments.map((attachment, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                📎 {attachment}
                              </Badge>
                            ))}
                          </div>
                        )}
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
                        <div className="w-3 h-3 bg-primary rounded-full mt-1"></div>
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

            <TabsContent value="reports">
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
                        <TableHead>Grösse</TableHead>
                        <TableHead>Hochgeladen von</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reports.map((doc, index) => (
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

            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle>Admin-Chat</CardTitle>
                  <CardDescription>Kommunikation mit dem Experten</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chat.map((msg) => (
                      <div key={msg.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-slate-800">{msg.sender}</span>
                            <Badge variant="outline" className="text-xs">
                              {msg.role}
                            </Badge>
                          </div>
                          <span className="text-sm text-slate-500">{msg.time}</span>
                        </div>
                        <p className="text-slate-700 mb-2">{msg.message}</p>
                        {msg.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {msg.attachments.map((attachment, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                📎 {attachment}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border rounded-lg p-4 mt-4">
                    <Textarea
                      placeholder="Nachricht eingeben..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Anhang
                      </Button>
                      <Button size="sm" className="">
                        Senden
                      </Button>
                    </div>
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
