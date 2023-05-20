/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      colors: {
         white: '#fff',
         'light-white': '#fafafa',
         'dark-white': '#f5f5f5',
         'light-green': '#00c1a2',
         'dark-green': '#00b094',
         grey: '#dedede',
         'light-grey': '#606f7b',
         'dark-grey': '#3d4852',
         'light-black': '#2a2a2ab0',
         blue: '#01579d',
         red: '#ed1c1c',
      },
      extend: {},
      fontFamily: {},
   },
   plugins: [require('daisyui')],
};
