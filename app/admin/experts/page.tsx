"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function AdminExpertsPage() {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [cantonFilter, setCantonFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data
  const experts = [
    {
      id: "EXP-001",
      name: "Dr. Hans Müller",
      email: "hans.mueller@expert.ch",
      phone: "+41 44 123 45 67",
      address: "Musterstrasse 123, 8001 Zürich",
      location: "Zürich, ZH",
      canton: "ZH",
      coordinates: { lat: 47.3769, lng: 8.5417 },
      specialties: ["Fahrzeugschäden", "Maschinenschäden", "KFZ-Gutachten"],
      rating: 4.8,
      completedCases: 156,
      activeCases: 3,
      avgResponseTime: "2.3 Stunden",
      availability: "Verfügbar",
      languages: ["DE", "EN", "FR"],
      certifications: ["SIA", "SVKG", "TÜV"],
      experience: "15 Jahre",
      joinDate: "2019-03-15",
      lastActive: "Vor 1 Stunde",
      workload: 60,
      // Contract & Rates (Claimity-only visibility)
      contractType: "Freelancer",
      hourlyRate: "CHF 120/h",
      flatRates: {
        "Fahrzeugschaden Standard": "CHF 450",
        "Fahrzeugschaden Komplex": "CHF 800",
        Maschinenschaden: "CHF 650",
      },
      contractStart: "2019-03-15",
      contractEnd: "2025-03-14",
      paymentTerms: "30 Tage",
      status: "Aktiv",
      performanceScore: 92,
      qualityScore: 88,
      timelinessScore: 95,
      notes: "Sehr zuverlässiger Experte mit ausgezeichneter Dokumentation.",
    },
    {
      id: "EXP-002",
      name: "Maria Weber",
      email: "maria.weber@expert.ch",
      phone: "+41 61 234 56 78",
      address: "Hauptstrasse 45, 4001 Basel",
      location: "Basel, BS",
      canton: "BS",
      coordinates: { lat: 47.5596, lng: 7.5886 },
      specialties: ["Gebäudeschäden", "Wasserschäden", "Brandschäden"],
      rating: 4.9,
      completedCases: 203,
      activeCases: 5,
      avgResponseTime: "1.8 Stunden",
      availability: "Beschäftigt",
      languages: ["DE", "FR"],
      certifications: ["SIA", "SVIT", "VKF"],
      experience: "12 Jahre",
      joinDate: "2020-01-10",
      lastActive: "Vor 30 Min",
      workload: 85,
      contractType: "Festanstellung",
      hourlyRate: "CHF 140/h",
      flatRates: {
        "Gebäudeschaden Standard": "CHF 600",
        Wasserschaden: "CHF 750",
        Brandschaden: "CHF 1200",
      },
      contractStart: "2020-01-10",
      contractEnd: "Unbefristet",
      paymentTerms: "Monatlich",
      status: "Aktiv",
      performanceScore: 96,
      qualityScore: 94,
      timelinessScore: 98,
      notes: "Top-Expertin für Gebäudeschäden. Sehr detaillierte Berichte.",
    },
    {
      id: "EXP-003",
      name: "Thomas Schneider",
      email: "thomas.schneider@expert.ch",
      phone: "+41 31 345 67 89",
      address: "Industrieweg 78, 3001 Bern",
      location: "Bern, BE",
      canton: "BE",
      coordinates: { lat: 46.9481, lng: 7.4474 },
      specialties: ["Brandschäden", "Haftpflichtschäden", "Industrieschäden"],
      rating: 4.7,
      completedCases: 89,
      activeCases: 2,
      avgResponseTime: "3.1 Stunden",
      availability: "Verfügbar",
      languages: ["DE", "EN"],
      certifications: ["VKF", "SVKG"],
      experience: "8 Jahre",
      joinDate: "2021-06-01",
      lastActive: "Vor 2 Stunden",
      workload: 40,
      contractType: "Freelancer",
      hourlyRate: "CHF 150/h",
      flatRates: {
        "Brandschaden Standard": "CHF 900",
        Industrieschaden: "CHF 1500",
        Haftpflichtschaden: "CHF 700",
      },
      contractStart: "2021-06-01",
      contractEnd: "2024-05-31",
      paymentTerms: "15 Tage",
      status: "Warnung",
      performanceScore: 78,
      qualityScore: 82,
      timelinessScore: 74,
      notes: "Gute fachliche Kompetenz, aber Verbesserung bei Termintreue erforderlich.",
    },
  ]

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Verfügbar":
        return "bg-green-100 text-green-800"
      case "Beschäftigt":
        return "bg-yellow-100 text-yellow-800"
      case "Nicht verfügbar":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktiv":
        return "bg-green-100 text-green-800"
      case "Warnung":
        return "bg-yellow-100 text-yellow-800"
      case "Gesperrt":
        return "bg-red-100 text-red-800"
      case "Inaktiv":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const selectedExpertData = selectedExpert ? experts.find((e) => e.id === selectedExpert) : null

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      expert.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCanton = cantonFilter === "all" || expert.canton === cantonFilter
    const matchesStatus = statusFilter === "all" || expert.status === statusFilter

    return matchesSearch && matchesCanton && matchesStatus
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
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Experten-Management
            </Badge>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel - Experts List */}
        <div className="w-1/2 bg-white border-r overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-slate-800">Experten-Verzeichnis</h1>
              <div className="text-sm text-slate-600">
                {filteredExperts.length} von {experts.length} Experten
              </div>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4 mb-6">
              <div>
                <input
                  type="text"
                  placeholder="Suche nach Name, Spezialisierung oder Ort..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-4">
                <select
                  value={cantonFilter}
                  onChange={(e) => setCantonFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">Alle Kantone</option>
                  <option value="ZH">Zürich</option>
                  <option value="BE">Bern</option>
                  <option value="BS">Basel-Stadt</option>
                  <option value="GE">Genf</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">Alle Status</option>
                  <option value="Aktiv">Aktiv</option>
                  <option value="Warnung">Warnung</option>
                  <option value="Gesperrt">Gesperrt</option>
                  <option value="Inaktiv">Inaktiv</option>
                </select>
              </div>
            </div>

            {/* Experts List */}
            <div className="space-y-4">
              {filteredExperts.map((expert) => (
                <div
                  key={expert.id}
                  onClick={() => setSelectedExpert(expert.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedExpert === expert.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-800">{expert.name}</h3>
                      <p className="text-sm text-slate-600">{expert.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getAvailabilityColor(expert.availability)}>{expert.availability}</Badge>
                      <Badge className={getStatusColor(expert.status)}>{expert.status}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                    <span>★ {expert.rating}</span>
                    <span>{expert.completedCases} Fälle</span>
                    <span>{expert.workload}% Auslastung</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {expert.specialties.slice(0, 2).map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {expert.specialties.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{expert.specialties.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Expert Details */}
        <div className="w-1/2 bg-slate-50 overflow-y-auto">
          {selectedExpertData ? (
            <div className="p-6">
              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{selectedExpertData.name}</h2>
                    <p className="text-slate-600">{selectedExpertData.email}</p>
                    <p className="text-slate-600">{selectedExpertData.phone}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(selectedExpertData.status)} className="mb-2">
                      {selectedExpertData.status}
                    </Badge>
                    <p className="text-sm text-slate-600">ID: {selectedExpertData.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Kontaktdaten</h3>
                    <p className="text-sm text-slate-600 mb-1">{selectedExpertData.address}</p>
                    <p className="text-sm text-slate-600">Sprachen: {selectedExpertData.languages.join(", ")}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Verfügbarkeit</h3>
                    <Badge className={getAvailabilityColor(selectedExpertData.availability)} className="mb-2">
                      {selectedExpertData.availability}
                    </Badge>
                    <p className="text-sm text-slate-600">Auslastung: {selectedExpertData.workload}%</p>
                    <p className="text-sm text-slate-600">Aktive Fälle: {selectedExpertData.activeCases}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-800">{selectedExpertData.rating}</div>
                    <div className="text-sm text-slate-600">Bewertung</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-800">{selectedExpertData.completedCases}</div>
                    <div className="text-sm text-slate-600">Abgeschlossen</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-800">{selectedExpertData.avgResponseTime}</div>
                    <div className="text-sm text-slate-600">Ø Antwortzeit</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-slate-800 mb-2">Spezialisierungen</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExpertData.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-slate-800 mb-2">Zertifizierungen</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExpertData.certifications.map((cert) => (
                      <Badge key={cert} className="bg-blue-100 text-blue-800">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-slate-800 mb-2">Performance Scores</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-600">Gesamt</span>
                        <span className={`font-semibold ${getScoreColor(selectedExpertData.performanceScore)}`}>
                          {selectedExpertData.performanceScore}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-teal-500 h-2 rounded-full"
                          style={{ width: `${selectedExpertData.performanceScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-600">Qualität</span>
                        <span className={`font-semibold ${getScoreColor(selectedExpertData.qualityScore)}`}>
                          {selectedExpertData.qualityScore}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${selectedExpertData.qualityScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-600">Termintreue</span>
                        <span className={`font-semibold ${getScoreColor(selectedExpertData.timelinessScore)}`}>
                          {selectedExpertData.timelinessScore}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${selectedExpertData.timelinessScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contract & Rates Section - Claimity Internal Only */}
                <div className="border-t pt-6">
                  <div className="flex items-center mb-4">
                    <h3 className="font-semibold text-slate-800">Vertrag & Konditionen</h3>
                    <Badge className="ml-2 bg-red-100 text-red-800 text-xs">Claimity Intern</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">Vertragsdetails</h4>
                      <div className="space-y-1 text-sm text-slate-600">
                        <p>Typ: {selectedExpertData.contractType}</p>
                        <p>Start: {selectedExpertData.contractStart}</p>
                        <p>Ende: {selectedExpertData.contractEnd}</p>
                        <p>Zahlungsziel: {selectedExpertData.paymentTerms}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">Stundensatz</h4>
                      <p className="text-lg font-semibold text-slate-800">{selectedExpertData.hourlyRate}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-slate-700 mb-2">Pauschaltarife</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedExpertData.flatRates).map(([service, rate]) => (
                        <div key={service} className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded">
                          <span className="text-sm text-slate-700">{service}</span>
                          <span className="font-semibold text-slate-800">{rate}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Interne Notizen</h4>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded">{selectedExpertData.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500">
              <p>Wählen Sie einen Experten aus der Liste aus, um Details anzuzeigen.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
