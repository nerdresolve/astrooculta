import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";
import { Glyph, type GlyphName } from "./glyph.tsx";

export type SignBarProps = {
  sign?: GlyphName;
  name: string;
  percent?: number;
} & ComponentPropsWithoutRef<"div">;

export function SignBar({ sign, name, percent = 0, className, ...rest }: SignBarProps) {
  return (
    <div className={cx("ao-signbar", className)} {...rest}>
      <span className="ao-signbar__name">
        {sign && <Glyph name={sign} size={18} />}
        {name}
      </span>
      <span className="ao-signbar__track">
        <span className="ao-signbar__fill" style={{ width: `${percent}%` }} />
      </span>
      <span className="ao-signbar__pct">{percent}%</span>
    </div>
  );
}
