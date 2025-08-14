"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MessageSquare, AlertCircle, Clock, User, Building, ExternalLink, Settings, Mail, DollarSign, FileText, Building2, BarChart3, Users } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function AdminCommunicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Messages sent TO admin from cases
  const adminMessages = [
    {
      id: 1,
      caseId: "CLM-2024-001",
      from: "Dr. Hans Müller (Expert)",
      fromType: "expert",
      subject: "Zusätzliche Dokumentation benötigt",
      message: "Benötige Zugang zu zusätzlichen Werkstattberichten für vollständige Bewertung des Fahrzeugschadens.",
      timestamp: "2024-01-20 14:30",
      status: "Unread",
      priority: "High",
      insurer: "Zurich Insurance",
    },
    {
      id: 2,
      caseId: "CLM-2024-003",
      from: "Maria Weber (Helvetia)",
      fromType: "insurer",
      subject: "Dringende Rückfrage zu Expertenzuweisung",
      message: "Der zugewiesene Experte ist seit 3 Tagen nicht erreichbar. Bitte um alternative Zuweisung.",
      timestamp: "2024-01-20 11:15",
      status: "Read",
      priority: "High",
      insurer: "Helvetia Versicherung",
    },
    {
      id: 3,
      caseId: "CLM-2024-005",
      from: "Thomas Schneider (Expert)",
      fromType: "expert",
      subject: "Bericht eingereicht - Freigabe erforderlich",
      message: "Gutachten für Wasserschaden wurde eingereicht und wartet auf administrative Freigabe.",
      timestamp: "2024-01-20 09:45",
      status: "Read",
      priority: "Normal",
      insurer: "AXA Schweiz",
    },
    {
      id: 4,
      caseId: "CLM-2024-007",
      from: "Anna Fischer (Baloise)",
      fromType: "insurer",
      subject: "SLA-Verletzung befürchtet",
      message: "Fall läuft Gefahr, die SLA-Deadline zu überschreiten. Bitte um Statusupdate.",
      timestamp: "2024-01-19 16:20",
      status: "Read",
      priority: "Medium",
      insurer: "Baloise",
    },
  ]

  // System messages
  const systemMessages = [
    {
      id: 1,
      caseId: "CLM-2024-002",
      subject: "SLA-Deadline Warnung",
      message: "Fall CLM-2024-002 erreicht SLA-Deadline in 24 Stunden. Sofortige Aufmerksamkeit erforderlich.",
      timestamp: "2024-01-20 08:00",
      status: "Unread",
      priority: "High",
      type: "sla_warning",
    },
    {
      id: 2,
      caseId: "CLM-2024-004",
      subject: "Automatische Expertenzuweisung fehlgeschlagen",
      message:
        "Keine verfügbaren Experten für Gebäudeschaden in Region Basel gefunden. Manuelle Zuweisung erforderlich.",
      timestamp: "2024-01-19 22:15",
      status: "Read",
      priority: "Medium",
      type: "assignment_failed",
    },
    {
      id: 3,
      caseId: "CLM-2024-006",
      subject: "Dokument-Upload fehlgeschlagen",
      message: "Upload von Schadensdokumentation durch Experten fehlgeschlagen. Technische Unterstützung erforderlich.",
      timestamp: "2024-01-19 14:30",
      status: "Read",
      priority: "Low",
      type: "technical_issue",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Normal":
        return "bg-green-100 text-green-800"
      case "Low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFromTypeIcon = (type: string) => {
    switch (type) {
      case "expert":
        return <User className="h-4 w-4 text-teal-600" />
      case "insurer":
        return <Building className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredAdminMessages = adminMessages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.caseId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || message.fromType === filterType
    return matchesSearch && matchesFilter
  })

  const filteredSystemMessages = systemMessages.filter((message) => {
    return (
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.caseId.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader userType="admin" />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen">
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
              href="/admin/invoicing"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <DollarSign className="h-4 w-4" />
              <span>Rechnungen</span>
            </Link>
            <Link
              href="/admin/communications"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">{2}</Badge>}
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
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Kommunikation Monitor</h1>
            <p className="text-slate-600">Nachrichten an Admin und Systemmeldungen</p>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Ungelesene Nachrichten</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {adminMessages.filter((m) => m.status === "Unread").length +
                        systemMessages.filter((m) => m.status === "Unread").length}
                    </p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Von Experten</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {adminMessages.filter((m) => m.fromType === "expert").length}
                    </p>
                  </div>
                  <User className="h-8 w-8 text-teal-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Von Versicherern</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {adminMessages.filter((m) => m.fromType === "insurer").length}
                    </p>
                  </div>
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Systemmeldungen</p>
                    <p className="text-2xl font-bold text-slate-800">{systemMessages.length}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div> */}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Nachrichten</CardTitle>
                  <CardDescription>Nachrichten aus Fällen und Systemmeldungen</CardDescription>
                </div>
                <div className="flex space-x-4">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Nachrichten suchen..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="case-messages" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="case-messages" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Fall-Nachrichten (1)
                  </TabsTrigger>
                  <TabsTrigger value="system-messages" className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Systemmeldungen (1)
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="case-messages">
                  <div className="flex items-center space-x-4 mb-4">
                    <Button
                      variant={filterType === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType("all")}
                    >
                      Alle
                    </Button>
                    <Button
                      variant={filterType === "expert" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType("expert")}
                    >
                      <User className="h-4 w-4 mr-1" />
                      Experten
                    </Button>
                    <Button
                      variant={filterType === "insurer" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType("insurer")}
                    >
                      <Building className="h-4 w-4 mr-1" />
                      Versicherer
                    </Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fall-ID</TableHead>
                        <TableHead>Von</TableHead>
                        <TableHead>Betreff</TableHead>
                        <TableHead>Priorität</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Zeit</TableHead>
                        <TableHead>Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAdminMessages.map((message) => (
                        <TableRow key={message.id} className={message.status === "Unread" ? "bg-blue-50" : ""}>
                          <TableCell className="font-medium">
                            <div>
                              <p>{message.caseId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getFromTypeIcon(message.fromType)}
                              <div>
                                <span className={message.status === "Unread" ? "font-semibold" : ""}>
                                  {message.from}
                                </span>
                                <p className="text-xs text-slate-500">{message.insurer}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className={message.status === "Unread" ? "font-semibold" : ""}>{message.subject}</p>
                              <p className="text-sm text-slate-500 truncate max-w-xs">{message.message}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={message.status === "Unread" ? "default" : "secondary"}>
                              {message.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                              <Clock className="h-3 w-3" />
                              {message.timestamp}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/cases/${message.caseId}`}>
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="system-messages">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fall-ID</TableHead>
                        <TableHead>Betreff</TableHead>
                        <TableHead>Nachricht</TableHead>
                        <TableHead>Priorität</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Zeit</TableHead>
                        <TableHead>Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSystemMessages.map((message) => (
                        <TableRow key={message.id} className={message.status === "Unread" ? "bg-blue-50" : ""}>
                          <TableCell className="font-medium">
                            <div>
                              <p>{message.caseId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-orange-600" />
                              <span className={message.status === "Unread" ? "font-semibold" : ""}>
                                {message.subject}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm truncate max-w-md">{message.message}</p>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={message.status === "Unread" ? "default" : "secondary"}>
                              {message.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                              <Clock className="h-3 w-3" />
                              {message.timestamp}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/cases/${message.caseId}`}>
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
