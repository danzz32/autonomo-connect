import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  MessageCircle,
  Star,
  TrendingUp,
  Crown,
  ExternalLink,
} from "lucide-react";
import { DASHBOARD_STATS, ULTIMAS_ATIVIDADES } from "@/mocks/data";
import { Sidebar } from "@/components/dashboard/Sidebar"; // <--- Importando o componente

// Simulando dados do usuário logado
const USER_MOCK = {
  nome: "Carlos Silva",
  email: "carlos.eletrica@email.com",
  profissao: "Eletricista",
  avatar: "https://github.com/shadcn.png",
  isPremium: false,
};

export function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Substituímos todo o bloco <aside> antigo por este componente */}
      <Sidebar />

      {/* CONTEÚDO PRINCIPAL (Mantido igual) */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header da Página */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Olá, {USER_MOCK.nome} 👋
            </h1>
            <p className="text-slate-500">
              Aqui está o resumo do seu desempenho hoje.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {!USER_MOCK.isPremium && (
              <Link to="/painel/premium">
                <Button className="bg-amber-500 hover:bg-amber-600 gap-2 text-white">
                  <Crown size={18} /> Seja Premium
                </Button>
              </Link>
            )}
            <Link to="/painel/editar">
              <Avatar className="cursor-pointer hover:ring-2 ring-primary transition-all">
                <AvatarImage src={USER_MOCK.avatar} />
                <AvatarFallback>CS</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Visualizações do Perfil
              </CardTitle>
              <Eye className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {DASHBOARD_STATS.visualizacoes}
              </div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" /> +12% esse mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Contatos WhatsApp
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {DASHBOARD_STATS.contatosWhatsapp}
              </div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" /> +4 essa semana
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Avaliação Média
              </CardTitle>
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {DASHBOARD_STATS.avaliacaoMedia}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Baseado em 42 reviews
              </p>
            </CardContent>
          </Card>

          <Link to="/painel/premium">
            <Card
              className={`hover:shadow-md transition-shadow cursor-pointer ${
                !USER_MOCK.isPremium ? "border-amber-200 bg-amber-50" : ""
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-700">
                  Seu Plano
                </CardTitle>
                <Crown className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">
                  {DASHBOARD_STATS.plano}
                </div>
                <span className="text-xs text-amber-700 underline mt-1 block">
                  Fazer upgrade agora
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Seção Inferior */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal: Atividades */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Últimas Atividades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ULTIMAS_ATIVIDADES.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start pb-4 border-b last:border-0 last:pb-0"
                    >
                      <div className="w-2 h-2 mt-2 bg-primary rounded-full mr-3 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {item.texto}
                        </p>
                        <p className="text-xs text-slate-500">{item.data}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Card de Dica */}
            <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Complete seu perfil
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Adicione fotos recentes dos seus trabalhos para atrair 2x
                    mais clientes.
                  </p>
                </div>
                <Link to="/painel/editar">
                  <Button variant="secondary" size="sm">
                    Editar Fotos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Lateral: Status do Perfil */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seu Perfil Público</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center text-slate-400 text-sm border border-dashed">
                  [Preview do Card]
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-slate-500">
                    É assim que os clientes veem você nas buscas.
                  </p>
                  <Link to="/perfil/carlos-silva">
                    <Button variant="outline" className="w-full gap-2">
                      <ExternalLink size={16} /> Ver Perfil
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
