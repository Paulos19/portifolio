"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { ProjectCard } from "./project-card";
import { Project } from "@/lib/types";

// MOCK DATA - Futuramente virá do seu CMS/Admin
const projects: Project[] = [
  {
    id: "1",
    title: "Saas Financeiro AI",
    description: "Uma plataforma completa de gestão financeira que utiliza IA para categorizar despesas e prever fluxos de caixa. Dashboard interativo com gráficos em tempo real.",
    tags: ["Next.js 15", "Tailwind v4", "Recharts", "OpenAI API"],
    imageUrl: "/projects/finance.png",
    link: "https://github.com",
    color: "#3b82f6" // Blue
  },
  {
    id: "2",
    title: "E-commerce Headless",
    description: "Loja virtual ultrarrápida utilizando Shopify como backend e Next.js no frontend. Foco total em Core Web Vitals e conversão mobile.",
    tags: ["React", "Shopify SDK", "Zustand", "Stripe"],
    imageUrl: "/projects/shop.png",
    link: "https://github.com",
    color: "#a855f7" // Purple
  },
  {
    id: "3",
    title: "Sistema de Gestão Escolar",
    description: "Aplicação complexa para gestão de alunos, notas e turmas. Inclui sistema de autenticação, roles de usuário e geração de relatórios PDF.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Shadcn UI"],
    imageUrl: "/projects/school.png",
    link: "https://github.com",
    color: "#10b981" // Emerald
  },
  {
    id: "4",
    title: "Portfolio 2024 V1",
    description: "Versão anterior do meu portfólio, focada em animações WebGL e Three.js. Um experimento criativo de performance e visual.",
    tags: ["Three.js", "WebGL", "GSAP"],
    imageUrl: "/projects/old.png",
    link: "https://github.com",
    color: "#f59e0b" // Amber
  },
];

export const Projects = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" ref={container} className="relative bg-zinc-950 px-6 md:px-0">
      
      {/* Cabeçalho da Secção (Sticky para acompanhar o scroll inicial) */}
      <div className="max-w-7xl mx-auto pt-24 pb-12 md:pl-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Projetos Selecionados
        </h2>
        <p className="text-xl text-zinc-400 max-w-xl">
          Uma coleção de aplicações web desenvolvidas com foco em performance, acessibilidade e design system.
        </p>
      </div>

      {/* Renderização dos Cards */}
      <div className="w-full max-w-7xl mx-auto pb-24">
        {projects.map((project, i) => {
          // Lógica Matemática para o efeito de escala (Stack Effect)
          // O último card não precisa escalar, os anteriores diminuem um pouco
          const targetScale = 1 - (projects.length - i) * 0.05;
          
          return (
            <ProjectCard
              key={project.id}
              index={i}
              project={project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
      
    </section>
  );
};