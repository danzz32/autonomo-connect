"""
Repositório para operações de banco de dados da entidade Profissional.
"""
from typing import List, Optional
from google.cloud import firestore
from app.database import get_db


class ProfissionalRepository:
    """Encapsula acesso à coleção 'profissionais'."""

    def __init__(self):
        self.collection_name = "profissionais"

    def _get_collection(self):
        return get_db().collection(self.collection_name)

    def create_with_custom_id(self, custom_id: str, dados: dict) -> dict:
        """Cria documento usando o UID do usuário como chave."""
        doc_ref = self._get_collection().document(custom_id)
        doc_ref.set(dados)
        return {**dados, "id": custom_id}

    def list_all(self) -> List[dict]:
        """Lista todos os profissionais."""
        docs = self._get_collection().stream()
        return [{**doc.to_dict(), "id": doc.id} for doc in docs]

    def find_by_slug(self, slug: str) -> Optional[dict]:
        """Busca profissional pelo slug URL-friendly."""
        query = self._get_collection().where("slug", "==", slug).limit(1).stream()
        for doc in query:
            return {**doc.to_dict(), "id": doc.id}
        return None

    def update(self, uid: str, dados: dict):
        """Atualiza campos parciais de um profissional."""
        doc_ref = self._get_collection().document(uid)
        doc_ref.update(dados)
        updated_doc = doc_ref.get()
        return {**updated_doc.to_dict(), "id": updated_doc.id}

    def update_stats_after_review(self, uid: str, new_rating: int):
        """
        Atualiza contagem e média de estrelas de forma TRANSACIONAL.
        Evita erros de cálculo em acessos simultâneos.
        """
        data_base = get_db()
        doc_ref = self._get_collection().document(uid)

        @firestore.transactional
        def update_in_transaction(transaction, ref):
            snapshot = ref.get(transaction=transaction)
            if not snapshot.exists:
                return

            data = snapshot.to_dict()
            current_count = data.get("reviews", 0)
            current_avg = data.get("rating", 0.0)

            new_count = current_count + 1
            # Média ponderada cumulativa
            new_average = ((current_avg * current_count) + new_rating) / new_count
            new_average = round(new_average, 1)

            transaction.update(ref, {
                "reviews": new_count,
                "rating": new_average
            })

        transaction = data_base.transaction()
        update_in_transaction(transaction, doc_ref)


profissional_repo = ProfissionalRepository()
