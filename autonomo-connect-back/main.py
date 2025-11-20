# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Autonomo Connect API")

# Configuração de CORS (Crucial para o Front falar com o Back)
origins = [
    "http://localhost:5173", # Vite Local
    "https://seu-projeto-vercel.app" # Futura URL Vercel
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em prod, restringir para 'origins'
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dados mocados iniciais (depois moveremos para o Firestore)
CATEGORIAS = [
    {"id": 1, "nome": "Pintura", "slug": "pintura", "icon": "paint-roller"},
    {"id": 2, "nome": "Carpintaria", "slug": "carpintaria", "icon": "hammer"},
    {"id": 3, "nome": "Marcenaria", "slug": "marcenaria", "icon": "armchair"},
    {"id": 4, "nome": "Doméstica", "slug": "domestica", "icon": "home"},
    {"id": 5, "nome": "Pequenos Reparos", "slug": "reparos", "icon": "wrench"},
]

@app.get("/")
def read_root():
    return {"message": "API Autonomo Connect Online"}

@app.get("/categorias")
def get_categorias():
    return CATEGORIAS