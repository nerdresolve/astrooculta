import Image from "next/image";

/**
 * O logo da marca: a gata de chapéu sobre a lua.
 *
 * Gerado por `npm run logo` a partir de `src/assets/logooculta.png`, junto com
 * os favicons — mesma arte, mesma fonte de verdade.
 *
 * O tamanho vem do CSS de quem usa (`.ao-nav__logo`, `.footer__logo`), não de
 * uma prop: os dois lugares que o exibem têm alturas diferentes e responsivas.
 * `width`/`height` aqui são só a proporção que o Next usa para reservar espaço
 * e não deixar o cabeçalho pular enquanto a imagem carrega.
 *
 * `priority` porque o logo está no topo de toda página: carregado
 * preguiçosamente, ele aparece depois do texto e o cabeçalho pisca.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <Image
      className={className}
      src="/brand/logo.webp"
      alt=""
      /* Decorativo: o nome "Astro Oculta" vem escrito ao lado, em texto. Com
         alt preenchido, um leitor de tela anunciaria a marca duas vezes. */
      aria-hidden="true"
      width={96}
      height={96}
      priority
      /* A exibição nunca passa de 40px de lado; declarar isso evita que o
         navegador baixe o @2x em telas comuns. */
      sizes="40px"
    />
  );
}
