import { AltarScene } from "@/components/brand/altar-scene.tsx";
import { Candle, CrystalBall, Crystals, HeartAmulet, TarotTrio } from "@/components/brand/altar-objects.tsx";
import { Luna } from "@/components/brand/luna.tsx";
import { Moonlit } from "@/components/brand/moonlit.tsx";
import { CloudBand, CornerFlourish, OrnateRule, StarLayer } from "@/components/brand/ornaments.tsx";
import { Badge, Button, Card, Divider, Eyebrow, Glyph, Starfield, Tag } from "@/components/ds";
import { HERO, PILLARS, PILLARS_TITLE, POSTS, QUOTE } from "@/content/site.ts";
import { SIGNS } from "@/content/signs.ts";
import { VIBRATIONS } from "@/content/vibrations.ts";

import "./home.css";

/**
 * Homepage. Server component: nada aqui tem estado.
 *
 * A ordem das seções vem do UI kit do design system. Cada passo de "Como
 * funciona" recebe uma ilustração no lugar do glifo solto — é assim nas
 * referências, e é o que tira a página do aspecto de wireframe.
 */
const STEP_ART = [TarotTrio, CrystalBall, HeartAmulet] as const;

const STEPS = [
  {
    n: 1,
    title: "Responda 9 perguntas",
    body: "Questões de numerologia sobre a sua personalidade e as suas escolhas.",
  },
  {
    n: 2,
    title: "A conta é feita",
    body: "Cada resposta carrega um valor numérico, e a soma aponta uma direção.",
  },
  {
    n: 3,
    title: "O signo aparece",
    body: "Você vê o signo dominante, o percentual de cada um e uma leitura sua.",
  },
] as const;

export function HomeView() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <Starfield dense haze />
        <StarLayer />
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <Eyebrow items={[...HERO.eyebrow]} />
            <h1 className="hero__title">
              {HERO.title[0]}
              <br />
              {HERO.title[1]}
              <br />
              {HERO.title[2]}
              <em className="accent">{HERO.accent}</em>
              <Glyph name="star" size={20} className="hero__title-star" />
            </h1>
            <p className="hero__body">{HERO.body}</p>
            <div className="hero__actions">
              <Button size="lg" glyph="star" href="/quiz">
                {HERO.cta}
              </Button>
            </div>
            <Eyebrow items={[...HERO.trust]} />
          </div>

          <div className="hero__art">
            <AltarScene />
          </div>
        </div>

        <div className="cloud cloud--bottom">
          <CloudBand />
        </div>
      </section>

      {/* ── Como funciona ────────────────────────────────────── */}
      <section className="section section--alt">
        <StarLayer className="section__stars" />
        <div className="wrap section__inner">
          <Divider label="Como funciona" />

          <div className="steps">
            {STEPS.map((step, i) => {
              const Art = STEP_ART[i]!;
              return (
                <article className="step" key={step.n}>
                  <span className="step__badge">
                    <Badge numeral>{step.n}</Badge>
                  </span>
                  <div className="step__art">
                    <Art size="100%" />
                  </div>
                  {/* h2: o rótulo da seção ("Como funciona") é um Divider, que
                      não é heading — sem isto o h3 pula um nível e quebra a
                      hierarquia que o leitor de tela usa para navegar. */}
                  <h2 className="step__title">{step.title}</h2>
                  <p className="step__body">{step.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Citação, com Luna ────────────────────────────────── */}
      <section className="section--alt quote-section">
        <div className="wrap">
          <div className="quote-frame">
            <StarLayer />
            <span className="quote-frame__corner quote-frame__corner--tl">
              <CornerFlourish />
            </span>
            <span className="quote-frame__corner quote-frame__corner--tr">
              <CornerFlourish />
            </span>
            <span className="quote-frame__corner quote-frame__corner--bl">
              <CornerFlourish />
            </span>
            <span className="quote-frame__corner quote-frame__corner--br">
              <CornerFlourish />
            </span>

            <div className="quote-frame__luna">
              <Luna variant="hero" />
            </div>

            <blockquote className="quote">
              <p className="quote__text">
                {QUOTE[0]}
                <br />
                {QUOTE[1]}
              </p>
              <div className="quote__rule">
                <OrnateRule />
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Pilares ──────────────────────────────────────────── */}
      <section className="section pillars-section">
        <Starfield />
        <StarLayer className="section__stars" />
        <div className="wrap section__inner">
          <Divider label={PILLARS_TITLE} />
          <div className="pillars">
            {PILLARS.map((pillar) => (
              <div className="pillar" key={pillar.label}>
                <span className="pillar__ring">
                  <Glyph name={pillar.glyph} size={26} />
                </span>
                <p className="pillar__label">{pillar.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signos ───────────────────────────────────────────── */}
      <section className="section section--alt">
        <StarLayer className="section__stars" />
        <div className="wrap section__inner">
          <Divider label="Os doze signos" />
          <div className="grid grid--4 signs-preview">
            {SIGNS.slice(0, 8).map((sign) => (
              <Card key={sign.id} variant="framed" interactive className="center sign-tile">
                <Glyph name={sign.id} size={30} />
                <h3 className="sign-tile__name">{sign.name}</h3>
                <p className="sign-tile__dates">{sign.dates}</p>
              </Card>
            ))}
          </div>
          <div className="center section__cta">
            <Button variant="outline" glyph="star" href="/signos">
              Ver os doze
            </Button>
          </div>
        </div>
      </section>

      {/* ── Numerologia ──────────────────────────────────────── */}
      <section className="section numerology-section">
        <Starfield />
        <StarLayer className="section__stars" />
        <div className="wrap section__inner">
          <Divider label="As nove vibrações" />
          <div className="grid grid--3 vibrations-preview">
            {VIBRATIONS.map((vibration) => (
              <Card key={vibration.n} variant="veil">
                <div className="vibration">
                  <span className="vibration__n">{vibration.n}</span>
                  <div>
                    <h3 className="ao-card__title" style={{ marginBottom: 4 }}>
                      {vibration.name}
                    </h3>
                    <p className="ao-card__body">{vibration.body}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="numerology-section__crystals" aria-hidden="true">
          <Crystals size="100%" />
        </div>
      </section>

      {/* ── Blog ─────────────────────────────────────────────── */}
      <section className="section section--alt">
        <StarLayer className="section__stars" />
        <div className="wrap section__inner">
          <Divider label="Do diário" />
          <div className="grid grid--4 posts-preview">
            {POSTS.map((post) => (
              <Card key={post.slug} variant="framed" interactive className="post">
                <Tag>{post.tag}</Tag>
                <h3 className="post__title">{post.title}</h3>
                <p className="post__meta">{post.read} de leitura</p>
              </Card>
            ))}
          </div>
          <div className="center section__cta">
            <Button variant="outline" glyph="star" href="/blog">
              Ler o diário
            </Button>
          </div>
        </div>
      </section>

      {/* ── Chamada final ────────────────────────────────────── */}
      <section className="section closing-section">
        <Starfield haze />
        <StarLayer className="section__stars" />
        <div className="cloud cloud--top">
          <CloudBand flip />
        </div>

        <div className="wrap wrap--narrow section__inner closing">
          <div className="closing__cat">
            {/* `signs` e não `hero`: a de frente já apareceu no topo da mesma
                página — variar evita a sensação de imagem repetida. */}
            <Moonlit variant="signs" />
          </div>
          <Eyebrow items={["Comece agora"]} align="center" />
          <h2 className="closing__title">
            Nove perguntas até a sua <em className="accent">essência</em>
          </h2>
          <p className="closing__body">
            Não é preciso cadastro, nem data de nascimento. Só o tempo de uma xícara de chá e alguma honestidade
            com você mesma.
          </p>
          <Button size="lg" glyph="star" href="/quiz">
            Fazer o quiz
          </Button>

          <div className="closing__candle" aria-hidden="true">
            <Candle size="100%" />
          </div>
        </div>
      </section>
    </>
  );
}
