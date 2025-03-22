import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans)'],
        serif: ['var(--font-noto-serif)'],
      },
      colors: {
        'primary': '#000000',
        'secondary': '#555555',
        'accent': '#f0f0f0',
        'light-gray': '#f8f8f8',
        'border-color': '#eaeaea',
      },
      spacing: {
        '1/3': '33.333333%',
        '2/3': '66.666667%',
      },
    },
  },
  plugins: [],
};

export default config;
