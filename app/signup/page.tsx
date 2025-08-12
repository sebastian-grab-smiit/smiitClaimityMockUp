"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building, User, Shield } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"

export default function SignupPage() {
  const [userType, setUserType] = useState<"insurer" | "expert" | "">("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    firstName: "",
    lastName: "",
    phone: "",
    acceptTerms: false,
    acceptPrivacy: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      window.location.href = "/verify-email"
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <PageHeader showBackButton={true} backUrl="/" showAuth={false} />

      <div className="flex items-center justify-center p-4 pt-8">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Registrierung</h1>
            <p className="text-slate-600">Erstellen Sie Ihr Claimity-Konto</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Kontotyp auswählen</CardTitle>
              <CardDescription>Wählen Sie Ihren Kontotyp, um mit der Registrierung zu beginnen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card
                  className={`cursor-pointer transition-all ${userType === "insurer" ? "ring-2 ring-primary" : "hover:bg-slate-50"}`}
                  onClick={() => setUserType("insurer")}
                >
                  <CardContent className="p-6 text-center">
                    <Building className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Versicherer</h3>
                    <p className="text-sm text-slate-600">Für Versicherungsunternehmen und Makler</p>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer transition-all ${userType === "expert" ? "ring-2 ring-primary" : "hover:bg-slate-50"}`}
                  onClick={() => setUserType("expert")}
                >
                  <CardContent className="p-6 text-center">
                    <User className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Experte/Gutachter</h3>
                    <p className="text-sm text-slate-600">Für Sachverständige und Experten</p>
                  </CardContent>
                </Card>
              </div>

              {userType && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Vorname</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nachname</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {userType === "insurer" && (
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Firmenname</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail-Adresse</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefonnummer</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+41 XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Passwort</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        Ich akzeptiere die{" "}
                        <Link href="/terms" className="text-primary hover:text-primary">
                          Allgemeinen Geschäftsbedingungen
                        </Link>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={formData.acceptPrivacy}
                        onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                        required
                      />
                      <Label htmlFor="privacy" className="text-sm leading-relaxed">
                        Ich akzeptiere die{" "}
                        <Link href="/privacy" className="text-primary hover:text-primary">
                          Datenschutzerklärung
                        </Link>{" "}
                        und{" "}
                        <Link href="/dpa" className="text-primary hover:text-primary">
                          Datenverarbeitungsvereinbarung
                        </Link>
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full "
                    disabled={isLoading || !formData.acceptTerms || !formData.acceptPrivacy}
                  >
                    {isLoading ? "Wird registriert..." : "Registrieren"}
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center text-sm text-slate-600">
                Bereits ein Konto?{" "}
                <Link href="/login" className="text-primary">
                  Anmelden
                </Link>
              </div>
            </CardContent>
          </Card>

          <Alert className="mt-4">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Nach der Registrierung müssen Sie Ihre E-Mail-Adresse bestätigen und die Zwei-Faktor-Authentifizierung
              einrichten.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
