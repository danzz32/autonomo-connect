"""
Repositório para gerenciar a subcoleção de Reviews.
"""
from typing import List
from datetime import datetime
from google.cloud import firestore
from app.database import get_db


class ReviewRepository:
    """Acesso à subcoleção profissionais/{id}/reviews."""

    def _get_reviews_subcollection(self, profissional_uid: str):
        return get_db().collection("profissionais").document(profissional_uid).collection("reviews")

    def add_review(self, profissional_uid: str, review_data: dict) -> dict:
        """Adiciona uma nova review com data de criação."""
        review_data["created_at"] = datetime.utcnow()
        doc_ref = self._get_reviews_subcollection(profissional_uid).document()
        doc_ref.set(review_data)
        return {**review_data, "id": doc_ref.id}

    def get_all_by_professional(self, profissional_uid: str) -> List[dict]:
        """Retorna todas as reviews ordenadas por data."""
        docs = self._get_reviews_subcollection(profissional_uid) \
            .order_by("created_at", direction=firestore.Query.DESCENDING) \
            .stream()

        return [{**doc.to_dict(), "id": doc.id} for doc in docs]


review_repo = ReviewRepository()
