"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3, Building, Building2, DollarSign, FileText, LucideMap, MessageSquare,
  Save, Settings, Users, File, X, Banknote
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/shared/page-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// --- Tariff scaffolding (unchanged) ---
type TariffCategory = "sachverstaendiger" | "fahrzeugexperte" | "bvm"
type TariffItem = { id: string; service: string; category: string; hourly?: number | null; flat?: number | null }

const TARIFF_TEMPLATES: Record<TariffCategory, TariffItem[]> = {
  sachverstaendiger: [
    { id: "sv_rechnung_pruefung", service: "Sachverständiger", category: "einfache Rechnungsprüfung", hourly: null, flat: 75 },
    { id: "sv_aussendienst", service: "Sachverständiger", category: "Aussendienst", hourly: 170, flat: null },
    { id: "sv_innendienst", service: "Sachverständiger", category: "Innendienst", hourly: 140, flat: null },
  ],
  fahrzeugexperte: [
    { id: "fz_standard", service: "Fahrzeugexpertise", category: "Standardexpertise", hourly: null, flat: 315 },
    { id: "fz_kurz", service: "Fahrzeugexpertise", category: "Kurzexpertise", hourly: null, flat: 160 },
    { id: "fz_live", service: "Fahrzeugexpertise", category: "LiveExpert", hourly: null, flat: 200 },
    { id: "fz_drivein", service: "Fahrzeugexpertise", category: "Drive-In Expertise", hourly: null, flat: 200 },
    { id: "fz_rechnung", service: "Fahrzeugexpertise", category: "Rechnungskontrolle", hourly: null, flat: 75 },
    { id: "fz_wrack_ch", service: "Fahrzeugexpertise", category: "Wrackverkauf Schweiz", hourly: null, flat: 120 },
    { id: "fz_wrack_abroad", service: "Fahrzeugexpertise", category: "Wrackverkauf Ausland", hourly: null, flat: 175 },
    { id: "fz_totalschaden", service: "Fahrzeugexpertise", category: "Totalschaden", hourly: null, flat: 350 },
  ],
  bvm: [
    { id: "bvm_ermittlung", service: "BVM", category: "Ermittlung", hourly: 220, flat: null },
    { id: "bvm_kurzcheck", service: "BVM", category: "Kurzcheck", hourly: null, flat: 100 },
  ],
}

const CATEGORY_LABEL: Record<TariffCategory, string> = {
  sachverstaendiger: "Sachverständiger",
  fahrzeugexperte: "Fahrzeugexperte",
  bvm: "Bekämpfung Versicherungsmissbrauch",
}

type TariffValues = Record<TariffCategory, Record<string, { hourly?: string; flat?: string }>>
const makeDefaultTariffs = (): TariffValues =>
  (Object.keys(TARIFF_TEMPLATES) as TariffCategory[]).reduce((acc, cat) => {
    acc[cat] = Object.fromEntries(
      TARIFF_TEMPLATES[cat].map((row) => [
        row.id,
        { hourly: row.hourly != null ? String(row.hourly) : "", flat: row.flat != null ? String(row.flat) : "" },
      ]),
    )
    return acc
  }, {} as TariffValues)

export default function NewInsurerPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    canton: "",
    postalCode: "",
    website: "",
    notes: "",
    contractType: "",
    commissionRate: "",
    adminUser: { name: "", email: "", phone: "" },
    tariffs: makeDefaultTariffs(),
    // NEW: Zahlungsdetails
    payment: {
      accountHolder: "",
      iban: "",
      bankName: "",
      bic: "",
      billingEmail: "",
      billingAddress: "",
      paymentTerms: "30", // Tage
    },
  })

  const handleTariffChange = (cat: TariffCategory, id: string, field: "hourly" | "flat", value: string) => {
    setFormData((prev) => ({
      ...prev,
      tariffs: { ...prev.tariffs, [cat]: { ...prev.tariffs[cat], [id]: { ...prev.tariffs[cat][id], [field]: value } } },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating new insurer:", formData)
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
            <Link href="/admin/experts" className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <Users className="h-4 w-4" />
              <span>Experten</span>
            </Link>
            <Link href="/admin/insurers" className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg">
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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Neuen Versicherer hinzufügen</h1>
                <p className="text-gray-600">Erstellen Sie eine neue Versicherungspartnerschaft</p>
              </div>
              <div className="flex space-x-2">
                <Link href="/admin/insurers">
                  <Button variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Abbrechen
                  </Button>
                </Link>
                <Button className="bg-primary" onClick={handleSubmit}>
                  <Save className="h-4 w-4 mr-2" />
                  Versicherer speichern
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Unternehmensinformationen */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Unternehmensinformationen
                  </CardTitle>
                  <CardDescription>Grundlegende Informationen über das Versicherungsunternehmen</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Firmenname *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="z.B. Helvetia Versicherung AG"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://www.example.ch"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Hauptansprechpartner *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="Max Mustermann"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="kontakt@example.ch"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+41 XX XXX XX XX"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Adressinformationen */}
              <Card>
                <CardHeader>
                  <CardTitle>Adressinformationen</CardTitle>
                  <CardDescription>Geschäftsadresse des Versicherers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Musterstrasse 123"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">PLZ</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="8001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Stadt</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Zürich"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="canton">Kanton</Label>
                      <Select value={formData.canton} onValueChange={(value) => setFormData({ ...formData, canton: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Kanton" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ZH">Zürich</SelectItem>
                          <SelectItem value="BE">Bern</SelectItem>
                          <SelectItem value="LU">Luzern</SelectItem>
                          <SelectItem value="BS">Basel-Stadt</SelectItem>
                          <SelectItem value="BL">Basel-Landschaft</SelectItem>
                          <SelectItem value="GE">Genf</SelectItem>
                          <SelectItem value="VD">Waadt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Admin-Benutzer */}
              <Card>
                <CardHeader>
                  <CardTitle>Admin-Benutzer</CardTitle>
                  <CardDescription>Standard-Administrator für dieses Versicherer-Konto</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin_name">Name *</Label>
                    <Input
                      id="admin_name"
                      value={formData.adminUser.name}
                      onChange={(e) => setFormData({ ...formData, adminUser: { ...formData.adminUser, name: e.target.value } })}
                      placeholder="Anna Beispiel"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin_email">E-Mail *</Label>
                    <Input
                      id="admin_email"
                      type="email"
                      value={formData.adminUser.email}
                      onChange={(e) => setFormData({ ...formData, adminUser: { ...formData.adminUser, email: e.target.value } })}
                      placeholder="anna.beispiel@insurer.ch"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin_phone">Telefon</Label>
                    <Input
                      id="admin_phone"
                      value={formData.adminUser.phone}
                      onChange={(e) => setFormData({ ...formData, adminUser: { ...formData.adminUser, phone: e.target.value } })}
                      placeholder="+41 79 000 00 00"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Zahlungsdetails */}
              <Card>
                <CardHeader>
                  <CardTitle>Zahlungsdetails</CardTitle>
                  <CardDescription>Bank- & Rechnungsdaten für Zahlungen</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountHolder">Kontoinhaber *</Label>
                      <Input
                        id="accountHolder"
                        value={formData.payment.accountHolder}
                        onChange={(e) => setFormData({ ...formData, payment: { ...formData.payment, accountHolder: e.target.value } })}
                        placeholder="Helvetia Versicherung AG"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iban">IBAN *</Label>
                      <Input
                        id="iban"
                        value={formData.payment.iban}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            payment: { ...formData.payment, iban: e.target.value.toUpperCase() },
                          })
                        }
                        placeholder="CH93 0076 2011 6238 5295 7"
                        required
                        autoCapitalize="characters"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bankname</Label>
                      <Input
                        id="bankName"
                        value={formData.payment.bankName}
                        onChange={(e) => setFormData({ ...formData, payment: { ...formData.payment, bankName: e.target.value } })}
                        placeholder="ZKB / UBS / ..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bic">BIC / SWIFT</Label>
                      <Input
                        id="bic"
                        value={formData.payment.bic}
                        onChange={(e) => setFormData({ ...formData, payment: { ...formData.payment, bic: e.target.value.toUpperCase() } })}
                        placeholder="ZKBKCHZZ80A"
                        autoCapitalize="characters"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentTerms">Zahlungsziel (Tage)</Label>
                      <Input
                        id="paymentTerms"
                        type="number"
                        min={0}
                        value={formData.payment.paymentTerms}
                        onChange={(e) => setFormData({ ...formData, payment: { ...formData.payment, paymentTerms: e.target.value } })}
                        placeholder="30"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billingEmail">Rechnungs-E-Mail</Label>
                      <Input
                        id="billingEmail"
                        type="email"
                        value={formData.payment.billingEmail}
                        onChange={(e) => setFormData({ ...formData, payment: { ...formData.payment, billingEmail: e.target.value } })}
                        placeholder="invoices@insurer.ch"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Rechnungsadresse (optional)</Label>
                      <Textarea
                        id="billingAddress"
                        rows={2}
                        value={formData.payment.billingAddress}
                        onChange={(e) => setFormData({ ...formData, payment: { ...formData.payment, billingAddress: e.target.value } })}
                        placeholder="Abteilung, Strasse Nr., PLZ Ort"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tarife je Kategorie */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Tarife je Kategorie
                    <Banknote className="h-5 w-5 ml-2 text-slate-600" />
                  </CardTitle>
                  <CardDescription>Preise, die für Bestellungen dieses Versicherers gelten</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {(Object.keys(TARIFF_TEMPLATES) as TariffCategory[]).map((cat) => (
                    <div key={cat} className="space-y-3">
                      <h3 className="font-semibold text-slate-800">{CATEGORY_LABEL[cat]}</h3>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Dienstleistung</TableHead>
                              <TableHead>Kategorie</TableHead>
                              <TableHead>Stundensatz (CHF/h)</TableHead>
                              <TableHead>Pauschale (CHF)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {TARIFF_TEMPLATES[cat].map((row) => (
                              <TableRow key={row.id}>
                                <TableCell className="font-medium">{row.service}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>
                                  {row.hourly != null ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-slate-500">CHF</span>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={formData.tariffs[cat][row.id].hourly}
                                        onChange={(e) => handleTariffChange(cat, row.id, "hourly", e.target.value)}
                                        className="w-32"
                                      />
                                    </div>
                                  ) : (
                                    <span className="text-slate-400">–</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {row.flat != null ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-slate-500">CHF</span>
                                      <Input
                                        type="number"
                                        step="1"
                                        value={formData.tariffs[cat][row.id].flat}
                                        onChange={(e) => handleTariffChange(cat, row.id, "flat", e.target.value)}
                                        className="w-32"
                                      />
                                    </div>
                                  ) : (
                                    <span className="text-slate-400">–</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Zusätzliche Informationen */}
              <Card>
                <CardHeader>
                  <CardTitle>Zusätzliche Informationen</CardTitle>
                  <CardDescription>Weitere Details und Notizen</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notizen</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Zusätzliche Informationen oder Notizen..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
