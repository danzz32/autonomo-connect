# --- Estágio 1: Build (Construção) ---
FROM node:18-alpine AS build

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependência primeiro (aproveita o cache do Docker)
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install --frozen-lockfile

# Copia todo o resto do código fonte
COPY . .

# Gera a build de produção (cria a pasta /dist)
RUN yarn build

# --- Estágio 2: Production (Servidor Nginx) ---
FROM nginx:alpine

# Copia os arquivos compilados do estágio anterior para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia nossa configuração customizada do Nginx (veja passo 2 abaixo)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]