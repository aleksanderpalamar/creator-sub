import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const WhoIsItFor = () => {
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Para quem é o CreatorSub?
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Nossa plataforma foi desenvolvida para atender diversos tipos de
              criadores de conteúdo.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-violet-50 border-violet-500">
            <CardHeader>
              <CardTitle className="text-zinc-950">Streamers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ideal para streamers que ainda não atingiram os requisitos para
                se tornarem parceiros nas plataformas tradicionais ou que buscam
                maior independência.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 border-rose-500">
            <CardHeader>
              <CardTitle className="text-zinc-950">YouTubers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Perfeito para criadores de conteúdo no YouTube que desejam uma
                fonte de renda adicional além da monetização de anúncios.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 border-yellow-500">
            <CardHeader>
              <CardTitle className="text-zinc-950">Podcasters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Excelente para podcasters que querem oferecer conteúdo exclusivo
                para assinantes e monetizar seu trabalho diretamente.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-sky-50 border-sky-500">
            <CardHeader>
              <CardTitle className="text-zinc-950">Artistas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Artistas visuais, músicos e outros criadores podem oferecer
                acesso exclusivo a suas obras e processos criativos.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-500">
            <CardHeader>
              <CardTitle className="text-zinc-950">Educadores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Professores e educadores online podem criar comunidades pagas
                com conteúdo educacional exclusivo para seus alunos.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-200 border-zinc-900">
            <CardHeader>
              <CardTitle className="text-zinc-950">
                Criadores de nicho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ideal para criadores de conteúdo especializado que atendem a
                públicos específicos e desejam monetizar sua expertise.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
