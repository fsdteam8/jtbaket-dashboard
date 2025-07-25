"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CustomizeColorProps {
  onBack: () => void
}

export function CustomizeColor({ onBack }: CustomizeColorProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("green")

  const colors = [
    { name: "blue", value: "#1e40af", bgClass: "bg-blue-700" },
    { name: "green", value: "#16a34a", bgClass: "bg-green-500" },
    { name: "darkblue", value: "#1e3a8a", bgClass: "bg-blue-900" },
    { name: "purple", value: "#7c3aed", bgClass: "bg-purple-600" },
  ]

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>
          <div className="flex items-center text-sm text-gray-500">
            <button onClick={onBack} className="hover:text-gray-700">
              Dashboard
            </button>
            <ChevronRight className="w-4 h-4 mx-2" />
            <button onClick={onBack} className="hover:text-gray-700">
              Settings
            </button>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Customize color</span>
          </div>
        </div>
        <div
          className="w-10 h-10 rounded-full bg-gray-300 bg-cover bg-center"
          style={{ backgroundImage: "url(/placeholder.svg?height=40&width=40&query=profile)" }}
        ></div>
      </div>

      {/* Color Selector */}
      <div className="max-w-4xl">
        <div className="flex justify-end mb-8">
          <div className="relative">
            <Button
              variant="outline"
              className="bg-green-500 hover:bg-green-600 text-white border-green-500 px-6 py-2 rounded-full"
              onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
            >
              Color Select
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>

            {isColorPickerOpen && (
              <div className="absolute top-full right-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex gap-4">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-12 h-12 rounded-full ${color.bgClass} hover:scale-110 transition-transform ${
                        selectedColor === color.name ? "ring-2 ring-gray-400 ring-offset-2" : ""
                      }`}
                      onClick={() => {
                        setSelectedColor(color.name)
                        setIsColorPickerOpen(false)
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
