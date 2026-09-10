import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cx } from "./cx.ts";
import { Glyph, type GlyphName } from "./glyph.tsx";
import { Starfield } from "./starfield.tsx";

export type SignCardProps = {
  sign: GlyphName;
  name: string;
  dates?: string;
  element?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export function SignCard({ sign, name, dates, element, className, children, ...rest }: SignCardProps) {
  return (
    <div className={cx("ao-signcard", className)} {...rest}>
      <Starfield />
      <div style={{ position: "relative" }}>
        <div className="ao-signcard__symbol">
          <Glyph name={sign} size="1em" />
        </div>
        <h3 className="ao-signcard__name">{name}</h3>
        <p className="ao-signcard__dates">{[dates, element].filter(Boolean).join("  ·  ")}</p>
        {children && (
          <div style={{ marginTop: "var(--sp-6)", color: "var(--text-body)", fontSize: "var(--fs-body-sm)" }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
