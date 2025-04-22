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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pixKey, setPixKey] = useState("");
  const [pixKeyType, setPixKeyType] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [pixKeyError, setPixKeyError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setPixKey(session.user.pixKey || "");
      setPixKeyType(session.user.pixKeyType || "");
      setIsCreator(session.user.isCreator);
    }
  }, [session]);

  useEffect(() => {
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem.");
    } else {
      setPasswordError("");
    }
  }, [newPassword, confirmPassword]);

  // Validação da chave PIX
  useEffect(() => {
    if (!pixKey || !pixKeyType) {
      setPixKeyError("");
      return;
    }

    const isValid = (() => {
      switch (pixKeyType) {
        case "cpf":
          return /^\d{11}$/.test(pixKey);
        case "email":
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pixKey);
        case "telefone":
          return /^(\+55)?\d{10,11}$/.test(pixKey);
        case "aleatoria":
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(pixKey);
        default:
          return false;
      }
    })();

    if (!isValid) {
      switch (pixKeyType) {
        case "cpf":
          setPixKeyError("CPF deve conter exatamente 11 dígitos numéricos");
          break;
        case "email":
          setPixKeyError("Digite um email válido");
          break;
        case "telefone":
          setPixKeyError("Digite um telefone válido com DDD (exemplo: 11999999999)");
          break;
        case "aleatoria":
          setPixKeyError("Chave aleatória deve estar no formato UUID");
          break;
      }
    } else {
      setPixKeyError("");
    }
  }, [pixKey, pixKeyType]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Se for criador, validar os campos de PIX antes de enviar
      if (isCreator && (!pixKey || !pixKeyType)) {
        toast.error({
          title: "Erro ao atualizar configurações",
          description: "Chave Pix e tipo são obrigatórios para criadores",
        });
        return;
      }

      const response = await fetch("/api/user/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pixKey: pixKey || null,
          pixKeyType: pixKeyType || null,
          isCreator,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar configurações");
      }

      await update({
        ...session,
        user: {
          ...session?.user,
          pixKey: data.user.pixKey,
          pixKeyType: data.user.pixKeyType,
          isCreator: data.user.isCreator,
        },
      });

      toast.success({
        title: "Configurações atualizadas com sucesso.",
        description: "Suas configurações foram atualizadas com sucesso.",
      });

      router.refresh();
    } catch (error) {
      console.error("Erro ao atualizar configurações:", error);
      toast.error({
        title: "Erro ao atualizar configurações",
        description:
          error instanceof Error
            ? error.message
            : "Ocorreu um erro ao atualizar suas configurações.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmitPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao alterar senha");
      }

      toast.success({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso",
      });

      // Limpar campos
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: "Erro ao alterar senha",
        description:
          error.message || "Ocorreu um erro ao tentar alterar sua senha",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas configurações de conta e preferências.
        </p>
      </div>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Conta</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        {/* Aba de Conta */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <form onSubmit={onSubmit}>
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>
                  Atualize suas informações de perfil e preferências de conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    defaultValue={session?.user?.name || ""}
                    disabled
                  />
                  {/* Explicação sobre campos desabilitados */}
                  <p className="text-xs text-muted-foreground">
                    O nome e email são gerenciados pelo provedor de autenticação
                    e não podem ser alterados aqui.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={session?.user?.email || ""}
                    disabled
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="creator-mode"
                    checked={isCreator}
                    onCheckedChange={setIsCreator}
                  />
                  <Label htmlFor="creator-mode">Modo Criador</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        {/* Aba de Pagamentos */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <form onSubmit={onSubmit}>
              <CardHeader>
                <CardTitle>Configurações de Pagamento</CardTitle>
                <CardDescription>
                  Configure sua chave Pix para receber pagamentos.
                  {isCreator && (
                    <p className="mt-2 text-destructive">
                      * Chave Pix é obrigatória para criadores
                    </p>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pix-key-type">Tipo de Chave Pix</Label>
                  <Select 
                    value={pixKeyType} 
                    onValueChange={setPixKeyType}
                  >
                    <SelectTrigger id="pix-key-type">
                      <SelectValue placeholder="Selecione o tipo de chave" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpf">CPF</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="telefone">Telefone</SelectItem>
                      <SelectItem value="aleatoria">Chave Aleatória</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pix-key">Chave Pix</Label>
                  <Input
                    id="pix-key"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                    placeholder={
                      pixKeyType === "cpf"
                        ? "Digite seu CPF (apenas números)"
                        : pixKeyType === "email"
                        ? "Digite seu email"
                        : pixKeyType === "telefone"
                        ? "Digite seu telefone com DDD"
                        : pixKeyType === "aleatoria"
                        ? "Digite sua chave aleatória"
                        : "Digite sua chave Pix"
                    }
                  />
                  {pixKeyError && (
                    <p className="text-sm text-destructive">{pixKeyError}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? "Salvando..." : "Salvar Configurações"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        {/* Aba de Segurança */}
        {/* Nova Aba de Segurança */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <form onSubmit={onSubmitPassword}>
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
                <CardDescription>Atualize sua senha para manter sua conta segura.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {passwordError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{passwordError}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-1">
                  <p className="text-sm font-medium">Requisitos de senha:</p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Mínimo de 8 caracteres</li>
                    <li>Pelo menos uma letra maiúscula</li>
                    <li>Pelo menos um número</li>
                    <li>Pelo menos um caractere especial</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={isLoading || !currentPassword || !newPassword || !confirmPassword || !!passwordError}
                >
                  {isLoading ? "Alterando..." : "Alterar Senha"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        {/* Aba de Notificação */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>
                Configure suas preferências de notificação.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="email-notifications" defaultChecked />
                <Label htmlFor="email-notifications">
                  Notificações por email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="payment-notifications" defaultChecked />
                <Label htmlFor="payment-notifications">
                  Notificações de pagamento
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="marketing-notifications" />
                <Label htmlFor="marketing-notifications">
                  Notificações de marketing
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
