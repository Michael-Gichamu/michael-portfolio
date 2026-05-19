import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Flat-config ESLint setup for Next 16 + ESLint 9.
 * eslint-config-next ships flat-config exports directly — no FlatCompat.
 */
const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",

      // framer-motion uses dynamic shapes liberally; we accept `any` in
      // specific places like motion variants.
      "@typescript-eslint/no-explicit-any": "off",

      // Allow leading-underscore args as intentionally unused.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // React 19 ships forward-looking rules from @react/eslint-plugin-react-hooks
      // that flag patterns that *would* matter under React Compiler. They are
      // not correctness errors. We downgrade the three that fire on legitimate
      // R3F patterns (procedural geometry uses Math.random in useMemo, useFrame
      // mutates local refs, etc.) so they don't block CI.
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "tests/**",
      "e2e/**",
      "playwright-report/**",
      "test-results/**",
      "next.config.mjs",
      "postcss.config.mjs",
      "tailwind.config.ts",
      "vitest.config.ts",
      "playwright.config.ts",
    ],
  },
];

export default config;
