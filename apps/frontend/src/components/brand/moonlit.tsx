import Image from "next/image";

/**
 * Moonlit — a gata preta da marca.
 *
 * Arte ilustrada em WebP, servida de `public/brand/`. Ver a nota em
 * `luna.tsx` sobre por que a versão SVG foi substituída.
 *
 * | variant | onde                          | pose                          |
 * |---------|-------------------------------|-------------------------------|
 * | `hero`  | home (altar) e chamada final  | sentada de frente, no altar   |
 * | `quiz`  | /quiz, abertura               | sentada, atenta                |
 * | `blog`  | /blog, rodapé                 | deitada sobre livros           |
 * | `signs` | /signos, rodapé               | sentada, cabeça inclinada      |
 *
 * Geradas por `npm run art` a partir de `src/assets/*.png`.
 */
export type MoonlitVariant = "hero" | "quiz" | "blog" | "signs";

const VARIANTS: Record<MoonlitVariant, { src: string; width: number; height: number; alt: string }> = {
  hero: { src: "/brand/moonlit-hero.webp", width: 620, height: 640, alt: "Moonlit, a gata preta, sentada entre cartas de tarô e uma bola de cristal" },
  quiz: { src: "/brand/moonlit-quiz.webp", width: 420, height: 472, alt: "Moonlit, a gata preta, sentada e atenta" },
  blog: { src: "/brand/moonlit-blog.webp", width: 420, height: 512, alt: "Moonlit, a gata preta, deitada sobre livros" },
  signs: { src: "/brand/moonlit-signs.webp", width: 420, height: 484, alt: "Moonlit, a gata preta, com a cabeça inclinada" },
};

export function Moonlit({
  variant = "hero",
  className,
  priority = false,
}: {
  variant?: MoonlitVariant;
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
      loading={priority ? undefined : "lazy"}
      /* Ver nota em luna.tsx: `sizes` é a largura de exibição, não a do arquivo. */
      sizes="(max-width: 860px) 80vw, 40vw"
      style={{ display: "block", width: "100%", height: "auto" }}
    />
  );
}
