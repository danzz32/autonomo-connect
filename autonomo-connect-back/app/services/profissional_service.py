"""
Camada de Serviço (Business Logic) para Profissionais.
Intermedia a comunicação entre a API (Router) e o Banco (Repository).
"""
from app.schemas.profissional import ProfissionalCreate
from app.repositories.profissional_repository import profissional_repo
from app.utils.common import generate_slug


def create_profissional(data: ProfissionalCreate, uid: str):
    """
    Aplica regras de negócio para criar um novo profissional.
    - Inicializa rating e reviews como zero.
    - Verifica duplicidade de slug.
    """
    novo_prof = data.model_dump(mode='json')

    novo_prof["rating"] = 0.0
    novo_prof["reviews"] = 0

    sufixo = uid[-6:]
    novo_prof["slug"] = generate_slug(novo_prof["nome"], sufixo)
    return profissional_repo.create_with_custom_id(uid, novo_prof)


def list_profissionais():
    """
    Retorna a lista de todos os profissionais cadastrados.
    """
    return profissional_repo.list_all()


def get_profissional_by_slug(slug: str):
    """
    Busca os detalhes de um profissional pelo slug.
    """
    return profissional_repo.find_by_slug(slug)
