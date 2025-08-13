"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsVerified(true)
      setIsLoading(false)
      // Redirect to 2FA setup after 2 seconds
      setTimeout(() => {
        window.location.href = "/setup-2fa"
      }, 2000)
    }, 1000)
  }

  const handleResend = () => {
    setResendCooldown(60)
    // Simulate resend
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">E-Mail bestätigt!</h1>
            <p className="text-slate-600 mb-4">
              Ihre E-Mail-Adresse wurde erfolgreich bestätigt. Sie werden zur Einrichtung der
              Zwei-Faktor-Authentifizierung weitergeleitet.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* <Link href="/signup" className="inline-flex items-center text-primary hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Registrierung
          </Link> */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-QPdI2ZFgQGOHkKIkK0SoioSmi1UBNJ.png"
              alt="Claimity Logo"
              width={135}
              height={46}
              className="rounded-lg"
            />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">E-Mail bestätigen</h1>
          <p className="text-slate-600">Bestätigen Sie Ihre E-Mail-Adresse</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-primary" />
              Bestätigungscode eingeben
            </CardTitle>
            <CardDescription>Wir haben einen 6-stelligen Code an Ihre E-Mail-Adresse gesendet</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Bestätigungscode</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                  required
                />
              </div>

              <Button type="submit" className="w-full " disabled={isLoading}>
                {isLoading ? "Wird bestätigt..." : "E-Mail bestätigen"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600 mb-2">Code nicht erhalten?</p>
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="text-sm text-primary"
              >
                {resendCooldown > 0 ? `Erneut senden in ${resendCooldown}s` : "Code erneut senden"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Alert className="mt-4">
          <Mail className="h-4 w-4" />
          <AlertDescription>
            Überprüfen Sie auch Ihren Spam-Ordner, falls Sie keine E-Mail erhalten haben.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
