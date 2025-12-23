import { NavBar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Lab } from "@/components/sections/lab"; // <--- Novo
import { Footer } from "@/components/layout/footer"; // <--- Novo

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-zinc-950 selection:bg-blue-500/30">
      
      <NavBar />
      
      <Hero />
      
      <About />
      
      <Projects />
      
      <Lab />
      
      <Footer />

    </main>
  );
}