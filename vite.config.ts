import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    outDir: 'dist', // Domyślny katalog wyjściowy
    emptyOutDir: true, // Czyści katalog `dist` przed budową
  },
  server: {
    port: 3000, // Frontend na porcie 3000
    proxy: {
      '/demo-data': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/demo-data/, '/demo-data'),
      },
      '/timetables': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/timetables/, '/timetables'),
      },
    },
  },
});
