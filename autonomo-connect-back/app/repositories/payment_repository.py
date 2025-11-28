from typing import List
from app.database import get_db


class PaymentRepository:
    def _get_collection(self, uid: str):
        # Subcoleção: profissionais/{uid}/payments/
        return get_db().collection("profissionais").document(uid).collection("payments")

    def create(self, uid: str, dados: dict) -> dict:
        # Se este for o padrão, remove o padrão dos outros (lógica simples)
        if dados.get("is_default"):
            self._unset_defaults(uid)

        doc_ref = self._get_collection(uid).document()
        doc_ref.set(dados)
        return {**dados, "id": doc_ref.id}

    def list_all(self, uid: str) -> List[dict]:
        docs = self._get_collection(uid).stream()
        lista = []
        for doc in docs:
            dados = doc.to_dict()
            dados["id"] = doc.id
            lista.append(dados)
        return lista

    def _unset_defaults(self, uid: str):
        """Tira o status de default de todos os outros cartões"""
        docs = self._get_collection(uid).where("is_default", "==", True).stream()
        for doc in docs:
            doc.reference.update({"is_default": False})


payment_repo = PaymentRepository()
