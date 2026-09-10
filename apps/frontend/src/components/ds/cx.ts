/**
 * Junta nomes de classe descartando o que for falso.
 *
 * Os componentes do design system montam classe por concatenação condicional
 * (`["ao-btn", "ao-btn--" + variant, block && "ao-btn--block"]`). Isto é só o
 * mesmo padrão em um lugar só, tipado.
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
