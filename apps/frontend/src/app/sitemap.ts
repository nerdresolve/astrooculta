import type { MetadataRoute } from "next";

import { SIGNS } from "@/content/signs.ts";

/* Mesmo default do metadataBase em layout.tsx — ver nota lá. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://astrooculta.nerdresolve.com";

/**
 * Sitemap. O `robots.ts` aponta para cá, então sem este arquivo o buscador
 * seguiria o link e receberia 404.
 *
 * Só as rotas estáticas e as doze de signo — `/quiz/resultado` fica de fora
 * de propósito: depende de parâmetro na URL e não é conteúdo indexável.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/quiz", "/signos", "/numerologia", "/blog", "/sobre", "/contato"];

  const pages = paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const signs = SIGNS.map((sign) => ({
    url: `${SITE_URL}/signos/${sign.id}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...signs];
}
