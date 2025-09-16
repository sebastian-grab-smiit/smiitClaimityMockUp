"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Check, Users, MapPin, Star, Clock, Search, UserPlus, Phone, Mail, BarChart3, Building2, DollarSign, FileText, LucideMap, MessageSquare, Settings, File, Download } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function AssignmentPage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null)
  const [cantonFilter, setCantonFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const readyCases = [
    {
      id: "CLM-2024-051",
      insurer: "Helvetia Versicherung",
      type: "Fahrzeugschaden",
      priority: "Hoch",
      amount: "CHF 15,000",
      location: "Zürich, ZH",
      canton: "ZH",
      created: "2024-01-20 14:30",
      requiredSkills: ["Fahrzeugschäden", "KFZ-Gutachten"],
      urgency: "48h",
    },
    {
      id: "CLM-2024-052",
      insurer: "AXA Schweiz",
      type: "Gebäudeschaden",
      priority: "Mittel",
      amount: "CHF 45,000",
      location: "Basel, BS",
      canton: "BS",
      created: "2024-01-20 13:15",
      requiredSkills: ["Gebäudeschäden", "Wasserschäden"],
      urgency: "72h",
    },
    {
      id: "CLM-2024-053",
      insurer: "Zurich Insurance",
      type: "Brandschaden",
      priority: "Dringend",
      amount: "CHF 120,000",
      location: "Bern, BE",
      canton: "BE",
      created: "2024-01-20 09:45",
      requiredSkills: ["Brandschäden", "Gebäudeschäden"],
      urgency: "24h",
    },
  ]

  const experts = [
    {
      id: "EXP-001",
      name: "Kurt Seiler",
      email: "hans.mueller@expert.ch",
      phone: "+41 44 123 45 67",
      location: "Zürich, ZH",
      canton: "ZH",
      specialties: ["Fahrzeugschäden", "Maschinenschäden", "KFZ-Gutachten"],
      rating: 4.8,
      completedCases: 156,
      activeCases: 3,
      avgResponseTime: "2.3 Stunden",
      availability: "Verfügbar",
      languages: ["DE", "EN", "FR"],
      certifications: ["SIA", "SVKG"],
      experience: "15 Jahre",
      lastActive: "Vor 1 Stunde",
      workload: 60, // percentage
      distance: "5 km", // from case location
    },
    {
      id: "EXP-002",
      name: "Maria Weber",
      email: "maria.weber@expert.ch",
      phone: "+41 61 234 56 78",
      location: "Basel, BS",
      canton: "BS",
      specialties: ["Gebäudeschäden", "Wasserschäden"],
      rating: 4.9,
      completedCases: 203,
      activeCases: 5,
      avgResponseTime: "1.8 Stunden",
      availability: "Beschäftigt",
      languages: ["DE", "FR"],
      certifications: ["SIA", "SVIT"],
      experience: "12 Jahre",
      lastActive: "Vor 30 Min",
      workload: 85,
      distance: "2 km",
    },
    {
      id: "EXP-003",
      name: "Thomas Schneider",
      email: "thomas.schneider@expert.ch",
      phone: "+41 31 345 67 89",
      location: "Bern, BE",
      canton: "BE",
      specialties: ["Brandschäden", "Haftpflichtschäden", "Gebäudeschäden"],
      rating: 4.7,
      completedCases: 89,
      activeCases: 2,
      avgResponseTime: "3.1 Stunden",
      availability: "Verfügbar",
      languages: ["DE", "EN"],
      certifications: ["VKF", "SVKG"],
      experience: "8 Jahre",
      lastActive: "Vor 2 Stunden",
      workload: 40,
      distance: "1 km",
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

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return "text-red-600"
    if (workload >= 60) return "text-yellow-600"
    return "text-green-600"
  }

  const selectedCaseData = selectedCase ? readyCases.find((c) => c.id === selectedCase) : null
  const selectedExpertData = selectedExpert ? experts.find((e) => e.id === selectedExpert) : null

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCanton = cantonFilter === "all" || expert.canton === cantonFilter
    const matchesSpecialty = specialtyFilter === "all" || expert.specialties.includes(specialtyFilter)
    const matchesAvailability = availabilityFilter === "all" || expert.availability === availabilityFilter

    // If a case is selected, also filter by matching skills
    if (selectedCaseData) {
      const hasRequiredSkills = selectedCaseData.requiredSkills.some((skill) => expert.specialties.includes(skill))
      return matchesSearch && matchesCanton && matchesSpecialty && matchesAvailability && hasRequiredSkills
    }

    return matchesSearch && matchesCanton && matchesSpecialty && matchesAvailability
  })

  const handleAssign = () => {
    if (selectedCase && selectedExpert) {
      console.log("Assigning case", selectedCase, "to expert", selectedExpert)
      // In real app, make API call to assign case
      setSelectedCase(null)
      setSelectedExpert(null)
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
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Alle Fälle</span>
            </Link>
            <Link
              href="/admin/assignment"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Expertenzuweisung</h1>
                <p className="text-gray-600">Weisen Sie bereite Fälle an verfügbare Experten zu</p>
              </div>
              {selectedCase && selectedExpert && (
                <Button onClick={handleAssign} variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Check className="h-4 w-4" />
                  Zuweisen
                </Button>
              )}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Ready Cases */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bereite Fälle ({readyCases.length})</CardTitle>
                    <CardDescription>Fälle bereit für Expertenzuweisung</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {readyCases.map((case_) => (
                        <div
                          key={case_.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedCase === case_.id ? "bg-slate-50 border-primary" : "hover:bg-slate-50"
                          }`}
                          onClick={() => setSelectedCase(case_.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-sm text-slate-800">{case_.id}</h3>
                              <p className="text-xs text-slate-600">{case_.insurer}</p>
                            </div>
                            <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                          </div>
                          <div className="space-y-1 text-xs text-slate-500">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {case_.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Frist: {case_.urgency}
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex flex-wrap gap-1">
                              {case_.requiredSkills.slice(0, 2).map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {case_.requiredSkills.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{case_.requiredSkills.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Expert Search and List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Verfügbare Experten</CardTitle>
                        <CardDescription>
                          {selectedCaseData ? `Passende Experten für ${selectedCaseData.id}` : "Alle verfügbaren Experten"}
                        </CardDescription>
                      </div>
                    </div>
                    {/* Filters */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Suchen..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={cantonFilter} onValueChange={setCantonFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Kanton" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Alle Kantone</SelectItem>
                          <SelectItem value="ZH">Zürich</SelectItem>
                          <SelectItem value="BE">Bern</SelectItem>
                          <SelectItem value="BS">Basel-Stadt</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Spezialisierung" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Alle</SelectItem>
                          <SelectItem value="Fahrzeugschäden">Fahrzeugschäden</SelectItem>
                          <SelectItem value="Gebäudeschäden">Gebäudeschäden</SelectItem>
                          <SelectItem value="Brandschäden">Brandschäden</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Verfügbarkeit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Alle</SelectItem>
                          <SelectItem value="Verfügbar">Verfügbar</SelectItem>
                          <SelectItem value="Beschäftigt">Beschäftigt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredExperts.map((expert) => (
                        <div
                          key={expert.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedExpert === expert.id ? "bg-slate-50 border-primary" : "hover:bg-slate-50"
                          }`}
                          onClick={() => setSelectedExpert(expert.id)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-teal-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-800">{expert.name}</h3>
                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                  <MapPin className="h-3 w-3" />
                                  <span>{expert.location}</span>
                                  {selectedCaseData && <span>• {expert.distance} entfernt</span>}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getAvailabilityColor(expert.availability)}>{expert.availability}</Badge>
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{expert.rating}</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-3">
                            <div>
                              <span className="text-slate-500">Aktive Fälle:</span>
                              <span className="ml-1 font-medium">{expert.activeCases}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Auslastung:</span>
                              <span className={`ml-1 font-medium ${getWorkloadColor(expert.workload)}`}>
                                {expert.workload}%
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500">Antwortzeit:</span>
                              <span className="ml-1 font-medium">{expert.avgResponseTime}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Letzte Aktivität:</span>
                              <span className="ml-1 font-medium">{expert.lastActive}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {expert.specialties.map((specialty, index) => (
                              <Badge
                                key={index}
                                variant={selectedCaseData?.requiredSkills.includes(specialty) ? "default" : "secondary"}
                                className={`text-xs ${
                                  selectedCaseData?.requiredSkills.includes(specialty) ? "bg-green-100 text-green-800" : ""
                                }`}
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {expert.email}
                              </span>
                              <span className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {expert.phone}
                              </span>
                            </div>
                            <span>{expert.experience} Erfahrung</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredExperts.length === 0 && (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Keine passenden Experten gefunden</h3>
                        <p className="text-gray-600">Passen Sie die Filter an oder erweitern Sie die Suchkriterien.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
