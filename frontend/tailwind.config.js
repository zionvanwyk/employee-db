export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#001744',
          highlight: '#001E59' // Add missing #
        },
        red: {
          DEFAULT: '#CE1443'
        },
        gray: {
          DEFAULT: '#EBEBEB'
        }
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif']
      }
    }
  },
  plugins: []
}
