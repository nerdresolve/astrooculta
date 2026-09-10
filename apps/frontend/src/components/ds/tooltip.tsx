import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cx } from "./cx.ts";

export type TooltipProps = {
  label: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"span">;

export function Tooltip({ label, className, children, ...rest }: TooltipProps) {
  return (
    <span className={cx("ao-tooltip", className)} {...rest}>
      {children}
      <span className="ao-tooltip__bubble" role="tooltip">
        {label}
      </span>
    </span>
  );
}
