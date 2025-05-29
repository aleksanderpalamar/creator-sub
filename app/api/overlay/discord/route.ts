import { NextRequest } from "next/server";
import { TextChannel, Message } from "discord.js";
import { discordManager } from "@/lib/discord-client";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Map to store active client connections and event handlers
const clientsByChannel = new Map<string, {
  clients: Set<(data: string) => void>;
  messageHandler: (message: Message) => void;
}>();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get("channelId");

  if (!channelId) {
    return new Response("Channel ID is required", { status: 400 });
  }

  try {
    const discordClient = await discordManager.getClient();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    // Create or get channel config
    if (!clientsByChannel.has(channelId)) {
      const messageHandler = (message: Message) => {
        if (message.channelId !== channelId) return;

        const channelConfig = clientsByChannel.get(channelId);
        if (!channelConfig) return;

        const messageData = {
          id: message.id,
          content: message.content,
          author: {
            username: message.author.username,
            avatar: message.author.displayAvatarURL(),
          },
          timestamp: message.createdAt.toISOString(),
        };

        for (const client of channelConfig.clients) {
          client(`data: ${JSON.stringify(messageData)}\n\n`);
        }
      };

      clientsByChannel.set(channelId, {
        clients: new Set(),
        messageHandler,
      });

      // Add message listener for this channel
      discordClient.on("messageCreate", messageHandler);
      console.log(`Added message listener for channel ${channelId}`);
    }

    const channelConfig = clientsByChannel.get(channelId)!;
    const sendToClient = (data: string) => {
      writer.write(encoder.encode(data));
    };
    channelConfig.clients.add(sendToClient);
    console.log(`Added new client for channel ${channelId}. Total clients: ${channelConfig.clients.size}`);

    // Fetch initial messages
    try {
      const channel = await discordClient.channels.fetch(channelId);
      if (channel instanceof TextChannel) {
        const messages = await channel.messages.fetch({ limit: 25 });
        const initialMessages = Array.from(messages.values())
          .reverse()
          .map((msg) => {
            const message = msg as Message;
            return {
              id: message.id,
              content: message.content,
              author: {
                username: message.author.username,
                avatar: message.author.displayAvatarURL(),
              },
              timestamp: message.createdAt.toISOString(),
            };
          });

        sendToClient(`data: ${JSON.stringify(initialMessages)}\n\n`);
      }
    } catch (error) {
      console.error("Error fetching initial messages:", error);
    }

    // Clean up when client disconnects
    request.signal.addEventListener("abort", () => {
      const config = clientsByChannel.get(channelId);
      if (!config) return;

      config.clients.delete(sendToClient);
      console.log(`Removed client for channel ${channelId}. Remaining clients: ${config.clients.size}`);

      // If no more clients, remove all listeners and cleanup
      if (config.clients.size === 0) {
        discordClient.removeListener("messageCreate", config.messageHandler);
        clientsByChannel.delete(channelId);
        console.log(`Removed all listeners for channel ${channelId}`);
      }
    });

    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in Discord route:", error);
    return new Response("Failed to initialize Discord client", { status: 500 });
  }
}
