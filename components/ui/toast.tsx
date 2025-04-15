"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import type { Toast as ToastType } from "@/types/toast"
import { cn } from "@/lib/utils"

interface ToastProps {
  toast: ToastType
  onDismiss: (id: string) => void
}

const toastIcons = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
}

const toastClasses = {
  success: "border-green-500 bg-green-50 dark:bg-green-950/30 dark:border-green-800",
  error: "border-red-500 bg-red-50 dark:bg-red-950/30 dark:border-red-800",
  warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-800",
  info: "border-blue-500 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800",
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    // Wait for exit animation to complete
    setTimeout(() => {
      onDismiss(toast.id)
    }, 300)
  }

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full max-w-md items-center overflow-hidden rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out",
        toastClasses[toast.type],
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0">{toastIcons[toast.type]}</div>
        <div className="flex-1">
          <h3 className="font-medium">{toast.title}</h3>
          {toast.description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{toast.description}</p>}
          {toast.action && (
            <button onClick={toast.action.onClick} className="mt-2 text-sm font-medium text-primary hover:underline">
              {toast.action.label}
            </button>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="ml-4 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
}
