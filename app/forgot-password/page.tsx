"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logo from "../../public/logo.png"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setEmailSent(true)
      setIsLoading(false)
    }, 1000)
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">E-Mail gesendet!</h1>
            <p className="text-slate-600 mb-6">
              Wir haben Ihnen eine E-Mail mit Anweisungen zum Zurücksetzen Ihres Passworts gesendet.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/login">Zurück zur Anmeldung</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-teal-100 flex items-center justify-center p-4">
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Passwort zurücksetzen</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-primary" />
              Passwort zurücksetzen
            </CardTitle>
            <CardDescription>
              Wir senden Ihnen eine E-Mail mit Anweisungen zum Zurücksetzen Ihres Passworts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <Button type="submit" className="w-full " disabled={isLoading}>
                {isLoading ? "Wird gesendet..." : "Zurücksetzungs-E-Mail senden"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-slate-600">
              Erinnern Sie sich an Ihr Passwort?{" "}
              <Link href="/login" className="text-primary hover:text-primary">
                Anmelden
              </Link>
            </div>
          </CardContent>
        </Card>

        <Alert className="mt-4">
          <Mail className="h-4 w-4" />
          <AlertDescription>Überprüfen Sie auch Ihren Spam-Ordner, falls Sie keine E-Mail erhalten.</AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
