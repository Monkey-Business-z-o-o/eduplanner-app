# Faza budowania
FROM node:18-slim AS build

WORKDIR /app

# Instalacja zależności
COPY package*.json ./
RUN npm install
RUN npm install @sveltejs/adapter-node

# Kopiowanie źródeł i budowanie aplikacji
COPY . .
RUN npm run build

# Faza uruchamiania
FROM node:18-slim AS runner

WORKDIR /app

# Kopiowanie wyników kompilacji
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

# Wystawienie portu
EXPOSE 3000

# Uruchamianie aplikacji
CMD ["node", "build"]
