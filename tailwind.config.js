/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', 'media'], // support both .dark class and prefers-color-scheme
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // blue-600
        secondary: '#10B981', // green-500
        accent: '#F59E0B', // amber-500
        'gray-50': '#f9fafb',
        'gray-800': '#1f2937',
        placeholderGray: {
          400: '#9ca3af',
          500: '#6b7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },
      borderRadius: {
        lg: '0.75rem', // 12px
      },
      boxShadow: {
        lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
      },
      keyframes: {
        'logo-spin': {
          from: {transform: 'rotate(0deg)'},
          to: {transform: 'rotate(360deg)'},
        },
      },
      animation: {
        'logo-spin': 'logo-spin 20s linear infinite',
      },
    },
  },
  plugins: [],
};
