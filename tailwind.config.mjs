/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'theme-primary': 'var(--color-background)',
        'theme-secondary': 'var(--color-gradient)',
        'theme-text': 'var(--color-text)',
        'theme-accent': 'var(--color-accent)',
        'theme-accent-alt': 'var(--color-accent-alt)',
      },
      borderColor: {
        'theme-primary': 'var(--color-background)',
        'theme-secondary': 'var(--color-gradient)',
        'theme-accent': 'var(--color-accent)',
        'theme-accent-alt': 'var(--color-accent-alt)',
      },
      ringColor: {
        'theme-accent': 'var(--color-accent)',
      },
      boxShadowColor: {
         'theme-shadow': 'var(--color-shadow)',
         'theme-accent': 'var(--color-accent)',
      },
      borderRadius: {
        'theme': 'var(--border-radius, 0.5rem)',
      },
    },
  },
  plugins: [],
};