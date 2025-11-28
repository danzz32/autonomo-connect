"""
Roteador da API para endpoints de Profissionais.
"""
from typing import List
from fastapi import APIRouter, HTTPException, Depends, Path
from app.schemas.review import ReviewCreate, ReviewResponse
from app.schemas.payment import PaymentMethodCreate, PaymentMethodResponse
from app.schemas.profissional import ProfissionalCreate, ProfissionalResponse, ProfissionalPortfolioUpdate
from app.services import profissional_service, review_service, payment_service
from app.schemas.enums import UserRoleEnum
from app.utils.security import verify_firebase_token

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


@router.patch("/me/portfolio", response_model=ProfissionalResponse)
def atualizar_meu_portfolio(
        portfolio_data: ProfissionalPortfolioUpdate,
        user_payload: dict = Depends(verify_firebase_token)
):
    """
    Substitui a lista de imagens do portfólio (Max 6 URLs).
    """
    try:
        uid = user_payload["uid"]
        # Opcional: verificar se o usuário é mesmo um profissional
        # if user_payload.get("role") != UserRoleEnum.PROFESSIONAL: ...
        return profissional_service.update_portfolio(uid, portfolio_data)
    except ValueError as e:
        # Captura erro de validação do Pydantic (ex: mais de 6 imagens)
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{slug}/reviews", response_model=ReviewResponse, status_code=201)
def publicar_avaliacao(
        review_data: ReviewCreate,
        slug: str = Path(..., description="Slug do profissional avaliado"),
        user_payload: dict = Depends(verify_firebase_token)
):
    """
    Cliente publica uma avaliação para um profissional específico.
    """
    # Regra: Só CLIENTS podem avaliar (opcional, mas recomendado)
    # O Firebase Token customizado já deve trazer essa 'role'
    if user_payload.get("role") == UserRoleEnum.PROFESSIONAL:
        raise HTTPException(status_code=403, detail="Profissionais não podem avaliar outros profissionais.")

    try:
        client_uid = user_payload["uid"]
        return review_service.create_review(slug, review_data, client_uid)
    except Exception as e:
        # Ex: Profissional não encontrado ou erro no banco
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{slug}/reviews", response_model=List[ReviewResponse])
def listar_avaliacoes_do_profissional(
        slug: str = Path(..., description="Slug do profissional")
):
    """
    Lista todas as avaliações de um profissional (público).
    """
    try:
        return review_service.list_reviews(slug)
    except Exception as e:
        raise HTTPException(status_code=404, detail="Profissional não encontrado")


@router.post("/me/payments", response_model=PaymentMethodResponse, status_code=201)
def adicionar_metodo_pagamento(
        payment_data: PaymentMethodCreate,
        user_payload: dict = Depends(verify_firebase_token)
):
    """
    Simula o cadastro de um cartão ou chave pix.
    Nunca salva o número do cartão completo, apenas os 4 últimos dígitos.
    """
    try:
        uid = user_payload["uid"]
        # Aqui simulamos um delay de validação do cartão
        # time.sleep(1)
        return payment_service.add_payment_method(uid, payment_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/me/payments", response_model=List[PaymentMethodResponse])
def listar_meus_pagamentos(
        user_payload: dict = Depends(verify_firebase_token)
):
    uid = user_payload["uid"]
    return payment_service.list_my_payment_methods(uid)
