"""
Camada de Serviço (Business Logic) para avaliações.
Intermedia a comunicação entre a API (Router) e o Banco (Repository).
"""
from app.schemas.review import ReviewCreate
from app.repositories.review_repository import review_repo
from app.repositories.profissional_repository import profissional_repo
from app.repositories.user_repository import user_repo


def create_review(slug: str, review_data: ReviewCreate, client_uid: str):
    """
    Cria uma nova avaliação relacionada a um profissional
    :param slug:
    :param review_data:
    :param client_uid:
    :return:
    """
    # 1. Achar o profissional pelo slug para pegar o UID dele
    prof_data = profissional_repo.find_by_slug(slug)
    if not prof_data:
        raise Exception("Profissional não encontrado")
    prof_uid = prof_data["id"]

    # 2. Impedir que o profissional se autoavalie
    if prof_uid == client_uid:
        raise Exception("Você não pode avaliar a si mesmo.")

    # 3. Pegar dados do cliente (para salvar o nome na review)
    client_data = user_repo.get_by_id(client_uid)
    client_nome = client_data.get("nome", "Cliente Anônimo") if client_data else "Cliente"

    # 4. Preparar dados da review
    review_dict = review_data.model_dump()
    review_dict["client_id"] = client_uid
    review_dict["client_nome"] = client_nome

    # 5. Salvar review na subcoleção
    new_review = review_repo.add_review(prof_uid, review_dict)

    # 6. Atualizar estatísticas no documento principal do profissional
    # (Isso poderia ser assíncrono no futuro)
    profissional_repo.update_stats_after_review(prof_uid, review_data.rating)

    return new_review


def list_reviews(slug: str):
    prof_data = profissional_repo.find_by_slug(slug)
    if not prof_data: return []
    return review_repo.get_all_by_professional(prof_data["id"])
