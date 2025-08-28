"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import ReactCountryFlag from "react-country-flag"

interface Language {
  code: string
  name: string
  country: string
}

const languages: Language[] = [
  { code: "de", name: "Deutsch",  country: "DE" },
  { code: "en", name: "English",  country: "GB" },
  { code: "fr", name: "Français", country: "FR" },
  { code: "it", name: "Italiano", country: "IT" },
]

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState("de")
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = languages.find((l) => l.code === currentLanguage)

  const Flag = ({ country }: { country: string }) => (
    <ReactCountryFlag
      countryCode={country}
      svg
      title={country}
      style={{ width: "1.1rem", height: "1.1rem", borderRadius: "2px" }}
      aria-label={`${country} flag`}
    />
  )

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        {currentLang && <Flag country={currentLang.country} />}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
              Sprache wählen
            </div>
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
                  <Flag country={language.country} />
                  <span>{language.name}</span>
                </div>
                {currentLanguage === language.code && (
                  <Check className="h-4 w-4 text-teal-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
