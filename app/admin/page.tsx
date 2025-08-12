"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Clock,
  Users,
  MapPin,
  Settings,
  BarChart3,
  FileText,
  DollarSign,
  TrendingUp,
  Calendar,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Mock data
  const stats = [
    { title: "Offene Fälle", value: "47", icon: FileText, color: "bg-blue-500", trend: "+12%" },
    { title: "Engpässe", value: "8", icon: AlertTriangle, color: "bg-red-500", trend: "-5%" },
    { title: "SLA Verletzungen", value: "3", icon: Clock, color: "bg-yellow-500", trend: "+2%" },
    { title: "Aktive Experten", value: "156", icon: Users, color: "bg-green-500", trend: "+8%" },
  ]

  const incomingCases = [
    {
      id: "CLM-2024-048",
      insurer: "Helvetia Versicherung",
      type: "Fahrzeugschaden",
      priority: "Hoch",
      amount: "CHF 15,000",
      location: "Zürich",
      received: "Vor 15 Min",
      status: "Triage",
    },
    {
      id: "CLM-2024-049",
      insurer: "AXA Schweiz",
      type: "Gebäudeschaden",
      priority: "Mittel",
      amount: "CHF 45,000",
      location: "Basel",
      received: "Vor 32 Min",
      status: "Validierung",
    },
    {
      id: "CLM-2024-050",
      insurer: "Zurich Insurance",
      type: "Wasserschaden",
      priority: "Niedrig",
      amount: "CHF 8,500",
      location: "Bern",
      received: "Vor 1 Std",
      status: "Bereit",
    },
  ]

  const expertAssignments = [
    {
      expert: "Dr. Hans Müller",
      location: "Zürich",
      specialty: "KFZ-Gutachten",
      activeCases: 5,
      availability: "Verfügbar",
      rating: 4.8,
    },
    {
      expert: "Maria Weber",
      location: "Basel",
      specialty: "Gebäudeschäden",
      activeCases: 3,
      availability: "Beschäftigt",
      rating: 4.9,
    },
    {
      expert: "Thomas Schneider",
      location: "Bern",
      specialty: "Wasserschäden",
      activeCases: 2,
      availability: "Verfügbar",
      rating: 4.7,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Hoch":
        return "bg-red-100 text-red-800"
      case "Mittel":
        return "bg-yellow-100 text-yellow-800"
      case "Niedrig":
        return "bg-green-100 text-green-800"
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

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader userType="admin" />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen">
          <nav className="p-4 space-y-2">
            <Link
              href="/admin"
              className="flex items-center space-x-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/triage"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Triage</span>
            </Link>
            <Link
              href="/admin/assignment"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Users className="h-4 w-4" />
              <span>Zuweisung</span>
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Berichte</span>
            </Link>
            <Link
              href="/admin/invoicing"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <DollarSign className="h-4 w-4" />
              <span>Rechnungen</span>
            </Link>
            <Link
              href="/admin/experts"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Users className="h-4 w-4" />
              <span>Experten</span>
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
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Globale Übersicht und Fallmanagement</p>
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
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">{stat.trend}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Incoming Cases */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                      Eingehende Fälle (Triage)
                    </CardTitle>
                    <CardDescription>Neue Fälle zur Überprüfung und Priorisierung</CardDescription>
                  </div>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    Alle anzeigen
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incomingCases.map((case_) => (
                    <div
                      key={case_.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-sm text-slate-800">{case_.id}</h4>
                            <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                          </div>
                          <p className="text-xs text-slate-600">
                            {case_.insurer} • {case_.type}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {case_.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {case_.received}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-800">{case_.amount}</p>
                        <Button variant="ghost" size="sm" className="mt-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Prüfen
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expert Assignment Board */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-teal-600" />
                      Expertenzuweisung
                    </CardTitle>
                    <CardDescription>Verfügbare Experten und aktuelle Auslastung</CardDescription>
                  </div>
                  <Button size="sm" className="">
                    Zuweisen
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expertAssignments.map((expert, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                          <Users className="h-4 w-4 text-teal-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-sm text-slate-800">{expert.expert}</h4>
                            <Badge className={getAvailabilityColor(expert.availability)}>{expert.availability}</Badge>
                          </div>
                          <p className="text-xs text-slate-600">{expert.specialty}</p>
                          <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {expert.location}
                            </span>
                            <span>★ {expert.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-800">{expert.activeCases} Fälle</p>
                        <Button variant="ghost" size="sm" className="mt-1">
                          Zuweisen
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SLA Monitor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                SLA-Monitor & Dunning Heatmap
              </CardTitle>
              <CardDescription>Überwachung von Bearbeitungszeiten und kritischen Fällen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">92%</div>
                  <div className="text-sm text-green-700">SLA eingehalten</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">5</div>
                  <div className="text-sm text-yellow-700">Kritische Fälle</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-sm text-red-700">Überfällige Fälle</div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Detaillierte Analyse
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
