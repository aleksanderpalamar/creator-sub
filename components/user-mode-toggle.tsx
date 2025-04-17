"use client";

import { useUserMode } from "@/context/user-mode-context";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { usePathname, useRouter } from "next/navigation";



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
      if (pathname !== "/dashboard/subscriptions") router.push("/dashboard/subscriptions");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Mode:</span>
      <ToggleGroup
        type="single"
        value={mode}
        onValueChange={(val) => val && setMode(val as any)}
      >
        <ToggleGroupItem value="creator">Criador</ToggleGroupItem>
        <ToggleGroupItem value="subscriber">Assinantes</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
