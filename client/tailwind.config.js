/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/

const defaultTheme = require('tailwindcss/defaultTheme')
const pkg = require('../package')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './node_modules/tv-icon/**/*.vue',
      './node_modules/tv-button/**/*.vue',
      './node_modules/tv-toast/**/*.vue',
      './client/components/**/*.vue',
      './client/layouts/**/*.vue',
      './client/pages/**/*.vue',
      './client/plugins/**/*.js',
      './client/nuxt.config.js',
    ],
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: pkg.config.colors,
    },
  },
}
