"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Plus, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Componentes Shadcn
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 1. Definição do Schema de Validação (O Contrato)
const formSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  imageUrl: z.string().url({
    message: "Insira uma URL válida para a imagem.",
  }),
  link: z.string().url({
    message: "Insira uma URL válida para o projeto.",
  }),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, {
    message: "Insira um código Hex válido (ex: #3b82f6).",
  }),
  tags: z.array(z.string()).min(1, {
    message: "Adicione pelo menos uma tecnologia.",
  }),
});

export default function NewProjectPage() {
  const router = useRouter();
  
  // State local apenas para o input de tags (antes de adicionar ao form)
  const [tagInput, setTagInput] = useState("");

  // 2. Inicialização do Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      link: "",
      color: "#3b82f6", // Azul padrão
      tags: [],
    },
  });

  // 3. Função de Submit (Por enquanto apenas loga)
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("DADOS VALIDADOS:", values);
    alert("Projeto salvo no console! (Backend pendente)");
    // Aqui faríamos o POST para a API
    // router.push("/admin/projects");
  }

  // Lógica de Tags (O toque Sênior)
  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Impede o submit do form ao dar enter na tag
      const currentTags = form.getValues("tags");
      if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
        form.setValue("tags", [...currentTags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue("tags", currentTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* Cabeçalho com Botão Voltar */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
        </Link>
        <div>
            <h1 className="text-3xl font-bold text-white">Novo Projeto</h1>
            <p className="text-zinc-400">Adicione um novo trabalho ao seu portfólio.</p>
        </div>
      </div>

      {/* O Formulário */}
      <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* GRUPO 1: Informações Básicas */}
            <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Título do Projeto</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: E-commerce SaaS" className="bg-zinc-950 border-white/10 text-white focus-visible:ring-blue-500" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Descrição</FormLabel>
                      <FormControl>
                        <Textarea 
                            placeholder="Descreva o desafio, a solução e o impacto..." 
                            className="bg-zinc-950 border-white/10 text-white min-h-[120px] focus-visible:ring-blue-500" 
                            {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
            </div>

            {/* GRUPO 2: Links e Mídia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Link do Projeto (URL)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." className="bg-zinc-950 border-white/10 text-white focus-visible:ring-blue-500" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Capa (URL da Imagem)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." className="bg-zinc-950 border-white/10 text-white focus-visible:ring-blue-500" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs text-zinc-500">
                        Recomendado: 1920x1080px (WebP ou PNG)
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
            </div>

            {/* GRUPO 3: Detalhes Visuais e Técnicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Input de Cor com Preview Visual */}
                 <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Cor de Destaque (Hex)</FormLabel>
                      <div className="flex gap-3">
                          <div 
                            className="w-10 h-10 rounded-md border border-white/10 shadow-inner"
                            style={{ backgroundColor: field.value }} 
                          />
                          <FormControl>
                            <Input placeholder="#3b82f6" className="bg-zinc-950 border-white/10 text-white focus-visible:ring-blue-500 font-mono" {...field} />
                          </FormControl>
                      </div>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Input de Tags Customizado */}
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Tecnologias (Tags)</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                            <Input 
                                placeholder="Digite e pressione Enter (ex: Next.js)..." 
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={addTag}
                                className="bg-zinc-950 border-white/10 text-white focus-visible:ring-blue-500"
                            />
                            
                            {/* Área de Visualização das Tags */}
                            <div className="flex flex-wrap gap-2 min-h-[30px]">
                                {field.value.map((tag) => (
                                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20 animate-in fade-in zoom-in duration-200">
                                        {tag}
                                        <button 
                                            type="button" 
                                            onClick={() => removeTag(tag)}
                                            className="hover:text-red-400 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                                {field.value.length === 0 && (
                                    <span className="text-sm text-zinc-600 italic">Nenhuma tag adicionada.</span>
                                )}
                            </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
            </div>

            {/* Footer do Form */}
            <div className="pt-4 flex justify-end gap-4">
                <Button type="button" variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5" onClick={() => router.back()}>
                    Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white min-w-[150px]">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Projeto
                </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}