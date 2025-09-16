"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  Search,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  FileText,
  Trash2,
  Eye,
  Upload,
  EyeOff,
  Settings,
  BarChart3,
  Calendar,
  Timer
} from "lucide-react"
import Link from "next/link"

export default function ExpertNotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "assignment",
      title: "Neuer Fall zugewiesen - CLM-2024-007",
      message: "Ihnen wurde ein neuer Fahrzeugschaden in Zürich zugewiesen. Frist: 3 Tage.",
      timestamp: "2024-01-18 15:30",
      read: false,
      source: "Claimity System",
      caseId: "CLM-2024-007",
      priority: "Hoch",
    },
    {
      id: 2,
      type: "message",
      title: "Nachricht von Helvetia Versicherung",
      message: "Zusätzliche Informationen zu Fall CLM-2024-003 angefordert.",
      timestamp: "2024-01-18 14:15",
      read: false,
      source: "Maria Schneider",
      caseId: "CLM-2024-003",
      priority: "Mittel",
    },
    {
      id: 3,
      type: "deadline",
      title: "Bericht fällig morgen - CLM-2024-002",
      message: "Der Schadensbericht für Fall CLM-2024-002 ist morgen fällig.",
      timestamp: "2024-01-18 12:00",
      read: true,
      source: "Claimity System",
      caseId: "CLM-2024-002",
      priority: "Hoch",
    },
    {
      id: 4,
      type: "approval",
      title: "Bericht genehmigt - CLM-2024-001",
      message: "Ihr Schadensbericht wurde genehmigt und zur Zahlung freigegeben.",
      timestamp: "2024-01-18 10:45",
      read: true,
      source: "Admin",
      caseId: "CLM-2024-001",
      priority: "Normal",
    },
    {
      id: 5,
      type: "payment",
      title: "Zahlung erhalten - INV-2024-008",
      message: "Ihre Rechnung INV-2024-008 wurde bezahlt. CHF 650.00",
      timestamp: "2024-01-18 09:20",
      read: true,
      source: "Buchhaltung",
      caseId: "CLM-2024-001",
      priority: "Normal",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "deadline":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "approval":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "payment":
        return <CheckCircle className="h-5 w-5 text-teal-500" />
      default:
        return <Bell className="h-5 w-5 text-slate-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Hoch":
        return "bg-red-100 text-red-800"
      case "Mittel":
        return "bg-yellow-100 text-yellow-800"
      case "Normal":
        return "bg-green-100 text-green-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "unread" && !notification.read) ||
      (statusFilter === "read" && notification.read)
    const matchesType = typeFilter === "all" || notification.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const unreadCount = notifications.filter((n) => !n.read).length

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
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
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
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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
          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Benachrichtigungen</span>
                {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount} ungelesen</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Benachrichtigungen durchsuchen..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle</SelectItem>
                    <SelectItem value="unread">Ungelesen</SelectItem>
                    <SelectItem value="read">Gelesen</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Typ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Typen</SelectItem>
                    <SelectItem value="assignment">Zuweisungen</SelectItem>
                    <SelectItem value="message">Nachrichten</SelectItem>
                    <SelectItem value="deadline">Fristen</SelectItem>
                    <SelectItem value="approval">Genehmigungen</SelectItem>
                    <SelectItem value="payment">Zahlungen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`${!notification.read ? "border-l-4 border-l-primary" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${!notification.read ? "text-slate-900" : "text-slate-700"}`}>
                            {notification.title}
                          </h3>
                          <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                          {!notification.read && <Badge className="bg-red-500 text-white text-xs">Neu</Badge>}
                        </div>
                        <p className="text-slate-600 mb-2">{notification.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{notification.timestamp}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{notification.source}</span>
                          </div>
                          {notification.caseId && (
                            <div className="flex items-center space-x-1">
                              <FileText className="h-3 w-3" />
                              <span>{notification.caseId}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        {notification.read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
