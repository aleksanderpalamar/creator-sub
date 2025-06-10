"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import { useToast } from "@/hooks/use-toast";

export const dynamic = "force-dynamic";

function ActivationComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [activationStatus, setActivationStatus] = useState<"pending" | "success" | "error">("pending");
  const hasAttemptedActivation = useRef(false);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setActivationStatus("error");
      toast({ 
        title: "Erro", 
        description: "Token de ativação inválido.",
        type: "error"
      });
      router.push("/login");
      return;
    }

    async function activateAccount() {
      if (hasAttemptedActivation.current) return;
      hasAttemptedActivation.current = true;
      
      try {
        const res = await fetch("/api/register/activate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message);
        
        setActivationStatus("success");
        toast({ 
          title: "Conta ativada!", 
          description: "Sua conta foi ativada com sucesso.",
          type: "success"
        });
        
        setTimeout(() => router.push("/login"), 3000);
      } catch (err: any) {
        setActivationStatus("error");
        toast({ 
          title: "Erro", 
          description: err.message || "Erro ao ativar conta",
          type: "error"
        });
        setTimeout(() => router.push("/login"), 3000);
      }
    }

    activateAccount();
  }, [token, router, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4 bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-50 p-8 rounded border-[1px] border-zinc-700 text-center">
        {activationStatus === "pending" && <p>Ativando sua conta...</p>}
        {activationStatus === "success" && <p>Conta ativada com sucesso! Redirecionando para o login...</p>}
        {activationStatus === "error" && <p>Erro ao ativar conta. Redirecionando para o login...</p>}
      </div>
    </div>
  );
}

// Componente principal que envolve o ActivationComponent com Suspense
export default function ActivatePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md space-y-4 bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-50 p-8 rounded border-[1px] border-zinc-700 text-center">
          <p>Carregando...</p>
        </div>
      </div>
    }>
      <ActivationComponent />
    </Suspense>
  );
}
