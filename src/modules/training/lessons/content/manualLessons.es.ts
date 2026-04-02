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
    layout: 'structured',
    intro:
      'Aprende el propósito del sacerdocio y cómo los hombres pueden servir como discípulos de Jesucristo en sus hogares y comunidades.',
    overview:
      'Esta lección ayuda a entender con claridad doctrinal el propósito del Cuórum de Élderes según el Manual General (cap. 8): formar discípulos que ministren, fortalezcan el hogar, sirvan con caridad y preparen a otros para las ordenanzas del templo.\n\nCada sección termina con una invitación práctica para vivir el sacerdocio como servicio cristiano esta misma semana.',
    officialLinks: [
      ...hbLink('cap. 8 — Cuórum de élderes'),
      { label: 'Enseñar a la manera del Salvador (manual 2022)', url: URL_TSW_ES },
    ],
    sections: [
      {
        id: 'priesthood',
        title: 'El sacerdocio',
        handbookRef:
          'Manual General, cap. 8 — el Cuórum de Élderes ayuda a los hombres a usar el sacerdocio para bendecir personas y familias.',
        doctrine:
          'El sacerdocio es la autoridad y el poder de Dios delegados al hombre para actuar en Su nombre para la salvación de Sus hijos.',
        explanation:
          'No es un privilegio personal, sino una responsabilidad sagrada para servir, bendecir y guiar.',
        example:
          'Un hombre digno usa el sacerdocio para bendecir a su familia, no para elevarse sobre otros.',
        application: [
          '¿Uso el sacerdocio para servir o solo como un título?',
          '¿Estoy viviendo de manera digna de esa autoridad?',
        ],
        action:
          'Ora esta semana para entender mejor cómo usar el sacerdocio para bendecir a alguien.',
      },
      {
        id: 'ministering',
        title: 'Ministrar como discípulos',
        handbookRef:
          'Manual General, cap. 8 — la ministración es una asignación central del Cuórum de Élderes y se realiza con amor y revelación.',
        doctrine:
          'Los poseedores del sacerdocio tienen la responsabilidad de ministrar como Jesucristo: con amor, servicio y revelación.',
        explanation: 'Ministrar no es una tarea, es una forma de vivir el discipulado.',
        example: 'Un mensaje o visita sincera puede cambiar la vida de alguien.',
        application: [
          '¿Conozco las necesidades reales de las familias a las que ministro?',
          '¿Estoy presente en sus vidas?',
        ],
        action:
          'Contacta a una familia o hermano esta semana sin agenda, solo para servir.',
      },
      {
        id: 'home',
        title: 'Fortalecer el hogar',
        handbookRef:
          'Manual General, cap. 8 — el liderazgo del sacerdocio fortalece la fe en el hogar y apoya la adoración centrada en Cristo.',
        doctrine:
          'Los hombres del sacerdocio tienen la responsabilidad de fortalecer sus hogares como centros de fe.',
        explanation: 'El liderazgo espiritual comienza en casa.',
        example:
          'Un padre que ora y estudia las Escrituras con su familia crea un ambiente espiritual duradero.',
        application: [
          '¿Estoy guiando espiritualmente mi hogar?',
          '¿Qué puedo mejorar hoy?',
        ],
        action: 'Dirige una oración o estudio familiar esta semana.',
      },
      {
        id: 'service',
        title: 'Servicio y autosuficiencia',
        handbookRef:
          'Manual General, cap. 8 — el cuórum ayuda a cuidar a los necesitados y promueve la autosuficiencia temporal y espiritual.',
        doctrine:
          'El sacerdocio se ejerce sirviendo y ayudando a otros a ser autosuficientes.',
        explanation: 'Servir es parte central del discipulado.',
        example:
          'Ayudar a alguien a encontrar trabajo o resolver una necesidad es parte del Evangelio.',
        application: [
          '¿Estoy dispuesto a servir sin reconocimiento?',
          '¿A quién puedo ayudar esta semana?',
        ],
        action: 'Haz un acto de servicio concreto esta semana.',
      },
      {
        id: 'temple',
        title: 'Preparación espiritual',
        handbookRef:
          'Manual General, cap. 8 — los líderes y miembros del cuórum ayudan a preparar a las personas para convenios y ordenanzas del templo.',
        doctrine:
          'Los hombres del sacerdocio ayudan a preparar a otros para recibir las ordenanzas del templo.',
        explanation:
          'El templo es el objetivo central del camino del Evangelio.',
        example:
          'Un líder ayuda a otros a progresar espiritualmente hacia el templo.',
        application: [
          '¿Estoy avanzando hacia el templo?',
          '¿Estoy ayudando a otros a hacerlo?',
        ],
        action: 'Haz un plan personal para acercarte más al templo.',
      },
    ],
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
    layout: 'structured',
    intro:
      'Aprende cómo la organización de Mujeres Jóvenes ayuda a las jóvenes a venir a Cristo, guardar convenios, servir a los demás y participar en la obra de Dios.',
    overview:
      'Esta lección fortalece el propósito doctrinal de Mujeres Jóvenes según el Manual General (cap. 11): ayudar a las jóvenes a hacer y guardar convenios sagrados, profundizar su conversión a Jesucristo, y participar en la obra de salvación y exaltación.\n\nCada sección incluye doctrina, explicación, ejemplo, aplicación y una acción concreta para vivir el discipulado durante la semana.',
    officialLinks: [
      ...hbLink('cap. 11 — Mujeres Jóvenes'),
      { label: 'Enseñar a la manera del Salvador (manual 2022)', url: URL_TSW_ES },
    ],
    sections: [
      {
        id: 'identity-and-purpose',
        title: 'Identidad divina y propósito',
        handbookRef:
          'Manual General, cap. 11 — Mujeres Jóvenes ayuda a las jóvenes a hacer y guardar convenios y a profundizar su conversión a Jesucristo.',
        doctrine:
          'La organización de Mujeres Jóvenes ayuda a las jóvenes a hacer y guardar convenios sagrados y a profundizar su conversión a Jesucristo y Su Evangelio.',
        explanation:
          'Mujeres Jóvenes no es solo una clase dominical ni una actividad social. Es una parte sagrada de la obra del Señor para ayudar a cada joven a recordar quién es, venir a Cristo y prepararse para una vida de discipulado fiel.',
        example:
          'Una joven que entiende su identidad divina no basa su valor en la aprobación del mundo. Toma decisiones diferentes porque sabe a quién pertenece y en quién confía.',
        application: [
          '¿Mi identidad está basada en Jesucristo o en la opinión de los demás?',
          '¿Estoy creciendo en conversión o solo participando por costumbre?',
          '¿Qué decisiones muestran que sé quién soy delante de Dios?',
        ],
        action:
          'Escribe esta semana una verdad sobre tu identidad como hija de Dios y léela cada mañana en oración.',
        prompts: {
          home: '¿Cómo puede tu hogar recordarte más claramente tu identidad divina?',
          service: '¿Hay otra joven que necesite que la ayudes a recordar su valor delante de Dios?',
          council:
            '¿Qué puede hacer una clase de Mujeres Jóvenes para ayudar a todas a sentirse vistas, amadas y espiritualmente fuertes?',
        },
      },
      {
        id: 'covenants-and-conversion',
        title: 'Convenios y conversión',
        handbookRef:
          'Manual General, cap. 11 — las jóvenes son fortalecidas al guardar convenios y profundizar su conversión diaria a Jesucristo.',
        doctrine:
          'Las jóvenes son fortalecidas al hacer y guardar convenios sagrados, y al profundizar diariamente su conversión a Jesucristo.',
        explanation:
          'Los convenios no son una formalidad religiosa. Son una relación real con Dios. Guardarlos cambia la forma en que una joven piensa, habla, se viste, se arrepiente, sirve y responde a la tentación.',
        example:
          'Una joven que toma en serio sus convenios puede decidir apartarse de algo popular pero espiritualmente dañino, porque su lealtad a Cristo pesa más que la presión del momento.',
        application: [
          '¿Estoy tratando mis convenios como algo sagrado o como algo lejano?',
          '¿Qué hábito me acerca más a Jesucristo?',
          '¿Qué cosa debo cambiar para vivir con mayor integridad espiritual?',
        ],
        action:
          'Escoge una forma concreta de honrar mejor tus convenios esta semana y anótala en tu reflexión personal.',
        prompts: {
          home: '¿Qué práctica en casa podría ayudarte a recordar más seguido tus convenios?',
          service: '¿Cómo puedes apoyar a una amiga para que permanezca firme en lo correcto?',
          council:
            '¿Qué conversaciones deberían tenerse más en la clase para fortalecer la conversión real, no solo la participación externa?',
        },
      },
      {
        id: 'work-of-salvation',
        title: 'Participar en la obra de Dios',
        handbookRef:
          'Manual General, cap. 11 — las jóvenes participan en la obra de salvación y exaltación: vivir el Evangelio, cuidar al necesitado, invitar a todos y unir familias.',
        doctrine:
          'El propósito de una clase de Mujeres Jóvenes es ayudar a las jóvenes a trabajar juntas para participar en la obra de Dios de salvación y exaltación.',
        explanation:
          'Eso incluye vivir el Evangelio, cuidar de los necesitados, invitar a todos a recibir el Evangelio y ayudar a unir a las familias por la eternidad. Las jóvenes no son espectadoras de la obra; son parte activa de ella.',
        example:
          'Una joven participa en la obra de Dios cuando fortalece a una amiga, comparte su testimonio, ayuda a alguien necesitado o apoya la obra del templo e historia familiar.',
        application: [
          '¿Estoy participando activamente en la obra de Dios o solo asistiendo a reuniones?',
          '¿A quién puedo fortalecer espiritualmente esta semana?',
          '¿Cómo puedo apoyar mejor la obra del Señor en mi barrio y en mi hogar?',
        ],
        action:
          'Haz esta semana una acción concreta en la obra de Dios: servir, invitar, compartir o ayudar a alguien espiritualmente.',
        prompts: {
          home: '¿Cómo puede tu familia participar más unida en la obra del Señor?',
          service: '¿Quién necesita alivio, ánimo o ayuda práctica en este momento?',
          council: '¿Qué proyecto simple podría hacer tu clase para bendecir a alguien de manera real?',
        },
      },
      {
        id: 'unity-and-class',
        title: 'Unidad y vida en la clase',
        handbookRef:
          'Manual General, cap. 11 — en clase, las jóvenes sirven, cumplen responsabilidades del convenio, cultivan unidad y aprenden y viven doctrina.',
        doctrine:
          'En sus clases, las mujeres jóvenes prestan servicio a los demás, cumplen con las responsabilidades que adquirieron con sus convenios, cultivan la unidad, y aprenden y viven la doctrina.',
        explanation:
          'La clase no debe ser un grupo pasivo donde unas pocas hablan y el resto mira. Debe ser una hermandad espiritual donde las jóvenes se fortalezcan unas a otras, deliberen juntas, sirvan juntas y crezcan juntas en Cristo.',
        example:
          'Cuando una clase recibe con amor a una joven tímida o menos activa, la unidad deja de ser una palabra bonita y se vuelve discipulado real.',
        application: [
          '¿Contribuyo a la unidad de mi clase o me aíslo?',
          '¿Hay alguna joven que necesite sentirse incluida y amada?',
          '¿Estoy aprendiendo doctrina para vivirla o solo para escucharla?',
        ],
        action:
          'Busca esta semana a una joven de tu clase que necesite amistad, inclusión o ánimo, y da el primer paso.',
        prompts: {
          home: '¿Cómo puedes llevar el espíritu de unidad de la clase a tu casa?',
          service: '¿A quién podrías incluir, consolar o fortalecer esta semana?',
          council: '¿Qué hábitos de la clase ayudan a la unidad y cuáles la debilitan?',
        },
      },
      {
        id: 'leadership-and-revelation',
        title: 'Liderazgo juvenil inspirado',
        handbookRef:
          'Manual General, cap. 11 — las presidencias de clase aprenden a liderar bajo revelación, deliberar en consejo y bendecir a otras jóvenes.',
        doctrine:
          'Las jóvenes pueden liderar y servir bajo dirección inspirada, aprendiendo a recibir revelación, deliberar en consejo y bendecir a otras personas.',
        explanation:
          'En Mujeres Jóvenes, el liderazgo no es fama ni control. Es aprender a escuchar al Espíritu, pensar en otras personas y actuar con fe. Las presidencias de clase no existen para adornar una lista; existen para ayudar a cuidar a las jóvenes y fortalecer la obra.',
        example:
          'Una presidenta de clase que ora por las necesidades de sus compañeras y propone una actividad con propósito está aprendiendo liderazgo celestial, no solo organización humana.',
        application: [
          '¿Veo el liderazgo como servicio o como posición?',
          '¿Busco inspiración antes de actuar?',
          '¿Cómo puedo bendecir mejor a las demás jóvenes de mi clase?',
        ],
        action:
          'Ora por una persona específica de tu clase esta semana y actúa según la impresión que recibas.',
        prompts: {
          home: '¿Dónde puedes practicar liderazgo cristiano dentro de tu hogar?',
          service: '¿Qué necesidad de otra joven podrías notar mejor si oras por ella?',
          council:
            '¿Cómo puede una presidencia de clase escuchar mejor a todas, no solo a las más visibles?',
        },
      },
      {
        id: 'ministering-and-compassion',
        title: 'Servicio, compasión y ministración',
        handbookRef:
          'Manual General, cap. 11 — las jóvenes siguen a Jesucristo al servir con compasión; desde los 14 años pueden servir como compañeras de ministración cuando corresponda.',
        doctrine:
          'Las jóvenes siguen a Jesucristo cuando sirven con compasión, alivian cargas y ayudan a cuidar a los hijos de Dios.',
        explanation:
          'Aunque la ministración formal está organizada de maneras específicas, toda joven discípula puede aprender desde ahora a notar necesidades, responder con amor y servir con pureza de intención. Además, una joven puede servir como compañera de ministración de una hermana de la Sociedad de Socorro desde el año en que cumple 14, si está dispuesta y preparada.',
        example:
          'A veces una joven no resuelve el problema completo de alguien, pero su mensaje, visita o acto de amor cambia por completo el día de esa persona.',
        application: [
          '¿Estoy pendiente de las necesidades de los demás o muy enfocada en mí misma?',
          '¿Qué persona necesita hoy compasión real?',
          '¿Estoy dispuesta a servir incluso cuando nadie me lo aplauda?',
        ],
        action:
          'Haz esta semana un acto silencioso de compasión por alguien que necesite ánimo, ayuda o consuelo.',
        prompts: {
          home: '¿Quién en tu casa necesita más paciencia, amor o ayuda práctica?',
          service: '¿A quién puedes ministrar con más intención esta semana?',
          council: '¿Cómo puede la clase llegar a ser más sensible a quienes están luchando?',
        },
      },
      {
        id: 'future-discipleship',
        title: 'Preparación para una vida de discipulado',
        handbookRef:
          'Manual General, cap. 11 — Mujeres Jóvenes prepara a cada joven para una vida de fidelidad, convenios, servicio y participación en la Iglesia.',
        doctrine:
          'La experiencia en Mujeres Jóvenes debe preparar a cada joven para una vida entera de fidelidad, servicio, convenios, hogar centrado en Cristo y participación en la Iglesia.',
        explanation:
          'La meta no es solo pasar bien la adolescencia. La meta es formar discípulas de Jesucristo para toda la vida: mujeres firmes, sabias, compasivas, valientes y espiritualmente preparadas.',
        example:
          'Una joven que aprende ahora a orar, estudiar, servir, guardar convenios y actuar con fe llegará más preparada a las decisiones grandes de su vida.',
        application: [
          '¿Qué clase de discípula estoy llegando a ser?',
          '¿Qué hábitos me están preparando para el futuro y cuáles me están debilitando?',
          '¿Estoy construyendo una base espiritual que dure toda la vida?',
        ],
        action:
          'Elige un hábito espiritual para fortalecer durante los próximos 7 días: oración, Escrituras, templo, servicio o diario espiritual.',
        prompts: {
          home: '¿Qué costumbre del hogar podría ayudarte a ser una discípula más constante?',
          service: '¿Cómo puede tu crecimiento espiritual bendecir a otras personas desde ahora?',
          council:
            '¿Qué debería enseñar una clase de Mujeres Jóvenes para preparar mejor a las jóvenes para la vida real?',
        },
      },
    ],
  },
  'org-pr-1': {
    layout: 'structured',
    promptVariant: 'primary',
    intro:
      'Aprende cómo la Primaria ayuda a los niños a sentir el amor de Dios, aprender el Evangelio, prepararse para los convenios y seguir a Jesucristo.',
    overview:
      'La Primaria no es una clase de adultos con dibujos. Según el Manual General (cap. 12), ayuda a los niños a conocer el amor del Padre Celestial, a Jesucristo, el Evangelio, el Espíritu Santo, el camino de convenios y la obra de Dios — con enseñanza sencilla, cálida y memorable.\n\nEl capítulo también orienta sobre preparación para el bautismo y la confirmación; piensa en niñez y camino de convenios, no solo en «portarse bien».',
    officialLinks: [
      ...hbLink('cap. 12 — Primaria'),
      { label: 'Enseñar a la manera del Salvador (manual 2022)', url: URL_TSW_ES },
    ],
    sections: [
      {
        id: 'heavenly-father-love',
        title: 'Dios me ama',
        handbookRef: 'Manual General, cap. 12 — sentir el amor del Padre Celestial y Su plan de felicidad.',
        doctrine:
          'La Primaria ayuda a los niños a sentir el amor de su Padre Celestial y a aprender acerca de Su plan de felicidad.',
        explanation:
          'Dios es tu Padre Celestial. Él te conoce, te ama y desea ayudarte. No estás solo. Su plan fue hecho para bendecirte y ayudarte a volver a Él.',
        example:
          'Un niño puede sentir el amor de Dios cuando ora, cuando escucha una canción de la Iglesia o cuando siente paz al hacer lo correcto.',
        application: [
          '¿Recuerdo que soy hijo o hija de Dios?',
          '¿Cuándo he sentido paz o amor de Dios?',
          '¿Qué puedo hacer para acercarme más a Él?',
        ],
        action: 'Esta semana, haz una oración sincera cada día y da gracias por una bendición.',
        prompts: {
          home: '¿Qué puede hacer tu familia para recordar más seguido que Dios los ama?',
          service: '¿Cómo puedes demostrar amor a alguien en casa esta semana?',
          leadersOrParents:
            '¿Qué ayuda más a un niño a sentir el amor de Dios: una clase larga o un momento espiritual claro y sencillo?',
        },
      },
      {
        id: 'learn-of-christ',
        title: 'Jesucristo es mi Salvador',
        handbookRef: 'Manual General, cap. 12 — aprender acerca de Jesucristo y Su función en el plan del Padre.',
        doctrine:
          'La Primaria ayuda a los niños a aprender acerca de Jesucristo y Su función en el plan del Padre Celestial.',
        explanation:
          'Jesucristo nos ama, nos enseña el camino y nos ayuda a arrepentirnos y volver al Padre Celestial. Él es nuestro Salvador y nuestro ejemplo perfecto.',
        example:
          'Cuando un niño decide decir la verdad, pedir perdón o ser amable, está tratando de seguir a Jesucristo.',
        application: [
          '¿Qué hizo Jesús que yo puedo imitar?',
          '¿Cómo puedo parecerme más a Él?',
          '¿Qué haría Jesús si estuviera conmigo hoy?',
        ],
        action:
          'Elige una cosa esta semana para parecerte más a Jesús: decir la verdad, compartir, obedecer o ayudar.',
        prompts: {
          home: '¿Qué historia de Jesucristo podrían leer juntos en familia esta semana?',
          service: '¿A quién podrías ayudar como lo haría Jesús?',
          leadersOrParents: '¿Cómo puede una clase de Primaria enseñar más claramente quién es Jesucristo?',
        },
      },
      {
        id: 'live-the-gospel',
        title: 'Puedo vivir el Evangelio',
        handbookRef: 'Manual General, cap. 12 — aprender y vivir el Evangelio de Jesucristo.',
        doctrine: 'La Primaria ayuda a los niños a aprender y vivir el Evangelio de Jesucristo.',
        explanation:
          'El Evangelio no es solo algo que escuchamos en la Iglesia. También es algo que vivimos en casa, en la escuela y con nuestros amigos.',
        example:
          'Un niño vive el Evangelio cuando obedece, comparte, perdona, es reverente o escoge lo correcto aunque sea difícil.',
        application: [
          '¿Estoy escogiendo lo correcto?',
          '¿Cómo trato a mi familia y a mis amigos?',
          '¿Qué puedo mejorar esta semana?',
        ],
        action: 'Haz esta semana una cosa buena sin que nadie te lo tenga que pedir.',
        prompts: {
          home: '¿Qué pequeña costumbre puede ayudar a tu familia a vivir mejor el Evangelio?',
          service: '¿Quién necesita tu ayuda o tu bondad hoy?',
          leadersOrParents: '¿Cómo se puede enseñar el Evangelio a los niños de manera sencilla y real?',
        },
      },
      {
        id: 'holy-ghost',
        title: 'El Espíritu Santo me puede ayudar',
        handbookRef:
          'Manual General, cap. 12 — sentir y reconocer la influencia del Espíritu Santo y actuar según ella.',
        doctrine:
          'La Primaria ayuda a los niños a sentir y reconocer la influencia del Espíritu Santo y a actuar de conformidad con ella.',
        explanation:
          'El Espíritu Santo puede traer paz, consuelo, advertencia y guía. A veces habla a nuestro corazón con sentimientos tranquilos y buenos.',
        example:
          'Un niño puede sentir que debe pedir perdón, ser amable o dejar de hacer algo incorrecto. Esa puede ser una ayuda del Espíritu.',
        application: [
          '¿He sentido paz cuando hago lo correcto?',
          '¿Escucho sentimientos buenos y tranquilos?',
          '¿Qué hago cuando siento que debo actuar bien?',
        ],
        action: 'Esta semana, cuando sientas un buen deseo de hacer algo correcto, hazlo rápido.',
        prompts: {
          home: '¿Qué cosas en casa ayudan a sentir más el Espíritu?',
          service: '¿Cómo puede el Espíritu ayudarte a notar a alguien triste o solo?',
          leadersOrParents:
            '¿Cómo se enseña a un niño sobre el Espíritu sin volverlo confuso o místico?',
        },
      },
      {
        id: 'covenant-path',
        title: 'Me preparo para los convenios',
        handbookRef:
          'Manual General, cap. 12 — prepararse para convenios sagrados, hacerlos y cumplirlos (incluye orientación sobre preparación para el bautismo y la confirmación).',
        doctrine:
          'La Primaria ayuda a los niños a prepararse para los convenios sagrados, hacerlos y cumplirlos.',
        explanation:
          'Uno de esos convenios importantes es el bautismo. Cuando una persona se bautiza, promete seguir a Jesucristo. Después, al participar de la Santa Cena, recuerda y renueva ese convenio.',
        example:
          'Un niño que aprende sobre el bautismo, la Santa Cena y el arrepentimiento se está preparando para seguir a Jesús con más seriedad.',
        application: [
          '¿Entiendo por qué el bautismo es importante?',
          '¿Qué significa seguir a Jesucristo?',
          '¿Cómo puedo prepararme mejor para hacer y guardar convenios?',
        ],
        action:
          'Habla esta semana con tus padres o líderes sobre el bautismo, la Santa Cena o los convenios.',
        prompts: {
          home: '¿Qué podrían conversar en familia sobre el bautismo y la Santa Cena?',
          service: '¿Cómo puedes mostrar que quieres seguir a Jesucristo cada día?',
          leadersOrParents:
            '¿Cómo puede una clase de Primaria preparar mejor a los niños para el camino de convenios?',
        },
      },
      {
        id: 'work-of-god',
        title: 'Puedo ayudar en la obra de Dios',
        handbookRef:
          'Manual General, cap. 12 — participar en la obra de Dios de salvación y exaltación.',
        doctrine:
          'La Primaria ayuda a los niños a participar en la obra de Dios de salvación y exaltación.',
        explanation:
          'Los niños también pueden ayudar en la obra del Señor. Pueden amar, invitar, servir, compartir su testimonio y ayudar a otras personas a sentir el amor de Dios.',
        example:
          'Un niño participa en la obra de Dios cuando invita a un amigo, consuela a alguien, comparte una escritura o ayuda con amor en su casa.',
        application: [
          '¿A quién puedo ayudar esta semana?',
          '¿Cómo puedo compartir bondad o fe con alguien?',
          '¿Qué pequeño servicio puedo hacer?',
        ],
        action:
          'Haz esta semana un acto pequeño de servicio por alguien en tu casa, en la Iglesia o en la escuela.',
        prompts: {
          home: '¿Qué servicio pequeño podrían hacer juntos en familia?',
          service: '¿Quién necesita ánimo, ayuda o amistad hoy?',
          leadersOrParents:
            '¿Cómo puede la Primaria enseñar a los niños que ellos también son parte de la obra del Señor?',
        },
      },
    ],
  },
  'org-ss-1': {
    layout: 'structured',
    intro:
      'Aprende cómo estudiar las Escrituras y el Evangelio de Jesucristo de manera que transforme tu vida diaria y fortalezca tu hogar.',
    overview:
      'Según el Manual General (cap. 13), la Escuela Dominical existe para enseñar el Evangelio de Jesucristo, fortalecer la fe en Él, apoyar el aprendizaje centrado en el hogar y ayudar a vivir la doctrina — con las Escrituras y las palabras de los profetas como base.\n\nNo es una clase para acumular datos ni un resumen de “Ven, sígueme”. Es un puente: de la verdad a la vida, del entendimiento a la obediencia, de la clase al hogar.',
    officialLinks: [
      ...hbLink('cap. 13 — Escuela Dominical'),
      { label: 'Enseñar a la manera del Salvador (manual 2022)', url: URL_TSW_ES },
    ],
    sections: [
      {
        id: 'christ-centered-learning',
        title: 'Jesucristo es el centro del aprendizaje',
        handbookRef:
          'Manual General, cap. 13 — enseñar el Evangelio de Jesucristo y fortalecer la fe en Él.',
        doctrine: 'El propósito del aprendizaje del Evangelio es venir a Jesucristo y seguirlo.',
        explanation:
          'Estudiar el Evangelio no es acumular conocimiento. Es cambiar el corazón, fortalecer la fe y acercarse más a Jesucristo.',
        example:
          'Una persona puede conocer muchas historias de las Escrituras, pero solo cambia cuando decide aplicarlas en su vida.',
        application: [
          '¿Estoy aprendiendo sobre Cristo o acercándome a Él?',
          '¿Mi estudio me está cambiando?',
          '¿Estoy aplicando lo que aprendo?',
        ],
        action:
          'Elige una enseñanza de Jesucristo esta semana y aplícala de forma consciente en tu vida diaria.',
        prompts: {
          home: '¿Cómo puedes hacer que Jesucristo sea el centro del estudio en tu hogar?',
          service: '¿Cómo puedes ayudar a alguien a acercarse más a Cristo?',
          council: '¿Qué hace que una clase realmente enseñe a venir a Cristo?',
        },
      },
      {
        id: 'scriptures-and-prophets',
        title: 'Las Escrituras y los profetas',
        handbookRef:
          'Manual General, cap. 13 — el Evangelio se enseña con las Escrituras y las enseñanzas de los profetas vivientes.',
        doctrine:
          'El Evangelio se enseña por medio de las Escrituras y las palabras de los profetas vivientes.',
        explanation:
          'Dios habla a Sus hijos a través de las Escrituras y los profetas. Estudiarlas con intención trae guía, claridad y dirección espiritual.',
        example:
          'Una escritura puede dar respuesta a una duda personal si se estudia con fe y oración.',
        application: [
          '¿Estoy estudiando las Escrituras con intención o por rutina?',
          '¿Busco respuestas reales en ellas?',
          '¿Escucho y aplico a los profetas?',
        ],
        action:
          'Lee un pasaje de las Escrituras esta semana con una pregunta en mente y escribe lo que aprendas.',
        prompts: {
          home: '¿Cómo pueden estudiar las Escrituras en familia de manera más significativa?',
          service: '¿Puedes compartir una escritura con alguien que la necesite?',
          council: '¿Qué hace que el estudio de las Escrituras sea realmente poderoso?',
        },
      },
      {
        id: 'home-centered-learning',
        title: 'Aprendizaje centrado en el hogar',
        handbookRef:
          'Manual General, cap. 13 — el aprendizaje del Evangelio es centrado en el hogar y apoyado por la Iglesia.',
        doctrine: 'El aprendizaje del Evangelio es centrado en el hogar y apoyado por la Iglesia.',
        explanation:
          'La clase dominical no reemplaza el estudio personal o familiar. Es un apoyo. El verdadero crecimiento ocurre en la vida diaria.',
        example:
          'Una familia que estudia junta desarrolla una base espiritual más fuerte que solo asistir a reuniones.',
        application: [
          '¿Estoy estudiando el Evangelio en casa?',
          '¿Mi hogar tiene momentos espirituales?',
          '¿Qué puedo mejorar en mi rutina espiritual?',
        ],
        action: 'Establece un momento fijo esta semana para estudiar el Evangelio en tu hogar.',
        prompts: {
          home: '¿Qué hábito pequeño puede fortalecer el estudio en familia?',
          service: '¿Cómo puedes invitar a alguien a estudiar el Evangelio contigo?',
          council: '¿Cómo puede la Iglesia apoyar mejor el aprendizaje en el hogar?',
        },
      },
      {
        id: 'teach-by-the-spirit',
        title: 'Aprender y enseñar por el Espíritu',
        handbookRef:
          'Manual General, cap. 13 — el Espíritu Santo enseña y confirma la verdad en el aprendizaje del Evangelio.',
        doctrine:
          'El aprendizaje verdadero ocurre cuando el Espíritu Santo enseña y confirma la verdad.',
        explanation:
          'El Espíritu Santo es el maestro principal. Sin Él, el aprendizaje es solo información. Con Él, el aprendizaje cambia vidas.',
        example:
          'Una impresión espiritual durante una clase puede ser más poderosa que toda la lección.',
        application: [
          '¿Estoy buscando sentir el Espíritu al aprender?',
          '¿Preparo mi corazón antes de estudiar?',
          '¿Estoy atento a impresiones espirituales?',
        ],
        action: 'Antes de estudiar esta semana, haz una oración pidiendo aprender por el Espíritu.',
        prompts: {
          home: '¿Qué cosas en tu hogar invitan al Espíritu?',
          service: '¿Cómo puedes ayudar a otros a sentir el Espíritu?',
          council: '¿Qué hace que una clase tenga el Espíritu presente?',
        },
      },
      {
        id: 'live-the-doctrine',
        title: 'Vivir la doctrina',
        handbookRef:
          'Manual General, cap. 13 — el Evangelio transforma la vida; la fe crece al vivir la doctrina.',
        doctrine: 'El propósito del Evangelio es cambiar la vida de las personas, no solo informar.',
        explanation:
          'La doctrina se convierte en poder cuando se vive. La fe crece cuando actuamos.',
        example:
          'Una persona que aplica lo que aprende desarrolla más fe que alguien que solo escucha.',
        application: [
          '¿Estoy viviendo lo que aprendo?',
          '¿Qué principio debo aplicar hoy?',
          '¿Qué debo cambiar en mi vida?',
        ],
        action: 'Elige un principio del Evangelio y ponlo en práctica hoy mismo.',
        prompts: {
          home: '¿Cómo pueden aplicar juntos lo que aprenden como familia?',
          service: '¿Cómo puedes bendecir a alguien aplicando el Evangelio?',
          council: '¿Qué diferencia hay entre aprender doctrina y vivirla?',
        },
      },
      {
        id: 'discussion-and-council',
        title: 'Aprender en consejo y participación',
        handbookRef:
          'Manual General, cap. 13 — discusión respetuosa y participación que fortalece el aprendizaje.',
        doctrine:
          'El aprendizaje del Evangelio se fortalece cuando las personas participan, comparten y aprenden juntas.',
        explanation:
          'Las mejores clases no son monólogos. Son conversaciones guiadas por el Espíritu donde todos pueden aprender.',
        example:
          'Una experiencia o testimonio compartido puede enseñar más que una explicación larga.',
        application: [
          '¿Participo en las clases o solo escucho?',
          '¿Estoy dispuesto a compartir?',
          '¿Respeto y aprendo de otros?',
        ],
        action: 'Comparte una idea o testimonio en tu próxima clase.',
        prompts: {
          home: '¿Cómo pueden tener conversaciones espirituales en casa?',
          service: '¿A quién puedes escuchar con más atención?',
          council: '¿Cómo hacer que todos participen sin presión?',
        },
      },
    ],
  },
  'lead-1': {
    layout: 'structured',
    promptVariant: 'leadership',
    intro:
      'Aprende cómo el liderazgo en la Iglesia se ejerce con revelación, amor, consejo y responsabilidad sagrada para bendecir a las personas y fortalecer la obra del Señor.',
    overview:
      'Esta lección no sustituye al Manual General: orienta el corazón del líder hacia el Salvador, las llaves del sacerdocio, el consejo revelador y el cuidado de almas reales.\n\nEstá pensada para obispados, consejo de barrio, presidencias de organización y quienes se preparan para servir — con tono sobrio y pastoral, no administrativo ni corporativo.',
    officialLinks: [
      ...hbLink('Obispado, consejo de barrio y obra de salvación y exaltación'),
      { label: 'Enseñar a la manera del Salvador (manual 2022)', url: URL_TSW_ES },
    ],
    sections: [
      {
        id: 'christ-centered-leadership',
        title: 'El liderazgo en la Iglesia pertenece a Jesucristo',
        handbookRef:
          'Manual General — Jesucristo dirige Su Iglesia; los líderes sirven en Su nombre con humildad.',
        doctrine:
          'El liderazgo en la Iglesia no se trata de poder personal, sino de servir bajo la dirección de Jesucristo para bendecir a los hijos de Dios.',
        explanation:
          'En la Iglesia, un líder no existe para ser admirado ni para imponer su carácter. Existe para representar al Señor con humildad, cuidar personas reales y ayudar a que la obra de Dios avance de acuerdo con Su voluntad.',
        example:
          'Un líder que escucha con paciencia, ora antes de decidir y piensa primero en el bienestar espiritual de las personas está actuando más como siervo de Cristo que como simple administrador.',
        application: [
          '¿Veo mi llamamiento como servicio o como posición?',
          '¿Mis decisiones reflejan el carácter de Jesucristo?',
          '¿Estoy más enfocado en personas o en quedar bien?',
        ],
        action:
          'Ora esta semana para ver tu llamamiento como una mayordomía sagrada y no como una función rutinaria.',
        prompts: {
          home:
            '¿Cómo puede tu manera de liderar bendecir más claramente a tu familia?',
          service: '¿A quién necesitas servir con más paciencia y compasión?',
          council:
            '¿Qué cambia en un consejo cuando todos recuerdan que Jesucristo es el verdadero líder?',
        },
      },
      {
        id: 'keys-and-stewardship',
        title: 'Llaves, autoridad y mayordomía',
        handbookRef:
          'Manual General — el obispo posee las llaves del sacerdocio para dirigir la obra de la Iglesia en el barrio; cada líder sirve dentro de una mayordomía.',
        doctrine:
          'El obispo posee las llaves del sacerdocio para dirigir la obra de la Iglesia en el barrio, y los líderes sirven dentro de mayordomías específicas para bendecir a las personas.',
        explanation:
          'No todos tienen la misma responsabilidad, pero todos sirven bajo orden divino. Las llaves traen dirección, y la mayordomía trae responsabilidad. Un líder fiel respeta el orden del Señor, evita invadir funciones ajenas y sirve con claridad y reverencia.',
        example:
          'Un líder de organización que coordina con el obispado y actúa dentro de su mayordomía fortalece la unidad; uno que actúa por su cuenta puede crear confusión aunque tenga buenas intenciones.',
        application: [
          '¿Entiendo bien mi mayordomía?',
          '¿Respeto el orden del sacerdocio y la coordinación con otros líderes?',
          '¿Estoy actuando con humildad dentro de los límites de mi llamamiento?',
        ],
        action:
          'Haz una revisión de tu llamamiento y define con claridad qué te corresponde cuidar personalmente esta semana.',
        prompts: {
          home: '¿Qué te enseña el orden del Señor sobre responsabilidad en tu hogar?',
          service: '¿Cómo puedes servir con más claridad sin exceder tu mayordomía?',
          council:
            '¿Qué problemas aparecen cuando los líderes no entienden bien sus responsabilidades?',
        },
      },
      {
        id: 'bishopric-and-care',
        title: 'Cuidar a las personas con amor',
        handbookRef:
          'Manual General — el obispado cuida a los miembros del barrio con amor y los ayuda a ser discípulos verdaderos de Jesucristo.',
        doctrine:
          'El obispado cuida de los miembros del barrio con amor y los ayuda a llegar a ser discípulos verdaderos de Jesucristo.',
        explanation:
          'El liderazgo local no existe para sostener una estructura vacía. Existe para cuidar almas. Eso incluye fortalecer la fe, ayudar en el arrepentimiento, sostener a familias, atender necesidades y acercar a las personas al Salvador.',
        example:
          'Un obispado que conoce a las familias, escucha sus cargas y actúa con amor inspirado ejerce liderazgo real, aunque no haga ruido ni busque reconocimiento.',
        application: [
          '¿Estoy viendo personas o solo tareas?',
          '¿Conozco las necesidades reales de quienes sirvo?',
          '¿Estoy ayudando a otros a venir a Cristo o solo manteniendo funciones?',
        ],
        action:
          'Piensa en una persona o familia específica esta semana, ora por ella y toma una acción concreta para cuidarla mejor.',
        prompts: {
          home: '¿Cómo puedes reflejar ese mismo cuidado en tu propia familia?',
          service: '¿Quién necesita ser escuchado y atendido con más amor?',
          council: '¿Cómo puede un consejo enfocarse más en personas y menos en reportes?',
        },
      },
      {
        id: 'council-and-revelation',
        title: 'Deliberar en consejo con revelación',
        handbookRef:
          'Manual General — los líderes deliberan en consejo para promover fortaleza espiritual y unidad, buscando la guía del Espíritu.',
        doctrine:
          'Los líderes deliberan en consejo para promover la fortaleza espiritual y la unidad, procurando inspiración y participación guiada por el Espíritu.',
        explanation:
          'Un consejo de barrio no debe ser una reunión fría de anuncios. Debe ser un lugar sagrado donde líderes inspirados unen perspectivas, consideran personas y familias, y buscan la voluntad del Señor juntos.',
        example:
          'Cuando un consejo deja de hablar solo de actividades y empieza a hablar de personas específicas, barreras espirituales y cómo ayudar con amor, se vuelve realmente útil.',
        application: [
          '¿Participo en consejo con preparación espiritual?',
          '¿Escucho con humildad o solo espero mi turno para hablar?',
          '¿Estoy ayudando a que el consejo sea revelador o pesado?',
        ],
        action:
          'Llega a tu próxima reunión habiendo orado por una persona o necesidad específica que deba considerarse.',
        prompts: {
          home: '¿Cómo puedes aplicar el principio de deliberar en consejo dentro de tu hogar?',
          service: '¿A quién puede bendecir una mejor reunión de consejo?',
          council: '¿Qué hábitos hacen que un consejo tenga más revelación y menos rutina?',
        },
      },
      {
        id: 'work-of-salvation',
        title: 'Coordinar la obra de salvación y exaltación',
        handbookRef:
          'Manual General — el consejo de barrio ayuda a coordinar la obra de salvación y exaltación en la unidad.',
        doctrine:
          'El consejo de barrio ayuda a coordinar la obra de salvación y exaltación, incluyendo vivir el Evangelio, cuidar de los necesitados, invitar a todos a recibir el Evangelio y unir a las familias por la eternidad.',
        explanation:
          'El liderazgo verdadero no solo reacciona a problemas. También impulsa la obra del Señor de manera ordenada, unida y centrada en convenios. Los líderes deben mirar el barrio completo, sin perder de vista a cada alma.',
        example:
          'Cuando obispado, Sociedad de Socorro, cuórum de élderes y otros líderes coordinan esfuerzos reales en vez de trabajar aislados, el barrio empieza a bendecir mejor a sus miembros.',
        application: [
          '¿Estoy viendo la obra del Señor como un todo o solo mi área?',
          '¿Trabajo unido con otros líderes?',
          '¿Mis esfuerzos ayudan a las personas a avanzar hacia Cristo y Sus ordenanzas?',
        ],
        action:
          'Identifica una forma concreta de coordinar mejor con otro líder esta semana para bendecir a una persona o familia.',
        prompts: {
          home: '¿Cómo puede la obra de salvación empezar de manera más clara en tu hogar?',
          service:
            '¿Qué necesidad del barrio requiere colaboración y no solo esfuerzo individual?',
          council:
            '¿Qué parte de la obra de salvación y exaltación está recibiendo menos atención en este momento?',
        },
      },
      {
        id: 'ministering-and-strengthening',
        title: 'Ministración, conversión y miembros nuevos o que regresan',
        handbookRef:
          'Manual General — el obispado coordina con los presidentes del cuórum de élderes y de la Sociedad de Socorro para compartir el Evangelio y fortalecer a nuevos miembros y a los que regresan.',
        doctrine:
          'El obispado coordina con los presidentes del cuórum de élderes y de la Sociedad de Socorro los esfuerzos para compartir el Evangelio y fortalecer a los miembros nuevos y a los que regresan.',
        explanation:
          'Una unidad fuerte no solo organiza reuniones; también acompaña a las personas en su proceso de fe. Eso requiere ministración intencional, seguimiento amoroso y coordinación real entre líderes.',
        example:
          'Cuando un nuevo miembro recibe amistad, enseñanza, apoyo y oportunidades para pertenecer, su experiencia cambia por completo. Lo mismo ocurre con alguien que está regresando poco a poco.',
        application: [
          '¿Estamos fortaleciendo a las personas nuevas o solo dándoles la bienvenida una vez?',
          '¿Hay alguien que esté intentando regresar y necesite atención real?',
          '¿Estamos coordinando bien la ministración y el acompañamiento?',
        ],
        action:
          'Piensa en una persona nueva o que esté regresando y define un siguiente paso concreto para ayudarla a sentirse sostenida y fortalecida.',
        prompts: {
          home: '¿Cómo puede tu familia ayudar a alguien a sentirse bienvenido en la Iglesia?',
          service: '¿A quién puedes incluir, acompañar o animar esta semana?',
          council:
            '¿Qué debe mejorar en la forma en que el barrio fortalece a miembros nuevos y que regresan?',
        },
      },
      {
        id: 'humility-and-accountability',
        title: 'Humildad, integridad y responsabilidad espiritual',
        handbookRef:
          'Las escrituras y el Manual General — el siervo del Señor debe ser manso, digno y rendir cuentas ante Dios.',
        doctrine:
          'Un líder del Señor sirve con humildad, busca revelación, actúa con integridad y responde ante Dios por la manera en que cuida a Su pueblo.',
        explanation:
          'No basta con ocupar un llamamiento. Un líder fiel se examina, se arrepiente, corrige y evita caer en dureza, orgullo, favoritismo, desorden o apatía. La autoridad espiritual se sostiene con rectitud personal y dependencia del Señor.',
        example:
          'Un líder que reconoce un error, pide perdón y corrige su forma de servir demuestra más madurez espiritual que uno que siempre quiere parecer fuerte.',
        application: [
          '¿Hay orgullo, dureza o rutina en mi forma de liderar?',
          '¿Estoy buscando al Señor con sinceridad en mi llamamiento?',
          '¿Qué debo corregir para servir con mayor integridad?',
        ],
        action:
          'Haz esta semana una autoevaluación honesta de tu servicio y escribe un cambio específico que debas hacer delante del Señor.',
        prompts: {
          home:
            '¿Qué te está enseñando el liderazgo espiritual sobre tu propio carácter en casa?',
          service: '¿A quién necesitas tratar con más humildad o paciencia?',
          council:
            '¿Cómo puede un consejo crear una cultura de humildad, responsabilidad y confianza?',
        },
      },
    ],
  },
};
