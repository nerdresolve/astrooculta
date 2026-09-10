import { useId } from "react";

/**
 * Objetos do altar: cartas de tarô, bola de cristal, vela e cristais.
 *
 * São os elementos que aparecem ao redor da gata nas referências. Ficam num
 * arquivo só porque compartilham escala e vocabulário — fio de ouro sobre
 * silhueta escura — e porque quase nunca são usados isoladamente.
 *
 * Cada um recebe `size` e desenha num viewBox quadrado, então trocam de lugar
 * entre si sem quebrar alinhamento.
 */

type ArtProps = {
  size?: number | string;
  className?: string;
  /** Vazio deixa o desenho decorativo (aria-hidden). */
  title?: string;
};

function svgProps(title: string | undefined, viewBox: string, size: number | string) {
  return {
    viewBox,
    width: size,
    /* Sem `height`: "auto" não é comprimento válido em atributo SVG e o
       navegador registra erro de renderização. A altura vem do CSS abaixo. */
    ...(title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const }),
    style: { display: "block" as const, maxWidth: "100%", height: "auto" as const, overflow: "visible" as const },
  };
}

/** Trio de cartas de tarô em leque — A Lua ao centro. */
export function TarotTrio({ size = 120, className, title }: ArtProps) {
  /* Ids únicos por instância: com id fixo, duas ocorrências do trio na mesma
     página compartilhavam o gradiente e o desenho de uma vazava para a outra. */
  const uid = useId().replace(/:/g, "");
  const cardFace = `card-face-${uid}`;

  return (
    <svg className={className} {...svgProps(title, "0 0 120 120", size)}>
      <defs>
        <linearGradient id={cardFace} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ao-plum-700)" />
          <stop offset="100%" stopColor="var(--ao-plum-900)" />
        </linearGradient>
      </defs>

      {/* Cartas laterais, inclinadas atrás. */}
      <g transform="rotate(-16 60 70)">
        <rect x="18" y="30" width="40" height="62" rx="3" fill={`url(#${cardFace})`} stroke="var(--accent-gold)" strokeWidth="1" opacity="0.9" />
        <rect x="22" y="34" width="32" height="54" rx="2" fill="none" stroke="var(--accent-gold)" strokeWidth="0.5" opacity="0.5" />
        <text x="38" y="66" fontSize="15" fill="var(--accent-gold)" textAnchor="middle" opacity="0.75" fontFamily="var(--font-display)">✦</text>
      </g>

      <g transform="rotate(16 60 70)">
        <rect x="62" y="30" width="40" height="62" rx="3" fill={`url(#${cardFace})`} stroke="var(--accent-gold)" strokeWidth="1" opacity="0.9" />
        <rect x="66" y="34" width="32" height="54" rx="2" fill="none" stroke="var(--accent-gold)" strokeWidth="0.5" opacity="0.5" />
        <text x="82" y="66" fontSize="15" fill="var(--accent-gold)" textAnchor="middle" opacity="0.75" fontFamily="var(--font-display)">✧</text>
      </g>

      {/* Carta central, à frente: A Lua. */}
      <rect x="40" y="22" width="42" height="66" rx="3" fill={`url(#${cardFace})`} stroke="var(--accent-gold)" strokeWidth="1.2" />
      <rect x="44" y="26" width="34" height="58" rx="2" fill="none" stroke="var(--accent-gold)" strokeWidth="0.6" opacity="0.6" />
      <path d="M64 44 a11 11 0 1 0 0 20 a8.5 8.5 0 1 1 0 -20 Z" fill="var(--accent-gold)" opacity="0.85" />
      <text x="61" y="79" fontSize="6" fill="var(--accent-gold)" textAnchor="middle" opacity="0.7" letterSpacing="1" fontFamily="var(--font-ornament)">A LUA</text>
    </svg>
  );
}

/** Bola de cristal sobre pedestal. */
export function CrystalBall({ size = 110, className, title }: ArtProps) {
  /* Id único por instância — ver nota em TarotTrio. */
  const uid = useId().replace(/:/g, "");
  const orb = `orb-${uid}`;

  return (
    <svg className={className} {...svgProps(title, "0 0 110 120", size)}>
      <defs>
        <radialGradient id={orb} cx="38%" cy="34%" r="68%">
          <stop offset="0%" stopColor="var(--ao-amethyst-200)" stopOpacity="0.85" />
          <stop offset="45%" stopColor="var(--ao-amethyst-500)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--ao-plum-900)" stopOpacity="0.9" />
        </radialGradient>
      </defs>

      <ellipse cx="55" cy="112" rx="30" ry="5" fill="var(--ao-void)" opacity="0.4" />

      {/* Pedestal. */}
      <path d="M36 104 L74 104 L68 88 L42 88 Z" fill="var(--ao-plum-800)" stroke="var(--accent-gold)" strokeWidth="1" />
      <rect x="30" y="104" width="50" height="6" rx="2" fill="var(--ao-plum-700)" stroke="var(--accent-gold)" strokeWidth="0.9" />

      {/* Esfera. */}
      <circle cx="55" cy="56" r="34" fill={`url(#${orb})`} stroke="var(--accent-gold)" strokeWidth="1.1" />
      {/* Reflexo: um arco fino é o que faz ler como vidro. */}
      <path d="M36 44 C40 32 52 26 62 28" fill="none" stroke="var(--ao-cream-50)" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
      <circle cx="44" cy="66" r="1.6" fill="var(--ao-cream-50)" opacity="0.6" />
      <text x="66" y="70" fontSize="11" fill="var(--accent-gold)" textAnchor="middle" opacity="0.7" fontFamily="var(--font-display)">✦</text>
    </svg>
  );
}

/** Vela acesa, com cera escorrida. */
export function Candle({ size = 70, className, title }: ArtProps) {
  /* Ids únicos por instância — ver nota em TarotTrio. */
  const uid = useId().replace(/:/g, "");
  const flame = `flame-${uid}`;
  const flameGlow = `flame-glow-${uid}`;

  return (
    <svg className={className} {...svgProps(title, "0 0 70 130", size)}>
      <defs>
        <radialGradient id={flame} cx="50%" cy="62%" r="55%">
          <stop offset="0%" stopColor="var(--ao-gold-200)" />
          <stop offset="60%" stopColor="var(--ao-gold-400)" />
          <stop offset="100%" stopColor="var(--ao-gold-600)" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id={flameGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--glow-gold)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--glow-gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="35" cy="26" r="24" fill={`url(#${flameGlow})`} />

      {/* Chama. */}
      <path d="M35 8 C42 20 46 26 46 32 C46 40 41 46 35 46 C29 46 24 40 24 32 C24 26 28 20 35 8 Z" fill={`url(#${flame})`} />
      <path d="M35 22 C38 28 39 31 39 34 C39 38 37 41 35 41 C33 41 31 38 31 34 C31 31 32 28 35 22 Z" fill="var(--ao-cream-50)" opacity="0.65" />

      {/* Pavio. */}
      <line x1="35" y1="46" x2="35" y2="54" stroke="var(--ao-ink-900)" strokeWidth="1.6" />

      {/* Corpo da vela com cera escorrendo. */}
      <path
        d="M22 54 C26 52 44 52 48 54 C50 62 51 78 51 96 C51 112 48 120 35 120 C22 120 19 112 19 96 C19 78 20 62 22 54 Z"
        fill="var(--ao-plum-800)"
        stroke="var(--accent-gold)"
        strokeWidth="0.9"
      />
      <path d="M24 56 C24 66 23 72 25 78 C27 72 26 64 27 56 Z" fill="var(--ao-plum-700)" opacity="0.8" />
      <path d="M45 56 C46 68 45 76 43 82 C42 74 43 64 42 56 Z" fill="var(--ao-plum-700)" opacity="0.8" />
      <ellipse cx="35" cy="54" rx="13" ry="3.4" fill="var(--ao-plum-700)" stroke="var(--accent-gold)" strokeWidth="0.8" />
    </svg>
  );
}

/** Agrupamento de cristais. */
export function Crystals({ size = 90, className, title }: ArtProps) {
  /* Ids únicos por instância — ver nota em TarotTrio. */
  const uid = useId().replace(/:/g, "");
  const crystal = `crystal-${uid}`;
  const crystalRose = `crystal-rose-${uid}`;

  return (
    <svg className={className} {...svgProps(title, "0 0 90 80", size)}>
      <defs>
        <linearGradient id={crystal} x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="var(--ao-amethyst-300)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--ao-plum-800)" />
        </linearGradient>
        <linearGradient id={crystalRose} x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="var(--ao-rose-300)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--ao-plum-800)" />
        </linearGradient>
      </defs>

      <g stroke="var(--accent-gold)" strokeWidth="0.9">
        <path d="M14 74 L20 34 L30 26 L36 44 L30 74 Z" fill={`url(#${crystal})`} />
        <path d="M20 34 L30 26 L30 74 Z" fill="var(--ao-cream-50)" opacity="0.1" stroke="none" />

        <path d="M34 74 L42 12 L52 30 L50 74 Z" fill={`url(#${crystalRose})`} />
        <path d="M42 12 L52 30 L50 74 L46 74 Z" fill="var(--ao-cream-50)" opacity="0.12" stroke="none" />

        <path d="M54 74 L58 44 L68 38 L72 56 L68 74 Z" fill={`url(#${crystal})`} />
        <path d="M58 44 L68 38 L68 74 Z" fill="var(--ao-cream-50)" opacity="0.1" stroke="none" />
      </g>

      <text x="78" y="30" fontSize="10" fill="var(--accent-gold)" textAnchor="middle" opacity="0.6" fontFamily="var(--font-display)">✧</text>
    </svg>
  );
}

/** Amuleto de coração em corrente — o pingente das referências. */
export function HeartAmulet({ size = 80, className, title }: ArtProps) {
  return (
    <svg className={className} {...svgProps(title, "0 0 80 110", size)}>
      <path d="M40 6 C28 20 22 30 22 40" fill="none" stroke="var(--accent-gold)" strokeWidth="1.2" opacity="0.7" />
      <path d="M40 6 C52 20 58 30 58 40" fill="none" stroke="var(--accent-gold)" strokeWidth="1.2" opacity="0.7" />
      <circle cx="40" cy="6" r="3.4" fill="none" stroke="var(--accent-gold)" strokeWidth="1.2" />

      <path
        d="M40 96 C22 80 12 68 12 54 C12 44 20 38 28 38 C34 38 38 42 40 46 C42 42 46 38 52 38 C60 38 68 44 68 54 C68 68 58 80 40 96 Z"
        fill="var(--ao-plum-800)"
        stroke="var(--accent-gold)"
        strokeWidth="1.4"
      />
      <path
        d="M40 88 C26 76 18 66 18 55 C18 48 23 44 29 44 C34 44 38 47 40 51 C42 47 46 44 51 44 C57 44 62 48 62 55 C62 66 54 76 40 88 Z"
        fill="none"
        stroke="var(--accent-gold)"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <path d="M43 56 a7 7 0 1 0 0 12 a5.4 5.4 0 1 1 0 -12 Z" fill="var(--accent-gold)" opacity="0.8" />
    </svg>
  );
}
