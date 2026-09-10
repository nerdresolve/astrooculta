import { useId } from "react";

/**
 * Ornamentos de superfície — o que dá densidade decorativa às seções.
 *
 * São peças pequenas e repetíveis (cantos, divisórias, nuvens, faixa de
 * estrelas) que existem para preencher o vazio entre blocos de conteúdo, que é
 * onde as referências são muito mais ricas que uma página só de texto e card.
 */

/** Divisória com losango central e volutas — substitui o fio reto simples. */
export function OrnateRule({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 24"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
    >
      <g fill="none" stroke="var(--accent-gold)" strokeWidth="1" opacity="0.75">
        <path d="M0 12 L150 12" opacity="0.45" />
        <path d="M250 12 L400 12" opacity="0.45" />
        {/* Volutas que abraçam o centro. */}
        <path d="M150 12 C160 12 162 6 170 6 C176 6 178 10 174 12" />
        <path d="M250 12 C240 12 238 6 230 6 C224 6 222 10 226 12" />
        <path d="M150 12 C160 12 162 18 170 18 C176 18 178 14 174 12" opacity="0.5" />
        <path d="M250 12 C240 12 238 18 230 18 C224 18 222 14 226 12" opacity="0.5" />
      </g>
      <path d="M200 4 L207 12 L200 20 L193 12 Z" fill="var(--accent-gold)" opacity="0.85" />
      <path d="M182 12 L188 8 L188 16 Z" fill="var(--accent-gold)" opacity="0.5" />
      <path d="M218 12 L212 8 L212 16 Z" fill="var(--accent-gold)" opacity="0.5" />
    </svg>
  );
}

/** Canto ornamentado. Gira por CSS para servir aos quatro vértices. */
export function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 60"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
    >
      <g fill="none" stroke="var(--accent-gold)" strokeWidth="1" opacity="0.7">
        <path d="M2 2 L2 34" />
        <path d="M2 2 L34 2" />
        <path d="M8 8 L8 24" opacity="0.55" />
        <path d="M8 8 L24 8" opacity="0.55" />
        <path d="M2 34 C2 44 10 50 20 48" opacity="0.6" />
        <path d="M34 2 C44 2 50 10 48 20" opacity="0.6" />
      </g>
      <path d="M8 8 L13 3 L18 8 L13 13 Z" fill="var(--accent-gold)" opacity="0.7" />
      <circle cx="30" cy="30" r="1.8" fill="var(--accent-gold)" opacity="0.5" />
    </svg>
  );
}

/** Faixa de nuvens — a névoa rosada que aparece nas duas referências. */
export function CloudBand({ className, flip = false }: { className?: string; flip?: boolean }) {
  /* Id único por instância: com id fixo, duas faixas na mesma página
     compartilhavam o gradiente e o desenho de uma vazava para a outra. */
  const uid = useId().replace(/:/g, "");
  const cloudA = `cloud-a-${uid}`;

  return (
    <svg
      className={className}
      viewBox="0 0 1440 140"
      aria-hidden="true"
      preserveAspectRatio="none"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        transform: flip ? "scaleY(-1)" : undefined,
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient id={cloudA} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--starfield-haze)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--starfield-haze)" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <path
        d="M0 140 L0 92 C60 84 96 62 150 62 C198 62 214 82 260 78 C310 74 322 46 380 48
           C438 50 452 78 508 80 C560 82 578 58 634 60 C692 62 706 86 760 84
           C816 82 832 54 892 56 C950 58 964 84 1020 82 C1074 80 1090 56 1148 58
           C1206 60 1222 84 1278 82 C1332 80 1360 66 1440 74 L1440 140 Z"
        fill={`url(#${cloudA})`}
      />
      <path
        d="M0 140 L0 110 C70 104 110 90 170 92 C226 94 244 110 300 108
           C356 106 372 88 430 90 C488 92 502 112 560 110 C614 108 632 92 690 94
           C748 96 762 114 820 112 C876 110 892 92 950 94 C1008 96 1022 114 1080 112
           C1136 110 1158 96 1216 98 C1274 100 1300 114 1440 108 L1440 140 Z"
        fill="var(--starfield-haze)"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * Campo de estrelas denso, desenhado em SVG.
 *
 * O `Starfield` do design system usa oito gradientes radiais em CSS, que rende
 * uma poeira discreta. As referências têm céu bem mais povoado — daí esta
 * camada extra, com estrelas de tamanhos variados e algumas de quatro pontas.
 * Posições fixas: nada de aleatório, que divergiria na hidratação.
 */
export function StarLayer({ className }: { className?: string }) {
  const dots = [
    [4, 12, 1.4], [11, 34, 0.9], [17, 8, 1.1], [23, 52, 1.3], [29, 22, 0.8],
    [34, 68, 1.2], [41, 14, 1.5], [47, 42, 0.9], [52, 76, 1.1], [58, 26, 1.3],
    [63, 58, 0.8], [69, 10, 1.2], [74, 38, 1.4], [79, 66, 1], [85, 20, 1.3],
    [91, 48, 1.1], [96, 74, 0.9], [8, 62, 1.2], [14, 84, 1], [26, 90, 1.3],
    [38, 84, 0.9], [45, 62, 1.1], [56, 92, 1.2], [67, 82, 1], [72, 54, 0.8],
    [88, 88, 1.2], [94, 30, 1], [2, 46, 0.9], [20, 70, 1.1], [31, 40, 1],
  ] as const;

  const sparkles = [
    [12, 20, 7], [37, 56, 6], [61, 16, 8], [83, 60, 6], [50, 34, 5], [92, 12, 6],
  ] as const;

  return (
    <div className={className} aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        <g fill="var(--starfield-star)">
          {dots.map(([x, y, r]) => (
            <circle key={`d-${x}-${y}`} cx={x} cy={y} r={r * 0.16} opacity={0.35 + r * 0.3} />
          ))}
        </g>
        {/* Estrelas de quatro pontas: são elas que dão o brilho "desenhado". */}
        <g fill="var(--accent-gold)">
          {sparkles.map(([x, y, s]) => (
            <path
              key={`s-${x}-${y}`}
              d={`M${x} ${y - s * 0.16} Q${x + s * 0.04} ${y - s * 0.04} ${x + s * 0.16} ${y}
                  Q${x + s * 0.04} ${y + s * 0.04} ${x} ${y + s * 0.16}
                  Q${x - s * 0.04} ${y + s * 0.04} ${x - s * 0.16} ${y}
                  Q${x - s * 0.04} ${y - s * 0.04} ${x} ${y - s * 0.16} Z`}
              opacity="0.75"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
