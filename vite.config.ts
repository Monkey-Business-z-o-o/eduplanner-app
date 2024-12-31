import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3000, // Frontend na porcie 3000
		proxy: {
			'/demo-data': {
				target: 'http://localhost:8081', // Backend na porcie 8081
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/demo-data/, '/demo-data') // Zostawiamy ścieżkę bez zmian
			},
			'/timetables': {
				target: 'http://localhost:8081', // Backend na porcie 8081
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/timetables/, '/timetables') // Zostawiamy ścieżkę bez zmian
			}
		}
	}
});
