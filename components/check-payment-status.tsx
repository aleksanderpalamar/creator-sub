"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface CheckPaymentStatusProps {
  paymentId: string;
}

export function CheckPaymentStatus({ paymentId }: CheckPaymentStatusProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function checkStatus() {
    setIsLoading(true);

    try {
      const response = await fetch("/api/payments/check-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message || "Erro ao verificar status do pagamento"
        );
      }

      const data = await response.json();

      if (data.status === "approved") {
        toast.success({
          title: "Pagamento aprovado!",
          description: "O pagamento foi aprovado com sucesso.",
        });
        router.refresh();
      } else if (data.status === "rejected") {
        toast.error({
          title: "Pagamento rejeitado!",
          description:
            "Houve um problema com seu pagamento. Por favor, tente novamente.",
        });
        router.refresh();
      } else {
        toast.info({
          title: "Pagamento pendente!",
          description:
            "Seu pagamento ainda está pendente. Tente verificar novamente em alguns instantes.",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error({
        title: "Erro ao verificar status do pagamento",
        description:
          error instanceof Error
            ? error.message
            : "Ocorreu um erro ao verificar o status do pagamento.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={checkStatus}
      disabled={isLoading}
      size="sm"
      variant="outline"
      className="border-violet-500 text-violet-500 hover:bg-violet-50 hover:text-violet-600 transition-colors duration-300 cursor-pointer"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Verificando...</span>
        </>
      ) : (
        "Verificar status"
      )}
    </Button>
  );
}
