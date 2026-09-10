import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx.ts";

export type QuizQuestionProps = {
  /** O numeral da vibração (1–9), em serifa dourada sobre a pergunta. */
  vibration?: number;
  question: string;
  prompt?: string;
  id?: string;
} & ComponentPropsWithoutRef<"div">;

export function QuizQuestion({ vibration, question, prompt, id, className, ...rest }: QuizQuestionProps) {
  return (
    <div className={cx("ao-question", className)} {...rest}>
      {vibration != null && (
        <div className="ao-question__vibe" aria-hidden="true">
          {vibration}
        </div>
      )}
      {prompt && (
        <p
          style={{
            fontSize: "var(--fs-caption)",
            letterSpacing: "var(--ls-eyebrow)",
            textTransform: "uppercase",
            color: "var(--text-eyebrow)",
            margin: "var(--sp-3) 0 0",
          }}
        >
          {prompt}
        </p>
      )}
      <h2 className="ao-question__text" id={id}>
        {question}
      </h2>
    </div>
  );
}
