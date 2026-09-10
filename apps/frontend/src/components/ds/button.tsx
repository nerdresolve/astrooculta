import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cx } from "./cx.ts";
import { Glyph, type GlyphName } from "./glyph.tsx";

export type ButtonVariant = "primary" | "outline" | "ghost" | "ornate";
export type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  glyph?: GlyphName;
  glyphPosition?: "start" | "end";
  block?: boolean;
  children?: ReactNode;
  className?: string;
};

type ButtonAsButton = SharedProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, keyof SharedProps>;
type ButtonAsLink = SharedProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, keyof SharedProps | "href">;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * O `href` decide o elemento: com ele sai um <Link> do Next (navegação client-side,
 * prefetch), sem ele sai um <button>. O design system original alternava entre
 * <a> e <button> pela mesma prop — aqui a diferença é só que o <a> virou <Link>.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    glyph,
    glyphPosition = "end",
    block = false,
    children,
    className,
    ...rest
  } = props;

  const cls = cx("ao-btn", `ao-btn--${variant}`, `ao-btn--${size}`, block && "ao-btn--block", className);

  const content = (
    <>
      {glyph && glyphPosition === "start" && <Glyph name={glyph} size="1em" />}
      <span>{children}</span>
      {glyph && glyphPosition === "end" && <Glyph name={glyph} size="1em" />}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkRest } = rest as { href: string } & ComponentPropsWithoutRef<typeof Link>;
    return (
      <Link className={cls} href={href} {...linkRest}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button className={cls} type={buttonRest.type ?? "button"} {...buttonRest}>
      {content}
    </button>
  );
}
