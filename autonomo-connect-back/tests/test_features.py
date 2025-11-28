"""Testes de integração para Avaliações e Portfólio."""
from datetime import datetime
from unittest.mock import patch
from fastapi.testclient import TestClient
import pytest
from app.main import app
from app.utils.security import verify_firebase_token

client = TestClient(app)


def mock_auth_client():
    return {"uid": "client_123", "email": "c@t.com", "role": "client"}


def mock_auth_prof():
    return {"uid": "prof_123", "email": "p@t.com", "role": "professional"}


@patch("app.services.review_service.create_review")
def test_criar_review_sucesso(mock_service):
    """Teste de rota de review."""
    app.dependency_overrides[verify_firebase_token] = mock_auth_client

    payload = {"rating": 5, "comentario": "Top!"}
    mock_service.return_value = {
        **payload, "id": "1", "client_id": "c", "client_nome": "C",
        "created_at": datetime.utcnow()
    }

    response = client.post("/profissionais/pedro/reviews", json=payload)
    assert response.status_code == 201
    app.dependency_overrides = {}


@patch("app.services.profissional_service.update_portfolio")
def test_atualizar_portfolio_limite(mock_update):
    """Teste de limite de imagens."""
    app.dependency_overrides[verify_firebase_token] = mock_auth_prof

    urls = [f"http://img.com/{i}.jpg" for i in range(7)]
    response = client.patch("/profissionais/me/portfolio", json={"portfolio": urls})

    assert response.status_code == 422
    app.dependency_overrides = {}
