import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-primary/40">
      <PageHeader userType=""/>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-4xl text-gray-400">404</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Seite nicht gefunden</h1>
              <p className="text-gray-600 mb-6">
                Die angeforderte Seite konnte nicht gefunden werden. Möglicherweise wurde sie verschoben oder existiert
                nicht mehr.
              </p>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-[#3fc1c9] hover:bg-[#35a8b0]">
                <Link href="/login">
                  <Home className="w-4 h-4 mr-2" />
                  Zur Startseite
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="javascript:history.back()">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Link>
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Benötigen Sie Hilfe? Kontaktieren Sie den{" "}
                <Link href="mailto:info@claimity.ch" className="text-[#3fc1c9] hover:underline">
                  Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
