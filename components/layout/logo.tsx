"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="relative z-50 group cursor-pointer">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-1 font-bold text-xl tracking-tighter"
      >
        <span className="text-zinc-100 group-hover:text-white transition-colors">
          Paulo
        </span>
        <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">
          Henrique
        </span>
        {/* O ponto final colorido é um toque de design clássico */}
        <motion.span 
          className="text-blue-500 text-2xl leading-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          .
        </motion.span>
      </motion.div>
    </Link>
  );
};