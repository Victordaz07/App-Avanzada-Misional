import React, { useState } from 'react';
import {
  SanctuaryRoot,
  SanctuaryHeader,
  SanctuaryContainer,
  SanctuarySection,
  SanctuaryTopic,
  SanctuaryParagraph,
  SanctuaryScripture,
  SanctuaryLeaderQuote,
  SanctuaryKeyPoints,
  SanctuaryManualRef,
  SanctuaryWhoTable,
  SanctuaryPrayer,
  PrayerHighlight,
  PrayerHighlightBlue,
  SanctuaryPractice,
  SanctuaryFooter,
} from '../../ui/sanctuary';

/**
 * Sacrament Theory Page — demo of the Sanctuary canon.
 *
 * This page renders the full theoretical guide ("La Santa Cena — Fundamento
 * Teórico") using the new Sanctuary editorial components.
 *
 * Route: /lessons/sacrament-meeting/theory
 *
 * Content is Spanish-only for this first pass (source material verified in the
 * Spanish Gospel Library). An English port can reuse the same components.
 */
export default function SacramentTheoryPage(): JSX.Element {
  const [openId, setOpenId] = useState<string | null>('t1');
  const toggle = (id: string): void =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <SanctuaryRoot>
      <SanctuaryHeader
        eyebrow="Cuórum de Élderes · Clase Práctica"
        title={
          <>
            La Santa Cena
            <br />
            Fundamento Teórico
          </>
        }
        subtitle="Preparar · Bendecir · Repartir — El porqué de cada acto"
        badges={[
          { label: 'Manual General §18.9', tone: 'gold' },
          { label: 'D&C 20 · D&C 27', tone: 'blue' },
          { label: 'Fuentes oficiales verificadas', tone: 'green' },
        ]}
      />

      <SanctuaryContainer>
        {/* ════════ SECCIÓN 1: AUTORIDAD ════════ */}
        <SanctuarySection
          eyebrow="Sección 1 — Autoridad"
          title="¿Quién puede preparar, bendecir y repartir?"
        />

        <SanctuaryTopic
          id="t1"
          number="Tema 01"
          name="Quién tiene autoridad para cada función"
          quick={
            <>
              Tres funciones distintas, tres niveles de autoridad.{' '}
              <strong>
                No cualquier poseedor del sacerdocio puede hacer todo.
              </strong>{' '}
              El Señor estableció un orden específico.
            </>
          }
          icon="⚖️"
          iconTone="gold"
          isOpen={openId === 't1'}
          onToggle={() => toggle('t1')}
        >
          <SanctuaryManualRef>
            📖 Manual General §18.9.2 — Texto oficial verificado
          </SanctuaryManualRef>

          <SanctuaryWhoTable
            columns={['Función', 'Diácono', 'Maestro', 'Presbítero', 'Élder / SM']}
            rows={[
              { label: '🍞 Preparar', cells: [false, true, true, true] },
              { label: '🙏 Bendecir', cells: [false, false, true, true] },
              { label: '🚶 Repartir', cells: [true, true, true, true] },
            ]}
          />

          <SanctuaryParagraph>
            El Manual General indica que{' '}
            <em>
              «de manera habitual, cuando hay suficientes poseedores del
              Sacerdocio Aarónico, son ellos quienes cumplen con esos deberes»
            </em>
            . Los élderes y sumos sacerdotes pueden participar cuando no hay
            suficientes jóvenes.
          </SanctuaryParagraph>

          <SanctuaryKeyPoints
            items={[
              {
                tone: 'gold',
                text: (
                  <>
                    <strong>¿Por qué los presbíteros bendicen?</strong> El
                    sacerdocio de los presbíteros incluye el deber de{' '}
                    <em>«administrar»</em> la Santa Cena (D&amp;C 20:46). Es uno
                    de sus deberes principales.
                  </>
                ),
              },
              {
                tone: 'blue',
                text: (
                  <>
                    <strong>
                      ¿Por qué los diáconos reparten pero no bendicen?
                    </strong>{' '}
                    Su oficio tiene autoridad para repartir, pero bendecir
                    requiere el oficio de presbítero o superior.
                  </>
                ),
              },
              {
                tone: 'green',
                text: (
                  <>
                    <strong>Dignidad requerida.</strong> El Manual indica que
                    quien tenga <em>«pecados graves sin resolver»</em> no debe
                    preparar, bendecir ni repartir hasta que se haya arrepentido
                    y resuelto con el presidente de rama u obispo.
                  </>
                ),
              },
            ]}
          />

          <SanctuaryScripture
            tone="gold"
            text="«La misión de los presbíteros es… administrar la Santa Cena.»"
            reference="Doctrina y Convenios 20:46"
          />

          <SanctuaryPractice
            icon="🏛"
            label="Parte Práctica"
            title="Vamos a la parte práctica"
            description="Identifiquemos juntos en el salón quién ocupa cada posición — bendecidores, obispado, músicos y repartidores — exactamente como están en el salón sacramental."
          />
        </SanctuaryTopic>

        <SanctuaryTopic
          id="t2"
          number="Tema 02"
          name="¿Por qué el obispo recibe la Santa Cena primero?"
          quick={
            <>
              El Manual es explícito:{' '}
              <strong>«El líder que preside es el primero que la recibe»</strong>
              . No es protocolo cultural — tiene fundamento doctrinal directo.
            </>
          }
          icon="👑"
          iconTone="blue"
          isOpen={openId === 't2'}
          onToggle={() => toggle('t2')}
        >
          <SanctuaryManualRef>
            📖 Manual General §18.9.4 — Instrucciones oficiales
          </SanctuaryManualRef>

          <SanctuaryParagraph>
            El Manual General establece literalmente en el punto 6 de las
            instrucciones de la Santa Cena:{' '}
            <em>
              «El líder que preside es el primero que la recibe, y después de él
              no se sigue ningún orden específico.»
            </em>
          </SanctuaryParagraph>

          <SanctuaryParagraph>
            Esto aplica tanto para el pan como para el agua. La instrucción se
            repite dos veces en el manual — una para el pan (punto 6) y otra
            para el agua (punto 10).
          </SanctuaryParagraph>

          <SanctuaryKeyPoints
            items={[
              {
                tone: 'gold',
                text: (
                  <>
                    <strong>El obispo tiene las llaves.</strong> El Manual
                    General §18.9.1 indica que{' '}
                    <em>
                      «el obispo posee las llaves del sacerdocio para preparar,
                      bendecir y repartir la Santa Cena en el barrio»
                    </em>
                    . Él es el responsable final de la ordenanza.
                  </>
                ),
              },
              {
                tone: 'blue',
                text: (
                  <>
                    <strong>
                      Quien preside, no necesariamente el obispo.
                    </strong>{' '}
                    Si un miembro de la presidencia de estaca preside la
                    reunión, él recibe primero. El principio es que{' '}
                    <em>quien preside</em> recibe primero.
                  </>
                ),
              },
              {
                tone: 'green',
                text: (
                  <>
                    <strong>Después no hay orden específico.</strong> Una vez
                    que el que preside ha recibido, los demás miembros del
                    estrado y la congregación reciben sin orden jerárquico
                    particular.
                  </>
                ),
              },
            ]}
          />

          <SanctuaryScripture
            tone="blue"
            text="«Todo el que participe de este sacramento debe ser digno. Recuérdense de Aquel que preside sobre todos, Jesucristo, cuyo representante es quien preside la reunión.»"
            reference="Principio doctrinal del liderazgo presidencial"
          />
        </SanctuaryTopic>

        {/* ════════ SECCIÓN 2: EMBLEMAS ════════ */}
        <SanctuarySection
          eyebrow="Sección 2 — Los Emblemas"
          title="¿Por qué agua y no vino? ¿Por qué la mano derecha?"
        />

        <SanctuaryTopic
          id="t3"
          number="Tema 03"
          name="¿Por qué usamos agua y no vino?"
          quick={
            <>
              Jesús usó vino en la Última Cena. ¿Por qué la Iglesia usa agua?{' '}
              <strong>Hay una revelación directa del Señor sobre esto</strong>,
              con un contexto histórico fascinante.
            </>
          }
          icon="💧"
          iconTone="green"
          isOpen={openId === 't3'}
          onToggle={() => toggle('t3')}
        >
          <SanctuaryManualRef>
            📖 D&amp;C 27:1–4 — Revelación al Profeta José Smith, agosto 1830
          </SanctuaryManualRef>

          <SanctuaryParagraph>
            En agosto de 1830, el Profeta José Smith se disponía a comprar vino
            para administrar la Santa Cena. Un mensajero celestial se le apareció
            y le entregó esta revelación:
          </SanctuaryParagraph>

          <SanctuaryScripture
            tone="gold"
            text="«Porque he aquí, te digo que no importa lo que comáis o bebáis al tomar el sacramento, si es que lo hacéis con la mira puesta únicamente en mi gloria, recordando ante el Padre mi cuerpo que fue sacrificado por vosotros, y mi sangre que se derramó para la remisión de vuestros pecados.»"
            reference="Doctrina y Convenios 27:2"
          />

          <SanctuaryParagraph>
            El contexto histórico es importante: el Señor también le advirtió a
            José que <em>no comprara vino ni bebidas alcohólicas a sus enemigos</em>{' '}
            (D&amp;C 27:3–4). La Iglesia adoptó el agua como emblema permanente
            por ser pura, accesible universalmente y sin asociación con el
            alcohol.
          </SanctuaryParagraph>

          <SanctuaryKeyPoints
            items={[
              {
                tone: 'green',
                text: (
                  <>
                    <strong>El elemento no es lo sagrado.</strong> Lo sagrado es
                    la <em>intención del corazón</em> y lo que los emblemas
                    representan — el cuerpo y la sangre de Cristo.
                  </>
                ),
              },
              {
                tone: 'gold',
                text: (
                  <>
                    <strong>La oración dice «esta agua».</strong> Según el
                    Manual General §18.9.4, quien bendice el agua debe usar las
                    palabras <em>«esta agua»</em> en lugar de <em>«este vino»</em>
                    , como aparece en D&amp;C 20:79.
                  </>
                ),
              },
              {
                tone: 'blue',
                text: (
                  <>
                    <strong>Revelada antes de la Palabra de Sabiduría.</strong>{' '}
                    Esta instrucción llegó más de dos años antes de D&amp;C 89.
                    El Señor ya guiaba hacia emblemas más puros.
                  </>
                ),
              },
            ]}
          />

          <SanctuaryLeaderQuote
            text="No es el tipo de elemento lo que es esencial, sino el espíritu con el que participamos del sacramento."
            attribution="Presidente Joseph Fielding Smith · Doctrina de Salvación"
          />
        </SanctuaryTopic>

        <SanctuaryTopic
          id="t4"
          number="Tema 04"
          name="¿Por qué tomamos la Santa Cena con la mano derecha?"
          quick={
            <>
              El Manual dice «cuando sea posible». El Presidente Nelson explicó
              el profundo significado:{' '}
              <strong>
                es la misma mano con la que hacemos convenios sagrados
              </strong>
              .
            </>
          }
          icon="🤝"
          iconTone="gold"
          isOpen={openId === 't4'}
          onToggle={() => toggle('t4')}
        >
          <SanctuaryManualRef>
            📖 Manual General §18.9.4, punto 7 · Pdte. Nelson
          </SanctuaryManualRef>

          <SanctuaryParagraph>
            El Manual General indica claramente:{' '}
            <em>
              «Los miembros toman la Santa Cena con la mano derecha, cuando sea
              posible.»
            </em>{' '}
            No es una regla absoluta, pero tiene un simbolismo profundo.
          </SanctuaryParagraph>

          <SanctuaryScripture
            tone="gold"
            text="«La mano utilizada al participar del sacramento sería lógicamente la misma mano utilizada al hacer cualquier otro convenio sagrado. Para la mayoría de nosotros, sería la mano derecha… Puesto que tengo una mano derecha, la ofrezco al participar del sacramento como juramento de que siempre recordaré su sacrificio expiatorio, tomaré su nombre sobre mí y guardaré los mandamientos de Dios.»"
            reference="Presidente Russell M. Nelson"
          />

          <SanctuaryKeyPoints
            items={[
              {
                tone: 'gold',
                text: (
                  <>
                    <strong>La mano derecha y los convenios.</strong> En la
                    Biblia, la mano derecha aparece 166 veces en contextos de
                    fidelidad, fuerza y poder. Se usaba al hacer convenios desde
                    los tiempos de Abram (Génesis 14:22).
                  </>
                ),
              },
              {
                tone: 'blue',
                text: (
                  <>
                    <strong>Cristo está a la diestra del Padre.</strong> Jesús
                    declaró que estaría{' '}
                    <em>«sentado a la diestra del poder de Dios»</em> (Mateo
                    26:64). Extender la mano derecha es una alusión a esa
                    posición.
                  </>
                ),
              },
              {
                tone: 'green',
                text: (
                  <>
                    <strong>No es obligatorio.</strong> Quien no puede usar la
                    mano derecha por discapacidad u otra razón puede tomar la
                    Santa Cena con la mano izquierda sin ningún problema. El
                    corazón importa más que el gesto.
                  </>
                ),
              },
              {
                tone: 'purple',
                text: (
                  <>
                    <strong>No se puede requerir ciertas acciones.</strong> El
                    Manual indica expresamente:{' '}
                    <em>
                      «no se deben requerir ciertas acciones (como colocar la
                      mano izquierda detrás de la espalda)»
                    </em>
                    . La reverencia no se fuerza.
                  </>
                ),
              },
            ]}
          />
        </SanctuaryTopic>

        {/* ════════ SECCIÓN 3: CONVENIOS ════════ */}
        <SanctuarySection
          eyebrow="Sección 3 — Los Convenios"
          title="Las oraciones: qué prometemos, qué recibimos"
        />

        <SanctuaryTopic
          id="t5"
          number="Tema 05"
          name="Las oraciones sacramentales — versículo a versículo"
          quick={
            <>
              Las oraciones no son poemas — son{' '}
              <strong>un contrato bilateral con Dios</strong>. Tres promesas
              nuestras, una promesa de Él.
            </>
          }
          icon="📜"
          iconTone="gold"
          isOpen={openId === 't5'}
          onToggle={() => toggle('t5')}
        >
          <SanctuaryPrayer
            label="Oración del pan — D&C 20:77 — Texto SUD oficial"
            source="Doctrina y Convenios 20:77"
            annotations={[
              {
                key: 'Nosotros',
                tone: 'gold',
                text: 'Prometemos 3 cosas: (1) tomar el nombre de Cristo, (2) recordarle siempre, (3) guardar Sus mandamientos.',
              },
              {
                key: 'Dios',
                tone: 'blue',
                text: 'Promete 1 cosa: que siempre podamos tener Su Espíritu con nosotros. Es un intercambio eterno.',
              },
            ]}
          >
            «Oh Dios, Padre Eterno, en el nombre de Jesucristo, tu Hijo, te
            pedimos que bendigas y santifiques este pan para las almas de todos
            los que participen de él,
            <br />
            <br />
            para que lo coman{' '}
            <PrayerHighlight>en memoria del cuerpo de tu Hijo</PrayerHighlight>,
            <br />
            <br />
            y testifiquen ante ti, oh Dios, Padre Eterno,
            <br />
            <br />
            que están{' '}
            <PrayerHighlight>
              dispuestos a tomar sobre sí el nombre de tu Hijo
            </PrayerHighlight>
            ,
            <br />
            <br />y a <PrayerHighlight>recordarle siempre</PrayerHighlight>,
            <br />
            <br />
            y a{' '}
            <PrayerHighlight>
              guardar sus mandamientos que él les ha dado
            </PrayerHighlight>
            ,
            <br />
            <br />
            para que{' '}
            <PrayerHighlightBlue>
              siempre puedan tener su Espíritu consigo
            </PrayerHighlightBlue>
            . Amén.»
          </SanctuaryPrayer>

          <SanctuaryPrayer
            label="Oración del agua — D&C 20:79 — Texto SUD oficial"
            source="D&C 20:79 · Nota: Se dice «esta agua» en lugar de «este vino»"
            annotations={[
              {
                key: 'Sangre',
                tone: 'gold',
                text: 'El agua simboliza la sangre derramada de Cristo. Juntos, pan y agua representan el cuerpo y la sangre — la Expiación completa.',
              },
              {
                key: 'Nota',
                tone: 'blue',
                text: 'Si el que bendice comete un error y no se corrige, el obispo le pide con amabilidad que repita la oración. Si se corrige a sí mismo, no es necesario repetirla.',
              },
            ]}
          >
            «Oh Dios, Padre Eterno, en el nombre de Jesucristo, tu Hijo, te
            pedimos que bendigas y santifiques{' '}
            <PrayerHighlight>esta agua</PrayerHighlight> para las almas de todos
            los que la beban,
            <br />
            <br />
            para que la beban{' '}
            <PrayerHighlight>
              en memoria de la sangre de tu Hijo
            </PrayerHighlight>
            , que por ellos se derramó;
            <br />
            <br />
            para que testifiquen ante ti, oh Dios, Padre Eterno,
            <br />
            <br />
            que{' '}
            <PrayerHighlight>siempre se acuerdan de él</PrayerHighlight>,
            <br />
            <br />
            para que{' '}
            <PrayerHighlightBlue>
              puedan tener su Espíritu consigo
            </PrayerHighlightBlue>
            . Amén.»
          </SanctuaryPrayer>

          <SanctuaryKeyPoints
            items={[
              {
                tone: 'gold',
                text: (
                  <>
                    <strong>¿Qué significa «tomar sobre sí el nombre»?</strong>{' '}
                    Es comprometernos a ser identificados con Cristo — actuar
                    como Él, hablar como Él, representarle en todo momento.
                  </>
                ),
              },
              {
                tone: 'green',
                text: (
                  <>
                    <strong>¿Qué significa «recordarle siempre»?</strong> El
                    Pdte. Kimball enseñó: «Supongo que nunca habría un apóstata
                    si las personas realmente recordaran las cosas que han
                    convenido.» Recordar es activo, no pasivo.
                  </>
                ),
              },
              {
                tone: 'blue',
                text: (
                  <>
                    <strong>
                      La promesa de Dios es incondicional al convenio.
                    </strong>{' '}
                    Si guardamos las promesas, <em>siempre</em> tenemos Su
                    Espíritu. No «a veces» — siempre.
                  </>
                ),
              },
            ]}
          />
        </SanctuaryTopic>

        <SanctuaryPractice
          standalone
          icon="🍞"
          label="Parte Práctica"
          title="Vamos a la parte práctica"
          description="Vamos a recorrer juntos el orden de distribución del pan — cada repartidor a su posición, exactamente como ocurre en la reunión sacramental."
        />

        {/* ════════ SECCIÓN 4: MANUAL ════════ */}
        <SanctuarySection
          eyebrow="Sección 4 — Manual General"
          title="Lo que dice el Manual sobre preparación y reverencia"
        />

        <SanctuaryTopic
          id="t6"
          number="Tema 06"
          name="Pautas del Manual General sobre la administración"
          quick={
            <>
              El Manual es específico:{' '}
              <strong>manteles blancos, limpios y planchados</strong>, lavado de
              manos, silencio durante la distribución, apariencia de los que
              reparten.
            </>
          }
          icon="📋"
          iconTone="purple"
          isOpen={openId === 't6'}
          onToggle={() => toggle('t6')}
        >
          <SanctuaryManualRef>
            📖 Manual General §18.9.3 y §18.9.4 — Pautas oficiales
          </SanctuaryManualRef>

          <SanctuaryKeyPoints
            items={[
              {
                tone: 'gold',
                text: (
                  <>
                    <strong>Lavado de manos.</strong> «Quienes preparan,
                    bendicen o reparten la Santa Cena deben lavarse las manos
                    primeramente con jabón u otro limpiador.» (§18.9.4, punto 1)
                  </>
                ),
              },
              {
                tone: 'blue',
                text: (
                  <>
                    <strong>Manteles blancos.</strong> «Los manteles de la
                    Santa Cena deben ser blancos, y estar limpios y planchados.»
                    Simbolizan pureza y el sagrado carácter de la ordenanza.
                  </>
                ),
              },
              {
                tone: 'green',
                text: (
                  <>
                    <strong>Solemnidad al actuar.</strong> «Quienes bendicen y
                    reparten la Santa Cena deben hacerlo con solemnidad, siendo
                    conscientes de que están <em>representando al Señor</em>.»
                  </>
                ),
              },
              {
                tone: 'purple',
                text: (
                  <>
                    <strong>Apariencia.</strong> «Deben estar limpios y aseados.
                    No deben llevar prendas ni alhajas que desvíen la atención
                    de la adoración.» Si el obispo necesita aconsejar, lo hace
                    «con amor».
                  </>
                ),
              },
              {
                tone: 'red',
                text: (
                  <>
                    <strong>Sin música al repartir.</strong> «No se debe tocar
                    música mientras se reparte la Santa Cena ni inmediatamente
                    después.» El silencio es parte de la reverencia.
                  </>
                ),
              },
              {
                tone: 'gold',
                text: (
                  <>
                    <strong>El himno no puede reemplazarse.</strong> «Se parte
                    el pan mientras la congregación canta el himno sacramental.
                    No se puede reemplazar ese himno con solos cantados ni con
                    música instrumental.»
                  </>
                ),
              },
              {
                tone: 'blue',
                text: (
                  <>
                    <strong>Reparto natural, no rígido.</strong> «El reparto de
                    la Santa Cena debe hacerse de forma natural y no
                    excesivamente formal.» No se requieren posturas o acciones
                    específicas al recibirla.
                  </>
                ),
              },
            ]}
          />

          <SanctuaryLeaderQuote
            text="Esta ordenanza siempre se debe llevar a cabo con reverencia y dignidad. Los presbíteros que ofrecen las oraciones en nombre de la congregación deben pronunciar las palabras lenta y claramente, expresando los términos de los convenios y de las bendiciones prometidas. Éste es un acto sumamente sagrado."
            attribution="Presidente Dallin H. Oaks · «La reunión sacramental y la Santa Cena» · Conferencia General, octubre 2008"
          />
        </SanctuaryTopic>

        <SanctuaryTopic
          id="t7"
          number="Tema 07"
          name="¿Qué pasa si el que bendice comete un error?"
          quick={
            <>
              Uno de los momentos más delicados.{' '}
              <strong>El Manual es claro y específico</strong> sobre cuándo se
              repite y cómo se pide — con discreción, sin avergonzar.
            </>
          }
          icon="⚡"
          iconTone="red"
          isOpen={openId === 't7'}
          onToggle={() => toggle('t7')}
        >
          <SanctuaryManualRef>
            📖 Manual General §18.9.4, punto 5 — Instrucción oficial
          </SanctuaryManualRef>

          <SanctuaryParagraph>
            El Manual General §18.9.4, punto 5, dice textualmente:{' '}
            <em>
              «El obispo se asegura de que las oraciones sacramentales se
              pronuncien de manera clara, precisa y con solemnidad.»
            </em>
          </SanctuaryParagraph>

          <SanctuaryKeyPoints
            items={[
              {
                tone: 'green',
                text: (
                  <>
                    <strong>Si se corrige a sí mismo → no se repite.</strong>{' '}
                    «Si alguien comete un error en las palabras, pero se corrige
                    a sí mismo, no es necesario hacer otra corrección.»
                  </>
                ),
              },
              {
                tone: 'red',
                text: (
                  <>
                    <strong>
                      Si no corrige el error → el obispo interviene.
                    </strong>{' '}
                    «Mas si no corrige el error, el obispo le pide con
                    amabilidad que repita la oración.»
                  </>
                ),
              },
              {
                tone: 'gold',
                text: (
                  <>
                    <strong>Con discreción.</strong> «El obispo debe ser
                    discreto al pedir que la oración se repita y se asegura de
                    que al hacerlo no avergüenza a nadie ni perturba la
                    ordenanza.»
                  </>
                ),
              },
              {
                tone: 'blue',
                text: (
                  <>
                    <strong>El otro puede ayudar.</strong> «La otra persona en
                    la mesa sacramental puede prestar ayuda, según sea
                    necesario.» El que no está bendiciendo puede ayudar a
                    recordar las palabras.
                  </>
                ),
              },
            ]}
          />

          <SanctuaryScripture
            tone="blue"
            text="Las palabras exactas de las oraciones sacramentales están dadas por revelación. No son sugerencias — son el texto preciso del convenio que se está haciendo con el Padre."
            reference="Principio basado en D&C 20:77 y 20:79"
          />
        </SanctuaryTopic>

        <SanctuaryPractice
          standalone
          icon="🕊"
          label="Parte Práctica"
          title="Vamos a la parte práctica"
          description="Practiquemos el cierre — el regreso ordenado a la mesa, quiénes comen primero, cómo se cubre con el manto blanco y todos vuelven a sus asientos."
        />

        {/* ════════ SECCIÓN 5: PORQUÉ ════════ */}
        <SanctuarySection
          eyebrow="Sección 5 — El porqué"
          title="El significado espiritual de cada acto"
        />

        <SanctuaryTopic
          id="t8"
          number="Tema 08"
          name="¿Por qué los jóvenes del Sacerdocio Aarónico administran la Santa Cena?"
          quick={
            <>
              No es por conveniencia. Es{' '}
              <strong>profundamente simbólico</strong>: los sacerdotes del
              Sacerdocio Aarónico representan al Salvador que sirve a Su pueblo.
            </>
          }
          icon="✨"
          iconTone="gold"
          isOpen={openId === 't8'}
          onToggle={() => toggle('t8')}
        >
          <SanctuaryParagraph>
            En el Antiguo Testamento, los sacerdotes eran los mediadores entre
            el pueblo y Dios. Solo ellos podían acercarse al altar y hacer los
            sacrificios. El pueblo no podía hacer sus propias ordenanzas —
            necesitaba un representante autorizado.
          </SanctuaryParagraph>

          <SanctuaryScripture
            tone="gold"
            text="«Ponga énfasis en la idea de que eran los sacerdotes los que oficiaban porque tenían el sacerdocio y eran representantes oficiales del Señor. Del mismo modo, como miembros individuales de la Iglesia no podemos bendecir y administrar la Santa Cena cuando queremos. Existe un orden instituido por el Señor.»"
            reference="Manual del Sacerdocio Aarónico, Manual 3, Lección 14"
          />

          <SanctuaryKeyPoints
            items={[
              {
                tone: 'gold',
                text: (
                  <>
                    <strong>El diácono se pone donde estaría Jesús.</strong> El
                    Élder Steven J. Lund enseñó: «Podemos pensar en lo que
                    significa cuando un diácono nos lleva los emblemas sagrados,{' '}
                    <em>poniéndose de pie donde estaría Jesús si estuviera ahí</em>,
                    ofreciendo aliviar nuestras cargas.»
                  </>
                ),
              },
              {
                tone: 'blue',
                text: (
                  <>
                    <strong>Confianza sagrada.</strong> El Manual del SA dice:
                    «Nuestro Padre Celestial tiene mucha confianza en los
                    poseedores del Sacerdocio Aarónico, puesto que les ha
                    asignado el privilegio de administrar los santos emblemas
                    sacramentales.»
                  </>
                ),
              },
              {
                tone: 'green',
                text: (
                  <>
                    <strong>Una influencia sobre la congregación.</strong> «Los
                    presbíteros tienen la oportunidad de administrar la Santa
                    Cena de una manera significativa para aquellos que llegan
                    para renovar sus convenios. En realidad, podrían tener un
                    efecto muy importante sobre ellos.»
                  </>
                ),
              },
            ]}
          />

          <SanctuaryLeaderQuote
            text="Cuando un poseedor del sacerdocio extiende el brazo para ofrecernos los emblemas sagrados, es como si el Salvador mismo estuviera extendiendo Su brazo de misericordia hacia nosotros."
            attribution="Hermana Cheryl A. Esplin · Presidencia General de la Primaria"
          />
        </SanctuaryTopic>

        <SanctuaryTopic
          id="t9"
          number="Tema 09"
          name="¿Qué renovamos cada semana al tomar la Santa Cena?"
          quick={
            <>
              No es solo un ritual semanal.{' '}
              <strong>Es una renovación del convenio bautismal</strong> — con
              las mismas tres promesas del día en que fuimos bautizados.
            </>
          }
          icon="🔄"
          iconTone="blue"
          isOpen={openId === 't9'}
          onToggle={() => toggle('t9')}
        >
          <SanctuaryParagraph>
            Al bautizarnos, prometemos las mismas tres cosas que están en la
            oración del pan: tomar el nombre de Cristo, recordarle siempre y
            guardar Sus mandamientos. La Santa Cena es la renovación semanal de
            ese mismo convenio.
          </SanctuaryParagraph>

          <SanctuaryScripture
            tone="green"
            text="«Por medio de esta ordenanza, los miembros de la Iglesia renuevan los convenios que hicieron con Dios al bautizarse. Cuando hacemos eso, el Señor renueva la promesa de redimir los pecados y permite que los miembros siempre puedan tener su Espíritu consigo.»"
            reference="Temas del Evangelio — «La Santa Cena» · ChurchofJesusChrist.org"
          />

          <SanctuaryKeyPoints
            items={[
              {
                tone: 'gold',
                text: (
                  <>
                    <strong>
                      El Señor renueva el efecto del bautismo.
                    </strong>{' '}
                    El Pdte. Oaks enseñó: «Al renovar nuestro convenio bautismal
                    de esta forma, el Señor renueva el efecto limpiador de
                    nuestro bautismo. De esta manera, quedamos limpios.»
                  </>
                ),
              },
              {
                tone: 'blue',
                text: (
                  <>
                    <strong>El convenio es bilateral.</strong> Nosotros
                    prometemos 3 cosas → Dios nos promete Su Espíritu. No hay
                    promesa mayor que poder tener siempre la compañía del
                    Espíritu Santo.
                  </>
                ),
              },
              {
                tone: 'green',
                text: (
                  <>
                    <strong>«Siempre recordarle»</strong> va más allá de los 60
                    minutos de la reunión. Es un compromiso de vida: que cada
                    pensamiento, palabra y acción esté influenciado por el
                    recuerdo del Salvador.
                  </>
                ),
              },
            ]}
          />

          <SanctuaryLeaderQuote
            text="La ordenanza de la Santa Cena hace que la reunión sacramental sea la más sagrada e importante de la Iglesia."
            attribution="Presidente Dallin H. Oaks · Conferencia General, octubre 2008"
          />
        </SanctuaryTopic>
      </SanctuaryContainer>

      <SanctuaryFooter>
        La Santa Cena — Guía Teórica · Cuórum de Élderes
        <br />
        Fuentes: Manual General §18.9 · D&amp;C 20:46, 77, 79 · D&amp;C 27:2 ·
        Conferencias Generales
        <br />
        Textos verificados en churchofjesuschrist.org
      </SanctuaryFooter>
    </SanctuaryRoot>
  );
}
