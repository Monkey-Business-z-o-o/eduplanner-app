# --- Etap 1: Budowanie aplikacji ---
FROM node:18-slim AS build

WORKDIR /app

# Kopiowanie tylko package.json i package-lock.json na początek (dla cache npm install)
COPY package*.json ./

# Instalacja zależności
RUN npm install
RUN npm install --save-dev @types/node
RUN npm install dotenv @types/dotenv

# Kopiowanie wszystkich plików projektu do obrazu
COPY . .

# Budowanie aplikacji (wynik znajdzie się w folderze `build`)
RUN npm run build

# --- Etap 2: Uruchamianie aplikacji ---
FROM node:18-slim

WORKDIR /app

# Kopiowanie całego katalogu `/app` z etapu budowy
COPY --from=build /app /app

# Kopiowanie pliku .env (jeśli jest wymagany)
COPY .env .env

# Otwieramy port aplikacji
EXPOSE 3000

# Uruchamiamy serwer aplikacji
CMD ["node", "build/index.js"]