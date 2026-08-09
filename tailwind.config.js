/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Fraunces"', 'serif'],
        doodle: ['"Caveat"', 'cursive'],
      },
      colors: {
        primary: '#3B7A57',
        primaryHover: '#2E6146',
        secondary: '#FF7A5C',
        secondaryHover: '#F2653F',
        sun: '#F4B740',
        ink: '#241E19',
        cream: {
          DEFAULT: '#FBF4E9',
          50: '#FFFDF9',
          100: '#FBF4E9',
          200: '#F5EBD8',
          300: '#EDE0C6',
        },
        forest: {
          DEFAULT: '#1F3B2C',
          800: '#1F3B2C',
          900: '#16291F',
        },
        slate: {
          850: '#1e293b',
        },
      },
      animation: {
        blob: 'blob 7s infinite',
        sway: 'sway 4s ease-in-out infinite',
        blink: 'blink 5s ease-in-out infinite',
        'float-slow': 'floaty 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        },
        blink: {
          '0%, 92%, 100%': { transform: 'scaleY(1)' },
          '95%': { transform: 'scaleY(0.1)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
};
