import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";
import { Glyph, type GlyphName } from "./glyph.tsx";

export type ToastProps = {
  glyph?: GlyphName;
} & ComponentPropsWithoutRef<"div">;

export function Toast({ glyph = "star", className, children, ...rest }: ToastProps) {
  return (
    <div className={cx("ao-toast", className)} role="status" {...rest}>
      <span className="ao-toast__glyph">
        <Glyph name={glyph} />
      </span>
      <span>{children}</span>
    </div>
  );
}
