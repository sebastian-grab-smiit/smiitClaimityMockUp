"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Smartphone, Copy, CheckCircle, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logo from "../../public/logo.png"

export default function Setup2FAPage() {
  const [step, setStep] = useState(1)
  const [totpCode, setTotpCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  const qrCodeSecret = "JBSWY3DPEHPK3PXP"
  const backupCodes = [
    "1a2b-3c4d-5e6f",
    "7g8h-9i0j-1k2l",
    "3m4n-5o6p-7q8r",
    "9s0t-1u2v-3w4x",
    "5y6z-7a8b-9c0d",
    "1e2f-3g4h-5i6j",
    "7k8l-9m0n-1o2p",
    "3q4r-5s6t-7u8v",
  ]

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsSetupComplete(true)
      setIsLoading(false)
    }, 1000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadBackupCodes = () => {
    const content = `Claimity Backup-Codes\n\nBewahren Sie diese Codes sicher auf:\n\n${backupCodes.join("\n")}\n\nGeneriert am: ${new Date().toLocaleDateString("de-CH")}`
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "claimity-backup-codes.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  if (isSetupComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">2FA eingerichtet!</h1>
            <p className="text-slate-600 mb-6">
              Die Zwei-Faktor-Authentifizierung wurde erfolgreich eingerichtet. Ihr Konto ist jetzt sicher.
            </p>
            <Button asChild className="">
              <Link href="/login">Zur Anmeldung</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image
              // src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-QPdI2ZFgQGOHkKIkK0SoioSmi1UBNJ.png"
              src={logo}
              alt="Claimity Logo"
              width={135}
              height={46}
              className="rounded-lg"
            />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Zwei-Faktor-Authentifizierung einrichten</h1>
          <p className="text-slate-600">Sichern Sie Ihr Konto mit 2FA</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2 text-primary" />
                Schritt 1: App installieren
              </CardTitle>
              <CardDescription>Installieren Sie eine Authenticator-App auf Ihrem Smartphone</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-slate-600">Empfohlene Apps:</p>
                <ul className="text-sm space-y-1">
                  <li>• Google Authenticator</li>
                  <li>• Microsoft Authenticator</li>
                  <li>• Authy</li>
                  <li>• 1Password</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schritt 2: QR-Code scannen</CardTitle>
              <CardDescription>Scannen Sie den QR-Code mit Ihrer Authenticator-App</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="w-48 h-48 bg-white border-2 border-slate-200 rounded-lg mx-auto flex items-center justify-center">
                  <div className="text-slate-400 text-sm">QR-Code Platzhalter</div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-slate-600">Manueller Schlüssel:</p>
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded flex-1">{qrCodeSecret}</code>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(qrCodeSecret)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Schritt 3: Code bestätigen</CardTitle>
            <CardDescription>Geben Sie den 6-stelligen Code aus Ihrer Authenticator-App ein</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyCode} className="space-y-4">
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
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Wird bestätigt..." : "2FA einrichten"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-amber-600" />
              Backup-Codes
            </CardTitle>
            <CardDescription>
              Bewahren Sie diese Codes sicher auf. Sie können verwendet werden, wenn Ihr Gerät nicht verfügbar ist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {backupCodes.map((code, index) => (
                <code key={index} className="text-sm bg-slate-100 px-2 py-1 rounded text-center">
                  {code}
                </code>
              ))}
            </div>
            <Button onClick={downloadBackupCodes} variant="outline" className="w-full bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Backup-Codes herunterladen
            </Button>
          </CardContent>
        </Card>

        <Alert className="mt-4">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Bewahren Sie Ihre Backup-Codes an einem sicheren Ort auf. Sie benötigen sie, wenn Ihr Authenticator-Gerät
            verloren geht.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
