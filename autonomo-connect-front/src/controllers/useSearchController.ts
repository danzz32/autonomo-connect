// src/controllers/useSearchController.ts
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProfissionalService } from "@/services/ProfissionalService";

// FIX 2: Add 'type' keyword for the interface/type
import { type Profissional } from "@/models/types";

export function useSearchController() {
  const [searchParams] = useSearchParams();

  // Estados da View
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Inicializa filtros pela URL
  useEffect(() => {
    const catParam = searchParams.get("categoria");
    if (catParam) {
      setSelectedCategories([catParam]);
    }
  }, [searchParams]);

  // Lógica de Busca (Chama o Service)
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const allPros = await ProfissionalService.getAll();

        let filtered = allPros;

        if (selectedCategories.length > 0) {
          filtered = filtered.filter((p) =>
            selectedCategories.includes(p.categoria)
          );
        }

        if (searchTerm) {
          filtered = filtered.filter((p) =>
            p.nome.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        filtered.sort((a, b) =>
          a.isPremium === b.isPremium ? 0 : a.isPremium ? -1 : 1
        );

        setProfissionais(filtered);
      } catch (error) {
        console.error("Erro ao buscar profissionais", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedCategories, searchTerm]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  return {
    profissionais,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    toggleCategory,
  };
}
