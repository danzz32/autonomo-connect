"""
Repositório para gerenciar Métodos de Pagamento (Subcoleção).
"""
from typing import List
from app.database import get_db


class PaymentRepository:
    """Acesso à subcoleção profissionais/{id}/payments."""

    def _get_collection(self, uid: str):
        return get_db().collection("profissionais").document(uid).collection("payments")

    def create(self, uid: str, dados: dict) -> dict:
        """Cria método de pagamento e gerencia flag 'default'."""
        if dados.get("is_default"):
            self._unset_defaults(uid)

        doc_ref = self._get_collection(uid).document()
        doc_ref.set(dados)
        return {**dados, "id": doc_ref.id}

    def list_all(self, uid: str) -> List[dict]:
        """Lista pagamentos do usuário."""
        docs = self._get_collection(uid).stream()
        return [{**doc.to_dict(), "id": doc.id} for doc in docs]

    def _unset_defaults(self, uid: str):
        """Remove status de default de outros cartões."""
        docs = self._get_collection(uid).where("is_default", "==", True).stream()
        for doc in docs:
            doc.reference.update({"is_default": False})


payment_repo = PaymentRepository()
