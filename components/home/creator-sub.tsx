import { CreditCard, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const CreatorSub = () => {
  return (
    <section className="w-full py-12 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              O que é o CreatorSub?
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              O CreatorSub é uma plataforma brasileira que permite que criadores
              de conteúdo monetizem seu trabalho de forma independente, sem as
              restrições impostas pelas grandes plataformas.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <Zap className="h-6 w-6 text-yellow-500 mb-2" />
              <CardTitle>Monetização Imediata</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comece a receber pagamentos desde o primeiro dia, sem requisitos
                mínimos de seguidores ou visualizações.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CreditCard className="h-6 w-6 text-cyan-500 mb-2" />
              <CardTitle>Pagamentos via Pix</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Receba pagamentos diretamente na sua conta bancária através do
                Pix, com taxas reduzidas e transferências instantâneas.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Shield className="h-6 w-6 text-violet-500 mb-2" />
              <CardTitle>Independência</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Liberdade para criar seu conteúdo sem depender das políticas de
                monetização das grandes plataformas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
