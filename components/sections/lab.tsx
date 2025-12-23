"use client";

import { motion } from "framer-motion";
import { ArrowRight, Beaker, GitBranch, Layers, Terminal } from "lucide-react";
import Link from "next/link";

const experiments = [
  {
    id: "01",
    title: "Magnetic Buttons",
    type: "Interaction",
    desc: "Botões que atraem o cursor do rato usando física de molas.",
    icon: <ZapIcon />,
  },
  {
    id: "02",
    title: "WebGL Shader",
    type: "Visual",
    desc: "Experimentos com GLSL para criar fluidos interativos no canvas.",
    icon: <Layers size={20} />,
  },
  {
    id: "03",
    title: "Terminal Portfolio",
    type: "Concept",
    desc: "Uma versão CLI deste portfólio acessível via comando.",
    icon: <Terminal size={20} />,
  },
  {
    id: "04",
    title: "Infinite Scroll",
    type: "Data",
    desc: "Virtualização de listas com carregamento performático.",
    icon: <GitBranch size={20} />,
  },
];

function ZapIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export const Lab = () => {
  return (
    <section id="lab" className="relative py-32 bg-zinc-950 border-t border-white/5">
      
      {/* Background Decorativo (Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

      <div className="container relative mx-auto px-6 z-10">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-sm">
              <Beaker size={16} />
              <span>Laboratório v.1.0</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Experimentos & <br />
              <span className="text-zinc-500">Provas de Conceito</span>
            </h2>
          </div>
          
          <Link href="https://github.com" target="_blank" className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
            Explorar GitHub
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
          </Link>
        </div>

        {/* Grid de Experimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {experiments.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 h-64 flex flex-col justify-between rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-purple-500/30 hover:bg-zinc-900/40 transition-all cursor-pointer overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-zinc-600 group-hover:text-purple-400 transition-colors">
                  {item.id}
                </span>
                <div className="text-zinc-500 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-purple-500/70 mb-2 block">{item.type}</span>
                <h3 className="text-lg font-bold text-zinc-200 group-hover:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500 line-clamp-3">
                  {item.desc}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/20 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};