import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SubscribeButton } from "@/components/subscribe-button";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

export default async function CreatorProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Buscar o criador
  const creator = await prisma.user.findUnique({
    where: {
      id: session.user.id,
      isCreator: true,
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  if (!creator) {
    notFound();
  }

  // Buscar os planos do criador
  const plans = await prisma.subscriptionPlan.findMany({
    where: {
      creatorId: creator.id,
    },
    orderBy: {
      price: "asc",
    },
  });

  // Verificar se o usuário já assina algum plano deste criador
  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      subscriberId: session.user?.id,
      creatorId: creator.id,
      status: "active",
    },
    include: {
      subscriptionPlan: true,
    },
  });

  const initials = creator.name
    ? creator.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={creator.image || ""} alt={creator.name || ""} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{creator.name}</h1>
          <p className="text-muted-foreground">
            {plans.length} assinatura(s) disponível(is)
          </p>
        </div>
      </div>

      {existingSubscription && (
        <Card className="bg-primary/10">
          <CardHeader>
            <CardTitle>Você já é assinante</CardTitle>
            <CardDescription>
              Você já assina o plano{" "}
              {existingSubscription.subscriptionPlan.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Valor:{" "}
              {formatCurrency(existingSubscription.subscriptionPlan.price)}/mês
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <a href="/dashboard/subscriptions">Gerenciar Assinatura</a>
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={
              existingSubscription?.subscriptionPlanId === plan.id
                ? "border-primary"
                : ""
            }
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                {formatCurrency(plan.price)}/mês
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {plan.description || "Sem descrição"}
              </p>
              {plan.benefits && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Benefícios:</h4>
                  <ul className="mt-2 text-sm text-muted-foreground">
                    {(() => {
                      let benefitsArr: string[] = [];
                      try {
                        const parsed = JSON.parse(plan.benefits);
                        if (Array.isArray(parsed)) {
                          benefitsArr = parsed;
                        } else if (typeof parsed === "string") {
                          benefitsArr = parsed.split("\n");
                        }
                      } catch {
                        benefitsArr = plan.benefits.split("\n");
                      }
                      return benefitsArr
                        .filter(Boolean)
                        .map((benefit, index) => (
                          <li key={index} className="flex items-center">
                            <span className="mr-2">•</span>
                            {benefit}
                          </li>
                        ));
                    })()}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {existingSubscription?.subscriptionPlanId === plan.id ? (
                <Button variant="outline" disabled>
                  Plano Atual
                </Button>
              ) : (
                <SubscribeButton
                  creatorId={creator.id}
                  planId={plan.id}
                  disabled={!!existingSubscription}
                />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
