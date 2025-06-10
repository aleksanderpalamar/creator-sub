import { Resend } from 'resend';

// Armazenar conexões ativas por criador
const connections = new Map<
  string,
  Set<ReadableStreamController<Uint8Array>>
>();

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

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
  try {
    const activationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/register/activate?token=${token}`;
    
    await resend.emails.send({
      from: 'CreatorSub <noreply@aleksanderpalamar.dev>',
      to: email,
      subject: 'Ative sua conta no CreatorSub',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Olá ${name},</h2>
          <p>Bem-vindo ao CreatorSub! Para começar a usar sua conta, por favor clique no link abaixo para ativá-la:</p>
          <p style="margin: 24px 0;">
            <a href="${activationUrl}" style="background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
              Ativar minha conta
            </a>
          </p>
          <p>Se você não conseguir clicar no botão acima, copie e cole o link abaixo no seu navegador:</p>
          <p style="word-break: break-all; color: #4a5568;">
            ${activationUrl}
          </p>
          <p style="color: #718096; font-size: 14px; margin-top: 24px;">
            Este link expira em 30 minutos por motivos de segurança.
          </p>
        </div>
      `
    });
    
    console.log(`Email de ativação enviado para ${email}`);
  } catch (error) {
    console.error('Erro ao enviar email de ativação:', error);
    throw new Error('Falha ao enviar email de ativação');
  }
}
