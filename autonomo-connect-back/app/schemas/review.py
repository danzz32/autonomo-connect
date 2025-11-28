"""
Schemas para Avaliações (Reviews).
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class ReviewBase(BaseModel):
    """Campos básicos da avaliação."""
    rating: int = Field(..., ge=1, le=5, description="Nota de 1 a 5")
    comentario: Optional[str] = Field(None, max_length=500)


class ReviewCreate(ReviewBase):
    """Payload de criação."""


class ReviewResponse(ReviewBase):
    """Retorno da API."""
    id: str
    client_id: str
    client_nome: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
