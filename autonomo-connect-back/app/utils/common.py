import re
import unicodedata


def generate_slug(nome: str, uid_suffix: str) -> str:
    """
    Gera um slug URL-friendly.
    Ex: 'João da Silva' + '123ab' -> 'joao-da-silva-123ab'
    """
    # 1. Normaliza (remove acentos): João -> Joao
    nfkd_form = unicodedata.normalize('NFKD', nome)
    nome_sem_acento = "".join([c for c in nfkd_form if not unicodedata.combining(c)])

    # 2. Converte para minúsculo e substitui espaços por hífens
    slug_base = nome_sem_acento.lower().strip()

    # 3. Remove caracteres especiais (mantém apenas letras, números e hífens)
    slug_base = re.sub(r'[^a-z0-9\s-]', '', slug_base)
    slug_base = re.sub(r'[\s]+', '-', slug_base)

    # 4. Adiciona o sufixo único
    return f"{slug_base}-{uid_suffix}"
