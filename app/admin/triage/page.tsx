"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, AlertTriangle, Clock, CheckCircle, X, Eye, Edit, MapPin, DollarSign, FileText } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function TriagePage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Mock data
  const incomingCases = [
    {
      id: "CLM-2024-048",
      insurer: "Helvetia Versicherung",
      contact: "Max Mustermann",
      email: "max.mustermann@helvetia.ch",
      type: "Fahrzeugschaden",
      priority: "Hoch",
      amount: "CHF 15,000",
      location: "Bahnhofstrasse 123, 8001 Zürich",
      canton: "ZH",
      received: "2024-01-20 14:30",
      incident: "2024-01-19 16:45",
      status: "Neu",
      description:
        "Kollision mit Leitplanke auf der A1. Fahrzeug stark beschädigt, Totalschaden möglich. Fahrer unverletzt.",
      policyNumber: "POL-2024-789012",
      completeness: 85,
      validationNotes: "Polizeibericht fehlt noch",
      documents: ["Schadenfotos", "Fahrzeugschein"],
    },
    {
      id: "CLM-2024-049",
      insurer: "AXA Schweiz",
      contact: "Anna Weber",
      email: "anna.weber@axa.ch",
      type: "Gebäudeschaden",
      priority: "Mittel",
      amount: "CHF 45,000",
      location: "Hauptstrasse 45, 4001 Basel",
      canton: "BS",
      received: "2024-01-20 13:15",
      incident: "2024-01-18 22:30",
      status: "Validierung",
      description: "Wasserschaden durch Rohrbruch im 2. Stock. Mehrere Wohnungen betroffen.",
      policyNumber: "POL-2024-345678",
      completeness: 95,
      validationNotes: "Alle Unterlagen vollständig",
      documents: ["Schadenfotos", "Kostenvoranschlag", "Mietverträge"],
    },
    {
      id: "CLM-2024-050",
      insurer: "Zurich Insurance",
      contact: "Peter Müller",
      email: "peter.mueller@zurich.ch",
      type: "Brandschaden",
      priority: "Dringend",
      amount: "CHF 120,000",
      location: "Industrieweg 12, 3001 Bern",
      canton: "BE",
      received: "2024-01-20 09:45",
      incident: "2024-01-20 03:15",
      status: "Bereit",
      description: "Brand in Produktionshalle. Ursache noch ungeklärt. Feuerwehr vor Ort gewesen.",
      policyNumber: "POL-2024-901234",
      completeness: 70,
      validationNotes: "Feuerwehrbericht ausstehend",
      documents: ["Erste Schadenfotos", "Polizeibericht"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Neu":
        return "bg-blue-100 text-blue-800"
      case "Validierung":
        return "bg-yellow-100 text-yellow-800"
      case "Bereit":
        return "bg-green-100 text-green-800"
      case "Abgelehnt":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getCompletenessColor = (completeness: number) => {
    if (completeness >= 90) return "text-green-600"
    if (completeness >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const handleApprove = (caseId: string) => {
    console.log("Approving case:", caseId)
    // In real app, update case status via API
  }

  const handleReject = (caseId: string) => {
    console.log("Rejecting case:", caseId)
    // In real app, update case status via API
  }

  const selectedCaseData = selectedCase ? incomingCases.find((c) => c.id === selectedCase) : null

  const filteredCases = incomingCases.filter((case_) => {
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter
    return matchesStatus && matchesPriority
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center text-purple-600 hover:text-purple-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zum Dashboard
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-slate-800">claimity</span>
            </div>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Triage
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Triage - Eingehende Fälle</h1>
          <p className="text-slate-600">Überprüfung, Priorisierung und Validierung neuer Schadensfälle</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cases List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Eingehende Fälle ({filteredCases.length})</CardTitle>
                </div>
                <div className="flex space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Status</SelectItem>
                      <SelectItem value="Neu">Neu</SelectItem>
                      <SelectItem value="Validierung">Validierung</SelectItem>
                      <SelectItem value="Bereit">Bereit</SelectItem>
                      <SelectItem value="Abgelehnt">Abgelehnt</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Priorität" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle</SelectItem>
                      <SelectItem value="Dringend">Dringend</SelectItem>
                      <SelectItem value="Hoch">Hoch</SelectItem>
                      <SelectItem value="Mittel">Mittel</SelectItem>
                      <SelectItem value="Niedrig">Niedrig</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredCases.map((case_) => (
                    <div
                      key={case_.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedCase === case_.id ? "bg-orange-50 border-orange-200" : "hover:bg-slate-50"
                      }`}
                      onClick={() => setSelectedCase(case_.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-sm text-slate-800">{case_.id}</h3>
                            <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                          </div>
                          <p className="text-xs text-slate-600">{case_.insurer}</p>
                        </div>
                        <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                      </div>
                      <div className="space-y-1 text-xs text-slate-500">
                        <div className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {case_.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {case_.amount}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(case_.received).toLocaleString("de-CH")}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <div className="w-16 bg-slate-200 rounded-full h-1">
                            <div
                              className={`h-1 rounded-full ${
                                case_.completeness >= 90
                                  ? "bg-green-500"
                                  : case_.completeness >= 70
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${case_.completeness}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${getCompletenessColor(case_.completeness)}`}>
                            {case_.completeness}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Case Details */}
          <div className="lg:col-span-2">
            {selectedCaseData ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{selectedCaseData.id}</span>
                        <Badge className={getStatusColor(selectedCaseData.status)}>{selectedCaseData.status}</Badge>
                        <Badge className={getPriorityColor(selectedCaseData.priority)}>
                          {selectedCaseData.priority}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {selectedCaseData.type} • {selectedCaseData.insurer}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleApprove(selectedCaseData.id)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Genehmigen
                      </Button>
                      <Button onClick={() => handleReject(selectedCaseData.id)} variant="destructive">
                        <X className="h-4 w-4 mr-2" />
                        Ablehnen
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="validation">Validierung</TabsTrigger>
                      <TabsTrigger value="documents">Dokumente</TabsTrigger>
                      <TabsTrigger value="notes">Notizen</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-slate-700">Versicherer</label>
                            <p className="text-slate-900">{selectedCaseData.insurer}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-700">Kontaktperson</label>
                            <p className="text-slate-900">{selectedCaseData.contact}</p>
                            <p className="text-sm text-slate-600">{selectedCaseData.email}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-700">Policennummer</label>
                            <p className="text-slate-900">{selectedCaseData.policyNumber}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-slate-700">Schadenssumme</label>
                            <p className="text-slate-900 text-lg font-semibold">{selectedCaseData.amount}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-700">Schadensdatum</label>
                            <p className="text-slate-900">
                              {new Date(selectedCaseData.incident).toLocaleString("de-CH")}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-700">Eingegangen</label>
                            <p className="text-slate-900">
                              {new Date(selectedCaseData.received).toLocaleString("de-CH")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Schadensort</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="h-4 w-4 text-slate-500" />
                          <p className="text-slate-900">{selectedCaseData.location}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Schadensbeschreibung</label>
                        <p className="text-slate-900 mt-1">{selectedCaseData.description}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="validation" className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-slate-800">Vollständigkeit</h3>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-slate-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  selectedCaseData.completeness >= 90
                                    ? "bg-green-500"
                                    : selectedCaseData.completeness >= 70
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${selectedCaseData.completeness}%` }}
                              />
                            </div>
                            <span className={`font-semibold ${getCompletenessColor(selectedCaseData.completeness)}`}>
                              {selectedCaseData.completeness}%
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">{selectedCaseData.validationNotes}</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-slate-700">Priorität anpassen</label>
                          <Select defaultValue={selectedCaseData.priority}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Dringend">Dringend</SelectItem>
                              <SelectItem value="Hoch">Hoch</SelectItem>
                              <SelectItem value="Mittel">Mittel</SelectItem>
                              <SelectItem value="Niedrig">Niedrig</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700">Validierungsnotizen</label>
                          <Textarea
                            placeholder="Notizen zur Validierung..."
                            defaultValue={selectedCaseData.validationNotes}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="documents" className="space-y-4">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-slate-800">Vorhandene Dokumente</h3>
                        {selectedCaseData.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-slate-600" />
                              <span className="text-slate-800">{doc}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-medium text-yellow-800 mb-2">Fehlende Dokumente</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Polizeibericht</li>
                          <li>• Detaillierte Kostenvoranschläge</li>
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="notes" className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Interne Notizen</label>
                        <Textarea placeholder="Interne Notizen für das Admin-Team..." rows={6} className="mt-1" />
                      </div>
                      <Button className="">
                        <Edit className="h-4 w-4 mr-2" />
                        Notizen speichern
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Keinen Fall ausgewählt</h3>
                    <p className="text-slate-600">Wählen Sie einen Fall aus der Liste aus, um Details anzuzeigen.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
