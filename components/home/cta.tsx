import Link from "next/link";
import { Button } from "../ui/button";

export const CallToActions = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-zinc-950 dark:bg-zinc-900 text-primary-foreground dark:text-white rounded-lg">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Pronto para monetizar seu conteúdo?
            </h2>
            <p className="max-w-[900px] md:text-xl/relaxed">
              Comece agora mesmo e receba seu primeiro pagamento em questão de
              dias.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-violet-500 text-white hover:bg-violet-600"
              asChild
            >
              <Link href="/register">Criar conta gratuita</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-violet-500 text-violet-500 bg-violet-500/20 hover:bg-violet-500/25 hover:text-violet-600
              dark:border-violet-500"
            >
              <Link href="/login">Fazer login</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
