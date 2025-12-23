"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Terminal } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 pt-20">
      
      {/* Background Gradients/Grid (Efeito Tailwind v4 clean) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 blur-[100px] rounded-full mix-blend-screen" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative z-10 px-6 mx-auto text-center md:text-left md:flex md:items-center md:justify-between">
        
        {/* Texto Principal */}
        <div className="max-w-3xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Disponível para novos projetos
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Construindo o futuro <br />
            da <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">experiência digital.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed"
          >
            Sou <strong className="text-zinc-100">Paulo Henrique</strong>. Transformo ideias complexas em interfaces de alta performance utilizando Next.js, TailwdinCSS e design systems modernos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 text-base font-semibold h-12 px-8 rounded-full shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
              Ver Projetos
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/5 border border-zinc-800 h-12 px-8 rounded-full">
              Sobre Mim
            </Button>
          </motion.div>

          {/* Tech Stack Badge (Micro) */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1, duration: 1 }}
             className="pt-8 flex items-center gap-4 text-zinc-500 text-sm"
          >
            <span className="flex items-center gap-1"><Code2 size={16}/> Next.js 15</span>
            <span className="w-1 h-1 bg-zinc-700 rounded-full" />
            <span className="flex items-center gap-1"><Terminal size={16}/> TypeScript</span>
            <span className="w-1 h-1 bg-zinc-700 rounded-full" />
            <span>Tailwind v4</span>
          </motion.div>
        </div>

        {/* Elemento Visual Abstrato (Direita) - Opcional, mas dá o toque Pro */}
        {/* Em mobile some, em desktop aparece como um "Code Block" estilizado ou arte generativa */}
        <motion.div 
            className="hidden md:block relative w-[400px] h-[400px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
             {/* Simulação de um Card de Código Flutuante */}
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-3xl border border-white/10 backdrop-blur-xl p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="space-y-2 font-mono text-sm text-blue-300/80">
                    <p><span className="text-purple-400">const</span> <span className="text-yellow-200">developer</span> = <span className="text-white">{"{"}</span></p>
                    <p className="pl-4">name: <span className="text-green-300">"Paulo Henrique"</span>,</p>
                    <p className="pl-4">role: <span className="text-green-300">"Frontend Engineer"</span>,</p>
                    <p className="pl-4">skills: [<span className="text-green-300">"Next.js"</span>, <span className="text-green-300">"React"</span>],</p>
                    <p className="pl-4">status: <span className="text-blue-400">"Building Awesome Things"</span></p>
                    <p className="text-white">{"}"}</p>
                </div>
             </div>
        </motion.div>

      </div>
    </section>
  );
};