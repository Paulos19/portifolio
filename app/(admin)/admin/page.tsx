import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Code2, Eye, FileText } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      
      {/* Header da Página */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400">Bem-vindo de volta, Paulo. Aqui está o resumo do teu portfólio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Projetos", value: "12", icon: Code2, color: "text-blue-500" },
          { title: "Visitas (Mês)", value: "2,340", icon: Eye, color: "text-green-500" },
          { title: "Artigos Lab", value: "08", icon: Beaker, color: "text-purple-500" }, // Beaker importado via lucide
          { title: "Atividade", value: "Alta", icon: Activity, color: "text-orange-500" },
        ].map((stat, i) => (
          <Card key={i} className="bg-zinc-900 border-white/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projetos Recentes (Tabela Simplificada) */}
      <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-semibold text-white">Projetos Recentes</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300">Ver todos</button>
        </div>
        <div className="p-0">
            <table className="w-full text-left text-sm text-zinc-400">
                <thead className="bg-white/5 text-zinc-200 font-medium">
                    <tr>
                        <th className="px-6 py-3">Nome</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Tech Stack</th>
                        <th className="px-6 py-3 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {[1, 2, 3].map((_, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">Projeto Exemplo {i + 1}</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                                    Publicado
                                </span>
                            </td>
                            <td className="px-6 py-4">Next.js, Tailwind</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-zinc-400 hover:text-white">Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

// Nota: Precisas importar o ícone Beaker do lucide-react no topo se o usares no array
import { Beaker } from "lucide-react";