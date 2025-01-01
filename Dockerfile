# Faza budowania
FROM node:18-slim AS build

WORKDIR /app

# Instalacja zależności
COPY package*.json ./
RUN npm install
RUN npm install @sveltejs/adapter-node

# Kopiowanie źródeł i budowanie aplikacji
COPY . .
ARG OUTPUT_DIR=build # Dodajemy zmienną OUTPUT_DIR
RUN npm run build && mv dist $OUTPUT_DIR # Przenosimy wynik kompilacji

# Faza uruchamiania
FROM node:18-slim AS runner

WORKDIR /app

# Kopiowanie wyników kompilacji
COPY --from=build /app/$OUTPUT_DIR ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

# Wystawienie portu
EXPOSE 3000

# Uruchamianie aplikacji
CMD ["node", "build"]
