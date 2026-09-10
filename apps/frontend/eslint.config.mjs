import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      /* O design system é CSS puro e a arte é SVG inline: não há <img> de
         bitmap a otimizar, e o aviso do next/image só faria ruído. */
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
