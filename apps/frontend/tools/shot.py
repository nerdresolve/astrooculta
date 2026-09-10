"""
Captura as telas do site para `docs/telas/`, em desktop e mobile.

Aponta para o site rodando, não para HTML solto: o quiz e o filtro de signos
são interativos, e captura de arquivo estático não mostraria o estado real.

    npm run up          # ou o site publicado
    python apps/frontend/tools/shot.py [http://localhost:8080]

O tema é forçado por `localStorage` antes da primeira pintura, na mesma chave
que o site usa — sem isso toda captura sairia no tema escuro, que é o padrão.

A saída é WebP: em PNG retina as 20 capturas somavam 57 MB, peso que todo mundo
que clonasse o repositório levaria junto. Em WebP são 2 MB, sem diferença
visível no README.
"""
import pathlib
import subprocess
import sys

from playwright.sync_api import sync_playwright

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080").rstrip("/")

# (arquivo, rota, tema). O resultado do quiz precisa de respostas na URL: sem
# elas a página redireciona para o início e a captura sairia errada.
PAGES = [
    ("01-home", "/", "cosmic"),
    ("02-home-claro", "/", "lunar"),
    ("03-quiz", "/quiz", "cosmic"),
    ("04-resultado", "/quiz/resultado?r=hhdhlhhdh&n=Marina", "cosmic"),
    ("05-signos", "/signos", "cosmic"),
    ("06-signo", "/signos/scorpio", "cosmic"),
    ("07-numerologia", "/numerologia", "cosmic"),
    ("08-sobre", "/sobre", "lunar"),
    ("09-blog", "/blog", "cosmic"),
    ("10-contato", "/contato", "cosmic"),
]

VIEWPORTS = [("desktop", 1440, 900), ("mobile", 390, 844)]

# parents[2] é apps/frontend; a raiz do repositório é dois níveis acima dela.
# Resolver pelo __file__ e não pelo diretório atual: o script precisa dar no
# mesmo lugar seja chamado da raiz, de apps/frontend ou por caminho absoluto.
REPO = pathlib.Path(__file__).resolve().parents[3]
out = REPO / "docs" / "telas"
out.mkdir(parents=True, exist_ok=True)

with sync_playwright() as play:
    browser = play.chromium.launch(args=["--force-color-profile=srgb"])

    for name, route, theme in PAGES:
        for label, width, height in VIEWPORTS:
            context = browser.new_context(
                viewport={"width": width, "height": height},
                device_scale_factor=2,  # retina: o print fica nítido no README
                locale="pt-BR",
            )
            # Roda antes de qualquer script da página, então o tema já vale na
            # primeira pintura e não há flash do tema errado na captura.
            context.add_init_script(
                f"try{{localStorage.setItem('astro-oculta-theme','{theme}')}}catch(e){{}}"
            )

            page = context.new_page()
            page.goto(f"{BASE}{route}", wait_until="networkidle")

            # As fontes decidem a altura do texto: capturar antes delas
            # assentarem produz linhas cortadas.
            page.wait_for_timeout(1200)

            # O botão flutuante de tema é ferramenta de navegação, não conteúdo.
            page.add_style_tag(content=".theme-toggle{display:none!important}")

            page.screenshot(path=str(out / f"{name}-{label}.png"), full_page=True)
            context.close()

        print(f"  {name}")

    browser.close()

# Converte para WebP e volta à escala lógica (o print sai em 2x). `sharp` já é
# dependência do Next — é o mesmo conversor que `npm run art` usa.
print("\nconvertendo para WebP...")

CONVERT = r"""
const s = require('sharp'), fs = require('fs'), p = require('path');
const dir = process.argv[1];

// Duas saídas por captura, porque servem a coisas diferentes:
//
//   <nome>.webp        página inteira — para ver a tela de cima a baixo
//   <nome>-card.webp   só o topo, sempre na MESMA proporção
//
// O card existe por causa da tabela do README: numa linha de duas colunas, a
// célula estica até a imagem mais alta, e emparelhar uma página curta com uma
// longa abre um vazio embaixo da curta. Com todos os cards na mesma proporção
// a grade fecha certinho.
const CARD = { desktop: 0.72, mobile: 1.55 };

(async () => {
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.png'))) {
    const src = p.join(dir, f);
    const m = await s(src).metadata();
    const w = Math.round(m.width / 2);          // volta da escala retina
    const base = f.replace(/\.png$/, '');

    await s(src).resize({ width: w }).webp({ quality: 82, effort: 6 })
      .toFile(p.join(dir, base + '.webp'));

    const proporcao = base.includes('mobile') ? CARD.mobile : CARD.desktop;
    const altura = Math.min(Math.round(m.width * proporcao), m.height);
    await s(src)
      .extract({ left: 0, top: 0, width: m.width, height: altura })
      .resize({ width: w })
      .webp({ quality: 82, effort: 6 })
      .toFile(p.join(dir, base + '-card.webp'));

    fs.unlinkSync(src);
  }
})();
"""

subprocess.run(
    ["node", "-e", CONVERT, str(out)],
    cwd=str(pathlib.Path(__file__).resolve().parents[1]),
    check=True,
)

print(f"capturas em {out}")
