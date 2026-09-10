"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo.tsx";
import { Button, IconButton, cx } from "@/components/ds";
import { NAV_LINKS } from "@/content/site.ts";

/**
 * Navegação e gaveta mobile.
 *
 * É irmão do conteúdo, não pai dele: envolver `{children}` a partir do layout
 * raiz colocaria este componente acima do roteador, e aí `usePathname` não teria
 * contexto — foi exatamente o que quebrou com "invariant expected layout router
 * to be mounted". Como irmão, ele fica dentro da árvore do roteador e o hook
 * funciona.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Navegar fecha a gaveta. Sem isto ela continuaria aberta por cima da
     página nova, já que o componente não desmonta entre rotas. */
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  /* Gaveta aberta trava o scroll do fundo e fecha no Esc. */
  useEffect(() => {
    if (!drawerOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <>
      <nav className="ao-nav" aria-label="Principal">
        <Link className="ao-nav__brand" href="/">
          <BrandLogo className="ao-nav__logo" />
          Astro Oculta
        </Link>

        <ul className="ao-nav__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                className={cx("ao-nav__link", isActive(link.href) && "ao-nav__link--active")}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button variant="outline" size="sm" glyph="star" href="/quiz" className="ao-nav__cta">
          Fazer o quiz
        </Button>

        <IconButton
          label="Abrir menu"
          className="ao-nav__burger"
          bare
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          ☰
        </IconButton>
      </nav>

      {drawerOpen && (
        <div className="ao-drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="ao-nav__brand">
              <BrandLogo className="ao-nav__logo" />
              Astro Oculta
            </span>
            <IconButton label="Fechar menu" bare onClick={() => setDrawerOpen(false)}>
              ✕
            </IconButton>
          </div>

          <ul className="ao-drawer__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  className="ao-drawer__link"
                  href={link.href}
                  style={isActive(link.href) ? { color: "var(--text-accent)" } : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "auto", paddingTop: "var(--sp-8)" }}>
            <Button block size="lg" glyph="star" href="/quiz">
              Fazer o quiz
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
