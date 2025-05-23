"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface EditPlanButtonProps {
  id: string;
  name: string;
  description: string;
  price: number;
  benefits: string[];
}

export function EditPlanButton({
  id,
  name,
  description,
  price,
  benefits,
}: EditPlanButtonProps) {
  // Garante que benefits seja sempre um array de strings para exibir corretamente no textarea
  let benefitsArray: string[] = [];
  if (Array.isArray(benefits)) {
    benefitsArray = benefits;
  } else if (typeof benefits === "string") {
    // Remove colchetes e aspas extras caso benefits seja '["texto"]'
    let str = String(benefits).trim();
    if (str.startsWith("[") && str.endsWith("]")) {
      try {
        const parsed = JSON.parse(str);
        if (Array.isArray(parsed)) {
          benefitsArray = parsed.map((b: any) => String(b));
        } else if (typeof parsed === "string") {
          benefitsArray = [parsed];
        }
      } catch {
        // fallback: remove colchetes e aspas e divide por vírgula
        str = str.slice(1, -1); // remove [ ]
        benefitsArray = str
          .split(",")
          .map((b: string) => b.replace(/^[\s"]+|[\s"]+$/g, ""))
          .filter(Boolean);
      }
    } else {
      benefitsArray = str
        .split("\n")
        .map((b: string) => b.replace(/^[\s"]+|[\s"]+$/g, ""))
        .filter(Boolean);
    }
  }

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const description = formData.get("description") as string;
      const price = Number(formData.get("price"));
      const benefitsRaw = formData.get("benefits") as string;
      const benefits = benefitsRaw
        ? benefitsRaw
            .split("\n")
            .map((b) => b.trim())
            .filter((b) => b.length > 0)
        : [];
      const response = await fetch(`/api/plans/${id}`, {
        method: "PUT",
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
        throw new Error(data.message || "Erro ao editar plano");
      }
      toast.success({
        title: "Plano editado",
        description: "O plano foi editado com sucesso.",
      });
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error({
        title: "Erro ao editar plano",
        description: error.message || "Erro desconhecido.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-violet-500 text-violet-500 hover:bg-violet-500/20
          hover:text-violet-600 transition-colors duration-300 dark:border-violet-500 dark:hover:bg-violet-500/20 cursor-pointer"
          title="Editar Plano"
        >
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Editar Plano</DialogTitle>
        <form onSubmit={handleEdit}>
          <div className="mt-4">
            <Label htmlFor="name" className="block text-sm font-medium">
              Nome do Plano
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={name}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-violet-500"
              required
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="description" className="block text-sm font-medium">
              Descrição
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={description}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-violet-500 resize-none h-fit"
              required
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="price" className="block text-sm font-medium">
              Preço
            </Label>
            <Input
              type="number"
              id="price"
              name="price"
              defaultValue={price}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-violet-500"
              required
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="benefits" className="block text-sm font-medium">
              Benefícios
            </Label>
            <Textarea
              id="benefits"
              name="benefits"
              defaultValue={benefitsArray.join("\n")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-violet-500 resize-none h-fit"
              required
            />
          </div>
          <div className="mt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-violet-500 hover:bg-violet-600 text-violet-50 transition-colors duration-300 cursor-pointer"
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
