"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      
      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          
          {/* Coluna da Esquerda: CTA */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter max-w-lg">
              Tem uma ideia inovadora?
            </h2>
            <p className="text-zinc-400 text-lg max-w-md">
              Estou sempre aberto a discutir novos projetos, oportunidades de tech lead ou apenas trocar ideias sobre o futuro da web.
            </p>
            
            <div className="pt-4">
               <Link 
                 href="mailto:paulo@exemplo.com"
                 className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors"
               >
                 <Mail size={20} />
                 Vamos Conversar
               </Link>
            </div>
          </div>

          {/* Coluna da Direita: Links de Navegação */}
          <div className="flex flex-col md:items-end justify-between space-y-10 md:space-y-0">
             
             {/* Social Links */}
             <div className="flex gap-4">
                {[
                  { icon: <Github size={24} />, href: "https://github.com", label: "GitHub" },
                  { icon: <Linkedin size={24} />, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: <Twitter size={24} />, href: "https://twitter.com", label: "Twitter" },
                ].map((social) => (
                  <Link 
                    key={social.label} 
                    href={social.href}
                    target="_blank"
                    className="p-4 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
             </div>

             {/* Links Rápidos */}
             <nav className="flex flex-col md:text-right gap-4">
                <Link href="#home" className="text-zinc-400 hover:text-white text-lg font-medium transition-colors">Home</Link>
                <Link href="#about" className="text-zinc-400 hover:text-white text-lg font-medium transition-colors">Sobre Mim</Link>
                <Link href="#projects" className="text-zinc-400 hover:text-white text-lg font-medium transition-colors">Projetos</Link>
                <Link href="#lab" className="text-zinc-400 hover:text-white text-lg font-medium transition-colors">Laboratório</Link>
             </nav>
          </div>
        </div>

        {/* Bottom Bar: Copyright e Créditos */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p>Sistemas em operação normal.</p>
           </div>

           <div className="flex items-center gap-6">
              <p>© {currentYear} Paulo Henrique.</p>
              <p className="hidden md:block">Feito com Next.js 15 & Tailwind v4</p>
           </div>
        </div>
      </div>

      {/* Background Glow no Footer */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
    </footer>
  );
};