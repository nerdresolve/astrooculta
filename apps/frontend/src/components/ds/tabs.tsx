import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";

export type TabsProps<T extends string> = {
  items: readonly T[];
  value: T;
  onChange: (value: T) => void;
} & Omit<ComponentPropsWithoutRef<"div">, "onChange">;

export function Tabs<T extends string>({ items, value, onChange, className, ...rest }: TabsProps<T>) {
  return (
    <div className={cx("ao-tabs", className)} role="tablist" {...rest}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          role="tab"
          aria-selected={item === value}
          className={cx("ao-tab", item === value && "ao-tab--active")}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
