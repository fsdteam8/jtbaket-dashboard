"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// import type { SettingsPage } from "@/app/page"
export type SettingsPage = "main" | "personal" | "password" | "color"

interface SettingsMainProps {
  onNavigate: (page: SettingsPage) => void
}

export function SettingsMain({ onNavigate }: SettingsMainProps) {
  const settingsOptions = [
    { label: "Personal Information", key: "personal" as const },
    { label: "Change Password", key: "password" as const },
    { label: "Customize Color", key: "color" as const },
  ]

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Settings</span>
          </div>
        </div>
        <div
          className="w-10 h-10 rounded-full bg-gray-300 bg-cover bg-center"
          style={{ backgroundImage: "url(/placeholder.svg?height=40&width=40&query=profile)" }}
        ></div>
      </div>

      {/* Settings Options */}
      <div className="space-y-4 max-w-4xl">
        {settingsOptions.map((option) => (
          <Card key={option.key} className="p-0 border border-gray-200 rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              className="w-full h-16 justify-between px-6 hover:bg-gray-50 rounded-none"
              onClick={() => onNavigate(option.key)}
            >
              <span className="text-lg font-medium text-gray-700">{option.label}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
