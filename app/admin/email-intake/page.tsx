"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Mail, FileText, AlertTriangle, CheckCircle, Clock, Settings, Eye, RefreshCw } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"

export default function AdminEmailIntakePage() {
  const [activeTab, setActiveTab] = useState("processing")

  const processingQueue = [
    {
      id: 1,
      email: "claims@zurich.ch",
      subject: "New water damage claim - Policy #ZUR-2024-001",
      received: "2024-01-20 15:30",
      status: "Processing",
      confidence: 95,
      extractedData: {
        policyNumber: "ZUR-2024-001",
        claimType: "Water Damage",
        amount: "CHF 15,000",
      },
    },
    {
      id: 2,
      email: "info@axa.ch",
      subject: "Fire damage assessment required",
      received: "2024-01-20 14:15",
      status: "OCR Complete",
      confidence: 88,
      extractedData: {
        policyNumber: "AXA-2024-045",
        claimType: "Fire Damage",
        amount: "CHF 45,000",
      },
    },
    {
      id: 3,
      email: "claims@swissre.com",
      subject: "Storm damage report attached",
      received: "2024-01-20 13:45",
      status: "Ready for Review",
      confidence: 92,
      extractedData: {
        policyNumber: "SRE-2024-012",
        claimType: "Storm Damage",
        amount: "CHF 8,500",
      },
    },
  ]

  const failedIngests = [
    {
      id: 1,
      email: "unknown@sender.com",
      subject: "Claim submission",
      received: "2024-01-20 12:00",
      error: "Unable to extract policy number",
      reason: "Missing required fields",
    },
    {
      id: 2,
      email: "claims@baloise.ch",
      subject: "Damage assessment - corrupted attachment",
      received: "2024-01-20 10:30",
      error: "PDF corruption detected",
      reason: "Attachment unreadable",
    },
  ]

  const routingRules = [
    {
      id: 1,
      name: "Zurich Claims",
      condition: "From: *@zurich.ch",
      action: "Route to Zurich Portal",
      priority: "High",
      status: "Active",
    },
    {
      id: 2,
      name: "AXA Claims",
      condition: "From: *@axa.ch",
      action: "Route to AXA Portal",
      priority: "High",
      status: "Active",
    },
    {
      id: 3,
      name: "Emergency Claims",
      condition: "Subject contains: URGENT",
      action: "Priority Queue + SMS Alert",
      priority: "Critical",
      status: "Active",
    },
    {
      id: 4,
      name: "Large Claims",
      condition: "Amount > CHF 50,000",
      action: "Senior Review Required",
      priority: "High",
      status: "Active",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "OCR Complete":
        return "bg-yellow-100 text-yellow-800"
      case "Ready for Review":
        return "bg-green-100 text-green-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Intake & OCR Monitor</h1>
          <p className="text-gray-600">Monitor email processing, OCR status, and routing rules</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing Queue</p>
                <p className="text-2xl font-bold text-gray-900">{processingQueue.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processed Today</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Ingests</p>
                <p className="text-2xl font-bold text-gray-900">{failedIngests.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                <p className="text-2xl font-bold text-gray-900">92%</p>
              </div>
              <FileText className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="processing" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Processing Queue ({processingQueue.length})
              </TabsTrigger>
              <TabsTrigger value="failed" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Failed Ingests ({failedIngests.length})
              </TabsTrigger>
              <TabsTrigger value="routing" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Routing Rules ({routingRules.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="processing">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Extracted Data</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processingQueue.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {item.email}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{item.subject}</TableCell>
                      <TableCell>{item.received}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getConfidenceColor(item.confidence)}`}>{item.confidence}%</span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>
                            <strong>Policy:</strong> {item.extractedData.policyNumber}
                          </p>
                          <p>
                            <strong>Type:</strong> {item.extractedData.claimType}
                          </p>
                          <p>
                            <strong>Amount:</strong> {item.extractedData.amount}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="failed">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead>Error</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {failedIngests.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-red-400" />
                          {item.email}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{item.subject}</TableCell>
                      <TableCell>{item.received}</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800">{item.error}</Badge>
                      </TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="routing" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Routing Rules</h3>
                <Button className="bg-teal-600 hover:bg-teal-700">Add Rule</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routingRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell className="font-mono text-sm bg-gray-50 rounded px-2 py-1">{rule.condition}</TableCell>
                      <TableCell>{rule.action}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            rule.priority === "Critical"
                              ? "bg-red-100 text-red-800"
                              : rule.priority === "High"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {rule.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            rule.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {rule.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
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
