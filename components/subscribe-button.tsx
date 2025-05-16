"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Copy, Check } from "lucide-react";
import Image from "next/image";

interface SubscribeButtonProps {
  creatorId: string;
  planId: string;
  disabled?: boolean;
}

export function SubscribeButton({
  creatorId,
  planId,
  disabled = false,
}: SubscribeButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<{
    pixCode: string;
    pixQrCodeBase64: string;
    expirationDate: string;
  } | null>(null);

  async function subscribe() {
    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorId,
          planId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao assinar plano");
      }

      const data = await response.json();

      setPaymentInfo({
        pixCode: data.payment.pixCode,
        pixQrCodeBase64: data.payment.pixQrCodeBase64,
        expirationDate: new Date(data.payment.pixExpiration).toLocaleString(),
      });

      toast.success({
        title: "Assinatura iniciada",
        description: "Utilize o código Pix para finalizar sua assinatura",
      });
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: "Erro ao assinar plano",
        description:
          error.message || "Ocorreu um erro ao tentar assinar o plano",
      });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }

  function handleComplete() {
    setIsOpen(false);
    router.push("/dashboard/subscriptions");
    router.refresh();
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success("Código Pix copiado para a área de transferência");

      // Reset copy status after 3 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (err) {
      toast.error(
        "Não foi possível copiar o código. Por favor, copie manualmente."
      );
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="bg-violet-500 hover:bg-violet-600 transition-colors duration-300 cursor-pointer"
        >
          Assinar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assinar Plano</DialogTitle>
          <DialogDescription>
            {paymentInfo
              ? "Escaneie o QR Code ou copie o código Pix para finalizar sua assinatura"
              : "Confirme sua assinatura para este plano"}
          </DialogDescription>
        </DialogHeader>

        {paymentInfo ? (
          <div className="space-y-4">
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg">
                <Image
                  src={`data:image/png;base64,${paymentInfo.pixQrCodeBase64}`}
                  alt="QR Code Pix"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
            </div>

            {/* Código Pix */}
            <div className="relative">
              <div className="rounded-md bg-muted p-4 overflow-x-auto">
                <p className="text-sm font-medium mb-1">Código Pix</p>
                <p className="text-xs break-all pr-8">{paymentInfo.pixCode}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-4 right-4"
                onClick={() => copyToClipboard(paymentInfo.pixCode)}
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {isCopied ? "Copiado" : "Copiar"}
                </span>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Este código expira em: {paymentInfo.expirationDate}
            </p>
            <p className="text-sm text-muted-foreground">
              Após o pagamento, sua assinatura será ativada automaticamente.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Ao confirmar, você será redirecionado para o pagamento via Pix.
          </p>
        )}

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          {paymentInfo ? (
            <Button
              onClick={handleComplete}
              className="bg-violet-500 hover:bg-violet-600 transition-colors duration-300 cursor-pointer"
            >
              Concluir
            </Button>
          ) : (
            <Button
              onClick={subscribe}
              disabled={isLoading}
              className="w-full bg-violet-500 hover:bg-violet-600 transition-colors duration-300 cursor-pointer"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Processando..." : "Confirmar Assinatura"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
