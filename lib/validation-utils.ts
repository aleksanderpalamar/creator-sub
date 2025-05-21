import bcrypt from "bcrypt";

/**
 * Gera o hash de uma senha usando bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Valida se a senha atende aos requisitos mínimos:
 * - Mínimo 8 caracteres
 * - Pelo menos uma letra maiúscula
 * - Pelo menos um número
 * - Pelo menos um caractere especial
 */
export function isValidPassword(password: string): boolean {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
}

/**
 * Validação simplificada de CPF (apenas formato)
 */
export function isValidCPF(cpf: string): boolean {
  return /^\d{11}$/.test(cpf);
}

/**
 * Validação básica de email
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Valida uma chave Pix de acordo com o tipo
 */
export function isValidPixKey(key: string, type: "cpf" | "email" | "telefone" | "aleatoria"): boolean {
  if (type === "cpf") return isValidCPF(key);
  if (type === "email") return isValidEmail(key);
  if (type === "telefone") return /^\d{10,11}$/.test(key);
  if (type === "aleatoria") return key.length >= 32;
  return false;
}
