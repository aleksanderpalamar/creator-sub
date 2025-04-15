import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import type { NextAuthOptions } from "next-auth"
import { CustomPrismaAdapter } from "@/lib/auth-adapter"

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user.password) {
          return null
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)

        if (!isCorrectPassword) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          isCreator: user.isCreator,
          pixKey: user.pixKey,
          pixKeyType: user.pixKeyType,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        if (token) {
          // Se estiver usando JWT strategy
          session.user.id = token.id as string
          session.user.isCreator = token.isCreator as boolean
          session.user.pixKey = token.pixKey as string | null
          session.user.pixKeyType = token.pixKeyType as string | null
        } else if (user) {
          // Se estiver usando database strategy
          session.user.id = user.id
          session.user.isCreator = user.isCreator
          session.user.pixKey = user.pixKey
          session.user.pixKeyType = user.pixKeyType
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isCreator = user.isCreator
        token.pixKey = user.pixKey
        token.pixKeyType = user.pixKeyType
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}


