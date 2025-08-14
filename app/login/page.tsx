"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PageHeader } from "@/components/shared/page-header"
import logo from "../../public/logo.png"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [totpCode, setTotpCode] = useState("")
  const [rememberDevice, setRememberDevice] = useState(false)
  const [showTwoFA, setShowTwoFA] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      if (!showTwoFA) {
        setShowTwoFA(true)
      } else {
        // Redirect to appropriate dashboard based on user role
        window.location.href = "/insurer"
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image
              src={logo}
              alt="Claimity Logo"
              width={135}
              height={46}
              className="rounded-lg"
            />
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Anmelden</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                {showTwoFA ? "Zwei-Faktor-Authentifizierung" : "Anmeldedaten"}
              </CardTitle>
              <CardDescription>
                {showTwoFA
                  ? "Geben Sie Ihren 6-stelligen TOTP-Code ein"
                  : "Geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {!showTwoFA ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail-Adresse</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ihre.email@beispiel.ch"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Passwort</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberDevice}
                        onCheckedChange={(checked) => setRememberDevice(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Dieses Gerät merken
                      </Label>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="totp">TOTP-Code</Label>
                    <Input
                      id="totp"
                      type="text"
                      placeholder="123456"
                      maxLength={6}
                      value={totpCode}
                      onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                      required
                    />
                    <p className="text-xs text-slate-500">Verwenden Sie Ihre Authenticator-App oder SMS-Code</p>
                  </div>
                )}

                <Button type="submit" className="w-full " disabled={isLoading}>
                  {isLoading ? "Wird verarbeitet..." : showTwoFA ? "Anmelden" : "Weiter"}
                </Button>
              </form>

              {!showTwoFA && (
                <div className="mt-4 space-y-2">
                  <Link href="/forgot-password" className="text-sm text-primary hover:text-primary block text-center">
                    Passwort vergessen?
                  </Link>
                </div>
              )}

              {showTwoFA && (
                <div className="mt-4 text-center">
                  <Button variant="ghost" onClick={() => setShowTwoFA(false)} className="text-sm text-slate-600">
                    Zurück zur Anmeldung
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Alert className="mt-4">
            <Shield className="h-4 w-4" />
            <AlertDescription>Zwei-Faktor-Authentifizierung ist für alle Konten obligatorisch.</AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
