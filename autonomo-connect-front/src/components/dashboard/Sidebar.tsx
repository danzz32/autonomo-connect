import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Crown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. Interface para as props do NavItem ---
interface NavItemProps {
  to: string;
  icon: LucideIcon; // Tipo correto para ícones do Lucide
  label: string;
  isCollapsed: boolean;
  isActive: boolean;
}

// --- 2. Componente movido para FORA da Sidebar ---
const NavItem = ({
  to,
  icon: Icon,
  label,
  isCollapsed,
  isActive,
}: NavItemProps) => (
  <Link to={to} className="w-full">
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full flex items-center py-2 h-10",
        isCollapsed ? "justify-center px-2" : "justify-start px-4 gap-3"
      )}
      title={isCollapsed ? label : undefined} // Tooltip nativo se estiver fechado
    >
      <Icon size={20} className="shrink-0" />{" "}
      <span
        className={cn(
          "transition-all duration-300 overflow-hidden whitespace-nowrap",
          isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block"
        )}
      >
        {label}
      </span>
    </Button>
  </Link>
);

// --- 3. Componente Principal ---
export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-white border-r min-h-screen flex flex-col transition-all duration-300 sticky top-0 h-screen z-20",
        "hidden md:flex",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* HEADER DA SIDEBAR */}
      <div
        className={cn(
          "h-16 border-b flex items-center transition-all duration-300",
          isCollapsed ? "justify-center px-0" : "justify-between px-4"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 min-w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shrink-0">
            A
          </div>
          {/* Texto do Logo */}
          <span
            className={cn(
              "font-bold text-slate-900 whitespace-nowrap transition-all duration-300",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            Area Pro
          </span>
        </div>

        {/* Botão de Toggle (Só aparece se aberto) */}
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsCollapsed(true)}
          >
            <ChevronLeft size={16} />
          </Button>
        )}
      </div>

      {/* Botão de Expandir (Se fechado, aparece centralizado no topo) */}
      {isCollapsed && (
        <div className="w-full flex justify-center py-2 border-b">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsCollapsed(false)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      )}

      {/* NAV LINKS */}
      <nav className="flex-1 p-2 space-y-2 overflow-y-auto overflow-x-hidden">
        <NavItem
          to="/painel"
          icon={LayoutDashboard}
          label="Visão Geral"
          isCollapsed={isCollapsed}
          isActive={location.pathname === "/painel"}
        />
        <NavItem
          to="/painel/editar-perfil"
          icon={User}
          label="Editar Perfil"
          isCollapsed={isCollapsed}
          isActive={location.pathname === "/painel/editar-perfil"}
        />
        <NavItem
          to="/painel/premium"
          icon={Crown}
          label="Planos Premium"
          isCollapsed={isCollapsed}
          isActive={location.pathname === "/painel/premium"}
        />
        <NavItem
          to="/painel/configuracoes"
          icon={Settings}
          label="Configurações"
          isCollapsed={isCollapsed}
          isActive={location.pathname === "/painel/configuracoes"}
        />
      </nav>

      {/* FOOTER (Logout) */}
      <div className="p-2 border-t">
        <Link to="/">
          <Button
            variant="outline"
            className={cn(
              "w-full flex items-center border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700",
              isCollapsed ? "justify-center px-0" : "justify-start gap-2"
            )}
            title="Sair"
          >
            <LogOut size={18} className="shrink-0" />
            <span
              className={cn(
                "transition-all duration-300 overflow-hidden whitespace-nowrap",
                isCollapsed
                  ? "w-0 opacity-0 hidden"
                  : "w-auto opacity-100 block"
              )}
            >
              Sair
            </span>
          </Button>
        </Link>
      </div>
    </aside>
  );
}
