import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    daisyui: {
      themes: [
        {
          mytheme: {
            "primary": "#7cdb29",
            "secondary": "#ce335f",
            "accent": "#844cc9",
            "neutral": "#2e2833",
            "base-100": "#f9fafa",
            "info": "#9fe1f4",
            "success": "#68eee1",
            "warning": "#f4c434",
            "error": "#ed457a",
          },
        },
      ],
    },
  },
  plugins: [require("daisyui")],
}
export default config
