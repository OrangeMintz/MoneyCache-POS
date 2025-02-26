import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    darkMode: "class",

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                MCGreen: "#6ABD45",
                TableLYellow: "#FAF2C7",
                TableBlue:"#1D2D5C",
                TableYellow:"#F3D963",
                TableOrange:"#AC881B",
                TableDOrange: "#6E5811",
            },
        },
    },

    plugins: [forms],
};
