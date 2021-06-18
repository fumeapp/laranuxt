module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
  ],
  plugins: [
  ],
  rules: {
    // allow-dangle (syncs w/ laravel).
    'comma-dangle': ['error', 'always-multiline'],

    // Only allow curly braces of multi-line statements.
    curly: ['error', 'multi'],

    // for sanity - allow people to write console.log - DO NOT CHECK IN
    'no-console': 'off',
    'no-debugger': 'off',

    // do not require default for properties
    'vue/require-default-prop': 'off',

    // lets allow content on the same line for short html
    'vue/singleline-html-element-content-newline': 0,

    // under discussion
    camelcase: 'off',

    // Allows for lexical declarations within case/default clauses.
    'no-case-declarations': 'off',

    // this restrictions functions and classes to be defined before they are used
    // this is impossible to have on with model-typer
    'no-use-before-define': 'off',

    // note you must disable the base rule as it can report incorrect errors
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],

    // https://eslint.vuejs.org/rules/no-v-html.html
    'vue/no-v-html': 'off',
  },
}
