// app/invite/page.tsx
"use client"

import { Suspense, useMemo, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Building, Shield, User } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type UserType = "insurer" | "expert"
type InvitePayload = {
  email: string; userType: UserType; companyName?: string; firstName?: string; lastName?: string; exp?: number;
}

function b64urlToString(b64url: string): string {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/")
  const pad = b64.length % 4 ? 4 - (b64.length % 4) : 0
  const s = atob(b64 + "=".repeat(pad))
  const bytes = Uint8Array.from(s, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}
function parseInviteToken(token: string | null): InvitePayload | null {
  if (!token) return null
  try {
    const data = JSON.parse(b64urlToString(token))
    if (!data?.email || !data?.userType) return null
    return data as InvitePayload
  } catch { return null }
}

export default function InvitePage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-teal-50">
      {/* If you have a header with h-16 (64px), use min-h-[calc(100vh-4rem)].
         If not, just use min-h-screen. */}
      <div className="flex min-h-screen items-center justify-center px-4 md:px-6 py-10">
        <div className="w-full max-w-2xl flex flex-col items-center text-center gap-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-QPdI2ZFgQGOHkKIkK0SoioSmi1UBNJ.png"
            alt="Claimity Logo"
            width={135}
            height={46}
            className="rounded-lg"
          />

          <div>
            <h1 className="text-2xl font-bold text-slate-800">Einladung annehmen</h1>
            <p className="text-slate-600">Schliessen Sie Ihre Kontoerstellung für Claimity ab.</p>
          </div>

          <Suspense fallback={<InviteSkeleton />}>
            <InviteForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function InviteSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ihre Einladung</CardTitle>
        <CardDescription>Die folgenden Angaben stammen aus der Einladung.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 bg-slate-200 rounded" />
          <div className="h-10 w-full bg-slate-200 rounded" />
          <div className="h-10 w-full bg-slate-200 rounded" />
          <div className="h-10 w-full bg-slate-200 rounded" />
        </div>
      </CardContent>
    </Card>
  )
}

function InviteForm() {
  const router = useRouter()
  const sp = useSearchParams() // ✅ now inside Suspense
  const invite = useMemo(() => parseInviteToken(sp.get("token")), [sp])

  const [inviteError, setInviteError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phone: "", companyName: "",
    password: "", confirmPassword: "",
    acceptTerms: false, acceptPrivacy: false
  })

  useEffect(() => {
    if (!invite) { setInviteError("Einladung ungültig."); return }
    if (invite.exp && invite.exp * 1000 < Date.now()) { setInviteError("Diese Einladung ist abgelaufen."); return }
    setInviteError(null)
    setFormData(f => ({
      ...f,
      firstName: invite.firstName ?? "",
      lastName: invite.lastName ?? "",
      companyName: invite.companyName ?? ""
    }))
  }, [invite])

  const userTypeIcon = (t: UserType) => t === "insurer" ? <Building className="h-4 w-4" /> : <User className="h-4 w-4" />
  const userTypeLabel = (t: UserType) => t === "insurer" ? "Versicherer" : "Experte"

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!invite || inviteError) return
    if (formData.password.length < 8) return alert("Das Passwort muss mindestens 8 Zeichen lang sein.")
    if (formData.password !== formData.confirmPassword) return alert("Passwörter stimmen nicht überein.")
    if (!formData.acceptTerms || !formData.acceptPrivacy) return alert("Bitte AGB und Datenschutz akzeptieren.")
    setIsSubmitting(true)
    setTimeout(() => router.push("/login?invited=1"), 600)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ihre Einladung</CardTitle>
        <CardDescription>{inviteError ? '' : 'Die folgenden Angaben stammen aus der Einladung.'}</CardDescription>
      </CardHeader>
      <CardContent>
        {inviteError && (
          <Alert className="mb-4">
            <Shield className="h-4 w-4" />
            <AlertDescription>{inviteError}</AlertDescription>
          </Alert>
        )}

        {!inviteError && invite && (
          <>
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="secondary" className="bg-slate-100 text-primary">
                <span className="flex items-center gap-2">
                  {userTypeIcon(invite.userType)}
                  {userTypeLabel(invite.userType)}
                </span>
              </Badge>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail-Adresse</Label>
                <Input id="email" value={invite.email} readOnly />
                <p className="text-xs text-slate-500">Diese E-Mail kann nicht geändert werden.</p>
              </div>

              {invite.userType === "insurer" && (
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
                  <p className="text-xs text-slate-500">Mindestens 8 Zeichen.</p>
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

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(c) => setFormData({ ...formData, acceptTerms: c as boolean })}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    Ich akzeptiere die <Link href="/terms" className="text-primary">AGB</Link>.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.acceptPrivacy}
                    onCheckedChange={(c) => setFormData({ ...formData, acceptPrivacy: c as boolean })}
                    required
                  />
                  <Label htmlFor="privacy" className="text-sm leading-relaxed">
                    Ich akzeptiere die <Link href="/privacy" className="text-primary">Datenschutzerklärung</Link> und{" "}
                    <Link href="/dpa" className="text-primary">DPA</Link>.
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Wird abgeschlossen…" : "Einladung annehmen"}
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  )
}
