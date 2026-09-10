import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cx } from "./cx.ts";

/**
 * Quatro tratamentos, cada um com um lugar:
 * `veil` translúcido é o padrão no tema cosmic, `framed` com fio de ouro duplo é
 * o padrão no lunar e no editorial, `solid` é para diálogos e `notch` (cantos
 * chanfrados) é exclusivo de citação.
 */
export type CardVariant = "veil" | "framed" | "solid" | "notch";

export type CardProps = {
  variant?: CardVariant;
  interactive?: boolean;
  title?: ReactNode;
  glyph?: ReactNode;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export function Card({
  variant = "veil",
  interactive = false,
  title,
  glyph,
  children,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cx("ao-card", `ao-card--${variant}`, interactive && "ao-card--interactive", className)}
      {...rest}
    >
      {glyph}
      {title && <h3 className="ao-card__title">{title}</h3>}
      {typeof children === "string" ? <p className="ao-card__body">{children}</p> : children}
    </div>
  );
}
