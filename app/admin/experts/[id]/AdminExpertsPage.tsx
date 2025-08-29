"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/shared/page-header"
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Star,
  FileText,
  TrendingUp,
  CheckCircle,
  Users,
  Home,
  BarChart3,
  Building2,
  DollarSign,
  MessageSquare,
  Settings,
  User,
  Building,
  LucideMap,
  File,
} from "lucide-react"
import Link from "next/link"

export default function ExpertDetailPage({ id }: { id: string }) {
  // Mock expert data - in real app, fetch based on params.id
  const expert = {
    id,
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
  }

  const recentCases = [
    {
      id: "CLM-2024-001",
      insurer: "Zurich Insurance",
      type: "Fahrzeugschaden",
      status: "Abgeschlossen",
      amount: "CHF 15,000",
      completed: "2024-01-20",
      rating: 5,
    },
    {
      id: "CLM-2024-002",
      insurer: "AXA Switzerland",
      type: "Maschinenschaden",
      status: "In Bearbeitung",
      amount: "CHF 8,500",
      started: "2024-01-15",
      rating: null,
    },
    {
      id: "CLM-2024-003",
      insurer: "Swiss Re",
      type: "KFZ-Gutachten",
      status: "Abgeschlossen",
      amount: "CHF 3,200",
      completed: "2024-01-10",
      rating: 4,
    },
  ]

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

  const getCaseStatusColor = (status: string) => {
    switch (status) {
      case "Abgeschlossen":
        return "bg-green-100 text-green-800"
      case "In Bearbeitung":
        return "bg-yellow-100 text-yellow-800"
      case "Überfällig":
        return "bg-red-100 text-red-800"
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
        <main className="flex-1 overflow-y-auto p-6">
          <Link href="/admin/experts" className="flex items-center text-primary mb-3">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Übersicht
          </Link>
          <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{expert.name}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <Badge
                    className={
                      expert.status === "Aktiv" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }
                  >
                    {expert.status}
                  </Badge>
                  <span className="text-slate-600">Seit {expert.joinDate}</span>
                </div>
              </div>
            </div>
            <Button className="bg-primary">
              <Edit className="h-4 w-4 mr-2" />
              Bearbeiten
            </Button>
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Bewertung</p>
                      <p className="text-2xl font-bold text-gray-900">{expert.rating}</p>
                    </div>
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Abgeschlossene Fälle</p>
                      <p className="text-2xl font-bold text-gray-900">{expert.completedCases}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Aktive Fälle</p>
                      <p className="text-2xl font-bold text-gray-900">{expert.activeCases}</p>
                    </div>
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Auslastung</p>
                      <p className="text-2xl font-bold text-gray-900">{expert.workload}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Übersicht</TabsTrigger>
                <TabsTrigger value="cases">Fälle</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="contract">Vertrag</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Kontaktinformationen</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{expert.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{expert.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{expert.address}</span>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm text-gray-600 mb-2">Sprachen:</p>
                        <div className="flex gap-2">
                          {expert.languages.map((lang) => (
                            <Badge key={lang} variant="outline">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Verfügbarkeit & Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge className={getStatusColor(expert.status)}>{expert.status}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Verfügbarkeit:</span>
                        <Badge className={getAvailabilityColor(expert.availability)}>{expert.availability}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Letzte Aktivität:</span>
                        <span className="text-sm">{expert.lastActive}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Ø Antwortzeit:</span>
                        <span className="text-sm font-medium">{expert.avgResponseTime}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Spezialisierungen</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {expert.specialties.map((specialty) => (
                          <Badge key={specialty} className="bg-teal-100 text-teal-800">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Zertifizierungen</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {expert.certifications.map((cert) => (
                          <Badge key={cert} className="bg-blue-100 text-blue-800">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-3">Berufserfahrung: {expert.experience}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="cases" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Aktuelle und kürzliche Fälle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fall-ID</TableHead>
                          <TableHead>Versicherer</TableHead>
                          <TableHead>Typ</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Betrag</TableHead>
                          <TableHead>Datum</TableHead>
                          <TableHead>Bewertung</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentCases.map((case_) => (
                          <TableRow key={case_.id}>
                            <TableCell className="font-medium">{case_.id}</TableCell>
                            <TableCell>{case_.insurer}</TableCell>
                            <TableCell>{case_.type}</TableCell>
                            <TableCell>
                              <Badge className={getCaseStatusColor(case_.status)}>{case_.status}</Badge>
                            </TableCell>
                            <TableCell className="font-medium">{case_.amount}</TableCell>
                            <TableCell>{case_.completed || case_.started}</TableCell>
                            <TableCell>
                              {case_.rating ? (
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                  {case_.rating}
                                </div>
                              ) : (
                                <span className="text-gray-400">Ausstehend</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-teal-600 mb-2">{expert.performanceScore}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-teal-500 h-2 rounded-full"
                            style={{ width: `${expert.performanceScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Qualitätsscore</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{expert.qualityScore}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${expert.qualityScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Termintreue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">{expert.timelinessScore}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${expert.timelinessScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="contract" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        Vertragsdetails
                        <Badge className="ml-2 bg-red-100 text-red-800 text-xs">Claimity Intern</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vertragsbeginn:</span>
                        <span className="font-medium">{expert.contractStart}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vertragsende:</span>
                        <span className="font-medium">{expert.contractEnd}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Zahlungsziel:</span>
                        <span className="font-medium">{expert.paymentTerms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stundensatz:</span>
                        <span className="font-medium text-lg">{expert.hourlyRate}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Pauschaltarife</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(expert.flatRates).map(([service, rate]) => (
                          <div key={service} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">{service}</span>
                            <span className="font-semibold">{rate}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Interne Notizen</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded">{expert.notes}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
