"""
Schemas para Métodos de Pagamento.
Focados na segurança e separação entre dados de entrada (sensíveis) e saída (tokenizados).
"""
from typing import Optional
from pydantic import BaseModel, field_validator, ValidationInfo
from app.schemas.enums import PaymentTypeEnum


class PaymentMethodBase(BaseModel):
    """Campos comuns de pagamento."""
    tipo: PaymentTypeEnum
    is_default: bool = False


class PaymentMethodCreate(PaymentMethodBase):
    """
    Input de pagamento. Contém dados sensíveis que JAMAIS devem ser salvos.
    """
    card_holder: Optional[str] = None
    card_number: Optional[str] = None
    card_expiry: Optional[str] = None
    card_cvv: Optional[str] = None
    pix_key: Optional[str] = None
    pix_key_type: Optional[str] = None
    billing_address: Optional[str] = None

    @field_validator('card_number')
    @classmethod
    def validate_card(cls, v_card, info: ValidationInfo):
        """Valida se o cartão tem o tamanho mínimo, apenas se o tipo for Cartão."""
        if info.data.get('tipo') in [PaymentTypeEnum.CREDIT_CARD, PaymentTypeEnum.DEBIT_CARD]:
            if not v_card or len(v_card) < 13:
                raise ValueError('Número de cartão inválido')
        return v_card


class PaymentMethodResponse(PaymentMethodBase):
    """
    Output de pagamento. Retorna apenas dados seguros (últimos 4 dígitos).
    """
    id: str
    last_four_digits: Optional[str] = None
    card_holder: Optional[str] = None
    card_expiry: Optional[str] = None
    pix_key: Optional[str] = None
    billing_address: Optional[str] = None
    gateway_token: str

    class Config:
        """Configuração Pydantic."""
        from_attributes = True
