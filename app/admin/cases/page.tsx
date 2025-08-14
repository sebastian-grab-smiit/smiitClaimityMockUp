"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Eye, Clock, Building, User } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import Link from "next/link"

export default function AdminAllCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const cases = [
    {
      id: "CLM-2024-001",
      insurer: "Zurich Insurance",
      expert: "Dr. Hans Weber",
      expertLocation: "Zürich",
      status: "In Progress",
      type: "Water Damage",
      amount: "CHF 15,000",
      created: "2024-01-15",
      deadline: "2024-02-15",
      slaStatus: "On Track",
    },
    {
      id: "CLM-2024-002",
      insurer: "AXA Switzerland",
      expert: "Maria Schneider",
      expertLocation: "Basel",
      status: "Pending Review",
      type: "Fire Damage",
      amount: "CHF 45,000",
      created: "2024-01-18",
      deadline: "2024-02-18",
      slaStatus: "At Risk",
    },
    {
      id: "CLM-2024-003",
      insurer: "Swiss Re",
      expert: "Peter Müller",
      expertLocation: "Bern",
      status: "Completed",
      type: "Storm Damage",
      amount: "CHF 8,500",
      created: "2024-01-10",
      deadline: "2024-02-10",
      slaStatus: "Completed",
    },
    {
      id: "CLM-2024-004",
      insurer: "Baloise",
      expert: "Anna Fischer",
      expertLocation: "Geneva",
      status: "New",
      type: "Theft",
      amount: "CHF 12,000",
      created: "2024-01-20",
      deadline: "2024-02-20",
      slaStatus: "On Track",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Pending Review":
        return "bg-orange-100 text-orange-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSlaColor = (sla: string) => {
    switch (sla) {
      case "On Track":
        return "bg-green-100 text-green-800"
      case "At Risk":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Cases</h1>
          <p className="text-gray-600">Complete overview of all cases with lineage and status</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Insurer</TableHead>
                <TableHead>Expert</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((case_) => (
                <TableRow key={case_.id}>
                  <TableCell className="font-medium">{case_.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      {case_.insurer}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      {case_.expert}
                    </div>
                  </TableCell>
                  <TableCell>{case_.expertLocation}</TableCell>
                  <TableCell>{case_.type}</TableCell>
                  <TableCell className="font-medium">{case_.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSlaColor(case_.slaStatus)}>
                      <Clock className="h-3 w-3 mr-1" />
                      {case_.slaStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{case_.created}</TableCell>
                    <TableCell>
                      <Link href={`/admin/cases/${case_.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
