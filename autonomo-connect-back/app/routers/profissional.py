"""
Roteador da API para endpoints de Profissionais.
"""
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from app.schemas.profissional import ProfissionalCreate, ProfissionalResponse
from app.services import profissional_service
from app.utils.security import verify_firebase_token  # <--- Import atualizado

router = APIRouter(
    prefix="/profissionais",
    tags=["Profissionais"]
)


# Agora `verify_firebase_token` retorna os dados do usuário (user_payload)
@router.post("/create", response_model=ProfissionalResponse, status_code=201)
def criar_profissional(
        profissional: ProfissionalCreate,
        user_payload: dict = Depends(verify_firebase_token)  # Payload do token
):
    """
        Endpoint protegido via JWT.
        Cria um novo profissional vinculado ao usuário logado.
        """
    try:
        # Extraímos o UID do token
        uid = user_payload["uid"]
        return profissional_service.create_profissional(profissional, uid)

    except ValueError as err:
        raise HTTPException(status_code=400, detail=str(err)) from err


@router.get("/", response_model=List[ProfissionalResponse])
def listar_profissionais():
    """Lista pública de profissionais."""
    return profissional_service.list_profissionais()


@router.get("/{slug}", response_model=ProfissionalResponse)
def obter_profissional(slug: str):
    """Detalhe público do profissional."""
    prof = profissional_service.get_profissional_by_slug(slug)
    if not prof:
        raise HTTPException(status_code=404, detail="Profissional não encontrado")
    return prof
