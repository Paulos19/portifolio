"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { ProjectCard } from "./project-card";
import { Project } from "@prisma/client"; // <--- Importamos o tipo direto do Prisma

interface ProjectsProps {
  data: Project[]; // Recebe os dados do Pai
}

export const Projects = ({ data }: ProjectsProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Se não houver projetos, não renderiza a seção ou mostra um aviso
  if (!data || data.length === 0) {
    return null; 
  }

  return (
    <section id="projects" ref={container} className="relative bg-zinc-950 px-6 md:px-0">
      
      <div className="max-w-7xl mx-auto pt-24 pb-12 md:pl-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Projetos Selecionados
        </h2>
        <p className="text-xl text-zinc-400 max-w-xl">
          Uma coleção de aplicações web desenvolvidas com foco em performance, acessibilidade e design system.
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto pb-24">
        {data.map((project, i) => {
          // Lógica de escala (Stack Effect)
          const targetScale = 1 - (data.length - i) * 0.05;
          
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