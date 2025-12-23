"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Beaker, 
  Settings, 
  LogOut,
  PlusCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FolderOpen, label: "Projetos", href: "/admin/projects" },
  { icon: Beaker, label: "Lab / Experimentos", href: "/admin/lab" },
  { icon: Settings, label: "Configurações", href: "/admin/settings" },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-900 border-r border-white/5 h-screen fixed left-0 top-0 flex flex-col z-50">
      
      {/* Header da Sidebar */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <span className="font-bold text-lg tracking-tight text-white">
          Paulo<span className="text-blue-500">.Admin</span>
        </span>
      </div>

      {/* Navegação Principal */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        
        <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Geral
        </div>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive 
                  ? "bg-blue-500/10 text-blue-400" 
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-8 px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Ações Rápidas
        </div>
        
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-400 hover:bg-green-500/10 hover:text-green-400 transition-colors"
        >
          <PlusCircle size={18} />
          Novo Projeto
        </Link>

      </nav>

      {/* Footer da Sidebar */}
      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-md transition-colors">
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
};