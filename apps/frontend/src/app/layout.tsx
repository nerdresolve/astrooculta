import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

/* Design system primeiro, estilo de tela depois — a ordem é a mesma que o
   `styles.css` do design system monta: tokens → base → componentes. */
import "@/styles/astro-oculta-ds/styles.css";
import "@/styles/app.css";

import { SiteFooter } from "@/features/app-shell/site-footer.tsx";
import { SiteHeader } from "@/features/app-shell/site-header.tsx";
import { ThemeToggle } from "@/features/app-shell/theme-toggle.tsx";

/* As três famílias que o design system declara em tokens/typography.css.
   Aqui entram por next/font (preload, sem layout shift) em vez do @import do
   Google Fonts, que bloqueia a primeira pintura. `variable` casa com o nome que
   os tokens já esperam, então nenhum CSS precisou mudar. */
/* Só os pesos realmente usados. O design system pede 400 para display e o
   itálico para a palavra de destaque ("sua *essência*"); 300/500/600/700
   nunca aparecem no CSS e custavam ~50 KB por baixar junto. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

/* Cinzel saiu: era 26 KB de fonte para um único rótulo de 6px dentro de uma
   carta de tarô. O token `--font-ornament` já cai para Cormorant Garamond, que
   é serifada e serve para o mesmo efeito. Se algum dia o Cinzel for usado de
   verdade em títulos, vale reintroduzir. */

/* 300 (corpo), 400 (eyebrow/nav) e 500 (botões) são os únicos que os tokens
   referenciam. O itálico não é usado em nenhum lugar no sans. */
const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: {
    default: "Astro Oculta: descubra qual signo representa sua essência",
    template: "%s · Astro Oculta",
  },
  description:
    "Responda 9 perguntas baseadas na numerologia e descubra o signo que mais combina com a sua personalidade.",
  /* Base das URLs absolutas (Open Graph, canonical). Precisa bater com o
     domínio realmente servido, senão os previews de compartilhamento apontam
     para um host que não existe. */
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://astrooculta.nerdresolve.com"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Astro Oculta",
    /* Sem imagem declarada, o link compartilhado no WhatsApp aparece só com
       texto. 1200×630 é a proporção que as prévias esperam; gerada por
       `npm run logo` a partir da mesma arte do favicon. */
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Astro Oculta" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08050a" },
    { media: "(prefers-color-scheme: light)", color: "#e9dbee" },
  ],
};

/**
 * Aplica o tema salvo ANTES da primeira pintura.
 *
 * Precisa ser síncrono e no <head>: rodando depois, a página aparece cosmic e
 * pisca para lunar. Como o atributo do servidor é sempre "cosmic", o React
 * poderia reclamar da diferença — daí o `suppressHydrationWarning` no <html>.
 *
 * O padrão é cosmic (escuro): é o tema primário da marca, e não o que o sistema
 * operacional preferir. `prefers-color-scheme: light` só decide para quem nunca
 * escolheu — e mesmo assim a marca começa escura, conforme o design system.
 */
const THEME_SCRIPT = `try{var t=localStorage.getItem('astro-oculta-theme');if(t!=='lunar'&&t!=='cosmic')t='cosmic';document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-theme="cosmic"
      className={`${cormorant.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        {/* Cabeçalho, conteúdo e rodapé são IRMÃOS — o cabeçalho não envolve
            `{children}`. Envolvendo, ele subiria acima do roteador e o
            `usePathname` ficaria sem contexto ("invariant expected layout
            router to be mounted"). */}
        <div className="page">
          <a className="skip-link" href="#conteudo">
            Ir para o conteúdo
          </a>

          <SiteHeader />

          <main className="page__main" id="conteudo">
            {children}
          </main>

          <SiteFooter />
        </div>

        <ThemeToggle />
      </body>
    </html>
  );
}
