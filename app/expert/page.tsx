"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Clock,
  CheckCircle,
  Camera,
  Upload,
  MessageSquare,
  Settings,
  BarChart3,
  Calendar,
  MapPin,
  DollarSign,
  Timer,
  Star,
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function ExpertDashboard() {
  const [activeTab, setActiveTab] = useState("assigned")

  // Mock data
  const stats = [
    { title: "Zugewiesene Fälle", value: "5", icon: FileText, color: "bg-blue-500" },
    { title: "Heute fällig", value: "2", icon: Clock, color: "bg-yellow-500" },
    { title: "Abgeschlossen", value: "23", icon: CheckCircle, color: "bg-green-500" },
    { title: "Bewertung", value: "4.8", icon: Star, color: "bg-purple-500" },
  ]

  const assignedCases = [
    {
      id: "CLM-2024-045",
      insurer: "Helvetia Versicherung",
      type: "Fahrzeugschaden",
      location: "Zürich, Bahnhofstrasse 15",
      deadline: "18.01.2024",
      amount: "CHF 12,000",
      status: "Akzeptiert",
      priority: "Hoch",
      distance: "2.5 km",
    },
    {
      id: "CLM-2024-046",
      insurer: "AXA Schweiz",
      type: "Gebäudeschaden",
      location: "Zürich, Limmatquai 8",
      deadline: "20.01.2024",
      amount: "CHF 8,500",
      status: "In Bearbeitung",
      priority: "Mittel",
      distance: "1.8 km",
    },
  ]

  const recentReports = [
    {
      id: "CLM-2024-042",
      type: "Fahrzeugschaden",
      submitted: "14.01.2024",
      status: "Genehmigt",
      amount: "CHF 5,200",
    },
    {
      id: "CLM-2024-041",
      type: "Wasserschaden",
      submitted: "12.01.2024",
      status: "Überprüfung",
      amount: "CHF 3,800",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Akzeptiert":
        return "bg-blue-100 text-blue-800"
      case "In Bearbeitung":
        return "bg-yellow-100 text-yellow-800"
      case "Abgeschlossen":
        return "bg-green-100 text-green-800"
      case "Genehmigt":
        return "bg-green-100 text-green-800"
      case "Überprüfung":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader userType="expert" userName="Dr. Hans Müller" />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen">
          <nav className="p-4 space-y-2">
            <Link
              href="/expert"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/expert/cases"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Meine Fälle</span>
            </Link>
            <Link
              href="/expert/reports"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Upload className="h-4 w-4" />
              <span>Berichte</span>
            </Link>
            <Link
              href="/expert/calendar"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Calendar className="h-4 w-4" />
              <span>Kalender</span>
            </Link>
            <Link
              href="/expert/profile"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span>Profil</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Experten Dashboard</h1>
            <p className="text-slate-600">Ihre zugewiesenen Fälle und Termine im Überblick</p>
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
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-blue-600" />
                  Schnellaktionen
                </CardTitle>
                <CardDescription>Häufig verwendete Funktionen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Fotos aufnehmen
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Timer className="h-4 w-4 mr-2" />
                  Zeit erfassen
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Bericht hochladen
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Nachricht senden
                </Button>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Heutiger Terminplan
                </CardTitle>
                <CardDescription>Ihre Termine für heute</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">09:00 - Besichtigung</p>
                      <p className="text-xs text-slate-600">CLM-2024-045, Bahnhofstrasse</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">14:00 - Gutachten</p>
                      <p className="text-xs text-slate-600">CLM-2024-046, Limmatquai</p>
                    </div>
                  </div>
                  <div className="text-center pt-2">
                    <Link href="/expert/calendar">
                      <Button variant="ghost" size="sm">
                        Vollständiger Kalender
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time & Fees */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-purple-600" />
                  Zeit & Honorar
                </CardTitle>
                <CardDescription>Aktuelle Zeiterfassung</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">6.5h</div>
                    <div className="text-sm text-slate-600">Heute erfasst</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CLM-2024-045</span>
                      <span>3.5h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>CLM-2024-046</span>
                      <span>3.0h</span>
                    </div>
                  </div>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">Zeit erfassen</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assigned Cases */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Zugewiesene Fälle</CardTitle>
                  <CardDescription>Ihre aktuellen Aufträge und Deadlines</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant={activeTab === "assigned" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("assigned")}
                  >
                    Zugewiesen
                  </Button>
                  <Button
                    variant={activeTab === "completed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("completed")}
                  >
                    Abgeschlossen
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === "assigned" && (
                <div className="space-y-4">
                  {assignedCases.map((case_) => (
                    <div key={case_.id} className="border rounded-lg p-4 hover:bg-slate-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-slate-800">{case_.id}</h3>
                            <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                            <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            {case_.insurer} • {case_.type}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-800">{case_.amount}</p>
                          <p className="text-xs text-slate-500">Fällig: {case_.deadline}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {case_.location}
                          </span>
                          <span className="text-green-600">{case_.distance}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                          <Button size="sm" className="">
                            Bearbeiten
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "completed" && (
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4 hover:bg-slate-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-slate-800">{report.id}</h3>
                            <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            {report.type} • Eingereicht: {report.submitted}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-800">{report.amount}</p>
                          <Button variant="ghost" size="sm">
                            Bericht anzeigen
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
