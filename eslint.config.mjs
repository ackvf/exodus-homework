import stylistic from "@stylistic/eslint-plugin"
import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import prettierConfig from "eslint-config-prettier"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/semi": ["error", "never"],
      "@stylistic/comma-dangle": ["warn", "always-multiline"],
      "import/order": [
        "warn",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
          distinctGroup: false,
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroupsExcludedImportTypes: [],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "{@/server,@/server/**}",
              group: "internal",
              position: "before",
            },
            {
              pattern: "{@/components,@/components/**}",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/**",
              group: "internal",
            },
            {
              pattern: "../**",
              group: "parent",
              position: "before",
            },
            {
              pattern: "{./,.}",
              group: "index",
              position: "after",
            },
          ],
        },
      ],
      "react-hooks/refs": "warn",
      quotes: ["error", "double"],
    },
  },
  {
    ignores: ["**/server/**", "src/pages/api/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/server/**", "@/modules/*/server/**"],
              allowTypeImports: true,
            },
          ],
        },
      ],
    },
  },
])

export default eslintConfig
