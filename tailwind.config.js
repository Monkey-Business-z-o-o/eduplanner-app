/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',  // Definicja animacji
      },
      keyframes: {
        'gradient': {
          '0%': { 'background-position': '0% center' },   // Początkowa pozycja
          '100%': { 'background-position': '200% center' }, // Końcowa pozycja
        }
      },
      colors: {
        'gradient-from': '#ff7e5f',  // Kolor początkowy gradientu
        'gradient-to': '#feb47b',    // Kolor końcowy gradientu
      }
    },
  },
  plugins: [],
};
