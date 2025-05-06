"use client";

import { motion, AnimatePresence } from "framer-motion";
import { OverlayConfig } from "@/types/overlay";
import { useEffect, useState } from "react";

interface SubscriptionNotificationProps {
  subscriberName: string;
  planName: string;
  config: OverlayConfig;
}

export function SubscriptionNotification({
  subscriberName,
  planName,
  config,
}: SubscriptionNotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    //Esconder a notificação após o tempo configurado
    const timer = setTimeout(() => {
      setVisible(false);
    }, (config.displayDuration || 5) * 1000 - 500);

    return () => clearTimeout(timer);
  }, [config.displayDuration]);

  // Aplicar estilo com base na configuração
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
  };

  const titleStyle = {
    color: config.accentColor || "#9333ea",
    fontSize: config.titleSize || "24px",
    fontWeight: "bold",
  };

  const messageStyle = {
    fontSize: config.messageSize || "18px",
  };

  const position = config.position || "bottom-right";

  //Determinar a posição da notificação
  let positionClass = "bottom-4 right-4";
  if (position === "top-left") positionClass = "top-4 left-4";
  if (position === "top-right") positionClass = "top-4 right-4";
  if (position === "bottom-left") positionClass = "bottom-4 left-4";
  if (position === "center")
    positionClass = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

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
              <strong>{subscriberName}</strong> assinou o plano{" "}
              <strong>{planName}</strong>!
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
