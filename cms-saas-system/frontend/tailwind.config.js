/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AQUI ESTÁ O SEGREDO: Usar 'var(...)' e não um código Hex fixo
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        background: 'var(--bg-color)',
      }
    },
  },
  plugins: [],
}