const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'uhbee-regular': ['var(--uhbee-regular)'],
        'uhbee-bold': ['var(--uhbee-bold)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        normal: {
          colors: {
            background: '#000000',
            foreground: '#ffffff',
            primary: '#4944FF',
            secondary: '#facc15',
            success: '#3A37AE',
          },
        },
      },
    }),
  ],
};
