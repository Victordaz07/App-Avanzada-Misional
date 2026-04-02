export interface TrainingLessonScripture {
  ref: string;
  text: string;
}

export interface TrainingLessonOfficialLink {
  label: string;
  url: string;
}

/** Un bloque pedagógico: doctrina → aplicación → acción (lecciones `layout: structured`). */
export interface TrainingLessonStructuredSection {
  id: string;
  title: string;
  /** Línea corta que enlaza con el Manual General (texto ya localizado; sin inventar números de párrafo). */
  handbookRef?: string;
  doctrine: string;
  /** Escrituras que apoyan este bloque (cita breve + referencia en forma oficial del idioma). */
  scriptures?: TrainingLessonScripture[];
  explanation: string;
  /** Segundo nivel de enseñanza: matices, vínculo explícito con Cristo, implicaciones. */
  deepen?: string;
  /** Viñetas para fijar conceptos antes del ejemplo. */
  keyPoints?: string[];
  example: string;
  application: string[];
  action: string;
  prompts?: {
    home?: string;
    service?: string;
    council?: string;
    /** Tercer prompt para Primaria: orientación a líderes o padres (cap. 12). */
    leadersOrParents?: string;
  };
}

/**
 * Lección manual con acordeones fijos (objetivos, ideas clave, escrituras, etc.).
 * Es el formato histórico de `manualLessons.*` y lecciones core/sacerdocio.
 */
export interface TrainingLessonCanonicalContent {
  intro: string;
  /** Enlaces oficiales (manuales en churchofjesuschrist.org); textos ya localizados. */
  officialLinks?: TrainingLessonOfficialLink[];
  objectivesHeading: string;
  objectives: string[];
  briefHeading: string;
  briefBody: string;
  scripturesHeading: string;
  scriptures: TrainingLessonScripture[];
  didYouKnowHeading: string;
  didYouKnow: string[];
  practiceHeading: string;
  practiceHint: string;
  practiceItems: string[];
  practiceDone: string;
  practicePending: string;
  reflectionHeading: string;
  reflectionHint: string;
  reflectionQuestions: string[];
  reflectionPlaceholder: string;
  actionHeading: string;
  actionText: string;
}

/**
 * Lección por bloques independientes (doctrina, explicación, ejemplo, preguntas, acción).
 * Reutilizable para otras lecciones manuales: `layout: 'structured'`.
 */
export interface TrainingLessonStructuredContent {
  layout: 'structured';
  /**
   * `primary`: tono y etiquetas de prompts pensados para niños y familias (Primaria).
   * `leadership`: tono más sobrio y pastoral para liderazgo local (obispado / consejo).
   * @default 'default'
   */
  promptVariant?: 'default' | 'primary' | 'leadership';
  intro: string;
  /**
   * Texto ampliado tras el hero: panorama, intención pedagógica, cómo usar la lección.
   * Varias párrafos: separar con líneas en blanco (`\\n\\n`).
   */
  overview?: string;
  officialLinks?: TrainingLessonOfficialLink[];
  /** Escrituras opcionales a nivel lección (acordeón después de los bloques; lectura complementaria). */
  scriptures?: TrainingLessonScripture[];
  sections: TrainingLessonStructuredSection[];
}

export type TrainingLessonContent = TrainingLessonCanonicalContent | TrainingLessonStructuredContent;

export function isStructuredTrainingLesson(
  c: TrainingLessonContent,
): c is TrainingLessonStructuredContent {
  return (c as TrainingLessonStructuredContent).layout === 'structured';
}
