"""
Rotas para Usuários Comuns (Clientes).
"""
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.user import UserCreate, UserResponse
from app.services import user_service
from app.utils.security import verify_firebase_token

router = APIRouter(prefix="/users", tags=["Usuários (Clientes)"])


@router.post("/", response_model=UserResponse, status_code=201)
def criar_cliente(
        user_data: UserCreate,
        token_payload: dict = Depends(verify_firebase_token)
):
    """Cria ou atualiza perfil do cliente."""
    try:
        uid = token_payload["uid"]
        email_token = token_payload.get("email")

        # Atualiza email com o valor seguro do token
        if email_token:
            user_data = user_data.model_copy(update={"email": email_token})

        return user_service.create_client(user_data, uid)
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error)) from error


@router.get("/me", response_model=UserResponse)
def ler_meu_perfil(token_payload: dict = Depends(verify_firebase_token)):
    """Retorna dados do cliente logado."""
    uid = token_payload["uid"]
    user = user_service.get_me(uid)
    if not user:
        raise HTTPException(status_code=404, detail="Perfil não encontrado")
    return user
