import { TODOS_PROFISSIONAIS, CATEGORIAS } from "@/mocks/data";
import type { Profissional } from "@/models/types";

// Simulando um delay de rede para parecer real
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ProfissionalService = {
  getAll: async (): Promise<Profissional[]> => {
    await delay(500); // Fake loading
    return TODOS_PROFISSIONAIS as unknown as Profissional[];
  },

  getBySlug: async (slug: string): Promise<Profissional | undefined> => {
    await delay(500);
    return TODOS_PROFISSIONAIS.find(
      (p) => p.slug === slug
    ) as unknown as Profissional;
  },

  getByCategoria: async (categoriaSlug: string): Promise<Profissional[]> => {
    await delay(500);
    return TODOS_PROFISSIONAIS.filter(
      (p) => p.categoria === categoriaSlug
    ) as unknown as Profissional[];
  },

  getCategorias: async () => {
    return CATEGORIAS;
  },
};
