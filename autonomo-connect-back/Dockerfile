FROM python:3.13-slim

WORKDIR /app

# Copia dependências e instala
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código todo (incluindo a chave json)
COPY . .

# Expõe a porta 8000
EXPOSE 8000

# Comando para rodar a API
# O reload é útil em dev, mas em prod removemos
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]