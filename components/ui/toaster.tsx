"use client"

import React from "react"
import { Toast } from "./toast"
import { createPortal } from "react-dom"
import { useToastContext } from "@/context/toast-context"

export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToastContext()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) return null

  // Render toasts in a portal to ensure they appear on top of everything
  return createPortal(
    <div
      className="fixed right-0 top-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-md"
      aria-live="assertive"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>,
    document.body,
  )
}
