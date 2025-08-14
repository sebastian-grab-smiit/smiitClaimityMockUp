"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Search, Eye, BarChart3, Building2, DollarSign, FileText, MessageSquare, Settings, Users, Activity, User, TrendingUp, Phone, Mail, MapPin, Trash2 } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminExpertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cantonFilter, setCantonFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data
  const experts = [
    {
      id: "EXP-2024-001",
      name: "Dr. Hans Müller",
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
      certifications: ["SIA", "SVKG", "TÜV"],
      experience: "15 Jahre",
      joinDate: "2019-03-15",
      lastActive: "Vor 1 Stunde",
      workload: 60,
      contractType: "Freelancer",
      hourlyRate: "CHF 120/h",
      status: "Aktiv",
      performanceScore: 92,
      qualityScore: 88,
      timelinessScore: 95,
    },
    {
      id: "EXP-2024-002",
      name: "Maria Weber",
      email: "maria.weber@expert.ch",
      phone: "+41 61 234 56 78",
      location: "Basel, BS",
      canton: "BS",
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
      status: "Aktiv",
      performanceScore: 96,
      qualityScore: 94,
      timelinessScore: 98,
    },
    {
      id: "EXP-2024-003",
      name: "Thomas Schneider",
      email: "thomas.schneider@expert.ch",
      phone: "+41 31 345 67 89",
      location: "Bern, BE",
      canton: "BE",
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
      status: "Inaktiv",
      performanceScore: 78,
      qualityScore: 82,
      timelinessScore: 74,
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
        return "bg-green-100 text-green-800 mr-2"
      case "Warnung":
        return "bg-yellow-100 text-yellow-800 mr-2"
      case "Gesperrt":
        return "bg-red-100 text-red-800 mr-2"
      case "Inaktiv":
        return "bg-gray-100 text-gray-800 mr-2"
      default:
        return "bg-gray-100 text-gray-800 mr-2"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

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
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Experten</h1>
                <p className="text-gray-600">Verwalten Sie Partnerschaften und Einstellungen von Experten.</p>
              </div>
              <Link href="/admin/experts/new">
                <Button className="bg-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Neuer Experte
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Experten Gesamt</p>
                      <p className="text-2xl font-bold text-gray-900">{experts.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Aktive Experten</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {experts.filter((i) => i.status === "Aktiv").length}
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Verfügbare Experten</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {experts.filter((e) => e.availability === "Verfügbar" && e.status === "Aktiv").length}
                      </p>
                    </div>
                    <User className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ø Performance</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(experts.reduce((acc, e) => acc + e.performanceScore, 0) / experts.length)}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg border mb-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Suche nach Name, Spezialisierung oder Ort..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <select
                  value={cantonFilter}
                  onChange={(e) => setCantonFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
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
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Alle Status</option>
                  <option value="Aktiv">Aktiv</option>
                  <option value="Gesperrt">Gesperrt</option>
                  <option value="Inaktiv">Inaktiv</option>
                </select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Alle Experten</CardTitle>
                <CardDescription>Übersicht über alle Experten</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Experte</TableHead>
                      <TableHead>Standort</TableHead>
                      <TableHead>Spezialisierung</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Fälle</TableHead>
                      <TableHead>Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExperts.map((expert) => (
                      <TableRow key={expert.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {expert.name}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {expert.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {expert.phone}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {expert.location}
                          </div>
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge className={getStatusColor(expert.status)}>{expert.status}</Badge>
                            <Badge className={getAvailabilityColor(expert.availability)}>
                              {expert.availability}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="space-y-1">
                            <div className={`font-medium ${getScoreColor(expert.performanceScore)}`}>
                              {expert.performanceScore}%
                            </div>
                            <div className="text-xs text-slate-500">★ {expert.rating}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-slate-700">{expert.completedCases}</div>
                            <div className="text-xs text-slate-500">{expert.activeCases} aktiv</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/experts/${expert.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

