from fastapi import APIRouter, Depends, HTTPException
from app.schemas.user import UserCreate, UserResponse
from app.services import user_service
from app.utils.security import verify_firebase_token

router = APIRouter(
    prefix="/users",
    tags=["Usuários (Clientes)"]
)


@router.post("/", response_model=UserResponse, status_code=201)
def criar_ou_atualizar_cliente(
        user_data: UserCreate,
        user_payload: dict = Depends(verify_firebase_token)
):
    """
    Cria o perfil do cliente no banco de dados após o registro no Firebase.
    """
    try:
        uid = user_payload["uid"]
        return user_service.create_client(user_data, uid)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) from e


@router.get("/me", response_model=UserResponse)
def ler_meu_perfil(
        user_payload: dict = Depends(verify_firebase_token)
):
    """
    Retorna os dados do usuário logado.
    """
    uid = user_payload["uid"]
    user = user_service.get_me(uid)

    if not user:
        raise HTTPException(status_code=404, detail="Perfil de usuário não encontrado")

    return user
