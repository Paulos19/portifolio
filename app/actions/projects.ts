"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Reaproveitamos o schema do Zod, mas aqui ele roda no servidor para segurança
const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  imageUrl: z.string().url(),
  link: z.string().url(),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i),
  deployUrl: z.string().url(),
  tags: z.array(z.string()).min(1),
});

export async function createProject(prevState: any, formData: z.infer<typeof projectSchema>) {
  // 1. Validar os dados no servidor (Segurança Zero Trust)
  const validatedFields = projectSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: "Dados inválidos. Verifique o formulário.",
    };
  }

  try {
    // 2. Salvar no Banco
    await prisma.project.create({
      data: {
        title: validatedFields.data.title,
        description: validatedFields.data.description,
        imageUrl: validatedFields.data.imageUrl,
        link: validatedFields.data.link,
        color: validatedFields.data.color,
        deployUrl: validatedFields.data.deployUrl,
        tags: validatedFields.data.tags,
      },
    });

    // 3. Limpar o cache
    // Isso garante que quando formos para a lista, os dados novos apareçam imediatamente
    revalidatePath("/"); 
    revalidatePath("/admin");
    revalidatePath("/admin/projects");

  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return {
      error: "Erro no banco de dados. Tente novamente.",
    };
  }

  // 4. Redirecionar (fora do try-catch é uma boa prática no Next.js)
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/"); // Atualiza também a home pública
    return { success: true };
  } catch (error) {
    console.error("Erro ao apagar projeto:", error);
    return { error: "Não foi possível apagar o projeto." };
  }
}