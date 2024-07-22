import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                kanit: ['Kanit', ...defaultTheme.fontFamily.sans],
                inter: ['Inter', ...defaultTheme.fontFamily.sans],
            },

            fontWeights: {

            },

            colors:{
                backgroundnav: "#16171D",
                background1: "#1E2129",
                chatcolor: "#16171C",
                backgroundgeneral: "#171822",
                selected: "#F6F7F9",
                muted: "#B2B6C7",
                nav: "#1a202f",
                border: "#4889fa",
                textcard: "#ECEDF2",
                backprin: "#FFFFFF05",
                bluecard: "#4889F9",
            },

            boxShadow: {
                card: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            },

            dropShadow: {
                card: '0px 0px 20px #4889F952',
            },

            animation: {
                'spin-slow': 'spin 5s linear infinite',
              },

            keyframes: {
                spin: {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
            },
        },
            
        },
    },

    plugins: [forms,
              require('tailwind-scrollbar')
    ],
};
