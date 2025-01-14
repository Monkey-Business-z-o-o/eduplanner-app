import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// Ładowanie zmiennych środowiskowych
dotenv.config();

// Pobranie zmiennej API_URL z pliku .env lub ustawienie domyślnej wartości
const API_URL = process.env.VITE_API_URL || 'http://localhost:8081';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    outDir: 'dist',  // Folder do którego zostanie zbudowany frontend
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    proxy: {
      '^/(timetables|lessons|demo-data|timeslots|rooms|profile).*': {
        target: API_URL,  // Użycie wartości z env
        changeOrigin: true,
        rewrite: (path) => path, // Dodatkowe ustawienie przekierowania ścieżek, jeśli potrzeba
      },
    },
  },
});
