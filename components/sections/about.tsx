"use client";

import { motion, Variants } from "framer-motion"; // Adicionei a importação de Variants
import { Code2, Globe, GraduationCap, Heart, Zap } from "lucide-react";

// Tipagem explícita para resolver o erro de inferência
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring", // Agora o TS aceita isso corretamente
      stiffness: 100,
    },
  },
};

export const About = () => {
  return (
    <section id="about" className="relative py-24 bg-zinc-950 text-zinc-100 overflow-hidden">
      
      {/* Título da Secção */}
      <div className="container mx-auto px-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-12 bg-blue-500" />
          <span className="text-blue-500 font-mono text-sm tracking-widest uppercase">Quem sou eu</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-3xl md:text-4xl font-bold max-w-2xl"
        >
          Design e Código em <span className="text-zinc-500">Sincronia Perfeita.</span>
        </motion.h2>
      </div>

      {/* O BENTO GRID */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]"
      >
        
        {/* CARD 1: BIO PRINCIPAL */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 row-span-2 rounded-3xl p-8 bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity text-blue-500">
             <Code2 size={40} strokeWidth={1} />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Paulo Henrique</h3>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  Tenho 26 anos e estou prestes a concluir a minha formação em 
                  <strong className="text-zinc-100"> Análise e Desenvolvimento de Sistemas</strong>. 
                  A minha jornada não é apenas sobre escrever linhas de código, mas sobre criar 
                  interfaces que as pessoas realmente gostam de usar.
                </p>
                <p className="text-zinc-400 leading-relaxed mt-4">
                  Especializei-me no ecossistema <span className="text-blue-400">React & Next.js</span> porque acredito na web rápida, dinâmica e acessível.
                </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-2">
                {["Front-end Specialist", "UI Enthusiast", "Clean Code"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">
                        {tag}
                    </span>
                ))}
            </div>
          </div>
        </motion.div>

        {/* CARD 2: LOCALIZAÇÃO */}
        <motion.div 
          variants={itemVariants}
          className="rounded-3xl p-6 bg-zinc-900/30 border border-white/5 flex flex-col justify-between group hover:bg-zinc-900/50 transition-all"
        >
           <div className="flex justify-between items-start">
              <div className="p-3 rounded-full bg-green-500/10 text-green-400">
                <Globe size={24} />
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs text-zinc-500 font-mono uppercase">Online Agora</span>
              </div>
           </div>
           
           <div>
              <h4 className="text-3xl font-bold text-white mt-4">Brasil</h4>
              <p className="text-zinc-500 text-sm">Disponível para Remote Worldwide</p>
           </div>
           <div className="absolute inset-0 z-[-1] opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
        </motion.div>

        {/* CARD 3: EDUCAÇÃO */}
        <motion.div 
          variants={itemVariants}
          className="rounded-3xl p-6 bg-zinc-900/30 border border-white/5 flex flex-col justify-center group hover:border-purple-500/30 transition-colors"
        >
          <div className="mb-4 p-3 w-fit rounded-full bg-purple-500/10 text-purple-400">
            <GraduationCap size={24} />
          </div>
          <h4 className="text-xl font-bold text-white">Formação ADS</h4>
          <p className="text-zinc-400 text-sm mt-2">
            Foco em Engenharia de Software e Arquitetura de Sistemas.
          </p>
          <div className="mt-4 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
             <div className="bg-purple-500 h-full w-[90%]" /> 
          </div>
          <span className="text-xs text-zinc-500 mt-2 text-right">Conclusão: Em breve</span>
        </motion.div>

        {/* CARD 4: STACK TÉCNICA */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 rounded-3xl p-8 bg-zinc-900/30 border border-white/5 flex flex-col justify-center relative overflow-hidden"
        >
           <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
           
           <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
             <Zap className="text-yellow-500" size={20}/> 
             Arsenal Tecnológico
           </h3>

           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "Next.js 15", level: "Avançado" },
                { name: "React", level: "Expert" },
                { name: "TypeScript", level: "Fluente" },
                { name: "Tailwind v4", level: "Fanático" },
                { name: "Framer Motion", level: "Criativo" },
                { name: "Node.js", level: "Sólido" },
                { name: "PostgreSQL", level: "Básico" },
                { name: "Figma", level: "Visual" }
              ].map((tech) => (
                <div key={tech.name} className="flex flex-col p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-zinc-200 font-medium text-sm">{tech.name}</span>
                    <span className="text-zinc-600 text-xs">{tech.level}</span>
                </div>
              ))}
           </div>
        </motion.div>

        {/* CARD 5: FILOSOFIA */}
        <motion.div 
          variants={itemVariants}
          className="rounded-3xl p-6 bg-gradient-to-br from-zinc-900/50 to-zinc-900/10 border border-white/5 flex flex-col justify-center text-center items-center"
        >
           <div className="p-4 rounded-full bg-white/5 mb-4">
              <Heart className="text-red-500 fill-red-500/20" size={24} />
           </div>
           <p className="text-zinc-300 italic font-serif text-lg">
             &quot;Código limpo não é sobre regras, é sobre respeito ao próximo desenvolvedor.&quot;
           </p>
        </motion.div>

      </motion.div>
    </section>
  );
};