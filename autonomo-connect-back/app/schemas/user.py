from pydantic import BaseModel, EmailStr
from typing import Optional
from app.schemas.enums import UserRoleEnum


class UserBase(BaseModel):
    nome: str
    email: EmailStr
    avatar: Optional[str] = None


class UserCreate(UserBase):
    """
    Dados recebidos ao criar um usuário comum.
    Geralmente vem do cadastro no Firebase.
    """
    role: UserRoleEnum = UserRoleEnum.CLIENT


class UserResponse(UserBase):
    id: str  # O UID do Firebase
    role: UserRoleEnum

    class Config:
        from_attributes = True
