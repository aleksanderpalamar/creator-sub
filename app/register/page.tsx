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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/register/request-activation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          isCreator,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao registrar");
      }

      toast({
        title: "Verifique seu e-mail",
        description: "Enviamos um link de ativação para sua caixa de entrada.",
        type: "success",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Erro ao registrar",
        description:
          error.message ||
          "Ocorreu um erro ao tentar registrar. Tente novamente.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                placeholder="Seu nome completo"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isCreator"
                checked={isCreator}
                onCheckedChange={(checked) => setIsCreator(checked as boolean)}
              />
              <label
                htmlFor="isCreator"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sou um criador de conteúdo
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptTerms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                required
              />
              <label htmlFor="acceptTerms" className="text-xs">
                Li e aceito os{" "}
                <a
                  href="/termos"
                  target="_blank"
                  className="underline text-violet-500"
                >
                  Termos de Uso
                </a>{" "}
                e a{" "}
                <a
                  href="/privacidade"
                  target="_blank"
                  className="underline text-violet-500"
                >
                  Política de Privacidade
                </a>
              </label>
            </div>
            <Button
              type="submit"
              className="w-full bg-violet-500 hover:bg-violet-600 transition-colors duration-300 cursor-pointer"
              disabled={isLoading || !acceptTerms}
            >
              {isLoading ? "Registrando..." : "Registrar"}
            </Button>
            {/*
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              disabled={isLoading}
            >
              Google
            </Button>            
            */}
          </CardContent>
        </form>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-violet-500 underline-offset-4 hover:underline"
            >
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
