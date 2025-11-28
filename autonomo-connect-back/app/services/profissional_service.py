"""
Regras de negócio para Profissionais.
"""
from app.schemas.profissional import (
    ProfissionalCreate,
    PlanoEnum,
    ProfissionalPortfolioUpdate
)
from app.repositories.profissional_repository import profissional_repo
from app.utils.common import generate_slug


def create_profissional(data: ProfissionalCreate, uid: str):
    """Cria um novo profissional com valores padrão."""
    novo_prof = data.model_dump(mode='json')
    novo_prof["rating"] = 0.0
    novo_prof["reviews"] = 0

    # Padrão é plano BASIC
    if "plano" not in novo_prof:
        novo_prof["plano"] = PlanoEnum.BASIC.value

    sufixo = uid[-6:]
    novo_prof["slug"] = generate_slug(novo_prof["nome"], sufixo)

    return profissional_repo.create_with_custom_id(uid, novo_prof)


def update_plan(uid: str, novo_plano: PlanoEnum):
    """Atualiza o plano de assinatura."""
    return profissional_repo.update(uid, {"plano": novo_plano.value})


def update_portfolio(uid: str, data: ProfissionalPortfolioUpdate):
    """Atualiza a galeria de imagens."""
    portfolio_dict = data.model_dump(mode='json')
    return profissional_repo.update(uid, portfolio_dict)


def list_profissionais():
    """Lista todos os profissionais."""
    return profissional_repo.list_all()


def get_profissional_by_slug(slug: str):
    """Busca por slug."""
    return profissional_repo.find_by_slug(slug)
