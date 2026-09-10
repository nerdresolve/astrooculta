"use client";

import { useState } from "react";

import { SOCIAL } from "@/content/site.ts";
import { Button, Card, Checkbox, Eyebrow, Field, Glyph, Input, Starfield, Toast } from "@/components/ds";

import "./contact.css";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/** Validação de e-mail deliberadamente frouxa: algo@algo.algo. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactView() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [subscribe, setSubscribe] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    /* Some com o erro assim que a pessoa corrige — cobrar de novo só no envio. */
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();

    const next: Errors = {};
    if (!form.name.trim()) next.name = "Diga como podemos te chamar.";
    if (!EMAIL.test(form.email)) next.email = "Confira o e-mail: algo parece faltar.";
    if (form.message.trim().length < 10) next.message = "Escreva um pouco mais, para entendermos.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    /* Ainda não há backend: o envio de verdade entra quando existir o endpoint.
       Até lá o formulário valida, dá retorno e não finge que enviou. */
    setSent(true);
  }

  return (
    <>
      <header className="page-head">
        <Starfield dense haze />
        <div className="wrap page-head__inner">
          <Eyebrow items={["Contato", "Comunidade"]} align="center" />
          <h1 className="page-head__title">
            Fale com a <em className="accent">gente</em>
          </h1>
          <p className="page-head__lead">
            Dúvidas sobre leituras, cursos e agendamentos. Ou entre no círculo para receber as luas do mês.
          </p>
        </div>
      </header>

      <section className="section">
        <Starfield haze />
        <div className="wrap section__inner contact">
          <div className="contact__aside">
            <h2 className="contact__aside-title">Pelo WhatsApp</h2>
            <p className="contact__aside-body">
              É o caminho mais rápido. Respondemos de segunda a sexta, das 9h às 18h.
            </p>
            <Button variant="outline" glyph="moon" href={SOCIAL.whatsapp}>
              Abrir WhatsApp
            </Button>

            <dl className="contact__facts">
              {[
                { label: "E-mail", value: SOCIAL.email },
                { label: "Instagram", value: SOCIAL.handle },
                { label: "TikTok", value: SOCIAL.handle },
                { label: "Resposta", value: "Até 2 dias úteis" },
              ].map((fact) => (
                <div className="contact__fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Card variant="veil" className="contact__card">
            {sent ? (
              <div className="contact__sent">
                <Glyph name="star" size={34} twinkle />
                <h2 className="contact__sent-title">Mensagem anotada</h2>
                <p className="contact__sent-body">
                  Obrigada, {form.name.trim().split(" ")[0]}. Assim que houver resposta, ela chega em{" "}
                  {form.email}.
                </p>
                <Button
                  variant="ghost"
                  glyph="star4"
                  onClick={() => {
                    setForm({ name: "", email: "", message: "" });
                    setSent(false);
                  }}
                >
                  Escrever outra
                </Button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={submit} noValidate>
                <Field label="Nome ou apelido" htmlFor="contato-nome" error={errors.name}>
                  <Input
                    id="contato-nome"
                    value={form.name}
                    invalid={Boolean(errors.name)}
                    placeholder="Como podemos te chamar?"
                    onChange={(event) => update("name", event.target.value)}
                  />
                </Field>

                <Field label="E-mail" htmlFor="contato-email" error={errors.email}>
                  <Input
                    id="contato-email"
                    type="email"
                    value={form.email}
                    invalid={Boolean(errors.email)}
                    placeholder="voce@email.com"
                    onChange={(event) => update("email", event.target.value)}
                  />
                </Field>

                <Field label="Mensagem" htmlFor="contato-mensagem" error={errors.message}>
                  <Input
                    multiline
                    id="contato-mensagem"
                    value={form.message}
                    invalid={Boolean(errors.message)}
                    placeholder="Escreva sua pergunta"
                    onChange={(event) => update("message", event.target.value)}
                  />
                </Field>

                <Checkbox
                  checked={subscribe}
                  label="Quero receber leituras semanais"
                  onChange={() => setSubscribe((current) => !current)}
                />

                <Button glyph="star" block type="submit">
                  Enviar mensagem
                </Button>
              </form>
            )}
          </Card>
        </div>

        {sent && (
          <div className="contact__toast">
            <Toast>Recebemos a sua mensagem.</Toast>
          </div>
        )}
      </section>
    </>
  );
}
