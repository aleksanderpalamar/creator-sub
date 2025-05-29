import { discordManager } from "./discord-client";

console.log("=== Iniciando bot do Discord ===");
console.log("Verificando variáveis de ambiente:");
console.log("DISCORD_BOT_TOKEN presente:", !!process.env.DISCORD_BOT_TOKEN);
if (process.env.DISCORD_BOT_TOKEN) {
  console.log("Token length:", process.env.DISCORD_BOT_TOKEN.length);
  console.log("Token início:", process.env.DISCORD_BOT_TOKEN.substring(0, 10) + "...");
  console.log("Token fim:", "..." + process.env.DISCORD_BOT_TOKEN.substring(process.env.DISCORD_BOT_TOKEN.length - 10));
}

// Inicializar o bot com mais logs
discordManager.getClient()
  .then((client) => {
    console.log("Bot inicializado com sucesso!");
    console.log("Status do bot:", {
      isReady: client.isReady(),
      user: client.user?.tag,
      applicationId: client.application?.id,
      wsStatus: client.ws.status,
    });
  })
  .catch((error) => {
    console.error("Falha ao inicializar o bot do Discord:");
    console.error("Erro completo:", error);
    if (error.code) console.error("Código do erro:", error.code);
    if (error.message) console.error("Mensagem do erro:", error.message);
  });
