import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import NextAuthProvider from "@/providers/session-provider";
import { ToastProvider } from "@/context/toast-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CreatorSub",
  description: "Plataforma de assinaturas para criadores de conteúdo",
};

// Initialize Discord bot
import "@/lib/discord-init";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`bg-background text-foreground ${inter.className} antialiased`}
      >
        <NextAuthProvider>
          <div className="flex min-h-screen flex-col">
            <main className="flex-grow container mx-auto px-4 py-8">
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <ToastProvider>
                  {children}
                  <Toaster />
                </ToastProvider>
              </ThemeProvider>
            </main>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
