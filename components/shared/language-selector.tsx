"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Check } from "lucide-react"

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "en", name: "English", flag: "🇬🇧" },
]

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState("de")
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
        {/* <Globe className="h-4 w-4" /> */}
        <span className="text-sm">{currentLang?.flag}</span>
        {/* <Badge variant="outline" className="text-xs">
          Phase 2
        </Badge> */}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Sprache wählen</div>
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  setCurrentLanguage(language.code)
                  setIsOpen(false)
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                </div>
                {currentLanguage === language.code && <Check className="h-4 w-4 text-teal-600" />}
              </button>
            ))}
          </div>
          <div className="border-t border-slate-200 p-3">
            <p className="text-xs text-slate-500">Mehrsprachigkeit wird in Phase 2 verfügbar sein</p>
          </div>
        </div>
      )}
    </div>
  )
}
