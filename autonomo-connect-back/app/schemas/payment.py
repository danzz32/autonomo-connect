from pydantic import BaseModel, Field, field_validator
from typing import Optional
from app.schemas.enums import PaymentTypeEnum


# Base comum a todos
class PaymentMethodBase(BaseModel):
    tipo: PaymentTypeEnum
    is_default: bool = False


# O que o Frontend envia (Input)
class PaymentMethodCreate(PaymentMethodBase):
    # Dados para Cartão
    card_holder: Optional[str] = None
    card_number: Optional[str] = None  # Front manda completo, mas não salvamos
    card_expiry: Optional[str] = None  # MM/YY
    card_cvv: Optional[str] = None  # Nunca salvaremos

    # Dados para Pix
    pix_key: Optional[str] = None
    pix_key_type: Optional[str] = None  # CPF, Email, Random

    # Dados para Boleto (Endereço de cobrança)
    billing_address: Optional[str] = None

    @field_validator('card_number')
    @classmethod
    def validate_card(cls, v, values):
        # Validação simples se for cartão
        if values.data.get('tipo') in [PaymentTypeEnum.CREDIT_CARD, PaymentTypeEnum.DEBIT_CARD]:
            if not v or len(v) < 13:
                raise ValueError('Número de cartão inválido')
        return v


# O que o Backend devolve (Output - Seguro)
class PaymentMethodResponse(PaymentMethodBase):
    id: str
    # Para cartão, só mostramos o final
    last_four_digits: Optional[str] = None
    card_holder: Optional[str] = None
    card_expiry: Optional[str] = None

    # Pix e Boleto
    pix_key: Optional[str] = None
    billing_address: Optional[str] = None

    # Token "falso" do gateway
    gateway_token: str

    class Config:
        from_attributes = True
