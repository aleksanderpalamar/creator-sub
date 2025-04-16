import { MercadoPagoConfig, Payment } from "mercadopago"

// Tipos de chaves Pix suportadas
export type PixKeyType = "cpf" | "email" | "telefone" | "aleatoria"

// Interface para o resultado da geração do Pix
export interface PixResult {
  pixCode: string // Código Pix copia e cola
  pixQrCodeBase64: string // QR Code em formato base64
  pixExpirationDate: Date // Data de expiração
  externalId: string // ID da transação no Mercado Pago
}

/**
 * Gera um código Pix usando a API do Mercado Pago
 *
 * @param amount Valor da transação
 * @param description Descrição da transação
 * @param payerEmail Email do pagador (opcional)
 * @param expirationMinutes Tempo de expiração em minutos (padrão: 30)
 * @returns Objeto com informações do Pix gerado
 */
export async function generatePixCode(
  amount: number,
  description: string,
  payerEmail?: string,
  expirationMinutes = 30,
): Promise<PixResult> {
  try {
    // Configuração do cliente do Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
    })

    // Calcular data de expiração
    const expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + expirationMinutes)

    // Criar o pagamento via API do Mercado Pago
    const payment = new Payment(client)
    const paymentData = {
      transaction_amount: amount,
      description: description,
      payment_method_id: "pix",
      payer: {
        email: payerEmail || "test@example.com",
      },
      date_of_expiration: expirationDate.toISOString(),
    }

    const result = await payment.create({ body: paymentData })

    // Extrair informações do Pix do resultado
    const pixInfo = result.point_of_interaction?.transaction_data

    if (!pixInfo || !pixInfo.qr_code || !pixInfo.qr_code_base64 || !result.id) {
      throw new Error("Não foi possível gerar o código Pix")
    }

    return {
      pixCode: pixInfo.qr_code,
      pixQrCodeBase64: pixInfo.qr_code_base64,
      pixExpirationDate: expirationDate,
      externalId: result.id.toString(),
    }
  } catch (error) {
    console.error("Erro ao gerar código Pix:", error)
    throw new Error("Falha ao gerar o código Pix. Por favor, tente novamente.")
  }
}

/**
 * Verifica o status de um pagamento Pix
 *
 * @param externalId ID da transação no Mercado Pago
 * @returns Status do pagamento
 */
export async function checkPixPaymentStatus(externalId: string): Promise<"approved" | "pending" | "rejected"> {
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
    })

    const payment = new Payment(client)
    const result = await payment.get({ id: externalId })

    return result.status as "approved" | "pending" | "rejected"
  } catch (error) {
    console.error("Erro ao verificar status do pagamento:", error)
    throw new Error("Falha ao verificar o status do pagamento.")
  }
}

/**
 * Valida uma chave Pix com base no tipo
 *
 * @param pixKey Chave Pix a ser validada
 * @param pixKeyType Tipo da chave Pix
 * @returns Booleano indicando se a chave é válida
 */
export function validatePixKey(pixKey: string, pixKeyType: PixKeyType): boolean {
  if (!pixKey || !pixKeyType) return false

  switch (pixKeyType) {
    case "cpf":
      // Validação básica de CPF: 11 dígitos numéricos
      return /^\d{11}$/.test(pixKey)

    case "email":
      // Validação básica de email
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pixKey)

    case "telefone":
      // Validação básica de telefone: +55 seguido de DDD e número
      // Aceita formatos: +5511999999999 ou 5511999999999
      return /^(\+55)?\d{10,11}$/.test(pixKey)

    case "aleatoria":
      // Chave aleatória (EVP) tem 36 caracteres no formato UUID
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(pixKey)

    default:
      return false
  }
}
