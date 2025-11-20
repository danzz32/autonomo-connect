import { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Filter, Search as SearchIcon, Star, MapPin, ArrowLeft, Crown } from "lucide-react";
import { CATEGORIAS, TODOS_PROFISSIONAIS } from "@/mocks/data";

// --- SUB-COMPONENTE DE FILTROS (Mantido fora para performance) ---

interface FiltersListProps {
  selectedCategories: string[];
  onToggleCategory: (slug: string) => void;
}

const FiltersList = ({ selectedCategories, onToggleCategory }: FiltersListProps) => (
  <div className="space-y-6">
    <div>
      <h3 className="font-semibold mb-4 text-slate-900">Categorias</h3>
      <div className="space-y-3">
        {CATEGORIAS.map((cat) => (
          <div key={cat.id} className="flex items-center space-x-2">
            <Checkbox 
              id={cat.slug} 
              checked={selectedCategories.includes(cat.slug)}
              onCheckedChange={() => onToggleCategory(cat.slug)}
            />
            <label 
              htmlFor={cat.slug} 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {cat.nome}
            </label>
          </div>
        ))}
      </div>
    </div>
    
    <Separator />
    
    <div>
      <h3 className="font-semibold mb-4 text-slate-900">Preço por Hora</h3>
      <div className="text-sm text-slate-500">
          Em breve filtro de preço.
      </div>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL DA PÁGINA ---

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Estados de Controle
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. Inicialização: Lê a URL apenas na montagem
  useEffect(() => {
    const categoryParam = searchParams.get("categoria");
    if (categoryParam && selectedCategories.length === 0) {
      setSelectedCategories([categoryParam]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); 

  // 2. Lógica de Filtragem e Ordenação (Premium primeiro)
  const filteredPros = useMemo(() => {
    // A. Filtrar
    const filtered = TODOS_PROFISSIONAIS.filter((prof) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(prof.categoria);
      const matchesSearch = prof.nome.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // B. Ordenar (Premium no topo)
    return filtered.sort((a, b) => {
      // Se A é Premium e B não, A vem primeiro (-1)
      if (a.isPremium && !b.isPremium) return -1;
      // Se B é Premium e A não, B vem primeiro (1)
      if (!a.isPremium && b.isPremium) return 1;
      // Desempate por Rating
      return b.rating - a.rating;
    });
  }, [selectedCategories, searchTerm]);

  // Função auxiliar para checkbox
  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev => 
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full">
      {/* HEADER */}
      <header className="bg-white border-b py-4 sticky top-0 z-30 px-6 flex items-center gap-4">
        <Link to="/">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
        </Link>
        <div className="relative flex-1 max-w-lg">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
                placeholder="Busque por nome..." 
                className="pl-10 bg-slate-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        
        {/* BOTÃO DE FILTRO MOBILE */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden gap-2">
              <Filter size={16} /> Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="py-6">
              <h2 className="text-lg font-bold mb-6">Filtros</h2>
              <FiltersList 
                selectedCategories={selectedCategories} 
                onToggleCategory={toggleCategory} 
              />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div className="flex flex-1 container mx-auto max-w-7xl p-4 md:p-8 gap-8">
        
        {/* SIDEBAR (DESKTOP) */}
        <aside className="hidden md:block w-64 shrink-0">
          <Card className="sticky top-24 border-none shadow-none bg-transparent">
             <FiltersList 
                selectedCategories={selectedCategories} 
                onToggleCategory={toggleCategory} 
            />
          </Card>
        </aside>

        {/* LISTA DE RESULTADOS */}
        <main className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-xl font-bold text-slate-900">
              {filteredPros.length} profissionais encontrados
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredPros.map((prof) => (
              <Card 
                key={prof.id} 
                onClick={() => navigate(`/perfil/${prof.slug}`)}
                // Estilização Condicional para Premium (Borda Dourada)
                className={`flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-all cursor-pointer ${
                  prof.isPremium ? 'border-amber-400 border-2 shadow-amber-100' : 'hover:border-slate-300'
                }`}
              >
                {/* Coluna da Imagem */}
                <div className="w-full sm:w-48 h-32 sm:h-auto bg-slate-200 relative">
                    <img src={prof.avatar} className="object-cover w-full h-full" alt={prof.nome} />
                    
                    {/* Badge de Preço */}
                    <Badge className="absolute top-2 left-2 bg-white text-slate-900 hover:bg-white shadow-sm">
                        R$ {prof.precoHora}/h
                    </Badge>

                    {/* Badge Visual "Destaque" (Só se for Premium) */}
                    {prof.isPremium && (
                      <Badge className="absolute bottom-2 right-2 bg-amber-500 hover:bg-amber-600 text-white gap-1 shadow-sm border-white border">
                        <Crown size={12} className="fill-current" /> Destaque
                      </Badge>
                    )}
                </div>
                
                {/* Coluna de Conteúdo */}
                <CardContent className="flex-1 p-6 flex flex-col justify-between relative">
                  
                  {/* Marca d'água sutil de Coroa no fundo do card (Opcional) */}
                  {prof.isPremium && (
                    <div className="absolute top-2 right-2 opacity-10 rotate-12 pointer-events-none">
                        <Crown size={40} />
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="flex items-center gap-2">
                              <h3 className={`font-bold text-lg ${prof.isPremium ? 'text-amber-700' : 'text-slate-900'}`}>
                                {prof.nome}
                              </h3>
                              {/* Ícone pequeno ao lado do nome */}
                              {prof.isPremium && <Crown size={14} className="text-amber-500 fill-amber-500" />}
                            </div>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {CATEGORIAS.find(c => c.slug === prof.categoria)?.nome}
                            </Badge>
                        </div>
                        <div className="flex items-center text-amber-500 font-bold text-sm bg-amber-50 px-2 py-1 rounded">
                            <Star size={14} className="fill-current mr-1" /> {prof.rating}
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm line-clamp-2 mt-2">
                        {prof.isPremium 
                          ? "Profissional verificado com alta taxa de resposta e avaliações excelentes." 
                          : "Especialista em serviços residenciais com experiência na região."}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="flex items-center text-slate-400">
                        <MapPin size={14} className="mr-1" /> 2.5km
                    </span>
                    <Button size="sm" variant={prof.isPremium ? "default" : "outline"}>
                      Ver Agenda
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Estado Vazio */}
            {filteredPros.length === 0 && (
                <div className="col-span-full text-center py-20 text-slate-400">
                    <p>Nenhum profissional encontrado com esses filtros.</p>
                    <Button variant="link" onClick={() => {setSelectedCategories([]); setSearchTerm("")}}>
                      Limpar filtros
                    </Button>
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}