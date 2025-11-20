"""
Arquivo principal da aplicação FastAPI.
Responsável por inicializar o app, middlewares e incluir as rotas.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv  # <--- Adicione isso
import os

# 1. Carrega variáveis do arquivo .env (se existir)
load_dotenv()

from app.database import initialize_firebase
from app.routers import profissional

# 1. Inicializa a conexão com o banco
initialize_firebase()

app = FastAPI(title="Autonomo Connect API")

# 2. Configuração de Segurança (CORS)
origins = [
    "http://localhost:5173",  # Vite Local
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Registro das Rotas
app.include_router(profissional.router)


@app.get("/")
def root():
    """
    Rota de verificação de saúde da API (Health Check).
    """
    return {"message": "API Autonomo Connect Online 🚀"}
