/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{html,js,jsx}',
    './src/components/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        grey1: '#E6E6E6',
        grey2: '#B3B3B3',
        grey3: '#808080',
        grey4: '#4D4D4D',
        primary: '#00D282',
        'primary-light': '#5FF19C',
        'primary-hover': '#CAFCD6',
        secondary: '#5199FF',
        'secondary-light': '#96C9FF',
        black: '#222222',
        white: '#F7F8F9',
        bgColor: '#F7F8F9',
        success: '#FDF37B',
        negative: '#FF7F6E',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        // headings
        h1: ['32px', { fontWeight: '900' }],
        h2: ['26px', { fontWeight: '900' }],
        h3: ['20px', { fontWeight: '900' }],
        h4: ['16px', { fontWeight: '900' }],
        h5: ['10px', { fontWeight: '900' }],
        // UI text
        main: ['16px', { fontWeight: '400' }],
        'main-bold': ['16px', { fontWeight: '500' }],
        sub: ['14px', { fontWeight: '400' }],
        'sub-bold': ['14px', { fontWeight: '500' }],
        tiny: ['12px', { fontWeight: '400' }],
        'tiny-bold': ['12px', { fontWeight: '500' }],
      },
      spacing: {
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        5: '40px',
        6: '48px',
        7: '56px',
        8: '64px',
        9: '72px',
        10: '80px',
      },
      borderWidth: {
        DEFAULT: '0.5px',
        0: '0px',
        1: '1px',
      },
    },
  },
  plugins: [],
};
