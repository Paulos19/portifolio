import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Plus, Search, ExternalLink, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeleteButton } from "@/components/admin/delete-button";

// Sendo um Server Component, pode ser async
export default async function ProjectsListPage() {
  // Buscar projetos ordenados pelos mais recentes
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      
      {/* Header da Página */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Projetos</h1>
          <p className="text-zinc-400">Gere o teu portfólio e experiências.</p>
        </div>
        
        <div className="flex items-center gap-3">
            {/* Barra de pesquisa (Visual por enquanto) */}
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 h-4 w-4" />
                <Input 
                    placeholder="Filtrar projetos..." 
                    className="pl-9 bg-zinc-900 border-white/10 w-64 focus-visible:ring-blue-500 text-white" 
                />
            </div>
            
            <Link href="/admin/projects/new">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Projeto
                </Button>
            </Link>
        </div>
      </div>

      {/* Tabela de Listagem */}
      <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden shadow-sm">
        
        {projects.length === 0 ? (
          // EMPTY STATE
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                <Search className="text-zinc-500" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Sem projetos encontrados</h3>
            <p className="text-zinc-400 max-w-sm mb-6">
              Ainda não tens nenhum projeto publicado. Começa por adicionar o teu primeiro trabalho.
            </p>
            <Link href="/admin/projects/new">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                    Criar Projeto Agora
                </Button>
            </Link>
          </div>
        ) : (
          // LISTA COM DADOS
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5 text-zinc-400 text-xs uppercase tracking-wider">
                  <th className="p-4 pl-6 font-medium">Projeto</th>
                  <th className="p-4 font-medium">Tech Stack</th>
                  <th className="p-4 font-medium">Data</th>
                  <th className="p-4 font-medium">Link</th>
                  <th className="p-4 pr-6 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((project) => (
                  <tr key={project.id} className="group hover:bg-white/[0.02] transition-colors">
                    
                    {/* Coluna 1: Imagem + Título */}
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-12 rounded-md overflow-hidden bg-zinc-800 border border-white/10 shrink-0">
                          {project.imageUrl ? (
                             <Image 
                                src={project.imageUrl} 
                                alt={project.title} 
                                fill 
                                className="object-cover"
                             />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">Sem img</div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-zinc-200 group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                             <span className="text-xs text-zinc-500 font-mono">{project.color}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Coluna 2: Tags */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-zinc-800 border border-white/5 text-[10px] text-zinc-400">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                            <span className="px-2 py-0.5 text-[10px] text-zinc-500">+{project.tags.length - 3}</span>
                        )}
                      </div>
                    </td>

                    {/* Coluna 3: Data */}
                    <td className="p-4 text-sm text-zinc-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Intl.DateTimeFormat('pt-PT', { 
                            day: '2-digit', 
                            month: 'short', 
                            year: 'numeric' 
                        }).format(project.createdAt)}
                      </div>
                    </td>

                    {/* Coluna 4: Link Externo */}
                    <td className="p-4">
                        <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-white transition-colors"
                        >
                            Ver Demo <ExternalLink size={12} />
                        </a>
                    </td>

                    {/* Coluna 5: Ações */}
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Botão de Editar (Ainda não criámos a página, mas fica o link pronto) */}
                        <Link href={`/admin/projects/${project.id}/edit`}>
                             <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10">
                                <span className="sr-only">Editar</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                             </Button>
                        </Link>
                        
                        {/* Botão de Apagar (Componente Cliente) */}
                        <DeleteButton id={project.id} projectTitle={project.title} />
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}