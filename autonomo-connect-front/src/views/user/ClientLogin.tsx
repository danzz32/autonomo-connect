import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Lock, Check, Loader2, Zap } from "lucide-react";

export function ClientLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simula delay de API para autenticação
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    // Redireciona para o dashboard ou página inicial
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Lado Esquerdo - Visual (Desktop) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-orange-600/20 to-purple-900/40 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731117-104f2a869c4e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 z-0 mix-blend-overlay"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold">O</div>
            <span className="text-xl font-bold">ObraFácil</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Bem-vindo(a) <br/> de volta.
          </h1>
          <p className="text-lg text-slate-300 max-w-md">
            Acesse seu painel para gerenciar seus orçamentos e continuar seus projetos.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
            <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400">
              <Zap size={20} />
            </div>
            <div>
              <div className="font-bold">Projetos em Andamento</div>
              <div className="text-sm text-slate-400">Retome a negociação com profissionais onde parou</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
              <Check size={20} />
            </div>
            <div>
              <div className="font-bold">Segurança Garantida</div>
              <div className="text-sm text-slate-400">Seus dados e histórico de conversas protegidos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12 bg-slate-50 lg:bg-white">
        <div className="w-full max-w-md">
          <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-orange-600" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Site
          </Button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Acesse sua conta</h2>
            <p className="text-slate-500">Insira seu e-mail e senha para continuar.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input type="email" className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white" placeholder="seu@email.com" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input type="password" className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white" placeholder="Sua senha" required />
              </div>
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700 hover:underline font-medium">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg mt-6" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-50 lg:bg-white px-2 text-slate-500">Ou use sua rede social</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button variant="outline" className="w-full h-11 border-slate-200 hover:bg-slate-50">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-2" alt="Google" />
                Google
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            Não tem uma conta?{" "}
            <Link to="/cadastro-cliente" className="font-bold text-slate-900 hover:underline">
              Crie uma gratuitamente
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}