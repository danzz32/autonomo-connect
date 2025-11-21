import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Search,
  MessageCircle,
  CheckCircle2,
  Briefcase,
  UserPlus,
  TrendingUp,
  HeartHandshake,
} from "lucide-react";

export function HowItWorks() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER SIMPLES */}
      <header className="bg-white border-b py-4 sticky top-0 z-30">
        <div className="container mx-auto px-6 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-500">
              <ArrowLeft size={16} /> Voltar para Home
            </Button>
          </Link>
          <h1 className="font-bold text-slate-900">Como Funciona</h1>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="bg-white py-20 border-b">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-full mb-6">
              <HeartHandshake size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Conectando quem precisa <br /> com quem sabe fazer.
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              O ObraFácil é a ponte segura entre clientes exigentes e
              profissionais qualificados. Sem intermediários na negociação, sem
              taxas escondidas.
            </p>
          </div>
        </section>

        {/* JORNADA DO CLIENTE */}
        <section className="py-16 container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              Para Clientes
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Como contratar um serviço?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Linha conectora (Desktop apenas) */}
            <div className="hidden md:block absolute top-12 left-16 right-16 h-0.5 bg-slate-200 -z-10"></div>

            {/* Passo 1 */}
            <div className="flex flex-col items-center text-center bg-slate-50 p-4">
              <div className="w-16 h-16 bg-white border-2 border-primary text-primary rounded-full flex items-center justify-center mb-6 shadow-sm z-10">
                <Search size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Busque</h3>
              <p className="text-slate-500">
                Navegue pelas categorias ou pesquise pelo nome do serviço. Use
                filtros para encontrar especialistas na sua região.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="flex flex-col items-center text-center bg-slate-50 p-4">
              <div className="w-16 h-16 bg-white border-2 border-primary text-primary rounded-full flex items-center justify-center mb-6 shadow-sm z-10">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Escolha</h3>
              <p className="text-slate-500">
                Compare perfis, veja fotos de trabalhos anteriores e leia
                avaliações reais de outros clientes para decidir com segurança.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="flex flex-col items-center text-center bg-slate-50 p-4">
              <div className="w-16 h-16 bg-white border-2 border-primary text-primary rounded-full flex items-center justify-center mb-6 shadow-sm z-10">
                <MessageCircle size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Contrate</h3>
              <p className="text-slate-500">
                Entre em contato direto via WhatsApp ou E-mail. Combine valores
                e prazos diretamente com o profissional.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/busca">
              <Button size="lg">Buscar Profissional Agora</Button>
            </Link>
          </div>
        </section>

        {/* DIVISOR */}
        <div className="bg-slate-900 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Você é um profissional autônomo?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de trabalhadores que estão crescendo seus
              negócios através da nossa plataforma.
            </p>
            <Link to="/sou-profissional">
              <Button variant="secondary" size="lg" className="font-bold">
                Criar Perfil Profissional
              </Button>
            </Link>
          </div>
        </div>

        {/* JORNADA DO PROFISSIONAL */}
        <section className="py-16 container mx-auto px-6 ">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">
              Para Trabalhadores
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Impulsione sua carreira
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-slate-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-lg mb-4">
                  <UserPlus size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Cadastro Gratuito</h3>
                <p className="text-sm text-slate-500">
                  Crie sua conta em minutos. Preencha seus dados, categorias de
                  serviço e contatos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-lg mb-4">
                  <Briefcase size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Mostre seu Talento</h3>
                <p className="text-sm text-slate-500">
                  Adicione fotos do seu portfólio e descreva suas habilidades
                  para atrair mais clientes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-lg mb-4">
                  <TrendingUp size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Seja Premium</h3>
                <p className="text-sm text-slate-500">
                  Destaque-se da concorrência aparecendo no topo das buscas e
                  ganhe selo de verificação.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Perguntas Frequentes
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>O ObraFácil cobra comissão?</AccordionTrigger>
              <AccordionContent>
                Não! Nós somos uma plataforma de conexão. O cliente negocia e
                paga diretamente ao profissional. Nós não intermediamos
                pagamentos e não cobramos taxa sobre o serviço.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Como sei se o profissional é confiável?
              </AccordionTrigger>
              <AccordionContent>
                Recomendamos sempre olhar as avaliações e comentários de outros
                clientes no perfil do profissional. Além disso, profissionais
                com selo "Premium" ou "Verificado" passaram por uma verificação
                básica de identidade.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Quanto custa para ser Premium?
              </AccordionTrigger>
              <AccordionContent>
                O cadastro básico é 100% gratuito. Oferecemos planos Premium a
                partir de R$ 29,90 mensais para quem deseja aparecer no topo das
                buscas e ter destaque visual na plataforma.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Posso cancelar minha conta a qualquer momento?
              </AccordionTrigger>
              <AccordionContent>
                Sim, tanto clientes quanto profissionais podem desativar suas
                contas a qualquer momento através das configurações de perfil,
                sem multas ou burocracia.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      {/* FOOTER IGUAL DA HOME */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        © 2025 Autônomo Connect. Feito com React e Shadcn.
      </footer>
    </div>
  );
}
