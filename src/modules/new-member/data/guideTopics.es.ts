import type {
  GuideAudioPlaceholder,
  GuideImagePlaceholder,
  GuideTopic,
} from './guideTopics.types';

function image(placeholder: GuideImagePlaceholder): GuideImagePlaceholder {
  return placeholder;
}

function audio(placeholder: GuideAudioPlaceholder): GuideAudioPlaceholder {
  return placeholder;
}

export const guideTopicsEs: GuideTopic[] = [
  {
    id: 'sacrament-meeting',
    title: 'Reunión sacramental',
    subtitle: 'El corazón del culto dominical',
    category: 'worship',
    audioPlaceholder: audio({
      eyebrow: 'Culto dominical',
      title: 'La reunión sacramental y el sacramento',
      summary:
        'Qué conmemoramos al participar del pan y el agua, cómo se ordena el sacramento según las revelaciones y por qué deseamos la compañía del Espíritu.',
      scriptIntent:
        'Explicar con serenidad el propósito de la reunión sacramental, el significado de recordar al Salvador y la promesa asociada al sacramento, sin añadir especulación doctrinal.',
      status: 'pendiente',
      durationLabel: 'aprox. 6–8 min',
      voiceStyle: 'teaching',
    }),
    sections: [
      {
        title: 'Qué ocurre en la reunión sacramental',
        content:
          'La reunión sacramental es la reunión de adoración más sagrada de la semana para los santos de los últimos días. Nos congregamos como barrio para participar del sacramento, cantar himnos, escuchar mensajes y testimonios, y fortalecer unos a otros en la fe en Jesucristo.\n\nEl énfasis principal es adorar al Salvador y renovar nuestro deseo de seguirle. La duración suele ser cercana a una hora, pero lo esencial no es el reloj sino la reverencia: venir con hambre espiritual y disposición para escuchar al Señor.',
        imagePlaceholder: image({
          label: 'Reunión sacramental',
          title: 'Congregación reunida para adorar',
          prompt:
            'Interior de capilla de La Iglesia de Jesucristo de los Santos de los Últimos Días, reunión sacramental serena, luz suave, himnal y mesa del sacramento visibles al fondo, estilo fotográfico respetuoso y sobrio, sin rostros identificables.',
          aspectRatio: '16:9',
          placement: 'before',
        }),
      },
      {
        title: 'Qué conmemoramos y cómo participamos',
        content:
          'Al administrar el sacramento, la Iglesia invita a recordar el cuerpo y la sangre de Jesucristo de un modo sagrado. En la Última Cena, el Salvador instituyó este memorial; Su sacrificio expiatorio y Su victoria sobre la muerte son el centro de nuestra adoración cuando participamos con fe.\n\nHoy se usan pan y agua conforme a la revelación moderna para la Iglesia restaurada. El Señor enseñó que, al participar del sacramento, lo decisivo no es el elemento en sí, sino hacerlo con el ojo puesto en Su gloria y recordando Su cuerpo y Su sangre (véase Doctrina y Convenios 27:2). Las oraciones del sacramento —para el pan y para el agua— se encuentran en Moroni 4–5 y también en Doctrina y Convenios 20:77, 79. Los portadores del sacerdocio las pronuncian con la debida autoridad; al escucharlas, podemos meditar en los convenios y promesas que el Señor ofrece a quienes participan dignamente.\n\nParticipar del sacramento no es un gesto vacío: es un acto de fe en el Redentor, un recordatorio semanal de Su amor y un llamado a la obediencia sincera.',
      },
      {
        title: 'Por qué deseamos el Espíritu con nosotros',
        content:
          'En las oraciones del sacramento se pide que quienes comen y beben lo hagan en memoria del cuerpo y la sangre del Salvador, y se implora la bendición del Espíritu para quienes participan con fe. Por eso, antes y durante el sacramento cultivamos actitudes que invitan al Espíritu Santo: reverencia, gratitud, arrepentimiento y un corazón dispuesto a escuchar.\n\nEl Espíritu no es un accesorio del culto: es el Consolador prometido, quien testifica de Cristo, nos guía en la verdad y nos fortalece para guardar los convenios. Cuando deseamos sinceramente esa compañía, preparamos el interior más que solo el exterior: llegar temprano, silenciar distracciones y dejar que la mente y el corazón se centren en el Salvador.',
      },
      {
        title: 'Cómo participar con intención',
        content:
          'Acude con un corazón orante. Durante la administración del sacramento, reflexiona con honestidad sobre tu semana, tus relaciones y tus prioridades; pide al Padre ayuda para acercarte más a Cristo. Los himnos y los discursos que siguen son oportunidades para que el Espíritu enseñe: escucha como quien busca una respuesta, no solo como quien evalúa una presentación.\n\nCon el tiempo podrían invitarte a preparar un mensaje o un testimonio: no es una “prueba de oratoria”, sino un acto de servicio para edificar a otros. Quien habla desde la sencillez y la fe suele tocar corazones de maneras que no alcanza quien solo busca impresionar.',
        imagePlaceholder: image({
          label: 'Sacramento',
          title: 'Pan y agua en preparación reverente',
          prompt:
            'Mesa del sacramento en capilla, bandejas con pequeñas porciones de pan y vasos de agua, ambiente solemne y limpio, luz natural suave, estilo documental respetuoso, sin personas identificables.',
          aspectRatio: '4:5',
          placement: 'after',
        }),
      },
    ],
    reflectionPrompt:
      '¿Qué sientes al participar del sacramento? ¿Cómo te ayuda a recordar al Salvador y a desear la compañía del Espíritu?',
  },
  {
    id: 'come-follow-me',
    title: 'Ven, sígueme',
    subtitle: 'Estudio de las Escrituras en casa y en la iglesia',
    category: 'worship',
    audioPlaceholder: audio({
      eyebrow: 'Escrituras',
      title: 'Ven, sígueme: unidad en el estudio',
      summary:
        'Cómo el calendario de estudio une a la Iglesia y cómo Escuela Dominical y el hogar se refuerzan mutuamente.',
      scriptIntent:
        'Animar al estudio constante y a la participación en las clases dominicales, en línea con los materiales oficiales de la Iglesia.',
      status: 'pendiente',
      durationLabel: 'aprox. 5–7 min',
      voiceStyle: 'warm',
    }),
    sections: [
      {
        title: 'Un programa de estudio unificado',
        content:
          'Ven, sígueme es el recurso de estudio acordado por la Primera Presidencia y el Quórum de los Doce para orientar el aprendizaje de las Escrituras en el hogar y en la Iglesia. Cada semana, familias y miembros en muchas naciones estudian los mismos pasajes, lo que crea una experiencia compartida de fe y conversación.\n\nEsa unidad no anula la inspiración personal: la amplía. Cuando dos personas estudian el mismo capítulo, el Espíritu puede destacar principios distintos según sus necesidades, pero el texto común facilita el diálogo en la familia y en la congregación.',
        imagePlaceholder: image({
          label: 'Estudio en casa',
          title: 'Escrituras y cuaderno en la mesa',
          prompt:
            'Mesa hogareña sencilla, Libro de Mormón o Biblia abiertos, cuaderno y lápiz, luz cálida matutina, ambiente de estudio tranquilo, estilo fotográfico natural, sin marcas comerciales.',
          aspectRatio: '16:9',
          placement: 'before',
        }),
      },
      {
        title: 'Escuela Dominical y otras reuniones',
        content:
          'Después de la reunión sacramental, la Escuela Dominical ofrece un espacio para profundizar la lección de Ven, sígueme con la guía de un maestro llamado por autoridad. Allí se invita a comentar, hacer preguntas respetuosas y aprender unos de otros bajo la influencia del Espíritu.\n\nSegún la organización local, también hay reuniones de Sociedad de Socorro, de cuórum de élderes, de Mujeres Jóvenes y de Primaria. No todas las ramas tienen el mismo número de clases, pero el principio es el mismo: edificación mediante la doctrina, el servicio y el compañerismo.',
      },
      {
        title: 'Estudiar en casa durante la semana',
        content:
          'El mayor cambio suele ocurrir entre un domingo y otro, cuando abrimos las Escrituras aunque sea unos minutos al día. El estudio no compite con la oración ni con el servicio: los integra, porque la palabra de Dios nos recuerda quién es Cristo y qué nos pide.\n\nLa aplicación de la Iglesia y otros recursos oficiales pueden ayudarte a seguir el calendario, escuchar capítulos y preparar preguntas para tu familia o para tu clase. La constancia humilde vale más que la cantidad ostentosa.',
      },
    ],
    reflectionPrompt:
      '¿Qué escritura o principio de tu estudio reciente ha tocado tu corazón? ¿Cómo podrías compartirlo en familia o en clase?',
  },
  {
    id: 'ministering',
    title: 'Ministerio',
    subtitle: 'Cuidarnos unos a otros como el Salvador',
    category: 'worship',
    audioPlaceholder: audio({
      eyebrow: 'Servicio',
      title: 'El ministerio como ministerio de Cristo',
      summary:
        'Relación de amistad, discernimiento espiritual y apoyo sencillo, según la orientación de los líderes locales y las enseñanzas generales.',
      scriptIntent:
        'Presentar el ministerio como expresión del amor del Salvador, sin reducirlo a formalismos ni a métricas vacías.',
      status: 'pendiente',
      durationLabel: 'aprox. 5–7 min',
      voiceStyle: 'calm',
    }),
    sections: [
      {
        title: 'Qué es el ministerio',
        content:
          'El ministerio es la forma en que la Iglesia organiza el cuidado mutuo entre miembros: hermanas y hermanos asignados para atender, con amor y ojo pastoral, las necesidades espirituales y temporales que puedan observarse con respeto y discreción.\n\nNo reemplaza la orientación del obispo ni la consagración personal a la obra, pero sí refleja el mandamiento de amarnos unos a otros. Jesús vio personas, no solo listas; el ministerio fiel imita esa mirada: cercanía genuina más que cumplimiento superficial.',
        imagePlaceholder: image({
          label: 'Ministerio',
          title: 'Dos personas conversando con sencillez',
          prompt:
            'Dos adultos en un hogar o porche, conversación amable, manos visibles en gesto de escucha, ropa modesta, luz natural, estilo fotográfico cálido, rostros genéricos sin identidad clara.',
          aspectRatio: '16:9',
          placement: 'before',
        }),
      },
      {
        title: 'Tú también ministrarás',
        content:
          'Con el tiempo, conforme te integres y los líderes te conozcan, podrías recibir una asignación para ministrar a otros. La responsabilidad se aprende con el Espíritu y con el ejemplo: escuchar antes de aconsejar, preguntar con respeto y ofrecer ayuda concreta cuando corresponda.\n\nMinistrar no exige perfección ni una “personalidad extrovertida”. A veces lo más cristiano es un mensaje breve, una visita sencilla o una oración ofrecida con sinceridad.',
      },
      {
        title: 'Amor sin artificio',
        content:
          'Los reportes que puedan existir en tu estaca o barrio sirven para orientar a los líderes, no para medir el valor de un alma. Lo que el Salvador evalúa es la caridad: la disposición de corazón que lleva a actuar cuando Él inspira.\n\nEmpieza donde estés: un saludo en el pasillo, un mensaje a quien hace tiempo no asiste, una comida cuando hay enfermedad. El ministerio crece cuando dejamos de pensar “¿qué debo hacer?” y empezamos a preguntar “¿a quién ama el Señor a través de mí hoy?”',
      },
    ],
    reflectionPrompt:
      '¿Cómo has sentido el cuidado de otros en tu vida? ¿Qué paso sencillo podrías dar para ministrar con mayor intención?',
  },
  {
    id: 'personal-prayer',
    title: 'Oración personal',
    subtitle: 'Tu comunicación con el Padre Celestial',
    category: 'covenant-living',
    audioPlaceholder: audio({
      eyebrow: 'Oración',
      title: 'Hablar con Dios con fe',
      summary:
        'Elementos de la oración, gratitud, petición y cierre en el nombre de Cristo; escuchar al Espíritu con paciencia.',
      scriptIntent:
        'Enseñar la oración como conversación viva y reverente, alineada con los patrones generales enseñados en las escrituras y por los profetas.',
      status: 'pendiente',
      durationLabel: 'aprox. 5–6 min',
      voiceStyle: 'calm',
    }),
    sections: [
      {
        title: 'La oración es más que palabras',
        content:
          'La oración es el medio que el Padre Celestial ha establecido para que Sus hijos e hijas le expresen gratitud, le confíen cargas, pidan perdón y busquen orientación. No es un monólogo teatral ante los demás, sino un encuentro sincero, a menudo íntimo, entre una criatura y su Creador.\n\nPuedes orar en silencio o en voz alta, de rodillas o en circunstancias donde solo el corazón puede dirigirse al cielo. Lo decisivo no es la postura externa sino la fe en Jesucristo y la honestidad del alma.',
      },
      {
        title: 'Un patrón que enseña reverencia',
        content:
          'En la Iglesia se acostumbra comenzar dirigiéndonos a “Padre Celestial”, expresar gratitud por bendiciones grandes y pequeñas, presentar nuestras necesidades y deseos con respeto, y cerrar en el nombre de Jesucristo, reconociendo que solo mediante Él tenemos acceso al trono de gracia.\n\nEse orden no es una fórmula rígida que limite al Espíritu, pero ayuda a los niños y a los nuevos miembros a aprender reverencia. Con el tiempo, la oración se vuelve menos “instrucción” y más relación: sigues los principios, pero el tono es el de un hijo que confía en un Padre amoroso.',
        imagePlaceholder: image({
          label: 'Oración',
          title: 'Momento de oración en quietud',
          prompt:
            'Silueta o manos unidas en oración junto a una ventana al amanecer, luz suave, atmósfera de paz, estilo minimalista y respetuoso, sin símbolos no relacionados con la fe.',
          aspectRatio: '4:5',
          placement: 'after',
        }),
      },
      {
        title: 'Escuchar respuestas del Señor',
        content:
          'Las respuestas rara vez llegan siempre del mismo modo. A veces es paz interior; otras, un versículo que “salta” al leer; otras, la voz prudente de un líder o un amigo cuando pediste consejo en oración.\n\nLa paciencia es parte de la fe. Si no ves de inmediato el camino, no concluyas que Dios no escucha: a veces Él corrige, otras veces prepara, y a veces nos niega lo que pedimos porque conoce un bien mayor. Persiste en orar, estudia las escrituras y confía en los tiempos del Señor.',
      },
    ],
    reflectionPrompt:
      '¿Cuándo has sentido que el Padre Celestial escuchó tus oraciones? ¿Qué te ayuda a sentirte cerca de Él?',
  },
  {
    id: 'scripture-study',
    title: 'Estudio de las Escrituras',
    subtitle: 'Escuchar la voz de Dios en Su palabra',
    category: 'covenant-living',
    audioPlaceholder: audio({
      eyebrow: 'Escrituras',
      title: 'Fe, estudio y testimonio',
      summary:
        'Por qué las obras estándar importan y cómo formar hábitos sostenibles de estudio personal.',
      scriptIntent:
        'Destacar el papel de la Biblia, el Libro de Mormón y otras escrituras oficiales en acercarnos a Cristo, sin dogmatizar sobre métodos personales.',
      status: 'pendiente',
      durationLabel: 'aprox. 6 min',
      voiceStyle: 'teaching',
    }),
    sections: [
      {
        title: '¿Por qué estudiar las Escrituras?',
        content:
          'Las Escrituras contienen la palabra de Dios revelada a profetas y profetisas a lo largo de la historia. Nos enseñan la doctrina de Cristo, el plan de felicidad y el carácter misericordioso del Padre. Estudiar no es solo informarse: es permitir que el Espíritu Santifique nuestros pensamientos y nos muestre qué debemos cambiar.\n\nLeer ocasionalmente puede animar; estudiar con constancia transforma. El estudio sincero abre espacio para preguntas, para anotar impresiones y para relacionar pasajes con la vida diaria.',
      },
      {
        title: 'Hábitos que sostienen el estudio',
        content:
          'No necesitas largas sesiones al principio: unos versículos bien meditados pueden valer más que muchos capítulos leídos con prisa. Elige un horario realista, protege unos minutos del ruido y ora antes de abrir el libro para pedir comprensión.\n\nLa aplicación de la Iglesia y otros recursos oficiales facilitan leer, escuchar y marcar pasajes. Lo importante es la fe consistente, no la competencia por volumen.',
        imagePlaceholder: image({
          label: 'Obras estándar',
          title: 'Libro de Mormón y Biblia juntos',
          prompt:
            'Libro de Mormón y Biblia en tapa dura sobre mesa de madera, luz suave, composición limpia, estilo editorial religioso sobrio.',
          aspectRatio: '1:1',
          placement: 'before',
        }),
      },
      {
        title: 'Las obras estándar de la Iglesia',
        content:
          'Los santos de los últimos días estudian la Biblia, el Libro de Mormón, la Doctrina y Convenios y la Perla de Gran Precio. Cada obra aporta testigos y doctrina que convergen en Cristo. El Libro de Mormón, en particular, es un poderoso testamento de Jesucristo y un recurso para sentir el Espíritu cuando se lee con fe.\n\nEl estudio ordenado —siguiendo un plan como Ven, sígueme— ayuda a recorrer las escrituras de manera equilibrada en lugar de quedarse solo en pasajes favoritos, aunque esos también tengan su lugar en la devoción personal.',
      },
    ],
    reflectionPrompt:
      '¿Qué escritura ha hablado recientemente a tu corazón? ¿Qué sientes al estudiar la palabra de Dios?',
  },
  {
    id: 'sabbath-day',
    title: 'El día de reposo',
    subtitle: 'Santificar el día del Señor',
    category: 'covenant-living',
    audioPlaceholder: audio({
      eyebrow: 'Diez Mandamientos',
      title: 'El reposo del Señor en la vida moderna',
      summary:
        'El día de reposo como señal del convenio y oportunidad de adoración, familia y descanso en Cristo.',
      scriptIntent:
        'Explicar el propósito del día de reposo según las escrituras y las enseñanzas generales, sin imponer listas rígidas personales.',
      status: 'pendiente',
      durationLabel: 'aprox. 6–7 min',
      voiceStyle: 'teaching',
    }),
    sections: [
      {
        title: 'Un don y un recordatorio',
        content:
          'Desde la antigüedad, el Señor ha enseñado a Su pueblo a apartar un día para reposar de la rutina laboral habitual y dedicar tiempo a la adoración, la familia y el servicio. En la Iglesia de Jesucristo, ese día es el domingo en la mayoría de las regiones, cuando nos reunimos para tomar el sacramento y edificarnos mutuamente.\n\nSantificar el día de reposo no es meramente “no trabajar”: es decir “sí” a lo que nos acerca a Dios —oración, estudio, reunión sacramental, visitas de ministerio— y ordenar el tiempo para que el Espíritu no sea un invitado ocasional sino un compañero bienvenido.',
        imagePlaceholder: image({
          label: 'Domingo',
          title: 'Familia dirigiéndose a la capilla',
          prompt:
            'Familia modesta caminando hacia una capilla al sol de la mañana, ropa de domingo sencilla, ambiente de paz, estilo fotográfico realista y respetuoso.',
          aspectRatio: '16:9',
          placement: 'before',
        }),
      },
      {
        title: 'Adoración, familia y descanso',
        content:
          'Asistir a las reuniones es central, porque el sacramento renueva el corazón y la comunión fortalece la fe. En el hogar, el día puede incluir estudio de las Escrituras, conversaciones edificantes, tiempo con niños y ancianos, y obras de caridad acordes con la inspiración y las circunstancias.\n\nEl descanso del trabajo habitual no es holgazanería espiritual: es fe —confiar en que Dios sostiene lo necesario cuando honramos Sus prioridades. Cada familia, en diálogo con los líderes y con el Espíritu, aprende a vivir el día con equilibrio.',
      },
      {
        title: 'Crecer con paciencia',
        content:
          'No todos los domingos serán idílicos; hay turnos, enfermedades y tensiones reales. La santificación es un proceso, no una pose para redes sociales. Si hoy solo puedes un fragmento de calma y una oración sincera, el Señor puede multiplicarlo.\n\nCon el tiempo, notarás que el día de reposo “sabe diferente”: menos ansiedad por lo urgente y más espacio para recordar que eres hijo o hija de un Padre que ama la eternidad más que la prisa.',
      },
    ],
    reflectionPrompt:
      '¿Qué actividades te ayudan a sentir el Espíritu en el día de reposo? ¿Cómo puedes hacer del domingo un día de renovación?',
  },
  {
    id: 'tithing-offerings',
    title: 'Diezmos y ofrendas',
    subtitle: 'Confiar en Dios con nuestros recursos',
    category: 'covenant-living',
    audioPlaceholder: audio({
      eyebrow: 'Mayordomía',
      title: 'Diezmo, fe y generosidad',
      summary:
        'El principio bíblico del diezmo, la confianza en las promesas del Señor y el propósito de las ofrendas de ayuno y otras contribuciones.',
      scriptIntent:
        'Presentar el diezmo y las ofrendas como principios de fe y mayordomía, según las enseñanzas generales de la Iglesia.',
      status: 'pendiente',
      durationLabel: 'aprox. 6 min',
      voiceStyle: 'warm',
    }),
    sections: [
      {
        title: '¿Qué es el diezmo?',
        content:
          'El diezmo es la contribución de un diezmavo de los aumentos del miembro, entregada a través de los canales que la Iglesia establece. Es un principio antiguo, renovado en la restauración, que sostiene la obra mundial: casas del Señor, trabajo misional, educación religiosa, programas de bienestar y muchas otras bendiciones colectivas.\n\nPagar diezmos no “compra” favores del cielo: es obediencia a un mandamiento y expresión de gratitud por lo que el Señor ya nos da. La Iglesia enseña principios generales; los detalles personales de ingreso se tratan con el obispo con confidencialidad cuando haga falta.',
      },
      {
        title: 'Fe que abre la mano',
        content:
          'Entregar el diezmo pide fe: reconocer que todo lo que tenemos procede, en definitiva, del Señor y confiar en Sus promesas a los fieles. Muchos miembros dan testimonio de que, al priorizar el mandamiento, el Señor ayuda a administrar lo que queda con sabiduría —aunque la experiencia de cada hogar sea distinta.\n\nLa fe no garantiza una vida sin pruebas económicas, pero ancla el corazón en algo más estable que la ansiedad del saldo bancario.',
        imagePlaceholder: image({
          label: 'Mayordomía',
          title: 'Sobre o medio de donación en actitud de fe',
          prompt:
            'Sobre de diezmos modesto sobre escritorio hogareño, manos adultas en gesto de entrega voluntaria, luz suave, estilo fotográfico sobrio, sin mostrar datos personales.',
          aspectRatio: '4:5',
          placement: 'after',
        }),
      },
      {
        title: 'Ofrendas de ayuno y otras contribuciones',
        content:
          'Además del diezmo, los miembros pueden ofrecer ayuno u otras donaciones para cuidar a los pobres y necesitados y apoyar causas determinadas por la Iglesia. Esas contribuciones son voluntarias y sagradas: entre el donante y el Señor.\n\nLa mayordomía cristiana abarca tiempo, talentos y recursos. Cuando el corazón aprende a dar, descubre que el Señor puede multiplicar el amor más que las monedas.',
      },
    ],
    reflectionPrompt:
      '¿Cómo te sientes al confiar tus recursos a Dios? ¿Qué bendiciones has notado al ser fiel en el diezmo y en la generosidad?',
  },
  {
    id: 'confirmation-gift',
    title: 'Tu confirmación',
    subtitle: 'El don del Espíritu Santo',
    category: 'ordinances',
    audioPlaceholder: audio({
      eyebrow: 'Espíritu Santo',
      title: 'Confirmación y compañía del Espíritu',
      summary:
        'Qué significa recibir el don del Espíritu Santo y cómo vivir para gozar de Su influencia.',
      scriptIntent:
        'Explicar la confirmación y el don del Espíritu según la doctrina restaurada, animando a la obediencia y la sensibilidad espiritual.',
      status: 'pendiente',
      durationLabel: 'aprox. 5–7 min',
      voiceStyle: 'teaching',
    }),
    sections: [
      {
        title: 'Lo que la confirmación confiere',
        content:
          'Tras el bautismo por inmersión, la imposición de manos por autoridad del sacerdocio confirma al nuevo miembro como miembro de la Iglesia de Jesucristo y le concede el don del Espíritu Santo. Ese don es diferente de las manifestaciones ocasionales del Espíritu: implica el derecho a la compañía constante del Espíritu, según la fidelidad de la persona.\n\nEl Espíritu Santo testifica del Padre y del Hijo, enseña la verdad, consuela en el dolor y reprime advertencias cuando nos alejamos del camino. Es un regalo que merece gratitud diaria, no solo el domingo de la confirmación.',
      },
      {
        title: 'Vivir para tener al Espíritu consigo',
        content:
          'Las escrituras describen la voz del Espíritu como suave y a veces imperceptible para el orgullo. Por eso la obediencia importa: no para ganarnos el amor de Dios —ya nos ama— sino para quitar el ruido interior que impide oír.\n\nGuardar convenios, arrepentirnos con sinceridad, perdonar y servir no son “trucos”; son condiciones en las que el Espíritu puede permanecer. Cuando pecamos a sabiendas, nos apartamos de Su influencia; el arrepentimiento sincero restaura la comunión.',
        imagePlaceholder: image({
          label: 'Confirmación',
          title: 'Manos sobre la cabeza en imposición de manos',
          prompt:
            'Ceremonia de imposición de manos en interior de capilla, enfoque respetuoso y discreto, manos de ancianos del sacerdocio, ambiente solemne, sin rostros identificables.',
          aspectRatio: '16:9',
          placement: 'before',
        }),
      },
      {
        title: 'Reconocer la voz del Espíritu',
        content:
          'El Espíritu habla a la mente y al corazón: ideas claras, paz, amor, deseos de bien. Con el tiempo aprendes a distinguir esas impresiones de miedos o impulsos egoístas, especialmente cuando contrastas lo que sientes con las enseñanzas de los profetas y las Escrituras.\n\nNo menosprecies las impresiones pequeñas de servicio o arrepentimiento: a menudo el Señor guía con pasos modestos que preparan grandes cambios.',
      },
    ],
    reflectionPrompt:
      '¿Cómo has sentido al Espíritu Santo desde tu confirmación? ¿Qué te ayuda a invitar Su influencia cada día?',
  },
  {
    id: 'renewing-covenants',
    title: 'Renovar convenios',
    subtitle: 'El sacramento como renovación semanal',
    category: 'ordinances',
    audioPlaceholder: audio({
      eyebrow: 'Convenios',
      title: 'Renovar el corazón en el sacramento',
      summary:
        'Cómo el sacramento relaciona bautismo, Espíritu y compromiso semanal de seguir a Cristo.',
      scriptIntent:
        'Profundizar en la doctrina del sacramento como medio para renovar convenios bautismales, alineado con las oraciones y enseñanzas oficiales.',
      status: 'pendiente',
      durationLabel: 'aprox. 6–8 min',
      voiceStyle: 'teaching',
    }),
    sections: [
      {
        title: 'Por qué el sacramento cada semana',
        content:
          'El bautismo es el punto de entrada a un convenio; el sacramento es el medio que el Señor ha provisto para renovar semanalmente ese compromiso. Al participar dignamente del pan y el agua, recordamos el cuerpo y la sangre de Cristo, prometemos volver a tomar Su nombre, recordarle y guardar Sus mandamientos, y recibimos la promesa del Espíritu para quienes son fieles.\n\nEsa repetición no trivializa el convenio: lo fortalece. La vida desgasta, fallamos, nos distraemos; el sacramento nos vuelve a colocar frente al Salvador con honestidad y esperanza.',
      },
      {
        title: 'Preparar el corazón, no solo la apariencia',
        content:
          'La preparación incluye arrepentimiento práctico: reconocer errores, reparar cuando sea posible y acercarse al obispo cuando la transgresión lo requiera según la orientación del Señor. No se trata de perfección previa, sino de sinceridad —venir como hijos necesitados de gracia, no como jueces de los demás.\n\nLa modestia en el vestir y la puntualidad ayudan a la reverencia colectiva, pero el Señor mira el interior. Una semana difícil puede convertirse en un sacramento especialmente sagrado si traes el corazón quebrantado y dispuesto.',
        imagePlaceholder: image({
          label: 'Renovación',
          title: 'Corazón y sacramento',
          prompt:
            'Imagen simbólica sobria: manos abiertas en actitud de recepción, luz suave, fondo neutro, estilo ilustrativo minimalista, tonos cálidos, sin iconografía no mormona.',
          aspectRatio: '1:1',
          placement: 'before',
        }),
      },
      {
        title: 'Un encuentro con el Salvador',
        content:
          'Durante la bendición y reparto del sacramento, busca silencio interior. Deja el teléfono, la lista de tareas y la comparación con otros. Este es tiempo sagrado para que el Espíritu te recuerde la bondad del Padre y la expiación del Hijo.\n\nRenovar convenios implica decir otra vez “sí” con todo lo que eso cuesta en la vida real: el trabajo, el perdón, la integridad. El Salvador no promete un camino sin cruz, pero promete que no caminarás solo si conservas Su Espíritu.',
      },
    ],
    reflectionPrompt:
      '¿En qué piensas durante el sacramento? ¿Cómo te ayuda a sentirte perdonado, fortalecido y renovado?',
  },
  {
    id: 'temple-preparation',
    title: 'Preparación para el templo',
    subtitle: 'Ordenanzas sagradas y convenios eternos',
    category: 'ordinances',
    audioPlaceholder: audio({
      eyebrow: 'Templo',
      title: 'Camino hacia la casa del Señor',
      summary:
        'Qué son los templos, el tiempo de preparación, la recomendación y la fe en las promesas del convenio.',
      scriptIntent:
        'Presentar la doctrina del templo con reverencia, remitiendo a líderes locales para fechas y requisitos personales.',
      status: 'pendiente',
      durationLabel: 'aprox. 7–9 min',
      voiceStyle: 'warm',
    }),
    sections: [
      {
        title: 'La casa del Señor',
        content:
          'Los templos son lugares sagrados dedicados a Dios donde se realizan ordenanzas salvadoras para vivos y difuntos según la revelación y la autoridad de los sacerdocios. No sustituyen la capilla semanal: la complementan. En el templo, los miembros hacen convenios sagrados y participan en la obra redentora de manera que afianza la esperanza en la vida eterna.\n\nLa reverencia en el templo se extiende a cómo hablamos de él fuera: hay enseñanzas y experiencias que son personales y sagradas. Lo público es la invitación a prepararse y entrar con dignidad.',
        imagePlaceholder: image({
          label: 'Templo',
          title: 'Templo al atardecer',
          prompt:
            'Templo de La Iglesia de Jesucristo de los Santos de los Últimos Días al atardecer, jardines cuidados, cielo sereno, estilo fotográfico majestuoso pero sobrio, sin turistas reconocibles.',
          aspectRatio: '16:9',
          placement: 'before',
        }),
      },
      {
        title: 'Tiempo de preparación y crecimiento',
        content:
          'Por revelación y práctica establecida, los nuevos miembros generalmente esperan al menos un año de membresía y fidelidad en los convenios antes de recibir la investidura. Ese tiempo no es castigo: es consagración —aprender a vivir el evangelio en la vida diaria, integrarse al barrio y dejar que el Espíritu afirme la fe.\n\nTu obispo y tu presidente de estaca te orientarán cuando corresponda entrevistas y recomendación. La preparación incluye hábitos de oración, estudio, ley de castidad, mayordomía y arrepentimiento continuo.',
      },
      {
        title: 'Recomendación para el templo',
        content:
          'Para entrar al templo se necesita una recomendación válida, obtenida mediante entrevistas con el obispo y el presidente de estaca. Esas entrevistas tratan de fe, conducta digna y disposición para honrar convenios sagrados. Responde con honestidad: el propósito es ayudarte a sentir la paz del Señor, no avergonzarte sin causa.\n\nSi hay asuntos que resolver, los líderes están capacitados para orientar con confidencialidad y caridad. El templo invita a la santidad progresiva, no a la perfección fingida.',
      },
    ],
    reflectionPrompt:
      '¿Qué esperas con reverencia del templo? ¿En qué áreas sientes que el Señor te está preparando ahora?',
  },
  {
    id: 'finding-friends',
    title: 'Hacer amigos',
    subtitle: 'Pertenecer en el barrio',
    category: 'belonging',
    audioPlaceholder: audio({
      eyebrow: 'Barrio',
      title: 'Amistad y comunión de santos',
      summary:
        'Cómo construir vínculos sinceros en la congregación local con paciencia y servicio.',
      scriptIntent:
        'Animar la pertenencia sin presionar; recordar la diversidad de personalidades y circunstancias en el rebaño del Señor.',
      status: 'pendiente',
      durationLabel: 'aprox. 5 min',
      voiceStyle: 'warm',
    }),
    sections: [
      {
        title: 'Más que una lista de asistencia',
        content:
          'Un barrio es una porción del reino de Dios en la tierra: personas imperfectas unidas por convenios y por la fe en Cristo. No es un club social exclusivo, aunque a veces pueda sentirse incómodo al principio. La pertenencia crece cuando das y recibes: una sonrisa, una pregunta sincera, una mano tendida.\n\nEl Salvador conoce la soledad; Su Iglesia existe, entre otras razones, para que nadie camine como isla si desea comunión. Eso no garantiza amistad instantánea con todos, pero sí espacio para empezar.',
        imagePlaceholder: image({
          label: 'Comunidad',
          title: 'Saludos después de la reunión',
          prompt:
            'Pasillo de capilla después de la reunión, personas saludándose con cordialidad, diversidad de edades, ambiente acogedor, estilo fotográfico natural, rostros poco definidos.',
          aspectRatio: '16:9',
          placement: 'after',
        }),
      },
      {
        title: 'Formas sencillas de conectar',
        content:
          'La constancia en la asistencia es el primer paso: la familiaridad genera confianza. Participa en actividades locales cuando puedas, ofrece ayuda práctica y preséntate a alguien nuevo cada vez que notes un rostro desconocido —quizá otro se siente tan tímido como tú.\n\nLas clases y el servicio en vocaciones sencillas abren puertas: enseñar niños, llevar un himno, preparar un bocadillo. El servicio compartido forja amistad más rápido que las conversaciones forzadas.',
      },
      {
        title: 'Paciencia y gracia hacia ti mismo',
        content:
          'Es normal sentirse fuera de lugar al inicio. Muchos miembros llevan años en el barrio y tienen historias compartidas que tú aún no conoces; eso no significa que no haya espacio para ti. Sigue viniendo, ora por oportunidades de amistad y permite que el Señor cruce tu camino con quien necesita tu amistad tanto como tú la suya.\n\nLa pertenencia profunda es obra del Espíritu y del tiempo. No se mide solo por grupos de chat, sino por sentirse visto por Cristo a través de Su pueblo.',
      },
    ],
    reflectionPrompt:
      '¿Quién en tu barrio te ha hecho sentir bienvenido? ¿Qué gesto sencillo podrías ofrecer esta semana para acercarte a alguien?',
  },
  {
    id: 'asking-for-help',
    title: 'Pedir ayuda',
    subtitle: 'La Iglesia como red de apoyo',
    category: 'belonging',
    audioPlaceholder: audio({
      eyebrow: 'Apoyo',
      title: 'Humildad para recibir y dar ayuda',
      summary:
        'Canales pastorales y prácticos de apoyo en la estaca, sin sustituir la ayuda profesional cuando sea necesaria.',
      scriptIntent:
        'Normalizar pedir ayuda, mencionar obispo y ministerio sin prometer soluciones mágicas ni juicios.',
      status: 'pendiente',
      durationLabel: 'aprox. 5–6 min',
      voiceStyle: 'calm',
    }),
    sections: [
      {
        title: 'Necesitar ayuda es humano',
        content:
          'Los discípulos de Cristo no prometen una vida sin cargas; prometen que no las llevarán solos si acuden al yugo del Salvador. Pedir ayuda espiritual, emocional o temporal no es fracaso: es reconocer que la Iglesia es un cuerpo, no una colección de individuos autosuficientes.\n\nA veces el orgullo o la vergüenza retrasa la petición; otras, no sabemos a quién acudir. El primer paso suele ser la oración sincera y luego la conversación prudente con quien el Señor ha llamado para pastorear.',
      },
      {
        title: 'Con quién hablar primero',
        content:
          'El obispo y sus consejeros están llamados a cuidar el rebaño local: escuchar con caridad, orientar según la doctrina y conectar recursos de la Iglesia cuando corresponda. Tus ministeres asignados también pueden ser un puente de amistad y apoyo en momentos de necesidad.\n\nLos líderes de organizaciones de alivio y los presidentes de cuórum y de Sociedad de Socorro coordinan servicio práctico. La comunicación honesta ayuda a evitar suposiciones y a recibir la ayuda adecuada.',
        imagePlaceholder: image({
          label: 'Entrevista pastoral',
          title: 'Conversación confidencial con un líder',
          prompt:
            'Oficina de obispo sobria, dos sillas enfrentadas, luz suave, ambiente de confianza, sin documentos legibles, estilo ilustración limpia.',
          aspectRatio: '4:5',
          placement: 'before',
        }),
      },
      {
        title: 'Recursos temporales, emocionales y profesionales',
        content:
          'La Iglesia ofrece programas de autosuficiencia y bienestar según región y necesidad; los líderes locales conocen lo disponible. Para crisis de salud mental graves, la orientación pastoral complementa —no reemplaza— la atención profesional cuando hace falta.\n\nSi estás en peligro inmediato, busca ayuda de emergencia en tu localidad. El Evangelio bendice la sabiduría humana y la inspiración espiritual juntas. No estás solo: el Señor suele mandar ayuda mediante Sus siervos y siervas.',
      },
    ],
    reflectionPrompt:
      '¿Hay algo en lo que te cueste pedir ayuda? ¿A quién podrías acercarte con confianza esta semana?',
  },
];
