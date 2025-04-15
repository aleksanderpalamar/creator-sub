import { PrismaAdapter } from "@auth/prisma-adapter"
import type { PrismaClient } from "@prisma/client"
import type { Adapter } from "next-auth/adapters"

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  const adapter = PrismaAdapter(prisma) as Adapter

  // Aqui podemos estender ou modificar o adaptador se necessário
  // Por exemplo, podemos sobrescrever métodos específicos que precisam de tratamento especial

  return adapter
}
