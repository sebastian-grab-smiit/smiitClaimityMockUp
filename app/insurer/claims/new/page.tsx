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
import { ArrowLeft, Upload, X, ImageIcon, Video, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PageHeader } from "@/components/shared/page-header"

export default function NewClaimPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    // Basic Info
    policyNumber: "",
    claimType: "",
    incidentDate: "",
    reportDate: "",

    // Location
    address: "",
    city: "",
    postalCode: "",
    canton: "",

    // Damage Details
    damageDescription: "",
    estimatedAmount: "",
    urgency: "",

    // Files
    uploadedFiles: [] as File[],
  })

  const steps = [
    { number: 1, title: "Grunddaten", description: "Police und Schadenart" },
    { number: 2, title: "Ort & Zeit", description: "Wo und wann ist der Schaden aufgetreten?" },
    { number: 3, title: "Schadendetails", description: "Beschreibung und Schätzung" },
    { number: 4, title: "Dokumente", description: "Fotos und Unterlagen hochladen" },
    { number: 5, title: "Überprüfung", description: "Angaben kontrollieren" },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files],
    }))
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
    }, 2000)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />
    return <ImageIcon className="h-4 w-4" />
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Fall erfolgreich erstellt!</h1>
            <p className="text-slate-600 mb-4">
              Ihr Schadenfall wurde erfolgreich eingereicht. Sie erhalten eine Bestätigung per E-Mail.
            </p>
            <div className="bg-slate-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-slate-600">Fall-Nummer:</p>
              <p className="font-mono font-bold text-lg">
                CLM-2024-
                {Math.floor(Math.random() * 1000)
                  .toString()
                  .padStart(3, "0")}
              </p>
            </div>
            <div className="space-y-2">
              <Button asChild className="w-full ">
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
    <div className="min-h-screen bg-slate-50">
      <PageHeader userType="insurer" userName="Helvetia Versicherung" />

      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= step.number ? "bg-teal-500 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm font-medium text-slate-800">{step.title}</p>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.number ? "bg-teal-500" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Schritt {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="policyNumber">Policennummer *</Label>
                    <Input
                      id="policyNumber"
                      placeholder="z.B. POL-2024-123456"
                      value={formData.policyNumber}
                      onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="claimType">Schadenart *</Label>
                    <Select
                      value={formData.claimType}
                      onValueChange={(value) => setFormData({ ...formData, claimType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Schadenart auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vehicle">Fahrzeugschaden</SelectItem>
                        <SelectItem value="property">Gebäudeschaden</SelectItem>
                        <SelectItem value="liability">Haftpflichtschaden</SelectItem>
                        <SelectItem value="theft">Diebstahl</SelectItem>
                        <SelectItem value="water">Wasserschaden</SelectItem>
                        <SelectItem value="fire">Brandschaden</SelectItem>
                        <SelectItem value="other">Sonstiges</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="reportDate">Meldedatum</Label>
                    <Input
                      id="reportDate"
                      type="date"
                      value={formData.reportDate}
                      onChange={(e) => setFormData({ ...formData, reportDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse *</Label>
                  <Input
                    id="address"
                    placeholder="Strasse und Hausnummer"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
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
                    <Label htmlFor="canton">Kanton *</Label>
                    <Select
                      value={formData.canton}
                      onValueChange={(value) => setFormData({ ...formData, canton: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kanton" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ZH">Zürich</SelectItem>
                        <SelectItem value="BE">Bern</SelectItem>
                        <SelectItem value="LU">Luzern</SelectItem>
                        <SelectItem value="UR">Uri</SelectItem>
                        <SelectItem value="SZ">Schwyz</SelectItem>
                        <SelectItem value="OW">Obwalden</SelectItem>
                        <SelectItem value="NW">Nidwalden</SelectItem>
                        <SelectItem value="GL">Glarus</SelectItem>
                        <SelectItem value="ZG">Zug</SelectItem>
                        <SelectItem value="FR">Freiburg</SelectItem>
                        <SelectItem value="SO">Solothurn</SelectItem>
                        <SelectItem value="BS">Basel-Stadt</SelectItem>
                        <SelectItem value="BL">Basel-Landschaft</SelectItem>
                        <SelectItem value="SH">Schaffhausen</SelectItem>
                        <SelectItem value="AR">Appenzell A.Rh.</SelectItem>
                        <SelectItem value="AI">Appenzell I.Rh.</SelectItem>
                        <SelectItem value="SG">St. Gallen</SelectItem>
                        <SelectItem value="GR">Graubünden</SelectItem>
                        <SelectItem value="AG">Aargau</SelectItem>
                        <SelectItem value="TG">Thurgau</SelectItem>
                        <SelectItem value="TI">Tessin</SelectItem>
                        <SelectItem value="VD">Waadt</SelectItem>
                        <SelectItem value="VS">Wallis</SelectItem>
                        <SelectItem value="NE">Neuenburg</SelectItem>
                        <SelectItem value="GE">Genf</SelectItem>
                        <SelectItem value="JU">Jura</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Damage Details */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="damageDescription">Schadensbeschreibung *</Label>
                  <Textarea
                    id="damageDescription"
                    placeholder="Beschreiben Sie den Schaden detailliert..."
                    rows={4}
                    value={formData.damageDescription}
                    onChange={(e) => setFormData({ ...formData, damageDescription: e.target.value })}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="estimatedAmount">Geschätzte Schadenssumme (CHF)</Label>
                    <Input
                      id="estimatedAmount"
                      type="number"
                      placeholder="0"
                      value={formData.estimatedAmount}
                      onChange={(e) => setFormData({ ...formData, estimatedAmount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Dringlichkeit</Label>
                    <Select
                      value={formData.urgency}
                      onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Dringlichkeit auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Niedrig</SelectItem>
                        <SelectItem value="medium">Mittel</SelectItem>
                        <SelectItem value="high">Hoch</SelectItem>
                        <SelectItem value="urgent">Dringend</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: File Upload */}
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

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Bitte überprüfen Sie alle Angaben vor der Einreichung. Nach der Einreichung können Sie die Daten
                    nicht mehr ändern.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Grunddaten</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Policennummer:</span>
                        <span className="font-medium">{formData.policyNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Schadenart:</span>
                        <span className="font-medium">{formData.claimType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Schadensdatum:</span>
                        <span className="font-medium">{formData.incidentDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Ort</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Adresse:</span>
                        <span className="font-medium">{formData.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Ort:</span>
                        <span className="font-medium">
                          {formData.postalCode} {formData.city}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Kanton:</span>
                        <span className="font-medium">{formData.canton}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800">Schadendetails</h3>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-800">{formData.damageDescription}</p>
                  </div>
                  {formData.estimatedAmount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Geschätzte Summe:</span>
                      <span className="font-medium">CHF {formData.estimatedAmount}</span>
                    </div>
                  )}
                </div>

                {formData.uploadedFiles.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Dokumente ({formData.uploadedFiles.length})</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {formData.uploadedFiles.map((file, index) => (
                        <div key={index} className="p-2 bg-slate-50 rounded text-center">
                          {getFileIcon(file)}
                          <p className="text-xs text-slate-600 mt-1 truncate">{file.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
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
                  className=""
                >
                  Weiter
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="">
                  {isSubmitting ? "Wird eingereicht..." : "Fall einreichen"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
