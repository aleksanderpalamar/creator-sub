import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function isValidPassword(password: string): boolean {
  // Exemplo simples: mínimo 8 caracteres, pelo menos uma letra maiúscula, um número e um caractere especial
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
}

export function isValidCPF(cpf: string): boolean {
  // Validação simplificada de CPF
  return /^\d{11}$/.test(cpf);
}

export function isValidPixKey(key: string, type: "cpf" | "email" | "telefone" | "aleatoria"): boolean {
  if (type === "cpf") return isValidCPF(key);
  if (type === "email") return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(key);
  if (type === "telefone") return /^\d{10,11}$/.test(key);
  if (type === "aleatoria") return key.length >= 32;
  return false;
}
