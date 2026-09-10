import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";

export type InputProps = { invalid?: boolean; multiline?: false } & ComponentPropsWithoutRef<"input">;
export type TextareaProps = { invalid?: boolean; multiline: true } & ComponentPropsWithoutRef<"textarea">;

export function Input(props: InputProps): React.JSX.Element;
export function Input(props: TextareaProps): React.JSX.Element;
export function Input({ invalid = false, multiline = false, className, ...rest }: InputProps | TextareaProps) {
  const cls = cx("ao-input", multiline && "ao-input--textarea", invalid && "ao-input--invalid", className);
  const shared = { className: cls, "aria-invalid": invalid || undefined };

  return multiline ? (
    <textarea {...shared} {...(rest as ComponentPropsWithoutRef<"textarea">)} />
  ) : (
    <input {...shared} {...(rest as ComponentPropsWithoutRef<"input">)} />
  );
}
