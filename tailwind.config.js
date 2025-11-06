// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    // Se quiser que o Tailwind processe HTML gerado do blog também:
    './public/blog/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#235FAA',
      },
    },
  },
  plugins: [],
}
