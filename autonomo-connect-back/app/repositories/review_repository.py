from typing import List
from app.database import get_db
from google.cloud import firestore
from datetime import datetime


class ReviewRepository:
    def _get_reviews_subcollection(self, profissional_uid: str):
        # Acessa: profissionais/{uid}/reviews/
        return get_db().collection("profissionais").document(profissional_uid).collection("reviews")

    def add_review(self, profissional_uid: str, review_data: dict) -> dict:
        """
        Adiciona uma review na subcoleção do profissional.
        """
        review_data["created_at"] = datetime.utcnow()

        # Cria um novo documento na subcoleção
        doc_ref = self._get_reviews_subcollection(profissional_uid).document()
        doc_ref.set(review_data)

        return {**review_data, "id": doc_ref.id}

    def get_all_by_professional(self, profissional_uid: str) -> List[dict]:
        """Retorna todas as reviews de um profissional"""
        docs = self._get_reviews_subcollection(profissional_uid) \
            .order_by("created_at", direction=firestore.Query.DESCENDING) \
            .stream()

        reviews = []
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id
            reviews.append(data)
        return reviews


review_repo = ReviewRepository()
