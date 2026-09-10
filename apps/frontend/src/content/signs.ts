/**
 * Os doze signos. `id` casa com o nome do glifo no design system, então
 * `<Glyph name={sign.id}/>` sempre resolve.
 *
 * Sem import de `@/components/ds` de propósito: conteúdo não depende de
 * componente, e assim este módulo roda no `node --test` sem bundler. O
 * `SignId extends GlyphName` é garantido pelo tipo do próprio `Glyph`, que
 * recusaria um id que ele não conheça.
 */
export type SignId =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export type Element = "Fogo" | "Terra" | "Ar" | "Água";

export type Sign = {
  id: SignId;
  name: string;
  dates: string;
  element: Element;
  ruler: string;
  /** Uma frase: é o que entra no card do catálogo. */
  essence: string;
  /** Texto do resultado do quiz: fala com a pessoa, em segunda pessoa. */
  reading: string;
  traits: string[];
};

export const SIGNS: readonly Sign[] = [
  {
    id: "aries",
    name: "Áries",
    dates: "21 mar – 19 abr",
    element: "Fogo",
    ruler: "Marte",
    essence: "O primeiro impulso, antes que o medo tenha tempo de falar.",
    reading:
      "Você começa. Onde os outros pesam alternativas, você já deu o primeiro passo, e é caminhando que descobre o caminho. Sua coragem não é ausência de medo, é pressa de viver. Aprender a esperar é o seu trabalho mais difícil, e o mais transformador.",
    traits: ["Coragem", "Iniciativa", "Franqueza"],
  },
  {
    id: "taurus",
    name: "Touro",
    dates: "20 abr – 20 mai",
    element: "Terra",
    ruler: "Vênus",
    essence: "A permanência de quem constrói para durar.",
    reading:
      "Você não tem pressa, e isso é uma forma de força. Constrói devagar, com as mãos, e o que faz permanece. Reconhece o valor do que é concreto: um sabor, um tecido, um afeto que se prova no tempo. Sua lição está em soltar aquilo que já cumpriu seu ciclo.",
    traits: ["Constância", "Sensorialidade", "Lealdade"],
  },
  {
    id: "gemini",
    name: "Gêmeos",
    dates: "21 mai – 20 jun",
    element: "Ar",
    ruler: "Mercúrio",
    essence: "A curiosidade que transforma tudo em conversa.",
    reading:
      "Sua mente trabalha em duas frentes ao mesmo tempo, e é por isso que enxerga o que passa despercebido. Você aprende conversando, muda de ideia sem culpa e faz da palavra o seu instrumento. O silêncio, que parece te faltar, é o que mais tem a te ensinar.",
    traits: ["Curiosidade", "Comunicação", "Versatilidade"],
  },
  {
    id: "cancer",
    name: "Câncer",
    dates: "21 jun – 22 jul",
    element: "Água",
    ruler: "Lua",
    essence: "A memória do corpo, o cuidado que se oferece sem pedir.",
    reading:
      "Você sente antes de entender, e quase sempre acerta. Guarda memórias como quem guarda relíquias e cria, ao redor de quem ama, um lugar seguro. Sua sensibilidade não é fragilidade. É o instrumento mais preciso que você tem. Proteja-a sem se fechar.",
    traits: ["Acolhimento", "Memória", "Intuição"],
  },
  {
    id: "leo",
    name: "Leão",
    dates: "23 jul – 22 ago",
    element: "Fogo",
    ruler: "Sol",
    essence: "A luz que não pede licença para aquecer.",
    reading:
      "Você ocupa o espaço com naturalidade, e quem chega perto sente calor. Há generosidade no seu brilho: você quer que os seus brilhem junto. O que te desafia é descobrir que continua inteira mesmo quando ninguém está olhando.",
    traits: ["Generosidade", "Presença", "Criatividade"],
  },
  {
    id: "virgo",
    name: "Virgem",
    dates: "23 ago – 22 set",
    element: "Terra",
    ruler: "Mercúrio",
    essence: "O cuidado que mora no detalhe que ninguém vê.",
    reading:
      "Você percebe o que está fora do lugar antes de todo mundo. Seu cuidado é prático: você conserta, organiza, melhora. É a sua forma de dizer que se importa. A perfeição que persegue não existe; o que existe é o seu olho raro para o essencial.",
    traits: ["Discernimento", "Serviço", "Método"],
  },
  {
    id: "libra",
    name: "Libra",
    dates: "23 set – 22 out",
    element: "Ar",
    ruler: "Vênus",
    essence: "A busca do ponto onde as forças se equilibram.",
    reading:
      "Você enxerga os dois lados, e por isso a decisão custa. Tem talento para a medida certa: na palavra, na beleza, no acordo que sustenta uma relação. Escolher um lado não quebra o seu equilíbrio. Às vezes é o que o restaura.",
    traits: ["Diplomacia", "Estética", "Justiça"],
  },
  {
    id: "scorpio",
    name: "Escorpião",
    dates: "23 out – 21 nov",
    element: "Água",
    ruler: "Plutão",
    essence: "A coragem de olhar para o que os outros evitam.",
    reading:
      "Você não se contenta com a superfície. Quer saber o que está por baixo: das pessoas, das situações, de você mesma. Sua intensidade assusta quem prefere o raso, e é justamente ela que te permite atravessar e renascer de tudo que vive.",
    traits: ["Profundidade", "Intensidade", "Regeneração"],
  },
  {
    id: "sagittarius",
    name: "Sagitário",
    dates: "22 nov – 21 dez",
    element: "Fogo",
    ruler: "Júpiter",
    essence: "O horizonte como endereço permanente.",
    reading:
      "Você precisa de espaço para respirar, e de sentido para seguir. Aprende viajando, seja por estrada, por livro ou por conversa, e tem o dom de devolver ao mundo o que aprendeu. A profundidade que às vezes falta se encontra ficando, não partindo.",
    traits: ["Liberdade", "Otimismo", "Busca"],
  },
  {
    id: "capricorn",
    name: "Capricórnio",
    dates: "22 dez – 19 jan",
    element: "Terra",
    ruler: "Saturno",
    essence: "A paciência de quem sabe onde quer chegar.",
    reading:
      "Você trabalha com o tempo a favor. Enxerga longe, suporta o esforço e chega onde disse que chegaria: não por sorte, por método. A sua exigência construiu tudo o que você tem; permita que ela também descanse.",
    traits: ["Disciplina", "Estratégia", "Responsabilidade"],
  },
  {
    id: "aquarius",
    name: "Aquário",
    dates: "20 jan – 18 fev",
    element: "Ar",
    ruler: "Urano",
    essence: "A liberdade de pensar fora do combinado.",
    reading:
      "Você enxerga o que ainda não existe e não entende por que todos aceitam o que está aí. Pensa coletivo, defende quem está de fora e prefere a verdade ao conforto. Sua originalidade não é pose. É o modo como você respira.",
    traits: ["Originalidade", "Independência", "Visão coletiva"],
  },
  {
    id: "pisces",
    name: "Peixes",
    dates: "19 fev – 20 mar",
    element: "Água",
    ruler: "Netuno",
    essence: "A fronteira fina entre o mundo e o sonho.",
    reading:
      "Você sente o que está no ar antes que alguém diga. Sua imaginação é um lugar real, e sua compaixão alcança quem ninguém alcança. Aprender onde você termina e o outro começa é o que transforma essa sensibilidade em força.",
    traits: ["Compaixão", "Imaginação", "Entrega"],
  },
] as const;

export const SIGNS_BY_ID: Record<SignId, Sign> = Object.fromEntries(
  SIGNS.map((sign) => [sign.id, sign]),
) as Record<SignId, Sign>;

export const ELEMENTS: readonly Element[] = ["Fogo", "Terra", "Ar", "Água"] as const;
