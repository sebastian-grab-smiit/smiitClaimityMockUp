"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Camera, Upload, MessageSquare, Timer, FileText, Search, Calendar, Phone } from "lucide-react"

interface QuickAction {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  onClick?: () => void
  badge?: string
  variant?: "default" | "outline" | "ghost"
}

interface QuickActionsProps {
  actions: QuickAction[]
  title?: string
  className?: string
}

export function QuickActions({ actions, title = "Schnellaktionen", className = "" }: QuickActionsProps) {
  return (
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
        <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
        {title}
      </h3>

      <div className="grid grid-cols-1 gap-2">
        {actions.map((action) => {
          const Icon = action.icon
          const content = (
            <Button
              key={action.id}
              variant={action.variant || "outline"}
              className="w-full justify-start bg-transparent hover:bg-slate-50"
              onClick={action.onClick}
            >
              <Icon className="h-4 w-4 mr-2" />
              <span className="flex-1 text-left">{action.label}</span>
              {action.badge && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {action.badge}
                </Badge>
              )}
            </Button>
          )

          if (action.href) {
            return (
              <a key={action.id} href={action.href}>
                {content}
              </a>
            )
          }

          return content
        })}
      </div>
    </div>
  )
}

// Predefined action sets for different user types
export const expertQuickActions: QuickAction[] = [
  {
    id: "take-photos",
    label: "Fotos aufnehmen",
    icon: Camera,
    onClick: () => console.log("Open camera"),
  },
  {
    id: "track-time",
    label: "Zeit erfassen",
    icon: Timer,
    href: "/expert/time-tracking",
  },
  {
    id: "upload-report",
    label: "Bericht hochladen",
    icon: Upload,
    onClick: () => console.log("Open file upload"),
  },
  {
    id: "send-message",
    label: "Nachricht senden",
    icon: MessageSquare,
    onClick: () => console.log("Open messaging"),
  },
  {
    id: "view-calendar",
    label: "Kalender öffnen",
    icon: Calendar,
    href: "/expert/calendar",
  },
]

export const insurerQuickActions: QuickAction[] = [
  {
    id: "new-claim",
    label: "Neuen Fall erstellen",
    icon: Plus,
    href: "/insurer/claims/new",
  },
  {
    id: "search-claims",
    label: "Fälle suchen",
    icon: Search,
    href: "/insurer/claims",
  },
  {
    id: "contact-expert",
    label: "Experten kontaktieren",
    icon: Phone,
    onClick: () => console.log("Contact expert"),
  },
  {
    id: "view-reports",
    label: "Berichte anzeigen",
    icon: FileText,
    href: "/insurer/reports",
  },
]

export const adminQuickActions: QuickAction[] = [
  {
    id: "triage",
    label: "Triage-Board",
    icon: Search,
    href: "/admin/triage",
  },
  {
    id: "assignment",
    label: "Zuweisungen",
    icon: Plus,
    href: "/admin/assignment",
  },
  {
    id: "review-reports",
    label: "Berichte prüfen",
    icon: FileText,
    href: "/admin/reports",
    badge: "3",
  },
  {
    id: "manage-experts",
    label: "Experten verwalten",
    icon: Phone,
    href: "/admin/experts",
  },
]
