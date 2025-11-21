import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Caso use shadcn/ui Accordion no projeto
import { useNavigate } from "react-router-dom";

export function Support() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Suporte ao Usuário</h1>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex flex-col gap-10">
        {/* Contato */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Fale Conosco</h2>
          <Card>
            <CardContent>
              <p className="mb-2 text-slate-700">
                Se precisar de ajuda ou quiser enviar uma dúvida, entre em contato pelo e-mail:
              </p>
              <p className="font-mono text-primary mb-6">suporte@autonomoconnect.com.br</p>
              <Button
                onClick={() =>
                  window.open("mailto:suporte@autonomoconnect.com.br", "_blank")
                }
              >
                Enviar E-mail
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Perguntas Frequentes (FAQ)</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>Como contratar um profissional?</AccordionTrigger>
              <AccordionContent>
                Basta usar a barra de busca na página inicial para encontrar profissionais por categoria e localização.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Como funcionam os perfis Premium?</AccordionTrigger>
              <AccordionContent>
                Profissionais Premium aparecem com destaque visual especial e maior prioridade na listagem.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Esqueci minha senha, o que fazer?</AccordionTrigger>
              <AccordionContent>
                Na página de login, utilize a opção 'Esqueci minha senha' para receber um e-mail de recuperação.
              </AccordionContent>
            </AccordionItem>
            {/* Adicione mais perguntas comuns conforme necessário */}
          </Accordion>
        </section>

        {/* Links Úteis */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Links Úteis</h2>
          <div className="flex flex-col gap-4">
            <Button variant="link" onClick={() => navigate("/")}>
              Página Inicial
            </Button>
            <Button variant="link" onClick={() => navigate("/como-funciona")}>
              Como Funciona
            </Button>
            <Button variant="link" onClick={() => navigate("/sou-profissional")}>
              Sou Profissional
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm">
        © 2025 Autonomo Connect. Todos os direitos reservados.
      </footer>
    </div>
  );
}
