import { PrismaClient } from '@prisma/client'

type GlobalWithPrisma = typeof globalThis & {
  prisma: PrismaClient | undefined
}

const globalForPrisma = global as unknown as GlobalWithPrisma

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
