from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


class ReviewBase(BaseModel):
    rating: int = Field(..., ge=1, le=5, description="Nota de 1 a 5")
    comentario: Optional[str] = Field(None, max_length=500)


class ReviewCreate(ReviewBase):
    """Payload enviado pelo cliente ao criar a review"""
    pass


class ReviewResponse(ReviewBase):
    id: str
    client_id: str  # ID de quem fez a avaliação
    client_nome: str  # Nome de quem fez (para facilitar exibição)
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
