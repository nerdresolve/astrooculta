# Astro Oculta — design system (cópia local)

Cópia fiel do projeto de design `Astro Oculta Design System`, sincronizada a
partir dele — não editada aqui.

## Regra

**Não edite estes arquivos à mão.** Eles são a fonte da marca, não do produto.
Ajuste de produto vai em `src/features/*/*.css`, usando os tokens daqui. Quando o
design system mudar, estes arquivos são substituídos por inteiro — qualquer
correção local seria perdida na próxima sincronização.

## O que veio de lá, verbatim

| Local | Origem |
|---|---|
| `tokens/colors.css` | `tokens/colors.css` |
| `tokens/typography.css` | `tokens/typography.css` |
| `tokens/spacing.css` | `tokens/spacing.css` |
| `tokens/radii.css` | `tokens/radii.css` |
| `tokens/shadows.css` | `tokens/shadows.css` |
| `tokens/motion.css` | `tokens/motion.css` |
| `tokens/ornament.css` | `tokens/ornament.css` |
| `tokens/base.css` | `tokens/base.css` |
| `components.css` | `components/components.css` |

## As duas diferenças, e por quê

1. **`tokens/fonts.css` não foi copiado.** Ele carrega Cormorant Garamond, Cinzel
   e Jost por `@import` do Google Fonts, que bloqueia a primeira pintura. No Next
   as mesmas três famílias entram por `next/font/google` em `app/layout.tsx`, com
   preload e `display:swap`. Os nomes declarados em `tokens/typography.css`
   continuam valendo — a substituição é no transporte, não na tipografia.

2. **`components/components.css` virou `components.css` na raíz.** Os componentes
   React foram portados para TypeScript em `src/components/ds/`, então a pasta
   `components/` original não existe aqui.

## Componentes

Os `.jsx` do design system foram portados para `.tsx` tipado em
`src/components/ds/`. A API pública (nomes de props, valores de variante) foi
preservada — o que mudou é que agora há tipos. As classes CSS que eles aplicam
são exatamente as deste `components.css`.

## Substituições herdadas do design system

O próprio design system registra que nenhum binário de fonte e nenhum logo foram
fornecidos pela marca: as três famílias são substitutas, e a assinatura é o
wordmark tipográfico com o glifo ✦ à frente. As ilustrações em `public/brand/`
são recortes de baixa resolução dos JPGs de referência. Tudo isso continua
valendo aqui.
