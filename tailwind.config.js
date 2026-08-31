/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Hubot Sans Variable', 'Hubot Sans', 'Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Source Code Pro', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tight: '-0.015em',
      },
      fontWeight: {
        extrabold: '750',
        black: '800',
      },
    },
  },
  plugins: [],
};
