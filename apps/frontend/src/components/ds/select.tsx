import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";

export type SelectOption = { value: string; label: string };

export type SelectProps = {
  options?: Array<string | SelectOption>;
} & ComponentPropsWithoutRef<"select">;

export function Select({ options = [], className, children, ...rest }: SelectProps) {
  return (
    <span className="ao-select-wrap">
      <select className={cx("ao-input", "ao-select", className)} {...rest}>
        {children ??
          options.map((option) =>
            typeof option === "string" ? (
              <option key={option} value={option}>
                {option}
              </option>
            ) : (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ),
          )}
      </select>
      <span className="ao-select-wrap__caret" aria-hidden="true">
        ▾
      </span>
    </span>
  );
}
