import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Users, FileText, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logo from "../../public/logo.png"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              // src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-QPdI2ZFgQGOHkKIkK0SoioSmi1UBNJ.png"
              src={logo}
              alt="Claimity Logo"
              width={95}
              height={36}
              className="rounded-lg"
            />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/login" className="text-slate-600 hover:text-primary">
              Login
            </Link>
            <select className="text-sm border rounded px-2 py-1">
              <option>DE</option>
              <option>FR</option>
              <option>IT</option>
              <option>EN</option>
            </select>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Claimity AG - Die innovative
            <br />
            <span className="text-primary">Vermittlungsplattform</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Revolutionieren Sie Ihr Schadenmanagement mit unserer digitalen Vermittlungsplattform für Fahrzeugexperten,
            Sachverständigenbestellung und Begutachtung.
          </p>
          <Button size="lg" className=" text-white px-8 py-3">
            <Link href="/" className="hover:text-white">
              Kostenlos testen
            </Link>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Automatisierte Expertenauswahl – Effizienz neu definiert
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Automatisierte Zuweisung</h3>
              <p className="text-sm text-slate-600">
                Unsere intelligente Plattform weist Schadensfälle automatisch qualifizierten und verifizierten Experten
                für jeden Schadenfall auf – keine manuelle Suche mehr nötig.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Zertifizierte Fachleute</h3>
              <p className="text-sm text-slate-600">
                Wir arbeiten ausschliesslich mit zertifizierten und erfahrenen Sachverständigen zusammen, die höchste
                Qualitätsstandards in der Schadensbegutachtung gewährleisten.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Zeitersparnis von 50%</h3>
              <p className="text-sm text-slate-600">
                Durch die automatisierte Vermittlung und digitale Prozessabwicklung wird die Schadenbearbeitung um
                durchschnittlich 50% beschleunigt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Unsere umfassenden Vermittlungsdienste</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white text-slate-800">
              <CardHeader>
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Fahrzeugexperten</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Professionelle Begutachtung von Fahrzeugschäden durch qualifizierte KFZ-Sachverständige mit
                  langjähriger Erfahrung und Zertifizierung für Oldtimer – schnell in der Schweiz.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white text-slate-800">
              <CardHeader>
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Sachverständigenexperten</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Qualitative Sachverständige für alle Bereiche von Immobilien – Neubau bis Altbau, Gewerbe und
                  Industrie. Spezialisierte Experten Ihrer und regionaler Expertise.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white text-slate-800">
              <CardHeader>
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Begutachtung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Spezialisierte Experten für Aufarbeitung von Versicherungsschäden bei Immobilien, Fahrzeugen und
                  anderen versicherten Objekten.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Digital Integration */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Digitale Integration leicht gemacht</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Nahtlose API-Anbindung</h3>
              <p className="text-sm text-slate-600">
                Integrieren Sie Claimity problemlos in Ihre bestehenden Systeme. Unsere offene API ermöglicht eine
                reibungslose Datenübertragung zwischen Ihren Anwendungen und unserer Plattform.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Sichere Datenübertragung</h3>
              <p className="text-sm text-slate-600">
                Alle Daten werden nach Schweizer Datenschutzstandards verschlüsselt übertragen und gespeichert. Ihre
                Informationen sind bei uns in sicheren Händen.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Flexible Anpassungsmöglichkeiten</h3>
              <p className="text-sm text-slate-600">
                Passen Sie unsere Lösung an Ihre spezifischen Anforderungen an. Individuelle Workflows und
                Berichterstattung nach Ihren Wünschen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">So funktioniert der Claimity-Prozess</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Schadenmeldung einreichen</h3>
                <p className="text-sm text-slate-600">
                  Sie melden den Schaden über unser Portal oder per API-Schnittstelle an die Claimity-Plattform.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Automatische Expertenzuweisung</h3>
                <p className="text-sm text-slate-600">
                  Das System wählt anhand von Kriterien wie Verfügbarkeit, Standort und Spezialisierung den optimalen
                  Experten aus.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Begutachtung durchführen</h3>
                <p className="text-sm text-slate-600">
                  Ein Experte führt vor Ort die Begutachtung durch und dokumentiert alle relevanten Informationen
                  digital.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Expertise hochladen</h3>
                <p className="text-sm text-slate-600">
                  Der fertige Bericht wird auf der Plattform hochgeladen und steht sofort zur Verfügung.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                5
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Automatisierte Rückübermittlung</h3>
                <p className="text-sm text-slate-600">
                  Die Expertise wird automatisch an das System der Versicherung übermittelt und kann jederzeit abgerufen
                  werden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Echtzeit-Transparenz für optimierte Prozesse</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Lückenlose Nachverfolgung in Echtzeit. Mit Claimity behalten Sie jederzeit den Überblick über alle
            Schadensfälle. Einsicht in Bearbeitungsstand und Termine in Echtzeit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-slate-100">
                Jetzt anmelden
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Kostenlos registrieren
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
              // src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-QPdI2ZFgQGOHkKIkK0SoioSmi1UBNJ.png"
              src={logo}
                  alt="Claimity Logo"
                  width={95}
                  height={36}
                  className="rounded-lg"
                />
              </div>
              <p className="text-sm text-slate-400">
                Die innovative Vermittlungsplattform für digitales Schadenmanagement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Plattform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/login" className="hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white">
                    Registrierung
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white">
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white">
                    AGB
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white">
                    DPA
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>support@claimity.ch</li>
                <li>+41 XX XXX XX XX</li>
                <li>Schweiz</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2025 Claimity AG. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
