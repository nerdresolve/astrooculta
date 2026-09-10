import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";

export type QuizProgressProps = {
  total?: number;
  current: number;
  label?: string;
} & ComponentPropsWithoutRef<"div">;

export function QuizProgress({ total = 9, current, label, className, ...rest }: QuizProgressProps) {
  const text = label ?? `Pergunta ${current} de ${total}`;

  return (
    <div
      className={cx("ao-progress", className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-valuetext={text}
      {...rest}
    >
      <span className="ao-progress__count">{text}</span>
      <div className="ao-progress__steps">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cx(
              "ao-progress__step",
              i + 1 < current && "ao-progress__step--done",
              i + 1 === current && "ao-progress__step--current",
            )}
          />
        ))}
      </div>
    </div>
  );
}
