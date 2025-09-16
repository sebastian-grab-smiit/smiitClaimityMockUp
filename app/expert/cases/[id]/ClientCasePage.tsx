'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft, MapPin, Clock, Phone, Mail, Upload, Camera, MessageSquare, Timer, FileText, Download, Settings,
  BarChart3,
  Calendar, X
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import Link from "next/link"

export default function ClientCasePage({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeEntry, setTimeEntry] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState("insurer")

  // --- NEW: Invoice state ---
  const [invoice, setInvoice] = useState<{ dueDate: string; amount: string; file: File | null }>({
    dueDate: '',
    amount: '',
    file: null,
  });
  const [invoiceSaved, setInvoiceSaved] = useState(false);
  const [invoiceError, setInvoiceError] = useState<string | null>(null);

  const onInvoiceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== 'application/pdf') {
      setInvoiceError('Bitte nur PDF-Dateien hochladen.');
      return;
    }
    setInvoiceError(null);
    setInvoice((prev) => ({ ...prev, file: f }));
  };

  const removeInvoiceFile = () => setInvoice((prev) => ({ ...prev, file: null }));

  const saveInvoice = () => {
    // here you would call your API
    setInvoiceSaved(true);
    setTimeout(() => setInvoiceSaved(false), 2000);
  };

  const formatBytes = (bytes?: number) =>
    typeof bytes === 'number' ? `${(bytes / 1024 / 1024).toFixed(2)} MB` : '';

  // ---- your original mock data (kept) ----
  const caseData = {
    id,
    insurer: 'Helvetia Versicherung',
    type: 'Fahrzeugschaden',
    location: 'Zürich, Bahnhofstrasse 15',
    coordinates: '47.3769, 8.5417',
    deadline: '18.01.2024',
    amount: 'CHF 12,000',
    status: 'In Bearbeitung',
    assignedDate: '15.01.2024',
    description:
      'Kollisionsschaden an BMW X5, Frontbereich betroffen. Fahrzeug ist fahrbereit, aber Reparatur erforderlich.',
    contact: {
      name: 'Maria Schneider',
      phone: '+41 44 123 45 67',
      email: 'maria.schneider@helvetia.ch',
      role: 'Schadenssachbearbeiterin',
    },
    timeline: [
      { date: '15.01.2024 09:30', event: 'Fall zugewiesen', type: 'system' },
      { date: '15.01.2024 10:15', event: 'Fall akzeptiert', type: 'expert' },
      { date: '16.01.2024 14:30', event: 'Erste Besichtigung durchgeführt', type: 'expert' },
      { date: '16.01.2024 15:45', event: 'Fotos hochgeladen', type: 'expert' },
      { date: '17.01.2024 09:00', event: 'Nachfrage zu Reparaturkosten', type: 'insurer' },
    ],
    documents: [
      { name: 'Schadensmeldung.pdf', type: 'pdf', size: '2.3 MB', uploaded: '15.01.2024' },
      { name: 'Fahrzeugschein.pdf', type: 'pdf', size: '1.1 MB', uploaded: '15.01.2024' },
      { name: 'Unfallskizze.jpg', type: 'image', size: '856 KB', uploaded: '15.01.2024' },
      { name: 'Fotos_Besichtigung.zip', type: 'archive', size: '12.4 MB', uploaded: '16.01.2024' },
    ],
    messages: [
      {
        id: 1,
        sender: 'Maria Schneider',
        role: 'Versicherer',
        messageType: 'insurer',
        time: '17.01.2024 09:00',
        message:
          'Guten Tag, könnten Sie bitte eine Einschätzung der Reparaturkosten abgeben? Der Kunde fragt nach.',
        attachments: [],
      },
      {
        id: 2,
        sender: 'Kurt Seiler',
        role: 'Experte',
        messageType: 'insurer',
        time: '17.01.2024 11:30',
        message:
          'Hallo Frau Schneider, basierend auf meiner Besichtigung schätze ich die Reparaturkosten auf CHF 8,500-10,200. Detaillierter Kostenvoranschlag folgt bis morgen.',
        attachments: ['Kosteneinschaetzung_vorlaeufig.pdf'],
      },
      {
        id: 3,
        sender: 'Burim Kryeziu',
        role: 'Admin',
        messageType: 'admin',
        time: '17.01.2024 09:00',
        message:
          'Ich bin ein Admin.',
        attachments: [],
      },
      {
        id: 4,
        sender: 'Kurt Seiler',
        role: 'Experte',
        messageType: 'admin',
        time: '17.01.2024 11:30',
        message:
          'Ich habe einen Doktortitel.',
        attachments: [],
      },
    ],
    timeEntries: [
      { date: '16.01.2024', description: 'Besichtigung vor Ort', hours: 2.5, type: 'Vor-Ort-Termin' },
      { date: '16.01.2024', description: 'Dokumentation und Fotos', hours: 1.0, type: 'Dokumentation' },
      { date: '17.01.2024', description: 'Kosteneinschätzung erstellen', hours: 1.5, type: 'Büroarbeit' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Neu':
        return 'bg-blue-100 text-blue-800';
      case 'Akzeptiert':
        return 'bg-green-100 text-green-800';
      case 'In Bearbeitung':
        return 'bg-yellow-100 text-yellow-800';
      case 'Abgeschlossen':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalHours = caseData.timeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const filteredMessages = caseData.messages.filter((msg) => msg.messageType === messageType)

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <PageHeader userType="expert-vehicle" userName="Kurt Seiler" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2">
            <Link
              href="/expert"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/expert/assignments"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Clock className="h-4 w-4" />
              <span>Zuweisungen</span>
              <Badge className="bg-yellow-500 text-white text-xs">3</Badge>
            </Link>
            <Link
              href="/expert/cases"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Meine Fälle</span>
            </Link>
            <Link
              href="/expert/reports"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Upload className="h-4 w-4" />
              <span>Berichte</span>
            </Link>
            <Link
              href="/expert/time-tracking"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Timer className="h-4 w-4" />
              <span>Zeiterfassung</span>
            </Link>
            <Link
              href="/expert/notifications"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Nachrichten</span>
              {<Badge className="bg-red-500 text-white text-xs">{2}</Badge>}
            </Link>
            <Link
              href="/expert/settings"
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span>Profil</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Link href="/expert/cases" className="flex items-center text-primary mb-3">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Übersicht
          </Link>
          {/* Case Header */}
          <div className="bg-white p-6 mb-6 rounded-xl border shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{caseData.id}</h1>
                  <Badge className={getStatusColor(caseData.status)}>{caseData.status}</Badge>
                </div>
                <p className="text-lg text-slate-600 mb-2">
                  {caseData.insurer} • {caseData.type}
                </p>
                <p className="text-gray-600">{caseData.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-800">{caseData.amount}</p>
                <p className="text-sm text-slate-500">Fällig: {caseData.deadline}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <MapPin className="h-4 w-4" />
                <span>{caseData.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Clock className="h-4 w-4" />
                <span>Zugewiesen: {caseData.assignedDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Timer className="h-4 w-4" />
                <span>Erfasst: {totalHours}h</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white mb-6 rounded-xl border shadow-sm">
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: "overview", label: "Übersicht" },
                  { id: "documents", label: "Dokumente" },
                  { id: "messages", label: "Nachrichten" },
                  { id: "time", label: "Zeiterfassung" },
                  { id: "report", label: "Bericht" },
                  { id: "invoice", label: "Rechnung" }, // NEW TAB
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3">Kontaktinformationen</h3>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-800">{caseData.contact.name}</h4>
                        <span className="text-sm text-slate-500">{caseData.contact.role}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{caseData.contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{caseData.contact.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3">Verlauf</h3>
                    <div className="space-y-3">
                      {caseData.timeline.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              item.type === "system"
                                ? "bg-blue-500"
                                : item.type === "expert"
                                  ? "bg-green-500"
                                  : "bg-purple-500"
                            }`}
                          ></div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{item.event}</p>
                            <p className="text-xs text-slate-500">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">Dokumente</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Fotos aufnehmen
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Hochladen
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseData.documents.map((doc, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-slate-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-slate-400" />
                            <span className="font-medium text-slate-800">{doc.name}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span>{doc.size}</span>
                          <span>{doc.uploaded}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "messages" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">Nachrichten</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
                          <button
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                              messageType === "insurer"
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                            onClick={() => setMessageType("insurer")}
                          >
                            Mit Versicherer
                          </button>
                          <button
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                              messageType === "admin"
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                            onClick={() => setMessageType("admin")}
                          >
                            Mit Admin
                          </button>
                        </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredMessages.map((msg) => (
                      <div key={msg.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-slate-800">{msg.sender}</span>
                            <Badge variant="outline" className="text-xs">
                              {msg.role}
                            </Badge>
                          </div>
                          <span className="text-sm text-slate-500">{msg.time}</span>
                        </div>
                        <p className="text-slate-700 mb-2">{msg.message}</p>
                        {msg.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {msg.attachments.map((attachment, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                📎 {attachment}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border rounded-lg p-4">
                    <Textarea
                      placeholder="Nachricht eingeben..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Anhang
                      </Button>
                      <Button size="sm" className="">
                        Senden
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "time" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">Zeiterfassung</h3>
                    <div className="text-sm text-slate-600">
                      Gesamt: <span className="font-semibold">{totalHours}h</span>
                    </div>
                  </div>

                  {/* Time Entries */}
                  <div className="space-y-3">
                    {caseData.timeEntries.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-800">{entry.description}</p>
                          <p className="text-sm text-slate-600">
                            {entry.date} • {entry.type}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-800">{entry.hours}h</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Time Entry */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-slate-800 mb-3">Zeit erfassen</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <input
                        type="date"
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                        defaultValue={new Date().toISOString().split("T")[0]}
                      />
                      <input
                        type="number"
                        step="0.5"
                        placeholder="Stunden"
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                      />
                      <select className="px-3 py-2 border border-slate-300 rounded-lg">
                        <option>Vor-Ort-Termin</option>
                        <option>Büroarbeit</option>
                        <option>Dokumentation</option>
                        <option>Telefon/E-Mail</option>
                        <option>Fahrtzeit</option>
                      </select>
                    </div>
                    <Textarea
                      placeholder="Beschreibung der Tätigkeit..."
                      value={timeEntry}
                      onChange={(e) => setTimeEntry(e.target.value)}
                      className="mb-3"
                    />
                    <Button className="">
                      <Timer className="h-4 w-4 mr-2" />
                      Zeit erfassen
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "report" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">Bericht erstellen</h3>
                    <Badge className="bg-yellow-100 text-yellow-800">In Bearbeitung</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-slate-800 mb-3">Berichtsentwurf</h4>
                      <Button className="w-full min-h-[200px] mb-3" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Anhänge
                      </Button>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Entwurf speichern
                          </Button>
                        </div>
                        <Button className="">Bericht einreichen</Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-800 mb-3">Checkliste</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm text-slate-700">Besichtigung durchgeführt</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm text-slate-700">Fotos aufgenommen</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm text-slate-700">Kostenvoranschlag eingeholt</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm text-slate-700">Bericht erstellt</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm text-slate-700">Qualitätsprüfung</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NEW: Rechnung */}
              {activeTab === "invoice" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">Rechnungsdaten</h3>
                    {invoiceSaved && (
                      <Badge className="bg-green-100 text-green-800">Gespeichert</Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Fälligkeitsdatum
                      </label>
                      <input
                        type="date"
                        value={invoice.dueDate}
                        onChange={(e) => setInvoice((p) => ({ ...p, dueDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Rechnungsbetrag (CHF)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={invoice.amount}
                        onChange={(e) => setInvoice((p) => ({ ...p, amount: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Rechnung als PDF</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                      <input
                        id="invoice-pdf"
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={onInvoiceFileChange}
                        className="hidden"
                      />
                      {invoice.file ? (
                        <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-slate-500" />
                            <div className="text-left">
                              <p className="text-sm font-medium text-slate-800">{invoice.file.name}</p>
                              <p className="text-xs text-slate-500">{formatBytes(invoice.file.size)}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={removeInvoiceFile}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                          <p className="text-slate-600 mb-3">Laden Sie Ihre Rechnung als PDF hoch</p>
                          <Button asChild variant="outline">
                            <label htmlFor="invoice-pdf" className="cursor-pointer">
                              PDF auswählen
                            </label>
                          </Button>
                        </>
                      )}
                      {invoiceError && <p className="text-red-600 text-sm mt-3">{invoiceError}</p>}
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <Button onClick={saveInvoice}>
                      Speichern
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
