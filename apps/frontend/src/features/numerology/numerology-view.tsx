import { Luna } from "@/components/brand/luna.tsx";
import { StarLayer } from "@/components/brand/ornaments.tsx";
import { Button, Card, Divider, Eyebrow, Glyph, OrnateFrame, Starfield } from "@/components/ds";
import { VIBRATIONS } from "@/content/vibrations.ts";

import "./numerology.css";

export function NumerologyView() {
  return (
    <>
      <header className="page-head">
        <Starfield dense haze />
        <StarLayer />
        <div className="wrap page-head__inner">
          {/* O cabeçalho ficava com muito ar sob o título; a arte preenche e
              dá o mesmo peso visual das outras páginas. */}
          <div style={{ width: "min(460px, 82vw)", margin: "0 auto var(--sp-2)" }}>
            <Luna variant="numerology" priority />
          </div>
          <Eyebrow items={["Numerologia", "As nove vibrações"]} align="center" />
          <h1 className="page-head__title">
            Os números que <em className="accent">revelam</em>
          </h1>
          <p className="page-head__lead">
            De um a nove, cada vibração descreve uma forma de energia: um jeito de começar, de sustentar, de
            concluir. As nove perguntas do quiz nascem exatamente delas.
          </p>
        </div>
      </header>

      <section className="section">
        <Starfield />
        <StarLayer className="section__stars" />
        <div className="wrap section__inner">
          <Divider label="Uma a uma" />
          <div className="vibrations">
            {VIBRATIONS.map((vibration) => (
              <Card key={vibration.n} variant="veil" className="vibration-card">
                <div className="vibration-card__head">
                  <span className="vibration-card__n">{vibration.n}</span>
                  <div>
                    <h2 className="vibration-card__name">{vibration.name}</h2>
                    <p className="vibration-card__keywords">{vibration.keywords.join("  ·  ")}</p>
                  </div>
                </div>
                <p className="vibration-card__detail">{vibration.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap section__inner">
          <OrnateFrame shape="notch">
            <div className="center">
              <h2 style={{ fontSize: "var(--fs-display-3)", lineHeight: 1.24, margin: 0 }}>
                Cada resposta possui um valor
                <br />
                numérico que revela sua essência.
              </h2>
              <div style={{ marginTop: "var(--sp-6)", color: "var(--accent-gold)", letterSpacing: ".4em" }} aria-hidden="true">
                <Glyph name="diamond" /> <Glyph name="sun" /> <Glyph name="diamond" />
              </div>
            </div>
          </OrnateFrame>
        </div>
      </section>

      <section className="section">
        <Starfield haze />
        <div className="wrap wrap--narrow section__inner center">
          <Divider label="Como o quiz usa isto" />
          {/* `result` e não `numerology`: esta última já abre a página. */}
          <div style={{ width: "min(360px, 76vw)", margin: "var(--sp-10) auto var(--sp-4)" }}>
            <Luna variant="result" />
          </div>
          <p style={{ margin: "var(--sp-8) 0", color: "var(--text-body)", fontSize: "var(--fs-body-lg)" }}>
            São nove perguntas, uma por vibração. Em cada uma há doze caminhos possíveis, um por signo, que você
            não vê. No fim, somamos: o signo mais escolhido é o que responde por você, e as perguntas em que ele
            apareceu formam a sua vibração regente.
          </p>
          <Button size="lg" glyph="star" href="/quiz">
            Fazer o quiz
          </Button>
        </div>
      </section>
    </>
  );
}
