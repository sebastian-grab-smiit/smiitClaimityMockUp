"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload, X, ImageIcon, Video, AlertCircle, FileText, CheckCircle,
  Settings, Download, BarChart3, Plus, MessageSquare, UserCog
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

type Party = {
  name: string
  address: string
  postalCode: string
  city: string
  phone: string
}

export default function NewClaimPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    // Schritt 1: Grunddaten
    policyNumber: "",
    claimInsurance: "", // 'hp' | 'eig'
    claimType: "",      // 'gebaeude' | 'hausrat'
    insured: { name: "", address: "", postalCode: "", city: "", phone: "" } as Party,
    counterparty: { name: "", address: "", postalCode: "", city: "", phone: "" } as Party,

    // Schritt 2: Ort & Zeit
    address: "",
    postalCode: "",
    city: "",
    incidentDate: "",

    // Schritt 3: Schadendetails
    damageDescription: "",
    estimatedAmount: "",
    inspectionType: "",   // 'vorort' | 'kvp' | 'rechn'
    inspectionDate: "",

    // Schritt 4: Dokumente
    uploadedFiles: [] as File[],
  })

  const steps = [
    { number: 1, title: "Grunddaten", detail: "Grunddaten", description: "Schadensnummer, Sparte & Beteiligte" },
    { number: 2, title: "Ort & Zeit", detail: "Ort & Zeit", description: "Wo und wann?" },
    { number: 3, title: "Schadendetails", detail: "Schadendetails", description: "Beschreibung & Besichtigung" },
    { number: 4, title: "Dokumente", detail: "Dokumente", description: "Fotos & Unterlagen hochladen" },
    { number: 5, title: "Überprüfung", detail: "Überprüfung", description: "Alle Angaben kontrollieren" },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData((prev) => ({ ...prev, uploadedFiles: [...prev.uploadedFiles, ...files] }))
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
    }, 1200)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  const ReviewRow = ({ label, value }: { label: string; value?: React.ReactNode }) => (
    <div className="flex items-start justify-between gap-4 py-1">
      <span className="text-slate-600">{label}</span>
      <span className="font-medium text-right max-w-[60%] break-words">{value || <span className="text-slate-400">—</span>}</span>
    </div>
  )

  const isHaftpflicht = formData.claimInsurance === "hp"
  const inspectionParty: Party = isHaftpflicht ? formData.counterparty : formData.insured

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Fall erfolgreich erstellt!</h1>
            <p className="text-slate-600 mb-4">
              Ihr Schadenfall wurde erfolgreich eingereicht. Sie erhalten eine Bestätigung per E-Mail.
            </p>
            <div className="bg-slate-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-slate-600">Fall-Nummer:</p>
              <p className="font-bold text-lg">
                CLM-2024-{Math.floor(Math.random() * 1000).toString().padStart(3, "0")}
              </p>
            </div>
            <div className="space-y-2">
              <Button asChild className="w-full bg-primary">
                <Link href="/insurer">Zum Dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/insurer/claims/new">Weiteren Fall erstellen</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="insurer" userName="Helvetia Versicherung" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link href="/insurer" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/insurer/claims/new" className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg">
              <Plus className="h-4 w-4" />
              <span>Neuer Fall</span>
            </Link>
            <Link href="/insurer/claims" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <FileText className="h-4 w-4" />
              <span>Alle Fälle</span>
            </Link>
            <Link href="/insurer/reports" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Download className="h-4 w-4" />
              <span>Berichte</span>
            </Link>
            <Link href="/insurer/notifications" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">2</Badge>}
            </Link>
            <Link href="/insurer/settings" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Settings className="h-4 w-4" />
              <span>Einstellungen</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-10 text-center">
            <UserCog className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Sachverständiger</h1>
            <p className="text-lg text-slate-600">Tragen Sie Ihre Falldaten manuell ein</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between ml-15 mr-15">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-ml font-semibold ${
                      currentStep >= step.number ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-600"
                    }`}>
                      {step.number}
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-ml font-medium text-slate-800">{step.title}</p>
                      <p className="text-sm text-slate-500">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.number ? "bg-blue-500" : "bg-slate-200"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Schritt {currentStep}: {steps[currentStep - 1].detail}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Schritt 1: Grunddaten */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="policyNumber">Schadensnummer *</Label>
                      <Input
                        id="policyNumber"
                        placeholder="z. B. SCH-2025-123456"
                        value={formData.policyNumber}
                        onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sparte *</Label>
                      <Select
                        value={formData.claimInsurance}
                        onValueChange={(value) => setFormData({ ...formData, claimInsurance: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sparte auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hp">Haftpflicht</SelectItem>
                          <SelectItem value="eig">Eigenschaden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Schadensart *</Label>
                      <Select
                        value={formData.claimType}
                        onValueChange={(value) => setFormData({ ...formData, claimType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Schadensart auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gebaeude">Gebäude / Infrastruktur</SelectItem>
                          <SelectItem value="hausrat">Hausrat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Versicherungsnehmer */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">Angaben Versicherungsnehmer</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="insured-name">Name *</Label>
                          <Input
                            id="insured-name"
                            placeholder="Max Mustermann"
                            value={formData.insured.name}
                            onChange={(e) => setFormData({ ...formData, insured: { ...formData.insured, name: e.target.value } })}
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="insured-address">Adresse *</Label>
                          <Input
                            id="insured-address"
                            placeholder="Musterstr. 1"
                            value={formData.insured.address}
                            onChange={(e) => setFormData({ ...formData, insured: { ...formData.insured, address: e.target.value } })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="insured-postal">PLZ *</Label>
                          <Input
                            id="insured-postal"
                            placeholder="8000"
                            value={formData.insured.postalCode}
                            onChange={(e) => setFormData({ ...formData, insured: { ...formData.insured, postalCode: e.target.value } })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="insured-city">Ort *</Label>
                          <Input
                            id="insured-city"
                            placeholder="Zürich"
                            value={formData.insured.city}
                            onChange={(e) => setFormData({ ...formData, insured: { ...formData.insured, city: e.target.value } })}
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="insured-phone">Telefonnummer *</Label>
                          <Input
                            id="insured-phone"
                            placeholder="+41 79 123 45 67"
                            value={formData.insured.phone}
                            onChange={(e) => setFormData({ ...formData, insured: { ...formData.insured, phone: e.target.value } })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Gegenpartei (nur Haftpflicht) */}
                    {isHaftpflicht && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800">Angaben Gegenpartei</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="cp-name">Name *</Label>
                            <Input
                              id="cp-name"
                              placeholder="Vor- und Nachname / Firma"
                              value={formData.counterparty.name}
                              onChange={(e) => setFormData({ ...formData, counterparty: { ...formData.counterparty, name: e.target.value } })}
                              required
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="cp-address">Adresse *</Label>
                            <Input
                              id="cp-address"
                              placeholder="Strasse und Nr."
                              value={formData.counterparty.address}
                              onChange={(e) => setFormData({ ...formData, counterparty: { ...formData.counterparty, address: e.target.value } })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cp-postal">PLZ *</Label>
                            <Input
                              id="cp-postal"
                              placeholder="8000"
                              value={formData.counterparty.postalCode}
                              onChange={(e) => setFormData({ ...formData, counterparty: { ...formData.counterparty, postalCode: e.target.value } })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cp-city">Ort *</Label>
                            <Input
                              id="cp-city"
                              placeholder="Zürich"
                              value={formData.counterparty.city}
                              onChange={(e) => setFormData({ ...formData, counterparty: { ...formData.counterparty, city: e.target.value } })}
                              required
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="cp-phone">Telefonnummer *</Label>
                            <Input
                              id="cp-phone"
                              placeholder="+41 ..."
                              value={formData.counterparty.phone}
                              onChange={(e) => setFormData({ ...formData, counterparty: { ...formData.counterparty, phone: e.target.value } })}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Schritt 2: Ort & Zeit */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-3">
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        placeholder="Strasse und Hausnummer"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">PLZ *</Label>
                      <Input
                        id="postalCode"
                        placeholder="8000"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ort *</Label>
                      <Input
                        id="city"
                        placeholder="Zürich"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incidentDate">Schadensdatum *</Label>
                      <Input
                        id="incidentDate"
                        type="date"
                        value={formData.incidentDate}
                        onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Schritt 3: Schadendetails */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="damageDescription">Schadensbeschreibung *</Label>
                    <Textarea
                      id="damageDescription"
                      placeholder="Beschreiben Sie den Schaden detailliert..."
                      rows={5}
                      value={formData.damageDescription}
                      onChange={(e) => setFormData({ ...formData, damageDescription: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="estimatedAmount">Geschätzte Schadensumme (CHF)</Label>
                      <Input
                        id="estimatedAmount"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="0"
                        value={formData.estimatedAmount}
                        onChange={(e) => setFormData({ ...formData, estimatedAmount: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Besichtigungsart *</Label>
                      <Select
                        value={formData.inspectionType}
                        onValueChange={(value) => setFormData({ ...formData, inspectionType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Bitte auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vorort">Vor Ort Besichtigung</SelectItem>
                          <SelectItem value="kvp">Kostenvoranschlag prüfen</SelectItem>
                          <SelectItem value="rechn">Rechnung prüfen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Vor Ort Besichtigung – Adressdaten automatisch übernehmen & anzeigen */}
                  {formData.inspectionType === "vorort" && (
                    <div className="space-y-2 rounded-lg border bg-slate-50 p-4">
                      <h4 className="font-medium text-slate-800">Vor Ort Besichtigung – Adresse wird automatisch übernommen</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                          <Label>Person</Label>
                          <Input value={inspectionParty.name} disabled />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Adresse</Label>
                          <Input value={inspectionParty.address} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>PLZ</Label>
                          <Input value={inspectionParty.postalCode} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Ort</Label>
                          <Input value={inspectionParty.city} disabled />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Telefon</Label>
                          <Input value={inspectionParty.phone} disabled />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="inspectionDate">Besichtigungsdatum</Label>
                    <Input
                      id="inspectionDate"
                      type="date"
                      value={formData.inspectionDate}
                      onChange={(e) => setFormData({ ...formData, inspectionDate: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Schritt 4: Dokumente */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Dateien hochladen</h3>
                    <p className="text-slate-600 mb-4">
                      Laden Sie Fotos, Dokumente oder Videos hoch (max. 10MB pro Datei)
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Dateien auswählen
                      </label>
                    </Button>
                  </div>

                  {formData.uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-800">Hochgeladene Dateien:</h4>
                      <div className="space-y-2">
                        {formData.uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {getFileIcon(file)}
                              <div>
                                <p className="text-sm font-medium text-slate-800">{file.name}</p>
                                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Schritt 5: Überprüfung (wie erster Entwurf) */}
              {currentStep === 5 && (
                <div className="space-y-8">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Bitte überprüfen Sie alle Angaben vor der Einreichung. Nach der Einreichung können Sie die Daten nicht mehr ändern.
                    </AlertDescription>
                  </Alert>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">Grunddaten</h3>
                      <div className="rounded-lg border bg-white p-4">
                        <ReviewRow label="Schadensnummer" value={formData.policyNumber} />
                        <ReviewRow
                          label="Sparte"
                          value={
                            formData.claimInsurance === "hp"
                              ? "Haftpflicht"
                              : formData.claimInsurance === "eig"
                              ? "Eigenschaden"
                              : undefined
                          }
                        />
                        <ReviewRow
                          label="Schadensart"
                          value={
                            formData.claimType === "gebaeude"
                              ? "Gebäude / Infrastruktur"
                              : formData.claimType === "hausrat"
                              ? "Hausrat"
                              : undefined
                          }
                        />
                      </div>

                      <h4 className="font-medium text-slate-800 mt-4">Versicherungsnehmer</h4>
                      <div className="rounded-lg border bg-white p-4">
                        <ReviewRow label="Name" value={formData.insured.name} />
                        <ReviewRow label="Adresse" value={formData.insured.address} />
                        <ReviewRow label="PLZ" value={formData.insured.postalCode} />
                        <ReviewRow label="Ort" value={formData.insured.city} />
                        <ReviewRow label="Telefon" value={formData.insured.phone} />
                      </div>

                      {isHaftpflicht && (
                        <>
                          <h4 className="font-medium text-slate-800 mt-4">Gegenpartei</h4>
                          <div className="rounded-lg border bg-white p-4">
                            <ReviewRow label="Name" value={formData.counterparty.name} />
                            <ReviewRow label="Adresse" value={formData.counterparty.address} />
                            <ReviewRow label="PLZ" value={formData.counterparty.postalCode} />
                            <ReviewRow label="Ort" value={formData.counterparty.city} />
                            <ReviewRow label="Telefon" value={formData.counterparty.phone} />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">Ort & Zeit</h3>
                      <div className="rounded-lg border bg-white p-4">
                        <ReviewRow label="Adresse" value={formData.address} />
                        <ReviewRow label="PLZ" value={formData.postalCode} />
                        <ReviewRow label="Ort" value={formData.city} />
                        <ReviewRow label="Schadensdatum" value={formData.incidentDate} />
                      </div>

                      <h3 className="font-semibold text-slate-800 mt-6">Schadendetails</h3>
                      <div className="rounded-lg border bg-white p-4 space-y-3">
                        <div>
                          <div className="text-slate-600 mb-1">Schadensbeschreibung</div>
                          <div className="bg-slate-50 rounded p-3 text-sm">
                            {formData.damageDescription || <span className="text-slate-400">—</span>}
                          </div>
                        </div>
                        <ReviewRow
                          label="Geschätzte Schadensumme"
                          value={formData.estimatedAmount ? `CHF ${Number(formData.estimatedAmount).toLocaleString("de-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : undefined}
                        />
                        <ReviewRow
                          label="Besichtigungsart"
                          value={
                            formData.inspectionType === "vorort" ? "Vor Ort Besichtigung" :
                            formData.inspectionType === "kvp" ? "Kostenvoranschlag prüfen" :
                            formData.inspectionType === "rechn" ? "Rechnung prüfen" : undefined
                          }
                        />

                        {formData.inspectionType === "vorort" && (
                          <>
                            <div className="text-slate-600 mt-2">Verwendete Kontaktdaten für Vor Ort Besichtigung</div>
                            <ReviewRow label="Name" value={inspectionParty.name} />
                            <ReviewRow label="Adresse" value={inspectionParty.address} />
                            <ReviewRow label="PLZ" value={inspectionParty.postalCode} />
                            <ReviewRow label="Ort" value={inspectionParty.city} />
                            <ReviewRow label="Telefon" value={inspectionParty.phone} />
                          </>
                        )}

                        <ReviewRow label="Besichtigungsdatum" value={formData.inspectionDate} />
                      </div>

                      {formData.uploadedFiles.length > 0 && (
                        <>
                          <h3 className="font-semibold text-slate-800 mt-6">Dokumente ({formData.uploadedFiles.length})</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {formData.uploadedFiles.map((file, index) => (
                              <div key={index} className="p-2 bg-slate-50 rounded text-center">
                                {getFileIcon(file)}
                                <p className="text-xs text-slate-600 mt-1 truncate" title={file.name}>{file.name}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Zurück
                </Button>

                {currentStep < 5 ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Weiter
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-600">
                    {isSubmitting ? "Wird eingereicht..." : "Fall einreichen"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
