import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { authOptions } from "@/utils/authOptions";
import { Edit, PlusCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PlansPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (!session.user?.isCreator) {
    redirect("/dashboard");
  }

  const plans = await prisma.subscriptionPlan.findMany({
    where: {
      creatorId: session.user.id,
    },
    orderBy: {
      price: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Planos de Assinatura
          </h1>
          <p className="text-muted-foreground">
            Gerencie os planos de assinatura disponíveis para os seus criadores.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/plans/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Assinatura
          </Link>
        </Button>
      </div>
      {plans.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nenhum plano encontrado</CardTitle>
            <CardDescription>Você ainda não criou nenhum plano de assinatura.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Crie seu primeiro plano para começar a receber assinaturas.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/dashboard/plans/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Criar Plano
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{formatCurrency(plan.price)} / mês</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{plan.description || "Sem descrição"}</p>
                {plan.benefits && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Benefícios:</h4>
                    <ul className="mt-2 text-sm text-muted-foreground">
                      {plan.benefits.split("\n").map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/plans/${plan.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Link>
                </Button>
                {/* <DeletePlanButton id={plan.id} /> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
