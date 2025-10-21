import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',

        md: '768px',

        lg: '1024px',

        xl: '1280px',

        tbs: '868px', // phone overflow protection

        ld: '1440px', // large
      },
      colors: {
        primary: {
          blue: '#0046FF',
          cyan: '#00E0FF',
          purple: '#A259FF',
          pink: '#FF59E6',
        },
        gradient: {
          start: '#0046FF',
          middle: '#00E0FF',
          end: '#A259FF',
        },
      },
      fontFamily: {
        martel: ['var(--font-martel)'],
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(circle at 50% 120%, var(--tw-gradient-stops))',
        'hero-gradient':
          'linear-gradient(135deg, #0046FF 0%, #00E0FF 50%, #A259FF 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
