from app.schemas.user import UserCreate
from app.schemas.enums import UserRoleEnum
from app.repositories.user_repository import user_repo


def create_client(data: UserCreate, uid: str):
    # Converte Pydantic para dict
    user_dict = data.model_dump(mode='json')
    user_dict["role"] = UserRoleEnum.CLIENT

    # Salva no banco
    return user_repo.create_or_update(uid, user_dict)


def get_me(uid: str):
    return user_repo.get_by_id(uid)
