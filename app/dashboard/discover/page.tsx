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
        <p className="text-muted-foreground">Nenhum criador encontrado.</p>
      ) : (
        <div className="space-y-4">
          {creators.map((creator) => (
            <Card key={creator.id}>
              <CardHeader>
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={creator.image || ""}
                    alt={creator.name || ""}
                  />
                  <AvatarFallback>{creator.name}</AvatarFallback>
                </Avatar>
                <CardTitle>{creator.name}</CardTitle>
                <CardDescription>
                  {creator.subscriptionPlans[0]?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{creator.subscriptionPlans[0]?.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/dashboard/creator/${creator.id}`}>
                  <Button
                    variant="outline"
                    className="border-violet-500 text-violet-500 hover:bg-violet-50 hover:text-violet-600 cursor-pointer transition-colors duration-300"
                  >
                    Ver Planos
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
