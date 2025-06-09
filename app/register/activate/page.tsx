"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ActivatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isCreator, setIsCreator] = useState(false);

  const token = searchParams.get("token");

  async function handleActivate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/register/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, name, isCreator }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess(true);
      toast({ title: "Conta ativada!", description: "Sua conta foi criada com sucesso.", type: "success" });
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setError(err.message || "Erro ao ativar conta");
    } finally {
      setLoading(false);
    }
  }

  if (!token) return <div className="p-8 text-center">Token de ativação inválido.</div>;

  if (success) return <div className="p-8 text-center">Conta ativada com sucesso! Redirecionando para login...</div>;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={handleActivate} className="w-full max-w-md space-y-4 bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">Ativar conta</h1>
        <Input
          placeholder="Nome completo"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Defina uma senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="isCreator" checked={isCreator} onChange={e => setIsCreator(e.target.checked)} />
          <label htmlFor="isCreator">Sou um criador de conteúdo</label>
        </div>
        <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-violet-500 text-violet-50 hover:bg-violet-600 transition-colors duration-300 cursor-pointer"
        >
                {loading ? "Ativando..." : "Ativar conta"}
        </Button>
        {error && <div className="border-rose-500 bg-rose-50 rounded-lg text-rose-500 text-sm">{error}</div>}
      </form>
    </div>
  );
}
