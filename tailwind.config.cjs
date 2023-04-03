/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0079bf',
        lightblue: '#e4f0f6',
        appgray: '#f0f2f5',
        textgray: '#172b4d',
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
