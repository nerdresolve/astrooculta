import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cx } from "./cx.ts";

export type FieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  /** Liga o <label> ao controle. Passe o mesmo id do <Input>. */
  htmlFor?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

export function Field({ label, hint, error, optional = false, htmlFor, className, children, ...rest }: FieldProps) {
  return (
    <div className={cx("ao-field", className)} {...rest}>
      {label && (
        <label className="ao-field__label" htmlFor={htmlFor}>
          {label}
          {optional && <span style={{ opacity: 0.6, textTransform: "none", letterSpacing: 0 }}> (opcional)</span>}
        </label>
      )}
      {children}
      {error ? (
        <span className="ao-field__error" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className="ao-field__hint">{hint}</span>
      ) : null}
    </div>
  );
}
