import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  { ignores: ["dist", "eslint.config.js"] },
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "19",
      },
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/no-unknown-property": "off",
      "react/prop-types": "off",
      "react-hooks/purity": "off",
      "react-hooks/refs": "off",
      "react-hooks/immutability": "off",
      "no-useless-assignment": "off",
    },
  },
];
