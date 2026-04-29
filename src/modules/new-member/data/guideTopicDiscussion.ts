import type { Locale } from '../../../i18n/locales';

export interface GuideTopicDiscussion {
  doctrinalQuestions: string[];
  lifeApplicationIdeas: string[];
}

const discussionEs: Record<string, GuideTopicDiscussion> = {
  'sacrament-meeting': {
    doctrinalQuestions: [
      '¿Qué diferencia hay entre asistir a una reunión y adorar verdaderamente al Salvador? ¿Cómo se nota la diferencia desde adentro?',
      '¿Qué prometemos al participar del sacramento, y qué promete el Señor a cambio? ¿Por qué esa promesa es uno de los regalos más grandes que el Padre Celestial nos ofrece?',
      '¿Por qué la oración sacramental específicamente nos pide recordar a Cristo «siempre», no solo durante el sacramento? ¿Qué cambia en nuestra semana cuando lo recordamos a diario?',
      '¿Qué relación hay entre el convenio bautismal y el sacramento? ¿Por qué el Señor proveyó una manera de renovar ese convenio cada semana en vez de hacerlo una sola vez?',
      'En Doctrina y Convenios 27:2, el Señor dice que «no importa lo que comáis o bebáis... si lo hacéis con la mira puesta únicamente en mi gloria». ¿Qué nos enseña eso sobre dónde está el verdadero poder del sacramento?',
      '¿Qué cambia en tu comprensión del domingo cuando ves la reunión sacramental como renovación de convenios y no solo como un servicio religioso?',
    ],
    lifeApplicationIdeas: [
      'Llega cinco a diez minutos antes y silencia tu teléfono para preparar tu corazón antes del himno sacramental, no apenas comience la oración.',
      'Durante la oración del pan y del agua, escucha cada palabra como si la oyeras por primera vez. Identifica los tres convenios que prometes y la promesa que recibes a cambio.',
      'Antes de tomar el pan, piensa con honestidad: «¿En qué necesito que me ayude el Salvador esta semana?». Pídele esa ayuda específica mientras participas.',
      'Después de la reunión, anota en tu diario una sola impresión que el Espíritu te haya dado durante el sacramento, los himnos o los mensajes. Actúa sobre ella antes de que termine el domingo.',
      'A lo largo de la semana, escoge un momento diario (al despertar, al manejar, antes de dormir) para «recordarle siempre» con una oración breve o un versículo. Observa cómo eso prepara tu próximo sacramento.',
      'Si te asignan dar un mensaje sacramental, escríbelo después de orar y de leer escrituras y enseñanzas de los profetas vivientes. Habla desde la sencillez y la fe, no para impresionar.',
    ],
  },
  'come-follow-me': {
    doctrinalQuestions: [
      '¿Por qué el Señor enseña tanto en el hogar como en la iglesia, y no solo en una clase formal?',
      '¿Qué significa estudiar las Escrituras para conversión y no solo para información?',
      '¿Cómo une a un barrio el hecho de estudiar los mismos pasajes durante la semana?',
    ],
    lifeApplicationIdeas: [
      'Aparta un momento fijo de la semana para abrir Ven, sígueme aunque solo sean quince minutos.',
      'Comparte una verdad aprendida con tu familia, un amigo o alguien del barrio.',
      'Llega a la clase dominical con una pregunta preparada y con disposición para escuchar al Espíritu.',
    ],
  },
  ministering: {
    doctrinalQuestions: [
      '¿Qué diferencia hay entre “cumplir una asignación” y ministrar como lo haría Cristo?',
      '¿Por qué el ministerio requiere discernimiento espiritual y no solo buena intención?',
      '¿Qué enseña el evangelio sobre cuidar almas sin invadir ni controlar?',
    ],
    lifeApplicationIdeas: [
      'Piensa en una persona que pueda necesitar ánimo y contáctala esta semana con sencillez.',
      'Antes de ofrecer consejo, haz una pregunta sincera y escucha con paciencia.',
      'Si ves una necesidad grande, coordina con líderes en vez de intentar cargarlo todo solo.',
    ],
  },
  'personal-prayer': {
    doctrinalQuestions: [
      '¿Qué revela la oración sobre tu relación real con el Padre Celestial?',
      '¿Por qué orar en el nombre de Jesucristo es más que una fórmula al final?',
      '¿Cómo distingues entre pedir que Dios haga tu voluntad y ofrecerle la tuya?',
    ],
    lifeApplicationIdeas: [
      'Haz una oración de gratitud específica al empezar y otra de entrega al terminar el día.',
      'Anota una impresión recibida en oración y revísala después de actuar sobre ella.',
      'Cuando no sientas respuesta inmediata, sigue haciendo lo que ya sabes que es correcto.',
    ],
  },
  'scripture-study': {
    doctrinalQuestions: [
      '¿Por qué las Escrituras no solo informan, sino que también convierten?',
      '¿Qué diferencia hay entre leer rápido y hacer fiesta de la palabra de Cristo?',
      '¿Cómo puede el Espíritu usar un solo versículo para corregir, consolar o guiar?',
    ],
    lifeApplicationIdeas: [
      'Lee un pasaje corto y pregúntate qué te enseña sobre Jesucristo antes de seguir.',
      'Subraya una frase y escríbela con tus propias palabras en tu diario.',
      'Usa una escritura estudiada esa mañana en una decisión real de ese mismo día.',
    ],
  },
  'sabbath-day': {
    doctrinalQuestions: [
      '¿Qué significa “santificar” el día del Señor y no solo descansar?',
      '¿Cómo te ayuda el día de reposo a recordar quién eres delante de Dios?',
      '¿Por qué el discipulado cambia la manera de usar el tiempo dominical?',
    ],
    lifeApplicationIdeas: [
      'Planea desde el sábado por la noche una forma concreta de proteger la reverencia del domingo.',
      'Elige una actividad dominical que acerque más tu corazón al Salvador y repítela con intención.',
      'Habla con tu familia sobre qué costumbre dominical les ayuda más a sentir paz y adoración.',
    ],
  },
  'tithing-offerings': {
    doctrinalQuestions: [
      '¿Qué revela el diezmo sobre confianza, obediencia y prioridades del corazón?',
      '¿Por qué ofrendar no es solo una transacción, sino un acto de fe?',
      '¿Cómo cambia la mayordomía cuando reconoces que todo viene del Señor?',
    ],
    lifeApplicationIdeas: [
      'Revisa tu presupuesto con espíritu de gratitud y no solo de presión.',
      'Ora antes de hacer un sacrificio económico para consagrarlo al Señor.',
      'Haz una ofrenda generosa pensando en personas reales que necesitan ayuda.',
    ],
  },
  'confirmation-gift': {
    doctrinalQuestions: [
      '¿Qué diferencia hay entre sentir algo espiritual ocasional y recibir el don del Espíritu Santo?',
      '¿Por qué este don está ligado a convenios y ordenanzas, y no solo a emociones?',
      '¿Cómo obra el Espíritu en la vida diaria de un discípulo obediente?',
    ],
    lifeApplicationIdeas: [
      'Antes de tomar una decisión importante, ora y deja espacio para escuchar en silencio.',
      'Identifica una impresión reciente del Espíritu y obedécela sin retrasarla.',
      'Reduce una distracción concreta esta semana para estar más atento a la guía espiritual.',
    ],
  },
  'renewing-covenants': {
    doctrinalQuestions: [
      '¿Qué diferencia hay entre recordar un convenio y renovarlo con intención?',
      '¿Cómo se relacionan arrepentimiento, misericordia y fidelidad al renovar convenios?',
      '¿Por qué los convenios no son una carga cuando se viven cerca de Cristo?',
    ],
    lifeApplicationIdeas: [
      'Antes del domingo, piensa en un mandamiento que quieras obedecer con mayor sinceridad.',
      'Usa la Santa Cena para entregar al Señor una debilidad concreta y pedir fuerza.',
      'Habla con tu obispo o líder si sientes que necesitas ayuda para volver a empezar con paz.',
    ],
  },
  'temple-preparation': {
    doctrinalQuestions: [
      '¿Por qué el templo exige preparación espiritual y no solo curiosidad?',
      '¿Qué relación hay entre convenios del templo y la vida diaria en casa, en la iglesia y en el trabajo?',
      '¿Cómo te prepara el Señor poco a poco para entrar en una casa santa?',
    ],
    lifeApplicationIdeas: [
      'Haz preguntas al obispo o a un líder fiel en vez de llenar vacíos con rumores.',
      'Fortalece desde ahora hábitos de pureza, reverencia y obediencia.',
      'Visita el templo, si puedes, aunque sea por fuera, y ora para sentir deseo de prepararte dignamente.',
    ],
  },
  'finding-friends': {
    doctrinalQuestions: [
      '¿Qué significa pertenecer al pueblo del convenio más allá de “caer bien” socialmente?',
      '¿Cómo puede la amistad en la iglesia ser una expresión del amor de Cristo?',
      '¿Por qué la verdadera integración requiere paciencia tanto del barrio como del nuevo miembro?',
    ],
    lifeApplicationIdeas: [
      'Preséntate a una persona nueva después de la reunión y recuerda su nombre.',
      'Acepta una invitación sencilla, aunque todavía te sientas tímido o fuera de lugar.',
      'Busca servir en algo pequeño; muchas amistades nacen al trabajar juntos.',
    ],
  },
  'asking-for-help': {
    doctrinalQuestions: [
      '¿Por qué pedir ayuda puede ser un acto de humildad y no de debilidad?',
      '¿Cómo usa el Señor a líderes, familiares y amigos para responder oraciones?',
      '¿Qué diferencia hay entre cargar solo con todo y confiar en el cuerpo de Cristo?',
    ],
    lifeApplicationIdeas: [
      'Nombra con claridad la ayuda que necesitas en vez de insinuarla vagamente.',
      'Habla con un líder o una persona de confianza antes de que la carga se vuelva más pesada.',
      'Permite que otros te sirvan y agradece sin sentir vergüenza por necesitar apoyo.',
    ],
  },
};

const discussionEn: Record<string, GuideTopicDiscussion> = {
  'sacrament-meeting': {
    doctrinalQuestions: [
      'What is the difference between attending a meeting and truly worshiping the Savior? How can you tell the difference from within yourself?',
      'What do we promise when we partake of the sacrament, and what does the Lord promise in return? Why is that promise one of the greatest gifts Heavenly Father offers us?',
      'Why do the sacramental prayers ask us to remember Christ "always," not only during the sacrament? What changes in our week when we remember Him daily?',
      'What is the relationship between the baptismal covenant and the sacrament? Why did the Lord provide a way to renew that covenant every week rather than only once?',
      'In Doctrine and Covenants 27:2, the Lord says it does not matter what you eat or drink "if it so be that ye do it with an eye single to my glory." What does this teach us about where the true power of the sacrament resides?',
      'How does your understanding of Sunday change when you see sacrament meeting as a renewal of covenants rather than just a religious service?',
    ],
    lifeApplicationIdeas: [
      'Arrive five to ten minutes early and silence your phone to prepare your heart before the sacrament hymn, not just before the prayer begins.',
      'During the prayers over the bread and water, listen to every word as if hearing it for the first time. Identify the three covenants you make and the promise you receive in return.',
      "Before taking the bread, ask yourself honestly: \"Where do I need the Savior's help this week?\" Ask Him for that specific help as you partake.",
      'After the meeting, write in your journal one impression the Spirit gave you during the sacrament, the hymns, or the talks. Act on it before Sunday ends.',
      'Throughout the week, pick one daily moment (waking, driving, before sleep) to "always remember Him" with a short prayer or verse. Notice how it prepares your next sacrament.',
      'If asked to give a sacrament talk, write it after prayer and study of the scriptures and living prophets. Speak from simplicity and faith, not to impress.',
    ],
  },
  'come-follow-me': {
    doctrinalQuestions: [
      'Why does the Lord teach both at home and at church instead of only in formal classes?',
      'What does it mean to study scripture for conversion rather than only for information?',
      'How does shared weekly study help unify a ward in faith and conversation?',
    ],
    lifeApplicationIdeas: [
      'Set aside one consistent moment each week to open Come, Follow Me, even if it is brief.',
      'Share one truth you learned with family, a friend, or someone in the ward.',
      'Come to class with one prepared question and a heart ready to hear the Spirit.',
    ],
  },
  ministering: {
    doctrinalQuestions: [
      'What is the difference between “fulfilling an assignment” and ministering the way Christ would?',
      'Why does true ministering require spiritual discernment and not just good intentions?',
      'What does the gospel teach about caring for souls without becoming intrusive or controlling?',
    ],
    lifeApplicationIdeas: [
      'Think of one person who may need encouragement and reach out this week with simplicity.',
      'Before offering advice, ask one sincere question and listen with patience.',
      'If a need is serious, involve leaders rather than trying to carry the whole burden alone.',
    ],
  },
  'personal-prayer': {
    doctrinalQuestions: [
      'What does prayer reveal about your real relationship with Heavenly Father?',
      'Why is praying in the name of Jesus Christ more than just a closing phrase?',
      'How do you tell the difference between asking God to do your will and offering Him yours?',
    ],
    lifeApplicationIdeas: [
      'Offer one prayer of gratitude at the start of the day and one prayer of surrender at the end.',
      'Write down one prompting received in prayer and revisit it after you act on it.',
      'When answers feel delayed, keep doing what you already know is right.',
    ],
  },
  'scripture-study': {
    doctrinalQuestions: [
      'Why do the scriptures not only inform us, but also convert us?',
      'What is the difference between reading quickly and feasting upon the word of Christ?',
      'How can the Spirit use a single verse to correct, comfort, or guide you?',
    ],
    lifeApplicationIdeas: [
      'Read a short passage and ask what it teaches you about Jesus Christ before moving on.',
      'Underline one phrase and rewrite it in your own words in your journal.',
      'Use one scripture from your study that same day in a real decision you have to make.',
    ],
  },
  'sabbath-day': {
    doctrinalQuestions: [
      'What does it mean to keep the Lord’s day holy rather than merely restful?',
      'How does the Sabbath help you remember who you are before God?',
      'Why does discipleship change the way we use Sunday time?',
    ],
    lifeApplicationIdeas: [
      'Plan on Saturday night one simple way to protect the reverence of Sunday.',
      'Choose one Sunday practice that turns your heart more fully to the Savior.',
      'Talk with your family about which Sabbath habit helps them feel worship and peace most deeply.',
    ],
  },
  'tithing-offerings': {
    doctrinalQuestions: [
      'What does tithing reveal about trust, obedience, and the priorities of the heart?',
      'Why are offerings more than a transaction and instead an act of faith?',
      'How does stewardship change when you recognize that everything comes from the Lord?',
    ],
    lifeApplicationIdeas: [
      'Review your budget with gratitude instead of fear or resentment.',
      'Pray before making a financial sacrifice so that it becomes a consecrated act.',
      'Give a generous offering while thinking of real people who may be blessed by it.',
    ],
  },
  'confirmation-gift': {
    doctrinalQuestions: [
      'What is the difference between occasional spiritual feelings and receiving the gift of the Holy Ghost?',
      'Why is this gift tied to ordinances and covenants rather than emotion alone?',
      'How does the Spirit work in the daily life of an obedient disciple?',
    ],
    lifeApplicationIdeas: [
      'Before a meaningful decision, pray and leave quiet space to listen.',
      'Identify one recent prompting and obey it without delay.',
      'Reduce one distraction this week so you can be more attentive to spiritual guidance.',
    ],
  },
  'renewing-covenants': {
    doctrinalQuestions: [
      'What is the difference between remembering a covenant and renewing it intentionally?',
      'How are repentance, mercy, and covenant faithfulness connected?',
      'Why are covenants not a burden when they are lived close to Christ?',
    ],
    lifeApplicationIdeas: [
      'Before Sunday, think of one commandment you want to keep with greater sincerity.',
      'Use the sacrament to place one weakness before the Lord and ask for strength.',
      'Speak with your bishop or leader if you need help starting again with peace.',
    ],
  },
  'temple-preparation': {
    doctrinalQuestions: [
      'Why does the temple require spiritual preparation and not just curiosity?',
      'How do temple covenants shape ordinary life at home, at church, and at work?',
      'How does the Lord prepare disciples gradually to enter a holy house?',
    ],
    lifeApplicationIdeas: [
      'Ask faithful leaders honest questions rather than filling the gaps with rumor.',
      'Strengthen habits of purity, reverence, and obedience now, not later.',
      'If possible, visit temple grounds and pray for a deeper desire to prepare worthily.',
    ],
  },
  'finding-friends': {
    doctrinalQuestions: [
      'What does it mean to belong to the covenant people beyond simply fitting in socially?',
      'How can friendship in the Church become an expression of Christlike love?',
      'Why does real belonging require patience both from the ward and from the new member?',
    ],
    lifeApplicationIdeas: [
      'Introduce yourself to one new person after church and remember their name.',
      'Accept one simple invitation even if you still feel shy or out of place.',
      'Look for a small way to serve; many friendships grow while serving together.',
    ],
  },
  'asking-for-help': {
    doctrinalQuestions: [
      'Why can asking for help be an act of humility rather than weakness?',
      'How does the Lord use leaders, family, and friends to answer prayer?',
      'What is the difference between carrying everything alone and trusting the body of Christ?',
    ],
    lifeApplicationIdeas: [
      'Name the help you need clearly instead of only hinting at it.',
      'Speak with a leader or trusted person before the burden grows heavier.',
      'Let others serve you and receive that help without shame.',
    ],
  },
};

export function getGuideTopicDiscussion(
  topicId: string,
  locale: Locale,
): GuideTopicDiscussion | undefined {
  const catalog = locale === 'en' ? discussionEn : discussionEs;
  return catalog[topicId];
}
