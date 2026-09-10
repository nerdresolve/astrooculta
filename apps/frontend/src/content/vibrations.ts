/**
 * As nove vibrações numerológicas. Cada pergunta do quiz nasce de uma delas —
 * a pergunta 3 é a vibração três, e assim por diante.
 */
export type Vibration = {
  n: number;
  name: string;
  /** Uma linha, para o card da home. */
  body: string;
  /** Texto longo, para a página de numerologia. */
  detail: string;
  keywords: string[];
};

export const VIBRATIONS: readonly Vibration[] = [
  {
    n: 1,
    name: "Iniciação",
    body: "Liderança, coragem e o impulso de começar antes dos outros.",
    detail:
      "O um é o gesto que rompe o silêncio. É a vibração de quem abre caminho, assume o risco de estar errado e prefere agir a esperar. Onde ela aparece, há autonomia e vontade própria, e o aprendizado de que liderar também é escutar.",
    keywords: ["Início", "Coragem", "Autonomia"],
  },
  {
    n: 2,
    name: "União",
    body: "Sensibilidade, escuta e a arte de criar acordos.",
    detail:
      "O dois é a vibração do encontro. Ela percebe o clima de um ambiente, mede a palavra antes de dizer e sabe que a força de um vínculo está na paciência. Sua lição é lembrar que ceder sempre não é acordo. É ausência.",
    keywords: ["Escuta", "Parceria", "Diplomacia"],
  },
  {
    n: 3,
    name: "Expressão",
    body: "Palavra, encanto e a alegria de comunicar.",
    detail:
      "O três transforma o que sente em linguagem. É a vibração da criação e do encanto, de quem alegra a sala e dá nome ao que estava confuso. Pede foco: a mesma leveza que abre portas pode dispersar o que precisa de continuidade.",
    keywords: ["Criação", "Palavra", "Alegria"],
  },
  {
    n: 4,
    name: "Estrutura",
    body: "Método, paciência e construção que dura.",
    detail:
      "O quatro assenta a pedra. É a vibração de quem constrói com método e entrega o que prometeu, do alicerce que não aparece mas sustenta tudo. Seu desafio é abrir espaço para o imprevisto sem sentir que perdeu o chão.",
    keywords: ["Método", "Solidez", "Trabalho"],
  },
  {
    n: 5,
    name: "Liberdade",
    body: "Movimento, curiosidade e mudança como alimento.",
    detail:
      "O cinco precisa de ar. É a vibração da experiência, dos sentidos despertos e da recusa em aceitar uma só forma de viver. Aprende no movimento, e amadurece ao descobrir que compromisso também pode ser uma escolha livre.",
    keywords: ["Movimento", "Experiência", "Mudança"],
  },
  {
    n: 6,
    name: "Cuidado",
    body: "Afeto, beleza e responsabilidade com os seus.",
    detail:
      "O seis cuida. É a vibração do lar, da beleza que acolhe e da responsabilidade assumida por amor, não por dever. Onde ela está, alguém se sente em casa. Sua travessia é aprender a receber o cuidado que oferece.",
    keywords: ["Afeto", "Beleza", "Responsabilidade"],
  },
  {
    n: 7,
    name: "Mistério",
    body: "Silêncio, estudo e a busca pelo que está oculto.",
    detail:
      "O sete recolhe. É a vibração da pergunta que não se contenta com a primeira resposta, do estudo solitário e da intuição afiada pelo silêncio. Pede confiança: nem tudo que importa pode ser provado antes de ser vivido.",
    keywords: ["Silêncio", "Estudo", "Intuição"],
  },
  {
    n: 8,
    name: "Poder",
    body: "Realização material e domínio dos próprios recursos.",
    detail:
      "O oito realiza. É a vibração de quem entende de valor, administra o que tem e transforma visão em resultado concreto. Sua maturidade está em descobrir para que serve o poder depois de conquistá-lo.",
    keywords: ["Realização", "Recursos", "Autoridade"],
  },
  {
    n: 9,
    name: "Entrega",
    body: "Compaixão, fechamento de ciclos e generosidade.",
    detail:
      "O nove conclui. É a vibração de quem já viveu o bastante para reconhecer o fim de um ciclo e soltar com generosidade. Amplia o olhar para além de si, e aprende que se doar não é desaparecer.",
    keywords: ["Compaixão", "Ciclo", "Generosidade"],
  },
] as const;
