const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        normal: {
          colors: {
            primary: '#4944FF',
            background: '#000000',
          },
        },
      },
    }),
  ],
};
