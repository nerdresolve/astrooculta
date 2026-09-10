/**
 * Gera favicons e o logo do cabeçalho a partir de `src/assets/logooculta.png`.
 *
 * Separado do `build-brand-art.mjs` de propósito: aquele converte ilustração
 * para WebP em dois tamanhos, uma regra só para todas. Logo é outro problema —
 * cada saída aqui tem uma exigência própria (formato fixo, fundo obrigatório,
 * recorte da margem) que não cabe naquela tabela.
 *
 * Rode com: npm run logo
 */
import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = join(here, "..", "src", "assets", "logooculta.png");
const PUBLIC = join(here, "..", "public");
const APP = join(here, "..", "src", "app");

/* Fundo do apple-touch-icon. O iOS ignora transparência e compõe sobre BRANCO:
   a gata é preta com contorno dourado, então sobre branco o desenho some. Este
   é o `--surface-page` do tema cosmic, o mesmo fundo do site. */
const COSMIC = "#08050a";

/* A arte tem margem transparente em volta. Num favicon de 32px isso desperdiça
   um terço da largura e a gata vira um borrão. `trim` corta o vazio; o padding
   proporcional devolve só o respiro necessário para o círculo não encostar na
   borda. */
async function squareArt({ padding = 0.04 } = {}) {
  const trimmed = await sharp(SRC).trim({ threshold: 8 }).toBuffer();
  const meta = await sharp(trimmed).metadata();

  const side = Math.max(meta.width, meta.height);
  const canvas = Math.round(side * (1 + padding * 2));

  /* Centraliza num quadrado: a arte é quase circular, e deixá-la retangular
     faria o favicon nascer descentralizado. */
  return sharp({
    create: {
      width: canvas,
      height: canvas,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: trimmed, gravity: "center" }])
    .png()
    .toBuffer();
}

async function main() {
  await mkdir(PUBLIC, { recursive: true });
  const rows = [];
  const art = await squareArt();

  const note = async (file, path) => {
    const { size } = await stat(path);
    rows.push({ arquivo: file, kb: (size / 1024).toFixed(1) });
  };

  /* ── Favicon multi-resolução ────────────────────────────────────
     Um .ico com 16/32/48 dentro. O 16 é o que aparece na aba; gerar só o 32 e
     deixar o navegador reduzir dá aliasing nos fios dourados. */
  const icoSizes = [16, 32, 48];
  const layers = await Promise.all(
    icoSizes.map((s) =>
      sharp(art).resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(),
    ),
  );

  /* ICO à mão: `sharp` não escreve .ico. O formato é um cabeçalho de 6 bytes,
     uma entrada de 16 por imagem, e os PNGs concatenados — PNG dentro de ICO é
     válido desde o Vista e é o que todo navegador atual lê. */
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo 1 = ícone
  header.writeUInt16LE(icoSizes.length, 4);

  let offset = 6 + icoSizes.length * 16;
  const entries = [];
  for (const [i, size] of icoSizes.entries()) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // largura (0 = 256)
    entry.writeUInt8(size === 256 ? 0 : size, 1); // altura
    entry.writeUInt8(0, 2); // paleta
    entry.writeUInt8(0, 3); // reservado
    entry.writeUInt16LE(1, 4); // planos
    entry.writeUInt16LE(32, 6); // bits por pixel
    entry.writeUInt32LE(layers[i].length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += layers[i].length;
    entries.push(entry);
  }

  const icoPath = join(APP, "favicon.ico");
  await writeFile(icoPath, Buffer.concat([header, ...entries, ...layers]));
  await note("src/app/favicon.ico", icoPath);

  /* ── PNGs de ícone ──────────────────────────────────────────────
     O Next serve `icon.png` e `apple-icon.png` da pasta `app/` e escreve as
     tags sozinho — sem <link> à mão no layout. */
  const iconPath = join(APP, "icon.png");
  await sharp(art).resize(512, 512).png({ compressionLevel: 9 }).toFile(iconPath);
  await note("src/app/icon.png", iconPath);

  /* Apple: fundo sólido, sem alfa, e sem cantos arredondados — o iOS aplica a
     máscara dele por cima. Arredondar aqui daria borda dupla. */
  const applePath = join(APP, "apple-icon.png");
  await sharp(art)
    .resize(180, 180, { fit: "contain", background: COSMIC })
    .flatten({ background: COSMIC })
    .png({ compressionLevel: 9 })
    .toFile(applePath);
  await note("src/app/apple-icon.png", applePath);

  /* ── Logo do cabeçalho ──────────────────────────────────────────
     Exibido a 34px (40 no mobile). 96 cobre 2x com folga; WebP com alfa porque
     o logo assenta sobre os dois temas. */
  const brandDir = join(PUBLIC, "brand");
  await mkdir(brandDir, { recursive: true });

  for (const [name, width] of [
    ["logo", 96],
    ["logo@2x", 192],
  ]) {
    const out = join(brandDir, `${name}.webp`);
    await sharp(art).resize({ width }).webp({ quality: 92, effort: 6, alphaQuality: 100 }).toFile(out);
    await note(`public/brand/${name}.webp`, out);
  }

  /* ── Open Graph ─────────────────────────────────────────────────
     1200×630 com o logo centrado sobre o fundo da marca. Sem isto, o link
     compartilhado no WhatsApp aparece sem imagem. */
  const ogPath = join(PUBLIC, "og.png");
  const ogLogo = await sharp(art).resize({ height: 420 }).toBuffer();
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: COSMIC },
  })
    .composite([{ input: ogLogo, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(ogPath);
  await note("public/og.png", ogPath);

  console.table(rows);
}

await main();
