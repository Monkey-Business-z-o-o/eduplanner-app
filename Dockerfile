# --- Etap 1: Build SvelteKit (z adapter-node) ---
FROM node:18-slim AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build   # Wygeneruje pliki w .svelte-kit/output (i package.json do uruchomienia serwera w Node)

# --- Etap 2: Uruchamianie node’owej aplikacji ---
FROM node:18-slim

WORKDIR /app

# Skopiuj pliki i node_modules z poprzedniego etapu
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/.svelte-kit ./.svelte-kit

# A jeśli adapter-node generuje coś w build/ (czasem tak bywa), wtedy:
# COPY --from=build /app/build ./build

# Opcjonalnie: zainstaluj PM2 albo inny proces manager, jeżeli potrzebujesz
# RUN npm install -g pm2
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Uruchamiasz node’owy serwer SvelteKit
CMD ["node", ".svelte-kit/output/server/index.js"]
