import { TarotTrio } from "@/components/brand/altar-objects.tsx";
import { Moonlit } from "@/components/brand/moonlit.tsx";
import { StarLayer } from "@/components/brand/ornaments.tsx";
import { Button, Card, Divider, Eyebrow, Starfield, Tag } from "@/components/ds";
import { POSTS } from "@/content/site.ts";

import "./blog.css";

export function BlogView() {
  const [lead, ...rest] = POSTS;

  return (
    <>
      <header className="page-head">
        <Starfield dense haze />
        <StarLayer />
        <div className="wrap page-head__inner">
          <Eyebrow items={["Diário", "Leituras"]} align="center" />
          <h1 className="page-head__title">
            Do <em className="accent">diário</em>
          </h1>
          <p className="page-head__lead">
            Textos sobre astrologia, numerologia e tarô, sem previsão de futuro, com atenção ao que já está
            acontecendo.
          </p>
        </div>
      </header>

      <section className="section">
        <Starfield />
        <div className="wrap section__inner">
          {lead && (
            <Card variant="framed" interactive className="post-lead">
              <div className="post-lead__body">
                <Tag>{lead.tag}</Tag>
                <h2 className="post-lead__title">{lead.title}</h2>
                <p className="post-lead__excerpt">{lead.excerpt}</p>
                <p className="post-lead__meta">{lead.read} de leitura</p>
              </div>
              <div className="post-lead__art" aria-hidden="true">
                <TarotTrio size="100%" />
              </div>
            </Card>
          )}

          <Divider label="Mais leituras" />

          <div className="grid grid--3 blog__grid">
            {rest.map((post) => (
              <Card key={post.slug} variant="veil" interactive className="post-item">
                <Tag>{post.tag}</Tag>
                <h3 className="post-item__title">{post.title}</h3>
                <p className="post-item__excerpt">{post.excerpt}</p>
                <p className="post-item__meta">{post.read} de leitura</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap wrap--narrow section__inner center">
          <Divider label="Enquanto isso" />
          <div style={{ width: "min(300px, 70vw)", margin: "var(--sp-10) auto var(--sp-4)" }}>
            <Moonlit variant="blog" />
          </div>
          <p style={{ margin: "var(--sp-8) 0", color: "var(--text-body)" }}>
            O quiz leva três minutos e não pede cadastro. É um bom começo antes de qualquer leitura.
          </p>
          <Button size="lg" glyph="star" href="/quiz">
            Fazer o quiz
          </Button>
        </div>
      </section>
    </>
  );
}
