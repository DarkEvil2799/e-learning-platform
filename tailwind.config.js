module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',  
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E4E3F4',
          200: '#CBC8EA',
          300: '#9A97C1',
          400: '#626084',
          500: '#212032',
          600: '#18172B',
          700: '#111024',
          800: '#0A0A1D',
          900: '#060618'
        },
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
