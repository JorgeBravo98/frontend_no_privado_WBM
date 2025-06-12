// eslint.config.js
import { builtinModules } from "module";
import parser from "@babel/eslint-parser";
import reactPlugin from "eslint-plugin-react";

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
        ecmaFeatures: {
          jsx: true,
        },
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
        document: "readonly",
        window: "readonly",
        localStorage: "readonly",
        fetch: "readonly",
        Event: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
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
