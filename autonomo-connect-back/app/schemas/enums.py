from enum import Enum


class CategoriaEnum(str, Enum):
    """
    Categorias de serviços disponíveis na plataforma.
    O valor (str) deve bater com o que o Frontend envia.
    """
    PINTURA = "pintura"
    CARPINTARIA = "carpintaria"
    MARCENARIA = "marcenaria"
    DOMESTICA = "domestica"
    ELETRICA = "eletrica"
    REPAROS = "reparos"
    # OUTROS = "outros"


class UserRoleEnum(str, Enum):
    """
    Define o tipo de usuário no sistema.
    """
    CLIENT = "client"  # Usuário comum que contrata
    PROFESSIONAL = "professional"  # Usuário que presta serviço
    ADMIN = "admin"  # (Opcional) Para gestão futura
