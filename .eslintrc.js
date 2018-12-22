module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.APP_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.APP_ENV === 'production' ? 'error' : 'off'
  }
}
