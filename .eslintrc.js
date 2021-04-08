module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': [ 'error', 'always-multiline' ],
    curly: [ 'error', 'multi' ],
    'no-console': 'off',
    camelcase: 'off',
    'array-bracket-spacing': [ 'error', 'always' ],
    'vue-html-closing-bracket-newline': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/comment-directive': 0,
  },
}
