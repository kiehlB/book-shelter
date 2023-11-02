/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      Fredoka: ['Fredoka One', 'cursive'],
      Titan: ['Titan One', 'cursive'],
      Rubik: ['Rubik', 'sans-serif'],
      Pretendard: ['Pretendard', 'sans-serif'],
      KR: ['Noto Sans KR', 'sans-serif'],
      Malgun: ['Malgun Gothic', 'sans-serif'],
    },
    extend: {
      flex: {
        '48': '0 0 48px',
      },
      gridTemplateRows: {
        '12': 'repeat(12, minmax(0, 1fr))',

        // Complex site-specific row configuration
        layout: '200px minmax(900px, 1fr) 100px',
      },
      gridRow: {
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
      },
    },
    screens: {
      xl: '1600px',
      lg: '1366px',
      md: '1280px',
      mds: '1024px',
      sm: '768px',
      sxm: '375px',
      mxl: { max: '1599px' },
      mp: { max: '1535px' },
      mlg: { max: '1365px' },
      mmd: { max: '1279px' },
      mmx: { max: '1024px' },
      mxs: { max: '767px' },
      ssm: { max: '374px' },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/line-clamp'),
  ],
};