import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Star, MapPin } from "lucide-react";
import { CATEGORIAS, PROFISSIONAIS_DESTAQUE } from "@/mocks/data";
import { Link, useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* HEADER (Simplificado) */}
      <header className="bg-white border-b py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              ObraFácil
            </h1>
          </div>
          <div className="hidden md:flex gap-4">
            <Link to="/como-funciona">
              <Button variant="ghost">Como funciona</Button>
            </Link>
            <Link to="/sou-profissional">
              <Button variant="outline">Sou Profissional</Button>
            </Link>
            <Button>Entrar</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="bg-white py-20 border-b">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <Badge variant="secondary" className="mb-4 px-4 py-1">
              Simples. Rápido. Seguro.
            </Badge>
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Contrate serviços locais <br />{" "}
              <span className="text-primary">sem complicação.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              De pequenos reparos a grandes reformas. Encontre os melhores
              profissionais da sua região avaliados pela comunidade.
            </p>

            {/* BARRA DE BUSCA */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto p-2 bg-slate-100 rounded-xl border shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="O que você precisa? (ex: Pintor)"
                  className="pl-10 h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button size="lg" className="h-12 px-8 font-semibold">
                Buscar
              </Button>
            </div>
          </div>
        </section>

        {/* CATEGORIAS */}
        <section className="py-16 container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-slate-800">
            Explore por Categoria
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIAS.map((cat) => (
              <Card
                key={cat.id}
                onClick={() => navigate(`/busca?categoria=${cat.slug}`)}
                className="hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 border-slate-200 w-full"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                  <div className={`p-4 rounded-full bg-slate-50 ${cat.color}`}>
                    <cat.icon size={32} />
                  </div>
                  <span className="font-medium text-slate-700">{cat.nome}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* DESTAQUES */}
        <section className="py-16 bg-slate-100">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Profissionais em Alta
                </h3>
                <p className="text-slate-600">
                  Os prestadores de serviço mais bem avaliados da semana.
                </p>
              </div>
              <Button variant="link" className="hidden md:block">
                Ver todos
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROFISSIONAIS_DESTAQUE.map((prof) => (
                <Card
                  key={prof.id}
                  onClick={() => navigate(`/perfil/${prof.slug}`)} // <--- Adicione ou use Link
                  className="cursor-pointer ..."
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={prof.avatar} />
                          <AvatarFallback>{prof.nome[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-slate-900">
                            {prof.nome}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {prof.profissao}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-yellow-700 text-sm font-bold">
                        <Star
                          size={14}
                          className="fill-yellow-500 text-yellow-500 mr-1"
                        />
                        {prof.rating}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 mb-4">
                      <MapPin size={14} className="mr-1" /> São Paulo, SP
                    </div>
                    <Button className="w-full" variant="outline">
                      Ver Perfil
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        © 2025 Autônomo Connect. Feito com React e Shadcn.
      </footer>
    </div>
  );
}
