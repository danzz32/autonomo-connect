"""
Schemas para a entidade Usuário (Cliente).
"""
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from app.schemas.enums import UserRoleEnum


class UserBase(BaseModel):
    """
    Modelo base do usuário.
    """
    nome: str
    email: EmailStr
    avatar: Optional[str] = "https://github.com/shadcn.png"
    # Valida formatos como (11) 99999-9999, 11999999999, etc.
    celular: str = Field(
        ...,
        description="Número de celular com DDD",
        pattern=r"^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$"
    )


class UserCreate(UserBase):
    """
    Payload para criação de usuário. O papel é fixo como CLIENTE.
    """
    role: UserRoleEnum = UserRoleEnum.CLIENT


class UserResponse(UserBase):
    """
    Retorno da API para o usuário.
    """
    id: str
    role: UserRoleEnum

    class Config:
        """Configuração Pydantic."""
        from_attributes = True
