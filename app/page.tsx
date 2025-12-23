import { NavBar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Lab } from "@/components/sections/lab";
import { Footer } from "@/components/layout/footer";

// Importar Prisma
import { prisma } from "@/lib/prisma";

// Definir revalidação (ISR) - Opcional
// Como estamos a usar server actions para criar, o cache limpa automaticamente.
// Mas podemos forçar uma verificação a cada hora se quisermos.
export const revalidate = 3600; 

export default async function Home() {
  // 1. Fetch de dados no Servidor
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc", // Mostra os mais recentes primeiro
    },
    take: 5, // Limita aos top 5 para a home não ficar infinita
  });

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-zinc-950 selection:bg-blue-500/30">
      
      <NavBar />
      
      <Hero />
      
      <About />
      
      {/* 2. Passar dados para o Cliente */}
      <Projects data={projects} />
      
      <Lab />
      
      <Footer />

    </main>
  );
}