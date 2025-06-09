"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
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

export function DeleteAccountButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleDeleteAccount() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao excluir conta");
      }

      toast.success({
        title: "Conta excluída",
        description: "Sua conta foi excluída com sucesso",
      });

      // Fazer logout após excluir a conta
      await signOut({ callbackUrl: "/" });
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: "Erro ao excluir conta",
        description: error.message || "Ocorreu um erro ao tentar excluir sua conta",
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full cursor-pointer bg-rose-500 hover:bg-rose-600 transition-colors duration-300 text-rose-50"
        >
          Excluir conta
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação irá excluir permanentemente sua conta e todos os seus dados do banco de dados.
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} className="cursor-pointer">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            disabled={isLoading}
            className="bg-rose-500 hover:bg-rose-600 transition-colors duration-300 text-rose-50 cursor-pointer"
          >
            {isLoading ? "Excluindo..." : "Sim, excluir minha conta"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
