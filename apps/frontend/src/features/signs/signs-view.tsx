"use client";

import Link from "next/link";
import { useState } from "react";

import { Moonlit } from "@/components/brand/moonlit.tsx";
import { StarLayer } from "@/components/brand/ornaments.tsx";
import { Button, Card, Divider, Eyebrow, Glyph, Starfield, Tabs } from "@/components/ds";
import { ELEMENTS, SIGNS, type Element } from "@/content/signs.ts";

import "./signs.css";

type Filter = "Todos" | Element;

const FILTERS: readonly Filter[] = ["Todos", ...ELEMENTS] as const;

/**
 * Catálogo dos doze signos, filtrável por elemento. É client component só por
 * causa do filtro — o conteúdo em si é estático.
 */
export function SignsView() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const list = filter === "Todos" ? SIGNS : SIGNS.filter((sign) => sign.element === filter);

  return (
    <>
      <header className="page-head">
        <Starfield dense haze />
        <StarLayer />
        <div className="wrap page-head__inner">
          <Eyebrow items={["Astrologia", "Os doze"]} align="center" />
          <h1 className="page-head__title">
            Os doze <em className="accent">signos</em>
          </h1>
          <p className="page-head__lead">
            Cada signo é um modo de estar no mundo: um jeito de começar, de amar, de encerrar um ciclo. Nenhum é
            melhor que o outro; todos existem em você, em proporções diferentes.
          </p>
        </div>
      </header>

      <section className="section">
        <Starfield />
        <div className="wrap section__inner">
          <div className="signs__filters">
            <Tabs items={FILTERS} value={filter} onChange={setFilter} />
          </div>

          <div className="grid grid--3 signs__grid">
            {list.map((sign) => (
              <Link key={sign.id} href={`/signos/${sign.id}`} className="signs__link">
                <Card variant="framed" interactive className="sign-card">
                  <div className="sign-card__head">
                    <Glyph name={sign.id} size={32} />
                    <span className="sign-card__element">{sign.element}</span>
                  </div>
                  <h2 className="sign-card__name">{sign.name}</h2>
                  <p className="sign-card__dates">{sign.dates}</p>
                  <p className="sign-card__essence">{sign.essence}</p>
                </Card>
              </Link>
            ))}
          </div>

          {list.length === 0 && <p className="center">Nenhum signo neste elemento.</p>}
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap wrap--narrow section__inner center">
          <Divider label="Não sabe por onde começar" />
          <div style={{ width: "min(300px, 70vw)", margin: "var(--sp-10) auto var(--sp-6)" }}>
            <Moonlit variant="signs" />
          </div>
          <p style={{ margin: "0 auto var(--sp-8)", maxWidth: "44ch", color: "var(--text-body)" }}>
            O quiz não pergunta a sua data de nascimento. Ele pergunta como você atravessa as coisas, e é daí que
            o signo aparece.
          </p>
          <Button size="lg" glyph="star" href="/quiz">
            Descobrir o meu
          </Button>
        </div>
      </section>
    </>
  );
}
