import { CheckCircle } from "lucide-react";

export const Resource = () => {
  return (
    <section className="w-full py-12 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Recursos
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Tudo o que você precisa para gerenciar suas assinaturas em um só
              lugar.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
          <div className="flex items-start space-x-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-500" />
            <div>
              <h3 className="text-xl font-bold">Dashboard completo</h3>
              <p className="text-sm text-muted-foreground">
                Visualize estatísticas, gerencie assinantes e acompanhe seus
                ganhos em tempo real.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-500" />
            <div>
              <h3 className="text-xl font-bold">Planos personalizados</h3>
              <p className="text-sm text-muted-foreground">
                Crie diferentes níveis de assinatura com preços e benefícios
                personalizados.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-500" />
            <div>
              <h3 className="text-xl font-bold">Notificações em tempo real</h3>
              <p className="text-sm text-muted-foreground">
                Receba alertas quando novos assinantes se cadastrarem ou quando
                pagamentos forem realizados.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-500" />
            <div>
              <h3 className="text-xl font-bold">Overlay para streams</h3>
              <p className="text-sm text-muted-foreground">
                Exiba notificações personalizadas em suas transmissões ao vivo
                quando alguém assinar.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-500" />
            <div>
              <h3 className="text-xl font-bold">Relatórios detalhados</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe o crescimento da sua base de assinantes e analise
                tendências de receita.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-500" />
            <div>
              <h3 className="text-xl font-bold">Integração com Pix</h3>
              <p className="text-sm text-muted-foreground">
                Receba pagamentos instantâneos diretamente na sua conta
                bancária, sem intermediários.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
