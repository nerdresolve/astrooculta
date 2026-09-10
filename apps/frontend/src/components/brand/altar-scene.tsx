import { useId } from "react";

import { Moonlit } from "./moonlit.tsx";

import "./altar-scene.css";

/**
 * Cena do hero: Moonlit sentada no altar, sob um arco estrelado, cercada pelas
 * cartas, pela bola de cristal, pela vela e pelos cristais — o arranjo das
 * referências.
 *
 * A composição é feita em CSS grid com posicionamento absoluto sobre um arco
 * SVG de fundo, e não num único SVG gigante: assim cada objeto continua sendo
 * um componente reaproveitável, e o conjunto reflui no mobile.
 */
export function AltarScene({ className }: { className?: string }) {
  /* Ids únicos por instância: com ids fixos, duas cenas na mesma página
     definiam o mesmo `id` e os gradientes de uma vazavam para a outra. */
  const uid = useId().replace(/:/g, "");
  const archSky = `arch-sky-${uid}`;
  const archGlow = `arch-glow-${uid}`;
  const archClip = `arch-clip-${uid}`;

  return (
    <div className={["altar", className].filter(Boolean).join(" ")}>
      {/* Arco: a moldura em ogiva que emoldura a gata na referência. */}
      <svg className="altar__arch" viewBox="0 0 400 420" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={archSky} x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="var(--ao-plum-700)" />
            <stop offset="45%" stopColor="var(--ao-plum-900)" />
            <stop offset="100%" stopColor="var(--ao-void)" />
          </linearGradient>
          <radialGradient id={archGlow} cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="var(--ao-amethyst-500)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--ao-amethyst-500)" stopOpacity="0" />
          </radialGradient>
          <clipPath id={archClip}>
            <path d="M60 400 L60 172 C60 96 122 40 200 40 C278 40 340 96 340 172 L340 400 Z" />
          </clipPath>
        </defs>

        <path
          d="M60 400 L60 172 C60 96 122 40 200 40 C278 40 340 96 340 172 L340 400 Z"
          fill={`url(#${archSky})`}
        />

        <g clipPath={`url(#${archClip})`}>
          <ellipse cx="200" cy="150" rx="180" ry="150" fill={`url(#${archGlow})`} />

          {/* Estrelas dentro do arco, em posições fixas. */}
          <g fill="var(--starfield-star)">
            {[
              [96, 96, 1.7], [150, 68, 1.2], [214, 82, 1.5], [268, 106, 1.3], [308, 148, 1.6],
              [88, 158, 1.2], [128, 122, 1], [180, 116, 1.4], [246, 148, 1.1], [300, 200, 1.3],
              [78, 214, 1.5], [136, 186, 1], [286, 254, 1.2], [104, 268, 1.3], [318, 96, 1.1],
              [172, 158, 0.9], [232, 196, 1.2], [64, 120, 1.1],
            ].map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity={0.55 + (r ?? 1) * 0.22} />
            ))}
          </g>

          {/* Planeta anelado, como na referência. */}
          <g opacity="0.85">
            <circle cx="126" cy="126" r="19" fill="var(--ao-plum-600)" stroke="var(--accent-gold)" strokeWidth="0.9" />
            <ellipse
              cx="126"
              cy="126"
              rx="32"
              ry="9"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="1.3"
              transform="rotate(-18 126 126)"
              opacity="0.85"
            />
          </g>

          {/* Lua crescente com rosto — a assinatura das referências. */}
          <g transform="translate(268 128)">
            <path d="M6 -30 a30 30 0 1 0 0 60 a23 23 0 1 1 0 -60 Z" fill="var(--ao-gold-300)" opacity="0.92" />
            <g fill="var(--ao-ink-800)" opacity="0.75">
              <circle cx="-2" cy="-6" r="1.7" />
              <path d="M-6 6 C-3 9 1 9 4 6" fill="none" stroke="var(--ao-ink-800)" strokeWidth="1.4" strokeLinecap="round" />
            </g>
            <ellipse cx="-6" cy="2" rx="4" ry="2.4" fill="var(--ao-rose-400)" opacity="0.5" />
          </g>

          {/* Constelação ligando pontos. */}
          <g stroke="var(--accent-gold)" strokeWidth="0.6" opacity="0.4" fill="none">
            <path d="M96 96 L128 122 L180 116 L214 82" />
            <path d="M128 122 L136 186" />
          </g>
        </g>

        {/* Fio de ouro contornando o arco, em linha dupla. */}
        <path
          d="M60 400 L60 172 C60 96 122 40 200 40 C278 40 340 96 340 172 L340 400"
          fill="none"
          stroke="var(--accent-gold)"
          strokeWidth="2"
          opacity="0.9"
        />
        <path
          d="M70 400 L70 174 C70 102 128 50 200 50 C272 50 330 102 330 174 L330 400"
          fill="none"
          stroke="var(--accent-gold)"
          strokeWidth="0.7"
          opacity="0.45"
        />
        <text x="200" y="30" fontSize="17" fill="var(--accent-gold)" textAnchor="middle" fontFamily="var(--font-display)">✦</text>
      </svg>

      {/* A gata, à frente do arco.
          Os SVGs de cartas, bola de cristal, vela e cristais saíram daqui: a
          arte ilustrada já traz todos esses objetos ao redor dela, e mantê-los
          duplicaria a cena. Eles continuam existindo em `altar-objects.tsx` e
          seguem em uso nos passos de "Como funciona". */}
      <div className="altar__cat">
        {/* `priority`: é a arte principal acima da dobra e vira o LCP. */}
        <Moonlit variant="hero" priority />
      </div>

      {/* Superfície do altar: o fio de ouro em que a cena se apoia. */}
      <svg className="altar__surface" viewBox="0 0 420 24" aria-hidden="true" preserveAspectRatio="none">
        <path d="M0 12 C90 3 330 3 420 12" fill="none" stroke="var(--accent-gold)" strokeWidth="1.4" opacity="0.55" />
        <path d="M0 17 C90 8 330 8 420 17" fill="none" stroke="var(--accent-gold)" strokeWidth="0.6" opacity="0.3" />
      </svg>
    </div>
  );
}
