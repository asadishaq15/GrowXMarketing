export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#034365',
          mid: '#467C9E',
          light: '#72B9CA',
          50: '#e8f4f8',
          100: '#d1e9f1',
          200: '#a3d3e3',
          300: '#72B9CA',
          400: '#5a9db4',
          500: '#467C9E',
          600: '#034365',
          700: '#023556',
          800: '#022a47',
          900: '#011e38',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};