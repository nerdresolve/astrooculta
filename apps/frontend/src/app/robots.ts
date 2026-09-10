import type { MetadataRoute } from "next";

/* Mesmo default do metadataBase em layout.tsx — ver nota lá. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://astrooculta.nerdresolve.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
