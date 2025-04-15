import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/theme-switch";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/">
          <span className="font-bold text-xl">CreatorSub</span>
        </Link>
        <nav className="flex items-center ml-auto gap-4 sm:gap-6">
          <ThemeSwitch />
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Registrar
          </Link>
        </nav>
      </header>
      <main className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Monetize seu conteúdo desde o primeiro dia
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Crie planos de assinatura personalizados e receba pagamentos
                  via Pix diretamente dos seus fãs.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/register">Começar agora</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/about">Saiba mais</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-100 dark:bg-zinc-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Sem burocracia
                </h2>
                <p
                  className="max-w-[600px] text-zinc-500 md:text-xl/relaxed text-base/relaxed
                xl:text-lg/relaxed dark:text-zinc-400"
                >
                  Não precisa ser parceiro oficial de plataformas como Twitch ou
                  Youtube. Comece a monetizar seu conteúdo imediatamente.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Pagamentos via Pix
                </h2>
                <p
                  className="max-w-[600px] text-zinc-500 md:text-xl/relaxed text-base/relaxed
                xl:text-lg/relaxed dark:text-zinc-400"
                >
                  Receba pagamentos diretamente na sua conta, sem intermediários
                  e com taxas reduzidas.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Dashboard completo
                </h2>
                <p
                  className="max-w-[600px] text-zinc-500 md:text-xl/relaxed text-base/relaxed
                xl:text-lg/relaxed dark:text-zinc-400"
                >
                  Gerencie seus planos, visualize estatísticas e acompanhe seus
                  assinantes em um só lugar.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          © 2024 CreatorSub. Todos os direitos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Termos de Serviço
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Política de Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  );
}
