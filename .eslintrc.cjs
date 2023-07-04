module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    type: 'module'
  },
  extends: ['@prestashopcorp/eslint-config-ts'],
  plugins: ['@typescript-eslint'],
  root: true,
  env: {
    node: true,
    jest: true
  },
  globals: {
    bootstrap: 'readonly'
  },
  rules: {
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'no-new': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        },
        multilineDetection: 'last-member'
      }
    ]
  }
};
