import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: [
      './client/**/*.{vue,ts}',
      'node_modules/tailvue/dist/tailvue.es.js',
      'node_modules/tailvue/dist/tailvue.umd.js',
    ],
  },
})
