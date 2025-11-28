from fastapi.testclient import TestClient
from unittest.mock import patch
from app.main import app
from app.utils.security import verify_firebase_token

client = TestClient(app)


# --- MOCK DE AUTENTICAÇÃO ---
# Função para sobrescrever a dependência de segurança
def mock_auth_client():
    return {"uid": "client_user_123", "email": "cliente@teste.com", "role": "client"}


def mock_auth_prof():
    return {"uid": "prof_user_123", "email": "prof@teste.com", "role": "professional"}


# ==========================================
# TESTES DE AVALIAÇÃO (REVIEWS)
# ==========================================

@patch("app.services.review_service.create_review")
def test_criar_review_sucesso(mock_service):
    """
    INTEGRAÇÃO: Cliente avaliando profissional com sucesso.
    """
    # Sobrescreve a segurança para fingir que é um CLIENTE logado
    app.dependency_overrides[verify_firebase_token] = mock_auth_client

    payload = {"rating": 5, "comentario": "Serviço excelente!"}

    # Mock do retorno do service
    mock_service.return_value = {**payload, "id": "review_123", "client_id": "client_user_123",
                                 "client_nome": "Cliente", "created_at": "2023-01-01"}

    response = client.post("/profissionais/pedro-pintor/reviews", json=payload)

    assert response.status_code == 201
    assert response.json()["rating"] == 5

    # Limpa override
    app.dependency_overrides = {}


def test_criar_review_nota_invalida():
    """
    INTEGRAÇÃO: Tentar enviar nota 6 (Schema Validation).
    Nem precisa de mock de service, o Pydantic barra antes.
    """
    app.dependency_overrides[verify_firebase_token] = mock_auth_client

    payload = {"rating": 6, "comentario": "Nota impossível"}  # Máximo é 5

    response = client.post("/profissionais/pedro-pintor/reviews", json=payload)

    assert response.status_code == 422  # Unprocessable Entity

    app.dependency_overrides = {}


@patch("app.repositories.profissional_repository.profissional_repo.find_by_slug")
def test_profissional_avaliando_a_si_mesmo(mock_find):
    """
    UNITÁRIO (Service): Testa a regra de negócio que impede autoavaliação.
    Estamos chamando o service diretamente aqui para testar a lógica de exceção.
    """
    from app.services import review_service
    from app.schemas.review import ReviewCreate

    # Simula que o slug "meu-perfil" pertence ao usuário "prof_user_123"
    mock_find.return_value = {"id": "prof_user_123", "nome": "Eu Mesmo"}

    review_data = ReviewCreate(rating=5)

    # Tenta criar review onde o autor (prof_user_123) é o dono do perfil (prof_user_123)
    import pytest
    with pytest.raises(Exception) as excinfo:
        review_service.create_review("meu-perfil", review_data, "prof_user_123")

    assert "Você não pode avaliar a si mesmo" in str(excinfo.value)


# ==========================================
# TESTES DE PORTFÓLIO
# ==========================================

@patch("app.services.profissional_service.update_portfolio")
def test_atualizar_portfolio_limite_excedido(mock_update):
    """
    INTEGRAÇÃO: Tentar enviar 7 imagens (Limite é 6).
    """
    app.dependency_overrides[verify_firebase_token] = mock_auth_prof

    # Gera lista com 7 URLs
    urls = [f"http://img.com/{i}.jpg" for i in range(7)]
    payload = {"portfolio": urls}

    response = client.patch("/profissionais/me/portfolio", json=payload)

    # Deve falhar na validação do Pydantic
    assert response.status_code == 422
    errors = response.json()["detail"]
    # Verifica se a mensagem de erro menciona o limite
    assert any("no máximo 6 imagens" in str(e) for e in errors)

    app.dependency_overrides = {}
