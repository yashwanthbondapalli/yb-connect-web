import type { Config } from "tailwindcss";

const config: Config = {
  content: [

    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        bgBase: '#05060A',
        cardBase: '#0A0E17',
        cardLight: '#111623',
        gold: '#FACC15',
        goldHover: '#EAB308',
        textMuted: '#94A3B8',
        borderSubtle: '#1E293B',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'pulse-glow': {
          '0%': { opacity: "0.3", transform: 'scale(1)' },
          '100%': { opacity: "0.6", transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;