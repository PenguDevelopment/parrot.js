module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'prettier'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        require.resolve("@babel/plugin-syntax-import-assertions")
      ]
    }
  },
  rules: {
  }
}
