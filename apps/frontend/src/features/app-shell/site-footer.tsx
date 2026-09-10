import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo.tsx";
import { Glyph } from "@/components/ds";
import { FOOTER_COLUMNS, FOOTER_LEGAL, FOOTER_TAGLINE } from "@/content/site.ts";

import NerdResolveBadge from './NerdResolveBadge';
/** Rodapé. Server component: não depende de rota nem de estado. */
export function SiteFooter() {
  return (
    <footer className="ao-footer">
      <div className="ao-footer__grid">
        <div>
          <div className="footer__brand">
            <BrandLogo className="footer__logo" />
            Astro Oculta
          </div>
          <p className="footer__tagline">{FOOTER_TAGLINE}</p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="ao-footer__title">{column.title}</p>
            <ul className="ao-footer__list">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  {/* WhatsApp e redes saem do site: <a> comum, aba nova. O Link
                      do Next é para rota interna — usá-lo aqui faria o roteador
                      tentar navegar para um host externo. */}
                  {link.href.startsWith("http") ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="ao-footer__legal">
        <span>{FOOTER_LEGAL}</span>
        <span>
          <Glyph name="moon" size={12} /> Desenvolvido por{" "}
          <a className="footer__credit" href="https://nerdresolve.com" target="_blank" rel="noopener noreferrer">
            NerdResolve
          </a>
        </span>
      </div>
      <NerdResolveBadge />
    </footer>
  );
}
