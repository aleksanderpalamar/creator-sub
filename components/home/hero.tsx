import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export const Hero = () => {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Monetize seu conteúdo desde o primeiro dia
            </h1>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              Crie planos de assinatura personalizados e receba pagamentos
              diretamente via Pix, sem precisar ser parceiro oficial de
              plataformas como Twitch ou YouTube.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-violet-500 hover:bg-violet-600"
              >
                <Link href="/register">Começar agora</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-violet-500 hover:bg-violet-50 text-violet-500 hover:text-violet-600
                dark:border-violet-500"
                asChild
              >
                <Link href="/login">Já tenho uma conta</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center overflow-hidden">
            <Image
              src="/assets/creator-sub-banner-2.png"
              alt="CreatorSub - Monetize seu conteúdo"
              width={500}
              height={400}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
