import uuid
from app.schemas.payment import PaymentMethodCreate
from app.schemas.enums import PaymentTypeEnum
from app.repositories.payment_repository import payment_repo


def add_payment_method(uid: str, data: PaymentMethodCreate):
    # 1. Converte para dict
    raw_data = data.model_dump()

    # Dados que serão salvos (Safe Data)
    safe_data = {
        "tipo": raw_data["tipo"],
        "is_default": raw_data["is_default"],
        # Simulando que o Gateway (Stripe) nos deu esse ID
        "gateway_token": f"tok_{uuid.uuid4()}"
    }

    # 2. Lógica específica por tipo
    if data.tipo in [PaymentTypeEnum.CREDIT_CARD, PaymentTypeEnum.DEBIT_CARD]:
        # Lógica de Segurança:
        # Extrair apenas os 4 últimos dígitos
        safe_data["last_four_digits"] = data.card_number[-4:]
        safe_data["card_holder"] = data.card_holder
        safe_data["card_expiry"] = data.card_expiry
        # O resto (numero completo e CVV) é DESCARTADO aqui e não vai pro banco

    elif data.tipo == PaymentTypeEnum.PIX:
        safe_data["pix_key"] = data.pix_key
        safe_data["pix_key_type"] = data.pix_key_type

    elif data.tipo == PaymentTypeEnum.BOLETO:
        safe_data["billing_address"] = data.billing_address

    # 3. Salvar no banco
    return payment_repo.create(uid, safe_data)


def list_my_payment_methods(uid: str):
    return payment_repo.list_all(uid)
