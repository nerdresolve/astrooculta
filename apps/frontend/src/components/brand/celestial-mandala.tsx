import { useId } from "react";

/**
 * Mandala celeste — arte do hero.
 *
 * SUBSTITUIÇÃO: o design system entrega esta ilustração como PNG recortado dos
 * JPGs de referência, e avisa que são "low-resolution stand-ins". Aqui ela é
 * redesenhada em SVG a partir do vocabulário da própria marca: fio de ouro,
 * sol radiado, fases da lua e os glifos ✦ ✧. Vantagem prática: nítida em
 * qualquer densidade de tela e acompanha a troca de tema, porque toda cor sai
 * de `currentColor` ou de token — nenhum valor fixo.
 *
 * Para trocar pela arte definitiva, substitua este componente inteiro; ele é o
 * único lugar que a home referencia.
 */
export function CelestialMandala({ className }: { className?: string }) {
  /* Ids únicos por instância: com ids fixos, duas mandalas na mesma página
     definiam o mesmo `id` e os gradientes de uma vazavam para a outra. */
  const uid = useId().replace(/:/g, "");
  const halo = `mandala-halo-${uid}`;
  const rule = `mandala-rule-${uid}`;

  /* 12 raios, um por signo — a mesma divisão do zodíaco. */
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  /* Estrelas espalhadas em posições fixas: nada de aleatório, que divergiria
     entre servidor e cliente na hidratação. */
  const sparks = [
    { x: 60, y: 78, r: 1.6, o: 0.9 },
    { x: 330, y: 96, r: 1.2, o: 0.7 },
    { x: 92, y: 300, r: 1.3, o: 0.8 },
    { x: 316, y: 318, r: 1.7, o: 0.85 },
    { x: 200, y: 44, r: 1.1, o: 0.6 },
    { x: 46, y: 196, r: 1.4, o: 0.75 },
    { x: 356, y: 214, r: 1.2, o: 0.7 },
    { x: 208, y: 366, r: 1.5, o: 0.8 },
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      role="img"
      aria-label="Mandala celeste com sol radiado e fases da lua"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <defs>
        <radialGradient id={halo} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--glow-accent)" stopOpacity="0.9" />
          <stop offset="70%" stopColor="var(--glow-accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--glow-accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={rule} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent-gold)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent-gold)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--accent-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="200" r="185" fill={`url(#${halo})`} />

      {/* Anéis concêntricos, todos em fio de 1px como manda a marca. */}
      <g fill="none" stroke="var(--accent-gold)" strokeWidth="1">
        <circle cx="200" cy="200" r="150" opacity="0.28" />
        <circle cx="200" cy="200" r="132" opacity="0.45" />
        <circle cx="200" cy="200" r="96" opacity="0.3" />
        <circle cx="200" cy="200" r="58" opacity="0.55" />
      </g>

      {/* Raios do sol: alternam comprimento, como gravura antiga. */}
      <g stroke="var(--accent-gold)" strokeWidth="1" strokeLinecap="round">
        {rays.map((angle, i) => (
          <line
            key={angle}
            x1="200"
            y1={i % 2 === 0 ? 44 : 56}
            x2="200"
            y2="68"
            opacity={i % 2 === 0 ? 0.75 : 0.4}
            transform={`rotate(${angle} 200 200)`}
          />
        ))}
      </g>

      {/* Disco solar com face implícita — só o contorno, sem preenchimento
          chapado: ouro é cor de linha, nunca de área grande. */}
      <circle cx="200" cy="200" r="38" fill="var(--surface-card-solid)" opacity="0.55" />
      <circle cx="200" cy="200" r="38" fill="none" stroke="var(--accent-gold)" strokeWidth="1" opacity="0.9" />

      {/* Crescentes opostos: a lua em duas fases, dentro do disco. */}
      <path
        d="M188 178 a26 26 0 0 0 0 44 a20 20 0 0 1 0 -44 Z"
        fill="var(--accent-gold)"
        opacity="0.55"
      />
      <path
        d="M212 178 a26 26 0 0 1 0 44 a20 20 0 0 0 0 -44 Z"
        fill="var(--accent-primary)"
        opacity="0.4"
      />

      {/* Fio horizontal que esmaece nas pontas — o mesmo --rule-gold. */}
      <rect x="20" y="199.5" width="360" height="1" fill={`url(#${rule})`} opacity="0.5" />

      {/* Glifos da marca nos quatro pontos cardeais. */}
      <g fill="var(--accent-gold)" fontFamily="var(--font-display)" textAnchor="middle">
        <text x="200" y="106" fontSize="17" opacity="0.85">
          ✦
        </text>
        <text x="200" y="304" fontSize="13" opacity="0.6">
          ✧
        </text>
        <text x="102" y="206" fontSize="13" opacity="0.6">
          ✧
        </text>
        <text x="298" y="206" fontSize="13" opacity="0.6">
          ✧
        </text>
      </g>

      <g fill="var(--starfield-star)">
        {sparks.map((spark) => (
          <circle key={`${spark.x}-${spark.y}`} cx={spark.x} cy={spark.y} r={spark.r} opacity={spark.o} />
        ))}
      </g>
    </svg>
  );
}
