module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A59',
        secondary: '#FFD8A9',
        secondary_dark: '#301E18',
        bg: '#1A1410',
        surface: '#241C17',
        text: {
          primary: '#FDF8F3',
          secondary: '#DCCFC2',
        },
        accent: '#FF9E7D',
      },
    }
  },
  plugins: [],
}
