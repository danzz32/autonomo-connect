import pytest
from unittest.mock import patch, MagicMock
from app.services import payment_service
from app.schemas.payment import PaymentMethodCreate
from app.schemas.enums import PaymentTypeEnum

# Dados simulados de entrada (O que o Front envia)
CARTAO_INPUT = PaymentMethodCreate(
    tipo=PaymentTypeEnum.CREDIT_CARD,
    is_default=True,
    card_holder="JOAO DA SILVA",
    card_number="4111111111111234",  # Cartão completo
    card_expiry="12/30",
    card_cvv="123"
)


@patch("app.services.payment_service.payment_repo")
def test_adicionar_cartao_seguranca(mock_repo):
    """
    UNITÁRIO: Garante que o service DESCARTA o número do cartão e CVV
    antes de chamar o repositório.
    """
    uid_usuario = "user_123"

    # Configura o mock para retornar sucesso
    mock_repo.create.return_value = {"id": "pay_123", "gateway_token": "tok_fake"}

    # Executa o serviço
    payment_service.add_payment_method(uid_usuario, CARTAO_INPUT)

    # VERIFICAÇÃO CRÍTICA DE SEGURANÇA
    # Capturamos os argumentos que o service passou para o repo.create
    args, _ = mock_repo.create.call_args
    uid_chamado, dados_salvos = args

    assert uid_chamado == uid_usuario

    # 1. Garante que gerou um token
    assert "gateway_token" in dados_salvos
    assert dados_salvos["gateway_token"].startswith("tok_")

    # 2. Garante que salvou os 4 últimos dígitos
    assert dados_salvos["last_four_digits"] == "1234"

    # 3. GARANTE QUE NÃO SALVOU DADOS SENSÍVEIS
    assert "card_number" not in dados_salvos
    assert "card_cvv" not in dados_salvos


@patch("app.services.payment_service.payment_repo")
def test_adicionar_pix(mock_repo):
    """
    UNITÁRIO: Testa fluxo de PIX (que não tem tokenização de cartão).
    """
    input_pix = PaymentMethodCreate(
        tipo=PaymentTypeEnum.PIX,
        pix_key="123.456.789-00",
        pix_key_type="cpf"
    )

    payment_service.add_payment_method("user_123", input_pix)

    # Verifica se salvou a chave pix
    args, _ = mock_repo.create.call_args
    dados_salvos = args[1]

    assert dados_salvos["pix_key"] == "123.456.789-00"
    assert dados_salvos["gateway_token"] is not None  # Mesmo pix gera um ID de transação simulado
