# --- Etap 1: Budowanie aplikacji ---
FROM node:18-slim AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  # Generuje folder build/

# --- Etap 2: Uruchamianie aplikacji (prod-like) ---
FROM node:18-slim

WORKDIR /app
COPY --from=build /app /app

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
ONBUILD CMD ["node", "build/index.js"]
