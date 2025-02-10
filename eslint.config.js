const typeScriptParser = require('@typescript-eslint/parser');
const eslintPluginTypeScript = require('@typescript-eslint/eslint-plugin');
const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginPrettier = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typeScriptParser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypeScript,
      react: eslintPluginReact,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
