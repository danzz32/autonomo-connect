"""
Utilitários de segurança e autenticação via Firebase ID Token.
"""
from typing import Optional
from fastapi import Security, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth

# Define que a rota espera um cabeçalho 'Authorization: Bearer ...'
security_scheme = HTTPBearer(auto_error=False)


def verify_firebase_token(res: Optional[HTTPAuthorizationCredentials] = Security(security_scheme)) -> dict:
    """
    Verifica a validade do Firebase ID Token enviado no header Authorization.
    Retorna o payload do usuário (dict) se válido.
    """
    if not res or not res.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de autenticação não fornecido",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = res.credentials

    try:
        # Verifica a assinatura e validade do token diretamente com o Firebase Admin
        decoded_token = auth.verify_id_token(token)

        # Retorna os dados do usuário (uid, email, etc) para ser usado na rota
        return decoded_token

    except auth.ExpiredIdTokenError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expirado. Faça login novamente.",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    except auth.InvalidIdTokenError as exc:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Token inválido.",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro ao processar autenticação."
        ) from exc
