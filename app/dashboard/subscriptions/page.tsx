import { CheckPaymentStatus } from "@/components/check-payment-status";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CancelSubscriptionButton } from "@/components/cancel-subscriptions-button";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export default async function SubscriptionsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const subscriptions = await prisma.subscription.findMany({
    where: {
      subscriberId: session.user?.id,
    },
    include: {
      creator: true,
      subscriptionPlan: true,
      payments: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Minhas Assinaturas
        </h1>
        <p className="text-muted-foreground">
          Gerencie suas assinaturas de criadores de conteúdo
        </p>
      </div>
      {subscriptions.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nenhuma assinatura encontrada</CardTitle>
            <CardDescription>
              Você ainda não assina nenhum criador de conteúdo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Descubra criadores de para apoiar e comece a assinar!
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/dashboard/discover">Descobrir Criadores</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          {activeSubscriptions.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Assinaturas Ativas</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeSubscriptions.map((subscription) => {
                  const initials = subscription.creator.name
                    ? subscription.creator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U";

                  return (
                    <Card key={subscription.id}>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={subscription.creator.image || ""}
                            alt={subscription.creator.name || ""}
                          />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{subscription.creator.name}</CardTitle>
                          <CardDescription>
                            {subscription.subscriptionPlan.name}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">Valor:</span>{" "}
                            {formatCurrency(
                              subscription.subscriptionPlan.price
                            )}
                            /mês
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">
                              Próximo pagamento:
                            </span>{" "}
                            {subscription.nextPaymentDate
                              ? new Date(
                                  subscription.nextPaymentDate
                                ).toLocaleDateString()
                              : "N/A"}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Status:</span>{" "}
                            <span className="text-green-600">Ativa</span>
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" asChild>
                          <Link
                            href={`/dashboard/creator/${subscription.creatorId}`}
                          >
                            Ver Criador
                          </Link>
                        </Button>
                        <CancelSubscriptionButton id={subscription.id} />
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {pendingSubscriptions.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Assinaturas Pendentes</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pendingSubscriptions.map((subscription) => {
                  const initials = subscription.creator.name
                    ? subscription.creator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U";

                  const latestPayment = subscription.payments[0];

                  return (
                    <Card key={subscription.id}>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={subscription.creator.image || ""}
                            alt={subscription.creator.name || ""}
                          />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{subscription.creator.name}</CardTitle>
                          <CardDescription>
                            {subscription.subscriptionPlan.name}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Valor:</span>{" "}
                              {formatCurrency(
                                subscription.subscriptionPlan.price
                              )}
                              /mês
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Status:</span>{" "}
                              <span className="text-yellow-600">Pendente</span>
                            </p>
                          </div>

                          {latestPayment && latestPayment.pixQrCodeBase64 && (
                            <div className="flex flex-col items-center space-y-2">
                              <div className="bg-white p-2 rounded-lg">
                                <Image
                                  src={`data:image/png;base64,${latestPayment.pixQrCodeBase64}`}
                                  alt="QR Code Pix"
                                  width={120}
                                  height={120}
                                  className="mx-auto"
                                />
                              </div>
                              <p className="text-xs text-center">
                                Expira em:{" "}
                                {latestPayment.pixExpiration
                                  ? new Date(
                                      latestPayment.pixExpiration
                                    ).toLocaleString()
                                  : "N/A"}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" asChild size="sm">
                          <Link
                            href={`/dashboard/creator/${subscription.creatorId}`}
                          >
                            Ver Criador
                          </Link>
                        </Button>
                        {latestPayment && (
                          <CheckPaymentStatus paymentId={latestPayment.id} />
                        )}
                        <CancelSubscriptionButton id={subscription.id} />
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {cancelledSubscriptions.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Assinaturas Canceladas</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cancelledSubscriptions.map((subscription) => {
                  const initials = subscription.creator.name
                    ? subscription.creator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U";

                  return (
                    <Card key={subscription.id}>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={subscription.creator.image || ""}
                            alt={subscription.creator.name || ""}
                          />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{subscription.creator.name}</CardTitle>
                          <CardDescription>
                            {subscription.subscriptionPlan.name}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">Valor:</span>{" "}
                            {formatCurrency(
                              subscription.subscriptionPlan.price
                            )}
                            /mês
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Status:</span>{" "}
                            <span className="text-red-600">Cancelada</span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Cancelada em:</span>{" "}
                            {subscription.updatedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" asChild className="w-full">
                          <Link
                            href={`/dashboard/creator/${subscription.creatorId}`}
                          >
                            Assinar Novamente
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
