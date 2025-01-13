import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

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
        target: 'http://backend:8081',
        changeOrigin: true,
        rewrite: (path) => path,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            proxyRes.setHeader('Access-Control-Allow-Origin', '*');
          });
        }
      }
    },
  },
});
