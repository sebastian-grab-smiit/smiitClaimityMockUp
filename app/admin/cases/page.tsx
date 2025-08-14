"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Eye, Clock, Building, User, BarChart3, Building2, DollarSign, FileText, MessageSquare, Settings, Users, LucideMap, File } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import Link from "next/link"

export default function AdminAllCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const cases = [
    {
      id: "CLM-2024-001",
      insurer: "Zurich Insurance",
      expert: "Dr. Hans Weber",
      expertLocation: "Zürich",
      status: "In Bearbeitung",
      type: "Wasserschaden",
      amount: "CHF 15,000",
      created: "2024-01-15",
      deadline: "2024-02-15",
      slaStatus: "In Ordnung",
    },
    {
      id: "CLM-2024-002",
      insurer: "AXA Switzerland",
      expert: "Maria Schneider",
      expertLocation: "Basel",
      status: "Review Offen",
      type: "Feuerschaden",
      amount: "CHF 45,000",
      created: "2024-01-18",
      deadline: "2024-02-18",
      slaStatus: "Kritisch",
    },
    {
      id: "CLM-2024-003",
      insurer: "Swiss Re",
      expert: "Peter Müller",
      expertLocation: "Bern",
      status: "Abgeschlossen",
      type: "Sturmschaden",
      amount: "CHF 8,500",
      created: "2024-01-10",
      deadline: "2024-02-10",
      slaStatus: "Abgeschlossen",
    },
    {
      id: "CLM-2024-004",
      insurer: "Baloise",
      expert: "Anna Fischer",
      expertLocation: "Genf",
      status: "Neu",
      type: "Diebstahl",
      amount: "CHF 12,000",
      created: "2024-01-20",
      deadline: "2024-02-20",
      slaStatus: "Überfällig",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Neu":
        return "bg-blue-100 text-blue-800"
      case "In Bearbeitung":
        return "bg-yellow-100 text-yellow-800"
      case "Review Offen":
        return "bg-orange-100 text-orange-800"
      case "Abgeschlossen":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSlaColor = (sla: string) => {
    switch (sla) {
      case "In Ordnung":
        return "bg-green-100 text-green-800"
      case "Kritisch":
        return "bg-yellow-100 text-yellow-800"
      case "Überfällig":
        return "bg-red-100 text-red-800"
      case "Abgeschlossen":
        return "bg-gray-100 text-gray-800"
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
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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
              href="/admin/communications"
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Alle Fälle</h1>
                <p className="text-gray-600">Übersicht über alle Fälle mit Verlauf und Status</p>
              </div>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Fälle suchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle Status</SelectItem>
                        <SelectItem value="neu">Neu</SelectItem>
                        <SelectItem value="in-bearbeitung">In Bearbeitung</SelectItem>
                        <SelectItem value="review-offen">Review Offen</SelectItem>
                        <SelectItem value="abgeschlossen">Abgeschlossen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fall ID</TableHead>
                      <TableHead>Versicherer</TableHead>
                      <TableHead>Experte</TableHead>
                      <TableHead>Ort</TableHead>
                      <TableHead>Typ</TableHead>
                      <TableHead>Betrag</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>SLA</TableHead>
                      <TableHead>Erstellt</TableHead>
                      <TableHead>Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cases.map((case_) => (
                      <TableRow key={case_.id}>
                        <TableCell className="font-medium">{case_.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            {case_.insurer}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            {case_.expert}
                          </div>
                        </TableCell>
                        <TableCell>{case_.expertLocation}</TableCell>
                        <TableCell>{case_.type}</TableCell>
                        <TableCell className="font-medium">{case_.amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSlaColor(case_.slaStatus)}>
                            <Clock className="h-3 w-3 mr-1" />
                            {case_.slaStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{case_.created}</TableCell>
                          <TableCell>
                            <Link href={`/admin/cases/${case_.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
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
