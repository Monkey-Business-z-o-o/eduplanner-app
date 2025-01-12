# --- Etap 1: Budowanie aplikacji ---
FROM node:18-slim AS build

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki zależności projektu
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj cały kod projektu do obrazu
COPY . .

# Zbuduj aplikację (zakładam, że `npm run build` generuje folder "dist")
RUN npm run build

# --- Etap 2: Serwowanie aplikacji ---
FROM node:18-slim

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj zbudowane pliki z poprzedniego etapu
COPY --from=build /app/dist ./dist

# Wystaw port aplikacji
EXPOSE 3000

# Instalacja serwera "serve" do obsługi statycznych plików
RUN npm install -g serve

# Komenda do serwowania aplikacji
CMD ["serve", "-s", "dist", "-l", "3000"]
