"""
Regras de negócio para Pagamentos.
"""
import uuid
from app.schemas.payment import PaymentMethodCreate
from app.schemas.enums import PaymentTypeEnum
from app.repositories.payment_repository import payment_repo


def add_payment_method(uid: str, data: PaymentMethodCreate):
    """
    Processa o metodo de pagamento.
    Gera token simulado e REMOVE dados sensíveis do cartão antes de salvar.
    """
    raw_data = data.model_dump()

    safe_data = {
        "tipo": raw_data["tipo"],
        "is_default": raw_data["is_default"],
        "gateway_token": f"tok_{uuid.uuid4()}"
    }

    if data.tipo in [PaymentTypeEnum.CREDIT_CARD, PaymentTypeEnum.DEBIT_CARD]:
        # SEGURANÇA: Salva apenas os 4 últimos dígitos
        safe_data["last_four_digits"] = data.card_number[-4:]
        safe_data["card_holder"] = data.card_holder
        safe_data["card_expiry"] = data.card_expiry

    elif data.tipo == PaymentTypeEnum.PIX:
        safe_data["pix_key"] = data.pix_key
        safe_data["pix_key_type"] = data.pix_key_type

    elif data.tipo == PaymentTypeEnum.BOLETO:
        safe_data["billing_address"] = data.billing_address

    return payment_repo.create(uid, safe_data)


def list_my_payment_methods(uid: str):
    """Lista métodos salvos."""
    return payment_repo.list_all(uid)
