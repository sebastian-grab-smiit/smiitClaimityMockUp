"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logo from "../../public/logo.png"

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return
    }
    setIsLoading(true)

    setTimeout(() => {
      setIsReset(true)
      setIsLoading(false)
    }, 1000)
  }

  if (isReset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Passwort zurückgesetzt!</h1>
            <p className="text-slate-600 mb-6">
              Ihr Passwort wurde erfolgreich zurückgesetzt. Sie können sich jetzt mit Ihrem neuen Passwort anmelden.
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-primary/40 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Neues Passwort</h1>
          <p className="text-gray-600">Erstellen Sie ein neues, sicheres Passwort</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              Passwort zurücksetzen
            </CardTitle>
            <CardDescription>Geben Sie Ihr neues Passwort ein</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Neues Passwort</Label>
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

              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <Alert>
                  <AlertDescription>Die Passwörter stimmen nicht überein.</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full "
                disabled={isLoading || formData.password !== formData.confirmPassword}
              >
                {isLoading ? "Wird zurückgesetzt..." : "Passwort zurücksetzen"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Alert className="mt-4">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Verwenden Sie ein starkes Passwort mit mindestens 8 Zeichen, Gross- und Kleinbuchstaben, Zahlen und
            Sonderzeichen.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
