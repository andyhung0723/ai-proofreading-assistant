/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'diff-added': '#16a34a',    // green-600
        'diff-removed': '#ef4444',  // red-500
      }
    },
  },
  plugins: [],
}

