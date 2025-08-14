"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function InsurerDetailPage({ params }: { params: { id: string } }) {
  // Mock data for the insurer
  const insurer = {
    id: params.id,
    name: "Zurich Insurance Group",
    contact: "Hans Müller",
    email: "hans.mueller@zurich.ch",
    phone: "+41 44 628 25 25",
    address: "Mythenquai 2, 8002 Zürich",
    website: "https://www.zurich.ch",
    status: "Active",
    contractType: "Premium",
    commissionRate: "18.5%",
    joinDate: "2022-03-15",
    notes: "Strategischer Partner mit hohem Volumen. Bevorzugte Behandlung bei Expertenzuweisung.",
  }

  const stats = [
    { title: "Aktive Fälle", value: "15", icon: FileText, color: "text-blue-600" },
    { title: "Abgeschlossene Fälle", value: "142", icon: TrendingUp, color: "text-green-600" },
    { title: "Durchschnittsbetrag", value: "CHF 18,500", icon: DollarSign, color: "text-purple-600" },
    { title: "Zugewiesene Experten", value: "8", icon: Users, color: "text-orange-600" },
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

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader userType="admin" />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen">
          <nav className="p-4 space-y-2">
            <Link
              href="/dashboard/admin/insurers"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Zurück zu Versicherern</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">{insurer.name}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <Badge
                    className={
                      insurer.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }
                  >
                    {insurer.status}
                  </Badge>
                  <span className="text-slate-600">Seit {insurer.joinDate}</span>
                </div>
              </div>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Edit className="h-4 w-4 mr-2" />
              Bearbeiten
            </Button>
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
            <TabsList>
              <TabsTrigger value="overview">Übersicht</TabsTrigger>
              <TabsTrigger value="cases">Fälle</TabsTrigger>
              <TabsTrigger value="experts">Experten</TabsTrigger>
              <TabsTrigger value="settings">Einstellungen</TabsTrigger>
            </TabsList>

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
                      <p className="text-sm text-slate-600">Vertragstyp</p>
                      <p className="font-medium">{insurer.contractType}</p>
                    </div>
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

            <TabsContent value="cases">
              <Card>
                <CardHeader>
                  <CardTitle>Aktuelle Fälle</CardTitle>
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

            <TabsContent value="experts">
              <Card>
                <CardHeader>
                  <CardTitle>Zugewiesene Experten</CardTitle>
                  <CardDescription>Experten, die für diesen Versicherer arbeiten</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Expertenliste wird hier angezeigt...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Einstellungen</CardTitle>
                  <CardDescription>Versicherer-spezifische Konfiguration</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Einstellungen werden hier angezeigt...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
