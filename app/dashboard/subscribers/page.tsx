import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/lib/prisma";

export default async function SubscribersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (!session.user?.isCreator) {
    redirect("/dashboard");
  }

  // Buscar os assinantes do criador
  const subscriptions = await prisma.subscription.findMany({
    where: {
      creatorId: session.user.id,
    },
    include: {
      subscriber: true,
      subscriptionPlan: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === "active"
  );
  const pendingSubscriptions = subscriptions.filter(
    (sub) => sub.status === "pending"
  );
  const cancelledSubscriptions = subscriptions.filter(
    (sub) => sub.status === "cancelled"
  );

  // Calcular estatísticas
  const totalSubscribers = activeSubscriptions.length;
  const totalRevenue = activeSubscriptions.reduce(
    (acc, sub) => acc + sub.subscriptionPlan.price,
    0
  );
  const averageRevenue =
    totalSubscribers > 0 ? totalRevenue / totalSubscribers : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meus Assinantes</h1>
        <p className="text-muted-foreground">
          Gerencie e visualize seus assinantes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Assinantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubscribers}</div>
            <p className="text-xs text-muted-foreground">Assinantes ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">Valor total mensal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(averageRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">Por assinante</p>
          </CardContent>
        </Card>
      </div>

      {subscriptions.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nenhum assinante encontrado</CardTitle>
            <CardDescription>Você ainda não tem assinantes.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Compartilhe seu perfil para começar a receber assinaturas.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lista de Assinantes</CardTitle>
            <CardDescription>
              Todos os seus assinantes e seus status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assinante</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data de Início</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((subscription) => {
                  const initials = subscription.subscriber.name
                    ? subscription.subscriber.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U";

                  return (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={subscription.subscriber.image || ""}
                              alt={subscription.subscriber.name || ""}
                            />
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {subscription.subscriber.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {subscription.subscriber.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {subscription.subscriptionPlan.name}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(subscription.subscriptionPlan.price)}
                      </TableCell>
                      <TableCell>
                        {subscription.startDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {subscription.status === "active" && (
                          <Badge variant="default" className="bg-green-500">
                            Ativo
                          </Badge>
                        )}
                        {subscription.status === "pending" && (
                          <Badge
                            variant="outline"
                            className="text-yellow-500 border-yellow-500"
                          >
                            Pendente
                          </Badge>
                        )}
                        {subscription.status === "cancelled" && (
                          <Badge
                            variant="outline"
                            className="text-red-500 border-red-500"
                          >
                            Cancelado
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
