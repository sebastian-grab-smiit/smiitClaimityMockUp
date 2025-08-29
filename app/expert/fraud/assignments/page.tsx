"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Clock,
  FileText,
  CheckCircle,
  X,
  Eye,
  Calendar,
  User,
  BarChart3,
  MessageSquare,
  Settings,
  Upload,
  Building2,
  Phone,
  Timer,
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function ExpertAssignmentsPage() {
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [rejectionReason, setRejectionReason] = useState("")

  // Mock data - only "Neu" status cases
  const assignments = [
    {
      id: "CLM-2024-044",
      insurer: "Zurich Versicherung",
      type: "Maschinenschaden",
      location: "Winterthur, Industriestrasse 42",
      daysLeft: 10,
      amount: "CHF 15,000",
      status: "Neu",
      distance: "18.5 km",
      assignedDate: "17.01.2024",
      description:
        "Defekt an CNC-Maschine, Produktionsausfall. Detaillierte Begutachtung der Maschinenschäden erforderlich.",
      contact: "Andreas Müller",
      phone: "+41 52 345 67 89",
      email: "andreas.mueller@zurich.ch",
      estimatedHours: "6-8 Stunden",
      documents: ["Schadensmeldung", "Maschinenspezifikationen", "Wartungsprotokoll"],
    },
    {
      id: "CLM-2024-047",
      insurer: "Helvetia Versicherung",
      type: "Fahrzeugschaden",
      location: "Zürich, Hardbrücke 12",
      daysLeft: 2,
      amount: "CHF 9,200",
      status: "Neu",
      distance: "3.2 km",
      assignedDate: "17.01.2024",
      description: "Kollisionsschaden an Mercedes E-Klasse, Seitenschaden durch Parkplatzunfall.",
      contact: "Sandra Weber",
      phone: "+41 44 567 89 01",
      email: "sandra.weber@helvetia.ch",
      estimatedHours: "3-4 Stunden",
      documents: ["Unfallbericht", "Fahrzeugpapiere", "Fotos"],
    },
    {
      id: "CLM-2024-048",
      insurer: "AXA Schweiz",
      type: "Gebäudeschaden",
      location: "Zürich, Bahnhofstrasse 88",
      daysLeft: 0,
      amount: "CHF 22,000",
      status: "Neu",
      distance: "1.1 km",
      assignedDate: "18.01.2024",
      description: "Sturmschaden am Dach eines Geschäftsgebäudes, Ziegel beschädigt, Wassereintritt möglich.",
      contact: "Michael Schneider",
      phone: "+41 44 678 90 12",
      email: "michael.schneider@axa.ch",
      estimatedHours: "4-6 Stunden",
      documents: ["Schadensmeldung", "Gebäudepläne", "Wetterbericht"],
    },
  ]

  const getDeadlineStatus = (daysLeft: number) => {
    // const deadlineDate = new Date(deadline)
    // const now = new Date()
    // const daysLeft = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    daysLeft

    if (daysLeft < 0) return { status: "Überfällig", color: "text-red-600" }
    if (daysLeft <= 1) return { status: "Heute fällig", color: "text-red-600" }
    if (daysLeft <= 2) return { status: "Morgen fällig", color: "text-orange-600" }
    if (daysLeft <= 3) return { status: "Bald fällig", color: "text-yellow-600" }
    return { status: `${daysLeft} Tage`, color: "text-green-600" }
  }

  const selectedAssignmentData = selectedAssignment ? assignments.find((a) => a.id === selectedAssignment) : null

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.insurer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || assignment.type === typeFilter

    return matchesSearch && matchesType
  })

  const handleAccept = (assignmentId: string) => {
    console.log("Accepting assignment:", assignmentId)
    // In real app, update assignment status via API
  }

  const handleReject = (assignmentId: string) => {
    console.log("Rejecting assignment:", assignmentId, "Reason:", rejectionReason)
    // In real app, update assignment status via API
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="expert-fraud" userName="Dr. Hans Müller" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link
              href="/expert/fraud"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/expert/fraud/assignments"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <Clock className="h-4 w-4" />
              <span>Zuweisungen</span>
              <Badge className="bg-yellow-500 text-white text-xs">{assignments.length}</Badge>
            </Link>
            <Link
              href="/expert/fraud/cases"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Meine Fälle</span>
            </Link>
            <Link
              href="/expert/fraud/reports"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Upload className="h-4 w-4" />
              <span>Berichte</span>
            </Link>
            <Link
              href="/expert/fraud/time-tracking"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Timer className="h-4 w-4" />
              <span>Zeiterfassung</span>
            </Link>
            <Link
              href="/expert/fraud/calendar"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Calendar className="h-4 w-4" />
              <span>Kalender</span>
            </Link>
            <Link
              href="/expert/fraud/notifications"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              <Badge className="bg-red-500 text-white text-xs">2</Badge>
            </Link>
            <Link
              href="/expert/fraud/settings"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span>Profil</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Neue Zuweisungen</h1>
                <p className="text-gray-600">Prüfen und entscheiden Sie über neue Fallzuweisungen</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Assignments List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Zuweisungen ({filteredAssignments.length})</CardTitle>
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
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Typ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Alle</SelectItem>
                          <SelectItem value="Fahrzeugschaden">Fahrzeug</SelectItem>
                          <SelectItem value="Gebäudeschaden">Gebäude</SelectItem>
                          <SelectItem value="Maschinenschaden">Maschine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredAssignments.map((assignment) => {
                        const deadlineStatus = getDeadlineStatus(assignment.daysLeft)
                        return (
                          <div
                            key={assignment.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedAssignment === assignment.id ? "bg-blue-50 border-blue-200" : "hover:bg-slate-50"
                            }`}
                            onClick={() => setSelectedAssignment(assignment.id)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-sm text-slate-800">{assignment.id}</h3>
                                <p className="text-xs text-slate-600">{assignment.insurer}</p>
                              </div>
                            </div>
                            <p className="text-sm text-slate-700 mb-2">{assignment.type}</p>
                            <div className="space-y-1 text-xs text-slate-500">
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{assignment.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span className={deadlineStatus.color}>{deadlineStatus.status}</span>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="text-xs text-slate-500">{assignment.distance}</div>
                              <div className="text-xs font-medium text-slate-700">{assignment.amount}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Assignment Details */}
              <div className="lg:col-span-2">
                {selectedAssignmentData ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{selectedAssignmentData.type}</span>
                          </CardTitle>
                          <CardDescription>
                            {selectedAssignmentData.id} • {selectedAssignmentData.insurer}
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleAccept(selectedAssignmentData.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Annehmen
                          </Button>
                          <Button onClick={() => handleReject(selectedAssignmentData.id)} variant="destructive"
                            className="bg-red-500 hover:bg-red-600">
                            <X className="h-4 w-4 mr-2" />
                            Ablehnen
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="details" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="details">Details</TabsTrigger>
                          <TabsTrigger value="documents">Dokumente</TabsTrigger>
                          <TabsTrigger value="reject">Ablehnung</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium text-slate-700">Schadensbeschreibung</label>
                                <p className="text-slate-900">{selectedAssignmentData.description}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Ort</label>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4 text-slate-500" />
                                  <span className="text-slate-900">{selectedAssignmentData.location}</span>
                                  <span className="text-green-600">({selectedAssignmentData.distance})</span>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Schadenssumme</label>
                                <p className="text-slate-900 text-lg font-semibold">{selectedAssignmentData.amount}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium text-slate-700">Kontaktperson</label>
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <User className="h-4 w-4 text-slate-500" />
                                    <span className="text-slate-900">{selectedAssignmentData.contact}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-slate-500" />
                                    <span className="text-slate-900">{selectedAssignmentData.phone}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Building2 className="h-4 w-4 text-slate-500" />
                                    <span className="text-slate-900">{selectedAssignmentData.email}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Zugewiesen am</label>
                                <p className="text-slate-900">{selectedAssignmentData.assignedDate}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Frist</label>
                                <p className="text-slate-900">{selectedAssignmentData.daysLeft}</p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="documents" className="space-y-4">
                          <div className="space-y-3">
                            <h3 className="font-semibold text-slate-800">Verfügbare Dokumente</h3>
                            <div className="space-y-2">
                              {selectedAssignmentData.documents.map((doc, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                                >
                                  <div className="flex items-center space-x-2">
                                    <FileText className="h-4 w-4 text-slate-500" />
                                    <span className="text-slate-700">{doc}</span>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-2" />
                                    Anzeigen
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="reject" className="space-y-4">
                          <div className="space-y-3">
                            <h3 className="font-semibold text-slate-800">Grund für Ablehnung</h3>
                            <Textarea
                              placeholder="Bitte geben Sie den Grund für die Ablehnung an..."
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              rows={4}
                            />
                            <div className="bg-yellow-50 p-4 rounded-lg">
                              <p className="text-sm text-yellow-800">
                                <strong>Hinweis:</strong> Eine Begründung ist erforderlich, damit der Administrator
                                geeignete alternative Experten finden kann.
                              </p>
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
                        <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Keine Zuweisung ausgewählt</h3>
                        <p className="text-gray-600">
                          Wählen Sie eine Zuweisung aus der Liste aus, um Details zu sehen.
                        </p>
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
