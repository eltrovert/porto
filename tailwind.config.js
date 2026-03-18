/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.templ",
    "./templates/**/*_templ.go",
    "./templates/**/*.html",
    "./internal/**/*.go",
    "./static/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Main theme colors
        dark: '#050505',      // Main background
        darker: '#0A0A0A',    // Cards/navbar background
        darkest: '#0f0f0f',   // Visual containers
        accent: '#ffcf0d',    // Primary accent color
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        // Fade in up animation for scroll triggers
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-up-delay': 'fadeInUp 0.6s ease-out 0.2s forwards',
        'fade-in-up-delay-2': 'fadeInUp 0.6s ease-out 0.4s forwards',

        // Float animation for floating cards
        'float-slow': 'float 6s ease-in-out infinite',
        'float-slower': 'float 8s ease-in-out infinite',

        // Scan animation for card visuals
        'scan': 'scan 2s ease-in-out infinite',

        // Shimmer effect
        'shimmer': 'shimmer 2s linear infinite',

        // Typing animation
        'typing': 'typing 3s steps(40) infinite',

        // Comet animation for orbital tracks
        'comet': 'comet 8s linear infinite',
        'comet-reverse': 'comet 12s linear infinite reverse',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        },
        scan: {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(100%)'
          }
        },
        shimmer: {
          '0%': {
            backgroundPosition: '200% 0'
          },
          '100%': {
            backgroundPosition: '-200% 0'
          }
        },
        typing: {
          '0%, 100%': {
            width: '0'
          },
          '50%': {
            width: '100%'
          }
        },
        comet: {
          '0%': {
            transform: 'rotate(0deg) translateX(50px) rotate(0deg)',
            opacity: '0'
          },
          '10%': {
            opacity: '1'
          },
          '90%': {
            opacity: '1'
          },
          '100%': {
            transform: 'rotate(360deg) translateX(50px) rotate(-360deg)',
            opacity: '0'
          }
        }
      },
      backdropBlur: {
        'xl': '20px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}