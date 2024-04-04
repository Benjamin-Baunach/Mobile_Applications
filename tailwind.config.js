const animate = require("tailwindcss-animate")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,vue}',
    './components/**/*.{js,jsx,vue}',
    './app/**/*.{js,jsx,vue}',
    './src/**/*.{js,jsx,vue}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        'primary': {
          '50': '#f0f9f4',
          '100': '#daf1e3',
          '200': '#b8e2cb',
          '300': '#89ccaa',
          '400': '#58af86',
          '500': '#36936a',
          '600': '#2b8761', // Primary
          '700': '#1e5e45',
          '800': '#1a4b38',
          '900': '#163e2f',
          '950': '#0b231b',
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      }
    },
  },
  plugins: [animate],
}