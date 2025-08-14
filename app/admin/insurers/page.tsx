"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/shared/page-header"
import Link from "next/link"
import {
  Plus,
  Building,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  Home,
  FileText,
  Briefcase,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  Eye,
  DollarSign,
  Building2,
} from "lucide-react"

export default function AdminInsurersPage() {
  const [insurers, setInsurers] = useState([
    {
      id: "INS-2024-001",
      name: "Zurich Insurance",
      contact: "Hans Müller",
      email: "contact@zurich.ch",
      phone: "+41 44 628 25 25",
      location: "Zürich",
      status: "Aktiv",
      activeCases: 15,
      totalCases: 142,
      avgAmount: "CHF 18,500",
    },
    {
      id: "INS-2024-002",
      name: "AXA Switzerland",
      contact: "Maria Weber",
      email: "info@axa.ch",
      phone: "+41 58 215 91 11",
      location: "Winterthur",
      status: "Aktiv",
      activeCases: 8,
      totalCases: 89,
      avgAmount: "CHF 22,100",
    },
    {
      id: "INS-2024-003",
      name: "Swiss Re",
      contact: "Peter Schmidt",
      email: "contact@swissre.com",
      phone: "+41 43 285 21 21",
      location: "Zürich",
      status: "Aktiv",
      activeCases: 12,
      totalCases: 67,
      avgAmount: "CHF 31,200",
    },
    {
      id: "INS-2024-004",
      name: "Baloise",
      contact: "Anna Fischer",
      email: "info@baloise.ch",
      phone: "+41 58 285 85 85",
      location: "Basel",
      status: "Inaktiv",
      activeCases: 0,
      totalCases: 23,
      avgAmount: "CHF 15,800",
    },
  ])

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
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Users className="h-4 w-4" />
              <span>Experten</span>
            </Link>
            <Link
              href="/admin/insurers"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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

        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Versicherer</h1>
                <p className="text-gray-600">Verwalten Sie Partnerschaften und Einstellungen von Versicherungsunternehmen.</p>
              </div>
              <Link href="/admin/insurers/new">
                <Button className="bg-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Neuer Versicherer
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Versicherer Gesamt</p>
                      <p className="text-2xl font-bold text-gray-900">{insurers.length}</p>
                    </div>
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Aktive Versicherer</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {insurers.filter((i) => i.status === "Aktiv").length}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Durchschnittlicher Umsatz</p>
                      <p className="text-2xl font-bold text-gray-900">
                        CHF 19,750
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Durchschnittlicher Gewinn</p>
                      <p className="text-2xl font-bold text-gray-900">
                        CHF 5,125
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Alle Versicherer</CardTitle>
                <CardDescription>Übersicht über alle Versicherungspartner</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Versicherer</TableHead>
                      <TableHead>Kontakt</TableHead>
                      <TableHead>Standort</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aktive Fälle</TableHead>
                      <TableHead>Fälle Gesamt</TableHead>
                      <TableHead>Umsatz</TableHead>
                      <TableHead>Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insurers.map((insurer) => (
                      <TableRow key={insurer.id}>
                        <TableCell>
                          <div>
                            <Link
                              href={`/dashboard/admin/insurers/${insurer.id}`}
                              className="font-medium hover:text-teal-600"
                            >
                              {insurer.name}
                            </Link>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {insurer.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {insurer.phone}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{insurer.contact}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {insurer.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              insurer.status === "Aktiv" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {insurer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{insurer.activeCases}</TableCell>
                        <TableCell>{insurer.totalCases}</TableCell>
                        <TableCell className="font-medium">{insurer.avgAmount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/insurers/${insurer.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
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
