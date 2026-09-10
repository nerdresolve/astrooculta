import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";

export type IconButtonProps = {
  size?: "sm" | "md" | "lg";
  bare?: boolean;
  /** Vira o `aria-label`: o conteúdo é um glifo, que não se lê. */
  label: string;
} & Omit<ComponentPropsWithoutRef<"button">, "aria-label">;

export function IconButton({ size = "md", bare = false, label, className, children, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cx("ao-iconbtn", `ao-iconbtn--${size}`, bare && "ao-iconbtn--bare", className)}
      {...rest}
    >
      {children}
    </button>
  );
}
