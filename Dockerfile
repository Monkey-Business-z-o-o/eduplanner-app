# --- Etap 1: Budowanie frontendu ---
FROM node:18 AS frontend-build

# Ustaw katalog roboczy
WORKDIR /frontend

# Skopiuj pliki frontendu (package.json, pnpm-lock.yaml itd.)
COPY frontend/package*.json ./

# Zainstaluj zależności frontendu
RUN npm install

# Skopiuj cały kod frontendu i zbuduj aplikację
COPY frontend ./
RUN npm run build

# --- Etap 2: Budowanie backendu ---
FROM openjdk:17-jdk-slim AS backend-build

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki Gradle i konfigurację backendu
COPY gradlew gradlew.bat build.gradle settings.gradle ./
COPY gradle ./gradle

# Skopiuj kod źródłowy backendu
COPY src ./src

# Skopiuj wygenerowane pliki frontendu do backendu (np. do folderu resources/static)
COPY --from=frontend-build /frontend/build ./src/main/resources/static

# Nadaj uprawnienia do gradlew
RUN chmod +x ./gradlew

# Zbuduj aplikację backendową (Spring Boot) bez testów
RUN ./gradlew build -x test --no-daemon

# --- Etap 3: Finalny obraz ---
FROM openjdk:17-jdk-slim

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj zbudowany plik JAR z etapu budowania backendu
COPY --from=backend-build /app/build/libs/EduPlanner-0.0.1-SNAPSHOT.jar ./app.jar

# Wystaw port aplikacji
EXPOSE 8081

# Uruchom aplikację Spring Boot
CMD ["java", "-jar", "app.jar"]
