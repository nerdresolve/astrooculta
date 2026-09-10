import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";

export type OrnateFrameProps = {
  shape?: "notch" | "arch" | "plain";
} & ComponentPropsWithoutRef<"div">;

/**
 * Painel com fio de ouro e cantos chanfrados. O `__edge` é uma camada separada
 * porque `clip-path` recorta a borda junto — o jeito de ter canto chanfrado *com*
 * fio é desenhar o fio em um irmão de mesmo recorte.
 */
export function OrnateFrame({ shape = "notch", className, children, ...rest }: OrnateFrameProps) {
  return (
    <div
      className={cx("ao-frame", shape === "notch" && "ao-frame--clip", shape === "arch" && "ao-frame--arch", className)}
      {...rest}
    >
      <div className="ao-starfield" />
      <div className="ao-frame__edge" />
      <div className="ao-frame__inner">{children}</div>
    </div>
  );
}
