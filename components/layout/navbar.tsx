"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Sobre", href: "#about" },
  { name: "Projetos", href: "#projects" },
  { name: "Lab", href: "#lab" }, // Área para experimentos
];

export const NavBar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lógica para esconder a navbar ao rolar muito para baixo e mostrar ao subir
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 inset-x-0 h-20 z-[100] w-full border-b border-white/5 bg-zinc-950/60 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/30"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full" />
              </Link>
            ))}
            
            {/* Botão CTA para Contato ou Admin (futuro) */}
            <Button 
                variant="outline" 
                className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 rounded-full px-6"
            >
              Vamos conversar
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-zinc-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay (Simplificado) */}
      {isMobileMenuOpen && (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 bg-zinc-950 pt-24 px-6 md:hidden"
        >
            <div className="flex flex-col gap-6 text-2xl font-light">
                {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                        {link.name}
                    </Link>
                ))}
            </div>
        </motion.div>
      )}
    </>
  );
};