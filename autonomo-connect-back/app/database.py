"""
Configuração do Banco de Dados (Firestore).
Suporta leitura de arquivo local (Dev) ou variável de ambiente JSON (Prod/Render).
"""
import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

# Pega o caminho do arquivo (Padrão Dev)
CRED_PATH = "serviceAccountKey.json"
# Pega o conteúdo JSON direto da variável (Padrão Prod/Render)
CRED_JSON = os.getenv("FIREBASE_CREDENTIALS_JSON")


def initialize_firebase():
    """Inicializa o App do Firebase."""
    if not firebase_admin._apps:
        try:
            cred = None

            # 1. Tenta carregar via Variável de Ambiente (Prioridade em Produção)
            if CRED_JSON:
                # Converte a string JSON em dicionário
                cred_dict = json.loads(CRED_JSON)
                cred = credentials.Certificate(cred_dict)
                print("🔥 Firebase carregado via Variável de Ambiente!")

            # 2. Se não, tenta carregar via Arquivo (Prioridade Local)
            elif os.path.exists(CRED_PATH):
                cred = credentials.Certificate(CRED_PATH)
                print("🔥 Firebase carregado via Arquivo Local!")

            else:
                print("⚠️ Nenhuma credencial do Firebase encontrada.")
                return

            firebase_admin.initialize_app(cred)

        except Exception as error:  # pylint: disable=broad-exception-caught
            print(f"❌ Erro crítico no Firebase: {error}")


def get_db():
    """Retorna o cliente do Firestore."""
    return firestore.client()
