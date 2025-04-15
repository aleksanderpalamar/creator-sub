"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { Toast, ToastContextType } from "@/types/toast"
import { v4 as uuidv4 } from "uuid"

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = uuidv4()
    setToasts((prevToasts) => [...prevToasts, { ...toast, id }])

    // Auto-dismiss toast after duration
    if (toast.duration !== Number.POSITIVE_INFINITY) {
      const duration = toast.duration || 5000 // Default 5 seconds
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, removeAllToasts }}>{children}</ToastContext.Provider>
  )
}

export const useToastContext = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider")
  }
  return context
}