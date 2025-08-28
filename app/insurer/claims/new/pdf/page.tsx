"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, MessageSquare, AlertCircle, RefreshCw, Eye, Edit3, Download, BarChart3, Users, Settings, Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import Link from "next/link"

export default function PdfUploadPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [extractedData, setExtractedData] = useState<any>(null)
  const [confidence, setConfidence] = useState(0)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setUploadedFile(file)
    }
  }

  const handleProcess = async () => {
    if (!uploadedFile) return

    setIsProcessing(true)
    // Simulate OCR processing
    setTimeout(() => {
      setIsProcessed(true)
      setIsProcessing(false)
      setConfidence(87)
      setExtractedData({
        policyNumber: "POL-2024-456789",
        claimType: "Fahrzeugschaden",
        incidentDate: "2024-01-20",
        address: "Bahnhofstrasse 15",
        city: "Zürich",
        postalCode: "8001",
        canton: "ZH",
        damageDescription:
          "Kollision mit anderem Fahrzeug an der Kreuzung. Schäden an der Frontpartie und am rechten Kotflügel.",
        estimatedAmount: "8500",
      })
    }, 3000)
  }

  const handleCreateClaim = () => {
    // Navigate to manual form with pre-filled data
    console.log("Creating claim with extracted data:", extractedData)
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
              <Upload className="h-16 w-16 text-teal-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-slate-800 mb-4">PDF Upload mit OCR</h1>
              <p className="text-lg text-slate-600">
                Laden Sie ein PDF-Dokument hoch und lassen Sie die Daten automatisch extrahieren
              </p>
            </div>

            {!uploadedFile ? (
              <Card>
                <CardHeader>
                  <CardTitle>PDF-Dokument hochladen</CardTitle>
                  <CardDescription>Unterstützte Formate: PDF (max. 10MB)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
                    <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">PDF-Datei auswählen</h3>
                    <p className="text-slate-600 mb-6">Ziehen Sie eine PDF-Datei hierher oder klicken Sie zum Auswählen</p>
                    <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" id="pdf-upload" />
                    <Button asChild variant="outline" size="lg">
                      <label htmlFor="pdf-upload" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        PDF auswählen
                      </label>
                    </Button>
                  </div>

                  <Alert className="mt-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Tipp:</strong> Für beste Ergebnisse verwenden Sie klare, gut lesbare PDF-Dokumente mit
                      strukturierten Schadensmeldungen oder Polizeiprotokollen.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ) : !isProcessed ? (
              <Card>
                <CardHeader>
                  <CardTitle>Dokument verarbeiten</CardTitle>
                  <CardDescription>Bereit zur OCR-Verarbeitung</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                    <FileText className="h-8 w-8 text-slate-600" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{uploadedFile.name}</p>
                      <p className="text-sm text-slate-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button variant="ghost" onClick={() => setUploadedFile(null)}>
                      Ändern
                    </Button>
                  </div>

                  <Alert>
                    <Eye className="h-4 w-4" />
                    <AlertDescription>
                      Das Dokument wird mit OCR-Technologie analysiert und relevante Schadensdaten automatisch extrahiert.
                      Dieser Vorgang dauert normalerweise 30-60 Sekunden.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleProcess}
                    disabled={isProcessing}
                    className="w-full bg-teal-500 hover:bg-teal-600"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Dokument wird verarbeitet...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        OCR-Verarbeitung starten
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>OCR-Verarbeitung abgeschlossen! Erkennungsgenauigkeit: {confidence}%</AlertDescription>
                </Alert>

                <Card>
                  <CardHeader>
                    <CardTitle>Extrahierte Daten</CardTitle>
                    <CardDescription>Überprüfen und bearbeiten Sie die automatisch erkannten Daten</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800">Grunddaten</h3>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label>Schadensnummer</Label>
                            <div className="flex items-center space-x-2">
                              <Input value={extractedData.policyNumber} readOnly />
                              <Badge variant={confidence > 90 ? "default" : "secondary"}>
                                {confidence > 90 ? "Hoch" : "Mittel"}
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Schadenart</Label>
                            <Input value={extractedData.claimType} readOnly />
                          </div>
                          <div className="space-y-2">
                            <Label>Schadensdatum</Label>
                            <Input value={extractedData.incidentDate} readOnly />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800">Ort</h3>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label>Adresse</Label>
                            <Input value={extractedData.address} readOnly />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label>PLZ</Label>
                              <Input value={extractedData.postalCode} readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label>Ort</Label>
                              <Input value={extractedData.city} readOnly />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">Schadendetails</h3>
                      <div className="space-y-2">
                        <Label>Beschreibung</Label>
                        <div className="mt-1 p-3 bg-slate-50 rounded-lg text-sm">{extractedData.damageDescription}</div>
                      </div>
                      <div className="space-y-2">
                        <Label>Geschätzte Summe</Label>
                        <Input value={`CHF ${extractedData.estimatedAmount}`} readOnly />
                      </div>
                    </div>

                    <div className="flex justify-between pt-6 border-t">
                      <Button variant="outline" onClick={() => setIsProcessed(false)}>
                        Neues Dokument
                      </Button>
                      <div className="space-x-2">
                        <Button variant="outline">
                          <Edit3 className="mr-2 h-4 w-4" />
                          Daten bearbeiten
                        </Button>
                        <Button onClick={handleCreateClaim} className="bg-teal-500 hover:bg-teal-600">
                          Fall erstellen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
