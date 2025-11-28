"""
Schemas para a entidade Profissional e suas operações (Portfólio, Planos).
"""
from typing import Optional, List
from pydantic import BaseModel, HttpUrl, field_validator, computed_field
from app.schemas.enums import CategoriaEnum, UserRoleEnum, PlanoEnum


def validate_portfolio_list(urls: List[HttpUrl]) -> List[HttpUrl]:
    """Validador reutilizável: Limite de 6 imagens no portfólio."""
    if len(urls) > 6:
        raise ValueError('O portfólio pode ter no máximo 6 imagens.')
    return urls


class ProfissionalBase(BaseModel):
    """Modelo base do profissional."""
    nome: str
    categoria: CategoriaEnum
    profissao: str
    precoHora: float
    avatar: Optional[str] = "https://github.com/shadcn.png"
    plano: PlanoEnum = PlanoEnum.BASIC
    portfolio: List[HttpUrl] = []

    @field_validator('portfolio')
    @classmethod
    def check_portfolio(cls, v_urls):
        """Valida a lista de portfólio na criação."""
        return validate_portfolio_list(v_urls)


class ProfissionalCreate(ProfissionalBase):
    """Payload de criação."""
    role: UserRoleEnum = UserRoleEnum.PROFESSIONAL


class ProfissionalUpdatePlan(BaseModel):
    """Payload para upgrade de plano."""
    plano: PlanoEnum


class ProfissionalPortfolioUpdate(BaseModel):
    """Payload para atualização isolada do portfólio."""
    portfolio: List[HttpUrl]

    @field_validator('portfolio')
    @classmethod
    def check_portfolio(cls, v_urls):
        """Valida a lista de portfólio na atualização."""
        return validate_portfolio_list(v_urls)


class ProfissionalResponse(ProfissionalBase):
    """Retorno da API com campos calculados."""
    id: str
    slug: str
    rating: float
    reviews: int
    role: UserRoleEnum

    @computed_field
    def isPremium(self) -> bool:
        """Campo calculado: Define visualmente se é premium baseado no plano pago."""
        return self.plano == PlanoEnum.PREMIUM

    class Config:
        """Configuração Pydantic."""
        from_attributes = True
