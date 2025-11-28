"""
Rotas para Profissionais. Inclui portfólio, planos, reviews e pagamentos.
"""
from typing import List
from fastapi import APIRouter, HTTPException, Depends, Path
from app.schemas.profissional import (
    ProfissionalCreate, ProfissionalResponse,
    ProfissionalUpdatePlan, ProfissionalPortfolioUpdate
)
from app.schemas.review import ReviewCreate, ReviewResponse
from app.schemas.payment import PaymentMethodCreate, PaymentMethodResponse
from app.services import profissional_service, review_service, payment_service
from app.utils.security import verify_firebase_token
from app.schemas.enums import UserRoleEnum

router = APIRouter(prefix="/profissionais", tags=["Profissionais"])


# --- CRUD Básico ---
@router.post("/", response_model=ProfissionalResponse, status_code=201)
def criar_profissional(
        profissional: ProfissionalCreate,
        user_payload: dict = Depends(verify_firebase_token)
):
    try:
        uid = user_payload["uid"]
        return profissional_service.create_profissional(profissional, uid)
    except ValueError as err:
        raise HTTPException(status_code=400, detail=str(err)) from err


@router.get("/", response_model=List[ProfissionalResponse])
def listar_profissionais():
    return profissional_service.list_profissionais()


@router.get("/{slug}", response_model=ProfissionalResponse)
def obter_profissional(slug: str):
    prof = profissional_service.get_profissional_by_slug(slug)
    if not prof:
        raise HTTPException(status_code=404, detail="Profissional não encontrado")
    return prof


# --- Features: Plano e Portfólio ---
@router.patch("/me/plano", response_model=ProfissionalResponse)
def alterar_plano(
        plano_data: ProfissionalUpdatePlan,
        user_payload: dict = Depends(verify_firebase_token)
):
    try:
        uid = user_payload["uid"]
        return profissional_service.update_plan(uid, plano_data.plano)
    except Exception as err:
        raise HTTPException(status_code=400, detail=str(err)) from err


@router.patch("/me/portfolio", response_model=ProfissionalResponse)
def atualizar_meu_portfolio(
        portfolio_data: ProfissionalPortfolioUpdate,
        user_payload: dict = Depends(verify_firebase_token)
):
    try:
        uid = user_payload["uid"]
        return profissional_service.update_portfolio(uid, portfolio_data)
    except ValueError as err:
        raise HTTPException(status_code=422, detail=str(err)) from err
    except Exception as err:
        raise HTTPException(status_code=400, detail=str(err)) from err


# --- Avaliações ---
@router.post("/{slug}/reviews", response_model=ReviewResponse, status_code=201)
def publicar_avaliacao(
        review_data: ReviewCreate,
        slug: str = Path(..., description="Slug do profissional"),
        user_payload: dict = Depends(verify_firebase_token)
):
    if user_payload.get("role") == UserRoleEnum.PROFESSIONAL:
        raise HTTPException(status_code=403, detail="Apenas clientes podem avaliar profissionais.")

    try:
        client_uid = user_payload["uid"]
        return review_service.create_review(slug, review_data, client_uid)
    except ValueError as err:
        error_msg = str(err)
        if "Profissional não encontrado" in error_msg:
            raise HTTPException(status_code=404, detail=error_msg) from err
        raise HTTPException(status_code=422, detail=error_msg) from err
    except Exception as err:
        raise HTTPException(status_code=400, detail="Erro ao processar.") from err


@router.get("/{slug}/reviews", response_model=List[ReviewResponse])
def listar_reviews(slug: str):
    reviews = review_service.list_reviews(slug)
    if reviews is None:
        raise HTTPException(status_code=404, detail="Profissional não encontrado")
    return reviews


# --- Pagamentos ---
@router.post("/me/payments", response_model=PaymentMethodResponse, status_code=201)
def adicionar_pagamento(
        payment_data: PaymentMethodCreate,
        user_payload: dict = Depends(verify_firebase_token)
):
    try:
        uid = user_payload["uid"]
        return payment_service.add_payment_method(uid, payment_data)
    except Exception as err:
        raise HTTPException(status_code=400, detail=str(err)) from err


@router.get("/me/payments", response_model=List[PaymentMethodResponse])
def listar_pagamentos(user_payload: dict = Depends(verify_firebase_token)):
    uid = user_payload["uid"]
    return payment_service.list_my_payment_methods(uid)
