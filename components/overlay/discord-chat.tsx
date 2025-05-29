"use client";

import { useEffect, useState, useRef } from "react";
import { OverlayConfig } from "@/types/overlay";

interface DiscordMessage {
  id: string;
  content: string;
  author: {
    username: string;
    avatar?: string;
  };
  timestamp: string;
}

interface DiscordChatProps {
  config: OverlayConfig;
}

export function DiscordChat({ config }: DiscordChatProps) {
  const [messages, setMessages] = useState<DiscordMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!config.discordEnabled || !config.discordChannelId) return;

    // Conectar ao SSE endpoint para receber mensagens do Discord
    const eventSource = new EventSource(
      `/api/overlay/discord?channelId=${config.discordChannelId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Se for um array, são as mensagens iniciais
        if (Array.isArray(data)) {
          // Recebeu histórico inicial de mensagens
          const validMessages = data.filter(
            (msg) => msg && msg.content && msg.author && msg.id
          );
          setMessages(validMessages);
        } else {
          // Se não for array, é uma única mensagem
          const message = data as DiscordMessage;
          if (!message?.id || !message.content || !message.author) {
            console.warn("Mensagem inválida recebida:", data);
            return;
          }
          setMessages((prev) => {
            // Verificar se a mensagem já existe
            if (prev.find((m) => m.id === message.id)) {
              return prev; // Ignorar mensagem duplicada
            }
            const newMessages = [...prev, message];
            // Limitar o número de mensagens de acordo com a configuração
            if (newMessages.length > (config.discordMessageLimit || 25)) {
              return newMessages.slice(-config.discordMessageLimit!);
            }
            return newMessages;
          });
        }
      } catch (error) {
        console.error("Erro ao processar mensagem do Discord:", error);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [
    config.discordEnabled,
    config.discordChannelId,
    config.discordMessageLimit,
  ]);

  // Scroll para a última mensagem quando novas mensagens chegarem
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!config.discordEnabled || !config.discordChannelId) return null;

  return (
    <div
      className="w-full overflow-hidden bg-opacity-70"
      style={{
        height: config.discordChatHeight || "400px",
        backgroundColor: config.backgroundColor || "rgba(0, 0, 0, 0.7)",
        borderRadius: config.roundedCorners ? "8px" : "0",
        fontFamily: config.fontFamily || "sans-serif",
        color: config.textColor || "#ffffff",
      }}
    >
      <div
        ref={chatContainerRef}
        className="h-full overflow-y-auto space-y-2 p-4"
        style={{ fontSize: config.messageSize || "16px" }}
      >
        {messages.map((message) => (
          <div key={message.id} className="animate-fade-in">
            <div className="flex items-start gap-2">
              <img
                src={
                  message.author.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.author.username
                  )}&background=random`
                }
                alt={message.author.username}
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.author.username
                  )}&background=random`;
                }}
              />
              <div>
                <span
                  className="font-bold mr-2"
                  style={{ color: config.accentColor || "#9333ea" }}
                >
                  {message.author.username}
                </span>
                <span className="text-sm opacity-60">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
                <p className="mt-1">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
