# --- Etap 1: Budowanie aplikacji ---
FROM node:18-slim AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . . 
RUN npm run build   # Generowanie aplikacji w folderze `build`

# --- Etap 2: Uruchamianie aplikacji ---
FROM node:18-slim

WORKDIR /app

# Kopiowanie z etapu budowy
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "build/index.js"] # Uruchomienie aplikacji
