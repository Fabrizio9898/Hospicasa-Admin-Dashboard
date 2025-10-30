import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import parser from "@typescript-eslint/parser"; 
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended, 
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parser: parser, 
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project:true 
      },
    },
    plugins: {
      react: pluginReact, 
    },
    rules: {
      ...(pluginReact.configs.flat.recommended?.rules || {}), 
      "react/react-in-jsx-scope": "off", 
    },
    settings: {
      react: { version: "detect" }, 
    },
  },
];
