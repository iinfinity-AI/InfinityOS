module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 2s ease-out both',
        'fade-in-up': 'fadeInUp 2.5s ease-out both',
        'slide-in-down': 'slideInDown 2.5s ease-out both',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        fadeInUp: {
          from: { opacity: 0, transform: 'translateY(40px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        slideInDown: {
          from: { opacity: 0, transform: 'translateY(-40px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [],
};
