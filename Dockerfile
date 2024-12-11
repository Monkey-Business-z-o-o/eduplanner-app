# Użyj obrazu z Node.js do budowania frontendu
FROM node:16

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki projektu
COPY . .

# Zainstaluj zależności
RUN npm install

# Zbuduj frontend
RUN npm run build

# Ustaw port dla aplikacji
EXPOSE 3000

# Uruchom serwer aplikacji
CMD ["npm", "start"]
