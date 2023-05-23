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
      extend: {
         keyframes: {
            slide: {
               '10%': { transform: 'translateY(0.5rem)', opacity: '0.2' },
               '20%': { transform: 'translateY(1rem)', opacity: '1' },
               '100%': { transform: 'translateY(1rem)', opacity: '1' },
            },
         },
         animation: {
            'slide-message-box': 'slide 2s linear forwards',
         },
      },
      fontFamily: {},
   },
   plugins: [require('daisyui')],
};
// absolute top-8 left-1/2 -translate-x-1/2
