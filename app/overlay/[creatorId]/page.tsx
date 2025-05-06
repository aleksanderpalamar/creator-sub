"use client";

import { SubscriptionNotification } from "@/components/overlay/subscription-notification";
import { OverlayConfig } from "@/types/overlay";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface NotificationData {
  subscriber: {
    name: string;
  };
  subscriptionPlan: {
    name: string;
  };
}

export default function OverlayPage() {
  const params = useParams<{ creatorId: string }>();
  const [config, setConfig] = useState<OverlayConfig | null>(null);
  const [notification, setNotification] = useState<NotificationData | null>(
    null
  );
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    //Carregar configurações do overlay
    const fetchConfig = async () => {
      try {
        const response = await fetch(
          `/api/overlay/config?creatorId=${params.creatorId}`
        );
        if (response.ok) {
          const data = await response.json();
          setConfig(data.config);
        }
      } catch (error) {
        console.error("Error ao carregar configurações:", error);
      }
    };

    fetchConfig();
  }, [params.creatorId]);

  useEffect(() => {
    //Configurar SSE para receber notificações em tempo real
    const eventSource = new EventSource(
      `/api/overlay/events?creatorId=${params.creatorId}`
    );
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as NotificationData;
        setNotification(data);
        setShowNotification(true);

        //Escoder a notificação após o tempo configurado
        setTimeout(() => {
          setShowNotification(false);
        }, (config?.displayDuration || 5) * 1000);
      } catch (error) {
        console.error("Erro ao processar a notificação", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("Erro na conexão SSE:", error);
      eventSource.close();

      //Tentar reconectar após 5 segundos
      setTimeout(() => {
        eventSource.close();
      }, 5000);
    };

    return () => {
      eventSource.close();
    };
  }, [params.creatorId, config]);

  //Se não houver configuração, mostrar uma mensagem de carregamento
  if (!config) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-transparent">
        <p className="text-white opacity-50">Carregando overlay</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-transparent">
      {showNotification && notification && (
        <SubscriptionNotification
          subscriberName={notification.subscriber.name}
          planName={notification.subscriptionPlan.name}
          config={config}
        />
      )}
    </div>
  );
}
