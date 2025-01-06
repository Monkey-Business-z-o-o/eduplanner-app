import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const eduplannetServerUrl = 'http://localhost:8081'

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
				target: eduplannetServerUrl,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/demo-data/, '/demo-data')
			},
			'/timetables': {
				target: eduplannetServerUrl,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/timetables/, '/timetables')
			},
			'/account/login': {
				target: eduplannetServerUrl,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/account\/login/, '/account/login')
			},
			'/account/signup': {
				target: eduplannetServerUrl,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/account\/signup/, '/account/signup')
			},
			'/account/logout': {
				target: eduplannetServerUrl,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/account\/logout/, '/account/logout')
			},
			'/account/login?error': {
				target: eduplannetServerUrl,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/account\/login\?error/, '/account/login?error')
			},
			'^/css/.*': {
				target: eduplannetServerUrl,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/css\//, '/css/')
			},
			'^/js/.*': {
				target: eduplannetServerUrl,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/js\//, '/js/')
			},
			'^/img/.*': {
				target: eduplannetServerUrl,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/img\//, '/img/')
			}
		}
	}
});
