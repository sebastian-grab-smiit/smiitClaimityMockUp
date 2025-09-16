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
  BarChart3,
  Building2,
  DollarSign,
  MessageSquare,
  Settings,
  User,
  LucideMap,
  File,
  Banknote
} from "lucide-react"
import Link from "next/link"

type TariffCategory = "sachverstaendiger" | "fahrzeugexperte" | "bvm"
type TariffItem = {
  id: string
  service: string
  category: string
  hourly?: number | null
  flat?: number | null
}

const TARIFF_TEMPLATES: Record<TariffCategory, TariffItem[]> = {
  sachverstaendiger: [
    { id: "sv_rechnung_pruefung", service: "Sachverständiger", category: "einfache Rechnungsprüfung", hourly: null, flat: 75 },
    { id: "sv_aussendienst",      service: "Sachverständiger", category: "Aussendienst",            hourly: 170, flat: null },
    { id: "sv_innendienst",       service: "Sachverständiger", category: "Innendienst",             hourly: 140, flat: null },
  ],
  fahrzeugexperte: [
    { id: "fz_standard",     service: "Fahrzeugexpertise", category: "Standardexpertise",   hourly: null, flat: 315 },
    { id: "fz_kurz",         service: "Fahrzeugexpertise", category: "Kurzexpertise",       hourly: null, flat: 160 },
    { id: "fz_live",         service: "Fahrzeugexpertise", category: "LiveExpert",          hourly: null, flat: 200 },
    { id: "fz_drivein",      service: "Fahrzeugexpertise", category: "Drive-In Expertise",  hourly: null, flat: 200 },
    { id: "fz_rechnung",     service: "Fahrzeugexpertise", category: "Rechnungskontrolle", hourly: null, flat: 75 },
    { id: "fz_wrack_ch",     service: "Fahrzeugexpertise", category: "Wrackverkauf Schweiz", hourly: null, flat: 120 },
    { id: "fz_wrack_abroad", service: "Fahrzeugexpertise", category: "Wrackverkauf Ausland", hourly: null, flat: 175 },
    { id: "fz_totalschaden", service: "Fahrzeugexpertise", category: "Totalschaden",        hourly: null, flat: 350 },
  ],
  bvm: [
    { id: "bvm_ermittlung", service: "BVM", category: "Ermittlung",  hourly: 220, flat: null },
    { id: "bvm_kurzcheck",  service: "BVM", category: "Kurzcheck",   hourly: null, flat: 100 },
  ],
}

const CATEGORY_LABEL: Record<TariffCategory, string> = {
  sachverstaendiger: "Sachverständiger",
  fahrzeugexperte: "Fahrzeugexperte",
  bvm: "Bekämpfung Versicherungsmissbrauch",
}

export default function ExpertDetailPage({ id }: { id: string }) {
  // --- Mock expert enriched with category, split address & bank/facturation data ---
  const expert = {
    id,
    company: "Muster AG",
    category: "fahrzeugexperte" as TariffCategory,
    name: "Kurt Seiler",
    email: "hans.mueller@expert.ch",
    phone: "+41 44 123 45 67",
    address: "Musterstrasse 123, 8001 Zürich", // legacy full (for reference)
    addressLine: "Musterstrasse 123",
    postalCode: "8001",
    city: "Zürich",
    canton: "ZH",
    location: "Zürich, ZH",
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
    // Contract & invoicing
    contractStart: "2019-03-15",
    contractEnd: "2025-03-14",
    paymentTermsDays: 30,
    status: "Aktiv",
    notes: "Sehr zuverlässiger Experte mit ausgezeichneter Dokumentation.",
    invoicingCompany: "Muster AG",
    invoicingEmail: "billing@muster-ag.ch",
    iban: "CH93 0076 2011 6238 5295 7",
    bankName: "ZKB",
    bic: "ZKBKCHZZ80A",
    accountHolder: "Muster AG",
    // Tariffs (optional overrides; fall back to defaults from template if missing)
    tariffs: {
      fz_standard: { flat: "315" },
      fz_kurz: { flat: "160" },
      fz_live: { flat: "200" },
      fz_drivein: { flat: "200" },
      fz_rechnung: { flat: "75" },
      fz_wrack_ch: { flat: "120" },
      fz_wrack_abroad: { flat: "175" },
      fz_totalschaden: { flat: "350" },
    } as Record<string, { hourly?: string; flat?: string }>,
    performanceScore: 92,
    qualityScore: 88,
    timelinessScore: 95,
  }

  const recentCases = [
    { id: "CLM-2024-001", insurer: "Zurich Insurance", type: "Fahrzeugschaden", status: "Abgeschlossen", amount: "CHF 15,000", completed: "2024-01-20", rating: 5 },
    { id: "CLM-2024-002", insurer: "AXA Switzerland",  type: "Maschinenschaden", status: "In Bearbeitung", amount: "CHF 8,500", started: "2024-01-15", rating: null },
    { id: "CLM-2024-003", insurer: "Swiss Re",         type: "KFZ-Gutachten",    status: "Abgeschlossen", amount: "CHF 3,200", completed: "2024-01-10", rating: 4 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktiv": return "bg-green-100 text-green-800"
      case "Warnung": return "bg-yellow-100 text-yellow-800"
      case "Gesperrt": return "bg-red-100 text-red-800"
      case "Inaktiv": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Verfügbar": return "bg-green-100 text-green-800"
      case "Beschäftigt": return "bg-yellow-100 text-yellow-800"
      case "Nicht verfügbar": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }
  const getCaseStatusColor = (status: string) => {
    switch (status) {
      case "Abgeschlossen": return "bg-green-100 text-green-800"
      case "In Bearbeitung": return "bg-yellow-100 text-yellow-800"
      case "Überfällig": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const template = TARIFF_TEMPLATES[expert.category]

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
                    <Badge className={expert.status === "Aktiv" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {expert.status}
                    </Badge>
                    <Badge variant="outline">{CATEGORY_LABEL[expert.category]}</Badge>
                    <span className="text-slate-600">Seit {expert.joinDate}</span>
                  </div>
                </div>
              </div>
              <Button className="bg-primary">
                <Edit className="h-4 w-4 mr-2" />
                Bearbeiten
              </Button>
            </div>

            {/* KPI tiles */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Bewertung</p><p className="text-2xl font-bold text-gray-900">{expert.rating}</p></div><Star className="h-8 w-8 text-primary" /></div></CardContent></Card>
              <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Abgeschlossene Fälle</p><p className="text-2xl font-bold text-gray-900">{expert.completedCases}</p></div><CheckCircle className="h-8 w-8 text-primary" /></div></CardContent></Card>
              <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Aktive Fälle</p><p className="text-2xl font-bold text-gray-900">{expert.activeCases}</p></div><FileText className="h-8 w-8 text-primary" /></div></CardContent></Card>
              <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Auslastung</p><p className="text-2xl font-bold text-gray-900">{expert.workload}%</p></div><TrendingUp className="h-8 w-8 text-primary" /></div></CardContent></Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Übersicht</TabsTrigger>
                <TabsTrigger value="cases">Fälle</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="contract">Vertrag</TabsTrigger>
              </TabsList>

              {/* OVERVIEW */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader><CardTitle>Kontakt & Grunddaten</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3"><Mail className="h-4 w-4 text-gray-400" /><span>{expert.email}</span></div>
                      <div className="flex items-center space-x-3"><Phone className="h-4 w-4 text-gray-400" /><span>{expert.phone}</span></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-2"><span className="text-sm text-gray-600">Adresse</span><div className="font-medium">{expert.addressLine}</div></div>
                        <div><span className="text-sm text-gray-600">PLZ</span><div className="font-medium">{expert.postalCode}</div></div>
                        <div><span className="text-sm text-gray-600">Ort</span><div className="font-medium">{expert.city}</div></div>
                        <div><span className="text-sm text-gray-600">Kanton</span><div className="font-medium">{expert.canton}</div></div>
                        <div className="col-span-2"><span className="text-sm text-gray-600">Firma</span><div className="font-medium">{expert.company}</div></div>
                        <div className="col-span-2"><span className="text-sm text-gray-600">Kategorie</span><div className="font-medium">{CATEGORY_LABEL[expert.category]}</div></div>
                      </div>

                      <div className="pt-2">
                        <p className="text-sm text-gray-600 mb-2">Sprachen</p>
                        <div className="flex gap-2">
                          {expert.languages.map((lang) => <Badge key={lang} variant="outline">{lang}</Badge>)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle>Verfügbarkeit & Status</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Status</span><Badge className={getStatusColor(expert.status)}>{expert.status}</Badge></div>
                      <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Verfügbarkeit</span><Badge className={getAvailabilityColor(expert.availability)}>{expert.availability}</Badge></div>
                      <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Letzte Aktivität</span><span className="text-sm">{expert.lastActive}</span></div>
                      <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Ø Antwortzeit</span><span className="text-sm font-medium">{expert.avgResponseTime}</span></div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle>Spezialisierungen</CardTitle></CardHeader>
                    <CardContent><div className="flex flex-wrap gap-2">{expert.specialties.map((s) => <Badge key={s} className="bg-teal-100 text-teal-800">{s}</Badge>)}</div></CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle>Zertifizierungen</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">{expert.certifications.map((c) => <Badge key={c} className="bg-blue-100 text-blue-800">{c}</Badge>)}</div>
                      <p className="text-sm text-gray-600 mt-3">Berufserfahrung: {expert.experience}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* CASES */}
              <TabsContent value="cases" className="space-y-6">
                <Card>
                  <CardHeader><CardTitle>Aktuelle und kürzliche Fälle</CardTitle></CardHeader>
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
                        {recentCases.map((c) => (
                          <TableRow key={c.id}>
                            <TableCell className="font-medium">{c.id}</TableCell>
                            <TableCell>{c.insurer}</TableCell>
                            <TableCell>{c.type}</TableCell>
                            <TableCell><Badge className={getCaseStatusColor(c.status)}>{c.status}</Badge></TableCell>
                            <TableCell className="font-medium">{c.amount}</TableCell>
                            <TableCell>{(c as any).completed || (c as any).started}</TableCell>
                            <TableCell>{c.rating ? (<div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-1" />{c.rating}</div>) : (<span className="text-gray-400">Ausstehend</span>)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* PERFORMANCE */}
              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card><CardHeader><CardTitle>Performance Score</CardTitle></CardHeader><CardContent><div className="text-center"><div className="text-3xl font-bold text-teal-600 mb-2">{expert.performanceScore}%</div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-teal-500 h-2 rounded-full" style={{ width: `${expert.performanceScore}%` }} /></div></div></CardContent></Card>
                  <Card><CardHeader><CardTitle>Qualitätsscore</CardTitle></CardHeader><CardContent><div className="text-center"><div className="text-3xl font-bold text-blue-600 mb-2">{expert.qualityScore}%</div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: `${expert.qualityScore}%` }} /></div></div></CardContent></Card>
                  <Card><CardHeader><CardTitle>Termintreue</CardTitle></CardHeader><CardContent><div className="text-center"><div className="text-3xl font-bold text-green-600 mb-2">{expert.timelinessScore}%</div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: `${expert.timelinessScore}%` }} /></div></div></CardContent></Card>
                </div>
              </TabsContent>

              {/* CONTRACT */}
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
                      <div className="flex justify-between"><span className="text-gray-600">Kategorie</span><span className="font-medium">{CATEGORY_LABEL[expert.category]}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Vertragsbeginn</span><span className="font-medium">{expert.contractStart}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Vertragsende</span><span className="font-medium">{expert.contractEnd}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Zahlungsziel</span><span className="font-medium">{expert.paymentTermsDays} Tage</span></div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        Fakturierung & Bank
                        <Badge className="ml-2" variant="outline">Intern</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between"><span className="text-gray-600">Firma (Rechnung)</span><span className="font-medium">{expert.invoicingCompany}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Rechnungs-E-Mail</span><span className="font-medium">{expert.invoicingEmail}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">IBAN</span><span className="font-medium">{expert.iban}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Bank</span><span className="font-medium">{expert.bankName}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">BIC/SWIFT</span><span className="font-medium">{expert.bic}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Kontoinhaber</span><span className="font-medium">{expert.accountHolder}</span></div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        Tarife
                        <Banknote className="h-4 w-4 ml-2 text-slate-600" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Dienstleistung</TableHead>
                            <TableHead>Kategorie</TableHead>
                            <TableHead>Stundensatz Experte (CHF/h)</TableHead>
                            <TableHead>Pauschale (CHF)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {template.map((row) => {
                            const override = (expert.tariffs && (expert.tariffs as any)[row.id]) || {}
                            const hourly = override.hourly ?? (row.hourly != null ? String(row.hourly) : "")
                            const flat = override.flat ?? (row.flat != null ? String(row.flat) : "")
                            return (
                              <TableRow key={row.id}>
                                <TableCell className="font-medium">{row.service}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.hourly != null ? `CHF ${hourly}` : <span className="text-slate-400">–</span>}</TableCell>
                                <TableCell>{row.flat != null ? `CHF ${flat}` : <span className="text-slate-400">–</span>}</TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader><CardTitle>Interne Notizen</CardTitle></CardHeader>
                    <CardContent><p className="text-gray-700 bg-gray-50 p-4 rounded">{expert.notes}</p></CardContent>
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
