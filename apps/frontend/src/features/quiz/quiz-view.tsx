"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Moonlit } from "@/components/brand/moonlit.tsx";
import { StarLayer } from "@/components/brand/ornaments.tsx";
import {
  AnswerList,
  Button,
  Eyebrow,
  Field,
  Glyph,
  Input,
  QuizProgress,
  QuizQuestion,
  Starfield,
  cx,
} from "@/components/ds";
import { QUIZ_QUESTIONS, TOTAL_QUESTIONS } from "@/content/quiz.ts";
import { encodeAnswers, type Answers } from "@/lib/quiz/score.ts";

import { shuffleWithSeed } from "./shuffle.ts";

import "./quiz.css";

type Stage = "intro" | "questions";

/**
 * O quiz inteiro: abertura, nove perguntas e o envio para o resultado.
 *
 * O estado vive aqui e não numa store global — ele não sobrevive à navegação de
 * propósito. O que precisa durar (as respostas) viaja na URL do resultado, que
 * assim pode ser compartilhada e reaberta.
 */
export function QuizView() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("intro");
  const [name, setName] = useState("");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const question = QUIZ_QUESTIONS[index]!;

  /* Embaralha por pergunta, com o índice como semente: a ordem zodiacal não
     pode virar pista, mas precisa ser estável entre servidor e cliente. */
  const options = useMemo(() => shuffleWithSeed(question.options, index), [question.options, index]);

  const selected = answers[index] ?? null;
  const isLast = index === TOTAL_QUESTIONS - 1;

  function select(optionId: string) {
    setAnswers((current) => ({ ...current, [index]: optionId }));
  }

  function goNext() {
    if (!selected) return;

    if (!isLast) {
      setIndex(index + 1);
      return;
    }

    const params = new URLSearchParams({ r: encodeAnswers({ ...answers, [index]: selected }) });
    if (name.trim()) params.set("n", name.trim());
    router.push(`/quiz/resultado?${params.toString()}`);
  }

  if (stage === "intro") {
    return (
      <section className="quiz">
        <Starfield dense haze />
        <StarLayer />
        <div className="quiz__inner quiz-intro">
          <div className="quiz-intro__cat">
            <Moonlit variant="quiz" priority />
          </div>
          <Eyebrow items={["Quiz", "9 perguntas"]} align="center" />
          <h1 className="quiz-intro__title">
            Qual signo representa <em className="accent">sua essência</em>?
          </h1>
          <p className="quiz-intro__body">
            Cada pergunta nasce de uma vibração numerológica, de um a nove. Responda com o que vier primeiro:
            a primeira resposta costuma ser a mais honesta.
          </p>

          <div className="quiz-intro__form">
            <Field label="Nome ou apelido" optional htmlFor="quiz-nome" hint="Só para personalizar o resultado.">
              <Input
                id="quiz-nome"
                value={name}
                maxLength={40}
                placeholder="Como podemos te chamar?"
                onChange={(event) => setName(event.target.value)}
              />
            </Field>
          </div>

          <Button size="lg" glyph="star" onClick={() => setStage("questions")}>
            Começar
          </Button>

          <div className="quiz-intro__facts">
            {[
              { n: "9", label: "Perguntas" },
              { n: "12", label: "Signos" },
              { n: "3 min", label: "Duração" },
            ].map((fact) => (
              <div className="quiz-fact" key={fact.label}>
                <div className="quiz-fact__n">{fact.n}</div>
                <p className="quiz-fact__label">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz">
      <Starfield haze />
      <StarLayer />
      <div className="quiz__inner">
        <div className="quiz-step__progress">
          <QuizProgress current={index + 1} total={TOTAL_QUESTIONS} />
        </div>

        <QuizQuestion
          vibration={question.vibration}
          prompt={question.prompt}
          question={question.question}
          id={`pergunta-${index}`}
        />

        <div className="quiz-step__answers">
          <AnswerList
            answers={options}
            value={selected}
            onSelect={select}
            labelledBy={`pergunta-${index}`}
          />
        </div>

        <div className="quiz-step__nav">
          <Button
            variant="ghost"
            className={cx(index === 0 && "is-hidden")}
            glyph="star4"
            glyphPosition="start"
            onClick={() => setIndex(Math.max(0, index - 1))}
          >
            Voltar
          </Button>

          <Button glyph="star" disabled={!selected} onClick={goNext}>
            {isLast ? "Revelar meu signo" : "Avançar"}
          </Button>
        </div>

        {!selected && (
          <p style={{ marginTop: "var(--sp-6)", textAlign: "center", color: "var(--text-muted)", fontSize: "var(--fs-caption)" }}>
            <Glyph name="dot" size={11} /> Escolha uma alternativa para seguir
          </p>
        )}
      </div>
    </section>
  );
}
