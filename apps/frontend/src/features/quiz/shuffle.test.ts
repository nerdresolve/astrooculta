import assert from "node:assert/strict";
import { test } from "node:test";

import { shuffleWithSeed } from "./shuffle.ts";

const twelve = Array.from({ length: 12 }, (_, i) => i);

test("preserva todos os itens, sem perder nem duplicar", () => {
  const shuffled = shuffleWithSeed(twelve, 3);

  assert.equal(shuffled.length, 12);
  assert.deepEqual([...shuffled].sort((a, b) => a - b), twelve);
});

test("a mesma semente dá sempre a mesma ordem", () => {
  // É disto que depende a hidratação: servidor e cliente precisam concordar.
  assert.deepEqual(shuffleWithSeed(twelve, 5), shuffleWithSeed(twelve, 5));
});

test("sementes diferentes dão ordens diferentes", () => {
  const orders = new Set(Array.from({ length: 9 }, (_, i) => shuffleWithSeed(twelve, i).join(",")));
  assert.ok(orders.size >= 8, `esperava ordens distintas, obtive ${orders.size}`);
});

test("de fato embaralha — não devolve a ordem zodiacal original", () => {
  for (let seed = 0; seed < 9; seed += 1) {
    assert.notDeepEqual(shuffleWithSeed(twelve, seed), twelve, `semente ${seed} não embaralhou`);
  }
});

test("não quebra com lista vazia ou de um item só", () => {
  assert.deepEqual(shuffleWithSeed([], 0), []);
  assert.deepEqual(shuffleWithSeed(["a"], 0), ["a"]);
});

test("não altera a lista recebida", () => {
  const original = [...twelve];
  shuffleWithSeed(original, 2);
  assert.deepEqual(original, twelve);
});
