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
} from "lucide-react"

export default function AdminInsurersPage() {
  const [insurers, setInsurers] = useState([
    {
      id: 1,
      name: "Zurich Insurance",
      contact: "Hans Müller",
      email: "contact@zurich.ch",
      phone: "+41 44 628 25 25",
      location: "Zürich",
      status: "Active",
      activeCases: 15,
      totalCases: 142,
      avgAmount: "CHF 18,500",
    },
    {
      id: 2,
      name: "AXA Switzerland",
      contact: "Maria Weber",
      email: "info@axa.ch",
      phone: "+41 58 215 91 11",
      location: "Winterthur",
      status: "Active",
      activeCases: 8,
      totalCases: 89,
      avgAmount: "CHF 22,100",
    },
    {
      id: 3,
      name: "Swiss Re",
      contact: "Peter Schmidt",
      email: "contact@swissre.com",
      phone: "+41 43 285 21 21",
      location: "Zürich",
      status: "Active",
      activeCases: 12,
      totalCases: 67,
      avgAmount: "CHF 31,200",
    },
    {
      id: 4,
      name: "Baloise",
      contact: "Anna Fischer",
      email: "info@baloise.ch",
      phone: "+41 58 285 85 85",
      location: "Basel",
      status: "Inactive",
      activeCases: 0,
      totalCases: 23,
      avgAmount: "CHF 15,800",
    },
  ])

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader userType="admin" />

      <div className="flex">
        <aside className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-xl font-bold text-slate-800">Admin Portal</span>
              </div>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                <Link
                  href="/dashboard/admin"
                  className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Home className="text-slate-400 mr-3 h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/admin/triage"
                  className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <FileText className="text-slate-400 mr-3 h-5 w-5" />
                  Triage
                </Link>
                <Link
                  href="/dashboard/admin/assignment"
                  className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Users className="text-slate-400 mr-3 h-5 w-5" />
                  Assignment
                </Link>
                <Link
                  href="/dashboard/admin/cases"
                  className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Briefcase className="text-slate-400 mr-3 h-5 w-5" />
                  All Cases
                </Link>
                <Link
                  href="/dashboard/admin/reports"
                  className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <BarChart3 className="text-slate-400 mr-3 h-5 w-5" />
                  Reports
                </Link>
                <Link
                  href="/dashboard/admin/invoicing"
                  className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <FileText className="text-slate-400 mr-3 h-5 w-5" />
                  Invoicing
                </Link>
                <Link
                  href="/dashboard/admin/experts"
                  className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Users className="text-slate-400 mr-3 h-5 w-5" />
                  Experts
                </Link>
                <Link
                  href="/dashboard/admin/insurers"
                  className="bg-red-50 border-r-4 border-red-500 text-red-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Building className="text-red-500 mr-3 h-5 w-5" />
                  Insurers
                </Link>
                <Link
                  href="/dashboard/admin/communications"
                  className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <MessageSquare className="text-slate-400 mr-3 h-5 w-5" />
                  Communications
                </Link>
                <Link
                  href="/dashboard/admin/email-intake"
                  className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Mail className="text-slate-400 mr-3 h-5 w-5" />
                  Email Intake
                </Link>
                <Link
                  href="/dashboard/admin/notifications"
                  className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Bell className="text-slate-400 mr-3 h-5 w-5" />
                  Notifications
                </Link>
                <Link
                  href="/dashboard/admin/settings"
                  className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Settings className="text-slate-400 mr-3 h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Insurer Management</h1>
                <p className="text-gray-600">Manage insurance company partnerships and settings</p>
              </div>
              <Link href="/dashboard/admin/insurers/new">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Insurer
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Insurers</p>
                      <p className="text-2xl font-bold text-gray-900">{insurers.length}</p>
                    </div>
                    <Building className="h-8 w-8 text-teal-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Insurers</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {insurers.filter((i) => i.status === "Active").length}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Cases</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {insurers.reduce((sum, i) => sum + i.totalCases, 0)}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Cases</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {insurers.reduce((sum, i) => sum + i.activeCases, 0)}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Insurance Companies</CardTitle>
                <CardDescription>Manage partnerships and company settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Active Cases</TableHead>
                      <TableHead>Total Cases</TableHead>
                      <TableHead>Avg Amount</TableHead>
                      <TableHead>Actions</TableHead>
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
                              insurer.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
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
                            <Link href={`/dashboard/admin/insurers/${insurer.id}`}>
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
