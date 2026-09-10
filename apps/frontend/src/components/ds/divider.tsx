import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";
import { Glyph, type GlyphName } from "./glyph.tsx";

export type DividerProps = {
  label?: string;
  glyph?: GlyphName;
  plain?: boolean;
} & ComponentPropsWithoutRef<"div">;

/** Fio de ouro que esmaece nas pontas, com rótulo de seção opcional no meio. */
export function Divider({ label, glyph = "star", plain = false, className, ...rest }: DividerProps) {
  return (
    <div className={cx("ao-divider", plain && "ao-divider--plain", className)} {...rest}>
      <div className="ao-divider__rule" />
      {label && (
        <div className="ao-divider__label">
          <Glyph name={glyph} />
          <span>{label}</span>
          <Glyph name={glyph} />
        </div>
      )}
      <div className="ao-divider__rule" />
    </div>
  );
}
