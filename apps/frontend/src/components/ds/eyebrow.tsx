import { Fragment } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";
import { Glyph, type GlyphName } from "./glyph.tsx";

export type EyebrowProps = {
  items: string[];
  align?: "start" | "center";
  separator?: GlyphName;
} & ComponentPropsWithoutRef<"p">;

/** Termos em versalete separados por glifo — "Rápido ✦ Divertido ✦ Revelador". */
export function Eyebrow({ items, align = "start", separator = "star", className, ...rest }: EyebrowProps) {
  return (
    <p className={cx("ao-eyebrow", align === "center" && "ao-eyebrow--center", className)} {...rest}>
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && (
            <span className="ao-eyebrow__sep">
              <Glyph name={separator} />
            </span>
          )}
          <span>{item}</span>
        </Fragment>
      ))}
    </p>
  );
}
