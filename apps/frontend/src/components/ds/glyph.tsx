import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";

/**
 * A linguagem de ícones da marca é tipográfica, não vetorial: ✦ ☽ ☉ ◇ e os doze
 * signos. O design system expõe tudo por aqui justamente para que ninguém desenhe
 * um SVG de estrela à mão.
 *
 * O `︎` depois de cada signo é o seletor de variação textual. Sem ele, boa
 * parte dos sistemas renderiza ♈–♓ como emoji colorido — que é exatamente o que
 * a marca não usa.
 */
const GLYPHS = {
  star: "✦",
  star4: "✧",
  moon: "☽",
  sun: "☉",
  diamond: "◇",
  eye: "◉",
  dot: "•",
  aries: "♈︎",
  taurus: "♉︎",
  gemini: "♊︎",
  cancer: "♋︎",
  leo: "♌︎",
  virgo: "♍︎",
  libra: "♎︎",
  scorpio: "♏︎",
  sagittarius: "♐︎",
  capricorn: "♑︎",
  aquarius: "♒︎",
  pisces: "♓︎",
} as const;

export type GlyphName = keyof typeof GLYPHS;

export const GLYPH_NAMES = Object.keys(GLYPHS) as GlyphName[];

export type GlyphProps = {
  name?: GlyphName;
  size?: number | string;
  twinkle?: boolean;
} & Omit<ComponentPropsWithoutRef<"span">, "color">;

export function Glyph({ name = "star", size, twinkle = false, className, style, ...rest }: GlyphProps) {
  return (
    <span
      className={cx("ao-glyph", twinkle && "ao-glyph--twinkle", className)}
      style={{ fontSize: size, ...style }}
      aria-hidden="true"
      {...rest}
    >
      {GLYPHS[name]}
    </span>
  );
}
