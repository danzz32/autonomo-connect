from fastapi import APIRouter, Depends, HTTPException
from app.schemas.user import UserCreate, UserResponse
from app.services import user_service
from app.utils.security import verify_firebase_token

router = APIRouter(
    prefix="/users",
    tags=["Usuários (Clientes)"]
)


@router.post("/", response_model=UserResponse, status_code=201)
def criar_cliente(
        user_data: UserCreate,
        token_payload: dict = Depends(verify_firebase_token)
):
    """
    Cria ou atualiza o perfil do cliente.
    O ID é extraído automaticamente do token.
    O Email é forçado a ser o mesmo do token por segurança.
    """
    try:
        uid = token_payload["uid"]

        # SEGURANÇA: Garante que o email salvo é o mesmo autenticado no Firebase
        email_do_token = token_payload.get("email")
        if email_do_token:
            user_data.email = email_do_token

        return user_service.create_client(user_data, uid)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) from e


@router.get("/me", response_model=UserResponse)
def ler_meu_perfil(
        token_payload: dict = Depends(verify_firebase_token)
):
    """
    Retorna os dados do usuário logado (Nome, Email, Celular, Role).
    """
    uid = token_payload["uid"]
    user = user_service.get_me(uid)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Perfil não encontrado. Complete seu cadastro enviando um POST para /users/."
        )

    return user
