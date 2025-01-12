import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    outDir: 'dist', // Folder, do którego zostanie zbudowany frontend
    emptyOutDir: true, // Czy wyczyścić folder outDir przed zbudowaniem
  },
  server: {
    host: '0.0.0.0', // Nasłuchiwanie na wszystkich interfejsach sieciowych
    port: 3000, // Port, na którym będzie uruchomiony frontend
    proxy: {
      // Przekierowanie wszystkich endpointów na backend
      '^/(timetables|lessons|demo-data|timeslots|rooms|profile).*': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
