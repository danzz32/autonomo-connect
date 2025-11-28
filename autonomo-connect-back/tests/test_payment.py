"""Testes de unidade para Pagamentos e Segurança."""
from unittest.mock import patch
from app.services import payment_service
from app.schemas.payment import PaymentMethodCreate
from app.schemas.enums import PaymentTypeEnum

# Número fictício de teste (Visa Test Gateway)
CARTAO_INPUT = PaymentMethodCreate(
    tipo=PaymentTypeEnum.CREDIT_CARD,
    is_default=True,
    card_holder="JOAO DA SILVA",
    card_number="4111111111111234",
    card_expiry="12/30",
    card_cvv="123"
)


@patch("app.services.payment_service.payment_repo")
def test_adicionar_cartao_seguranca(mock_repo):
    """Verifica se dados sensíveis são descartados."""
    uid_usuario = "user_123"
    mock_repo.create.return_value = {"id": "pay_123", "gateway_token": "tok_fake"}

    payment_service.add_payment_method(uid_usuario, CARTAO_INPUT)

    args, _ = mock_repo.create.call_args
    _, dados_salvos = args

    assert dados_salvos["last_four_digits"] == "1234"
    assert "card_number" not in dados_salvos
    assert "card_cvv" not in dados_salvos
