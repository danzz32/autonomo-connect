from pydantic import BaseModel
from typing import Optional
from app.schemas.enums import CategoriaEnum, UserRoleEnum


class ProfissionalBase(BaseModel):
    nome: str
    categoria: CategoriaEnum
    profissao: str
    precoHora: float
    isPremium: bool = False
    avatar: Optional[str] = "https://github.com/shadcn.png"


class ProfissionalCreate(ProfissionalBase):
    role: UserRoleEnum = UserRoleEnum.PROFESSIONAL


class ProfissionalResponse(ProfissionalBase):
    id: str
    slug: str
    rating: float
    reviews: int
    role: UserRoleEnum

    class Config:
        from_attributes = True
