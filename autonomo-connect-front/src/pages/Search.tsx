import { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link, useNavigate, type NavigateFunction } from "react-router-dom";
import { 
  Search as SearchIcon, Star, MapPin, ArrowLeft, 
  Crown, CheckCircle2, ChevronDown, Heart, SlidersHorizontal
} from "lucide-react";

// UI Components (Simulando importações do shadcn/ui para este arquivo único)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Componente Skeleton Inline (Resolve o erro de importação ausente)
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={`animate-pulse rounded-md bg-slate-200 ${className}`} 
      {...props} 
    />
  );
}

// --- MOCK DATA & TYPES ---

// Definindo a interface para o Profissional
interface Professional {
  id: number;
  slug: string;
  nome: string;
  categoria: string;
  isPremium: boolean;
  rating: number;
  precoHora: number;
  avatar: string;
  descricao: string;
  reviews: number;
}

interface Category {
  id: number;
  slug: string;
  nome: string;
  count: number;
}

const CATEGORIAS: Category[] = [
  { id: 1, slug: "encanador", nome: "Encanador", count: 12 },
  { id: 2, slug: "eletricista", nome: "Eletricista", count: 8 },
  { id: 3, slug: "pintor", nome: "Pintor", count: 5 },
  { id: 4, slug: "marceneiro", nome: "Marceneiro", count: 3 },
  { id: 5, slug: "pedreiro", nome: "Pedreiro", count: 15 },
];

const TODOS_PROFISSIONAIS: Professional[] = [
  {
    id: 1,
    slug: "joao-silva",
    nome: "João Silva",
    categoria: "encanador",
    isPremium: true,
    rating: 4.9,
    precoHora: 120,
    avatar: "https://i.pravatar.cc/150?u=1",
    descricao: "Especialista em vazamentos ocultos e reparos hidráulicos residenciais com 15 anos de experiência.",
    reviews: 42
  },
  {
    id: 2,
    slug: "maria-oliveira",
    nome: "Maria Oliveira",
    categoria: "eletricista",
    isPremium: true,
    rating: 5.0,
    precoHora: 150,
    avatar: "https://i.pravatar.cc/150?u=5",
    descricao: "Instalações elétricas seguras e modernas. Projetos de iluminação e reparos de emergência 24h.",
    reviews: 89
  },
  {
    id: 3,
    slug: "carlos-souza",
    nome: "Carlos Souza",
    categoria: "pintor",
    isPremium: false,
    rating: 4.7,
    precoHora: 80,
    avatar: "https://i.pravatar.cc/150?u=3",
    descricao: "Pintura residencial e comercial, texturas e acabamentos finos. Limpeza e organização garantidas.",
    reviews: 15
  },
  {
    id: 4,
    slug: "ana-pereira",
    nome: "Ana Pereira",
    categoria: "marceneiro",
    isPremium: false,
    rating: 4.8,
    precoHora: 110,
    avatar: "https://i.pravatar.cc/150?u=9",
    descricao: "Restauração de móveis antigos e fabricação de móveis planejados sob medida.",
    reviews: 23
  },
  {
    id: 5,
    slug: "roberto-costa",
    nome: "Roberto Costa",
    categoria: "pedreiro",
    isPremium: true,
    rating: 4.6,
    precoHora: 100,
    avatar: "https://i.pravatar.cc/150?u=12",
    descricao: "Reforma completa, assentamento de pisos e revestimentos. Equipe própria e pontualidade.",
    reviews: 56
  },
    {
    id: 6,
    slug: "pedro-alves",
    nome: "Pedro Alves",
    categoria: "encanador",
    isPremium: false,
    rating: 4.5,
    precoHora: 90,
    avatar: "https://i.pravatar.cc/150?u=8",
    descricao: "Serviços rápidos de desentupimento e trocas de torneiras. Atendimento na zona sul.",
    reviews: 12
  },
];

// --- SUB-COMPONENTES ---

// 1. Componente de Filtros (Desktop & Mobile)
interface FiltersContentProps {
  selectedCategories: string[];
  onToggleCategory: (slug: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}

const FiltersContent = ({ selectedCategories, onToggleCategory }: FiltersContentProps) => {
  return (
    <div className="space-y-1">
      <div className="pb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Filtrar Resultados</h3>
      </div>
      
      <Accordion type="multiple" defaultValue={["categorias", "preco"]} className="w-full">
        <AccordionItem value="categorias" className="border-none">
          <AccordionTrigger className="hover:no-underline py-2">
            <span className="font-semibold text-slate-900">Categorias</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {CATEGORIAS.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-3 group">
                  <Checkbox 
                    id={cat.slug} 
                    checked={selectedCategories.includes(cat.slug)}
                    onCheckedChange={() => onToggleCategory(cat.slug)}
                    className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  />
                  <label 
                    htmlFor={cat.slug} 
                    className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors cursor-pointer font-medium flex-1"
                  >
                    {cat.nome}
                  </label>
                  <span className="text-xs text-slate-400">
                     ({cat.count})
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="preco" className="border-none mt-4">
          <AccordionTrigger className="hover:no-underline py-2">
            <span className="font-semibold text-slate-900">Preço / Hora</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-1">
               {/* Simulando um Slider Visual */}
               <div className="h-2 bg-slate-200 rounded-full relative mb-4">
                 <div className="absolute left-0 w-1/2 h-full bg-indigo-600 rounded-full"></div>
                 <div className="absolute left-1/2 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full -top-1 shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
               </div>
               <div className="flex justify-between text-xs text-slate-500 font-medium">
                 <span>R$ 50</span>
                 <span>R$ 500+</span>
               </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="disponibilidade" className="border-none mt-4">
          <AccordionTrigger className="hover:no-underline py-2">
            <span className="font-semibold text-slate-900">Disponibilidade</span>
          </AccordionTrigger>
          <AccordionContent>
             <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3">
                  <Checkbox id="hoje" />
                  <label htmlFor="hoje" className="text-sm text-slate-600 font-medium">Atende Hoje</label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="fds" />
                  <label htmlFor="fds" className="text-sm text-slate-600 font-medium">Finais de Semana</label>
                </div>
             </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// 2. Card do Profissional (Refinado)
interface ProfessionalCardProps {
  prof: Professional;
  navigate: NavigateFunction;
}

const ProfessionalCard = ({ prof, navigate }: ProfessionalCardProps) => {
  const isPremium = prof.isPremium;

  return (
    <Card 
      onClick={() => navigate(`/perfil/${prof.slug}`)}
      className={`group relative flex flex-col sm:flex-row overflow-hidden border transition-all duration-300 cursor-pointer
        ${isPremium 
          ? 'border-amber-200/60 bg-linear-to-br from-white via-amber-50/30 to-white hover:shadow-[0_8px_30px_rgb(251,191,36,0.15)]' 
          : 'border-slate-100 bg-white hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5'
        }
      `}
    >
      {/* Tag Premium Flutuante (Canto Superior) */}
      {isPremium && (
        <div className="absolute top-0 right-0">
           <div className="bg-linear-to-bl from-amber-400 to-orange-400 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-sm flex items-center gap-1">
             <Crown size={10} className="fill-current" /> DESTAQUE
           </div>
        </div>
      )}

      {/* Seção da Imagem/Avatar */}
      <div className="p-5 flex flex-col items-center sm:items-start justify-center sm:w-48 shrink-0 relative border-b sm:border-b-0 sm:border-r border-slate-50/50">
        <div className="relative">
          <Avatar className={`w-24 h-24 sm:w-28 sm:h-28 border-4 ${isPremium ? 'border-amber-100' : 'border-slate-50'} shadow-sm`}>
            <AvatarImage src={prof.avatar} className="object-cover" />
            <AvatarFallback>{prof.nome[0]}</AvatarFallback>
          </Avatar>
          {/* Status Indicator */}
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" title="Online Agora"></span>
        </div>
        
        <div className="mt-3 text-center w-full">
           <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">A partir de</p>
           <p className="text-lg font-bold text-slate-900">R$ {prof.precoHora}<span className="text-xs font-normal text-slate-500">/h</span></p>
        </div>
      </div>

      {/* Seção de Conteúdo */}
      <CardContent className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-xl text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {prof.nome}
                </h3>
                {isPremium && <CheckCircle2 size={16} className="text-blue-500 fill-blue-50" />}
              </div>
              <p className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                 {CATEGORIAS.find(c => c.slug === prof.categoria)?.nome} 
                 <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                 <span className="flex items-center text-slate-400 font-normal"><MapPin size={12} className="mr-1" /> 4.2 km</span>
              </p>
            </div>
            
            {/* Rating Box */}
            <div className="flex flex-col items-end">
               <div className="flex items-center bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                  <Star size={14} className="fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-bold text-slate-700 text-sm">{prof.rating}</span>
                  <span className="text-xs text-slate-400 ml-1">({prof.reviews})</span>
               </div>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mt-2">
            {prof.descricao || "Profissional dedicado com vasta experiência na área, focado em entregar resultados de alta qualidade e satisfação garantida para seus clientes."}
          </p>

          {/* Tags de Especialidade (Simuladas) */}
          <div className="flex gap-2 mt-4 flex-wrap">
             {["Rápido", "Certificado", "Garantia"].map(tag => (
                <Badge key={tag} variant="secondary" className="bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-100 font-normal text-xs">
                   {tag}
                </Badge>
             ))}
          </div>
        </div>

        {/* Footer Mobile Only (para ações rápidas) */}
        <div className="mt-5 flex items-center justify-between sm:hidden pt-4 border-t border-slate-100">
           <Button variant="ghost" size="sm" className="text-slate-500"><Heart size={18} /></Button>
           <Button size="sm" className={isPremium ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700"}>Ver Perfil</Button>
        </div>
      </CardContent>
      
      {/* Botão de Ação Desktop (Lateral Direita) */}
      <div className="hidden sm:flex flex-col justify-center items-center p-5 border-l border-slate-50/50 w-40 bg-slate-50/30 gap-3">
         <Button className={`w-full shadow-sm ${isPremium ? 'bg-slate-900 hover:bg-slate-800' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
            Ver Agenda
         </Button>
         <Button variant="outline" className="w-full border-slate-200 hover:bg-white hover:text-indigo-600">
            Chat
         </Button>
      </div>
    </Card>
  );
};

// 3. Skeletons para Loading State
const LoadingSkeletons = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
       <div key={i} className="flex gap-4 p-4 border rounded-xl bg-white">
         <Skeleton className="w-32 h-32 rounded-lg" />
         <div className="flex-1 space-y-3 py-2">
           <Skeleton className="h-6 w-1/3" />
           <Skeleton className="h-4 w-1/4" />
           <Skeleton className="h-12 w-full" />
         </div>
       </div>
    ))}
  </div>
);


// --- PÁGINA PRINCIPAL ---

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Estados
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Estado de loading para efeito
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Sincronização URL e Estado
  useEffect(() => {
    const categoryParam = searchParams.get("categoria");
    const queryParam = searchParams.get("q");

    if (categoryParam && !selectedCategories.includes(categoryParam)) {
      setSelectedCategories([categoryParam]);
    }
    if (queryParam) setSearchTerm(queryParam);

    // Simulando delay de API para mostrar o esqueleto
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Lógica de Filtragem
  const filteredPros = useMemo(() => {
    const filtered = TODOS_PROFISSIONAIS.filter((prof) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(prof.categoria);
      const matchesSearch = prof.nome.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (a.isPremium && !b.isPremium) return -1;
      if (!a.isPremium && b.isPremium) return 1;
      return b.rating - a.rating;
    });
  }, [selectedCategories, searchTerm]);

  // Handlers
  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev => {
      const newSelection = prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug];
      // Opcional: Atualizar URL
      return newSelection;
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-indigo-100">
      
      {/* HEADER STICKY & MODERNO */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all">
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             <Link to="/">
               <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-full">
                 <ArrowLeft className="h-5 w-5 text-slate-600" />
               </Button>
             </Link>
             <h1 className="hidden md:block text-lg font-bold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
               Busca Pro
             </h1>
          </div>

          <div className="flex-1 max-w-2xl flex items-center gap-2">
             <div className="relative flex-1 group">
               <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
               <Input 
                 placeholder="Busque por encanador, eletricista..." 
                 className="pl-10 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 transition-all rounded-full h-10"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
             
             {/* Filtro Mobile */}
             <Sheet>
               <SheetTrigger asChild>
                 <Button variant="outline" size="icon" className="md:hidden shrink-0 rounded-full">
                   <SlidersHorizontal size={18} />
                 </Button>
               </SheetTrigger>
               <SheetContent side="left" className="w-[85%] sm:max-w-md overflow-y-auto">
                 <SheetHeader className="text-left mb-6">
                   <SheetTitle>Filtros</SheetTitle>
                   <SheetDescription>Refine sua busca para encontrar o profissional ideal.</SheetDescription>
                 </SheetHeader>
                 <FiltersContent 
                   selectedCategories={selectedCategories} 
                   onToggleCategory={toggleCategory}
                   priceRange={priceRange}
                   setPriceRange={setPriceRange}
                 />
                 <div className="mt-8 pt-4 border-t flex gap-3 sticky bottom-0 bg-white pb-4">
                    <Button variant="outline" className="flex-1" onClick={clearFilters}>Limpar</Button>
                    <Button className="flex-1 bg-indigo-600" onClick={() => document.querySelector('[data-state="open"]')?.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))}>
                      Ver {filteredPros.length} resultados
                    </Button>
                 </div>
               </SheetContent>
             </Sheet>
          </div>

          <div className="hidden md:flex items-center gap-3">
             <Button variant="ghost" className="text-slate-600 font-medium">Ajuda</Button>
             <div className="h-6 w-px bg-slate-200"></div>
             <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">U</AvatarFallback>
             </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl p-4 md:p-8 flex gap-8 items-start relative">
        
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden md:block w-72 shrink-0 sticky top-24">
          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
               <FiltersContent 
                 selectedCategories={selectedCategories} 
                 onToggleCategory={toggleCategory} 
                 priceRange={priceRange}
                 setPriceRange={setPriceRange}
               />
            </CardContent>
            <CardFooter className="p-4 pt-0 border-t bg-slate-50/50 rounded-b-xl flex flex-col gap-2">
               <Button 
                 variant="outline" 
                 className="w-full border-dashed border-slate-300 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 mt-4"
                 onClick={clearFilters}
                 disabled={selectedCategories.length === 0 && !searchTerm}
               >
                 Limpar Filtros
               </Button>
            </CardFooter>
          </Card>

          {/* Card de Propaganda / Banner Lateral */}
          <div className="mt-6 bg-indigo-900 rounded-xl p-6 text-white text-center relative overflow-hidden group cursor-pointer">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1581578731117-104f2a869c4e?auto=format&fit=crop&q=80&w=400')] opacity-10 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
             <div className="relative z-10">
               <h3 className="font-bold text-lg mb-2">É um profissional?</h3>
               <p className="text-indigo-200 text-sm mb-4">Destaque-se na plataforma e consiga mais clientes hoje mesmo.</p>
               <Button size="sm" variant="secondary" className="w-full font-bold text-indigo-900">Seja Premium</Button>
             </div>
          </div>
        </aside>

        {/* LISTA DE RESULTADOS */}
        <main className="flex-1 min-w-0">
          
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Profissionais disponíveis</h2>
              <p className="text-slate-500 text-sm mt-1">
                 Encontramos <span className="font-semibold text-slate-900">{filteredPros.length}</span> resultados na sua região
              </p>
            </div>

            {/* Dropdown de Ordenação Simples */}
            <div className="flex items-center gap-2">
               <span className="text-sm text-slate-500 whitespace-nowrap hidden sm:inline">Ordenar por:</span>
               <Button variant="outline" className="bg-white font-normal text-slate-700 justify-between min-w-40">
                 Relevância <ChevronDown size={16} className="opacity-50" />
               </Button>
            </div>
          </div>

          {/* Grid de Cards */}
          <div className="flex flex-col gap-4">
            
            {isLoading ? (
              <LoadingSkeletons />
            ) : filteredPros.length > 0 ? (
              filteredPros.map((prof) => (
                <ProfessionalCard key={prof.id} prof={prof} navigate={navigate} />
              ))
            ) : (
              // Estado Vazio Rico
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <SearchIcon size={40} className="text-slate-300" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-2">Nenhum profissional encontrado</h3>
                 <p className="text-slate-500 text-center max-w-md mb-6">
                    Não encontramos resultados para os filtros selecionados. Tente termos mais genéricos ou limpe os filtros.
                 </p>
                 <Button onClick={clearFilters} className="bg-indigo-600 hover:bg-indigo-700">
                    Limpar todos os filtros
                 </Button>
              </div>
            )}
          </div>

          {/* Paginação Simulada */}
          {!isLoading && filteredPros.length > 0 && (
             <div className="mt-10 flex justify-center">
                <Button variant="outline" className="px-8 text-slate-500">Carregar mais profissionais</Button>
             </div>
          )}

        </main>
      </div>
    </div>
  );
}