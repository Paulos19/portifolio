"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";

export const DeleteButton = ({ id, projectTitle }: { id: string, projectTitle: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // Confirmação nativa simples e eficaz para Admin
    const confirmed = window.confirm(`Tens a certeza que queres apagar "${projectTitle}"? Esta ação é irreversível.`);
    
    if (confirmed) {
      startTransition(async () => {
        await deleteProject(id);
        // Não é preciso redirecionar, o revalidatePath atualiza a lista
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
};