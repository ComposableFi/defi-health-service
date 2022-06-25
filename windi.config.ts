import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';

export default defineConfig({
  extract: {
    include: ['./src/**/*.{js,jsx,ts,tsx,html,md,mdx}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  attributify: true,
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui'],
      serif: ['"IBM Plex Sans"', 'SFMono-Regular'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16',
    },
    extend: {
      colors: {
        code: {
          highlight: 'rgb(125 211 252 / 0.1)',
        },
      },
    },
  },
  plugins: [
    typography(),
    require('windicss/plugin/line-clamp'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/forms'),
  ],
});
