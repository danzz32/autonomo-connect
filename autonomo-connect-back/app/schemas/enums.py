from enum import Enum


class CategoriaEnum(str, Enum):
    """
    Categorias de serviços disponíveis na plataforma.
    O valor (str) deve bater com o que o Frontend envia.
    """
    PINTURA = "pintura"
    PEDREIRO = "pedreiro"
    MARCENARIA = "marcenaria"
    ELETRICA = "eletrica"
    FAXINA = "faxina"
    ENCANADOR = "encanador"
    # OUTROS = "outros"


class UserRoleEnum(str, Enum):
    """
    Define o tipo de usuário no sistema.
    """
    CLIENT = "client"  # Usuário comum que contrata
    PROFESSIONAL = "professional"  # Usuário que presta serviço
    ADMIN = "admin"  # (Opcional) Para gestão futura


class PlanoEnum(str, Enum):
    """
    Níveis de Assinatura (Ambos são pagos).
    """
    BASIC = "basic"  # Plano Pago Padrão (Acesso à plataforma)
    PREMIUM = "premium"  # Plano Pago Superior (Destaque + Prioridade)


class PaymentTypeEnum(str, Enum):
    CREDIT_CARD = "credit_card"
    DEBIT_CARD = "debit_card"
    PIX = "pix"
    BOLETO = "boleto"
