# Faza budowania
FROM node:18-slim AS build

WORKDIR /app

# Instalacja zależności
COPY package*.json ./
RUN npm install

# Kopiowanie źródeł i budowanie aplikacji
COPY . .
RUN npm run build

# Faza uruchamiania
FROM node:18-slim AS runner

WORKDIR /app

# Kopiowanie tylko niezbędnych plików
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./

# Instalacja tylko produkcyjnych zależności
RUN npm ci --omit=dev

# Zmienne środowiskowe
ENV PORT=3000
ENV NODE_ENV=production

# Wystawienie portu
EXPOSE 3000

# Uruchamianie aplikacji w trybie podglądu
CMD ["npm", "run", "preview", "--", "--host"]