import { Button, Card, Divider, Eyebrow, Glyph, SignCard, Starfield, Tag } from "@/components/ds";
import { SIGNS, type Sign } from "@/content/signs.ts";

import "./signs.css";

/** Vizinhos na roda do zodíaco, para a navegação do rodapé. */
function neighbours(sign: Sign) {
  const index = SIGNS.findIndex((candidate) => candidate.id === sign.id);
  return {
    previous: SIGNS[(index - 1 + SIGNS.length) % SIGNS.length]!,
    next: SIGNS[(index + 1) % SIGNS.length]!,
  };
}

export function SignDetailView({ sign }: { sign: Sign }) {
  const { previous, next } = neighbours(sign);

  return (
    <>
      <header className="page-head">
        <Starfield dense haze />
        <div className="wrap page-head__inner">
          <Eyebrow items={[sign.element, `Regido por ${sign.ruler}`]} align="center" />
          <h1 className="page-head__title">{sign.name}</h1>
          <p className="page-head__lead">{sign.essence}</p>
        </div>
      </header>

      <section className="section">
        <Starfield />
        <div className="wrap section__inner">
          <div className="sign-detail">
            <SignCard sign={sign.id} name={sign.name} dates={sign.dates} element={sign.element} />

            <div>
              <p className="sign-detail__reading">{sign.reading}</p>

              <div className="sign-detail__traits">
                {sign.traits.map((trait) => (
                  <Tag key={trait} active>
                    {trait}
                  </Tag>
                ))}
              </div>

              <dl className="sign-detail__facts">
                {[
                  { label: "Elemento", value: sign.element },
                  { label: "Regente", value: sign.ruler },
                  { label: "Período", value: sign.dates },
                ].map((fact) => (
                  <div className="sign-fact" key={fact.label}>
                    <dt className="sign-fact__label">{fact.label}</dt>
                    <dd style={{ margin: 0, color: "var(--text-heading)" }}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="sign-nav">
            <Button variant="ghost" glyph="star4" glyphPosition="start" href={`/signos/${previous.id}`}>
              {previous.name}
            </Button>
            <Button variant="outline" glyph="star" href="/signos">
              Todos os signos
            </Button>
            <Button variant="ghost" glyph="star4" href={`/signos/${next.id}`}>
              {next.name}
            </Button>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap wrap--narrow section__inner center">
          <Divider label="Será que é o seu?" />
          <Card variant="veil" style={{ marginTop: "var(--sp-10)", padding: "var(--sp-10)" }}>
            <Glyph name={sign.id} size={34} />
            <p style={{ margin: "var(--sp-5) 0 var(--sp-8)", color: "var(--text-body)" }}>
              A data de nascimento diz qual é o seu signo solar. O quiz diz outra coisa: qual signo se parece com
              o modo como você decide, cuida e recomeça. Nem sempre é o mesmo.
            </p>
            <Button size="lg" glyph="star" href="/quiz">
              Fazer o quiz
            </Button>
          </Card>
        </div>
      </section>
    </>
  );
}
