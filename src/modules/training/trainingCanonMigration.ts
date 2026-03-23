/**
 * Migración incremental del módulo Training (`/training`) al layout **Teaching Canon**
 * (mismos bloques que la guía de nuevos miembros: hero, audio, imagen, bloques, escrituras,
 * preguntas doctrinales, aplicación, reflexión).
 *
 * ## Referencias
 * - Componentes: `src/ui/teaching-canon/`
 * - Ejemplo integrado: `src/modules/new-member/pages/NewMemberGuideDetailPage.tsx`
 * - Tipos de contenido guía: `src/modules/new-member/data/guideTopics.types.ts`
 * - Lecciones actuales: `TrainingLessonBody` (canónico) + `TrainingLessonStructuredBody` (`layout: 'structured'`)
 *   y tipos en `trainingLessonContent.types.ts` (`TrainingLessonContent` = unión).
 *
 * ## Pasos recomendados (por lección o por sprint)
 * 1. Modelar datos de la lección con campos opcionales alineados al canon: `audioPlaceholder`,
 *    `imagePlaceholder` por sección, listas de preguntas doctrinales y de aplicación, y prompt de reflexión
 *    (puede seguir en `*.es.ts` / `*.en.ts` existentes).
 * 2. En la pantalla de lección (`LessonPlaceholderScreen` o componente de lección), importar desde
 *    `src/ui/teaching-canon` (`TeachingCanonShell`, `TeachingCanonHeroHeader`, `TeachingCanonAudioCard`, etc.)
 *    y componer el árbol en el mismo orden que la guía.
 * 3. Mantener almacenamiento local / práctica existente (`lessonStorage`, checklist) como capa aparte;
 *    el canon solo define presentación y jerarquía pedagógica.
 * 4. No duplicar CSS: un solo `import '.../ui/teaching-canon'` (el `index` incluye `TeachingCanon.css`).
 * 5. Validar i18n: textos de botones y etiquetas desde `app.*.json`; contenido largo bilingüe en pares TS.
 *
 * ## Mapeo orientativo (TrainingLessonContent → bloques canon)
 * - `intro` + `objectives` → pueden fusionarse en secciones acordeón o en hero + primer bloque.
 * - `scriptures` → `TeachingCanonSectionScripture` o `TeachingCanonFeaturedScripture` según diseño.
 * - `reflectionQuestions` + `reflectionPlaceholder` → `TeachingCanonReflection` (y opcionalmente
 *   `TeachingCanonExtra` si se listan por separado).
 * - `practiceItems` → checklist actual o bloques interactivos dentro de `TeachingCanonAccordionSection`.
 *
 * ## Estado (v2)
 * `TrainingLessonBody` y `LessonPlaceholderScreen` usan el layout Teaching Canon (`src/ui/teaching-canon/`,
 * `TrainingLessonCanon.css`). Las lecciones ya no importan CSS por archivo.
 */
export const TRAINING_TEACHING_CANON_VERSION = 2 as const;
