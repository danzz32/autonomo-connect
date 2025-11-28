from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from app.schemas.enums import UserRoleEnum


class UserBase(BaseModel):
    nome: str
    email: EmailStr
    celular: str = Field(..., description="Número de celular com DDD")
    avatar: Optional[str] = "https://github.com/shadcn.png"


class UserCreate(UserBase):
    """
    Dados recebidos ao criar o perfil.
    A senha não vem aqui, ela fica no Firebase Auth.
    """
    role: UserRoleEnum = UserRoleEnum.CLIENT


class UserResponse(UserBase):
    id: str
    role: UserRoleEnum

    class Config:
        from_attributes = True
