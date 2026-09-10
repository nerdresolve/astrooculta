import { cx } from "./cx.ts";

export type Answer = {
  id: string;
  text: string;
};

export type AnswerListProps = {
  answers: readonly Answer[];
  value: string | null;
  onSelect: (id: string) => void;
  columns?: number;
  /** Id do <h2> da pergunta, para o grupo de rádio ser anunciado com ela. */
  labelledBy?: string;
  className?: string;
};

/**
 * `radiogroup` em vez de botões soltos: só uma resposta vale por pergunta, e é
 * assim que o leitor de tela anuncia "2 de 12".
 */
export function AnswerList({ answers, value, onSelect, columns = 1, labelledBy, className }: AnswerListProps) {
  return (
    <div
      className={cx("ao-answers", className)}
      style={{ gridTemplateColumns: `repeat(${columns},minmax(0,1fr))` }}
      role="radiogroup"
      aria-labelledby={labelledBy}
    >
      {answers.map((answer) => {
        const selected = value === answer.id;
        return (
          <button
            key={answer.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(answer.id)}
            className={cx("ao-answer", selected && "ao-answer--selected")}
          >
            <span className="ao-answer__mark" aria-hidden="true">
              {selected ? "✓" : ""}
            </span>
            <span>{answer.text}</span>
          </button>
        );
      })}
    </div>
  );
}
