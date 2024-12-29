import adapter from '@sveltejs/adapter-node'; // Zmieniono adapter na Node
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            out: 'build', // Określ katalog wyjściowy
            precompress: false, // Opcjonalnie: włącza kompresję plików
            envPrefix: 'SVELTE_' // Opcjonalnie: prefiks dla zmiennych środowiskowych
        }),
        csrf: {
            checkOrigin: true // Opcjonalnie: zabezpieczenie przed CSRF
        }
    }
};

export default config;
