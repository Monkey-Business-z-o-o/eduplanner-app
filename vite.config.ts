import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '^/(timetables|lessons|demo-data|timeslots|rooms|profile).*': {
        target: 'https://backend.kebson.fun',
        changeOrigin: true,
        rewrite: (path) => path,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
          });
        }
      }
    },
  },
});
