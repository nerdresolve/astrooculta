import type { SignId } from "./signs.ts";

/**
 * Nove perguntas, uma por vibração numerológica (1–9). Cada uma tem doze
 * alternativas — uma por signo, na ordem zodiacal.
 *
 * A atribuição do signo NUNCA aparece para quem responde: `sign` existe só para
 * a apuração. As alternativas são fragmentos em primeira pessoa, de uma linha,
 * sem letra nem número, e são embaralhadas na tela para que a ordem zodiacal
 * não vire pista.
 *
 * As perguntas são situacionais e sensoriais, nunca psicométricas — "diante de
 * uma porta fechada", não "em uma escala de 1 a 5".
 */
export type QuizOption = {
  id: string;
  sign: SignId;
  text: string;
};

export type QuizQuestionData = {
  /** Vibração numerológica de 1 a 9. */
  vibration: number;
  /** Nome da vibração, exibido em versalete acima da pergunta. */
  prompt: string;
  question: string;
  options: readonly QuizOption[];
};

const SIGN_ORDER: readonly SignId[] = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

/** Monta as doze alternativas na ordem zodiacal, com id estável (`q3-libra`). */
function options(vibration: number, texts: Record<SignId, string>): readonly QuizOption[] {
  return SIGN_ORDER.map((sign) => ({ id: `q${vibration}-${sign}`, sign, text: texts[sign] }));
}

export const QUIZ_QUESTIONS: readonly QuizQuestionData[] = [
  {
    vibration: 1,
    prompt: "Vibração um · Iniciação",
    question: "Diante de uma porta fechada, qual é o seu primeiro movimento?",
    options: options(1, {
      aries: "Empurro antes de pensar no que tem do outro lado.",
      taurus: "Encosto a mão e sinto o peso dela antes de decidir.",
      gemini: "Pergunto a alguém que já passou por ali.",
      cancer: "Espero para ver se ela se abre sozinha.",
      leo: "Bato com firmeza, para que saibam que cheguei.",
      virgo: "Procuro a fechadura e entendo o mecanismo.",
      libra: "Avalio se vale mais entrar ou contornar.",
      scorpio: "Escuto o que se move do outro lado.",
      sagittarius: "Se estiver trancada, sigo. Há outras portas.",
      capricorn: "Volto com a chave certa, no dia certo.",
      aquarius: "Reparo que a janela ao lado está aberta.",
      pisces: "Fecho os olhos e imagino o que me espera.",
    }),
  },
  {
    vibration: 2,
    prompt: "Vibração dois · União",
    question: "Uma conversa esfria e o silêncio se instala. O que você faz?",
    options: options(2, {
      aries: "Digo em voz alta o que ninguém quis dizer.",
      taurus: "Deixo o silêncio existir. Ele não me incomoda.",
      gemini: "Puxo outro assunto e a sala respira.",
      cancer: "Percebo quem ficou magoado e me aproximo.",
      leo: "Faço uma piada e devolvo o calor à mesa.",
      virgo: "Retomo o ponto onde a conversa se perdeu.",
      libra: "Procuro a frase que reconcilia os dois lados.",
      scorpio: "Observo. O silêncio também está dizendo algo.",
      sagittarius: "Proponho sair dali e continuar caminhando.",
      capricorn: "Encerro o assunto e proponho retomar depois.",
      aquarius: "Digo o que penso, mesmo que desconserte.",
      pisces: "Sinto o clima mudar antes de qualquer palavra.",
    }),
  },
  {
    vibration: 3,
    prompt: "Vibração três · Expressão",
    question: "O que você faz com uma ideia que acabou de ter?",
    options: options(3, {
      aries: "Começo naquele instante, ainda crua.",
      taurus: "Guardo, deixo amadurecer, faço com calma.",
      gemini: "Conto para três pessoas antes do fim do dia.",
      cancer: "Compartilho só com quem é de confiança.",
      leo: "Transformo em algo que possa ser visto.",
      virgo: "Escrevo, reviso e só então mostro.",
      libra: "Peço uma segunda opinião antes de seguir.",
      scorpio: "Guardo em silêncio até estar pronta.",
      sagittarius: "Já imagino aonde ela pode me levar.",
      capricorn: "Faço um plano e defino o primeiro passo.",
      aquarius: "Testo o oposto dela, só para ver no que dá.",
      pisces: "Deixo-a girar em mim, sem pressa de nomear.",
    }),
  },
  {
    vibration: 4,
    prompt: "Vibração quatro · Estrutura",
    question: "Como é o seu lugar de trabalho num dia comum?",
    options: options(4, {
      aries: "Bagunçado e em movimento: estou sempre a caminho.",
      taurus: "Confortável, com as coisas que gosto de tocar.",
      gemini: "Três assuntos abertos ao mesmo tempo.",
      cancer: "Com objetos que têm história para mim.",
      leo: "Um espaço com a minha cara, sem timidez.",
      virgo: "Cada coisa em seu lugar, e eu sei onde está.",
      libra: "Harmonioso: trabalho melhor no que é bonito.",
      scorpio: "Reservado. Ninguém mexe nas minhas coisas.",
      sagittarius: "Varia: trabalho onde o dia me encontrar.",
      capricorn: "Organizado em torno do que precisa ser feito.",
      aquarius: "Do meu jeito, mesmo que estranhem.",
      pisces: "Com música, luz baixa e algum devaneio.",
    }),
  },
  {
    vibration: 5,
    prompt: "Vibração cinco · Liberdade",
    question: "Uma semana inteira se abre, sem nenhum compromisso. E então?",
    options: options(5, {
      aries: "Faço aquilo que venho adiando por falta de coragem.",
      taurus: "Fico. Cozinho, durmo, não explico nada a ninguém.",
      gemini: "Encho a semana de gente e de conversa.",
      cancer: "Volto para onde cresci, ver quem me criou.",
      leo: "Organizo algo que reúna as pessoas que amo.",
      virgo: "Coloco em ordem o que vinha se acumulando.",
      libra: "Divido o tempo entre descanso e companhia.",
      scorpio: "Sumo. Uma semana sem ser encontrada.",
      sagittarius: "Compro a passagem mais barata para longe.",
      capricorn: "Adianto o que vai me sobrar tempo depois.",
      aquarius: "Mergulho naquele projeto que ninguém entende.",
      pisces: "Deixo a semana acontecer, sem plano nenhum.",
    }),
  },
  {
    vibration: 6,
    prompt: "Vibração seis · Cuidado",
    question: "Alguém que você ama está em silêncio há dias. Como você cuida?",
    options: options(6, {
      aries: "Vou até lá e pergunto de frente.",
      taurus: "Faço comida e sento junto, sem cobrar palavra.",
      gemini: "Mando mensagem todo dia, para não sumir o fio.",
      cancer: "Ofereço colo antes de oferecer conselho.",
      leo: "Lembro a ela quem ela é quando está inteira.",
      virgo: "Resolvo o que estiver ao meu alcance resolver.",
      libra: "Crio um clima leve para o assunto poder vir.",
      scorpio: "Espero. Quando ela falar, estarei ali inteira.",
      sagittarius: "Convido para sair e mudar o ar.",
      capricorn: "Ofereço estrutura: o que precisa, eu seguro.",
      aquarius: "Respeito o espaço. Sei o valor de sumir.",
      pisces: "Sinto junto, e ela percebe que não está só.",
    }),
  },
  {
    vibration: 7,
    prompt: "Vibração sete · Mistério",
    question: "O que te atrai no que ainda não tem explicação?",
    options: options(7, {
      aries: "O desafio de ser a primeira a descobrir.",
      taurus: "Prefiro o que posso tocar. O resto pode esperar.",
      gemini: "As perguntas que ele abre, uma puxando a outra.",
      cancer: "As lembranças que ele desperta sem eu pedir.",
      leo: "A chance de encontrar ali algo só meu.",
      virgo: "A vontade de finalmente entender o mecanismo.",
      libra: "A beleza que existe no que fica em suspenso.",
      scorpio: "Justamente o que está escondido embaixo.",
      sagittarius: "A promessa de que existe mais mundo do que vi.",
      capricorn: "Só me interessa se levar a algum lugar.",
      aquarius: "A possibilidade de tudo ser diferente do que dizem.",
      pisces: "O silêncio que ele deixa quando termino de olhar.",
    }),
  },
  {
    vibration: 8,
    prompt: "Vibração oito · Poder",
    question: "Você conquistou algo importante. Qual é o primeiro pensamento?",
    options: options(8, {
      aries: "Qual é o próximo.",
      taurus: "Que agora tenho segurança para descansar.",
      gemini: "Com quem eu conto isso primeiro.",
      cancer: "Que quero dividir com quem esteve comigo.",
      leo: "Que valeu cada olhar que duvidou.",
      virgo: "O que eu faria melhor da próxima vez.",
      libra: "Se fui justa com quem participou.",
      scorpio: "O que isso muda em mim, não lá fora.",
      sagittarius: "Que porta isso abre para o que vem.",
      capricorn: "Que o plano funcionou, como eu esperava.",
      aquarius: "Como usar isso para algo maior que eu.",
      pisces: "Um alívio silencioso, difícil de explicar.",
    }),
  },
  {
    vibration: 9,
    prompt: "Vibração nove · Entrega",
    question: "Um ciclo se encerra. Como você se despede?",
    options: options(9, {
      aries: "Rápido. Já estou olhando para frente.",
      taurus: "Devagar, com saudade, no meu tempo.",
      gemini: "Contando a história até ela fazer sentido.",
      cancer: "Guardando cada lembrança com cuidado.",
      leo: "Com uma despedida à altura do que vivi.",
      virgo: "Deixando tudo em ordem para quem fica.",
      libra: "Em paz com todos os lados da história.",
      scorpio: "Por inteiro. Quando acaba, acabou.",
      sagittarius: "Agradecendo o aprendizado e seguindo.",
      capricorn: "Cumprindo até o fim o que assumi.",
      aquarius: "Sem nostalgia: o que vem será melhor.",
      pisces: "Chorando o que precisa ser chorado.",
    }),
  },
] as const;

export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
