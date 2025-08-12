"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X } from "lucide-react"
import Link from "next/link"

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  active?: boolean
}

interface MobileNavProps {
  items: NavItem[]
  userType: "expert" | "insurer" | "admin"
  userName: string
}

export function MobileNav({ items, userType, userName }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "expert":
        return "bg-green-100 text-green-800"
      case "insurer":
        return "bg-blue-100 text-blue-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case "expert":
        return "Experte"
      case "insurer":
        return "Versicherer"
      case "admin":
        return "Administrator"
      default:
        return "Benutzer"
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />

          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-xl font-bold text-slate-800">claimity</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-slate-600">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-slate-800">{userName}</p>
                  <Badge className={getUserTypeColor(userType)}>{getUserTypeLabel(userType)}</Badge>
                </div>
              </div>
            </div>

            <nav className="p-4 space-y-2">
              {items.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      item.active
                        ? "bg-teal-50 text-teal-700 border border-teal-200"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-slate-50">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Version 1.0.0</span>
                <span>© 2024 Claimity</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
