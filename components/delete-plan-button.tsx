"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
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
} from "@/components/ui/alert-dialog";

interface DeletePlanButtonProps {
  id: string;
}

export function DeletePlanButton({ id }: DeletePlanButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleDelete() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/plans/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao deletar plano");
      }
      toast.success({
        title: "Plano deletado",
        description: "O plano foi removido com sucesso.",
      });
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error({
        title: "Erro ao deletar plano",
        description: error.message || "Erro desconhecido.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-rose-500 bg-rose-50 text-rose-500 hover:bg-rose-500/20 hover:text-rose-600 cursor-pointer
          dark:border-rose-500 dark:hover:bg-rose-500/20 transition-colors duration-300"
          title="Deletar plano"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir plano</AlertDialogTitle>
          <AlertDialogDescription>
            Você realmente deseja excluir este plano? Esta ação não poderá ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-white hover:bg-destructive/90 cursor-pointer"
          >
            {isLoading ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
