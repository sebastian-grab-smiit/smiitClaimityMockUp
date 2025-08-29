"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BarChart3, Building, Building2, DollarSign, FileText, LucideMap, MessageSquare, Save, Settings, Users, File } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/shared/page-header"

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
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Creating new insurer:", formData)
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="admin" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link
              href="/admin"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/experts"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Users className="h-4 w-4" />
              <span>Experten</span>
            </Link>
            <Link
              href="/admin/insurers"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <Building2 className="h-4 w-4" />
              <span>Versicherer</span>
            </Link>
            <Link
              href="/admin/cases"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Alle Fälle</span>
            </Link>
            <Link
              href="/admin/assignment"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <LucideMap className="h-4 w-4" />
              <span>Zuordnung</span>
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <File className="h-4 w-4" />
              <span>Berichte</span>
              <Badge className="bg-yellow-500 text-white text-xs">3</Badge>
            </Link>
            <Link
              href="/admin/invoicing"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <DollarSign className="h-4 w-4" />
              <span>Rechnungen</span>
            </Link>
            <Link
              href="/admin/notifications"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">{2}</Badge>}
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
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <Link href="/admin/insurers" className="flex items-center text-primary mb-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Übersicht
            </Link>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Neuen Versicherer hinzufügen</h1>
                <p className="text-gray-600">Erstellen Sie eine neue Versicherungspartnerschaft</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              <Card>
                <CardHeader>
                  <CardTitle>Zusätzliche Informationen</CardTitle>
                  <CardDescription>Weitere Details und Notizen</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="commissionRate">Provisionssatz (%)</Label>
                    <Input
                      id="commissionRate"
                      type="number"
                      step="0.1"
                      value={formData.commissionRate}
                      onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
                      placeholder="15.0"
                    />
                  </div>

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

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/insurers">Abbrechen</Link>
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                  <Save className="h-4 w-4 mr-2" />
                  Versicherer erstellen
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
