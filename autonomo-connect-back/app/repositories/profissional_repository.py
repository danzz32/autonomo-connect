"""
Camada de Repositório para Profissionais.
Responsável pelo acesso direto ao banco de dados (Firestore).
"""
from typing import List, Optional
from app.database import get_db
from google.cloud import firestore


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

    def update_stats_after_review(self, uid: str, new_rating: int):
        """
        Complexo: Atualiza a contagem total e recalcula a média de estrelas.
        Idealmente isso seria uma "Transaction" do Firestore ou Cloud Function,
        mas faremos uma abordagem simplificada para o MVP.
        """
        doc_ref = self._get_collection().document(uid)
        doc = doc_ref.get()
        if not doc.exists: return

        data = doc.to_dict()
        current_reviews_count = data.get("reviews", 0)
        current_rating_avg = data.get("rating", 0.0)

        # Cálculo da nova média ponderada
        # (Média Atual * Qtd Atual) + Nova Nota / (Qtd Atual + 1)
        new_count = current_reviews_count + 1
        new_average = ((current_rating_avg * current_reviews_count) + new_rating) / new_count

        # Arredonda para 1 casa decimal
        new_average = round(new_average, 1)

        doc_ref.update({
            "reviews": new_count,
            "rating": new_average
        })


# Instância Singleton para injeção de dependência
profissional_repo = ProfissionalRepository()
