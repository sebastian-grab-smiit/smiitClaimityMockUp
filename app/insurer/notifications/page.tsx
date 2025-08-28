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
  EyeOff,
  Plus,
  BarChart3,
  Download,
  Users,
  Settings
} from "lucide-react"
import Link from "next/link"

export default function InsurerNotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "report",
      title: "Bericht erhalten - CLM-2024-003",
      message: "Dr. Schmidt hat den Schadensbericht für Fall CLM-2024-003 eingereicht.",
      timestamp: "2024-01-18 16:20",
      read: false,
      source: "Dr. Schmidt",
      caseId: "CLM-2024-003",
      priority: "Hoch",
    },
    {
      id: 2,
      type: "message",
      title: "Nachricht von Experte",
      message: "Dr. Müller hat eine Nachfrage zu Fall CLM-2024-001 gestellt.",
      timestamp: "2024-01-18 14:45",
      read: false,
      source: "Dr. Müller",
      caseId: "CLM-2024-001",
      priority: "Mittel",
    },
    {
      id: 3,
      type: "deadline",
      title: "SLA-Warnung - CLM-2024-002",
      message: "Der Bericht für Fall CLM-2024-002 ist in 24 Stunden fällig.",
      timestamp: "2024-01-18 13:30",
      read: true,
      source: "Claimity System",
      caseId: "CLM-2024-002",
      priority: "Hoch",
    },
    {
      id: 4,
      type: "assignment",
      title: "Experte zugewiesen - CLM-2024-004",
      message: "Dr. Weber wurde dem Fall CLM-2024-004 zugewiesen.",
      timestamp: "2024-01-18 11:15",
      read: true,
      source: "Claimity System",
      caseId: "CLM-2024-004",
      priority: "Normal",
    },
    {
      id: 5,
      type: "invoice",
      title: "Rechnung eingegangen - INV-2024-015",
      message: "Neue Expertenrechnung von Dr. Schmidt erhalten. CHF 750.00",
      timestamp: "2024-01-18 09:45",
      read: true,
      source: "Dr. Schmidt",
      caseId: "CLM-2024-003",
      priority: "Normal",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "report":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "deadline":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "assignment":
        return <User className="h-5 w-5 text-teal-500" />
      case "invoice":
        return <CheckCircle className="h-5 w-5 text-purple-500" />
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
      <PageHeader userType="insurer" userName="Helvetia Versicherung" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shrink-0">
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
              className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
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
              href="/insurer/notifications"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-50 text-primary rounded-lg"
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

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Benachrichtigungen</h1>
                <p className="text-gray-600">All Ihre Benachrichtigungen</p>
              </div>
            </div>
            {/* Filters */}
            <Card className="mb-6">
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
                      <SelectItem value="report">Berichte</SelectItem>
                      <SelectItem value="message">Nachrichten</SelectItem>
                      <SelectItem value="deadline">Fristen</SelectItem>
                      <SelectItem value="assignment">Zuweisungen</SelectItem>
                      <SelectItem value="invoice">Rechnungen</SelectItem>
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
          </div>
        </main>
      </div>
    </div>
  )
}
