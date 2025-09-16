"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  DollarSign,
  Download,
  Eye,
  Send,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Calendar,
  User,
  FileText,
  BarChart3,
  Building2,
  MessageSquare,
  Settings,
  Users,
  LucideMap,
  File
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function InvoicingPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const invoices = [
    {
      id: "INV-2024-001",
      number: "2024-001",
      claimId: "CLM-2024-001",
      expert: "Kurt Seiler",
      expertEmail: "hans.mueller@expert.ch",
      insurer: "Helvetia Versicherung",
      amount: "CHF 450.00",
      expertRate: "CHF 120/h",
      hours: 3.5,
      flatFee: false,
      status: "Offen",
      created: "2024-01-20 16:30",
      due: "2024-02-19 23:59",
      sent: "2024-01-20 17:00",
      services: ["Vor-Ort Begutachtung", "Bericht erstellen", "Fotodokumentation"],
      marginPercent: 15,
      insurerRate: "CHF 518.00",
    },
    {
      id: "INV-2024-002",
      number: "2024-002",
      claimId: "CLM-2024-002",
      expert: "Maria Weber",
      expertEmail: "maria.weber@expert.ch",
      insurer: "AXA Schweiz",
      amount: "CHF 800.00",
      expertRate: "Pauschal",
      hours: 0,
      flatFee: true,
      status: "Bezahlt",
      created: "2024-01-19 14:15",
      due: "2024-02-18 23:59",
      sent: "2024-01-19 15:00",
      paid: "2024-01-25 10:30",
      services: ["Gebäudegutachten", "Kostenvoranschlag", "Sanierungsempfehlungen"],
      marginPercent: 20,
      insurerRate: "CHF 960.00",
    },
    {
      id: "INV-2024-003",
      number: "2024-003",
      claimId: "CLM-2024-003",
      expert: "Thomas Schneider",
      expertEmail: "thomas.schneider@expert.ch",
      insurer: "Zurich Insurance",
      amount: "CHF 1,200.00",
      expertRate: "CHF 150/h",
      hours: 8,
      flatFee: false,
      status: "Überfällig",
      created: "2024-01-15 11:45",
      due: "2024-01-30 23:59",
      sent: "2024-01-15 12:00",
      services: ["Brandschadenanalyse", "Ursachenermittlung", "Detailbericht"],
      marginPercent: 18,
      insurerRate: "CHF 1,416.00",
      overdueDays: 5,
    },
  ]

  const dunningStats = {
    totalOverdue: "CHF 3,450.00",
    overdueCount: 8,
    criticalCount: 3,
    averagePaymentDelay: 12, // days
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Offen":
        return "bg-yellow-100 text-yellow-800"
      case "Bezahlt":
        return "bg-green-100 text-green-800"
      case "Überfällig":
        return "bg-red-100 text-red-800"
      case "Storniert":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Offen":
        return <Clock className="h-4 w-4" />
      case "Bezahlt":
        return <CheckCircle className="h-4 w-4" />
      case "Überfällig":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getDunningLevel = (overdueDays: number) => {
    if (overdueDays >= 30) return { level: "Rot", color: "bg-red-500" }
    if (overdueDays >= 14) return { level: "Gelb", color: "bg-yellow-500" }
    if (overdueDays >= 7) return { level: "Grün", color: "bg-green-500" }
    return { level: "Normal", color: "bg-gray-300" }
  }

  const selectedInvoiceData = selectedInvoice ? invoices.find((i) => i.id === selectedInvoice) : null

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.claimId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.expert.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.insurer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleApprove = (invoiceId: string) => {
    console.log("Approving invoice:", invoiceId)
    // In real app, update invoice status via API
  }

  const handleSendReminder = (invoiceId: string) => {
    console.log("Sending reminder for invoice:", invoiceId)
    // In real app, send reminder via API
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
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Rechnungsmanagement</h1>
                <p className="text-gray-600">Verwaltung von Rechnungen und Zahlungsüberwachung</p>
              </div>
            </div>

            <Tabs defaultValue="invoices" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="invoices">Rechnungen</TabsTrigger>
                <TabsTrigger value="dunning">Mahnwesen</TabsTrigger>
                <TabsTrigger value="pricing">Preise & Margen</TabsTrigger>
              </TabsList>

              {/* Invoices Tab */}
              <TabsContent value="invoices" className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Invoices List */}
                  <div className="lg:col-span-1">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Rechnungen ({filteredInvoices.length})</CardTitle>
                        </div>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              placeholder="Suchen..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Alle</SelectItem>
                              <SelectItem value="Offen">Offen</SelectItem>
                              <SelectItem value="Bezahlt">Bezahlt</SelectItem>
                              <SelectItem value="Überfällig">Überfällig</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {filteredInvoices.map((invoice) => (
                            <div
                              key={invoice.id}
                              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                selectedInvoice === invoice.id ? "bg-green-50 border-green-200" : "hover:bg-slate-50"
                              }`}
                              onClick={() => setSelectedInvoice(invoice.id)}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-sm text-slate-800">Rechnung {invoice.number}</h3>
                                  <p className="text-xs text-slate-600">{invoice.claimId}</p>
                                </div>
                                <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                              </div>
                              <div className="space-y-1 text-xs text-slate-500">
                                <div className="flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  {invoice.expert}
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  {invoice.amount}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Fällig: {new Date(invoice.due).toLocaleDateString("de-CH")}
                                </div>
                              </div>
                              {invoice.status === "Überfällig" && invoice.overdueDays && (
                                <div className="mt-2 flex items-center space-x-1">
                                  <div className={`w-2 h-2 rounded-full ${getDunningLevel(invoice.overdueDays).color}`} />
                                  <span className="text-xs text-red-600">{invoice.overdueDays} Tage überfällig</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Invoice Details */}
                  <div className="lg:col-span-2">
                    {selectedInvoiceData ? (
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="flex items-center space-x-2">
                                <span>Rechnung {selectedInvoiceData.number}</span>
                                <Badge className={getStatusColor(selectedInvoiceData.status)}>
                                  {selectedInvoiceData.status}
                                </Badge>
                              </CardTitle>
                              <CardDescription>
                                Fall: {selectedInvoiceData.claimId} • {selectedInvoiceData.insurer}
                              </CardDescription>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleApprove(selectedInvoiceData.id)}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Freigeben
                              </Button>
                              <Button variant="outline">
                                <Eye className="h-4 w-4 mr-2" />
                                Anzeigen
                              </Button>
                              <Button variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                PDF
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-semibold text-slate-800 mb-3">Rechnungsdetails</h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Experte:</span>
                                    <span className="font-medium">{selectedInvoiceData.expert}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Betrag:</span>
                                    <span className="font-medium text-lg">{selectedInvoiceData.amount}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Abrechnungsart:</span>
                                    <span className="font-medium">
                                      {selectedInvoiceData.flatFee
                                        ? "Pauschal"
                                        : `${selectedInvoiceData.hours}h à ${selectedInvoiceData.expertRate}`}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Erstellt:</span>
                                    <span className="font-medium">
                                      {new Date(selectedInvoiceData.created).toLocaleDateString("de-CH")}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Fällig:</span>
                                    <span className="font-medium">
                                      {new Date(selectedInvoiceData.due).toLocaleDateString("de-CH")}
                                    </span>
                                  </div>
                                  {selectedInvoiceData.paid && (
                                    <div className="flex justify-between">
                                      <span className="text-slate-600">Bezahlt:</span>
                                      <span className="font-medium text-green-600">
                                        {new Date(selectedInvoiceData.paid).toLocaleDateString("de-CH")}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-slate-800 mb-2">Leistungen</h4>
                                <ul className="text-sm text-slate-600 space-y-1">
                                  {selectedInvoiceData.services.map((service, index) => (
                                    <li key={index}>• {service}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="bg-slate-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-slate-800 mb-3">Margen-Kalkulation</h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Expertenkosten:</span>
                                    <span className="font-medium">{selectedInvoiceData.amount}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Marge ({selectedInvoiceData.marginPercent}%):</span>
                                    <span className="font-medium">
                                      CHF{" "}
                                      {(
                                        Number.parseFloat(selectedInvoiceData.amount.replace("CHF ", "")) *
                                        (selectedInvoiceData.marginPercent / 100)
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="border-t pt-2 flex justify-between">
                                    <span className="text-slate-600 font-medium">Versicherer-Rechnung:</span>
                                    <span className="font-semibold text-lg">{selectedInvoiceData.insurerRate}</span>
                                  </div>
                                </div>
                              </div>

                              {selectedInvoiceData.status === "Überfällig" && (
                                <div className="bg-red-50 p-4 rounded-lg">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <AlertTriangle className="h-5 w-5 text-red-600" />
                                    <h4 className="font-medium text-red-800">Überfällige Rechnung</h4>
                                  </div>
                                  <p className="text-sm text-red-700 mb-3">
                                    {selectedInvoiceData.overdueDays} Tage überfällig
                                  </p>
                                  <Button
                                    onClick={() => handleSendReminder(selectedInvoiceData.id)}
                                    size="sm"
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    <Send className="h-4 w-4 mr-2" />
                                    Mahnung senden
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="flex items-center justify-center h-96">
                          <div className="text-center">
                            <DollarSign className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">Keine Rechnung ausgewählt</h3>
                            <p className="text-gray-600">
                              Wählen Sie eine Rechnung aus der Liste aus, um Details anzuzeigen.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Dunning Tab */}
              <TabsContent value="dunning" className="space-y-6">
                {/* Dunning Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600">Überfällige Summe</p>
                          <p className="text-2xl font-bold text-red-600">{dunningStats.totalOverdue}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500">
                          <AlertTriangle className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600">Überfällige Rechnungen</p>
                          <p className="text-2xl font-bold text-slate-800">{dunningStats.overdueCount}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600">Kritische Fälle</p>
                          <p className="text-2xl font-bold text-slate-800">{dunningStats.criticalCount}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500">
                          <Clock className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600">Ø Zahlungsverzug</p>
                          <p className="text-2xl font-bold text-slate-800">{dunningStats.averagePaymentDelay} Tage</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Dunning Heatmap */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mahnwesen Ampel-System</CardTitle>
                    <CardDescription>Übersicht über überfällige Rechnungen nach Dringlichkeit</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <h3 className="font-semibold text-green-800">Grün (7-13 Tage)</h3>
                        </div>
                        <p className="text-2xl font-bold text-green-600">2</p>
                        <p className="text-sm text-green-700">Erste Mahnung</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <h3 className="font-semibold text-yellow-800">Gelb (14-29 Tage)</h3>
                        </div>
                        <p className="text-2xl font-bold text-yellow-600">4</p>
                        <p className="text-sm text-yellow-700">Zweite Mahnung</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <h3 className="font-semibold text-red-800">Rot (30+ Tage)</h3>
                        </div>
                        <p className="text-2xl font-bold text-red-600">2</p>
                        <p className="text-sm text-red-700">Inkasso/Rechtlich</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pricing Tab */}
              <TabsContent value="pricing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preise & Margen (Vertraulich)</CardTitle>
                    <CardDescription>Interne Preisgestaltung und Margen-Konfiguration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <p className="text-yellow-800 font-medium">Vertrauliche Informationen</p>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">
                        Diese Preise und Margen sind nur für interne Claimity-Mitarbeiter sichtbar.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-4">Standard-Margen</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-700">Fahrzeugschäden</span>
                            <span className="font-semibold">15%</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-700">Gebäudeschäden</span>
                            <span className="font-semibold">18%</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-700">Brandschäden</span>
                            <span className="font-semibold">20%</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-700">Komplexe Fälle</span>
                            <span className="font-semibold">25%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-800 mb-4">Experten-Stundensätze</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-700">Junior Experte</span>
                            <span className="font-semibold">CHF 80-100/h</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-700">Senior Experte</span>
                            <span className="font-semibold">CHF 120-150/h</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-700">Spezialist</span>
                            <span className="font-semibold">CHF 180-220/h</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-700">Pauschalpreise</span>
                            <span className="font-semibold">CHF 500-2000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
