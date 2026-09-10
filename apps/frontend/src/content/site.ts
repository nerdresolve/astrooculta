/** Navegação, textos da home e rodapé. Uma fonte só para o que se repete. */

export type NavLink = { label: string; href: string };

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Quiz", href: "/quiz" },
  { label: "Signos", href: "/signos" },
  { label: "Numerologia", href: "/numerologia" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export const HERO = {
  eyebrow: ["Astrologia", "Numerologia", "Autoconhecimento"],
  title: ["Descubra qual", "signo representa", "sua "],
  accent: "essência",
  body: "Nove perguntas de numerologia, e no fim o signo que mais combina com o seu jeito de ser.",
  cta: "Fazer o quiz",
  trust: ["3 minutos", "Sem cadastro", "De graça"],
} as const;

export const QUOTE = ["O universo fala através de números,", "e os números revelam quem você é."] as const;

export const PILLARS_TITLE = "Um quiz que serve de ponto de partida";

export const PILLARS = [
  { glyph: "moon", label: "Astrologia" },
  { glyph: "star4", label: "Numerologia" },
  { glyph: "eye", label: "Intuição" },
  { glyph: "diamond", label: "Autoconhecimento" },
  { glyph: "sun", label: "Magia" },
  { glyph: "star", label: "Transformação" },
] as const;

export type Post = {
  slug: string;
  tag: string;
  title: string;
  read: string;
  excerpt: string;
};

export const POSTS: readonly Post[] = [
  {
    slug: "numero-de-destino",
    tag: "Numerologia",
    title: "O que o seu número de destino diz sobre o seu ano",
    read: "6 min",
    excerpt:
      "Some os dígitos da sua data de nascimento até restar um só número. Ele não prevê o que vai acontecer. Descreve o terreno que você tem para atravessar.",
  },
  {
    slug: "lua-invertida",
    tag: "Tarot",
    title: "A Lua invertida: quando a intuição pede silêncio",
    read: "4 min",
    excerpt:
      "A carta invertida raramente anuncia desgraça. Na maioria das tiragens, ela pede que você pare de interpretar sinais por alguns dias.",
  },
  {
    slug: "retorno-de-saturno",
    tag: "Astrologia",
    title: "Retorno de Saturno: o que realmente acontece",
    read: "8 min",
    excerpt:
      "Por volta dos 29 anos Saturno volta ao lugar onde estava quando você nasceu. O que cai nesse período costuma ser o que já estava rachado.",
  },
  {
    slug: "rituais-lua-nova",
    tag: "Autoconhecimento",
    title: "Rituais simples para começar a lua nova",
    read: "5 min",
    excerpt:
      "Nenhum deles exige altar, incenso caro ou hora marcada. Exigem que você escreva o que quer começar, e volte a ler daqui a um mês.",
  },
];

/**
 * Contato e redes. Um lugar só: o rodapé e a página de contato leem daqui.
 *
 * Vêm do ambiente porque o repositório é público e o telefone é de uma pessoa
 * real — número em repositório indexável vira spam. Os valores abaixo são o
 * fallback de exemplo; os de verdade entram por `NEXT_PUBLIC_*` no build.
 *
 * Precisa ser `NEXT_PUBLIC_` e escrito por extenso: o Next substitui essas
 * expressões em tempo de build, e `process.env[chave]` montado dinamicamente
 * não é substituído — chegaria `undefined` no navegador.
 */
/* `||` e não `??`: uma variável declarada e vazia chega como "" — que o `??`
   deixa passar, e o site sairia com href="" e campos em branco. O Compose
   escreve exatamente isso ao interpolar `${VAR:-}` de uma variável ausente. */
const HANDLE = process.env.NEXT_PUBLIC_SOCIAL_HANDLE || "@seuinstagram";

export const SOCIAL = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || `https://instagram.com/${HANDLE.replace("@", "")}`,
  tiktok: process.env.NEXT_PUBLIC_TIKTOK || `https://tiktok.com/${HANDLE}`,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "https://wa.me/5500000000000",
  email: process.env.NEXT_PUBLIC_EMAIL || "contato@exemplo.com.br",
  handle: HANDLE,
} as const;

export const FOOTER_COLUMNS = [
  { title: "Explorar", links: [{ label: "Quiz", href: "/quiz" }, { label: "Signos", href: "/signos" }, { label: "Numerologia", href: "/numerologia" }] },
  { title: "Conteúdo", links: [{ label: "Blog", href: "/blog" }, { label: "Sobre", href: "/sobre" }] },
  { title: "Contato", links: [{ label: "WhatsApp", href: SOCIAL.whatsapp }, { label: "Instagram", href: SOCIAL.instagram }, { label: "TikTok", href: SOCIAL.tiktok }] },
] as const;

export const FOOTER_TAGLINE =
  "Astrologia, numerologia e tarô para quem quer se conhecer. Sem promessa de futuro, com atenção ao presente.";

export const FOOTER_LEGAL = "© 2026 Astro Oculta";
