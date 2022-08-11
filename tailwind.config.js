/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
      },
      textColor: {
        primary: 'var(--color-text-primary)',
        input: 'var(--color-text-input)',
      },
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      boxShadow: {
        custom: 'var(--box-shadow)',
      },
    },
  },
  plugins: [],
};
