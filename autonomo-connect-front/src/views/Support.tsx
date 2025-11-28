import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input"; // Assumindo que você tem um componente Input Shadcn/ui
import { useNavigate } from "react-router-dom";
import React, { useState, useMemo } from "react";
import { Search, Mail, ArrowLeft, HelpCircle, User, Wrench, ShieldCheck, CreditCard } from "lucide-react";

// --- Tipagem e Dados Mockados ---
interface FAQItem {
  id: string;
  category: "Geral" | "Cliente" | "Profissional" | "Pagamento";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  { id: "q1", category: "Geral", question: "Como funciona a plataforma Autonomo Connect?", answer: "Conectamos clientes que precisam de serviços (reparos, reformas, etc.) com profissionais qualificados e verificados na sua região. Você busca, encontra o perfil, solicita um orçamento e negocia diretamente." },
  { id: "q2", category: "Cliente", question: "Como faço para solicitar um orçamento?", answer: "Na página do profissional, clique no botão 'Solicitar Orçamento'. Preencha os detalhes do serviço e sua preferência de contato. O profissional responderá o mais breve possível." },
  { id: "q3", category: "Profissional", question: "Quais são os custos para ser um profissional Premium?", answer: "Oferecemos planos de assinatura mensais ou anuais que garantem maior visibilidade nos resultados de busca e um selo de verificação de destaque. Consulte a seção 'Sou Profissional' para ver os planos." },
  { id: "q4", category: "Pagamento", question: "Como o pagamento é processado e quais são as taxas?", answer: "O pagamento é negociado diretamente entre cliente e profissional. Nossa plataforma sugere métodos seguros (transferência ou link de pagamento). Não cobramos taxa de intermediação do cliente, apenas do profissional Premium." },
  { id: "q5", category: "Cliente", question: "O que é a 'Garantia ObraFácil'?", answer: "A Garantia ObraFácil (ou Autonomo Connect) oferece proteção financeira limitada contra danos materiais inesperados causados pelo profissional durante a execução do serviço, garantindo maior tranquilidade." },
  { id: "q6", category: "Profissional", question: "Posso gerenciar meu perfil pelo celular?", answer: "Sim, nosso Painel do Profissional é totalmente responsivo, permitindo que você atualize seu portfólio, responda a orçamentos e gerencie sua agenda de qualquer dispositivo móvel." },
  { id: "q7", category: "Geral", question: "Como a plataforma verifica a identidade dos profissionais?", answer: "Exigimos documentos, comprovante de residência, antecedentes criminais e realizamos uma checagem de referências. Profissionais verificados recebem um selo especial de confiança." },
];

const CATEGORY_ICONS: { [key in FAQItem['category']]: React.ElementType } = {
  Geral: HelpCircle,
  Cliente: User,
  Profissional: Wrench,
  Pagamento: CreditCard,
};

export function Support() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<FAQItem['category'] | 'Todos'>('Todos');
  const [searchText, setSearchText] = useState('');

  // Lógica de Filtragem e Busca
  const filteredFaqs = useMemo(() => {
    let results = FAQ_DATA;

    // 1. Filtrar por Categoria
    if (activeCategory !== 'Todos') {
      results = results.filter(faq => faq.category === activeCategory);
    }

    // 2. Filtrar por Texto de Busca
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      results = results.filter(faq =>
        faq.question.toLowerCase().includes(searchLower) ||
        faq.answer.toLowerCase().includes(searchLower)
      );
    }
    
    // Agrupar por categoria para exibição
    const grouped = results.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {} as Record<FAQItem['category'], FAQItem[]>);

    return grouped;

  }, [activeCategory, searchText]);
  
  const categories = ['Todos', ...Array.from(new Set(FAQ_DATA.map(f => f.category)))];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Fixo */}
      <header className="bg-white border-b py-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-orange-600" /> Central de Ajuda
          </h1>
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-slate-600 hover:bg-slate-100">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex flex-col gap-12 flex-grow">
        
        {/* Hero e Busca */}
        <section className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Como podemos te ajudar?</h2>
          <p className="text-slate-600 mb-6">Busque por palavras-chave ou navegue pelas categorias.</p>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Ex: Como funciona a verificação? Pagamento..." 
              className="pl-12 h-14 text-base focus:ring-2 focus:ring-orange-500/50" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </section>

        {/* FAQ Filtrável e Categorizado */}
        <section>
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                className={activeCategory === cat ? "bg-orange-600 hover:bg-orange-700" : "hover:bg-slate-100"}
                onClick={() => setActiveCategory(cat as FAQItem['category'] | 'Todos')}
                size="sm"
              >
                {cat}
              </Button>
            ))}
          </div>
          
          <div className="space-y-6">
            {Object.keys(filteredFaqs).length === 0 ? (
                <Card className="p-8 text-center text-slate-500">
                    Nenhuma pergunta encontrada para sua busca ou categoria. Tente outra palavra-chave.
                </Card>
            ) : (
                Object.keys(filteredFaqs).map(categoryKey => {
                    const group = filteredFaqs[categoryKey as FAQItem['category']];
                    const Icon = CATEGORY_ICONS[categoryKey as FAQItem['category']];

                    return (
                        <Card key={categoryKey} className="shadow-md border-0">
                            <div className="flex items-center gap-3 p-4 bg-slate-50 border-b border-slate-100 rounded-t-lg">
                                <Icon className="w-5 h-5 text-orange-600" />
                                <h3 className="text-lg font-bold text-slate-900">{categoryKey} ({group.length})</h3>
                            </div>
                            <Accordion type="single" collapsible className="w-full">
                                {group.map(item => (
                                    <AccordionItem key={item.id} value={item.id} className="px-4">
                                        <AccordionTrigger className="text-left font-medium hover:no-underline text-slate-800">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-slate-600 pb-4 pr-6">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </Card>
                    );
                })
            )}
          </div>
        </section>

        {/* Contato Direto */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Ainda precisa de ajuda?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-orange-600 shadow-md">
              <CardContent className="p-6 flex flex-col items-start">
                <Mail className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="text-xl font-bold mb-2">Suporte por E-mail</h3>
                <p className="text-slate-600 mb-4">Envie sua dúvida detalhada. Respondemos em até 24h úteis.</p>
                <Button
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => window.open("mailto:suporte@autonomoconnect.com.br", "_blank")}
                >
                  Enviar E-mail Agora
                </Button>
                <p className="font-mono text-sm text-slate-400 mt-2">suporte@autonomoconnect.com.br</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-slate-600 shadow-md">
              <CardContent className="p-6 flex flex-col items-start">
                <ShieldCheck className="w-8 h-8 text-slate-600 mb-3" />
                <h3 className="text-xl font-bold mb-2">Garantia e Segurança</h3>
                <p className="text-slate-600 mb-4">Dúvidas sobre o Selo de Verificação ou a nossa Proteção de Serviço?</p>
                <Button
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                  onClick={() => navigate("/como-funciona")}
                >
                  Ver Termos de Segurança
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Links Rápidos - Mantido simples, mas com estilo */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Navegação Rápida</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="ghost" className="justify-start hover:bg-orange-50 text-slate-700" onClick={() => navigate("/")}>Página Inicial</Button>
            <Button variant="ghost" className="justify-start hover:bg-orange-50 text-slate-700" onClick={() => navigate("/como-funciona")}>Como Funciona</Button>
            <Button variant="ghost" className="justify-start hover:bg-orange-50 text-slate-700" onClick={() => navigate("/sou-profissional")}>Sou Profissional</Button>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
        © 2025 Autonomo Connect. Todos os direitos reservados.
      </footer>
    </div>
  );
}