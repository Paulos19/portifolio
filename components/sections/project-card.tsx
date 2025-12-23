"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const ProjectCard = ({ project, index, progress, range, targetScale }: ProjectCardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // A escala diminui à medida que o próximo card sobe
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${index * 25}px)` }} 
        className="relative flex flex-col w-full max-w-5xl h-[500px] md:h-[600px] bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl origin-top"
      >
        <div className="flex h-full flex-col md:flex-row">
          
          {/* LADO ESQUERDO: Texto & Info */}
          <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between relative z-20 bg-zinc-900/90 backdrop-blur-sm">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest">
                  Projeto 0{index + 1}
                </span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {project.title}
              </h3>
              
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
               <Button className="rounded-full bg-white text-black hover:bg-zinc-200 gap-2">
                  Live Demo <ArrowUpRight size={16} />
               </Button>
               <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5 gap-2">
                  <Github size={16} /> Code
               </Button>
            </div>
          </div>

          {/* LADO DIREITO: Imagem / Preview */}
          <div className="relative w-full md:w-3/5 h-full overflow-hidden group">
             {/* Overlay de gradiente para misturar com o texto */}
             <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-transparent to-transparent z-10 md:via-zinc-900/20" />
             
             <motion.div
                className="w-full h-full relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
             >
                {/* Aqui usaríamos next/image real. Usarei div colorida para o exemplo não quebrar sem imagens */}
                <div 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  style={{ backgroundColor: project.color, opacity: 0.2 }}
                />
                
                {/* Mockup visual CSS puro para não depender de imagens externas agora */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-zinc-950 rounded-lg border border-white/10 shadow-2xl flex items-center justify-center">
                    <span className="text-zinc-700 font-mono text-xs">Preview do Projeto</span>
                </div>
             </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};