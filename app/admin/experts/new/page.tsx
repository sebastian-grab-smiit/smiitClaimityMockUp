"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PageHeader } from "@/components/shared/page-header"
import {
  X, Save, Users, BarChart3, Building2, DollarSign, FileText, MessageSquare, Settings, LucideMap, File, RotateCcw
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

type TariffCategory = "sachverstaendiger" | "fahrzeugexperte" | "bvm"

type TariffItem = {
  id: string
  service: string          // z.B. "Sachverständiger"
  category: string         // z.B. "Aussendienst"
  hourly?: number | null   // CHF/h
  flat?: number | null     // CHF pauschal
}

const TARIFF_TEMPLATES: Record<TariffCategory, TariffItem[]> = {
  sachverstaendiger: [
    { id: "sv_rechnung_pruefung", service: "Sachverständiger", category: "einfache Rechnungsprüfung", hourly: null, flat: 75 },
    { id: "sv_aussendienst",      service: "Sachverständiger", category: "Aussendienst",            hourly: 170, flat: null },
    { id: "sv_innendienst",       service: "Sachverständiger", category: "Innendienst",             hourly: 140, flat: null },
  ],
  fahrzeugexperte: [
    { id: "fz_standard",     service: "Fahrzeugexpertise", category: "Standardexpertise",   hourly: null, flat: 315 },
    { id: "fz_kurz",         service: "Fahrzeugexpertise", category: "Kurzexpertise",       hourly: null, flat: 160 },
    { id: "fz_live",         service: "Fahrzeugexpertise", category: "LiveExpert",          hourly: null, flat: 200 },
    { id: "fz_drivein",      service: "Fahrzeugexpertise", category: "Drive-In Expertise",  hourly: null, flat: 200 },
    { id: "fz_rechnung",     service: "Fahrzeugexpertise", category: "Rechnungskontrolle", hourly: null, flat: 75 },
    { id: "fz_wrack_ch",     service: "Fahrzeugexpertise", category: "Wrackverkauf Schweiz", hourly: null, flat: 120 },
    { id: "fz_wrack_abroad", service: "Fahrzeugexpertise", category: "Wrackverkauf Ausland", hourly: null, flat: 175 },
    { id: "fz_totalschaden", service: "Fahrzeugexpertise", category: "Totalschaden",        hourly: null, flat: 350 },
  ],
  bvm: [
    { id: "bvm_ermittlung", service: "BVM", category: "Ermittlung",  hourly: 220, flat: null },
    { id: "bvm_kurzcheck",  service: "BVM", category: "Kurzcheck",   hourly: null, flat: 100 },
  ],
}

export default function NewExpertPage() {
  const [formData, setFormData] = useState({
    // Grunddaten
    company: "",                 // Firma
    category: "" as "" | TariffCategory, // Kategorie (neu)
    name: "",
    email: "",
    phone: "",
    address: "",                 // Straße / Adresse
    postalCode: "",
    city: "",
    canton: "",
    // Qualifikationen
    specialties: [] as string[],
    languages: [] as string[],
    certifications: [] as string[],
    experience: "",
    // Vertrags/Tarifdaten
    tariffs: {} as Record<string, { hourly?: string; flat?: string }>,
    // Fakturierung & Bank
    invoicingCompany: "",
    vatUid: "",
    invoicingEmail: "",
    iban: "",
    bankName: "",
    bic: "",
    accountHolder: "",
    paymentTermsDays: "30",
    // Sonstiges
    notes: "",
  })

  const cantons = [
    { value: "ZH", label: "Zürich" },
    { value: "BE", label: "Bern" },
    { value: "LU", label: "Luzern" },
    { value: "BS", label: "Basel-Stadt" },
    { value: "BL", label: "Basel-Landschaft" },
    { value: "SG", label: "St. Gallen" },
    { value: "GE", label: "Genf" },
    { value: "VD", label: "Waadt" },
  ]

  const specialtyOptions = [
    "Fahrzeugschäden",
    "Gebäudeschäden",
    "Wasserschäden",
    "Brandschäden",
    "Maschinenschäden",
    "Haftpflichtschäden",
    "Industrieschäden",
    "KFZ-Gutachten",
  ]

  const languageOptions = ["DE", "FR", "IT", "EN"]
  const certificationOptions = ["SIA", "SVKG", "TÜV", "VKF", "SVIT"]

  // Build tariff rows based on selected category
  const tariffTemplate: TariffItem[] = useMemo(() => {
    if (!formData.category) return []
    return TARIFF_TEMPLATES[formData.category]
  }, [formData.category])

  // Initialize tariffs (or reset to defaults) whenever category changes
  useEffect(() => {
    if (!formData.category) return
    const defaults: Record<string, { hourly?: string; flat?: string }> = {}
    TARIFF_TEMPLATES[formData.category].forEach((t) => {
      defaults[t.id] = {
        hourly: t.hourly != null ? String(t.hourly) : "",
        flat: t.flat != null ? String(t.flat) : "",
      }
    })
    setFormData((prev) => ({ ...prev, tariffs: defaults }))
  }, [formData.category])

  const resetTariffsToDefaults = () => {
    if (!formData.category) return
    const defaults: Record<string, { hourly?: string; flat?: string }> = {}
    TARIFF_TEMPLATES[formData.category].forEach((t) => {
      defaults[t.id] = {
        hourly: t.hourly != null ? String(t.hourly) : "",
        flat: t.flat != null ? String(t.flat) : "",
      }
    })
    setFormData((prev) => ({ ...prev, tariffs: defaults }))
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="admin" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link href="/admin" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/experts" className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg">
              <Users className="h-4 w-4" />
              <span>Experten</span>
            </Link>
            <Link href="/admin/insurers" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Building2 className="h-4 w-4" />
              <span>Versicherer</span>
            </Link>
            <Link href="/admin/cases" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <FileText className="h-4 w-4" />
              <span>Alle Fälle</span>
            </Link>
            <Link href="/admin/assignment" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <LucideMap className="h-4 w-4" />
              <span>Zuordnung</span>
            </Link>
            <Link href="/admin/reports" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <File className="h-4 w-4" />
              <span>Berichte</span>
              <Badge className="bg-yellow-500 text-white text-xs">3</Badge>
            </Link>
            <Link href="/admin/invoicing" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <DollarSign className="h-4 w-4" />
              <span>Rechnungen</span>
            </Link>
            <Link href="/admin/notifications" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">{2}</Badge>}
            </Link>
            <Link href="/admin/settings" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Settings className="h-4 w-4" />
              <span>Einstellungen</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Neuen Experten hinzufügen</h1>
                <p className="text-gray-600">Fügen Sie einen neuen Experten zur Plattform hinzu</p>
              </div>
              <div className="flex space-x-2">
                <Link href="/admin/experts">
                  <Button variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Abbrechen
                  </Button>
                </Link>
                <Button className="bg-primary">
                  <Save className="h-4 w-4 mr-2" />
                  Experten speichern
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Grunddaten */}
              <Card>
                <CardHeader>
                  <CardTitle>Grunddaten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Firma *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Muster AG"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Kurt Seiler"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategorie *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value: TariffCategory) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Kategorie wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sachverstaendiger">Sachverständiger</SelectItem>
                          <SelectItem value="fahrzeugexperte">Fahrzeugexperte</SelectItem>
                          <SelectItem value="bvm">Bekämpfung Versicherungsmissbrauch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="hans.mueller@expert.ch"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+41 44 123 45 67"
                      />
                    </div>
                  </div>

                  {/* Adresse getrennt */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Musterstrasse 123"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">PLZ *</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="8001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ort *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Zürich"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="canton">Kanton *</Label>
                      <Select
                        value={formData.canton}
                        onValueChange={(value) => setFormData({ ...formData, canton: value })}
                      >
                        <SelectTrigger id="canton">
                          <SelectValue placeholder="Kanton wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {cantons.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Qualifikationen */}
              <Card>
                <CardHeader>
                  <CardTitle>Qualifikationen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Spezialisierungen *</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {specialtyOptions.map((specialty) => (
                        <div key={specialty} className="flex items-center space-x-2">
                          <Checkbox
                            id={specialty}
                            checked={formData.specialties.includes(specialty)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, specialties: [...formData.specialties, specialty] })
                              } else {
                                setFormData({
                                  ...formData,
                                  specialties: formData.specialties.filter((s) => s !== specialty),
                                })
                              }
                            }}
                          />
                          <Label htmlFor={specialty} className="text-sm">{specialty}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Sprachen *</Label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {languageOptions.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={formData.languages.includes(language)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, languages: [...formData.languages, language] })
                              } else {
                                setFormData({
                                  ...formData,
                                  languages: formData.languages.filter((l) => l !== language),
                                })
                              }
                            }}
                          />
                          <Label htmlFor={language} className="text-sm">{language}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Zertifizierungen</Label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {certificationOptions.map((cert) => (
                        <div key={cert} className="flex items-center space-x-2">
                          <Checkbox
                            id={cert}
                            checked={formData.certifications.includes(cert)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, certifications: [...formData.certifications, cert] })
                              } else {
                                setFormData({
                                  ...formData,
                                  certifications: formData.certifications.filter((c) => c !== cert),
                                })
                              }
                            }}
                          />
                          <Label htmlFor={cert} className="text-sm">{cert}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Berufserfahrung</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="15 Jahre"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Vertragsdaten & Tarife */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Vertragsdaten – Tarife</CardTitle>
                  <Button variant="outline" size="sm" onClick={resetTariffsToDefaults} disabled={!formData.category}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Standardwerte laden
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!formData.category ? (
                    <p className="text-sm text-slate-600">
                      Bitte zuerst die <span className="font-medium">Kategorie</span> in den Grunddaten wählen, um die Tarife zu bearbeiten.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-[760px] w-full text-sm border border-slate-200">
                        <thead className="bg-slate-100">
                          <tr>
                            <th className="p-2 text-left border-b border-slate-200">Dienstleistung</th>
                            <th className="p-2 text-left border-b border-slate-200">Kategorie</th>
                            <th className="p-2 text-left border-b border-slate-200">Stundensatz Experte (CHF/h)</th>
                            <th className="p-2 text-left border-b border-slate-200">Pauschale (CHF)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tariffTemplate.map((row) => {
                            const values = formData.tariffs[row.id] || { hourly: "", flat: "" }
                            return (
                              <tr key={row.id} className="odd:bg-white even:bg-slate-50">
                                <td className="p-2 border-t">{row.service}</td>
                                <td className="p-2 border-t">{row.category}</td>
                                <td className="p-2 border-t">
                                  {row.hourly != null ? (
                                    <Input
                                      type="number"
                                      inputMode="decimal"
                                      step="1"
                                      value={values.hourly ?? ""}
                                      onChange={(e) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          tariffs: {
                                            ...prev.tariffs,
                                            [row.id]: { ...prev.tariffs[row.id], hourly: e.target.value },
                                          },
                                        }))
                                      }
                                      placeholder="0"
                                      className="h-8"
                                    />
                                  ) : (
                                    <div className="text-slate-400">–</div>
                                  )}
                                </td>
                                <td className="p-2 border-t">
                                  {row.flat != null ? (
                                    <Input
                                      type="number"
                                      inputMode="decimal"
                                      step="1"
                                      value={values.flat ?? ""}
                                      onChange={(e) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          tariffs: {
                                            ...prev.tariffs,
                                            [row.id]: { ...prev.tariffs[row.id], flat: e.target.value },
                                          },
                                        }))
                                      }
                                      placeholder="0"
                                      className="h-8"
                                    />
                                  ) : (
                                    <div className="text-slate-400">–</div>
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Fakturierung & Bank */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Fakturierung & Bank</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoicingCompany">Firma (Rechnung)</Label>
                      <Input
                        id="invoicingCompany"
                        value={formData.invoicingCompany}
                        onChange={(e) => setFormData({ ...formData, invoicingCompany: e.target.value })}
                        placeholder="Muster AG"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invoicingEmail">Rechnungs-E-Mail</Label>
                      <Input
                        id="invoicingEmail"
                        type="email"
                        value={formData.invoicingEmail}
                        onChange={(e) => setFormData({ ...formData, invoicingEmail: e.target.value })}
                        placeholder="billing@muster-ag.ch"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="iban">IBAN</Label>
                      <Input
                        id="iban"
                        value={formData.iban}
                        onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                        placeholder="CH.. ..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bankname</Label>
                      <Input
                        id="bankName"
                        value={formData.bankName}
                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        placeholder="ZKB / UBS / ..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bic">BIC / SWIFT</Label>
                      <Input
                        id="bic"
                        value={formData.bic}
                        onChange={(e) => setFormData({ ...formData, bic: e.target.value })}
                        placeholder="ZKBKCHZZ80A"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountHolder">Kontoinhaber</Label>
                      <Input
                        id="accountHolder"
                        value={formData.accountHolder}
                        onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                        placeholder="Muster AG"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vatUid">UID / MwSt.-Nr.</Label>
                      <Input
                        id="vatUid"
                        value={formData.vatUid}
                        onChange={(e) => setFormData({ ...formData, vatUid: e.target.value })}
                        placeholder="CHE-123.456.789 MWST"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentTermsDays">Zahlungsziel (Tage)</Label>
                      <Input
                        id="paymentTermsDays"
                        type="number"
                        min={0}
                        step={1}
                        value={formData.paymentTermsDays}
                        onChange={(e) => setFormData({ ...formData, paymentTermsDays: e.target.value })}
                        placeholder="30"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Zusätzliche Informationen */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Zusätzliche Informationen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Interne Notizen</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Zusätzliche Informationen über den Experten..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
