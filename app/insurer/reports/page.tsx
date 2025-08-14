"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/shared/page-header"
import { ArrowLeft, Search, Users, Plus, Settings, BarChart3, Download, FileText, Calendar, Eye, CheckCircle, Clock, AlertCircle, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock data
  const reports = [
    {
      id: "RPT-2024-001",
      claimId: "CLM-2024-001",
      name: "Schadensgutachten Fahrzeug",
      type: "Gutachten",
      status: "Abgeschlossen",
      expert: "Dr. Hans Müller",
      created: "18.01.2024",
      size: "2.4 MB",
      format: "PDF",
    },
    {
      id: "RPT-2024-002",
      claimId: "CLM-2024-002",
      name: "Vorabschätzung Gebäudeschaden",
      type: "Vorabschätzung",
      status: "Entwurf",
      expert: "Maria Weber",
      created: "17.01.2024",
      size: "1.8 MB",
      format: "PDF",
    },
    {
      id: "RPT-2024-003",
      claimId: "CLM-2024-003",
      name: "Abschlussbericht Fahrzeugschaden",
      type: "Abschlussbericht",
      status: "Freigegeben",
      expert: "Thomas Schneider",
      created: "16.01.2024",
      size: "3.1 MB",
      format: "PDF",
    },
  ]

  const invoices = [
    {
      id: "INV-2024-001",
      claimId: "CLM-2024-001",
      number: "2024-001",
      expert: "Dr. Hans Müller",
      amount: "CHF 450.00",
      status: "Bezahlt",
      created: "18.01.2024",
      due: "17.02.2024",
    },
    {
      id: "INV-2024-002",
      claimId: "CLM-2024-002",
      number: "2024-002",
      expert: "Maria Weber",
      amount: "CHF 320.00",
      status: "Offen",
      created: "17.01.2024",
      due: "16.02.2024",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entwurf":
        return "bg-yellow-100 text-yellow-800"
      case "Abgeschlossen":
        return "bg-green-100 text-green-800"
      case "Freigegeben":
        return "bg-teal-100 text-teal-800"
      case "Bezahlt":
        return "bg-green-100 text-green-800"
      case "Offen":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Entwurf":
        return <Clock className="h-4 w-4" />
      case "Abgeschlossen":
        return <CheckCircle className="h-4 w-4" />
      case "Freigegeben":
        return <CheckCircle className="h-4 w-4" />
      case "Bezahlt":
        return <CheckCircle className="h-4 w-4" />
      case "Offen":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.claimId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.expert.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesType = typeFilter === "all" || report.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleExportAll = () => {
    // In real app, trigger export of all reports
    console.log("Exporting all reports...")
  }

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
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <Download className="h-4 w-4" />
              <span>Berichte</span>
            </Link>
            <Link
              href="/insurer/experts"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
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
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Berichte & Rechnungen</h1>
            <p className="text-slate-600">Verwalten und exportieren Sie Ihre Berichte und Rechnungen</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Filter & Suche</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Suche nach Bericht, Fall-ID oder Experte..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Status</SelectItem>
                    <SelectItem value="Entwurf">Entwurf</SelectItem>
                    <SelectItem value="Abgeschlossen">Abgeschlossen</SelectItem>
                    <SelectItem value="Freigegeben">Freigegeben</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Typ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Typen</SelectItem>
                    <SelectItem value="Gutachten">Gutachten</SelectItem>
                    <SelectItem value="Vorabschätzung">Vorabschätzung</SelectItem>
                    <SelectItem value="Abschlussbericht">Abschlussbericht</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Reports */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Berichte ({filteredReports.length})</CardTitle>
                    <CardDescription>Gutachten und Berichte von Experten</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                            {getStatusIcon(report.status)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-slate-800">{report.name}</h3>
                              <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                            </div>
                            <p className="text-sm text-slate-600">
                              {report.type} • Fall: {report.claimId}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {report.created}
                        </div>
                        <div>Experte: {report.expert}</div>
                        <div>
                          {report.size} • {report.format}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Anzeigen
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredReports.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Keine Berichte gefunden</h3>
                    <p className="text-slate-600">
                      Es wurden keine Berichte gefunden, die Ihren Suchkriterien entsprechen.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Invoices */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Rechnungen ({invoices.length})</CardTitle>
                    <CardDescription>Expertenrechnungen und Zahlungen</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            {getStatusIcon(invoice.status)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-slate-800">Rechnung {invoice.number}</h3>
                              <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                            </div>
                            <p className="text-sm text-slate-600">
                              Fall: {invoice.claimId} • {invoice.expert}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-800">{invoice.amount}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Erstellt: {invoice.created}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Fällig: {invoice.due}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Anzeigen
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
