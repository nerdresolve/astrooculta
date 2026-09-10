/**
 * Embaralha de forma determinística, a partir de uma semente.
 *
 * Por que não `Math.random()`: as alternativas são geradas na ordem zodiacal
 * (Áries primeiro, Peixes por último). Exibi-las nessa ordem entregaria o jogo
 * para quem reparasse no padrão entre uma pergunta e outra — e o design system
 * é explícito em que a atribuição do signo nunca se revela antes do resultado.
 *
 * Mas embaralhar com aleatoriedade real quebraria a hidratação: servidor e
 * cliente sorteariam ordens diferentes para a mesma pergunta. Com semente fixa
 * (o índice da pergunta), os dois lados chegam à mesma ordem, que também se
 * mantém se a pessoa voltar para revisar a resposta.
 */

/** Gerador congruencial linear — os mesmos parâmetros do `minstd_rand`. */
function nextSeed(seed: number): number {
  return (seed * 48271) % 2147483647;
}

export function shuffleWithSeed<T>(items: readonly T[], seed: number): T[] {
  const result = [...items];
  /* A semente precisa ser positiva e não pode ser zero, senão o gerador trava. */
  let current = ((seed + 1) * 7919) % 2147483647 || 1;

  /* Fisher-Yates, de trás para frente. */
  for (let i = result.length - 1; i > 0; i -= 1) {
    current = nextSeed(current);
    const j = current % (i + 1);
    [result[i], result[j]] = [result[j]!, result[i]!];
  }

  return result;
}
