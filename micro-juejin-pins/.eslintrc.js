module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard',
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', {
      'named': 'never',
    }],
    'vue/singleline-html-element-content-newline': ['error', {
      'ignores': ['p', 'span'],
    }],
    'no-prototype-builtins': 0,
    'vue/no-deprecated-filter': 0,
    'vue/require-explicit-emits': 0,
    'vue/no-deprecated-destroyed-lifecycle': 0,
  },
}
