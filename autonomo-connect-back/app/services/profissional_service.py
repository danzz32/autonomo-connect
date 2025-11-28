"""
Camada de Serviço (Business Logic) para Profissionais.
Intermedia a comunicação entre a API (Router) e o Banco (Repository).
"""
from app.schemas.profissional import ProfissionalCreate, PlanoEnum, ProfissionalPortfolioUpdate
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

    # Define o plano inicial como BASIC (o plano pago de entrada)
    # Se o frontend já mandar "PREMIUM" no cadastro (upsell imediato), respeitamos.
    if "plano" not in novo_prof:
        novo_prof["plano"] = PlanoEnum.BASIC.value

    sufixo = uid[-6:]
    novo_prof["slug"] = generate_slug(novo_prof["nome"], sufixo)

    return profissional_repo.create_with_custom_id(uid, novo_prof)


def update_plan(uid: str, novo_plano: PlanoEnum):
    """
    Permite transitar entre BASIC (Pago Nível 1) e PREMIUM (Pago Nível 2)
    """
    return profissional_repo.update(uid, {"plano": novo_plano.value})


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


def update_portfolio(uid: str, data: ProfissionalPortfolioUpdate):
    """Atualiza apenas a lista de URLs de imagens"""
    # O Pydantic já validou se são URLs e se são no máximo 6
    portfolio_dict = data.model_dump(mode='json')  # 'portfolio': ['url1', 'url2']
    return profissional_repo.update(uid, portfolio_dict)
