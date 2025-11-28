import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Loader2, KeyRound, Send, CheckCircle } from "lucide-react";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simula delay de API para envio do link de recuperação
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsLoading(false);
    setIsSent(true);
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
            Recupere <br/> o acesso.
          </h1>
          <p className="text-lg text-slate-300 max-w-md">
            Vamos te ajudar a redefinir sua senha para que você possa continuar seus projetos.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
              <KeyRound size={20} />
            </div>
            <div>
              <div className="font-bold">Processo Rápido</div>
              <div className="text-sm text-slate-400">Receba o link em instantes na sua caixa de entrada</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
              <CheckCircle size={20} />
            </div>
            <div>
              <div className="font-bold">Segurança Prioritária</div>
              <div className="text-sm text-slate-400">Seu novo acesso é criptografado e seguro</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário/Confirmação */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12 bg-slate-50 lg:bg-white">
        <div className="w-full max-w-md">
          <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-orange-600" onClick={() => navigate('/Clientlogin')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Login
          </Button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Esqueceu sua senha?</h2>
            <p className="text-slate-500">Informe o e-mail cadastrado e enviaremos um link para redefinição.</p>
          </div>

          {isSent ? (
            <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Link Enviado!</h3>
              <p className="text-slate-700">
                Verifique sua caixa de entrada (e a pasta de Spam) em <span className="font-semibold">{email}</span>. O link de redefinição pode levar alguns minutos para chegar.
              </p>
              <Button onClick={() => navigate('/login')} className="mt-6 w-full bg-green-600 hover:bg-green-700">
                Voltar ao Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">E-mail Cadastrado</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input 
                    type="email" 
                    className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white" 
                    placeholder="seu@email.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg mt-6" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <><Send className="mr-2 h-5 w-5" /> Enviar Link de Recuperação</>}
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-slate-500 mt-8">
            Ainda não tem conta?{" "}
            <Link to="/cadastro-cliente" className="font-bold text-slate-900 hover:underline">
              Crie uma gratuitamente
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}