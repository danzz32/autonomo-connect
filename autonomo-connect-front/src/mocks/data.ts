import { Paintbrush, Hammer, Armchair, Home, Wrench, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Tipagem para ajudar o TypeScript
export interface Categoria {
  id: number;
  nome: string;
  slug: string;
  icon: LucideIcon;
  color: string;
}

export interface Profissional {
  id: number;
  nome: string;
  slug: string; // <--- O campo que estava faltando
  categoria: string;
  profissao?: string; // Opcional pois usamos 'categoria' na busca
  rating: number;
  reviews: number;
  precoHora: number;
  avatar: string;
  isPremium: boolean; // <--- Novo Campo
}

export const CATEGORIAS: Categoria[] = [
  {
    id: 1,
    nome: "Pintura",
    slug: "pintura",
    icon: Paintbrush,
    color: "text-blue-500",
  },
  {
    id: 2,
    nome: "Carpintaria",
    slug: "carpintaria",
    icon: Hammer,
    color: "text-orange-500",
  },
  {
    id: 3,
    nome: "Marcenaria",
    slug: "marcenaria",
    icon: Armchair,
    color: "text-amber-700",
  },
  {
    id: 4,
    nome: "Doméstica",
    slug: "domestica",
    icon: Home,
    color: "text-pink-500",
  },
  {
    id: 5,
    nome: "Elétrica",
    slug: "eletrica",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    id: 6,
    nome: "Reparos",
    slug: "reparos",
    icon: Wrench,
    color: "text-slate-500",
  },
];

export const TODOS_PROFISSIONAIS: Profissional[] = [
  {
    id: 1,
    nome: "Carlos Silva",
    slug: "carlos-silva",
    categoria: "eletrica",
    profissao: "Eletricista",
    rating: 4.8,
    reviews: 120,
    precoHora: 80,
    avatar: "https://github.com/shadcn.png",
    isPremium: true, // <--- Premium
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    slug: "maria-oliveira",
    categoria: "domestica",
    profissao: "Diarista",
    rating: 4.9,
    reviews: 85,
    precoHora: 50,
    avatar: "https://github.com/shadcn.png",
    isPremium: false,
  },
  {
    id: 3,
    nome: "João Souza",
    slug: "joao-souza",
    categoria: "marcenaria",
    profissao: "Marceneiro",
    rating: 5.0,
    reviews: 42,
    precoHora: 120,
    avatar: "https://github.com/shadcn.png",
    isPremium: true, // <--- Premium
  },
  {
    id: 4,
    nome: "Ana Pereira",
    slug: "ana-pereira",
    categoria: "pintura",
    profissao: "Pintora",
    rating: 4.7,
    reviews: 30,
    precoHora: 60,
    avatar: "https://github.com/shadcn.png",
    isPremium: false,
  },
  {
    id: 5,
    nome: "Roberto Costa",
    slug: "roberto-costa",
    categoria: "reparos",
    profissao: "Marido de Aluguel",
    rating: 4.5,
    reviews: 15,
    precoHora: 90,
    avatar: "https://github.com/shadcn.png",
    isPremium: false,
  },
  {
    id: 6,
    nome: "Fernanda Lima",
    slug: "fernanda-lima",
    categoria: "eletrica",
    profissao: "Eletricista",
    rating: 4.9,
    reviews: 200,
    precoHora: 100,
    avatar: "https://github.com/shadcn.png",
    isPremium: true, // <--- Premium
  },
  {
    id: 7,
    nome: "Lucas Martins",
    slug: "lucas-martins",
    categoria: "carpintaria",
    profissao: "Carpinteiro",
    rating: 4.6,
    reviews: 55,
    precoHora: 110,
    avatar: "https://github.com/shadcn.png",
    isPremium: false,
  },
];

// Adicione ao final de src/mocks/data.ts

export const DASHBOARD_STATS = {
  visualizacoes: 128,
  contatosWhatsapp: 14,
  avaliacaoMedia: 4.8,
  mensagensNaoLidas: 2,
  plano: "Gratuito", // ou "Premium"
};

export const ULTIMAS_ATIVIDADES = [
  { id: 1, texto: "João Silva visualizou seu telefone", data: "Há 10 min" },
  {
    id: 2,
    texto: "Maria Souza deixou uma avaliação 5 estrelas",
    data: "Há 2 horas",
  },
  {
    id: 3,
    texto: "Seu perfil apareceu em 30 buscas hoje",
    data: "Hoje, 08:00",
  },
];

// Lógica de Destaque: Primeiro filtramos os Premiums, depois completamos com o resto
const premiums = TODOS_PROFISSIONAIS.filter((p) => p.isPremium);
const normais = TODOS_PROFISSIONAIS.filter((p) => !p.isPremium);

// Pega todos os premiums + o que couber dos normais para fechar 4 destaques
export const PROFISSIONAIS_DESTAQUE = [...premiums, ...normais].slice(0, 4);
