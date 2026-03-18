/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Custom fonts
      fontFamily: {
        versatylo: ['Versatylo Rounded', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        sans: ['Versatylo Rounded', 'sans-serif'], // Set Outfit as default sans
      },

      // Custom colors
      colors: {
        primary: '#6549D5',
        secondary: {
          DEFAULT: '#E33FA1',
          2: '#FB5343',
        },
        neutral: '#0F0F11',
        white: '#FFFFFF',
        background: '#060606',
        text: {
          DEFAULT: '#ACACAC',
          title: '#FFFFFF', // Will be overridden by gradient
        },
        border: '#FFFFFF',
      },

      // Custom gradient for titles
      backgroundImage: {
        'gradient-title': 'linear-gradient(135deg, #6549D5, #E33FA1, #FB5343)',
      },

      // Animation for gradient text
      animation: {
        gradient: 'gradient 8s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
}
