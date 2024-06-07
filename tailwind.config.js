const animate = require("tailwindcss-animate")
const defaultTheme = require('tailwindcss/defaultTheme')

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
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "xs": "calc(0.75rem + var(--fs-setting))",
        "sm": "calc(.875rem + var(--fs-setting))",
        "base": "calc(1rem + var(--fs-setting))",
        "lg": "calc(1.125rem + var(--fs-setting))",
        "xl": "calc(1.25rem + var(--fs-setting))",
        "2xl": "calc(1.5rem + var(--fs-setting))",
        "3xl": "calc(1.875rem + var(--fs-setting))",
        "4xl": "calc(2.25rem + var(--fs-setting))",
        "5xl": "calc(3rem + var(--fs-setting))",
        "6xl": "calc(4rem + var(--fs-setting))",
      },
    },
  },
  plugins: [animate],
}