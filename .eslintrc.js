module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {

    'linebreak-style': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['node-fetch'],
      },
    },
  },
};
