"use client";

import { useUserMode } from "@/context/user-mode-context";
import { ToggleGroup } from "./ui/toggle-group";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "./ui/switch";

/**
 * Componente para alternar entre os modos de usuário (Criador e Assinante).
 * Utiliza o contexto UserModeContext para gerenciar o estado do modo.
 * Redireciona o usuário para a página apropriada com base no modo selecionado.
 */
export function UserModeToggle() {
  const { mode, setMode } = useUserMode();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (val: string) => {
    if (!val) return;
    setMode(val as any);

    // Redireciona com base no novo modo selecionado
    if (val === "creator") {
      if (pathname !== "/dashboard") router.push("/dashboard");
    } else if (val === "subscriber") {
      if (pathname !== "/dashboard/subscriptions")
        router.push("/dashboard/subscriptions");
    }
  };

  return (
    <div className="flex items-center gap-2 p-1.5">
      <span className="text-sm text-muted-foreground">
        {mode === "creator" ? "Criador" : "Assinante"}
      </span>
      <ToggleGroup type="single" value={mode} onValueChange={handleChange}>
        <Switch
          checked={mode === "creator"}
          onCheckedChange={(checked) =>
            setMode(checked ? "creator" : "subscriber")
          }
        />
      </ToggleGroup>
    </div>
  );
}
