import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    // darkMode: "media",
    darkMode: "class",

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                TWHITE: "#FAFAFA",
                MCGreen: "#6ABD45",
                MCGreenHover: "#589f3a",
                TableLYellow: "#FAF2C7",
                TableBlue: "#1D2D5C",
                TableYellow: "#F3D963",
                TableOrange: "#AC881B",
                TableDOrange: "#6E5811",
                primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" }
            },
        },
    },

    plugins: [forms],
};
