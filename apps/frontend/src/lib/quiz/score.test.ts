import assert from "node:assert/strict";
import { test } from "node:test";

import { QUIZ_QUESTIONS, TOTAL_QUESTIONS } from "../../content/quiz.ts";
import { SIGNS } from "../../content/signs.ts";
import { decodeAnswers, encodeAnswers, scoreQuiz, type Answers } from "./score.ts";

/** Responde todas as perguntas escolhendo sempre a alternativa do mesmo signo. */
function answerAllWith(sign: string): Answers {
  const answers: Answers = {};
  QUIZ_QUESTIONS.forEach((question, index) => {
    const option = question.options.find((candidate) => candidate.sign === sign);
    if (option) answers[index] = option.id;
  });
  return answers;
}

test("o conteúdo tem nove perguntas, cada uma com doze alternativas", () => {
  assert.equal(QUIZ_QUESTIONS.length, 9);
  assert.equal(TOTAL_QUESTIONS, 9);

  for (const question of QUIZ_QUESTIONS) {
    assert.equal(question.options.length, 12, `vibração ${question.vibration}`);

    const signs = new Set(question.options.map((option) => option.sign));
    assert.equal(signs.size, 12, `vibração ${question.vibration} repete signo`);
  }
});

test("cada vibração de 1 a 9 aparece uma vez", () => {
  const vibrations = QUIZ_QUESTIONS.map((question) => question.vibration);
  assert.deepEqual(vibrations, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("os ids das alternativas são únicos em todo o quiz", () => {
  const ids = QUIZ_QUESTIONS.flatMap((question) => question.options.map((option) => option.id));
  assert.equal(new Set(ids).size, ids.length);
});

test("responder tudo pelo mesmo signo dá aquele signo com 100%", () => {
  for (const sign of SIGNS) {
    const result = scoreQuiz(answerAllWith(sign.id));

    assert.equal(result.dominant.id, sign.id);
    assert.equal(result.answered, 9);
    assert.equal(result.scored.length, 1);
    assert.equal(result.scored[0]?.percent, 100);
  }
});

test("os percentuais somam exatamente 100 mesmo quando a divisão não é exata", () => {
  // 4 de Áries, 3 de Touro, 2 de Gêmeos: 44,4 + 33,3 + 22,2 — nenhum é inteiro.
  const answers: Answers = {};
  const plan = [
    ["aries", 4],
    ["taurus", 3],
    ["gemini", 2],
  ] as const;

  let index = 0;
  for (const [sign, times] of plan) {
    for (let i = 0; i < times; i += 1) {
      const option = QUIZ_QUESTIONS[index]?.options.find((candidate) => candidate.sign === sign);
      if (option) answers[index] = option.id;
      index += 1;
    }
  }

  const result = scoreQuiz(answers);
  const total = result.ranking.reduce((sum, entry) => sum + entry.percent, 0);

  assert.equal(total, 100);
  assert.equal(result.dominant.id, "aries");
});

test("a soma fecha 100 para qualquer distribuição de um signo por pergunta", () => {
  const answers: Answers = {};
  QUIZ_QUESTIONS.forEach((question, index) => {
    answers[index] = question.options[index % 12]!.id;
  });

  const result = scoreQuiz(answers);
  assert.equal(result.ranking.reduce((sum, entry) => sum + entry.percent, 0), 100);
});

test("quiz sem resposta não quebra e não inventa pontuação", () => {
  const result = scoreQuiz({});

  assert.equal(result.answered, 0);
  assert.equal(result.scored.length, 0);
  assert.equal(result.ranking.length, 12);
  assert.ok(result.ranking.every((entry) => entry.percent === 0));
});

test("responder em parte apura só o que foi respondido", () => {
  const first = QUIZ_QUESTIONS[0]!.options.find((option) => option.sign === "leo")!;
  const result = scoreQuiz({ 0: first.id });

  assert.equal(result.answered, 1);
  assert.equal(result.dominant.id, "leo");
  assert.equal(result.scored[0]?.percent, 100);
});

test("alternativa desconhecida é ignorada", () => {
  const result = scoreQuiz({ 0: "nao-existe" });
  assert.equal(result.answered, 0);
});

test("o ranking traz os doze signos, do maior para o menor", () => {
  const result = scoreQuiz(answerAllWith("scorpio"));

  assert.equal(result.ranking.length, 12);
  for (let i = 1; i < result.ranking.length; i += 1) {
    assert.ok(result.ranking[i - 1]!.count >= result.ranking[i]!.count);
  }
});

test("a vibração regente é um dígito de 1 a 9", () => {
  for (const sign of SIGNS) {
    const { vibration } = scoreQuiz(answerAllWith(sign.id));
    assert.ok(vibration >= 1 && vibration <= 9, `${sign.id} deu ${vibration}`);
    assert.equal(Number.isInteger(vibration), true);
  }
});

test("a vibração sai da soma das perguntas do signo dominante, reduzida", () => {
  // Respondendo tudo pelo mesmo signo, somam-se as vibrações 1..9 = 45 → 4+5 = 9.
  assert.equal(scoreQuiz(answerAllWith("leo")).vibration, 9);

  // Só a pergunta 3 (vibração 3): soma 3, que já é um dígito.
  const third = QUIZ_QUESTIONS[2]!.options.find((option) => option.sign === "virgo")!;
  assert.equal(scoreQuiz({ 2: third.id }).vibration, 3);

  // Perguntas 4 e 8 (vibrações 4 e 8): 12 → 1+2 = 3.
  const fourth = QUIZ_QUESTIONS[3]!.options.find((option) => option.sign === "libra")!;
  const eighth = QUIZ_QUESTIONS[7]!.options.find((option) => option.sign === "libra")!;
  assert.equal(scoreQuiz({ 3: fourth.id, 7: eighth.id }).vibration, 3);
});

test("quiz vazio devolve a vibração 1, sem quebrar", () => {
  assert.equal(scoreQuiz({}).vibration, 1);
});

test("codificar e decodificar devolve as mesmas respostas", () => {
  const answers = answerAllWith("pisces");
  const code = encodeAnswers(answers);

  assert.equal(code.length, 9);
  assert.deepEqual(decodeAnswers(code), answers);
  assert.equal(scoreQuiz(decodeAnswers(code)).dominant.id, "pisces");
});

test("código parcial usa hífen e sobrevive à ida e volta", () => {
  const single = QUIZ_QUESTIONS[2]!.options[5]!;
  const code = encodeAnswers({ 2: single.id });

  assert.equal(code, "--f------");
  assert.deepEqual(decodeAnswers(code), { 2: single.id });
});

test("código inválido não quebra a decodificação", () => {
  assert.deepEqual(decodeAnswers(""), {});
  assert.deepEqual(decodeAnswers("zzzzzzzzz"), {});
  assert.deepEqual(decodeAnswers("!!!"), {});
});
