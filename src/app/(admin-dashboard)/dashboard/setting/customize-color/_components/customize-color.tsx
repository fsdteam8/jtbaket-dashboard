"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

const CustomizeColor = () => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("green")

  const { data: session } = useSession()
  const token = (session?.user as { accessToken: string })?.accessToken

  const colors = [
    { name: "blue", value: "#1e40af", bgClass: "bg-blue-700" },
    { name: "green", value: "#16a34a", bgClass: "bg-green-500" },
    { name: "darkblue", value: "#1e3a8a", bgClass: "bg-blue-900" },
    { name: "purple", value: "#7c3aed", bgClass: "bg-purple-600" },
  ]

  const { mutate, isPending } = useMutation({
    mutationKey: ["colors"],
    mutationFn: async (color: string) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/color/colors/687f2fa888a90081bd5e18f4`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ colorCode:color}),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Color change failed")
      }

      return data
    },
    onSuccess: (data) => {
      setIsColorPickerOpen(false)
      toast.success(data?.message || "Color changed successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Color change failed")
    },
  })

  const handleSubmitColor = (color: string, colorName: string) => {
    setSelectedColor(colorName)
    mutate(color)
  }

  return (
    <div className="flex justify-end">
      <div className="relative">
        <Button
          variant="outline"
          className="bg-green-500 hover:bg-green-600 text-white border-green-500 px-6 py-2 rounded-full"
          onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
          disabled={isPending}
        >
          {isPending ? "Applying..." : "Color Select"}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>

        {isColorPickerOpen && (
          <div className="absolute top-full right-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div className="flex gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`w-12 h-12 rounded-full ${color.bgClass} hover:scale-110 transition-transform ${selectedColor === color.name ? "ring-2 ring-gray-400 ring-offset-2" : ""
                    }`}
                  onClick={() => handleSubmitColor(color.value, color.name)}
                  disabled={isPending}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomizeColor
