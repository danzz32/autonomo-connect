import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Shield, Star, ArrowRight, Search, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ClientLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Navbar Simplificada */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md shadow-orange-500/20">
              <span className="text-white font-bold">O</span>
            </div>
            <span className="text-lg font-bold text-slate-900">ObraFácil</span>
          </div>
          <div className="flex gap-4">
             <Button variant="ghost" onClick={() => navigate('/login')}>Entrar</Button>
             <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={() => navigate('/cadastro-cliente')}>
                Criar Conta Grátis
             </Button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size[24px_24px]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              
              {/* Texto Hero */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1 text-center lg:text-left"
              >
                <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm bg-orange-50 text-orange-700 border-orange-200 rounded-full">
                  🚀 Para quem precisa de soluções
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                  Encontre o profissional ideal para <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-500">qualquer serviço.</span>
                </h1>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                  Do reparo rápido à reforma completa. Conectamos você a especialistas verificados, com pagamento seguro e garantia de satisfação.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="h-14 px-8 text-lg bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/20" onClick={() => navigate('/cadastro-cliente')}>
                    Quero Contratar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-300 text-slate-700 hover:bg-slate-50">
                    Ver Profissionais
                  </Button>
                </div>
                
                <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
                   <div className="flex items-center gap-2"><Shield size={16} className="text-green-500"/> Garantia de Serviço</div>
                   <div className="flex items-center gap-2"><Star size={16} className="text-amber-500"/> Profissionais 4.8/5</div>
                </div>
              </motion.div>

              {/* Imagem/Visual Hero */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 relative"
              >
                <div className="relative z-10 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-md mx-auto">
                   {/* Mock de Card de Serviço */}
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Search size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">O que você precisa?</h3>
                        <p className="text-slate-500 text-sm">Encanador, Pintor, Eletricista...</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-orange-200">
                           <Avatar className="h-10 w-10 mr-3">
                             <AvatarImage src={`https://i.pravatar.cc/150?u=${i+10}`} />
                             <AvatarFallback>P</AvatarFallback>
                           </Avatar>
                           <div className="flex-1">
                              <div className="font-semibold text-slate-900 text-sm">Profissional Verificado</div>
                              <div className="text-xs text-slate-500">Disponível hoje</div>
                           </div>
                           <div className="text-orange-600 font-bold text-sm">R$ 120</div>
                        </div>
                      ))}
                   </div>
                   <Button className="w-full mt-6 bg-slate-900 text-white">Buscar Agora</Button>
                </div>
                
                {/* Elementos Decorativos */}
                <div className="absolute top-10 -right-10 w-24 h-24 bg-orange-500 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-20 bg-white">
           <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-16">
                 <h2 className="text-3xl font-bold text-slate-900 mb-4">Por que contratar pela ObraFácil?</h2>
                 <p className="text-slate-500">Removemos a incerteza de contratar serviços. Segurança, qualidade e suporte do início ao fim.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { icon: Shield, title: "Pagamento Seguro", desc: "O valor só é liberado para o profissional após você confirmar que o serviço foi realizado.", color: "text-blue-600", bg: "bg-blue-50" },
                   { icon: CheckCircle2, title: "Profissionais Verificados", desc: "Checamos antecedentes, referências e documentos de todos os parceiros da plataforma.", color: "text-green-600", bg: "bg-green-50" },
                   { icon: Zap, title: "Rápido e Fácil", desc: "Receba orçamentos em minutos e agende o serviço para o horário que preferir.", color: "text-amber-600", bg: "bg-amber-50" }
                 ].map((item, idx) => (
                   <Card key={idx} className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow">
                      <CardContent className="p-8 flex flex-col items-center text-center">
                         <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                            <item.icon size={32} />
                         </div>
                         <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                         <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                      </CardContent>
                   </Card>
                 ))}
              </div>
           </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-slate-50">
           <div className="container mx-auto px-4">
              <div className="bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                 <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pronto para resolver aquele problema?</h2>
                    <p className="text-slate-400 mb-8 text-lg">Crie sua conta gratuita em menos de 2 minutos e tenha acesso aos melhores profissionais da sua região.</p>
                    <Button size="lg" className="h-14 px-10 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-lg shadow-orange-500/25" onClick={() => navigate('/cadastro-cliente')}>
                       Criar Minha Conta
                    </Button>
                    <p className="mt-4 text-xs text-slate-500">Não é necessário cartão de crédito para se cadastrar.</p>
                 </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}