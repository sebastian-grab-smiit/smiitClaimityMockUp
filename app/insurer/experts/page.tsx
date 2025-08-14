"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/shared/page-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Users, Download, FileText, Plus, BarChart3, ArrowLeft, Search, MapPin, Star, Phone, Mail, User, Award, Clock, CheckCircle, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cantonFilter, setCantonFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")

  // Mock data
  const experts = [
    {
      id: "EXP-001",
      name: "Dr. Hans Müller",
      email: "hans.mueller@expert.ch",
      phone: "+41 44 123 45 67",
      location: "Zürich, ZH",
      specialties: ["Fahrzeugschäden", "Maschinenschäden"],
      rating: 4.8,
      completedCases: 156,
      avgResponseTime: "2.3 Stunden",
      availability: "Verfügbar",
      languages: ["DE", "EN", "FR"],
      certifications: ["SIA", "SVKG"],
      experience: "15 Jahre",
    },
    {
      id: "EXP-002",
      name: "Maria Weber",
      email: "maria.weber@expert.ch",
      phone: "+41 61 234 56 78",
      location: "Basel, BS",
      specialties: ["Gebäudeschäden", "Wasserschäden"],
      rating: 4.9,
      completedCases: 203,
      avgResponseTime: "1.8 Stunden",
      availability: "Beschäftigt",
      languages: ["DE", "FR"],
      certifications: ["SIA", "SVIT"],
      experience: "12 Jahre",
    },
    {
      id: "EXP-003",
      name: "Thomas Schneider",
      email: "thomas.schneider@expert.ch",
      phone: "+41 31 345 67 89",
      location: "Bern, BE",
      specialties: ["Brandschäden", "Haftpflichtschäden"],
      rating: 4.7,
      completedCases: 89,
      avgResponseTime: "3.1 Stunden",
      availability: "Verfügbar",
      languages: ["DE", "EN"],
      certifications: ["VKF", "SVKG"],
      experience: "8 Jahre",
    },
    {
      id: "EXP-004",
      name: "Dr. Anna Meier",
      email: "anna.meier@expert.ch",
      phone: "+41 71 456 78 90",
      location: "St. Gallen, SG",
      specialties: ["Fahrzeugschäden", "Haftpflichtschäden"],
      rating: 4.6,
      completedCases: 134,
      avgResponseTime: "2.7 Stunden",
      availability: "Verfügbar",
      languages: ["DE", "EN", "IT"],
      certifications: ["SVKG", "TÜV"],
      experience: "10 Jahre",
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

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case "Verfügbar":
        return <CheckCircle className="h-4 w-4" />
      case "Beschäftigt":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      expert.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCanton = cantonFilter === "all" || expert.location.includes(cantonFilter)
    const matchesSpecialty = specialtyFilter === "all" || expert.specialties.includes(specialtyFilter)
    const matchesAvailability = availabilityFilter === "all" || expert.availability === availabilityFilter

    return matchesSearch && matchesCanton && matchesSpecialty && matchesAvailability
  })

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="insurer" userName="Helvetia Versicherung" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
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
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
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
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <Users className="h-4 w-4" />
              <span>Experten</span>
            </Link>
            <Link
              href="/insurer/notifications"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">{2}</Badge>}
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
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Experten-Verzeichnis</h1>
            <p className="text-slate-600">Finden Sie den passenden Experten für Ihren Schadenfall</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Filter & Suche</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Name, Spezialisierung oder Ort..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
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
                    <SelectItem value="SG">St. Gallen</SelectItem>
                    <SelectItem value="AG">Aargau</SelectItem>
                    <SelectItem value="VD">Waadt</SelectItem>
                    <SelectItem value="GE">Genf</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Spezialisierung" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Spezialisierungen</SelectItem>
                    <SelectItem value="Fahrzeugschäden">Fahrzeugschäden</SelectItem>
                    <SelectItem value="Gebäudeschäden">Gebäudeschäden</SelectItem>
                    <SelectItem value="Wasserschäden">Wasserschäden</SelectItem>
                    <SelectItem value="Brandschäden">Brandschäden</SelectItem>
                    <SelectItem value="Haftpflichtschäden">Haftpflichtschäden</SelectItem>
                    <SelectItem value="Maschinenschäden">Maschinenschäden</SelectItem>
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
            </CardContent>
          </Card>

          {/* Experts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredExperts.map((expert) => (
              <Card key={expert.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{expert.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="h-3 w-3 text-slate-500" />
                          <span className="text-sm text-slate-600">{expert.location}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getAvailabilityColor(expert.availability)}>
                      {getAvailabilityIcon(expert.availability)}
                      <span className="ml-1">{expert.availability}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Rating and Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{expert.rating}</span>
                        <span className="text-sm text-slate-500">({expert.completedCases} Fälle)</span>
                      </div>
                      <div className="text-sm text-slate-600">Ø {expert.avgResponseTime} Antwortzeit</div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <p className="text-sm text-slate-500 mb-2">Spezialisierungen:</p>
                      <div className="flex flex-wrap gap-1">
                        {expert.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Languages and Certifications */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500 mb-1">Sprachen:</p>
                        <div className="flex flex-wrap gap-1">
                          {expert.languages.map((lang, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Zertifizierungen:</p>
                        <div className="flex flex-wrap gap-1">
                          {expert.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-slate-600">
                            <Mail className="h-3 w-3" />
                            <span>{expert.email}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-slate-600">
                            <Phone className="h-3 w-3" />
                            <span>{expert.phone}</span>
                          </div>
                        </div>
                        <span className="text-slate-500">{expert.experience} Erfahrung</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Profil anzeigen
                      </Button>
                      <Button size="sm" className="flex-1 ">
                        Kontaktieren
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredExperts.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Keine Experten gefunden</h3>
                <p className="text-slate-600">Es wurden keine Experten gefunden, die Ihren Suchkriterien entsprechen.</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
