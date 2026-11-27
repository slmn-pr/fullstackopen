import eslint from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist/**"] },
  eslint.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
