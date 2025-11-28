from pydantic import BaseModel, computed_field, HttpUrl, field_validator
from typing import Optional, List
from app.schemas.enums import CategoriaEnum, UserRoleEnum, PlanoEnum


class ProfissionalBase(BaseModel):
    nome: str
    categoria: CategoriaEnum
    profissao: str
    precoHora: float
    avatar: Optional[str] = "https://github.com/shadcn.png"
    plano: PlanoEnum = PlanoEnum.BASIC

    # Lista de URLs válidas. Padrão é lista vazia.
    portfolio: List[HttpUrl] = []

    # Validador para garantir o máximo de 6 imagens
    @field_validator('portfolio')
    @classmethod
    def check_portfolio_size(cls, v: List[HttpUrl]):
        if len(v) > 6:
            raise ValueError('O portfólio pode ter no máximo 6 imagens.')
        return v


class ProfissionalPortfolioUpdate(BaseModel):
    portfolio: List[HttpUrl]

    @field_validator('portfolio')
    @classmethod
    def check_portfolio_size(cls, v: List[HttpUrl]):
        if len(v) > 6:
            raise ValueError('O portfólio pode ter no máximo 6 imagens.')
        return v


class ProfissionalCreate(ProfissionalBase):
    role: UserRoleEnum = UserRoleEnum.PROFESSIONAL


class ProfissionalUpdatePlan(BaseModel):
    plano: PlanoEnum


class ProfissionalResponse(ProfissionalBase):
    id: str
    slug: str
    rating: float
    reviews: int
    role: UserRoleEnum

    # Regra visual: Só é considerado "Premium" (Destaque) quem paga o plano mais caro
    @computed_field
    def isPremium(self) -> bool:
        return self.plano == PlanoEnum.PREMIUM

    class Config:
        from_attributes = True
