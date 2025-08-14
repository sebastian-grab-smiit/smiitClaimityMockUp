"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Upload, Zap, ArrowRight, Settings, Users, MessageSquare, FileText, BarChart3, Plus } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { Badge } from "@/components/ui/badge"

export default function NewClaimSelectionPage() {
  const options = [
    {
      id: "manual",
      title: "Manuell erfassen",
      description: "Schadenfall Schritt für Schritt manuell eingeben",
      icon: FileText,
      href: "/insurer/claims/new/manual",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      recommended: false,
    },
    {
      id: "api",
      title: "API Import",
      description: "Daten aus einem anderen System importieren",
      icon: Zap,
      href: "/insurer/claims/new/api",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      recommended: false,
    },
    {
      id: "pdf",
      title: "PDF Upload mit OCR",
      description: "PDF-Dokument hochladen und automatisch auslesen",
      icon: Upload,
      href: "/insurer/claims/new/pdf",
      color: "bg-teal-500",
      hoverColor: "hover:bg-teal-600",
      recommended: true,
    },
  ]

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
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
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

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-slate-800 mb-4">Neuen Fall erstellen</h1>
              <p className="text-lg text-slate-600">Wählen Sie aus, wie Sie Ihren neuen Schadenfall erfassen möchten</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {options.map((option) => {
                const IconComponent = option.icon
                return (
                  <Card key={option.id} className="relative hover:shadow-lg transition-shadow">
                    {option.recommended && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">Empfohlen</span>
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{option.title}</CardTitle>
                      <CardDescription className="text-base">{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button asChild className={`w-full ${option.color} ${option.hoverColor} text-white`}>
                        <Link href={option.href} className="flex items-center justify-center">
                          Auswählen
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mt-12 bg-white rounded-lg p-6 border">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Welche Option ist die richtige für Sie?</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h3 className="font-medium text-slate-800 mb-2">📝 Manuell erfassen</h3>
                  <p className="text-gray-600">
                    Ideal für einfache Fälle oder wenn Sie alle Details selbst eingeben möchten. Vollständige Kontrolle über
                    alle Eingaben.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-slate-800 mb-2">⚡ API Import</h3>
                  <p className="text-gray-600">
                    Perfekt wenn Sie bereits ein System haben, das Schadensdaten verwaltet. Schneller Import grosser
                    Datenmengen.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-slate-800 mb-2">📄 PDF Upload mit OCR</h3>
                  <p className="text-gray-600">
                    Zeitersparend bei vorhandenen PDF-Dokumenten. Automatische Texterkennung und intelligente
                    Felderzuordnung.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
