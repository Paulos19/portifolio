import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"; // Utilitário padrão do shadcn

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Paulo Henrique | Developer",
  description: "Desenvolvedor Front-End especializado em Next.js e React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-zinc-950 font-sans antialiased selection:bg-blue-500/30 selection:text-blue-200",
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}