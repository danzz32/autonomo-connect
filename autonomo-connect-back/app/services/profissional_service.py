"""
Camada de Serviço (Business Logic) para Profissionais.
Intermedia a comunicação entre a API (Router) e o Banco (Repository).
"""
from app.schemas.profissional import ProfissionalCreate
from app.repositories.profissional_repository import profissional_repo


def create_profissional(data: ProfissionalCreate):
    """
    Aplica regras de negócio para criar um novo profissional.
    - Inicializa rating e reviews como zero.
    - Verifica duplicidade de slug.
    """
    # 1. Converte o objeto Pydantic para dicionário Python
    novo_prof = data.model_dump()

    # 2. Regra de Negócio: cada novo profissional começa zerado
    novo_prof["rating"] = 0.0
    novo_prof["reviews"] = 0

    # 3. Regra de Negócio: Verificar se slug já existe
    if profissional_repo.find_by_slug(novo_prof["slug"]):
        raise ValueError("Já existe um profissional com este slug.")

    # 4. Persistência
    return profissional_repo.create(novo_prof)


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
