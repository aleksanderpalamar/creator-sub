"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface CancelSubscriptionButtonProps {
  id: string;
}

export function CancelSubscriptionButton({
  id,
}: CancelSubscriptionButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleCancelSubscription() {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/subscriptions/${id}/cancel`, {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao cancelar assinatura");
      }

      toast.success({
        title: "Assinatura cancelada",
        description: "Sua assinatura foi cancelada com sucesso",
      });

      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: "Erro ao cancelar assinatura",
        description:
          error.message || "Ocorreu um erro ao tentar cancelar a assinatura",
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Cancelar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancelar assinatura?</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja cancelar esta assinatura? Você perderá acesso
            aos benefícios ao final do período atual.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Voltar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleCancelSubscription();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Cancelando..." : "Confirmar Cancelamento"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
