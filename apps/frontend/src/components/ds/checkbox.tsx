import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cx } from "./cx.ts";

export type CheckboxProps = {
  checked?: boolean;
  radio?: boolean;
  label: ReactNode;
} & Omit<ComponentPropsWithoutRef<"input">, "type" | "className">;

/**
 * O input real fica visualmente escondido, mas presente e focável — quem
 * navega por teclado ou leitor de tela usa ele; o quadrado dourado é só a
 * representação visual.
 */
export function Checkbox({ checked = false, radio = false, label, className, ...rest }: CheckboxProps & { className?: string }) {
  return (
    <label className={cx("ao-check", radio && "ao-check--radio", className)}>
      <input
        type={radio ? "radio" : "checkbox"}
        checked={checked}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        {...rest}
      />
      <span className={cx("ao-check__box", checked && "ao-check__box--on")} aria-hidden="true">
        {checked ? (radio ? "●" : "✓") : ""}
      </span>
      <span>{label}</span>
    </label>
  );
}
