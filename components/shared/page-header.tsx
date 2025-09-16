"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { NotificationCenter } from "./notification-center"
import { LanguageSelector } from "./language-selector"
import Image from "next/image"
import logo from "../../public/logo.png"
import logo_dummy from "../../public/tdc.png"

interface PageHeaderProps {
  userType?: "insurer" | "admin" | "expert-vehicle" | "expert-fraud" | "expert-appraiser" | "expert" | ""
  userName?: string
  showBackButton?: boolean
  backUrl?: string
  isAuthenticated?: boolean
}

export function PageHeader({
  userType,
  userName,
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
        return "Fahrzeugexperten Portal"
      case "expert-appraiser":
        return "Sachverständiger Portal"
      case "expert":
        return "Experten Portal"
      default:
        return ""
    }
  }

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">

            {/* Logo */}
            <div className="flex items-center space-x-3 min-w-0">
              {userType === "expert-vehicle" ?
                <Image
                  src={logo_dummy}
                  alt="Claimity Logo"
                  width={150}
                  height={50}
                  className="rounded-lg"
                /> :
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-QPdI2ZFgQGOHkKIkK0SoioSmi1UBNJ.png"
                  alt="Claimity Logo"
                  width={80}
                  height={24}
                  className="h-6 w-auto sm:h-7"
                />
              }

              {userType && (
                <div className="hidden sm:flex items-center">
                  <div className="w-px h-6 bg-slate-300 mx-3" />
                  <Badge
                    variant="outline"
                    className="g-slate-50 text-slate-700 border-primary font-medium px-3 py-1 text-sm whitespace-nowrap ml-3"
                  >
                    {getUserTypeLabel(userType)}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            {userName && <span className="text-sm text-slate-600 hidden lg:block max-w-72 truncate">{userName}</span>}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>
            {userType && <NotificationCenter />}
            {userType && <Link href="/login">
              <Button variant="ghost" size="sm" className="p-2">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>}
          </div>
        </div>
      </div>
      {userType && <div className="sm:hidden h-8" />}
    </header>
  )
}
