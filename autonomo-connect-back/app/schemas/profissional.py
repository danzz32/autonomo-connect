"""
Schemas Pydantic para validação e serialização dos dados de Profissionais.
Define os contratos de entrada e saída da API.
"""
from typing import Optional
from pydantic import BaseModel


class ProfissionalBase(BaseModel):
    """
    Modelo base com campos comuns para criação e leitura.
    """
    nome: str
    slug: str
    categoria: str
    profissao: str
    precoHora: float
    isPremium: bool = False
    avatar: Optional[str] = "https://github.com/shadcn.png"


class ProfissionalCreate(ProfissionalBase):
    """
    Schema para recebimento de dados na criação (Input).
    Herda todos os campos base.
    """


class ProfissionalResponse(ProfissionalBase):
    """
    Schema para resposta da API (Output).
    Inclui campos gerenciados pelo sistema (ID, Rating).
    """
    id: str
    rating: float
    reviews: int

    class Config:
        """Configurações do Pydantic para compatibilidade com ORMs/Dicts."""
        from_attributes = True
