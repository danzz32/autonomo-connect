import pytest
from unittest.mock import MagicMock, patch
from app.services import profissional_service
from app.schemas.profissional import ProfissionalCreate

# Dados fictícios para usar nos testes
MOCK_DATA = {
    "nome": "Teste Unitário",
    "slug": "teste-unitario",
    "categoria": "TI",
    "profissao": "QA",
    "precoHora": 100.0,
    "isPremium": False
}


@patch("app.services.profissional_service.profissional_repo")
def test_criar_profissional_sucesso(mock_repo):
    """
    Testa se o service prepara os dados corretamente e chama o create do repo.
    """
    # Configura o Mock: find_by_slug deve retornar None (não existe ainda)
    mock_repo.find_by_slug.return_value = None

    # Configura o Mock: create deve retornar os dados com um ID fictício
    mock_repo.create.return_value = {**MOCK_DATA, "id": "123", "rating": 0.0, "reviews": 0}

    # Executa a função do service
    input_dto = ProfissionalCreate(**MOCK_DATA)
    resultado = profissional_service.create_profissional(input_dto)

    # Verificações (Asserts)
    assert resultado["id"] == "123"
    assert resultado["rating"] == 0.0  # Garante que a regra de zerar rating funcionou

    # Verifica se o service chamou o repositório corretamente
    mock_repo.create.assert_called_once()


@patch("app.services.profissional_service.profissional_repo")
def test_criar_profissional_slug_duplicado(mock_repo):
    """
    Testa se o service lança erro quando o slug já existe.
    """
    # Configura o Mock: find_by_slug retorna algo (já existe)
    mock_repo.find_by_slug.return_value = {"id": "999", "nome": "Já Existo"}

    input_dto = ProfissionalCreate(**MOCK_DATA)

    # Verifica se lança a exceção ValueError
    with pytest.raises(ValueError) as excinfo:
        profissional_service.create_profissional(input_dto)

    assert "Já existe um profissional com este slug" in str(excinfo.value)
    # Garante que o create NUNCA foi chamado
    mock_repo.create.assert_not_called()
