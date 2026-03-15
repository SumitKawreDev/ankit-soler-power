import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#023d2a',
        'primary-dark': '#012a1d',
        'primary-light': '#034d35',
        secondary: '#FFFFFF',
        accent: '#f5a623',
        'accent-light': '#fbbf24',
        'gray-solar': '#f0f4f0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #023d2a 0%, #034d35 50%, #012a1d 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(2,61,42,0) 0%, rgba(2,61,42,0.9) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
