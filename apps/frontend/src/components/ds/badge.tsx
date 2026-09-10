import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";

export type BadgeProps = {
  tone?: "accent" | "gold" | "rose";
  /** Círculo de 28px com o número em serifa — usado nos passos e vibrações. */
  numeral?: boolean;
} & ComponentPropsWithoutRef<"span">;

export function Badge({ tone = "accent", numeral = false, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx("ao-badge", `ao-badge--${tone}`, numeral && "ao-badge--numeral", className)} {...rest}>
      {children}
    </span>
  );
}
