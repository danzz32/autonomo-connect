import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, Search, MoveLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      {/* Ícone e Título */}
      <div className="bg-white p-4 rounded-full shadow-sm mb-6">
        <FileQuestion size={64} className="text-primary" />
      </div>

      <h1 className="text-7xl font-extrabold text-slate-900 tracking-tighter mb-2">
        404
      </h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-4">
        Ops! Página não encontrada.
      </h2>

      <p className="text-slate-500 max-w-md mb-8 text-lg">
        Parece que a página que você está procurando não existe, foi movida ou o
        link está quebrado.
      </p>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
        <Link to="/">
          <Button size="lg" className="w-full gap-2">
            <Home size={18} /> Voltar para o Início
          </Button>
        </Link>

        <Link to="/busca">
          <Button variant="outline" size="lg" className="w-full gap-2">
            <Search size={18} /> Buscar Profissional
          </Button>
        </Link>
      </div>

      {/* Link de Voltar Histórico */}
      <div className="mt-12">
        <Button
          variant="link"
          className="text-slate-400 gap-2"
          onClick={() => window.history.back()}
        >
          <MoveLeft size={16} /> Voltar para a página anterior
        </Button>
      </div>
    </div>
  );
}
