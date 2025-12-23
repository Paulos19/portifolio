"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { Project } from "@prisma/client"; // <--- Tipo oficial
import Image from "next/image";
import Link from "next/link";

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

  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${index * 25}px)` }} 
        className="relative flex flex-col w-full max-w-5xl h-[550px] md:h-[600px] bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl origin-top"
      >
        <div className="flex h-full flex-col md:flex-row">
          
          {/* LADO ESQUERDO: Texto & Info */}
          <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between relative z-20 bg-zinc-900/95 backdrop-blur-sm">
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
              
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
               {/* Botão de Deploy (se existir) */}
               {project.deployUrl && (
                 <Link href={project.deployUrl} target="_blank">
                    <Button className="rounded-full bg-white text-black hover:bg-zinc-200 gap-2 font-semibold">
                        Demo <Globe size={16} />
                    </Button>
                 </Link>
               )}
               
               {/* Botão de Código */}
               <Link href={project.link} target="_blank">
                  <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5 gap-2 text-zinc-300">
                      <Github size={16} /> Code
                  </Button>
               </Link>
            </div>
          </div>

          {/* LADO DIREITO: Imagem */}
          <div className="relative w-full md:w-3/5 h-full overflow-hidden group bg-zinc-950">
             {/* Overlay Gradiente */}
             <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-transparent to-transparent z-10" />
             
             <motion.div
                className="w-full h-full relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
             >
                {project.imageUrl ? (
                    <Image 
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover object-left-top"
                        quality={90}
                    />
                ) : (
                    // Fallback se não tiver imagem (apenas cor)
                    <div 
                      className="w-full h-full opacity-20"
                      style={{ backgroundColor: project.color }} 
                    />
                )}
             </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};