import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { AlertCircle, CreditCard, TrendingUp, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const isCreator = session.user?.isCreator;

  if (isCreator) {
    // Dashboard para criadores
    const plansCount = await prisma.subscriptionPlan.count({
      where: {
        creatorId: session.user?.id,
      },
    });

    const subscribersCount = await prisma.subscription.count({
      where: {
        creatorId: session.user?.id,
        status: "active",
      },
    });

    const totalRevenue = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        subscription: {
          creatorId: session.user?.id,
          status: "active",
        },
        status: "completed",
      },
    });

    const recentSubscribers = await prisma.subscription.findMany({
      where: {
        creatorId: session.user?.id,
        status: "active",
      },
      include: {
        subscriber: true,
        subscriptionPlan: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel de criador de conteúdo.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Planos
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plansCount}</div>
              <p className="text-xs text-muted-foreground">
                Planos de assinatura ativos
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assinantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscribersCount}</div>
              <p className="text-xs text-muted-foreground">Assinantes ativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Receita Total
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {(totalRevenue._sum.amount || 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Receita acumulada</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Próximos Pagamentos
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentSubscribers.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Pagamentos pendentes
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Assinantes Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              {recentSubscribers.length > 0 ? (
                <div className="space-y-4">
                  {recentSubscribers.map((subscription) => (
                    <div
                      key={subscription.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm font-medium">
                            {subscription.subscriber.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {subscription.subscriptionPlan.name} - R${" "}
                            {subscription.subscriptionPlan.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(subscription.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Você ainda não tem assinantes.
                </p>
              )}
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Gerencie seus planos e assinantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/dashboard/plans/new">Criar Nova Assinatura</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/plans">Gerenciar Assinaturas</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/subscribers">Ver Assinantes</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/settings">Configurar Pix</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } else {
    // Dashboard para assinantes
    const subscriptions = await prisma.subscription.findMany({
      where: {
        subscriberId: session.user?.id,
        status: "active",
      },
      include: {
        creator: true,
        subscriptionPlan: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel de assinante.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Minhas Assinaturas
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscriptions.length}</div>
              <p className="text-xs text-muted-foreground">
                Assinaturas ativas
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Minhas Assinaturas</CardTitle>
            <CardDescription>
              Criadores de conteúdo que você apoia
            </CardDescription>
          </CardHeader>
          <CardContent>
            {subscriptions.length > 0 ? (
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div
                    key={subscription.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium">
                          {subscription.creator.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {subscription.subscriptionPlan.name} - R${" "}
                          {subscription.subscriptionPlan.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-muted-foreground">
                        Próximo pagamento:{" "}
                        {subscription.nextPaymentDate
                          ? new Date(
                            subscription.nextPaymentDate
                          ).toLocaleDateString()
                          : "N/A"}
                      </div>
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">
                  Você ainda não assina nenhum criador de conteúdo.
                </p>
                <Button asChild>
                  <Link href="/dashboard/discover">Descobrir Criadores</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}
