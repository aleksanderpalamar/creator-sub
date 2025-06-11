"use client"

import { motion } from "framer-motion"
import type { OverlayConfig } from "@/types/overlay"

interface PreviewNotificationProps {
  config: OverlayConfig
}

export function PreviewNotification({ config }: PreviewNotificationProps) {
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
    marginBottom: "8px",
  }

  const messageStyle = {
    fontSize: config.messageSize || "18px",
    margin: 0,
  }

  // Determinar a posição da notificação
  let positionClass = "bottom-4 right-4" // Posição padrão: inferior direito

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
  }

  return (
    <div className={`absolute ${positionClass}`}>
      <motion.div
        initial={false}
        animate={{
          backgroundColor: config.backgroundColor || "rgba(0, 0, 0, 0.7)",
          color: config.textColor || "#ffffff",
          borderColor: config.accentColor || "#9333ea",
          borderRadius: config.roundedCorners ? "12px" : "0px",
          width: config.notificationWidth || "400px",
        }}
        transition={{ duration: 0.3 }}
        style={{
          borderWidth: "4px",
          borderStyle: "solid",
          padding: "20px",
          maxWidth: "90%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontFamily: config.fontFamily || "sans-serif",
        }}
      >
        <motion.h3
          initial={false}
          animate={{
            color: config.accentColor || "#9333ea",
            fontSize: config.titleSize || "24px",
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          {config.titleText || "Novo Assinante!"}
        </motion.h3>
        <motion.p
          initial={false}
          animate={{
            fontSize: config.messageSize || "18px",
          }}
          transition={{ duration: 0.3 }}
          style={{
            margin: 0,
          }}
        >
          <strong>Usuário Exemplo</strong> assinou o plano <strong>Plano Premium</strong>!
        </motion.p>
      </motion.div>
    </div>
  )
}
