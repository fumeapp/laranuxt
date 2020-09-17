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
  theme: {
    extend: {
      fontFamily: {
        sans: [ 'Inter var', ...defaultTheme.fontFamily.sans ],
      },
    }
  },
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'node_modules/tv-*/**/*.vue',
      'client/components/**/*.vue',
      'client/layouts/**/*.vue',
      'client/pages/**/*.vue',
      'client/plugins/**/*.js',
      'nuxt.config.js'
    ]
  }

}
