/* Import relativo, não `@/` — este módulo é a regra de domínio e roda no
   `node --test` sem bundler, onde o alias não existe. Ver package.json → test. */
import { QUIZ_QUESTIONS, TOTAL_QUESTIONS } from "../../content/quiz.ts";
import { SIGNS, SIGNS_BY_ID, type Sign, type SignId } from "../../content/signs.ts";

/** Respostas dadas: id da pergunta (índice) → id da alternativa escolhida. */
export type Answers = Record<number, string>;

export type SignScore = {
  sign: Sign;
  count: number;
  /** Inteiro de 0 a 100. A soma de todos fecha exatamente 100 — ver `distribute`. */
  percent: number;
};

export type QuizResult = {
  dominant: Sign;
  /** Todos os doze signos, do maior para o menor. */
  ranking: SignScore[];
  /** Só os que pontuaram, do maior para o menor. */
  scored: SignScore[];
  answered: number;
  total: number;
  /**
   * Vibração regente (1–9): a soma dos números das perguntas em que o signo
   * dominante foi escolhido, reduzida a um só dígito. É a redução teosófica que
   * a numerologia usa de fato — 12 vira 1+2=3 — aplicada às perguntas que
   * formaram o resultado, e não um número tirado do nada.
   */
  vibration: number;
};

/** Reduz a um só dígito somando os algarismos: 27 → 9, 12 → 3. */
function reduceToDigit(value: number): number {
  let current = Math.abs(value);
  while (current > 9) {
    current = String(current)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return current;
}

/**
 * Converte contagens em percentuais inteiros que somam exatamente 100.
 *
 * Arredondar cada parte isolada não fecha a conta: 9 respostas em 4 signos dá
 * 11,1% + 22,2% + 33,3% + 33,3% → 11 + 22 + 33 + 33 = 99, e o resultado mostra
 * "99%" para quem respondeu tudo. O método é o do maior resto: distribui a
 * sobra entre quem tem a maior fração descartada.
 */
function distribute(counts: Map<SignId, number>, total: number): Map<SignId, number> {
  const percents = new Map<SignId, number>();
  if (total === 0) return percents;

  const remainders: Array<{ id: SignId; remainder: number }> = [];
  let assigned = 0;

  for (const [id, count] of counts) {
    const exact = (count * 100) / total;
    const floor = Math.floor(exact);
    percents.set(id, floor);
    assigned += floor;
    remainders.push({ id, remainder: exact - floor });
  }

  // Empate no resto: mantém a ordem zodiacal, para o resultado ser determinístico.
  remainders.sort((a, b) => b.remainder - a.remainder);

  let leftover = 100 - assigned;
  for (const { id } of remainders) {
    if (leftover <= 0) break;
    percents.set(id, (percents.get(id) ?? 0) + 1);
    leftover -= 1;
  }

  return percents;
}

/**
 * Apura o resultado.
 *
 * Cada alternativa vale um ponto para o seu signo; o dominante é quem soma mais.
 * Em caso de empate, vence quem aparece primeiro na ordem zodiacal — regra
 * arbitrária, mas estável: a mesma resposta sempre dá o mesmo signo.
 */
export function scoreQuiz(answers: Answers): QuizResult {
  const counts = new Map<SignId, number>();
  /* Guarda em qual vibração cada signo foi escolhido, para a redução no fim. */
  const vibrationsBySign = new Map<SignId, number[]>();
  let answered = 0;

  QUIZ_QUESTIONS.forEach((question, index) => {
    const choiceId = answers[index];
    if (!choiceId) return;

    const option = question.options.find((candidate) => candidate.id === choiceId);
    if (!option) return;

    answered += 1;
    counts.set(option.sign, (counts.get(option.sign) ?? 0) + 1);
    vibrationsBySign.set(option.sign, [...(vibrationsBySign.get(option.sign) ?? []), question.vibration]);
  });

  const percents = distribute(counts, answered);

  const ranking: SignScore[] = SIGNS.map((sign) => ({
    sign,
    count: counts.get(sign.id) ?? 0,
    percent: percents.get(sign.id) ?? 0,
  })).sort((a, b) => b.count - a.count);

  const dominant = ranking[0]?.count ? ranking[0].sign : SIGNS_BY_ID.aries;

  const dominantVibrations = vibrationsBySign.get(dominant.id) ?? [];
  const vibrationSum = dominantVibrations.reduce((sum, value) => sum + value, 0);
  /* Sem resposta não há vibração a reduzir; o 1 é o início do ciclo. */
  const vibration = vibrationSum === 0 ? 1 : reduceToDigit(vibrationSum);

  return {
    dominant,
    ranking,
    scored: ranking.filter((entry) => entry.count > 0),
    answered,
    total: TOTAL_QUESTIONS,
    vibration,
  };
}

/**
 * Serializa as respostas para a URL do resultado, para o link poder ser
 * compartilhado e reaberto. Uma letra por pergunta, na ordem — `a` é a primeira
 * alternativa (Áries), `l` a última (Peixes). `-` marca pergunta sem resposta.
 */
export function encodeAnswers(answers: Answers): string {
  return QUIZ_QUESTIONS.map((question, index) => {
    const choiceId = answers[index];
    const position = question.options.findIndex((option) => option.id === choiceId);
    return position < 0 ? "-" : String.fromCharCode(97 + position);
  }).join("");
}

/** Inverso de `encodeAnswers`. Ignora silenciosamente o que não for válido. */
export function decodeAnswers(code: string): Answers {
  const answers: Answers = {};
  if (!code) return answers;

  QUIZ_QUESTIONS.forEach((question, index) => {
    const letter = code[index];
    if (!letter || letter === "-") return;

    const position = letter.charCodeAt(0) - 97;
    const option = question.options[position];
    if (option) answers[index] = option.id;
  });

  return answers;
}
