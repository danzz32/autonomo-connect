"""
Regras de negócio para Avaliações.
"""
from app.schemas.review import ReviewCreate
from app.repositories.review_repository import review_repo
from app.repositories.profissional_repository import profissional_repo
from app.repositories.user_repository import user_repo


def create_review(slug: str, review_data: ReviewCreate, client_uid: str):
    """
    Cria avaliação e atualiza estatísticas do profissional.
    Impede autoavaliação.
    """
    prof_data = profissional_repo.find_by_slug(slug)
    if not prof_data:
        raise ValueError("Profissional não encontrado.")

    prof_uid = prof_data["id"]

    if prof_uid == client_uid:
        raise ValueError("Você não pode avaliar a si mesmo.")

    client_data = user_repo.get_by_id(client_uid)
    client_nome = client_data.get("nome", "Cliente") if client_data else "Cliente"

    review_dict = review_data.model_dump()
    review_dict["client_id"] = client_uid
    review_dict["client_nome"] = client_nome

    new_review = review_repo.add_review(prof_uid, review_dict)
    profissional_repo.update_stats_after_review(prof_uid, review_data.rating)

    return new_review


def list_reviews(slug: str):
    """Lista avaliações de um profissional."""
    prof_data = profissional_repo.find_by_slug(slug)
    if not prof_data:
        return None
    return review_repo.get_all_by_professional(prof_data["id"])
