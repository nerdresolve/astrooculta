/**
 * Converte a arte da marca (PNG grande) para WebP nos tamanhos que o site usa.
 *
 * Entrada:  src/assets/*.png        — originais, ~2 MB cada, não versionados no bundle
 * Saída:    public/brand/*.webp     — servidos ao navegador
 *
 * Por que WebP e não o PNG original: os PNGs somam ~17 MB. Em WebP com
 * qualidade 82 e alfa preservado, o conjunto cai para uns 400 KB — mesma
 * aparência, 40× menos peso. WebP tem suporte universal desde 2020.
 *
 * Por que dois tamanhos: `@1x` é a largura real de exibição no site; `@2x`
 * cobre telas retina. O `srcSet` no componente deixa o navegador escolher, e
 * quem está em tela comum nunca baixa a versão grande.
 *
 * Rode com: npm run art
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = join(here, "..", "src", "assets");
const OUT = join(here, "..", "public", "brand");

/**
 * Larguras de exibição por arquivo, em CSS px.
 *
 * IMPORTANTE: estes valores precisam ser a maior largura que a imagem assume
 * no site, com folga. A primeira versão usava valores apertados (300px para o
 * hero, 200px para as menores) e o resultado ficou visivelmente borrado —
 * quando o CSS estica a imagem além da largura gerada, não há pixel para
 * mostrar. É melhor gerar com folga e deixar o `sizes` do <Image> decidir o
 * que baixar do que economizar bytes e perder nitidez.
 */
const TARGETS = {
  "luna.png": { name: "luna-hero", width: 560 },
  "luna1.png": { name: "luna-about", width: 520 },
  "luna2.png": { name: "luna-numerology", width: 640 },
  "luna3.png": { name: "luna-result", width: 460 },
  "moonlit1.png": { name: "moonlit-hero", width: 620 },
  "moonlit2.png": { name: "moonlit-quiz", width: 420 },
  "moonlit3.png": { name: "moonlit-blog", width: 420 },
  "moonlit4.png": { name: "moonlit-signs", width: 420 },
};

/* 88 em vez de 82: a arte tem gradiente suave e muito detalhe fino (fios de
   ouro, brilho da bola de cristal), e nessa faixa o WebP começa a chapar. */
const QUALITY = 88;

async function main() {
  await mkdir(OUT, { recursive: true });

  const files = (await readdir(SRC)).filter((f) => f.toLowerCase().endsWith(".png"));
  if (files.length === 0) {
    console.error(`Nenhum PNG em ${SRC}`);
    process.exitCode = 1;
    return;
  }

  let totalIn = 0;
  let totalOut = 0;
  const rows = [];

  for (const file of files) {
    const target = TARGETS[file];
    if (!target) {
      console.warn(`  ignorado (sem destino definido): ${file}`);
      continue;
    }

    const inPath = join(SRC, file);
    const { size: inSize } = await stat(inPath);
    totalIn += inSize;

    const source = sharp(inPath);
    const meta = await source.metadata();
    const ratio = meta.height / meta.width;

    for (const scale of [1, 2]) {
      const width = target.width * scale;
      /* `withoutEnlargement` evita upscale: se o original for menor que o
         alvo, mantém o tamanho original em vez de esticar e borrar. */
      const outName = `${target.name}${scale === 2 ? "@2x" : ""}.webp`;
      const outPath = join(OUT, outName);

      await sharp(inPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6, alphaQuality: 90 })
        .toFile(outPath);

      const { size: outSize } = await stat(outPath);
      totalOut += outSize;
      rows.push({
        arquivo: outName,
        px: `${width}×${Math.round(width * ratio)}`,
        kb: (outSize / 1024).toFixed(1),
      });
    }
  }

  console.table(rows);
  console.log(
    `\nEntrada: ${(totalIn / 1024 / 1024).toFixed(1)} MB  →  Saída: ${(totalOut / 1024).toFixed(0)} KB` +
      `  (${(100 - (totalOut / totalIn) * 100).toFixed(1)}% menor)`,
  );
}

await main();
