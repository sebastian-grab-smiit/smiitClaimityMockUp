"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText, Clock, Calendar, Timer, Save, BarChart3, Upload, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function TimeTrackingPage() {
  const [selectedCase, setSelectedCase] = useState("")
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [workType, setWorkType] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [expenses, setExpenses] = useState("")

  // Mock data for available cases
  const availableCases = [
    { id: "CLM-2024-045", title: "BMW X5 Kollisionsschaden", status: "In Bearbeitung" },
    { id: "CLM-2024-046", title: "Wasserschaden Erdgeschoss", status: "In Bearbeitung" },
    { id: "CLM-2024-044", title: "CNC-Maschine Defekt", status: "Akzeptiert" },
  ]

  const workTypes = [
    "Besichtigung vor Ort",
    "Dokumentation",
    "Gutachtenerstellung",
    "Recherche",
    "Telefonate",
    "Vorbereitung",
    "Nachbearbeitung",
    "Fahrtzeit",
    "Sonstiges",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("[v0] Time entry submitted:", {
      selectedCase,
      hours,
      minutes,
      workType,
      description,
      date,
      expenses,
    })

    // Reset form
    setSelectedCase("")
    setHours("")
    setMinutes("")
    setWorkType("")
    setDescription("")
    setExpenses("")
  }

  const totalTime =
    hours && minutes ? `${hours}h ${minutes}min` : hours ? `${hours}h` : minutes ? `${minutes}min` : "0h"
  const hourlyRate = 120
  const estimatedAmount = hours
    ? Number.parseFloat(hours) * hourlyRate + (minutes ? (Number.parseFloat(minutes) / 60) * hourlyRate : 0)
    : 0

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="expert-appraiser" userName="Dr. Hans Müller" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link
              href="/expert"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/expert/assignments"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Clock className="h-4 w-4" />
              <span>Zuweisungen</span>
              <Badge className="bg-yellow-500 text-white text-xs">3</Badge>
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
              href="/expert/time-tracking"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <Timer className="h-4 w-4" />
              <span>Zeiterfassung</span>
            </Link>
            <Link
              href="/expert/notifications"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              <Badge className="bg-red-500 text-white text-xs">2</Badge>
            </Link>
            <Link
              href="/expert/settings"
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
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Zeiterfassung</h1>
                    <p className="text-gray-600">Erfassen Sie Ihre Arbeitszeit für einen Fall</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Time Entry Form */}
                <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                    <CardTitle className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        Zeit erfassen
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Case Selection */}
                        <div className="space-y-2">
                        <Label htmlFor="case">Fall auswählen *</Label>
                        <Select value={selectedCase} onValueChange={setSelectedCase} required>
                            <SelectTrigger>
                            <SelectValue placeholder="Wählen Sie einen Fall aus..." />
                            </SelectTrigger>
                            <SelectContent>
                            {availableCases.map((case_) => (
                                <SelectItem key={case_.id} value={case_.id}>
                                <div className="flex items-center justify-between w-full">
                                    <span>
                                    {case_.id} - {case_.title}
                                    </span>
                                    <Badge
                                    className={`ml-2 ${
                                        case_.status === "In Bearbeitung"
                                        ? "bg-blue-100 text-blue-800"
                                        : case_.status === "Akzeptiert"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}
                                    >
                                    {case_.status}
                                    </Badge>
                                </div>
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                        <Label htmlFor="date">Datum *</Label>
                        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>

                        {/* Time Input */}
                        <div className="space-y-2">
                        <Label>Arbeitszeit *</Label>
                        <div className="flex space-x-2">
                            <div className="flex-1">
                            <Label htmlFor="hours" className="text-sm text-slate-600">
                                Stunden
                            </Label>
                            <Input
                                id="hours"
                                type="number"
                                min="0"
                                max="24"
                                step="1"
                                placeholder="0"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                            />
                            </div>
                            <div className="flex-1">
                            <Label htmlFor="minutes" className="text-sm text-slate-600">
                                Minuten
                            </Label>
                            <Input
                                id="minutes"
                                type="number"
                                min="0"
                                max="60"
                                step="1"
                                placeholder="0"
                                value={minutes}
                                onChange={(e) => setMinutes(e.target.value)}
                            />
                            </div>
                        </div>
                        </div>

                        {/* Work Type */}
                        <div className="space-y-2">
                        <Label htmlFor="workType">Tätigkeitsart *</Label>
                        <Select value={workType} onValueChange={setWorkType} required>
                            <SelectTrigger>
                            <SelectValue placeholder="Wählen Sie eine Tätigkeitsart..." />
                            </SelectTrigger>
                            <SelectContent>
                            {workTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                {type}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                        <Label htmlFor="description">Beschreibung *</Label>
                        <Textarea
                            id="description"
                            placeholder="Beschreiben Sie Ihre Tätigkeiten..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            required
                        />
                        </div>

                        <Button type="submit" className="w-full bg-primary">
                        <Save className="h-4 w-4 mr-2" />
                        Zeit erfassen
                        </Button>
                    </form>
                    </CardContent>
                </Card>
                </div>

                {/* Summary Sidebar */}
                <div className="space-y-6">
                {/* Time Summary */}
                <Card>
                    <CardHeader>
                    <CardTitle className="text-lg">Zusammenfassung</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Arbeitszeit:</span>
                        <span className="font-semibold">{totalTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Stundensatz:</span>
                        <span className="font-semibold">CHF {hourlyRate}/h</span>
                    </div>
                    <hr />
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Geschätzt:</span>
                        <span className="font-bold text-lg">
                        CHF {(estimatedAmount + Number.parseFloat(expenses || "0")).toFixed(2)}
                        </span>
                    </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                    <CardTitle className="text-lg">Schnellzugriff</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/expert/cases">
                        <FileText className="h-4 w-4 mr-2" />
                        Meine Fälle
                        </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/expert/reports">
                        <Upload className="h-4 w-4 mr-2" />
                        Berichte
                        </Link>
                    </Button>
                    </CardContent>
                </Card>
                </div>
            </div>
        </main>
      </div>
    </div>
  )
}
