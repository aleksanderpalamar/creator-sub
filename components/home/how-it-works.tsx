export const HowItWorks = () => {
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Como funciona
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              O processo é simples e você pode começar em minutos.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500 text-white">
              1
            </div>
            <h3 className="text-xl font-bold">Crie sua conta</h3>
            <p className="text-sm text-muted-foreground">
              Registre-se gratuitamente e configure seu perfil de criador.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-white">
              2
            </div>
            <h3 className="text-xl font-bold">Configure seus planos</h3>
            <p className="text-sm text-muted-foreground">
              Crie planos de assinatura personalizados com diferentes preços e
              benefícios.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-white">
              3
            </div>
            <h3 className="text-xl font-bold">Receba pagamentos</h3>
            <p className="text-sm text-muted-foreground">
              Seus assinantes pagam via Pix e você recebe o dinheiro diretamente
              na sua conta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
