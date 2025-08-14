"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Upload, ArrowLeft, ChevronLeft, ChevronRight, Plus, Clock, MapPin, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function ExpertCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      title: "Besichtigung CLM-2024-045",
      date: "2024-01-18",
      time: "09:00",
      duration: "2h",
      location: "Zürich, Bahnhofstrasse 15",
      type: "Vor-Ort-Termin",
      status: "Bestätigt",
      caseId: "CLM-2024-045",
    },
    {
      id: 2,
      title: "Gutachten CLM-2024-046",
      date: "2024-01-18",
      time: "14:00",
      duration: "3h",
      location: "Zürich, Limmatquai 8",
      type: "Vor-Ort-Termin",
      status: "Bestätigt",
      caseId: "CLM-2024-046",
    },
    {
      id: 3,
      title: "Bericht finalisieren",
      date: "2024-01-19",
      time: "10:00",
      duration: "2h",
      location: "Büro",
      type: "Büroarbeit",
      status: "Geplant",
      caseId: "CLM-2024-044",
    },
    {
      id: 4,
      title: "Telefontermin mit Versicherer",
      date: "2024-01-19",
      time: "15:30",
      duration: "30min",
      location: "Telefon",
      type: "Besprechung",
      status: "Bestätigt",
      caseId: "CLM-2024-045",
    },
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const getAppointmentsForDate = (date: string) => {
    return appointments.filter((apt) => apt.date === date)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("de-CH", {
      year: "numeric",
      month: "long",
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Bestätigt":
        return "bg-green-100 text-green-800"
      case "Geplant":
        return "bg-blue-100 text-blue-800"
      case "Verschoben":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Vor-Ort-Termin":
        return "bg-purple-100 text-purple-800"
      case "Büroarbeit":
        return "bg-blue-100 text-blue-800"
      case "Besprechung":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const days = getDaysInMonth(currentDate)
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="expert-vehicle" userName="Dr. Hans Müller" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link
              href="/expert/vehicle"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/expert/vehicle/cases"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Meine Fälle</span>
            </Link>
            <Link
              href="/expert/vehicle/reports"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Upload className="h-4 w-4" />
              <span>Berichte</span>
            </Link>
            <Link
              href="/expert/vehicle/calendar"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <Clock className="h-4 w-4" />
              <span>Kalender</span>
            </Link>
            <Link
              href="/expert/vehicle/notifications"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">{2}</Badge>}
            </Link>
            <Link
              href="/expert/vehicle/settings"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span>Profil</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Kalender & Verfügbarkeit</h1>
              <p className="text-slate-600">Termine und Verfügbarkeit verwalten</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant={view === "month" ? "default" : "outline"} size="sm" onClick={() => setView("month")}>
                  Monat
                </Button>
                <Button variant={view === "week" ? "default" : "outline"} size="sm" onClick={() => setView("week")}>
                  Woche
                </Button>
                <Button variant={view === "day" ? "default" : "outline"} size="sm" onClick={() => setView("day")}>
                  Tag
                </Button>
              </div>
              <Button className="">
                <Plus className="h-4 w-4 mr-2" />
                Termin hinzufügen
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">{formatDate(currentDate)}</h2>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                      Heute
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-slate-600">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} className="p-2 h-24"></div>
                    }

                    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                    const dayAppointments = getAppointmentsForDate(dateString)
                    const isToday = dateString === today

                    return (
                      <div
                        key={dateString}
                        className={`p-2 h-24 border border-slate-200 hover:bg-slate-50 cursor-pointer ${
                          isToday ? "bg-slate-50 border-primary" : ""
                        }`}
                      >
                        <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : "text-slate-800"}`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayAppointments.slice(0, 2).map((apt) => (
                            <div key={apt.id} className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate">
                              {apt.time} {apt.title}
                            </div>
                          ))}
                          {dayAppointments.length > 2 && (
                            <div className="text-xs text-slate-500">+{dayAppointments.length - 2} weitere</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Today's Appointments */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Heutige Termine</h3>
                <div className="space-y-3">
                  {appointments
                    .filter((apt) => apt.date === today)
                    .map((apt) => (
                      <div key={apt.id} className="p-3 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-800">{apt.time}</span>
                          <Badge className={getStatusColor(apt.status)}>
                            {apt.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-700 mb-1">{apt.title}</p>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>{apt.duration}</span>
                          <MapPin className="h-3 w-3" />
                          <span>{apt.location}</span>
                        </div>
                      </div>
                    ))}
                  {appointments.filter((apt) => apt.date === today).length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">Keine Termine heute</p>
                  )}
                </div>
              </div>

              {/* Availability Settings */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Verfügbarkeit</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Status</span>
                    <Badge className="bg-green-100 text-green-800">Verfügbar</Badge>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Arbeitszeiten</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="time"
                        defaultValue="08:00"
                        className="px-2 py-1 text-sm border border-slate-300 rounded"
                      />
                      <input
                        type="time"
                        defaultValue="17:00"
                        className="px-2 py-1 text-sm border border-slate-300 rounded"
                      />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Abwesenheit eintragen
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Statistiken</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Diese Woche</span>
                    <span className="font-medium">12 Termine</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Nächste Woche</span>
                    <span className="font-medium">8 Termine</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Auslastung</span>
                    <span className="font-medium text-green-600">75%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
