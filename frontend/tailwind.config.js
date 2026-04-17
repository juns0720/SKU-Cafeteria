/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D94148',
        'primary-dark': '#B93540',
        'primary-light': '#FDEAEB',
        star: '#FBBF24',
        surface: '#F8F8F8',
        success: '#22C55E',
        error: '#D94148',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
