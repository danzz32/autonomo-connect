from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from firebase_admin import auth
from app.main import app

client = TestClient(app)

# Dados de exemplo para o cadastro
PAYLOAD = {
    "nome": "Hacker do Bem",
    "slug": "hacker-bem",
    "categoria": "TI",
    "profissao": "Pentester",
    "precoHora": 200.0,
    "isPremium": True
}


def test_criar_sem_token_falha():
    """
    Cenário 1: Tentar criar sem enviar o Header Authorization.
    Esperado: 401 Unauthorized.
    """
    response = client.post("/profissionais/", json=PAYLOAD)

    assert response.status_code == 401
    assert response.json()["detail"] == "Token de autenticação não fornecido"


def test_criar_token_invalido_falha():
    """
    Cenário 2: Enviar um token que o Firebase considera inválido.
    Esperado: 403 Forbidden.
    """
    # Simulamos que o verify_id_token lança um erro de token inválido
    with patch("app.utils.security.auth.verify_id_token") as mock_verify:
        mock_verify.side_effect = auth.InvalidIdTokenError("Token inválido")

        response = client.post(
            "/profissionais/",
            json=PAYLOAD,
            headers={"Authorization": "Bearer token_falso_123"}
        )

        assert response.status_code == 403
        assert response.json()["detail"] == "Token inválido."


def test_criar_token_expirado_falha():
    """
    Cenário 3: Enviar um token que já venceu.
    Esperado: 401 Unauthorized.
    """
    with patch("app.utils.security.auth.verify_id_token") as mock_verify:
        mock_verify.side_effect = auth.ExpiredIdTokenError("Token expirado", None)

        response = client.post(
            "/profissionais/",
            json=PAYLOAD,
            headers={"Authorization": "Bearer token_vencido"}
        )

        assert response.status_code == 401
        assert "Token expirado" in response.json()["detail"]


def test_criar_token_valido_sucesso():
    """
    Cenário 4: Token válido.
    Esperado: 201 Created (sucesso).
    Nota: Também mockamos o service de criação para não gravar no banco de verdade.
    """
    # Mock da Auth (Sucesso)
    with patch("app.utils.security.auth.verify_id_token") as mock_verify:
        mock_verify.return_value = {"uid": "user_123", "email": "teste@email.com"}

        # Mock do Service (Sucesso na criação)
        with patch("app.services.profissional_service.create_profissional") as mock_service:
            mock_service.return_value = {**PAYLOAD, "id": "novo_id_123", "rating": 0, "reviews": 0}

            response = client.post(
                "/profissionais/",
                json=PAYLOAD,
                headers={"Authorization": "Bearer token_super_valido"}
            )

            assert response.status_code == 201
            assert response.json()["id"] == "novo_id_123"

            # Verifica se o service foi chamado (significa que passou pela barreira de segurança)
            mock_service.assert_called_once()
