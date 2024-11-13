/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(), // Include Flowbite content
  ],

  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(), // Include Flowbite plugin
  ],
};
