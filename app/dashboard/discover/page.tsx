import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/lib/prisma";

export default async function DiscoverPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Buscar criadores (usuários com isCreator = true)
  const creators = await prisma.user.findMany({
    where: {
      isCreator: true,
      // Excluir o usuário atual
      NOT: {
        id: session.user?.id,
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
      // Contar quantos planos o criador tem
      _count: {
        select: {
          subscriptionPlans: true,
        },
      },
      // Buscar o plano mais barato do criador
      subscriptionPlans: {
        orderBy: {
          price: "asc",
        },
        take: 1,
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Descobrir Criadores
        </h1>
        <p className="text-muted-foreground">
          Encontre criadores de conteúdo para apoiar.
        </p>
      </div>
      {creators.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nenhum criador encontrado</CardTitle>
            <CardDescription>
              Não há criadores disponíveis no momento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Volte mais tarde para descobrir novos criadores.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 mb:grid-cols-2 lg:grid-cols-3">
            {creators.map((creator) => {
            const initials = creator.name
              ? creator.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "U"

            const hasPlans = creator._count.subscriptionPlans > 0
            const cheapestPlan = creator.subscriptionPlans[0]

            return (
              <Card key={creator.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={creator.image || ""} alt={creator.name || ""} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{creator.name}</CardTitle>
                    <CardDescription>
                      {hasPlans
                        ? `${creator._count.subscriptionPlans} plano(s) disponível(is)`
                        : "Nenhum plano disponível"}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {hasPlans && cheapestPlan ? (
                    <p className="text-sm text-muted-foreground">
                      Plano a partir de R$ {cheapestPlan.price.toFixed(2)}/mês
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Este criador ainda não configurou planos de assinatura.
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild disabled={!hasPlans}>
                    <Link href={`/dashboard/creator/${creator.id}`}>Ver Perfil</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
}
