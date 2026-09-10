import { Luna } from "@/components/brand/luna.tsx";
import { Moonlit } from "@/components/brand/moonlit.tsx";
import { OrnateRule, StarLayer } from "@/components/brand/ornaments.tsx";
import { Button, Card, Divider, Eyebrow, Glyph, OrnateFrame, Starfield } from "@/components/ds";
import { PILLARS } from "@/content/site.ts";

import "./about.css";

const PRINCIPLES = [
  {
    glyph: "moon",
    title: "Descrever, não prever",
    body: "Falamos do que já está em movimento, nunca do que vai acontecer. Astrologia aqui é linguagem para se olhar, não oráculo de futuro.",
  },
  {
    glyph: "eye",
    title: "Sem cadastro, sem cobrança",
    body: "O quiz não pede login, e a data de nascimento é opcional. O que você responde não é guardado em servidor nenhum.",
  },
  {
    glyph: "diamond",
    title: "Mistério com clareza",
    body: "O tom é oracular, o método é explícito. Em Numerologia está escrito exatamente como o resultado é apurado.",
  },
] as const;

export function AboutView() {
  return (
    <>
      <header className="page-head">
        <Starfield dense haze />
        <StarLayer />
        <div className="wrap page-head__inner">
          <div style={{ width: "min(420px, 78vw)", margin: "0 auto var(--sp-6)" }}>
            <Luna variant="about" priority />
          </div>
          <Eyebrow items={["Sobre", "Astro Oculta"]} align="center" />
          <h1 className="page-head__title">
            Um caminho de <em className="accent">autoconhecimento</em>
          </h1>
          <p className="page-head__lead">
            Astro Oculta reúne astrologia, numerologia e tarô em um lugar só, não para adivinhar o que vem, mas
            para dar nome ao que já está aqui.
          </p>
        </div>
      </header>

      <section className="section">
        <Starfield />
        <div className="wrap wrap--narrow section__inner">
          <p className="about__lead">
            Nasceu de uma pergunta simples: por que os testes de personalidade que circulam por aí são tão
            rasos? A resposta virou este projeto: nove perguntas construídas sobre as vibrações numerológicas,
            doze caminhos possíveis em cada uma, e um resultado que fala com você em vez de te classificar.
          </p>
          <p className="about__lead">
            Não há promessa de amor, dinheiro ou sorte. Há um retrato do momento, e o convite de voltar daqui a
            alguns meses para ver o que mudou.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap section__inner">
          <Divider label="No que acreditamos" />
          <div className="grid grid--3 about__principles">
            {PRINCIPLES.map((principle) => (
              <Card key={principle.title} variant="framed" className="principle">
                <Glyph name={principle.glyph} size={30} />
                <h2 className="principle__title">{principle.title}</h2>
                <p className="principle__body">{principle.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <Starfield />
        <div className="wrap section__inner">
          <Divider label="Os seis pilares" />
          <div className="grid grid--6" style={{ marginTop: "var(--sp-12)" }}>
            {PILLARS.map((pillar) => (
              <div className="center" key={pillar.label}>
                <Glyph name={pillar.glyph} size={30} />
                <p
                  style={{
                    marginTop: "var(--sp-4)",
                    fontSize: "var(--fs-micro)",
                    letterSpacing: "var(--ls-nav)",
                    textTransform: "uppercase",
                    color: "var(--text-body)",
                  }}
                >
                  {pillar.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap section__inner">
          <OrnateFrame shape="notch">
            <div className="center">
              <div style={{ width: "min(300px, 70vw)", margin: "0 auto var(--sp-6)" }}>
                <Moonlit variant="hero" />
              </div>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.75rem)", lineHeight: 1.22, margin: 0 }}>
                Nove perguntas
                <br />
                para começar a olhar.
              </h2>
              <div style={{ maxWidth: 240, margin: "var(--sp-6) auto 0" }}>
                <OrnateRule />
              </div>
              <div style={{ margin: "var(--sp-8) 0 0" }}>
                <Button size="lg" glyph="star" href="/quiz">
                  Começar agora
                </Button>
              </div>
            </div>
          </OrnateFrame>
        </div>
      </section>
    </>
  );
}
