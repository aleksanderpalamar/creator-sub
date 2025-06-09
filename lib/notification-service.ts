// Armazenar conexões ativas por criador
const connections = new Map<
  string,
  Set<ReadableStreamController<Uint8Array>>
>();

// Função para enviar notificação para um criador específico
export async function notifySubscription(creatorId: string, data: any) {
  const creatorConnections = connections.get(creatorId);

  if (!creatorConnections) return;

  const message = `data: ${JSON.stringify(data)}\n\n`;

  for (const controller of creatorConnections) {
    try {
      controller.enqueue(new TextEncoder().encode(message));
    } catch (error) {
      console.error("Erro ao enviar notificação:", error);
    }
  }
}

// Função para adicionar uma conexão
export function addConnection(
  creatorId: string,
  controller: ReadableStreamController<Uint8Array>
) {
  if (!connections.has(creatorId)) {
    connections.set(creatorId, new Set());
  }
  connections.get(creatorId)!.add(controller);
}

// Função para remover uma conexão
export function removeConnection(
  creatorId: string,
  controller: ReadableStreamController<Uint8Array>
) {
  const creatorConnections = connections.get(creatorId);
  if (creatorConnections) {
    creatorConnections.delete(controller);
    if (creatorConnections.size === 0) {
      connections.delete(creatorId);
    }
  }
}

export async function sendActivationEmail({
  email,
  name,
  token,
}: {
  email: string;
  name: string;
  token: string;
}) {
  // Implementar aqui a lógica real de envio de e-mail
  // Exemplo: usando nodemailer, resend, etc.
  const activationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/register/activate?token=${token}`;
  console.log(
    `Enviar e-mail de ativação para ${email} com o link: ${activationUrl}`
  );
  // integrar com serviço de e-mail
}
