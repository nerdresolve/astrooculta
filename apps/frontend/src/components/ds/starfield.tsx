import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";

export type StarfieldProps = {
  dense?: boolean;
  haze?: boolean;
} & ComponentPropsWithoutRef<"div">;

/**
 * Camada atmosférica: pontos de 1–1.6px sobre o fundo. É `position:absolute`,
 * então o pai precisa de `position:relative` e `overflow:hidden`, e o conteúdo
 * que vem depois precisa de `position:relative` para ficar por cima.
 */
export function Starfield({ dense = false, haze = false, className, ...rest }: StarfieldProps) {
  return (
    <>
      <div className={cx("ao-starfield", dense && "ao-starfield--dense", className)} {...rest} />
      {haze && <div className="ao-haze" />}
    </>
  );
}
