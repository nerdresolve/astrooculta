# Build em três estágios: dependências, compilação e execução. O que chega à
# imagem final é só o standalone do Next — nem node_modules completo, nem código
# TypeScript, nem cache de build.

# ── 1. Dependências ──────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

# Só os manifestos primeiro: enquanto eles não mudarem, o Docker reaproveita a
# camada de install, que é a mais cara.
COPY package.json package-lock.json* ./
COPY apps/frontend/package.json apps/frontend/

# `npm ci` exige o lockfile. Sem ele (primeira execução do projeto), cai para
# `npm install`, que o gera.
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# ── 2. Compilação ────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/frontend/node_modules ./apps/frontend/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Contato e redes entram AQUI, no build, e não em tempo de execução: o Next
# substitui `NEXT_PUBLIC_*` no código do navegador enquanto compila. Definir
# depois, no runner, não teria efeito nenhum.
#
# O repositório é público e o telefone é de uma pessoa real. Sem estes valores
# o site sobe com os exemplos de `src/content/site.ts` — funciona, só não
# aponta para ninguém.
ARG NEXT_PUBLIC_SOCIAL_HANDLE
ARG NEXT_PUBLIC_INSTAGRAM
ARG NEXT_PUBLIC_TIKTOK
ARG NEXT_PUBLIC_WHATSAPP
ARG NEXT_PUBLIC_EMAIL
ENV NEXT_PUBLIC_SOCIAL_HANDLE=$NEXT_PUBLIC_SOCIAL_HANDLE     NEXT_PUBLIC_INSTAGRAM=$NEXT_PUBLIC_INSTAGRAM     NEXT_PUBLIC_TIKTOK=$NEXT_PUBLIC_TIKTOK     NEXT_PUBLIC_WHATSAPP=$NEXT_PUBLIC_WHATSAPP     NEXT_PUBLIC_EMAIL=$NEXT_PUBLIC_EMAIL

RUN npm run build --workspace @astro-oculta/frontend

# ── 3. Execução ──────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Usuário sem privilégio: se algo escapar do processo, escapa sem root.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# O `output: "standalone"` do next.config.mjs monta uma árvore com apenas os
# módulos que o servidor realmente carrega, e já na posição certa.
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

USER nextjs
EXPOSE 3000

CMD ["node", "apps/frontend/server.js"]
