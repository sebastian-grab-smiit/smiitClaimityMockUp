"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Zap, Download, CheckCircle, RefreshCw, Database, Key, BarChart3, Plus, FileText, Users, MessageSquare, Settings } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import Link from "next/link"

export default function ApiImportPage() {
  const [selectedSystem, setSelectedSystem] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [endpoint, setEndpoint] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [importData, setImportData] = useState<any[]>([])
  const [selectedClaims, setSelectedClaims] = useState<string[]>([])

  const supportedSystems = [
    { id: "sap", name: "SAP Insurance", description: "SAP Versicherungslösung" },
    { id: "guidewire", name: "Guidewire ClaimCenter", description: "Guidewire Schadenmanagement" },
    { id: "custom", name: "Benutzerdefinierte API", description: "Eigene REST API" },
  ]

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate API connection
    setTimeout(() => {
      setIsConnected(true)
      setIsConnecting(false)
      // Mock data
      setImportData([
        {
          id: "EXT-001",
          policyNumber: "POL-2024-123456",
          claimType: "Fahrzeugschaden",
          incidentDate: "2024-01-15",
          amount: "5500",
          status: "Neu",
        },
        {
          id: "EXT-002",
          policyNumber: "POL-2024-789012",
          claimType: "Gebäudeschaden",
          incidentDate: "2024-01-18",
          amount: "12000",
          status: "Neu",
        },
      ])
    }, 2000)
  }

  const handleImport = () => {
    // Handle import logic
    console.log("Importing claims:", selectedClaims)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader userType="insurer" userName="Helvetia Versicherung" />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen hidden md:block">
          <nav className="p-4 space-y-2">
            <Link
              href="/insurer"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/insurer/claims/new"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <Plus className="h-4 w-4" />
              <span>Neuer Fall</span>
            </Link>
            <Link
              href="/insurer/claims"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Alle Fälle</span>
            </Link>
            <Link
              href="/insurer/reports"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Download className="h-4 w-4" />
              <span>Berichte</span>
            </Link>
            <Link
              href="/insurer/experts"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Users className="h-4 w-4" />
              <span>Experten</span>
            </Link>
            <Link
              href="/insurer/notifications"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">{2}</Badge>}
            </Link>
            <Link
              href="/insurer/settings"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span>Einstellungen</span>
            </Link>
          </nav>
        </aside>

        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-8 text-center">
            <Zap className="h-16 w-16 text-purple-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-800 mb-4">API Import</h1>
            <p className="text-lg text-slate-600">Importieren Sie Schadensfälle direkt aus Ihrem bestehenden System</p>
          </div>

          {!isConnected ? (
            <Card>
              <CardHeader>
                <CardTitle>System-Verbindung einrichten</CardTitle>
                <CardDescription>Wählen Sie Ihr System aus und geben Sie die Verbindungsdaten ein</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>System auswählen</Label>
                  <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                    <SelectTrigger>
                      <SelectValue placeholder="System auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedSystems.map((system) => (
                        <SelectItem key={system.id} value={system.id}>
                          <div>
                            <div className="font-medium">{system.name}</div>
                            <div className="text-sm text-slate-500">{system.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedSystem && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="endpoint">API Endpoint</Label>
                      <Input
                        id="endpoint"
                        placeholder="https://api.ihrsystem.com/claims"
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Schlüssel</Label>
                      <Input
                        id="apiKey"
                        type="password"
                        placeholder="Ihr API Schlüssel"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>

                    <Alert>
                      <Key className="h-4 w-4" />
                      <AlertDescription>
                        Ihre API-Daten werden verschlüsselt gespeichert und nur für den Import verwendet.
                      </AlertDescription>
                    </Alert>

                    <Button
                      onClick={handleConnect}
                      disabled={isConnecting || !apiKey || !endpoint}
                      className="w-full bg-purple-500 hover:bg-purple-600"
                    >
                      {isConnecting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Verbindung wird hergestellt...
                        </>
                      ) : (
                        <>
                          <Database className="mr-2 h-4 w-4" />
                          Verbindung testen
                        </>
                      )}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Verbindung erfolgreich hergestellt! {importData.length} Schadensfälle gefunden.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>Verfügbare Schadensfälle</CardTitle>
                  <CardDescription>Wählen Sie die Fälle aus, die Sie importieren möchten</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {importData.map((claim) => (
                      <div key={claim.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <input
                          type="checkbox"
                          id={claim.id}
                          checked={selectedClaims.includes(claim.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedClaims([...selectedClaims, claim.id])
                            } else {
                              setSelectedClaims(selectedClaims.filter((id) => id !== claim.id))
                            }
                          }}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">{claim.policyNumber}</span>
                            <Badge variant="secondary">{claim.claimType}</Badge>
                            <Badge variant="outline">{claim.status}</Badge>
                          </div>
                          <div className="text-sm text-slate-600">
                            Schadensdatum: {claim.incidentDate} • Betrag: CHF {claim.amount}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-6 pt-6 border-t">
                    <Button variant="outline" onClick={() => setIsConnected(false)}>
                      Neue Verbindung
                    </Button>
                    <Button
                      onClick={handleImport}
                      disabled={selectedClaims.length === 0}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      {selectedClaims.length} Fälle importieren
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
