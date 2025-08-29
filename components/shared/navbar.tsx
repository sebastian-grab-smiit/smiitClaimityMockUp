"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Users,
  Building2,
  FileText,
  Plus,
  Download,
  Settings,
  MessageSquare,
  DollarSign,
  Upload,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LucideMap,
  File,
} from "lucide-react"
import Link from "next/link"

interface NavItem {
  href: string
  icon: any
  label: string
  badge?: number
  badgeColor?: string
}

interface NavbarProps {
  userType: "insurer" | "admin" | "expert-vehicle" | "expert-fraud" | "expert-appraiser"
  currentPath?: string
}

export function Navbar({ userType, currentPath = "" }: NavbarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const getNavItems = (): NavItem[] => {
    switch (userType) {
      case "admin":
        return [
          { href: "/admin", icon: BarChart3, label: "Dashboard" },
          { href: "/admin/experts", icon: Users, label: "Experten" },
          { href: "/admin/insurers", icon: Building2, label: "Versicherer" },
          { href: "/admin/cases", icon: FileText, label: "Alle Fälle" },
          { href: "/admin/assignment", icon: LucideMap, label: "Zuordnung" },
          { href: "/admin/reports", icon: File, label: "Berichte", badge: 3, badgeColor: "bg-yellow-500" },
          { href: "/admin/invoicing", icon: DollarSign, label: "Rechnungen" },
          { href: "/admin/notifications", icon: MessageSquare, label: "Nachrichten", badge: 2, badgeColor: "bg-red-500" },
          { href: "/admin/settings", icon: Settings, label: "Einstellungen" },
        ]
      case "insurer":
        return [
          { href: "/insurer", icon: BarChart3, label: "Dashboard" },
          { href: "/insurer/claims/new", icon: Plus, label: "Neuer Fall" },
          { href: "/insurer/claims", icon: FileText, label: "Alle Fälle" },
          { href: "/insurer/reports", icon: Download, label: "Berichte" },
          { href: "/insurer/notifications", icon: MessageSquare, label: "Nachrichten", badge: 2, badgeColor: "bg-red-500" },
          { href: "/insurer/settings", icon: Settings, label: "Einstellungen" },
        ]
      case "expert-appraiser":
        return [
          { href: "/expert/appraiser", icon: BarChart3, label: "Dashboard" },
          { href: "/expert/appraiser/cases", icon: FileText, label: "Meine Fälle" },
          { href: "/expert/appraiser/reports", icon: Upload, label: "Berichte" },
          { href: "/expert/appraiser/calendar", icon: Calendar, label: "Kalender" },
          { href: "/expert/appraiser/notifications", icon: MessageSquare, label: "Nachrichten", badge: 2, badgeColor: "bg-red-500" },
          { href: "/expert/appraiser/settings", icon: Settings, label: "Profil" },
        ]
      case "expert-fraud":
        return [
          { href: "/expert/fraud", icon: BarChart3, label: "Dashboard" },
          { href: "/expert/fraud/cases", icon: FileText, label: "Meine Fälle" },
          { href: "/expert/fraud/reports", icon: Upload, label: "Berichte" },
          { href: "/expert/fraud/calendar", icon: Calendar, label: "Kalender" },
          { href: "/expert/fraud/notifications", icon: MessageSquare, label: "Nachrichten", badge: 2, badgeColor: "bg-red-500" },
          { href: "/expert/fraud/settings", icon: Settings, label: "Profil" },
        ]
      case "expert-vehicle":
        return [
          { href: "/expert/vehicle", icon: BarChart3, label: "Dashboard" },
          { href: "/expert/vehicle/cases", icon: FileText, label: "Meine Fälle" },
          { href: "/expert/vehicle/reports", icon: Upload, label: "Berichte" },
          { href: "/expert/vehicle/calendar", icon: Calendar, label: "Kalender" },
          { href: "/expert/vehicle/notifications", icon: MessageSquare, label: "Nachrichten", badge: 2, badgeColor: "bg-red-500" },
          { href: "/expert/vehicle/settings", icon: Settings, label: "Profil" },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <aside
      className={cn(
        "bg-white border-r shadow-sm shrink-0 transition-all duration-600 sticky top-[0px] h-[calc(100vh-73px)] overflow-y-auto",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Collapse/Expand Button */}
      <div className="p-4 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("w-full justify-center hover:bg-slate-100", isCollapsed && "px-2")}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Menü einklappen</span>
            </>
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors group relative",
                isActive ? "bg-slate-50 text-primary" : "text-slate-600 hover:bg-slate-50",
                isCollapsed && "justify-center px-2",
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0 mt-1 mb-1" />
              {!isCollapsed && (
                <>
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <Badge className={cn("text-white text-xs ml-auto", item.badgeColor)}>{item.badge}</Badge>
                  )}
                </>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                  {item.badge && <span className="ml-1 px-1 bg-red-500 rounded text-xs">{item.badge}</span>}
                </div>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
