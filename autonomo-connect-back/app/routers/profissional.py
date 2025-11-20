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
@router.post("/", response_model=ProfissionalResponse, status_code=201)
def criar_profissional(
        profissional: ProfissionalCreate,
        user_payload: dict = Depends(verify_firebase_token)  # <--- Proteção aqui
):
    """
    Endpoint protegido via JWT.
    Cria um novo profissional vinculado ao usuário logado.
    """
    try:
        # (Opcional) Você pode pegar o ID do usuário logado aqui:
        # uid = user_payload.get("uid")
        # print(f"Usuário {uid} está criando um perfil.")

        return profissional_service.create_profissional(profissional)
    except ValueError as err:
        raise HTTPException(status_code=400, detail=str(err)) from err


# Rotas GET continuam públicas (sem Depends)
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
