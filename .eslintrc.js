module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended", // 使用来自 @eslint-plugin-react 的推荐规则
    "plugin:@typescript-eslint/recommended", // 使用来自@typescript-eslint/eslint-plugin的推荐规则
    "prettier", // 使用 ESLint -config-prettier 禁用来自@typescript-eslint/ ESLint 与 prettier 冲突的 ESLint 规则
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018, // 允许解析最新的 ECMAScript 特性
    sourceType: "module", // 允许使用 import
    ecmaFeatures: {
      jsx: true, // 允许对JSX进行解析
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // Customize your rules
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "prettier/prettier": [
      "warn",
      {
        trailingComma: "es5",
        endOfLine: "auto",
      },
    ],
  },
};
