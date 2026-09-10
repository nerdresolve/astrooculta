import Image from "next/image";

/**
 * Luna — a bruxa da marca.
 *
 * Arte ilustrada, servida em WebP a partir de `public/brand/`. Substituiu o
 * SVG desenhado à mão: vetor escrito em código não alcança rosto humano
 * pintado, e a diferença era visível ao lado das referências da marca.
 *
 * Cada `variant` é uma pose diferente, para a personagem não se repetir
 * idêntica ao longo do site:
 *
 * | variant      | onde                        | pose                        |
 * |--------------|-----------------------------|-----------------------------|
 * | `hero`       | home, faixa de citação      | sentada, segurando carta    |
 * | `about`      | /sobre, topo                | apoiada, olhando de frente  |
 * | `numerology` | /numerologia, "como usa"    | apontando para a carta      |
 * | `result`     | resultado do quiz           | olhos baixos, contemplativa |
 *
 * As imagens são geradas por `npm run art` a partir de `src/assets/*.png`.
 * Cada variante tem 1× e 2×; o `sizes` abaixo faz o navegador baixar só a
 * que couber na tela dele.
 */
export type LunaVariant = "hero" | "about" | "numerology" | "result";

/* Dimensões intrínsecas do arquivo @1x — o Next usa a proporção para
   reservar o espaço antes da imagem carregar e evitar layout shift. */
const VARIANTS: Record<LunaVariant, { src: string; width: number; height: number; alt: string }> = {
  hero: { src: "/brand/luna-hero.webp", width: 560, height: 840, alt: "Luna, a bruxa, segurando uma carta de tarô" },
  about: { src: "/brand/luna-about.webp", width: 520, height: 693, alt: "Luna, a bruxa, entre livros e uma bola de cristal" },
  numerology: { src: "/brand/luna-numerology.webp", width: 640, height: 512, alt: "Luna apontando para uma carta de tarô" },
  result: { src: "/brand/luna-result.webp", width: 460, height: 575, alt: "Luna lendo cartas, de olhos baixos" },
};

export function Luna({
  variant = "hero",
  className,
  priority = false,
}: {
  variant?: LunaVariant;
  className?: string;
  /** true só na imagem acima da dobra — evita atrasar o LCP. */
  priority?: boolean;
}) {
  const art = VARIANTS[variant];

  return (
    <Image
      className={className}
      src={art.src}
      alt={art.alt}
      width={art.width}
      height={art.height}
      priority={priority}
      /* Sem priority, carrega preguiçosamente: as ocorrências abaixo da dobra
         não competem com o conteúdo principal. */
      loading={priority ? undefined : "lazy"}
      /* `sizes` declara a largura REAL de exibição, não a do arquivo — é isso
         que faz o navegador escolher entre 1× e 2×. O contêiner sempre define
         a largura final via CSS, então usamos vw como aproximação segura. */
      sizes="(max-width: 860px) 80vw, 40vw"
      style={{ display: "block", width: "100%", height: "auto" }}
    />
  );
}
