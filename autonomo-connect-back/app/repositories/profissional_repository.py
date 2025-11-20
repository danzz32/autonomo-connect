"""
Camada de Repositório para Profissionais.
Responsável pelo acesso direto ao banco de dados (Firestore).
"""
from typing import List, Optional
from app.database import get_db


class ProfissionalRepository:
    """
    Repositório que encapsula as operações de CRUD no Firestore
    para a coleção de profissionais.
    """

    def __init__(self):
        self.collection_name = "profissionais"

    def _get_collection(self):
        """Helper privado para obter a referência da coleção."""
        return get_db().collection(self.collection_name)

    def create(self, dados: dict) -> dict:
        """
        Cria um novo documento no Firestore.
        Retorna o dicionário salvo acrescido do ID gerado.
        """
        doc_ref = self._get_collection().document()
        doc_ref.set(dados)
        return {**dados, "id": doc_ref.id}

    def list_all(self) -> List[dict]:
        """
        Lista todos os documentos da coleção 'profissionais'.
        """
        docs = self._get_collection().stream()
        lista = []
        for doc in docs:
            dados = doc.to_dict()
            dados["id"] = doc.id
            lista.append(dados)
        return lista

    def find_by_slug(self, slug: str) -> Optional[dict]:
        """
        Busca um profissional específico pelo campo 'slug'.
        Retorna None se não encontrar.
        """
        query = self._get_collection().where("slug", "==", slug).limit(1).stream()
        for doc in query:
            dados = doc.to_dict()
            dados["id"] = doc.id
            return dados
        return None

    def create_with_custom_id(self, custom_id: str, dados: dict) -> dict:
        """
        Cria ou sobrescreve um documento com um ID específico (o UID do usuário).
        """
        doc_ref = self._get_collection().document(custom_id)
        doc_ref.set(dados)
        return {**dados, "id": custom_id}


# Instância Singleton para injeção de dependência
profissional_repo = ProfissionalRepository()
