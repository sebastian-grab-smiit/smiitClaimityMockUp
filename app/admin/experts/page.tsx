"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Plus, Search, Eye, BarChart3, Building2, DollarSign, FileText, MessageSquare, Settings, Users,
  Activity, User, Phone, Mail, MapPin, Trash2, File, LucideMap, TrendingUp
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type CategoryKey = "sachverstaendiger" | "fahrzeugexperte" | "bvm"
const CATEGORY_LABEL: Record<CategoryKey, string> = {
  sachverstaendiger: "Sachverständiger",
  fahrzeugexperte: "Fahrzeugexperte",
  bvm: "BVM",
}

export default function AdminExpertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cantonFilter, setCantonFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState<"all" | CategoryKey>("all")

  // Each expert has exactly ONE category
  const experts = [
    {
      id: "EXP-2024-001",
      name: "Dr. Hans Müller",
      email: "hans.mueller@expert.ch",
      phone: "+41 44 123 45 67",
      address: "Bahnhofstrasse 10, 8001 Zürich, Schweiz",
      location: "Zürich, ZH",
      canton: "ZH",
      category: "fahrzeugexperte" as CategoryKey,
      specialties: ["Fahrzeugschäden", "Maschinenschäden", "KFZ-Gutachten"],
      rating: 4.8, completedCases: 156, activeCases: 3, availability: "Verfügbar",
      status: "Aktiv", performanceScore: 92,
    },
    {
      id: "EXP-2024-002",
      name: "Maria Weber",
      email: "maria.weber@expert.ch",
      phone: "+41 61 234 56 78",
      address: "Aeschenplatz 1, 4052 Basel, Schweiz",
      location: "Basel, BS",
      canton: "BS",
      category: "sachverstaendiger" as CategoryKey,
      specialties: ["Gebäudeschäden", "Wasserschäden", "Brandschäden"],
      rating: 4.9, completedCases: 203, activeCases: 5, availability: "Beschäftigt",
      status: "Aktiv", performanceScore: 96,
    },
    {
      id: "EXP-2024-003",
      name: "Thomas Schneider",
      email: "thomas.schneider@expert.ch",
      phone: "+41 31 345 67 89",
      address: "Bundesplatz 1, 3011 Bern, Schweiz",
      location: "Bern, BE",
      canton: "BE",
      category: "bvm" as CategoryKey,
      specialties: ["Brandschäden", "Haftpflichtschäden", "Industrieschäden"],
      rating: 4.7, completedCases: 89, activeCases: 2, availability: "Verfügbar",
      status: "Inaktiv", performanceScore: 78,
    },
  ]

  const getAvailabilityColor = (availability: string) =>
    availability === "Verfügbar" ? "bg-green-100 text-green-800"
      : availability === "Beschäftigt" ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-100 text-gray-800"

  const getStatusColor = (status: string) =>
    status === "Aktiv" ? "bg-green-100 text-green-800 mr-2"
      : status === "Gesperrt" ? "bg-red-100 text-red-800 mr-2"
      : status === "Inaktiv" ? "bg-gray-100 text-gray-800 mr-2"
      : "bg-yellow-100 text-yellow-800 mr-2"

  const getScoreColor = (score: number) => (score >= 90 ? "text-green-600" : score >= 75 ? "text-yellow-600" : "text-red-600")

  const getCategoryColor = (c: CategoryKey) =>
    c === "sachverstaendiger" ? "bg-indigo-100 text-indigo-800"
      : c === "fahrzeugexperte" ? "bg-blue-100 text-blue-800"
      : "bg-rose-100 text-rose-800"

  // Filters
  const filteredExperts = useMemo(() => {
    return experts.filter((expert) => {
      const matchesSearch =
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        expert.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCanton = cantonFilter === "all" || expert.canton === cantonFilter
      const matchesStatus = statusFilter === "all" || expert.status === statusFilter
      const matchesCategory = categoryFilter === "all" || expert.category === categoryFilter
      return matchesSearch && matchesCanton && matchesStatus && matchesCategory
    })
  }, [experts, searchTerm, cantonFilter, statusFilter, categoryFilter])

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="admin" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link href="/admin" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/experts" className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg">
              <Users className="h-4 w-4" />
              <span>Experten</span>
            </Link>
            <Link href="/admin/insurers" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Building2 className="h-4 w-4" />
              <span>Versicherer</span>
            </Link>
            <Link href="/admin/cases" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <FileText className="h-4 w-4" />
              <span>Alle Fälle</span>
            </Link>
            <Link href="/admin/assignment" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <LucideMap className="h-4 w-4" />
              <span>Zuordnung</span>
            </Link>
            <Link href="/admin/reports" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <File className="h-4 w-4" />
              <span>Berichte</span>
              <Badge className="bg-yellow-500 text-white text-xs">3</Badge>
            </Link>
            <Link href="/admin/invoicing" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <DollarSign className="h-4 w-4" />
              <span>Rechnungen</span>
            </Link>
            <Link href="/admin/notifications" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">{2}</Badge>}
            </Link>
            <Link href="/admin/settings" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Settings className="h-4 w-4" />
              <span>Einstellungen</span>
            </Link>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6"> 
            <div className="flex justify-between items-center"> 
              <div> 
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Experten</h1>
                <p className="text-gray-600">Verwalten Sie Partnerschaften und Einstellungen von Experten.</p>
              </div> 
            <Link href="/admin/experts/new">
              <Button className="bg-primary">
                <Plus className="h-4 w-4 mr-2" /> Neuer Experte
              </Button> 
            </Link>
          </div>

            {/* KPIs */}
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
                      <p className="text-2xl font-bold text-gray-900">{experts.filter(e=>e.status==="Aktiv").length}</p>
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
                        {experts.filter(e=>e.availability==="Verfügbar" && e.status==="Aktiv").length}
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
                        {Math.round(experts.reduce((a,e)=>a+e.performanceScore,0)/experts.length)}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Unified card: category slider + filters + table */}
            <Card>
              <CardHeader className="pb-0">
                <div className="border-b -mx-6 px-6">
                  <nav className="flex flex-wrap space-x-6">
                    {[
                      { id: "all", label: "Alle Kategorien" },
                      { id: "sachverstaendiger", label: "Sachverständiger" },
                      { id: "fahrzeugexperte", label: "Fahrzeugexperte" },
                      { id: "bvm", label: "BVM" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setCategoryFilter(tab.id as any)}
                        className={`py-3 px-1 border-b-2 font-medium text-sm ${
                          categoryFilter === (tab.id as any)
                            ? "border-primary text-primary"
                            : "border-transparent text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
                <CardTitle className="pt-4">Filter & Expertenliste</CardTitle>
                <CardDescription>Suche, Filter und detaillierte Übersicht</CardDescription>
              </CardHeader>

              <CardContent>
                {/* Search + selects */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
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

                {/* Table */}
                <div className="rounded-lg border">
                  <div className="p-4 border-b">
                    <div className="font-semibold">Experten</div>
                    <div className="text-sm text-slate-500">Übersicht über ausgewählte Experten</div>
                  </div>
                  <div className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Experte</TableHead>
                          <TableHead>Standort</TableHead>
                          <TableHead>Kategorie</TableHead>
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
                                <div className="font-medium">{expert.name}</div>
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
                              <Badge className={getCategoryColor(expert.category)}>
                                {CATEGORY_LABEL[expert.category]}
                              </Badge>
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
                                <Badge className={getAvailabilityColor(expert.availability)}>{expert.availability}</Badge>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className={`font-medium ${getScoreColor(expert.performanceScore)}`}>
                                {expert.performanceScore}%
                              </div>
                              <div className="text-xs text-slate-500">★ {expert.rating}</div>
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
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add expert */}
            <div className="flex justify-end">
              <Link href="/admin/experts/new">
                <Button className="bg-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Neuer Experte
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
