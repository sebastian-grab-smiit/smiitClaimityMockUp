"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MessageSquare, Send, Inbox, AlertCircle, Clock, User, Building } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"

export default function AdminCommunicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const inboxMessages = [
    {
      id: 1,
      caseId: "CLM-2024-001",
      from: "Hans Müller (Zurich)",
      to: "Dr. Weber (Expert)",
      subject: "Additional documentation needed",
      preview: "Could you please provide the structural assessment report...",
      timestamp: "2024-01-20 14:30",
      status: "Unread",
      priority: "High",
    },
    {
      id: 2,
      caseId: "CLM-2024-002",
      from: "Maria Schneider (Expert)",
      to: "AXA Claims Team",
      subject: "Fire damage assessment complete",
      preview: "I have completed the on-site assessment and the report is ready...",
      timestamp: "2024-01-20 11:15",
      status: "Read",
      priority: "Normal",
    },
    {
      id: 3,
      caseId: "CLM-2024-003",
      from: "System",
      to: "All Parties",
      subject: "SLA deadline approaching",
      preview: "Case CLM-2024-003 deadline is in 2 days...",
      timestamp: "2024-01-20 09:00",
      status: "Read",
      priority: "Medium",
    },
  ]

  const outboxMessages = [
    {
      id: 1,
      caseId: "CLM-2024-001",
      to: "Hans Müller (Zurich)",
      subject: "Expert assignment confirmation",
      preview: "Dr. Weber has been assigned to your case and will contact you...",
      timestamp: "2024-01-19 16:45",
      status: "Delivered",
    },
    {
      id: 2,
      caseId: "CLM-2024-004",
      to: "Anna Fischer (Expert)",
      subject: "New case assignment",
      preview: "You have been assigned a new theft case in Geneva...",
      timestamp: "2024-01-19 14:20",
      status: "Delivered",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Normal":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Communication Monitor</h1>
        <p className="text-gray-600">Cross-case message inbox and outbox monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inboxMessages.filter((m) => m.status === "Unread").length}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inbox</p>
                <p className="text-2xl font-bold text-gray-900">{inboxMessages.length}</p>
              </div>
              <Inbox className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sent Today</p>
                <p className="text-2xl font-bold text-gray-900">{outboxMessages.length}</p>
              </div>
              <Send className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inboxMessages.filter((m) => m.priority === "High").length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Message Center</CardTitle>
              <CardDescription>Monitor all communications across cases</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inbox" className="space-y-4">
            <TabsList>
              <TabsTrigger value="inbox" className="flex items-center gap-2">
                <Inbox className="h-4 w-4" />
                Inbox ({inboxMessages.length})
              </TabsTrigger>
              <TabsTrigger value="outbox" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Outbox ({outboxMessages.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inbox">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inboxMessages.map((message) => (
                    <TableRow key={message.id} className={message.status === "Unread" ? "bg-blue-50" : ""}>
                      <TableCell className="font-medium">{message.caseId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {message.from.includes("Expert") ? (
                            <User className="h-4 w-4 text-gray-400" />
                          ) : message.from.includes("System") ? (
                            <AlertCircle className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Building className="h-4 w-4 text-gray-400" />
                          )}
                          <span className={message.status === "Unread" ? "font-semibold" : ""}>{message.from}</span>
                        </div>
                      </TableCell>
                      <TableCell>{message.to}</TableCell>
                      <TableCell>
                        <div>
                          <p className={message.status === "Unread" ? "font-semibold" : ""}>{message.subject}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{message.preview}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={message.status === "Unread" ? "default" : "secondary"}>{message.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          {message.timestamp}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="outbox">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outboxMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">{message.caseId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {message.to.includes("Expert") ? (
                            <User className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Building className="h-4 w-4 text-gray-400" />
                          )}
                          {message.to}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{message.subject}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{message.preview}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{message.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          {message.timestamp}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
