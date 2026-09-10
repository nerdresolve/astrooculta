import { Button, Eyebrow, Glyph, Starfield } from "@/components/ds";

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <Starfield dense haze />
      <div className="wrap wrap--narrow section__inner center">
        <Glyph name="moon" size={44} twinkle />
        <Eyebrow items={["Erro 404"]} align="center" />
        <h1 style={{ fontSize: "var(--fs-display-2)", margin: "var(--sp-5) 0" }}>
          Esta página está em <em className="accent">outro plano</em>
        </h1>
        <p style={{ maxWidth: "42ch", margin: "0 auto var(--sp-10)", color: "var(--text-body)" }}>
          O endereço não existe, ou existiu e se dissolveu. Acontece.
        </p>
        <Button size="lg" glyph="star" href="/">
          Voltar ao início
        </Button>
      </div>
    </section>
  );
}
