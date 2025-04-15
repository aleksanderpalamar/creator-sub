import type { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      isCreator: boolean
      pixKey?: string | null
      pixKeyType?: string | null
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    isCreator: boolean
    pixKey?: string | null
    pixKeyType?: string | null
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    isCreator: boolean
    pixKey?: string | null
    pixKeyType?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    isCreator: boolean
    pixKey?: string | null
    pixKeyType?: string | null
  }
}