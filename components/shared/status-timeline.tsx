"use client"

import { Badge } from "@/components/ui/badge"
import { Check, Clock, AlertTriangle, User, ComputerIcon as System } from "lucide-react"

interface TimelineEvent {
  id: string
  title: string
  description?: string
  timestamp: string
  type: "system" | "user" | "expert" | "insurer" | "admin"
  status: "completed" | "current" | "pending" | "warning"
  user?: string
}

interface StatusTimelineProps {
  events: TimelineEvent[]
  className?: string
}

export function StatusTimeline({ events, className = "" }: StatusTimelineProps) {
  const getIcon = (status: string, type: string) => {
    if (status === "completed") return <Check className="h-4 w-4 text-white" />
    if (status === "warning") return <AlertTriangle className="h-4 w-4 text-white" />
    if (status === "current") return <Clock className="h-4 w-4 text-white" />
    if (type === "system") return <System className="h-4 w-4 text-white" />
    return <User className="h-4 w-4 text-white" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "current":
        return "bg-blue-500"
      case "warning":
        return "bg-yellow-500"
      case "pending":
        return "bg-slate-300"
      default:
        return "bg-slate-300"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "expert":
        return "text-green-700"
      case "insurer":
        return "text-blue-700"
      case "admin":
        return "text-purple-700"
      case "system":
        return "text-slate-700"
      default:
        return "text-slate-700"
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {events.map((event, index) => (
        <div key={event.id} className="flex items-start space-x-4">
          {/* Timeline dot */}
          <div className="relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(event.status)}`}>
              {getIcon(event.status, event.type)}
            </div>
            {index < events.length - 1 && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-slate-200"></div>
            )}
          </div>

          {/* Event content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-slate-800">{event.title}</h4>
              <span className="text-sm text-slate-500">{event.timestamp}</span>
            </div>

            {event.description && <p className="text-sm text-slate-600 mb-2">{event.description}</p>}

            <div className="flex items-center space-x-2">
              {event.user && <span className={`text-sm font-medium ${getTypeColor(event.type)}`}>{event.user}</span>}
              <Badge variant="outline" className="text-xs capitalize">
                {event.type}
              </Badge>
              <Badge
                className={`text-xs ${
                  event.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : event.status === "current"
                      ? "bg-blue-100 text-blue-800"
                      : event.status === "warning"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-slate-100 text-slate-800"
                }`}
              >
                {event.status === "completed"
                  ? "Abgeschlossen"
                  : event.status === "current"
                    ? "Aktuell"
                    : event.status === "warning"
                      ? "Warnung"
                      : "Ausstehend"}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
