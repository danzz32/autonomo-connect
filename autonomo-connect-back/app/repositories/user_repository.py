from typing import Optional
from app.database import get_db


class UserRepository:
    def __init__(self):
        self.collection_name = "users"  # Coleção separada para clientes

    def _get_collection(self):
        return get_db().collection(self.collection_name)

    def create_or_update(self, uid: str, dados: dict) -> dict:
        """
        Cria ou atualiza os dados do usuário usando o UID como chave.
        Isso garante que o documento do banco tenha o mesmo ID da autenticação.
        """
        doc_ref = self._get_collection().document(uid)
        doc_ref.set(dados, merge=True)
        return {**dados, "id": uid}

    def get_by_id(self, uid: str) -> Optional[dict]:
        doc = self._get_collection().document(uid).get()
        if doc.exists:
            dados = doc.to_dict()
            dados["id"] = doc.id
            return dados
        return None


user_repo = UserRepository()
