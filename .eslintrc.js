module.exports = {
  env: {
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  overrides: [
    {
      files: ['*.js'],
    },
  ],
  rules: {
    'prettier/prettier': 'error',
    'func-style': ['error', 'expression'],
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        comments: 80,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
};
