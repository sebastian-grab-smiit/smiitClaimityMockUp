"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Building, Mail, Phone, MapPin, Edit, Trash2, Users, TrendingUp } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"

export default function AdminInsurersPage() {
  const [insurers, setInsurers] = useState([
    {
      id: 1,
      name: "Zurich Insurance",
      contact: "Hans Müller",
      email: "contact@zurich.ch",
      phone: "+41 44 628 25 25",
      location: "Zürich",
      status: "Active",
      activeCases: 15,
      totalCases: 142,
      avgAmount: "CHF 18,500",
    },
    {
      id: 2,
      name: "AXA Switzerland",
      contact: "Maria Weber",
      email: "info@axa.ch",
      phone: "+41 58 215 91 11",
      location: "Winterthur",
      status: "Active",
      activeCases: 8,
      totalCases: 89,
      avgAmount: "CHF 22,100",
    },
    {
      id: 3,
      name: "Swiss Re",
      contact: "Peter Schmidt",
      email: "contact@swissre.com",
      phone: "+41 43 285 21 21",
      location: "Zürich",
      status: "Active",
      activeCases: 12,
      totalCases: 67,
      avgAmount: "CHF 31,200",
    },
    {
      id: 4,
      name: "Baloise",
      contact: "Anna Fischer",
      email: "info@baloise.ch",
      phone: "+41 58 285 85 85",
      location: "Basel",
      status: "Inactive",
      activeCases: 0,
      totalCases: 23,
      avgAmount: "CHF 15,800",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Insurer Management</h1>
          <p className="text-gray-600">Manage insurance company partnerships and settings</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Insurer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Insurer</DialogTitle>
              <DialogDescription>Add a new insurance company to the platform</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="Insurance Company Name" />
              </div>
              <div>
                <Label htmlFor="contact-person">Primary Contact</Label>
                <Input id="contact-person" placeholder="Contact Person Name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="contact@company.ch" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+41 XX XXX XX XX" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, Canton" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-teal-600 hover:bg-teal-700">Add Insurer</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Insurers</p>
                <p className="text-2xl font-bold text-gray-900">{insurers.length}</p>
              </div>
              <Building className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Insurers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {insurers.filter((i) => i.status === "Active").length}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-2xl font-bold text-gray-900">{insurers.reduce((sum, i) => sum + i.totalCases, 0)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold text-gray-900">
                  {insurers.reduce((sum, i) => sum + i.activeCases, 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Insurance Companies</CardTitle>
          <CardDescription>Manage partnerships and company settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active Cases</TableHead>
                <TableHead>Total Cases</TableHead>
                <TableHead>Avg Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insurers.map((insurer) => (
                <TableRow key={insurer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{insurer.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {insurer.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {insurer.phone}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{insurer.contact}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {insurer.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        insurer.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {insurer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{insurer.activeCases}</TableCell>
                  <TableCell>{insurer.totalCases}</TableCell>
                  <TableCell className="font-medium">{insurer.avgAmount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
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
