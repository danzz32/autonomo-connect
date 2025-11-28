from app.schemas.user import UserCreate
from app.schemas.enums import UserRoleEnum
from app.repositories.user_repository import user_repo


def create_client(data: UserCreate, uid: str):
    # Converte o objeto Pydantic para dicionário
    user_dict = data.model_dump(mode='json')

    # Garante que o papel seja CLIENT (segurança)
    user_dict["role"] = UserRoleEnum.CLIENT.value

    # O repositório salva (com merge=True)
    return user_repo.create_or_update(uid, user_dict)


def get_me(uid: str):
    return user_repo.get_by_id(uid)
