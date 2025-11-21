export const CategoriaEnum = {
  PINTURA: "pintura",
  CARPINTARIA: "carpintaria",
  MARCENARIA: "marcenaria",
  DOMESTICA: "domestica",
  ELETRICA: "eletrica",
  REPAROS: "reparos",
  OUTROS: "outros",
} as const;

export type CategoriaEnum = (typeof CategoriaEnum)[keyof typeof CategoriaEnum];

export interface Profissional {
  id: number | string;
  nome: string;
  slug: string;
  categoria: CategoriaEnum | string;
  profissao: string;
  rating: number;
  reviews: number;
  precoHora: number;
  avatar: string;
  isPremium: boolean;
}
