"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { OverlayConfig } from "@/types/overlay"

interface SubscriptionNotificationProps {
  subscriberName: string
  planName: string
  config: OverlayConfig
}

export function SubscriptionNotification({ subscriberName, planName, config }: SubscriptionNotificationProps) {
  const [visible, setVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setVisible(true)

    // Reproduzir som se estiver habilitado
    if (config.soundEnabled && config.soundUrl) {
      try {
        if (!audioRef.current) {
          audioRef.current = new Audio(config.soundUrl)
        } else {
          audioRef.current.src = config.soundUrl
        }

        audioRef.current.play().catch((error) => {
          console.error("Erro ao reproduzir som:", error)
        })
      } catch (error) {
        console.error("Erro ao configurar áudio:", error)
      }
    }

    // Esconder a notificação após o tempo configurado
    const timer = setTimeout(
      () => {
        setVisible(false)
      },
      (config.displayDuration || 5) * 1000 - 500,
    ) // Subtrair 500ms para a animação de saída

    return () => {
      clearTimeout(timer)
      // Parar o áudio quando o componente for desmontado
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [config.displayDuration, config.soundEnabled, config.soundUrl])

  // Aplicar estilos com base na configuração
  const containerStyle = {
    backgroundColor: config.backgroundColor || "rgba(0, 0, 0, 0.7)",
    color: config.textColor || "#ffffff",
    fontFamily: config.fontFamily || "sans-serif",
    borderColor: config.accentColor || "#9333ea",
    borderWidth: "4px",
    borderStyle: "solid",
    borderRadius: config.roundedCorners ? "12px" : "0px",
    padding: "20px",
    maxWidth: "90%",
    width: config.notificationWidth || "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }

  const titleStyle = {
    color: config.accentColor || "#9333ea",
    fontSize: config.titleSize || "24px",
    fontWeight: "bold",
  }

  const messageStyle = {
    fontSize: config.messageSize || "18px",
  }

  // Determinar a posição da notificação
  let positionClass = "bottom-4 right-4" // Posição padrão: inferior direito

  // Verificar a posição configurada
  switch (config.position) {
    case "top-left":
      positionClass = "top-4 left-4"
      break
    case "top-right":
      positionClass = "top-4 right-4"
      break
    case "bottom-left":
      positionClass = "bottom-4 left-4"
      break
    case "bottom-right":
      positionClass = "bottom-4 right-4"
      break
    case "center":
      positionClass = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      break
    default:
      positionClass = "bottom-4 right-4"
  }

  console.log("Posição configurada:", config.position)
  console.log("Classe de posição aplicada:", positionClass)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed ${positionClass} z-50`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div style={containerStyle}>
            <h3 style={titleStyle}>{config.titleText || "Novo Assinante!"}</h3>
            <p style={messageStyle}>
              <strong>{subscriberName}</strong> assinou o plano <strong>{planName}</strong>!
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}