/**
 * Lecciones alineadas a manuales oficiales (resúmenes propios + enlaces).
 * ES: citas de escritura en forma oficial española.
 */

import type { TrainingLessonContent } from './trainingLessonContent.types';

const URL_TSW_ES =
  'https://www.churchofjesuschrist.org/study/manual/teaching-in-the-saviors-way-2022?lang=spa';
const URL_HB_ES = 'https://www.churchofjesuschrist.org/study/manual/general-handbook?lang=spa';

const H = {
  objectives: 'Objetivos de esta lección',
  brief: 'Ideas clave',
  scriptures: 'Escrituras para estudiar',
  didYouKnow: 'Para reflexionar',
  practice: 'Práctica personal',
  practiceHint: 'Marca cada paso cuando lo hayas intentado esta semana.',
  practiceDone: 'Hecho',
  practicePending: 'Pendiente',
  reflection: 'Reflexión',
  reflectionHint: 'Escribe con honestidad; puedes borrar cuando quieras.',
  reflectionPh: 'Tu respuesta…',
  action: 'Compromiso esta semana',
} as const;

function tswLinks(): NonNullable<TrainingLessonContent['officialLinks']> {
  return [
    { label: 'Enseñar a la manera del Salvador (manual 2022)', url: URL_TSW_ES },
    { label: 'Manual General — cap. 17 Enseñar el Evangelio', url: URL_HB_ES },
  ];
}

function hbLink(chapterHint: string): NonNullable<TrainingLessonContent['officialLinks']> {
  return [{ label: `Manual General — ${chapterHint}`, url: URL_HB_ES }];
}

export const MANUAL_LESSONS_ES: Record<string, TrainingLessonContent> = {
  'tsw-1-1': {
    intro:
      'Toda clase o charla puede acercar a las personas a Cristo cuando el maestro tiene ese norte claro. Esta lección resume el enfoque del manual oficial sin sustituirlo.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Definir qué significa “enseñar sobre Cristo” aunque el tema parezca práctico o administrativo.',
      'Elegir una pregunta o invitación que vuelva al Salvador el centro de tu próxima clase.',
    ],
    briefHeading: H.brief,
    briefBody:
      'El manual *Enseñar a la manera del Salvador* invita a que Jesucristo no sea solo un preámbulo, sino el propósito: fe en Él, arrepentimiento, convenios y don del Espíritu. El Manual General, en el capítulo sobre enseñar el Evangelio, enlaza esos principios con la labor en el hogar y en la Iglesia.',
    scripturesHeading: H.scriptures,
    scriptures: [
      {
        ref: '2 Nefi 25:26',
        text: 'Y hablamos de Cristo, nos regocijamos en Cristo…',
      },
      {
        ref: 'Juan 17:3',
        text: '…la vida eterna es esta: que te conozcan a ti… y a Jesucristo…',
      },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: [
      'Una lista de “pasos de la clase” puede cumplirse y aun así no tocar el corazón si Cristo no es el héroe del relato.',
      'Lee en el manual oficial la parte 1 y anota una frase que quieras recordar.',
    ],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Escribí el título de tu próxima lección y una frase: “Lo que quiero que sientan acerca de Cristo es…”',
      'Elegí un versículo corto que conecte el tema con Su divinidad o Su Expiación.',
      'Planté una pregunta que invite a actuar con fe en Él (no solo a opinar).',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Qué tema me cuesta más vincular con Cristo sin forzarlo?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText:
      'En tu próxima preparación, dedicá los primeros cinco minutos a orar pidiendo: “¿Qué quiere el Salvador que estas personas aprendan o sientan?”',
  },
  'tsw-1-2': {
    intro:
      'Ayudar a “venir a Cristo” es más que transmitir información: es invitar a confiar, arrepentirse, tomar el Espíritu como guía y perseverar en convenios.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Reconocer señales de que una clase edifica fe en el Salvador.',
      'Planear una invitación sencilla y respetuosa al arrepentimiento o al estudio personal.',
    ],
    briefHeading: H.brief,
    briefBody:
      'El Salvador invitó, testificó y dejó espacio para que la gente eligiera. La obra de salvación y exaltación descrita en el Manual General se cumule cuando enseñamos de modo que las personas quieran acercarse a Él, no solo aprobar una idea.',
    scripturesHeading: H.scriptures,
    scriptures: [
      { ref: 'Mateo 11:28–30', text: 'Venid a mí… y hallaréis descanso para vuestras almas.' },
      { ref: 'Moroni 10:32', text: 'Venid a Cristo, y ser perfeccionados en él…' },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: [
      'La presión por “cubrir todo el material” puede opacar una invitación clara al cambio de corazón.',
    ],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Listá tres necesidades comunes de tu grupo (miedo, cansancio, culpa) y cómo Cristo las aborda con compasión.',
      'Escribí una invitación breve que podrías usar al cerrar (oración, estudio en el hogar, ayuno, sacramento).',
      'Preguntate si tu lenguaje honra la libertad de elegir.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Cuándo sentiste que una clase te acercó al Salvador de verdad?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Incluí al menos una invitación explícita a actuar en fe en Cristo en tu próximo encuentro.',
  },
  'tsw-2-1': {
    intro:
      'El amor sincero prepara el corazón para escuchar al Espíritu; sin él, la doctrina puede sonar fría.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Identificar una acción concreta que muestre amor antes o después de enseñar.',
      'Evitar tres tonos que suelen apagar el Espíritu (sarcasmo, comparación, vergüenza).',
    ],
    briefHeading: H.brief,
    briefBody:
      'El manual presenta el amor como motivación, no como técnica. El cap. 17 del Manual General conecta ese principio con reuniones edificantes y respeto a cada alumno.',
    scripturesHeading: H.scriptures,
    scriptures: [
      { ref: 'Juan 13:34', text: 'Amados los unos a los otros; como yo os he amado…' },
      { ref: 'Moroni 8:26', text: '…persuadid con amor…' },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['El amor se nota en cómo escuchás las respuestas “incorrectas” o silenciosas.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Saludá o agradecé personalmente a alguien de tu clase esta semana.',
      'Revisá un comentario tuyo reciente: ¿sonaba condescendiente?',
      'Orá por un alumno por nombre antes de enseñar.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Qué alumno necesita que le creas más de lo que cree en sí mismo?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Escribí un mensaje breve de ánimo a un miembro de tu clase (texto o nota).',
  },
  'tsw-2-2': {
    intro:
      'Enseñar por el Espíritu implica preparación, rectitud personal y flexibilidad para seguir impresiones.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Distinguir entre “cubrir el programa” y “guiar bajo la dirección del Espíritu”.',
      'Preparar un plan A y un “plan B” espiritual (tema alterno o pregunta).',
    ],
    briefHeading: H.brief,
    briefBody:
      'Doctrina y Convenios enseña que el Espíritu revela verdad en mente y corazón; el manual aplica eso al aula y al hogar. El Manual General recuerda que líderes apoyan pero no reemplazan la inspiración del maestro.',
    scripturesHeading: H.scriptures,
    scriptures: [
      { ref: 'Doctrina y Convenios 8:2', text: '…entrará en tu mente y en tu corazón…' },
      { ref: 'Doctrina y Convenios 50:13–14', text: '…predicad mis doctrinas… por el Espíritu…',
      },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['A veces el Espíritu acorta tu lección; otras veces te pide profundizar en un solo versículo.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Reservá tiempo de oración silenciosa antes de enseñar.',
      'Escribí una pregunta que podrías omitir si el Espíritu pide otro camino.',
      'Pedí a un compañero que te sostenga en oración ese día.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Cuándo sentiste que el Salvador dirigió tu clase aunque cambió tu plan?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Incluí en tu bosquejo un margen literal para “Espíritu / impresión”.',
  },
  'tsw-2-3': {
    intro:
      'La doctrina del Evangelio da poder; los meros datos o opiniones no cambian vidas de modo duradero.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Formular una oración doctrinal clara para tu próximo bloque de enseñanza.',
      'Separar “historia interesante” de “principio salvífico”.',
    ],
    briefHeading: H.brief,
    briefBody:
      'El manual invita a enseñar las verdades que el Presidente de la Iglesia y las Escrituras enfatizan. El Manual General subraya doctrina fiel, no especulación.',
    scripturesHeading: H.scriptures,
    scriptures: [
      { ref: 'Doctrina y Convenios 42:14', text: '…predicad mi doctrina…' },
      { ref: '2 Timoteo 3:16–17', text: '…la Escritura… para enseñar…' },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Una sola frase bien fundada puede valer más que diez diapositivas.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Elegí un principio del manual *Ven, sígueme* o del material oficial y citá la fuente.',
      'Eliminá un “adorno” que no sume doctrina.',
      'Prepará una pregunta que lleve a las Escrituras, no solo a la opinión.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Qué error doctrinal suele confundir a tu grupo?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Escribí en una tarjeta la doctrina central de tu lección en una oración.',
  },
  'tsw-2-4': {
    intro:
      'Pedir, buscar y llamar: el Salvador invitó a la diligencia; el maestro diseña actividades que exigen participación real.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Añadir al menos una tarea de estudio o reflexión antes o después de clase.',
      'Evitar que solo el maestro hable el noventa por ciento del tiempo.',
    ],
    briefHeading: H.brief,
    briefBody:
      'El aprendizaje diligente conecta hogar e Iglesia. El Manual General describe la Escuela Dominical y otras reuniones como apoyo al estudio personal y familiar.',
    scripturesHeading: H.scriptures,
    scriptures: [
      { ref: 'Mateo 7:7–8', text: 'Pedid, y se os dará; buscad, y hallaréis…' },
      { ref: 'Doctrina y Convenios 88:118', text: '…buscad diligentemente…' },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Una lista de lectura opcional honra la agencia mejor que una charla interminable.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Asigná lectura breve en las Escrituras para la próxima semana.',
      'Prepará una actividad en parejas o tríos de dos minutos.',
      'Preguntá “¿Qué harás diferente?” en lugar de solo “¿Qué aprendiste?”',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Qué hábito personal modelo para mis alumnos?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Dejá escrita una tarea concreta en el cierre de tu clase.',
  },
  'tsw-3-1': {
    intro:
      'Niños, jóvenes, adultos, conversos y familias tienen ritmos distintos; la caridad ajusta métodos sin cambiar doctrina.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Elegir una adaptación válida para tu grupo (tiempo, lenguaje, accesibilidad).',
      'Consultar con líderes cuando haya necesidades sensibles.',
    ],
    briefHeading: H.brief,
    briefBody:
      'La parte 3 del manual ofrece sugerencias por contexto. El Manual General dedica capítulos a organizaciones y a miembros con necesidades especiales.',
    scripturesHeading: H.scriptures,
    scriptures: [
      { ref: 'Moroni 7:45', text: '…sufrida, y es benigna… no busca lo suyo…' },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Preguntar “¿qué necesitás?” a un padre o maestro auxiliar evita suposiciones.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Listá barreras (horario, idioma, fatiga) de tu grupo.',
      'Elegí una solución simple (más pausas, visual, repetición).',
      'Coordiná con la presidencia si alguien necesita acompañamiento pastoral.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿A quién suelo pasar por alto al planificar?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Hacé un cambio pequeño y medible en tu próxima clase para incluir mejor.',
  },
  'tsw-3-2': {
    intro:
      'Un bosquejo no es un guion rígido: ordena tiempo, objetivos doctrinales y momentos del Espíritu.',
    officialLinks: [
      ...tswLinks(),
      { label: 'Ejemplo de lección en el manual TSW (parte 3)', url: URL_TSW_ES },
    ],
    objectivesHeading: H.objectives,
    objectives: [
      'Escribir objetivo, versículo ancla y pregunta de cierre.',
      'Alinear cada segmento con un principio de la parte 2 del manual.',
    ],
    briefHeading: H.brief,
    briefBody:
      'El manual muestra un ejemplo de planificación; úsalo como plantilla, no como copia. Los líderes del barrio pueden orientar expectativas de tiempo y enfoque.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Doctrina y Convenios 88:77', text: '…enseñad vuestras edificaciones…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Si tu bosquejo tiene más de una página, probablemente hablas demasiado.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Cronometrá tu introducción (máx. 3–4 minutos).',
      'Escribí la pregunta más importante de la clase.',
      'Reservá un espacio para testimonio breve o música si aplica.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Qué parte de tu clase suele comerse el tiempo del Espíritu?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Completá un bosquejo de una página para tu próxima lección.',
  },
  'tsw-3-3': {
    intro:
      'Mejorar como maestro requiere humildad y datos: qué funcionó, qué no, y qué harás distinto.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Usar el formulario o lista de autoevaluación del manual como espejo, no como culpa.',
      'Pedir una retroalimentación específica a un par.',
    ],
    briefHeading: H.brief,
    briefBody:
      'La autoevaluación del manual invita a revisar amor, Espíritu, doctrina y aprendizaje diligente. Los líderes pueden acompañar con entrevistas pastorales, no con micromanagement.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Proverbios 15:22', text: '…con multitud de consejeros…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Una mejora por mes vale más que diez promesas vagas.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Calificá del 1 al 5 tu preparación espiritual de la última clase.',
      'Anotá una fortaleza y un punto de mejora con evidencia concreta.',
      'Programá cuándo volverás a revisar esta nota.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Qué temo que me digan si pido consejo honesto?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Compartí tu punto de mejora con alguien de confianza y pedí una sugerencia.',
  },
  'tsw-3-4': {
    intro:
      'El consejo de maestros existe para fortalecer, no para avergonzar: intercambio de ideas y oración mutua.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Preparar una pregunta útil para llevar al consejo (no solo informar).',
      'Respetar confidencialidad y tiempo.',
    ],
    briefHeading: H.brief,
    briefBody:
      'Manual General y manual TSW describen propósitos de estos encuentros. Participá con docilidad y gratitud.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Efesios 4:11–12', text: '…para el perfeccionamiento de los santos…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Escuchar a otro maestro enseñar un minuto puede abrir más que una charla teórica.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Leé en el Manual General la sección sobre reuniones del consejo de maestros.',
      'Escribí una duda pedagógica real (no personal de otro).',
      'Ofrecé apoyo a un colega esta semana.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Cómo puedo hacer del consejo un lugar seguro?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Llevá una pregunta concreta al próximo consejo de maestros.',
  },
  'tsw-3-5': {
    intro:
      'Obispos, presidentes de estaca y presidentes de organización pueden orientar, proveer recursos y defender tiempo de preparación.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Saber a qué líder acudir según el tema (material, pastoral, edificio).',
      'Comunicar necesidades con anticipación, no el sábado a la noche.',
    ],
    briefHeading: H.brief,
    briefBody:
      'El manual TSW incluye orientación para líderes; el Manual General distribuye responsabilidades entre barrio y estaca. Tu llamamiento no te deja solo.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Mosíah 18:21', text: '…sostenése mutuamente…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Pedir ayuda a tiempo honra el servicio de los líderes.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Identificá un recurso oficial (app, video, artículo) que podrías usar.',
      'Si necesitás apoyo, redactá un mensaje breve y respetuoso.',
      'Agradecé públicamente al líder que te ayudó recientemente.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Qué recurso me falta y quién podría facilitármelo?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Enviá una solicitud concreta de apoyo a tu líder directo esta semana.',
  },
  'org-eq-1': {
    intro:
      'El cuórum de élderes participa en la obra de salvación y exaltación: vivir el Evangelio, ministrar, compartirlo y unir familias.',
    officialLinks: hbLink('cap. 8 — Cuórum de élderes'),
    objectivesHeading: H.objectives,
    objectives: [
      'Explicar en una frase el propósito del cuórum según el Manual General.',
      'Relacionar la enseñanza en el cuórum con el hogar y la ministración.',
    ],
    briefHeading: H.brief,
    briefBody:
      'Las reuniones del sacerdocio forman élderes que enseñan con ejemplo. El manual describe cómo el cuórum apoya al obispo sin duplicar su labor.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Doctrina y Convenios 107:85–87', text: '…el deber del élder…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Una lección del cuórum puede inspirar una noche de hogar en alguna familia.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Leé la introducción del cap. 8 del Manual General.',
      'Anotá cómo tu clase puede motivar ministración esta semana.',
      'Coordiná con la presidencia del cuórum un tema que el barrio necesita.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Qué hermano del cuórum necesita ser incluido mejor?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Propone un tema de quorum alineado a una necesidad real del barrio.',
  },
  'org-rs-1': {
    layout: 'structured',
    intro:
      'Aprende el propósito divino de la Sociedad de Socorro y cómo aplicarlo en tu vida, tu hogar y tu servicio cristiano.',
    overview:
      'Esta lección no sustituye el Manual General ni el manual «Enseñar a la manera del Salvador»; te ayuda a vivir con intención lo que ya enseña la Iglesia: fe en Jesucristo en el centro, hogar fortalecido y servicio caritativo en armonía con las llaves del sacerdocio.\n\nCada bloque termina en una acción concreta. Léelo con calma, abre las escrituras enlazadas y deja que el Espíritu te muestre un paso real para esta semana.',
    officialLinks: [
      ...hbLink('cap. 9 — Sociedad de Socorro'),
      { label: 'Enseñar a la manera del Salvador (manual 2022)', url: URL_TSW_ES },
    ],
    scriptures: [
      { ref: 'Mosíah 18:8–9', text: '…soportar los afligidos…' },
      { ref: '3 Nefi 18:21', text: '…orar en vuestras familias…' },
      { ref: 'Alma 34:38', text: '…no descuidéis el día de vuestra preparación…' },
      { ref: 'Doctrina y Convenios 42:44-45', text: '…sostenéis y aliviais…' },
    ],
    sections: [
      {
        id: 'purpose',
        title: 'Propósito divino',
        handbookRef:
          'Manual General, cap. 9 — propósito de la Sociedad de Socorro ligado a la obra de salvación y exaltación y al fortalecimiento del hogar.',
        doctrine:
          'La Sociedad de Socorro ayuda a las hijas de Dios a prepararse para la vida eterna mediante la fe en Jesucristo, el fortalecimiento del hogar y el servicio a los demás. Cristo es el fundamento: Su expiación, Su evangelio y Su ejemplo orientan cada propósito de la organización.',
        scriptures: [
          { ref: 'Moroni 10:32', text: '…venid a Cristo, y sed perfeccionados en él…' },
          { ref: '2 Nefi 31:20', text: '…sostenida con fe… y con perseverancia…' },
        ],
        explanation:
          'No es solo un grupo auxiliar “para mujeres”. Es una hermandad restaurada con comisión divina: edificar en testimonio y conocimiento, cuidar a las necesitadas, fortalecer la unidad y el carácter, y colaborar con el sacerdocio en la obra del Señor.',
        deepen:
          'Cuando el Manual General habla de propósito, apunta a conversión duradera, no a actividades aisladas. La reunión semanal, el servicio y la amistad tienen sentido si nos acercan al Salvador y nos hacen más capaces de bendecir hogares y personas reales.\n\nPregúntate con honestidad si tus esfuerzos en la Iglesia te están ayudando a confiar más en Cristo, a arrepentirte con gozo y a servir con mayor sensibilidad espiritual.',
        keyPoints: [
          'El propósito de la Sociedad de Socorro se mide por fe en Cristo, hogar y caridad, no por perfeccionismo social.',
          'La presidencia y las maestras trabajan con las llaves que el Señor ha confiado a los líderes del sacerdocio; la colaboración no es competencia.',
          'La hermandad debe ser refugio donde se enseña doctrina con claridad y se cuida a la “una” (Doctrina y Convenios 18:10), no escenario de comparación.',
        ],
        example:
          'Una hermana que dedica pocos minutos diarios a leer el Libro de Mormón y a orar con sencillez nota que sus hijos la oyen hablar del Salvador con naturalidad. Sin dar una clase formal, está cumpliendo el propósito de fortalecer el hogar y su propia conversión.',
        application: [
          '¿Qué evidencia concreta tengo de que estoy creciendo en Cristo y no solo “asistiendo”?',
          '¿Mi hogar refleja fe, arrepentimiento y caridad, aunque sea en pasos pequeños?',
          '¿Cómo puedo alinear mis metas personales con el propósito declarado de la organización?',
        ],
        action:
          'Aparta al menos 10 minutos diarios, durante cinco días esta semana, para estudio personal del Evangelio en casa (Escrituras o el programa «Ven, sígueme») y anota una frase que te lleve a Cristo.',
      },
      {
        id: 'ministering',
        title: 'Ministrar como Cristo',
        handbookRef:
          'Manual General — ministración de miembros y cuidado pastoral en el marco de la obra local (coordina con obispado y organizaciones).',
        doctrine:
          'Ministrar es cuidar a otros como lo haría Jesucristo: con amor sincero, intención y revelación. El Salvador vio personas, no solo problemas; escuchó, sanó, perdonó y dio pasos prácticos guiado por el Padre.',
        scriptures: [
          { ref: 'Juan 13:34-35', text: '…como yo os he amado…' },
          { ref: 'Mosíah 18:9', text: '…soportar los afligidos… y confortar a los necesitados…' },
        ],
        explanation:
          'La ministración no es una lista de visitas para tachar. Es un pacto de atención: conocer nombres, circunstancias y corazones dentro de límites sanos de confidencialidad y respeto. A veces el servicio es una comida, otras una oración en el umbral, otras un silencio compasivo.',
        deepen:
          'Cristo ministró según lo que el Padre le mostraba (Juan 5:19). Tú también puedes pedir: “¿Qué necesita esta hermana hoy?” La revelación suele llegar mientras sirves con intención, no mientras pospones el contacto.\n\nEvita el “modo informe”: la ministración auténtica rara vez luce impresionante en papel, pero puede ser sagrada para quien la recibe.',
        keyPoints: [
          'La consistencia humilde vence al heroísmo esporádico: pequeños contactos frecuentes edifican confianza.',
          'Coordina con el obispado cuando hay necesidad de ordenanzas, asistencia temporal o protección; no cargues sola lo que es labor del rebaño.',
          'La frontera entre cariño y chisme es la discreción; ministrar es proteger la dignidad de la otra persona.',
        ],
        example:
          'Una hermana nota que su compañera de ministración ha estado callada en las reuniones. En lugar de enviar un mensaje genérico, la llama y escucha veinte minutos sin dar sermón. Al final ora brevemente por ella. Esa tarde, la otra hermana siente que alguien “vio” su carga.',
        application: [
          '¿Puedo nombrar algo específico (no solo el barrio) sobre la vida de cada hermana a la que ministro?',
          '¿Mis contactos reflejan amor de Cristo o cumplimiento de tarea?',
          '¿A quién debo acercarme esta semana con más intención y menos prisa?',
        ],
        action:
          'Comunícate con una hermana asignada sin agenda de enseñanza: solo para escuchar y orar. Si corresponde, lleva un gesto sencillo de servicio (comida, paseo, ayuda práctica).',
      },
      {
        id: 'covenants',
        title: 'Convenios y discipulado',
        handbookRef:
          'Manual General y recursos del templo — la vida en convenio orienta identidad, enseñanza y servicio en la Sociedad de Socorro.',
        doctrine:
          'Las hermanas guardan convenios sagrados —bautismo, Espíritu Santo, sacerdocio donde corresponda, investiduras y sellamientos en el templo— que las acercan a Dios y definen su identidad como discípulas de Jesucristo.',
        scriptures: [
          { ref: 'Mosíah 18:8-10', text: '…entrar en el convenio…' },
          { ref: 'Doctrina y Convenios 64:10-11', text: '…el que perdona…' },
        ],
        explanation:
          'Los convenios no son adornos simbólicos: son obligaciones sagradas aceptadas ante Dios. Honrarlos implica decisiones sobre tiempo, palabras, finanzas, pureza y prioridades cuando nadie está mirando.',
        deepen:
          'La discipulado femenino en la Iglesia no es un estilo de vida estético; es rendición diaria al Señor Jesucristo. El templo no es “capítulo aparte”: es donde recibes poder para cumplir lo que prometiste en las aguas del bautismo.\n\nCuando enseñes, deja entrever que los convenios son el “cómo” de la vida cristiana, no solo el “qué” doctrinal.',
        keyPoints: [
          'Arrepentimiento continuo es parte del convenio, no señal de fracaso.',
          'La Santa Cena renueva pactos; acudir con preparación refuerza la memoria del Salvador.',
          'Las promesas del templo requieren paciencia y obediencia en lo pequeño del día a día.',
        ],
        example:
          'Antes de aceptar un compromiso adicional en la Iglesia, una hermana ora y revisa si esa carga le permitirá honrar su tiempo familiar y su asistencia al templo. Dice “no” a una buena idea para poder decir “sí” a lo que el Señor le ha pedido en convenio.',
        application: [
          '¿Qué decisión reciente reflejó (o no) mis convenios?',
          '¿Qué aspecto del convenio bautismal necesito fortalecer: fe, arrepentimiento, testimonio?',
          '¿Cómo puedo recordar con respeto las bendiciones del templo en mi semana ocupada?',
        ],
        action:
          'Escribe en tres oraciones una forma concreta en que honrarás mejor tus convenios esta semana (incluye si aplica un hábito espiritual o una conversación necesaria).',
      },
      {
        id: 'home',
        title: 'Fortalecer el hogar',
        handbookRef:
          'Manual General — enfoque centrado en el hogar apoyado por lo que ocurre en la Iglesia; la Sociedad de Socorro refuerza, no sustituye, a las familias.',
        doctrine:
          'El hogar es el centro del aprendizaje del Evangelio: allí se aprende a amar, perdonar, trabajar, orar y seguir al Salvador en lo cotidiano. La Iglesia provee doctrina y compañerismo; el hogar es donde la mayoría de las elecciones de lealtad a Cristo se practican.',
        scriptures: [
          { ref: '3 Nefi 17:3', text: '…mirad el esfuerzo que habéis hecho…' },
          { ref: 'Doctrina y Convenios 88:119', text: '…organizada según el mandamiento del Señor…' },
        ],
        explanation:
          'Las reuniones de Sociedad de Socorro pueden inspirar estudio en el hogar, pero la conversión profunda ocurre entre semana: mesas, habitaciones, mensajes de texto familiares, arrepentimiento y risas compartidas bajo la influencia del Espíritu.',
        deepen:
          'No idealices una “familia perfecta” para desanimarte. Fortalecer el hogar incluye hogares de una persona, matrimonios sin hijos, familias monoparentales y etapas vacías. En cada caso, la pregunta es: ¿hay espacio para Cristo en la conversación, el calendario y el presupuesto?\n\nLa Sociedad de Socorro puede ser puente de recursos y amistad sin invadir la presidencia del hogar establecida por el Señor.',
        keyPoints: [
          'Pequeños rituales (oración al salir, escritura compartida, gratitud en la cena) anclan el Evangelio en la memoria afectiva.',
          'La enseñanza en el hogar no compite con los programas; les da sentido.',
          'Pedir perdón en familia es predicar el plan de salvación con el ejemplo.',
        ],
        example:
          'Una madre agotada decide que tres noches a la semana apagarán redes diez minutos antes para leer un versículo y preguntar: “¿Dónde vieron la mano de Dios hoy?”. El cambio no es espectacular, pero el espíritu en casa se suaviza.',
        application: [
          '¿Qué “espíritu” perciben quienes entran a mi hogar: prisa, crítica, paz?',
          '¿Qué práctica espiritual realista puedo sostener con mi familia o conmigo misma esta semana?',
          '¿Cómo puede la Sociedad de Socorro apoyar mi hogar sin reemplazar mi responsabilidad?',
        ],
        action:
          'Establece una práctica espiritual breve en el hogar (oración, un versículo, «Ven, sígueme» en familia o estudio personal visible para los hijos) al menos tres veces esta semana.',
      },
      {
        id: 'selfReliance',
        title: 'Autosuficiencia con propósito',
        handbookRef:
          'Manual General y recursos de autosuficiencia y caridad — preparación personal para servir y recibir ayuda con dignidad.',
        doctrine:
          'Dios desea que Sus hijas crezcan en autosuficiencia espiritual y temporal: fe viva, hábitos de estudio y oración, salud prudente, orden financiero y habilidades que permitan sostener el hogar y servir en la crisis ajena.',
        scriptures: [
          { ref: 'Doctrina y Convenios 38:30', text: '…preparados en todas las cosas…' },
          { ref: 'Proverbios 31:20', text: '…extiende sus manos al menesteroso…' },
        ],
        explanation:
          'Autosuficiencia no es “hacerlo todo sola” ni rechazar ayuda por orgullo. Es la sabiduría de alinear recursos con prioridades del Señor: deberes familiares, servicio y preparación ante imprevistos.',
        deepen:
          'La Iglesia ofrece principios y recursos; la conversión aplica esos principios con misericordia hacia una misma. Pedir ayuda cuando hay necesidad real es humildad, no fracaso; negar ayuda por vergüenza prolongada puede frenar el diseño del Salvador de cargar unos con otros.\n\nLa autosuficiencia espiritual alimenta la temporal: quien ora y estudia suele tomar decisiones más serenas sobre dinero, salud y tiempo.',
        keyPoints: [
          'Un pequeño fondo de emergencia o hábito de ahorro es acto de fe en la provisión del Señor.',
          'Cuidar salud física y mental honra el cuerpo como templo.',
          'Aprender una habilidad útil (empleo, hogar, idioma) amplía tu capacidad de servir.',
        ],
        example:
          'Dos hermanas revisan juntas un presupuesto sencillo y fijan una meta de ahorro mínimo. Una semana después, una de ellas puede comprar medicinas sin angustia cuando su hijo enferma, y la otra tiene margen para llevar comida a una vecina desempleada.',
        application: [
          '¿En qué área (espiritual, física, financiera, emocional) estoy más vulnerable?',
          '¿Dependo demasiado de otros por falta de límites o me cuesta pedir ayuda legítima?',
          '¿Qué paso pequeño y medible puedo dar en los próximos siete días?',
        ],
        action:
          'Elige una meta simple y escríbela: ahorrar una suma simbólica, caminar tres veces, dormir una hora más, completar un módulo de autosuficiencia o pedir orientación pastoral sobre una deuda. Da el primer paso antes del domingo.',
      },
      {
        id: 'leadership',
        title: 'Liderazgo al estilo del Salvador',
        handbookRef:
          'Manual General — llamamientos, presidencias y enseñanza: liderar es servir con revelación, no administrar por ansiedad.',
        doctrine:
          'El liderazgo en la Sociedad de Socorro es servicio inspirado bajo la dirección del obispo y las llaves del sacerdocio. Presidenta, consejeras y maestras guían, enseñan y pastorean por persuasión, longanimidad y amor genuino.',
        scriptures: [
          { ref: 'Doctrina y Convenios 121:41-42', text: '…sin hipocresía…' },
          { ref: 'Lucas 22:26-27', text: '…el mayor entre vosotros… como el que sirve…' },
        ],
        explanation:
          'Una líder eficaz coordina, delega y confía; protege el tiempo de las hermanas, simplifica lo posible y prioriza doctrina y cuidado sobre programas ruidosos. Escucha antes de decidir y reconoce el ministerio de muchas voces en la clase.',
        deepen:
          'Cristo nunca confundió autoridad con aspereza. Cuando una líder busca revelación, el Espíritu suele sugerir ajustes pequeños: quién necesita una visita, qué hermana puede enseñar, qué tema reduce la ansiedad del barrio.\n\nSi sirves sin llamamiento formal, el mismo principio aplica en el compañerismo: influir por ejemplo y caridad, no por control.',
        keyPoints: [
          'La revelación en liderazgo casi siempre llega en forma de nombres, pasos y timing, no solo de “ideas geniales”.',
          'Proteger la dignidad de las hermanas vale más que lucir una actividad perfecta en redes.',
          'La colaboración con el sacerdocio evita duplicar esfuerzos y unifica el cuidado del rebaño.',
        ],
        example:
          'La presidenta nota tensión en una clase. En lugar de imponer un formato, invita a una hermana respetada a compartir su experiencia con un principio doctrinal y reduce la parte administrativa a dos minutos. La reunión gana calidez y las hermanas participan más.',
        application: [
          '¿Estoy “dirigiendo” por miedo al desorden o sirviendo por amor al rebaño?',
          '¿A quién debo delegar o pedir opinión esta semana?',
          '¿Qué decisión reciente fue más humana y cristiana, y cuál fue más reactiva?',
        ],
        action:
          'Ora por nombre por alguien a quien sirves (o a quien deberías acercarte) y actúa en las próximas 48 horas según la impresión —un mensaje, una visita breve, una tarea delegada o una conversación humilde de corrección.',
      },
    ],
  },
  'org-aa-1': {
    intro:
      'Los cuórums del Sacerdocio Aarónico ayudan a los jóvenes a hacer y honrar convenios y a acercarse a Cristo.',
    officialLinks: hbLink('cap. 10 — Sacerdocio Aarónico'),
    objectivesHeading: H.objectives,
    objectives: [
      'Conectar actividades y clases con el lema y propósito del Manual General.',
      'Implicar a padres y líderes jóvenes según corresponda.',
    ],
    briefHeading: H.brief,
    briefBody:
      'La enseñanza debe ser breve, clara y digna del Espíritu. Los asesores trabajan en equipo con la presidencia del cuórum.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Doctrina y Convenios 13', text: '…llaves del ministerio de ángeles…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Los jóvenes aprenden más cuando participan que cuando solo escuchan charlas largas.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Leé el cap. 10: propósito y organización.',
      'Prepará una pregunta que un joven podría responder con su experiencia.',
      'Definí un rol concreto para un líder del cuórum en la clase.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Qué señal doy de que valoro la voz de los jóvenes?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Coordiná con la presidencia una participación juvenil en la próxima reunión.',
  },
  'org-yw-1': {
    intro:
      'Mujeres Jóvenes fortalece la fe en Cristo, el servicio y la preparación para la Sociedad de Socorro y el templo.',
    officialLinks: hbLink('cap. 11 — Mujeres Jóvenes'),
    objectivesHeading: H.objectives,
    objectives: [
      'Alinear lecciones con el propósito del Manual General.',
      'Proteger la dignidad y la participación equilibrada de cada joven.',
    ],
    briefHeading: H.brief,
    briefBody:
      'Las clases deben sentirse seguras. Los líderes adultos modelan respeto y confidencialidad apropiada.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: '1 Timoteo 4:12', text: '…ejemplo de los creyentes…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Preguntas abiertas funcionan mejor que sermones cuando hay dudas sensibles.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Revisá el cap. 11: propósito y participación en la obra de salvación.',
      'Planificá un cierre que invite a la acción en el hogar.',
      'Consultá normas locales de protección y dos adultos presentes cuando aplique.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Qué joven necesita que le escuchemos más y hablemos menos?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Incluí un espacio de participación juvenil real en tu plan.',
  },
  'org-pr-1': {
    intro:
      'Primaria enseña doctrina sencilla con gozo; está centrada en el hogar y apoyada por la Iglesia.',
    officialLinks: hbLink('cap. 12 — Primaria'),
    objectivesHeading: H.objectives,
    objectives: [
      'Preparar lecciones cortas con movimiento, música y testimonio apropiados.',
      'Involucrar a los padres con recursos o retos sencillos.',
    ],
    briefHeading: H.brief,
    briefBody:
      'El Manual General describe edades, tiempo para cantar y seguridad. La reverencia se enseña con paciencia, no con gritos.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Mateo 19:14', text: '…dejad a los niños venir a mí…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Un objeto o ilustración simple ancla la doctrina en la memoria de un niño.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Leé el cap. 12: propósitos y tiempo para cantar.',
      'Elegí un método visual para tu próximo principio doctrinal.',
      'Prepará una oración o testimonio breve que los niños puedan repetir con sus palabras.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Cómo honro la atención limitada de los niños?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Enviá a los padres una invitación de 2 líneas para repasar en casa.',
  },
  'org-ss-1': {
    intro:
      'Escuela Dominical fortalece la conversión por estudio de las Escrituras y la enseñanza del Espíritu.',
    officialLinks: hbLink('cap. 13 — Escuela Dominical'),
    objectivesHeading: H.objectives,
    objectives: [
      'Explicar cómo la Escuela Dominical apoya el estudio en el hogar.',
      'Diseñar preguntas que abran las Escrituras, no solo el manual impreso.',
    ],
    briefHeading: H.brief,
    briefBody:
      'El Manual General enfatiza discusión respetuosa y mejora continua de la enseñanza. Los maestros coordinan con la presidencia del barrio.',
    scripturesHeading: H.scriptures,
    scriptures: [
      {
        ref: 'Doctrina y Convenios 88:118',
        text: '…buscad diligentemente y enseñad unos a otros palabras de sabiduría…',
      },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['El “Ven, sígueme” del individuo es la base; la clase es catalizador, no reemplazo.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Leé el cap. 13: propósito y responsabilidades.',
      'Escribí cinco preguntas basadas en versículos, no solo en comentarios.',
      'Programá un seguimiento en el hogar (lectura, aplicación).',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['¿Qué hábito de estudio personal modelo mis alumnos adultos?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Transformá un bloque de charla en estudio de versículos en parejas.',
  },
};
