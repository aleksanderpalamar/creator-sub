import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  if (!session.user?.isCreator) {
    redirect("/dashboard")
  }

  const subscriptions = await prisma.subscription.findMany({
    where: {
      creatorId: session.user.id,
    },
    include: {
      subscriptionPlan: true,
    },
  })

  const activeSubscriptions = subscriptions.filter((sub) => sub.status === "active")

  const totalSubscriptions = activeSubscriptions.length
  const totalRevenue = activeSubscriptions.reduce((acc, sub) => acc + sub.subscriptionPlan.price, 0)
  const averageRevenue = totalSubscriptions > 0 ? totalRevenue / totalSubscriptions : 0

  const planStats = await prisma.subscriptionPlan.findMany({
    where: {
      creatorId: session.user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      _count: {
        select: {
          subscriptions: {
            where: {
              status: "active",
            },
          },
        },
      },
    },
  })

  const planChartData = planStats.map((plan) => ({
    name: plan.name,
    assinantes: plan._count.subscriptions,
    valor: plan.price,
  }))

  // Dados para o gráfico de crescimento mensal
  const currentDate = new Date()
  const monthlyGrowthData = await prisma.subscription.aggregate({

    where: {
      creatorId: session.user.id,
      status: "active",
      createdAt: {
        gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      },
    },
    _count: {
      subscriberId: true,
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Estatísticas</h1>
        <p className="text-muted-foreground">Visualize estatísticas e métricas sobre seus assinantes.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Assinantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalSubscriptions}
            </div>
            <p className="text-xs text-muted-foreground">Assinantes ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Valor total mensal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageRevenue)}</div>
            <p className="text-xs text-muted-foreground">Por assinante</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {planChartData.map((plan) => (
          <Card key={plan.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plan.assinantes}</div>
              <p className="text-xs text-muted-foreground">Assinantes</p>
              <div className="text-2xl font-bold">{formatCurrency(plan.valor)}</div>
              <p className="text-xs text-muted-foreground">Valor do plano</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
