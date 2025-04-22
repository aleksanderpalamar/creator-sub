"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function NewPlanPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number.parseFloat(formData.get("price") as string);
    const benefits = formData.get("benefits") as string;

    try {
      const response = await fetch("/api/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          benefits,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      toast.success({
        title: "Assinatura criada com sucesso!",
        description: "Agora você pode começar a vender seu plano.",
      });

      router.push("/dashboard/plans");
      router.refresh();
    } catch (error) {
      console.error("Erro ao criar a assinatura", error);
      toast.error({
        title: "Erro ao criar a assinatura",
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nova Assinatura</h1>
        <p className="text-sm text-muted-foreground">
          Crie um novo plano de assinatura para seus assinantes.
        </p>
      </div>
      <Card>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Detalhes da Assinatura</CardTitle>
            <CardDescription>
              Preencha os detalhes do seu novo plano de assinatura.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Plano</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ex: Plano Básico"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Descreva seu plano de assinatura"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Preço Mensal (R$)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ex: 19.90"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="benefits">Benefícios (um por linha)</Label>
              <Textarea
                id="benefits"
                name="benefits"
                placeholder="Ex: Acesso a conteúdo exclusivo&#10;Participação em lives privadas&#10;Suporte prioritário"
                rows={5}
                className="resize-none overflow-hidden h-16"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Criando..." : "Criar Plano"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
