// eslint.config.js
import { builtinModules } from "module";
import parser from "@babel/eslint-parser";

export default [
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["**/*.js?(x)"],

    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        requireConfigFile: false,
        babelOptions: {
          plugins: ["@babel/plugin-syntax-jsx"],
        },
      },
      globals: {
        ...builtinModules.reduce((acc, mod) => {
          acc[mod] = "readonly";
          return acc;
        }, {}),
        browser: true,
        node: true,
      },
    },

    rules: {
      "no-undef": "error",
      "quotes": ["warn", "double"],
      "no-console": "error",
      "semi": ["error", "always"],
      "no-var": "warn",
      "func-names": "error",
      "no-trailing-spaces": "warn",
      "space-before-blocks": ["error", "always"],
      "quote-props": ["error", "consistent"],
      "no-unused-vars": "error",
      "indent": ["error", 2],
      "no-eval": "error",
      "camelcase": ["warn", { "properties": "never" }],
      "no-multiple-empty-lines": ["error", { "max": 1 }],
    },
  },
];
