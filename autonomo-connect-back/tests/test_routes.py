from fastapi.testclient import TestClient
from unittest.mock import patch
from app.main import app

client = TestClient(app)

# Dados para envio
PAYLOAD = {
    "nome": "João API",
    "slug": "joao-api",
    "categoria": "pintura",
    "profissao": "Pintor",
    "precoHora": 50.0,
    "isPremium": True
}


@patch("app.services.profissional_service.create_profissional")
def test_post_profissional_sucesso(mock_create):
    """Testa criação bem-sucedida (Status 201)."""
    # Simula retorno do service
    mock_create.return_value = {
        **PAYLOAD,
        "id": "firebase_id_123",
        "rating": 0.0,
        "reviews": 0,
        "avatar": "https://github.com/shadcn.png"
    }

    response = client.post("/profissionais/", json=PAYLOAD)

    assert response.status_code == 201
    data = response.json()
    assert data["id"] == "firebase_id_123"
    assert data["slug"] == "joao-api"


@patch("app.services.profissional_service.create_profissional")
def test_post_profissional_erro_slug(mock_create):
    """Testa erro de negócio (Status 400) quando slug duplica."""
    # Simula o service lançando erro
    mock_create.side_effect = ValueError("Slug duplicado")

    response = client.post("/profissionais/", json=PAYLOAD)

    assert response.status_code == 400
    assert response.json()["detail"] == "Slug duplicado"


@patch("app.services.profissional_service.get_profissional_by_slug")
def test_get_profissional_nao_encontrado(mock_get):
    """Testa busca por ID inexistente (Status 404)."""
    mock_get.return_value = None

    response = client.get("/profissionais/nao-existe")

    assert response.status_code == 404
    assert response.json()["detail"] == "Profissional não encontrado"
