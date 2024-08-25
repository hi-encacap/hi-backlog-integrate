/** @type {import('eslint').Linter.FlatConfig[]} */

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import parser from "@typescript-eslint/parser";
import esimport from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
});

const config = [
  ...compat.extends(
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "next",
    "next/core-web-vitals",
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser,
      parserOptions: {
        project: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
    rules: {
      ...esimport.configs["recommended"].rules,
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "type", "internal", "parent", "sibling", "index", "object"],
          "newlines-between": "always",
        },
      ],
      "import/prefer-default-export": "off",
      "react/function-component-definition": ["error", { namedComponents: "arrow-function" }],
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    plugins: { import: esimport },
  },
  {
    ignores: [".next/*", "node_modules/*", "*.config.*"],
  },
  eslintPluginPrettierRecommended,
];

export default config;
