"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { NotificationCenter } from "./notification-center"
import { LanguageSelector } from "./language-selector"
import Image from "next/image"

interface PageHeaderProps {
  userType?: "insurer" | "admin" | "expert-vehicle" | "expert-fraud" | "expert-appraiser" | "expert"
  userName?: string
  showBackButton?: boolean
  backUrl?: string
  showAuth?: boolean
}

export function PageHeader({
  userType,
  userName,
  showBackButton = false,
  backUrl = "/",
  showAuth = true,
}: PageHeaderProps) {
  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case "insurer":
        return "Versicherer Portal"
      case "admin":
        return "Admin Portal"
      case "expert-fraud":
        return "Betrugsermittler Portal"
      case "expert-vehicle":
        return "Fahrzeugexperte Portal"
      case "expert-appraiser":
        return "Schverständiger Portal"
      case "expert":
        return "Experten Portal"
      default:
        return ""
    }
  }

  const getUserTypeBadgeColor = (type: string) => {
    // switch (type) {
    //   case "insurer":
    //     return "bg-blue-100 text-blue-800"
    //   case "admin":
    //     return "bg-purple-100 text-purple-800"
    //   case "expert":
    //     return "bg-green-100 text-green-800"
    //   default:
    //     return "bg-slate-100 text-primary"
    // }
    return "bg-slate-100 text-primary"
  }

  return (
    <header className="bg-white border-b">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Link href={backUrl}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <div className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-QPdI2ZFgQGOHkKIkK0SoioSmi1UBNJ.png"
              alt="Claimity Logo"
              width={95}
              height={36}
              className="rounded-lg"
            />
            {/* <span className="text-xl font-bold text-slate-800">claimity</span> */}
          </div>
          {userType && (
            <Badge variant="secondary" className={getUserTypeBadgeColor(userType)}>
              {getUserTypeLabel(userType)}
            </Badge>
          )}
        </div>

        {showAuth && (
          <div className="flex items-center space-x-2 md:space-x-4">
            {userName && <span className="text-sm text-slate-600 hidden md:block">{userName}</span>}
            <LanguageSelector />
            {userType && <NotificationCenter />}
            {/* <Link href={`/${userType}/settings`}>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </Link> */}
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
