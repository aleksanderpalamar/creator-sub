import { Client, GatewayIntentBits } from "discord.js";

class DiscordManager {
  private static instance: DiscordManager;
  private client: Client | null = null;
  private isInitializing: boolean = false;
  private messageListeners: Map<string, ((message: any) => void)[]> = new Map();

  private constructor() {}

  static getInstance(): DiscordManager {
    if (!DiscordManager.instance) {
      DiscordManager.instance = new DiscordManager();
    }
    return DiscordManager.instance;
  }

  async getClient(): Promise<Client> {
    if (this.client?.isReady()) {
      return this.client;
    }

    if (this.isInitializing) {
      // Esperar até que a inicialização termine
      while (this.isInitializing) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      if (this.client?.isReady()) {
        return this.client;
      }
    }

    this.isInitializing = true;

    try {
      console.log('Iniciando cliente do Discord...');
      
      this.client = new Client({
        intents: [
          GatewayIntentBits.Guilds,            // Necessário para informações básicas do servidor
          GatewayIntentBits.GuildMessages,     // Necessário para receber mensagens
          GatewayIntentBits.MessageContent,    // Necessário para ler o conteúdo das mensagens
          GatewayIntentBits.GuildMembers,      // Necessário para informações dos membros
        ],
      });

      // Debug event handlers
      this.client.on('ready', () => {
        console.log(`Bot está online como ${this.client?.user?.tag}`);
      });

      this.client.on('error', (error) => {
        console.error('Erro no cliente Discord:', error);
        this.client = null;
      });

      this.client.on('disconnect', () => {
        console.log('Bot desconectado do Discord');
        this.client = null;
      });

      // Login with token
      if (!process.env.DISCORD_BOT_TOKEN) {
        throw new Error('DISCORD_BOT_TOKEN não está definido nas variáveis de ambiente');
      }

      console.log('Tentando fazer login com token:', process.env.DISCORD_BOT_TOKEN.substring(0, 10) + '...');
      await this.client.login(process.env.DISCORD_BOT_TOKEN);
      console.log('Bot logado com sucesso!');

      return this.client;
    } catch (error) {
      console.error('Erro ao inicializar cliente Discord:', error);
      this.client = null;
      throw error;
    } finally {
      this.isInitializing = false;
    }
  }

  async startListeningToChannel(channelId: string, onMessage: (message: any) => void) {
    const client = await this.getClient();
    
    if (!this.messageListeners.has(channelId)) {
      this.messageListeners.set(channelId, []);
    }
    
    this.messageListeners.get(channelId)?.push(onMessage);

    // Configurar o handler de mensagens se ainda não estiver configurado
    if (!client.listenerCount('messageCreate')) {
      client.on('messageCreate', async (message) => {
        // Type guard to ensure message is a Message from discord.js
        if (
          typeof message === "object" &&
          message !== null &&
          "channelId" in message &&
          "content" in message &&
          "author" in message &&
          "createdTimestamp" in message &&
          "id" in message
        ) {
          // Verificar se a mensagem é do canal que estamos monitorando
          if (this.messageListeners.has((message as any).channelId)) {
            const listeners = this.messageListeners.get((message as any).channelId);
            listeners?.forEach(listener => {
              const msg = message as import("discord.js").Message;
              listener({
                content: msg.content,
                author: {
                  username: msg.author.username,
                  avatar: msg.author.avatarURL(),
                },
                timestamp: msg.createdTimestamp,
                id: msg.id,
              });
            });
          }
        }
      });
    }
  }

  async stopListeningToChannel(channelId: string, onMessage: (message: any) => void) {
    const listeners = this.messageListeners.get(channelId);
    if (listeners) {
      const index = listeners.indexOf(onMessage);
      if (index > -1) {
        listeners.splice(index, 1);
      }
      if (listeners.length === 0) {
        this.messageListeners.delete(channelId);
      }
    }
  }

  async getChannelMessages(channelId: string, limit: number = 50) {
    const client = await this.getClient();
    const channel = await client.channels.fetch(channelId);
    
    if (!channel || !('messages' in channel)) {
      throw new Error('Canal não encontrado ou não é um canal de texto');
    }

    const messages = await channel.messages.fetch({ limit });
    return Array.from(messages.values()).map(message => {
      const msg = message as import("discord.js").Message;
      return {
        content: msg.content,
        author: {
          username: msg.author.username,
          avatar: msg.author.avatarURL(),
        },
        timestamp: msg.createdTimestamp,
        id: msg.id,
      };
    }).reverse();
  }
}

// Exportar uma instância única
export const discordManager = DiscordManager.getInstance();
