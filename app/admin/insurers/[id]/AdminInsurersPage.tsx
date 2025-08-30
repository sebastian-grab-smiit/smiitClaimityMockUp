"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Edit,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Eye,
  Settings,
  BarChart3,
  Building2,
  MessageSquare,
  File,
  LucideMap,
  Banknote,
  CreditCard,
  Save,
  X,
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

type TariffItem = {
  service: string
  category: string
  hourly?: number | null
  flat?: number | null
}

const TARIFFS: Record<"sachverstaendiger" | "fahrzeugexperte" | "bvm", TariffItem[]> = {
  sachverstaendiger: [
    { service: "Sachverständiger", category: "einfache Rechnungsprüfung", flat: 75 },
    { service: "Sachverständiger", category: "Aussendienst", hourly: 170 },
    { service: "Sachverständiger", category: "Innendienst", hourly: 140 },
  ],
  fahrzeugexperte: [
    { service: "Fahrzeugexpertise", category: "Standardexpertise", flat: 315 },
    { service: "Fahrzeugexpertise", category: "Kurzexpertise", flat: 160 },
    { service: "Fahrzeugexpertise", category: "LiveExpert", flat: 200 },
    { service: "Fahrzeugexpertise", category: "Drive-In Expertise", flat: 200 },
    { service: "Fahrzeugexpertise", category: "Rechnungskontrolle", flat: 75 },
    { service: "Fahrzeugexpertise", category: "Wrackverkauf Schweiz", flat: 120 },
    { service: "Fahrzeugexpertise", category: "Wrackverkauf Ausland", flat: 175 },
    { service: "Fahrzeugexpertise", category: "Totalschaden", flat: 350 },
  ],
  bvm: [
    { service: "BVM", category: "Ermittlung", hourly: 220 },
    { service: "BVM", category: "Kurzcheck", flat: 100 },
  ],
}

const CATEGORY_LABEL: Record<keyof typeof TARIFFS, string> = {
  sachverstaendiger: "Sachverständiger",
  fahrzeugexperte: "Fahrzeugexperte",
  bvm: "Bekämpfung Versicherungsmissbrauch",
}

export default function InsurerDetailPage({ id }: { id: string }) {
  // Mock data for the insurer
  const insurer = {
    id,
    name: "Zurich Insurance Group",
    contact: "Hans Müller",
    email: "hans.mueller@zurich.ch",
    phone: "+41 44 628 25 25",
    address: "Mythenquai 2, 8002 Zürich",
    website: "https://www.zurich.ch",
    status: "Aktiv",
    contractType: "Premium",
    commissionRate: "18.5%",
    joinDate: "2022-03-15",
    notes:
      "Strategischer Partner mit hohem Volumen. Bevorzugte Behandlung bei Expertenzuweisung.",
    // NEW: Admin user & payment details
    adminUser: {
      name: "Anna Beispiel",
      email: "anna.beispiel@zurich.ch",
      phone: "+41 79 555 22 11",
      role: "Admin",
    },
    payment: {
      accountHolder: "Zurich Insurance Group",
      iban: "CH44 3199 9123 0008 8901 2",
      bankName: "Zürcher Kantonalbank",
      bic: "ZKBKCHZZ80A",
      billingEmail: "ap@zurich.ch",
      billingAddress: "Zurich Insurance Group, Finance AP, Postfach, 8022 Zürich",
      paymentTerms: "30",
    },
    tariffs: TARIFFS,
  }

  const stats = [
    { title: "Aktive Fälle", value: "15", icon: FileText, color: "text-primary" },
    { title: "Abgeschlossene Fälle", value: "142", icon: TrendingUp, color: "text-primary" },
    { title: "Durchschnittlicher Umsatz", value: "CHF 18,500", icon: DollarSign, color: "text-primary" },
    { title: "Durchschnittlicher Gewinn", value: "CHF 280", icon: Users, color: "text-primary" },
  ]

  const recentCases = [
    {
      id: "CLM-2024-045",
      type: "Fahrzeugschaden",
      expert: "Dr. Weber",
      amount: "CHF 12,500",
      status: "In Bearbeitung",
      date: "2024-01-18",
    },
    {
      id: "CLM-2024-038",
      type: "Gebäudeschaden",
      expert: "Maria Schneider",
      amount: "CHF 45,000",
      status: "Abgeschlossen",
      date: "2024-01-15",
    },
    {
      id: "CLM-2024-032",
      type: "Wasserschaden",
      expert: "Thomas Müller",
      amount: "CHF 8,200",
      status: "Bericht eingereicht",
      date: "2024-01-12",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Bearbeitung":
        return "bg-yellow-100 text-yellow-800"
      case "Abgeschlossen":
        return "bg-green-100 text-green-800"
      case "Bericht eingereicht":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const money = (n?: number | null) => (n != null ? `CHF ${n}` : "–")

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
            <Link href="/admin/experts" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Users className="h-4 w-4" />
              <span>Experten</span>
            </Link>
            <Link href="/admin/insurers" className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg">
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{insurer.name}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <Badge className={insurer.status === "Aktiv" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {insurer.status}
                  </Badge>
                  <span className="text-slate-600">Seit {insurer.joinDate}</span>
                </div>
              </div>
            </div>
              <div className="flex space-x-2">
                <Link href="/admin/insurers">
                  <Button variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Abbrechen
                  </Button>
                </Link>
                <Button className="bg-primary">
                  <Save className="h-4 w-4 mr-2" />
                  Versicherer speichern
                </Button>
              </div>
            </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="overview">Übersicht</TabsTrigger>
              <TabsTrigger value="cases">Fälle</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="tariffs">Tarife</TabsTrigger>
              <TabsTrigger value="payments">Zahlungen</TabsTrigger>
              <TabsTrigger value="settings">Einstellungen</TabsTrigger>
            </TabsList>

            {/* OVERVIEW */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Kontaktinformationen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium">{insurer.contact}</p>
                        <p className="text-sm text-slate-600">Hauptansprechpartner</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium">{insurer.email}</p>
                        <p className="text-sm text-slate-600">E-Mail</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium">{insurer.phone}</p>
                        <p className="text-sm text-slate-600">Telefon</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium">{insurer.address}</p>
                        <p className="text-sm text-slate-600">Adresse</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-slate-400" />
                      <div>
                        <a href={insurer.website} className="font-medium text-teal-600 hover:underline">
                          {insurer.website}
                        </a>
                        <p className="text-sm text-slate-600">Website</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vertragsdetails</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600">Provisionssatz</p>
                      <p className="font-medium">{insurer.commissionRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Beitrittsdatum</p>
                      <p className="font-medium">{insurer.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Notizen</p>
                      <p className="text-sm">{insurer.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* CASES */}
            <TabsContent value="cases">
              <Card>
                <CardHeader>
                  <CardTitle>Alle Fälle</CardTitle>
                  <CardDescription>Übersicht aller Fälle dieses Versicherers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fall-ID</TableHead>
                        <TableHead>Typ</TableHead>
                        <TableHead>Experte</TableHead>
                        <TableHead>Betrag</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentCases.map((case_) => (
                        <TableRow key={case_.id}>
                          <TableCell className="font-medium">{case_.id}</TableCell>
                          <TableCell>{case_.type}</TableCell>
                          <TableCell>{case_.expert}</TableCell>
                          <TableCell className="font-medium">{case_.amount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-slate-400" />
                              {case_.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TEAM / ADMIN */}
            <TabsContent value="team">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin-Benutzer</CardTitle>
                    <CardDescription>Primärer Administrator für dieses Konto</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Name</span>
                      <span className="font-medium">{insurer.adminUser.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">E-Mail</span>
                      <span className="font-medium">{insurer.adminUser.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Telefon</span>
                      <span className="font-medium">{insurer.adminUser.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Rolle</span>
                      <Badge>Admin</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weitere Nutzer</CardTitle>
                    <CardDescription>Nutzerverwaltung (Platzhalter)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Nutzerliste wird hier angezeigt…</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* TARIFFS */}
            <TabsContent value="tariffs" className="space-y-6">
              {(
                Object.keys(insurer.tariffs) as (keyof typeof insurer.tariffs)[]
              ).map((key) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Banknote className="h-5 w-5 mr-2 text-slate-600" />
                      {CATEGORY_LABEL[key]}
                    </CardTitle>
                    <CardDescription>Preisübersicht dieser Kategorie</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Dienstleistung</TableHead>
                            <TableHead>Kategorie</TableHead>
                            <TableHead>Stundensatz (CHF/h)</TableHead>
                            <TableHead>Pauschale (CHF)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {insurer.tariffs[key].map((row, idx) => (
                            <TableRow key={`${row.category}-${idx}`}>
                              <TableCell className="font-medium">{row.service}</TableCell>
                              <TableCell>{row.category}</TableCell>
                              <TableCell>{row.hourly != null ? money(row.hourly) : "–"}</TableCell>
                              <TableCell>{row.flat != null ? money(row.flat) : "–"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* PAYMENTS */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-slate-600" />
                    Zahlungsdetails
                  </CardTitle>
                  <CardDescription>Bank- & Rechnungsdaten</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-slate-600">Kontoinhaber</span>
                      <span className="font-medium">{insurer.payment.accountHolder}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-slate-600">IBAN</span>
                      <span className="font-medium">{insurer.payment.iban}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-slate-600">Bankname</span>
                      <span className="font-medium">{insurer.payment.bankName}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-slate-600">BIC / SWIFT</span>
                      <span className="font-medium">{insurer.payment.bic}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-slate-600">Rechnungs-E-Mail</span>
                      <span className="font-medium">{insurer.payment.billingEmail}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-slate-600">Zahlungsziel</span>
                      <span className="font-medium">{insurer.payment.paymentTerms} Tage</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Rechnungsadresse</p>
                    <p className="bg-slate-50 p-3 rounded">{insurer.payment.billingAddress}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SETTINGS placeholder */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Einstellungen</CardTitle>
                  <CardDescription>Versicherer-spezifische Konfiguration</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Einstellungen werden hier angezeigt…</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
