/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkgray: {
          900: "#1a1a1a"
        },
        lightblack: {
          100: "#121212"
        },
        zebra: {
          100: "#282828"
        }
      },
    },
  },
  plugins: [],
});

