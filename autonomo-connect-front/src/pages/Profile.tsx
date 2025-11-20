import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Star,
  ArrowLeft,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { TODOS_PROFISSIONAIS, CATEGORIAS } from "@/mocks/data";

// Dados Mockados de Comentários (Simulando uma tabela 'reviews')
const MOCK_REVIEWS = [
  {
    id: 1,
    user: "Ana Clara",
    date: "Há 2 dias",
    rating: 5,
    text: "Excelente profissional! Chegou no horário e resolveu o problema muito rápido.",
  },
  {
    id: 2,
    user: "Marcos Paulo",
    date: "Há 1 semana",
    rating: 4,
    text: "O serviço ficou ótimo, mas demorou um pouco mais do que o previsto.",
  },
  {
    id: 3,
    user: "Juliana S.",
    date: "Há 3 semanas",
    rating: 5,
    text: "Super recomendo. Muito educada e limpa.",
  },
];

export function Profile() {
  const { slug } = useParams();

  // 1. Buscar o profissional baseado na URL
  const profissional = TODOS_PROFISSIONAIS.find((p) => p.slug === slug);
  const categoria = CATEGORIAS.find((c) => c.slug === profissional?.categoria);

  if (!profissional) {
    return (
      <div className="p-10 text-center">
        Profissional não encontrado.{" "}
        <Link to="/" className="text-primary underline">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HEADER SIMPLES */}
      <header className="bg-white border-b py-4 px-6 sticky top-0 z-20">
        <div className="container mx-auto max-w-6xl flex items-center gap-4">
          <Link to="/busca">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-500">
              <ArrowLeft size={16} /> Voltar
            </Button>
          </Link>
          <h1 className="font-semibold text-slate-700 hidden md:block">
            Perfil Profissional
          </h1>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        {/* COLUNA DA ESQUERDA (CONTEÚDO) */}
        <div className="flex-1 space-y-6">
          {/* Cartão Principal */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-slate-100">
                  <AvatarImage src={profissional.avatar} />
                  <AvatarFallback>{profissional.nome[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                        {profissional.nome}
                      </h1>
                      <div className="flex items-center gap-2 mt-1 text-slate-500">
                        <Badge variant="secondary" className="text-sm px-3">
                          {categoria?.nome}
                        </Badge>
                        <span className="flex items-center text-sm">
                          <MapPin size={14} className="mr-1" /> São Paulo, SP
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Share2 size={18} className="text-slate-400" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                      <Star
                        size={16}
                        className="text-amber-500 fill-amber-500"
                      />
                      <span className="font-bold text-amber-700">
                        {profissional.rating}
                      </span>
                      <span className="text-amber-600/70 text-sm">
                        ({profissional.reviews} avaliações)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                      <ShieldCheck size={16} className="text-green-600" />{" "}
                      Identidade Verificada
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Abas de Detalhes */}
          <Tabs defaultValue="sobre" className="w-full">
            <TabsList className="w-full justify-start bg-white border p-1 h-auto">
              <TabsTrigger value="sobre" className="py-2 px-4">
                Sobre
              </TabsTrigger>
              <TabsTrigger value="avaliacoes" className="py-2 px-4">
                Avaliações
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="py-2 px-4">
                Portfólio
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sobre" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre o Profissional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Olá! Sou {profissional.nome}, especialista em{" "}
                    {categoria?.nome} com mais de 5 anos de experiência no
                    mercado. Prezo pela pontualidade, limpeza e satisfação total
                    dos meus clientes.
                  </p>
                  <p>
                    Possuo ferramentas próprias e disponibilizo garantia de 3
                    meses em todos os serviços realizados. Atendo em toda a
                    região metropolitana.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                      <Clock className="text-primary" size={20} />
                      <span className="text-sm font-medium">
                        Atende finais de semana
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                      <ShieldCheck className="text-primary" size={20} />
                      <span className="text-sm font-medium">
                        Garantia de serviço
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="avaliacoes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    O que dizem os clientes{" "}
                    <span className="text-sm font-normal text-slate-500">
                      ({profissional.reviews})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Resumo das Estrelas */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-slate-900">
                        {profissional.rating}
                      </span>
                      <div className="flex text-amber-400">
                        <Star className="fill-current" size={16} />
                        <Star className="fill-current" size={16} />
                        <Star className="fill-current" size={16} />
                        <Star className="fill-current" size={16} />
                        <Star className="fill-current" size={16} />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="w-3">5</span>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="w-3">4</span>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="w-3">3</span>
                        <Progress value={5} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Lista de Comentários */}
                  <div className="space-y-6">
                    {MOCK_REVIEWS.map((review) => (
                      <div key={review.id} className="flex gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{review.user[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-900">
                              {review.user}
                            </span>
                            <span className="text-xs text-slate-400">
                              • {review.date}
                            </span>
                          </div>
                          <div className="flex text-amber-400 mb-2">
                            {Array.from({ length: review.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className="fill-current"
                                />
                              )
                            )}
                          </div>
                          <p className="text-slate-600 text-sm">
                            {review.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-slate-200 rounded-lg overflow-hidden relative group cursor-pointer"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-1581578731117-104f2a8d46a8?q=80&w=400&random=${i}`}
                      className="object-cover w-full h-full hover:scale-105 transition-transform"
                      alt="Trabalho"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* COLUNA DA DIREITA (SIDEBAR STICKY) */}
        <aside className="lg:w-80 shrink-0">
          <Card className="sticky top-24 shadow-lg border-primary/10">
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-slate-500 text-sm mb-1">Valor estimado</p>
                <div className="text-3xl font-bold text-slate-900">
                  R$ {profissional.precoHora}{" "}
                  <span className="text-sm font-normal text-slate-500">
                    /hora
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 h-12 text-lg">
                  <Phone size={20} /> Chamar no WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-slate-300 h-12"
                >
                  <MessageCircle size={20} /> Enviar Mensagem
                </Button>
              </div>

              <div className="text-xs text-slate-400 text-center pt-2">
                <p>Tempo médio de resposta: 30 min.</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}
