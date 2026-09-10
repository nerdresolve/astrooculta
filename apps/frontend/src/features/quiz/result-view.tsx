import Link from "next/link";

import { Luna } from "@/components/brand/luna.tsx";
import { OrnateRule, StarLayer } from "@/components/brand/ornaments.tsx";
import { Button, Card, Divider, Eyebrow, Glyph, SignBar, SignCard, Starfield, Tag } from "@/components/ds";
import { VIBRATIONS } from "@/content/vibrations.ts";
import { decodeAnswers, scoreQuiz } from "@/lib/quiz/score.ts";

import "./quiz.css";

/**
 * Resultado do quiz. Server component: a apuração é uma função pura sobre o
 * código que veio na URL, então não há motivo para mandar isso ao navegador.
 *
 * A URL é a fonte da verdade — o link pode ser compartilhado e reaberto e
 * mostra o mesmo resultado.
 */
export function ResultView({ code, name }: { code: string; name?: string }) {
  const answers = decodeAnswers(code);
  const result = scoreQuiz(answers);

  /* Ninguém respondeu nada: em vez de mostrar um resultado inventado, convida a
     fazer o quiz. Acontece quando alguém abre /quiz/resultado direto. */
  if (result.answered === 0) {
    return (
      <section className="quiz">
        <Starfield haze />
        <div className="quiz__inner quiz-intro">
          <Eyebrow items={["Resultado"]} align="center" />
          <h1 className="quiz-intro__title">Ainda não há o que revelar</h1>
          <p className="quiz-intro__body">
            Este link não traz respostas. Faça as nove perguntas e o seu signo aparece no fim.
          </p>
          <Button size="lg" glyph="star" href="/quiz">
            Fazer o quiz
          </Button>
        </div>
      </section>
    );
  }

  const { dominant, scored } = result;
  const greeting = name ? `${name}, sua essência é` : "Sua essência é";
  const partial = result.answered < result.total;
  /* A vibração vem da apuração — é a soma das perguntas em que este signo foi
     escolhido, reduzida a um dígito. Ver `scoreQuiz`. */
  const vibration = VIBRATIONS[result.vibration - 1]!;

  return (
    <section className="quiz">
      <Starfield dense haze />
      <StarLayer />
      <div className="quiz__inner result">
        <div className="result__hero">
          <p className="result__greeting">{greeting}</p>
          <div className="result__rule">
            <OrnateRule />
          </div>
        </div>

        <SignCard sign={dominant.id} name={dominant.name} dates={dominant.dates} element={dominant.element}>
          <p style={{ margin: 0 }}>{dominant.essence}</p>
        </SignCard>

        <p className="result__reading">{dominant.reading}</p>

        <div className="result__traits">
          {dominant.traits.map((trait) => (
            <Tag key={trait} active>
              {trait}
            </Tag>
          ))}
        </div>

        <div style={{ marginTop: "var(--sp-16)" }}>
          <Divider label="Como ficou a apuração" />
        </div>

        <div className="result__bars">
          {scored.map((entry) => (
            <SignBar key={entry.sign.id} sign={entry.sign.id} name={entry.sign.name} percent={entry.percent} />
          ))}
        </div>

        {partial && (
          <p className="result__note">
            Você respondeu {result.answered} de {result.total} perguntas. O resultado considera só o que foi
            respondido.
          </p>
        )}

        <div style={{ marginTop: "var(--sp-16)" }}>
          <Divider label="A vibração regente" />
        </div>

        <div className="result__luna">
          <Luna variant="result" />
        </div>

        <div style={{ marginTop: "var(--sp-10)" }}>
          <Card variant="veil">
            <div style={{ display: "flex", alignItems: "baseline", gap: "var(--sp-5)" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-display-3)",
                  lineHeight: 1,
                  color: "var(--accent-gold)",
                  opacity: 0.55,
                }}
              >
                {vibration.n}
              </span>
              <div>
                <h3 className="ao-card__title" style={{ marginBottom: 4 }}>
                  {vibration.name}
                </h3>
                <p className="ao-card__body">{vibration.detail}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="result__actions">
          <Button variant="outline" glyph="star4" href="/quiz">
            Refazer o quiz
          </Button>
          <Button glyph="star" href={`/signos/${dominant.id}`}>
            Conhecer {dominant.name}
          </Button>
        </div>

        <p className="result__note">
          <Glyph name="moon" size={12} /> Isto é um retrato do momento, não uma sentença. Volte daqui a alguns
          meses e compare. <Link href="/sobre">Entenda como lemos</Link>.
        </p>
      </div>
    </section>
  );
}
