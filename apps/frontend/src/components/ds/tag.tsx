import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cx } from "./cx.ts";

export type TagProps = {
  active?: boolean;
  glyph?: ReactNode;
} & ComponentPropsWithoutRef<"span">;

export function Tag({ active = false, glyph, className, children, ...rest }: TagProps) {
  return (
    <span className={cx("ao-tag", active && "ao-tag--active", className)} {...rest}>
      {glyph}
      {children}
    </span>
  );
}
