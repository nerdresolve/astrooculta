import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cx } from "./cx.ts";

export type SwitchProps = {
  checked?: boolean;
  label?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"input">, "type" | "className">;

export function Switch({ checked = false, label, className, ...rest }: SwitchProps & { className?: string }) {
  return (
    <label className={cx("ao-switch", className)}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        {...rest}
      />
      <span className={cx("ao-switch__track", checked && "ao-switch__track--on")}>
        <span className="ao-switch__knob" />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
