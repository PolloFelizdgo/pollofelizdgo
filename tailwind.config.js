/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Align Tailwind named colors with the requested brand palette
        // Primary gold and primary dark (black)
        gold: '#ffbc00',
        dark: '#000000',
        orange: '#ec7916',
        // primary red used across the site
        brandred: '#ff0000',
        muted: '#a29292',
        muted2: '#747474',
        deepred: '#9a0404',
        accent: '#ff0000'
      }
      ,
      fontFamily: {
        // Map Tailwind font utilities to the new families. Use these in classes like 'font-title' or 'font-subtitle'
        title: ["NEILVARD One", "NEILVARD", "system-ui", "-apple-system", "Segoe UI", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"],
        subtitle: ["Brignell Square", "Brignell", "system-ui", "-apple-system", "Segoe UI", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"],
        sans: ["Grignell Square", "Grignell", "system-ui", "-apple-system", "Segoe UI", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
}
