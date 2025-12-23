"use client";

import { useState, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Save, ArrowLeft, Loader2, UploadCloud, ImageIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Vercel Blob
import { upload } from "@vercel/blob/client";

// Server Action
import { createProject } from "@/app/actions/projects";

// UI Components
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

const formSchema = z.object({
  title: z.string().min(2, "Título muito curto."),
  description: z.string().min(10, "Descrição muito curta."),
  imageUrl: z.string().url("A imagem é obrigatória."), // O Zod valida a URL que virá do Blob
  link: z.string().url("URL do projeto inválida."),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Código Hex inválido."),
  tags: z.array(z.string()).min(1, "Adicione pelo menos uma tag."),
});

export default function NewProjectPage() {
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  
  // States
  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Estado específico para o upload da imagem
  const [isPending, startTransition] = useTransition(); // Estado para o salvamento no banco

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      link: "",
      color: "#3b82f6",
      tags: [],
    },
  });

  // --- LÓGICA DE UPLOAD DE IMAGEM ---
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    setIsUploading(true);

    try {
      // Faz o upload direto para o Vercel Blob (Client-side upload)
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload', // Aponta para a rota que criamos
      });

      // Se der certo, coloca a URL no formulário
      form.setValue("imageUrl", newBlob.url);
      form.clearErrors("imageUrl");
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Falha ao fazer upload da imagem.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    form.setValue("imageUrl", "");
    // Nota: Em produção, idealmente chamaríamos uma server action para deletar o blob antigo também
  };

  // --- LÓGICA DE SUBMIT ---
  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await createProject(null, values);
      if (result && result.error) {
        alert(result.error);
      }
      // Sucesso = Redirect automático pelo Server Action
    });
  }

  // --- LÓGICA DE TAGS ---
  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentTags = form.getValues("tags");
      const val = tagInput.trim();
      if (val && !currentTags.includes(val)) {
        form.setValue("tags", [...currentTags, val]);
        setTagInput("");
        form.clearErrors("tags");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue("tags", currentTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
        </Link>
        <div>
            <h1 className="text-3xl font-bold text-white">Novo Projeto</h1>
            <p className="text-zinc-400">Preencha os dados para adicionar ao portfólio.</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 md:p-8 shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* GRUPO 1: Informações Principais */}
            <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Nome do Projeto</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="Ex: Plataforma SaaS Financeira" className="bg-zinc-950 border-white/10 text-white focus-visible:ring-blue-500 h-11" {...field} />
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
                      <FormLabel className="text-zinc-300">Descrição Detalhada</FormLabel>
                      <FormControl>
                        <Textarea 
                            disabled={isPending}
                            placeholder="Descreva o problema, a solução técnica e os resultados..." 
                            className="bg-zinc-950 border-white/10 text-white min-h-[120px] focus-visible:ring-blue-500 resize-none leading-relaxed" 
                            {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
            </div>

            {/* GRUPO 2: Upload de Imagem (A Mágica do Blob) */}
            <div className="p-6 rounded-lg border border-dashed border-white/10 bg-zinc-950/50">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300 mb-2 block">Capa do Projeto</FormLabel>
                      
                      {/* Estado: Sem Imagem (Botão de Upload) */}
                      {!field.value ? (
                        <div 
                          onClick={() => inputFileRef.current?.click()}
                          className={`
                            h-64 flex flex-col items-center justify-center gap-4 rounded-lg cursor-pointer transition-all
                            ${isUploading ? 'bg-zinc-900/50 opacity-50 cursor-wait' : 'hover:bg-zinc-900 bg-zinc-900/30'}
                          `}
                        >
                           {isUploading ? (
                             <div className="flex flex-col items-center gap-2 text-zinc-500">
                               <Loader2 className="animate-spin text-blue-500" size={32} />
                               <span className="text-sm">Enviando para a nuvem...</span>
                             </div>
                           ) : (
                             <>
                               <div className="p-4 rounded-full bg-blue-500/10 text-blue-500">
                                  <UploadCloud size={32} />
                               </div>
                               <div className="text-center">
                                 <p className="text-sm font-medium text-zinc-300">Clique para fazer upload</p>
                                 <p className="text-xs text-zinc-500 mt-1">SVG, PNG, JPG ou GIF (Max 4MB)</p>
                               </div>
                             </>
                           )}
                           {/* Input File Escondido */}
                           <input 
                              type="file" 
                              ref={inputFileRef}
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageUpload}
                              disabled={isUploading || isPending}
                           />
                        </div>
                      ) : (
                        // Estado: Com Imagem (Preview)
                        <div className="relative h-64 w-full rounded-lg overflow-hidden border border-white/10 group">
                           <Image 
                             src={field.value} 
                             alt="Preview" 
                             fill 
                             className="object-cover"
                           />
                           {/* Overlay de Ação */}
                           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                              <Button 
                                type="button" 
                                variant="destructive" 
                                size="sm" 
                                onClick={removeImage}
                                disabled={isPending}
                              >
                                <Trash2 size={16} className="mr-2"/> Remover
                              </Button>
                           </div>
                        </div>
                      )}
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
            </div>

            {/* GRUPO 3: Link e Cor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Link do Repositório/Demo</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="https://github.com/..." className="bg-zinc-950 border-white/10 text-white focus-visible:ring-blue-500" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                 <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Cor Principal (Brand Color)</FormLabel>
                      <div className="flex gap-3">
                          <div 
                            className="w-10 h-10 rounded-md border border-white/10 shadow-inner shrink-0"
                            style={{ backgroundColor: field.value }} 
                          />
                          <FormControl>
                            <Input disabled={isPending} placeholder="#3b82f6" className="bg-zinc-950 border-white/10 text-white focus-visible:ring-blue-500 font-mono uppercase" {...field} />
                          </FormControl>
                      </div>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
            </div>

            {/* GRUPO 4: Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Tech Stack</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                        <Input 
                            disabled={isPending}
                            placeholder="Digite a tecnologia e pressione Enter (ex: Next.js)..." 
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={addTag}
                            className="bg-zinc-950 border-white/10 text-white focus-visible:ring-blue-500"
                        />
                        
                        <div className="flex flex-wrap gap-2 min-h-[40px] p-4 bg-zinc-950/50 rounded-lg border border-white/5">
                            {field.value.map((tag) => (
                                <span key={tag} className="inline-flex items-center gap-1 pl-3 pr-2 py-1 rounded-md bg-zinc-800 text-zinc-200 text-sm border border-white/10 animate-in fade-in zoom-in duration-200">
                                    {tag}
                                    <button 
                                        type="button" 
                                        onClick={() => removeTag(tag)}
                                        className="p-1 hover:text-red-400 hover:bg-white/5 rounded-full transition-colors"
                                        disabled={isPending}
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                            {field.value.length === 0 && (
                                <span className="text-sm text-zinc-600 flex items-center gap-2">
                                  <ImageIcon size={16} /> Nenhuma tecnologia adicionada.
                                </span>
                            )}
                        </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Footer de Ações */}
            <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
                <Button 
                    type="button" 
                    variant="ghost" 
                    className="text-zinc-400 hover:text-white hover:bg-white/5" 
                    onClick={() => router.back()}
                    disabled={isPending || isUploading}
                >
                    Cancelar
                </Button>
                
                <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-500 text-white min-w-[180px]"
                    disabled={isPending || isUploading}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Salvando...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Publicar Projeto
                        </>
                    )}
                </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}